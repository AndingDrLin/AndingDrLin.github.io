---
title: "第2章 Diodes 与 Rectifiers"
description: "期末整流题要用的 half-wave、bridge、centre-tapped、PIV、capacitor ripple 和 regulated supply 计算。"
date: 2026-05-17
tags: [power-electronics, 电力电子]
category: "课程学习"
docGroup: "power-electronic-notes"
order: 2
draft: false
---
## 会怎么考

- 判断 half-wave、bridge、centre-tapped full-wave。
- 画 load voltage 和 diode voltage。
- 求 secondary peak、load peak、load RMS。
- 求 PIV。
- 有 capacitor 时求 ripple 或 required $C$。
- 解释增大 capacitor 对 conduction angle、diode current、transformer VA 的影响。
- 2024 Q2 这种题：rectifier + capacitor + linear regulator + transformer VA 一起算。

## 先把输入换成 peak

若题目给 RMS：

$$
\hat V_m=\sqrt2 V_{AC,rms}
$$

若题目直接写：

$$
v_s(t)=10\sin(100\pi t)
$$

这里 10 已经是 peak。

有 diode drop 时：

- half-wave：导通路径 1 个 diode，输出 peak 约 $\hat V_m-V_F$。
- centre-tapped：每半周 1 个 diode，输出 peak 约 $\hat V_{m,half}-V_F$。
- bridge：每半周 2 个 diode，输出 peak 约 $\hat V_m-2V_F$。

## 三种 rectifier 表

| 项目 | Half-wave | Centre-tapped full-wave | Bridge rectifier |
|---|---|---|---|
| 每个 line cycle 输出脉冲 | 1 个 | 2 个 | 2 个 |
| Ripple frequency | $f_{line}$ | $2f_{line}$ | $2f_{line}$ |
| 每次导通 diode 数 | 1 | 1 | 2 |
| 理想 average | $\hat V_m/\pi$ | $2\hat V_{m,half}/\pi$ | $2\hat V_m/\pi$ |
| 理想 RMS | $\hat V_m/2$ | $\hat V_{m,half}/\sqrt2$ | $\hat V_m/\sqrt2$ |
| 常见 PIV | 无 capacitor：$\hat V_m$；有 capacitor 可到 $2\hat V_m$ | $2\hat V_{m,half}$ | $\hat V_m$ |
| 变压器要求 | 不需要 centre tap | 需要 centre tap | 不需要 centre tap |
| 主要缺点 | ripple 大、利用率差 | PIV 高、要 centre tap | 两个 diode drops |

Centre-tapped 的 $\hat V_{m,half}$ 是半边 secondary peak。不要把整段 secondary peak 又乘 2。

## PIV 怎么算

PIV 是关断 diode 承受的最大反向电压。不要用 average output 代替。

板书步骤：

1. 找哪个 diode 关断。
2. 标它两端电压极性。
3. 找 source 最不利 peak。
4. 若有 capacitor，考虑 capacitor 保持在接近输出 peak。
5. 写 each diode PIV。

常见结论：

- Bridge：each diode PIV 通常约 $\hat V_m$。
- Centre-tapped：each diode PIV 通常约 $2\hat V_{m,half}$。
- Half-wave + capacitor：source 到负峰、capacitor 保持正峰时，PIV 可能约 $2\hat V_m$。

## Capacitor ripple

Capacitor 在峰值附近充电，其余时间给负载放电。

$$
\Delta V\approx\frac{I_{load}\Delta t}{C}
$$

常用：

$$
\Delta V\approx\frac{I_{load}}{f_{ripple}C}
$$

但题目给 conduction angle 时，用放电时间：

$$
\Delta t\approx T_{ripple}-\frac{\theta_c}{360^\circ}T_{ripple}
$$

其中：

$$
T_{ripple}=\frac{1}{f_{ripple}}
$$

Half-wave 50 Hz：$T_{ripple}=20\,\mathrm{ms}$。

Full-wave / bridge 50 Hz：$T_{ripple}=10\,\mathrm{ms}$。

反求 capacitor：

$$
C\approx\frac{I_{load}\Delta t}{\Delta V}
$$

## 增大 capacitor 会怎样

考试简答直接写：

- Ripple 变小。
- Diode conduction angle 变窄。
- Peak diode current 变大。
- Transformer RMS current / form factor 变差。
- Transformer VA rating 可能要更大。

## Regulated supply 题

2024 Q2 这种题按这条链算。

题目常给：输出 DC、load current、dropout、mains tolerance、transformer regulation、bridge diode drop、capacitor、conduction angle。

### 反推 minimum secondary RMS

1. Regulator 输入最低点必须满足：

$$
V_{cap,min}\ge V_{out}+V_{dropout}
$$

2. capacitor peak 要比最低点高一个 ripple：

$$
V_{cap,peak}\approx V_{cap,min}+\Delta V
$$

3. Bridge 有两个 diode drops：

$$
\hat V_{sec,min}\approx V_{cap,peak}+2V_F
$$

4. peak 转 RMS：

$$
V_{sec,rms,min}=\frac{\hat V_{sec,min}}{\sqrt2}
$$

5. 若题目给 mains low tolerance 和 transformer regulation，再按题目说明折算到 nominal secondary。

### Regulator worst-case dissipation

$$
P_{reg}=(V_{in,reg}-V_{out})I_{load}
$$

Worst case 通常看 high mains / high secondary / load condition。题目若指定 full-load，就用 full-load。

### Capacitor voltage rating

看 high mains、light/no load 时 capacitor 可能充到的最高 peak。不要只看 nominal output voltage。

### Transformer VA

$$
VA\approx V_{sec,rms}I_{sec,rms}
$$

若题目给 current form factor：

$$
I_{sec,rms}=\mathrm{FF}\cdot I_{dc}
$$

再考虑 transformer efficiency / regulation，按题目给的条件代。

## Bridge vs half-wave vs centre-tapped

Bridge 优点：

- 不需要 centre tap。
- PIV 较低。
- full-wave ripple，滤波容易。

Bridge 缺点：

- 每次导通两个 diode，有两个 forward drops。
- 低电压大电流时 diode loss 明显。

Centre-tapped 优点：

- 每次导通一个 diode，压降低。

Centre-tapped 缺点：

- 需要 centre-tapped transformer。
- 每只 diode PIV 高。
- transformer secondary 利用率不如 bridge。

Half-wave 优点：简单。缺点：ripple 大、DC output 低、transformer utilization 差。

## 别丢分

- Bridge 每次两个 diode drops。
- Centre-tapped 的 PIV 用 half-secondary peak 判断。
- Half-wave 和 full-wave 的 ripple period 不一样。
- $\mu\mathrm{F}$、mF 要换成 F。
- PIV 是 reverse voltage，不是 output average。
- Diode voltage waveform 要按题目给的 polarity 画正负。
- 有 capacitor 时 diode 只在峰值附近导通，不是整半周导通。
