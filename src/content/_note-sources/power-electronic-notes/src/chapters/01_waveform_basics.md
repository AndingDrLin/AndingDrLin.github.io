# 01 波形基础：Average、RMS、Form Factor、Duty Cycle

## 考试要会什么

本章解决所有波形计算题的底层方法。题目常给 sinusoid with DC offset、rectangular pulse、triangular / saw-tooth current、分段线性 waveform，要求：

- 求 average value；
- 求 RMS value；
- 求 form factor；
- 从波形读 duty cycle；
- 把分段积分结果用于 power、loss、thermal 或 converter current。

## 一句话记忆

**Average 看有符号面积；RMS 看平方后的面积；form factor 的分母看整流后的平均值。**

## 核心原理

Average value 表示一个周期内的等效 DC component。正面积和负面积会互相抵消，所以对称交流波形的 average 可能为 $0$。

RMS value 表示等效热效应。因为先平方，负半周也贡献正的热效应，所以 RMS 通常不为 $0$。只要题目问 resistor power、conduction loss、heating effect，就优先想到 RMS。

Form factor 用来描述波形形状：

$$
\mathrm{Form\ factor}=\frac{X_{\mathrm{rms}}}{X_{\mathrm{avg,rectified}}}
$$

这里 $X_{\mathrm{avg,rectified}}$ 是 $|x(t)|$ 的平均值，不是普通 average。老师反馈中特别强调：普通 average 为 $0$ 时不能直接拿来做分母。

## 必背公式

Average：

$$
X_{\mathrm{avg}}=\frac{1}{T}\int_0^T x(t)\,dt
$$

RMS：

$$
X_{\mathrm{rms}}=\sqrt{\frac{1}{T}\int_0^T x^2(t)\,dt}
$$

Duty cycle：

$$
D=\frac{t_{\mathrm{on}}}{T}=\frac{t_{\mathrm{on}}}{t_{\mathrm{on}}+t_{\mathrm{off}}}
$$

Sinusoid：

$$
V_{\mathrm{rms}}=\frac{\hat V}{\sqrt{2}}
$$

Sinusoid with DC offset：

$$
v(t)=A\sin(\omega t)+B
$$

$$
V_{\mathrm{rms}}=\sqrt{\frac{A^2}{2}+B^2}
$$

Single rectangular pulse，幅值为 $X_m$，off 区为 $0$：

$$
X_{\mathrm{avg}}=DX_m
$$

$$
X_{\mathrm{rms}}=X_m\sqrt{D}
$$

Resistive power：

$$
P=I_{\mathrm{rms}}^2R=\frac{V_{\mathrm{rms}}^2}{R}
$$

## 图像/波形/拓扑

![Average and RMS waveform](../../assets/avg_rms_waveform.svg)

读图时记住三件事：

1. Average level 来自一个周期的净面积。
2. RMS level 来自平方后的平均值，因此对负半周也敏感。
3. 只要波形不是标准正弦，就不要直接套 $\hat V/\sqrt{2}$。

## 做题步骤

### A. 通用分段积分法

1. **选周期**：写明一个完整周期 $T$，不要只取半个周期，除非题目明确让你取半周期平均。
2. **分段写函数**：例如 $0<t<t_1$、$t_1<t<T$。
3. **Average**：

$$
X_{\mathrm{avg}}=\frac{1}{T}\left(\int_0^{t_1}x_1(t)\,dt+\int_{t_1}^{T}x_2(t)\,dt\right)
$$

4. **RMS**：

$$
X_{\mathrm{rms}}=\sqrt{\frac{1}{T}\left(\int_0^{t_1}x_1^2(t)\,dt+\int_{t_1}^{T}x_2^2(t)\,dt\right)}
$$

5. **写单位**：电压是 V，电流是 A，功率是 W。

### B. Triangular / saw-tooth waveform

三角波常见于 inductor current 或开关电流。若电流在 $0$ 到 $T$ 内从 $I_1$ 线性上升到 $I_2$，可写：

$$
i(t)=I_1+\frac{I_2-I_1}{T}t
$$

Average 可用梯形面积：

$$
I_{\mathrm{avg}}=\frac{I_1+I_2}{2}
$$

RMS 要平方积分：

$$
I_{\mathrm{rms}}=\sqrt{\frac{I_1^2+I_1I_2+I_2^2}{3}}
$$

如果三角波只存在于一个 on-time，其余时间为 $0$，要再乘 duty 的影响：

$$
I_{\mathrm{rms,total}}=\sqrt{D\frac{I_1^2+I_1I_2+I_2^2}{3}}
$$

适用条件：on-time 内线性变化，off-time 为 $0$。若 off-time 不是 $0$，必须对 off-time 另积分。

### C. Pulsed waveform

对幅值为 $X_m$、on-time 为 $t_{\mathrm{on}}$、off-time 为 $0$ 的 pulse：

1. 先算 duty：$D=t_{\mathrm{on}}/T$。
2. Average 是面积除以周期：$DX_m$。
3. RMS 是平方面积再开方：$X_m\sqrt{D}$。

注意：RMS 随 $\sqrt{D}$ 变，不是随 $D$ 变。比如 $D=0.25$ 时，RMS 是 $0.5X_m$，不是 $0.25X_m$。

### D. Sinusoid with DC offset

例：

$$
v(t)=10\sin(100\pi t)+10
$$

这里 $A=10$，$B=10$。RMS：

$$
V_{\mathrm{rms}}=\sqrt{\frac{10^2}{2}+10^2}=\sqrt{150}=12.25\,\mathrm{V}
$$

因为该波形从 $0$ 到 $20\,\mathrm{V}$，不跨负值，所以 rectified average 与 ordinary average 都是 $10\,\mathrm{V}$。Form factor：

$$
\mathrm{FF}=\frac{12.25}{10}=1.225
$$

## 高频错误

- 把 RMS 当成 average。
- 对 pulse 写 $X_{\mathrm{rms}}=DX_m$，正确是 $X_m\sqrt{D}$。
- Form factor 分母忘记取 $|x(t)|$ 的平均值。
- 看到 sine 就套 $\hat V/\sqrt{2}$，但题目其实有 DC offset。
- 分段积分时只算导通区间，没有除以完整周期。
- Triangular waveform 的 $\Delta I$ 是 peak-to-peak；做 $I_{\max}$、$I_{\min}$ 时通常用 $\pm\Delta I/2$。
- 单位混乱：$\mathrm{ms}$、$\mathrm{\mu s}$、$\mathrm{ns}$ 在 switching loss 题里非常容易错。

## Past paper 连接

- **2017 Q1(d)**：给 inductor current waveform，要求 average、RMS，并由 $v_L=L\,di_L/dt$ 推 voltage waveform。
- **2018 Q1(e)**：$10\sin(100\pi t)+10$ 的 RMS 和 form factor。
- **Homework Q1(a)**：average / RMS / form factor 是基础送分题，但反馈显示很多人错在 form factor。
- **MOSFET loss 题**：所有 $I_{\mathrm{avg}}$、$I_{\mathrm{rms}}$ 计算都来自本章分段积分。