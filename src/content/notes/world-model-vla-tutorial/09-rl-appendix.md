---
title: "第 9 章：强化学习基础（附录）"
description: "PPO、SAC 和 model-based RL——与 VLA/世界模型相关的 RL 核心知识"
date: 2026-06-27
tags: [reinforcement-learning, PPO, SAC, model-based-RL, tutorial]
category: "Tutorials"
docGroup: "world-model-vla-tutorial"
order: 9
draft: false
---

# 第 9 章：强化学习基础（附录）

> 这一章不是 RL 入门课——只讲和 VLA/世界模型直接相关的 RL 核心概念。如果你已经有 RL 基础，可以跳过。

## 为什么 VLA 教程需要讲 RL？

1. **世界模型 + RL 是经典组合**：DreamerV3 的策略就是在想象中用 RL 训练的
2. **VLA 训练有时会用 RL 微调**：RT-2 就用了 RL fine-tuning 来提升策略质量
3. **理解 model-based vs model-free 对选方案至关重要**

## 策略梯度核心：REINFORCE

$$\nabla_\theta J(\theta) = \mathbb{E}_{\pi_\theta} \left[ \nabla_\theta \log \pi_\theta(a|s) \cdot R(\tau) \right]$$

直觉：增大高回报动作的概率，减小低回报动作的概率。

```python
# REINFORCE 核心（伪代码）
def reinforce_loss(log_probs, rewards):
    """log_probs: 策略在每个时刻的 log 概率
       rewards: 每个时刻之后的累计回报"""
    policy_loss = 0
    for log_prob, reward in zip(log_probs, rewards):
        policy_loss -= log_prob * reward  # 最大化回报
    return policy_loss
```

## PPO：最常用的策略优化

PPO（Proximal Policy Optimization）是 REINFORCE 的稳定版本，核心约束是“不要一次更新太大”：

$$L^{CLIP}(\theta) = \mathbb{E} \left[ \min\left( r(\theta) \hat{A}, \text{clip}(r(\theta), 1-\epsilon, 1+\epsilon) \hat{A} \right) \right]$$

其中 $r(\theta) = \frac{\pi_\theta(a|s)}{\pi_{\theta_{old}}(a|s)}$ 是新旧策略的概率比，$\hat{A}$ 是优势函数。

### PPO 在 VLA 中的应用

1. **RLHF for robotics**：用人类偏好微调 VLA 策略
2. **世界模型中的策略优化**：DreamerV3 在想象 rollout 上用 PPO 训练策略
3. **在线微调**：VLA 预训练 + PPO 在线微调提升成功率

```python
# PPO 核心结构
class PPO:
    def __init__(self, policy, value_net, clip_eps=0.2, lr=3e-4):
        self.policy = policy
        self.value_net = value_net
        self.clip_eps = clip_eps
        self.optimizer = torch.optim.Adam(
            list(policy.parameters()) + list(value_net.parameters()), lr=lr
        )

    def update(self, states, actions, old_log_probs, returns, advantages):
        # 新策略的概率
        new_log_probs = self.policy.log_prob(states, actions)
        ratio = (new_log_probs - old_log_probs).exp()

        # PPO-Clip 损失
        surr1 = ratio * advantages
        surr2 = torch.clamp(ratio, 1 - self.clip_eps, 1 + self.clip_eps) * advantages
        policy_loss = -torch.min(surr1, surr1).mean()

        # 值函数损失
        value_pred = self.value_net(states)
        value_loss = F.mse_loss(value_pred, returns)

        loss = policy_loss + 0.5 * value_loss
        self.optimizer.zero_grad()
        loss.backward()
        self.optimizer.step()
```

## SAC：最大熵强化学习

SAC（Soft Actor-Critic）的核心是最大化回报的同时最大化策略的熵——鼓励探索：

$$J(\pi) = \mathbb{E} \left[ \sum_t r_t + \alpha \mathcal{H}(\pi(\cdot|s_t)) \right]$$

### SAC vs PPO

| 维度 | PPO | SAC |
|---|---|---|
| **策略类型** | On-policy | Off-policy |
| **数据效率** | 低（数据用一次就丢） | 高（经验回放） |
| **探索机制** | 无（依赖随机性） | 最大熵（显式探索） |
| **稳定性** | 非常稳定 | 稳定但需要调温度参数 |
| **机器人场景** | 更常用（DreamerV3） | 离散动作场景 |

### SAC 在世界模型中的角色

SAC 通常在 world model RL 中作为策略优化器：

```
世界模型（RSSM/Diffusion）
    ↓ 生成想象 rollout
SAC 训练策略（在想象中）
    ↓ 部署
真实环境
```

## Model-based vs Model-free RL

| 维度 | Model-free (PPO/SAC) | Model-based (DreamerV3) |
|---|---|---|
| **样本效率** | 低 | 高 |
| **计算成本** | 低 | 高（需要训练世界模型） |
| **策略质量** | 数据够多时好 | 数据少时更好 |
| **适用场景** | 仿真（数据便宜） | 真实机器人（数据昂贵） |

**关键判断**：真实机器人场景 → model-based（数据效率）；仿真训练 → model-free（简单直接）。VLA 通常用 model-free（行为克隆），但世界模型 + RL 是 model-based 的。

## 练习

### 练习 1：PPO 训练 CartPole
用 Stable Baselines3 的 PPO 训练 CartPole，调参使平均奖励达到 400+。

```python
from stable_baselines3 import PPO

model = PPO("MlpPolicy", "CartPole-v1", verbose=1)
model.learn(total_timesteps=50000)
```

### 练习 2：理解 model-based RL
阅读 DreamerV3 代码中的策略训练部分，回答：
- 策略在什么空间（latent 还是 pixel）上训练？
- Reward head 的作用是什么？
- 为什么用想象数据比真实数据更高效？

### 练习 3：PPO vs SAC 对比
在 DmControl 的同一个任务上分别用 PPO 和 SAC 训练，对比：
- 收敛速度
- 最终性能
- 超参数敏感性

## 常见踩坑 FAQ

**Q：VLA 训练需要 RL 吗？**
A：大部分情况下不需要——行为克隆就够了。RL 通常用于①微调提升性能 ②在世界模型中训练策略 ③在线适应新任务。

**Q：入门要先学 RL 吗？**
A：不需要。本教程的主线（VLA + 模仿学习）不需要 RL 基础。本章作为附录，等你需要时再回来看。

**Q：为什么 PPO 比 REINFORCE 好这么多？**
A：REINFORCE 的梯度方差太大，训练不稳定。PPO 的 clip 机制限制了每次更新的幅度，大幅提高了稳定性。这是工程改进，不是理论突破。
