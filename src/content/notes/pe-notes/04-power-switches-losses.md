---
title: "第4章 Power Switches and Losses"
description: "从功率开关的实际损耗讲起，整理 SOA、diode recovery、MOSFET loss 和器件选择题。"
date: 2026-05-17
tags: [power-electronics, 电力电子]
category: "课程学习"
docGroup: "power-electronic-notes"
order: 4
draft: false
---
## 先讲清楚

理想开关只有两个状态：开通时电压为 0，关断时电流为 0，所以没有损耗。

实际功率器件不是这样。MOSFET、IGBT、diode 都会在两个地方损耗功率：

1. **导通时**：器件上还有压降或电阻。
2. **开关瞬间**：电压和电流会短暂重叠。

考试里的 loss 题，就是把这两部分算出来，再交给第 5 章做 thermal。

## 器件怎么选

| 器件 | 适合什么 | 考试常写 |
|---|---|---|
| MOSFET | 高频、低/中压、驱动功率小 | fast switching, fully controllable |
| IGBT | 中高压、大功率、中等频率 | high voltage/current, gate controlled |
| SCR | 超大功率、工频整流 | half-controllable, natural commutation |
| GTO | 高功率、可关断 | gate turn-off, but drive complex |

例如 MW 级、几百伏、kHz 级 converter，通常选 IGBT。原因是 MOSFET 高频好但高压大功率时 $R_{DS(on)}$ 和 conduction loss 会变大；SCR 又不能 gate turn off。

## SOA 是什么

SOA 是 safe operating area。它不是一个单独额定值，而是告诉你电压和电流能不能同时出现。

SOA 图常见边界：

| 边界 | 意思 |
|---|---|
| Current limit | 电流不能超过器件允许值 |
| Voltage limit | 关断耐压不能超过器件 rating |
| Power limit | $P=VI$，电压电流同时大时会过热 |
| Thermal / pulse limit | 脉冲越长，允许区域越小 |
| Secondary breakdown | 某些器件在高电压高电流组合下会局部失效 |

答 SOA 图题时写：switching trajectory must stay inside SOA。

## Diode recovery

二极管从导通变成反向阻断时，不会立刻停流。内部存储电荷需要抽走，会出现 reverse recovery current。

要标的量：

| 符号 | 意思 |
|---|---|
| $V_F$ | 稳态正向压降 |
| $I_F$ | 正向电流 |
| $V_{FP}$ | 开通瞬间正向电压峰值 |
| $V_R$ | 反向阻断电压 |
| $I_{rr}$ | 反向恢复峰值电流 |
| $t_{rr}$ | 反向恢复时间 |
| $Q_{rr}$ | 反向恢复电荷 |

题图符号可能略有不同，按题图名称解释。

## Diode loss

Forward conduction loss：

$$
P_F\approx V_F I_{F,avg}
$$

Reverse recovery loss：

$$
P_{RR}=Q_{RR}V_Rf_s
$$

总损耗：

$$
P_D\approx P_F+P_{RR}
$$

注意 $V_R$ 是反向阻断电压，不是 $V_F$。

## MOSFET conduction loss

MOSFET 导通时像一个小电阻：

$$
P_{cond}=I_{D,rms}^2R_{DS(on)}
$$

这里必须用 RMS current。因为导通损耗本质上也是发热。

## MOSFET switching loss

开通和关断时，$v_{DS}$ 和 $i_D$ 有一小段重叠。若按线性重叠近似：

$$
P_{sw}=\frac{f_sV_{DS,off}}{2}\left(t_{on,sw}I_{on}+t_{off,sw}I_{off}\right)
$$

如果题目只给 $t_r,t_f$ 和一个电流，可写：

$$
P_{sw}\approx\frac12V_{DS}I_D(t_r+t_f)f_s
$$

这里的电流是 switching instant 的电流，不是平均值。

## 例题：MOSFET loss

已知 MOSFET 电流是矩形脉冲，on 时 $10\,\mathrm{A}$，duty $D=0.4$，$R_{DS(on)}=50\,\mathrm{m}\Omega$。求 conduction loss。

先求 RMS：

$$
I_{rms}=10\sqrt{0.4}=6.32\,\mathrm{A}
$$

电阻换单位：

$$
R_{DS(on)}=50\,\mathrm{m}\Omega=0.05\,\Omega
$$

导通损耗：

$$
P_{cond}=6.32^2\times0.05=2.0\,\mathrm{W}
$$

## MOSFET 并联

MOSFET 可以相对容易并联，因为 $R_{DS(on)}$ 通常有正温度系数。

某一只 MOSFET 变热后，$R_{DS(on)}$ 增大，它分到的电流会下降。这有助于 current sharing。

但不能只靠这个。实际还要：matched devices、对称 layout、source resistor、单独 gate resistor、derating。

## 固定套路

Loss 题按这几步：

```text
1. 从波形求 I_avg 和 I_rms
2. diode：P_F = V_F I_avg，P_RR = Q_RR V_R f_s
3. MOSFET：P_cond = I_rms^2 R_DS(on)
4. MOSFET：P_sw = 1/2 V I t f_s
5. P_total = 各项相加
6. 把 P_total 送到 thermal 题
```

## 别丢分

- MOSFET conduction loss 用 RMS。
- Switching loss 的电流看开关瞬间。
- ns、$\mu$s 要换成秒。
- $\mathrm{m}\Omega$ 要换成 $\Omega$。
- Reverse recovery loss 用 $V_R$。
- SOA 要讲电压、电流、功率、热限制。
- SCR 不是 fully-controllable。
