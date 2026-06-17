---
title: "第6章 Snubber and Flyback"
description: "期末 snubber 与 flyback 题要用的保护电路、数值计算、画图和隔离型 DC-DC 选择。"
date: 2026-05-17
tags: [power-electronics, 电力电子]
category: "课程学习"
docGroup: "power-electronic-notes"
order: 6
draft: false
---
## 会怎么考

- 问 snubber 是干什么的。
- 给感性负载开关，要求选 snubber 并重画电路。
- 给 $L$、$C$，求 ringing frequency。
- 给电感电压，求 $di/dt$。
- 给 snubber resistor / peak current / frequency，估算 power。
- 问需要 isolation 时选什么 DC-DC converter。

## Snubber 作用

考试直接写：

- Limit $dv/dt$。
- Limit $di/dt$。
- Clamp voltage spike。
- Damp ringing。
- Provide a path for inductive current。
- Keep switch trajectory inside SOA。

Snubber 通常会增加损耗。它不是提高效率的东西，是保护和抑制 EMI 的东西。

## 感性负载关断

电感电流不能突变。开关突然关断时，电感会抬高电压，直到电流有路可走。

用这个公式：

$$
v_L=L\frac{di}{dt}
$$

所以：

$$
\frac{di}{dt}=\frac{v_L}{L}
$$

若题目问 current falls from $I$ to 0 in time $\Delta t$：

$$
v_L=L\frac{I}{\Delta t}
$$

## 常见 snubber / clamp 怎么选

| 场景 | 写什么 | 作用 |
|---|---|---|
| DC relay / inductive load | Freewheel diode across load | 给电感电流续流路径，限制关断过压 |
| Switch voltage spike | RCD clamp 或 TVS/Zener clamp | 限制 switch peak voltage |
| LC ringing | Series RC snubber across switch/diode | damping，降低振铃 |
| Turn-off $dv/dt$ 太大 | RC/RCD voltage snubber | 让 switch voltage 上升慢一点 |
| Turn-on $di/dt$ 太大 | series inductor / current snubber | 限制电流上升速度 |

画图时必须标出电流路径。只画一个 R 或 C 不够。

## Ringing frequency

由 stray inductance 和 parasitic capacitance 形成：

$$
f_r=\frac{1}{2\pi\sqrt{LC}}
$$

单位先换：nH、pF 都要换成 H、F。

例如题目给 $L=800\,\mathrm{nH}$，$C=300\,\mathrm{pF}$：

$$
f_r=\frac{1}{2\pi\sqrt{800\times10^{-9}\cdot300\times10^{-12}}}
$$

## Snubber resistor power

若题目给 resistor 上近似电流波形，按题目波形算平均功率。

常见快速估算：

- resistor 电流近似恒定 $I$、只在一段 duty 内流过：

$$
P_R\approx I^2RD
$$

- 每次吸收电感能量：

$$
E_L=\frac12LI^2
$$

$$
P\approx E_Lf_s
$$

- 每次 capacitor 充放电：

$$
E_C=\frac12CV^2
$$

$$
P\approx E_Cf_s
$$

题目若给指定公式，按题目公式。

## 2022 Q4 这种计算怎么排版

```text
1. snubber purpose: limit overvoltage/ringing, protect switch.
2. resistor power: use I^2R with correct waveform/duty, or E f_s if energy per cycle is given.
3. di/dt: di/dt = V/L.
4. switch voltage: supply/clamp/reflected voltage + spike,按题图极性相加。
5. ringing: f = 1/(2πsqrt(LC)).
```

## Flyback isolation

题目出现这些词，优先答 flyback：

- isolated DC-DC。
- galvanic isolation。
- input range can be below or above output。
- low/medium power SMPS。

Flyback 是 buck-boost 思路加 transformer / coupled inductor。

理想关系常写：

$$
\frac{V_o}{V_{in}}=\frac{N_s}{N_p}\frac{D}{1-D}
$$

实际符号看 dot convention 和 diode 方向。考试一般写幅值即可。

Switch on：primary magnetising inductance 储能，secondary diode 通常 off。

Switch off：primary 电流转到 secondary，secondary diode on，能量送到输出。

## Flyback switch stress

关断时 MOSFET 看到：

$$
V_{DS,off}\approx V_{in}+\frac{N_p}{N_s}(V_o+V_D)+V_{spike}
$$

$V_{spike}$ 来自 leakage inductance，所以 flyback 常配 RCD clamp / snubber。

## 别丢分

- Snubber 不是主 converter 拓扑。
- 感性负载一定要给电流路径。
- RC snubber 通常是 series R-C branch，不是单独电容短路。
- $f_r$ 公式别漏 $2\pi$ 和平方根。
- Snubber power 别漏 switching frequency。
- Flyback 有 isolation 和 turns ratio；普通 buck-boost 没有 isolation。
- Flyback transformer 不是普通同时传能 transformer；它靠 magnetising inductance 先储能再放能。
