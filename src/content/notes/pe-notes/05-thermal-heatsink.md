---
title: "第5章 Thermal and Heatsink"
description: "把器件损耗转成温升，整理 thermal ladder、heatsink 和 shared heatsink 题。"
date: 2026-05-17
tags: [power-electronics, 电力电子]
category: "课程学习"
docGroup: "power-electronic-notes"
order: 5
draft: false
---
## 先讲清楚

第 4 章算出来的 loss 最后都会变成热。Thermal 题就是问：这些热能不能从芯片内部传到空气里，结温会不会超过上限。

热路和电路很像：

| 电路 | 热路 |
|---|---|
| 电流 $I$ | 功耗 $P$ |
| 电压差 $V$ | 温差 $\Delta T$ |
| 电阻 $R$ | 热阻 $R_\theta$ |
| $V=IR$ | $\Delta T=PR_\theta$ |

## Thermal ladder

单个器件的热路：

```text
junction → case → sink → ambient
```

对应：

```text
T_J ─ R_θJC ─ T_C ─ R_θCS ─ T_S ─ R_θSA ─ T_A
```

从环境往上算：

$$
T_S=T_A+P R_{\theta SA}
$$

$$
T_C=T_S+P R_{\theta CS}
$$

$$
T_J=T_C+P R_{\theta JC}
$$

合并：

$$
T_J=T_A+P(R_{\theta JC}+R_{\theta CS}+R_{\theta SA})
$$

![Thermal chain](./assets/thermal_chain.svg)

## 例题 1：算结温

已知 $P=20\,\mathrm{W}$，$T_A=25^\circ\mathrm{C}$，$R_{\theta JC}=1^\circ\mathrm{C/W}$，$R_{\theta CS}=0.5^\circ\mathrm{C/W}$，$R_{\theta SA}=2^\circ\mathrm{C/W}$。求 $T_J$。

总热阻：

$$
R_{total}=1+0.5+2=3.5^\circ\mathrm{C/W}
$$

温升：

$$
\Delta T=20\times3.5=70^\circ\mathrm{C}
$$

结温：

$$
T_J=25+70=95^\circ\mathrm{C}
$$

若 $T_{J,max}=150^\circ\mathrm{C}$，这组条件安全。

## 反推 heatsink

有时题目给最大结温，让你选 heatsink。

$$
R_{\theta SA}\le\frac{T_{J,max}-T_A}{P}-R_{\theta JC}-R_{\theta CS}
$$

选 heatsink 时要选更小的 $R_{\theta SA}$。热阻越小，散热越好。

## 例题 2：选 heatsink

已知 $P=30\,\mathrm{W}$，$T_A=40^\circ\mathrm{C}$，$T_{J,max}=125^\circ\mathrm{C}$，$R_{\theta JC}=1^\circ\mathrm{C/W}$，$R_{\theta CS}=0.5^\circ\mathrm{C/W}$。求 $R_{\theta SA}$ 上限。

总允许热阻：

$$
\frac{125-40}{30}=2.83^\circ\mathrm{C/W}
$$

扣掉 junction-case 和 case-sink：

$$
R_{\theta SA}\le2.83-1-0.5=1.33^\circ\mathrm{C/W}
$$

所以 heatsink 要选 $1.33^\circ\mathrm{C/W}$ 或更小。

## Shared heatsink

多个器件共用同一个 heatsink 时，sink-to-ambient 这段承受总功耗。

$$
P_{total}=P_1+P_2+\cdots+P_n
$$

$$
T_S=T_A+P_{total}R_{\theta SA}
$$

每个器件自己的 junction temperature 单独算：

$$
T_{J,k}=T_S+P_k(R_{\theta CS,k}+R_{\theta JC,k})
$$

## 例题 3：shared heatsink

MOSFET loss $10\,\mathrm{W}$，diode loss $5\,\mathrm{W}$，共用 heatsink。$T_A=25^\circ\mathrm{C}$，$R_{\theta SA}=3^\circ\mathrm{C/W}$。MOSFET 的 $R_{\theta JC}+R_{\theta CS}=2^\circ\mathrm{C/W}$，diode 的 $R_{\theta JC}+R_{\theta CS}=4^\circ\mathrm{C/W}$。

Sink temperature：

$$
T_S=25+(10+5)\times3=70^\circ\mathrm{C}
$$

MOSFET：

$$
T_{J,M}=70+10\times2=90^\circ\mathrm{C}
$$

Diode：

$$
T_{J,D}=70+5\times4=90^\circ\mathrm{C}
$$

两个都要检查是否低于各自最大结温。

## Derating

Derating 就是不按器件极限用。温度越高，允许功耗通常越低。并联器件也不能假设完全均流，所以要留 margin。

考试短答可写：higher temperature reduces allowable power/current, so derating is used to keep junction temperature below the limit with margin。

## 固定套路

Thermal 题按这几步：

```text
1. 确认 P 是 device loss，不是 load power
2. 画 thermal ladder
3. 单器件：T_J = T_A + P ΣRθ
4. 选 heatsink：反推 R_θSA,max
5. shared heatsink：先用总功耗求 T_S
6. 每个器件单独算 T_J
7. 最后写 safe / unsafe
```

## 别丢分

- Thermal 用器件损耗，不用负载功率。
- Shared heatsink 的 $T_S$ 用总功耗。
- 每个器件的 $T_J$ 用自己的功耗。
- $R_{\theta SA}$ 越小越好。
- 最后必须写 safe / unsafe。
