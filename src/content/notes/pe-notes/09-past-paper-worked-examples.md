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

## 1. 波形 average / RMS / form factor

### 题目长什么样

给一段周期波形（waveform），问 average、RMS、form factor。波形可能是三角波、锯齿波、矩形脉冲或分段线性电流。

### 板书步骤

1. 写周期 T
2. 把波形分段
3. Average = 有符号面积 / T
4. RMS = sqrt(平方积分 / T)
5. Form factor = RMS / 整流后平均值（rectified average）

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

## 2. 整流器 + PIV + 纹波

### 题目长什么样

给 half-wave、bridge、centre-tapped 整流器（rectifier），问输出波形、PIV、纹波（ripple）或电容（capacitor）。

### 板书步骤

1. RMS 转峰值（peak）
2. 判断整流器拓扑（topology）
3. 写导通二极管（diode）数
4. 画负载（load）电压
5. 按关断二极管算 PIV
6. 有电容：$\Delta V = I\Delta t/C$

常用表：

| 拓扑 | 二极管压降数 | 纹波频率 | PIV |
|---|---|---|---|
| Half-wave | 1 | $f_{line}$ | 无 C 约 $\hat V$，有 C 可到 $2\hat V$ |
| Bridge | 2 | $2f_{line}$ | $\hat V$ |
| Centre-tapped | 1 | $2f_{line}$ | $2\hat V_{half}$ |

### 别丢分

- Bridge 有两个二极管压降。
- Centre-tapped 的 PIV 看半绕组峰值。
- Half-wave 50 Hz 的纹波周期是 20 ms，full-wave 是 10 ms。

## 3. 稳压电源设计

### 题目长什么样

给线性稳压器（regulator）、桥式整流器、电容、变压器（transformer），问次级（secondary）电压、稳压器功耗、电容额定值、PIV、VA。

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

稳压器损耗：

$$
P_{reg}=(V_{in,reg}-V_{out})I_{load}
$$

变压器 VA：

$$
VA=V_{sec,rms}I_{sec,rms}
$$

### 别丢分

- 最小次级电压看低电网输入。
- 稳压器最坏情况发热看高输入。
- 电容电压额定值看最高峰值，不看输出 DC。
- VA 用 RMS 电流。

## 4. SCR 触发角

### 题目长什么样

给 SCR、$\alpha$、R 负载（load），问输出波形、average、RMS、功率。

### 板书步骤

1. RMS 转峰值，或确认给的是峰值
2. 标 $\alpha$，从自然过零点量
3. 写导通区间 $\alpha$ 到 $\pi$
4. Average 积分
5. RMS 积分
6. Power 用 RMS

Half-wave R 负载：

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
- 半波 R 负载不要套 bridge continuous-current 公式。

## 5. MOSFET / 二极管损耗

### 题目长什么样

给电流波形、$R_{DS(on)}$、开关（switching）时间、频率、二极管 $Q_{RR}$，问损耗。

### 板书步骤

二极管：

$$
P_F\approx V_FI_{avg}
$$

$$
P_{RR}=Q_{RR}V_Rf_s
$$

MOSFET：

1. 从波形求 $I_{avg}$
2. 从波形求 $I_{rms}$
3. $P_{cond} = I_{rms}^2 R_{DS(on)}$
4. $P_{sw} = \frac{1}{2} V I t f_s$
5. $P_{total} = P_{cond} + P_{sw}$

### 别丢分

- 导通损耗（conduction loss）用 RMS。
- 开关损耗用开关瞬间电流。
- 反向恢复用 $V_R$。
- 单位要换：ns、$\mu$s、m$\Omega$。

## 6. 热设计 / 共用散热器

### 题目长什么样

给损耗和热阻（thermal resistance），问温度或散热器（heatsink）额定值。

### 板书步骤

单个器件：

$$
T_J=T_A+P(R_{\theta JC}+R_{\theta CS}+R_{\theta SA})
$$

选散热器：

$$
R_{\theta SA}\le\frac{T_{J,max}-T_A}{P}-R_{\theta JC}-R_{\theta CS}
$$

共用散热器：

$$
T_S=T_A+(P_1+P_2+\cdots)R_{\theta SA}
$$

$$
T_{J,k}=T_S+P_k(R_{\theta CS,k}+R_{\theta JC,k})
$$

### 别丢分

- 热计算用器件损耗。
- 共用散热器的 $T_S$ 用总功耗。
- 每个 $T_J$ 单独算。
- 最后写 safe / unsafe。

## 7. 缓冲电路计算

### 题目长什么样

给感性负载、缓冲电路（snubber）、杂散 $L$、电容 $C$，问作用、画图、$di/dt$、振铃（ringing）频率、功率。

### 板书步骤

1. 写缓冲电路用途
2. 画瞬态电流路径
3. $di/dt = v_L/L$
4. $f_r = 1/(2\pi\sqrt{LC})$
5. $Power = E f_s$ 或 $I_{rms}^2 R$

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
- 缓冲电路不是主变换器（converter）。
- 画图要画能量路径。

## 8. Buck / Boost / 边界 CCM / 反激

### 题目长什么样

给变换器图和参数，问占空比（duty）、纹波、$I_{max/min}$、波形、边界（boundary）条件、隔离（isolation）变换器。

### 板书步骤

1. 判断拓扑
2. 开关导通：写 $v_{L,on}$
3. 开关关断：写 $v_{L,off}$
4. $D v_{on} + (1-D) v_{off} = 0$
5. $\Delta i_L = v_L \Delta t/L$
6. $I_{max/min} = I_{avg} \pm \Delta i/2$

Buck：

$$
V_o=DV_{in},\qquad I_{L,avg}=I_o
$$

Boost：

$$
V_o=\frac{V_{in}}{1-D},\qquad I_{L,avg}=I_{in}
$$

边界 CCM：

$$
I_{L,min}=0,\qquad \Delta I_L=2I_{L,avg}
$$

反激（Flyback）：

$$
\frac{V_o}{V_{in}}=\frac{N_s}{N_p}\frac{D}{1-D}
$$

### 别丢分

- Boost 的电感（inductor）平均电流不是输出电流。
- $\Delta i_L$ 是 peak-to-peak。
- 边界 CCM 用 $2I_{avg}$。
- 隔离题选反激。

## 9. 逆变器 / PWM

### 题目长什么样

给全桥或三相逆变器（inverter），问双极性（bipolar）/单极性（unipolar）PWM、开关条件、线电压（line voltage）、$m_a$、$m_f$、直通（shoot-through）。

### 板书步骤

1. 判断拓扑：单相还是三相
2. 判断开关方式：双极性 / 单极性 / 方波（square-wave）/ SPWM
3. 写比较器（comparator）规则
4. 写开关状态
5. 算输出电压或线电压
6. 写谐波（harmonics）或直通解释

三相线电压：

$$
v_{AB}=v_A-v_B
$$

$$
v_{BC}=v_B-v_C
$$

$$
v_{CA}=v_C-v_A
$$

调制（modulation）指数：

$$
m_a=\frac{\hat V_{control}}{\hat V_{tri}},\qquad m_f=\frac{f_{carrier}}{f_{control}}
$$

### 别丢分

- 双极性没有 0 电平，单极性有 0 电平。
- 线电压要相减。
- $m_a$ 用峰值，不用 RMS。
- 同一桥臂上下管不能同时导通。

## 交卷前检查

- 所有答案有没有单位。
- 峰值、RMS、average 有没有混。
- 二极管压降是一个还是两个。
- PIV 是否按关断二极管算。
- 热计算是否用器件损耗。
- 占空比是否在 0 到 1。
- $I_{max/min}$ 是否用了 $\Delta I/2$。
- PWM truth table 有没有直通。
