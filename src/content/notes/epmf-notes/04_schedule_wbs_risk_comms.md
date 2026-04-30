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
---

## 1. WBS 是什么

**Work Breakdown Structure (WBS)**：

> 对项目总范围进行层级化分解，把工作拆成更小、更易管理的部分。

### 必背判断点

- WBS = **Work Breakdown Structure**，不是 Work Breakdown Statement
- WBS 包含项目 **100%** 的工作
- 任何**不在 WBS 里的工作**都视为 out of scope
- WBS 可以按 deliverables、phases、subsystems 等方式分解，不是只能按 work packages 一种思路

### 高频正确组合

- “The WBS includes 100 percent of the work of the project.”
- “Any work not included in the WBS is out of scope.”

---

## 2. Scope management process chain

根据已读 PM Part 2 截图，scope management 的关键过程包括：

- **Plan Scope Management**
- **Collect Requirements**
- **Define Scope**
- **Create WBS**
- **Validate Scope**
- **Control Scope**

### 你要会区分

- **Collect Requirements**：收集 stakeholder needs
- **Define Scope**：形成更清晰的项目/产品边界
- **Create WBS**：把 scope 进一步层级分解
- **Validate Scope**：让客户/发起方确认成果
- **Control Scope**：控制 scope creep 与变更

---

## 3. WBS 长题怎么写 / 怎么画

如果题目说：

- 有 3 个 major phases
- 每个 phase 再拆两层
- 画出 three levels

你可以按下面思路：

### 示例骨架

- Project
  - Planning
    - requirement analysis
    - project plan
  - Design
    - hardware design
    - software design
  - Testing
    - unit testing
    - system testing

### 评分点通常看什么

- 是否有层级结构
- 是否完整覆盖 scope
- Level 1 / Level 2 / Level 3 是否清楚
- 是否逻辑合理

---

## 4. CPM / Critical Path Method

### critical path 定义

> 项目网络中历时最长的路径，它决定项目最短工期。

### 一定要会的几个词

- **Forward pass** → 求 `ES` / `EF`
- **Backward pass** → 求 `LS` / `LF`
- **Float / Slack** → `LS - ES` 或 `LF - EF`
- **Critical activities** → float = 0

### 核心判断

- critical path 是**longest path**，不是 shortest path
- 有多个 critical path 时，项目风险通常**增加**

---

## 5. Forward pass / Backward pass 通用步骤

### Forward pass

1. 起点 `ES = 0`
2. `EF = ES + duration`
3. 后续活动的 `ES = max(所有前置活动的 EF)`

### Backward pass

1. 从终点开始倒推
2. `LS = LF - duration`
3. 前置活动的 `LF = min(所有后续活动的 LS)`

### Float

`Float = LS - ES = LF - EF`

如果 `Float = 0`，活动在 critical path 上。

---

## 6. Communication management

根据 PM Part 4 截图，communication management 关键过程包括：

- **Plan Communications Management**
- **Manage Communications**
- **Monitor Communications**

### 高频会议题

如果题目说：

- meeting 无提前通知
- side conversations 太多
- 效率低

最标准改善动作通常是：

> **Publish a meeting agenda**

因为这比“减少人数”或“请高管来”更直接对应 communication planning。

---

## 7. Communication channels 公式

`Channels = n(n - 1) / 2`

其中 `n` 是团队成员数。

### 常见题型 1

11 人团队变成 12 人团队：
- 原 channels = `11×10/2 = 55`
- 新 channels = `12×11/2 = 66`
- 新增 = `11`

### 常见题型 2

6 人团队，新增 3 人，离开 2 人：
- 原团队 6 人
- 新团队 = `6 + 3 - 2 = 7`
- 原 channels = `6×5/2 = 15`
- 新 channels = `7×6/2 = 21`
- 新增 = `6`

### 高频陷阱

不要只算“新成员与旧成员”的连接；考试一般要求比较**新旧总 channels 差值**。

---

## 8. Risk management

根据 PM Part 4 截图，风险管理过程包括：

- **Plan Risk Management**
- **Identify Risks**
- **Perform Qualitative Risk Analysis**
- **Perform Quantitative Risk Analysis**
- **Plan Risk Responses**
- **Implement Risk Responses**
- **Monitor Risks**

### 核心定义

项目风险管理不仅是管理 threat，也包括识别和处理 **opportunities**。

### 高频最佳表述

> minimizing threats and maximizing opportunities

---

## 9. Risk response strategies

样题里给出的四大策略：

- **Avoidance**
- **Acceptance**
- **Transference**
- **Mitigation**

如果题目问“哪一个不属于 risk response planning”，常见错项是：

- **Identification**

因为那是识别阶段，不是 response strategy。

---

## 10. SWOT

**SWOT** =

- Strengths
- Weaknesses
- Opportunities
- Threats

### 考法

如果题目问：

> which technique can be mainly used to identify risks, especially external and internal factors?

通常答案是：

> **SWOT**

---

## 11. Conflict scenario 识别模板

### Avoid / Withdraw

- postpone discussion
- hope issue resolves itself

### Accommodate / Smooth

- maintain harmony
- give up own preferred outcome

### Collaborate / Problem Solve

- work together
- adjust scope / options to satisfy both sides

### Compete / Force

- manager imposes decision under pressure

### Compromise / Reconcile

- each side gets part of what they want

---

## 12. MCQ 速记

### 一眼要会

- longest path → critical path
- float = 0 → critical activity
- break scope into manageable elements → WBS
- team communication channels → `n(n-1)/2`
- identifying internal/external factors → SWOT
- publish agenda → better meeting order

### 高频错项

- critical path = shortest path
- risk management = only threats
- identification = risk response strategy
- WBS excludes some minor work

---

## 13. Coverage 提示

本册中的 WBS、communication、risk 支撑较强；CPM 全套计算与 conflict 情景题建议同时参考 `06_formulas_and_answer_templates.md` 与 `07_coverage_and_gaps.md`。
