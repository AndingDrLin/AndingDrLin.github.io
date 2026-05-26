---
title: "第10章 Common Mistakes Checklist：考前红线清单"
description: "整理考前高频错误清单，覆盖公式选择、单位、符号、波形和作答习惯。"
date: 2026-05-17
tags: [power-electronics, 电力电子]
category: "课程学习"
docGroup: "power-electronic-notes"
order: 10
draft: false
---
## 用法

做完题后按本章逐项扫一遍。它来自 past paper analysis 和 feedback 中老师反复点名的问题，优先级高于补充背景知识。

## A. 波形、Average、RMS、Form Factor

| 检查项 | 正确做法 | 常见扣分点 |
|---|---|---|
| Average | $X_{\mathrm{avg}}=\dfrac{1}{T}\int_0^T x(t)\,dt$ | 对称交流波平均值可能为 0，却强行给非零值 |
| RMS | $X_{\mathrm{rms}}=\sqrt{\dfrac{1}{T}\int_0^T x^2(t)\,dt}$ | 用 average 代替 RMS |
| Form factor | $\mathrm{FF}=X_{\mathrm{rms}}/X_{\mathrm{avg,rectified}}$ | 分母忘记取 rectified / absolute average |
| Offset sine | $V_{\mathrm{rms}}=\sqrt{A^2/2+B^2}$ | 有 DC offset 仍只用 $A/\sqrt2$ |
| 单位 | ms、$\mu\mathrm{s}$、ns 分清 | switching time 和 waveform period 单位混用 |

### 一句话提醒

**RMS 管发热，average 管 DC component；form factor 的分母不是普通平均值，而是整流平均值。**

## B. Rectifier / Capacitor / SCR

| 检查项 | 正确做法 | 常见扣分点 |
|---|---|---|
| Peak conversion | $\hat V=\sqrt2 V_{\mathrm{rms}}$ | 80 Vrms 直接当 80 V peak |
| Half-wave period | 50 Hz 时 $T=20\,\mathrm{ms}$ | 误用 full-wave 的 10 ms |
| Full-wave ripple | $f_{ripple}=2f_{line}$ | 放电时间选错 |
| Capacitor ripple | $\Delta V\approx I\Delta t/C$ | $\mu\mathrm{F}$、mF 单位换算错 |
| PIV | 按 topology 和 polarity 判定 | bridge 与 centre-tap PIV 混淆 |
| SCR firing angle | $\alpha$ 从每半周自然过零点起算 | 把 firing delay 画成关断延迟 |
| SCR RMS power | $P=V_{\mathrm{rms}}^2/R$ | 用 average voltage 算 resistor power |

### 必背短句

- Half-wave smoothing：50 Hz mains 的放电周期接近 $20\,\mathrm{ms}$。
- Full-wave smoothing：ripple frequency 是 $100\,\mathrm{Hz}$，周期接近 $10\,\mathrm{ms}$。
- SCR 是 **half-controllable**：gate 可以 turn on，不能靠 gate turn off。

## C. Switch selection / MOSFET loss / Thermal

| 检查项 | 正确做法 | 常见扣分点 |
|---|---|---|
| Fully-controllable device | MOSFET、IGBT、GTO 等 | 把 SCR 当 fully-controllable |
| High power medium frequency | 常选 IGBT 并说明 voltage/current/frequency | 只写器件名无理由 |
| MOSFET conduction loss | $P_{cond}=I_{D,\mathrm{rms}}^2R_{DS(on)}$ | 用 $I_{avg}^2R$ |
| Switching loss | $P_{sw}\approx\dfrac12V_{DS}I_D(t_r+t_f)f_s$ | 忘记乘 switching frequency |
| Total loss | $P_{tot}=P_{cond}+P_{sw}+P_{RR}$ | 只算 conduction loss |
| Thermal ladder | $T_j=T_a+P(R_{\theta JC}+R_{\theta CS}+R_{\theta SA})$ | 热阻顺序写反 |
| Shared heatsink | $R_{\theta SA}$ 温升用总功率 | 只用单个器件功率算 sink 温升 |

### 画图提醒

Thermal circuit 必须按：

$$
T_J\rightarrow R_{\theta JC}\rightarrow T_C\rightarrow R_{\theta CS}\rightarrow T_S\rightarrow R_{\theta SA}\rightarrow T_A
$$

不要只写公式不画 thermal resistance ladder。

## D. DC-DC Converters：Buck / Boost / Buck-Boost

| 检查项 | Buck | Boost | Buck-Boost |
|---|---|---|---|
| Voltage gain | $V_o=DV_{in}$ | $V_o=\dfrac{V_{in}}{1-D}$ | $V_o=-\dfrac{D}{1-D}V_{in}$ |
| Duty | $D=V_o/V_{in}$ | $D=1-V_{in}/V_o$ | $D=\dfrac{|V_o|}{V_{in}+|V_o|}$ |
| On-state $v_L$ | $V_{in}-V_o$ | $V_{in}$ | $V_{in}$ |
| Off-state $v_L$ | $-V_o$ | $V_{in}-V_o$ | $-|V_o|$ |
| $I_{L,\mathrm{avg}}$ | $I_o$ | $I_{in}$ | $I_o/(1-D)$ |
| Input current | Pulsed | Continuous | Pulsed |

### DC-DC 五个必检点

1. 有没有写 volt-second balance，而不是只背 conversion ratio。
2. $\Delta i_L$ 是否来自 $v_L\Delta t/L$。
3. $\Delta i_L$ 是否是 peak-to-peak。
4. $I_{L,\max}$、$I_{L,\min}$ 是否用 $\pm\Delta i_L/2$。
5. Buck-boost 是否写明 output is inverted。

### Flyback 选择红线

如果题目强调 **electrical isolation**：

$$
\text{choose Flyback, not ordinary Buck-Boost}
$$

理由：Flyback derived from buck-boost but uses transformer/coupled inductor and turns ratio。

## E. Inverter / PWM / SPWM

| 检查项 | 正确做法 | 常见扣分点 |
|---|---|---|
| Half-bridge | 输出 $\pm V_d/2$ | 写成 $\pm V_d$ |
| Full-bridge | 输出 $\pm V_d$ | 与 half-bridge 混淆 |
| $m_a$ | $m_a=\hat V_{control}/\hat V_{tri}$ | 用 RMS 或 peak-to-peak 乱代 |
| $m_f$ | $m_f=f_s/f_1$ | 把 fundamental frequency 和 carrier frequency 反过来 |
| Linear SPWM | $0\le m_a\le1$ | $m_a>1$ 仍套线性输出公式 |
| Overmodulation | 输出趋向 square-wave | 不说明 harmonics 增加 |
| Constant control | 先算 duty，再算 average output | 直接把 control voltage 当 output voltage |
| Control mechanism | 画 carrier/reference comparator | 误画不同 switch state 的 resultant circuit |
| Bipolar/unipolar | 分清输出电平 | 把 0 电平加入 bipolar PWM |

### PWM 常用公式

$$
m_a=\frac{\hat V_{control}}{\hat V_{tri}}
$$

$$
m_f=\frac{f_s}{f_1}
$$

Full-bridge bipolar SPWM 线性区：

$$
\hat V_{o1}\approx m_aV_d
$$

$$
V_{o1,\mathrm{rms}}\approx\frac{m_aV_d}{\sqrt2}
$$

Constant control with symmetric carrier：

$$
D=\frac{1+k}{2}
$$

$$
\overline v_o=(2D-1)V_d=kV_d
$$

## F. Three-phase inverter / Motor harmonics

| 检查项 | 正确做法 | 常见扣分点 |
|---|---|---|
| Line voltage | $v_{AB}=v_A-v_B$ | 只画 phase voltage |
| Six-step values | $+V_d,0,-V_d$ | 写出不存在的中间值 |
| Switching sequence | 每 $60^\circ$ 逐行算 | 背错顺序仍硬套 |
| Three-phase SPWM | $m_f$ 常取 odd multiple of 3 | 不解释 harmonic cancellation |
| Motor effect | harmonics → current ripple/heating/torque ripple/noise | 只说 output not smooth |

### Motor harmonics 答题句

**Low-order harmonics are harmful because they produce harmonic currents, extra heating, torque ripple and acoustic noise; higher-frequency PWM harmonics are easier to attenuate by motor inductance.**

## G. Past paper 最常见扣分组合

### 2017 Buck-Boost

- 漏写 inverting polarity。
- $D$ 不用 $|V_o|/(V_{in}+|V_o|)$。
- $I_{L,\mathrm{avg}}$ 写成 $I_o$。
- $I_{\max/\min}$ 加减全量 $\Delta i_L$。

### 2018 Boost

- 把 boost conversion ratio 写成 buck。
- 忘记 $I_{L,\mathrm{avg}}=I_{in}=V_oI_o/V_{in}$。
- off-state $v_L=V_{in}-V_o$ 写成正值。

### MOSFET loss / Thermal

- RMS current 没有分段积分。
- switching loss 的 ns 未换算。
- heatsink 温升功率选错。
- 没有判断 $T_J$ 是否低于 limit。

### PWM inverter

- 不先判断 linear SPWM / overmodulation。
- 高低频分量混在一起。
- 题目问 average output，却写 RMS fundamental。
- 题目问 control circuit，却画 power circuit。

## H. 交卷前 60 秒总检查

- 所有答案是否有单位。
- 所有图是否有 axes、time scale、peak value 或 voltage level。
- 所有 duty cycle 是否在 $0<D<1$。
- 所有 ripple 是否说明 peak-to-peak。
- 所有 RMS 是否由平方平均得到。
- 所有 thermal resistance 是否带 $^\circ\mathrm{C/W}$。
- 所有 inverter 输出是否注明 half-bridge 或 full-bridge。
- 所有 buck-boost / flyback 是否说明 isolation 和 polarity。
