---
title: "第7章 Thermal Management"
description: "微电子封装热管理、热阻、导热、对流、辐射和冷却方法。"
date: 2026-06-11
tags: [microelectronics-packaging, thermal-management]
category: "课程学习"
docGroup: "microelectronics-packaging-notes"
order: 7
draft: false
---
## 考试要会什么

本章对应 Lecture 7，也是最可能出现定量计算的章节。你需要会：

- 为什么 thermal management 重要；
- catastrophic failure、performance degradation、reliability loss 的关系；
- conduction、convection、radiation 的公式；
- thermal resistance 类比；
- board temperature / heat dissipation 的简单计算；
- cooling methods 和 heat sink / TIM 的作用。

## 一句话记忆

**热管理的目标不是“摸起来不烫”，而是控制 device temperature，避免性能漂移、材料失效和可靠性下降。**

![Thermal paths](./assets/thermal_paths.svg)

## 核心原理

Microelectronic devices dissipate power as heat. 如果热不能及时传走，会导致：

- semiconductor behavior deteriorates；
- package materials crack, delaminate, melt or degrade；
- solder fatigue accelerates；
- reliability and lifetime decrease。

## 必背公式

### Thermal resistance

$$
R_\theta = \frac{\Delta T}{P}
$$

类比电阻：temperature difference 类比 voltage，heat flow/power 类比 current，thermal resistance 类比 resistance。

### Conduction

$$
Q = \frac{kA\Delta T}{L}
$$

$k$ 越大、面积 $A$ 越大、厚度 $L$ 越小，导热越好。

### Convection

$$
Q = hA(T_s-T_f)
$$

自然对流的 $h$ 小，强迫对流的 $h$ 大。所以同样温升下，forced convection 能带走更多 heat。

### Radiation

$$
Q=\varepsilon\sigma A F_{12}(T_1^4-T_2^4)
$$

注意 radiation 的温度必须用 Kelvin。

## 题型模板

### 题型：Why is thermal management important?

1. Semiconductor devices generate heat during operation。
2. Excessive temperature causes performance degradation and catastrophic failure。
3. Package materials may crack, delaminate, melt or fatigue。
4. Thermal management provides a heat flow path from junction/die to ambient。
5. Good design improves reliability and lifetime。

### 题型：Board convection calculation

1. Identify heat generation $Q$ and surface area $A$。
2. Choose convection formula $Q=hA(T_s-T_f)$。
3. If both sides are cooled, use total wetted area。
4. Solve for $T_s$ or $Q$。
5. Keep units: W, m², W/m²K, K or °C difference。

## Cooling methods

| 方法 | 作用 | 适用场景 |
|---|---|---|
| TIM | lower interface resistance | die-to-heat-sink contact |
| Heat sink | increase surface area | air cooling |
| Forced air | increase convection coefficient | boards, packages |
| Liquid cooling / microchannel | high heat flux removal | high-power / high-density systems |
| Thermal vias / spreaders | spread heat through substrate | BGA, PWB, SiP |

## 易错点

- Radiation 公式不能用摄氏度直接四次方。
- Convection 计算要看是一面还是两面散热。
- 热管理问答题要写 reliability，不只写 temperature。
- TIM 是降低 interface thermal resistance，不是“产生冷却”。

## 本章概览

Thermal management 是封装课中最像“工程计算”的章节。考试可能让你解释热管理为什么重要，也可能给 board size、power、convection coefficient 让你估算温度或散热能力。

### 零基础先览

- 热从 chip 产生，必须经过 package 材料传到 ambient。
- 热路径上每个界面都有 thermal resistance。
- Thermal failure 不只是烧坏，还包括 performance drift、solder fatigue、delamination、material degradation。
- Conduction 在 solid 内发生；convection 是 solid surface 到 moving fluid；radiation 是电磁波辐射。

## Thermal hierarchy

热管理目标有层级：

1. prevent catastrophic failure；
2. keep device parameters within operating range；
3. slow down reliability degradation；
4. allow high performance / high power density；
5. reduce package size and cooling cost。

## Heat transfer modes 对比

| Mode | Formula | Physical meaning | Package example |
|---|---|---|---|
| Conduction | $Q=kA\Delta T/L$ | heat through solid | die, TIM, substrate, heat spreader |
| Convection | $Q=hA(T_s-T_f)$ | heat from surface to fluid | heat sink to air |
| Radiation | $Q=\varepsilon\sigma AF(T_1^4-T_2^4)$ | heat by electromagnetic radiation | hot package surface to surroundings |

## Thermal resistance network

Thermal resistance 可以串联：

```text
Die/junction → die attach/TIM → substrate/heat spreader → heat sink → ambient
```

总温升：

$$
\Delta T = P(R_{\theta 1}+R_{\theta 2}+...)
$$

若题目给多个热路径并联，要像电阻并联一样处理；但大多数考试题用串联或简单 convection。

## Worked mini example：two-sided convection board

题型：20 cm × 20 cm board dissipates 10 W, cooled by natural convection from both sides in 35°C air, $h=5\,W/m^2K$。求平均表面温度。

1. 面积：一面 $A=0.2\times0.2=0.04\,m^2$。
2. 两面散热：$A_{total}=0.08\,m^2$。
3. 用 convection：$Q=hA(T_s-T_f)$。
4. 温升：

$$
T_s-T_f=\frac{Q}{hA}=\frac{10}{5\times0.08}=25^\circ C
$$

5. 表面温度：$T_s=35+25=60^\circ C$。

如果 forced convection $h=25\,W/m^2K$ 且要保持相同温升 25°C：

$$
Q=hA\Delta T=25\times0.08\times25=50\,W
$$

这说明 forced convection 可以在相同温度下带走更多 heat。

## Thermal interface

真实 solid surfaces 不是完全平整的，界面处有 air gaps。空气导热差，所以 interface thermal resistance 可能很大。TIM 的作用是填充微观空隙，提供更连续的 heat path。

高分句：

> Thermal interface materials do not generate cooling; they reduce the contact thermal resistance between two solid surfaces by filling microscopic air gaps.

## Radiation 注意点

Radiation 公式中的温度必须用 Kelvin，因为四次方温差依赖 absolute temperature。考试中如果直接用 °C，数值会严重错误。

## 完整答题模板：thermal management importance

> Thermal management is important because electrical power dissipated in a microelectronic device becomes heat. If this heat is not removed, the device temperature rises, causing performance degradation, parameter drift and even catastrophic failure. High temperature also accelerates package failure mechanisms such as solder fatigue, delamination, cracking and material degradation. Therefore the package must provide a low-resistance thermal path from the die to the ambient using TIMs, substrates, heat spreaders, heat sinks and convection or liquid cooling.

## Self-check

- [ ] Convection 是否用了总受风面积？
- [ ] Radiation 是否把 °C 转成 K？
- [ ] Thermal management 解释是否写了 reliability？
- [ ] TIM 是否写成降低 interface resistance？
- [ ] 是否区分 conduction/convection/radiation？

## Reference

- Lecture 7: thermal analysis, thermal design, cooling methods。
- Exam paper 2022: board heat dissipation / convection calculation。
- 学长 L6：heat flow across interfaces、convection、radiation。

## 来源说明

Slides-backed: Lecture 7。Slides + Exam-backed: Exam paper 2022 和学长 L6 整理含热管理问答与计算。
