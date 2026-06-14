---
title: "第11章 Common Mistakes Checklist"
description: "微电子封装考前概念、比较、公式和画图易错点清单。"
date: 2026-06-11
tags: [microelectronics-packaging, mistakes]
category: "课程学习"
docGroup: "microelectronics-packaging-notes"
order: 11
draft: false
---
## 考试要会什么

- 写完概念题后，能检查自己有没有漏掉 signal、power、heat、protection、reliability 等封装功能。
- 写完比较题后，能检查是否同时比较 structure、electrical、cost、reliability、application。
- 写完公式题后，能检查单位、面积、温度制和热路径是否合理。

## 一句话记忆

> 微电子封装最常丢分的不是不会名词，而是只写名词、不写机制、不写后果、不写限制。

## 用法

考前最后扫一遍。每道问答题写完后，按这一页检查有没有漏掉关键维度。

## A. 概念题

| 检查项 | 正确做法 | 常见扣分点 |
|---|---|---|
| Packaging definition | 写 interconnect + power + heat + protection + reliability | 只写“保护芯片” |
| Multidisciplinary | electrical / mechanical / materials / thermal 都提到 | 只写材料或只写电路 |
| Microsystem | 写 sensing/actuation/environmental interaction | 把 MEMS 当普通 IC |
| DFR | upfront design for reliability | 写成 final reliability test |
| DFT | design features for efficient testing | 写成普通 inspection |

## B. 比较题

| 比较 | 必须出现的维度 | 常见错误 |
|---|---|---|
| SoC vs SiP | integration, cost, time-to-market, performance, flexibility | 只说 SoC 一个芯片、SiP 多个芯片 |
| Wire bonding vs flip-chip | cost, equipment, I/O density, interconnect length, reliability | 只写 flip-chip 更小 |
| CSP vs WLP | CSP 是尺寸概念，WLP 是工艺阶段 | 把二者当同义词 |
| WLP vs wire bonding | wafer-level parallel process vs individual die/wire process | 只写 WLP 便宜，不解释为什么 |

## C. 材料与可靠性

| 检查项 | 正确做法 | 常见错误 |
|---|---|---|
| CTE | 写 `ΔL=αLΔT` 和 mismatch failure chain | 只写“热胀冷缩” |
| Underfill | stress sharing and solder reliability | 写成普通胶水 |
| TIM | lower interface thermal resistance | 写成产生冷量 |
| Moisture | corrosion, delamination, leakage/short | 只写“受潮不好” |
| Low-k ILD | lower capacitance but fragile | 只写优点 |

## D. Thermal

| 检查项 | 正确做法 | 常见错误 |
|---|---|---|
| Conduction | `Q=kAΔT/L` | 忘记厚度/面积单位 |
| Convection | `Q=hA(T_s-T_f)` | 两面散热时只算一面面积 |
| Radiation | Kelvin temperature in fourth power | 用摄氏度直接代入 |
| Thermal resistance | `Rθ=ΔT/P` | 把 power 和 temperature rise 混用 |

## E. 画图题

最稳的图：

- chip-package-board-system hierarchy；
- signal/power/ground path；
- wire bonding / TAB / flip-chip cross-section；
- CTE mismatch solder shear；
- heat flow path from die to ambient；
- SoC/SiP/WLP/3D package map。

画图必须标注箭头和功能，不要只画方块。

## 逐题检查顺序

每道长题写完后按下面 5 个问题扫一遍：

1. 我有没有先定义？
2. 我有没有写 mechanism，而不是只列关键词？
3. 我有没有写 advantage 和 limitation？
4. 如果是比较题，我有没有至少比较 4 个维度？
5. 如果题目说 with figures，我的图有没有标签和箭头？

## 高频漏点红线

| 主题 | 必须出现 | 漏掉会怎样 |
|---|---|---|
| Packaging function | signal, power, heat, protection, mechanical, reliability | 答案像常识，不像课程答案 |
| Electrical design | parasitic R/L/C, high frequency | 无法解释为什么 package design 难 |
| Materials | CTE, thermal conductivity, moisture | 材料题没有工程机制 |
| CTE | differential expansion and solder shear | 只背定义，失去 reliability 分 |
| Wire bonding | low cost vs long wire parasitics | 比较题不完整 |
| Flip-chip | short path/high I/O vs bump/underfill cost | 只写优点 |
| WLP | wafer-level parallel process | 解释不了为什么省时间/成本 |
| SiP | heterogeneous integration | 错写成 “多个芯片所以低级” |
| Thermal | formula + units + area | 计算题单位错 |

## 公式/单位最终检查

- CTE 用 ppm/°C 时，代入计算要转换或说明单位。
- Convection 面积要用 m²，不是 cm²。
- Two-sided board 要乘 2 个面积。
- Radiation 用 Kelvin。
- Thermal resistance 单位是 °C/W 或 K/W。
- $Q$ 是 heat flow / power，单位 W。
- $h$ 是 W/m²K。
- $k$ 是 W/mK。

## 概念边界最终检查

| 概念 | 不要混淆 |
|---|---|
| CSP | package size category |
| WLP | wafer-level fabrication process |
| Flip-chip | die attach / interconnect method |
| BGA | package with solder ball array |
| SiP | package-level integration of multiple components |
| SoC | chip-level integration on one die |
| TSV | vertical through-silicon interconnect |
| Interposer | bridge / redistribution substrate |

## Reference

本 checklist 来自 practice/exam 高频问法、考前资料、以及对首版笔记的逐文件审查。

## 来源说明

本章来自 `Exam_Point_Map.md`、practice answers 和考前资料中的高频错误/高频提醒。
