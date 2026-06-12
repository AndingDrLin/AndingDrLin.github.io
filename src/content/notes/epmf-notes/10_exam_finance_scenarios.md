---
title: "第10章 考试专题：财务计算与投资决策"
description: "NPV/BCR/IRR 判断训练、Break-even 变体练习、Cross-over point 专练、EVM 计算、P&L 层级速记。"
date: 2026-06-11
tags:
  - exam-revision
  - finance
  - break-even
  - evm
category: "课程学习"
docGroup: "epmf-final-exam-revision-notes"
order: 11
draft: false
---

## 本章定位

这章专门训练财务计算和投资决策能力。Break-even 和 cross-over point 是每年必考的大题（2022 Q3.2/Q3.5、2023 Q19/Q43、2024 Q10、2025 Q2）。EVM 的 SPI/CPI 判断也是高频考点（2022 Q1.12/Q2.3/Q2.4、2023 Q28/Q39/Q52、2024 Q7）。

---

## NPV / BCR / IRR 判断速记

| 指标 | 英文 | 判断规则 | 注意事项 |
|------|------|---------|---------|
| NPV | Net Present Value | NPV > 0 → 值得投资 | 多个方案比大小，选 NPV 最大的 |
| BCR | Benefit-Cost Ratio | BCR > 1 → 值得投资 | BCR = 1 **不值得**（刚好不亏不赚） |
| IRR | Internal Rate of Return | IRR > 要求回报率 → 值得投资 | IRR < 0 → 拒绝 |

**三指标不能直接横向比较的陷阱**：

- NPV 是绝对值，BCR 是比率。一个方案 NPV 大但 BCR 可能小（投资大导致）
- BCR 高的方案 NPV 不一定最高
- 如果 NPV 和 BCR 冲突，**以 NPV 为准**（NPV 反映真实财富增量）

**真题出处**：
- 2022 年真题 Q1.13：BCR > 1 should be undertaken → 正确
- 2022 年真题 Q1.19：Site A (BCR=1.25), Site B (BCR=0.7) → 选 A
- 2022 年真题 Q1.16：算 BAC = AC / %complete = 27000/0.45 = $60,000

---

## NPV / BCR 计算练习

### 练习 1：基础 NPV

> 参考 2022 年 MCQ Q7-Q9 风格

一个项目初始投资 \$50,000，预期 3 年现金流为：

| 年份 | 1 | 2 | 3 |
|:---:|:---:|:---:|:---:|
| 现金流 | \$20,000 | \$25,000 | \$22,000 |

折现率 10%。求 NPV 和 BCR。

**解**：

**Step 1** — 逐年折现

$$PV_1 = \frac{20000}{(1.1)^1} = \frac{20000}{1.1} = 18181.82$$

$$PV_2 = \frac{25000}{(1.1)^2} = \frac{25000}{1.21} = 20661.16$$

$$PV_3 = \frac{22000}{(1.1)^3} = \frac{22000}{1.331} = 16528.93$$

**Step 2** — 求 NPV

$$NPV = -50000 + 18181.82 + 20661.16 + 16528.93 = 5371.91$$

**Step 3** — 求 BCR

$$BCR = \frac{PV(\text{benefits})}{PV(\text{costs})} = \frac{18181.82 + 20661.16 + 16528.93}{50000} = \frac{55371.91}{50000} = 1.107$$

**Step 4** — 判断

NPV = \$5,371.91 > 0，BCR = 1.107 > 1 → 项目值得投资。

---

### 练习 2：两个方案比较

方案 A：投资 \$30,000，5 年每年现金流 \$9,000。
方案 B：投资 \$50,000，5 年每年现金流 \$14,000。
折现率 8%。哪个方案更好？

**解**：

等额年金折现公式：$PV = CF \times \dfrac{1 - (1+r)^{-n}}{r}$

$$PV_A = 9000 \times \frac{1 - (1.08)^{-5}}{0.08} = 9000 \times 3.9927 = 35934.30$$

$$PV_B = 14000 \times \frac{1 - (1.08)^{-5}}{0.08} = 14000 \times 3.9927 = 55897.80$$

$$NPV_A = 35934.30 - 30000 = 5934.30$$

$$NPV_B = 55897.80 - 50000 = 5897.80$$

$$BCR_A = 35934.30 / 30000 = 1.198$$

$$BCR_B = 55897.80 / 50000 = 1.118$$

**判断**：NPV_A (5934) > NPV_B (5898)，BCR_A (1.198) > BCR_B (1.118) → 选方案 A。

注意：虽然 B 投资更大、年现金流更多，但 A 的效率更高。这就是"NPV 和 BCR 一致"的理想情况。

---

## Break-even 计算专练

### 核心公式

$$Q_{BE} = \frac{FC}{SP - VC}$$

$$\text{Profit} = (SP - VC) \times Q - FC$$

$$\text{Safety Margin} = \frac{Q_{\text{actual}} - Q_{BE}}{Q_{\text{actual}}} \times 100\%$$

---

### 练习 1：基础 Break-even + Safety Margin

> 参考样题 Sets 2/5 Q4 风格

某公司生产 Wi-Fi 路由器，年产能 45,000 台。成本如下：

| 项目 | 金额（RMB） |
|------|----------:|
| Direct Materials | 405,000 |
| Direct Labour | 225,000 |
| Variable Overhead | 45,000 |
| Fixed Overhead | 562,500 |

售价：40 RMB/台。

**(a)** 求 break-even point。

**解**：

**Step 1** — 算总变动成本和单位变动成本

$$\text{Total VC} = 405000 + 225000 + 45000 = 675000$$

$$VC = \frac{675000}{45000} = 15 \text{ RMB/台}$$

**Step 2** — 算 $Q_{BE}$

$$Q_{BE} = \frac{FC}{SP - VC} = \frac{562500}{40 - 15} = \frac{562500}{25} = 22500 \text{ 台}$$

**(b)** 满产时的利润和安全边际。

**解**：

$$\text{Profit} = (40 - 15) \times 45000 - 562500 = 25 \times 45000 - 562500 = 1125000 - 562500 = 562500 \text{ RMB}$$

$$\text{Safety Margin} = \frac{45000 - 22500}{45000} \times 100\% = 50\%$$

---

### 练习 2：含额外固定成本

> 参考样题 Sets 3/6 Q4 风格（含租赁费）

某公司生产光收发器，年产能 17,500 个。成本：

| 项目 | 金额（RMB） |
|------|----------:|
| Direct Materials | 22.50 / 个 |
| Direct Labour | 12.50 / 个 |
| Variable Overhead | 2.50 / 个 |
| Fixed Overhead | 568,750 |
| 额外：厂房租赁 | 225,000 / 年 |

售价：78.125 RMB/个。

**(a)** 求 break-even point。

**解**：

**Step 1** — 算单位变动成本

$$VC = 22.50 + 12.50 + 2.50 = 37.50 \text{ RMB/个}$$

**Step 2** — 算总固定成本（注意加租赁费）

$$FC = 568750 + 225000 = 793750 \text{ RMB}$$

**Step 3** — 算 $Q_{BE}$

$$Q_{BE} = \frac{793750}{78.125 - 37.50} = \frac{793750}{40.625} = 19538 \text{ 个}$$

**结论**：$Q_{BE} = 19538$ > 产能 17500 → 在当前产能下无法达到 break-even，这个项目会亏钱！

**易错点**：别忘了加额外固定成本（租赁费、广告费等）。题目给的成本表之外的固定成本也要算进去。

---

### 练习 3：求目标利润所需销量

某产品售价 \$50，单位变动成本 \$30，固定成本 \$100,000。要赚 \$40,000 利润需要卖多少？

**解**：

$$Q = \frac{FC + \text{Target Profit}}{SP - VC} = \frac{100000 + 40000}{50 - 30} = \frac{140000}{20} = 7000 \text{ 个}$$

**验证**：Profit = (50-30) x 7000 - 100000 = 140000 - 100000 = \$40,000 ✓

---

## Cross-over Point 计算专练

### 核心公式

$$Q^* = \frac{FC_1 - FC_2}{VC_2 - VC_1}$$

其中 $FC_1 > FC_2$（高固定成本方案），$VC_1 < VC_2$（低变动成本方案）。

**判断规则**：产量 < $Q^*$ → 选低固定成本方案；产量 > $Q^*$ → 选高固定成本方案。

---

### 练习 1：基础两个方案比较

> 参考 2022 年真题 Q3.5 和 2023 年真题 Q19

两家工厂考虑两种生产系统：

| | System X | System Y |
|---|:---:|:---:|
| Fixed Cost | \$15,000 | \$5,000 |
| Variable Cost | \$10/个 | \$15/个 |

年产能 1000 个。

**(a)** 求 cross-over point。

**解**：

$$TC_X = 15000 + 10Q$$
$$TC_Y = 5000 + 15Q$$

令 $TC_X = TC_Y$：

$$15000 + 10Q = 5000 + 15Q$$
$$10000 = 5Q$$
$$Q^* = 2000 \text{ 个}$$

**(b)** 需求低于 cross-over point 时选哪个？

**解**：

需求 < 2000 → 选 System Y（低固定成本），因为总成本更低。

需求 > 2000 → 选 System X（低变动成本），因为高固定成本被摊薄。

**(c)** 按年产能 1000 个算，多少年才能达到 cross-over？

**解**：

$$\text{年限} = \frac{2000}{1000} = 2 \text{ 年}$$

（2022 年真题 Q3.5 就是这道题，答案 cross-over = 2000 个）

---

### 练习 2：含年产量折算年限

> 参考样题 Sets 2/4/5 Q1.10

手工生产：工具费 1000 RMB，人工 1.50 RMB/个。
自动化生产：设备费 15,000 RMB，人工 0.50 RMB/个。
年产量 5000 个。求多少年达到 cross-over？

**解**：

$$Q^* = \frac{15000 - 1000}{1.50 - 0.50} = \frac{14000}{1.00} = 14000 \text{ 个}$$

$$\text{年限} = \frac{14000}{5000} = 2.8 \text{ 年}$$

**答案**：2.8 年。选项 C。

---

### 练习 3：Buy vs Lease

> 参考样题 Set 6 Q1.10

购买设备：30,000 RMB + 500 RMB/天运营费。
租赁设备：2,000 RMB/天。
最多租多少天比买更划算？

**解**：

$$30000 + 500d = 2000d$$
$$30000 = 1500d$$
$$d = 20 \text{ 天}$$

**判断**：租 ≤ 20 天 → 租更划算；> 20 天 → 买更划算。

**答案**：C — 20 天。

---

## EVM 计算专练

### 核心公式

| 指标 | 公式 | 判断 |
|------|------|------|
| SV | $SV = EV - PV$ | $SV > 0$ 进度提前，$SV < 0$ 进度落后 |
| CV | $CV = EV - AC$ | $CV > 0$ 成本节约，$CV < 0$ 成本超支 |
| SPI | $SPI = EV / PV$ | $SPI > 1$ 进度提前，$SPI < 1$ 进度落后 |
| CPI | $CPI = EV / AC$ | $CPI > 1$ 成本节约，$CPI < 1$ 成本超支 |

**记忆口诀**：EV 永远在前面（分子或被减数）。进度看 PV，成本看 AC。

---

### 练习 1：基础 SPI/CPI 计算 + 判断

> 参考 2023 年真题 Q28 风格

PV = \$100,000，EV = \$60,000，AC = \$80,000。求 SV、CV、SPI、CPI 并判断。

**解**：

$$SV = EV - PV = 60000 - 100000 = -40000$$

$$CV = EV - AC = 60000 - 80000 = -20000$$

$$SPI = \frac{EV}{PV} = \frac{60000}{100000} = 0.6$$

$$CPI = \frac{EV}{AC} = \frac{60000}{80000} = 0.75$$

**判断**：SV < 0, SPI = 0.6 < 1 → 进度落后；CV < 0, CPI = 0.75 < 1 → 成本超支。

**结论**：项目既落后进度又超支，情况不乐观。

---

### 练习 2：综合判断题（陷阱解读）

> 参考样题 Set 6 Q1.6 风格

一个项目的 CPI = 1.1，SPI = 0.9。怎么解读？

**解**：

$$CPI = 1.1 > 1 \rightarrow \text{成本节约（under budget）}$$

$$SPI = 0.9 < 1 \rightarrow \text{进度落后（behind schedule）}$$

**陷阱**：不要因为 CPI > 1 就觉得项目很好。进度落后可能导致客户不满、错过市场窗口。CPI 好但 SPI 差，说明钱花得有效率，但进度管理有问题。

**答题写法**：

> The project is currently under budget (CPI = 1.1 > 1) but behind schedule (SPI = 0.9 < 1). While cost performance is satisfactory, the project manager should investigate the causes of schedule delays and consider corrective actions such as crashing or fast-tracking to bring the project back on schedule.

---

### 练习 3：EAC 计算

> 参考 2023 年真题 Q29/Q30

BAC = \$1,000,000，CPI = 0.8，SPI = 0.9。

**(a)** 仅按 CPI 估算 EAC。

$$EAC = \frac{BAC}{CPI} = \frac{1000000}{0.8} = \$1,250,000$$

**(b)** 按 CPI 和 SPI 综合估算。

$$EAC = \frac{BAC}{CPI \times SPI} = \frac{1000000}{0.8 \times 0.9} = \frac{1000000}{0.72} = \$1,388,889$$

**2023 年真题 Q30 就考了这道**，答案是 C — \$1,388,889。

---

## P&L 层级速记

Profit & Loss 从上到下的层级关系：

```
Sales (Revenue)
- Cost of Sales
= Gross Profit
- Operating Expenses (SG&A)
= EBIT (Operating Profit)
+ Depreciation
+ Amortization
= EBITDA
- Amortization
= EBITA
- Interest
- Tax
= Net Profit (Bottom Line)
```

**速记**：

| 指标 | 全称 | 含义 | 公式 |
|------|------|------|------|
| GP | Gross Profit | 毛利 | Sales - Cost of Sales |
| EBIT | Earnings Before Interest & Tax | 息税前利润 | GP - Operating Expenses |
| EBITDA | EBIT + Depreciation + Amortization | 息税折旧摊销前利润 | EBIT + D + A |
| EBITA | EBIT + Amortization | 息税摊销前利润 | EBIT + A |
| NP | Net Profit | 净利润 | EBIT - Interest - Tax |

**考试常考的判断**：

- EBITDA 用于比较不同资本结构的公司（排除折旧和融资差异）
- EBITDA > EBIT（因为加回了 D&A）
- Net Profit 是最后一行，"Bottom Line"

---

## Make-or-Buy 决策框架

### Relevant Cost 判断

| 成本类型 | 含义 | 决策中是否考虑 |
|---------|------|:---:|
| Avoidable Cost | 自己生产才发生，买就不发生 | **考虑** |
| Unavoidable Cost | 不管自己做还是买都得花 | **不考虑** |
| Opportunity Cost | 选择一个方案而放弃另一个方案的收益 | **考虑** |
| Sunk Cost | 已经花出去的钱，无法收回 | **不考虑** |

### 决策模板

**Step 1** — 列出自己做的总成本（只算 relevant cost）

$$\text{Make Cost} = \text{材料} + \text{人工} + \text{变动制造费} + \text{可避免的固定成本}$$

**Step 2** — 列出外购的总成本

$$\text{Buy Cost} = \text{单价} \times Q$$

**Step 3** — 比较，选低的

如果 Make Cost < Buy Cost → 自己做
如果 Make Cost > Buy Cost → 外购

**真题出处**：样题 Sets 2/5 Q4 和 Sets 3/6 Q4 都涉及 make-or-buy 判断。

---

## 综合练习：投资决策全流程

> 串联 NPV → BCR → Break-even → Cross-over 的完整分析链

**场景**：某公司要投资一条新生产线，有两个方案：

| | 方案 A | 方案 B |
|---|:---:|:---:|
| 初始投资 | \$200,000 | \$350,000 |
| 年固定成本 | \$50,000 | \$30,000 |
| 单位变动成本 | \$20 | \$12 |
| 售价 | \$40 | \$40 |
| 年产能 | 15,000 个 | 15,000 个 |
| 项目周期 | 5 年 | 5 年 |
| 折现率 | 10% | 10% |

### Step 1：Break-even 分析

$$Q_{BE,A} = \frac{50000}{40 - 20} = 2500 \text{ 个}$$

$$Q_{BE,B} = \frac{30000}{40 - 12} = 1071 \text{ 个}$$

方案 B 的 break-even 更低，更容易盈利。

### Step 2：Cross-over Point

$$Q^* = \frac{350000 - 200000}{20 - 12} = \frac{150000}{8} = 18750 \text{ 个}$$

但年产能只有 15,000 → 在产能范围内，$Q^*$ 永远达不到 → 选方案 A（低固定成本）。

等一下，这不对。让我重新算：cross-over 比较的是**运营成本**，不包含初始投资。

实际上 cross-over 应该看：

$$TC_A = 200000 + 50000 \times 5 + 20Q \times 5 = 200000 + 250000 + 100Q$$

$$TC_B = 350000 + 30000 \times 5 + 12Q \times 5 = 350000 + 150000 + 60Q$$

$$450000 + 100Q = 500000 + 60Q$$

$$40Q = 50000 \implies Q^* = 1250 \text{（5 年总产量）}$$

年均 $1250 / 5 = 250$ 个。这个数字太小了，说明方案 B 在几乎所有情况下总成本都更低。

**重新整理思路**：cross-over 通常只比较运营成本，不包含初始投资。或者把初始投资摊入每年。

$$\text{每年初始投资分摊}_A = 200000 / 5 = 40000$$
$$\text{每年初始投资分摊}_B = 350000 / 5 = 70000$$

$$TC_{A,\text{annual}} = 40000 + 50000 + 20Q = 90000 + 20Q$$
$$TC_{B,\text{annual}} = 70000 + 30000 + 12Q = 100000 + 12Q$$

$$90000 + 20Q = 100000 + 12Q \implies 8Q = 10000 \implies Q^* = 1250$$

**判断**：年产量 > 1250 → 选方案 B；年产量 < 1250 → 选方案 A。产能 15,000 远大于 1250 → **选方案 B**。

### Step 3：满产时的年利润

$$\text{Profit}_A = (40 - 20) \times 15000 - 50000 = 300000 - 50000 = \$250,000$$

$$\text{Profit}_B = (40 - 12) \times 15000 - 30000 = 420000 - 30000 = \$390,000$$

### Step 4：NPV 比较

5 年等额年金，折现率 10%：

$$\text{Annuity Factor} = \frac{1 - (1.1)^{-5}}{0.1} = 3.7908$$

$$NPV_A = -200000 + 250000 \times 3.7908 = -200000 + 947700 = \$747,700$$

$$NPV_B = -350000 + 390000 \times 3.7908 = -350000 + 1478412 = \$1,128,412$$

### Step 5：结论

| 指标 | 方案 A | 方案 B | 胜者 |
|------|:---:|:---:|:---:|
| Break-even | 2,500 | 1,071 | B |
| Cross-over | 年产 > 1,250 选 B | — | B |
| 年利润 | \$250,000 | \$390,000 | B |
| NPV | \$747,700 | \$1,128,412 | B |

**综合结论**：方案 B 在所有指标上都优于方案 A。虽然初始投资高，但低变动成本在高产量下优势明显。

---

## 历年真题考查情况

| 知识点 | 2022 | 2023 | 2024 | 2025 |
|--------|------|------|------|------|
| NPV/BCR 判断 | Q1.13, Q1.19 | MCQ 中出现 | MCQ 中出现 | MCQ 中出现 |
| BAC 计算 | Q1.16 | Q29 | — | — |
| EVM (SV/CV/SPI/CPI) | Q1.12, Q2.3, Q2.4 | Q28/Q39/Q52 | Q7 | MCQ 中出现 |
| EAC 计算 | — | Q29/Q30 | — | — |
| Break-even | Q3.2 | Q19/Q43 | Q10 | Q2(ii) |
| Cross-over | Q3.5 | Q19/Q43 | Q10 | Q2(iii) |
| Make-or-buy | — | — | — | 样题 Q4 |
| P&L | — | MCQ 中出现 | MCQ 中出现 | MCQ 中出现 |
| Cycle time | Q1.20, Q2.2 | — | — | — |
| ROI | Q2.1 | — | — | — |
