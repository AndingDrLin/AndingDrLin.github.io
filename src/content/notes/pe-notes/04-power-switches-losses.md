---
title: "第4章 Power Switches and Losses"
description: "整理 MOSFET、IGBT 等功率开关选型，以及 conduction loss、switching loss 和 switching energy 计算。"
date: 2026-05-17
tags: [power-electronics, 电力电子]
category: "课程学习"
docGroup: "power-electronic-notes"
order: 4
draft: false
---
## 考试要会什么

- 会比较 **ideal switch** 与 **actual power semiconductor switch**。
- 会按 voltage / current / power / switching frequency / controllability 选择 MOSFET、IGBT、SCR、GTO、BJT。
- 会解释 1 MW、690 V、2 kHz wind turbine converter 为什么通常选 **IGBT**。
- 会从 MOSFET current waveform 求 $D$、$I_{\mathrm{avg}}$、$I_{\mathrm{rms}}$、load power、conduction loss、switching loss。
- 会把 losses 接到 thermal 题：$P_{\mathrm{tot}}=P_{\mathrm{cond}}+P_{\mathrm{sw}}$。

## 一句话记忆

**选开关先看 power rating 和 frequency，算损耗先用 RMS 做热损耗，再用 switching overlap 做开关损耗。**

## 核心原理

### 1. Ideal vs actual power switches

| 项目 | Ideal switch | Actual switch |
|---|---|---|
| On-state | $V_{\mathrm{on}}=0$，无导通损耗 | 有 $V_{\mathrm{on}}$ 或 $R_{DS(on)}$，产生 conduction loss |
| Off-state | leakage current 为 0 | 有 leakage current，且 blocking voltage 有上限 |
| Rating | 无限 voltage/current/power | 受 voltage rating、current rating、SOA、thermal limit 限制 |
| Switching | instant turn-on / turn-off | 有 $t_r,t_f$，电压电流重叠产生 switching loss |
| Control | 理想控制、无 gate/base 功耗 | 需要 gate/base drive，存在 drive power 和 protection |
| Thermal | 无温升 | junction temperature 决定可靠性和 heatsink |

考试写法：不要只写“ideal no loss”。至少覆盖 **on loss、off leakage、rating、switching time/loss、thermal** 五点。

### 2. 器件选型速记

| Device | Controllability | 适合场景 | 高频错误 |
|---|---|---|---|
| MOSFET | Fully-controllable | Low/medium voltage，high frequency，fast switching | 只因“fast”就选它做 MW 级高压大功率 |
| IGBT | Fully-controllable | Medium/high voltage，high power，medium frequency | 忘记说明 frequency 不能太高 |
| SCR / Thyristor | Half-controllable | Very high power，line-frequency rectifier，natural commutation | 把 SCR 写成 fully-controllable |
| GTO | Fully-controllable | Very high power，low/medium frequency | 忽略其关断驱动复杂、速度较慢 |
| BJT | Fully-controllable | 早期功率开关，需 base current | 忘记它是 current-driven，drive loss 较大 |

### 3. Wind turbine 1 MW / 690 V / 2 kHz 选 IGBT 的思路

高分答题模板：

1. 题目要求 **fully-controllable switch**，所以 SCR 不合适，因为 SCR 只能 gate turn-on，不能 gate turn-off。
2. $1\,\mathrm{MW}$、$690\,\mathrm{V}$ 意味着 current 和 power rating 很高，MOSFET 虽快但通常更适合较低电压或较低功率。
3. $2\,\mathrm{kHz}$ 是 medium switching frequency，IGBT 可以承受高电压高电流，并能在 kHz 级工作。
4. 因此选择 **IGBT**；若题目强调极高频率才考虑 MOSFET，若强调极高功率低频可讨论 GTO。

一句英文可直接写：**An IGBT is preferred because it combines high voltage/current capability with full gate control at a moderate switching frequency.**

### 4. Switching converter vs linear regulator / transformer conversion

简答题可用这个高分框：

| 方面 | Switching power electronic converter | Linear regulator / simple transformer route |
|---|---|---|
| Efficiency | 高，常可超过 90%，因为开关主要在 on/off 状态 | linear regulator 压差大时效率低，热损耗大 |
| Size / weight | 高频开关可减小 magnetic components | 工频 transformer 通常大而重 |
| Control | 可精确控制 voltage、current、frequency、power flow | 可控性较弱或需要额外级联 |
| Flexibility | 可实现 AC-DC、DC-DC、DC-AC、AC-AC | 单一 transformer 只能改变 AC voltage level |
| Disadvantages | EMI、ripple、控制复杂、需要 filtering/protection | 简单但效率或功能受限 |

## 必背公式

### 1. Duty cycle

$$
D=\frac{t_{\mathrm{on}}}{T}=\frac{t_{\mathrm{on}}}{t_{\mathrm{on}}+t_{\mathrm{off}}}
$$

### 2. Average and RMS current

$$
I_{\mathrm{avg}}=\frac{1}{T}\int_0^T i(t)\,dt
$$

$$
I_{\mathrm{rms}}=\sqrt{\frac{1}{T}\int_0^T i^2(t)\,dt}
$$

若是矩形脉冲，on 时电流为 $I_m$、off 时为 0：

$$
I_{\mathrm{avg}}=DI_m
$$

$$
I_{\mathrm{rms}}=I_m\sqrt{D}
$$

### 3. Load power

若 supply voltage 近似恒定，且 current waveform 是从 source 取电：

$$
P_{\mathrm{load}}=V_{\mathrm{supply}}I_{\mathrm{avg}}
$$

若是纯电阻负载：

$$
P=I_{\mathrm{rms}}^2R=\frac{V_{\mathrm{rms}}^2}{R}
$$

### 4. MOSFET conduction loss

$$
P_{\mathrm{cond}}=I_{D,\mathrm{rms}}^2R_{DS(on)}
$$

注意：这里必须用 $I_{D,\mathrm{rms}}$，不能用 $I_{\mathrm{avg}}$。

### 5. MOSFET switching loss

常用线性 overlap 近似：

$$
P_{\mathrm{sw}}\approx \frac{1}{2}V_{DS}I_D(t_r+t_f)f_s
$$

这里的 $I_D$ 是 switching instant 的近似电流，不是 $I_{\mathrm{avg}}$ 或 $I_{\mathrm{rms}}$。若 turn-on 和 turn-off 时电流不同，应分别用 $I_{\mathrm{on}}$ 和 $I_{\mathrm{off}}$。

若题目把 turn-on 和 turn-off 分开给：

$$
P_{\mathrm{sw}}\approx \frac{1}{2}f_sV_{DS}\left(I_{\mathrm{on}}t_{\mathrm{on,sw}}+I_{\mathrm{off}}t_{\mathrm{off,sw}}\right)
$$

若题目直接给 switching energy：

$$
P_{\mathrm{sw}}=(E_{\mathrm{on}}+E_{\mathrm{off}})f_s
$$

### 6. Total semiconductor loss

$$
P_{\mathrm{tot}}=P_{\mathrm{cond}}+P_{\mathrm{sw}}+P_{RR}
$$

MOSFET 主开关题通常先写：

$$
P_{\mathrm{tot}}\approx P_{\mathrm{cond}}+P_{\mathrm{sw}}
$$

## 图像/波形/拓扑

### 1. MOSFET switching overlap 图像要点

考试画图不用复杂，关键是标出 **voltage-current overlap area**：

```text
Turn-on:                         Turn-off:

v_DS  high \                     v_DS  low  /
           \                              /
            \ low                    high/

i_D   low  /                     i_D   high\
          /                                \
     high/                              low \

p = v_DS i_D 在斜坡重叠区形成近似三角形能量。
```

### 2. MOSFET current waveform 解题图像

```text
i_D
│        / ramp or pulse
│       /
│______/────────
│      ← t_on →  ← t_off →
└────────────────────── t
       T = t_on + t_off
```

标图必须包含：current scale、time scale、$t_{\mathrm{on}}$、$T$、peak/initial/final current、单位。

## 做题步骤

### MOSFET waveform + loss 标准步骤

1. **读周期和 duty**：先从图上读 $t_{\mathrm{on}}$、$t_{\mathrm{off}}$、$T$，求 $D$。
2. **分段写电流**：矩形直接用公式；斜坡或三角波用积分面积。
3. **求 average current**：用于 source/load average power，常见是 $P_{\mathrm{load}}=VI_{\mathrm{avg}}$。
4. **求 RMS current**：用于热效应和 conduction loss。
5. **算 conduction loss**：$P_{\mathrm{cond}}=I_{D,\mathrm{rms}}^2R_{DS(on)}$。
6. **算 switching loss**：统一单位后代入 $V_{DS}$、$I_D$、switching time、$f_s$。
7. **合并损耗**：$P_{\mathrm{tot}}=P_{\mathrm{cond}}+P_{\mathrm{sw}}$，后续 thermal 题用这个值。

### Which current is used where?

| 电流/功率 | 用在哪里 | 不能误用成什么 |
|---|---|---|
| $I_{\mathrm{avg}}$ | constant supply 下的 average load/source power，例如 $P=VI_{\mathrm{avg}}$ | 不用于 conduction heating |
| $I_{\mathrm{rms}}$ | resistor heating、MOSFET conduction loss、thermal source | 不等于 average current |
| $I_{\mathrm{on}}$、$I_{\mathrm{off}}$ | switching loss 的 turn-on / turn-off overlap | 不一定等于 $I_{\mathrm{avg}}$ 或 $I_{\mathrm{rms}}$ |
| $P_{\mathrm{loss}}$ | thermal ladder 的输入功率 | 不要用 load power 代替 device loss |

### Ramp waveform 分段积分模板

若 on interval 内电流从 $I_1$ 线性变到 $I_2$，持续 $t_{\mathrm{on}}$，off interval 为 0：

$$
I_{\mathrm{avg}}=\frac{t_{\mathrm{on}}}{T}\frac{I_1+I_2}{2}
$$

$$
I_{\mathrm{rms}}^2=\frac{t_{\mathrm{on}}}{T}\frac{I_1^2+I_1I_2+I_2^2}{3}
$$

若有多个斜坡或平台，就对每一段分别求 $\int i(t)dt$ 和 $\int i^2(t)dt$ 后相加。2017/2018 Q3 的后续 loss 和 thermal 都依赖这一步。

### 单位检查

| 量 | 常见单位 | 换算提醒 |
|---|---|---|
| $R_{DS(on)}$ | $\mathrm{m}\Omega$ | $20\,\mathrm{m}\Omega=0.020\,\Omega$ |
| switching time | $\mathrm{ns}$ | $20\,\mathrm{ns}=20\times10^{-9}\,\mathrm{s}$ |
| period | $\mathrm{ms}$ 或 $\mu\mathrm{s}$ | 不要和 switching transition time 混淆 |
| frequency | $\mathrm{kHz}$ | $2\,\mathrm{kHz}=2000\,\mathrm{Hz}$ |
| power | $\mathrm{W}$ | thermal calculation 必须用 watt |

## 高频错误

- 用 $I_{\mathrm{avg}}^2R$ 算 MOSFET conduction loss；正确是 $I_{\mathrm{rms}}^2R$。
- 把 waveform 的 on-time $t_{\mathrm{on}}$ 与 switching transition time $t_r$、$t_f$ 混淆。
- $\mathrm{ns}$、$\mu\mathrm{s}$、$\mathrm{ms}$ 没换成秒，switching loss 差 $10^3$ 到 $10^6$ 倍。
- 选型题只写器件名，没有说明 voltage/current/power/frequency/controllability。
- 把 SCR 当作 fully-controllable switch。
- 忘记 MOSFET 的 $R_{DS(on)}$ 随 temperature 上升，实际设计要留 thermal margin。

## Past paper 连接

- **2018 Q1(a)**：ideal vs actual power switches，答案必须覆盖 static rating 和 dynamic switching behavior。
- **2018 Q1(b)**：1 MW、690 V、2 kHz wind turbine converter，标准方向是 IGBT。
- **2017 Q1(a)**：画 fully-controllable switches 并比较 power rating 与 switching frequency；优先准备 MOSFET、IGBT、GTO 或 BJT。
- **2017 Q3 / 2018 Q3**：MOSFET current waveform → $I_{\mathrm{avg}}$ → $I_{\mathrm{rms}}$ → load power → conduction loss → switching loss → thermal。
- **Lecture 13 worked solution**：2017 Q3 的套路非常典型，考试换数字时保持同样 working layout。
