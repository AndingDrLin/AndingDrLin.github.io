---
title: "第2章 质量与 Six Sigma"
description: "QC/QA、7QC、control chart、Taguchi、Six Sigma 与 Cp/Cpk 复习笔记。"
date: 2026-04-27
tags:
  - exam-revision
  - quality
  - six-sigma
category: "课程学习"
docGroup: "epmf-final-exam-revision-notes"
order: 3
draft: false
---

## 考试要会什么

- QC vs QA 区别
- 7QC tools 识别（信号词 + 常见错法）
- control chart 计算与稳定判断（sigma 处理规则）
- Cost of Quality 四类划分
- Taguchi loss function 计算
- Six Sigma / DMAIC / CTQ 基本概念
- Cp / Cpk 计算与判断

## 一句话记忆

QC 检测问题、QA 预防问题，7QC tools 负责识别工具、control chart 看过程是否受控、Cpk 看过程是否稳定满足规格。

---

## QC vs QA

**QC (Quality Control)**：检查产品/过程输出，识别 defects，判断过程是否稳定。常见工具：7QC tools、control chart。

**QA (Quality Assurance)**：设计和保证过程本身，通过流程与制度预防问题，强调预防而非事后发现。

- **QC = detect and control defects**
- **QA = prevent defects by managing the process**

---

## 7QC tools 识别表

| Tool | 用途 | 信号词 | 常见错法 |
|---|---|---|---|
| Flowchart | 梳理流程步骤顺序 | steps, sequence, process flow | 当成因果图 |
| Check Sheet | 系统记录发生频次 | frequency, tally, recording data | 当成 Pareto |
| Pareto Chart | 按频率从高到低排序，抓 vital few | descending bars, most important causes, relative frequency | 忽略累积线，当成 histogram |
| Cause-and-Effect Diagram | 逻辑化组织问题的可能原因 | fishbone, Ishikawa, root causes, multiple causes | 误以为只找出唯一原因 |
| Control Chart | 观察过程随时间变化，判断是否稳定 | over time, stable / unstable, UCL / LCL, central line | 忘记判断 unstable 的非随机模式 |
| Histogram | 看数据分布形状 | distribution, frequency distribution | 当成 Pareto（没有排序） |
| Scatter Diagram | 看两个变量之间关系 | correlation, relationship between two variables | 当成 control chart |

---

## Cause-and-Effect Diagram

也叫 **Fishbone diagram** 或 **Ishikawa diagram**。

### 常见主干 categories（4M）

- **Machines**
- **Materials**
- **Methods**
- **Manpower**

### 答题方法

1. 先写中心问题（effect）
2. 再列主类别
3. 每类下面列 2–3 个可能 cause
4. 最后说明该图帮助团队系统定位 root causes

### 示例表述

- Machines: calibration drift, worn tools
- Materials: inconsistent raw material quality, contamination
- Methods: unclear work instructions, improper parameter settings
- Manpower: insufficient training, operator fatigue

Reference: Set 1 Q1.3, Set 2 Q1.2 / Q2(e), Set 4 Q1.2

---

## Control Chart

### 基本结构

- **Central Line (CL)**：均值 `\bar{X}`
- **Upper Control Limit (UCL)**：`\bar{X} + k\sigma`
- **Lower Control Limit (LCL)**：`\bar{X} - k\sigma`

sigma 处理规则：**题目指定 2σ 就用 2σ，常规默认 3σ，不要混用。**

### 如何判断 unstable

- 有点超出 UCL / LCL
- 出现异常趋势或明显非随机模式
- 波动异常大

### Sample Set 1 控制图计算示例

20 个 current 样本：mean ≈ 502.85，sample standard deviation ≈ 6.05。

按 2σ：UCL ≈ 514.94，LCL ≈ 490.76。

考试里核心不是小数点最后一位，而是：会算均值与标准差 → 会给出 CL / UCL / LCL → 会根据图或数据判断是否稳定。

Reference: Set 1 Q2(b), Set 2 Q1.3, Set 4 Q3(m), Set 5 Q1.10

---

## Cost of Quality

四类 Cost of Quality，各有明确例子：

| 类别 | 含义 | 典型例子 |
|---|---|---|
| **Prevention Cost** | 预防问题发生 | training, process design, quality planning |
| **Appraisal Cost** | 检查与评估 | inspection, testing, audits, calibration, acceptance sampling |
| **Internal Failure Cost** | 出厂前发现的问题 | scrap, rework, re-inspection |
| **External Failure Cost** | 客户侧发现的问题 | warranty repairs, recall, complaints handling, returns |

高频判断速记：training → Prevention；test / inspection → Appraisal；product recall / warranty repairs → External Failure。

---

## Robust Design

**Robust Design** 的目标：降低产品/过程对 noise factors 的敏感性，减少变异，使质量稳定。

高频表达：reduce variability / make performance less sensitive to noise / improve quality at low total loss。

---

## Taguchi loss function

对于 nominal-the-best：`L(y) = k(y - m)^2`

其中 `y` = observed value，`m` = target value，`k` = loss constant（若题目给 `A0` 和 `Δ0`，则 `k = A0 / (Δ0)^2`）。

核心含义：偏离目标越大，损失越大；损失是二次增长，不是线性增长；即使没超公差，只要偏离目标也可能已产生损失。

### 示例（Sample Set 1）

目标 m = 8.5，k = 1，10 个观测值：

`8.10 → 0.16  |  8.90 → 0.16  |  8.45 → 0.0025  |  9.25 → 0.5625  |  8.86 → 0.1296  |  8.35 → 0.0225  |  8.25 → 0.0625  |  8.68 → 0.0324  |  8.90 → 0.16  |  9.05 → 0.3025`

**Total loss = 1.5945**

常见 loss types：Nominal-the-best / Smaller-the-better / Larger-the-better。

Reference: Set 1 Q3(a)(iii), Set 3 Q3(r), Set 4 Q3(n)

---

## Noise factors / P-diagram

Robust design 会把影响响应 y 的因素分类：

- **Noise factors**：引起波动、但通常难以控制的因素
- **Control factors**：设计者可以主动设定或优化的因素
- **Signal factors**：输入或功能相关信号

题目问"写任意两类"，写其中两类即可。

---

## Six Sigma

### 定义

一种以减少 defects、降低 variation、改进 process capability 为目标的方法体系。

### DMAIC

Define → Measure → Analyze → Improve → Control

题目问 "roadmap for Six Sigma"，答案通常就是 DMAIC。

### CTQ

**Critical-to-Quality (CTQ)**：对客户质量感知最关键、必须被满足的质量特性。

### 其他高频小考点

- **Poka-yoke (mistake-proofing)**：用简单机制防止人为错误
- Six Sigma 组织角色：Champion（项目赞助）/ Black Belt（专职改进）/ Green Belt（兼职参与）

Reference: Set 1 Q1.4, Set 3 Q3(s)

---

## Process capability: Cp / Cpk

**Cp** = `(USL - LSL) / 6σ`

只看过程"分布宽度"相对规格宽度够不够，不考虑过程中心是否偏移。

**Cpk** = `min[(USL - μ)/(3σ), (μ - LSL)/(3σ)]`

既看离散程度，也看均值是否偏心。

### Cpk 判断表

| Cpk 值 | 含义 |
|---|---|
| Cpk ≥ 1.33 | 过程能力足够 |
| 1.0 ≤ Cpk < 1.33 | 边界，需关注 |
| Cpk < 1.0 | 过程能力不足，无法稳定满足规格 |

**Cp 高但 Cpk 低** → 过程潜力可以但中心偏了；**Cp、Cpk 都低** → 过程本身能力不足。

### Sample Set 1 例子

规格：500 ± 5（USL = 505，LSL = 495），μ ≈ 502.85，σ ≈ 6.05。

Cp ≈ 0.276，Cpk ≈ 0.119 → 过程 capability 很差，波动大且中心偏向上侧规格，不足以稳定满足要求。

Reference: Set 1 Q2(c), Set 3 Q3(s), Set 4 Q3(o), Set 5 Q1.11, Set 6 Q3(t)(ii)

---

## 高频判断速记

### 一看就该选的

- fishbone / Ishikawa → cause-effect diagram (Set 1 Q1.3, Set 2 Q1.2)
- process over time → control chart (Set 1 Q2(b), Set 2 Q1.3)
- descending bars → Pareto chart (Set 4 Q1.2)
- Six Sigma roadmap → DMAIC (Set 1 Q1.4, Set 3 Q3(s))
- meets specifications consistently → process capability / Cpk (Set 1 Q2(c), Set 5 Q1.11)
- training → Prevention cost (Set 1 Q3(a)(iii))
- recall / warranty → External Failure cost (Set 4 Q3(n))

### 一看就该警惕的错项

- process capability measures only worker skill → 错
- control chart judges profitability → 错
- QC = only prevention system → 错（QC 是 detect，QA 才是 prevent）
- cause-effect diagram identifies only one sole cause → 错（fishbone 是多原因框架）
- Cp 高就代表过程满足规格 → 错（需同时看 Cpk 是否偏心）
