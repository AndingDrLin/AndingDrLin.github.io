---
title: "第5章 散热器与热设计"
description: "把器件损耗转成温升，整理热阻阶梯、散热器和共用散热器题。"
date: 2026-05-17
tags: [power-electronics, 电力电子]
category: "课程学习"
docGroup: "power-electronic-notes"
order: 5
draft: false
---
## 为什么热设计很重要

电力电子器件的损耗最终都变成热。如果热量散不出去，结温（junction）就会超标。半导体器件的最高结温通常在 125 °C 左右，超过这个温度，失效率大约每升高 10 °C 翻一倍。所以热设计不是可选项——它直接决定器件能不能活下来。

## 三种传热机制

热量从器件传到空气，靠三种方式：

1. **传导**（conduction）：热量沿固体材料传递，比如从芯片 die 到封装外壳、从外壳到散热器。驱动力是温差，阻力是热阻。
2. **对流**（convection）：散热器表面把热量传给周围的流体（通常是空气）。自然对流（natural convection）靠空气密度差驱动，风速低、换热弱；强制对流（forced convection）用风扇吹，换热效率高得多。
3. **辐射**（radiation）：任何有温度的物体都在向周围辐射电磁波。在电力电子的典型温度范围（50–150 °C）内，辐射占比不大，但在真空或高温环境下会变得重要。

工程上，传导和对流是主要路径。如果散热器设计比较复杂（比如翅片形状、风道布局），可以用 CFD（计算流体力学）软件做仿真优化，但考试只考集总参数的热路计算。

## 热路模型

热路和电路很像：

| 电路 | 热路 |
|---|---|
| 电流 $I$ | 功耗 $P$ |
| 电压差 $V$ | 温差 $\Delta T$ |
| 电阻 $R$ | 热阻（thermal resistance） $R_\theta$ |
| $V=IR$ | $\Delta T=PR_\theta$ |

## 热阻阶梯

单个器件从结到环境的热路，像一个逐级传递的阶梯：

1. 结（junction）→ 外壳（case）：热阻 $R_{\theta JC}$
2. 外壳（case）→ 散热器（heatsink）：热阻 $R_{\theta CS}$
3. 散热器（heatsink）→ 环境（ambient）：热阻 $R_{\theta SA}$

对应：

$$
T_J \;\text{—}\; R_{\theta JC} \;\text{—}\; T_C \;\text{—}\; R_{\theta CS} \;\text{—}\; T_S \;\text{—}\; R_{\theta SA} \;\text{—}\; T_A
$$

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

## 反推散热器

有时题目给最大结温，让你选散热器。

$$
R_{\theta SA}\le\frac{T_{J,max}-T_A}{P}-R_{\theta JC}-R_{\theta CS}
$$

选散热器时要选更小的 $R_{\theta SA}$。热阻越小，散热越好。

## 例题 2：选散热器

已知 $P=30\,\mathrm{W}$，$T_A=40^\circ\mathrm{C}$，$T_{J,max}=125^\circ\mathrm{C}$，$R_{\theta JC}=1^\circ\mathrm{C/W}$，$R_{\theta CS}=0.5^\circ\mathrm{C/W}$。求 $R_{\theta SA}$ 上限。

总允许热阻：

$$
\frac{125-40}{30}=2.83^\circ\mathrm{C/W}
$$

扣掉 junction-case 和 case-sink：

$$
R_{\theta SA}\le2.83-1-0.5=1.33^\circ\mathrm{C/W}
$$

所以散热器要选 $1.33^\circ\mathrm{C/W}$ 或更小。

## 共用散热器

多个器件共用同一个散热器时，散热器到环境这段承受总功耗。

$$
P_{total}=P_1+P_2+\cdots+P_n
$$

$$
T_S=T_A+P_{total}R_{\theta SA}
$$

每个器件自己的结温单独算：

$$
T_{J,k}=T_S+P_k(R_{\theta CS,k}+R_{\theta JC,k})
$$

## 例题 3：共用散热器

MOSFET 损耗 $10\,\mathrm{W}$，diode 损耗 $5\,\mathrm{W}$，共用散热器。$T_A=25^\circ\mathrm{C}$，$R_{\theta SA}=3^\circ\mathrm{C/W}$。MOSFET 的 $R_{\theta JC}+R_{\theta CS}=2^\circ\mathrm{C/W}$，diode 的 $R_{\theta JC}+R_{\theta CS}=4^\circ\mathrm{C/W}$。

散热器温度：

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

## 瞬态热分析

前面的计算都假设稳态——器件一直工作、温度不再变化。但实际工作中，很多器件是间歇工作的（比如脉冲负载）。这种情况下，温度还没来得及升到稳态值，负载就已经关了。瞬态热分析就是处理这种情况的。

### 热容的概念

热路里，除了热阻还有热容（thermal capacitance）。热容 $C_\theta$ 类比电路里的电容：就像电容两端的电压不能突变，物体的温度也不能突变。热容越大，温度变化越慢。

### RC 热路模型

把热阻和热容组合起来，就是一个 RC 电路：

$$
\tau = \theta_{SA} \times C_{SA}
$$

其中 $\tau$ 是热时间常数，$\theta_{SA}$ 是散热器到环境的热阻，$C_{SA}$ 是散热器的热容。

温度响应曲线和电容充电曲线一样：

$$
T_{actual} = T_{final} \times (1 - e^{-t/\tau})
$$

其中 $T_{final}$ 是稳态温度，$T_{actual}$ 是 $t$ 时刻的实际温度。

### 时间常数表

| 时间 | 温度达到稳态值的百分比 |
|---|---|
| $0.5\tau$ | 39% |
| $\tau$ | 63% |
| $2\tau$ | 86% |
| $3\tau$ | 95% |
| $5\tau$ | 99%（可视为达到稳态） |

### 脉冲工作

在脉冲工作模式下，器件只在脉冲期间发热。如果脉冲宽度远小于热时间常数，峰值温升会远低于稳态值——这是好事。但要注意一个事实：冷却的时间常数通常比加热的时间常数大（因为散热器的热容在冷却阶段持续向环境放热），所以不能简单地假设"热多少就冷多少"。在做题时，如果题目没有特别说明瞬态，按稳态处理就行；如果题目提到了脉冲宽度或占空比，就需要考虑热容的影响。

## 降额

降额（derating）就是不按器件极限用。温度越高，允许功耗通常越低。并联器件也不能假设完全均流，所以要留余量。

考试短答可写：higher temperature reduces allowable power/current, so derating is used to keep junction temperature below the limit with margin。

## 固定套路

热阻题按这几步：

1. 确认 $P$ 是器件损耗，不是负载功率
2. 画出热阻阶梯
3. 单器件：$T_J = T_A + P \Sigma R_\theta$
4. 选散热器：反推 $R_{\theta SA,max}$
5. 共用散热器：先用总功耗求 $T_S$
6. 每个器件单独算 $T_J$
7. 最后写安全/不安全

## 别丢分

- 热阻计算用器件损耗，不用负载功率。
- 共用散热器的 $T_S$ 用总功耗。
- 每个器件的 $T_J$ 用自己的功耗。
- $R_{\theta SA}$ 越小越好。
- 最后必须写安全/不安全。
