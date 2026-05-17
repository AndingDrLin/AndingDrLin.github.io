---
title: "第7章 DC-DC Converters：Buck / Boost / Buck-Boost / Flyback"
description: "整理 Buck、Boost、Buck-Boost 和 Flyback 在 CCM 下的转换比、电感纹波和电流计算。"
date: 2026-05-17
tags: [power-electronics, 电力电子]
category: "课程学习"
docGroup: "power-electronic-notes"
order: 7
draft: false
---
## 考试要会什么

- 用 **volt-second balance** 推导 CCM 下的 conversion ratio。
- 对 Buck、Boost、Inverting Buck-Boost 求 $D$、$v_L$、$\Delta i_L$、$I_{L,\mathrm{avg}}$、$I_{L,\min}$、$I_{L,\max}$。
- 判断 input current 是连续还是脉冲，并用 power balance 求平均输入电流。
- 画出 $v_L$ 方波、$i_L$ 三角波、必要时画 $i_{in}$。
- 需要 isolation 时选择 **Flyback converter**，不要把普通 buck-boost 当隔离型电源。

## 一句话记忆

**稳态电感平均电压为零：先写 on/off 两段 $v_L$，再令正负面积相等；所有 ripple 都从 $v_L=L\,di_L/dt$ 来。**

## 核心原理：CCM 固定五步法

以下 Buck、Boost、Buck-Boost 公式默认 **ideal converter、CCM、稳态、忽略 switch/diode voltage drop 和损耗**。若题目说明 DCM 或非理想压降，不能直接套这些 conversion ratio。

1. 写 duty cycle：$D=t_{\mathrm{on}}/T$，$f_s=1/T$。
2. 写 on/off 两段 inductor voltage。
3. 用 volt-second balance：

$$
\int_0^T v_L(t)\,dt=0
$$

4. 用斜率求 peak-to-peak ripple：

$$
\Delta i_L=\frac{v_L\Delta t}{L}
$$

5. 先求 $I_{L,\mathrm{avg}}$，再求：

$$
I_{L,\max}=I_{L,\mathrm{avg}}+\frac{\Delta i_L}{2}
$$

$$
I_{L,\min}=I_{L,\mathrm{avg}}-\frac{\Delta i_L}{2}
$$

CCM 条件常用检查：$I_{L,\min}>0$。

## 1. Buck converter（step-down, CCM）

![Buck converter waveforms](./assets/buck_waveforms.svg)

### 考试要会什么

- 推导 $V_o=DV_{in}$。
- 求 on/off 时 $v_L$、$di_L/dt$、$\Delta i_L$。
- 知道 Buck 的 inductor current 约等于 output current。

### 必背公式

On state：switch on, diode off。

$$
v_L=V_{in}-V_o
$$

Off state：switch off, diode on。

$$
v_L=-V_o
$$

Volt-second balance：

$$
(V_{in}-V_o)DT+(-V_o)(1-D)T=0
$$

$$
V_o=DV_{in}
$$

Inductor ripple：

$$
\Delta i_L=\frac{(V_{in}-V_o)D}{Lf_s}
$$

Average currents：

$$
I_{L,\mathrm{avg}}\approx I_o=\frac{V_o}{R}
$$

$$
I_{in,\mathrm{avg}}\approx D I_{L,\mathrm{avg}}=\frac{V_o I_o}{V_{in}}
$$

### 图像/波形要点

- $v_L$：on 时为 $V_{in}-V_o$，off 时为 $-V_o$。
- $i_L$：连续三角波；on 上升，off 下降。
- $i_{in}$：switch on 时近似为 $i_L$，switch off 时约为 0，所以是 pulsed input current。

### 做题步骤模板

1. 由 $V_o=DV_{in}$ 求 $D$。
2. 写两段 $v_L$，并标在图上。
3. 用 $\Delta i_L=(V_{in}-V_o)D/(Lf_s)$。
4. 用 $I_{L,\mathrm{avg}}\approx I_o$。
5. 用 $I_{L,\max/\min}=I_{L,\mathrm{avg}}\pm\Delta i_L/2$。

### 高频错误

- 把 $\Delta i_L$ 当成半个 ripple 加减，导致 $I_{\max}$ 和 $I_{\min}$ 错一倍。
- 只写 $V_o=DV_{in}$，没有用 volt-second balance 推导。
- 忘记 $i_{in}$ 是脉冲，不是连续电感电流。

## 2. Boost converter（step-up, CCM）

![Boost converter waveforms](./assets/boost_waveforms.svg)

### 考试要会什么

2018 Q4 高概率套路：给 $V_{in}$、$V_o$、$I_o$、$L$、$f_s$，求 duty、input current、$v_L$、$I_{L,\min}$、$I_{L,\max}$ 并画波形。

### 必背公式

On state：switch on, diode off, inductor charging。

$$
v_L=V_{in}
$$

Off state：switch off, diode on, inductor delivers energy to output。

$$
v_L=V_{in}-V_o
$$

Volt-second balance：

$$
V_{in}DT+(V_{in}-V_o)(1-D)T=0
$$

$$
V_o=\frac{V_{in}}{1-D}
$$

$$
D=1-\frac{V_{in}}{V_o}
$$

Inductor ripple：

$$
\Delta i_L=\frac{V_{in}D}{Lf_s}
$$

Average currents：

$$
I_{in,\mathrm{avg}}=I_{L,\mathrm{avg}}=\frac{V_o I_o}{V_{in}}
$$

$$
I_o=(1-D)I_{L,\mathrm{avg}}
$$

### 图像/波形要点

- $v_L$：on 时 $+V_{in}$，off 时 $V_{in}-V_o$，通常为负。
- $i_L$：输入侧连续，因此 boost input current 连续。
- 输出电容在 switch on 时给负载供电，boost output current 不是电感电流本身。

### 做题步骤模板

1. 由 $D=1-V_{in}/V_o$ 求 duty。
2. 用 power balance 求 $I_{in}$：$I_{in}=V_oI_o/V_{in}$。
3. 令 $I_{L,\mathrm{avg}}=I_{in}$。
4. 用 $\Delta i_L=V_{in}D/(Lf_s)$。
5. 求 $I_{L,\max}$、$I_{L,\min}$ 并检查 $I_{L,\min}>0$。

### 高频错误

- 把 boost 写成 $V_o=DV_{in}$。
- 认为 $I_{L,\mathrm{avg}}=I_o$；boost 中应为 $I_{L,\mathrm{avg}}=I_{in}$。
- off-state 的 $v_L$ 符号写反；若 $V_o>V_{in}$，$V_{in}-V_o$ 是负值。

## 3. Inverting Buck-Boost converter（CCM）

![Inverting buck-boost converter waveforms](./assets/buck_boost_waveforms.svg)

### 考试要会什么

2017 Q4 典型：由 $5\,\mathrm{V}$ 产生 $12\,\mathrm{V}$、$0.5\,\mathrm{A}$ 输出，$f_s=50\,\mathrm{kHz}$，$L=100\,\mu\mathrm{H}$；求 $D$、$I_{in}$、$v_L$、$I_L$ 最大最小，并画 $i_L/i_{in}/v_L$。

### 必背公式

输出极性与输入相反：

$$
V_o=-\frac{D}{1-D}V_{in}
$$

考试计算常用 magnitude：

$$
|V_o|=\frac{D}{1-D}V_{in}
$$

$$
D=\frac{|V_o|}{V_{in}+|V_o|}
$$

On state：switch on, diode off, inductor charging。

$$
v_L=V_{in}
$$

Off state：switch off, diode on, inductor discharging to output。按常用电感参考方向：

$$
v_L=-|V_o|
$$

Inductor ripple：

$$
\Delta i_L=\frac{V_{in}D}{Lf_s}
$$

Average currents：

$$
I_o=(1-D)I_{L,\mathrm{avg}}
$$

$$
I_{L,\mathrm{avg}}=\frac{I_o}{1-D}
$$

$$
I_{in,\mathrm{avg}}=D I_{L,\mathrm{avg}}=\frac{|V_o|I_o}{V_{in}}
$$

### 图像/波形要点

- $i_L$：连续三角波，on 储能、off 放能。
- $i_{in}$：只在 switch on 时存在，是 pulsed input current。
- 输出极性反相，图和答案中要明确写 **inverting** 或负号。

### 做题步骤模板

1. 先用 magnitude 求 $D=|V_o|/(V_{in}+|V_o|)$。
2. 用 power balance 求 $I_{in}=|V_o|I_o/V_{in}$。
3. 用 $I_{L,\mathrm{avg}}=I_o/(1-D)$。
4. 写 $v_L$：on 为 $V_{in}$，off 为 $-|V_o|$。
5. 用 $\Delta i_L=V_{in}D/(Lf_s)$。
6. 求 $I_{L,\max}$、$I_{L,\min}$，并画带数值的三角波。

### 高频错误

- 忘记输出电压为负，或者没有说明自己在用 $|V_o|$。
- 把 $I_{L,\mathrm{avg}}$ 写成 $I_o$。
- $I_{in}$ 忘记是平均输入电流，不是电感平均电流。
- 波形只画形状，不标 on/off 电压和关键电流数值。

## 4. Flyback converter 选择提示

### 考试要会什么

当题目问 “which converter should be selected if electrical isolation is required?”，优先答 **Flyback converter**，并说明它 derived from buck-boost but uses a transformer/coupled inductor。

### 必背公式

理想 flyback 的幅值关系：

$$
\frac{V_o}{V_{in}}=\frac{N_s}{N_p}\frac{D}{1-D}
$$

关断时 primary reflected voltage 常用：

$$
V_R=\frac{N_p}{N_s}(V_o+V_D)
$$

### 一句话区别

- Buck-Boost：non-isolated，输出反相。
- Flyback：isolated，可通过 turns ratio 改变增益，适合小到中功率隔离电源。

## Past paper 连接

- **2017 Q4 Buck-Boost**：重点练 $D$、$I_{in}$、$I_{L,\mathrm{avg}}$、$I_{L,\min/\max}$ 和三张波形。
- **2018 Q4 Boost**：重点练 $D=1-V_{in}/V_o$、$I_{L,\mathrm{avg}}=I_{in}$、off-state $v_L=V_{in}-V_o$。
- **Feedback Q3**：老师明确指出 buck 推导步骤不足、$\Delta i_L/2$ 用错、需要 isolation 时应选 Flyback。
