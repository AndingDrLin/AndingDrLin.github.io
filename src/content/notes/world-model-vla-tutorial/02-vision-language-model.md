---
title: "第 2 章：VLM 基础——视觉-语言模型"
description: "理解 LLaVA、Flamingo 等 VLM 架构，让模型同时'看懂'图像和'听懂'语言"
date: 2026-06-27
tags: [VLM, LLaVA, Flamingo, PaliGemma, multimodal, tutorial]
category: "Tutorials"
docGroup: "world-model-vla-tutorial"
order: 2
draft: false
---

# 第 2 章：VLM 基础——视觉-语言模型

> 如果 CLIP 让模型学会了"看图说话"，VLM 要做的则是"看图做事"——这是从视觉理解到行动决策的关键桥梁。

## 为什么需要 VLM？

上一章我们用 CLIP 和 DINOv2 让模型"看懂"图像。但机器人需要的不只是识别物体——它需要理解自然语言指令（"把红色杯子放到桌子左边"），把语言和视觉对应起来（哪个是"红色杯子"？"桌子左边"在哪？），然后做出决策。

这就是 VLM（Vision-Language Model）要解决的问题。

VLA 模型的核心，就是在一个预训练 VLM 的基础上，把"动作"作为第三种模态加入。所以理解 VLM 架构，是理解 VLA 的前提。

## VLM 的三种主流架构

### 架构一：交叉注意力（Cross-Attention）—— Flamingo 路线

Flamingo（Alayrac et al., 2022, DeepMind）的设计思路是：**冻结预训练的视觉编码器和语言模型，用交叉注意力层把两者桥接起来。**

```
图像 → 冻结的 ViT → 视觉特征
                          ↓ 交叉注意力
文本 → 冻结的 LLM → 语言特征 → 输出
```

关键设计：
- **Perceiver Resampler**：把变长的视觉 token 序列压缩为固定数量的 token
- **Gated Cross-Attention**：用 gating 机制控制视觉信息流入语言模型的量

优点：不改变 LLM 原有结构，训练高效。缺点：视觉和语言的融合较浅。

### 架构二：投影对齐（Projection）—— LLaVA 路线

LLaVA（Liu et al., 2023, Microsoft/Wisconsin）走了更简单的路：**用一个线性层（或 MLP）把视觉特征投影到语言模型的 embedding 空间，然后拼接起来一起输入 LLM。**

```
图像 → 冻结的 CLIP ViT → 视觉 tokens
                              ↓ 线性投影
文本 → Tokenizer → 文本 tokens
                        ↓ 拼接
              [视觉 tokens; 文本 tokens] → LLM → 输出
```

关键设计：
- **简单但有效**：一个 MLP 就够了
- **两阶段训练**：先冻结视觉编码器只训练投影层（对齐预训练），再端到端微调

LLaVA 的成功表明，VLM 的核心不在架构复杂度，而在数据质量和训练策略。

### 架构三：原生多模态（Natively Multimodal）—— PaliGemma / Gemini 路线

Google 的做法是：**从头就把图像和文本当作同一个序列来训练**，而不是后期拼接。

PaliGemma（Google, 2024）：
- 视觉编码器（SigLIP）→ 投影 → 和文本一起送入 Gemma 语言模型
- 端到端预训练，不像 LLaVA 那样分阶段

这种架构更适合 VLA，因为 π0 就是在 PaliGemma 基础上加了 flow matching action head。

## 动手：用 Hugging Face 跑通 VLM

### 用 SmolVLM 做视觉问答

```python
from transformers import AutoProcessor, AutoModelForVision2Seq
from PIL import Image
import torch

# 加载模型（SmolVLM 是轻量级 VLM，适合入门）
processor = AutoProcessor.from_pretrained("HuggingFaceTB/SmolVLM-Instruct")
model = AutoModelForVision2Seq.from_pretrained(
    "HuggingFaceTB/SmolVLM-Instruct",
    torch_dtype=torch.bfloat16,
    device_map="auto"
)

# 准备输入
image = Image.open("your_image.jpg")  # 换成你的图片
messages = [
    {
        "role": "user",
        "content": [
            {"type": "image"},
            {"type": "text", "text": "Describe what objects are on the table and their positions."}
        ]
    }
]

# 推理
prompt = processor.apply_chat_template(messages, add_generation_prompt=True)
inputs = processor(text=prompt, images=[image], return_tensors="pt").to(model.device)
outputs = model.generate(**inputs, max_new_tokens=256)
print(processor.decode(outputs[0], skip_special_tokens=True))
```

### 理解 VLM 输出的结构

VLM 的输出是 token 序列——和纯文本 LLM 完全一样。这意味着：

1. **VLM 的输出可以直接用 autoregressive 方式生成**
2. **动作可以被 tokenize 成特殊 token**——这就是 RT-2 的核心思路
3. **VLM 的推理能力可以迁移到动作规划**

理解了这一点，后面的 VLA 章节（第 4 章）就顺理成章了。

## VLM 对 VLA 的意义

VLA 模型本质上就是在 VLM 上做两件事：

1. **扩展输出空间**：除了文本 token，还输出动作 token
2. **机器人数据微调**：用机器人演示数据微调 VLM，让它学会输出合理的动作

```
VLM:  图像 + 语言指令 → 文本回答
VLA:  图像 + 语言指令 → 机器人动作
```

这也是为什么 VLA 选择了 VLM 而不是纯视觉模型——语言指令是 VLA 的核心输入，VLM 天然支持。

## VLM 微调实战：LoRA 微调 VLM

在实际 VLA 训练中，你通常需要先微调 VLM 使其适应机器人场景。LoRA 是最常用的方法：

```python
from transformers import AutoModelForVision2Seq, AutoProcessor
from peft import LoraConfig, get_peft_model

# 加载预训练 VLM
model = AutoModelForVision2Seq.from_pretrained("HuggingFaceTB/SmolVLM-Instruct")
processor = AutoProcessor.from_pretrained("HuggingFaceTB/SmolVLM-Instruct")

# 配置 LoRA — 只在语言模型部分加 LoRA
lora_config = LoraConfig(
    r=16,
    lora_alpha=32,
    target_modules=["q_proj", "v_proj"],  # 只对注意力层做 LoRA
    lora_dropout=0.05,
    bias="none",
)

model = get_peft_model(model, lora_config)
model.print_trainable_parameters()
# 输出类似：trainable params: 2,097,152 || all params: 2,200,000,000 || trainable%: 0.1%
```

LoRA 的好处：
- **显存友好**：只需要训练 0.1% 的参数
- **RTX 4090 可跑**：7B 模型 + LoRA 只需约 16GB 显存
- **多任务灵活**：每个任务一个 LoRA adapter，可以热切换

## 练习

### 练习 1：跑通 VLM 推理
用 SmolVLM 或 LLaVA 对 5 张不同场景的图片做 VQA，记录回答质量。特别关注：
- 物体识别是否准确？
- 空间关系描述是否正确（"左边"、"上面"）？

### 练习 2：用 LoRA 微调 VLM 做桌面物体识别
准备 20-30 张桌面场景图片，标注物体名称和位置。用 LoRA 微调 SmolVLM，测试微调后的效果。

### 练习 3：对比不同 VLM 的输出
对同一张图片，分别用 SmolVLM、LLaVA、GPT-4V（API）做 VQA。记录：
- 哪个对空间关系理解最好？
- 哪个对小物体识别最好？
- 哪个最适合机器人场景？为什么？

## 常见踩坑 FAQ

**Q：VLM 推理太慢怎么办？**
A：7B 模型在 RTX 4090 上单次推理约 1-3 秒。可以尝试量化（4-bit）或用更小的模型（如 SmolVLM-256M）。对于 VLA 实时控制，通常需要 < 100ms——这就是为什么 VLA 模型在架构选择上很看重推理速度。

**Q：微调 VLM 时视觉编码器要不要解冻？**
A：第一阶段冻结视觉编码器（只训练投影层），第二阶段可以微调解冻部分视觉编码器。全解冻视觉编码器风险较高，容易在小数据上过拟合。

**Q：VLM 输出的 token 和动作 token 有什么区别？**
A：文本 token 经过 tokenizer 编码，动作 token 是把连续动作值离散化成整数。RT-2 把两者统一为同一个 token 空间——这是 VLA 的关键设计。

**Q：选哪个 VLM 做 VLA 的 backbone？**
A：当前主流选择是 PaliGemma（π0 用的）和 SigLIP + 7B LLM（OpenVLA 用的）。如果是学习用途，SmolVLM 最轻量；做项目建议用 Prismatic 或 LLaVA。
