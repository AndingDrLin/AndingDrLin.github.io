---
title: "项目 1：OpenVLA 微调实战"
description: "Fine-tune OpenVLA 到自定义桌面操控任务——你的第一个 VLA 项目"
date: 2026-06-27
tags: [OpenVLA, fine-tuning, tabletop, project, tutorial]
category: "Tutorials"
docGroup: "world-model-vla-tutorial"
order: 10
draft: false
---

# 项目 1：OpenVLA 微调实战

> 本项目的成果：一个可以写进简历的 VLA 微调项目——在自定义桌面任务上微调 OpenVLA，包含完整的训练、评测和分析。

## 项目目标

1. 理解 OpenVLA 的架构和推理流程
2. 在 SIMPLERENV 仿真中评测预训练 OpenVLA
3. 在自定义任务上用 LoRA 微调 OpenVLA
4. 分析不同训练设置的效果

## Step 1：环境准备

```bash
# 克隆 OpenVLA
git clone https://github.com/openvla/openvla.git
cd openvla

# 安装依赖
pip install -e .
pip install simplerenv  # SIMPLERENV 评测环境
```

## Step 2：跑通预训练 OpenVLA 推理

```python
from transformers import AutoModelForVision2Seq, AutoProcessor
from PIL import Image
import torch

# 加载预训练 OpenVLA
model = AutoModelForVision2Seq.from_pretrained(
    "openvla/openvla-7b",
    torch_dtype=torch.bfloat16,
    low_cpu_mem_usage=True,
    trust_remote_code=True,
).to("cuda")
processor = AutoProcessor.from_pretrained(
    "openvla/openvla-7b",
    trust_remote_code=True
)

# 推理：图像 + 语言指令 → 动作
image = Image.open("test_image.jpg")
instruction = "pick up the red block"

inputs = processor(instruction, image).to("cuda", dtype=torch.bfloat16)
action = model.predict_action(**inputs, unnorm_key="bridge_orig")
print(f"Predicted action: {action}")
# 输出 7 维动作：[x, y, z, rx, ry, rz, gripper]
```

### 理解 OpenVLA 的动作表示

OpenVLA 的动作是 7 维向量：
- `x, y, z`：末端执行器位置增量
- `rx, ry, rz`：末端执行器旋转增量
- `gripper`：夹爪开合（-1=关闭, 1=打开）

动作通过 **256-bin 离散化** 转为 token——和文本 token 一起用 LLM autoregressive 生成。

## Step 3：在 SIMPLERENV 中评测

```python
import simplerenv
import gym

def evaluate_openvla(model, processor, task_name="google_robot_pick_coke_can", num_episodes=20):
    """在 SIMPLERENV 中评测 OpenVLA"""
    env = gym.make(task_name)
    successes = 0

    for ep in range(num_episodes):
        obs = env.reset()
        done = False
        step_count = 0

        while not done and step_count < 200:
            # OpenVLA 推理
            image = obs["image"]
            instruction = task_name_to_instruction(task_name)

            inputs = processor(instruction, image).to("cuda", dtype=torch.bfloat16)
            action = model.predict_action(**inputs, unnorm_key="bridge_orig")

            obs, reward, done, info = env.step(action)
            step_count += 1

        if info.get("success", False):
            successes += 1
        print(f"Episode {ep+1}: {'Success' if info.get('success') else 'Failed'}")

    success_rate = successes / num_episodes
    print(f"\nSuccess rate: {success_rate:.1%}")
    return success_rate

# 预训练模型的基准表现
evaluate_openvla(model, processor)
```

## Step 4：用 LoRA 微调到自定义任务

```python
from peft import LoraConfig, get_peft_model

# LoRA 配置
lora_config = LoraConfig(
    r=32,
    lora_alpha=64,
    target_modules=["q_proj", "v_proj", "k_proj", "out_proj"],
    lora_dropout=0.05,
    bias="none",
)

# 应用 LoRA
model = get_peft_model(model, lora_config)
model.print_trainable_parameters()

# 准备自定义数据集
class CustomManipDataset(torch.utils.data.Dataset):
    def __init__(self, data_path, processor):
        self.data = load_data(data_path)  # 你的数据
        self.processor = processor

    def __len__(self):
        return len(self.data)

    def __getitem__(self, idx):
        item = self.data[idx]
        image = Image.open(item["image_path"])
        instruction = item["instruction"]
        action = torch.tensor(item["action"])

        inputs = self.processor(instruction, image)
        return {**inputs, "action": action}

# 训练
from torch.optim import AdamW

optimizer = AdamW(model.parameters(), lr=1e-4)
dataset = CustomManipDataset("data/custom_tasks/", processor)
loader = DataLoader(dataset, batch_size=4, shuffle=True)

for epoch in range(10):
    total_loss = 0
    for batch in loader:
        batch = {k: v.to("cuda") for k, v in batch.items()}

        outputs = model(**batch, labels=batch["action"])
        loss = outputs.loss

        optimizer.zero_grad()
        loss.backward()
        optimizer.step()
        total_loss += loss.item()

    print(f"Epoch {epoch+1}, Loss: {total_loss/len(loader):.4f}")
```

## Step 5：对比实验

### 实验 1：不同演示数量

| 演示数量 | 成功率 | 训练时间 |
|---|---|---|
| 10 条 | ? | 30 分钟 |
| 50 条 | ? | 2 小时 |
| 100 条 | ? | 4 小时 |
| 500 条 | ? | 12 小时 |

### 实验 2：LoRA rank 的影响

| LoRA rank | 可训练参数 | 成功率 |
|---|---|---|
| 8 | ~0.5M | ? |
| 16 | ~1M | ? |
| 32 | ~2M | ? |
| 64 | ~4M | ? |

### 实验 3：离散 token 数的影响

| Action bins | 精度 | 成功率 |
|---|---|---|
| 64 | 粗糙 | ? |
| 128 | 中等 | ? |
| 256 | OpenVLA 默认 | ? |
| 512 | 精细 | ? |

## 简历描述

```
CustomVLA: Fine-tuning OpenVLA for Custom Tabletop Manipulation

• Fine-tuned OpenVLA (7B parameters) on custom tabletop manipulation tasks
  using SIMPLERENV simulation environment
• Implemented LoRA fine-tuning strategy, achieving 80%+ success rate with
  only 50 demonstrations per task on a single RTX 4090
• Conducted ablation studies on demonstration count (10-500),
  LoRA rank (8-64), and action discretization granularity (64-512 bins)
• Built complete training and evaluation pipeline with W&B experiment tracking
• Key finding: Action discretization at 256 bins offers optimal trade-off
  between precision and token vocabulary size
```

## 验收标准

- [ ] 能跑通 OpenVLA 预训练模型的推理
- [ ] 能在 SIMPLERENV 中评测（至少跑 20 个 episode）
- [ ] 能用 LoRA 微调 OpenVLA 到自定义任务
- [ ] 完成至少 2 组对比实验
- [ ] 成功率 ≥70%（自定义任务）
- [ ] 代码可复现（有 README 和 requirements.txt）
