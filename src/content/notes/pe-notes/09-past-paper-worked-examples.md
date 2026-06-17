---
title: "第9章 真题步骤库：2022–2025"
description: "按 2022–2025 电力电子期末题整理的计算步骤、作图步骤和别丢分项。"
date: 2026-05-17
tags: [power-electronics, 电力电子]
category: "课程学习"
docGroup: "power-electronic-notes"
order: 9
draft: false
---
## 1. Waveform average / RMS / form factor

### 题型识别

题目给一段周期波形，问 average、RMS、form factor。2022、2023、2025 都考过。

### 已知量

- 周期 $T$。
- 每段时间。
- 每段峰值或斜率。

### 要求量

- $X_{avg}$。
- $X_{rms}$。
- Form factor。
- 有时还要由 $i_L$ 画 $v_L$。

### 解题步骤

1. 选完整周期 $T$。
2. 分段写面积。
3. Average：

$$
X_{avg}=\frac{1}{T}\int_0^T x(t)dt
$$

4. RMS：

$$
X_{rms}=\sqrt{\frac{1}{T}\int_0^T x^2(t)dt}
$$

5. Form factor：

$$
\mathrm{FF}=\frac{X_{rms}}{X_{avg,rectified}}
$$

6. 若由电感电流画电压：

$$
v_L=L\frac{di_L}{dt}
$$

每段斜率乘 $L$。

### 别丢分

- RMS 必须平方积分。
- Form factor 分母通常是 rectified average。
- 负半周对 RMS 不抵消。
- 斜率为常数时，$v_L$ 是方波，不是三角波。
- ms、$\mu$s 先换成秒。

---

## 2. Rectifier + PIV + capacitor ripple

### 题型识别

题目给 half-wave、bridge 或 centre-tapped rectifier，问 output waveform、PIV、ripple、capacitance。

### 已知量

- 输入 RMS 或 peak。
- Transformer ratio。
- Diode drop。
- Load resistance/current。
- Capacitor。
- Conduction angle。

### 要求量

- Secondary peak。
- Load voltage waveform。
- PIV。
- Ripple $\Delta V$。
- Required $C$。

### 解题步骤

1. RMS 转 peak：

$$
\hat V=\sqrt2V_{rms}
$$

2. 看拓扑：

| 拓扑 | 导通 diode | Ripple frequency | 常见 PIV |
|---|---|---|---|
| Half-wave | 1 个 | $f_{line}$ | 无 C：$\hat V$；有 C：可到 $2\hat V$ |
| Bridge | 2 个 | $2f_{line}$ | $\hat V$ |
| Centre-tapped | 1 个 | $2f_{line}$ | $2\hat V_{half}$ |

3. 有 diode drop：bridge 减 $2V_F$，其余通常减 $V_F$。
4. Ripple：

$$
\Delta V\approx\frac{I\Delta t}{C}
$$

5. 反求 capacitor：

$$
C\approx\frac{I\Delta t}{\Delta V}
$$

6. Conduction angle 给出时：

$$
\Delta t\approx T_{ripple}-\frac{\theta_c}{360^\circ}T_{ripple}
$$

### 别丢分

- Bridge 每次两个 diode drops。
- Centre-tapped 的 $\hat V_{half}$ 是半绕组 peak。
- Half-wave 50 Hz 的 ripple period 是 20 ms；full-wave/bridge 是 10 ms。
- PIV 是关断 diode 的最大反压，不是输出平均值。
- 有 capacitor 时 diode 只在峰值附近导通。

---

## 3. Regulated power supply design

### 题型识别

2024 Q2 类型：bridge rectifier + capacitor + linear regulator + transformer。

### 已知量

- $V_{out}$、$I_{load}$。
- Regulator dropout。
- Mains tolerance。
- Transformer regulation / efficiency。
- Diode drop。
- Capacitor / conduction angle。
- Current form factor。

### 要求量

- Minimum secondary RMS。
- Regulator worst-case dissipation。
- Capacitor voltage rating。
- Diode PIV rating。
- Transformer VA。

### 解题步骤

1. Regulator input valley：

$$
V_{cap,min}\ge V_{out}+V_{dropout}
$$

2. 加 ripple 得 capacitor peak：

$$
V_{cap,peak}\approx V_{cap,min}+\Delta V
$$

3. Bridge 前 secondary peak：

$$
\hat V_{sec}\approx V_{cap,peak}+2V_F
$$

4. 转 RMS：

$$
V_{sec,rms}=\frac{\hat V_{sec}}{\sqrt2}
$$

5. Worst-case regulator power：

$$
P_{reg}=(V_{in,reg}-V_{out})I_{load}
$$

6. Transformer VA：

$$
VA=V_{sec,rms}I_{sec,rms}
$$

若给 form factor：

$$
I_{sec,rms}=\mathrm{FF}\cdot I_{dc}
$$

### 别丢分

- Minimum secondary 看 low mains / regulation。
- Regulator worst-case dissipation 通常看 high input。
- Capacitor voltage rating 看 high mains/no load peak。
- Bridge PIV 通常按 secondary peak 估，不按 DC average。
- Transformer VA 用 RMS current，不用 DC load current 直接代。

---

## 4. SCR firing angle average / RMS

### 题型识别

题目给 SCR、firing angle $\alpha$、R load，问 waveform、average、RMS、power。

### 已知量

- 输入 peak 或 RMS。
- $\alpha$。
- Load resistance。

### 要求量

- Output waveform。
- $V_{avg}$。
- $V_{rms}$。
- Load power。

### 解题步骤

1. RMS 转 peak，或确认题目给的是 peak。
2. 写导通区间：$\alpha$ 到 $\pi$。
3. Half-wave SCR average：

$$
V_{avg}=\frac{\hat V_m}{2\pi}(1+\cos\alpha)
$$

4. RMS：

$$
V_{rms}=\hat V_m\sqrt{\frac{1}{2\pi}\left(\frac{\pi-\alpha}{2}+\frac{\sin2\alpha}{4}\right)}
$$

5. Power：

$$
P=\frac{V_{rms}^2}{R}
$$

### 别丢分

- $\alpha$ 从自然过零点量。
- 角度代公式前换弧度。
- Power 用 RMS。
- Gate 只能 turn on，不能 turn off。
- Full bridge continuous-current 公式 $2\hat V_m\cos\alpha/\pi$ 不能套到 half-wave R load。

---

## 5. MOSFET / diode loss

### 题型识别

题目给 diode 或 MOSFET 的电流波形、frequency、voltage、switching time，问 loss。

### 已知量

- Current waveform。
- $R_{DS(on)}$。
- $V_{DS}$ 或 $V_R$。
- Switching times。
- $Q_{RR}$。
- $f_s$。

### 要求量

- $I_{avg}$。
- $I_{rms}$。
- Diode loss。
- MOSFET conduction/switching/total loss。

### 解题步骤

Diode：

$$
P_F\approx V_FI_{avg}
$$

$$
P_{RR}=Q_{RR}V_Rf_s
$$

MOSFET：

1. 分段积分求 $I_{avg}$ 和 $I_{rms}$。
2. Conduction loss：

$$
P_{cond}=I_{rms}^2R_{DS(on)}
$$

3. Switching loss：

$$
P_{sw}=\frac{f_sV_{DS,off}}{2}(t_{on}I_{on}+t_{off}I_{off})
$$

4. Total：

$$
P_{tot}=P_{cond}+P_{sw}
$$

### 别丢分

- MOSFET conduction loss 用 RMS。
- Reverse recovery 用 blocking voltage $V_R$。
- Switching loss 的 current 是 switching instant 的 current。
- ns、$\mu$s 要换成 seconds。
- 降低 frequency 主要降低 switching loss，不直接降低 conduction loss。

---

## 6. Thermal / shared heatsink

### 题型识别

题目给器件损耗和 thermal resistance，问 heatsink/case/junction temperature 或 heatsink rating。

### 已知量

- $P$ 或多个 $P_i$。
- $T_A$。
- $R_{\theta JC}$、$R_{\theta CS}$、$R_{\theta SA}$。
- $T_{J,max}$。

### 要求量

- $T_S$、$T_C$、$T_J$。
- Required $R_{\theta SA}$。
- safe / unsafe。

### 解题步骤

单个器件：

$$
T_J=T_A+P(R_{\theta JC}+R_{\theta CS}+R_{\theta SA})
$$

反推 heatsink：

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

- Thermal 用 device loss，不用 load power。
- Shared heatsink 的 sink temperature 用总功耗。
- 每个 junction temperature 单独算。
- $R_{\theta SA}$ 越小越好。
- 最后写 safe / unsafe。

---

## 7. Snubber calculation

### 题型识别

题目给感性负载、snubber、stray $L$、parasitic $C$、switching frequency，问作用、画图或计算。

### 已知量

- $L$、$C$。
- Current。
- Voltage。
- Resistor。
- $f_s$。

### 要求量

- Snubber purpose。
- $di/dt$。
- Ringing frequency。
- Resistor power。
- Switch voltage stress。

### 解题步骤

1. 作用先写：limit $dv/dt$、$di/dt$、voltage spike、ringing。
2. 感性电流：

$$
\frac{di}{dt}=\frac{v_L}{L}
$$

3. Ringing：

$$
f_r=\frac{1}{2\pi\sqrt{LC}}
$$

4. Energy method：

$$
E_L=\frac12LI^2
$$

$$
P\approx E_Lf_s
$$

5. 若用 resistor current：

$$
P_R\approx I_{rms}^2R
$$

### 别丢分

- nH、pF 要换成 H、F。
- $f_r$ 别漏 $2\pi$。
- Snubber 不是主 power converter。
- 画图要标电流路径。
- Snubber loss 要乘 switching frequency。

---

## 8. Buck / Boost / boundary CCM / Flyback

### 题型识别

题目给 DC-DC converter，问 topology、duty、ripple、waveforms、boundary inductance、isolation choice。

### 已知量

- $V_{in}$、$V_o$。
- $P_o$ 或 $I_o$。
- $f_s$、$L$。
- Turns ratio。

### 要求量

- $D$、$T_{on}$。
- $v_L$ on/off。
- $\Delta i_L$。
- $I_{L,max/min}$。
- Boundary $L$。
- Converter choice。

### 解题步骤

Buck：

$$
V_o=DV_{in},\qquad \Delta i_L=\frac{(V_{in}-V_o)D}{Lf_s}
$$

$$
I_{L,avg}=I_o
$$

Boost：

$$
V_o=\frac{V_{in}}{1-D},\qquad \Delta i_L=\frac{V_{in}D}{Lf_s}
$$

$$
I_{L,avg}=I_{in}=\frac{V_oI_o}{V_{in}}
$$

Boundary CCM：

$$
I_{L,min}=0,\qquad \Delta I_L=2I_{L,avg}
$$

Flyback isolation：

$$
\frac{V_o}{V_{in}}=\frac{N_s}{N_p}\frac{D}{1-D}
$$

### 别丢分

- Boost 的 $I_L$ 平均值不是 $I_o$。
- $\Delta i_L$ 是 peak-to-peak。
- $I_{max/min}=I_{avg}\pm\Delta i_L/2$。
- Boundary CCM 用 $\Delta I=2I_{avg}$。
- 需要 isolation 时选 flyback，不选普通 buck-boost。

---

## 9. Inverter / PWM truth table

### 题型识别

题目给 full bridge 或 three-phase inverter，问 PWM 类型、switching condition、line voltage、$m_a$、$m_f$、shoot-through。

### 已知量

- $V_d$。
- Carrier/reference。
- Switching state。
- $m_a$、$m_f$ 或频率。

### 要求量

- Bipolar/unipolar switching rule。
- Output levels。
- Line voltage table。
- Harmonics explanation。
- Shoot-through prevention。

### 解题步骤

Bipolar full bridge：

| 条件 | 输出 |
|---|---|
| $v_{control}>v_{tri}$ | $+V_d$ |
| $v_{control}<v_{tri}$ | $-V_d$ |

Unipolar full bridge：

- A leg 用 $v_{ref}$ 比较 carrier。
- B leg 用 $-v_{ref}$ 比较 carrier。
- 输出 $+V_d,0,-V_d$。

Three-phase：

$$
v_{AB}=v_A-v_B
$$

$$
v_{BC}=v_B-v_C
$$

$$
v_{CA}=v_C-v_A
$$

$m_a$、$m_f$：

$$
m_a=\frac{\hat V_{control}}{\hat V_{tri}},\qquad m_f=\frac{f_{carrier}}{f_{control}}
$$

### 别丢分

- Bipolar 没有 0 电平。
- Unipolar 两个桥臂分别调制。
- $m_a$ 用 peak，不用 RMS。
- Line voltage 要相减。
- 同一桥臂上下管不能同时导通，要 dead time。
- 改相序：交换任意两相 gate/reference。

---

## 交卷前检查

- 单位有没有写。
- peak、RMS、average 有没有混。
- ripple period 是 half-wave 还是 full-wave。
- diode drop 是一个还是两个。
- PIV 是否按关断 diode 算。
- thermal 是否用 device loss。
- shared heatsink 是否用总功耗算 $T_S$。
- $D$ 是否在 0 到 1。
- $I_{max/min}$ 是否用 $\Delta I/2$。
- PWM truth table 有没有 shoot-through。
