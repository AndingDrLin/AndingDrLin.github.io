---
title: "第6章 Snubber and Flyback"
description: "从电感电流不能突变讲起，整理 snubber 保护、数值题和 flyback 隔离。"
date: 2026-05-17
tags: [power-electronics, 电力电子]
category: "课程学习"
docGroup: "power-electronic-notes"
order: 6
draft: false
---
## 先讲清楚

开关感性负载时，最麻烦的是电感电流不能突然变成 0。开关一关断，电感会想办法维持原来的电流。如果没有通路，电压会被抬得很高，可能击穿开关。

Snubber 的作用就是给这些瞬态能量一个受控路径，保护开关。

## Snubber 要解决什么

考试常写这几句：

- limit $dv/dt$。
- limit $di/dt$。
- clamp voltage spike。
- damp ringing。
- provide path for inductive current。
- keep switch inside SOA。

Snubber 会增加损耗。它不是为了提高效率，而是为了保护器件和减小 EMI。

## 感性负载基本公式

电感公式：

$$
v_L=L\frac{di}{dt}
$$

所以：

$$
\frac{di}{dt}=\frac{v_L}{L}
$$

如果电压越大，电流变化越快。关断时电感为了让电流继续流，会产生高电压。

## 常见保护办法

| 场景 | 常用电路 | 作用 |
|---|---|---|
| DC inductive load | Freewheel diode | 给电感电流续流 |
| Switch voltage spike | RCD clamp / TVS | 限制 switch peak voltage |
| LC ringing | Series RC snubber | 阻尼振荡 |
| Turn-off $dv/dt$ 太大 | RC / RCD snubber | 让电压上升慢一点 |
| Turn-on $di/dt$ 太大 | Series inductor | 限制电流上升速度 |

画图时必须画出 transient current path。

## Ringing frequency

寄生电感和寄生电容会形成振铃：

$$
f_r=\frac{1}{2\pi\sqrt{LC}}
$$

$L$ 用 H，$C$ 用 F。nH、pF 要先换单位。

## 例题 1：ringing frequency

已知 stray inductance $L=800\,\mathrm{nH}$，capacitance $C=300\,\mathrm{pF}$。求 ringing frequency。

换单位：

$$
L=800\times10^{-9}\,\mathrm{H}
$$

$$
C=300\times10^{-12}\,\mathrm{F}
$$

代入：

$$
f_r=\frac{1}{2\pi\sqrt{800\times10^{-9}\cdot300\times10^{-12}}}
$$

$$
f_r\approx10.3\,\mathrm{MHz}
$$

## Snubber power 怎么估

如果每次吸收电感能量：

$$
E_L=\frac12LI^2
$$

平均功率：

$$
P\approx E_Lf_s
$$

如果每次 capacitor 充放电：

$$
E_C=\frac12CV^2
$$

$$
P\approx E_Cf_s
$$

如果题目直接给 resistor 电流波形，就用：

$$
P_R=I_{rms}^2R
$$

## Flyback 为什么常用于隔离

普通 buck、boost、buck-boost 都没有 galvanic isolation。题目要求 isolation 时，常选 flyback。

Flyback 可以理解成带 transformer / coupled inductor 的 buck-boost：

- Switch on：primary magnetising inductance 储能。
- Switch off：secondary diode 导通，把能量送到输出。

理想幅值关系：

$$
\frac{V_o}{V_{in}}=\frac{N_s}{N_p}\frac{D}{1-D}
$$

其中 $N_s/N_p$ 是匝比，$D$ 是 duty cycle。

## 例题 2：flyback 选择题

题目：输入 $16$–$32\,\mathrm{V}$，输出隔离 $24\,\mathrm{V}$，选什么 converter？

答案写法：

```text
Choose a flyback converter.
Reason: it provides galvanic isolation through the coupled inductor/transformer, and the output voltage can be controlled by duty cycle and turns ratio.
```

如果题目要求关系式：

$$
V_o=V_{in}\frac{N_s}{N_p}\frac{D}{1-D}
$$

## 固定套路

Snubber 题按这几步：

```text
1. 判断问题：overvoltage、di/dt、dv/dt、ringing 还是 isolation
2. 感性负载先找电流关断路径
3. 计算 di/dt 用 v = L di/dt
4. 计算 ringing 用 f = 1/(2πsqrt(LC))
5. 计算 loss 用 E f_s 或 I_rms^2 R
6. 需要 isolation 就选 flyback
```

## 别丢分

- Snubber 不是主功率变换器。
- 感性负载关断必须给电流路径。
- RC snubber 通常是 series R-C branch。
- $f_r$ 公式别漏 $2\pi$。
- Snubber loss 要乘 switching frequency。
- Flyback 有 isolation，普通 buck-boost 没有。
