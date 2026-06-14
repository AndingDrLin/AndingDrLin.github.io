---
title: "第2章 Electrical Design and Reliability"
description: "电封装设计、信号/电源路径、寄生参数、DFR/DFT 与环境可靠性。"
date: 2026-06-11
tags: [microelectronics-packaging, electrical-design, reliability]
category: "课程学习"
docGroup: "microelectronics-packaging-notes"
order: 2
draft: false
---
## 考试要会什么

本章对应 Lecture 2。高频问题包括：

- What are the electrical functions of a package?
- Why does high frequency make package design difficult?
- What are DFR and DFT?
- What environmental factors affect package reliability?
- How does moisture degrade reliability?

## 一句话记忆

**Electrical package design 的目标是让 signal 和 power 走得稳：少 delay、少 noise、少 reflection、少 voltage drop。**

![Electrical package paths](./assets/electrical_package_paths.svg)

## 核心原理

Package electrical design defines the signal and power paths through the package so that the whole system meets performance requirements.

| 路径        | 功能                                       | 主要问题                                  |
| ----------- | ------------------------------------------ | ----------------------------------------- |
| Signal path | chip-to-chip / chip-to-board communication | delay, reflection, crosstalk, attenuation |
| Power path  | supply current to chips                    | IR drop, simultaneous switching noise     |
| Ground path | stable reference and return current        | ground bounce, EMI                        |

在低频时，interconnect 可以近似当成 wire；在高频尤其 GHz 量级，interconnect length 和 signal wavelength / edge rate 可比，package 中的 $R$、$L$、$C$ 就会造成 signal integrity 问题。

## 必背概念

### Parasitics

- Resistance：导致 voltage drop 和 power loss。
- Inductance：导致 switching noise、ground bounce 和 high-frequency impedance。
- Capacitance：导致 delay、coupling 和 crosstalk。

> 高频表达：At high frequency, package interconnects are not ideal wires. Their parasitic resistance, inductance and capacitance affect delay, reflection, crosstalk and power integrity.

### Design for Reliability (DFR)

DFR 是在设计早期主动考虑 failure mechanisms，而不是等封装做完以后才测试失败。它关注 thermal cycling、CTE mismatch、moisture、vibration、mechanical shock、corrosion 等。

### Design for Testability (DFT)

DFT 是在 circuit/package design 中加入便于测试的结构或策略，使 production testing 更快、更便宜、更可靠。DFT 的价值在于降低测试成本、提高 fault detection，避免大量返工。

## Environmental Reliability

| 因素                   | 可能后果                                 | 设计对策                                   |
| ---------------------- | ---------------------------------------- | ------------------------------------------ |
| Temperature extremes   | thermal stress, parameter drift          | material matching, thermal design          |
| Moisture / humidity    | corrosion, delamination, insulation drop | encapsulant, hermetic sealing, MSL control |
| Vibration / shock      | bond break, solder crack                 | mechanical support, robust interconnect    |
| UV / chemical exposure | material degradation                     | resistant materials/coatings               |
| EMI                    | signal error, noise coupling             | grounding, shielding, layout control       |

## 题型模板

### 题型：Explain moisture uptake in encapsulants

1. Moisture enters encapsulant or interfaces。
2. It can corrode leads/solder joints。
3. It weakens adhesion and causes delamination。
4. It lowers insulation resistance and may cause leakage/shorts。
5. Use moisture-resistant materials, sealing and MSL testing to mitigate。

### 题型：Why high-frequency package design is challenging

1. Interconnects become electrically long。
2. Parasitic $R/L/C$ cannot be ignored。
3. Signal reflections, crosstalk and delay increase。
4. Power/ground noise affects stable operation。
5. Future packages may integrate passive elements for termination and decoupling。

## 易错点

- DFR 不是“做完以后可靠性测试”，而是 upfront design activity。
- DFT 不是简单 final inspection，而是 design 中嵌入 test features。
- EMI、moisture、temperature 题要写 mechanism，不能只列名词。

## 本章概览

本章把 package 看成一个 electrical network。芯片之间的信号不是“理想导线”传输，电源也不是“理想电压源”直接送到 transistor。Package 中每一段 metal trace、via、lead、solder bump 都有寄生参数。

### 零基础先览

- **Signal path**：关心 signal delay、reflection、crosstalk。
- **Power path**：关心 voltage drop、ground bounce、simultaneous switching noise。
- **Ground path**：关心 return current 和 reference stability。
- **High frequency**：frequency 越高，interconnect 越不像理想导线。
- **DFR/DFT**：一个是提前设计可靠性，一个是提前设计可测试性。

## Electrical anatomy of package

Package electrical design 至少包含两件事：

1. 为信号提供合适路径：driver chip → package trace/via/bump → receiver chip。
2. 为电源和地提供低阻抗路径：supply/ground → package → die。

考试中如果问 electrical functions，可以按下面写：

> The electrical package provides communication paths for signals and distribution channels for power and ground. It must minimize parasitic resistance, capacitance and inductance so that signal delay, reflection, crosstalk and power noise remain within system requirements.

## Frequency challenge 详细解释

低频时，interconnect 的 physical length 相对于 signal wavelength 很短，常可近似为 lumped wire。高频时，信号边沿很快，interconnect 的 parasitic $R/L/C$ 会导致：

| 问题          | 原因                                       | 后果                                      |
| ------------- | ------------------------------------------ | ----------------------------------------- |
| Signal delay  | capacitance and resistance slow transition | timing margin 变小                        |
| Reflection    | impedance mismatch                         | overshoot / ringing                       |
| Crosstalk     | capacitive/inductive coupling              | adjacent signal error                     |
| Ground bounce | common inductance in return path           | logic reference shift                     |
| IR drop       | resistance in power path                   | supply voltage at die lower than expected |

## DFR vs DFT 对比

| 项目      | DFR                                                     | DFT                                                 |
| --------- | ------------------------------------------------------- | --------------------------------------------------- |
| Full name | Design for Reliability                                  | Design for Testability                              |
| 目标      | 设计阶段减少 failure risk                               | 设计阶段让测试更容易、更便宜                        |
| 时间点    | upfront design, before fabrication                      | design phase, before production testing             |
| 典型内容  | material selection, thermal design, CTE/stress analysis | scan chain, built-in test, test access, test points |
| 考试易错  | 写成“做完后测试可靠性”                                | 写成“最后检查产品”                                |

## Reliability mechanism 模板

### Moisture

Moisture uptake in encapsulants or interfaces 会导致：

1. corrosion of leads/solder joints；
2. delamination due to weakened adhesion；
3. reduced insulation resistance；
4. leakage current or short circuit；
5. package cracking during reflow if trapped moisture vaporizes。

### Temperature cycling

Temperature cycling 会让不同 CTE 的材料反复膨胀/收缩，导致 solder fatigue、interface crack 和 delamination。

### Vibration / shock

Automotive or outdoor packages 需要承受 vibration and shock，否则 wire bonds、solder joints、die attach 可能 fatigue 或 fracture。

## 完整答题模板：Environmental factors

> For outdoor or automotive packages, important environmental factors include temperature extremes, humidity, vibration, shock, UV radiation and electromagnetic interference. Temperature cycling creates thermomechanical stress due to CTE mismatch. Moisture can cause corrosion, delamination and leakage. Vibration and shock can break solder joints or wire bonds. Therefore package design must use suitable materials, sealing, mechanical support and electrical shielding.

## Self-check

- [ ] 高频问题是否写了 parasitic R/L/C？
- [ ] DFR/DFT 是否区分了“设计阶段”而不是“事后测试”？
- [ ] moisture 题是否写了 corrosion、delamination、leakage？
- [ ] automotive/outdoor 题是否写了 temperature、humidity、vibration/shock、EMI？

## Reference

- Lecture 2: electrical package design, electrical functions, reliability/testability/environment。
- `考前一小时.docx`: DFR/DFT、frequency challenge、thermomechanical stress 高频整理。

## 来源说明

Slides-backed: Lecture 2。Exam-signal: `考前一小时.docx` 对 DFT/DFR、frequency challenge 和 moisture/reliability 有集中提醒。
