---
title: "第1章 DFM 与可持续设计"
description: "DFM、可持续设计、三大支柱、4Rs 与设计比较题复习笔记。"
date: 2026-04-27
tags:
  - exam-revision
  - dfm
  - sustainability
category: "课程学习"
docGroup: "epmf-final-exam-revision-notes"
order: 1
draft: false
---

## 本章概览

本章讲两件事：**DFM（面向制造的设计）** 和 **可持续设计（Design for Sustainability）**。考试中这两个主题经常出现在同一道题里，所以放在一起复习。

### 零基础先览

- **DFM**：在设计阶段就考虑"这个零件怎么造、成本多少"，而不是等生产时再改。70%-80% 的生产成本在设计阶段就被锁定了，所以越早介入越好。
- **6 条 DFM 原则**：Simplicity（少零件）、Standardization（用标准件）、Tolerance（合理公差）、Material Selection（选对材料）、Automation（自动化）、Process Integration（设计与制造协同）。记住口诀 SSTMAP，考试用排除法做题。
- **Sustainability**：可持续 = 经济、环境、社会三个支柱要平衡，不损害后代的需求。三支柱缺一不可。
- **4Rs**：Reduce（减少用量）、Reuse（零件再用）、Repair（坏了修）、Recycle（材料回收）。注意不是 Recover，不是 Replace。
- **7 项可持续设计原则**：Dematerialization, Modular design, Prefer renewable energy, Migration to product-service systems, Design for longevity, Limit or eliminate long-distance outsourcing, Invest in simulation。
- **Precautionary approach**：风险不确定但潜在伤害大时，先采取预防措施，不等确凿证据。

---

## DFM 定义

**Design for Manufacturing (DFM)**：PPT 原文分两段——

> Design For Manufacturing (DFM) is the process of designing components of high-quality products for ease of manufacturing at a lower cost.
>
> This is done by lowering complexity, optimizing performance, and redefining the product.

通俗理解：DFM 是一种设计方法论。它不是在产品造出来之后再去"优化制造"，而是在画图纸的时候就想好这个零件怎么造、用什么工艺、成本多少。目标很直接——降成本、提质量、缩短上市时间。

注意：DFM 的**定义**强调的是"设计高质量产品组件以实现低成本制造"，它本身不包含"早期"这个时序概念。"早期介入"是 DFM 的**最佳实践**，见下一节。

Reference: PPT slide 4

---

## DFM 最佳介入时机与 cost of change

这是一个关键考点，也是零基础学生最容易死记结论的地方。背后的经济学逻辑值得理解。

**Cost of change curve（变更成本曲线）**：产品开发越到后期，修改设计的成本呈指数级增长。在概念阶段改一个尺寸参数可能花1小时画图；到模具都开好了再改，可能要重开模具、报废库存、延迟交货，成本差距可能是 100 倍。

PPT 明确指出：

> 70% to 80% of production costs are determined by design decisions.

这意味着你画图纸时做的每一个决策——选什么材料、用几个零件、公差定多大——已经锁定了产品绝大部分的制造成本。到了生产阶段再改，不是不能改，而是改不起。

所以结论很清楚：**DFM 在 initial design 阶段最有效，因为此时影响力最大（highest impact）、变更成本最低（lowest cost of changes）。**

产品开发的一般阶段：initial design → final design → fabrication → production → product launch。越靠前介入，DFM 价值越大。

PPT slide 7-8 展示了设计知识流动（Flow of Design Knowledge）和产品开发生命周期（Product Development Lifecycle）的流程图，建议直接查看原图理解各阶段的衔接关系。

### DFM 的 7 项好处

PPT slide 16 列出了 Product Development with DFM 的 7 项好处，虽然不是高频考点，但可能出现在"DFM 的优势"类题目中：

1. **Lower Manufacturing Costs**——降低制造成本
2. **Improved Production Efficiency**——提高生产效率
3. **Improved Product Quality**——提高产品质量
4. **Streamlined Product Development Process**——简化产品开发流程
5. **Better Supply Chain Management**——优化供应链管理
6. **Enhanced Competitiveness**——增强竞争力
7. **Compliance with Regulations**——符合法规要求

### DFM 的责任方与持续时间

PPT slide 17-18 补充了两个要点：

- **谁负责 DFM**：Design Engineers, Manufacturing Engineers, Quality Control, Procurement, Management——DFM 不只是设计工程师的事，需要多部门协同。
- **DFM 持续多久**：As a general rule, DFM is a continuous process that continues through the entire product lifecycle。DFM 不是画完图纸就结束的，而是贯穿产品整个生命周期。

### DFM 与其他方法的关系

PPT slide 19 展示了 DFM 在工程方法体系中的位置——与 Process Capability、Quality Control、6-Sigma、Cost of Quality、Design for Sustainability、Robust Product Design 并列。其中 **Design for Sustainability (DFS)** 是 DFM 体系中专门关注可持续性的子方法。

### 高频错项陷阱

- "DFM 不能在初始设计阶段开始" → 错
- "DFM 主要在生产后期最有效" → 错
- "DFM may impose higher manufacturing costs" → 错（PPT slide 43 样题 D 选项确认，DFM 的核心目标就是降低制造成本）
- "DFM 会增加制造复杂度" → 错（DFM 的目标是降低复杂度）

直接可用于作答的句子：

> DFM is most effective in the initial design stage because 70%-80% of production costs are determined by design decisions made early, and the cost of change is still low at this point.

Reference: PPT slide 9, slide 16-19, slide 40, slide 43; Set 1 Q1.1, Set 3 Q1.10, Set 4 Q1.1, Set 5 Q1.8-1.9, Set 6 Q1.1

---

## DFM Principles（6 条原则）

PPT 列出 6 条 DFM 核心原则。考试中常见题型是"以下哪个不是 DFM 原则"——只要记住这 6 个，排除法就能搞定。

速记口诀：**SSTMAP**（Simplicity, Standardization, Tolerance, Material Selection, Automation, Process Integration）

一句话理解：fewer parts → easier assembly → fewer process steps → lower cost → more consistent quality。

但每条原则有自己的侧重点，下面逐一展开：

| 原则 | PPT 原文要点 | 通俗解释 | 举例 |
|------|-------------|---------|------|
| **Simplicity** | 设计应尽量少用零件，使用简单的形状和结构，使生产更容易、更经济 | 零件越少、结构越简单，装配越快，出错越少 | 用一个整体注塑件代替五个螺丝拼接的外壳——零件数从 5 变成 1 |
| **Standardization** | 尽可能使用标准零件和标准工艺，节省时间、降低生产成本 | 能用现成的标准件就不自己开模定做，供应商多、价格低、交期短 | 所有螺丝统一用 M3 规格，而不是混用 M2.5/M3/M3.5 三种 |
| **Tolerance** | 合理的公差设计对产品功能至关重要，需平衡精度需求与制造成本 | 公差越紧，加工精度要求越高，成本指数级上升；但太松又影响装配和功能 | 一般配合面用 IT7-IT8 公差等级就够了，不必都用 IT5 |
| **Material Selection** | 材料选择直接影响生产成本和最终产品质量，需考虑强度、耐久性、可制造性 | 选材料不是越贵越好，而是要匹配工艺和性能需求 | ABS 塑料注塑性好、成本低，适合外壳件；航空铝强度高但加工费贵，看场景选 |
| **Automation** | 自动化能显著提高生产效率、降低人工成本、提高产品质量，需考虑自动化的类型和程度 | 能自动化的工序尽量自动化，减少人为变异 | 用自动螺丝锁付机代替手工拧螺丝，效率和一致性都更好 |
| **Process Integration** | 整合产品设计、制造流程和质量控制对提高效率、降低成本至关重要，需要与工业设计师、工艺工程师等密切协作 | 设计、制造、品控三个团队不能各干各的，要从一开始就一起定方案 | 设计阶段就让工艺工程师参与，避免设计出"画得出但造不出"的零件 |

### 高频错项辨析

- **"Advertising Strategy"**（广告策略）→ 不是 DFM 原则（PPT slide 44 样题确认）
- **"DFM may impose higher manufacturing costs"** → 错（PPT slide 43 样题 D 选项确认，DFM 的核心目标就是降低制造成本，不是增加成本）
- 任何不属于以上 6 项的选项 → 排除

Reference: PPT slides 10-15, slide 43-44; Set 2 Q1.1（考察 Simplicity 原则）

---

## Design A vs Design B 比较模板

样题常见设定：**Design A**（多零件，需装配）vs **Design B**（集成为单一 molded component）。

这类题考察的是你能否从 DFM 和 sustainability 两个角度系统地比较两种设计。下面用表格做对比，然后给出完整答题段落。

### 对比表

| 比较维度 | Design A（多零件组装） | Design B（一体化注塑） |
|---------|---------------------|---------------------|
| 零件数量 | 多个零件，需分别制造和管理 | 集成为单一零件，数量最少 |
| 装配复杂度 | 需要多次装配操作，步骤多、工时长 | 无需装配或装配极少 |
| 装配出错概率 | 高——零件越多，错装/漏装风险越大 | 低——一体化设计消除了装配错误 |
| 库存和物流 | 需管理多种零件的库存和配送 | 只需管理单一零件 |
| 单件成本（量产后） | 较高——多次装配、多次物料处理 | 较低——自动化成型、一次成型 |
| 模具/工装成本 | 单个零件模具较简单，但零件数量多，总模具数量和管理成本可能较高 | Initial tooling cost 较高（一体化模具复杂、昂贵），但量产后 per-unit cost 较低 |
| 维修和替换 | 方便——可单独更换损坏零件 | 困难——整体更换，维修成本高 |
| 零件可复用性 | 较高——个别零件可在其他产品中使用 | 较低——专用一体化件难以跨产品复用 |
| 设计灵活性 | 较高——各零件可独立迭代 | 较低——改一处可能需要重做整套模具 |
| 材料用量 | 较多——紧固件、连接件等额外材料 | 较少——一体化减少冗余材料 |
| 可持续性影响 | 零件多意味着更多材料消耗和废料 | 减少材料使用、减小体积重量 → 降低运输排放（Reduce） |

### Design A advantages（答题可用）

- parts may be reusable in other devices (Reuse)
- easier replacement / maintenance of individual parts
- design flexibility may be higher

### Design A disadvantages

- more parts, more assembly operations
- higher assembly time, more chances of assembly error
- higher inventory / handling complexity

### Design B advantages

- part count reduced, assembly simplified
- lower labour time, lower manufacturing complexity
- often lower unit cost at scale, potentially better consistency
- smaller form factor → reduced packaging, storage, transportation costs

### Design B disadvantages

- tooling / mold cost may be higher initially（注意是初始成本，量产后 per-unit cost 更低）
- maintenance or partial replacement may be harder
- less modular / less reusable

### 完整答题段落示例

> From a DFM perspective, Design B is generally preferred because it reduces part count and simplifies assembly, which lowers manufacturing complexity, assembly time, and the probability of defects. With fewer parts, there is less inventory to manage and lower labour cost per unit at scale. In contrast, Design A requires multiple assembly operations, each introducing potential for error and adding cycle time.
>
> Specifically, Design B's integrated approach aligns with the DFM principles of **Simplicity** (fewer parts, straightforward structure) and **Process Integration** (design and manufacturing considered together). While Design B may have higher initial tooling cost, the per-unit manufacturing cost is typically lower once production volume justifies the investment.
>
> From a sustainability standpoint, Design B also tends to use less material overall, reducing resource consumption and waste (aligned with **Reduce** in the 4Rs). However, Design A may offer advantages in repairability and part reuse — if individual components can be replaced rather than discarding the entire unit, this supports the **Reuse** principle.
>
> In summary, for high-volume production prioritizing cost and efficiency, Design B is the better DFM choice. For applications where longevity, repairability, and modular upgrade are critical, Design A's modularity may offer sustainability advantages that partially offset its higher manufacturing complexity.

### 高分句型公式

1. **Topic sentence**：总论点——哪个更优/各有什么优势
2. **DFM 分论点 1**：零件数量 → 对应 Simplicity 原则
3. **DFM 分论点 2**：装配复杂度 → 对应 Process Integration
4. **DFM 分论点 3**：成本影响 → 量化（如 unit cost、tooling cost）
5. **Sustainability 分论点**：材料用量、运输、4Rs 关联
6. **总结句**：场景化结论——什么情况选 A，什么情况选 B

### Self-check 列表

写完答案后，用下面几条自查：

- [ ] 是否同时覆盖了 DFM 和 sustainability 两个角度？
- [ ] 是否提到了至少 2 条 DFM 原则（如 Simplicity, Process Integration）？
- [ ] 是否把 Design B 的 higher initial tooling cost 和 lower per-unit cost 区分清楚了？
- [ ] 是否提到了 4Rs 中至少一个（Reduce 或 Reuse）？
- [ ] 结论是否区分了"什么场景选 A、什么场景选 B"，而非简单一边倒？

---

## Linear Economy vs Circular Economy

这是理解 4Rs 和可持续设计的理论背景。考试中虽然不会直接问"什么是线性经济"，但 Design A/B 比较题的深层逻辑就是在这两个模式之间做选择。

### Linear Economy（线性经济）

PPT 原文说得很简略：传统经济遵循 "straight-line pattern"，这种模式 "highly unsustainable"，需要改变。

通俗解释：线性经济的路径是取原材料 → 制造 → 使用 → 丢弃（这是对 PPT "straight-line pattern" 的展开说明，非 PPT 原文）。问题很明显：资源是有限的，用完就没了。大量废弃物产生，环境压力巨大。

### Circular Economy（循环经济）

PPT 原文：

> The main focus of this type of economic model is to reintroduce used parts as raw materials for new products. The intent is to move from a high-waste to a high-value model.

把"用过的零件/材料重新引入作为新产品原材料"，形成闭环。核心意图是**从高浪费模式转向高价值模式**（move from a high-waste to a high-value model）。

好处：资源高效利用（resource-efficient），减少对自然资源的开采、污染和浪费。

**4Rs 是构建循环经济的有效工具。** 理解了这一点，就能理解为什么可持续设计原则都围绕"减少、复用、修复、回收"展开。

### 考试怎么关联

Linear/Circular Economy 的概念不会单独出题，但会在 Design A/B 比较题中隐含考察。比如样题 Set 1 Q2(a)(iii) 要求 "Distinguish the principles of the 4Rs that Design A and Design B primarily apply to promote the circular economy"——直接把 circular economy 和 4Rs 结合在 Design A/B 比较中出题。答题时要意识到：Design B 的一体化减少材料用量是在朝 circular economy 方向走（Reduce），Design A 的零件可复用也在朝这个方向走（Reuse）。

Reference: PPT slides 28-30; Set 1 Q2(a)(iii)

---

## Sustainability 定义与三大支柱

### 定义

> Sustainability consists of fulfilling the needs of current generations without compromising the needs of future generations, while ensuring a balance between economic growth (Economic pillar), environmental care (environmental pillar), and social well-being (Social pillar).

通俗说：让当代人活得好的同时，不把子孙后代的资源和环境搞砸。三个支柱要同时兼顾，不能偏废。

### 三大支柱

| 支柱 | 英文 | 制造语境下的含义 |
|------|------|----------------|
| **Economic pillar** | Economic growth | 产品要能盈利，制造成本可控，企业能持续经营——不是赔钱做环保 |
| **Environmental pillar** | Environmental care | 减少资源消耗、减少排放和废弃物、降低产品全生命周期的环境影响 |
| **Social pillar** | Social well-being | 保障劳工权益、产品安全、社区福祉——不是牺牲工人健康来降成本 |

高频陷阱：

- 只重经济增长、只重环保、或只重社会福祉 → 都是错的
- 只要失去"平衡三支柱 + 不损害未来代际需求"，通常就是错的
- **"Technological pillar"不是三支柱之一**（PPT slide 47 样题确认）

Reference: PPT slide 23, slide 42, slide 47; Set 2 Q1.8, Set 4 Q1.3

---

## 可持续性的责任归属

PPT slide 25 有一个容易被忽略但可能出题的重要观点：

> It is not right to shift all the responsibility to the end-user. Manufacturing companies and their designers have to take the most responsibility for the environmental effects of their products and work actively on designing more sustainable products.

核心意思：**不能把环保责任全推给消费者（end-user）。制造企业和设计师应承担最大责任。** 消费者可以通过选择负责任的产品来产生影响，但主要责任在企业端。

这和 DFM 早期介入的逻辑一致——设计阶段做决策的人（设计师、企业）才是影响最大的，所以他们要负最大的责任。

---

## 设计阶段对可持续性的重要性

PPT slide 26 指出了一个关键事实：

> The design stage is the most influential in determining how a product will affect the environment through its raw materials, manufacture, distribution, usage, maintenance and disposal.
>
> Sustainable Product Policy by the European Commission states that as much as **80% of a product's negative impact on the environment is finalized at the design stage.**

这个数字很重要。80% 的环境负面影响在设计阶段就"定型"了——选什么材料、用几个零件、包装多大、运输多远，这些在画图纸时就锁死了。到了生产阶段再想改，已经来不及了。

这个概念和前面 "70%-80% of production costs are determined by design decisions" 形成呼应：设计阶段既锁定了成本，也锁定了环境影响。这正是为什么 DFM 和 DFS 都强调在设计阶段尽早介入。

---

## DFS 与 DFX 的关系

PPT 明确指出：

> DFS (Design for Sustainability), also known as D4S, is a subset methodology under the DFX family (Design for Excellence) with its main focus on developing sustainable products.

DFX 家族有很多成员——DFM（面向制造）、DFA（面向装配）、DFQ（面向质量）等等，DFS 只是其中之一，专门关注可持续性。

**所有可持续策略围绕两个核心目标：**

1. **Use fewer resources**（使用更少资源）——原材料、能源、水、包装等等
2. **Prefer eco-friendly alternatives**（优先选择环保替代方案）——从材料选择到能源供应到商业模式

这两个目标贯穿后面所有 sustainable design principles。

Reference: PPT slide 24

---

## Actionable Sustainable Design Principles（7 项原则）

PPT slide 31 明确列出 7 项 actionable sustainable design principles。考试常考"以下哪个是/不是可持续设计原则"——记住这 7 个，排除法搞定。

### 完整列表与解释

| # | 原则 | 含义 | 举例 |
|---|------|------|------|
| 1 | **Dematerialization** | 减少产品的材料和能源总用量，降低环境影响。实现方式之一是产品小型化——更小的产品意味着更少的包装、更小的仓储面积、更低的运输成本和碳排放 | 把台式机芯片缩小做成笔记本芯片，整机体积缩小，包装/运输/存储全线节约 |
| 2 | **Modular design** | 使用可作为模块跨产品复用的组件。模块是预制的、有特定功能的组件。好处：更便宜的制造、装配、替换、维修和报废处理 | 手机的摄像头模块可以在不同型号间通用，坏了单独换模块而不是换整块主板 |
| 3 | **Prefer renewable energy** | 更多地依赖可再生能源（风能、太阳能、水电），替代化石燃料（汽油、柴油、天然气、煤），在维持相近能源使用水平的同时推动可持续发展 | 工厂屋顶装太阳能板，白天生产用电自给自足，减少对电网火电的依赖 |
| 4 | **Migration to product-service systems** | 企业不卖产品卖服务——把产品租给消费者而不是一次性卖掉。厂商保留产品所有权后，产品寿命越长、维护越方便，厂商利润就越高——这从根本上把厂商利益和可持续目标对齐了。PPT 举的例子：IBM 从卖服务器转向租服务器/云服务 | 不卖打印机而是卖打印服务（按张收费），厂商有动力造出更耐用、更省墨、更好修的打印机 |
| 5 | **Design for longevity** | 通过设计最大化产品的使用寿命。耐用的产品能显著减轻环境压力——因为减少了制造新产品所需的原材料和能源 | 智能手机平均换机周期从 2013 年的 26 个月增长到 2020 年的 29 个月，但设计目标应该拉得更长 |
| 6 | **Limit or eliminate long-distance outsourcing** | 远程外包虽然人工成本低，但洲际运输带来大量额外碳排放。同样的制造资源消耗，却多了几吨的运输排放。优先选择本地供应商，既降低环境影响又支持本地产业 | 某电子产品的零件可以在本地工厂加工，没必要运到另一个大陆的低成本工厂再运回来 |
| 7 | **Invest in simulation** | 传统设计需要大量试错循环来找到最优方案，用仿真软件可以在几小时内完成这些循环，节省原材料、时间和能源成本（电费、水费等）。同时减少量产时的不合格品率，既可持续又有利可图 | 用有限元分析软件模拟注塑过程中的应力分布，避免开模后才发现设计有问题 |

### 高频错项辨析

**"Design for a shorter period of usage"** → 这不是可持续设计原则。

PPT slide 41 样题和 Set 1 Q1.2, Set 6 Q1.2 均确认 D 选项是错项。解释：sustainability 强调更长寿命（对应 PPT 中的 **Design for longevity** 原则）、可维护、可复用，故意缩短使用周期与该原则直接矛盾，是常见错误干扰项。如果设计目标是让产品更快坏掉、让消费者更频繁购买，这恰恰是 linear economy 的思路，与可持续设计背道而驰。

Reference: PPT slide 31, slide 41; Set 1 Q1.2, Set 3 Q1.11, Set 6 Q1.2

---

## 4Rs（循环经济工具）

PPT slide 30 明确定义 4Rs 为：

### 4Rs 速记表

| R | 定义 | 制造场景举例 | 样题匹配规则 |
|---|------|------------|------------|
| **Reduce** | 减少资源使用量——从源头减少材料、能源的消耗 | 产品小型化、轻量化设计，用更少的材料达到相同功能 | 减少材料用量 → Reduce |
| **Reuse** | 让零件/产品在其他场景中继续使用，延长其生命周期 | 拆解旧手机，把摄像头模块用到新产品中 | 零件可在其他设备继续使用 → Reuse |
| **Repair** | 产品或零件损坏后，通过修复恢复功能，继续使用 | 手机屏幕碎了换屏幕而不是换手机，笔记本电池衰减了换电池而不是换电脑 | 产品/零件损坏后修复继续使用 → Repair |
| **Recycle** | 将废弃材料回收，经过再处理变成新的原材料 | 把废旧铝罐熔化重铸成新的铝制品，塑料瓶回收后做成再生塑料颗粒 | 材料能回收再处理 → Recycle |

**关键纠正**：课程的 4Rs 是 Reduce / Reuse / **Repair** / Recycle，不是 Reduce / Reuse / **Recover** / Recycle。Recover 不在课程 4Rs 中。这是一道常见陷阱题（PPT slide 45 样题中，E 选项 "Replace" 也不是 4Rs 之一——答案是 E）。

### 4Rs 练习题

**题目**：请判断以下场景分别属于哪个 R。

1. 某汽车公司将报废车辆的发动机拆下来，经翻新后安装到二手车上继续使用。
2. 一家家具厂将产品包装从双层瓦楞纸箱改为单层，每年减少纸板用量 30%。
3. 笔记本电脑的电池寿命到了，用户在授权维修点更换新电池继续使用。
4. 废旧电路板上的金、银、铜等贵金属被提取出来，用于制造新的电子产品。

**答案与解析**：

1. **Repair（修复）**。发动机已经报废不能用，经翻新（修复）后恢复功能继续使用。注意：如果发动机本身是好的、只是从旧车上拆下来直接装到另一辆车上，那就是 Reuse。关键区分点是零件状态——损坏后修复 = Repair，完好直接再用 = Reuse。
2. **Reduce（减少）**。从源头减少材料用量，是 Reduce 的典型场景。
3. **Repair（修复）**。电池衰减属于产品损坏/功能下降，通过更换部件恢复功能 = Repair。注意不是 Reuse（电池没有被用于其他设备）。
4. **Recycle（回收）**。废弃电子产品中的贵金属被提取再处理，变成新产品的原材料 = Recycle。

Reference: PPT slide 30, slide 45

---

## Precautionary approach

此概念在 PPT 正文中未单独讲解，主要通过样题 Set 1 Q1.8 考察。以下基于样题题目进行分析。

### 核心逻辑

当产品潜在影响不确定（uncertain）、但可能造成严重伤害（potential serious harm）时，应采取预防措施——不等到确凿证据出来才行动。

### 判断公式

看到 **"uncertain risk" + "potential harm"** → 选 precautionary / preventive action。

### 场景理解

举个具体例子帮你理解这个概念：

**适用场景**：某新型塑料添加剂的长期健康影响还没有充分研究数据，但已有少量动物实验显示可能致癌。此时虽然没证据证明对人有害（uncertain），但潜在伤害严重（potential serious harm，致癌）——应该采取预防措施，先不使用或限制使用该添加剂，不等到大规模人群流行病学数据出来才行动。

**不适用场景**：某工业溶剂的毒性已经很清楚，有明确的安全暴露限值（比如低于 100ppm 对工人无害）。这不是"不确定"的风险，而是已知且可管理的风险——按标准操作规程使用防护设备即可，不需要 precautionary approach。

### Precautionary approach 练习题

**题目 1**（判断题）：以下哪种情况最应该采用 precautionary approach？

A. 某化学品的毒性已有完整的动物实验数据和明确的安全限值。
B. 某新型纳米材料在空气中可能被人体吸入，长期健康影响目前数据不足，但动物实验提示可能引发肺部炎症。
C. 某工厂的噪音水平超标，工人佩戴耳塞后可降至安全水平。
D. 某电子产品的电磁辐射已被证实低于国际安全标准。

**答案**：B。关键词是"长期健康影响目前数据不足"（uncertain）+"可能引发肺部炎症"（potential harm），符合 precautionary approach 的判断公式。A、C、D 都是已知风险且有明确的管理手段。

**题目 2**（选择题，改编自 Set 1 Q1.8 风格）：一家公司正在开发使用新型电池技术的产品。开发过程中，某权威科学期刊报道该电池技术可能存在健康风险（如果发生泄漏），但尚无可靠数据。作为项目工程师，你应该怎么做？

A. 告诉老板没有可靠数据，按原计划继续推进。
B. 建议老板虽然没有可靠数据，但应采用 precautionary approach，在电池周围安装额外保护措施和泄漏监测系统。
C. 立即停止项目，威胁要向卫生部门举报老板。
D. 建议取消使用该电池技术的产品。
E. 去贿赂论文作者撤稿。

**答案**：B。核心逻辑：uncertain data + potential serious harm → precautionary approach（采取预防措施但不终止项目）。A 错在忽视潜在风险；C 和 D 过度反应；E 无关。

**题目 3**（判断题）："没有证据证明有害"等于"不存在风险"。这个说法对吗？

**答案**：错。这正是 precautionary approach 要纠正的思维。没有证据证明有害 ≠ 不存在风险，特别是当潜在伤害严重且研究数据不充分时，应主动采取预防措施。

Reference: Set 1 Q1.8

---

## DFM + Sustainability 联合题

这类题经常把 DFM 与 sustainability 结合问，分三步走：

### 三步答题框架

**第一步：DFM 角度**

看 part count、assembly complexity、manufacturing steps、standardization、cost / time / quality impact。

**第二步：sustainability 角度**

看 material use、product size / weight、energy / transport implications、reusability、end-of-life handling。

**第三步：挂到 4Rs**

例如：one reusable part → Reuse；integrated smaller design → Reduce；damaged component repairable → Repair。

### 完整例题演示

以下综合样题风格，展示从读题到作答的完整思路。

> **题目**：Design A uses 12 separate plastic components that are assembled with screws. Design B uses a single injection-molded component that replaces all 12 parts. Compare both designs from DFM and sustainability perspectives.

**Step 1：读题，提取关键信息**

- Design A：12 个独立塑料零件 + 螺丝装配
- Design B：1 个注塑件取代全部 12 个零件
- 要求：从 DFM 和 sustainability 两个角度比较

**Step 2：DFM 角度逐条分析**

- Part count：A = 12 + screws，B = 1 → B 的 Simplicity 原则优势明显
- Assembly complexity：A 需多次装配操作，B 无需装配 → B 工时短、出错率低
- Manufacturing steps：A 需分别制造 12 个零件再组装，B 一次注塑成型 → B 工序少
- Cost：A 的单件成本包含 12 个零件的制造 + 装配人工；B 的模具成本高但量产后单件成本低
- Quality：A 的装配一致性受人为因素影响；B 的注塑件一致性更好

**Step 3：Sustainability 角度分析**

- Material use：B 消除螺丝和连接件，总材料用量更少 → Reduce
- Product size/weight：一体化设计通常更紧凑，包装和运输更省 → Reduce
- Reusability：A 的个别零件可能在其他产品中复用 → Reuse（这是 A 的优势）
- Repairability：A 可以单独更换损坏零件 → Repair（A 的优势）；B 坏了可能要整体更换

**Step 4：组织答案**

> From a DFM perspective, Design B is preferred. It drastically reduces part count from 12 plus fasteners to a single component, aligning with the Simplicity principle. Assembly is eliminated, reducing labour time and the risk of assembly errors. Manufacturing is simplified to a single injection-molding step, lowering per-unit cost at scale.
>
> From a sustainability standpoint, Design B reduces total material consumption (no screws or extra fasteners), supports a more compact form factor requiring less packaging and transportation, and aligns with the **Reduce** principle. However, Design A offers potential advantages in **Reuse** (individual parts may be repurposed in other products) and **Repair** (damaged components can be replaced individually without discarding the entire unit).
>
> In conclusion, for high-volume production, Design B is superior on both DFM and sustainability grounds regarding material efficiency. Design A's modularity may be preferable in applications where longevity and reparability are prioritized over manufacturing efficiency.

**常见错误提醒**：

- 只谈 DFM 不谈 sustainability（或反过来）——联合题必须两个角度都覆盖
- 把 Repair 和 Reuse 搞混——损坏后修复 = Repair，完好零件再用 = Reuse
- 忽略 Design A 的优势——联合题通常需要辩证分析，不能一边倒

---

## 高频判断速记

### 一看就该选的

- DFM should begin in the early design stage → 对 (Set 1 Q1.1, Set 3 Q1.10, Set 6 Q1.1)
- DFM aims to reduce manufacturing complexity and total production cost → 对 (Set 4 Q1.1)
- 70%-80% of production costs are determined by design decisions → 对 (PPT slide 9)
- Product development has the biggest impact on final price, quality, and manufacturing time → 对 (Set 5 Q1.9)
- Sustainability balances economic, environmental, and social pillars → 对 (PPT slide 42, Set 4 Q1.3)
- uncertain risk + potential harm → precautionary approach → 对 (Set 1 Q1.8)
- 4Rs = Reduce, Reuse, Repair, Recycle → 对 (PPT slide 30)
- DFS is a subset of DFX family → 对 (PPT slide 24)
- 80% of a product's negative environmental impact is finalized at the design stage → 对 (PPT slide 26, European Commission Sustainable Product Policy)
- Manufacturing companies and their designers bear the most responsibility for sustainability → 对 (PPT slide 25)

### 一看就该警惕的错项

- DFM is best applied after production starts → 错
- DFM may impose higher manufacturing costs → 错（PPT slide 43 样题 D 选项确认，DFM 的核心目标就是降低制造成本）
- DFM 会增加制造复杂度 → 错（DFM 的目标是降低复杂度）
- Sustainability means focusing only on environmental care → 错（三个支柱缺一不可）
- Designing for shorter usage is a good sustainability principle → 错（违背 Design for longevity，Set 1 Q1.2 和 Set 6 Q1.2 确认）
- 没证据有害就可以完全忽略 → 错（precautionary approach 的核心反驳点）
- "Recover" 是 4Rs 之一 → 错（4Rs 是 Reduce / Reuse / Repair / Recycle）
- "Replace" 是 4Rs 之一 → 错（PPT slide 45 样题确认）
- "Technological pillar" 是三支柱之一 → 错（PPT slide 47 样题确认）
- "Advertising Strategy" 是 DFM 原则 → 错（PPT slide 44 样题确认）
- "Resource efficiency" 是 PPT 列出的 7 项 actionable principles 之一 → 错（不在 PPT 的 7 项列表中；Resource efficiency 常与 Dematerialization 混淆——Dematerialization 强调的是减少产品的材料和能源总 throughput，而 Resource efficiency 是一个更宽泛的非特指概念。此项为延伸辨析，非样题原题。）
