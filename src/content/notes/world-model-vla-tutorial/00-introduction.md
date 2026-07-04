---
title: "第 0 章：导论与环境搭建"
description: "理解具身智能的核心问题，搭建开发环境"
date: 2026-06-27
tags: [VLA, world-model, embodied-AI, tutorial, setup]
category: "Tutorials"
docGroup: "world-model-vla-tutorial"
order: 0
draft: false
---

# 第 0 章：导论与环境搭建

**学完本章，你将能够：**

- 用自己的话解释 VLA、世界模型（World Model）、具身 Agent（Embodied Agent）分别是什么、为什么重要
- 说出 3-5 个在做具身智能的公司和它们各自的技术路线
- 搭建一套完整的 Python 开发环境：PyTorch + MuJoCo + robosuite + LeRobot + transformers
- 跑通验证脚本，确认所有工具链正常工作

---

## 0.1 从一个具体任务说起：叠毛巾

不要从“具身智能将改变世界”开始。我们从一个问题开始：**让机器人把一条皱巴巴的毛巾叠好。**

这件人做起来毫不费力的事，对机器人来说接近噩梦。原因有三个：

1. **毛巾不是刚体。** 它会变形、打皱、滑动。你没法像抓一个方块那样用固定轨迹去操作它。
2. **每条毛巾都不一样。** 皱褶的位置、大小、材质全都不同。你不可能为每种情况写一条规则。
3. **看不到就抓不准。** 你抓起毛巾的一角时，遮挡会改变你对整条毛巾形状的判断。机器人需要“猜”被遮住的部分长什么样。

传统机器人是怎么解决这类问题的？简单说：不解决。传统工业机器人靠的是精确的运动规划（motion planning）+ 刚性的执行器（rigid end-effector），它的世界里只有已知形状的物体和预定义的轨迹。放一个没见过的东西，它就抓瞎了。

**VLA + 世界模型 + 具身 Agent 这条技术路线的出发点，就是解决这类“传统方法根本没辙”的问题。** 具体来说：

- **VLA（Vision-Language-Action）** 解决“从视觉到动作”的映射——机器人看到什么，就应该做什么动作。
- **世界模型（World Model）** 解决“我做了这个动作之后，世界会变成什么样”——在真正执行之前先“想象”一下结果。
- **具身 Agent（Embodied Agent）** 解决“在不确定环境里，应该先做什么、再做什么”——把高层推理和底层执行串起来。

说白了，这就是把大语言模型在文本领域证明过有效的方法（预训练 + 微调 + 生成式推理），搬到了物理世界。

---

## 0.2 三个核心概念

### VLA：从“看”到“做”的桥梁

**VLA（Vision-Language-Action Model，视觉-语言-动作模型）** 是一种端到端模型：输入一张图片（和可选的语言指令），直接输出机器人应该执行的动作序列（action）。

传统 pipeline 是这样的：

```
相机图像 → 感知模块(物体检测/分割) → 状态估计 → 运动规划 → 控制器
```

每一步都是独立模块，信息传递有损耗，误差会级联放大。VLA 的做法是把这些中间步骤全跳过：

```
相机图像 + 语言指令 → VLA 模型 → 动作序列 → 执行
```

这不是理论上的设想。2023 年 Google DeepMind 的 RT-2 论文首次证明：把一个在互联网图文数据上预训练好的 VLM（Vision-Language Model）拿来微调，让它输出机器人动作 token，效果比专门训练的机器人策略好很多——尤其在没见过的物体和指令上。关键原因是 VLM 从海量互联网数据中学到的语义知识可以直接迁移到机器人控制。

后来 Stanford 的 **OpenVLA** 把这条路线完全开源了，7B 参数、基于 Open X-Embodiment 数据集（约 97 万条机器人操作轨迹）训练，任何人下载就能用。Physical Intelligence 的 **pi0** 更进一步，用 flow matching 生成连续动作空间，在多种机器人平台上实现了跨本体迁移（cross-embodiment transfer）。

> **一句话记住 VLA：** 大模型预训练学会“看”和“说”，微调后学会“做”——看、说、做一体。

### 世界模型：先“想”再“做”

**世界模型（World Model）** 学习环境的动态规律：给定当前状态和动作，预测下一个状态。有了它，机器人可以在脑子里“模拟”一系列动作的后果，再决定真正执行哪一个。

这个概念最早在强化学习里被证明有用。2023 年 DeepMind 的 **DreamerV3** 是里程碑——它只用一套超参数，就在 Atari、DMC、Minecraft 三个完全不同的领域做到了人类水平以上，整个训练过程都是在“想象”中完成的，不需要真实环境交互。

世界模型对具身智能为什么特别重要？两个原因：

1. **数据效率。** 真实机器人采集数据极其昂贵（一条轨迹可能要几十秒，而且机器人会磨损）。如果能在世界模型里先做 1000 次“想象训练”，再在真实环境验证 10 次，数据需求就降了两个数量级。
2. **安全。** 机器人在世界模型里“想”到某个动作会导致倾倒，就可以直接放弃，不用真的去摔一次。

2025 年初 NVIDIA 发布的 **Cosmos** 平台把世界模型从研究概念推向了工程化——它提供物理世界的基础世界模型，与 Isaac Sim 等 NVIDIA 仿真生态形成互补，供机器人厂商训练使用。

> **一句话记住世界模型：** 机器人在脑子里做实验，省时省钱还不怕摔。

### 具身 Agent：当推理遇到物理

**具身 Agent（Embodied Agent）** 是把 LLM/VLM 的推理能力引入机器人系统的架构。它的核心思想：用大模型做高层的任务规划（“先把毛巾拿起左角，再对折到右角”），用底层的控制器做具体执行（关节角度、力矩）。

这不是新鲜概念——机器人学里早就有层次化控制（hierarchical control），但以前的高层规划器太笨了，只能处理预定义的动作原语（action primitives）。LLM 改变了这一点：它能理解自然语言指令，能做常识推理，能从错误中调整计划。

一个典型的具身 Agent 架构：

```
用户指令 "把毛巾叠好"
        ↓
  LLM/VLM 规划器：分解为子任务序列
        ↓
  VLA 执行器：每个子任务转为机器人动作
        ↓
  世界模型：验证动作是否安全合理
        ↓
  机器人执行 → 观察结果 → 反馈给规划器
```

这条路线目前最大的挑战是什么？**延迟（latency）。** LLM 推理慢（几百毫秒到几秒），而机器人控制需要毫秒级响应。所以实际系统会在 LLM 规划和底层控制之间插入一个“快反应层”——通常是 VLA 或 Diffusion Policy，它能在几十毫秒内把高层意图转成低层动作。

> **一句话记住具身 Agent：** 用大模型当“大脑”思考要做什么，用 VLA 当“小脑”控制怎么做。

---

## 0.3 行业全景：谁在做这个？

截至 2025 年，具身智能赛道的竞争格局大致如下：

| 公司 | 代表产品/模型 | 技术路线 | 状态 |
|---|---|---|---|
| **Google DeepMind** | RT-2, Gemini Robotics | VLA + VLM 预训练 | 学术主导，持续出论文 |
| **Physical Intelligence** | pi0, pi0.5 | VLA + flow matching + 跨本体迁移 | 融资约 4 亿美元，估值 20 亿+ |
| **Tesla** | Optimus 人形机器人 | 自动驾驶技术栈迁移 | 内部工厂测试中 |
| **Figure AI** | Figure 02 人形机器人 | VLA + OpenAI 合作 | 融资约 6.75 亿美元，与 BMW 合作 |
| **NVIDIA** | Cosmos, GR00T, Isaac Sim | 世界模型平台 + 仿真基础设施 | 为整个行业提供底层工具 |
| **Agility Robotics** | Digit 双足机器人 | 硬件 + 物流场景 | RoboFab 年产能 1 万台，Amazon 试点 |
| **1X Technologies** | NEO 人形机器人 | OpenAI 投资支持 | 家用/商用场景开发中 |
| **银河通用 (Galaxea AI)** | 通用人形机器人 | 基础模型 + 操作 | 国内头部具身智能创业公司 |

> **求职者需要注意的一个判断：** 这个赛道目前仍然是“论文比产品多”的阶段。Tesla 的 Optimus 时间表一推再推，Figure AI 还没开始量产。对于求职来说，这意味着：**公司更看重你有没有真正动手做过项目**，而不是你对这些公司了解多少。简历上写“我用 OpenVLA 在 robosuite 上微调了一个自定义任务”比写“我关注具身智能赛道”有价值一百倍。

---

## 0.4 学习路线建议

这个教程的设计是**先打地基，再学核心，最后集成应用**：

```
阶段 1：基础（第 0-2 章）
├── 第 0 章：导论与环境       ← 你现在在这里
├── 第 1 章：视觉表示学习     ← 理解"看"是怎么工作的
└── 第 2 章：VLM 基础        ← 理解"看 + 说"是怎么结合的

阶段 2：核心技术（第 3-5 章）
├── 第 3 章：模仿学习         ← 数据驱动的机器人控制入门
├── 第 4 章：VLA 模型 ⭐      ← 全教程核心，一定要吃透
└── 第 5 章：世界模型          ← 你的技术差异化关键

阶段 3：系统集成（第 6-8 章）
├── 第 6 章：VLA + 世界模型融合
├── 第 7 章：具身 Agent 架构 ⭐ ← 简历核心亮点
└── 第 8 章：Sim2Real 迁移     ← 从仿真到真实

阶段 4：毕业项目（项目 1-3）
├── 项目 1：OpenVLA 微调实战   ← 1 周
├── 项目 2：世界模型训练        ← 1.5 周
└── 项目 3：VLM-Agent 系统 🎓  ← 2 周，简历核心
```

**核心建议：**

1. **先跑通，再理解。** 第 3 章的代码示例先跑一遍，看到机器人真的在动，再去啃 VLA 论文。
2. **第 4 章是最重要的。** 如果时间有限，优先保证第 2、4 章 + 项目 1 学扎实。
3. **不要跳过练习。** 看懂代码和能写代码是两回事。每章末尾的 3 个练习（基础 / 进阶 / 挑战）是巩固知识的关键。

> **时间有限？** 优先保证第 2、4、7 章 + 项目 1 和 3 学扎实。这几章 + 两个项目足够你写出一份有竞争力的简历。

---

## 0.5 环境搭建

接下来我们搭建开发环境。整个教程用到的核心工具链：

| 工具 | 用途 | 首次出场 |
|---|---|---|
| **PyTorch** | 深度学习框架 | 第 0 章 |
| **transformers** | 加载预训练模型（VLA、VLM） | 第 2 章 |
| **MuJoCo** | 物理仿真引擎 | 第 3 章 |
| **robosuite** | 基于 MuJoCo 的机器人操作环境 | 第 3 章 |
| **LeRobot** | HuggingFace 的机器人学习框架 | 第 3 章 |
| **wandb** | 实验跟踪 | 第 4 章 |

> **按需安装：** 你不需要一次性装完所有依赖。第 0-2 章只需要 PyTorch 和 transformers。MuJoCo 和 robosuite 在第 3 章才用到。但建议现在就走完全部安装流程，确保环境没问题。

### 第 1 步：确认 Python 版本

```bash
python --version
# 应该显示 Python 3.10.x 或更高版本
```

版本低于 3.10 的话，用 Miniconda 创建新环境：

```bash
conda create -n embodied python=3.11 -y
conda activate embodied
```

### 第 2 步：创建项目目录和虚拟环境

```bash
mkdir wm-vla-tutorial && cd wm-vla-tutorial

# 创建虚拟环境（如果不用 conda 的话）
python -m venv .venv

# 激活
source .venv/bin/activate     # macOS / Linux
# .venv\Scripts\activate      # Windows
```

> **为什么要用虚拟环境？** 具身智能项目的依赖链很长——PyTorch、MuJoCo、robosuite、transformers 各有自己的版本要求。不用虚拟环境，迟早会遇到包冲突。虚拟环境就是给每个项目一个独立的“小房间”，互不干扰。

### 第 3 步：安装 PyTorch

```bash
# CUDA 12.1 版本（推荐，适用于大部分 RTX 30/40 系列显卡）
pip install torch torchvision --index-url https://download.pytorch.org/whl/cu121
```

> **没有 NVIDIA GPU？** 也可以装 CPU 版本先学习理论部分：`pip install torch torchvision`。但到第 4 章训练 VLA 模型时，必须有 GPU（建议 RTX 3090/4090，24GB 显存）。

### 第 4 步：安装 MuJoCo

```bash
pip install mujoco
```

MuJoCo 现在是 Google DeepMind 维护的开源项目，直接 pip 安装即可。不再需要旧时代的 `mujoco-py`（那个包需要编译，各种坑）。

安装完验证一下：

```bash
python -c "import mujoco; print(f'MuJoCo {mujoco.__version__}')"
```

### 第 5 步：安装 robosuite

```bash
pip install robosuite
```

robosuite 是 Stanford ARISE-Initiative 维护的机器人操作环境库，底层用 MuJoCo。它提供了现成的 Panda、UR5e 等机械臂和 Lift、PickPlace 等标准任务，后面第 3 章会大量使用。

### 第 6 步：安装 LeRobot

```bash
pip install lerobot
```

LeRobot 是 HuggingFace 的机器人学习框架，目标是“训练机器人像微调大模型一样简单”。它提供了 ACT（Action Chunking with Transformers）、Diffusion Policy 等模仿学习算法的现成实现，数据集也可以直接从 HuggingFace Hub 下载。

> **安装问题排查：** LeRobot 依赖较多，如果安装失败，先确认 PyTorch 已经正确安装。常见问题是 NumPy 版本冲突——如果报错 `numpy.dtype size changed`，运行 `pip install numpy --upgrade` 升级到 2.x。

### 第 7 步：安装 transformers 和其他工具

```bash
pip install transformers accelerate peft wandb Pillow
```

- `transformers`：加载预训练 VLA/VLM 模型（OpenVLA、Qwen2-VL 等）
- `accelerate`：多 GPU / 混合精度训练
- `peft`：LoRA 等参数高效微调方法（后面项目会用到）
- `wandb`：实验跟踪，记录 loss 曲线、图片、指标
- `Pillow`：图像处理

### 第 8 步：完整依赖列表（可选）

如果你想一次性安装所有依赖，创建 `requirements.txt`：

```txt
torch
torchvision
mujoco>=3.0
robosuite>=1.4
lerobot
transformers>=4.40
accelerate
peft
wandb
Pillow
numpy
```

然后：

```bash
pip install -r requirements.txt
```

---

## 0.6 验证脚本

把下面的代码保存为 `test_env.py`，运行它确认所有工具链正常：

```python
# test_env.py — 验证具身智能开发环境
import sys

print("=" * 50)
print(f"Python: {sys.version}")
print("=" * 50)

# 1. PyTorch + CUDA
try:
    import torch
    print(f"PyTorch:  {torch.__version__}")
    print(f"CUDA:     {torch.cuda.is_available()}")
    if torch.cuda.is_available():
        print(f"GPU:      {torch.cuda.get_device_name(0)}")
        print(f"VRAM:     {torch.cuda.get_device_properties(0).total_mem / 1024**3:.1f} GB")
    else:
        print("WARNING:  No CUDA GPU detected. Training will be very slow.")
except ImportError:
    print("FAIL:     PyTorch not installed")

# 2. MuJoCo
try:
    import mujoco
    print(f"MuJoCo:   {mujoco.__version__}")
    # 快速功能测试：加载内置 XML 并跑一步仿真
    model = mujoco.MjModel.from_xml_string(
        '<mujoco><worldbody>'
        '<light diffuse=".5 .5 .5" pos="0 0 3" dir="0 0 -1"/>'
        '<geom type="plane" size="1 1 0.1" rgba=".9 .9 .9 1"/>'
        '<body pos="0 0 1"><geom type="sphere" size="0.1"/></body>'
        '</worldbody></mujoco>'
    )
    data = mujoco.MjData(model)
    mujoco.mj_step(model, data)
    print("MuJoCo:   simulation step OK")
except ImportError:
    print("WARNING:  MuJoCo not installed (not needed until Chapter 3)")
except Exception as e:
    print(f"WARNING:  MuJoCo loaded but simulation failed: {e}")

# 3. robosuite
try:
    import robosuite
    print(f"robosuite: {robosuite.__version__}")
except ImportError:
    print("WARNING:  robosuite not installed (not needed until Chapter 3)")

# 4. Transformers
try:
    import transformers
    print(f"transformers: {transformers.__version__}")
except ImportError:
    print("WARNING:  transformers not installed")

# 5. LeRobot
try:
    import lerobot
    print("LeRobot:  loaded OK")
except ImportError:
    print("WARNING:  LeRobot not installed (not needed until Chapter 3)")

# 6. wandb
try:
    import wandb
    print(f"wandb:    {wandb.__version__}")
except ImportError:
    print("WARNING:  wandb not installed (not needed until Chapter 4)")

print("=" * 50)
print("DONE. Check above for any FAIL or WARNING messages.")
```

运行：

```bash
python test_env.py
```

预期输出（有 GPU 的情况）：

```
==================================================
Python: 3.11.x (...)
==================================================
PyTorch:  2.x.x
CUDA:     True
GPU:      NVIDIA GeForce RTX 4090
VRAM:     24.0 GB
MuJoCo:   3.x.x
MuJoCo:   simulation step OK
robosuite: 1.5.x
transformers: 4.x.x
LeRobot:  loaded OK
wandb:    0.x.x
==================================================
DONE. Check above for any FAIL or WARNING messages.
```

> **没有 GPU 也能继续学。** 前 2 章的代码示例主要用 CPU 推理小型 VLM 模型，不需要 GPU。但从第 4 章开始训练 VLA 模型时，24GB 显存是硬需求。如果本地没有 GPU，可以用 Google Colab Pro（约 $10/月，有 T4/A100）。

---

## 0.7 动手练习

### 练习 1（基础）：MuJoCo “Hello World”

在 MuJoCo 中加载一个 XML 模型，包含一个自由下落的球体和一个平面。用离屏渲染器（offscreen renderer）渲染一帧图像并保存为 PNG。

**提示：**

- 用 `mujoco.MjModel.from_xml_string()` 加载内联 XML
- 用 `mujoco.Renderer(model, height=480, width=640)` 创建渲染器
- 用 `PIL.Image.fromarray(pixels).save("frame.png")` 保存

### 练习 2（进阶）：robosuite 随机动作

用 robosuite 创建 `Lift` 环境（Panda 机械臂），让机械臂执行 200 步随机动作，记录每一步的 reward。打印：总共多少步拿到了正 reward？机械臂有没有成功抬起物体？

**提示：**

- `env = suite.make(env_name="Lift", robots="Panda", has_renderer=False, ...)`
- `action = np.random.randn(env.robots[0].dof)` 生成随机动作
- reward > 0 通常表示物体被抬起了

### 练习 3（挑战）：VLM 描述场景

用 transformers 加载一个轻量级 VLM（比如 `Qwen/Qwen2-VL-2B-Instruct`），给它一张机器人场景的图片（可以用练习 1 渲染的那张），让它描述图中有什么。

**提示：**

- 用 `pipeline("image-text-to-text", model="Qwen/Qwen2-VL-2B-Instruct", torch_dtype=torch.bfloat16, device_map="auto")` 加载模型
- 2B 参数的模型只需要约 5GB 显存，没有 GPU 也能用 CPU 跑（但会很慢）

---

## 0.8 常见踩坑 FAQ

### Q: `pip install mujoco` 报错 `No matching distribution found`

你可能在用过旧的 Python 版本。MuJoCo 的 Python 包要求 Python 3.9+。确认版本：

```bash
python --version
```

如果版本没问题但仍报错，可能是 pip 版本太旧：

```bash
pip install --upgrade pip
pip install mujoco
```

### Q: robosuite 安装后 `import robosuite` 报错 `OpenGL` 相关错误

robosuite 的渲染依赖 OpenGL。在无显示器的服务器上，你需要安装 `osmesa`：

```bash
# Ubuntu
sudo apt-get install libgl1-mesa-glx libosmesa6-dev

# 然后设置环境变量
export MUJOCO_GL=osmesa
```

在 Windows 上通常不会有这个问题，但如果你用 WSL，需要安装 mesa 驱动。

### Q: PyTorch 安装成功但 `torch.cuda.is_available()` 返回 `False`

最常见的原因：装了 CPU 版本的 PyTorch。确认安装命令中包含 `--index-url https://download.pytorch.org/whl/cu121`（或你对应 CUDA 版本的 URL）。

另一个常见原因：NVIDIA 驱动版本太旧。运行 `nvidia-smi` 确认驱动正常，CUDA 版本 >= 12.1。

```bash
# 重新安装正确版本
pip uninstall torch torchvision -y
pip install torch torchvision --index-url https://download.pytorch.org/whl/cu121
```

### Q: `transformers` 加载模型时报 `trust_remote_code` 相关警告

这是正常的。OpenVLA 等模型使用了自定义模型代码（不是 transformers 内置的模型类），加载时需要加 `trust_remote_code=True`：

```python
model = AutoModelForVision2Seq.from_pretrained(
    "openvla/openvla-7b",
    trust_remote_code=True,
)
```

> **安全提示：** `trust_remote_code=True` 意味着你会运行模型仓库中的任意 Python 代码。只在你信任的模型仓库上使用。

### Q: LeRobot 安装时报 NumPy 版本冲突

LeRobot 的依赖链很深，容易和已有环境冲突。推荐的做法是在干净的虚拟环境里安装：

```bash
python -m venv .venv_lerobot
source .venv_lerobot/bin/activate
pip install numpy --upgrade   # 先确保 numpy 是 2.x
pip install lerobot
```

### Q: MuJoCo 渲染出来的图像是全黑的

默认的相机位置可能没有对准物体。加载模型后需要设置相机：

```python
renderer = mujoco.Renderer(model, height=480, width=640)
renderer.update_scene(data, camera=-1)  # -1 表示默认自由相机
# 或者指定自定义相机
renderer.update_scene(data, camera="track")
```

如果还是黑的，检查 XML 中是否定义了 `<light>` 元素——没有光源，什么也看不见。

### Q: 没有 GPU 能学这个教程吗？

前 3 章的理论和简单代码可以，但项目必须有 GPU。没有本地 GPU 的替代方案：

- **Google Colab Pro**（约 $10/月，有 T4/A100）
- **AutoDL / 矩池云** 等国内 GPU 云平台（按小时计费，RTX 4090 大约 2-3 元/小时）

### Q: PyTorch 还是 JAX？

主流选 PyTorch。只有 DreamerV3 和 Google 的 Octo 用 JAX，本教程统一用 PyTorch。

---

准备好环境了？下一章我们进入核心内容：[视觉表示学习](/notes/tutorial/world-model-vla-agent/01-visual-representation/)。
