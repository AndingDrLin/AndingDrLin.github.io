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
order: 5
draft: false
---

> 本章内容主要来源于 ch01 slides（投资评估）、ch03-project-management-part3（Cost Management + EVM）以及 Sample Exam Questions。考试中 NPV/BCR/IRR 判断、break-even 计算、EVM 数值分析、P&L 利润表层级都是高频考点。

## 考试要会什么

- NPV / BCR / IRR 三件套的定义、计算、判断
- Payback period 的累计现金流算法
- Break-even quantity 计算 + safety margin
- 30-day net terms 下的现金流时滞与 overtrading 判断
- Make-or-buy / lease-or-buy 的 relevant cost 决策框架
- Cross-over point 计算（manual vs automated）
- Cost Management 四个过程 + 估算方法
- EVM (PV / EV / AC / SPI / CPI) 的计算与判断
- P&L 利润表层级：Gross Profit / EBITDA / EBITA / Net Profit
- Company valuation 中的 sunk cost 判断

## 一句话记忆

> 投资看折现（NPV > 0），运营看现金流（别把 bookings 当 cash-in），决策看 avoidable cost，进度看 EV。

---

## Investment appraisal: NPV / BCR / IRR

这是项目投资决策最核心的三个指标。简单说：NPV 告诉你"这个项目能赚多少钱（折现后）"，BCR 告诉你"每花一块钱能赚回多少"，IRR 告诉你"这个项目的回报率是多少"。三个指标从不同角度看同一个问题，考试中经常一起出现让你做判断。

### NPV

**NPV** (Net Present Value) = 把未来所有 cash flows 折现到现在，减去初始投资。核心思想是"今天的 1 块钱比明天的 1 块钱更值钱"。

$$
NPV = -I_0 + \sum_{t=1}^{n} \frac{CF_t}{(1+r)^t}
$$

其中 $I_0$ = 初始投资，$CF_t$ = 第 $t$ 年净现金流，$r$ = 折现率（discount rate）。

判断：
- `NPV > 0` → acceptable / attractive（项目值得投资）
- `NPV = 0` → 刚好回本，没有额外收益
- `NPV < 0` → reject（项目亏钱）

**常见错误提醒：** 求和下标不要搞混。如果从 $t=1$ 开始求和，公式里要单独减 $I_0$；如果从 $t=0$ 开始求和，$CF_0$ 本身就应该等于 $-I_0$，不需要再减。两种写法等价，但不能同时做——否则初始投资会被扣两次。

**NPV 的直觉：** 假设你投资一个项目 10 万元，三年后收回 12 万元。如果银行利率是 5%，那 12 万折现回来大约 10.36 万，NPV = 10.36 - 10 = +0.36 万。说明这个项目比存银行多赚 0.36 万，值得做。

### BCR

**BCR** (Benefit Cost Ratio) = 收益现值与成本现值之比。当资金有限、需要在多个项目之间选择时，BCR 告诉你"每单位成本能带来多少收益"。

$$
BCR = \frac{PV(\text{benefits})}{PV(\text{costs})}
$$

判断（与 PPT 原文对齐）：
- `BCR > 1` → Benefits are greater than costs; project is worth pursuing
- `BCR = 1` → Benefits are equal to costs; **project isn't worth pursuing**
- `BCR < 1` → Benefits are lesser than costs; project isn't worth pursuing（除非有 intangible benefit）

**注意：** BCR = 1 不是 break-even 那么简单。PPT 明确说 "project isn't worth pursuing"，考试中要答这个结论。

### IRR

**IRR** (Internal Rate of Return) = 使 NPV 恰好等于零的折现率。你可以把它理解为"这个项目本身的回报率"。

**直觉解释：** 如果一个项目的 IRR 是 12%，意味着在这个项目的现金流模式下，它等效于一笔年化收益 12% 的投资。如果公司的资金成本（required rate of return）是 10%，那 12% > 10%，项目值得做。

判断：
- `IRR > required rate of return` → attractive（回报率超过门槛，值得投）
- `IRR = required rate of return` → 刚好达标
- `IRR < required rate of return` → reject（回报率不够）
- `IRR < 0` → 项目连本金都收不回来，直接 reject

**怎么算 IRR：** NPV 公式中，$r$ 是未知数，令 NPV = 0 求解。手算一般用试错法（trial and error）或插值法——先试一个折现率看 NPV 是正还是负，再调整，直到 NPV 接近零。考试中一般给出 IRR 值让你做判断，不需要自己算。

### NPV vs BCR vs IRR：各自适合什么场景

| 指标 | 优势 | 局限 | 适用场景 |
|---|---|---|---|
| NPV | 直接反映绝对收益金额 | 不能直接比较不同规模的项目 | 单项目 go/no-go 判断 |
| BCR | 可比较不同规模项目，反映效率 | 对成本和收益的拆分方式敏感 | 资金有限时在多项目间排序 |
| IRR | 直观易懂，"回报率"概念通用 | 可能有多解（非常规现金流）；隐含再投资假设 | 与资金成本做对比判断 |

实际判断时，三个指标可能给出不同结论，不能总是直接横向硬比。样题里有这种情况——遇到 "insufficient information" 或 "uncertain" 选项时要认真考虑。

### NPV / BCR 例题

**题目（改编自 PPT 样题）：** 某公司评估一个项目，初始投资 $847,434。预期收益在第 3 年一次性获得 $900,000，折现率取 9%。求 NPV 和 BCR，并判断是否值得投资。

**解题步骤：**

Step 1 — 折现收益：$PV(\text{benefit}) = \frac{900{,}000}{(1+0.09)^3} = \frac{900{,}000}{1.2950} = \$694{,}965$

Step 2 — 计算 NPV：
$$NPV = -847{,}434 + 694{,}965 = -\$152{,}469$$

Step 3 — 计算 BCR：
$$BCR = \frac{694{,}965}{847{,}434} = 0.82$$

Step 4 — 判断：NPV < 0，BCR < 1，项目不值得投资，因为成本超过收益。

> 这道题来自 PPT "Project Selection: Cost Benefit Example" 的原题数据，算是一个真实的 BCR < 1 的例子。

### 样题里的判断陷阱（Set 1 Q1.5 / Set 3 Q1.4 / Set 6 Q1.4）

给出 A: NPV = +$1.2M, B: BCR = 1.035, C: IRR = -0.03%：

- C 明显最差（IRR 为负，连本金都收不回来）
- A 和 B 都看似可接受
- **严格说不能仅凭这些数字断定 A 一定优于 B**（评价指标不同、缺少统一基准）
- 标准答案是 "C is least attractive, but we can't be sure whether A or B is most attractive"
- 选项里有 "insufficient / uncertain based on provided info" 时，要认真考虑

---

## Payback period

回收期 = 累计净现金流把初始投资补回所需时间。这个指标简单直观，但缺点是没有考虑资金的时间价值（不像 NPV 那样折现）。

### 做题步骤

1. 累加每年 cash inflow
2. 找到刚好由负转正的年份
3. 用剩余未回收金额 / 下一年现金流，换算成精确时间

### 插值公式

若第 $t$ 年累计为负、第 $t+1$ 年累计为正：

$$
\text{Payback} = t + \frac{\text{未回收金额（end of year } t\text{）}}{\text{year } t+1 \text{ cash flow}}
$$

### 完整例题

**题目：** 初始投资 $50,000，各年现金流如下，求 payback period。

| 年份 | 现金流 | 累计现金流 |
|---|---|---|
| 0 | -$50,000 | -$50,000 |
| 1 | +$15,000 | -$35,000 |
| 2 | +$20,000 | -$15,000 |
| 3 | +$25,000 | +$10,000 |
| 4 | +$10,000 | +$20,000 |

**解题：**

Step 1 — 累加到第 2 年末还有 -$15,000 未回收，第 3 年变为 +$10,000，说明回收发生在第 3 年内。

Step 2 — 代入插值公式：
$$\text{Payback} = 2 + \frac{15{,}000}{25{,}000} = 2 + 0.6 = 2.6 \text{ years}$$

**答案：** 回收期 = 2.6 年（即 2 年零 7.2 个月）。

**常见错误提醒：** 不要忘记从初始投资（年份 0）开始累计。有些人直接从年份 1 开始算，会少算一年。

---

## Cash flow with 30-day terms

Ref: Set 1 Q1.11-12, Set 2 Q3/Q4

这一块考的不是复杂计算，而是一个概念：**bookings 不等于 cash-in**。如果公司给客户 30 天付款期（30-day net terms），本月的销售收入要到下个月才能收到现金。同理，本月下的采购订单，下个月才付钱。

### 做题模板

**Step 1** — 逐月列出 bookings / shipments / components order

**Step 2** — 加 30-day 时滞：当月 sales 对应下月 cash-in，当月 components order 对应下月 cash-out

**Step 3** — 逐月算 net cash flow = cash-in - cash-out

**Step 4** — 累计得 cumulative cash，判断是否持续恶化

### 完整数字示例

假设一家公司前 4 个月的经营数据如下（单位：千元），所有款项 30 天后结算：

| 月 | Bookings | Cash-in（T+1） | Components Order | Cash-out（T+1） | Net CF | Cumulative |
|---|---|---|---|---|---|---|
| 1 | 50 | — | 30 | — | 0 | 0 |
| 2 | 80 | 50 | 45 | 30 | +20 | +20 |
| 3 | 100 | 80 | 60 | 45 | +35 | +55 |
| 4 | 120 | 100 | 80 | 60 | +40 | +95 |

解读：第 1 个月没有现金流入流出（都在途）；第 2 个月开始收到第 1 个月的 bookings，同时付第 1 个月的采购款。如果 cumulative cash 持续增长，说明公司经营健康；如果 bookings 增长但 cumulative cash 持续恶化（入不敷出），就是 overtrading 的信号。

### Overtrading 定义

> 企业销售/扩张很快，但现金持续紧张、营运资金跟不上 → **Overtrading**。

考试信号：cash growth + cash shortage = overtrading。

---

## Break-even analysis

Ref: Set 2 Q1.10, Set 3 Q1.6, Set 4 Q1.9, Set 5 Q1.7

Break-even analysis 回答一个最基本的问题：**至少卖多少才能不亏钱？** 这在新产品上市、选择生产方式、评估项目可行性时都要用到。

### 核心公式

$$
TC = FC + Q \times VC \qquad R = SP \times Q
$$

Break-even condition: $TC = R$

$$
Q_{BE} = \frac{FC}{SP - VC}
$$

其中 $SP - VC$ = contribution per unit（每卖出一个单位，扣掉变动成本后贡献给覆盖固定成本和利润的金额）。

### Safety margin

$$
\text{Safety Margin} = \frac{\text{Actual Sales} - \text{Break-even Sales}}{\text{Actual Sales}} \times 100\%
$$

Safety margin 越大，说明实际销量离亏本线越远，抗风险能力越强。如果 safety margin 接近 0，稍微销量下降就会亏损。

### 完整例题

**题目：** 某产品固定成本 FC = $10,000，单价 SP = $50/件，变动成本 VC = $30/件。假设实际销量为 700 件。求 break-even quantity 和 safety margin。

**解题：**

Step 1 — 算 contribution per unit：$SP - VC = 50 - 30 = \$20$

Step 2 — 算 break-even quantity：
$$Q_{BE} = \frac{10{,}000}{20} = 500 \text{ 件}$$

Step 3 — 验证：卖 500 件时，Revenue = 500 x 50 = $25,000，TC = 10,000 + 500 x 30 = $25,000。Revenue = TC，刚好 break-even。

Step 4 — 算 safety margin：
$$\text{Safety Margin} = \frac{700 - 500}{700} \times 100\% = 28.6\%$$

**答案：** Break-even quantity = 500 件。Safety margin = 28.6%，说明实际销量比亏本线高 28.6%，有一定缓冲空间。

**常见错误提醒：** $Q_{BE}$ 的分母是 contribution per unit（$SP - VC$），不是 $SP$ 也不是 $VC$。有些人会把分母写成 $VC$，导致结果错误。

### Break-even 图描述

- x 轴 = quantity，y 轴 = cost / revenue
- FC 线：水平线（固定成本不随产量变化）
- TC 线：从 FC 截距出发，斜率 = VC/unit
- Revenue 线：从原点出发，斜率 = SP/unit
- TC 与 Revenue 的交点 = break-even point

### 历年真题 Break-even 题型汇总

| 年份 | 题号 | 形式 | 具体考查内容 |
|---|---|---|---|
| 2022 | Q20 | 计算 | Break-even quantity + safety margin + 利润计算 |
| 2023 | Q20 | 计算 | Break-even quantity + safety margin（含广告费影响） |
| 2024 | Q10 | 计算 | Break-even quantity + safety margin（含租赁费影响） |
| 2025 | Q2(ii) | 计算 | Break-even quantity + safety margin + 目标利润所需销量 |

**提示：** Break-even 是必考计算题。近年趋势是增加 scenario 变化（如广告费、租赁费对 FC 的影响），以及问"要达到目标利润需卖多少"的变体。

---

## Make-or-buy / lease-or-buy

Ref: Set 1 Q4, Set 3 Q1.5, Set 4 Q2, Set 6 Q1.10

这个决策框架的核心问题：**自制某个部件 vs 外购，哪个更划算？** 关键不在于看会计报表上的总成本，而在于区分哪些成本会因为你的选择而改变（avoidable），哪些不会变（unavoidable）。

### 决策模板

**Step 1** — 识别 avoidable cost vs unavoidable cost

**Step 2** — 检查 opportunity cost（如 facility rental income、释放产能的价值）

**Step 3** — 比较 relevant cost（只比较与决策相关的部分）

**Step 4** — 做出推荐，写清楚判断依据

### Relevant cost 速查表

| 成本类型 | 是否纳入比较 | 含义 |
|---|---|---|
| Avoidable cost | Include | 自制才有、外购可省的钱 |
| Unavoidable cost | Exclude | 不管做哪个选择都要付的钱（如已签的租约） |
| Opportunity cost | Include | 选 A 就失去 B 的收益（如选自制就放弃了出租厂房的收入） |

### 完整例题

**题目：** 公司需要某零件，可以自制或外购。外购价 $15/件，年需求 1,000 件。自制涉及以下成本：

| 成本项 | 金额（年） | Avoidable? |
|---|---|---|
| 原材料 | $6,000 | Yes（自制才需要） |
| 人工 | $4,000 | Yes（自制才需要） |
| 设备折旧（已购设备） | $2,000 | No（设备已买，不管用不用都折旧） |
| 厂房租金 | $3,000 | No（长期租约，不能退） |
| 出租厂房的机会收入 | $2,500 | Yes（如果外购，厂房可以出租赚钱） |

**解题：**

Step 1 — 自制的 relevant cost = 原材料 + 人工 = 6,000 + 4,000 = **$10,000**

Step 2 — 外购的 relevant cost = 15 x 1,000 = **$15,000**，但可以出租厂房赚 $2,500，净成本 = 15,000 - 2,500 = **$12,500**

Step 3 — 设备折旧和厂房租金都是 unavoidable cost，不管选哪个都要付，不纳入比较。

Step 4 — 结论：自制 relevant cost ($10,000) < 外购 relevant cost ($12,500)，推荐自制。

**常见错误提醒：** 不要把会计总成本机械相加。设备折旧 $2,000 和厂房租金 $3,000 虽然在会计报表上是自制的"成本"，但它们不会因为你选择外购而消失，所以不算 relevant cost。

---

## Cross-over point

Ref: Set 2 Q1.10

### 题型

手工工具（FC 低、VC 高）vs 自动化设备（FC 高、VC 低）→ 求在什么产量下两种方案成本相等（交叉点），再折算成年数。

### 做法

令 manual total cost = automated total cost：

$$
FC_1 + VC_1 \times Q = FC_2 + VC_2 \times Q
$$

解出 $Q^*$，再按年产量折算年数。

### 典型例子（Set 2 Q1.10 原题）

- manual: $1000 + 1.5Q$
- automated: $15000 + 0.5Q$

求解过程：

$$
1000 + 1.5Q = 15000 + 0.5Q
$$

$$
1.5Q - 0.5Q = 15000 - 1000
$$

$$
1.0Q = 14000 \implies Q^* = 14000
$$

若年产量 $5000$，则回收年数 = $14000 / 5000 = 2.8$ years。

**直觉：** 产量低于 14,000 时，手工更便宜（固定成本低）；产量高于 14,000 时，自动化更便宜（变动成本低）。如果每年生产 5,000 件，要 2.8 年才能达到交叉点。

## Cross-over point 历年真题出题方式

| 年份 | 题号 | 形式 | 具体考查内容 |
|---|---|---|---|
| 2022 | Q20(iii) | 计算 | 两个方案（manual vs automated）的 cross-over point + 年限换算 |
| 2023 | Q20(iii) | 计算 | 同上风格 |
| 2024 | Q10(iii) | 计算 | 同上风格 |
| 2025 | Q2(iii) | 计算 | 同上风格 |

Cross-over point 计算步骤（固定模板）：
1. 写出两个方案的总成本方程：$TC_1 = FC_1 + VC_1 \times Q$，$TC_2 = FC_2 + VC_2 \times Q$
2. 令 $TC_1 = TC_2$，解出 $Q^*$
3. 用年产量折算年限：$Years = Q^* / \text{Annual Production}$

---

## Cost Management 四个过程

来源：ch03-project-management-part3 slides。

PMBOK 把项目成本管理分为四个过程，按顺序执行。这四个过程在考试中以选择题形式出现（如 Set 6 Q2(a) "正确的过程列表是什么"）。

| 过程 | 核心任务 | 关键输出 |
|---|---|---|
| Plan Cost Management | 制定成本管理计划、规则 | Cost Management Plan |
| Estimate Costs | 估算每项活动的成本 | Cost estimates, Basis of estimates |
| Determine Budget | 汇总估算，建立成本基线 | Cost baseline |
| Control Costs | 监控成本偏差，管理变更 | Work performance information, Change requests |

### 四种估算方法

| 方法 | 描述 | 精度 | 适用阶段 |
|---|---|---|---|
| Analogous estimating | 基于历史项目的粗略估算（Top-down） | 低 | 早期（Initiating） |
| Parametric estimating | 用公式或单位费率计算（如 $/m^2） | 中 | 中期 |
| Bottom-up estimating | 逐项活动估算后汇总 | 高 | 后期（Planning） |
| Three-point estimating | 用乐观/悲观/最可能三个值取平均 | 中-高 | 任何阶段 |

### 两种精度范围

| 类型 | 精度范围 | 使用阶段 |
|---|---|---|
| ROM (Rough Order of Magnitude) | -25% to +75% | Initiating（项目早期） |
| Definitive Estimate | -5% to +10% | Planning/Executing（项目后期） |

例：如果项目估算 $250,000，ROM 范围 = $187,500 到 $437,500；Definitive 范围 = $237,500 到 $275,000。越到后期，估算越精确。

---

## P&L / Gross Profit / EBITDA / EBITA

来源：Sample Exam Questions 多套卷反复出现的考点。

### Profit & Loss statement

P&L (Profit and Loss statement，也叫 Income Statement) 总结一段时期内的 sales revenue、costs/expenses 与 resulting profit or loss。简单说就是"这段时间公司赚了多少、花了多少、最后剩多少"。

### 利润表层级

从上往下看利润表，利润的计算是逐层递进的：

```
Total Sales（总销售额）
  - Cost of Sales（直接生产成本，如原材料、直接人工）
  ─────────────────────────
= Gross Profit（毛利润）
  - Operating Expenses（运营费用：salaries, rent, admin 等）
  ─────────────────────────
= EBIT / Operating Profit（经营利润）

  EBITDA = EBIT + Depreciation + Amortization
  EBITA  = EBIT + Amortization
```

具体来说：

- **EBIT** = Earnings Before Interest and Tax = 扣除运营费用后的经营利润（含折旧和摊销）
- **EBITDA** = EBIT + D + A = 在 EBIT 基础上**加回**折旧和摊销。目的是剥离会计处理的影响，看公司核心经营活动产生的现金创造能力。
- **EBITA** = EBIT + A = 只加回摊销，不加回折旧。因为折旧对应的有形资产（机器、厂房）确实在消耗，这部分"成本"是真实的；而摊销对应的无形资产（专利、商誉）的消耗更主观，所以去掉。

**关键区分：** EBITDA 比 EBITA 多加回一个 Depreciation。EBITA 还保留了折旧这个扣减项，EBITDA 则把折旧也加回来了。

**样题标准答案（EBITDA 和 EBITA 的正确答案都是选项 D）：**

> Gross Profit minus all company operating expenses (salaries and rent etc.)

样题考的是选项识别，不是计算。记住这个选项措辞就行。其实就是 EBIT/Operating Profit 的另一种说法。

### EBITDA / EBITA 对比表

| 指标 | 全称 | 去掉了什么 | 反映什么 |
|---|---|---|---|
| EBITDA | Earnings Before Interest, Tax, Depreciation, Amortization | Interest + Tax + D + A | 核心经营的现金创造能力 |
| EBITA | Earnings Before Interest, Tax, Amortization | Interest + Tax + A（保留了 D） | 扣除真实资产消耗后的经营利润 |

---

## EVM: PV / EV / AC / SPI / CPI

Ref: ch03-project-management-part3 slides, Set 6 Q1.6 / Q2(e)

EVM (Earned Value Management) 是项目管理中监控进度和成本的核心工具。它回答两个问题：**项目进度是不是落后了？花钱是不是超预算了？**

### 核心概念

- **PV** (Planned Value) = 截至目前，计划应该完成的工作值多少钱
- **EV** (Earned Value) = 截至目前，实际完成的工作值多少钱
- **AC** (Actual Cost) = 截至目前，实际花了多少钱
- **BAC** (Budget at Completion) = 整个项目的总预算

PV 和 EV 都是相对于 BAC 的百分比。比如 BAC = $100M，计划此时完成 29% 的工作，则 PV = $29M；实际只完成了 26% 的工作，则 EV = $26M。

### 核心公式

$$
SV = EV - PV \qquad CV = EV - AC
$$

$$
SPI = \frac{EV}{PV} \qquad CPI = \frac{EV}{AC}
$$

### 判断口诀

| 指标 | > 1 / > 0 | = 1 / = 0 | < 1 / < 0 |
|---|---|---|---|
| SPI / SV | 提前（ahead of schedule） | 按计划 | 延后（behind schedule） |
| CPI / CV | 节约（under budget） | 按预算 | 超支（over budget） |

**PPT 原文提醒：** "Negative CV is often difficult for the project to recover." 项目一旦超支，追回预算通常很困难。这不是一个对称的判断——进度落后可以加班赶回来，但钱花出去了很难追回。

### PPT 例题（ch03 slides）

**题目：** 项目总预算 BAC = $100M，当前时点数据：
- PV = $29M（计划完成 29%）
- EV = $26M（实际完成 26%）
- AC = $30.5M

**计算过程：**

Step 1 — CV = EV - AC = 26 - 30.5 = **-$4.5M**（超支 $4.5M）

Step 2 — SV = EV - PV = 26 - 29 = **-$3M**（落后 $3M 的工作量）

Step 3 — CPI = EV / AC = 26 / 30.5 = **0.85**（每花 $1 只产出 $0.85 的价值，15% over budget）

Step 4 — SPI = EV / PV = 26 / 29 = **0.90**（进度只完成了计划的 90%，10% behind schedule）

**结论：** 这个项目又超支又延期——CPI < 1 说明 cost over budget，SPI < 1 说明 behind schedule。而且 CV 为负，按 PPT 说法，这种超支往往很难恢复。

### 样题例题（Set 6 Q2(e)）

**题目：** PV = $10,000, EV = $8,500, AC = $8,000。

**计算：**
- SPI = EV / PV = 8,500 / 10,000 = **0.85**（behind schedule）
- CPI = EV / AC = 8,500 / 8,000 = **1.0625**（slightly under budget）

**结论：** 项目进度落后（SPI = 0.85），但成本控制得不错（CPI > 1）。花费比计划少，但不是因为效率高，而是因为进度落后了——活干得少，自然花得少。SPI < 1 + CPI > 1 的组合要小心，不能简单判断为"节约"。

### 另一道样题（Set 6 Q1.6）

CPI = 1.1, SPI = 0.9 → under budget 但 behind schedule。同理，进度落后但成本没超。

---

## Company valuation / strategic posture

Ref: Sample Exam Questions

### 题型

样题给 historical sales、product manufacturing cost、development cost、current product valuation，让你判断估值/利润。

### 做题策略

1. 识别哪些是 **sunk cost**（已发生的开发成本等，不计入决策——花出去的钱不管做不做这个决策都回不来了）
2. 哪些是 **current asset / design valuation**（当前值多少）
3. 哪些是已实现利润
4. 按题目口径做加减

### Sunk cost 解释

Sunk cost（沉没成本）= 已经花出去、无法收回的成本。不管你现在做什么决策，这笔钱都回不来了，所以**不应该影响当前的商业决策**。

例：你花了 $50,000 开发一个产品原型，现在发现市场不好。这 $50,000 就是 sunk cost——不管你决定继续还是放弃，这钱都已经花了。决策时只看"从现在起，继续做要再花多少、能赚多少"，不要被已花的钱绑架。

---

## 高频判断速记

### 马上想到的

- `NPV > 0` → acceptable
- `BCR > 1` → benefits exceed costs; worth pursuing
- `BCR = 1` → benefits equal costs; **isn't worth pursuing**（PPT 原文）
- `IRR > required rate` → attractive; `IRR < 0` → 直接 reject
- `TC = R` → break-even
- `Q_BE = FC / (SP - VC)`
- `Gross Profit = Sales - Cost of Sales`
- cash growth + cash shortage → overtrading
- `SPI > 1` → ahead of schedule; `SPI < 1` → behind schedule
- `CPI > 1` → under budget; `CPI < 1` → over budget
- Negative CV → 项目超支往往很难恢复

### 容易掉坑的

- 不同 appraisal 指标不能总是直接横向硬比
- accounting total cost ≠ decision-relevant cost
- bookings ≠ immediate cash-in（30-day terms）
- EBITDA 加回 D（折旧）和 A（摊销），EBITA 只加回 A、保留折旧扣减——EBITDA 比 EBITA 多加回一个 D
- NPV 公式的求和下标要和 $I_0$ 的处理一致，不要双重扣除
- SPI < 1 + CPI > 1 不代表项目"节约"，可能只是进度落后导致花得少

## 对应样题

| 主题 | 样题出处 |
|---|---|
| Cash flow / 30-day terms / Overtrading | Set 1 Q1.11-12, Set 2 Q3/Q4 |
| Break-even / Safety margin | Set 2 Q1.10, Set 3 Q1.6, Set 4 Q1.9, Set 5 Q1.7 |
| Make-or-buy / Relevant cost | Set 1 Q4, Set 3 Q1.5, Set 4 Q2, Set 6 Q1.10 |
| NPV / BCR / IRR 判断 | Set 1 Q1.5, Set 3 Q1.4, Set 6 Q1.4（多处） |
| EVM (SPI / CPI) | Set 6 Q1.6, Q2(e) |
| Cost Management 过程 | Set 6 Q2(a) |
| EBITDA / EBITA / P&L | Set 1 Q1.7, Set 3 Q1.2, Set 6 Q1.7 |
| Cross-over point | Set 2 Q1.10 |

---
## 历年真题考查情况

| 年份 | 题号 | 考查形式 | 考查内容 |
|---|---|---|---|
| 2022 | Q1 | MCQ | NPV/BCR 判断 |
| 2022 | Q20 | 计算 | Break-even + safety margin + cross-over point |
| 2023 | Q1 | MCQ | NPV/BCR/IRR 判断 |
| 2023 | Q20 | 计算 | Break-even + safety margin + cross-over point |
| 2024 | Q1 | MCQ | NPV/BCR 判断 |
| 2024 | Q10 | 计算 | Break-even + safety margin + cross-over point |
| 2025 | Q1(vi) | 简答 | Make-or-buy 相关因素分析 |
| 2025 | Q1(vii) | 简答 | IRR 含义与判断 |
| 2025 | Q2(ii) | 计算 | Break-even + safety margin + 目标利润销量 |
| 2025 | Q2(iii) | 计算 | Cross-over point + 年限换算 |

**高频考点提示：** Break-even + cross-over point 计算题每年必考（大题最后一小问），NPV/BCR/IRR 判断在 MCQ 中反复出现。
