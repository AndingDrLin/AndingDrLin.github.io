---
title: "第9章 Past Paper Worked Examples：高频计算套路"
description: "整理历年题中高频计算模板，包括 buck-boost、thermal、rectifier、SCR 与 inverter。"
date: 2026-05-17
tags: [power-electronics, 电力电子]
category: "课程学习"
docGroup: "power-electronic-notes"
order: 9
draft: false
---
## 用法

本章只整理 past paper 中反复出现的计算模板。考试时不要只写最终答案，要把公式、代入、单位和波形关键数值写出来。

## 通用得分步骤

1. 读题先画简图或波形，标 $T$、$t_{on}$、峰值、单位。
2. 写出适用公式，不要直接跳答案。
3. 分清 average、RMS、peak、peak-to-peak。
4. 损耗题先算 electrical loss，再走 thermal ladder。
5. DC-DC 题先 volt-second balance，再 ripple，再 $I_{\max}/I_{\min}$。
6. Inverter 题先判断 PWM / SPWM / square-wave，再决定是否忽略 high-frequency harmonics。

---

## Example 1：2017 Buck-Boost converter（CCM）

### 题型识别

典型数据：由 $V_{in}=5\,\mathrm{V}$ 得到 $|V_o|=12\,\mathrm{V}$、$I_o=0.5\,\mathrm{A}$，$f_s=50\,\mathrm{kHz}$，$L=100\,\mu\mathrm{H}$。Inverting buck-boost 输出极性为负，计算常用 magnitude。

### Step 1：Duty cycle

$$
|V_o|=\frac{D}{1-D}V_{in}
$$

$$
D=\frac{|V_o|}{V_{in}+|V_o|}=\frac{12}{5+12}=0.706
$$

### Step 2：Input current by power balance

理想 converter：

$$
P_{in}=P_o=|V_o|I_o
$$

$$
I_{in}=\frac{|V_o|I_o}{V_{in}}=\frac{12\times0.5}{5}=1.2\,\mathrm{A}
$$

### Step 3：Inductor average current

Buck-boost 中输出只在 off interval 接收电感电流：

$$
I_o=(1-D)I_{L,\mathrm{avg}}
$$

$$
I_{L,\mathrm{avg}}=\frac{I_o}{1-D}=\frac{0.5}{1-0.706}=1.70\,\mathrm{A}
$$

### Step 4：Inductor voltage and ripple

On state：

$$
v_L=V_{in}=5\,\mathrm{V}
$$

Off state：

$$
v_L=-|V_o|=-12\,\mathrm{V}
$$

Ripple：

$$
\Delta i_L=\frac{V_{in}D}{Lf_s}
$$

$$
\Delta i_L=\frac{5\times0.706}{100\times10^{-6}\times50\times10^3}=0.706\,\mathrm{A}
$$

### Step 5：Maximum and minimum inductor current

$$
I_{L,\max}=1.70+\frac{0.706}{2}=2.05\,\mathrm{A}
$$

$$
I_{L,\min}=1.70-\frac{0.706}{2}=1.35\,\mathrm{A}
$$

### Waveform checklist

- $i_L$：从约 $1.35\,\mathrm{A}$ 上升到 $2.05\,\mathrm{A}$，再下降回 $1.35\,\mathrm{A}$。
- $v_L$：on 为 $+5\,\mathrm{V}$，off 为 $-12\,\mathrm{V}$。
- $i_{in}$：on 时等于 $i_L$，off 时约为 0，平均值 $1.2\,\mathrm{A}$。

### 易错点

- 不写负极性或不说明使用 $|V_o|$。
- 把 $I_{L,\mathrm{avg}}$ 当成 $I_o$。
- 用 $\Delta i_L$ 全量直接加减，而不是加减 $\Delta i_L/2$。

---

## Example 2：2018 Boost converter（CCM）

### 题型识别

典型数据：$V_{in}=5\,\mathrm{V}$，$V_o=15\,\mathrm{V}$，$I_o=1\,\mathrm{A}$，$f_s=50\,\mathrm{kHz}$，$L=100\,\mu\mathrm{H}$。

### Step 1：Duty cycle

$$
V_o=\frac{V_{in}}{1-D}
$$

$$
D=1-\frac{V_{in}}{V_o}=1-\frac{5}{15}=\frac{2}{3}=0.667
$$

### Step 2：Input and inductor average current

$$
I_{in}=\frac{V_oI_o}{V_{in}}=\frac{15\times1}{5}=3\,\mathrm{A}
$$

Boost input current is the inductor current：

$$
I_{L,\mathrm{avg}}=I_{in}=3\,\mathrm{A}
$$

### Step 3：Inductor voltage

On state：

$$
v_L=V_{in}=5\,\mathrm{V}
$$

Off state：

$$
v_L=V_{in}-V_o=5-15=-10\,\mathrm{V}
$$

### Step 4：Inductor ripple

$$
\Delta i_L=\frac{V_{in}D}{Lf_s}
$$

$$
\Delta i_L=\frac{5\times(2/3)}{100\times10^{-6}\times50\times10^3}=0.667\,\mathrm{A}
$$

### Step 5：Maximum and minimum current

$$
I_{L,\max}=3+\frac{0.667}{2}=3.33\,\mathrm{A}
$$

$$
I_{L,\min}=3-\frac{0.667}{2}=2.67\,\mathrm{A}
$$

### Waveform checklist

- $v_L$：$+5\,\mathrm{V}$ during $DT$，$-10\,\mathrm{V}$ during $(1-D)T$。
- $i_L$：围绕 $3\,\mathrm{A}$ 的连续三角波。
- $I_{L,\min}>0$，所以 CCM 假设成立。

### 易错点

- 把 $I_o=1\,\mathrm{A}$ 当成 $I_L$ 平均值。
- 忘记 off-state 电感电压是负值。
- 把 boost duty 写成 $D=V_o/V_{in}$。

---

## Example 3：MOSFET loss and thermal template

### 题型识别

2017 Q3 和 2018 Q3 都是 waveform → average/RMS → load power → MOSFET loss → thermal circuit。题目通常给 load current waveform、supply voltage、$R_{DS(on)}$、switching time、thermal resistances。

### Step 1：从波形读 duty 和周期

$$
D=\frac{t_{on}}{T}
$$

2017 worked solution 中：

$$
D=\frac{10\,\mathrm{ms}}{20\,\mathrm{ms}}=0.5
$$

### Step 2：分段积分求 average 和 RMS

Average：

$$
I_{\mathrm{avg}}=\frac{1}{T}\int_0^T i(t)\,dt
$$

RMS：

$$
I_{\mathrm{rms}}=\sqrt{\frac{1}{T}\int_0^T i^2(t)\,dt}
$$

2017 lecture worked values：

$$
I_{\mathrm{avg}}=8.75\,\mathrm{A}
$$

$$
I_{\mathrm{rms}}\approx12.4\,\mathrm{A}
$$

### Step 3：Load power

若题目给 supply voltage and switched current，可用：

$$
P_{load}=V_{supply}I_{\mathrm{avg}}
$$

2017 worked value：

$$
P_{load}=50\times8.75=437.5\,\mathrm{W}
$$

### Step 4：MOSFET conduction loss

$$
P_{cond}=I_{D,\mathrm{rms}}^2R_{DS(on)}
$$

2017 worked value：

$$
P_{cond}\approx7.688\,\mathrm{W}
$$

### Step 5：Switching loss

若题目用线性 overlap 近似：

$$
P_{sw}\approx\frac{1}{2}V_{DS}I_D(t_r+t_f)f_s
$$

有些题会分别给 turn-on / turn-off current 或 switching intervals，可按三角形面积逐项相加。2017 worked value：

$$
P_{sw}\approx1.125\,\mathrm{W}
$$

Total semiconductor loss：

$$
P_{tot}=P_{cond}+P_{sw}
$$

2017 worked value：

$$
P_{tot}\approx8.813\,\mathrm{W}
$$

### Step 6：Thermal ladder

基本热阻链：junction → case → sink → ambient。

$$
T_j=T_a+P\left(R_{\theta JC}+R_{\theta CS}+R_{\theta SA}\right)
$$

也可逐级写：

$$
T_S=T_A+P R_{\theta SA}
$$

$$
T_C=T_S+P R_{\theta CS}
$$

$$
T_J=T_C+P R_{\theta JC}
$$

2018 thermal example 给 $P=60\,\mathrm{W}$、$R_{\theta JC}=0.2^\circ\mathrm{C/W}$、$R_{\theta CS}=0.1^\circ\mathrm{C/W}$、$R_{\theta SA}=1^\circ\mathrm{C/W}$、$T_A=25^\circ\mathrm{C}$：

$$
T_S=25+60\times1=85^\circ\mathrm{C}
$$

$$
T_C=85+60\times0.1=91^\circ\mathrm{C}
$$

$$
T_J=91+60\times0.2=103^\circ\mathrm{C}
$$

### 易错点

- 用 average current 算 $I^2R$ loss；应使用 RMS current。
- 把 ms、$\mu\mathrm{s}$、ns 单位混用。
- 多个器件共享 heatsink 时，sink-to-ambient 温升要用总损耗。
- 热阻顺序写反，或者漏写单位 $^\circ\mathrm{C/W}$。

---

## Example 4：PWM inverter calculation template

### 题型识别

2017 Q5 和 2018 Q4(g-i)：single-phase PWM inverter，给 $V_d$、carrier 幅值、$m_a$ 或 constant control signal，要求 low-frequency output 或 average output，并解释 square-wave / overmodulation。

### Case A：SPWM low-frequency component

Full-bridge bipolar SPWM 线性区：

$$
\hat V_{o1}\approx m_aV_d
$$

$$
V_{o1,\mathrm{rms}}\approx\frac{m_aV_d}{\sqrt{2}}
$$

2018 模板：若 $V_d=100\,\mathrm{V}$、$m_a=0.5$：

$$
\hat V_{o1}=0.5\times100=50\,\mathrm{V}
$$

$$
V_{o1,\mathrm{rms}}=\frac{50}{\sqrt{2}}=35.4\,\mathrm{V}
$$

答题时写明：high-frequency harmonics neglected。

### Case B：Overmodulation / square-wave

若 $m_a\gg1$：

- comparator 大部分时间饱和；
- 输出接近 square-wave；
- linear SPWM 关系失效；
- fundamental 增大但 low-order harmonics 明显增加。

Full-bridge square-wave total RMS：

$$
V_{o,\mathrm{rms}}=V_d
$$

Fundamental peak 可写：

$$
\hat V_1=\frac{4V_d}{\pi}
$$

### Case C：Constant control signal average output

若 carrier 为对称三角波 $\pm V_{tri,peak}$，constant control 为 $v_{control}=kV_{tri,peak}$：

$$
D=\frac{1+k}{2}
$$

Full-bridge bipolar average：

$$
\overline v_o=(2D-1)V_d=kV_d
$$

2018 模板：若 $V_d=100\,\mathrm{V}$ 且 $k=0.6$：

$$
D=\frac{1+0.6}{2}=0.8
$$

$$
\overline v_o=(2\times0.8-1)100=60\,\mathrm{V}
$$

若题图 comparator 逻辑相反，答案符号相反，必须按题图说明。

### 易错点

- $m_a>1$ 仍套 $\hat V_{o1}=m_aV_d$。
- 题目要求忽略高频谐波，却把 carrier sidebands 写成最终输出。
- Constant control 题没有先求 duty。
- 不说明 full-bridge / half-bridge，导致电压幅值差一倍。

---

## 最后 30 秒检查

- 每个 numerical answer 是否有单位。
- $\Delta i_L$ 是否是 peak-to-peak。
- $I_{\max/\min}$ 是否用了 $\pm\Delta i_L/2$。
- MOSFET conduction loss 是否用了 RMS current。
- Thermal sink 温升是否用了正确功率。
- PWM 是否在线性区；若 overmodulation，是否停止使用线性公式。

---

## 补充：MOSFET loss 完整推导（2017 Q3 步骤拆解）

2017 Q3 的 MOSFET current waveform 是 ramp + platform 型。从波形到最终温度的完整链条：

```
Waveform → D → I_avg → load power → I_rms → P_cond → P_sw → P_loss → thermal ladder → T_S, T_C, T_J
```

### 分段积分方法

若 $i(t)$ 在 on-time 20 ms 内从 $I_1$ 线性到 $I_2$，off-time 20 ms 为零：

$$
I_{\mathrm{avg}} = \frac{1}{T}\int_0^T i(t)\,dt = \frac{1}{T} \cdot \frac{I_1 + I_2}{2} \cdot t_{\mathrm{on}}
$$

$$
I_{\mathrm{rms}} = \sqrt{\frac{1}{T}\int_0^T i^2(t)\,dt} = \sqrt{\frac{t_{\mathrm{on}}}{3T}(I_1^2 + I_1 I_2 + I_2^2)}
$$

**2017 Q3 参考值**：$I_{\mathrm{avg}} = 8.75\,\mathrm{A}$，$I_{\mathrm{rms}} \approx 12.4\,\mathrm{A}$，$P_{\mathrm{load}} = 437.5\,\mathrm{W}$，$P_{\mathrm{cond}} \approx 7.688\,\mathrm{W}$，$P_{\mathrm{sw}} \approx 1.125\,\mathrm{W}$，总损耗 ≈ $8.813\,\mathrm{W}$。

**注意**：这些数值来自特定波形参数，考试时数字会变，但方法不变。

---

## 补充：Rectifier Smoothing 例题模板

### Half-wave + smoothing（2017 Q2(a) 套路）

已知：$V_{AC} = 10\sin(100\pi t)$，$C = 20000\,\mu\mathrm{F}$，$R = 10\,\Omega$，$\theta_c = 30°$

步骤：
1. $\hat V_m = 10\,\mathrm{V}$，$V_{DC} \approx \hat V_m = 10\,\mathrm{V}$（大电容近似）
2. $T_{ripple} = 20\,\mathrm{ms}$（half-wave 50 Hz）
3. Charging time = $30/360 \times 20 = 1.67\,\mathrm{ms}$
4. Discharge time ≈ $18.33\,\mathrm{ms}$
5. $I_{load} \approx V_{DC}/R = 1\,\mathrm{A}$
6. $\Delta V \approx I_{load} \times t_{\mathrm{discharge}} / C = 1 \times 0.01833 / 0.02 = 0.917\,\mathrm{V}$
7. PIV：带电容时 ≈ $2\hat V_m = 20\,\mathrm{V}$（最坏情况）

### Full-wave + smoothing（2018 Q2(a) 套路）

已知：$V_{AC} = 60\sin(100\pi t)$，$\theta_c = 30°$，$R = 10\,\Omega$，$C = 15000\,\mu\mathrm{F}$

步骤：
1. $\hat V_m = 60\,\mathrm{V}$
2. $T_{ripple} = 10\,\mathrm{ms}$（full-wave 100 Hz ripple）
3. Charging time = $30/360 \times 10 = 0.83\,\mathrm{ms}$
4. Discharge time ≈ $9.17\,\mathrm{ms}$
5. 继续按 $\Delta V \approx I_{load} \times t_{\mathrm{discharge}} / C$ 计算

---

## 补充：SCR Phase Control 例题模板

### Half-wave SCR（2017 Q2(c) / 2018 Q2 SCR 套路）

已知：$V_{AC} = 10\sin(100\pi t)$，$\alpha = 30°$，$R = 10\,\Omega$

步骤：
1. $\hat V_m = 10\,\mathrm{V}$，$\alpha = 30° = \pi/6\,\mathrm{rad}$
2. 导通区间：$\alpha$ 到 $\pi$（即 $30°$ 到 $180°$）
3. $V_{DC} = \frac{\hat V_m}{2\pi}(1+\cos\alpha) = \frac{10}{2\pi}(1+\cos 30°) = \frac{10}{2\pi}(1+0.866) = 2.97\,\mathrm{V}$
4. $V_{\mathrm{rms}} = \hat V_m\sqrt{\frac{1}{2\pi}\left(\frac{\pi-\alpha}{2}+\frac{\sin 2\alpha}{4}\right)}$
5. $P = V_{\mathrm{rms}}^2 / R$

**考试提醒**：
- 积分周期是 $2\pi$（不是 $\pi$）
- 必须标 $\alpha$、peak voltage、time axis
- 电阻功率用 $V_{\mathrm{rms}}^2/R$，不要用 $V_{DC}^2/R$
