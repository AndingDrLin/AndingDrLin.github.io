---
title: "第8章 DC-AC Inverters and PWM"
description: "期末逆变器题要用的 bipolar/unipolar PWM、three-phase line voltage、six-step table 和 shoot-through。"
date: 2026-05-17
tags: [power-electronics, 电力电子]
category: "课程学习"
docGroup: "power-electronic-notes"
order: 8
draft: false
---
## 会怎么考

- 单相 full bridge：比较 bipolar PWM 和 unipolar PWM。
- 写 switching conditions。
- 画 comparator / carrier / reference signals。
- 解释 $m_a$、$m_f$ 对输出和 harmonics 的影响。
- 三相 inverter：根据 switching state 求 $v_{AB}$、$v_{BC}$、$v_{CA}$。
- 解释 square-wave mode、phase sequence、shoot-through 和 dead time。

## PWM 基本量

Amplitude modulation index：

$$
m_a=\frac{\hat V_{control}}{\hat V_{tri}}
$$

Frequency modulation index：

$$
m_f=\frac{f_{carrier}}{f_{control}}
$$

考试写法：

- $m_a$ 控制基波幅值。
- $m_f$ 决定主要 switching harmonics 的频率位置。
- $m_f$ 大，滤波更容易，但 switching loss 增大。
- $0\le m_a\le1$ 是 linear SPWM 区。
- $m_a>1$ 进入 overmodulation，最后接近 square wave。

![PWM and SPWM comparator](./assets/pwm_spwm.svg)

## Single-phase full bridge

Full bridge 输出端电压可为：

- Bipolar：$+V_d$ 或 $-V_d$。
- Unipolar：$+V_d$、0、$-V_d$。

![Full-bridge inverter states](./assets/inverter_states.svg)

## Bipolar PWM

一个 sinusoidal reference 和 triangular carrier 比较。

常见 switching rule：

| 条件 | ON 的开关 | 输出 |
|---|---|---|
| $v_{control}>v_{tri}$ | $S_1$、$S_4$ | $+V_d$ |
| $v_{control}<v_{tri}$ | $S_2$、$S_3$ | $-V_d$ |

实际开关编号按题图。考试先写 rule，再按题图换名字。

Bipolar 特点：

- 控制简单。
- 输出只在 $+V_d$ 和 $-V_d$ 间跳。
- 电压跳变大，低阶谐波/滤波压力比 unipolar 大。

## Unipolar PWM

两个桥臂分开调制。常用两个 reference：

$$
v_{ref,A}=\hat V_m\sin\omega t
$$

$$
v_{ref,B}=-\hat V_m\sin\omega t
$$

每个桥臂各自和同一个 triangular carrier 比较。

常见 rule：

| 桥臂 | 条件 | 上管 | 下管 |
|---|---|---|---|
| A leg | $v_{ref,A}>v_{tri}$ | ON | OFF |
| A leg | $v_{ref,A}<v_{tri}$ | OFF | ON |
| B leg | $v_{ref,B}>v_{tri}$ | ON | OFF |
| B leg | $v_{ref,B}<v_{tri}$ | OFF | ON |

输出：

$$
v_o=v_A-v_B
$$

所以会出现 $+V_d$、0、$-V_d$。

Unipolar 特点：

- 等效输出 switching frequency 更高。
- 谐波更容易滤掉。
- 控制比 bipolar 复杂。
- 同一桥臂上下管仍必须互补，必须有 dead time。

## Comparator implementation 题

2025 Q4 这种题，图不用漂亮，但必须有这些块：

```text
sin reference ── comparator ── gate A upper
triangle carrier ─┘

inverted sin reference ─ comparator ─ gate B upper
triangle carrier ───────┘

lower gates = complementary signals with dead time
```

写清：comparator output controls gate signals；同一 leg 上下开关不能同时导通。

## SPWM 输出幅值

Full-bridge bipolar SPWM 在线性区常用：

$$
\hat V_{o1}\approx m_aV_d
$$

$$
V_{o1,rms}\approx\frac{m_aV_d}{\sqrt2}
$$

Half-bridge 要减半：

$$
\hat V_{o1}\approx\frac{m_aV_d}{2}
$$

题目问 total RMS、fundamental peak、fundamental RMS 时要分清，不能混用。

## Square-wave mode

写优点：

- 控制简单。
- DC bus 利用率高。
- switching frequency 低，switching loss 可能低。

写缺点：

- Low-order harmonics 大。
- 输出幅值不能像 SPWM 那样线性调节。
- Motor drive 中会增加 torque ripple、heating、noise。

## Three-phase inverter line voltage

三相题先列 pole voltage，再相减。

若上管 ON：该 leg 为 $V_d$；下管 ON：该 leg 为 0。若题图用 $+V_d/2$、$-V_d/2$，就按题图。

必须写：

$$
v_{AB}=v_A-v_B
$$

$$
v_{BC}=v_B-v_C
$$

$$
v_{CA}=v_C-v_A
$$

例：A high，B low，C high。

| 量 | 值 |
|---|---|
| $v_A$ | $V_d$ |
| $v_B$ | 0 |
| $v_C$ | $V_d$ |
| $v_{AB}$ | $+V_d$ |
| $v_{BC}$ | $-V_d$ |
| $v_{CA}$ | 0 |

每个 60° 区间都这样算。不要背错符号。

## Phase sequence

改变相序最简单：交换任意两相的 gate signals / reference phases。例如交换 B、C，相序 ABC 变成 ACB，电机转向会反。

## Shoot-through

Shoot-through：同一桥臂上管和下管同时导通，DC link 被短路。

防止方法：

- complementary gating。
- dead time / blanking time。
- gate driver interlock。
- hardware protection。

## 别丢分

- Bipolar 没有 0 电平，unipolar 有 0 电平。
- Unipolar 不是简单“对角开关互补”，而是两个桥臂分别比较。
- $m_a$ 用 peak/peak，不用 RMS，不用 peak-to-peak。
- $m_f=f_{carrier}/f_{control}$，别写反。
- Three-phase line voltage 是相减，不是单个 pole voltage。
- 同一桥臂上下管不能同时 ON。
- 题目说 neglect high-frequency harmonics，就只写基波/低频分量。
