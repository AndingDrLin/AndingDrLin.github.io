---
title: "第2章 质量与 Six Sigma"
description: "QC/QA、7QC、control chart、Cost of Quality、Robust Design、Taguchi、Six Sigma 与 Cp/Cpk 自学复习笔记。"
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

## 本章概览

这一章其实分成三条线：**质量控制工具**、**鲁棒设计思想**、**Six Sigma 与过程能力**。如果没有上过课，最容易犯的错误是把这些词都当成“提高质量的方法”，但考试会要求你区分：某个场景到底该用 fishbone、Pareto、control chart，还是 Cp/Cpk。

先给一个总判断：**QC/7QC 解决“怎么发现和分析质量问题”，Robust Design 解决“怎么让产品对噪声不敏感”，Six Sigma/Cp/Cpk 解决“过程是否稳定满足规格”。** 三者有联系，但不是同一个东西。

### 零基础先览

| 模块 | 先理解成什么 | 考试最常问什么 |
|---|---|---|
| QC vs QA | QC 是事后检查，QA 是事前预防 | 哪个是 detect，哪个是 prevent |
| 7QC tools | 7 个基础质量分析工具 | 给信号词选工具，例如 fishbone / Pareto / control chart |
| Control chart | 按时间看过程是否稳定 | 算 CL/UCL/LCL，并判断 stable / unstable |
| Cost of Quality | 为了质量花的钱 + 因质量差损失的钱 | training、inspection、scrap、recall 分别属于哪类 |
| Robust Design | 不一定消除干扰，而是让产品不怕干扰 | noise / control / signal factors，Taguchi loss |
| Six Sigma | 减少 defects 和 variation 的改进方法 | DMAIC、CTQ、roles、poka-yoke |
| Cp / Cpk | 过程能力指标 | 会不会满足 USL/LSL，是否偏心 |

---

## 1. QC vs QA：先把“检查”和“预防”分清

**Quality Control (QC)** 是一组 procedure，用来确保 manufactured product 或 performed service 符合既定质量标准，或者满足 client/customer requirements。PPT 强调一句话：QC 的目标是在产品开发完成后、交付客户之前发现 defects。

通俗说，QC 像“出厂前检查”。比如 PCB 板焊接完成后，用测试仪检查是否有短路；如果发现 defect，就拦下来返工，而不是让客户收到坏板子。

**Quality Assurance (QA)** 则是 proactive process，重点是通过优化 manufacturing processes、policies、procedures 来防止 defects 发生。QA 不是等产品做完再抓问题，而是提前把流程设计得不容易出错。

| 对比点 | QC | QA |
|---|---|---|
| 核心动作 | identify defects | prevent defects |
| 时间位置 | 产品完成后、交付前 | 流程设计和执行过程中 |
| 性质 | reactive | proactive |
| 例子 | inspection、testing、control chart | process design、training、quality planning |
| 一句话 | “坏的找出来” | “尽量别做坏” |

### 考试判断技巧

看到 **inspection / test / detect defects / completed products before shipping**，优先想到 QC。看到 **prevention / refining processes / policies and procedures / training**，优先想到 QA。

常见错项是把 QC 写成“只负责预防”。这不准确：QC 可以帮助改进过程，但它的直接动作是检查和控制输出；QA 才是课程里更明确的 prevention。

---

## 2. 7QC tools：每个工具到底解决什么问题

PPT 列出的 seven basic quality control tools 是：Flowchart、Check Sheet、Pareto Chart、Cause-and-Effect Diagram、Control Chart、Histogram、Scatter Diagram。

这 7 个工具不用死背定义，最好按“我手里有什么数据、我想回答什么问题”来记。

| Tool | 通俗理解 | 什么时候用 | 题目信号词 | 易混点 |
|---|---|---|---|---|
| **Flowchart** | 把流程一步步画出来 | 想研究、记录或改进一个 process | steps, sequence, process flow | 不是找 root cause 的图 |
| **Check Sheet** | 用表格打勾计数 | 想系统收集缺陷出现次数 | tally, collect data, frequency record | 只是收集数据，不一定排序 |
| **Pareto Chart** | 按频率从大到小排序 | 想抓最重要的少数原因 | descending bars, vital few, 80/20 | 不是普通 histogram |
| **Cause-and-Effect Diagram** | 鱼骨图，把可能原因分类 | 想系统找 root causes | fishbone, Ishikawa, possible causes | 不是只找唯一原因 |
| **Control Chart** | 随时间画数据 + 控制限 | 想判断过程是否 stable | over time, UCL/LCL, stable process | 不等于 profitability 判断 |
| **Histogram** | 看数值分布形状 | 想看 variation / distribution | distribution, numerical data | 不按大小排序 |
| **Scatter Diagram** | 看两个变量是否相关 | 想看 correlation | paired data, relationship | 不是时间序列图 |

### 一个简单场景串起来

假设一家 PCB 工厂最近客户投诉增多。

1. 先用 **Check Sheet** 记录一周内每类缺陷出现几次。
2. 用 **Pareto Chart** 看最多的是 solder bridge 还是 missing component。
3. 对最高频缺陷画 **Cause-and-Effect Diagram** 找可能原因。
4. 如果怀疑制程随时间漂移，用 **Control Chart** 看 defect rate 是否稳定。
5. 如果怀疑温度越高故障越多，用 **Scatter Diagram** 看温度和 failure count 的关系。

这样记比单独背 7 个定义更稳。

---

## 3. Cause-and-Effect Diagram：鱼骨图不是答案，是找原因的框架

**Cause-and-Effect Diagram** 又叫 **Fishbone Diagram** 或 **Ishikawa Diagram**。PPT 定义是：用图形方式把某个 problem/effect 的 possible causes 逻辑化组织起来，并逐层展开，显示潜在因果关系。

注意，它不是直接告诉你“真正原因一定是什么”。它只是帮助团队把可能原因系统列出来，然后再通过数据验证。

### 常用 4M 分类

| 主骨 | 解释 | PCB 缺陷例子 |
|---|---|---|
| **Machines** | 设备、仪器、工具 | soldering machine temperature drift, worn nozzle |
| **Materials** | 材料、零件、原料 | poor solder paste quality, contaminated board |
| **Methods** | 工艺、流程、方法 | unclear work instruction, wrong reflow profile |
| **Manpower** | 人员、培训、操作 | insufficient training, operator fatigue |

### 完整答题模板

题目：某电子制造车间发现 PCB 上 solder bridge 缺陷上升，请用 fishbone diagram 组织可能原因。

作答时可以这样写：

```text
Effect: Increased solder bridge defects on PCB assembly

Machines:
- Reflow oven temperature not calibrated
- Soldering nozzle worn or blocked

Materials:
- Solder paste viscosity too high
- PCB surface contamination

Methods:
- Incorrect stencil design
- Inadequate cleaning procedure

Manpower:
- Operator lacks training
- Fatigue during night shift
```

最后加一句固定解释：

> The fishbone diagram helps organize possible causes systematically and supports root-cause investigation, but the actual cause still needs to be verified with data.

**PPT 口径提醒：** ch06 里 cause-effect diagram 的 “when to use” 文字疑似复用了 flowchart 的表述；但定义和样题都明确指向 identify and categorize possible root causes。考试遇到 fishbone / Ishikawa / possible root causes，按 cause-and-effect diagram 判断。

### 高频陷阱

- 题目写 **logically organize possible factors**、**root causes**、**fishbone**、**Ishikawa**，基本就是 Cause-and-Effect Diagram。
- 如果选项说它“identifies the only cause”，要警惕。鱼骨图列的是 possible causes，不是自动证明唯一原因。

Reference: ch06 slides 11-12；Sample Set 1 Q1.3, Set 2 Q1.2/Q2(e), Set 4 Q1.2。

---

## 4. Pareto Chart：先抓“最重要的少数”

**Pareto Chart** 是按 frequency 或 impact 从高到低排序的 bar chart。它基于 80/20 principle：很多时候，80% 的影响来自 20% 的原因。课程 PPT 的定义重点是：bars 从 left to right 按 descending order 排列，用来确定某个 effect 最重要的原因。

通俗例子：一个月内 PCB 缺陷统计如下：solder bridge 45 次，missing component 20 次，scratch 8 次，wrong label 4 次。Pareto chart 会把 solder bridge 放最左边，因为它贡献最大。工程师不应该平均用力，而是先处理 solder bridge。

| 缺陷类型 | 次数 | 排序 |
|---|---:|---:|
| Solder bridge | 45 | 1 |
| Missing component | 20 | 2 |
| Scratch | 8 | 3 |
| Wrong label | 4 | 4 |

### Pareto vs Histogram

这两个很容易混。

| 图 | 横轴是什么 | 有没有排序 | 回答的问题 |
|---|---|---|---|
| Pareto Chart | 缺陷类别 / 原因类别 | 有，从高到低 | 哪些原因最重要？ |
| Histogram | 数值区间 | 没有按重要性排序 | 数据分布长什么样？ |

考试看到 **descending order / relative frequency / most important causes / 80-20**，选 Pareto Chart。

---

## 5. Control Chart：判断过程是否 stable，而不是判断产品是否赚钱

**Control Chart** 是按时间顺序画数据的统计图，用来研究 process changes over time。PPT 说它有 three lines：central line for average、upper control limit (UCL)、lower control limit (LCL)。它也叫 **Shewhart Chart**。

通俗理解：control chart 像“过程心电图”。如果数据点都在控制限内，而且没有明显趋势，说明过程稳定；如果点超出控制限，或者出现连续上升/下降，说明过程可能有特殊原因，需要查。

### 基本公式

设历史数据为 $x_1, x_2, ..., x_n$。

$$
CL = \bar{x}
$$

$$
s = \sqrt{\frac{\sum_{i=1}^{n}(x_i - \bar{x})^2}{n-1}}
$$

$$
UCL = \bar{x} + k s, \qquad LCL = \bar{x} - k s
$$

其中 $k$ 通常取 3。PPT 用 normal curve 解释：1σ 大约覆盖 68.26%，2σ 覆盖 95.44%，3σ 覆盖 99.73%。如果题目明确说 2σ，就用 2；如果没说，考试通常按 3σ。

**口径提醒：** PPT 抽取文本里的标准差公式显示不完整，只能确定它先算 average，再按若干个标准差得到 UCL/LCL。这里用样本标准差 $s$ 演示；如果考试题直接给出 $\sigma$、给出常数 $A$，或老师指定总体标准差，就按题目给定口径算。通常数值会略有差异，但判断逻辑不变。

### 完整例题：PPT yield rate 数据

题目：某电子制造过程连续 15 个样本的 yield rate (%) 如下：

`98.50, 97.80, 98.30, 99.10, 99.30, 94.32, 98.40, 98.60, 98.80, 99.00, 99.10, 98.80, 98.90, 99.10, 98.20`

用 3σ 控制图判断过程是否稳定。

**Step 1：算 central line。**

$$
\bar{x} = \frac{98.50+97.80+...+98.20}{15} \approx 98.415
$$

所以：

$$
CL \approx 98.415
$$

**Step 2：算样本标准差。**

如果手算，做法是先算每个 $(x_i-\bar{x})^2$，再求和、除以 $n-1$、开方。例如第 1 个数据的平方差约为 $(98.50-98.415)^2=0.0072$，第 6 个数据的平方差约为 $(94.32-98.415)^2=16.77$。考试中通常可以用计算器直接求 sample standard deviation。

$$
s \approx 1.205
$$

这里用样本标准差，是因为我们只有 15 个观测值，用它估计过程波动。

**Step 3：算 3σ 控制限。**

$$
UCL = 98.415 + 3 \times 1.205 \approx 102.03
$$

$$
LCL = 98.415 - 3 \times 1.205 \approx 94.80
$$

**Step 4：判断。**

第 6 个样本是 94.32，低于 LCL ≈ 94.80。至少有一个点超出控制限，所以这个过程不能直接判断为 stable，需要调查第 6 个样本附近是否有特殊原因，例如设备异常、材料批次问题、操作错误。

### 如果题目用 2σ 怎么办？

同一组数据如果用 2σ：

$$
UCL \approx 100.82, \qquad LCL \approx 96.01
$$

第 6 个样本 94.32 仍然低于 LCL。结论仍然是 unstable，但控制限更窄。考试时不要自己随意换 k 值，题目给几 σ 就用几 σ。

### Control chart 常见判断句

| 现象 | 判断 |
|---|---|
| 所有点在 UCL/LCL 内，且无明显趋势 | Controlled variation / stable process |
| 有点超出 UCL/LCL | Uncontrolled variation / unstable process |
| 连续上升、连续下降、周期性模式 | 可能 unstable，需要调查 |
| 只看某个点是否满足客户规格 | 不是 control chart 的完整判断，还要看 specification limits |

### Control limits vs Specification limits

这是大坑。

- **Control limits** 来自过程历史数据，用来判断过程是否受控。
- **Specification limits** 来自客户或设计要求，例如 20 ± 1 mm。

一个过程可能“统计上稳定”，但整体偏离规格；也可能短期内在规格内，但过程不稳定。后面 Cp/Cpk 会专门处理“是否满足规格”的问题。

---

## 6. Cost of Quality：为质量花的钱，和质量差造成的损失

**Cost of Quality (COQ)** 指为了确保高质量 deliverables 所产生的成本，也包括处理 defects 的成本。PPT 把它分成四类：Prevention Cost、Appraisal Cost、Internal Failure Cost、External Failure Cost。

直觉上可以按时间线记：**预防 → 检查 → 出厂前失败 → 客户侧失败**。

| 类别 | 通俗解释 | PPT 例子 | 记忆点 |
|---|---|---|---|
| **Prevention Cost** | 为了避免问题发生而花的钱 | quality planning, education and training, design reviews, supplier reviews, process planning, product modifications, equipment upgrades | 事前防错 |
| **Appraisal Cost** | 为了检查是否合格而花的钱 | test and inspection, supplier quality control, process audits, calibration | 检查/测量/审核 |
| **Internal Failure Cost** | 客户收到前发现 defect 的损失 | in-process scrap and rework, troubleshooting, design changes, rejected lots, re-inspection/retest | 厂内返工报废 |
| **External Failure Cost** | 客户收到后才发现 defect 的损失 | sales returns, replacing products, SLA penalties, warranty labor, product recalls, legal claims, complaints | 最糟，客户侧爆雷 |

PPT 总结里明确说：**external failure costs 是最糟糕的一类**。组织应该尽力降低 external failure cost。通常多投入 prevention 和 appraisal，会减少 internal/external failure。

### 分类例题

题目：判断下面成本属于哪一类。

| 成本项目 | 分类 | 为什么 |
|---|---|---|
| quality-related training | Prevention Cost | 培训是为了提前防止错误 |
| review of drawings | Prevention Cost | 设计评审发生在问题量产前 |
| receiving inspection | Appraisal Cost | 收货检查是在评估是否合格 |
| calibration | Appraisal Cost | 校准用于保证测量/设备可靠 |
| in-process scrap | Internal Failure Cost | 厂内发现的报废 |
| re-inspection of reworked items | Internal Failure Cost | 普通 inspection/test 归 Appraisal；但如果是因为返工后重新检查，PPT 把 re-inspection/retest of reworked items 放在 Internal Failure 例子中，考试按 PPT 记 |
| product recall and warranty repairs | External Failure Cost | 客户收到后才暴露问题 |
| legal claims | External Failure Cost | 客户侧质量事故后果 |

### 高频 MCQ 判断

题目问：Which item is **not** classified as an appraisal cost?

选项：test and inspection / supplier acceptance sampling / product audits / equipment upgrades / calibration。

答案：**equipment upgrades**。因为 equipment upgrades 在 PPT 的 prevention cost 例子里，不是 appraisal。

---

## 7. Robust Design：不是消灭所有干扰，而是让产品不怕干扰

**Robust Design** 是一种工程方法，用于在 R&D 阶段提高生产率，帮助更快、更低成本地制造高质量产品。PPT 强调它使用 statistical experimental design methods，为工程决策提供 reliable information。

最重要的一句话是：

> Robust design increases quality by decreasing the effects of variation without eliminating the causes, because those causes may be too difficult or too expensive to control.

通俗说，robust design 不是把所有“噪声”都消灭掉，而是让产品在噪声存在时也表现稳定。

### PPT 的电阻例子

工厂生产 100Ω 电阻。原本由于材料和工艺波动，实际电阻在 95Ω 到 105Ω 之间。这个范围虽然可能还没完全报废，但会影响电路性能。

使用 Taguchi robust design 后，工程师识别并控制关键因素，比如 temperature、material quality、machine settings，使电阻范围收窄到 98Ω 到 102Ω，并仍然围绕 100Ω。质量提高的关键不是“完全没有波动”，而是波动变小、中心更接近目标。

### 这条线怎么串起来

Taguchi 是 robust design 的代表性方法。**P-Diagram** 用来分清 signal/control/noise factors；**loss function** 用来量化偏离 target 的损失；**DOE/OA** 用来安排实验，用较少实验找出更稳健的 control factor 组合。所以这几节不是孤立知识点，而是在回答同一个问题：怎样让产品在不可控噪声存在时仍然稳定。

### Robust design 的质量观

传统观点常把质量理解成“是否超出 tolerance”：只要在 $m \pm \Delta_0$ 里面就都一样好，超出才算坏。

Taguchi 的观点不同：只要偏离 target value $m$，即使还在 tolerance 内，也会造成 quality loss。偏离越大，loss 越大。

PPT 对 quality 的表述更宽：Taguchi viewpoint 下，质量可以理解为因 functional variation 和 harmful side effects 给 society 带来的 total loss，这里的 society 包括 producer 和 customer。也就是说，损失不只是维修费，还包括客户体验下降、能耗增加、投诉、返工等连锁后果。

这就是为什么 Sony TV 的例子重要：两个工厂可能都满足 tolerance，但颜色密度更接近 target、variation 更小的一方，客户体验会更好。

---

## 8. Taguchi Loss Function：偏离目标就有损失

对于 **nominal-the-best** 类型，Taguchi quadratic loss function 是：

$$
L(y) = k(y - m)^2
$$

其中：

- $y$ = observed value（实际观测值）
- $m$ = target value（目标值）
- $k$ = quality loss coefficient（质量损失系数）

如果题目给出 repair/replacement cost $A_0$ 和 tolerance distance $\Delta_0$，则：

$$
k = \frac{A_0}{\Delta_0^2}
$$

核心含义：loss 是二次增长的。偏离目标 2 个单位，不是损失变 2 倍，而是变成 4 倍。

### 完整例题 1：Sample Exam 的 10 个观测值

题目：某 quality characteristic 的目标值 $m=8.5$，Taguchi loss constant $k=1$。观测值如下：

`8.100, 8.900, 8.450, 9.250, 8.860, 8.350, 8.250, 8.680, 8.900, 9.050`

求 average Taguchi loss。

**Step 1：写公式。**

$$
L(y) = (y - 8.5)^2
$$

因为 $k=1$。

**Step 2：逐个计算 loss。**

| y | y - 8.5 | Loss |
|---:|---:|---:|
| 8.100 | -0.400 | 0.1600 |
| 8.900 | 0.400 | 0.1600 |
| 8.450 | -0.050 | 0.0025 |
| 9.250 | 0.750 | 0.5625 |
| 8.860 | 0.360 | 0.1296 |
| 8.350 | -0.150 | 0.0225 |
| 8.250 | -0.250 | 0.0625 |
| 8.680 | 0.180 | 0.0324 |
| 8.900 | 0.400 | 0.1600 |
| 9.050 | 0.550 | 0.3025 |

**Step 3：求总损失和平均损失。**

$$
\text{Total Loss} = 1.5945
$$

$$
\text{Average Loss} = \frac{1.5945}{10} = 0.15945
$$

严格按公式，average loss = **0.15945**。但 PPT/Sample 这道 MCQ 的选项是 0.3762 / 0.1736 / 0.0319 / 0.6790 / 0.1420，没有精确匹配项。最接近的是 0.1736，但它不是严格计算值；这题疑似题目或选项有误，考试时如果遇到同题，应按教师课堂说明或官方答案为准。

### 完整例题 2：PPT 的 amplifier voltage 数据

题目：某设备目标输出 $m=10$ volts，超出 $10 \pm 0.5$ 时维修成本为 $A_0=\$2$。10 个测量值为：

`9.5, 9.8, 10.1, 9.9, 9.7, 10.2, 9.6, 10.3, 10.0, 9.4`

求 average quality loss。

**Step 1：先求 k。**

$$
k = \frac{A_0}{\Delta_0^2} = \frac{2}{0.5^2} = 8
$$

**Step 2：公式变成：**

$$
L(y) = 8(y - 10)^2
$$

**Step 3：计算每个 loss 后求平均。**

| y | Loss |
|---:|---:|
| 9.5 | 2.00 |
| 9.8 | 0.32 |
| 10.1 | 0.08 |
| 9.9 | 0.08 |
| 9.7 | 0.72 |
| 10.2 | 0.32 |
| 9.6 | 1.28 |
| 10.3 | 0.72 |
| 10.0 | 0.00 |
| 9.4 | 2.88 |

$$
\text{Total Loss} = 8.40
$$

$$
\text{Average Loss} = 0.84
$$

**易错点：** 不要只看是否超过 $10 \pm 0.5$。Taguchi 观点下，9.8、10.1 这种还在范围内的点也有损失，只是损失较小。

### 平均质量损失的直觉公式

PPT 后面还给了 average quality loss 的推导。对 nominal-the-best 来说，平均损失不只取决于均值离 target 多远，也取决于 variation 多大。可以用下面的直觉形式记：

$$
\bar{L} \approx k\left[(\bar{y}-m)^2+s^2\right]
$$

其中 $(\bar{y}-m)^2$ 表示过程中心偏离 target 的损失，$s^2$ 表示波动带来的损失。这就是电话线例子想说明的点：只减少 defect fraction 不够，如果均值偏离 target 或方差很大，客户仍然会感到质量差。

### 三种 Taguchi loss type

| 类型 | 目标 | 例子 | 课程里怎么考 |
|---|---|---|---|
| **Nominal-the-best** | 越接近目标值越好 | 电压 10V、电阻 100Ω | 最常算 $k(y-m)^2$ |
| **Smaller-the-better** | 越小越好 | 泄漏电流、污染排放、响应时间 | 多为概念识别 |
| **Larger-the-better** | 越大越好 | 效率、准确率、功率放大 | 多为概念识别 |

如果选项里出现 **Target-the-zero**，PPT/Sample 里把它作为错误项；常见三类是 nominal / smaller / larger。

---

## 9. P-Diagram：Signal、Control、Noise factors

Robust design 会把影响产品 response $y$ 的因素分成三类：signal factors、control factors、noise factors。PPT 样题有时会把这些参数写成 Z、M、X 之类的符号，但考试重点不是背字母，而是识别三类 parameter classes。

| Factor | 通俗解释 | PPT 例子 | 设计意义 |
|---|---|---|---|
| **Signal factors** | 直接驱动产品功能的输入 | voltage level, current level, frequency, resistance, capacitance | 用户或系统给产品的功能输入 |
| **Control factors** | 设计者可以设定/优化的参数 | process parameters, material properties, component selection, assembly techniques, testing procedures | 工程师能主动调 |
| **Noise factors** | 难以控制或控制成本太高的波动来源 | temperature, humidity, electrical interference, component tolerances, process variations, human error | 不一定消灭，但要降低其影响 |

### 判断例子

如果题目说：“温度波动导致传感器输出不稳定，但产品使用环境中温度无法完全控制。”

温度波动是 **noise factor**。正确设计思路不是假设温度永远恒定，而是通过 robust design 让产品对温度变化不那么敏感。

如果题目说：“工程师选择不同材料、调整工艺参数来减少输出波动。”

材料选择和工艺参数是 **control factors**，因为设计者可以主动设定。

---

## 10. Design of Experiments (DOE) 与 Orthogonal Array：知道用途即可

PPT 介绍 Taguchi parameter design 的流程：

1. Brainstorming
2. Identify design parameters and noise factors
3. Construct Design of Experiments (DOE)
4. Perform experiments
5. Analyze results

DOE 的目的不是让你随便试，而是在成本和时间受限时，用较少实验获得可靠信息。Full factorial design 会很快爆炸：如果有 $n$ 个变量，每个变量有 $l$ 个水平，实验数大致会随 $l^n$ 增长。

**Orthogonal Array (OA)** 是 DOE 中常见方法，用来减少实验次数。比如 PPT 提到 L4、L9 等 OA。考试如果只考概念，记住：OA 让你不用测试所有组合，也能比较系统地评估多个因素。

这部分目前样题更偏概念识别，不建议投入太多时间做复杂 OA 手算；优先掌握 Taguchi loss 和 factor classification。

---

## 11. Six Sigma：减少 defects 和 variation 的方法体系

**Sigma** 在统计中表示 standard deviation，是衡量 variation 的指标。**Six Sigma** 是一个统计概念，也是一套质量改进 methodology。PPT 定义中强调：在 six-sigma level，约有 **3.4 defects per million opportunities (DPMO)**，目标是 as perfect as practically possible。

这里的 opportunities 不是简单等于“产品件数”。如果一个产品上有 5 个可能出错的位置，1000 件产品就有 5000 个 defect opportunities。当前样题主要考概念，不要求复杂 DPMO 计算，但要知道 3.4 DPMO 的完整含义。

通俗理解：Six Sigma 不是“某个图表”，而是一套系统改进过程的方法。它的目标是消除 defects、降低 variation，让产品和服务稳定满足 customer specifications。

### 为什么 Six Sigma 重要

PPT 用了 GE、Motorola、AlliedSignal 的案例说明 Six Sigma 能节省大量成本。考试不太会让你背数字，但会考这个逻辑：质量差会带来 scrap、rework、cycle time delay、lost business、lost opportunities。Six Sigma 试图系统减少这些 cost of poor quality。

### DMAIC：Six Sigma 的 roadmap

PPT 明确写：**DMAIC model is a roadmap for Six Sigma**。

| Phase | 全称 | 通俗解释 | 例子 |
|---|---|---|---|
| **Define** | Define goals and customer deliverables | 定义问题和客户要求 | 明确“PCB defect rate 太高” |
| **Measure** | Measure current performance | 量化当前状态 | 收集 defect rate、cycle time |
| **Analyze** | Find root causes | 分析根因 | 用 fishbone / Pareto 找主要原因 |
| **Improve** | Eliminate defects | 改进过程 | 调整 reflow profile、培训操作员 |
| **Control** | Sustain improvements | 维持改进结果 | 用 control chart 持续监控 |

考试看到 **roadmap for Six Sigma**，答案通常就是 DMAIC。选项里如果出现 Calibrate，要注意：Calibrate 不是 DMAIC 的阶段。

### CTQ：Critical-to-Quality

**CTQ (Critical-to-Quality)** 是显著影响过程输出质量的 elements。识别 CTQ 的意义在于找到“真正影响客户质量感知”的关键点，从而大幅减少成本、提高质量。

例子：对手机屏幕来说，亮度、色彩一致性、触控响应时间可能是 CTQ；包装盒颜色可能没那么 critical。Six Sigma 项目要抓 CTQ，而不是平均改所有东西。

### Six Sigma tools and roles

PPT 提到的工具包括 5 Whys、PDCA、mistake proofing。样题中常见的是：

- **5 Whys**：连续追问“为什么”，找到 root cause。
- **PDCA**：Plan-Do-Check-Act，持续改进循环。
- **Mistake Proofing / Poka-yoke**：防错设计，让错误不容易发生。例如连接器做成只能一个方向插入。

PPT 的 five key roles：

1. Executive Leadership
2. Champions
3. Master Black Belts
4. Black Belts
5. Green Belts

考试通常不会深考每个 role 的职责，但要知道 Champion/Black Belt/Green Belt 属于 Six Sigma 组织角色。

---

## 12. Process Capability：这个过程能不能稳定做出好零件

**Process capability** 回答的问题是：

> Can I rely on this process to deliver good parts?

PPT 定义：Process capability refers to the measure/degree to which a process can consistently produce output that meets process specifications.

也就是说，它不是问“工人熟不熟练”，也不是问“生产速度快不快”，而是问这个过程能否持续满足 specification limits。

### 先分清两个概念

| 概念 | 含义 | 由谁决定 |
|---|---|---|
| Process distribution | 实际生产结果怎么分布，均值和标准差是多少 | 过程历史数据 |
| Specification limits | 客户/设计要求的上下限，USL/LSL | 产品要求 |

Process capability 就是把这两者放在一起看：你的过程分布够不够窄？中心有没有偏？

---

## 13. Cp 与 Cpk：一个看宽度，一个看偏心

PPT 给出两个主要 capability indices：$C_p$ 和 $C_{pk}$。它们通常假设数据近似 normal distribution，而且样本量要 large enough（PPT 提到一般约 50 independent data values）。

**先决条件提醒：** capability analysis 通常应在过程已经受控/稳定之后再做。否则一个过程今天漂上去、明天漂下来，算出来的 Cp/Cpk 只是临时数字，不能可靠预测未来。

### Cp：只看过程宽度够不够窄

$$
C_p = \frac{USL - LSL}{6\sigma}
$$

$C_p$ 比较的是 specification width 和 process spread。因为正态分布中 ±3σ 覆盖主要波动，所以总过程宽度近似 $6\sigma$。

但 $C_p$ 不管均值有没有偏。过程可能很窄，但整体偏向上限或下限，仍然会产生 defects。

### Cpk：同时考虑宽度和中心位置

$$
C_{pk} = \min\left(\frac{USL - \mu}{3\sigma}, \frac{\mu - LSL}{3\sigma}\right)
$$

$C_{pk}$ 看的是均值到最近规格边界还有多少空间。取 min 的原因很简单：哪边更近，哪边先出问题。

| 情况 | 解释 |
|---|---|
| $C_p$ 高，$C_{pk}$ 也高 | 过程窄且居中，最好 |
| $C_p$ 高，$C_{pk}$ 低 | 过程本身有潜力，但均值偏心 |
| $C_p$ 低，$C_{pk}$ 低 | 波动太大，即使调中心也不够 |
| $C_{pk} \le C_p$ | 一般成立，Cpk 会因为偏心而降低 |

### Cpk 风险判断表（按 PPT）

| Cpk | 风险判断 |
|---|---|
| $Cpk < 1.00$ | High risk of defects，process is not capable |
| $1.00 \le Cpk < 1.33$ | Moderate risk，needs improvement |
| $1.33 \le Cpk < 1.67$ | Low risk，capable but still can improve |
| $Cpk \ge 1.67$ | Minimal risk，highly capable |
| Aim for $Cpk \ge 2.00$ | 更理想，过程只用到约 50% spec width |

---

## 14. Cp/Cpk 完整例题 1：PPT 电阻例子

题目：某电阻目标为 10Ω，tolerance 为 ±1Ω，所以规格为 9Ω 到 11Ω。样本均值 $\mu=10.1$Ω，标准差 $\sigma=0.3$Ω。求 $C_p$ 和 $C_{pk}$，并解释结果。

**Step 1：写出规格上下限。**

$$
USL = 11, \qquad LSL = 9
$$

**Step 2：算 Cp。**

$$
C_p = \frac{USL - LSL}{6\sigma} = \frac{11-9}{6\times 0.3} = \frac{2}{1.8} \approx 1.11
$$

这说明过程 spread 相对于规格宽度偏大，不算特别 capable。

**Step 3：算 Cpk。**

$$
\frac{USL - \mu}{3\sigma} = \frac{11 - 10.1}{3\times 0.3} = \frac{0.9}{0.9} = 1.00
$$

$$
\frac{\mu - LSL}{3\sigma} = \frac{10.1 - 9}{3\times 0.3} = \frac{1.1}{0.9} \approx 1.22
$$

$$
C_{pk} = \min(1.00, 1.22) = 1.00
$$

**Step 4：解释。**

$C_p \approx 1.11$，$C_{pk}=1.00$。过程有 moderate risk，需要改进。因为 $C_{pk}<C_p$，说明过程均值偏向 USL 一侧（10.1 更靠近 11），不只是波动问题，也有 slight off-center。

### 常见错误

- 只算 $C_p$ 就说 process capable：不够，要看 $C_{pk}$。
- 忘记 tolerance ±1 代表 LSL=9, USL=11。
- 把 $6\sigma$ 和 $3\sigma$ 混用：Cp 用 $6\sigma$，Cpk 两边都用 $3\sigma$。

---

## 15. Cp/Cpk 完整例题 2：Sample Cpk MCQ

题目：某制造过程规格为 $20 \pm 1$ mm，过程均值 $\mu=19.8$ mm，标准差 $\sigma=0.2$ mm。求 $C_{pk}$。

**Step 1：规格上下限。**

$$
USL = 21, \qquad LSL = 19
$$

**Step 2：代入 Cpk。**

$$
\frac{USL - \mu}{3\sigma} = \frac{21 - 19.8}{3\times 0.2} = \frac{1.2}{0.6} = 2.00
$$

$$
\frac{\mu - LSL}{3\sigma} = \frac{19.8 - 19}{3\times 0.2} = \frac{0.8}{0.6} \approx 1.33
$$

$$
C_{pk} = \min(2.00, 1.33) = 1.33
$$

答案是 **1.33**。解释：过程离 LSL 更近，所以由下限一侧决定 Cpk。按 PPT 风险表，1.33 左右属于 low risk / capable but can still improve。

---

## 16. 把 Control Chart 和 Cp/Cpk 放在一起看

这两个知识点很容易混。它们都用到均值、标准差，但回答的问题不同。

| 问题 | 应用工具 |
|---|---|
| 过程随时间是否稳定？有没有特殊原因？ | Control Chart |
| 稳定过程是否能满足客户规格？ | Cp / Cpk |
| 哪些缺陷原因最重要？ | Pareto Chart |
| 根因可能有哪些类别？ | Fishbone Diagram |

一个合理的质量分析顺序通常是：先用 control chart 判断过程是否 stable；如果过程稳定，再用 capability analysis 判断是否 capable。因为一个不稳定的过程算 Cp/Cpk 意义有限。

---

## 17. 高频判断速记

### 一看就该选的

- fishbone / Ishikawa / logically organize possible causes → **Cause-and-Effect Diagram**
- descending bars / relative frequency / vital few / 80-20 → **Pareto Chart**
- process changes over time / stable and predictable / UCL-LCL → **Control Chart**
- collect frequency data / prepared form / tally → **Check Sheet**
- distribution of numerical data → **Histogram**
- relationship between two numerical variables → **Scatter Diagram**
- roadmap for Six Sigma → **DMAIC**
- CTQ → elements significantly affecting output quality
- process capability → consistently meet specification limits
- training / design review / equipment upgrade → **Prevention Cost**
- inspection / audit / calibration → **Appraisal Cost**
- scrap / rework before customer receives → **Internal Failure Cost**
- recall / warranty / complaint / legal claim → **External Failure Cost**

### 一看就该警惕的错项

- control chart determines profitability → 错，它判断 stability/predictability
- process capability depends solely on worker skill → 错，它衡量过程满足 specifications 的能力
- QC is proactive prevention → 错，课程里 QC 是 reactive defect identification；QA 才是 proactive prevention
- fishbone identifies the only root cause → 错，它组织 possible causes
- Pareto chart is a scatter plot → 错，它是 descending bar chart
- Calibrate is a DMAIC phase → 错，DMAIC 是 Define, Measure, Analyze, Improve, Control
- Cp 高就一定合格 → 错，还要看 Cpk 是否因偏心降低
- Bunching all quality cost as “inspection cost” → 错，要按 prevention / appraisal / internal / external 分清

---

## 18. 自测题

### 题 1：工具识别

某工厂想知道一周内不同 defect type 的出现次数，第一步应该用什么工具收集数据？

答案：Check Sheet。因为它是 structured form，用来 collecting and analyzing data。

### 题 2：Pareto 判断

如果 defect data 已经统计出来，工程师想先处理最重要的少数原因，应该用什么图？

答案：Pareto Chart。关键词是 descending order、highest frequency、vital few。

### 题 3：Control chart 判断

某过程所有点都在 UCL/LCL 内，但连续 10 个点逐渐上升。能直接说 stable 吗？

答案：不能。即使没有点超限，明显趋势也可能说明存在 non-random pattern，需要调查。

### 题 4：COQ 分类

“Product recall and warranty repairs” 属于哪类 cost of quality？

答案：External Failure Cost。因为 defect 在 customer receives product 之后才暴露。

### 题 5：Taguchi loss

目标 $m=5$，$k=2$，观测值 $y=6$。loss 是多少？

$$
L(y)=2(6-5)^2=2
$$

答案：2。

### 题 6：Cpk 判断

某过程 $Cpk=1.20$。按 PPT 风险表怎么解释？

答案：Moderate risk of defects, improvement needed for better capability。因为 $1.00 \le Cpk < 1.33$。

### 题 7：Control chart 计算

某过程 5 次测量值为 `10, 11, 9, 10, 15`，平均值 $\bar{x}=11$，样本标准差约 $s=2.35$。如果用 2σ 控制限，UCL/LCL 是多少？15 这个点是否超限？

$$
UCL=11+2\times2.35=15.70
$$

$$
LCL=11-2\times2.35=6.30
$$

答案：15 没有超出 15.70，所以单看超限规则不算 out of control。但如果后续还有连续上升/周期性模式，还要继续检查 non-random pattern。

### 题 8：Average Taguchi loss

目标 $m=10$，$k=2$，三次观测值为 `9, 10, 12`。求 average loss。

逐点算：

- $9$: $2(9-10)^2=2$
- $10$: $2(10-10)^2=0$
- $12$: $2(12-10)^2=8$

$$
\bar{L}=\frac{2+0+8}{3}=3.33
$$

答案：average loss ≈ 3.33。

### 题 9：Cp/Cpk 综合计算

规格为 $50\pm2$ mm，过程均值 $\mu=51$ mm，标准差 $\sigma=0.5$ mm。求 $C_p$ 和 $C_{pk}$，并判断是否偏心。

$$
USL=52,\quad LSL=48
$$

$$
C_p=\frac{52-48}{6\times0.5}=\frac{4}{3}=1.33
$$

$$
C_{pk}=\min\left(\frac{52-51}{3\times0.5},\frac{51-48}{3\times0.5}\right)=\min(0.67,2.00)=0.67
$$

答案：$C_p=1.33$ 说明过程宽度本身还可以，但 $C_{pk}=0.67$ 很低，说明均值偏向 USL，过程不 capable。改进方向首先是把均值拉回 target 50，再考虑继续降低 variation。

---

## 19. 最后复习顺序

如果时间不够，按这个顺序复习：

1. 先背 7QC tools 的信号词表，MCQ 很容易拿分。
2. 再会 control chart：CL/UCL/LCL + stable/unstable 判断。
3. 然后背 Cost of Quality 四类和典型例子。
4. 接着学 Taguchi loss：$L(y)=k(y-m)^2$，至少会算 nominal-the-best。
5. 最后学 Six Sigma DMAIC 和 Cp/Cpk 计算。

本章最核心的判断线是：**质量不是只看有没有超规格，而是看过程是否稳定、输出是否接近目标、缺陷是否被系统性减少。**
