---
title: "第8章 考试专题：质量工具与过程能力"
description: "7QC 工具识别速记、控制图计算专练、Cp/Cpk 计算专练、Cost of Quality 分类、Six Sigma DMAIC。"
date: 2026-06-11
tags:
  - exam-revision
  - quality
  - control-chart
  - cp-cpk
category: "课程学习"
docGroup: "epmf-final-exam-revision-notes"
order: 8
draft: false
---

## 本章定位

这章专门训练质量工具的识别和计算能力。控制图和 Cp/Cpk 几乎每年必考计算题。7QC 工具的"哪个不是"类 MCQ 也是高频考点。

---

## 7QC 工具速记表

考试会给你工具描述，让你选是哪个工具。或者反过来，给你选项让你挑"哪个不是 7QC 工具"。

| 工具 | 英文名 | 信号词/描述 | 常见混淆项 |
|------|--------|------------|-----------|
| 因果图 | Cause-and-Effect / Fishbone / Ishikawa | "root cause", "4M: Man, Machine, Method, Material" | — |
| 检查表 | Check Sheet | "data collection", "tally", "checklist" | **Check list** 是对的 |
| 控制图 | Control Chart | "over time", "stable", "UCL/LCL", "process control" | — |
| 直方图 | Histogram | "frequency distribution", "shape of data" | 和 Pareto 的区别：Histogram 无排序 |
| 帕累托图 | Pareto Chart | "descending order", "80/20", "priority" | 和 Histogram 的区别：Pareto 从高到低排序 |
| 散点图 | Scatter Diagram | "relationship", "correlation", "two variables" | — |
| 流程图 | Flowchart | "steps in a process", "graphical description" | — |

**"哪个不是 7QC 工具"高频错项**：

| 错项 | 真实归属 |
|------|---------|
| Affinity diagram | 新 7QC 工具（Management tools） |
| Matrix diagram | 新 7QC 工具（Management tools） |
| Stratification | 有时算第 7 个（替换 Flowchart），看教材定义 |
| Tree diagram | 新 7QC 工具 |
| PDPC | 新 7QC 工具 |

**记忆口诀**：7QC = "鱼检控直帕散流"（鱼骨图、检查表、控制图、直方图、帕累托图、散点图、流程图）

---

## 7QC 工具真题考法

### 2023 年真题 Q16/Q32/Q47

三套卷子都考 "All of the following are among the 7 QC tools EXCEPT"：

- Q16 错项：E — Affinity diagram（不是 7QC 工具）
- Q32 错项：D — Matrix diagram（不是 7QC 工具）
- Q47 错项：E — Matrix diagram（不是 7QC 工具）

**规律**：Matrix diagram 和 Affinity diagram 是最常见的错项。

### 样题 MCQ 考法

- "Which 7-QC tool looks at a bar chart sorted in descending order?" → **Pareto Chart**
- "Which tool is used to study how a process changes over time?" → **Control Chart**
- "Which tool logically organizes possible factors related to a problem?" → **Cause-Effect Diagram**
- "Which tool provides a graphical description of steps in a process?" → **Flowchart**

---

## 控制图计算专练

### 两种计算方法

**方法一：直接法**（给原始数据，直接算均值和标准差）

$$CL = \bar{\bar{x}} = \frac{1}{n}\sum x_i$$

$$UCL = \bar{\bar{x}} + k \cdot s，\quad LCL = \bar{\bar{x}} - k \cdot s$$

$$s = \sqrt{\frac{\sum(x_i - \bar{\bar{x}})^2}{n - 1}}$$

**方法二：查表法**（给 $\bar{\bar{x}}$、$\bar{R}$、样本量，查 $A_2$、$D_4$、$d_2$）

$$UCL_{\bar{x}} = \bar{\bar{x}} + A_2 \bar{R}，\quad LCL_{\bar{x}} = \bar{\bar{x}} - A_2 \bar{R}$$

$$UCL_R = D_4 \bar{R}，\quad LCL_R = 0$$

---

### 练习 1：简单 CL/UCL/LCL 计算（3σ 直接法）

> 参考样题 Set 1 Q2(b) 风格

一个电子电路测试中，测得 20 个电流样本值（mA）：

| # | 值 | # | 值 | # | 值 | # | 值 |
|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
| 1 | 510 | 6 | 500 | 11 | 505 | 16 | 500 |
| 2 | 516 | 7 | 510 | 12 | 511 | 17 | 490 |
| 3 | 500 | 8 | 505 | 13 | 500 | 18 | 505 |
| 4 | 495 | 9 | 500 | 14 | 498 | 19 | 507 |
| 5 | 505 | 10 | 499 | 15 | 501 | 20 | 500 |

使用 2σ 控制限。判断过程是否稳定。

**解**：

**Step 1** — 算 CL

$$\bar{\bar{x}} = \frac{510+516+500+495+505+500+510+505+500+499+505+511+500+498+501+500+490+505+507+500}{20} = \frac{10057}{20} = 502.85 \text{ mA}$$

**Step 2** — 算标准差

$$s = \sqrt{\frac{\sum(x_i - 502.85)^2}{19}} \approx 6.13 \text{ mA}$$

**Step 3** — 算 UCL/LCL（2σ）

$$UCL = 502.85 + 2 \times 6.13 = 502.85 + 12.26 = 515.11 \text{ mA}$$

$$LCL = 502.85 - 2 \times 6.13 = 502.85 - 12.26 = 490.59 \text{ mA}$$

**Step 4** — 判断

检查所有 20 个数据点：样本 2 = 516 > UCL (515.11)，超出上控制限。样本 17 = 490 < LCL (490.59)，超出下控制限。

**结论**：过程**不稳定**（out of control），有 2 个点超出控制限。

---

### 练习 2：查表法（X-bar 和 R 图）

> 参考 2023 年真题 Q25/Q36/Q50 风格

某产品规格 $100 \pm 3$ cm。过程受控。样本均值的均值 $\bar{\bar{x}} = 99$ cm，平均极差 $\bar{R} = 1.2$ cm，样本量 $n = 6$。

已知：$A_2 = 0.483$，$D_4 = 2.004$，$d_2 = 2.534$。

**(a)** 求 X-bar 图的 UCL 和 LCL。

**解**：

$$UCL_{\bar{x}} = \bar{\bar{x}} + A_2 \bar{R} = 99 + 0.483 \times 1.2 = 99 + 0.58 = 99.58$$

$$LCL_{\bar{x}} = \bar{\bar{x}} - A_2 \bar{R} = 99 - 0.483 \times 1.2 = 99 - 0.58 = 98.42$$

**(b)** 求 R 图的 UCL 和 LCL。

**解**：

$$UCL_R = D_4 \bar{R} = 2.004 \times 1.2 = 2.40$$

$$LCL_R = 0 \quad \text{（R 图 LCL 最小为 0）}$$

---

### 练习 3：数据判断稳定性

> 参考样题 Set 4 Q3(m)(vi) 风格

某过程的控制图 CL = 50，UCL = 53，LCL = 47。以下是 15 个连续样本点：

| # | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 |
|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
| 值 | 50 | 51 | 49 | 50 | 52 | 51 | 54 | 55 | 53 | 56 | 54 | 52 | 57 | 55 | 58 |

判断过程是否稳定。

**解**：

逐一检查：
- 样本 7 = 54 > UCL (53) ✗
- 样本 8 = 55 > UCL (53) ✗
- 样本 10 = 56 > UCL (53) ✗
- 样本 13 = 57 > UCL (53) ✗
- 样本 15 = 58 > UCL (53) ✗

**结论**：过程**不稳定**。5 个点超出 UCL，且呈现上升趋势（trend），说明过程有系统性偏移。

---

## Cp/Cpk 计算专练

### 关键公式

$$C_p = \frac{USL - LSL}{6\sigma}$$

$$C_{pk} = \min\left[\frac{USL - \mu}{3\sigma}, \frac{\mu - LSL}{3\sigma}\right]$$

**当题目给极差数据时**：$\sigma = \bar{R} / d_2$

---

### 练习 1：过程居中（Cp = Cpk）

> 参考 2023 年真题 Q51 风格

规格 $100 \pm 3$ cm。$\bar{\bar{x}} = 100$ cm，$\bar{R} = 1.2$ cm，$n = 6$，$d_2 = 2.534$。

**解**：

**Step 1** — USL = 103，LSL = 97

**Step 2** — 算 $\sigma$

$$\sigma = \frac{\bar{R}}{d_2} = \frac{1.2}{2.534} = 0.4736$$

**Step 3** — 算 $C_p$

$$C_p = \frac{103 - 97}{6 \times 0.4736} = \frac{6}{2.8416} = 2.11$$

**Step 4** — 算 $C_{pk}$

因为过程居中 $\mu = 100$ = 目标值，所以 $C_{pk} = C_p = 2.11$。

**结论**：$C_p = C_{pk} = 2.11$，过程宽度远小于规格宽度（有较大余量），且过程居中，能力优秀。

---

### 练习 2：过程偏心（Cpk < Cp）

> 参考 2023 年真题 Q26 风格

规格 $100 \pm 3$ cm。$\bar{\bar{x}} = 99$ cm（偏向下限），$\bar{R} = 1.2$ cm，$n = 6$，$d_2 = 2.534$。

**解**：

$$\sigma = \frac{1.2}{2.534} = 0.4736$$

$$C_p = \frac{USL - LSL}{6\sigma} = \frac{6}{6 \times 0.4736}$$

$$\frac{USL - \mu}{3\sigma} = \frac{103 - 99}{3 \times 0.4736} = \frac{4}{1.4208} = 2.815$$

$$\frac{\mu - LSL}{3\sigma} = \frac{99 - 97}{3 \times 0.4736} = \frac{2}{1.4208} = 1.408$$

$$C_{pk} = \min(2.815, 1.408) = 1.408$$

**结论**：$C_{pk} < C_p$，说明过程偏心，靠近 LSL 一侧的风险更大。

---

### 练习 3：综合判断

> 参考样题 Set 4 Q3(o) 和 Set 6 Q3(t)(ii) 风格

某电子元件规格 $20 \pm 1$ mm。过程均值 $\mu = 19.8$ mm，标准差 $\sigma = 0.2$ mm。

**(a)** 算 $C_{pk}$。

**解**：

$$USL = 21, \quad LSL = 19$$

$$\frac{USL - \mu}{3\sigma} = \frac{21 - 19.8}{3 \times 0.2} = \frac{1.2}{0.6} = 2.0$$

$$\frac{\mu - LSL}{3\sigma} = \frac{19.8 - 19}{3 \times 0.2} = \frac{0.8}{0.6} = 1.33$$

$$C_{pk} = \min(2.0, 1.33) = 1.33$$

**(b)** 讨论风险等级。

**答**：

$C_{pk} = 1.33$，属于"良好"等级（capable）。过程偏向 LSL 一侧（$\mu = 19.8$ < 目标值 20），但仍在可接受范围内。风险较低，建议监控过程均值是否进一步向 LSL 偏移。

---

## Cost of Quality 四分类速查

| 类型 | 英文 | 含义 | 典型例子 | 信号词 |
|------|------|------|---------|--------|
| 预防成本 | Prevention Cost | 为防止缺陷发生而花的钱 | 质量培训、设计评审、过程规划、供应商评审 | "prevent", "training", "planning", "design review" |
| 鉴定成本 | Appraisal Cost | 为发现缺陷而花的钱 | 测试检验、供应商验收抽样、产品审计、校准 | "test", "inspection", "audit", "calibration", "sampling" |
| 内部故障成本 | Internal Failure Cost | 出厂前发现的缺陷造成的损失 | 废品、返工、重新检验、重新测试 | "scrap", "rework", "re-inspection" |
| 外部故障成本 | External Failure Cost | 出厂后发现的缺陷造成的损失 | 保修维修、产品召回、客户投诉、违约赔偿 | "warranty", "recall", "complaint", "penalty", "SLA" |

**高频混淆项**：

| 项目 | 正确分类 | 易错分类 |
|------|---------|---------|
| Equipment upgrades（设备升级） | Prevention | Appraisal ✗ |
| Training cost（培训费） | Prevention | 其他 ✗ |
| Calibration（校准） | Appraisal | Prevention ✗ |
| Operation cost（运营成本） | **不属于** CoQ | — |
| Supplier acceptance sampling | Appraisal | Prevention ✗ |

**2023 年真题考法**：

- Q21：CoQ 包括哪些？→ 四个全对
- Q23：CoQ 不包括哪个？→ Operation cost
- Q38：CoQ 不包括哪个？→ 具体选项需核对原题。注意：Training cost 属于 Prevention Cost（是 CoQ 的一部分），Operation cost 不属于 CoQ。做题时需仔细看题意。（建议人工确认此题答案）

---

## Six Sigma DMAIC 速记

| 阶段 | 英文 | 一句话 | 信号词 | 常见错项 |
|:---:|------|--------|--------|---------|
| D | **Define** | 定义问题和目标 | "problem statement", "goal", "CTQ", "charter" | — |
| M | **Measure** | 测量当前表现 | "data collection", "baseline", "current performance" | — |
| A | **Analyse** | 分析根因 | "root cause", "fishbone", "Pareto", "statistical analysis" | — |
| I | **Improve** | 改进方案 | "solution", "pilot", "DOE", "optimize" | — |
| C | **Control** | 控制和维持 | "control chart", "sustain", "standard operating procedure" | **"Calibrate"** ✗ |

**PDCA vs DMAIC**：PDCA = Plan-Do-Check-Act（持续改进循环）。2022 年真题 Q1.3 考过。

**关键数字**：Six Sigma 水平 = 3.4 DPMO（Defects Per Million Opportunities）

---

## 综合练习：质量分析全流程

> 串联整个分析链：Check Sheet → Pareto → Fishbone → Control Chart → Cpk

**场景**：一家 PCB 工厂最近客户投诉增多，反映焊点质量不稳定。作为质量工程师，你需要走完以下分析流程。

### Step 1：Check Sheet（数据收集）

先用检查表收集 1 周的缺陷数据：

| 缺陷类型 | 周一 | 周二 | 周三 | 周四 | 周五 | 合计 |
|---------|:---:|:---:|:---:|:---:|:---:|:---:|
| 虚焊 | 12 | 15 | 10 | 14 | 11 | 62 |
| 桥接 | 5 | 4 | 6 | 3 | 5 | 23 |
| 偏移 | 2 | 1 | 3 | 2 | 1 | 9 |
| 其他 | 1 | 0 | 1 | 1 | 0 | 3 |

### Step 2：Pareto Chart（优先级排序）

按频率从高到低排列：

| 缺陷 | 频率 | 累计百分比 |
|------|:---:|:---:|
| 虚焊 | 62 | 63.9% |
| 桥接 | 23 | 87.6% |
| 偏移 | 9 | 96.9% |
| 其他 | 3 | 100% |

**判断**：虚焊占 64%，是主要问题。Pareto 原则（80/20）：聚焦虚焊可以解决大部分问题。

### Step 3：Fishbone Diagram（根因分析）

针对"虚焊"画鱼骨图，用 4M 分类：

- **Man（人）**：操作员培训不足、换岗频繁
- **Machine（机）**：烙铁温度不稳定、送锡机构磨损
- **Method（法）**：焊接参数未标准化、缺少过程检验点
- **Material（料）**：焊锡膏过期、PCB 焊盘氧化

### Step 4：Control Chart（过程监控）

从焊接工序取 20 个样本，计算 UCL/CL/LCL，判断过程是否稳定。

如果有点超出控制限 → 过程不稳定，需要先稳定过程再谈能力。

### Step 5：Cpk（能力评估）

过程稳定后，用规格限算 $C_p$ 和 $C_{pk}$：

- $C_p$ < 1.0 → 过程本身能力不足，需要改进设备/工艺
- $C_p \geq 1.33$ 但 $C_{pk}$ < 1.0 → 能力够但偏心，需要调整过程均值

**完整分析链总结**：

$$\text{Check Sheet} \xrightarrow{\text{收集数据}} \text{Pareto} \xrightarrow{\text{找主要问题}} \text{Fishbone} \xrightarrow{\text{找根因}} \text{Control Chart} \xrightarrow{\text{判断稳定性}} C_{pk} \xrightarrow{\text{判断能力}}$$

---

## 历年真题考查情况

| 知识点 | 2022 | 2023 | 2024 | 2025 |
|--------|------|------|------|------|
| 7QC 工具识别 | — | Q16/Q32/Q47 | MCQ 中出现 | MCQ 中出现 |
| 控制图计算 | Q3.4 | Q25/Q36/Q50 | Q7 | Q4(ii) |
| Cp/Cpk 计算 | Q3.4 | Q26/Q37/Q51 | Q7 | Q4(iii) |
| Taguchi Loss | Q1.9 | Q24/Q34/Q49 | Q8 | Q4(i) |
| Cost of Quality | — | Q21/Q23/Q38 | MCQ 中出现 | MCQ 中出现 |
| DMAIC | — | — | MCQ 中出现 | MCQ 中出现 |
| Fishbone 画图 | — | — | — | 样题 Set 2 Q2(e) |
