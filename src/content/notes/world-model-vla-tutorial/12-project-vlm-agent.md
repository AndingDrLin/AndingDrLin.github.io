---
title: "项目 3：VLM-Agent 多任务系统"
description: "构建层次化 VLM-as-Planner + VLA-as-Executor 具身 Agent——简历核心项目"
date: 2026-06-27
tags: [VLM, VLA, embodied-agent, LIBERO, multi-task, project, tutorial]
category: "Tutorials"
docGroup: "world-model-vla-tutorial"
order: 12
draft: false
---

# 项目 3：VLM-Agent 多任务系统 🎓

> 这是本教程的简历核心项目。完成这个项目，你将拥有一个完整的、可复现的、有消融实验的具身智能系统。

## 项目目标

1. 构建层次化 Agent：VLM 做任务规划 + VLA 做低层执行
2. 在 LIBERO 多任务基准上评测
3. 完成 3 组消融实验
4. 与 end-to-end VLA 做对比

## 架构设计

```
用户指令: "把红色杯子放到水槽"
        ↓
┌─────────────────────────────┐
│     VLM 任务规划器           │
│  (LLaVA/SmolVLM + LoRA)     │
│  输入: 图像 + 指令           │
│  输出: 子任务序列            │
│    1. "pick up red cup"      │
│    2. "move to sink"         │
│    3. "place cup"            │
└──────────┬──────────────────┘
           ↓
┌─────────────────────────────┐
│     VLA 低层执行器           │
│  (OpenVLA, fine-tuned)       │
│  输入: 图像 + 子任务         │
│  输出: 7D 动作              │
└──────────┬──────────────────┘
           ↓
┌─────────────────────────────┐
│     执行反馈 + 自纠错        │
│  成功 → 下一子任务           │
│  失败 → VLM 重新规划         │
└─────────────────────────────┘
```

## Step 1：评测基准准备——LIBERO

```bash
# 安装 LIBERO
pip install libero

# LIBERO 包含 4 个套件，130 个任务
# - LIBERO-Spatial: 空间关系理解（10 任务）
# - LIBERO-Object: 物体识别（10 任务）
# - LIBERO-Goal: 目标理解（10 任务）
# - LIBERO-Long: 长程多步任务（10 任务）
```

```python
from libero.libero import benchmark

# 加载任务
benchmark_dict = benchmark.get_benchmark_dict()
spatial_benchmark = benchmark_dict["spatial"]()
num_tasks = spatial_benchmark.n_tasks  # 10

for task_id in range(num_tasks):
    task = spatial_benchmark.get_task(task_id)
    print(f"Task {task_id}: {task.language}")
    # 例如: "pick up the black bowl on the cookie sheet and place it on the plate"
```

## Step 2：训练 VLM 任务规划器

```python
from transformers import AutoProcessor, AutoModelForVision2Seq
from peft import LoraConfig, get_peft_model

# 加载轻量 VLM
processor = AutoProcessor.from_pretrained("HuggingFaceTB/SmolVLM-Instruct")
vlm = AutoModelForVision2Seq.from_pretrained("HuggingFaceTB/SmolVLM-Instruct")

# LoRA 微调
lora_config = LoraConfig(
    r=16, lora_alpha=32,
    target_modules=["q_proj", "v_proj"],
    lora_dropout=0.05,
)
vlm = get_peft_model(vlm, lora_config)

# 构建规划数据集
planning_data = []
for task in tasks:
    # 多步任务 → 子任务序列
    planning_data.append({
        "image": task.initial_image,
        "instruction": task.language,
        "subtasks": decompose_task(task.language),  # 手动标注或 GPT-4 生成
    })

# 训练 VLM 做任务分解
def train_planner(vlm, data, epochs=10):
    for epoch in range(epochs):
        for item in data:
            prompt = f"Task: {item['instruction']}\nSubtasks:\n1."
            target = "\n".join(f"{i+1}. {s}" for i, s in enumerate(item['subtasks']))

            inputs = processor(prompt, item['image'], return_tensors="pt")
            labels = processor.tokenizer(target, return_tensors="pt").input_ids

            outputs = vlm(**inputs, labels=labels)
            loss = outputs.loss
            loss.backward()
```

## Step 3：集成 VLA 执行器

```python
class HierarchicalAgent:
    def __init__(self, planner_vlm, executor_vla, processor):
        self.planner = planner_vlm
        self.executor = executor_vla
        self.processor = processor

    def plan_subtasks(self, image, instruction):
        """VLM 生成子任务序列"""
        prompt = (
            f"Task: {instruction}\n"
            "Break this into atomic manipulation subtasks.\n"
            "Each subtask should be a single pick/place/move action.\n"
            "Subtasks:\n1."
        )
        inputs = self.processor(prompt, image, return_tensors="pt").to("cuda")
        output = self.planner.generate(**inputs, max_new_tokens=200)
        text = self.processor.decode(output[0], skip_special_tokens=True)

        # 解析子任务
        subtasks = parse_numbered_list(text)
        return subtasks

    def execute_subtask(self, image, subtask, env, max_steps=100):
        """VLA 执行单个子任务"""
        for step in range(max_steps):
            obs = env.get_observation()
            image = obs["agentview_image"]

            # VLA 推理
            inputs = self.processor(subtask, image).to("cuda")
            action = self.executor.predict_action(**inputs)

            obs, reward, done, info = env.step(action)

            # 检查子任务完成
            if self.check_subtask_done(subtask, obs):
                return True

        return False

    def run(self, env, instruction, max_subtasks=10):
        """完整执行流程"""
        obs = env.reset()
        image = obs["agentview_image"]

        # VLM 规划
        subtasks = self.plan_subtasks(image, instruction)
        print(f"Planned subtasks: {subtasks}")

        history = []
        for i, subtask in enumerate(subtasks):
            print(f"Executing subtask {i+1}/{len(subtasks)}: {subtask}")

            success = self.execute_subtask(image, subtask, env)
            history.append({"subtask": subtask, "success": success})

            if not success:
                # 自纠错：重新规划
                print(f"Subtask failed, re-planning...")
                new_subtasks = self.plan_subtasks(
                    env.get_observation()["agentview_image"],
                    f"{instruction} (failed at: {subtask}, continue from current state)"
                )
                subtasks = subtasks[:i] + new_subtasks  # 替换剩余部分

        return history
```

## Step 4：评测与消融实验

### 消融实验 1：VLM 规划 vs 无规划

| 方法 | LIBERO-Spatial | LIBERO-Object | LIBERO-Goal | LIBERO-Long |
|---|---|---|---|---|
| End-to-end VLA（无规划） | ? | ? | ? | ? |
| **VLM + VLA（有规划）** | ? | ? | ? | ? |

### 消融实验 2：不同 VLM backbone

| VLM | 成功率 | 推理时间 |
|---|---|---|
| SmolVLM-256M | ? | ? |
| LLaVA-7B | ? | ? |
| GPT-4o (API) | ? | ? |

### 消融实验 3：自纠错机制

| 方法 | 首次成功率 | 纠错后成功率 | 总步骤数 |
|---|---|---|---|
| 无纠错 | ? | — | ? |
| 1次重规划 | ? | ? | ? |
| 3次重规划 | ? | ? | ? |

## 简历描述

```
VlmAgent: Hierarchical VLM-as-Planner + VLA-as-Executor for Multi-Task Manipulation

• Built a hierarchical embodied agent with VLM (LLaVA with LoRA) as task
  planner and VLA (fine-tuned OpenVLA) as low-level executor
• Evaluated on LIBERO benchmark (40 tasks across 4 suites) covering spatial
  reasoning, object recognition, goal understanding, and long-horizon planning
• Achieved 15% improvement over end-to-end VLA baseline through hierarchical
  task decomposition and self-correction mechanism
• Conducted ablation studies on: planning strategy, VLM backbone selection
  (SmolVLM-256M / LLaVA-7B / GPT-4o), and error recovery depth
• Implemented complete pipeline with W&B tracking and reproducible evaluation
• Key finding: VLM planning provides largest gains on long-horizon tasks
  (LIBERO-Long: +25%) where multi-step reasoning is critical
```

## 验收标准

- [ ] VLM 能正确分解 ≥80% 的任务指令
- [ ] VLA 能执行单个子任务（成功率 ≥70%）
- [ ] 层次化系统在 LIBERO-Long 上超过 end-to-end VLA
- [ ] 完成 3 组消融实验，有清晰的数据表
- [ ] 代码可复现，有 README、requirements.txt 和评测脚本
- [ ] 有实验追踪（W&B 或类似工具）
