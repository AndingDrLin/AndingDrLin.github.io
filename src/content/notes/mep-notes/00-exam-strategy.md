---
title: "第0章 考试地图与复习策略"
description: "微电子封装考试高频题型、复习优先级和答题顺序。"
date: 2026-06-11
tags: [microelectronics-packaging, exam-revision]
category: "课程学习"
docGroup: "microelectronics-packaging-notes"
order: 0
draft: false
---
## 考试要会什么

这门课的考试更像 **概念解释 + 比较题 + 机制题 + 少量热管理计算**，不是大量推导。最稳定的高频模块是：

1. **Packaging fundamentals**：封装的功能、分类、technology waves、Moore's Law for packaging。
2. **Electrical package design**：signal path、power/ground path、parasitic R/L/C、frequency challenge、DFR/DFT。
3. **Materials and reliability**：underfill、mold、solder、TIM、substrate、CTE mismatch、moisture、delamination、solder fatigue。
4. **Assembly and interconnect**：wire bonding、TAB、flip-chip、BGA、CSP、WLP 的比较。
5. **Microelectronics / microsystems**：SoC vs SiP、MEMS packaging、系统级封装的作用。
6. **Si processing impact**：low-k ILD、die thinning、TSV、interposer、3D integration。
7. **Thermal management**：thermal resistance、conduction、convection、radiation、cooling methods。

## 一句话记忆

**封装不是“外壳”，而是把裸芯片变成可靠系统的电、热、机械、材料和制造折中。**

## 做题总顺序

1. **先给定义**：先写一句清晰定义，避免一上来堆例子。
2. **再写作用**：从 electrical / thermal / mechanical / environmental / reliability / cost 中选 2-4 个维度。
3. **解释机制**：为什么会改善或失效，例如 CTE mismatch 如何导致 solder fatigue。
4. **补例子**：wire bonding、flip-chip、BGA、WLP、SiP、MEMS 等。
5. **写 limitation**：比较题一定要写缺点或 challenge。

## 高频题型地图

| 题型 | 典型问法 | 快速答题框架 |
|---|---|---|
| Explain | Explain CTE / DFT / WLP / MEMS packaging | definition → importance → mechanism → example |
| Discuss | Discuss future developments in packaging | trend → benefit → challenge → material/thermal issue |
| Compare | Compare SoC and SiP / CSP and WLP / wire bonding and flip-chip | 先列维度，再逐项比较 |
| Trace development | Trace packaging technology waves | 每代：代表技术 + 优势 + drawback |
| Explain with figures | Explain package hierarchy / heat path / CTE mismatch | 画简图，标注 signal/power/heat/stress |
| Calculation | board heat dissipation / convection / radiation | 写公式、单位、代入、结论 |

## 必背优先级

### P0：一定会用到

- package 六个核心功能：signal distribution、power distribution、heat dissipation、mechanical support/protection、environmental isolation、reliability/cost control。
- technology waves：through-hole、SMT、BGA/CSP/flip-chip、2.5D/3D/SiP/FOWLP。
- wire bonding / TAB / flip-chip 的优缺点。
- CTE mismatch 的失效链：thermal cycling → differential expansion → solder shear → fatigue/delamination/crack。
- thermal formulas：$R_\theta=\Delta T/P$、$Q=kA\Delta T/L$、$Q=hA(T_s-T_f)$。
- SoC vs SiP：performance/cost/flexibility/time-to-market。

### P1：高分区分点

- low-k ILD 为什么降低 capacitance 但增加 packaging fragility。
- die thinning 为什么降低高度和热阻但增加 handling/stress challenge。
- interposer / TSV / 3D integration 的作用和挑战。
- MEMS packaging 为什么比普通 IC 更复杂。
- WLP 为什么成本/时间优势明显，同时 I/O pitch 和可靠性受限。

## 零基础先览

如果完全没学过这门课，不要先背缩写。先抓住一个主线：**芯片本身只提供功能，封装让这个功能能够被系统使用。** 所有章节都围绕同一个矛盾展开：芯片越来越小、越来越快、越来越热、I/O 越来越多，但产品还要求更便宜、更可靠、更容易制造。

把封装问题拆成五个维度最稳：

| 维度 | 这门课怎么考 | 典型关键词 |
|---|---|---|
| Electrical | 信号和电源怎么走，为什么高频难 | signal path, power distribution, parasitics, crosstalk |
| Thermal | 热怎么从 die 传到 ambient | thermal resistance, conduction, convection, radiation |
| Mechanical | CTE mismatch、stress、shock 怎么导致失效 | solder fatigue, warpage, delamination |
| Materials | 什么材料承担什么功能 | underfill, mold compound, solder, TIM, substrate |
| Manufacturing / Cost | 为什么某种封装更适合量产 | WLP, flip-chip, wire bonding, yield, process |

## 学习路线

1. **先学第1章**：知道 package 的功能和 technology waves。否则后面 wire bonding、WLP、SiP 都是散词。
2. **再学第2章和第3章**：一个讲 electrical/reliability，一个讲 materials/CTE，是解释题的基本语言。
3. **接着学第7章**：thermal management 是唯一比较稳定可能计算的部分。
4. **再学第8-9章**：SoC/SiP/WLP/flip-chip/BGA 是比较题核心。
5. **最后背第10-11章**：把所有知识压成 answer templates 和 common mistakes。

## 高频题型拆解

### 1. Explain concept

题干常出现 `Explain`, `What is`, `Why is ... important`。这类题不要写成单句定义，要写四层：

1. 定义：它是什么。
2. 作用：它解决什么 package problem。
3. 机制：为什么能解决或为什么会失效。
4. 例子/限制：给一个封装技术或 failure mode。

例：问 CTE，不要只写 coefficient of thermal expansion；要接着写 thermal cycling → different expansion → solder shear → fatigue/delamination。

### 2. Compare technologies

题干常出现 `Compare`, `difference`, `advantages and disadvantages`。固定五维：

- structure / process；
- electrical performance；
- cost and equipment；
- reliability / thermal / mechanical；
- suitable application。

只写 “A is smaller than B” 通常不够。高分答案一定有 trade-off。

### 3. Discuss future development

这类题常考 technology waves、future trends、materials and technique challenges。答案要有“趋势 + 原因 + 挑战”：

- 3D / TSV / chiplet / heterogeneous integration：提高密度、缩短互连。
- Fan-out / WLP：减小尺寸、降低处理时间。
- Advanced thermal materials/cooling：解决高 power density。
- Challenge：thermal, reliability, yield, cost, CTE mismatch, fine-pitch routing。

## 一页背诵版

考试前如果只剩 10 分钟，背下面这几句：

> Packaging provides signal distribution, power distribution, heat dissipation, mechanical support, environmental protection and reliability control.

> High-frequency package design is difficult because interconnect parasitics become significant, causing delay, reflection, crosstalk and power/ground noise.

> CTE mismatch during thermal cycling causes differential expansion, generating shear stress in solder joints and interfaces, leading to fatigue, delamination and cracks.

> Wire bonding is low-cost and mature but has long interconnects and limited I/O density; flip-chip gives shorter interconnects and higher I/O density but needs bumping, substrate control and underfill.

> SoC integrates functions on one die for high performance but high design cost; SiP integrates multiple dies/components in one package for heterogeneity, flexibility and shorter time-to-market.

> WLP reduces cost and size by processing packages at wafer level, but fine pitch, I/O limit, board routing and solder fatigue are key challenges.

## Working marks 写法

封装课虽然不像电力电子那样大量计算，但也有 working marks。长题建议按下面格式写：

```text
Definition:
Mechanism:
Advantages:
Limitations / challenges:
Example:
Conclusion:
```

如果题目要求 “with figures if necessary”，至少画一个方块图，并标注 signal / heat / stress / interconnect，不要画没有文字标签的装饰图。

## 高频错项陷阱

| 错项 | 为什么错 |
|---|---|
| Packaging only protects the IC | 保护只是功能之一，封装还负责 signal, power, heat, mechanical, reliability |
| WLP and CSP are the same | CSP 是尺寸接近 chip 的 package type，WLP 是 wafer-level process |
| SiP is always worse than SoC | SiP 在 heterogeneity、time-to-market、flexibility 上有优势 |
| Low-k ILD is only beneficial | 它降低 capacitance，但机械脆弱性和 reliability challenge 增加 |
| Thermal management only prevents overheating | 它还影响 lifetime, material failure, solder fatigue and reliability |

## 来源说明

本章由 `Source_Inventory.md`、`Exam_Point_Map.md` 和 practice/exam 资料综合整理。主线定义来自 Lecture 1-9；考试优先级来自 practice questions、Exam paper 2022、考前资料与学长笔记。
