---
title: "06 公式速查与长题模板"
description: "工程项目管理与财务考试公式速查、计算步骤与长题答题模板。"
date: 2026-04-27
tags:
  - exam-revision
  - formulas
  - answer-templates
category: "课程复习"
docGroup: "epmf-final-exam-revision-notes"
order: 7
draft: false
---
---

## 1. 必背公式

### Communication channels

`Channels = n(n - 1) / 2`

---

### Triangular distribution

若 best = `a`，most likely = `m`，worst = `b`

- expected duration: `Te = (a + m + b) / 3`
- standard deviation: `SD = sqrt((b-a)^2 / 18)` 或 `(b-a)/sqrt(18)`

### Beta / PERT distribution

- expected duration: `Te = (a + 4m + b) / 6`
- standard deviation: `SD = (b-a) / 6`

#### 示例

若：
- best = 8
- most likely = 10
- worst = 13

则：
- Triangular mean `= 10.3333`
- Triangular SD `≈ 1.1785`
- Beta mean `= 10.1667`
- Beta SD `≈ 0.8333`

---

### Control chart

- `CL = \bar{X}`
- `UCL = \bar{X} + k\sigma`
- `LCL = \bar{X} - k\sigma`

---

### Process capability

- `Cp = (USL - LSL) / 6\sigma`
- `Cpk = min[(USL - \mu)/(3\sigma), (\mu - LSL)/(3\sigma)]`

---

### Taguchi loss function

- `L(y) = k(y - m)^2`
- `k = A0 / (\Delta0)^2`

---

### Break-even

- `TC = FC + QVC`
- `R = SPQ`
- break-even when `TC = R`
- `Q_BE = FC / (SP - VC)`

---

## 2. WBS 题模板

### 题目在考什么

- 你是否理解 scope decomposition
- 是否能按层级组织项目工作

### 标准答题步骤

1. 写项目总名称
2. 拆成 major deliverables / phases
3. 每个 major item 再拆成更细活动
4. 保持层级一致
5. 确保覆盖完整 scope

### 常见失分点

- 只列清单，不做层级结构
- 漏掉 major phase
- 层级混乱

---

## 3. CPM 题模板

### 题目在考什么

- 会不会从 network 求工期与关键路径

### 标准答题步骤

1. 画 network diagram
2. forward pass 算 `ES/EF`
3. backward pass 算 `LS/LF`
4. 算 float
5. 找 float = 0 的路径
6. 写 critical path 和 total duration

### 常见失分点

- `ES` 没取前置活动 `EF` 的最大值
- `LF` 没取后续活动 `LS` 的最小值
- 把 longest path 写成 shortest path

---

## 4. Control chart 题模板

### 题目在考什么

- 会不会根据数据判断过程是否稳定

### 标准答题步骤

1. 算均值 `\bar{X}`
2. 算标准差 `\sigma`
3. 求 UCL / LCL
4. 作图或列出 limits
5. 判断是否有点超限 / 是否存在异常模式
6. 给出 stable / unstable 结论

### 常见失分点

- 忘写 central line
- 只给结论，不给 limits
- 把 specification limits 当成 control limits

---

## 5. Cp / Cpk 题模板

### 题目在考什么

- 会不会判断 capability 与 centering

### 标准答题步骤

1. 写 `USL`、`LSL`
2. 写 `\mu`、`\sigma`
3. 算 `Cp`
4. 算 `Cpk`
5. 比较 `Cp` 和 `Cpk`
6. 评价过程是否 capable、是否 off-center

### 常见失分点

- 把 `Cp` 和 `Cpk` 公式混淆
- 只算一个值
- 不解释 “low Cpk means off-center and/or too much variation”

---

## 6. Three-point estimating 模板

### 题目在考什么

- 会不会同时用 Triangular 与 Beta/PERT

### 标准答题步骤

1. 从 most likely duration 反推出 `a/m/b`
2. 用两套公式分别算 expected duration
3. 再分别算 standard deviation
4. 比较两种结果

### 常见失分点

- best/worst 与 reduction/extension 搞反
- 两种 distribution 混用公式

---

## 7. Communication channels 模板

### 题目在考什么

- 会不会算团队沟通复杂度变化

### 标准答题步骤

1. 先算原团队人数 `n1`
2. 再算新团队人数 `n2`
3. 分别算 channels
4. 相减得到新增 channels

### 常见失分点

- 忘记离职成员
- 只算新成员之间的沟通，不算新总量变化

---

## 8. DFM 比较题模板

### 题目在考什么

- 会不会从制造角度比较两个设计

### 作答框架

1. 先比较 number of parts
2. 再比较 assembly complexity
3. 再比较 cost / quality / maintenance trade-off
4. 最后给出 preferred design with justification

### 高频短句

- reduces part count
- simplifies assembly
- lowers manufacturing complexity
- reduces labour time
- improves consistency

---

## 9. Sustainability / 4Rs 模板

### 题目在考什么

- 会不会把设计特征映射到 sustainability principles

### 作答框架

1. 写三大支柱或 sustainability definition
2. 识别设计对材料/能耗/寿命/复用的影响
3. 对应到 4Rs
4. 给出比较结论

---

## 10. Cause-effect diagram 模板

### 题目在考什么

- 会不会系统分析 root causes

### 作答框架

- Effect: defect/problem statement
- Machines: ...
- Materials: ...
- Methods: ...
- Manpower: ...

最后补一句：

> The fishbone diagram helps organize potential causes systematically and supports root-cause investigation.

---

## 11. Break-even / make-or-buy 模板

### 题目在考什么

- 会不会区分 fixed / variable / relevant cost

### 标准答题步骤

1. 列 buy 方案成本
2. 列 make 方案成本
3. 说明哪些 fixed costs unavoidable
4. 考虑 rental opportunity / lost income
5. 比较 total relevant cost
6. 给 recommendation

---

## 12. NPV / payback 模板

### NPV

1. 列初始投资
2. 列每年 cash flow
3. 折现
4. 汇总得到 NPV
5. 评论 accept/reject

### Payback

1. 累计各年现金流
2. 找到回收点
3. 插值成 months if needed
4. 评论 liquidity attractiveness

---

## 13. 最后冲刺时最该背的内容

- `n(n-1)/2`
- Triangular / Beta expected duration
- `Cp` / `Cpk`
- `L(y)=k(y-m)^2`
- `TC = FC + QVC`
- `R = SPQ`
- critical path = longest path
- WBS = 100% of project work
- DMAIC 5 steps
- 3 sustainability pillars
