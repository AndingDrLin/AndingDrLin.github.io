---
title: "第4章 进度、WBS、沟通与风险"
description: "WBS、CPM、communication channels、risk、SWOT 与 conflict 场景复习笔记。"
date: 2026-04-27
tags:
  - exam-revision
  - project-management
  - risk
category: "课程学习"
docGroup: "epmf-final-exam-revision-notes"
order: 5
draft: false
---

## 考试要会什么

- WBS 定义、100% rule、out of scope
- WBS 层级分解与画图
- CPM forward/backward pass、critical path、float 计算
- Communication channels 公式与增量计算
- Communication model（push / pull / interactive）
- Risk management 过程链与 response strategies
- Conflict scenario 识别

---

## 一句话记忆

> WBS 定 scope，CPM 定工期，沟通用 channels 量化，风险用 strategies 应对。

---

## WBS

**Work Breakdown Structure (WBS)**：

> 对项目总范围进行层级化分解，把工作拆成更小、更易管理的部分。

### 必背判断点

- WBS = **Work Breakdown Structure**，不是 Work Breakdown Statement
- WBS 包含项目 **100%** 的工作（100% rule）
- 任何**不在 WBS 里的工作**都视为 out of scope
- WBS 可以按 deliverables、phases、subsystems 等方式分解

### 画 WBS 检查清单

| 层级 | 要求 |
|---|---|
| Level 0 | 项目总名称 |
| Level 1 | major deliverables / phases（3–5 个） |
| Level 2+ | work packages |
| 每层 | 完整覆盖 scope（100% rule） |
| WBS 外 | 不在 WBS 里的工作 = out of scope |

**Reference**: Set 1 Q3(a)(iv), Set 2 Q1.12, Set 4 Q1.6, Set 5 Q1.5–1.6

---

## Scope management process chain

| 过程 | 关键动作 | 高频考点 |
|---|---|---|
| Plan Scope Management | 制定 scope 管理方法 | — |
| Collect Requirements | 收集 stakeholder needs | 与 Define Scope 区分 |
| Define Scope | 形成项目/产品边界 | 输出 project scope statement |
| Create WBS | 层级分解 scope | 100% rule |
| Validate Scope | 客户/发起方确认成果 | 与 Control Scope 区分 |
| Control Scope | 控制 scope creep 与变更 | 变更走流程 |

---

## CPM / Critical Path Method

### critical path 定义

> 项目网络中历时最长的路径，决定项目最短工期。

### ES / EF / LS / LF / Float 符号表

| 符号 | 全称 | 含义 |
|---|---|---|
| ES | Early Start | 活动最早开始时间 |
| EF | Early Finish | 活动最早完成时间（ES + duration） |
| LS | Late Start | 活动最晚开始时间（LF − duration） |
| LF | Late Finish | 活动最晚完成时间 |
| Float | Slack | LS − ES = LF − EF；float = 0 → critical |

### 核心判断

- critical path 是 **longest path**，不是 shortest path
- 有多个 critical path 时，项目风险**增加**

### 迷你算例骨架

```
活动  duration  ES   EF   LS   LF   Float
A     3         0    3    0    3    0     ← critical
B     5         0    5    2    7    2
C     4         3    7    3    7    0     ← critical
D     2         7    9    7    9    0     ← critical
```

Critical path: A → C → D，总工期 = 3 + 4 + 2 = 9

**Reference**: Set 1 Q3(b), Set 2 Q2(f)(ii–iii), Set 3 Q2, Set 4 Q4(d), Set 5 Q1.1/Q1.4, Set 6 Q2(a–b)

---

## Forward pass / Backward pass

### Forward pass

1. 起点 `ES = 0`
2. `EF = ES + duration`
3. 后续活动的 `ES = max(所有前置活动的 EF)`

### Backward pass

1. 从终点开始倒推
2. `LS = LF - duration`
3. 前置活动的 `LF = min(所有后续活动的 LS)`

### 常见错误

- Forward pass 求 ES 时用了 **min** 而不是 max（只有 backward pass 才取 min）
- Backward pass 起点 LF 没有设为终点 EF（即项目总工期）
- 忘记把 float = 0 的活动标为 critical
- 并行活动只有一个在 critical path 上，误以为两条都是

---

## Communication management

### 过程链

- **Plan Communications Management**
- **Manage Communications**
- **Monitor Communications**

### Communication model（PM Part 4）

**Slides-backed**

| 类型 | 方向 | 驱动方 | 典型场景 | 信号词 |
|---|---|---|---|---|
| Push communication | 单向发送 | sender-driven | email, reports, memos | "send to", "distribute", "publish" |
| Pull communication | 接收者主动取 | receiver-driven | intranet, shared drives, wikis | "post to", "available on", "access" |
| Interactive communication | 双向实时 | 两者 | meetings, calls, video conferences | "discuss", "present", "review with" |

### 高频会议题

题目描述 meeting 无提前通知、side conversations 多、效率低时：

> **Publish a meeting agenda** 是最标准改善动作

---

## Communication channels

### 公式

`Channels = n(n - 1) / 2`

### 常见题型

**题型 1**：11 人 → 12 人

- 原 channels = 11 × 10 / 2 = **55**
- 新 channels = 12 × 11 / 2 = **66**
- 新增 = **11**

**题型 2**：6 人，+3 人，−2 人

- 新团队 = 6 + 3 − 2 = **7**
- 原 channels = 6 × 5 / 2 = **15**
- 新 channels = 7 × 6 / 2 = **21**
- 新增 = **6**

### 陷阱

不要只算"新增成员与旧成员之间的连接数"；题目问的通常是**新旧总 channels 差值**，不是增量连接。

---

## Risk management

### 过程链

- **Plan Risk Management**
- **Identify Risks**
- **Perform Qualitative Risk Analysis**
- **Perform Quantitative Risk Analysis**
- **Plan Risk Responses**
- **Implement Risk Responses**
- **Monitor Risks**

### 核心定义

项目风险管理不仅管理 threat，也包括识别和处理 **opportunities**。

### 高频最佳表述

> minimizing threats and maximizing opportunities

---

## Risk response strategies

### 威胁（Threats）策略

| 策略 | 含义 |
|---|---|
| **Avoid** | 消除威胁源头，改变计划以完全规避 |
| **Transfer** | 将影响转嫁给第三方（保险、外包） |
| **Mitigate** | 降低概率或影响程度 |
| **Accept** | 不主动处理，发生时再应对 |

### 机会（Opportunities）策略

| 策略 | 含义 |
|---|---|
| **Exploit** | 确保机会发生 |
| **Share** | 与第三方共享利益 |
| **Enhance** | 提高概率或影响程度 |
| **Accept** | 不主动追求，发生时再利用 |

> 样题中主要考查 **threat strategies**；opportunity strategies 需要了解但出现频率较低。

如果题目问"哪一个不属于 risk response planning"，常见错项是 **Identification**，因为那是识别阶段，不是 response strategy。

---

## SWOT

**SWOT** = Strengths, Weaknesses, Opportunities, Threats

### 考法

题目问：

> which technique can be mainly used to identify risks, especially external and internal factors?

答案：**SWOT**

---

## Conflict scenario 识别模板

| 策略 | 场景信号词 |
|---|---|
| **Avoid / Withdraw** | postpone discussion, hope issue resolves itself, withdraw from meeting |
| **Accommodate / Smooth** | maintain harmony, give up own preferred outcome, emphasize common ground |
| **Collaborate / Problem Solve** | work together, adjust scope/options to satisfy both sides, open dialogue |
| **Compete / Force** | manager imposes decision under pressure, use authority to settle |
| **Compromise / Reconcile** | each side gets part of what they want, find middle ground |

---

## 高频判断速记

### 一眼要会

- longest path → critical path（Set 1 Q3(b), Set 6 Q2(a)）
- float = 0 → critical activity（Set 2 Q2(f)(ii)）
- break scope into manageable elements → WBS（Set 2 Q1.12）
- team communication channels → `n(n-1)/2`（Set 3 Q2）
- identifying internal/external factors → SWOT（Set 4 Q1.6）
- publish agenda → better meeting order（Set 5 Q1.5）
- risk management = minimize threats AND maximize opportunities（Set 4 Q4(d)）

### 高频错项

- critical path = shortest path → 错，是 **longest** path（Set 1 Q3(b)）
- risk management = only threats → 错，也包括 opportunities（Set 4 Q4(d)）
- identification = risk response strategy → 错，那是识别阶段（Set 5 Q1.6）
- WBS excludes some minor work → 错，WBS 包含 100% 工作（Set 2 Q1.12）
