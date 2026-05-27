---
title: "第6章 公式与答题模板"
description: "工程项目管理与财务考试公式速查、计算步骤与长题答题模板。"
date: 2026-04-27
tags:
  - exam-revision
  - formulas
  - answer-templates
category: "课程学习"
docGroup: "epmf-final-exam-revision-notes"
order: 7
draft: false
---

> 最后冲刺用：只背公式、答题步骤、易错点。不再重复主题章解释。

## 必背公式速查

### Schedule & communication

- Channels：$\text{Channels} = \dfrac{n(n-1)}{2}$（$n$ = 团队人数）
- Triangular：$T_e = \dfrac{a+m+b}{3}$，$SD = \sqrt{\dfrac{(b-a)^2}{18}}$（$a$=best，$m$=most likely，$b$=worst）
- Beta/PERT：$T_e = \dfrac{a+4m+b}{6}$，$SD = \dfrac{b-a}{6}$
- CPM float：$\text{Float} = LS - ES = LF - EF$（float=0 → critical path）

### Quality

- Control chart：$\text{CL} = \bar{X}$，$\text{UCL} = \bar{X} + k\sigma$，$\text{LCL} = \bar{X} - k\sigma$（$k$ 通常取 3）
- $C_p = \dfrac{\text{USL} - \text{LSL}}{6\sigma}$
- $C_{pk} = \min\left[\dfrac{\text{USL} - \mu}{3\sigma},\ \dfrac{\mu - \text{LSL}}{3\sigma}\right]$
- Taguchi loss：$L(y) = k(y-m)^2$，$k = \dfrac{A_0}{\Delta_0^2}$（$A_0$=损失额，$\Delta_0$=公差）

### Finance & costing

- $\text{NPV} = \displaystyle\sum_{t=0}^{n} \dfrac{CF_t}{(1+r)^t} - I_0$（$r$=折现率，$I_0$=初始投资）
- $\text{BCR} = \dfrac{PV(\text{benefits})}{PV(\text{costs})}$（BCR > 1 → accept）
- $\text{TC} = FC + Q \times VC$
- $\text{R} = \text{SP} \times Q$
- $Q_{BE} = \dfrac{FC}{\text{SP} - VC}$
- Safety margin：$\dfrac{\text{Actual} - Q_{BE}}{\text{Actual}} \times 100\%$
- Earned value：$\text{SPI} = \dfrac{EV}{PV}$，$\text{CPI} = \dfrac{EV}{AC}$（>1 = ahead / under budget）

---

## Three-point estimating 模板

**识别词**：best/worst/most likely，两种 distribution

**步骤**：

1. 从题目提取 $a$（best）、$m$（most likely）、$b$（worst）
2. Triangular：$T_e = \dfrac{a+m+b}{3}$，$SD = \sqrt{\dfrac{(b-a)^2}{18}}$
3. Beta/PERT：$T_e = \dfrac{a+4m+b}{6}$，$SD = \dfrac{b-a}{6}$
4. 比较两种结果，写出结论

**易错点**：

- best/worst 与 reduction/extension 方向搞反
- 两种 distribution 公式混用
- 忘记算 SD

**对应样题**：Set 1、Set 4 中三点估算题

---

## Communication channels 模板

**识别词**：团队人数变化，new member joins / member leaves

**步骤**：

1. 算原团队 $n_1$，$\text{Channels}_1 = \dfrac{n_1(n_1-1)}{2}$
2. 算新团队 $n_2$（注意加减离职/入职人数）
3. $\text{New channels} = \dfrac{n_2(n_2-1)}{2}$
4. 差值 = $\text{Channels}_2 - \text{Channels}_1$

**易错点**：

- 忘记减去离职成员
- 只算新增成员之间的沟通，不算总量变化
- $n$ 没包含项目经理

**对应样题**：Set 1、Set 2 中沟通渠道计算题

---

## WBS 画图模板

**识别词**：scope decomposition，project breakdown

**步骤**：

1. 写项目总名称（Level 0）
2. 拆成 major deliverables 或 phases（Level 1）
3. 每个 major item 再拆成更细的工作包（Level 2+）
4. 确保覆盖 100% scope（100% rule）
5. 每层编号，保持层级一致

**易错点**：

- 只列清单不做层级结构
- 漏掉 major phase
- 层级深度不一致

**对应样题**：Set 2、Set 3 中 WBS 画图题

---

## CPM 做题模板

**识别词**：network diagram，critical path，float

**步骤**：

1. 画 network diagram，标出活动与前置关系
2. Forward pass：从左到右，$EF = ES + \text{Duration}$，多前驱取 **最大** $EF$
3. Backward pass：从右到左，$LS = LF - \text{Duration}$，多后继取 **最小** $LS$
4. 算 $\text{Float} = LS - ES = LF - EF$
5. Float = 0 的活动连成 **critical path**
6. 写 total duration = critical path 上各活动 duration 之和

**易错点**：

- $ES$ 没取前置活动 $EF$ 的最大值
- $LF$ 没取后续活动 $LS$ 的最小值
- 把 longest path 写成 shortest path

**对应样题**：Set 3、Set 4 中 CPM 计算题

---

## Control chart 模板

**识别词**：process stability，UCL/LCL，out of control

**步骤**：

1. 算样本均值 $\bar{X}$
2. 算标准差 $\sigma$（或用 $\bar{R}$ 估计）
3. $\text{CL} = \bar{X}$，$\text{UCL} = \bar{X} + 3\sigma$，$\text{LCL} = \bar{X} - 3\sigma$
4. 作图或列出 limits
5. 检查是否有超出 limits 的点、连续趋势、周期性等异常模式
6. 给出 stable / unstable 结论

**易错点**：

- 把 **specification limits**（客户要求）和 **control limits**（过程统计）混淆
- 忘写 central line
- 只给结论不给 limits

**对应样题**：Set 4、Set 5 中 control chart 分析题

---

## Cp / Cpk 模板

**识别词**：USL/LSL，process capability，off-center

**步骤**：

1. 写出 USL、LSL、$\mu$、$\sigma$
2. 算 $C_p = \dfrac{\text{USL} - \text{LSL}}{6\sigma}$
3. 算 $C_{pk} = \min\left[\dfrac{\text{USL} - \mu}{3\sigma},\ \dfrac{\mu - \text{LSL}}{3\sigma}\right]$
4. 判断：$C_p \geq 1.33$ → capable；$C_{pk} < C_p$ → off-center

**判断规则**：

- $C_p \geq 1.33$：过程能力足够
- $C_p < 1$：过程不满足规格
- $C_{pk} \approx C_p$：过程居中
- $C_{pk} \ll C_p$：过程偏心，需调整均值

**易错点**：

- $C_p$ 和 $C_{pk}$ 公式混淆
- 只算一个值不比较
- 不解释 "low Cpk = off-center and/or too much variation"

**对应样题**：Set 1 Q2(c)，Set 4 Q3(o)，Set 5 Q1.11

---

## Cause-effect diagram 模板

**识别词**：root cause，fishbone，defect analysis

**步骤**：

1. 写 Effect：明确的 defect / problem statement
2. **Machines**：设备相关原因
3. **Materials**：材料相关原因
4. **Methods**：工艺/流程相关原因
5. **Manpower**：人员相关原因
6. 在每个分支下列出具体潜在原因

**结尾固定句**：

> The fishbone diagram helps organize potential causes systematically and supports root-cause investigation.

**易错点**：

- 分支分类混乱（如把人员原因放到 Machines 下）
- 缺少具体原因，只写 4M 标题
- 忘记写 Effect statement

**对应样题**：Set 2、Set 5 中鱼骨图题

---

## Break-even / make-or-buy 模板

**识别词**：break-even，make or buy，relevant cost，fixed/variable

**步骤**：

1. 识别 fixed costs（FC）和 variable costs（VC）
2. 列 buy 方案：总购买成本 = 单价 $\times$ 数量
3. 列 make 方案：$TC = FC + Q \times VC$
4. 说明哪些 fixed costs 是 unavoidable（沉没成本，不算 relevant）
5. 考虑 opportunity cost（如租金收入 / lost income）
6. 比较 total relevant cost，给 recommendation

**易错点**：

- 把 unavoidable fixed costs 算进 relevant cost
- 忘记 opportunity cost
- Break-even 时 $Q_{BE} = \dfrac{FC}{\text{SP} - VC}$，SP - VC 也叫 contribution margin

**对应样题**：Set 1、Set 3 中 make-or-buy 题

---

## NPV / payback 模板

**识别词**：discount rate，NPV，payback period，investment

**NPV 步骤**：

1. 列初始投资 $I_0$
2. 列各年 cash flow $CF_t$
3. 用折现率 $r$ 折现：$\text{NPV} = \displaystyle\sum_{t=0}^{n} \dfrac{CF_t}{(1+r)^t} - I_0$
4. NPV > 0 → accept；NPV < 0 → reject
5. 比较多个项目时选 NPV 最大的

**Payback 步骤**：

1. 累计各年现金流
2. 找到累计由负转正的年份
3. 插值：$\text{Payback} = \text{last negative year} + \dfrac{|\text{cumulative}|}{\text{next year CF}}$
4. 评论 liquidity（回收期短 → 流动性好）

**易错点**：

- 忘记初始投资要加负号
- Payback 不考虑回收后的现金流
- 折现率用错（年利率 vs 半年利率）

**对应样题**：Set 3、Set 4 中 NPV/payback 计算题

---

## EVM CPI/SPI 模板

**识别词**：earned value，planned value，actual cost，schedule/cost performance

**步骤**：

1. 从题目识别三个值：
   - $EV$（Earned Value）：已完成工作的预算价值
   - $PV$（Planned Value）：计划完成工作的预算价值
   - $AC$（Actual Cost）：已完成工作的实际花费
2. 算 $\text{SPI} = \dfrac{EV}{PV}$，$\text{CPI} = \dfrac{EV}{AC}$
3. 判断：
   - SPI > 1 → ahead of schedule；SPI < 1 → behind schedule
   - CPI > 1 → under budget；CPI < 1 → over budget
4. 可选：$\text{EAC} = \dfrac{BAC}{CPI}$（ Estimate at Completion）

**易错点**：

- EV/PV/AC 三个值混淆
- 忘记 CPI 和 SPI 的分子都是 EV
- 只算数值不写 interpretive sentence

**对应样题**：Set 6 Q1.6，Q2(e)

---

## Cash flow 30-day terms 模板

**识别词**：30-day payment terms，bookings，shipments，cash flow forecast

**步骤**：

1. 识别三个序列：bookings（订单）、shipments（发货/收入确认）、payments（收款）
2. 理解时间偏移：shipments 比 bookings 延后，payments 比 shipments 延后 30 天
3. 按月份列出各序列金额
4. 30-day terms 下：当月 shipments → 下月才收到 payment
5. 计算每月 net cash flow = payments received - expenses paid
6. 累计各月 cash flow 得到 cumulative balance

**易错点**：

- 忘记 payments 滞后一个月
- 把 bookings 直接当 cash inflow
- cumulative 算错月份对齐

**对应样题**：Set 6 中现金流预测题

---

## Break-even graph 作图模板

**识别词**：break-even chart，break-even point，contribution margin

**步骤**：

1. **X 轴**：Quantity（产量/销量）；**Y 轴**：£（金额）
2. 画 **Total Cost 线**：起点 = FC（Y 轴截距），斜率 = VC per unit
3. 画 **Total Revenue 线**：起点 = 0，斜率 = SP per unit
4. 两线交点 = Break-even point，对应 X 轴即 $Q_{BE}$
5. 标注：交点左侧 = loss 区域，右侧 = profit 区域
6. 标注 FC 截距、$Q_{BE}$、各线名称

**易错点**：

- Total Cost 线起点画在原点（应该从 FC 开始）
- 两线斜率画反
- 忘记标注 axes 和 lines

**对应样题**：Set 1、Set 3 中 break-even graph 作图题

---

## P&L / EBITDA 快速判断模板

**识别词**：P&L excerpt，EBITDA，EBITA，operating profit

**MCQ 判断流程**：

1. P&L 标准顺序：Revenue → COGS → Gross Profit → Operating Expenses → EBITDA → Depreciation → EBIT → Amortization → EBITA → Interest → Tax → Net Profit
2. EBITDA = Operating Profit + Depreciation + Amortization（扣除前的经营利润）
3. EBITA = EBITDA - Depreciation（保留 amortization，去掉 depreciation）
4. 题目给你哪一行的数值，往上或往下加减即可

**易错点**：

- EBITDA 和 EBITA 搞混（A = 有 Amortization；DA = 有 Depreciation + Amortization）
- 把 interest 或 tax 包含在 EBITDA 里
- 题目给的是 Net Profit，需要反推

**对应样题**：Set 5、Set 6 中 P&L 解读 MCQ

---

## 最后冲刺 checklist

- [ ] $n(n-1)/2$ 能立刻写出来
- [ ] Triangular 和 Beta/PERT 公式不会混
- [ ] CPM forward/backward pass 步骤清楚
- [ ] Float = 0 = critical path
- [ ] $C_p$ vs $C_{pk}$ 区别能说清
- [ ] Control limits ≠ specification limits
- [ ] $Q_{BE} = FC / (\text{SP} - VC)$ 能秒写
- [ ] Make-or-buy 只看 relevant cost
- [ ] NPV 折现公式、payback 插值法
- [ ] EV/PV/AC 三个值不混淆，分子永远是 EV
- [ ] Cash flow 30-day terms 下 payments 滞后一个月
- [ ] P&L 中 EBITDA = Operating Profit + D + A
- [ ] Cause-effect diagram 结尾写固定句
- [ ] WBS 遵守 100% rule
