---
title: "第2章 二极管与整流器"
description: "从二极管单向导通讲起，整理整流、PIV、电容滤波和稳压电源题。"
date: 2026-05-17
tags: [power-electronics, 电力电子]
category: "课程学习"
docGroup: "power-electronic-notes"
order: 2
draft: false
---
## 先讲清楚

二极管(diode)可以近似看成自动开关：正向(forward)偏置时导通，反向(reverse)偏置时关断。整流器(rectifier)就是利用这个单向导通，把交流变成同一方向的电压或电流。

考试里不要一上来背公式。先看两件事：

1. 哪些二极管在这个半周导通？
2. 关断的二极管两端会承受多大反向电压？

第一个问题决定输出波形，第二个问题决定反向峰值电压(PIV)。

## 输入先转峰值(peak)

题目给 RMS 时：

$$
\hat V=\sqrt2 V_{rms}
$$

题目写成 $v_s(t)=10\sin(100\pi t)$ 时，10 已经是峰值，不要再乘 $\sqrt2$。

## 三种整流器

| 拓扑 | 每周期输出脉冲 | 每次导通二极管 | 纹波(ripple)频率 | 常见 PIV |
|---|---|---|---|---|
| 半波(half-wave) | 1 个 | 1 个 | $f_{line}$ | 无电容约 $\hat V$，有电容可到 $2\hat V$ |
| 中心抽头全波(centre-tapped full-wave) | 2 个 | 1 个 | $2f_{line}$ | $2\hat V_{half}$ |
| 桥式整流器(bridge rectifier) | 2 个 | 2 个 | $2f_{line}$ | $\hat V$ |

桥式的缺点是导通路径有两个二极管压降(drop)。中心抽头的缺点是需要中心抽头绕组，而且 PIV 高。

## 输出电压怎么画

半波：正半周输出跟随输入，负半周为 0。

全波 / 桥式：正负半周都翻成同一方向。

有二极管压降时，输出峰值要扣掉导通路径上的二极管压降：

- 半波：扣 $V_F$。
- 中心抽头：扣 $V_F$。
- 桥式：扣 $2V_F$。

## PIV 是什么

PIV 是二极管关断时承受的最大反向电压。

固定做法：

1. 找一只关断二极管。
2. 标出它两端电压极性。
3. 找 source 的最不利峰值。
4. 有电容时，考虑电容电压保持在接近峰值。
5. 写出每只二极管的 PIV。

中心抽头题最容易错：$\hat V_{half}$ 是半边次级(secondary)的峰值。每只二极管的 PIV 常约为 $2\hat V_{half}$。

## 例题 1：桥式整流器 PIV

次级电压是 $20\,\mathrm{V_{rms}}$，桥式整流器(bridge rectifier)，忽略二极管压降。求每只二极管的 PIV。

先转峰值：

$$
\hat V=\sqrt2\times20=28.3\,\mathrm{V}
$$

桥式整流器中每只二极管的 PIV 约为一个次级峰值：

$$
\mathrm{PIV}\approx28.3\,\mathrm{V}
$$

实际选型要留 margin，例如选 50 V 或更高耐压值的二极管。

## 电容平滑(capacitor smoothing)

没有电容(capacitor)时，整流输出是脉动的。有电容时，输入到峰值附近二极管导通，电容充电；峰值过后二极管关断，负载(load)从电容取电，电容电压慢慢下降。

![Rectifier capacitor ripple](./assets/rectifier_ripple.svg)

纹波(ripple)近似：

$$
\Delta V\approx\frac{I_{load}\Delta t}{C}
$$

如果没有给导通角(conduction angle)，可以用：

$$
\Delta V\approx\frac{I_{load}}{f_{ripple}C}
$$

半波的 $f_{ripple}=f_{line}$。全波和桥式的 $f_{ripple}=2f_{line}$。

## 例题 2：纹波

桥式整流器，线路频率 $50\,\mathrm{Hz}$，负载电流 $0.2\,\mathrm{A}$，电容 $1000\,\mu\mathrm{F}$。估算纹波。

桥式是全波：

$$
f_{ripple}=100\,\mathrm{Hz}
$$

电容：

$$
C=1000\,\mu\mathrm{F}=1000\times10^{-6}\,\mathrm{F}
$$

纹波：

$$
\Delta V\approx\frac{0.2}{100\times1000\times10^{-6}}=2\,\mathrm{V}
$$

## 稳压电源题(regulated supply)

这类题把变压器(transformer)、桥式、电容、线性稳压器(regulator)放在一起考。

先从稳压器往前推：

1. 稳压器输入最低点必须高于输出加压差(dropout)：

$$
V_{cap,min}\ge V_{out}+V_{dropout}
$$

2. 电容峰值要比最低点高一个纹波：

$$
V_{cap,peak}\approx V_{cap,min}+\Delta V
$$

3. 桥式前次级峰值要再加两个二极管压降：

$$
\hat V_{sec}\approx V_{cap,peak}+2V_F
$$

4. 峰值转 RMS：

$$
V_{sec,rms}=\frac{\hat V_{sec}}{\sqrt2}
$$

5. 变压器 VA 用 RMS：

$$
VA=V_{sec,rms}I_{sec,rms}
$$

若题目给 current form factor：

$$
I_{sec,rms}=\mathrm{FF}\cdot I_{dc}
$$

## 固定套路

整流器题按这几步：

1. 输入 RMS 转峰值
2. 判断拓扑：半波 / 桥式 / 中心抽头
3. 标导通二极管数和二极管压降
4. 画负载(load)电压
5. 按关断二极管算 PIV
6. 有电容时算纹波或电容值
7. 有稳压器时从压差往前反推

## 别丢分

- 桥式每次两个二极管压降。
- 半波 50 Hz 的纹波周期是 20 ms；全波是 10 ms。
- PIV 是反向电压，不是输出平均值。
- 中心抽头的 PIV 用半边绕组峰值判断。
- $\mu\mathrm{F}$、mF 要换成 F。
- 电容耐压值(voltage rating)看高压电网 / 空载峰值，不只看输出直流。
