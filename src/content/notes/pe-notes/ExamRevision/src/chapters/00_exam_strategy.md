---
title: "# 00 考试总览与高分策略"
description: "ExamRevision work artifact"
date: 2025-01-01
category: "课程学习"
docGroup: "power-electronic-notes"
draft: true
---

# 00 考试总览与高分策略

## 考试要会什么

期末卷的核心不是背很多背景，而是把高频 calculation套路写完整。历年题最稳定出现这些模块：

1. **Waveform calculation**：average、RMS、form factor、duty cycle、triangular / pulsed waveform 分段积分。
2. **Diode rectifier**：half-wave、full-wave、bridge rectifier 的输出波形、$V_{DC}$、$V_{\mathrm{rms}}$、PIV、capacitor smoothing 和 ripple。
3. **SCR / Thyristor phase control**：half-controllable、firing angle $\alpha$、导通区间、average / RMS / power。
4. **Power switch + loss + thermal**：MOSFET / IGBT 选择，$I_{\mathrm{avg}}$、$I_{\mathrm{rms}}$、conduction loss、switching loss、thermal chain。
5. **DC-DC converter CCM**：Buck、Boost、Buck-Boost 的 duty、$v_L$、$\Delta i_L$、$I_{L,\min}$、$I_{L,\max}$。
6. **Inverter / PWM**：carrier comparison、$m_a$、$m_f$、square-wave 与 PWM 输出。

## 一句话记忆

**先认拓扑和波形，再定周期和导通区间；所有计算题都写“公式、代入、单位、波形标注”。**

## 核心原理

考试给分通常按 working marks 分，不是只看最终答案。每道 calculation 题按下面顺序写最稳：

1. **Identify**：判断题目是 half-wave 还是 full-wave，是 diode 还是 SCR，是 pulse 还是 triangular waveform。
2. **Define period**：写清 $T$、$t_{\mathrm{on}}$、$D$、$\alpha$、$f_{\mathrm{ripple}}$。
3. **Choose interval**：average / RMS 的积分区间必须覆盖一个完整周期；SCR half-wave 用 $0$ 到 $2\pi$，导通只在 $\alpha$ 到 $\pi$。
4. **Use RMS for heating**：电阻功率、MOSFET conduction loss、load heating 用 RMS，不用 average。
5. **Sketch with labels**：画波形要标 peak、zero、time axis、delay angle、导通区间。

## 必背公式

Average 与 RMS：

$$
X_{\mathrm{avg}}=\frac{1}{T}\int_0^T x(t)\,dt
$$

$$
X_{\mathrm{rms}}=\sqrt{\frac{1}{T}\int_0^T x^2(t)\,dt}
$$

Duty cycle：

$$
D=\frac{t_{\mathrm{on}}}{T}=\frac{t_{\mathrm{on}}}{t_{\mathrm{on}}+t_{\mathrm{off}}}
$$

Resistive power：

$$
P=I_{\mathrm{rms}}^2R=\frac{V_{\mathrm{rms}}^2}{R}
$$

Rectifier peak conversion：

$$
\hat V_m=\sqrt{2}V_{AC,\mathrm{rms}}
$$

Capacitor ripple：

$$
\Delta V\approx\frac{I_{load}}{f_{\mathrm{ripple}}C}
$$

Half-wave SCR：

$$
V_{DC}=\frac{\hat V_m}{2\pi}(1+\cos\alpha)
$$

$$
V_{\mathrm{rms}}=\hat V_m\sqrt{\frac{1}{2\pi}\left(\frac{\pi-\alpha}{2}+\frac{\sin 2\alpha}{4}\right)}
$$

## 图像/波形/拓扑

考试图像题优先画简化但清晰的图，不需要艺术化。最重要的是 axes、peak、period、导通区间。

- Waveform average / RMS：看面积与平方面积。
- Rectifier smoothing：看电容峰值充电、负载放电、ripple。
- SCR firing angle：看 $\alpha$ 从自然过零点开始量。

## 做题步骤

### 1. 波形积分题

1. 画一个周期并标 $T$。
2. 分段写 $x(t)$。
3. Average 用面积：正负面积要带符号。
4. RMS 先平方，所有负值平方后为正。
5. Form factor 用 RMS 除以 rectified average，不是普通 average。

### 2. Rectifier / smoothing 题

1. 判断 half-wave、full-wave、bridge 或 centre-tap。
2. 把 $V_{AC,\mathrm{rms}}$ 转成 peak $\hat V_m$。
3. 写 $V_{DC}$、$V_{\mathrm{rms}}$ 或 ripple 公式。
4. Half-wave ripple frequency 是 line frequency；full-wave ripple frequency 是 $2f_{line}$。
5. PIV 必须按拓扑判断，bridge 与 centre-tap 不同。

### 3. SCR 题

1. 写 SCR 是 half-controllable：gate 只能触发 turn-on，不能强制 turn-off。
2. 在每个正半周从 $\alpha$ 开始导通，到 $\pi$ 自然关断。
3. Average / RMS 用正确积分区间。
4. 负载为 resistor 时，power 用 $V_{\mathrm{rms}}^2/R$。

## 高频错误

- Average 可能为 $0$，不要因此说没有 RMS 或没有功率。
- Form factor 分母要用 rectified average；若普通 average 为 $0$，不能直接除。
- RMS 不是 average，也不是 peak。
- Half-wave 50 Hz 的周期是 $20\,\mathrm{ms}$；full-wave ripple 周期是 $10\,\mathrm{ms}$。
- $80\,\mathrm{V_{rms}}$ 这类输入要先乘 $\sqrt{2}$ 得 peak。
- SCR firing angle 不是关断延迟，而是每个自然导通点后的触发延迟。
- 电阻功率必须用 RMS，不要用 average voltage 或 average current。

## Past paper 连接

- **2017 Q1(d)**：inductor current waveform 的 average / RMS / voltage derivation。
- **2017 Q2**：half-wave rectifier、smoothing、diode voltage、SCR firing angle。
- **2018 Q1(e)**：$10\sin(100\pi t)+10$ 的 RMS 与 form factor。
- **2018 Q2**：full-wave rectifier、smoothing capacitance、half-wave SCR RMS / power。
- **Exam feedback**：点名错误集中在 average 为零、form factor 分母、half-wave / full-wave 周期、PIV、SCR 延迟角。