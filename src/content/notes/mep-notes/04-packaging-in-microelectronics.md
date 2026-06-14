---
title: "第4章 Packaging in Microelectronics"
description: "微电子系统中封装对性能、成本、可靠性和 SoC/SiP 的影响。"
date: 2026-06-11
tags: [microelectronics-packaging, microelectronics]
category: "课程学习"
docGroup: "microelectronics-packaging-notes"
order: 4
draft: false
---
## 考试要会什么

本章对应 Lecture 4。常见问法：

- What is the role of packaging in microelectronics?
- Why does packaging control performance, reliability and cost?
- Compare SoC and SiP.
- What challenges are faced by future IC packaging?

## 一句话记忆

**IC 可以在芯片上很快，但真正产品的速度、成本和寿命常常被 package 限制。**

## 核心原理

Microelectronics package 的基本任务是让 IC 能在外部系统中工作。它必须：

- connect chip signals to board/system；
- deliver power and ground；
- remove heat；
- protect die from moisture, contamination and mechanical damage；
- provide mechanical connection and manufacturing compatibility。

> 高频表达：Every IC and device has to be packaged. The package can control performance, reliability and cost because it determines interconnect length, heat removal path, environmental protection and assembly yield.

## Why packaging becomes a bottleneck

| 压力来源 | 对 package 的影响 |
|---|---|
| More transistors | More I/O and power density |
| Higher speed | Shorter interconnects and lower parasitics needed |
| Lower cost bare die | Package cost becomes larger portion of product cost |
| Smaller products | Package footprint and height must decrease |
| Higher power | Thermal path must improve |
| Heterogeneous functions | Need SiP/chiplet/3D integration |

## SoC vs SiP

| 维度 | SoC | SiP |
|---|---|---|
| Integration | functions on one die | multiple dies/components in one package |
| Performance | usually better on-chip interconnect | slightly longer package interconnects |
| Design cost | high, custom design | lower if using known good dies |
| Time-to-market | longer | shorter |
| Flexibility | hard to modify | easier mix-and-match technologies |
| Process compatibility | one process must fit all functions | can combine CMOS, RF, MEMS, memory, passives |

## 题型模板

### 题型：Compare SoC and SiP

1. Define SoC and SiP。
2. SoC integrates system functions on a single die, giving high performance and short interconnects。
3. SiP integrates multiple chips/components in one package, supporting heterogeneous technologies。
4. SoC has high design and prototype cost; SiP has shorter development time and more flexibility。
5. Conclusion: SoC suits high-volume optimized products; SiP suits heterogeneous, fast-changing, lower-volume or mixed-technology systems。

## 易错点

- 不要把 SiP 只写成“性能差的 SoC”。SiP 的核心优势是 heterogeneity、flexibility 和 time-to-market。
- packaging challenge 不要只写 size，要同时写 I/O、thermal、cost、reliability。

## 本章概览

Lecture 4 讲的是 packaging 在 microelectronics 里的地位。核心结论：随着 IC 本身越来越强，package 不再只是配套外壳，而会决定最终 product 的 speed、power、cost、reliability 和 manufacturability。

### 零基础先览

- **IC package 必须存在**：裸片无法直接插到系统里。
- **Package controls performance**：互连越长，寄生越大，高速信号越难。
- **Package controls reliability**：失效往往发生在 solder、interface、underfill、substrate 等封装层面。
- **Package controls cost**：die 成本下降后，package/assembly/test 成本占比上升。
- **SoC/SiP 是系统集成路线选择**：不是谁绝对更高级，而是取决于性能、成本、周期和异构集成需求。

## Packaging controls performance

高性能 IC 的 transistor switching 很快，但 package interconnect 有 physical length、resistance、inductance、capacitance。Package 可能限制：

- maximum operating frequency；
- signal integrity；
- power integrity；
- heat removal；
- I/O bandwidth。

> 考试句：The on-chip silicon system may outperform the speed capability of the package, so package interconnects can become the system bottleneck.

## Packaging controls reliability

IC die 本身可能很可靠，但 final product 的失效常发生在：

- solder joint fatigue；
- wire bond failure；
- delamination；
- moisture corrosion；
- thermal overstress；
- substrate cracking。

因此 reliability 不是只由 semiconductor process 决定，也由 package materials、assembly process 和 operating environment 决定。

## Packaging controls cost

Bare silicon 的制造成本通过 volume production 和 wafer-level automation 不断下降，package 成本、assembly 成本、test 成本和 yield loss 在 total system cost 中变得更重要。高分答案要写：package engineering must resolve high performance and low cost simultaneously。

## SoC vs SiP 深度比较

### SoC 适合什么情况

- high-volume product；
- functions compatible with same process technology；
- performance and power are top priorities；
- development budget and time are acceptable。

### SiP 适合什么情况

- heterogeneous functions: CMOS + memory + RF + MEMS + passives；
- shorter time-to-market；
- reuse known good dies；
- lower design/prototype risk；
- product volume or complexity does not justify full custom SoC。

### 标准答案段落

> SoC integrates most system functions on a single die, giving short on-chip interconnects and potentially the best electrical performance and power efficiency. However, it requires high design cost, long development time and process compatibility among all functions. SiP integrates multiple dies or components in a single package, allowing heterogeneous technologies such as logic, memory, RF, MEMS and passives to be combined. It may have slightly longer interconnects than SoC, but it offers flexibility, shorter time-to-market and lower redesign risk.

## IC packaging challenges

| Challenge | Explanation |
|---|---|
| I/O density | more transistors require more external connections |
| Signal integrity | high speed signals are sensitive to parasitics |
| Power delivery | higher current density causes voltage drop/noise |
| Thermal management | more power in smaller area increases heat flux |
| Materials compatibility | CTE mismatch causes stress and fatigue |
| Cost/yield | advanced packaging improves performance but raises process complexity |

## Self-check

- [ ] SoC/SiP 是否按至少 4 个维度比较？
- [ ] 是否写出 package controls performance/reliability/cost？
- [ ] 是否把 microelectronics package 和 board/system 联系起来？
- [ ] 是否写出 future challenge，而不只是“更小更快”？

## Reference

- Lecture 4: role of packaging in microelectronics, SoC/SiP comparison, package challenges and roadmap。
- Practice/senior notes: SoC vs SiP 高频比较题。

## 来源说明

Slides-backed: Lecture 4。Exam-signal: 学长整理和 practice 中 SoC/SiP comparison 高频出现。
