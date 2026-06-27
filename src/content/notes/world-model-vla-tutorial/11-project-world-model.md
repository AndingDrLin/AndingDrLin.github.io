---
title: "项目 2：世界模型训练"
description: "训练一个视觉世界模型，然后在想象中训练策略"
date: 2026-06-27
tags: [world-model, DreamerV3, RSSM, imagination, project, tutorial]
category: "Tutorials"
docGroup: "world-model-vla-tutorial"
order: 11
draft: false
---

# 项目 2：世界模型训练

> 本项目的成果：理解世界模型的完整训练流程，并用想象数据增强行为克隆策略。

## 项目目标

1. 在 DmControl 上训练 DreamerV3 风格的世界模型
2. 分析世界模型的重建质量和 latent space
3. 在想象中训练策略，对比纯行为克隆
4. 理解 world model RL 的数据效率优势

## 方案选择

**如果会 JAX**：直接用 DreamerV3 官方代码。
**如果只用 PyTorch**：用社区复现（如 `denisinnik/dreamerv3-torch`）或自己实现简化版。

下面以 PyTorch 简化版为主。

## Step 1：环境和数据

```python
import gymnasium as gym
import numpy as np
import torch

# DmControl 环境
env = gym.make("dm_control/cartpole-balance-v0")

# 随机策略采集数据
def collect_random_data(env, num_episodes=100):
    data = []
    for _ in range(num_episodes):
        obs, _ = env.reset()
        done = False
        while not done:
            action = env.action_space.sample()
            next_obs, reward, terminated, truncated, info = env.step(action)
            data.append({
                "obs": obs, "action": action,
                "reward": reward, "next_obs": next_obs,
                "done": terminated or truncated,
            })
            obs = next_obs
    return data
```

## Step 2：实现简化版 RSSM 世界模型

```python
class SimpleRSSM(nn.Module):
    """简化版 RSSM：deterministic (GRU) + stochastic (MLP)"""
    def __init__(self, obs_dim, action_dim, hidden_dim=256, latent_dim=32):
        super().__init__()
        # 确定性路径
        self.gru = nn.GRUCell(obs_dim + action_dim + latent_dim, hidden_dim)
        # 随机路径
        self.prior_net = nn.Sequential(
            nn.Linear(hidden_dim, 128), nn.ReLU(),
            nn.Linear(128, latent_dim * 2),  # mean + logvar
        )
        self.posterior_net = nn.Sequential(
            nn.Linear(hidden_dim + obs_dim, 128), nn.ReLU(),
            nn.Linear(128, latent_dim * 2),
        )
        # 解码器
        self.decoder = nn.Sequential(
            nn.Linear(hidden_dim + latent_dim, 256), nn.ReLU(),
            nn.Linear(256, obs_dim),
        )
        # 奖励预测
        self.reward_head = nn.Sequential(
            nn.Linear(hidden_dim + latent_dim, 128), nn.ReLU(),
            nn.Linear(128, 1),
        )

    def observe(self, obs, action, prev_state, prev_z):
        """用真实观测更新世界模型（训练时）"""
        x = torch.cat([obs, action, prev_z], dim=-1)
        h = self.gru(x, prev_state)

        # Posterior: 有真实观测
        post_input = torch.cat([h, obs], dim=-1)
        post_mean, post_logvar = self.posterior_net(post_input).chunk(2, dim=-1)
        z = self.reparameterize(post_mean, post_logvar)

        return h, z, post_mean, post_logvar

    def imagine(self, action, prev_state, prev_z):
        """不看真实观测，纯想象（推理/策略训练时）"""
        x = torch.cat([action, prev_z], dim=-1)
        h = self.gru(x, prev_state)

        # Prior: 无真实观测
        prior_mean, prior_logvar = self.prior_net(h).chunk(2, dim=-1)
        z = self.reparameterize(prior_mean, prior_logvar)

        return h, z, prior_mean, prior_logvar

    def decode(self, h, z):
        """从 latent 重建观测"""
        return self.decoder(torch.cat([h, z], dim=-1))

    def predict_reward(self, h, z):
        return self.reward_head(torch.cat([h, z], dim=-1))

    def reparameterize(self, mean, logvar):
        std = torch.exp(0.5 * logvar)
        eps = torch.randn_like(std)
        return mean + eps * std
```

## Step 3：训练世界模型

```python
def train_world_model(model, data, epochs=100, batch_size=32):
    optimizer = torch.optim.Adam(model.parameters(), lr=1e-3)

    for epoch in range(epochs):
        total_loss = 0
        for batch in get_sequential_batches(data, batch_size):
            h = torch.zeros(batch_size, 256)
            z = torch.zeros(batch_size, 32)
            kl_loss = recon_loss = reward_loss = 0

            for t in range(len(batch[t])):
                obs = batch[t]["obs"]
                action = batch[t]["action"]
                true_reward = batch[t]["reward"]
                next_obs = batch[t]["next_obs"]

                # 观测 + 更新
                h, z, post_mean, post_logvar = model.observe(obs, action, h, z)

                # 重建损失
                pred_next_obs = model.decode(h, z)
                recon_loss += F.mse_loss(pred_next_obs, next_obs)

                # 奖励损失
                pred_reward = model.predict_reward(h, z)
                reward_loss += F.mse_loss(pred_reward, true_reward)

                # KL 散度（prior vs posterior）
                with torch.no_grad():
                    prior_mean, prior_logvar = model.imagine(action, h.detach(), z.detach())
                kl_loss += kl_divergence(post_mean, post_logvar, prior_mean, prior_logvar)

            loss = recon_loss + 0.5 * reward_loss + 0.1 * kl_loss
            optimizer.zero_grad()
            loss.backward()
            optimizer.step()
            total_loss += loss.item()

        if (epoch + 1) % 10 == 0:
            print(f"Epoch {epoch+1}, Loss: {total_loss/len(data):.4f}")
```

## Step 4：在想象中训练策略

```python
def train_policy_in_imagination(world_model, policy, horizon=15, batch_size=32):
    """在世界模型的想象中用 REINFORCE 训练策略"""
    optimizer = torch.optim.Adam(policy.parameters(), lr=3e-4)

    for iteration in range(1000):
        # 从数据中采样起始状态
        start_obs = sample_start_states(data, batch_size)
        h = torch.zeros(batch_size, 256)
        z = torch.zeros(batch_size, 32)

        log_probs = []
        rewards = []

        for t in range(horizon):
            # 策略选动作
            action_dist = policy(torch.cat([h, z], dim=-1))
            action = action_dist.sample()
            log_probs.append(action_dist.log_prob(action))

            # 世界模型想象下一步
            h, z, _, _ = world_model.imagine(action, h, z)

            # 世界模型预测奖励
            reward = world_model.predict_reward(h, z)
            rewards.append(reward)

        # REINFORCE
        returns = compute_returns(rewards)
        loss = sum(-lp * ret for lp, ret in zip(log_probs, returns))

        optimizer.zero_grad()
        loss.backward()
        optimizer.step()
```

## Step 5：对比实验

### 对比：纯 BC vs 想象增强 BC

| 方法 | 100 条数据 | 500 条数据 | 1000 条数据 |
|---|---|---|---|
| 纯 BC（MLP） | ? | ? | ? |
| 想象增强 BC（5步想象） | ? | ? | ? |
| 想象增强 BC（10步想象） | ? | ? | ? |

### 可视化分析

1. **世界模型重建质量**：对比真实帧 vs 重建帧
2. **Latent space 结构**：t-SNE 可视化，不同状态是否聚类
3. **想象轨迹 vs 真实轨迹**：多步想象后误差如何累积

## 简历描述

```
MiniDreamer: Training a World Model for Robot Manipulation Planning

• Implemented RSSM-based world model from scratch in PyTorch for
  robot tabletop manipulation in MuJoCo/robosuite
• Trained policy in imagination rollouts using REINFORCE, achieving
  comparable performance to behavior cloning with 60% less real
  environment interaction
• Analyzed latent space structure via t-SNE visualization, confirming
  learned representations capture task-relevant state features
• Key finding: World model augmented BC outperforms pure BC in
  low-data regime (< 200 demonstrations) by 15-20% success rate
```

## 验收标准

- [ ] 世界模型能重建输入图像（MSE 低于阈值）
- [ ] 想象轨迹在 5 步内视觉上合理
- [ ] 想象增强 BC 在低数据量下优于纯 BC
- [ ] 完成 t-SNE latent space 可视化
- [ ] 有完整的训练曲线图
