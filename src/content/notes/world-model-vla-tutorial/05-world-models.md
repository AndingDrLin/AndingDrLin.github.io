---
title: "第 5 章：世界模型"
description: "让机器人在'想象'中学习——从 DreamerV3 到扩散世界模型"
date: 2026-06-27
tags: [world-model, DreamerV3, DIAMOND, RSSM, diffusion, tutorial]
category: "Tutorials"
docGroup: "world-model-vla-tutorial"
order: 5
draft: false
---

# 第 5 章：世界模型

> "如果机器人能在脑子里预演一遍动作的结果，它就不需要每次都真的去做一遍才知道对不对。"——这就是世界模型的核心思想。

## 什么是世界模型？

世界模型（World Model）学习环境的动态规律：给定当前状态和动作，预测下一个状态和奖励。

$$s_{t+1}, r_t = f(s_t, a_t)$$

有了这个"模拟器"，agent 可以：
1. **在想象中规划**：不用真实交互，在模型中推演多种方案
2. **在想象中训练策略**：在世界模型里跑 RL，省去大量真实交互
3. **数据增强**：用想象数据补充稀缺的真实数据

**我目前的判断**：世界模型是具身智能从"数据饥渴"走向"数据高效"的关键。没有世界模型，VLA 只能靠堆数据；有了世界模型，机器人可以在想象中自我进化。DreamerV3 和 Cosmos 分别代表了两种路径——前者用 RL 在想象中训练策略，后者用视频生成做数据增强——两者都在快速推进。

## 世界模型的三个关键组件

```
               ┌─────────────┐
               │   视觉编码器  │  图像 → latent
               └──────┬───────┘
                      ↓
               ┌─────────────┐
               │   动态模型    │  h_t, a_t → h_{t+1}
               │  (RSSM等)    │  学习环境转移规律
               └──────┬───────┘
                      ↓
               ┌─────────────┐
               │   规划/策略   │  在 latent space 做 RL
               └─────────────┘
```

1. **视觉编码器（Encoder）**：把高维图像压缩为低维 latent 表示
2. **动态模型（Dynamics Model）**：在 latent space 学习状态转移
3. **策略学习（Policy）**：在想象的 rollout 中训练策略

## RSSM：循环状态空间模型

RSSM（Recurrent State-Space Model, Hafner et al., 2019）是 Dreamer 系列的核心架构：

$$\text{RSSM}: \begin{cases} h_t = f(h_{t-1}, z_{t-1}, a_{t-1}) & \text{(确定性路径: GRU)} \\ z_t \sim p(z_t | h_t, o_t) & \text{(随机路径: posterior)} \\ \hat{z}_t \sim p(\hat{z}_t | h_t) & \text{(随机路径: prior, 用于想象)} \end{cases}$$

- **确定性路径（h）**：GRU 递归，捕捉时间依赖
- **随机路径（z）**：离散/连续隐变量，建模不确定性
- **训练时用 posterior**（看到真实观测），**想象时用 prior**（不看真实观测）

### 为什么 RSSM 有效？

- **确定性 + 随机**：h 捕捉确定性规律（物体运动轨迹），z 建模随机性（碰撞后去哪）
- **想象时不需要真实观测**：prior 从历史推断未来，不依赖当前图像
- **离散化隐变量**（DreamerV2/V3）：用 categorical distribution，表达力更强

## DreamerV3：通用世界模型 RL

DreamerV3（Hafner et al., 2023, Nature 2024）是当前世界模型 RL 的 SOTA。三个关键创新让它"一配通"：

### 创新一：Symlog Predictions

预测高方差目标（如奖励、值函数）时，用对称对数变换：

$$\text{symlog}(x) = \text{sign}(x) \cdot \log(1 + |x)|$$

这避免了预测大数值时的梯度爆炸问题。

### 创新二：Free Bits

训练 posterior 分布时，加 KL 散度正则化。但过强的 KL 会让 posterior 崩塌。Free bits 机制设定最低信息量阈值。

### 创新三：统一超参数

一套超参数搞定 Atari、DmControl、Minecraft 等 150+ 任务。

### 代码：用 DreamerV3 训练

```bash
# 克隆 DreamerV3
git clone https://github.com/danijar/dreamerv3.git
cd dreamerv3

# 训练 DmControl 任务
python dreamerv3/train.py \
  --configs defaults dmc_vision \
  --task dmc_walker_walk \
  --run.logdir ./logdir/dmc_walker
```

DreamerV3 使用 JAX，如果你更熟悉 PyTorch，可以参考社区复现。

### 训练流程解析

```
1. 收集初始数据（随机策略）
2. 循环：
   a. 用真实数据训练世界模型（encoder + RSSM + decoder + reward head）
   b. 在世界模型的想象中训练策略（actor-critic）
   c. 用策略在真实环境中收集新数据
   d. 回到 (a)
```

关键：策略只在想象中训练，真实环境交互主要用于收集数据更新世界模型。

## DIAMOND：扩散世界模型

DIAMOND（Alonso et al., 2024）用扩散模型替代 RSSM 作为世界模型：

### 核心思路

传统世界模型在 latent space 预测下一状态。DIAMOND 直接在像素空间用扩散模型预测下一帧：

$$o_{t+1} \sim p_\theta(o_{t+1} | o_{\leq t}, a_{\leq t})$$

### 为什么扩散模型更好？

| 维度 | RSSM | Diffusion |
|---|---|---|
| **图像质量** | 有模糊（重建损失的通病） | 高保真 |
| **长程一致性** | 好（递归结构） | 需要处理（但可解决） |
| **训练稳定性** | 更稳定 | 需要调扩散步数 |
| **计算成本** | 低 | 高（多次去噪） |

### DIAMOND 的结果

在 Atari 100K benchmark 上，DIAMOND 用扩散世界模型训练的 agent 达到了人类水平——这是 world model RL 在 Atari 上的 SOTA。

### 代码概览

```python
# DIAMOND 的世界模型结构（简化）
class DiffusionWorldModel(nn.Module):
    def __init__(self, num_diffusion_steps=100):
        super().__init__()
        # 视觉编码
        self.encoder = nn.Sequential(
            nn.Conv2d(3, 64, 4, stride=2), nn.ReLU(),
            nn.Conv2d(64, 128, 4, stride=2), nn.ReLU(),
        )
        # 扩散去噪网络（预测下一帧的 latent）
        self.denoiser = UNet2D(
            in_channels=128 + action_dim,  # latent + action
            out_channels=128,
        )
        self.decoder = nn.Sequential(
            nn.ConvTranspose2d(128, 64, 4, stride=2), nn.ReLU(),
            nn.ConvTranspose2d(64, 3, 4, stride=2), nn.Sigmoid(),
        )
        self.scheduler = DDPMScheduler(num_train_timesteps=num_diffusion_steps)

    def imagine(self, current_latent, action, steps=1):
        """在世界模型中想象未来"""
        latents = [current_latent]
        for _ in range(steps):
            # 扩散采样下一帧
            noise = torch.randn_like(current_latent)
            for t in self.scheduler.timesteps:
                pred_noise = self.denoiser(
                    torch.cat([noise, action], dim=1), t
                )
                noise = self.scheduler.step(pred_noise, t, noise).prev_sample
            latents.append(noise)
            current_latent = noise
        return latents
```

## Cosmos：面向物理 AI 的世界模型平台

Cosmos（NVIDIA, 2025）把世界模型从 Atari/DmControl 推向了真实世界：

### 核心理念

- 大规模视频生成模型 + 物理引擎约束 = 机器人世界模型
- 预训练：用海量互联网视频学会视觉先验
- 微调：用机器人数据适配特定场景

### 架构

```
大规模视频数据 → Cosmos Tokenizer → 世界模型 (Transformer/Diffusion)
                                           ↓
机器人数据微调 → 特定场景世界模型 → GR00T VLA 使用
```

### Cosmos 的意义

1. **世界模型从"研究概念"变成"工程基础设施"**
2. **与 VLA 生态直接对接**：GR00T 用 Cosmos 做数据增强和仿真
3. **开源**：模型和训练代码都开源

但硬件门槛高（A100 80GB），学习时以理解架构为主。

## 世界模型用于 VLA：三个方向

### 方向一：想象增强策略学习
在世界模型中生成额外的训练数据，扩充稀缺的机器人演示数据。

### 方向二：模型预测控制（MPC）
不训练策略网络，直接在世界模型中规划：对每一步，用世界模型评估多个动作序列，选最好的。

### 方向三：视频预测辅助 VLA
用世界模型预测未来视觉帧，VLA 可以利用这些"预判"来决策。

这三个方向是当前研究的热点，也是本教程第 6 章的核心内容。

## 练习

### 练习 1：跑通 DreamerV3 训练
在 DmControl 的 walker_walk 任务上训练 DreamerV3。记录：
- 世界模型的重建质量（对比真实帧和重建帧）
- 策略奖励随训练步数的变化

### 练习 2：分析 RSSM 的 latent space
对训练好的 DreamerV3，提取 latent vectors (h, z)，用 t-SNE 可视化。观察：
- 不同状态是否聚类？
- latent 空间是否有可解释的结构？

### 练习 3：理解扩散世界模型
阅读 DIAMOND 代码，回答：
- 扩散模型预测的是像素还是 latent？
- 训练世界模型的 loss 和训练策略的 loss 有什么区别？
- 为什么扩散世界模型比 RSSM 生成的图像更清晰？

## 常见踩坑 FAQ

**Q：世界模型和 VLA 是什么关系？**
A：两者解决不同问题。VLA 端到端地从观测映射到动作；世界模型学习环境动力学，用于规划和数据增强。可以独立使用，也可以结合（第 6 章）。

**Q：DreamerV3 用 JAX，不会 JAX 怎么办？**
A：理解 RSSM 和训练流程的概念更重要，不一定自己写代码。社区有 PyTorch 复现。LeRobot 也集成了 TDMPC（另一种 model-based 方法）。

**Q：世界模型训练需要多少数据？**
A：DreamerV3 在 DmControl 上用 100K 环境步就能学好。但视觉世界模型（DIAMOND）通常需要更多数据。真实场景的世界模型（Cosmos）需要海量视频。

**Q：世界模型能直接用于真实机器人吗？**
A：DayDreamer 证明了可以。但通常需要在仿真中预训练世界模型，再在真实环境中少量 fine-tune。这是 Sim2Real 的一部分（第 8 章）。
