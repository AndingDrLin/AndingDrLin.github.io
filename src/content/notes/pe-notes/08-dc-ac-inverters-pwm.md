---
title: "第8章 DC-AC Inverters and PWM"
description: "从全桥开关状态讲起，整理 PWM、三相线电压和 shoot-through 题。"
date: 2026-05-17
tags: [power-electronics, 电力电子]
category: "课程学习"
docGroup: "power-electronic-notes"
order: 8
draft: false
---
## 先讲清楚

Inverter 的任务是把 DC 变成 AC。它不是连续调电压，而是用开关把 DC bus 电压按某种规律接到负载上。

Full bridge 有两条桥臂。每条桥臂上管和下管不能同时导通，否则 DC link 会被短路。这叫 shoot-through。

PWM 的基本想法：用 sinusoidal reference 和 triangular carrier 比较，比较结果决定开关开关。

## $m_a$ 和 $m_f$

Amplitude modulation index：

$$
m_a=\frac{\hat V_{control}}{\hat V_{tri}}
$$

它主要控制基波幅值。

Frequency modulation index：

$$
m_f=\frac{f_{carrier}}{f_{control}}
$$

它决定 switching harmonics 出现在哪些频率附近。

$m_f$ 大，谐波更高频，更容易滤掉，但 switching loss 也会变大。

![PWM and SPWM comparator](./assets/pwm_spwm.svg)

## Full bridge 输出状态

![Full-bridge inverter states](./assets/inverter_states.svg)

Full bridge 可以输出：

- $+V_d$
- $-V_d$
- 0（unipolar PWM 时会出现）

## Bipolar PWM

Bipolar PWM 只有两个输出电平：$+V_d$ 和 $-V_d$。

常见规则：

| 条件 | 开关状态 | 输出 |
|---|---|---|
| $v_{control}>v_{tri}$ | 一组对角开关 ON | $+V_d$ |
| $v_{control}<v_{tri}$ | 另一组对角开关 ON | $-V_d$ |

优点：控制简单。

缺点：输出电压每次在 $+V_d$ 和 $-V_d$ 间跳，谐波较重。

## Unipolar PWM

Unipolar PWM 每个桥臂单独调制。

A leg 用 $v_{ref}$ 和 carrier 比较。B leg 用 $-v_{ref}$ 和 carrier 比较。

| 桥臂 | 条件 | 上管 | 下管 |
|---|---|---|---|
| A leg | $v_{ref}>v_{tri}$ | ON | OFF |
| A leg | $v_{ref}<v_{tri}$ | OFF | ON |
| B leg | $-v_{ref}>v_{tri}$ | ON | OFF |
| B leg | $-v_{ref}<v_{tri}$ | OFF | ON |

输出：

$$
v_o=v_A-v_B
$$

所以输出可以是 $+V_d$、0、$-V_d$。

Unipolar 的谐波更好，但控制更复杂。

## 例题 1：判断 PWM 类型

题目问：想降低 harmonics，又不改变 DC input voltage，single-phase full bridge 选哪种 PWM？

答案：选 unipolar PWM。

理由：

- 输出有 $+V_d$、0、$-V_d$ 三个电平。
- 等效 switching frequency 更高。
- 输出电压跳变小，滤波更容易。
- 缺点是控制逻辑比 bipolar 复杂。

## Comparator circuit 怎么画

考试不要求画漂亮电路，但要画清逻辑：

```text
sin reference ─┐
               ├─ comparator ─ gate signal for A upper
triangle ──────┘

inverted sin reference ─┐
                        ├─ comparator ─ gate signal for B upper
triangle ───────────────┘

lower gates = complementary signals with dead time
```

## SPWM 基波幅值

Full-bridge bipolar SPWM 在线性区：

$$
\hat V_{o1}\approx m_aV_d
$$

$$
V_{o1,rms}\approx\frac{m_aV_d}{\sqrt2}
$$

Half-bridge 要减半。题目问 total RMS、fundamental peak、fundamental RMS 时要看清楚。

## Three-phase inverter

三相 inverter 有 A、B、C 三个桥臂。考试常给每个桥臂上管是否导通，让你算 line voltage。

先列 pole voltage，再相减：

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

每个 60° 区间都这样算。

## Square-wave mode

Square-wave mode 就是开关按方波切换，不用 carrier 比较。

优点：控制简单，DC bus 利用率高，switching loss 可能低。

缺点：low-order harmonics 大，电机里会带来 torque ripple、heating 和 noise。

## Shoot-through

Shoot-through 是同一桥臂上管和下管同时导通，DC link 被短路。

防止方法：

- complementary gate signals。
- dead time / blanking time。
- gate driver interlock。
- protection circuit。

## 固定套路

PWM / inverter 题按这几步：

```text
1. 判断 single-phase 还是 three-phase
2. 判断 bipolar、unipolar、square-wave 还是 SPWM
3. 写 comparator rule
4. 写 switch state
5. 算 output voltage 或 line voltage
6. 解释 harmonics / shoot-through / phase sequence
```

## 别丢分

- Bipolar 没有 0 电平。
- Unipolar 是两桥臂分别调制，不是简单对角互补。
- $m_a$ 用 peak/peak，不用 RMS。
- $m_f=f_{carrier}/f_{control}$。
- Three-phase line voltage 要相减。
- 同一桥臂上下管不能同时 ON。
- 改相序：交换任意两相 gate/reference。
