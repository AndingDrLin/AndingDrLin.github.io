---
title: "第5章 财务与成本"
description: "NPV、BCR、IRR、cash flow、break-even、make-or-buy、P&L 与 costing 复习笔记。"
date: 2026-04-27
tags:
  - exam-revision
  - finance
  - costing
category: "课程学习"
docGroup: "epmf-final-exam-revision-notes"
order: 6
draft: false
---

> 来源说明：本章内容以 Sample Exam Questions 为主要依据，当前 slides 未见独立 finance lecture，标记为 `Sample-backed` 或 `Exam-only signal`。

## 考试要会什么

- NPV / BCR / IRR 三件套的定义、计算、判断
- Payback period 的累计现金流算法
- Break-even quantity 计算 + safety margin
- 30-day net terms 下的现金流时滞与 overtrading 判断
- Make-or-buy / lease-or-buy 的 relevant cost 决策框架
- Cross-over point 计算（manual vs automated）

## 一句话记忆

> 投资看折现（NPV>0），运营看现金流（别把 bookings 当 cash-in），决策看 avoidable cost。

## Investment appraisal: NPV / BCR / IRR `Sample-backed`

### NPV

**NPV** = 把未来 cash flows 折现到现在，减去初始投资。

$$
NPV = \sum_{t=0}^{n} \frac{CF_t}{(1+r)^t} - I_0
$$

判断：
- `NPV > 0` → acceptable / attractive
- `NPV < 0` → reject

### BCR

**BCR** = 收益现值与成本现值之比。

$$
BCR = \frac{PV(\text{benefits})}{PV(\text{costs})}
$$

判断：
- `BCR > 1` → benefits exceed costs
- `BCR = 1` → break-even in value terms
- `BCR < 1` → unattractive

### IRR

**IRR** = 使 NPV = 0 的折现率。

判断：
- `IRR > required rate` → attractive
- `IRR < 0` → 通常不吸引人

### 样题里的判断陷阱

给出 A: NPV = +1.2M, B: BCR = 1.035, C: IRR = -0.03%：

- C 明显最差
- A 与 B 都看似可接受
- **严格说不能仅凭这些数字断定 A 一定优于 B**（评价指标不同、缺少统一基准）
- 选项里有 "insufficient / uncertain based on provided info" 时，要认真考虑

## Payback period `Sample-backed`

回收期 = 累计净现金流把初始投资补回所需时间。

### 做题步骤

1. 累加每年 cash inflow
2. 找到刚好由负转正的年份
3. 用剩余未回收金额 / 下一年现金流，换算成精确时间

### 插值公式

若第 $t$ 年累计为负、第 $t+1$ 年累计为正：

$$
\text{Payback} = t + \frac{\text{未回收金额（end of year } t\text{）}}{\text{year } t+1 \text{ cash flow}}
$$

## Cash flow with 30-day terms `Sample-backed`

Ref: Set 1 Q1.11-12, Set 2 Q3/Q4

### 做题模板

**Step 1** — 逐月列出 bookings / shipments / components order

**Step 2** — 加 30-day 时滞：当月 sales 对应下月 cash-in，当月 components order 对应下月 cash-out

**Step 3** — 逐月算 net cash flow = cash-in − cash-out

**Step 4** — 累计得 cumulative cash，判断是否持续恶化

### 迷你骨架（工作底稿格式）

| 月 | Bookings | Cash-in（T+1） | Components Order | Cash-out（T+1） | Net CF | Cumulative |
|---|---|---|---|---|---|---|
| 1 | x | — | y | — | ? | ? |
| 2 | x | Bookings(1) | y | Order(1) | ? | ? |
| 3 | x | Bookings(2) | y | Order(2) | ? | ? |

### Overtrading 定义

> 企业销售/扩张很快，但现金持续紧张、营运资金跟不上 → **Overtrading**。

考试信号：cash growth + cash shortage = overtrading。

## Break-even analysis `Sample-backed`

Ref: Set 2 Q1.10, Set 3 Q1.6, Set 4 Q1.9, Set 5 Q1.7

### 核心公式

$$
TC = FC + Q \times VC \qquad R = SP \times Q
$$

Break-even condition: $TC = R$

$$
Q_{BE} = \frac{FC}{SP - VC}
$$

其中 $SP - VC$ = contribution per unit。

### Safety margin

$$
\text{Safety Margin} = \frac{\text{Actual Sales} - \text{Break-even Sales}}{\text{Actual Sales}} \times 100\%
$$

数值越大，抗风险能力越强。

### Break-even 图描述

- x 轴 = quantity，y 轴 = cost / revenue
- FC 线：水平线（固定成本不变）
- TC 线：从 FC 起点出发，斜率 = VC/unit
- Revenue 线：从原点出发，斜率 = SP/unit
- TC 与 Revenue 的交点 = break-even point

## Make-or-buy / lease-or-buy `Sample-backed`

Ref: Set 1 Q4, Set 3 Q1.5, Set 4 Q2, Set 6 Q1.10

### 决策模板

**Step 1** — 识别 avoidable cost vs unavoidable cost

**Step 2** — 检查 opportunity cost（如 facility rental income、释放产能的价值）

**Step 3** — 比较 relevant cost（只比较与决策相关的部分）

**Step 4** — 做出推荐，写清楚判断依据

### Relevant cost 速查表

| 成本类型 | 是否纳入比较 |
|---|---|
| Avoidable cost（自制才有、外购可省） | ✅ Include |
| Unavoidable cost（不管做哪个选择都要付） | ❌ Exclude |
| Opportunity cost（选 A 就失去 B 的收益） | ✅ Include |

### 关键提醒

not all accounting total cost = decision-relevant cost。别把会计总成本机械相加，要看 avoidable 的部分。

## Cross-over point `Sample-backed`

### 题型

手工工具（FC 低、VC 高）vs 自动化设备（FC 高、VC 低）→ 求交叉产量 / 时间。

### 做法

令 manual total cost = automated total cost：

$$
FC_1 + VC_1 \times Q = FC_2 + VC_2 \times Q
$$

解出 $Q^*$，再按年产量折算年数。

### 典型例子

- manual: $1000 + 1.5Q$
- automated: $15000 + 0.5Q$

$$
1000 + 1.5Q = 15000 + 0.5Q \implies Q = 14000
$$

若年产量 $5000$，则 $14000 / 5000 = 2.8$ years。

## P&L / Gross Profit / EBITDA / EBITA `Exam-only signal`

### Profit & Loss statement

总结一段时期内 sales revenue、costs / expenses 与 resulting profit or loss。

### Gross Profit

$$
\text{Gross Profit} = \text{Total Sales} - \text{Cost of Sales}
$$

### EBITDA / EBITA

- **EBITDA** = earnings before **I**nterest, **T**ax, **D**epreciation, **A**mortization
- **EBITA** = earnings before interest, tax, amortization — **没有 D**（不扣 depreciation）

样题中常见选项：

> gross profit minus company operating expenses (salaries, rent, etc.)

记住这是按样题选择逻辑，不是严格财报教学定义。

## EVM: PV / EV / AC / SPI / CPI `Slides + Sample-backed`

Ref: Lecture 3 (PM Part 3), Set 6 Q1.6 / Q2(e)

### 核心公式

$$
SPI = \frac{EV}{PV} \qquad CPI = \frac{EV}{AC}
$$

$$
SV = EV - PV \qquad CV = EV - AC
$$

其中：
- **PV** (Planned Value) = 计划完成工作的预算
- **EV** (Earned Value) = 实际完成工作的预算值
- **AC** (Actual Cost) = 实际花费

### 判断口诀

| 指标 | >1 / >0 | =1 | <1 / <0 |
|---|---|---|---|
| SPI / SV | 提前（ahead of schedule） | 按计划 | 延后（behind schedule） |
| CPI / CV | 节约（under budget） | 按预算 | 超支（over budget） |

## Company valuation / strategic posture `Exam-only signal`

### 题型

样题给 historical sales、product manufacturing cost、development cost、current product valuation，让你判断估值 / 利润。

### 做题策略

1. 识别哪些是 **sunk cost**（已发生的开发成本等，不计入决策）
2. 哪些是 **current asset / design valuation**
3. 哪些是已实现利润
4. 按题目口径做加减

## 高频判断速记

### 马上想到的

- `NPV > 0` → acceptable
- `BCR > 1` → acceptable
- `BCR = 1` → benefits equal costs
- `TC = R` → break-even
- `Gross Profit = Sales - Cost of Sales`
- cash growth + cash shortage → overtrading
- `SPI > 1` → ahead of schedule
- `CPI > 1` → under budget

### 容易掉坑的

- 不同 appraisal 指标不能总是直接横向硬比
- accounting total cost ≠ decision-relevant cost
- bookings ≠ immediate cash-in（30-day terms）
- EBITDA 和 EBITA 差一个 D，别看错

## 对应样题

| 主题 | 样题出处 |
|---|---|
| Cash flow / 30-day terms / Overtrading | Set 1 Q1.11-12, Set 2 Q3/Q4 |
| Break-even / Safety margin | Set 2 Q1.10, Set 3 Q1.6, Set 4 Q1.9, Set 5 Q1.7 |
| Make-or-buy / Relevant cost | Set 1 Q4, Set 3 Q1.5, Set 4 Q2, Set 6 Q1.10 |
| NPV / BCR / IRR 判断 | Set 1-5 MCQs（多处） |
| EVM (SPI / CPI) | Set 6 Q1.6, Q2(e) |
