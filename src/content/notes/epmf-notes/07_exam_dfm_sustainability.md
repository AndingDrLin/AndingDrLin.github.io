---
title: "第7章 考试专题：DFM、可持续设计与质量损失"
description: "DFM 六原则辨析、Design A/B 比较答题模板、可持续设计原则、4Rs、Taguchi loss 计算专题。"
date: 2026-06-11
tags:
  - exam-revision
  - dfm
  - sustainability
  - taguchi
category: "课程学习"
docGroup: "epmf-final-exam-revision-notes"
order: 7
draft: false
---

## 本章定位

这章专门针对 DFM、可持续设计、Taguchi loss 在考试中的出题方式。面向已经看过第 1 章和第 2 章基础笔记但需要做题训练的同学。Taguchi loss 几乎每年都有计算题（2022 Q14、2023 Q24/Q34/Q49、2024 Q8、2025 Q4(i)），DFM 每年都有 MCQ。

---

## DFM 六原则速记卡片

**口诀：S-S-T-M-A-P**

| 字母 | 原则 | 一句话解释 | 常见错项伪装 |
|:---:|------|----------|-------------|
| S | **Simplicity** | 设计越简单越好，减少零件数量和装配步骤 | "增加零件多样性" ✗ |
| S | **Standardization** | 用标准件、通用件，减少定制件 | "使用专用零件提高性能" ✗ |
| T | **Tolerance** | 公差合理放宽（不是越紧越好），表面粗糙度合理即可 | "公差越紧越好" ✗（2023 Q48 反过来考了"越紧越好"是正确的） |
| M | **Material Selection** | 选易加工、低成本、合适的材料 | "选最贵的材料" ✗ |
| A | **Automation** | 能自动化的步骤就自动化 | — |
| P | **Process Integration** | 合并工序，减少加工步骤 | — |

**排除法做题技巧**：选项里出现 "versatility and customization"（多样化定制）、"shorter period of usage"（缩短使用寿命）这类反向表述 → 大概率是错项。

---

## DFM 真题考法分析

### 2023 年真题 Q17/Q33/Q48

三套卷子考的都是同一类题："Product DFM includes all the following EXCEPT"

**Q17 错项**：C — "The tolerances should be as loose as possible, and the surface finish should be as rough as possible."
→ 陷阱在于"as loose as possible"和"as rough as possible"走了极端。DFM 原则说的是公差**合理**放宽，不是**越松越好**。

**Q33 错项**：A — "Design for product versatility and customization."
→ 这不是 DFM 的目标。DFM 追求的是标准化和简化，不是多样化定制。

**Q48 错项**：C — "The tolerances should be as tight as possible, and the surface finish should be as smooth as possible."
→ 这次反过来考。公差不是越紧越好，够用就行。

### 2024 年真题 Q10

DFM 原则识别题。六选四正确项。核心还是 SSTMAP 六条。

### 2025 年真题 Q1(i)

DFM 优势列举题。答题要点：
- Reduce manufacturing complexity
- Lower production cost
- Improve product quality
- Shorter time to market
- Easier assembly

---

## Design A vs Design B 答题模板

这类题在样题 Set 1 Q2(a) 中出现，要求从 DFM 和 Sustainability 两个角度比较两个设计。

### 四步答题框架

**Step 1 — DFM 角度**

> From a DFM perspective, Design X is superior because:
> - Fewer parts → reduced assembly time and cost
> - Simpler geometry → easier to manufacture
> - Standardized components → lower inventory and procurement cost
> - Fewer assembly steps → lower risk of assembly errors

**Step 2 — Sustainability 角度**

> From a sustainability perspective, Design X also performs better:
> - Less material waste during production (Dematerialization)
> - Modular design enables easier repair and upgrade (Design for longevity)
> - Fewer parts mean lower environmental impact from sourcing (Limit long-distance outsourcing)

**Step 3 — 4Rs 关联**

> In terms of the 4Rs:
> - **Reduce**: Design X uses fewer raw materials
> - **Reuse**: Modular components can be reused in other products
> - **Repair**: Fewer integrated parts make repair easier
> - **Recycle**: Single-material design is easier to recycle

**Step 4 — 结论**

> Therefore, Design X is the recommended choice as it satisfies both DFM principles and sustainable design objectives.

### Self-check 列表

写完答案后检查：
- [ ] 是否提到了具体的 DFM 原则（Simplicity, Standardization 等）
- [ ] 是否从 DFM 和 Sustainability 两个角度都分析了
- [ ] 是否解释了为什么某个设计更好，而不是只说"更好"
- [ ] 4Rs 四个都提到了吗？（Reduce/Reuse/Repair/Recycle，不是 Recover/Replace）

---

## 可持续设计 7 项原则速记

| 原则 | 一句话解释 | 排除法错项 |
|------|----------|-----------|
| **Dematerialization** | 减少材料用量 | — |
| **Modular design** | 模块化设计，方便维修/升级 | — |
| **Prefer renewable energy** | 优先使用可再生能源 | — |
| **Migration to product-service systems** | 从卖产品转向卖服务 | — |
| **Design for longevity** | 延长产品使用寿命 | **"Design for shorter usage"** ✗ ← 这是高频错项 |
| **Limit or eliminate long-distance outsourcing** | 减少远距离外包 | — |
| **Invest in simulation** | 用仿真减少实物试验 | — |

**高频错项**："Design for a shorter period of usage"（设计更短使用寿命）

这完全和 "Design for longevity" 相反。真题（样题 Set 1 Q1.2、Set 3 Q1.11）反复考这个错项。

**三大支柱**：Economic, Environmental, Social（不是 Technological）

---

## 4Rs 辨析专练

**4Rs 是哪四个？** Reduce, Reuse, Repair, Recycle

不是 Recover，不是 Replace，不是 Refuse。就这四个。

### 场景判断练习

**练习 1**：某手机公司把屏幕玻璃厚度从 1.2mm 减到 0.8mm，每台手机节省 15% 玻璃材料。
<details><summary>答案</summary>
**Reduce** — 减少了材料用量。
</details>

**练习 2**：某打印机公司设计了可拆卸墨盒，用户用完墨水后只需要加墨，不需要换整个墨盒。
<details><summary>答案</summary>
**Reuse** — 墨盒外壳被重复使用。
</details>

**练习 3**：某笔记本电脑采用模块化设计，内存和硬盘可以单独更换，不需要换整块主板。
<details><summary>答案</summary>
**Repair** — 方便维修和局部更换。
</details>

**练习 4**：某汽车制造商使用单一类型的塑料做内饰件，报废后可以直接粉碎重新造粒。
<details><summary>答案</summary>
**Recycle** — 单一材料方便回收再利用。
</details>

**练习 5**：某家电公司将产品包装从泡沫塑料改为蜂窝纸板。
<details><summary>答案</summary>
**Reduce**（减少了不可降解材料的使用）+ **Recycle**（纸板更容易回收）。这类题答主方向即可，Reduce 和 Recycle 都算对。
</details>

---

## Taguchi Loss 计算专练

### 核心公式

$$L(y) = k(y - m)^2$$

- $y$ = 实际测量值
- $m$ = 目标值（nominal value）
- $k$ = 损失系数
- $k$ 的求法：$k = A_0 / \Delta_0^2$，其中 $A_0$ = 超出公差时的维修费，$\Delta_0$ = 公差边界到目标值的距离

### 三种类型速记

| 类型 | 英文 | 适用场景 | 目标值 |
|------|------|----------|--------|
| 望目特性 | Nominal-the-best | 尺寸、电压等有明确目标值 | $m$ = 标称值 |
| 望小特性 | Smaller-the-better | 噪音、磨损、误差 | $m = 0$ |
| 望大特性 | Larger-the-better | 强度、寿命等 | 越大越好 |

**考试只考望目特性**（Nominal-the-best），就是 $L(y) = k(y - m)^2$ 这个公式。

### 真题风格练习题

---

**练习 1**（参考 2023 年真题 Q24）

一个机器零件的规格是 $1.50 \pm 0.02$ cm。如果零件超出公差，维修费是 \$15。

**(a)** 求损失系数 $k$。

**解**：

$$k = \frac{A_0}{\Delta_0^2} = \frac{15}{(0.02)^2} = \frac{15}{0.0004} = 37500$$

**(b)** 如果一个零件实际尺寸是 1.49 cm，求损失。

**解**：

$$L = k(y - m)^2 = 37500 \times (1.49 - 1.50)^2 = 37500 \times (-0.01)^2 = 37500 \times 0.0001 = \$3.75$$

---

**练习 2**（参考 2023 年真题 Q34）

一个零件的规格是 $2.50 \pm 0.01$ cm。超出公差的维修费是 \$10。

**(a)** 求 $k$。

**解**：

$$k = \frac{10}{(0.01)^2} = \frac{10}{0.0001} = 100000$$

**(b)** 实际尺寸 2.49 cm 的损失。

**解**：

$$L = 100000 \times (2.49 - 2.50)^2 = 100000 \times 0.0001 = \$10$$

---

**练习 3**（参考样题 Set 5 Q3(r)(vii) 风格 — 多数据点求总 loss）

一个电子产品的目标值 $m = 8.5$，$k = 1$。以下是 10 个观测值：

| 编号 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 |
|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
| 值 | 8.10 | 8.90 | 8.45 | 9.25 | 8.86 | 8.35 | 8.25 | 8.68 | 8.90 | 9.05 |

求总 loss。

**解**：

逐个计算 $L_i = k(y_i - 8.5)^2$：

| 编号 | $y_i$ | $y_i - 8.5$ | $(y_i - 8.5)^2$ |
|:---:|:---:|:---:|:---:|
| 1 | 8.10 | -0.40 | 0.1600 |
| 2 | 8.90 | 0.40 | 0.1600 |
| 3 | 8.45 | -0.05 | 0.0025 |
| 4 | 9.25 | 0.75 | 0.5625 |
| 5 | 8.86 | 0.36 | 0.1296 |
| 6 | 8.35 | -0.15 | 0.0225 |
| 7 | 8.25 | -0.25 | 0.0625 |
| 8 | 8.68 | 0.18 | 0.0324 |
| 9 | 8.90 | 0.40 | 0.1600 |
| 10 | 9.05 | 0.55 | 0.3025 |

$$\text{Total Loss} = \sum L_i = 1 \times (0.1600 + 0.1600 + 0.0025 + 0.5625 + 0.1296 + 0.0225 + 0.0625 + 0.0324 + 0.1600 + 0.3025) = 1.5945$$

---

**练习 4**（参考样题 Set 4 Q3(n)(iii) 风格 — 从大公差范围反推 $k$）

一个音响系统的电源输出电压目标值是 110V。如果输出电压超出 $110 \pm 20$ V 范围，音响有一半的概率故障，维修费 \$100。用 Taguchi 损失函数计算输出电压为 100V 时的平均损失。

**解**：

题目说"超出公差有一半概率故障，维修费 \$100"，所以平均维修费 = $100 \times 0.5 = \$50$。

$$k = \frac{A_0}{\Delta_0^2} = \frac{50}{(20)^2} = \frac{50}{400} = 0.125$$

$$L = 0.125 \times (100 - 110)^2 = 0.125 \times 100 = \$12.50$$

**易错点**：注意题目说"fails in half the situations"，所以 $A_0$ 不是 \$100，而是 \$50（期望值）。考试时仔细读题。

---

## P-Diagram Factor 分类练习

P-Diagram（Parameter Diagram）把影响因素分为三类：

| 类型 | 英文 | 含义 | 谁控制 |
|------|------|------|--------|
| 信号因子 | Signal | 输入/使用条件，用户可以调整 | 用户 |
| 控制因子 | Control | 设计参数，工程师可以调整 | 设计者 |
| 噪声因子 | Noise | 不可控的干扰因素 | 没人能控制 |

### 练习

**练习 1**：汽车发动机的点火正时
<details><summary>答案</summary>
**Control** — 工程师在设计时设定。
</details>

**练习 2**：室外温度对空调制冷效果的影响
<details><summary>答案</summary>
**Noise** — 无法控制。
</details>

**练习 3**：用户设置的目标温度
<details><summary>答案</summary>
**Signal** — 用户设定的输入信号。
</details>

**练习 4**：电路板焊接时的环境湿度
<details><summary>答案</summary>
**Noise** — 虽然可以一定程度控制，但在 P-Diagram 中通常归为噪声因子。
</details>

**2022 年真题 Q1.9 考法**："To improve the performance, the quality characteristic that is affected by ______ of factors are investigated using Taguchi method."
→ 答案是 (a) Controllable and uncontrollable factors。Taguchi 方法的核心就是同时研究控制因子和噪声因子。
