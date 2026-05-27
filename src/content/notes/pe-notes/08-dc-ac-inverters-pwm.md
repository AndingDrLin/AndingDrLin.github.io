---
title: "第8章 DC-AC Inverters and PWM"
description: "整理 DC-AC inverter、half/full bridge、三相逆变、PWM/SPWM 与调制指标。"
date: 2026-05-17
tags: [power-electronics, 电力电子]
category: "课程学习"
docGroup: "power-electronic-notes"
order: 8
draft: false
---
## 考试要会什么

- 区分 **half-bridge inverter**、**full-bridge inverter**、**three-phase inverter** 的输出电压等级。
- 会解释 PWM / SPWM 的 comparator control mechanism。
- 会用 $m_a$、$m_f$ 计算或描述 low-frequency output component。
- 会说明 square-wave mode、overmodulation 的优缺点。
- 会根据 three-phase switching states 写 line voltage：$v_{AB}$、$v_{BC}$、$v_{CA}$。
- 会评价 inverter harmonics 对 motor drive 的影响。

## 一句话记忆

**Inverter 题先问清楚题目要的是 power circuit、control comparator，还是 output waveform；PWM 低频分量看 $m_a$，高频 harmonics 通常可忽略或只需说明。**

## 核心原理：DC link 通过开关状态变成 AC

DC-AC inverter 本质是用 fully-controllable switches 把 DC link 电压按一定 switching pattern 施加到负载上。考试中最常见的控制方式是比较 reference/control signal 与 triangular carrier。

![PWM and SPWM comparator](./assets/pwm_spwm.svg)

PWM comparator rule 常写成：

$$
v_{control}>v_{tri}\Rightarrow \text{upper switch on}
$$

实际题中若给了相反逻辑，以题图开关标注为准。

## 1. Half-bridge inverter

### 考试要会什么

- 知道输出在 $+V_d/2$ 和 $-V_d/2$ 之间切换。
- 会说明同一桥臂上下开关不能同时导通，需要 dead time / blanking time。

### 必背公式

Square-wave total RMS：

$$
V_{o,\mathrm{rms}}=\frac{V_d}{2}
$$

若输出是理想 bipolar square wave $\pm V_d/2$，其 fundamental peak 为：

$$
\hat V_{1}=\frac{4}{\pi}\frac{V_d}{2}=\frac{2V_d}{\pi}
$$

### 高频错误

- 把 half-bridge 输出幅值写成 $\pm V_d$。
- 忘记 split DC capacitors 或 midpoint reference。
- 只画开关状态，不说明 shoot-through 风险。

## 2. Full-bridge single-phase inverter

![Full-bridge inverter states](./assets/inverter_states.svg)

### 考试要会什么

- Full bridge 输出可在 $+V_d$、$-V_d$ 之间切换，unipolar PWM 还可出现 0 电平。
- 会比较 bipolar PWM 与 unipolar PWM。
- 会计算 SPWM 线性区的 low-frequency output。

### 必背公式

Full-bridge square-wave total RMS：

$$
V_{o,\mathrm{rms}}=V_d
$$

Full-bridge square-wave fundamental peak：

$$
\hat V_1=\frac{4V_d}{\pi}
$$

SPWM modulation indices：

$$
m_a=\frac{\hat V_{control}}{\hat V_{tri}}
$$

$$
m_f=\frac{f_s}{f_1}
$$

Full-bridge bipolar SPWM 线性区常用 low-frequency component：

$$
\hat V_{o1}\approx m_a V_d
$$

$$
V_{o1,\mathrm{rms}}\approx \frac{m_a V_d}{\sqrt{2}}
$$

这个公式用于 **full-bridge bipolar output voltage**。如果题图是 half-bridge，输出电压等级通常减半；如果题目问的是 switching waveform total RMS、fundamental peak、fundamental RMS 或 average output，要先确认目标量再代入。

**注意**：$\hat V_{o1} = m_a V_d$ 只用于 **full-bridge bipolar output voltage**。如果是 half-bridge，输出幅值减半。

考试先问自己三件事：
1. 是 half-bridge 还是 full-bridge？
2. 题目要 total RMS、fundamental peak、fundamental RMS，还是 average output？
3. 是 square-wave、linear SPWM、overmodulation，还是 constant control？

### Bipolar PWM vs Unipolar PWM

| 项目 | Bipolar PWM | Unipolar PWM |
|---|---|---|
| 输出电平 | $+V_d$ 与 $-V_d$ | $+V_d$、0、$-V_d$ |
| 控制 | 两个 diagonal switch pairs 交替 | 两个桥臂分别调制 |
| 谐波 | 输出跳变大，harmonics 较重 | 等效 switching frequency 更高，滤波更容易 |
| 易错点 | 不要把它画成 0 电平 | 不要让同一桥臂上下开关同时导通 |

## 3. PWM / SPWM / overmodulation / square-wave

### 考试要会什么

- 给 $v_{control}=m_a\sin(2\pi f_1t)$ 和 carrier 幅值，求 $m_a$。
- 忽略 high-frequency harmonics 时，只保留 low-frequency fundamental。
- 当 $m_a>1$ 或 $m_a\gg1$，说明 overmodulation，最终趋向 square-wave operation。

### 必背关系

Linear SPWM 区：

$$
0\le m_a\le1
$$

$$
f_s=m_f f_1
$$

Overmodulation：

$$
m_a>1
$$

此时 output fundamental 不再与 $m_a$ 线性成正比，波形逐渐接近 square wave。

### Square-wave mode 优缺点

优点：

- 控制简单。
- DC bus 利用率高，fundamental component 较大。
- switching frequency 低，switching loss 可较低。

缺点：

- Low-order harmonics 大。
- 输出滤波更困难。
- 对 motor drive 可能增加 torque ripple、heating、noise。
- 输出幅值调节不如 SPWM 线性方便。

### Constant control signal 模板

若题目给 constant $v_{control}=kV_{tri,peak}$，且 carrier 是对称三角波 $\pm V_{tri,peak}$、comparator 逻辑为 $v_{control}>v_{tri}$ 时，先求 duty：

$$
D=\frac{1+k}{2}
$$

Full-bridge bipolar PWM 的 average output 可写为：

$$
\overline v_o=(2D-1)V_d=kV_d
$$

若题图定义不同，按题图逻辑修正符号。

## 4. Three-phase inverter and six-step line voltage

### 考试要会什么

- 三个桥臂互差 $120^\circ$。
- 每个桥臂上下开关互补，不能同臂直通。
- Line voltage 是两个 leg voltages 相减，不是单个 phase voltage。

### 基本关系

若三相桥臂相对 DC negative 的 pole voltage 为 $v_A$、$v_B$、$v_C$：

$$
v_{AB}=v_A-v_B
$$

$$
v_{BC}=v_B-v_C
$$

$$
v_{CA}=v_C-v_A
$$

Six-step line voltage 只会出现：

$$
+V_d,\quad 0,\quad -V_d
$$

### Six-step line voltage：确定算法

不要背模糊表格，用下面算法逐步推导 line voltage：

#### 步骤

1. 根据 switching sequence 写每个 leg 的电压：
   - 上管导通 → 该 leg voltage = $V_d$（或按题图定义）
   - 下管导通 → 该 leg voltage = $0$
2. 列 $v_A, v_B, v_C$
3. 用 $v_{AB} = v_A - v_B$、$v_{BC} = v_B - v_C$、$v_{CA} = v_C - v_A$ 逐个相减

#### 完整 60° 区间例子

假设 switching state：A high、B low、C high

| 量 | 值 |
|---|---|
| $v_A$ | $V_d$ |
| $v_B$ | $0$ |
| $v_C$ | $V_d$ |
| $v_{AB} = v_A - v_B$ | $+V_d$ |
| $v_{BC} = v_B - v_C$ | $-V_d$ |
| $v_{CA} = v_C - v_A$ | $0$ |

每个 60° 区间按此方法算，得到完整的 six-step line voltage waveform。

**考试要点**：画 line voltage 时标清每个 60° 区间的值（$+V_d, 0, -V_d$），不要跳步骤。

### Three-phase PWM 的 $m_f$ 选择

常见原则：

$$
m_f=\frac{f_s}{f_1}
$$

三相 SPWM 中，$m_f$ 常选为 odd multiple of 3，以帮助 line voltage 中 dominant harmonics cancellation。

## Motor harmonics：答题短句

- Low-order voltage harmonics 会产生 harmonic currents。
- Harmonic currents 会导致 copper loss、heating、torque ripple 和 acoustic noise。
- 高频 PWM harmonics 通常更容易用 motor inductance 滤掉。
- SPWM 比 square-wave 更适合要求平滑 torque 和速度控制的 motor drive。

## 做题步骤

1. 判断 topology：half bridge、full bridge、three-phase。
2. 判断 switching mode：square-wave、PWM、SPWM、overmodulation。
3. 写 $m_a$、$m_f$，确认是否在线性区。
4. 单相 full-bridge：用 $\hat V_{o1}\approx m_aV_d$ 求 low-frequency output。
5. Constant control：先求 duty，再求 average output。
6. Three-phase：先列各 leg voltage，再相减得 line voltage。
7. 最后用一句话评价 harmonics 和 filtering/motor effect。

## 高频错误

- 题目问 control mechanism，却画成不同 switch state 下的功率电路。
- 把 bipolar PWM 和 unipolar PWM 混淆。
- $m_a\gg1$ 时仍使用线性公式 $\hat V_{o1}=m_aV_d$。
- 忽略题目要求 “neglect high-frequency harmonics”，答案保留一堆 carrier harmonics。
- Three-phase 题只画 phase voltage，不画 line voltage。

## Past paper 连接

- **2017 Q5**：single-phase PWM inverter，给 $v_{control}=m_a\sin(2\pi ft)$，要求忽略高频谐波并解释 square-wave mode。
- **2018 Q4(g-i)**：$V_d=100\,\mathrm{V}$，$m_a=0.5$ 求 low-frequency output；$m_a\gg1$ 解释 overmodulation/square-wave；constant $v_{control}=0.6\,\mathrm{V}$ 求 average output。
- **Feedback Q4**：重点提醒 power circuit 与 control mechanism 不要画错，bipolar/unipolar switching 要分清。

## 补充：Half-bridge vs Full-bridge 电压速查

| 拓扑 | Square-wave output | SPWM fundamental peak | SPWM fundamental RMS |
|---|---|---|---|
| Half-bridge | $\pm V_d/2$ | $m_a V_d / 2$ | $m_a V_d / (2\sqrt{2})$ |
| Full-bridge (bipolar) | $\pm V_d$ | $m_a V_d$ | $m_a V_d / \sqrt{2}$ |

**Common error**：把 half-bridge 的电压当 full-bridge 用，结果偏大一倍。

$m_a = \hat V_{\mathrm{control}} / \hat V_{\mathrm{tri}}$（peak 比 peak，不是 RMS，也不是 peak-to-peak）。
