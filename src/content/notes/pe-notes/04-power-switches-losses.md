---
title: "第4章 Power Switches and Losses"
description: "期末器件题要用的 SOA、diode recovery、MOSFET loss、MOSFET 并联和选型理由。"
date: 2026-05-17
tags: [power-electronics, 电力电子]
category: "课程学习"
docGroup: "power-electronic-notes"
order: 4
draft: false
---
## 会怎么考

- SOA / FBSOA 图：解释安全工作区边界。
- Diode transient 图：标 $V_F$、$I_F$、$V_{FP}$、reverse voltage/current/recovery。
- Diode loss：forward conduction loss + reverse recovery loss。
- MOSFET PWM loss：从 current waveform 求 $I_{avg}$、$I_{rms}$、$P_{cond}$、$P_{sw}$。
- MOSFET 优缺点。
- MOSFET 并联 current sharing。
- 选 IGBT / MOSFET / SCR 时写理由。

## 选型题怎么写

| 器件 | 考试常写优点 | 不适合的地方 |
|---|---|---|
| MOSFET | fully controllable；开关快；gate drive power 小；适合高频低/中压 | 高压大功率时 $R_{DS(on)}$ 大；gate oxide 脆弱；body diode/recovery 要考虑 |
| IGBT | fully controllable；高压大电流能力强；适合 kHz 级中高功率 | 比 MOSFET 慢；高频 switching loss 大 |
| SCR / Thyristor | 超高功率；line-frequency rectifier；导通损耗低 | half-controllable；gate 不能 turn off；高频 PWM 不适合 |
| GTO | 可 gate turn off；高功率 | 驱动复杂；速度慢 |

题目给 MW 级、几百伏、kHz 级 switching，通常写 IGBT：

```text
IGBT: high voltage/current rating + fully gate controlled + suitable for medium switching frequency.
```

## SOA / FBSOA 图

SOA 题不要只写“不要超过额定值”。至少写四个限制：

| 边界 | 该怎么解释 |
|---|---|
| Current limit | 电流不能超过器件允许峰值/连续值 |
| Voltage limit | blocking voltage 不能超过器件耐压 |
| Power limit | $P=VI$，电压电流同时大时会过热 |
| Thermal / secondary breakdown limit | pulse duration 越长，允许区域越小；BJT/IGBT 还可能受 secondary breakdown 限制 |

FBSOA 是 forward-biased safe operating area。写法：

```text
The switching trajectory must stay inside the FBSOA during turn-on/turn-off; otherwise the device can fail even if voltage and current ratings are separately satisfied.
```

## Diode transient 图要标什么

2022 Q1(c) 这种题通常给 diode turn-on / turn-off waveform，让你标量。

常见标注：

| 符号 | 意思 |
|---|---|
| $V_F$ | steady forward voltage drop |
| $I_F$ | forward current |
| $V_{FP}$ | turn-on forward voltage overshoot / peak |
| $V_R$ | reverse blocking voltage |
| $I_R$ | reverse leakage 或 reverse current，按题图定义 |
| $I_{rr}$ | peak reverse recovery current |
| $t_{rr}$ | reverse recovery time |
| $Q_{rr}$ | reverse recovery charge |

别乱改题图符号。题图写 $V_{rr}$、$I_{rr}$ 就按图上的名字解释。

## Diode loss

Forward conduction loss：

$$
P_F\approx V_F I_{F,avg}
$$

若 diode 只在一部分周期导通，$I_{F,avg}$ 要包含 duty。

Reverse recovery loss：

$$
P_{RR}=Q_{RR}V_R f_s
$$

这里 $V_R$ 是 blocking / reverse voltage，不是 $V_F$。

总损耗：

$$
P_D\approx P_F+P_{RR}
$$

## MOSFET conduction loss

先求 MOSFET current 的 RMS。

$$
P_{cond}=I_{D,rms}^2R_{DS(on)}
$$

矩形脉冲：

$$
I_{avg}=DI_m,\\ I_{rms}=I_m\sqrt D
$$

线性斜坡从 $I_1$ 到 $I_2$，持续 $\Delta t$：

$$
\int i^2dt=\frac{\Delta t}{3}(I_1^2+I_1I_2+I_2^2)
$$

再除以完整周期 $T$，开方得到 RMS。

## MOSFET switching loss

题目公式表常给：

$$
P_{sw}=\frac{f_sV_{DS,off}}{2}\left(t_{on,sw}I_{on}+t_{off,sw}I_{off}\right)
$$

若题目只给 rise/fall time，也常写：

$$
P_{sw}\approx\frac12V_{DS}I_D(t_r+t_f)f_s
$$

注意：这里的 $I_D$ 是 switching instant 的电流，不是平均值，也不是 RMS。

## MOSFET loss 题板书顺序

1. 从图读 $T$、$t_{on}$、$D$。
2. 分段算 $I_{avg}$。
3. 分段算 $I_{rms}$。
4. 算 load/source average power：通常用 $VI_{avg}$。
5. 算 $P_{cond}=I_{rms}^2R_{DS(on)}$。
6. 算 $P_{sw}$。
7. 算 $P_{tot}=P_{cond}+P_{sw}$。
8. 若问降低 switching frequency：只会明显降低 $P_{sw}$；$P_{cond}$ 主要由 RMS current 和 $R_{DS(on)}$ 决定。

## MOSFET 并联 current sharing

2024/2025 会问。

能并联的原因：

- MOSFET 的 $R_{DS(on)}$ 通常是正温度系数。
- 某只 MOSFET 变热后，$R_{DS(on)}$ 增大。
- 它分到的电流会下降，电流转移到其他器件。
- 这有助于 current sharing。

但考试要补一句：

- 仍需要 matched devices、对称 layout、source resistor、单独 gate resistor、足够 derating。

## 别丢分

- MOSFET conduction loss 用 RMS current，不用 average current。
- Switching loss 的时间单位 ns、$\mu$s 要换成 s。
- Reverse recovery loss 用 $V_R$，不是 $V_F$。
- SOA 要同时讲 voltage、current、power、thermal，不只讲额定电压。
- SCR 不是 fully-controllable。
- MOSFET 优点不要只写“fast”；缺点也要写高压大功率时 $R_{DS(on)}$ 和热问题。
- 总损耗进入第 5 章 thermal，不要把 load power 当 device loss。
