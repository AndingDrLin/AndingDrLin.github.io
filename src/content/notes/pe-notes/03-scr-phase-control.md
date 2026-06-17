---
title: "第3章 SCR / Thyristor 相控题"
description: "期末 SCR 题要用的 half-controllable、firing angle、导通区间、average/RMS 和 back-to-back SCR。"
date: 2026-05-17
tags: [power-electronics, 电力电子]
category: "课程学习"
docGroup: "power-electronic-notes"
order: 3
draft: false
---
## 会怎么考

- 解释 SCR 为什么是 half-controllable。
- 画 firing angle $\alpha$ 后的输出波形。
- half-wave SCR：求 $V_{avg}$、$V_{rms}$、load power。
- back-to-back SCR：画 AC load current，说明小功率/大功率对应的 firing angle。
- SCR bridge / DC motor：写 average output voltage 和适用条件。
- 问普通 SCR 为什么不适合纯 DC 自然关断。

## SCR 原理题

标准写法：

- SCR forward biased 后，加 gate pulse 可以 turn on。
- Turn on 后 gate 失去控制。
- 关断要靠 anode current 降到 holding current 以下。
- 所以 SCR 是 half-controllable，不是 fully-controllable。

纯 DC 问题：

- DC 电流没有自然过零。
- SCR latch on 后 gate 不能 turn off。
- 需要 forced commutation；普通电路里不方便。

## Half-wave SCR with R load

输入：

$$
v_s(\theta)=\hat V_m\sin\theta
$$

导通区间：

$$
\alpha\le\theta\le\pi
$$

完整周期仍是 $2\pi$。负半周 SCR 反向偏置，输出为 0。

### Average

$$
V_{avg}=\frac{1}{2\pi}\int_{\alpha}^{\pi}\hat V_m\sin\theta\,d\theta
$$

$$
V_{avg}=\frac{\hat V_m}{2\pi}(1+\cos\alpha)
$$

### RMS

$$
V_{rms}=\sqrt{\frac{1}{2\pi}\int_{\alpha}^{\pi}\hat V_m^2\sin^2\theta\,d\theta}
$$

$$
V_{rms}=\hat V_m\sqrt{\frac{1}{2\pi}\left(\frac{\pi-\alpha}{2}+\frac{\sin2\alpha}{4}\right)}
$$

Load power：

$$
P=\frac{V_{rms}^2}{R}
$$

不要用 $V_{avg}^2/R$ 算电阻功率。

## 画 firing angle 波形

板书步骤：

1. 画输入正弦。
2. 从自然过零点量 $\alpha$，不是从峰值量。
3. $0$ 到 $\alpha$：输出 0。
4. $\alpha$ 到 $\pi$：输出跟随正弦。
5. $\pi$ 到 $2\pi$：输出 0。
6. 标 $\alpha$、$\hat V_m$、$0$、$\pi$、$2\pi$。

## Back-to-back SCR AC controller

两个 SCR 反并联，一个管正半周，一个管负半周。

考试写法：

- Positive half-cycle：正向 SCR 从 $\alpha$ 导通到电流过零。
- Negative half-cycle：反向 SCR 从该半周的 $\alpha$ 导通到电流过零。
- $\alpha$ 小，导通时间长，平均功率大。
- $\alpha$ 大，导通时间短，平均功率小。

图上至少标两个东西：每半周的 $\alpha$，以及 load current 的正负半周导通区间。

## SCR bridge / DC motor

题目若说明单相 fully-controlled bridge，且 DC motor / large inductance 使电流近似连续，常用：

$$
V_{avg}=\frac{2\hat V_m}{\pi}\cos\alpha
$$

适用条件要写一句：continuous current。不要把这个公式套到 single SCR half-wave R load。

边界检查：

- $\alpha=0$：平均输出最大。
- $\alpha=90^\circ$：平均输出为 0。
- $\alpha>90^\circ$：公式给负平均值，表示可能进入逆变/再生区；是否允许看题目条件。

## 输入 RMS 转峰值

$$
\hat V_m=\sqrt2 V_{AC,rms}
$$

题目若写 $10\sin(100\pi t)$，10 已经是峰值，不要再乘 $\sqrt2$。

## 别丢分

- $\alpha$ 用角度给出时，代入三角积分前换成弧度。
- half-wave SCR 积分分母是 $2\pi$。
- SCR gate 不能 turn off。
- AC controller 要画 back-to-back SCR，不是一个 SCR。
- R load 的 power 用 RMS。
- Waveform 必须标 $\alpha$、peak、zero line 和时间/角度轴。
- Half-wave R load 公式和 fully controlled bridge continuous-current 公式不要混用。
