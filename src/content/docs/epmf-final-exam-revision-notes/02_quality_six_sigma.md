---
title: "第2章 质量与 Six Sigma"
description: "QC/QA、7QC、control chart、Taguchi、Six Sigma 与 Cp/Cpk 复习笔记。"
date: 2026-04-27
tags:
  - exam-revision
  - quality
  - six-sigma
category: "课程复习"
docGroup: "epmf-final-exam-revision-notes"
order: 3
draft: false
---
---

## 1. QC 与 QA 的区别

### Quality Control (QC)

**QC** 偏向：

- 检查产品/过程输出
- 识别 defects
- 判断过程是否稳定
- 常见工具：7QC tools、control chart

### Quality Assurance (QA)

**QA** 偏向：

- 设计和保证过程本身
- 通过流程与制度预防问题
- 更强调预防而不是事后发现

### 一句话对比

- **QC = detect and control defects**
- **QA = prevent defects by managing the process**

---

## 2. 7QC tools

样题里最常见的 7QC tools 包括：

- **Flowchart**
- **Check Sheet**
- **Pareto Chart**
- **Cause-and-Effect Diagram**
- **Control Chart**
- **Histogram**
- **Scatter Diagram**

### 必须会的识别题

#### Cause-and-Effect Diagram

也叫：

- **Fishbone diagram**
- **Ishikawa diagram**

用途：

> 逻辑化组织某个问题的可能原因，并展示因果关系。

#### Pareto Chart

用途：

> 按重要性或频率从高到低排序，抓“vital few”。

识别词：

- descending bars
- relative frequency
- most important causes

#### Control Chart

用途：

> 观察过程随时间变化，判断过程是否稳定、是否受控。

识别词：

- over time
- stable / unstable
- UCL / LCL
- central line

---

## 3. Cause-and-Effect Diagram 长题怎么答

如果题目要你分析某种 defect 的 root causes，可以用下面框架：

### 常见主干 categories

- **Machines**
- **Materials**
- **Methods**
- **Manpower**

有时也可写成 6M 版本，但样题已经明确给出四类时，就按题干写。

### 答题方法

1. 先写中心问题（effect）
2. 再画主类别
3. 每类下面列 2–3 个可能 cause
4. 最后说明该图帮助团队系统定位 root causes

### 示例表述

- Machines: calibration drift, worn tools
- Materials: inconsistent raw material quality, contamination
- Methods: unclear work instructions, improper parameter settings
- Manpower: insufficient training, operator fatigue

---

## 4. Control Chart

### 基本结构

- **Central Line (CL)**：通常是均值 `\bar{X}`
- **Upper Control Limit (UCL)**
- **Lower Control Limit (LCL)**

在样题风格里，常按 `2*Sigma` 或 `3*Sigma` 给限值。

### 常用形式

- `UCL = \bar{X} + k\sigma`
- `LCL = \bar{X} - k\sigma`

其中：
- `k = 2` 或 `3`，按题目要求
- `\sigma` 为标准差

### 如何判断 unstable

常见判断：

- 有点超出 UCL / LCL
- 出现异常趋势或明显非随机模式
- 波动异常大

### Sample Set 1 控制图计算示例

20 个 current 样本：

- mean `\approx 502.85`
- sample standard deviation `\approx 6.05`

若按 `2\sigma`：

- `UCL \approx 514.94`
- `LCL \approx 490.76`

如果采用总体标准差近似：

- `UCL \approx 514.64`
- `LCL \approx 491.06`

考试里核心不是小数点最后一位，而是：

1. 会算均值与标准差
2. 会给出 CL/UCL/LCL
3. 会根据图或数据判断是否稳定

---

## 5. Cost of Quality

样题明确出现四类：

- **Prevention Cost**
- **Appraisal Cost**
- **Internal Failure Cost**
- **External Failure Cost**

### 记忆方式

#### Prevention

预防问题发生：
- training
- process design
- quality planning

#### Appraisal

检查与评估：
- inspection
- testing
- audits
- calibration
- acceptance sampling

#### Internal Failure

出厂前发现的问题：
- scrap
- rework
- re-inspection

#### External Failure

客户侧发现的问题：
- warranty repairs
- recall
- complaints handling
- returns

### 高频判断

- training → Prevention
- test/inspection → Appraisal
- product recall / warranty repairs → External Failure

---

## 6. Robust Design

### 核心思想

**Robust Design** 的目标不是只追求平均值达标，而是：

> 降低产品/过程对 noise factors 的敏感性，减少变异，使质量稳定。

### 高频表达

- reduce variability
- make performance less sensitive to noise
- improve quality at low total loss

---

## 7. Taguchi loss function

### 核心公式

对于 nominal-the-best：

`L(y) = k(y - m)^2`

其中：
- `y` = observed value
- `m` = target value
- `k` = loss constant

如果题目给 `A0` 和 `\Delta 0`，则：

`k = A0 / (\Delta 0)^2`

### 含义

- 偏离目标越大，损失越大
- 损失是**二次增长**，不是线性增长
- 即使没超公差，只要偏离目标，也可能已经产生损失

### Sample Set 1 示例

目标 `m = 8.5`，`k = 1`

10 个观测值的 loss：

- 8.10 → 0.1600
- 8.90 → 0.1600
- 8.45 → 0.0025
- 9.25 → 0.5625
- 8.86 → 0.1296
- 8.35 → 0.0225
- 8.25 → 0.0625
- 8.68 → 0.0324
- 8.90 → 0.1600
- 9.05 → 0.3025

**Total loss = 1.5945**

### 常见 loss types

课程截图与样题可安全记住：

- **Nominal-the-best**
- **Smaller-the-better**
- **Larger-the-better**

---

## 8. Noise factors / P-diagram

截图显示 robust design 会把影响响应 `y` 的因素分类。

你至少要会写：

- **Noise factors**：引起波动、但通常难以控制的因素
- **Control factors**：设计者可以主动设定或优化的因素
- **Signal factors**：输入或功能相关信号

如果题目问“写任意两类”，写其中两类即可。

---

## 9. Six Sigma

### 定义

**Six Sigma** 是一种以减少 defects、降低 variation、改进 process capability 为目标的方法体系。

### 高频考点：DMAIC

- **Define**
- **Measure**
- **Analyze**
- **Improve**
- **Control**

如果题目问“roadmap for Six Sigma”，答案通常就是 **DMAIC**。

### CTQ

**Critical-to-Quality (CTQ)**：

> 对客户质量感知最关键、必须被满足的质量特性。

---

## 10. Process capability

### 两个核心指标

#### Cp

`Cp = (USL - LSL) / 6\sigma`

含义：
- 只看过程“分布宽度”相对规格宽度够不够
- 不考虑过程中心是否偏移

#### Cpk

`Cpk = min[(USL - \mu)/(3\sigma), (\mu - LSL)/(3\sigma)]`

含义：
- 既看离散程度，也看均值是否偏心

### 判断逻辑

- `Cp` 高但 `Cpk` 低：说明过程潜力可以，但中心偏了
- `Cp`、`Cpk` 都低：说明过程本身能力不足
- `Cpk < 1`：通常说明过程难以稳定满足规格

### Sample Set 1 例子

规格：`500 ± 5`，即：
- `USL = 505`
- `LSL = 495`

由样本近似计算：
- `\mu \approx 502.85`
- `\sigma \approx 6.05`

得到：
- `Cp \approx 0.276`
- `Cpk \approx 0.119`

结论：

> 该过程 capability 很差，波动大且中心偏向上侧规格，不足以稳定满足要求。

---

## 11. MCQ 速记

### 一看就该选的

- fishbone / Ishikawa → cause-effect diagram
- process over time → control chart
- descending bars → Pareto chart
- Six Sigma roadmap → DMAIC
- meets specifications consistently → process capability

### 一看就该警惕的错项

- process capability measures only worker skill
- control chart judges profitability
- QC = only prevention system
- cause-effect diagram identifies only one sole cause

---

## 12. Coverage 提示

本册整体支撑较强，适合优先复习；更细的覆盖边界统一看 `07_coverage_and_gaps.md`。
