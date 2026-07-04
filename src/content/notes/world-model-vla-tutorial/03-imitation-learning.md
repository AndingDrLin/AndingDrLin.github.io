---
title: "第 3 章：模仿学习与行为克隆"
description: "让机器人通过'看演示'学会操作——从 Behavior Cloning 到 ACT 和 Diffusion Policy"
date: 2026-06-27
tags: [imitation-learning, behavior-cloning, ACT, diffusion-policy, tutorial]
category: "Tutorials"
docGroup: "world-model-vla-tutorial"
order: 3
draft: false
---

# 第 3 章：模仿学习与行为克隆

> 最直觉的机器人学习方式：让人演示一遍，让机器人学着做。听起来简单，但这个“学”的方式决定了策略的好坏。

## 为什么从模仿学习开始？

在 VLA 模型出现之前，模仿学习（Imitation Learning, IL）是机器人操控的主流方法。即使在 VLA 时代，模仿学习仍然是 VLA 训练的基础——RT-2 的训练数据就是人类演示，OpenVLA 用的是 Open X-Embodiment 中的行为克隆数据。

理解模仿学习，就是理解 VLA 的数据从哪来、训练目标是什么。

## Behavior Cloning（BC）：最简单的模仿学习

### 核心思想

给定一批人类演示数据 $D = \{(s_t, a_t)\}$，其中 $s_t$ 是观测（图像、关节状态等），$a_t$ 是动作（关节角度、末端位置等），训练一个策略网络 $\pi_\theta$：

$$\min_\theta \mathbb{E}_{(s,a) \sim D} [\mathcal{L}(\pi_\theta(s), a)]$$

说白了：把“看图做事”当成一个监督学习问题。

### 代码：在 robosuite 上做 BC

```python
import numpy as np
import torch
import torch.nn as nn
from torch.utils.data import DataLoader, Dataset
import robosuite as suite

# 1. 数据采集
def collect_demos(env_name="Lift", num_episodes=50):
    """用键盘/鼠标控制采集演示数据（简化版用随机策略）"""
    env = suite.make(
        env_name,
        robots="Panda",
        has_renderer=False,
        has_offscreen_renderer=True,
        use_camera_obs=True,
        camera_names="agentview",
    )
    demos = []
    for ep in range(num_episodes):
        obs = env.reset()
        done = False
        while not done:
            # 这里用启发式策略代替人类演示
            # 实际项目中应该用遥操作或人类示教
            action = env.action_space.sample()  # 替换为真实策略
            next_obs, reward, done, info = env.step(action)
            demos.append({
                "image": obs["agentview_image"],
                "state": obs["robot0_eef_pos"],
                "action": action,
            })
            obs = next_obs
    env.close()
    return demos

# 2. Dataset
class RobotDemoDataset(Dataset):
    def __init__(self, demos):
        self.images = torch.tensor(np.array([d["image"] for d in demos])).float() / 255.0
        self.states = torch.tensor(np.array([d["state"] for d in demos])).float()
        self.actions = torch.tensor(np.array([d["action"] for d in demos])).float()

    def __len__(self):
        return len(self.actions)

    def __getitem__(self, idx):
        return self.images[idx], self.states[idx], self.actions[idx]

# 3. 简单的 BC 策略网络
class BCPolicy(nn.Module):
    def __init__(self, state_dim=3, action_dim=7):
        super().__init__()
        self.net = nn.Sequential(
            nn.Linear(state_dim, 256),
            nn.ReLU(),
            nn.Linear(256, 256),
            nn.ReLU(),
            nn.Linear(256, action_dim),
            nn.Tanh(),  # 动作范围 [-1, 1]
        )

    def forward(self, state):
        return self.net(state)

# 4. 训练
def train_bc():
    demos = collect_demos(num_episodes=50)
    dataset = RobotDemoDataset(demos)
    loader = DataLoader(dataset, batch_size=64, shuffle=True)

    policy = BCPolicy().cuda()
    optimizer = torch.optim.Adam(policy.parameters(), lr=1e-3)
    loss_fn = nn.MSELoss()

    for epoch in range(100):
        total_loss = 0
        for images, states, actions in loader:
            states, actions = states.cuda(), actions.cuda()
            pred_actions = policy(states)
            loss = loss_fn(pred_actions, actions)

            optimizer.zero_grad()
            loss.backward()
            optimizer.step()
            total_loss += loss.item()

        if (epoch + 1) % 10 == 0:
            print(f"Epoch {epoch+1}, Loss: {total_loss/len(loader):.4f}")

train_bc()
```

### BC 的致命问题：分布偏移（Distribution Shift）

BC 的核心假设是训练数据的分布和测试时的分布一致。但实际部署时，策略会犯小错，进入训练数据中没见过的状态，然后犯更大的错——雪崩效应。

$$p_{\text{test}}(s_t) \neq p_{\text{train}}(s_t)$$

这就是 **covariate shift** 问题。

## DAgger：在线修正

DAgger（Dataset Aggregation, Ross et al., 2011）的思路是：

1. 用当前策略跑一遍
2. 让人类标注当前状态下的正确动作
3. 把新数据加入训练集
4. 重复

```
迭代 1: BC 策略 → 犯错 → 人类标注 → 扩充数据
迭代 2: 更好的 BC 策略 → 犯更少的错 → 人类标注 → ...
迭代 N: 策略足够好
```

DAgger 解决了分布偏移，但需要在线人类标注——这在机器人场景中代价很高。

## ACT：Action Chunking with Transformers

ACT（Zhao et al., 2023）是当前最流行的模仿学习算法之一，有两个关键创新：

### 创新一：Action Chunking（动作分块）

不预测当前时刻的单步动作，而是预测未来 K 步的动作序列：

$$\pi_\theta(s_t) = [a_t, a_{t+1}, ..., a_{t+K-1}]$$

好处：
- 减少 compounding error（每步只执行预测序列的第一步，然后重新预测）
- 捕捉动作的时间相关性
- 类似于视频预测中的“预测多帧”

### 创新二：CVAE 训练（Conditional Variational Autoencoder）

人类演示中，同一个目标可能有多种完成方式。用 CVAE 建模这种多模态分布：

- **编码器**：把 (状态, 动作) 编码为隐变量 z
- **解码器**：给定 (状态, z)，生成动作序列
- **训练**：最大化证据下界 (ELBO)
- **推理**：z 从先验分布采样（或用均值）

```python
# ACT 的核心结构（简化）
class ACTPolicy(nn.Module):
    def __init__(self, obs_dim, action_dim, chunk_size=20, latent_dim=32):
        super().__init__()
        self.chunk_size = chunk_size

        # 视觉编码器
        self.image_encoder = nn.Sequential(
            nn.Conv2d(3, 32, 3, stride=2), nn.ReLU(),
            nn.Conv2d(32, 64, 3, stride=2), nn.ReLU(),
            nn.AdaptiveAvgPool2d(4),
            nn.Flatten(),
        )

        # Transformer decoder（核心）
        decoder_layer = nn.TransformerDecoderLayer(
            d_model=512, nhead=8, dim_feedforward=1024
        )
        self.decoder = nn.TransformerDecoder(decoder_layer, num_layers=4)

        # 输出头：预测 chunk_size 步动作
        self.action_head = nn.Linear(512, action_dim * chunk_size)

        # CVAE 部分
        self.prior = nn.Linear(obs_dim + 512, latent_dim * 2)
        self.posterior = nn.Linear(obs_dim + 512 + action_dim * chunk_size, latent_dim * 2)

    def forward(self, image, state, action=None):
        # 视觉特征
        vis_feat = self.image_encoder(image)

        # CVAE
        if action is not None:  # 训练
            posterior_input = torch.cat([state, vis_feat, action], dim=-1)
            mu_post, logvar_post = self.posterior(posterior_input).chunk(2, dim=-1)
            z = self.reparameterize(mu_post, logvar_post)
        else:  # 推理
            prior_input = torch.cat([state, vis_feat], dim=-1)
            mu_prior, _ = self.prior(prior_input).chunk(2, dim=-1)
            z = mu_prior  # 用先验均值

        # 解码动作
        features = torch.cat([vis_feat, state, z], dim=-1)
        action_pred = self.action_head(features)
        return action_pred.view(-1, self.chunk_size, 7)  # (B, K, action_dim)
```

### ACT 在 LeRobot 中的使用

```bash
# 安装 LeRobot
pip install lerobot

# 用 ACT 在自定义任务上训练
python -m lerobot.scripts.train \
    policy=act \
    env=robosuite \
    env.task=Lift \
    dataset_repo_id=your/dataset \
    training.num_epochs=100
```

## Diffusion Policy：用扩散模型做动作预测

Diffusion Policy（Chi et al., 2023, Columbia/TRI）把扩散模型引入动作预测：

### 核心思想

动作序列 $a_{0:K}$ 从噪声逐步去噪生成：

$$a_{0:K}^{(t)} = \text{Denoise}(a_{0:K}^{(t+1)}, s_t, t)$$

其中 $s_t$ 是当前观测，$t$ 是去噪步数。

### 为什么 Diffusion Policy 好？

1. **多模态分布**：同一个场景可能有多种合理动作方案，扩散模型天然建模多模态分布
2. **动作平滑**：生成的动作序列自然平滑，不需要额外正则化
3. **表达力强**：比简单的 MLP/CVAE 更强的函数逼近能力

### 代码概览

```python
# Diffusion Policy 的核心（使用 denoising diffusion）
import diffusers

class DiffusionPolicy(nn.Module):
    def __init__(self, obs_dim, action_dim, chunk_size=16, num_diffusion_steps=100):
        super().__init__()
        self.noise_scheduler = diffusers.DDPMScheduler(
            num_train_timesteps=num_diffusion_steps,
            beta_schedule="squaredcos_cap_v2",
        )
        # 去噪网络：输入 (noisy_action, obs, timestep) → 输出 predicted_noise
        self.unet = UNet1D(
            input_dim=action_dim,
            cond_dim=obs_dim,
            chunk_size=chunk_size,
        )

    def forward(self, obs, action=None):
        if action is not None:  # 训练
            noise = torch.randn_like(action)
            timesteps = torch.randint(0, 100, (obs.shape[0],))
            noisy_action = self.noise_scheduler.add_noise(action, noise, timesteps)
            predicted_noise = self.unet(noisy_action, obs, timesteps)
            return F.mse_loss(predicted_noise, noise)
        else:  # 推理
            action = torch.randn(obs.shape[0], self.chunk_size, 7)
            for t in self.noise_scheduler.timesteps:
                noise_pred = self.unet(action, obs, t)
                action = self.noise_scheduler.step(noise_pred, t, action).prev_sample
            return action
```

## ACT vs Diffusion Policy：如何选择？

| 维度 | ACT | Diffusion Policy |
|---|---|---|
| **多模态处理** | CVAE（隐变量） | 扩散模型（去噪） |
| **推理速度** | 快（单次前向） | 慢（多次去噪迭代） |
| **动作平滑** | 需要额外处理 | 天然平滑 |
| **训练稳定性** | 更稳定 | 需要调 diffusion 步数 |
| **数据效率** | 更好 | 需要更多数据 |
| **VLA 中的应用** | LeRobot 默认 | π0 的 flow matching 变体 |

**建议**：入门先学 ACT（代码更简单），然后理解 Diffusion Policy（VLA 中更重要）。

## 练习

### 练习 1：在 robosuite 中采集演示数据
用 robosuite 的键盘控制或脚本控制采集 100 条 Lift 任务的演示数据。分析数据分布：动作的均值、方差、时间序列模式。

### 练习 2：训练 BC 和 ACT 策略
分别用简单 BC（MLP）和 ACT 训练策略，对比：
- 成功率
- 动作平滑度
- 在不同演示数量下的表现（10/50/200 条）

### 练习 3：分析 BC 的失败模式
让 BC 策略在仿真中运行，记录失败案例。分析：
- 策略在哪些状态下犯错？
- 犯错后是否“雪崩”？
- 如何用数据增强缓解？

## 常见踩坑 FAQ

**Q：采集演示数据用什么方法？**
A：最常见的是键盘遥操作（robosuite 内置）、VR 遥操作、Kinesthetic 教学（直接拖机器人）。入门用 robosuite 的 scripted policy 生成数据即可。

**Q：需要多少演示数据？**
A：简单任务（Lift）100 条就够。复杂任务（多步操作、精细操作）可能需要 500-1000 条。VLA 模型用的 Open X-Embodiment 有近百万条。

**Q：图像输入还是状态输入？**
A：状态输入（关节位置、末端位置）简单得多，适合入门。图像输入更接近真实场景，但训练难度高很多。建议先用状态输入跑通流程，再加视觉。

**Q：训练 loss 下降但成功率不涨？**
A：这通常是因为 loss 下降的是“平均动作误差”，但机器人需要的是“至少有一次成功”。解决方案：用成功率而不是 loss 作为选模型的指标；增大 chunk_size。
