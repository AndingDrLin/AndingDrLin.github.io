---
title: "第2章 Diodes 与 Rectifiers"
description: "从二极管单向导通讲起，整理整流、PIV、电容滤波和稳压电源题。"
date: 2026-05-17
tags: [power-electronics, 电力电子]
category: "课程学习"
docGroup: "power-electronic-notes"
order: 2
draft: false
---
## 先讲清楚

二极管可以近似看成自动开关：正向偏置时导通，反向偏置时关断。Rectifier 就是利用这个单向导通，把交流变成同一方向的电压或电流。

考试里不要一上来背公式。先看两件事：

1. 哪些 diode 在这个半周导通？
2. 关断的 diode 两端会承受多大反向电压？

第一个问题决定输出波形，第二个问题决定 PIV。

## 输入先转 peak

题目给 RMS 时：

$$
\hat V=\sqrt2 V_{rms}
$$

题目写成 $v_s(t)=10\sin(100\pi t)$ 时，10 已经是 peak，不要再乘 $\sqrt2$。

## 三种整流器

| 拓扑 | 每周期输出脉冲 | 每次导通 diode | Ripple frequency | 常见 PIV |
|---|---|---|---|---|
| Half-wave | 1 个 | 1 个 | $f_{line}$ | 无电容约 $\hat V$，有电容可到 $2\hat V$ |
| Centre-tapped full-wave | 2 个 | 1 个 | $2f_{line}$ | $2\hat V_{half}$ |
| Bridge rectifier | 2 个 | 2 个 | $2f_{line}$ | $\hat V$ |

Bridge 的缺点是导通路径有两个 diode drop。Centre-tapped 的缺点是需要中心抽头，而且 PIV 高。

## 输出电压怎么画

Half-wave：正半周输出跟随输入，负半周为 0。

Full-wave / bridge：正负半周都翻成同一方向。

有 diode drop 时，输出峰值要扣掉导通路径上的 diode drop：

- Half-wave：扣 $V_F$。
- Centre-tapped：扣 $V_F$。
- Bridge：扣 $2V_F$。

## PIV 是什么

PIV 是 diode 关断时承受的最大反向电压。

固定做法：

1. 找一只关断 diode。
2. 标出它两端电压极性。
3. 找 source 的最不利峰值。
4. 有 capacitor 时，考虑 capacitor 保持在接近峰值。
5. 写 each diode PIV。

Centre-tapped 题最容易错：$\hat V_{half}$ 是半边 secondary 的 peak。每只 diode 的 PIV 常约为 $2\hat V_{half}$。

## 例题 1：Bridge rectifier PIV

Secondary voltage 是 $20\,\mathrm{V_{rms}}$，bridge rectifier，忽略 diode drop。求每只 diode 的 PIV。

先转 peak：

$$
\hat V=\sqrt2\times20=28.3\,\mathrm{V}
$$

Bridge rectifier 中每只 diode 的 PIV 约为一个 secondary peak：

$$
\mathrm{PIV}\approx28.3\,\mathrm{V}
$$

实际选型要留 margin，例如选 50 V 或更高的 diode。

## Capacitor smoothing

没有电容时，整流输出是脉动的。有电容时，输入到峰值附近 diode 导通，电容充电；峰值过后 diode 关断，负载从电容取电，电容电压慢慢下降。

![Rectifier capacitor ripple](./assets/rectifier_ripple.svg)

Ripple 近似：

$$
\Delta V\approx\frac{I_{load}\Delta t}{C}
$$

如果没有给 conduction angle，可以用：

$$
\Delta V\approx\frac{I_{load}}{f_{ripple}C}
$$

Half-wave 的 $f_{ripple}=f_{line}$。Full-wave 和 bridge 的 $f_{ripple}=2f_{line}$。

## 例题 2：ripple

Bridge rectifier，line frequency $50\,\mathrm{Hz}$，load current $0.2\,\mathrm{A}$，capacitor $1000\,\mu\mathrm{F}$。估算 ripple。

Bridge 是 full-wave：

$$
f_{ripple}=100\,\mathrm{Hz}
$$

Capacitor：

$$
C=1000\,\mu\mathrm{F}=1000\times10^{-6}\,\mathrm{F}
$$

Ripple：

$$
\Delta V\approx\frac{0.2}{100\times1000\times10^{-6}}=2\,\mathrm{V}
$$

## Regulated supply 题

这类题把 transformer、bridge、capacitor、linear regulator 放在一起考。

先从 regulator 往前推：

1. Regulator 输入最低点必须高于输出加 dropout：

$$
V_{cap,min}\ge V_{out}+V_{dropout}
$$

2. 电容峰值要比最低点高一个 ripple：

$$
V_{cap,peak}\approx V_{cap,min}+\Delta V
$$

3. Bridge 前 secondary peak 要再加两个 diode drop：

$$
\hat V_{sec}\approx V_{cap,peak}+2V_F
$$

4. Peak 转 RMS：

$$
V_{sec,rms}=\frac{\hat V_{sec}}{\sqrt2}
$$

5. Transformer VA 用 RMS：

$$
VA=V_{sec,rms}I_{sec,rms}
$$

若题目给 current form factor：

$$
I_{sec,rms}=\mathrm{FF}\cdot I_{dc}
$$

## 固定套路

Rectifier 题按这几步：

```text
1. 输入 RMS 转 peak
2. 判断拓扑：half-wave / bridge / centre-tapped
3. 标导通 diode 数和 diode drop
4. 画 load voltage
5. 按关断 diode 算 PIV
6. 有 capacitor 时算 ripple 或 C
7. 有 regulator 时从 dropout 往前反推
```

## 别丢分

- Bridge 每次两个 diode drops。
- Half-wave 50 Hz 的 ripple period 是 20 ms；full-wave 是 10 ms。
- PIV 是反向电压，不是输出平均值。
- Centre-tapped 的 PIV 用半边绕组 peak 判断。
- $\mu\mathrm{F}$、mF 要换成 F。
- Capacitor voltage rating 看 high mains / no-load peak，不只看输出 DC。
