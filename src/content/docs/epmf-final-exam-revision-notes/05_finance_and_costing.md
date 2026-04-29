---
title: "第5章 财务与成本"
description: "NPV、BCR、IRR、cash flow、break-even、make-or-buy、P&L 与 costing 复习笔记。"
date: 2026-04-27
tags:
  - exam-revision
  - finance
  - costing
category: "课程复习"
docGroup: "epmf-final-exam-revision-notes"
order: 6
draft: false
---
> 这一册题量很大，但当前 slides 对其中一部分题目的直接支撑弱于 DFM / PM / Quality，因此我会把“考试很高频”和“slides 已确认支持”分开写。

---

## 1. Investment appraisal 三件套

### Net Present Value (NPV)

**NPV**：把未来 cash flows 折现到现在后，减去初始投资。

判断：
- `NPV > 0` → usually acceptable / attractive
- `NPV < 0` → reject

### Benefit-Cost Ratio (BCR)

**BCR**：收益与成本之比。

判断：
- `BCR > 1` → benefits exceed costs
- `BCR = 1` → break-even in value terms
- `BCR < 1` → unattractive

### Internal Rate of Return (IRR)

**IRR**：使 NPV = 0 的折现率。

判断：
- 若 `IRR` 高于 required/hurdle rate → attractive
- 仅知道 IRR 是负值，通常表示不吸引人

### 样题里的常见判断题

如果给出：
- A: `NPV = +1.2 million`
- B: `BCR = 1.035`
- C: `IRR = -0.03%`

最稳妥判断：
- C 明显最差
- A 与 B 都看起来可接受
- 但由于评价指标不同、缺少统一基准，**严格说不一定能仅凭这些数字直接断定 A 一定优于 B**

所以这类题若选项里有“insufficient / uncertain based on provided info”，要认真考虑。

---

## 2. Cash flow with 30-day net terms

样题给的逻辑是：

- **Sales Bookings** 不是当月现金流入
- **Shipments** 往往对应下一期回款基础
- **Components Order** 形成现金流出
- 30-day net 表示 cash-in / cash-out 有一个月时滞

### 做题步骤

1. 先明确哪一行是当月订单，哪一行是下月收款
2. 再逐月求 net cash flow
3. 再累计成 cumulative cash

### 考试重点

- 看懂时滞关系
- 别把 bookings 当作立即 cash-in
- 会判断 cumulative cash 是否持续恶化

### Overtrading

如果企业销售/扩张很快，但现金持续紧张、营运资金跟不上，这通常叫：

> **Overtrading**

---

## 3. Break-even analysis

### 核心式

- `TC = FC + Q × VC`
- `R = SP × Q`

其中：
- `TC` = total cost
- `FC` = fixed cost
- `VC` = variable cost per unit
- `SP` = selling price per unit
- `Q` = quantity
- `R` = revenue

### Break-even point 条件

> `TC = R`

展开就是：

`FC + QVC = SPQ`

所以：

`Q = FC / (SP - VC)`

其中 `SP - VC` 是 contribution per unit。

---

## 4. Make-or-buy / buy-vs-make

### 基本思路

#### Buy

- 购买价格 × 数量
- 注意是否还能保留/获得 facility rental income
- 注意哪些 fixed overhead unavoidable

#### Make

- direct materials
- direct labour
- variable overhead
- plus relevant fixed cost or opportunity cost

### 做题关键

不是把所有会计成本机械相加，而是看：

- 哪些成本是 **avoidable / unavoidable**
- facility 能否出租
- 自制是否失去租金收入

也就是：

> relevant cost matters more than historical/accounting total cost

---

## 5. Cross-over point

题型：

- 手工工具固定成本低、单位人工高
- 自动化设备固定成本高、单位成本低
- 问多久达到成本交叉点

### 做法

设：
- manual total cost = `FC1 + VC1 × Q`
- automated total cost = `FC2 + VC2 × Q`

令两者相等，求交叉产量 `Q*`。

再根据 annual production rate 折算成年数。

### 典型例子

- manual: `1000 + 1.5Q`
- automated: `15000 + 0.5Q`

令相等：

`1000 + 1.5Q = 15000 + 0.5Q`

得：

`Q = 14000`

若年产量 `5000`，则：

`14000 / 5000 = 2.8 years`

---

## 6. Profit & Loss / Gross Profit / EBITDA / EBITA

### Profit & Loss statement 是什么

最稳妥理解：

> 总结一段时期内 sales revenue、costs / expenses 与 resulting profit or loss。

### Gross Profit

`Gross Profit = Total Sales - Cost of Sales`

### EBITDA / EBITA

样题风格里通常把它理解为：

- 从 gross profit 往下扣 operating expenses
- 不计 interest, tax, depreciation, amortization 的层次

在 MCQ 中，最接近的正确选项常是：

> gross profit minus company operating expenses (salaries, rent, etc.)

但注意：这是按样题选择逻辑记忆，不是严格完整财报教学定义。

---

## 7. Company valuation / simple valuation style questions

某些样题会给：

- historical sales
- product manufacturing cost
- development cost
- current product valuation

这类题往往更偏 exam-style business arithmetic，而不是当前 slides 的强支撑区。

建议策略：

1. 先识别哪些是 sunk cost
2. 哪些是 current asset / design valuation
3. 哪些是已实现利润
4. 按题目口径做加减

这部分记作：`Exam-only signal`

---

## 8. Payback period

### 定义

回收期 = 累计净现金流把初始投资补回所需时间。

### 做法

1. 累加每年 cash inflow
2. 找到刚好由负转正的年份
3. 用剩余未回收金额 / 下一年现金流，换算成年/月

---

## 9. NPV 长题步骤

1. 列出初始投资（通常为负）
2. 列每年 cash flow
3. 按折现率折现：
   `PV = CF_t / (1+r)^t`
4. 累加所有 present values
5. 得到 NPV
6. 最后评论 attractiveness

### 评论模板

- `NPV > 0` → financially attractive
- `NPV < 0` → not attractive
- payback short + NPV positive → stronger case

---

## 10. Safety margin

在 break-even 题里，**safety margin** 表示：

> 实际/预计销量超过 break-even 销量的那部分缓冲。

可写成：

- 单位数：`Actual Sales - Break-even Sales`
- 百分比：`(Actual Sales - Break-even Sales) / Actual Sales`

---

## 11. 高频判断题速记

### 你应该马上想到的

- `NPV > 0` → acceptable
- `BCR > 1` → acceptable
- `BCR = 1` → benefits equal costs
- `TC = R` → break-even
- `Gross Profit = Sales - Cost of Sales`
- cash growth + cash shortage → overtrading

### 你要小心的

- 不同 appraisal 指标不能总是直接横向硬比
- accounting total cost 不一定等于 decision-relevant cost
- bookings 不等于 immediate cash-in

---

## 12. Coverage 提示

本册建议和 `07_coverage_and_gaps.md` 一起看，因为 finance / costing 虽然在样题中很高频，但当前 slides 对部分细项的直接支撑弱于 DFM、WBS、quality。
