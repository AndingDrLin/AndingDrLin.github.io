---
title: "第9章 真题步骤库：从题目到板书"
description: "把 2022–2025 常见题型整理成可套用的解题步骤，并标出易错点。"
date: 2026-05-17
tags: [power-electronics, 电力电子]
category: "课程学习"
docGroup: "power-electronic-notes"
order: 9
draft: false
---
## 这个章节怎么用

前面章节负责讲懂概念。这里负责把题目变成板书步骤。

做题时不要背整段话，只要记住每类题的顺序：先判断题型，再列已知量，再写公式，最后代入和检查单位。

## 1. Waveform average / RMS / form factor

### 题目长什么样

给一段周期波形，问 average、RMS、form factor。波形可能是三角波、锯齿波、矩形脉冲或分段线性电流。

### 板书步骤

```text
1. 写周期 T
2. 把波形分段
3. Average = 有符号面积 / T
4. RMS = sqrt(平方积分 / T)
5. Form factor = RMS / rectified average
```

公式：

$$
X_{avg}=\frac{1}{T}\int_0^T x(t)dt
$$

$$
X_{rms}=\sqrt{\frac{1}{T}\int_0^T x^2(t)dt}
$$

### 别丢分

- RMS 先平方。
- Form factor 分母一般不是 ordinary average。
- 分段后要除以完整周期。

## 2. Rectifier + PIV + ripple

### 题目长什么样

给 half-wave、bridge、centre-tapped rectifier，问 output waveform、PIV、ripple 或 capacitor。

### 板书步骤

```text
1. RMS 转 peak
2. 判断 rectifier topology
3. 写导通 diode 数
4. 画 load voltage
5. 按关断 diode 算 PIV
6. 有 capacitor：ΔV = IΔt/C
```

常用表：

| 拓扑 | Diode drops | Ripple frequency | PIV |
|---|---|---|---|
| Half-wave | 1 | $f_{line}$ | 无 C 约 $\hat V$，有 C 可到 $2\hat V$ |
| Bridge | 2 | $2f_{line}$ | $\hat V$ |
| Centre-tapped | 1 | $2f_{line}$ | $2\hat V_{half}$ |

### 别丢分

- Bridge 有两个 diode drops。
- Centre-tapped 的 PIV 看半绕组 peak。
- Half-wave 50 Hz 的 ripple period 是 20 ms，full-wave 是 10 ms。

## 3. Regulated supply design

### 题目长什么样

给 linear regulator、bridge rectifier、capacitor、transformer，问 secondary voltage、regulator dissipation、capacitor rating、PIV、VA。

### 板书步骤

从输出往前推：

$$
V_{cap,min}\ge V_{out}+V_{dropout}
$$

$$
V_{cap,peak}\approx V_{cap,min}+\Delta V
$$

$$
\hat V_{sec}\approx V_{cap,peak}+2V_F
$$

$$
V_{sec,rms}=\frac{\hat V_{sec}}{\sqrt2}
$$

Regulator loss：

$$
P_{reg}=(V_{in,reg}-V_{out})I_{load}
$$

Transformer VA：

$$
VA=V_{sec,rms}I_{sec,rms}
$$

### 别丢分

- Minimum secondary 看低电网输入。
- Regulator worst-case heat 看高输入。
- Capacitor voltage rating 看最高 peak，不看输出 DC。
- VA 用 RMS current。

## 4. SCR firing angle

### 题目长什么样

给 SCR、$\alpha$、R load，问 output waveform、average、RMS、power。

### 板书步骤

```text
1. RMS 转 peak，或确认给的是 peak
2. 标 alpha，从自然过零点量
3. 写导通区间 alpha 到 pi
4. Average 积分
5. RMS 积分
6. Power 用 RMS
```

Half-wave R load：

$$
V_{avg}=\frac{\hat V_m}{2\pi}(1+\cos\alpha)
$$

$$
V_{rms}=\hat V_m\sqrt{\frac{1}{2\pi}\left(\frac{\pi-\alpha}{2}+\frac{\sin2\alpha}{4}\right)}
$$

$$
P=\frac{V_{rms}^2}{R}
$$

### 别丢分

- $\alpha$ 要换弧度。
- Gate 不能 turn off。
- 半波 R load 不要套 bridge continuous-current 公式。

## 5. MOSFET / diode loss

### 题目长什么样

给 current waveform、$R_{DS(on)}$、switching time、frequency、diode $Q_{RR}$，问 loss。

### 板书步骤

Diode：

$$
P_F\approx V_FI_{avg}
$$

$$
P_{RR}=Q_{RR}V_Rf_s
$$

MOSFET：

```text
1. 从 waveform 求 I_avg
2. 从 waveform 求 I_rms
3. P_cond = I_rms^2 R_DS(on)
4. P_sw = 1/2 V I t f_s
5. P_total = P_cond + P_sw
```

### 别丢分

- Conduction loss 用 RMS。
- Switching loss 用开关瞬间电流。
- Reverse recovery 用 $V_R$。
- 单位要换：ns、$\mu$s、m$\Omega$。

## 6. Thermal / shared heatsink

### 题目长什么样

给 loss 和 thermal resistance，问 temperature 或 heatsink rating。

### 板书步骤

单个器件：

$$
T_J=T_A+P(R_{\theta JC}+R_{\theta CS}+R_{\theta SA})
$$

选 heatsink：

$$
R_{\theta SA}\le\frac{T_{J,max}-T_A}{P}-R_{\theta JC}-R_{\theta CS}
$$

Shared heatsink：

$$
T_S=T_A+(P_1+P_2+\cdots)R_{\theta SA}
$$

$$
T_{J,k}=T_S+P_k(R_{\theta CS,k}+R_{\theta JC,k})
$$

### 别丢分

- Thermal 用 device loss。
- Shared heatsink 的 $T_S$ 用总功耗。
- 每个 $T_J$ 单独算。
- 最后写 safe / unsafe。

## 7. Snubber calculation

### 题目长什么样

给 inductive load、snubber、stray $L$、capacitance $C$，问作用、画图、$di/dt$、ringing frequency、power。

### 板书步骤

```text
1. 写 snubber purpose
2. 画 transient current path
3. di/dt = v_L/L
4. f_r = 1/(2πsqrt(LC))
5. Power = E f_s 或 I_rms^2 R
```

公式：

$$
f_r=\frac{1}{2\pi\sqrt{LC}}
$$

$$
E_L=\frac12LI^2
$$

### 别丢分

- nH、pF 先换单位。
- $2\pi$ 和平方根不能漏。
- Snubber 不是主 converter。
- 画图要画能量路径。

## 8. Buck / Boost / boundary CCM / Flyback

### 题目长什么样

给 converter 图和参数，问 duty、ripple、$I_{max/min}$、waveforms、boundary condition、isolation converter。

### 板书步骤

```text
1. Identify topology
2. Switch ON: write v_L,on
3. Switch OFF: write v_L,off
4. D v_on + (1-D) v_off = 0
5. Δi_L = v_L Δt/L
6. I_max/min = I_avg ± Δi/2
```

Buck：

$$
V_o=DV_{in},\qquad I_{L,avg}=I_o
$$

Boost：

$$
V_o=\frac{V_{in}}{1-D},\qquad I_{L,avg}=I_{in}
$$

Boundary CCM：

$$
I_{L,min}=0,\qquad \Delta I_L=2I_{L,avg}
$$

Flyback：

$$
\frac{V_o}{V_{in}}=\frac{N_s}{N_p}\frac{D}{1-D}
$$

### 别丢分

- Boost 的电感平均电流不是输出电流。
- $\Delta i_L$ 是 peak-to-peak。
- Boundary CCM 用 $2I_{avg}$。
- Isolation 题选 flyback。

## 9. Inverter / PWM

### 题目长什么样

给 full bridge 或 three-phase inverter，问 bipolar/unipolar PWM、switching condition、line voltage、$m_a$、$m_f$、shoot-through。

### 板书步骤

```text
1. 判断 topology：single-phase or three-phase
2. 判断 switching：bipolar / unipolar / square-wave / SPWM
3. 写 comparator rule
4. 写 switch state
5. 算 output voltage 或 line voltage
6. 写 harmonics 或 shoot-through 解释
```

Three-phase line voltage：

$$
v_{AB}=v_A-v_B
$$

$$
v_{BC}=v_B-v_C
$$

$$
v_{CA}=v_C-v_A
$$

Modulation indices：

$$
m_a=\frac{\hat V_{control}}{\hat V_{tri}},\qquad m_f=\frac{f_{carrier}}{f_{control}}
$$

### 别丢分

- Bipolar 没有 0 电平，unipolar 有 0 电平。
- Line voltage 要相减。
- $m_a$ 用 peak，不用 RMS。
- 同一桥臂上下管不能同时导通。

## 交卷前检查

- 所有答案有没有单位。
- peak、RMS、average 有没有混。
- diode drop 是一个还是两个。
- PIV 是否按关断 diode 算。
- thermal 是否用 device loss。
- duty 是否在 0 到 1。
- $I_{max/min}$ 是否用了 $\Delta I/2$。
- PWM truth table 有没有 shoot-through。
