---
title: "第1章 波形计算：Average、RMS、Form Factor"
description: "期末波形题要用的分段 average、RMS、form factor 和电感电压反推。"
date: 2026-05-17
tags: [power-electronics, 电力电子]
category: "课程学习"
docGroup: "power-electronic-notes"
order: 1
draft: false
---
## 会怎么考

- 给一段周期波形，求 average。
- 给同一段波形，求 RMS。
- 求 form factor。
- 给 $i_L(t)$，画或推 $v_L(t)$。
- 波形可能是三角波、锯齿波、整流波、带平台的分段线性波。

## 分段 average

先选完整周期 $T$，再分段。不要只拿导通区间当周期。

$$
X_{avg}=\frac{1}{T}\int_0^T x(t)\,dt
$$

板书写法：

```text
周期：T = ...
分段：0 ~ t1, t1 ~ t2, ...
Average = (每段有符号面积相加) / T
```

负半周面积要带负号。对称交流的 ordinary average 可以是 0。

## 分段 RMS

RMS 先平方，再平均，再开方。

$$
X_{rms}=\sqrt{\frac{1}{T}\int_0^T x^2(t)\,dt}
$$

板书写法：

```text
RMS^2 = (每段 x(t)^2 的积分相加) / T
RMS = sqrt(RMS^2)
```

负值平方后仍贡献热效应。电阻功率、MOSFET conduction loss、heating 都用 RMS。

## Form factor

$$
\mathrm{FF}=\frac{X_{rms}}{X_{avg,rectified}}
$$

这里的分母通常是 $|x(t)|$ 的平均值。普通 average 为 0 时，不能拿 0 做分母。

对称正弦波：

$$
X_{rms}=\frac{\hat X}{\sqrt{2}},\qquad X_{avg,rectified}=\frac{2\hat X}{\pi}
$$

$$
\mathrm{FF}=\frac{\pi}{2\sqrt{2}}\approx1.11
$$

## 线性斜坡常用积分

电流从 $I_1$ 线性变到 $I_2$，持续 $\Delta t$：

$$
\int i\,dt=\frac{I_1+I_2}{2}\Delta t
$$

$$
\int i^2\,dt=\frac{\Delta t}{3}\left(I_1^2+I_1I_2+I_2^2\right)
$$

若这段只占周期的一部分，最后还要除以完整周期 $T$。

## 常见波形怎么下手

| 波形 | Average | RMS |
|---|---|---|
| 幅值 $X_m$、duty $D$ 的矩形脉冲 | $DX_m$ | $X_m\sqrt D$ |
| $0$ 到 $X_m$ 的线性斜坡，占满周期 | $X_m/2$ | $X_m/\sqrt3$ |
| $I_1$ 到 $I_2$ 的线性斜坡，占满周期 | $(I_1+I_2)/2$ | $\sqrt{(I_1^2+I_1I_2+I_2^2)/3}$ |
| half-wave rectified sine | $\hat V/\pi$ | $\hat V/2$ |
| full-wave rectified sine | $2\hat V/\pi$ | $\hat V/\sqrt2$ |

## 整流后的锯齿或三角波

2023 Q1(a) 这种题先画 $|v(t)|$，再积分。

做法：

1. 找原波形周期。
2. 全波整流后，负半周翻到正半周。
3. Average 用整流后面积。
4. RMS 不受符号影响，原波形平方和整流后平方相同。
5. Form factor 用整流后的 average 做分母。

## 由电感电流画电感电压

只用一个公式：

$$
v_L=L\frac{di_L}{dt}
$$

板书步骤：

1. 把 $i_L(t)$ 按斜率分段。
2. 每段算斜率：$\Delta i/\Delta t$。
3. 乘以 $L$ 得 $v_L$。
4. 斜率为正，$v_L$ 为正；斜率为负，$v_L$ 为负；电流平坦，$v_L=0$。
5. 画 $v_L$ 时每段是常数电压，不是三角波。

## 别丢分

- RMS 不是 average。
- Pulse 的 RMS 是 $X_m\sqrt D$，不是 $DX_m$。
- Form factor 的分母看题目要不要 rectified average。
- 角度积分要用弧度。
- 分段积分最后除以完整周期。
- $\Delta I$ 是 peak-to-peak；求最大/最小时用 $\pm\Delta I/2$。
- ms、$\mu$s、ns 先换成秒。
