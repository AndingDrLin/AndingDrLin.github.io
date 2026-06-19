---
title: "第4章 功率开关与损耗"
description: "从功率开关的实际损耗讲起，整理安全工作区、二极管反向恢复、MOSFET 损耗和器件选择题。"
date: 2026-05-17
tags: [power-electronics, 电力电子]
category: "课程学习"
docGroup: "power-electronic-notes"
order: 4
draft: false
---
## 先讲清楚

理想开关 (switch) 只有两个状态：开通时电压为 0，关断时电流为 0，所以没有损耗 (loss)。

实际功率器件不是这样。MOSFET、IGBT、二极管 (diode) 都会在两个地方损耗功率：

1. **导通 (conduction) 时**：器件上还有压降或电阻。
2. **开关 (switching) 瞬间**：电压和电流会短暂重叠。

考试里的损耗题，就是把这两部分算出来，再交给第 5 章做热分析 (thermal)。

## 器件怎么选

| 器件 | 适合什么 | 考试常写 |
|---|---|---|
| MOSFET | 高频、低/中压、驱动功率小 | 快速开关，全控型器件 |
| IGBT | 中高压、大功率、中等频率 | 高压大电流，门极控制 |
| SCR | 超大功率、工频整流 | 半控型，自然换流 |
| GTO | 高功率、可关断 | 门极可关断，但驱动复杂 |

例如 MW 级、几百伏、kHz 级变换器 (converter)，通常选 IGBT。原因是 MOSFET 高频好但高压大功率时 $R_{DS(on)}$ 和导通损耗会变大；SCR 又不能门极关断 (gate turn-off)。

## 安全工作区是什么

SOA 是安全工作区 (safe operating area)。它不是一个单独额定值，而是告诉你电压和电流能不能同时出现。

SOA 图常见边界：

| 边界 | 意思 |
|---|---|
| 电流极限 | 电流不能超过器件允许值 |
| 电压极限 | 关断耐压不能超过器件额定值 (rating) |
| 功率极限 | $P=VI$，电压电流同时大时会过热 |
| 热极限 / 脉冲极限 | 脉冲越长，允许区域越小 |
| 二次击穿 | 某些器件在高电压高电流组合下会局部失效 |

答 SOA 图题时写：开关轨迹 (switching trajectory) 必须保持在 SOA 内部。

## 二极管反向恢复

二极管从导通变成反向阻断时，不会立刻停流。内部存储电荷需要抽走，会出现反向恢复电流 (reverse recovery current)。

要标的量：

| 符号 | 意思 |
|---|---|
| $V_F$ | 稳态正向 (forward) 压降 |
| $I_F$ | 正向电流 |
| $V_{FP}$ | 开通瞬间正向电压峰值 |
| $V_R$ | 反向 (reverse) 阻断电压 |
| $I_{rr}$ | 反向恢复峰值电流 |
| $t_{rr}$ | 反向恢复时间 |
| $Q_{rr}$ | 反向恢复电荷 |

题图符号可能略有不同，按题图名称解释。

## 二极管损耗

正向导通损耗 (forward conduction loss)：

$$
P_F\approx V_F I_{F,avg}
$$

反向恢复损耗 (reverse recovery loss)：

$$
P_{RR}=Q_{RR}V_Rf_s
$$

总损耗：

$$
P_D\approx P_F+P_{RR}
$$

注意 $V_R$ 是反向阻断电压，不是 $V_F$。

## MOSFET 导通损耗

MOSFET 导通时像一个小电阻：

$$
P_{cond}=I_{D,rms}^2R_{DS(on)}
$$

这里必须用有效值电流 (RMS current)。因为导通损耗本质上也是发热。

## MOSFET 开关损耗

开通和关断时，$v_{DS}$ 和 $i_D$ 有一小段重叠。若按线性重叠近似：

$$
P_{sw}=\frac{f_sV_{DS,off}}{2}\left(t_{on,sw}I_{on}+t_{off,sw}I_{off}\right)
$$

如果题目只给 $t_r,t_f$ 和一个电流，可写：

$$
P_{sw}\approx\frac12V_{DS}I_D(t_r+t_f)f_s
$$

这里的电流是开关瞬间的电流，不是平均值。

## 例题：MOSFET 损耗计算

已知 MOSFET 电流是矩形脉冲，导通时 $10\,\mathrm{A}$，占空比 (duty cycle) $D=0.4$，$R_{DS(on)}=50\,\mathrm{m}\Omega$。求导通损耗。

先求有效值：

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

MOSFET 可以相对容易并联，因为 $R_{DS(on)}$ 通常有正温度系数 (positive temperature coefficient)。

某一只 MOSFET 变热后，$R_{DS(on)}$ 增大，它分到的电流会下降。这有助于均流 (current sharing)。

但不能只靠这个。实际还要：配对器件 (matched devices)、对称布局 (layout)、源极 (source) 电阻、单独栅极 (gate) 电阻、降额 (derating)。

## 固定套路

损耗题按这几步：

1. 从波形求 $I_{avg}$ 和 $I_{rms}$
2. 二极管：$P_F = V_F I_{avg}$，$P_{RR} = Q_{RR} V_R f_s$
3. MOSFET：$P_{cond} = I_{rms}^2 R_{DS(on)}$
4. MOSFET：$P_{sw} = \frac{1}{2} V I t f_s$
5. $P_{total}$ = 各项相加
6. 把 $P_{total}$ 送到热分析题

## 别丢分

- MOSFET 导通损耗用有效值 (RMS)。
- 开关损耗的电流看开关瞬间。
- ns、$\mu$s 要换成秒。
- $\mathrm{m}\Omega$ 要换成 $\Omega$。
- 反向恢复损耗用 $V_R$。
- SOA 要讲电压、电流、功率、热限制。
- SCR 不是全控型器件。
