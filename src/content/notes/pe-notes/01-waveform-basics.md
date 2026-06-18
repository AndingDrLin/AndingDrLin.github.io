---
title: "第1章 波形计算：Average、RMS、Form Factor"
description: "从面积和平方积分讲起，整理期末波形题的固定做法。"
date: 2026-05-17
tags: [power-electronics, 电力电子]
category: "课程学习"
docGroup: "power-electronic-notes"
order: 1
draft: false
---
## 先讲清楚

电力电子里很多电压、电流不是稳定直流，而是一段一段变化的波形。考试问 average、RMS、form factor，其实是在问三个不同问题。

**Average** 看一个周期里的净效果。正面积和负面积会抵消。

**RMS** 看发热效果。先平方，所以负半周也会产生正的贡献。

**Form factor** 看波形有多“尖”。它通常用 RMS 除以整流后的平均值。

## 三个公式

Average：

$$
X_{avg}=\frac{1}{T}\int_0^T x(t)\,dt
$$

RMS：

$$
X_{rms}=\sqrt{\frac{1}{T}\int_0^T x^2(t)\,dt}
$$

Form factor：

$$
\mathrm{FF}=\frac{X_{rms}}{X_{avg,rectified}}
$$

这里 $T$ 是完整周期。$X_{avg,rectified}$ 是 $|x(t)|$ 的平均值，不一定等于普通 average。

## 为什么 RMS 要平方

电阻发热功率是：

$$
p(t)=i^2(t)R
$$

所以电流为负时，$i^2(t)$ 仍然是正的。RMS 就是把一个变化电流换成“发热效果相同”的直流电流。

考试里只要看到 resistor power、MOSFET conduction loss、heating，就用 RMS。

## 常见波形

| 波形 | Average | RMS |
|---|---|---|
| duty 为 $D$、幅值为 $X_m$ 的矩形脉冲 | $DX_m$ | $X_m\sqrt D$ |
| $0$ 到 $X_m$ 的线性斜坡，占满周期 | $X_m/2$ | $X_m/\sqrt3$ |
| $I_1$ 到 $I_2$ 的线性斜坡，占满周期 | $(I_1+I_2)/2$ | $\sqrt{(I_1^2+I_1I_2+I_2^2)/3}$ |
| half-wave rectified sine | $\hat V/\pi$ | $\hat V/2$ |
| full-wave rectified sine | $2\hat V/\pi$ | $\hat V/\sqrt2$ |

线性斜坡的平方积分常用：

$$
\int i^2\,dt=\frac{\Delta t}{3}\left(I_1^2+I_1I_2+I_2^2\right)
$$

## 例题 1：矩形脉冲

已知电流在一个周期内有 25% 时间为 $8\,\mathrm{A}$，其余时间为 0。求 average 和 RMS。

已知：

$$
D=0.25,\qquad I_m=8\,\mathrm{A}
$$

Average：

$$
I_{avg}=DI_m=0.25\times8=2\,\mathrm{A}
$$

RMS：

$$
I_{rms}=I_m\sqrt D=8\sqrt{0.25}=4\,\mathrm{A}
$$

注意：RMS 不是 $0.25\times8$。这是最常见的错法。

## 例题 2：线性斜坡

电感电流在一个周期内从 $2\,\mathrm{A}$ 线性升到 $6\,\mathrm{A}$，求 average 和 RMS。

Average：

$$
I_{avg}=\frac{2+6}{2}=4\,\mathrm{A}
$$

RMS：

$$
I_{rms}=\sqrt{\frac{2^2+2\times6+6^2}{3}}
$$

$$
I_{rms}=\sqrt{\frac{52}{3}}=4.16\,\mathrm{A}
$$

RMS 比 average 稍大，因为高电流段对平方更敏感。

## 由电感电流画电感电压

电感公式：

$$
v_L=L\frac{di_L}{dt}
$$

意思很简单：电流变化越快，电感两端电压越大。

固定做法：

1. 把 $i_L(t)$ 按直线段分开。
2. 每段算斜率：$\Delta i/\Delta t$。
3. 每段乘以 $L$。
4. 斜率为正，$v_L$ 为正；斜率为负，$v_L$ 为负；斜率为 0，$v_L=0$。
5. 画出的 $v_L$ 是一段一段的常数电压。

## 例题 3：电感电压

已知 $L=100\,\mu\mathrm{H}$。电感电流在 $10\,\mu\mathrm{s}$ 内从 $1\,\mathrm{A}$ 升到 $3\,\mathrm{A}$。求这段 $v_L$。

斜率：

$$
\frac{di}{dt}=\frac{3-1}{10\times10^{-6}}=2\times10^5\,\mathrm{A/s}
$$

电压：

$$
v_L=100\times10^{-6}\times2\times10^5=20\,\mathrm{V}
$$

所以这一段电感电压是 $+20\,\mathrm{V}$。

## 固定套路

波形题按这几步写：

```text
1. 选完整周期 T
2. 按直线段 / 平台段 / 零段分段
3. Average：有符号面积 / T
4. RMS：平方积分 / T，再开方
5. Form factor：RMS / rectified average
6. 单位写清楚
```

## 别丢分

- RMS 不是 average。
- Pulse 的 RMS 是 $X_m\sqrt D$。
- Form factor 的分母通常是 rectified average。
- 只算导通区间后，最后仍要除以完整周期。
- $\Delta I$ 是 peak-to-peak，求最大最小时用 $\Delta I/2$。
- ms、$\mu$s、ns 一律先换成秒。
