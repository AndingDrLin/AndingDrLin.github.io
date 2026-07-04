---
title: "第 7 章：具身 Agent 架构"
description: "让 LLM/VLM 驱动机器人自主完成任务——从 Code as Policies 到层次化 Agent"
date: 2026-06-27
tags: [embodied-agent, LLM, VLM, Code-as-Policies, VoxPoser, tutorial]
category: "Tutorials"
docGroup: "world-model-vla-tutorial"
order: 7
draft: false
---

# 第 7 章：具身 Agent 架构

> “用大语言模型指挥机器人”不只是一句口号——Code as Policies 和 VoxPoser 证明了 LLM 可以直接成为机器人的大脑。

## 两种控制范式

第 4 章学的 VLA 是**端到端**路线：图像 + 语言 → 动作。本章学的是**层次化**路线：

```
端到端 (VLA):  图像 + 指令 ─────────→ 动作
层次化 (Agent): 图像 + 指令 → 规划 → 动作
                         ↑
                    LLM/VLM 负责这一步
```

层次化路线的核心优势：
- **可解释性**：规划步骤用自然语言输出，人可以理解、审查、纠正
- **泛化能力**：LLM 的世界知识可以直接用于任务规划
- **模块化**：规划和执行可以独立优化

**说白了**：端到端 VLA 像“直觉反应”——看到就做，快但不灵活；层次化 Agent 像“先想后做”——慢但能处理复杂任务。两者不是替代关系，而是互补。当前最有前景的方向是把两者结合：VLM 做高层规划，VLA 做低层执行。

## Code as Policies

Liang et al.（2023, Google）的 Code as Policies 是具身 Agent 最直觉的实现：

### 核心思想

LLM 直接生成 Python 代码来控制机器人。

```
用户指令: "把红色方块放到碗里"

LLM 输出:
    red_block_pos = get_object_position("red_block")
    bowl_pos = get_object_position("bowl")
    pick(red_block_pos)
    place(bowl_pos)
```

### 为什么代码比自然语言更好？

1. **精确性**：代码有明确的执行语义，不会有歧义
2. **可组合性**：函数可以嵌套、循环、条件判断
3. **可验证**：代码可以运行、调试、测试
4. **LLM 本身就擅长写代码**

### 实现

```python
import openai

class CodeAsPolicyAgent:
    def __init__(self, robot_api):
        self.client = openai.OpenAI()
        self.robot = robot_api

    def get_system_prompt(self):
        return """You are a robot controller. Given a task description,
generate Python code to accomplish it using the available API:

- get_object_position(name) -> [x, y, z]
- pick(position) -> bool
- place(position) -> bool
- move_to(position) -> bool
- look_at(position) -> None

Generate only executable Python code. No explanations."""

    def execute_task(self, task_description):
        # LLM 生成代码
        response = self.client.chat.completions.create(
            model="gpt-4o",
            messages=[
                {"role": "system", "content": self.get_system_prompt()},
                {"role": "user", "content": f"Task: {task_description}"}
            ]
        )
        code = response.choices[0].message.content

        # 清理代码（去掉 markdown 标记）
        code = code.strip().strip("```python").strip("```")

        # 执行代码
        print(f"Generated code:\n{code}")
        try:
            exec(code, {"get_object_position": self.robot.get_object_position,
                        "pick": self.robot.pick,
                        "place": self.robot.place,
                        "move_to": self.robot.move_to,
                        "look_at": self.robot.look_at})
        except Exception as e:
            print(f"Execution error: {e}")
            # 可以把错误反馈给 LLM 做自纠错
```

### 自纠错机制

Code as Policies 的一个关键扩展是 **self-correction**：执行失败时，把错误信息反馈给 LLM 让它修正代码。

```python
def execute_with_correction(self, task_description, max_retries=3):
    for attempt in range(max_retries):
        code = self.generate_code(task_description)
        result = self.try_execute(code)

        if result.success:
            return result

        # 反馈错误给 LLM
        task_description = (
            f"{task_description}\n\n"
            f"Previous attempt failed with error: {result.error}\n"
            f"Previous code:\n{code}\n"
            f"Please fix the code."
        )

    return result
```

## VoxPoser：VLM → 3D 空间约束 → 运动规划

VoxPoser（Huang et al., 2023, Stanford）走了另一条路：

### 核心思想

VLM 不直接输出代码，而是输出 3D 空间中的价值图（value maps）——哪里适合抓取、哪里是禁区、哪里是目标位置。

```
指令: "把杯子放到盘子的左边"

VLM 输出:
  - 抓取价值图: 杯子把手处最高
  - 放置价值图: 盘子左侧最高
  - 约束图: 盘子上方区域为禁区
         ↓
运动规划器: 根据价值图生成轨迹
```

### 为什么价值图更好？

- **空间推理**：VLM 天然理解“左边”、“上面”等空间关系
- **细粒度控制**：价值图可以精确到像素/体素级别
- **与底层解耦**：价值图是通用中间表示，不绑定具体机器人

### 实现思路

```python
class VoxPoserAgent:
    def __init__(self, vlm, motion_planner):
        self.vlm = vlm
        self.planner = motion_planner

    def get_affordance_map(self, image, instruction):
        """让 VLM 输出抓取位置的价值图"""
        prompt = f"""Given the image, identify the best location to grasp
in order to: {instruction}

Output a heatmap as a 2D array where higher values = better grasp locations.
Return only the numerical array."""
        return self.vlm.query(image, prompt)

    def get_constraint_map(self, image, instruction):
        """让 VLM 输出约束图"""
        prompt = f"""Given the image, identify regions that should be avoided
during: {instruction}

Output a constraint map as a 2D array where 1 = must avoid, 0 = safe."""
        return self.vlm.query(image, prompt)

    def execute(self, image, instruction):
        # 1. VLM 生成空间约束
        grasp_map = self.get_affordance_map(image, instruction)
        constraint_map = self.get_constraint_map(image, instruction)

        # 2. 找最优抓取点
        grasp_point = np.unravel_index(grasp_map.argmax(), grasp_map.shape)

        # 3. 运动规划
        trajectory = self.planner.plan(
            start=self.robot.current_pos,
            goal=grasp_point,
            constraints=constraint_map
        )

        # 4. 执行
        self.robot.execute_trajectory(trajectory)
```

## 层次化 Agent 系统设计

把 VLM-as-Planner 和 VLA-as-Executor 结合，就是本教程项目 3 的核心架构：

```
用户指令: "整理桌面，把垃圾扔掉，把杯子放到水槽"
                    ↓
        ┌─────────────────────┐
        │  VLM 任务规划器      │  Step 1: 识别垃圾 → Step 2: 抓取 → ...
        │  (GPT-4V / LLaVA)   │  生成子任务序列
        └──────────┬──────────┘
                   ↓
        ┌─────────────────────┐
        │  VLA 低层执行器      │  对每个子任务：图像 → 动作
        │  (OpenVLA 微调版)    │
        └──────────┬──────────┘
                   ↓
        ┌─────────────────────┐
        │  执行反馈            │  成功？失败？需要重试？
        └──────────┬──────────┘
                   ↓
        VLM 接收反馈，决定下一步
```

### 伪代码

```python
class HierarchicalAgent:
    def __init__(self, planner_vlm, executor_vla):
        self.planner = planner_vlm
        self.executor = executor_vla

    def execute_task(self, instruction, max_steps=20):
        history = []

        for step in range(max_steps):
            # VLM 规划下一步
            current_obs = self.get_observation()
            next_action = self.planner.plan_next(
                instruction=instruction,
                observation=current_obs,
                history=history
            )

            if next_action == "DONE":
                return True

            # VLA 执行
            if isinstance(next_action, str):
                # 子任务描述 → VLA 执行
                result = self.executor.execute(next_action, current_obs)
            else:
                # 直接动作
                result = self.robot.act(next_action)

            # 记录反馈
            history.append({
                "action": next_action,
                "result": result,
                "new_obs": self.get_observation()
            })

            # 自纠错
            if result.failed:
                correction = self.planner.correct(
                    instruction=instruction,
                    failed_action=next_action,
                    error=result.error
                )
                history.append({"correction": correction})

        return False
```

## 三类具身 Agent 对比

| 维度 | Code as Policies | VoxPoser | 层次化 VLM+VLA |
|---|---|---|---|
| **规划表示** | 代码 | 价值图 | 自然语言子任务 |
| **执行器** | 机器人 API | 运动规划器 | VLA 模型 |
| **可解释性** | 高（代码） | 中（热力图） | 中（语言） |
| **泛化能力** | 中（依赖 API） | 强（空间推理） | 强 |
| **复杂任务** | 好（代码可组合） | 中（单步规划） | 好（多步分解） |
| **实时性** | 差（LLM 推理慢） | 中 | 中 |

## 练习

### 练习 1：实现 Code as Policies 简化版
定义 5 个机器人 API 函数，用 GPT-4o / 本地 LLM 生成控制代码。测试：
- LLM 是否能正确调用 API？
- 加入自纠错后成功率是否提升？

### 练习 2：实现 VLM 任务分解
给 VLM 一个复杂指令（“做一杯咖啡”），让它输出子任务序列。分析：
- 子任务分解是否合理？
- 有没有遗漏步骤？
- 不同 VLM 的规划质量对比

### 练习 3：设计你的层次化 Agent
基于本章内容，设计一个适合 LIBERO 环境的层次化 Agent。画出架构图，标注：
- 规划层用什么模型？
- 执行层用什么模型？
- 反馈机制如何设计？

## 常见踩坑 FAQ

**Q：LLM 规划会不会出错？**
A：会，而且频率不低。所以自纠错机制是必须的。实践中用 few-shot examples + 错误反馈可以把成功率从 60% 提高到 85%+。

**Q：Code as Policies 需要多强的 LLM？**
A：GPT-4o / Claude 效果最好。开源模型（如 Llama 3 70B）也可以，但复杂任务的代码生成质量明显下降。

**Q：层次化 Agent 和 VLA 哪个更好？**
A：取决于任务。简单操控（抓取、放置）VLA 更高效。复杂多步任务（“整理桌面”）层次化 Agent 更可靠。项目 3 会做对比实验。

**Q：实时性如何保证？**
A：LLM 规划通常需要 1-5 秒。解决方案：① 预先规划（在执行上一步时规划下一步）② 缓存常见任务的规划 ③ 用更小的模型做快速规划。
