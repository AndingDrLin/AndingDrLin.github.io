---
title: "第9章 Advanced Packaging Technology"
description: "Wire bonding、TAB、flip-chip、BGA、CSP、WLP 与 2D/3D 封装演进。"
date: 2026-06-11
tags: [microelectronics-packaging, advanced-packaging]
category: "课程学习"
docGroup: "microelectronics-packaging-notes"
order: 9
draft: false
---
## 考试要会什么

本章对应 Additional Lecture 9，并和 Lecture 3/8 重叠。重点是各种 interconnect / package technology 的比较。

## 一句话记忆

**Advanced packaging 的方向是：更短互连、更高 I/O、更小尺寸、更高集成，但代价是工艺、热和可靠性更难。**

![Assembly methods](./assets/assembly_methods.svg)

## Wire bonding

优点：

- low cost and mature infrastructure；
- flexible for design changes and repair；
- equipment and process widely available；
- reliable for many low- to mid-I/O packages。

缺点：

- point-to-point process is slower；
- long wires add inductance/capacitance and degrade high-speed performance；
- peripheral pads limit I/O density；
- wire sweep and bond failure can occur during molding。

## TAB

Tape automated bonding uses patterned metal leads on flexible polymer tape. 它适合 finer pitch 和自动化生产，但需要专门 tape/process，灵活性不如 wire bonding。

## Flip-chip

Flip-chip turns the die face-down and connects it to substrate using solder bumps.

优点：

- shorter interconnect and better high-frequency performance；
- area-array I/O enables higher pin count；
- better thermal path from backside；
- all bumps can be joined simultaneously。

挑战：

- bumping and substrate cost；
- alignment/reflow process control；
- underfill needed for reliability；
- solder fatigue and inspection difficulty。

## BGA / CSP / WLP / 3D

| 技术 | 核心特征 | 主要优势 | 主要挑战 |
|---|---|---|---|
| BGA | solder balls under package | high I/O, compact, good assembly yield | inspection, warpage, solder reliability |
| CSP | package close to chip size | small footprint | limited heat/I/O depending on design |
| WLP | package at wafer level | cost/time, small form factor | fine pitch, board routing, fatigue |
| 3D / TSV | vertical stacking | high density, short interconnect | thermal, yield, process complexity |
| FOWLP | fan-out redistribution beyond die | more I/O than fan-in WLP | warpage, process complexity |

## 题型模板

### 题型：Discuss wire bonding advantages and disadvantages

先写一句定义，然后从 cost、equipment、reliability、electrical performance、I/O density 五个维度展开。最后总结：wire bonding is mature and low-cost, but becomes less suitable for very high-density and high-speed packages.

### 题型：Why did packaging move from 2D to 3D?

1. 2D footprint and interconnect length limit integration and speed。
2. 3D stacking increases density and shortens connections。
3. TSV/interposer/chiplets enable heterogeneous integration。
4. Main challenges are heat removal, yield, reliability and cost。

## 易错点

- Wire bonding 缺点里一定要写 electrical performance 或 I/O limitation。
- Flip-chip 的优势不只是“小”，还包括 short interconnect 和 area-array I/O。
- 3D packaging 不能只写“堆叠”，还要写 thermal/yield challenge。

## 本章概览

Additional Lecture 9 把很多封装技术放在一起：wire bonding、TAB、flip-chip、BGA、CSP、WLP、2D/3D packaging。考试最可能不是让你背全部工艺步骤，而是让你比较它们为什么出现、解决什么问题、又带来什么挑战。

### 零基础先览

- **Wire bonding**：便宜成熟，但 wire 长、I/O 受限。
- **TAB**：用 metallized flexible tape 做自动化 fine-pitch interconnect。
- **Flip-chip**：用 bump 直接连接 die 和 substrate，短互连、高 I/O。
- **BGA**：底部 solder balls，area-array I/O。
- **CSP/WLP**：尺寸和流程更接近 chip/wafer level。
- **3D packaging**：垂直堆叠提高密度，但热和测试更难。

## Chip connection methods

### Wire bonding

Wire bonding 是 point-to-point interconnection。它的最大优势是成熟、低成本、灵活、设备普及。缺点也来自 point-to-point 和 long wire：速度慢、寄生参数大、I/O pitch 受限、overmolding 时可能 wire sweep。

### TAB

TAB uses etched copper leads on polymer tape. 它适合 fine-pitch 和自动化，但需要 tape design 和 specialized bonding process，灵活性和通用性不如 wire bonding。

### Flip-chip

Flip-chip 把 die 翻转，active side 朝向 substrate，通过 solder bumps 连接。它消除了长 wire，实现 area-array I/O，降低 resistance/inductance/capacitance，改善高速性能和热路径。但它需要 bumping、精密 alignment、reflow、underfill 和更复杂的 substrate。

## Complete comparison answer

> Wire bonding is a mature and low-cost chip-to-package interconnection technology. It is flexible and supported by a large manufacturing infrastructure, but each wire is bonded point by point, so the process is slower and the long wires introduce parasitic inductance and capacitance. TAB improves automation and fine-pitch capability by using patterned copper leads on flexible polymer tape, but it needs special tape and bonding equipment. Flip-chip uses solder bumps to connect the die directly to the substrate, giving shorter interconnects, higher I/O density and better electrical/thermal performance, but it requires wafer bumping, precise alignment, underfill and more expensive substrates.

## BGA / CSP / WLP 关系

BGA 和 CSP 更多描述 package structure / size；WLP 描述 fabrication stage。BGA 可用于高 I/O；CSP 强调 package footprint 接近 die；WLP 强调 wafer-level process。

## 2D 到 3D 的动因

传统 2D packaging 的限制：

- footprint grows with number of dies；
- interconnect length increases；
- signal delay and power increase；
- I/O density reaches board/package limits。

3D packaging 的优势：

- vertical integration saves area；
- shorter interconnect improves bandwidth/power；
- heterogeneous dies can be stacked/integrated；
- chiplets can improve yield and design flexibility。

3D packaging 的挑战：

- heat trapped inside stack；
- TSV/interposer process cost；
- test and known-good-die issue；
- stress and warpage；
- yield loss from multi-die assembly。

## 题型：Estimate WLP cost/time saving

如果题目给 wafer size、die size、I/O count，但没有明确成本模型，通常不是要求精确商业报价，而是让你说明逻辑：

1. WLP processes all dies in parallel on wafer。
2. It avoids individual wire bonding for each I/O。
3. Higher throughput reduces time per die。
4. Smaller form factor reduces material and handling。
5. But fine-pitch reliability and board routing may offset part of savings。

## Self-check

- [ ] 比较题是否至少覆盖 cost、equipment、reliability、electrical performance？
- [ ] Flip-chip 是否写 underfill 和 solder fatigue？
- [ ] 3D packaging 是否写 thermal/yield/test challenge？
- [ ] WLP 是否写 wafer-level process，而不是只写小尺寸？

## Reference

- Additional Lecture 9: chip connection, BGA/CSP/WLP, 2D/3D packaging。
- Lecture 3: assembly methods and failure modes。
- Practice questions: wire bonding/TAB/flip-chip comparison, WLP cost/time saving。

## 来源说明

Slides-backed: Additional Lecture 9, Lecture 3, Lecture 8。Slides + Exam-backed: practice questions 中 wire bonding/TAB/flip-chip 与 WLP 反复出现。
