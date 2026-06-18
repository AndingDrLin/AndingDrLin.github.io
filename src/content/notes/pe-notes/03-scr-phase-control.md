---
title: "第3章 SCR / Thyristor 相控题"
description: "从 SCR 半控特性讲起，整理 firing angle 波形、积分和交流调压题。"
date: 2026-05-17
tags: [power-electronics, 电力电子]
category: "课程学习"
docGroup: "power-electronic-notes"
order: 3
draft: false
---
## 先讲清楚

Diode 是不能控的：只要正向偏置，它就自己导通。

SCR 也是单向器件，但多了一个 gate。它不会一正向偏置就自动导通，而是要等 gate pulse。这样就可以把导通时刻往后拖，这个拖后的角度叫 firing angle，记作 $\alpha$。

SCR 的关键点：gate 只能让它 turn on，不能让它 turn off。导通后要等电流降到 holding current 以下才关断。AC 电路有自然过零，所以 SCR 容易关断；纯 DC 没有自然过零，所以普通 SCR 不适合直接关断 DC。

## Half-wave SCR with R load

输入：

$$
v_s(\theta)=\hat V_m\sin\theta
$$

对 R load，SCR 从 $\alpha$ 导通到 $\pi$。负半周反向偏置，输出为 0。

导通区间：

$$
\alpha\le \theta\le \pi
$$

完整周期仍是 $2\pi$。

## Average 推导

$$
V_{avg}=\frac{1}{2\pi}\int_{\alpha}^{\pi}\hat V_m\sin\theta\,d\theta
$$

积分结果：

$$
V_{avg}=\frac{\hat V_m}{2\pi}(1+\cos\alpha)
$$

## RMS 推导

$$
V_{rms}=\sqrt{\frac{1}{2\pi}\int_{\alpha}^{\pi}\hat V_m^2\sin^2\theta\,d\theta}
$$

结果：

$$
V_{rms}=\hat V_m\sqrt{\frac{1}{2\pi}\left(\frac{\pi-\alpha}{2}+\frac{\sin2\alpha}{4}\right)}
$$

电阻功率：

$$
P=\frac{V_{rms}^2}{R}
$$

## 例题 1：half-wave SCR

输入 $v_s=100\sin\theta\,\mathrm{V}$，R load，$\alpha=60^\circ$。求 average。

先把角度换成弧度：

$$
\alpha=\frac{\pi}{3}
$$

代公式：

$$
V_{avg}=\frac{100}{2\pi}\left(1+\cos\frac{\pi}{3}\right)
$$

$$
V_{avg}=\frac{100}{2\pi}(1+0.5)=23.9\,\mathrm{V}
$$

注意：这里不能用 full-wave 的公式。

## 波形怎么画

固定画法：

1. 画输入正弦。
2. 从自然过零点开始量 $\alpha$。
3. $0$ 到 $\alpha$：输出 0。
4. $\alpha$ 到 $\pi$：输出跟随正弦。
5. $\pi$ 到 $2\pi$：输出 0。
6. 标 $\alpha$、$\hat V_m$、0、$\pi$、$2\pi$。

## Back-to-back SCR AC controller

如果要控制 AC load 的正负半周，用两个 SCR 反并联。

- 正半周：一个 SCR 从 $\alpha$ 导通到电流过零。
- 负半周：另一个 SCR 从该半周的 $\alpha$ 导通到电流过零。
- $\alpha$ 小，导通时间长，功率大。
- $\alpha$ 大，导通时间短，功率小。

考试画图时不要只画一个 SCR。要画 anti-parallel pair。

## SCR bridge / DC motor

如果题目是 fully-controlled bridge，且 DC motor 或大电感让电流近似连续，常用：

$$
V_{avg}=\frac{2\hat V_m}{\pi}\cos\alpha
$$

适用条件要写：continuous current。

边界检查：

- $\alpha=0$，平均输出最大。
- $\alpha=90^\circ$，平均输出为 0。
- $\alpha>90^\circ$，公式给负值，是否允许看题目条件。

## 固定套路

SCR 题按这几步：

```text
1. 判断 topology：half-wave / full-wave / bridge / back-to-back
2. 判断 load：R load 还是连续电流
3. 标 firing angle alpha
4. 写导通区间
5. 按导通区间积分 average / RMS
6. power 用 RMS
7. 解释 half-controllable 时写 gate 只能 turn on
```

## 别丢分

- $\alpha$ 从自然过零点量，不是从峰值量。
- 角度代入积分前换成弧度。
- Gate 不能 turn off。
- R load power 用 RMS。
- Half-wave 公式、full-wave R load 公式、bridge continuous-current 公式不要混用。
- Pure DC 中普通 SCR 需要 forced commutation。
