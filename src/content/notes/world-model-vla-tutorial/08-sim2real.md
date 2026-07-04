---
title: "第 8 章：Sim2Real 迁移"
description: "从仿真到真实——域随机化、Teacher-Student、让仿真策略在真实世界也能工作"
date: 2026-06-27
tags: [sim2real, domain-randomization, teacher-student, transfer, tutorial]
category: "Tutorials"
docGroup: "world-model-vla-tutorial"
order: 8
draft: false
---

# 第 8 章：Sim2Real 迁移

> 仿真中学到的策略，放到真实机器人上几乎不能用——这就是 Sim2Real Gap。解决它是具身智能从论文走向产品的关键一步。

## Sim2Real Gap 是什么？

```
仿真环境                    真实世界
├── 完美的视觉渲染     ≠    ├── 光照变化
├── 精确的物理引擎     ≠    ├── 材质摩擦不确定
├── 完整的状态信息     ≠    ├── 只有部分可观测
└── 无限次重置        ≠    └── 重置成本高
```

Sim2Real Gap 的本质：**训练分布 ≠ 测试分布**。模型在仿真中过拟合了仿真环境的特定属性。

## 方法一：域随机化（Domain Randomization）

### 核心思想

与其让仿真变得更真实（domain adaptation），不如让策略对仿真参数的变化更鲁棒——在训练时随机化所有可以随机化的参数。

```python
import robosuite as suite

# 域随机化配置
domain_rand_config = {
    # 视觉随机化
    "camera_pos_range": [(-0.1, 0.1)] * 3,      # 相机位置扰动
    "lighting_range": [(0.5, 1.5)] * 3,          # 光照强度范围
    "texture_randomize": True,                    # 纹理随机化
    "color_randomize": True,                      # 颜色随机化

    # 物理随机化
    "friction_range": [0.5, 1.5],                 # 摩擦系数范围
    "mass_range": [0.8, 1.2],                     # 质量缩放范围
    "joint_damping_range": [0.5, 1.5],            # 关节阻尼范围

    # 动作噪声
    "action_noise_std": 0.05,                     # 动作高斯噪声
}

def make_env_with_domain_rand(task="Lift"):
    """创建带域随机化的环境"""
    env = suite.make(
        task,
        robots="Panda",
        has_renderer=False,
        has_offscreen_renderer=True,
        use_camera_obs=True,
        # 域随机化
        **domain_rand_config,
    )
    return env
```

### 域随机化的两个层次

| 层次 | 随机化内容 | 效果 |
|---|---|---|
| **视觉域随机化** | 纹理、颜色、光照、背景 | 让视觉策略对外观变化鲁棒 |
| **物理域随机化** | 摩擦、质量、阻尼、延迟 | 让控制策略对物理参数变化鲁棒 |

### 域随机化的关键参数

太小 → 策略仍然过拟合仿真
太大 → 策略在所有环境上都表现平庸

经验法则：**覆盖真实世界的参数范围，但不要远超它**。

## 方法二：Teacher-Student 框架

### 核心思想

在仿真中可以获取“特权信息”（完整的物体位置、速度、物理状态），但真实世界中只能用传感器。Teacher-Student 框架分两步走：

```
Step 1: Teacher 训练（仿真中，用特权信息）
   输入: 完整状态 s_full（物体位置、速度、关节角度...）
   输出: 最优动作 a*

Step 2: Student 学习（只用可观测信息）
   输入: 图像 / 部分观测 s_partial
   目标: 模仿 Teacher 的输出 a*
```

### 代码实现

```python
# Teacher: 用完整状态训练
class TeacherPolicy(nn.Module):
    def __init__(self, full_state_dim=30, action_dim=7):
        super().__init__()
        self.net = nn.Sequential(
            nn.Linear(full_state_dim, 256), nn.ReLU(),
            nn.Linear(256, 256), nn.ReLU(),
            nn.Linear(256, action_dim),
        )

    def forward(self, full_state):
        return self.net(full_state)

# Student: 只用图像
class StudentPolicy(nn.Module):
    def __init__(self, action_dim=7):
        super().__init__()
        self.image_encoder = nn.Sequential(
            nn.Conv2d(3, 32, 3, stride=2), nn.ReLU(),
            nn.Conv2d(32, 64, 3, stride=2), nn.ReLU(),
            nn.AdaptiveAvgPool2d(4), nn.Flatten(),
        )
        self.action_head = nn.Linear(64 * 4 * 4, action_dim)

    def forward(self, image):
        return self.action_head(self.image_encoder(image))

# Teacher → Student 蒸馏
def train_student(teacher, student, dataloader, epochs=100):
    optimizer = torch.optim.Adam(student.parameters(), lr=1e-3)

    for epoch in range(epochs):
        for full_state, image, _ in dataloader:
            with torch.no_grad():
                teacher_action = teacher(full_state)  # Teacher 的"标签"
            student_action = student(image)

            loss = F.mse_loss(student_action, teacher_action)
            optimizer.zero_grad()
            loss.backward()
            optimizer.step()
```

### 为什么 Teacher-Student 有效？

1. **Teacher 知道“最优动作”**：有完整信息的 Teacher 接近理论最优
2. **Student 学习更简单的映射**：从图像到最优动作比从图像到自监督动作更容易
3. **可以加视觉域随机化**：Student 训练时用随机化的图像，增强鲁棒性

## 方法三：高级技术

### System Identification（系统辨识）
用真实数据校准仿真器的物理参数，让仿真更接近真实。

### Adaptive Fine-tuning
在真实机器人上少量微调——只调整最后几层或 LoRA 参数。

### Residual Policy
学习一个残差策略来补偿仿真和真实之间的差异：
$$a_{real} = a_{sim} + \Delta\pi_\theta(s)$$

## 实战：域随机化 + Teacher-Student Pipeline

```python
# 完整的 Sim2Real pipeline
class Sim2RealPipeline:
    def __init__(self):
        self.teacher = TeacherPolicy()
        self.student = StudentPolicy()

    def run(self):
        # Phase 1: Teacher 训练（仿真 + 特权信息）
        print("Phase 1: Training Teacher with privileged information...")
        env = make_env_with_domain_rand()
        self.train_teacher(env, num_episodes=1000)

        # Phase 2: 数据采集（Teacher 演示）
        print("Phase 2: Collecting teacher demonstrations...")
        demos = self.collect_teacher_demos(env, num_episodes=500)

        # Phase 3: Student 蒸馏（图像输入 + 视觉域随机化）
        print("Phase 3: Training Student with visual domain randomization...")
        self.train_student(demos, epochs=200)

        # Phase 4: 评测（SIMPLERENV 高保真渲染）
        print("Phase 4: Evaluating in high-fidelity simulation...")
        success_rate = self.evaluate_student()
        print(f"Zero-shot transfer success rate: {success_rate:.1%}")
```

## 量化 Sim2Real Gap

```python
def measure_sim2real_gap(policy, sim_env, real_env_or_high_fidelity, num_trials=100):
    """量化仿真-真实差距"""
    sim_successes = 0
    real_successes = 0

    for _ in range(num_trials):
        # 仿真评测
        if evaluate_episode(policy, sim_env):
            sim_successes += 1

        # 真实/高保真仿真评测
        if evaluate_episode(policy, real_env_or_high_fidelity):
            real_successes += 1

    sim_rate = sim_successes / num_trials
    real_rate = real_successes / num_trials
    gap = sim_rate - real_rate

    print(f"Simulation success rate: {sim_rate:.1%}")
    print(f"Real/HF success rate:    {real_rate:.1%}")
    print(f"Sim2Real Gap:            {gap:.1%}")
    return gap
```

## 练习

### 练习 1：配置域随机化
在 robosuite 中配置视觉 + 物理域随机化。对比：
- 无域随机化 vs 有域随机化的策略鲁棒性
- 不同随机化强度的影响

### 练习 2：Teacher-Student 蒸馏
在仿真中训练 Teacher（状态输入），然后蒸馏到 Student（图像输入）。对比：
- Teacher 的成功率
- Student 的成功率
- 加视觉域随机化后 Student 的变化

### 练习 3：设计 Sim2Real 实验方案
假设你要把策略从 robosuite 迁移到真实 Panda 机器人。写出完整的 Sim2Real 方案，包括：
- 需要随机化哪些参数？
- 怎么确定随机化范围？
- 评测指标和流程

## 常见踩坑 FAQ

**Q：没有真实机器人怎么办？**
A：SIMPLERENV 提供了高保真渲染的仿真环境，可以模拟“视觉上接近真实”的场景。用它替代真实机器人做初步评测。

**Q：域随机化和数据增强有什么区别？**
A：域随机化作用于仿真器参数（物理+视觉），数据增强只作用于图像。域随机化更全面，但需要仿真器支持。

**Q：Teacher 训练不收敛？**
A：检查特权信息的维度和归一化。常见问题：状态维度太高导致过拟合、奖励太稀疏导致探索不足。

**Q：Sim2Real Gap 通常有多大？**
A：经验数据：简单任务（Lift）gap 约 10-20%；复杂任务（多物体操作）gap 可达 30-50%。好的域随机化 + 蒸馏可以把 gap 降到 10% 以内。
