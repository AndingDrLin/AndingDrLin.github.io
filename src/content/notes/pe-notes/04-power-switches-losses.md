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

### 开关瞬态波形怎么画（2023Q2 型，6 分画波形题）

考试经常要求画 MOSFET 在开关切换瞬间的 $v_{DS}$ 和 $i_D$ 波形，并标注数值。很多人只画了稳态，漏掉了瞬态重叠区——直接扣一半分。

**关断瞬间（ON → OFF）的波形：**

关断时，$i_D$ 和 $v_{DS}$ 同时变化，有一段时间两者都处于中间值——这就是开关损耗的来源。

1. 关断开始前：$i_D=I_{OFF}$（如 24A），$v_{DS}\approx 0$（导通状态）
2. 在 $t_{off,sw}$ 时间内：$v_{DS}$ 从 0 线性上升到 $V_{DS}$（如 200V），同时 $i_D$ 从 $I_{OFF}$ 线性下降到 0
3. 重叠区域是一个三角形——$v_{DS}$ 和 $i_D$ 都不为零，瞬时功率 $p=v_{DS}\times i_D$ 很大
4. 关断完成后：$v_{DS}=V_{DS}$，$i_D=0$

**开通瞬间（OFF → ON）的波形：**

1. 开通开始前：$v_{DS}=V_{DS}$，$i_D=0$（关断状态）
2. 在 $t_{on,sw}$ 时间内：$i_D$ 从 0 线性上升到 $I_{ON}$（如 16A），同时 $v_{DS}$ 从 $V_{DS}$ 线性下降到 0
3. 同样有一个三角形重叠区
4. 开通完成后：$i_D=I_{ON}$，$v_{DS}\approx 0$

**画法要点：**

- 重叠区画成两条交叉的斜线——一条从高到低，一条从低到高
- 在重叠区旁边写"开关损耗 = $\frac{1}{2}VI \cdot t$"
- 标注 $t_{on,sw}$、$t_{off,sw}$ 的时间宽度（ns 级）
- 标注重叠区的 $V_{DS}$ 和 $I_D$ 的最大值

**考试关键观察：** 关断时电流是 $I_{OFF}$，开通时电流是 $I_{ON}$。如果 $I_{OFF}\neq I_{ON}$（Buck 变换器的三角波电流），两个重叠区的面积不同，必须分别计算再加起来。这就是为什么公式写成两项之和：

$$
P_{sw}=\frac{f_sV_{DS}}{2}\left(t_{on,sw}I_{ON}+t_{off,sw}I_{OFF}\right)
$$

两项分别是开通和关断的损耗。如果 $I_{ON}=I_{OFF}$（矩形脉冲电流），可以简化成 $\frac{1}{2}V_{DS}I_D(t_{on}+t_{off})f_s$。

### 开关时间 $t_{on,sw}$ 和 $t_{off,sw}$ 的说明

$t_{on,sw}$ 是开通期间电压和电流重叠的时间（对应 $t_r$），$t_{off,sw}$ 是关断期间重叠的时间（对应 $t_f$）。题目可能给 $t_{on}$、$t_{off}$、$t_r$、$t_f$ 等不同名称，含义可能略有不同：

- $t_r$（rise time）：电流上升时间，开通期间的重叠时间
- $t_f$（fall time）：电流下降时间，关断期间的重叠时间
- $t_{on}$（turn-on time）：包含延迟+上升，但损耗计算只用重叠部分

考试里如果题目同时给 $t_{on,sw}$ 和 $t_{off,sw}$，直接代入公式。如果只给了一个时间，按对称假设或按题目指示处理。

## 例题：MOSFET 导通损耗计算

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

## 非对称电流的 MOSFET 完整损耗例题（模拟 2023Q2，25 分）

这道题是考试最高分值的 MOSFET 题型。电流波形不对称（$I_{ON}\neq I_{OFF}$），必须分别算开通和关断的损耗。

### 已知

MOSFET 工作在 Buck 变换器中。关断电流 $I_{OFF}=24\,\mathrm{A}$，导通电流 $I_{ON}=16\,\mathrm{A}$，占空比 $D=50\%$，$V_{DS}=200\,\mathrm{V}$，$R_{DS(on)}=50\,\mathrm{m}\Omega$，$t_{on,sw}=25\,\mathrm{ns}$，$t_{off,sw}=30\,\mathrm{ns}$，$f_s=100\,\mathrm{kHz}$。

### (a) 画电流和电压波形，标数值

这是 2023Q2 的 6 分画波形题。必须按步骤来，标清楚所有数值。

**画 MOSFET 波形的固定做法：**

**第 1 步：画时间轴。** 标一个完整周期 $T=1/f_s=10\,\mu\mathrm{s}$，ON/OFF 分界在 $DT=5\,\mu\mathrm{s}$。

**第 2 步：画 $i_D$（MOSFET 电流）。**

在 Buck 变换器中，$I_{ON}$ 和 $I_{OFF}$ 分别是开关**开通瞬间**和**关断瞬间**的电流。电感电流是三角波，所以：
- 开通瞬间电流 $=I_{L,min}=I_{ON}=16\,\mathrm{A}$（电感电流最小值）
- 关断瞬间电流 $=I_{L,max}=I_{OFF}=24\,\mathrm{A}$（电感电流最大值）

所以导通期间（$0$ 到 $DT$）：$i_D$ 从 $16\,\mathrm{A}$ 线性上升到 $24\,\mathrm{A}$（斜率为正）。
关断期间（$DT$ 到 $T$）：$i_D=0$（电流走续流二极管）。

**标注：** 在 $i_D$ 波形上标 $I_{ON}=16\,\mathrm{A}$、$I_{OFF}=24\,\mathrm{A}$、$DT$ 分界线。

**第 3 步：画 $v_{DS}$（MOSFET 电压）。**

- 导通期间：$v_{DS}=i_D\times R_{DS(on)}\approx 0$（很小，可以画成贴近时间轴的线）
- 关断期间：$v_{DS}=V_{DS}=200\,\mathrm{V}$（水平线）

**标注：** 在 $v_{DS}$ 波形上标 $V_{DS}=200\,\mathrm{V}$、$0\,\mathrm{V}$。

**第 4 步：画开关瞬态（加分项）。**

在 ON→OFF 和 OFF→ON 的切换瞬间，画出 $v_{DS}$ 和 $i_D$ 的重叠区：
- 关断瞬间：$i_D$ 从 $24\,\mathrm{A}$ 降到 $0$（$t_{off,sw}=30\,\mathrm{ns}$），同时 $v_{DS}$ 从 $0$ 升到 $200\,\mathrm{V}$
- 开通瞬间：$v_{DS}$ 从 $200\,\mathrm{V}$ 降到 $0$（$t_{on,sw}=25\,\mathrm{ns}$），同时 $i_D$ 从 $0$ 升到 $16\,\mathrm{A}$

重叠区域就是开关损耗的来源。画一个很小的斜线交叉区即可。

> **丢分点：** 很多人把 $i_D$ 画成矩形脉冲（恒定值），这是错的——Buck 变换器的 MOSFET 电流是斜坡（因为电感电流是三角波）。如果题目说 $I_{ON}=I_{OFF}$，那才是矩形。

### (b) 求平均电流和 RMS 电流

电流波形是线性斜坡从 $I_1=16\,\mathrm{A}$ 到 $I_2=24\,\mathrm{A}$，持续时间 $DT$，然后为 $0$ 持续 $(1-D)T$。

**平均电流：**

斜坡段平均值：

$$
I_{avg,ramp}=\frac{I_1+I_2}{2}=\frac{16+24}{2}=20\,\mathrm{A}
$$

整个周期平均值：

$$
I_{avg}=D\times I_{avg,ramp}=0.5\times20=10\,\mathrm{A}
$$

**RMS 电流：**

斜坡段的 RMS（用公式 $\sqrt{(I_1^2+I_1I_2+I_2^2)/3}$）：

$$
I_{rms,ramp}=\sqrt{\frac{16^2+16\times24+24^2}{3}}=\sqrt{\frac{256+384+576}{3}}=\sqrt{\frac{1216}{3}}=\sqrt{405.3}=20.13\,\mathrm{A}
$$

整个周期 RMS（只在 $D$ 的时间内有电流）：

$$
I_{rms}=\sqrt{D}\times I_{rms,ramp}=\sqrt{0.5}\times20.13=0.707\times20.13=14.23\,\mathrm{A}
$$

### (c) 求导通损耗

$$
P_{cond}=I_{rms}^2\times R_{DS(on)}=14.23^2\times0.05
$$

$$
P_{cond}=202.5\times0.05=10.1\,\mathrm{W}
$$

### (d) 求开关损耗

$$
P_{sw}=\frac{f_s\times V_{DS}}{2}\left(t_{on,sw}\times I_{ON}+t_{off,sw}\times I_{OFF}\right)
$$

代入：

$$
P_{sw}=\frac{100\times10^3\times200}{2}\left(25\times10^{-9}\times16+30\times10^{-9}\times24\right)
$$

先算括号内：

$$
25\times10^{-9}\times16=400\times10^{-9}=4\times10^{-7}
$$

$$
30\times10^{-9}\times24=720\times10^{-9}=7.2\times10^{-7}
$$

$$
\text{括号}=4\times10^{-7}+7.2\times10^{-7}=1.12\times10^{-6}
$$

前面的系数：

$$
\frac{100\times10^3\times200}{2}=10^7
$$

$$
P_{sw}=10^7\times1.12\times10^{-6}=11.2\,\mathrm{W}
$$

### (e) 总损耗

$$
P_{total}=P_{cond}+P_{sw}=10.1+11.2=21.3\,\mathrm{W}
$$

### (f) $f_s$ 减半是否有效？

$f_s$ 从 $100\,\mathrm{kHz}$ 降到 $50\,\mathrm{kHz}$：

- **导通损耗不变**：$P_{cond}=I_{rms}^2R_{DS(on)}$，与 $f_s$ 无关。
- **开关损耗减半**：$P_{sw}\propto f_s$，降到 $50\,\mathrm{kHz}$ 时 $P_{sw}=11.2/2=5.6\,\mathrm{W}$。
- **总损耗**：$10.1+5.6=15.7\,\mathrm{W}$。

**结论：减半 $f_s$ 有效降低总损耗（从 $21.3\,\mathrm{W}$ 降到 $15.7\,\mathrm{W}$），但导通损耗不变。** 如果导通损耗已经占主导，降 $f_s$ 的效果有限。同时，降 $f_s$ 会导致纹波增大、滤波器体积增大——这是一个权衡（trade-off）。

### 关键概念：$f_s$ 对两类损耗的影响

| 损耗类型 | 与 $f_s$ 的关系 | 降低 $f_s$ 的效果 |
|---|---|---|
| 导通损耗 $P_{cond}$ | 无关（只看 $I_{rms}$ 和 $R_{DS(on)}$） | 不变 |
| 开关损耗 $P_{sw}$ | 正比于 $f_s$ | 减半 |

高频应用（$>100\,\mathrm{kHz}$）中开关损耗往往占主导，选 $R_{DS(on)}$ 小的 MOSFET 更重要。低频应用（$<10\,\mathrm{kHz}$）中导通损耗占主导。

## fs 对损耗影响的分析框架（概念题答题模板）

题目问"减半开关频率对损耗有什么影响"：

> 减半 $f_s$ 对导通损耗没有影响，因为 $P_{cond}=I_{rms}^2R_{DS(on)}$ 与频率无关。
>
> 减半 $f_s$ 会使开关损耗减半，因为 $P_{sw}\propto f_s$。
>
> 总损耗下降，下降幅度取决于开关损耗在总损耗中的占比。如果开关损耗占主导（高频应用），效果显著；如果导通损耗占主导（低频应用），效果有限。
>
> 副作用：$f_s$ 降低会导致输出纹波增大、滤波器体积增大。

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
