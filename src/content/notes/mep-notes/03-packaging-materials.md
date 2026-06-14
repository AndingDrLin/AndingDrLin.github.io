---
title: "第3章 Packaging Materials"
description: "封装材料、CTE、underfill/mold/solder/TIM/substrate 与典型失效机制。"
date: 2026-06-11
tags: [microelectronics-packaging, materials]
category: "课程学习"
docGroup: "microelectronics-packaging-notes"
order: 3
draft: false
---
## 考试要会什么

本章对应 Lecture 3，是最容易出 explain / compare / mechanism 的章节。你需要会：

- underfill / mold compound / solder / TIM / substrate 各自作用；
- CTE 的定义和 reliability 意义；
- thermal conductivity、electrical conductivity、mechanical properties 的作用；
- wire bonding、TAB、flip-chip 的材料与连接机制；
- solder fatigue、delamination、die cracking 等失效机制。

## 一句话记忆

**材料不是“选便宜的”，而是要同时满足电、热、机械、化学和工艺兼容性。**

![CTE mismatch](./assets/cte_mismatch.svg)

## 关键材料

| 材料/结构 | 作用 | 关键词 |
|---|---|---|
| Underfill | 填充 die 与 substrate 间隙，分担 solder joint stress | stress reduction, flip-chip reliability |
| Mold compound | 包封 die 和 wire bonds，防污染和机械损伤 | encapsulation, protection |
| Solder | 形成 electrical/mechanical interconnect | Sn-Pb, Sn-Ag, fatigue |
| Thermal interface material (TIM) | 在 heat source 与 heat sink 之间提供低热阻路径 | thermal path, contact resistance |
| Substrate | 支撑和布线，实现 signal/power distribution | PWB, ceramic, organic laminate |
| Wire / trace metals | 提供高导电互连 | Au, Al, Cu, oxidation resistance |

## CTE：最常考的材料性质

Coefficient of Thermal Expansion (CTE) 表示材料温度变化时长度变化的比例：

$$
\Delta L = \alpha L \Delta T
$$

CTE mismatch 会在 thermal cycling 中产生热应力。典型失效链：

> board/substrate 与 silicon die 的 CTE 不同 → 升温/降温时膨胀量不同 → solder joints 被剪切 → fatigue crack → electrical open 或 package failure。

高频 failure modes：

- solder joint fatigue；
- delamination；
- die cracking；
- interface fracture；
- warpage。

## 其他材料性质

| 性质 | 为什么重要 | 答题用语 |
|---|---|---|
| Thermal conductivity | 决定 heat 能否从 chip 快速传走 | high `k` helps heat dissipation |
| Electrical conductivity | interconnect 要高导电，dielectric/substrate 要绝缘 | signal/power efficiency vs isolation |
| Young's modulus / tensile strength | 影响刚度和抗裂能力 | mechanical reliability |
| Moisture absorption | 影响腐蚀、delamination、leakage | environmental reliability |
| Chemical stability | 防止污染和材料降解 | long-term reliability |

## 题型模板

### 题型：What are important packaging materials and applications?

1. Underfill/mold compounds：protection and stress reduction。
2. Solders/metals：electrical and mechanical interconnection。
3. TIM：heat removal from chip to heat sink。
4. Substrates：mechanical support and signal/power routing。
5. Encapsulants/sealing：environmental protection。

### 题型：Explain CTE mismatch failure

1. Define CTE。
2. Different package materials have different CTE values。
3. During thermal cycling, they expand/contract differently。
4. Solder joints/interfaces carry shear stress。
5. Results: fatigue, delamination, cracks, reliability loss。

## 易错点

- 不要只背材料名字；每个材料都要能写出 “role + property + failure prevented”。
- CTE 是 reliability 题，不只是材料定义题。
- TIM 的作用是降低 thermal contact resistance，不是简单“粘住散热器”。

## 本章概览

材料题的核心不是“列材料”，而是说明 **材料属性如何影响封装功能和失效模式**。同一个 package 同时包含 silicon、metals、polymers、ceramics、solder、underfill、mold compound、TIM、substrate。它们的 CTE、thermal conductivity、elastic modulus、moisture absorption 不同，就会带来可靠性问题。

### 零基础先览

- **Underfill**：保护 flip-chip solder bumps，降低热循环中的应变。
- **Mold compound**：把 die/wire 封住，防污染和机械损伤。
- **Solder**：既是 electrical interconnect，也是 mechanical joint。
- **TIM**：填补微小空气间隙，让热更容易从 die 走到 heat sink。
- **Substrate/PWB**：提供 mechanical support 和 signal/power routing。
- **CTE mismatch**：本章最重要 failure mechanism。

## Materials role table

| Material / structure | Electrical role | Thermal role | Mechanical / reliability role |
|---|---|---|---|
| Gold / Al / Cu wire | high conductivity interconnect | minor heat path | must resist oxidation, creep, fatigue |
| Solder bump/joint | electrical + mechanical connection | heat path between die/substrate | fatigue under thermal cycling |
| Underfill | dielectric support | may help heat spreading | reduces solder strain, prevents crack growth |
| Mold compound | insulation | limited heat spreading | protects against moisture/contamination |
| TIM | usually insulating or controlled conductivity | lowers thermal interface resistance | fills surface roughness |
| Ceramic substrate | electrical isolation with routing metallization | good thermal stability | hermetic, CTE closer to silicon |
| Organic laminate | routing and low dielectric constant | moderate thermal performance | low cost, CTE mismatch concern |

## Wire bonding / TAB / flip-chip 与材料

| Method | Main materials | Joining principle | Key reliability issue |
|---|---|---|---|
| Wire bonding | Au/Al/Cu wire, bond pads | heat / pressure / ultrasonic energy | wire sweep, bond lift, long wire parasitics |
| TAB | Cu leads on polyimide tape | thermocompression bonding | tape alignment, process/equipment demand |
| Flip-chip | solder bumps, underfill, substrate pads | bump reflow and underfill support | solder fatigue, underfill delamination |

## CTE mismatch 深入解释

CTE mismatch 不只是“热胀冷缩不同”，而是 package 中最常见的 thermomechanical reliability source。

假设 silicon die 的 CTE 较小，organic board 的 CTE 较大。当温度上升时，board 想膨胀更多，但 die 限制它，solder joints 被剪切；温度下降时剪切方向反过来。经过很多 thermal cycles 后，solder joint 出现 fatigue crack。

答题时可以写成链条：

```text
different α values → different ΔL under ΔT → shear stress at joint/interface → fatigue/delamination/crack → electrical/mechanical failure
```

## Failure modes

| Failure mode | 触发原因 | 结果 |
|---|---|---|
| Solder fatigue cracking | CTE mismatch + thermal cycling | open circuit / intermittent failure |
| Delamination | weak adhesion + moisture/thermal stress | heat path/electrical isolation degraded |
| Die cracking | mechanical stress, thin die, CTE mismatch | catastrophic die failure |
| Void growth | poor underfill/process or thermal cycling | stress concentration, crack initiation |
| Corrosion | moisture + ionic contamination | leakage, resistance increase, open/short |

## 高频问答：important materials and applications

> Important materials in electronic packaging include underfill and mold compounds for protection and stress reduction, solders for electrical and mechanical interconnections, thermal interface materials for heat removal, substrates for signal/power routing and support, and metals such as copper, aluminium and gold for conductive paths. Their properties such as CTE, thermal conductivity, electrical conductivity, stiffness and moisture absorption determine package reliability.

## 高频问答：CTE importance

> CTE is important because package materials such as silicon, solder, substrate and encapsulant expand differently during temperature change. This mismatch generates thermomechanical stress at solder joints and interfaces. Under repeated thermal cycling, this stress can cause solder fatigue, delamination, die cracking and reliability failure. Therefore material selection and underfill design are used to reduce stress.

## Self-check

- [ ] 每个材料是否写出 role，而不是只列名字？
- [ ] CTE 是否写出公式和 failure chain？
- [ ] Flip-chip 是否提到 underfill？
- [ ] Solder 是否同时写 electrical 和 mechanical function？
- [ ] TIM 是否写 thermal interface resistance？

## Reference

- Lecture 3: underfill/mold compounds, solder, TIM, substrates, material properties, IC assembly。
- Practice questions: CTE、wire bonding、TAB、flip-chip、materials applications。

## 来源说明

Slides-backed: Lecture 3。Slides + Exam-backed: practice questions 和考前资料多次出现 CTE、underfill、solder、TIM、substrate。
