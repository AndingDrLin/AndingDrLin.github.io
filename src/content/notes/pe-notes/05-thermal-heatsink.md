---
title: "第5章 Thermal and Heatsink"
description: "期末热设计题要用的 thermal ladder、heatsink、shared heatsink 和 derating。"
date: 2026-05-17
tags: [power-electronics, 电力电子]
category: "课程学习"
docGroup: "power-electronic-notes"
order: 5
draft: false
---
## 会怎么考

- 画 junction-case-sink-ambient thermal circuit。
- 给损耗和热阻，算 $T_S$、$T_C$、$T_J$。
- 给 $T_{J,max}$，反推需要的 heatsink thermal resistance。
- 判断不用 heatsink 是否安全。
- 多个器件共用 heatsink，算每个 junction temperature。
- 解释 derating。

## 单个器件 thermal ladder

热路顺序固定：

```text
T_J ─ R_θJC ─ T_C ─ R_θCS ─ T_S ─ R_θSA ─ T_A
```

从环境往上算温度：

$$
T_S=T_A+P R_{\theta SA}
$$

$$
T_C=T_S+P R_{\theta CS}
$$

$$
T_J=T_C+P R_{\theta JC}
$$

合起来：

$$
T_J=T_A+P(R_{\theta JC}+R_{\theta CS}+R_{\theta SA})
$$

这里的 $P$ 是器件损耗，不是负载功率。

![Thermal chain](./assets/thermal_chain.svg)

## 反推 heatsink

给 $T_{J,max}$ 时：

$$
R_{\theta SA}\le \frac{T_{J,max}-T_A}{P}-R_{\theta JC}-R_{\theta CS}
$$

选 heatsink 时选更小的 $R_{\theta SA}$。数值越小，散热越好。

若算出来是负数，说明只靠普通 heatsink 不够：要减小损耗、换器件、并联、风冷，或降低环境温度。

## 不用 heatsink 是否安全

题目给 package thermal resistance，例如 case-to-ambient 或 junction-to-ambient 时：

$$
T_J=T_A+P R_{\theta JA}
$$

若 $T_J<T_{J,max}$，可以；否则不可以。

写答案时要给结论：safe / unsafe。

## Shared heatsink

多个器件共用一个 heatsink 时，最容易错。

Sink temperature 用总功耗：

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

板书顺序：

1. 列每个器件功耗。
2. 加总，求 $T_S$。
3. 对 MOSFET 算 $T_{J,M}$。
4. 对 diode 算 $T_{J,D}$。
5. 比较哪个更接近 limit。

## Derating 怎么写

Derating 就是不要按 datasheet 极限用器件。

考试短答：

- Datasheet rating usually assumes specified case/ambient temperature.
- Higher temperature reduces allowable power/current.
- Use derating to keep junction temperature below limit with margin.
- Parallel devices still need derating because current sharing is not ideal.

## 常见题型模板

### 给功耗求温度

```text
P = ... W
T_A = ... °C
T_S = T_A + P R_θSA
T_C = T_S + P R_θCS
T_J = T_C + P R_θJC
Compare with T_J,max
```

### 给温度限制求 heatsink

```text
Allowed total Rθ = (T_J,max - T_A) / P
R_θSA,max = Allowed total Rθ - R_θJC - R_θCS
Choose heatsink with R_θSA <= this value
```

### Common heatsink

```text
T_S = T_A + (P_MOS + P_Diode + ...) R_θSA
T_J,MOS = T_S + P_MOS(R_θCS,MOS + R_θJC,MOS)
T_J,D = T_S + P_D(R_θCS,D + R_θJC,D)
```

## 别丢分

- Thermal 用 device loss，不用 load power。
- $R_{\theta SA}$ 用总功耗只在 shared heatsink 的 sink-to-ambient 部分。
- 每个器件的 junction-to-case 温升用自己的功耗。
- $^\circ\mathrm{C/W}$ 和 W 相乘得到 $^\circ\mathrm{C}$ 温升。
- 画图方向可以从 junction 到 ambient；计算通常从 ambient 加到 junction。
- 求 heatsink 时，$R_{\theta SA}$ 越小越好。
- 最后必须写 safe / unsafe。
