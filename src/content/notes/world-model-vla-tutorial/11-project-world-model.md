---
title: "项目 2：世界模型 baseline 复现与评估"
description: "复现一个开源世界模型 baseline，并用反事实动作、rollout horizon 和任务指标拆解它的优势与瓶颈"
date: 2026-06-27
updated: 2026-07-21
tags: [world-model, DIAMOND, baseline, evaluation, robotics, project, tutorial]
category: "Tutorials"
docGroup: "world-model-vla-tutorial"
order: 11
draft: false
---

# 项目 2：世界模型 baseline 复现与评估

> 本项目的成果：不是从零手写一个玩具世界模型，而是复现一个真实开源 baseline，设计压力测试，并判断它到底适合 evaluation、planning、training gym 还是 synthetic data。

这一项目默认选择 [DIAMOND](https://diamond-wm.github.io/) 作为 baseline。它用 diffusion world model 在 Atari 环境里训练 agent，足够新、开源、可视化直观，也能很好地暴露当下世界模型的核心矛盾：画面质量、动作忠实度、长程一致性和推理成本很难同时满足。

如果你更想走 DreamerV3 路线，也可以用同一套项目结构替换 baseline；但本项目的重点不是“哪个仓库更强”，而是训练你读懂 world model 系统、跑通最小闭环、设计评估问题的能力。

## 项目目标

1. 跑通一个开源世界模型 baseline 的最小复现路径。
2. 写清楚它的输入、输出、状态表示、动作条件化方式和训练闭环。
3. 用 counterfactual action test 判断它是否真的理解动作对未来的影响。
4. 用 rollout horizon 分析长程漂移、速度和失败模式。
5. 输出一页 world model evaluation report，说明它在机器人技术栈里最适合放在哪个位置。

## 方案选择

| 方案 | 适合你在什么时候选 | 本项目建议 |
|---|---|---|
| DIAMOND | 想看 diffusion world model、Atari 可视化 rollout、热门开源 baseline | **默认选择** |
| DreamerV3 | 想理解 latent dynamics + imagination RL 的完整闭环 | 作为对照阅读或第二阶段复现 |
| V-JEPA / JEPA planning | 想理解 embedding prediction 与 goal-conditioned MPC | 适合论文导读，不一定适合作为第一复现 |
| Cosmos / Genie 类平台 | 想理解行业基础设施和 synthetic data pipeline | 适合调研，不适合低成本完整复现 |

我建议第一轮只做 DIAMOND 的最小复现。不要一开始就追论文分数，也不要让 vibe coding agent 同时改训练、改模型、改环境。先把 baseline 当成黑箱跑起来，再逐步拆开。

## Step 1：建立 baseline card

先不运行训练。让 vibe coding agent 帮你读 README、配置文件和训练入口，然后人工整理下面这张表。

| 问题 | 你的记录 |
|---|---|
| Baseline 名称 | DIAMOND |
| 论文 / 项目 / 代码链接 |  |
| 输入 | 过去帧？动作？reward？done？ |
| 输出 | 下一帧？latent？reward？policy action？ |
| State representation | pixel、latent，还是混合？ |
| Action conditioning | 动作如何进入 world model？ |
| World model loss | diffusion loss？是否还有 reward/value loss？ |
| Policy training loop | agent 在真实环境、world model，还是两者交替？ |
| 最小可运行任务 | 哪个 Atari game / 哪个配置？ |
| 主要指标 | Atari score、rollout quality、FPS、显存、训练时间？ |
| 你预期的瓶颈 | 采样速度、长程一致性、动作忠实度、显存、依赖安装？ |

可以直接给 coding agent 这样的任务：

```text
请阅读 DIAMOND 仓库，不改任何代码。输出 baseline card：
1. 训练入口和评估入口分别在哪里；
2. 最小可运行配置是什么；
3. world model 的输入输出是什么；
4. action 如何进入模型；
5. agent 是如何在 world model 中训练的；
6. 复现时最可能卡在哪些依赖或硬件要求。
```

验收标准：你能不用看代码，用 5 分钟给别人讲清楚这个 baseline 的闭环。

## Step 2：跑通最小复现

这一阶段只追求“能运行、能保存结果、能复盘失败”，不追求 SOTA 分数。

建议产物：

1. 一份环境安装记录：Python 版本、CUDA、GPU、关键依赖。
2. 一个最小运行命令：训练或加载 checkpoint 的命令。
3. 一段真实环境帧序列。
4. 一段 world model imagined rollout。
5. 一份资源成本记录：显存、单次 rollout 时间、训练/评估耗时。

记录表格：

| 项目 | 结果 |
|---|---|
| 机器 / GPU |  |
| Python / CUDA |  |
| 选用 game / task |  |
| 是否使用预训练 checkpoint |  |
| 最小命令 |  |
| 首次跑通耗时 |  |
| 单段 rollout 耗时 |  |
| 最大显存占用 |  |
| 第一个失败点 |  |
| 解决方式 |  |

注意：如果依赖卡住，不要马上换 baseline。先把失败写清楚。工程复现能力的一部分，就是能准确记录“为什么没跑通”。

## Step 3：做 counterfactual action test

世界模型是否有用，不能只看一条生成视频。你要固定同一个初始状态，输入不同动作序列，看预测未来是否产生合理差异。

设计方式：

```text
同一个初始状态 s0
├── action sequence A：连续 left / no-op / fire / accelerate
└── action sequence B：连续 right / jump / brake / alternative action

比较 A 和 B 的 imagined rollout：
1. 差异是否出现？
2. 差异是否符合环境规则？
3. 差异是否随 horizon 变弱或变乱？
```

记录表：

| 初始状态 | 动作序列 A | 动作序列 B | 预测差异 | 是否符合环境逻辑 | 备注 |
|---|---|---|---|---|---|
|  |  |  |  |  |  |
|  |  |  |  |  |  |
|  |  |  |  |  |  |

这一阶段的中心问题是：**模型到底是在根据 action 推演世界，还是只是在生成看起来像游戏的视频？**

如果你发现不同动作生成结果差不多，这不是小问题，而是 action fidelity 失败。这样的模型可以做视频生成，但很难做 planning。

## Step 4：画 rollout horizon 曲线

把 imagined rollout 分成不同 horizon 观察：1、5、10、20、50 step。不要只挑最好看的片段，要刻意保存失败样例。

| Horizon | 视觉质量 | 状态一致性 | 动作响应 | 速度 | 典型失败 |
|---|---|---|---|---|---|
| 1 |  |  |  |  |  |
| 5 |  |  |  |  |  |
| 10 |  |  |  |  |  |
| 20 |  |  |  |  |  |
| 50 |  |  |  |  |  |

你最后要给一个保守判断：这个 world model 的可用 horizon 到底有多长？

- 如果 5 step 稳、20 step 崩，它可能适合 short-horizon MPC。
- 如果 50 step 仍然稳定但速度慢，它可能适合离线 evaluation。
- 如果画面清晰但动作响应弱，它更像视频模型，不适合 policy ranking。

## Step 5：和 DreamerV3 做概念对照

这一阶段不要求完整跑 DreamerV3，但要读 DreamerV3 的架构图和训练循环，做一张对照表。

| 维度 | DIAMOND | DreamerV3 |
|---|---|---|
| 预测空间 |  |  |
| 状态表示 |  |  |
| action conditioning |  |  |
| world model loss |  |  |
| policy 如何训练 |  |  |
| 视觉可解释性 |  |  |
| rollout 速度 |  |  |
| 长程一致性 |  |  |
| 更适合的 use case |  |  |

不要照抄论文结论。用你在 Step 2–4 的观察改写这张表。

## Step 6：写 world model evaluation report

最终报告控制在 1–2 页，结构固定：

1. **我复现了什么**：baseline、任务、运行环境、是否使用 checkpoint。
2. **最小运行路径**：关键命令、依赖、耗时。
3. **它最明显的优势**：例如视觉细节、可视化、训练闭环、代码组织。
4. **它最明显的瓶颈**：例如速度、长程漂移、动作不敏感、显存、依赖复杂。
5. **它适合放在机器人 pipeline 的哪里**：evaluation、planning、training gym、synthetic data，还是只适合研究观察。
6. **如果迁移到机器人，我第一步会改什么**：例如把 Atari action 换成 action chunk、接入真实机器人数据、加入 goal scoring、缩短 horizon、加入不确定性估计。

报告里必须包含一个判断句，例如：

> 我目前的判断：DIAMOND 证明了 diffusion world model 可以提供高质量 visual imagination，但如果要进入真实机器人闭环，第一瓶颈不是“能不能生成图像”，而是 action fidelity、rollout latency 和接触动力学是否能支撑 policy ranking。

## 简历描述

```text
World Model Baseline Reproduction and Evaluation

• Reproduced a diffusion-based world model baseline (DIAMOND) and built
  a minimal evaluation pipeline for imagined rollouts under different
  counterfactual action sequences.
• Designed horizon-based stress tests to analyze visual quality, action
  fidelity, rollout drift, latency, and failure modes.
• Compared diffusion world models with Dreamer-style latent dynamics,
  clarifying when pixel-level generation is useful and when compact latent
  prediction is more suitable for planning.
• Key finding: high-quality video rollout alone is insufficient for robot
  control; world models must be evaluated by action fidelity, policy-ranking
  correlation, and real-task improvement.
```

## 验收标准

- [ ] 完成 baseline card，能讲清楚输入、输出、状态表示、动作条件化和训练闭环。
- [ ] 跑通最小复现路径，记录环境、命令、耗时、显存和失败点。
- [ ] 保存至少 3 组 counterfactual action rollout，并写出动作差异分析。
- [ ] 完成 rollout horizon 表，覆盖 1、5、10、20、50 step。
- [ ] 写出 DIAMOND vs DreamerV3 对照表。
- [ ] 输出 1–2 页 evaluation report，包含明确判断和下一步改进计划。

## 参考入口

- [DIAMOND 项目页](https://diamond-wm.github.io/)
- [DIAMOND GitHub](https://github.com/eloialonso/diamond)
- [DIAMOND 论文](https://arxiv.org/abs/2405.12399)
- [DreamerV3 论文](https://arxiv.org/abs/2301.04104)
- [DreamerV3 GitHub](https://github.com/danijar/dreamerv3)
