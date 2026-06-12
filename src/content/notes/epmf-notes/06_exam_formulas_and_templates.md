---
title: "第6章 公式速查与答题模板"
description: "期末考试必背公式、计算题答题步骤模板、常见计算错误汇总。"
date: 2026-06-11
tags:
  - exam-revision
  - formulas
  - calculation
category: "课程学习"
docGroup: "epmf-final-exam-revision-notes"
order: 7
draft: false
---

## 本章定位

这章是"考试时翻出来直接用"的公式和模板速查手册。不讲概念解释，只给公式、步骤、易错点。建议考前 30 分钟过一遍。

---

## 公式速查表

| 领域 | 公式 | 符号说明 |
|------|------|----------|
| 折现 | $PV = \dfrac{FV}{(1+r)^n}$ | $r$ = 折现率，$n$ = 年数 |
| 终值 | $FV = PV \times (1+r)^n$ | 同上 |
| NPV | $NPV = -I_0 + \sum_{t=1}^{n} \dfrac{CF_t}{(1+r)^t}$ | $I_0$ = 初始投资，$CF_t$ = 第 $t$ 年现金流 |
| BCR | $BCR = \dfrac{PV(\text{benefits})}{PV(\text{costs})}$ | $BCR > 1$ 值得投资，$BCR = 1$ 不值得 |
| Break-even | $Q_{BE} = \dfrac{FC}{SP - VC}$ | $FC$ = 固定成本，$SP$ = 售价，$VC$ = 单位变动成本 |
| Safety Margin | $\text{Safety Margin} = \dfrac{\text{Actual} - Q_{BE}}{\text{Actual}} \times 100\%$ | Actual = 实际销量 |
| 总成本 | $TC = FC + Q \times VC$ | $Q$ = 产量 |
| 收入 | $R = SP \times Q$ | 同上 |
| 沟通渠道 | $\text{Channels} = \dfrac{n(n-1)}{2}$ | $n$ = 团队人数 |
| CPM Float | $\text{Float} = LF - EF = LS - ES$ | Float = 0 即为关键路径 |
| Forward Pass | $EF = ES + D$；$ES = \max(\text{前驱的 } EF)$ | $D$ = 工期 |
| Backward Pass | $LS = LF - D$；$LF = \min(\text{后继的 } LS)$ | 从终点往回算 |
| 三角分布 | $E = \dfrac{O + M + P}{3}$ | $O$ = 乐观，$M$ = 最可能，$P$ = 悲观 |
| Beta/PERT | $E = \dfrac{O + 4M + P}{6}$ | 同上 |
| 标准差 | $\sigma = \dfrac{P - O}{6}$ | 仅用于 PERT Beta 分布 |
| Taguchi Loss | $L(y) = k(y - m)^2$ | $m$ = 目标值，$k$ = 损失系数 |
| $k$ 的计算 | $k = \dfrac{A_0}{\Delta_0^2}$ | $A_0$ = 超出公差的维修费，$\Delta_0$ = 公差范围 |
| 控制图 CL | $CL = \bar{\bar{x}}$ | 样本均值的均值 |
| 控制图 UCL/LCL | $UCL = \bar{\bar{x}} + k \cdot s$，$LCL = \bar{\bar{x}} - k \cdot s$ | $k$ 通常 = 3（3σ），也有 2σ 变体 |
| X-bar 图（查表法） | $UCL = \bar{\bar{x}} + A_2 \bar{R}$，$LCL = \bar{\bar{x}} - A_2 \bar{R}$ | $A_2$ 查表，$\bar{R}$ = 平均极差 |
| R 图 | $UCL = D_4 \bar{R}$，$LCL = 0$ | $D_4$ 查表，$LCL$ 最小为 0 |
| $\sigma$（由极差估计） | $\sigma = \dfrac{\bar{R}}{d_2}$ | $d_2$ 查表 |
| $C_p$ | $C_p = \dfrac{USL - LSL}{6\sigma}$ | 衡量过程潜在能力 |
| $C_{pk}$ | $C_{pk} = \min\left[\dfrac{USL - \mu}{3\sigma}, \dfrac{\mu - LSL}{3\sigma}\right]$ | 衡量过程实际能力 |
| Cross-over | $FC_1 + VC_1 \times Q = FC_2 + VC_2 \times Q$ | 解出 $Q^*$ |
| EVM: SV | $SV = EV - PV$ | $SV > 0$ 进度提前 |
| EVM: CV | $CV = EV - AC$ | $CV > 0$ 成本节约 |
| EVM: SPI | $SPI = \dfrac{EV}{PV}$ | $SPI > 1$ 进度提前 |
| EVM: CPI | $CPI = \dfrac{EV}{AC}$ | $CPI > 1$ 成本节约 |
| EAC | $EAC = \dfrac{BAC}{CPI}$ 或 $EAC = \dfrac{BAC}{CPI \times SPI}$ | 完工估算 |
| EAC（综合） | $EAC = AC + \dfrac{BAC - EV}{CPI \times SPI}$ | 剩余工作按当前效率继续 |

---

## 计算题答题模板

### 模板 1：NPV / BCR 计算

> 适用：投资方案比较、项目可行性判断

**Step 1** — 列出每年现金流，确认初始投资 $I_0$ 和折现率 $r$

**Step 2** — 逐年折现

$$PV_t = \frac{CF_t}{(1+r)^t}$$

**Step 3** — 求 NPV

$$NPV = -I_0 + \sum PV_t$$

**Step 4** — 求 BCR

$$BCR = \frac{\sum PV(\text{benefits})}{\sum PV(\text{costs})}$$

**Step 5** — 判断：NPV > 0 且 BCR > 1 → 值得投资；多个方案选 NPV 最大的

**答题写法示例**：

> The NPV of Project A is $X, which is positive / negative. The BCR is Y, which is greater / less than 1. Therefore, the project is financially viable / not viable and should / should not be undertaken.

---

### 模板 2：Break-even 计算

> 适用：盈亏平衡点、安全边际

**Step 1** — 算 contribution margin（单位边际贡献）

$$\text{Contribution} = SP - VC$$

**Step 2** — 算 break-even quantity

$$Q_{BE} = \frac{FC}{SP - VC}$$

**Step 3** — 验证：在 $Q_{BE}$ 处，$TC = R$

$$FC + VC \times Q_{BE} = SP \times Q_{BE}$$

**Step 4** — 算 safety margin（如题目给实际销量）

$$\text{Safety Margin} = \frac{\text{Actual} - Q_{BE}}{\text{Actual}} \times 100\%$$

**Step 5** — 算利润（如需要）

$$\text{Profit} = (SP - VC) \times Q - FC$$

**答题写法示例**：

> The break-even point is calculated as FC / (SP - VC) = $X / ($Y - $Z) = W units. At full capacity of N units, the profit is (SP - VC) x N - FC = $P. The safety margin is (N - W) / N x 100% = S%.

---

### 模板 3：CPM 计算

> 适用：关键路径、浮动时间

**Step 1** — 画依赖关系图（节点 = 活动，箭头 = 依赖）

**Step 2** — Forward pass（从左到右）

$$EF = ES + D$$
$$ES = \max(\text{所有前驱的 } EF)$$

**Step 3** — Backward pass（从右到左）

$$LS = LF - D$$
$$LF = \min(\text{所有后继的 } LS)$$

**Step 4** — 算 Float

$$\text{Float} = LF - EF = LS - ES$$

**Step 5** — 识别 critical path：Float = 0 的活动连起来就是关键路径，其总工期 = 项目最短完成时间

**答题写法示例**：

> The critical path is A → C → E with a total duration of 18 weeks. Activity B has a float of 2 weeks, meaning it can be delayed by 2 weeks without affecting the project completion date.

---

### 模板 4：Control Chart 计算

> 适用：X-bar 图、R 图

**Step 1** — 算中心线 CL

$$CL = \bar{\bar{x}} = \frac{1}{n}\sum_{i=1}^{n} \bar{x}_i$$

**Step 2** — 算标准差 $s$（或用极差法）

方法一：直接计算

$$s = \sqrt{\frac{\sum(\bar{x}_i - \bar{\bar{x}})^2}{n-1}}$$

方法二：查表法（给出 $A_2, D_4, d_2$ 时）

$$UCL = \bar{\bar{x}} + A_2 \bar{R}$$
$$LCL = \bar{\bar{x}} - A_2 \bar{R}$$

**Step 3** — 算 UCL 和 LCL

$$UCL = \bar{\bar{x}} + k \cdot s$$
$$LCL = \bar{\bar{x}} - k \cdot s$$

**Step 4** — 判断：所有点在 UCL 和 LCL 之间 → 过程稳定；有点超出 → 过程不稳定

---

### 模板 5：Cp / Cpk 计算

> 适用：过程能力判断

**Step 1** — 写出 USL 和 LSL

$$USL = \text{目标值} + \text{公差}，\quad LSL = \text{目标值} - \text{公差}$$

**Step 2** — 算 $C_p$

$$C_p = \frac{USL - LSL}{6\sigma}$$

**Step 3** — 算 $C_{pk}$

$$C_{pk} = \min\left[\frac{USL - \mu}{3\sigma}, \frac{\mu - LSL}{3\sigma}\right]$$

**Step 4** — 判断

| $C_{pk}$ 范围 | 能力等级 | 风险 |
|:---:|:---:|:---:|
| $C_{pk} < 1.00$ | 不合格 | 高风险，大量不良 |
| $1.00 \leq C_{pk} < 1.33$ | 勉强合格 | 中等风险 |
| $1.33 \leq C_{pk} < 1.67$ | 良好 | 低风险 |
| $C_{pk} \geq 1.67$ | 优秀 | 极低风险 |

**关键判断**：$C_p = C_{pk}$ 说明过程居中；$C_{pk} < C_p$ 说明过程偏心。

---

### 模板 6：Taguchi Loss 计算

> 适用：质量损失函数

**Step 1** — 写出公式

$$L(y) = k(y - m)^2$$

**Step 2** — 如果需要求 $k$，用公差边界条件

$$k = \frac{A_0}{\Delta_0^2}$$

其中 $A_0$ = 超出公差时的维修/替换费用，$\Delta_0$ = 公差范围（$\pm$ 值）

**Step 3** — 逐个数据点算 loss

$$L_i = k(y_i - m)^2$$

**Step 4** — 求平均 loss（如需要）

$$\bar{L} = k\left[(\bar{y} - m)^2 + s^2\right]$$

或直接求和：$\text{Total Loss} = \sum L_i$

---

### 模板 7：沟通渠道计算

> 适用：团队人数变化时的渠道增减

**Step 1** — 确定变化前后的人数 $n_{\text{old}}$ 和 $n_{\text{new}}$

**Step 2** — 算原来的渠道数

$$C_{\text{old}} = \frac{n_{\text{old}}(n_{\text{old}} - 1)}{2}$$

**Step 3** — 算新的渠道数

$$C_{\text{new}} = \frac{n_{\text{new}}(n_{\text{new}} - 1)}{2}$$

**Step 4** — 求差值

$$\Delta C = C_{\text{new}} - C_{\text{old}}$$

**易错点**：题目问的是"新增多少条渠道"，不是"总共有多少条"。看清是问 total 还是 additional。

---

### 模板 8：Cross-over Point 计算

> 适用：两个方案的成本交叉点

**Step 1** — 写出两个方案的总成本方程

$$TC_1 = FC_1 + VC_1 \times Q$$
$$TC_2 = FC_2 + VC_2 \times Q$$

**Step 2** — 令 $TC_1 = TC_2$，解出 $Q^*$

$$Q^* = \frac{FC_1 - FC_2}{VC_2 - VC_1}$$

**Step 3** — 如果题目给年产量，折算年限

$$\text{年限} = \frac{Q^*}{\text{年产量}}$$

**Step 4** — 判断：产量 < $Q^*$ → 选低固定成本方案；产量 > $Q^*$ → 选高固定成本低变动成本方案

---

## 易错公式汇总

| 易错点 | 错误做法 | 正确做法 |
|--------|----------|----------|
| BCR = 1 | 以为 BCR = 1 就值得投资 | $BCR = 1$ 刚好不亏不赚，**不值得**投资；必须 $BCR > 1$ |
| Float 计算 | $Float = EF - LF$（反了） | 正确：$Float = LF - EF$（终点 - 起点） |
| Critical path | 以为是最短路径 | 关键路径是**最长**路径 |
| Control chart UCL | 用 specification limits 当 control limits | Control limits 来自过程数据，specification limits 来自客户要求，两者不同 |
| $C_{pk}$ 公式 | 只算一边 $(USL - \mu)/(3\sigma)$ | 必须两边都算，取**较小值** |
| Taguchi $k$ | 以为 $k$ 可以随便取 | $k$ 由公差边界条件决定：$k = A_0 / \Delta_0^2$ |
| SPI/CPI 判断 | $SV > 0$ = 落后进度 | $SV = EV - PV$，$SV > 0$ = **提前**进度 |
| Cross-over | 分子分母搞反 | $Q^* = (FC_1 - FC_2) / (VC_2 - VC_1)$，注意大 FC 减小 FC |
| Communication channels | 把 PM 也算进去 | 看清题目：PM 是否算在 $n$ 里 |
| Safety Margin | 分母用 break-even 值 | 分母是 **actual sales**，不是 break-even |
| $C_p$ vs $C_{pk}$ | 混淆两者含义 | $C_p$ = 潜在能力（不考虑偏心），$C_{pk}$ = 实际能力（考虑偏心） |
| EAC 公式 | 用 $AC + (BAC-EV)$ | 要除以 CPI（或 CPI × SPI），考虑效率因素 |

---

## Cpk 风险判断速查表

| $C_{pk}$ 值 | 能力判定 | 风险等级 | 考试常见问法 |
|:---:|:---:|:---:|:---|
| $< 1.00$ | 过程**不合格**（incapable） | **高风险**：不良率 > 0.27% | "Is the process capable?" → No |
| $1.00 - 1.33$ | 勉强合格（marginal） | **中等风险** | 需要改进但可接受 |
| $1.33 - 1.67$ | 良好（capable） | **低风险** | "Is the process capable?" → Yes |
| $\geq 1.67$ | 优秀（highly capable） | **极低风险** | 通常不需要进一步改进 |

**真题考法**：

- 2022 年真题 Q3.4：给 UCL/LCL 和 USL/LSL，问 "Is the process capable?" 以及 "Can control chart limits be used as specification limits?"
- 2023 年真题 Q26/Q37/Q51：给 $\bar{\bar{x}}$、$\bar{R}$、样本量，要求算 $C_p$ 和 $C_{pk}$
- 样题 Set 4 Q3(o)：算 $C_{pk}$ 后讨论风险等级

**答题写法示例**：

> The calculated Cpk is X. Since X < 1.00 / 1.00 ≤ X < 1.33 / 1.33 ≤ X < 1.67 / X ≥ 1.67, the process is classified as [不合格/勉强合格/良好/优秀]. This indicates that the process has [high/moderate/low/minimal] risk of producing defective products.
