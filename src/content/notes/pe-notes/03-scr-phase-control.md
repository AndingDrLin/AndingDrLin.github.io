---
title: "第3章 SCR / Thyristor Phase Control"
description: "整理 SCR/thyristor 相控整流的触发角、导通区间、平均值、RMS 与功率计算。"
date: 2026-05-17
tags: [power-electronics, 电力电子]
category: "课程学习"
docGroup: "power-electronic-notes"
order: 3
draft: false
---
## 考试要会什么

SCR 题通常和 rectifier 放在一起考。你需要会：

- 解释 SCR / thyristor 为什么是 half-controllable switch；
- 说明为什么 SCR 不适合 pure DC turn-off；
- 画 firing angle $\alpha$ 后的输出波形；
- 计算 half-wave SCR 的 $V_{DC}$、$V_{\mathrm{rms}}$ 和 resistor power；
- 区分 firing angle $\alpha$ 与 duty cycle $D$。

## 一句话记忆

**SCR gate 只能决定什么时候开始导通，不能决定什么时候关断；关断靠电流自然降到 holding current 以下。**

## 核心原理

SCR 是 silicon controlled rectifier，也叫 thyristor。它有三个端子：anode、cathode、gate。

导通条件：

1. Anode 对 cathode 正向偏置。
2. Gate 给触发脉冲。
3. 导通后，即使 gate pulse 消失，SCR 仍保持导通。

关断条件：

- 电流自然下降到 holding current 以下。
- 在 AC 电路中，电流每半周过零，所以 SCR 可以自然关断。
- 在 pure DC 电路中，电流不自然过零，所以普通 SCR 一旦导通就难以靠 gate 关断。

Phase control 的核心是延迟触发。对 half-wave SCR with R load，输入为：

$$
v_s(\theta)=\hat V_m\sin\theta
$$

当 $0<\theta<\alpha$ 时，SCR 未触发，输出为 $0$。当 $\alpha<\theta<\pi$ 时，SCR 导通，输出跟随正弦。负半周 SCR 反向偏置，输出为 $0$。

## 必背公式

Half-wave SCR，R load，理想器件，$0\le\alpha\le\pi$：

$$
V_{DC}=\frac{\hat V_m}{2\pi}(1+\cos\alpha)
$$

$$
V_{\mathrm{rms}}=\hat V_m\sqrt{\frac{1}{2\pi}\left(\frac{\pi-\alpha}{2}+\frac{\sin 2\alpha}{4}\right)}
$$

等价平方形式：

$$
V_{\mathrm{rms}}^2=\frac{\hat V_m^2}{4\pi}\left(\pi-\alpha+\frac{\sin 2\alpha}{2}\right)
$$

Resistive load current：

$$
I_{DC}=\frac{V_{DC}}{R}
$$

$$
I_{\mathrm{rms}}=\frac{V_{\mathrm{rms}}}{R}
$$

Load power：

$$
P=\frac{V_{\mathrm{rms}}^2}{R}=I_{\mathrm{rms}}^2R
$$

注意：power 必须用 RMS，不用 $V_{DC}^2/R$。

Full-wave / bridge controlled rectifier 要先判断工作条件，不能乱套一个公式：

| 情况 | 平均输出公式 | 适用条件 |
|---|---|---|
| Full-wave R load，每半周从 $\alpha$ 到 $\pi$ 导通 | $V_{DC}=\dfrac{\hat V_m}{\pi}(1+\cos\alpha)$ | 两个半周整流成正脉冲，电流不连续也可用分段积分 |
| Fully controlled bridge，continuous current | $V_{DC}=\dfrac{2\hat V_m}{\pi}\cos\alpha$ | 电感足够大、电流近似连续；$\alpha>90^\circ$ 时平均值可能为负 |

若题目只给单个 SCR half-wave circuit，就用本章 half-wave 公式；若题图是 bridge 或 back-to-back SCR，一定先画每半周导通区间再选公式。

输入 RMS 转峰值：

$$
\hat V_m=\sqrt{2}V_{AC,\mathrm{rms}}
$$

## 图像/波形/拓扑

![SCR firing angle](./assets/scr_firing_angle.svg)

图中要记住：

1. $\alpha$ 从正半周自然过零点开始量，不是从峰值开始。
2. $0$ 到 $\alpha$：SCR forward-biased 但还没 gate trigger，输出为 $0$。
3. $\alpha$ 到 $\pi$：SCR 导通，输出为正弦片段。
4. $\pi$ 后：电流过零，SCR natural commutation，自然关断。

## 做题步骤

### A. 解释 half-controllable

标准答法：

- SCR can be turned on by a gate pulse when it is forward biased。
- After turn-on, the gate loses control。
- It turns off only when anode current falls below holding current。
- Therefore it is half-controllable, not fully-controllable。

如果题目问 why not suitable for pure DC：

- Pure DC current does not naturally cross zero。
- Once SCR is latched on, gate cannot turn it off。
- Extra commutation circuit would be needed。

### B. 画 half-wave SCR waveform

1. 画 $v_s=\hat V_m\sin\theta$ 的正半周。
2. 从 $\theta=0$ 到 $\theta=\alpha$ 输出为 $0$。
3. 从 $\theta=\alpha$ 到 $\theta=\pi$ 输出跟随 sine。
4. 从 $\theta=\pi$ 到 $2\pi$ 输出为 $0$。
5. 标出 $\alpha$、$\hat V_m$、$0$、$\pi$、$2\pi$ 和 time / angle axis。

### C. 计算 average / RMS / power

1. 先把角度转弧度：

$$
\alpha_{rad}=\alpha_{deg}\frac{\pi}{180^\circ}
$$

2. 写导通区间：$\alpha$ 到 $\pi$。
3. Average：

$$
V_{DC}=\frac{1}{2\pi}\int_{\alpha}^{\pi}\hat V_m\sin\theta\,d\theta
$$

结果：

$$
V_{DC}=\frac{\hat V_m}{2\pi}(1+\cos\alpha)
$$

4. RMS：

$$
V_{\mathrm{rms}}=\sqrt{\frac{1}{2\pi}\int_{\alpha}^{\pi}\hat V_m^2\sin^2\theta\,d\theta}
$$

5. Power：

$$
P=\frac{V_{\mathrm{rms}}^2}{R}
$$

### D. Back-to-back SCR for AC load

考试或 feedback 中常见错误是把 AC load control 画成一个 SCR 或画成 DC source。正确想法：两个 SCR anti-parallel，一个负责 positive half-cycle，另一个负责 negative half-cycle；每个半周都从该半周的自然过零点延迟 $\alpha$ 后触发。

高分句：**A back-to-back SCR pair controls an AC resistive load by delaying conduction in each half-cycle; the devices turn off naturally when the load current crosses zero.**

### E. 快速自检

- 当 $\alpha=0$，SCR half-wave 应退化为 diode half-wave rectifier：

$$
V_{DC}=\frac{\hat V_m}{\pi}
$$

$$
V_{\mathrm{rms}}=\frac{\hat V_m}{2}
$$

- 当 $\alpha=\pi$，不导通：

$$
V_{DC}=0
$$

$$
V_{\mathrm{rms}}=0
$$

如果你的结果不满足这两个边界，大概率公式或积分区间错了。

## 高频错误

- 把 SCR 当 fully-controllable switch，说 gate 可以 turn off。
- 把 firing angle $\alpha$ 画成从峰值开始，正确是从自然过零点开始。
- Half-wave SCR 的积分分母写成 $\pi$，正确完整周期是 $2\pi$。
- 忘记把 $30^\circ$ 转成 $\pi/6$。
- 用 average voltage 计算 resistor power，正确应使用 RMS。
- 波形不标 peak voltage、$\alpha$、time axis 或角度单位。
- 把 duty cycle $D$ 和 firing angle $\alpha$ 混用；$D$ 是 on-time ratio，$\alpha$ 是触发延迟角。

## Past paper 连接

- **2017 Q2(c)**：diode 换成 SCR，$\alpha=30^\circ$，要求解释 half-controllable、说明 pure DC 问题、画 firing delay waveform、计算 average / RMS。
- **2018 Q2 SCR(a)**：输入 $10\sin(100\pi t)$，$\alpha=30^\circ$，画 half-wave SCR 输出，必须标 $10\,\mathrm{V}$ peak 和 delay angle。
- **2018 Q2 SCR(b)**：用 half-wave SCR RMS 算 load power，不能用 average voltage。
- **Homework / feedback**：back-to-back SCR 用于 AC load phase control；每个半周都要延迟触发，不能只画一个普通开关。

## 补充：SCR 公式适用条件

| 拓扑 | 负载 | 平均输出 | 适用条件 |
|---|---|---|---|
| Half-wave SCR | R load | $V_{DC} = \frac{\hat V_m}{2\pi}(1+\cos\alpha)$ | 每半周从 $\alpha$ 到 $\pi$ 导通，积分周期 $2\pi$ |
| Full-wave SCR (R load) | R load | $V_{DC} = \frac{\hat V_m}{\pi}(1+\cos\alpha)$ | 两个半周对称导通，输出整流成正脉冲 |
| Fully controlled bridge | L load（电流连续） | $V_{DC} = \frac{2\hat V_m}{\pi}\cos\alpha$ | 电感足够大、电流近似连续；$\alpha > 90°$ 进入逆变区 |

**考试陷阱**：Full-wave R load ≠ fully controlled bridge continuous current。前者分母有 $(1+\cos\alpha)$，后者是 $\cos\alpha$。如果题目说明 R load 且电流不连续，用前者。

## 补充：Back-to-back SCR for AC load

Feedback 高频扣分点：

- Anti-parallel SCR pair 控制正负两个半周
- 每个 SCR 负责一个半周
- Firing delay 从每个 natural zero crossing 开始量
- 必须标 $\alpha$、peak voltage、time axis

画图最少要画：AC source → back-to-back SCR → resistive load，标两个 $\alpha$ 和导通区间。
