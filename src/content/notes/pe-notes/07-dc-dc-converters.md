---
title: "第7章 DC-DC 变换器"
description: "从电感伏秒平衡讲起，整理降压、升压、升降压、反激和边界 CCM 题。"
date: 2026-05-17
tags: [power-electronics, 电力电子]
category: "课程学习"
docGroup: "power-electronic-notes"
order: 7
draft: false
---

## 为什么需要 DC-DC 变换器

电池只有一种输出电压，但电路里需要 +5V、+3.3V、+1.8V 等多种直流电压。怎么把一个直流电压变成另一个直流电压？

**线性稳压器（linear regulator）** 的做法是把晶体管当可调电阻，靠分压来降压。简单，但效率就是 $\eta = V_o / V_S$——输出越低，效率越差，多的能量全变成热。

**开关电源（SMPS, Switched Mode Power Supply）** 的做法完全不同：把晶体管当开关用，不是电阻。开关要么全开、要么全关，功耗理论上为零。再配合 LC 组成的平均电路，输出电压等于 $D \times V_S$（$D$ 为占空比）。效率可以非常高，理论上是 100%。实际电路一般能到 85%–95%。

## 电感基础知识

电感（inductor）最关键的性质：**流过电感的电流不能突变**。因为 $v_L = L\,di/dt$，电流要突变就需要无穷大的电压。

这个性质既是好处也是麻烦。好处是电感可以储存能量；麻烦是一旦把外加电压去掉，电感为了维持电流方向不变，会把电压反接——如果电路没有给电流留出路，这个反向电压会把开关管击穿。

解决办法是加一个**续流二极管（freewheeling diode）**：开关关断时，续流二极管导通，给电感电流提供通路。

电感储存的能量：

$$
E = \tfrac{1}{2}LI^2
$$

## 什么是 CCM

CCM（Continuous Conduction Mode，连续导通模式）指的是：**在开关周期内，电感电流始终大于零**，不会降到零再等一段时间。这是大多数考题默认的工作模式。

边界条件是 $I_{L,min} = 0$，此时纹波（ripple）$\Delta I_L = 2 \times I_{L,avg}$。

考试一般假设 CCM，除非题目明确说"工作在 boundary CCM"或"临界条件"。

## 先讲清楚

DC-DC 变换器（converter）不是靠电阻分压来降压或升压，而是靠开关周期性地给电感充电、放电。稳态时，电感电流每个周期回到原来的值。

所以有一个最重要的条件：电感一周期平均电压为 0。

$$
\int_0^T v_L(t)\,dt=0
$$

也就是：

$$
D v_{L,on}+(1-D)v_{L,off}=0
$$

这叫 volt-second balance（伏秒平衡）。降压、升压、升降压的公式都从它来。

## 通用做法

每道 DC-DC 题都先写这几步：

1. 画开关 ON 等效电路
2. 画开关 OFF 等效电路
3. 写 $v_{L,on}$ 和 $v_{L,off}$
4. 用伏秒平衡推 $V_o$ 和占空比（duty cycle）$D$
5. 用 $\Delta i_L = v_L \Delta t / L$ 算纹波（ripple）
6. 用平均电流算 $I_{max}$ 和 $I_{min}$

### 纹波电流公式推导（2025Q3a 型，4 分）

从电感基本方程出发：

$$
v_L=L\frac{di_L}{dt}
$$

分离变量：

$$
di_L=\frac{v_L}{L}\,dt
$$

在开关 ON 期间（$0$ 到 $DT$），$v_L$ 是常数 $v_{L,on}$。电流从 $I_{L,min}$ 线性升到 $I_{L,max}$：

$$
\Delta i_L=I_{L,max}-I_{L,min}=\int_0^{DT}\frac{v_{L,on}}{L}\,dt=\frac{v_{L,on}}{L}\times DT
$$

$$
\boxed{\Delta i_L=\frac{v_{L,on}\cdot D}{L\cdot f_s}}
$$

因为 $DT=D/f_s$。

对 Buck：$v_{L,on}=V_{in}-V_o$，所以 $\Delta i_L=\frac{(V_{in}-V_o)D}{Lf_s}$

对 Boost：$v_{L,on}=V_{in}$，所以 $\Delta i_L=\frac{V_{in}D}{Lf_s}$

对 Buck-Boost：$v_{L,on}=V_{in}$，所以 $\Delta i_L=\frac{V_{in}D}{Lf_s}$

也可以用 OFF 期间推导，结果相同（伏秒平衡保证了两种算法等价）：

$$
\Delta i_L=\frac{|v_{L,off}|\cdot(1-D)}{Lf_s}
$$

纹波（峰峰值）：

$$
\Delta i_L=\frac{v_L\Delta t}{L}
$$

最大最小电流：

$$
I_{L,max}=I_{L,avg}+\frac{\Delta i_L}{2}
$$

$$
I_{L,min}=I_{L,avg}-\frac{\Delta i_L}{2}
$$

### 求 $t_{on}$（2025Q3a 型，2 分）

题目有时要求算开关导通时间 $t_{on}$，不是占空比 $D$。关系：

$$
t_{on}=D\times T=\frac{D}{f_s}
$$

例：$D=0.4$，$f_s=100\,\mathrm{kHz}$，则 $t_{on}=0.4/100000=4\,\mu\mathrm{s}$。

### 求 $I_o$ 的三种方式（2025Q3a 型，3 分）

输出电流 $I_o$ 不一定要从波形积分，还可以从功率或电阻反推：

| 已知条件 | 公式 |
|---|---|
| 负载电阻 $R$ 和输出电压 $V_o$ | $I_o=V_o/R$ |
| 输出功率 $P_o$ 和输出电压 $V_o$ | $I_o=P_o/V_o$ |
| 输入功率和效率 | $P_{out}=\eta P_{in}$，再 $I_o=P_{out}/V_o$ |

考试里最常用的是第一个：$I_o=V_o/R$。如果给了 $P_o$ 和 $V_o$，用第二个。

### 2025Q3a 完整例题：Buck 全流程（20 分）

这道题把 Buck 的所有计算串起来，按顺序走不容易漏。

**已知：** Buck 变换器，$V_{in}=12\,\mathrm{V}$，$V_o=7.5\,\mathrm{V}$，$P_o=5\,\mathrm{W}$，$f_s=100\,\mathrm{kHz}$，$L=50\,\mu\mathrm{H}$。

**(a) 识别拓扑。**

输入 $12\,\mathrm{V}$，输出 $7.5\,\mathrm{V}$，$V_o<V_{in}$，是 Buck（降压）变换器。

**(b) 推导 $V_o$。**

用伏秒平衡（见前面"从零推导"），结果为 $V_o=DV_{in}$。

**(c) 求占空比 $D$。**

$$
D=\frac{V_o}{V_{in}}=\frac{7.5}{12}=0.625
$$

**(d) 求导通时间 $t_{on}$。**

$$
T=\frac{1}{f_s}=\frac{1}{100\times10^3}=10\,\mu\mathrm{s}
$$

$$
t_{on}=D\times T=0.625\times10=6.25\,\mu\mathrm{s}
$$

**(e) 求输出电流 $I_o$。**

题目给了功率，用 $I_o=P_o/V_o$：

$$
I_o=\frac{P_o}{V_o}=\frac{5}{7.5}=0.667\,\mathrm{A}
$$

Buck 的电感平均电流等于输出电流：

$$
I_{L,avg}=I_o=0.667\,\mathrm{A}
$$

**(f) 推导 $\Delta i_L$ 并代入数值。**

从 $v_L=L\frac{di_L}{dt}$ 出发，ON 期间 $v_{L,on}=V_{in}-V_o=4.5\,\mathrm{V}$，持续时间 $DT$：

$$
\Delta i_L=\frac{v_{L,on}\cdot DT}{L}=\frac{(V_{in}-V_o)D}{Lf_s}
$$

$$
\Delta i_L=\frac{(12-7.5)\times0.625}{50\times10^{-6}\times100\times10^3}=\frac{4.5\times0.625}{5}=\frac{2.8125}{5}=0.5625\,\mathrm{A}
$$

**(g) 求 $I_{L,max}$ 和 $I_{L,min}$。**

$$
I_{L,max}=I_{L,avg}+\frac{\Delta i_L}{2}=0.667+0.281=0.948\,\mathrm{A}
$$

$$
I_{L,min}=I_{L,avg}-\frac{\Delta i_L}{2}=0.667-0.281=0.386\,\mathrm{A}
$$

$I_{L,min}=0.386>0$，所以是 CCM。

**(h) 画四个波形。**

$v_L$：ON 段 $+4.5\,\mathrm{V}$（$0$ 到 $6.25\,\mu\mathrm{s}$），OFF 段 $-7.5\,\mathrm{V}$（$6.25$ 到 $10\,\mu\mathrm{s}$）。

$i_L$：从 $0.386\,\mathrm{A}$ 上升到 $0.948\,\mathrm{A}$（ON 段），再下降回 $0.386\,\mathrm{A}$（OFF 段）。

$i_{in}$：ON 期间 $=i_L$ 的上升段，OFF 期间 $=0$。

$i_{out}$：近似恒定 $I_o=0.667\,\mathrm{A}$（输出电容吸收纹波）。

## 降压变换器（Buck converter）

降压是 $V_o < V_{in}$。这是最简单的 DC-DC 拓扑，考试常考（2022Q3、2024Q3ai、2025Q3a）。

### 从零推导 $V_o$（考试必备，逐步不跳步）

这个推导和 Buck-Boost 一样，按"开关状态→写 $v_L$→伏秒平衡→解 $V_o$"四步走。考试必须能在白纸上独立复现。

**第 1 步：开关 ON 的等效电路。**

输入电压 $V_{in}$ 直接加到电感和负载上。电流从输入经开关管、电感流向负载。电感储能增加。

$$
v_{L,on}=V_{in}-V_o
$$

注意：这里 $V_o$ 是负载两端的电压（假设输出电容足够大，$V_o$ 基本恒定）。电感"看到"的电压是输入电压减去输出电压。

**第 2 步：开关 OFF 的等效电路。**

开关断开。电感电流不能突变，续流二极管导通，电感通过二极管继续给负载供电。电感两端电压只剩输出电压（反向）：

$$
v_{L,off}=-V_o
$$

这里 $V_o$ 是正值，$v_{L,off}$ 是负值——电感在释放能量，电流线性下降。

**第 3 步：伏秒平衡。**

稳态时电感一周期平均电压为零：

$$
v_{L,on}\times DT+v_{L,off}\times(1-D)T=0
$$

代入：

$$
(V_{in}-V_o)\cdot DT+(-V_o)\cdot(1-D)T=0
$$

两边除以 $T$：

$$
(V_{in}-V_o)D-V_o(1-D)=0
$$

**第 4 步：展开并解 $V_o$。**

$$
V_{in}D-V_oD-V_o+V_oD=0
$$

注意 $-V_oD$ 和 $+V_oD$ 抵消：

$$
V_{in}D-V_o=0
$$

$$
\boxed{V_o=DV_{in}}
$$

**占空比反推公式：**

$$
D=\frac{V_o}{V_{in}}
$$

**边界检查：**
- $D=0$：$V_o=0$（不开关就没有输出），正确
- $D=1$：$V_o=V_{in}$（一直导通，输入直接到输出），正确
- $D=0.5$：$V_o=V_{in}/2$（降一半），正确

> **为什么 Buck 只能降压？** 因为 $D\le 1$，所以 $V_o=DV_{in}\le V_{in}$。这是拓扑结构决定的——输出永远不可能超过输入。

### 电感平均电流 $I_{L,avg}$

Buck 的电感直接串在输出回路里，所以电感平均电流等于输出电流：

$$
I_{L,avg}=I_o
$$

对比三种拓扑（必背）：
- Buck：$I_{L,avg}=I_o$（电感在输出侧）
- Boost：$I_{L,avg}=I_{in}=\frac{I_o}{1-D}$（电感在输入侧）
- Buck-Boost：$I_{L,avg}=\frac{I_o}{1-D}$（电感在中间，只有 OFF 期间给输出）

## 例题 1：降压

$V_{in}=12\,\mathrm{V}$，$V_o=5\,\mathrm{V}$，$f_s=50\,\mathrm{kHz}$，$L=100\,\mu\mathrm{H}$，$I_o=0.5\,\mathrm{A}$。求占空比和电感电流纹波。

占空比：

$$
D=\frac{V_o}{V_{in}}=\frac{5}{12}=0.417
$$

纹波：

$$
\Delta i_L=\frac{(12-5)\times0.417}{100\times10^{-6}\times50\times10^3}
$$

$$
\Delta i_L=0.584\,\mathrm{A}
$$

平均值（average）电感电流：

$$
I_{L,avg}=I_o=0.5\,\mathrm{A}
$$

最大最小：

$$
I_{L,max}=0.5+0.584/2=0.792\,\mathrm{A}
$$

$$
I_{L,min}=0.5-0.584/2=0.208\,\mathrm{A}
$$

$ I_{L,min}>0 $，所以是 CCM。

### Buck 画 4 波形完整例题（模拟 2022Q3h，13 分）

2022Q3 要求画 Buck 变换器的 $v_L$、$i_L$、$i_{in}$、$i_{out}$ 四个波形。下面用上面例题 1 的数值完整画出。

**已知：** $V_{in}=12\,\mathrm{V}$，$V_o=5\,\mathrm{V}$，$f_s=50\,\mathrm{kHz}$，$L=100\,\mu\mathrm{H}$，$I_o=0.5\,\mathrm{A}$，$D=0.417$。

**周期和时间：**

$$
T=\frac{1}{f_s}=\frac{1}{50\times10^3}=20\,\mu\mathrm{s}
$$

$$
DT=0.417\times20=8.34\,\mu\mathrm{s}
$$

$$
(1-D)T=0.583\times20=11.66\,\mu\mathrm{s}
$$

**已算出的电流参数：**

$$
I_{L,avg}=0.5\,\mathrm{A},\quad\Delta i_L=0.584\,\mathrm{A}
$$

$$
I_{L,max}=0.792\,\mathrm{A},\quad I_{L,min}=0.208\,\mathrm{A}
$$

**第 1 步：画 $v_L$（电感电压）。**

Buck 的 $v_L$ 两段常数：

- ON 期间（$0$ 到 $DT$）：$v_{L,on}=V_{in}-V_o=12-5=+7\,\mathrm{V}$
- OFF 期间（$DT$ 到 $T$）：$v_{L,off}=-V_o=-5\,\mathrm{V}$

**画法：** 在 $0$ 到 $8.34\,\mu\mathrm{s}$ 画 $+7\,\mathrm{V}$ 水平线，在 $8.34$ 到 $20\,\mu\mathrm{s}$ 画 $-5\,\mathrm{V}$ 水平线。

**检查伏秒平衡：**

$$
7\times8.34+(-5)\times11.66=58.4-58.3\approx0\quad\checkmark
$$

ON 段面积（正）$\approx$ OFF 段面积（负），说明算对了。

**第 2 步：画 $i_L$（电感电流）。**

$i_L$ 是从 $I_{L,min}=0.208\,\mathrm{A}$ 线性上升到 $I_{L,max}=0.792\,\mathrm{A}$，再线性下降回到 $0.208\,\mathrm{A}$ 的三角波。

**ON 段斜率：**

$$
\frac{di_L}{dt}\bigg|_{ON}=\frac{v_{L,on}}{L}=\frac{7}{100\times10^{-6}}=70\,000\,\mathrm{A/s}=0.07\,\mathrm{A/\mu s}
$$

验证：$0.07\times8.34=0.584\,\mathrm{A}=\Delta i_L$。正确。

**OFF 段斜率：**

$$
\frac{di_L}{dt}\bigg|_{OFF}=\frac{v_{L,off}}{L}=\frac{-5}{100\times10^{-6}}=-50\,000\,\mathrm{A/s}=-0.05\,\mathrm{A/\mu s}
$$

验证：$|-0.05|\times11.66=0.583\,\mathrm{A}\approx\Delta i_L$。正确。

**画法：** 从 $0.208\,\mathrm{A}$ 开始，以较缓的斜率（$0.07\,\mathrm{A/\mu s}$）上升 $8.34\,\mu\mathrm{s}$ 到 $0.792\,\mathrm{A}$，再以更缓的斜率（$-0.05\,\mathrm{A/\mu s}$）下降 $11.66\,\mu\mathrm{s}$ 回到 $0.208\,\mathrm{A}$。

**关键特征：** Buck 的 $i_L$ 永远在时间轴上方（$I_{L,min}=0.208>0$，CCM 模式）。ON 段斜率更陡（因为 $V_{in}-V_o>V_o$），所以三角波是上升段短而陡、下降段长而缓。

**第 3 步：画 $i_{in}$（输入电流）。**

Buck 的 $i_{in}$ 只在 ON 期间出现，等于 $i_L$ 的 ON 段。

**画法：** $0$ 到 $8.34\,\mu\mathrm{s}$：从 $0.208\,\mathrm{A}$ 线性上升到 $0.792\,\mathrm{A}$（和 $i_L$ 的上升段完全重合）。$8.34$ 到 $20\,\mu\mathrm{s}$：$0\,\mathrm{A}$。

**为什么？** Buck 变换器中，ON 期间输入电压直接给电感充电，输入电流 = 电感电流。OFF 期间开关断开，输入电流为零。

**第 4 步：画 $i_{out}$（输出电流）。**

Buck 的电感在输出侧，电感电流全部流向负载。但电感电流是三角波，而负载需要的是平均电流。中间的电容吸收了纹波部分。

输出电流 $i_{out}$ 的平均值 $=I_o=I_{L,avg}=0.5\,\mathrm{A}$，纹波很小（被输出电容吸收）。考试画波形时，$i_{out}$ 画成一条直线（恒定值 $I_o$）即可——如果题目没有特别要求考虑输出电容的纹波电流。

**画法：** 一条水平线在 $0.5\,\mathrm{A}$。

> **注意：** Buck 的 $i_{out}$ 和 Buck-Boost 的 $i_{out}$ 完全不同。Buck-Boost 的电感只在 OFF 期间向输出供电，所以 $i_{out}$ 是断续的。Buck 的电感始终在输出侧，$i_{out}$ 近似连续。

### Buck 与 Buck-Boost 的波形差异对比

| 波形 | Buck | Buck-Boost |
|---|---|---|
| $v_{L,on}$ | $V_{in}-V_o$（正） | $V_{in}$（正） |
| $v_{L,off}$ | $-V_o$（负） | $-\|V_o\|$（负） |
| $i_{in}$ 出现区间 | 仅 ON 期间 | 仅 ON 期间 |
| $i_{out}$ 出现区间 | 全周期（近似恒定） | 仅 OFF 期间（断续） |
| $I_{L,avg}$ | $I_o$ | $I_o/(1-D)$ |
| $i_L$ 形状 | 上升段短而陡 | 上升段短而陡 |

**核心区别：** Buck 的电感在输出侧，所以输出电流连续；Buck-Boost 的电感在中间，输出电流只在 OFF 期间出现。

## 升压变换器（Boost converter）

升压是 $V_o > V_{in}$。考试 2024Q3aii 和 2025Q3b 都涉及升压原理。

### 从零推导 $V_o$（考试必备，逐步不跳步）

**第 1 步：开关 ON 的等效电路。**

开关导通，输入电压 $V_{in}$ 直接加在电感两端。电感电流线性上升、储存能量。此时二极管阳极接地（通过开关），阴极接输出正端，二极管反偏。负载与输入断开，完全由输出电容供电。

$$
v_{L,on}=V_{in}
$$

注意：ON 期间电感只和输入打交道，输出端完全靠电容撑着。

**第 2 步：开关 OFF 的等效电路。**

开关断开。电感电流不能突变，电感电压反接，和输入电源串联起来向输出放电。此时电感和输入一起"抬"输出电压，电感两端电压：

$$
v_{L,off}=V_{in}-V_o
$$

因为 $V_o>V_{in}$（升压），所以 $v_{L,off}$ 是负值——电感在释放能量，电流线性下降。

**第 3 步：伏秒平衡。**

$$
v_{L,on}\times DT+v_{L,off}\times(1-D)T=0
$$

代入：

$$
V_{in}\cdot DT+(V_{in}-V_o)\cdot(1-D)T=0
$$

两边除以 $T$：

$$
V_{in}D+(V_{in}-V_o)(1-D)=0
$$

**第 4 步：展开并解 $V_o$。**

$$
V_{in}D+V_{in}(1-D)-V_o(1-D)=0
$$

$$
V_{in}[D+(1-D)]-V_o(1-D)=0
$$

$$
V_{in}-V_o(1-D)=0
$$

$$
\boxed{V_o=\frac{V_{in}}{1-D}}
$$

**占空比反推公式：**

$$
D=1-\frac{V_{in}}{V_o}
$$

**边界检查：**
- $D=0$：$V_o=V_{in}$（不开关，输入直接到输出），正确
- $D=0.5$：$V_o=2V_{in}$（升一倍），正确
- $D\to 1$：$V_o\to\infty$（理论上，实际受限于寄生参数），正确

> **为什么 Boost 只能升压？** 因为 $D<1$，所以 $1-D>0$ 且 $1-D<1$，故 $V_o=V_{in}/(1-D)>V_{in}$。

### 电感平均电流

Boost 的电感在输入侧，电感平均电流等于输入电流：

$$
I_{L,avg}=I_{in}=\frac{V_oI_o}{V_{in}}=\frac{I_o}{1-D}
$$

第二步用了功率守恒（理想情况 $V_{in}I_{in}=V_oI_o$）和 $V_o/V_{in}=1/(1-D)$。

![Boost converter waveforms](./assets/boost_waveforms.svg)

## 升降压变换器（Buck-Boost converter）

升降压可升可降，但输出极性反相。这是考试最高频的拓扑——2023Q3 整道 25 分大题考的就是它。

### 为什么叫"升降压"

$D<0.5$ 时输出幅值小于输入（降压），$D>0.5$ 时输出幅值大于输入（升压）。$D=0.5$ 时输出幅值等于输入（但极性反了）。所以一个拓扑搞定两种功能，代价是输出为负。

### 从零推导 $V_o$（考试必备，逐步不跳步）

这个推导过程考试必须能在白纸上复现。按"开关状态→写 $v_L$→伏秒平衡→解 $V_o$"四步走。

**第 1 步：开关 ON 的等效电路。**

开关导通时，输入电压 $V_{in}$ 直接加在电感两端。二极管反偏（因为二极管阴极端被电感电压拉到高于阳极端），输出端与输入断开，负载由输出电容供电。

$$
v_{L,on}=V_{in}
$$

**第 2 步：开关 OFF 的等效电路。**

开关断开，电感电流不能突变，通过二极管流向输出端。此时电感两端电压等于输出电压（注意输出为负，因为电流方向使输出端极性反转）。

$$
v_{L,off}=-|V_o|
$$

为了让推导更清楚，设 $|V_o|=V_o'$（正值），$v_{L,off}=-V_o'$。

**第 3 步：伏秒平衡。**

$$
v_{L,on}\times DT + v_{L,off}\times(1-D)T=0
$$

代入：

$$
V_{in}\cdot DT+(-V_o')\cdot(1-D)T=0
$$

两边除以 $T$：

$$
V_{in}D-V_o'(1-D)=0
$$

**第 4 步：解 $V_o'$。**

$$
V_o'(1-D)=V_{in}D
$$

$$
V_o'=\frac{D}{1-D}V_{in}
$$

所以输出电压幅值为：

$$
|V_o|=\frac{D}{1-D}V_{in}
$$

因为输出极性与输入相反，实际 $V_o=-\frac{D}{1-D}V_{in}$。

**占空比反推公式（从输出电压求 $D$）：**

$$
D=\frac{|V_o|}{V_{in}+|V_o|}
$$

**边界检查（防止代入算错）：**
- $D=0$：$|V_o|=0$（不开关就没有输出），正确
- $D=0.5$：$|V_o|=V_{in}$（升降相等），正确
- $D\to 1$：$|V_o|\to\infty$（理论上，实际不可能），正确

### 电感平均电流 $I_{L,avg}$

Buck-Boost 的电感在 OFF 期间才向输出供电，所以输出平均电流只取电感电流的 $(1-D)$ 部分：

$$
I_o=(1-D)\times I_{L,avg}
$$

反推电感平均电流：

$$
I_{L,avg}=\frac{I_o}{1-D}
$$

对比三种拓扑：
- Buck：$I_{L,avg}=I_o$（电感在输出侧）
- Boost：$I_{L,avg}=I_{in}=\frac{I_o}{1-D}$（电感在输入侧）
- Buck-Boost：$I_{L,avg}=\frac{I_o}{1-D}$（电感在中间，只有 OFF 期间给输出）

### 纹波电流

$$
\Delta i_L=\frac{V_{in}\cdot D}{L\cdot f_s}
$$

这是因为 ON 期间电感两端电压是 $V_{in}$，持续时间 $DT$。

### 最大最小电流

$$
I_{L,max}=I_{L,avg}+\frac{\Delta i_L}{2}
$$

$$
I_{L,min}=I_{L,avg}-\frac{\Delta i_L}{2}
$$

### Buck-Boost 完整例题（模拟 2023Q3，25 分）

**已知：** Buck-Boost 变换器，$V_{in}=12\,\mathrm{V}$，$|V_o|=5\,\mathrm{V}$，$f_s=100\,\mathrm{kHz}$，$L=50\,\mu\mathrm{H}$，$C=220\,\mu\mathrm{F}$，$R_{load}=2.5\,\Omega$。

**(a) 求占空比 $D$。**

$$
D=\frac{|V_o|}{V_{in}+|V_o|}=\frac{5}{12+5}=\frac{5}{17}=0.294
$$

**(b) 求输出电流和电感平均电流。**

$$
I_o=\frac{|V_o|}{R_{load}}=\frac{5}{2.5}=2\,\mathrm{A}
$$

$$
I_{L,avg}=\frac{I_o}{1-D}=\frac{2}{1-0.294}=\frac{2}{0.706}=2.83\,\mathrm{A}
$$

**(c) 求电感纹波电流 $\Delta i_L$。**

$$
\Delta i_L=\frac{V_{in}\cdot D}{L\cdot f_s}=\frac{12\times0.294}{50\times10^{-6}\times100\times10^3}
$$

$$
\Delta i_L=\frac{3.529}{5}=0.706\,\mathrm{A}
$$

**(d) 求 $I_{L,max}$ 和 $I_{L,min}$，判断是否 CCM。**

$$
I_{L,max}=2.83+0.706/2=2.83+0.353=3.18\,\mathrm{A}
$$

$$
I_{L,min}=2.83-0.353=2.48\,\mathrm{A}
$$

$I_{L,min}=2.48>0$，所以是 CCM。

**(e) 画 $v_L$ 和 $i_L$ 波形。**

见下面"画四个波形"方法论。

## 画四个波形的方法论（$i_L$、$v_L$、$i_{in}$、$i_{out}$）

考试经常要求画 DC-DC 变换器的波形（2022Q3h、2023Q3d）。这是通用方法论，Buck/Boost/Buck-Boost 都适用。

### 通用四步法

**第 1 步：先画 $v_L$（电感电压）。**

$v_L$ 最容易画，因为开关 ON 和 OFF 时各只有一段常数值。

- ON 期间：$v_L$ = 某个正值（通常是 $V_{in}$ 或 $V_{in}-V_o$）
- OFF 期间：$v_L$ = 某个负值（通常是 $-V_o$ 或 $-(|V_o|)$）
- 画两条水平线，用虚线标出 ON/OFF 分界

**第 2 步：画 $i_L$（电感电流）。**

$i_L$ 是三角波/梯形波。斜率 $\propto v_L$：

- $v_L>0$ 的区间：$i_L$ 线性上升，斜率 $=v_L/L$
- $v_L<0$ 的区间：$i_L$ 线性下降，斜率 $=v_L/L$
- $v_L=0$ 的区间：$i_L$ 平行于时间轴（恒定值）

关键：$i_L$ 的平均值 $I_{L,avg}$ 已知（从输出功率/电阻算），$\Delta i_L$ 也已知，所以三角波的中心线和峰峰值都能确定。

**第 3 步：画 $i_{in}$（输入电流）。**

$i_{in}$ 只在开关 ON 期间有值，OFF 期间为 0。它就是 $i_L$ 的 ON 期间部分（因为 ON 时电感电流来自输入）。

- Buck：$i_{in}$ 是三角波的上升段
- Boost：$i_{in}$ = 完整的 $i_L$（因为电感始终接在输入侧）
- Buck-Boost：$i_{in}$ 是三角波的上升段（ON 时电感从输入储能）

**第 4 步：画 $i_{out}$（输出电流）。**

$i_{out}$ 只在 OFF 期间有值（续流二极管导通时），ON 期间为 0。它是 $i_L$ 的 OFF 期间部分。

- Buck：$i_{out}$ 是三角波的下降段
- Boost：$i_{out}$ 是三角波的下降段
- Buck-Boost：$i_{out}$ 是三角波的下降段

### 三种拓扑的波形差异速查

| 波形 | Buck | Boost | Buck-Boost |
|---|---|---|---|
| $v_{L,on}$ | $V_{in}-V_o$（正） | $V_{in}$（正） | $V_{in}$（正） |
| $v_{L,off}$ | $-V_o$（负） | $V_{in}-V_o$（负） | $-\|V_o\|$（负） |
| $i_{in}$ 出现区间 | ON 期间 | 全周期 | ON 期间 |
| $i_{out}$ 出现区间 | 全周期（经 L） | OFF 期间 | OFF 期间 |
| $i_L$ 形状 | 三角波或梯形波 | 三角波或梯形波 | 三角波或梯形波 |

### Buck-Boost 画 4 波形完整例题（模拟 2023Q3d，8 分）

下面用上面 Buck-Boost 例题的数值，完整画出 $v_L$、$i_L$、$i_{in}$、$i_{out}$ 四个波形。

**已知：** $V_{in}=12\,\mathrm{V}$，$|V_o|=5\,\mathrm{V}$，$f_s=100\,\mathrm{kHz}$，$L=50\,\mu\mathrm{H}$，$I_o=2\,\mathrm{A}$，$D=0.294$。

**周期和时间：**

$$
T=\frac{1}{f_s}=\frac{1}{100\times10^3}=10\,\mu\mathrm{s}
$$

$$
DT=0.294\times10=2.94\,\mu\mathrm{s}
$$

$$
(1-D)T=0.706\times10=7.06\,\mu\mathrm{s}
$$

**已算出的电流参数：**

$$
I_{L,avg}=2.83\,\mathrm{A},\quad\Delta i_L=0.706\,\mathrm{A}
$$

$$
I_{L,max}=3.18\,\mathrm{A},\quad I_{L,min}=2.48\,\mathrm{A}
$$

**第 1 步：画 $v_L$（电感电压）。**

Buck-Boost 的 $v_L$ 两段常数：

- ON 期间（$0$ 到 $DT$）：$v_{L,on}=V_{in}=+12\,\mathrm{V}$（正值水平线）
- OFF 期间（$DT$ 到 $T$）：$v_{L,off}=-|V_o|=-5\,\mathrm{V}$（负值水平线）

**画法：** 在 $0$ 到 $2.94\,\mu\mathrm{s}$ 画 $+12\,\mathrm{V}$ 水平线，在 $2.94$ 到 $10\,\mu\mathrm{s}$ 画 $-5\,\mathrm{V}$ 水平线。

**检查伏秒平衡：**

$$
12\times2.94+(-5)\times7.06=35.3-35.3=0\quad\checkmark
$$

正负面积相等，说明数值算对了。

**第 2 步：画 $i_L$（电感电流）。**

$i_L$ 是从 $I_{L,min}=2.48\,\mathrm{A}$ 线性上升到 $I_{L,max}=3.18\,\mathrm{A}$，再线性下降回到 $2.48\,\mathrm{A}$ 的三角波。

**ON 段斜率：**

$$
\frac{di_L}{dt}\bigg|_{ON}=\frac{v_{L,on}}{L}=\frac{12}{50\times10^{-6}}=240\,000\,\mathrm{A/s}=0.24\,\mathrm{A/\mu s}
$$

验证：$0.24\times2.94=0.706\,\mathrm{A}=\Delta i_L$。正确。

**OFF 段斜率：**

$$
\frac{di_L}{dt}\bigg|_{OFF}=\frac{v_{L,off}}{L}=\frac{-5}{50\times10^{-6}}=-100\,000\,\mathrm{A/s}=-0.1\,\mathrm{A/\mu s}
$$

验证：$|-0.1|\times7.06=0.706\,\mathrm{A}=\Delta i_L$。正确。

**画法：** 从 $2.48\,\mathrm{A}$ 开始，以较陡的斜率（$0.24\,\mathrm{A/\mu s}$）上升 $2.94\,\mu\mathrm{s}$ 到 $3.18\,\mathrm{A}$，再以较缓的斜率（$-0.1\,\mathrm{A/\mu s}$）下降 $7.06\,\mu\mathrm{s}$ 回到 $2.48\,\mathrm{A}$。ON 段比 OFF 段短但斜率更陡，所以两边的 $\Delta i$ 相同。

**关键特征：** $i_L$ 永远在时间轴上方（$I_{L,min}=2.48>0$，CCM 模式），是一个不对称三角波——上升段短而陡，下降段长而缓。

![Buck-Boost converter waveforms](./assets/buck_boost_waveforms.svg)

上图展示了 Buck-Boost 变换器的 $v_L$ 和 $i_L$ 波形。注意 $v_L$ 在 ON 期间为正（$V_{in}$），OFF 期间为负（$V_o$，反相），$i_L$ 是不对称三角波。

**第 3 步：画 $i_{in}$（输入电流）。**

Buck-Boost 的 $i_{in}$ 只在 ON 期间出现，等于 $i_L$ 的 ON 段。

**画法：** $0$ 到 $2.94\,\mu\mathrm{s}$：从 $2.48\,\mathrm{A}$ 线性上升到 $3.18\,\mathrm{A}$（和 $i_L$ 的上升段完全重合）。$2.94$ 到 $10\,\mu\mathrm{s}$：$0\,\mathrm{A}$。

**第 4 步：画 $i_{out}$（输出电流）。**

Buck-Boost 的 $i_{out}$ 只在 OFF 期间出现，等于 $i_L$ 的 OFF 段。

**画法：** $0$ 到 $2.94\,\mu\mathrm{s}$：$0\,\mathrm{A}$。$2.94$ 到 $10\,\mu\mathrm{s}$：从 $3.18\,\mathrm{A}$ 线性下降到 $2.48\,\mathrm{A}$（和 $i_L$ 的下降段完全重合）。

### 画波形的常见丢分点

1. **$i_L$ 不会从 0 开始。** CCM 时 $I_{L,min}>0$，波形在时间轴上方。只有边界 CCM 时 $I_{L,min}=0$。
2. **$v_L$ 的正负面积必须相等。** 这就是伏秒平衡——画完检查一下正面积 $=$ 负面积。
3. **$i_{in}$ 和 $i_{out}$ 的形状就是 $i_L$ 被"斩波"。** ON 时 $i_L$ 全部出现在输入端，OFF 时 $i_L$ 全部出现在输出端。
4. **时间轴要标清楚。** ON 段长 $DT$，OFF 段长 $(1-D)T$。$D$ 小则 ON 段短。
5. **$\Delta i_L$ 用峰峰值，不是半幅值。** 画三角波时上峰到下峰的距离是 $\Delta i_L$。

## 边界 CCM 与临界电感

### 什么是边界 CCM

边界 CCM（boundary / critical CCM）是电感电流刚好在下一个周期开始时降到零。这是 CCM 和 DCM（断续导通模式，discontinuous conduction mode）的分界点。

$$
I_{L,min}=0
$$

所以：

$$
\Delta i_L=2\times I_{L,avg}
$$

### 为什么临界电感很重要

如果 $L$ 太小，$\Delta i_L$ 太大，$I_{L,min}$ 会降到 0 以下——但电流不能反向（二极管不允许），所以电流出现断续。DCM 的输出电压不再由简单的 $D$ 公式控制，电路行为复杂得多。考试问"保证 CCM 的最小电感"，就是求这个边界值。

### Buck 的临界电感

$$
L_{b,buck}=\frac{(V_{in}-V_o)D}{2I_of_s}
$$

推导：$\Delta i_L=\frac{(V_{in}-V_o)D}{Lf_s}$，边界条件 $\Delta i_L=2I_o$（因为 Buck 的 $I_{L,avg}=I_o$），解出 $L$。

### Boost 的临界电感

$$
L_{b,boost}=\frac{V_{in}D(1-D)}{2I_of_s}
$$

推导：$\Delta i_L=\frac{V_{in}D}{Lf_s}$，边界条件 $\Delta i_L=2I_{L,avg}=2I_{in}=2\frac{V_oI_o}{V_{in}}$，结合 $V_o=\frac{V_{in}}{1-D}$，解出 $L$。

### Buck-Boost 的临界电感

$$
L_{b,buck-boost}=\frac{V_{in}D(1-D)}{2I_of_s}
$$

推导：$\Delta i_L=\frac{V_{in}D}{Lf_s}$，边界条件 $\Delta i_L=2I_{L,avg}=2\frac{I_o}{1-D}$，解出 $L$。

### 边界 CCM 例题（模拟 2023Q3，L 临界值 5 分）

**已知：** Buck-Boost 变换器，$V_{in}=24\,\mathrm{V}$，$|V_o|=12\,\mathrm{V}$，$f_s=50\,\mathrm{kHz}$，$I_o=3\,\mathrm{A}$。求保证 CCM 的最小电感。

**第 1 步：求占空比。**

$$
D=\frac{|V_o|}{V_{in}+|V_o|}=\frac{12}{24+12}=\frac{12}{36}=0.333
$$

**第 2 步：代入临界电感公式。**

$$
L_b=\frac{V_{in}D(1-D)}{2I_of_s}
$$

$$
L_b=\frac{24\times0.333\times0.667}{2\times3\times50\times10^3}
$$

先算分子：

$$
24\times0.333\times0.667=24\times0.222=5.33
$$

再算分母：

$$
2\times3\times50000=300000
$$

$$
L_b=\frac{5.33}{300000}=1.78\times10^{-5}\,\mathrm{H}=17.8\,\mu\mathrm{H}
$$

**答案：$L_{min}=17.8\,\mu\mathrm{H}$。** 电感必须大于此值才能保证 CCM。

### Buck-Boost 临界电感推导从头走一遍（考试必备）

上面直接给了公式。如果考试要求"从零推导临界电感"，按下面三步：

**第 1 步：写 $\Delta i_L$ 表达式。**

ON 期间电感电压为 $V_{in}$，持续时间 $DT$：

$$
\Delta i_L=\frac{V_{in}\cdot D}{L\cdot f_s}
$$

**第 2 步：写边界条件。**

边界 CCM 时 $I_{L,min}=0$，所以 $\Delta i_L=2I_{L,avg}$。Buck-Boost 的 $I_{L,avg}=I_o/(1-D)$：

$$
\Delta i_L=2\times\frac{I_o}{1-D}
$$

**第 3 步：联立解 $L$。**

$$
\frac{V_{in}D}{Lf_s}=\frac{2I_o}{1-D}
$$

$$
L=\frac{V_{in}D(1-D)}{2I_of_s}
$$

> **三种拓扑临界电感公式对比（必背）：**
>
> | 拓扑 | $L_{crit}$ | 注意 |
> |---|---|---|
> | Buck | $\dfrac{(V_{in}-V_o)D}{2I_of_s}$ | 分子有 $(V_{in}-V_o)$ |
> | Boost | $\dfrac{V_{in}D(1-D)}{2I_of_s}$ | 和 Buck-Boost 相同 |
> | Buck-Boost | $\dfrac{V_{in}D(1-D)}{2I_of_s}$ | 和 Boost 相同 |
>
> Boost 和 Buck-Boost 的临界电感公式形式相同，但 $I_o$ 的定义不同——Buck-Boost 的 $I_o$ 是输出端电流（只在 OFF 期间有），Boost 的 $I_o$ 也是输出端电流。不要和 $I_{L,avg}$ 混淆。

### 2023Q3 风格完整例题：Buck-Boost 从零推导+临界+波形（25 分）

这道题模拟 2023Q3 的全部子问，把前面的推导串起来。考试按这个顺序写，不容易漏。

**已知：** Buck-Boost 变换器，$V_{in}=20\,\mathrm{V}$，$|V_o|=10\,\mathrm{V}$，$R_{load}=10\,\Omega$，$f_s=50\,\mathrm{kHz}$，电感 $L=200\,\mu\mathrm{H}$，输出电容足够大。

#### (a) 概念判断（2 分）

这是 Buck-Boost 变换器（升降压变换器）。$|V_o|<V_{in}$（$10<20$），工作在降压模式（$D<0.5$）。输出极性与输入相反。

#### (b) 从零推导输出电压（8 分）

按"开关状态→写 $v_L$→伏秒平衡→解 $V_o$"四步走：

**开关 ON：** $v_{L,on}=V_{in}=20\,\mathrm{V}$

**开关 OFF：** $v_{L,off}=-|V_o|=-10\,\mathrm{V}$

**伏秒平衡：**

$$
V_{in}\cdot DT+(-|V_o|)\cdot(1-D)T=0
$$

$$
20D-10(1-D)=0
$$

$$
20D-10+10D=0
$$

$$
30D=10
$$

$$
\boxed{D=\frac{10}{30}=0.333}
$$

**验证：** $|V_o|=\frac{D}{1-D}V_{in}=\frac{0.333}{0.667}\times20=10\,\mathrm{V}$。正确。

#### (c) 求临界电感（5 分）

输出电流：

$$
I_o=\frac{|V_o|}{R_{load}}=\frac{10}{10}=1\,\mathrm{A}
$$

临界电感：

$$
L_{crit}=\frac{V_{in}D(1-D)}{2I_of_s}=\frac{20\times0.333\times0.667}{2\times1\times50000}
$$

$$
L_{crit}=\frac{20\times0.222}{100000}=\frac{4.44}{100000}=44.4\,\mu\mathrm{H}
$$

$L=200\,\mu\mathrm{H}>L_{crit}=44.4\,\mu\mathrm{H}$，所以工作在 CCM。

#### (d) 画四个波形（8 分）

**先算所有参数：**

$$
T=\frac{1}{f_s}=20\,\mu\mathrm{s},\quad DT=0.333\times20=6.67\,\mu\mathrm{s}
$$

$$
I_{L,avg}=\frac{I_o}{1-D}=\frac{1}{0.667}=1.5\,\mathrm{A}
$$

$$
\Delta i_L=\frac{V_{in}D}{Lf_s}=\frac{20\times0.333}{200\times10^{-6}\times50\times10^3}=\frac{6.67}{10}=0.667\,\mathrm{A}
$$

$$
I_{L,max}=1.5+0.667/2=1.83\,\mathrm{A},\quad I_{L,min}=1.5-0.667/2=1.17\,\mathrm{A}
$$

**$v_L$：** ON 段 $+20\,\mathrm{V}$（$0$ 到 $6.67\,\mu\mathrm{s}$），OFF 段 $-10\,\mathrm{V}$（$6.67$ 到 $20\,\mu\mathrm{s}$）。

**$i_L$：** 从 $1.17\,\mathrm{A}$ 上升到 $1.83\,\mathrm{A}$（斜率 $=20/200\mu=0.1\,\mathrm{A/\mu s}$），再从 $1.83\,\mathrm{A}$ 下降到 $1.17\,\mathrm{A}$（斜率 $=-10/200\mu=-0.05\,\mathrm{A/\mu s}$）。上升段短而陡，下降段长而缓。

**$i_{in}$：** ON 期间 $=i_L$ 的上升段，OFF 期间 $=0$。

**$i_{out}$：** OFF 期间 $=i_L$ 的下降段，ON 期间 $=0$。

#### (e) 替代方案（2 分）

如果不需要隔离，可选 Buck-Boost。如果需要隔离，选反激（flyback）。如果输入输出压差大、效率要求高，选多级变换器（Buck 后接隔离变换器）。

## 反激变换器（Flyback converter）

需要隔离（isolation）时选反激。它本质上就是隔离的升降压，用耦合电感（coupled inductor）/ 变压器（transformer）把输入输出隔开。

**开关 ON：** 输入电压加在变压器原边，原边电流线性上升，能量储存在磁芯中。此时副边被二极管阻断，没有电流流过，负载由输出电容供电。

**开关 OFF：** 开关断开，储存在磁芯中的能量通过变压器副边释放到输出端，给电容充电并向负载供电。

理想关系（匝比 $N_s / N_p$）：

$$
\frac{V_o}{V_{in}}=\frac{N_s}{N_p}\frac{D}{1-D}
$$

输出电压纹波（ripple）公式：

$$
\frac{\Delta V_o}{V_o}=\frac{DT}{RC}
$$

### 隔离变换器选型决策树（2024Q3aii 型，8 分）

考试经常问："输入 $X$V，输出隔离 $Y$V，选什么变换器？" 按以下决策树回答：

**第 1 步：需不需要隔离？**

- 需要（输入输出不共地、安全隔离、多路输出）→ 走隔离拓扑
- 不需要 → Buck / Boost / Buck-Boost

**第 2 步：功率等级？**

- 低功率（$<100\,\mathrm{W}$）→ Flyback（反激）
- 中功率（$100$–$500\,\mathrm{W}$）→ Forward（正激）
- 大功率（$>500\,\mathrm{W}$）→ Full-bridge / Half-bridge

**第 3 步：为什么 Flyback 最常用？**

- 只用一个磁芯同时做储能和隔离（没有独立输出电感）
- 元件少：一个开关管 + 一个变压器 + 一个二极管 + 一个输出电容
- 成本低、适合小功率多路输出

**答题模板（直接抄）：**

> 选用反激变换器（flyback converter）。
>
> 理由：
> 1. 输入输出需要电气隔离（galvanic isolation），反激通过耦合电感/变压器实现。
> 2. 输出电压可通过占空比 $D$ 和匝比 $N_s/N_p$ 独立控制：$V_o=V_{in}\frac{N_s}{N_p}\frac{D}{1-D}$。
> 3. 拓扑简单，只有一个开关管，适合中小功率应用。

### Flyback 完整设计例题（模拟 2024Q3aii + 2025Q3b）

**已知：** 反激变换器，$V_{in}=48\,\mathrm{V}$，$V_o=12\,\mathrm{V}$，$P_o=24\,\mathrm{W}$，$f_s=100\,\mathrm{kHz}$，匝比 $N_p/N_s=3$。

**(a) 求占空比 $D$。**

$$
V_o=V_{in}\frac{N_s}{N_p}\frac{D}{1-D}
$$

$$
12=48\times\frac{1}{3}\times\frac{D}{1-D}=16\times\frac{D}{1-D}
$$

$$
\frac{D}{1-D}=\frac{12}{16}=0.75
$$

$$
D=0.75(1-D)=0.75-0.75D
$$

$$
D+0.75D=0.75
$$

$$
1.75D=0.75
$$

$$
D=\frac{0.75}{1.75}=0.429
$$

**(b) 求输出电流。**

$$
I_o=\frac{P_o}{V_o}=\frac{24}{12}=2\,\mathrm{A}
$$

**(c) 验证：占空比合理性。**

$D=0.429$，在 0.2–0.8 的常见范围内，合理。

**(d) 求开关导通时间 $t_{on}$。**

$$
T=\frac{1}{f_s}=\frac{1}{100\times10^3}=10\,\mu\mathrm{s}
$$

$$
t_{on}=D\times T=0.429\times10=4.29\,\mu\mathrm{s}
$$

**(e) 求输出电压纹波。**

给定 $C_{out}=1000\,\mu\mathrm{F}$，负载电阻 $R=V_o/I_o=12/2=6\,\Omega$：

$$
\frac{\Delta V_o}{V_o}=\frac{DT}{RC}=\frac{0.429\times10\times10^{-6}}{6\times1000\times10^{-6}}=\frac{4.29\times10^{-6}}{6\times10^{-3}}=0.000715=0.072\%
$$

纹波非常小（$0.072\%$），电容选择合理。

### 2025Q3b 型：变输入 Flyback 选型（5 分）

这是 2025 年真题考的题型——输入电压有范围，输出固定，要求选变换器并写出公式。

**已知：** 需要从可变输入 $16$–$32\,\mathrm{V}$ 产生隔离的 $24\,\mathrm{V}$ 输出。

**分析思路：**

输入 $16$–$32\,\mathrm{V}$，输出 $24\,\mathrm{V}$。输出电压**有时高于**最低输入电压（$24>16$），有时低于最高输入电压（$24<32$）。所以需要一个既能升压又能降压的隔离拓扑。

**答题步骤：**

**第 1 步：判断是否需要隔离。** 题目说"隔离"，所以选隔离拓扑。

**第 2 步：选拓扑。** 功率通常较小（手提设备、车载充电器等），选反激变换器（flyback converter）。

**第 3 步：写公式。**

$$
V_o=V_{in}\frac{N_s}{N_p}\frac{D}{1-D}
$$

反解占空比：

$$
D=\frac{V_o}{V_o+V_{in}\frac{N_s}{N_p}}=\frac{V_o\frac{N_p}{N_s}}{V_o\frac{N_p}{N_s}+V_{in}}
$$

**第 4 步：讨论 $V_{in}$ 变化的影响。**

| $V_{in}$ (V) | $D$（给定匝比时） | 说明 |
|---|---|---|
| 16（最低） | 最大 $D$ | 升压比最大，$D$ 最接近 0.5–0.6 |
| 32（最高） | 最小 $D$ | 降压为主，$D$ 较小 |

匝比选择可以优化 $D$ 的范围——选匝比使得 $D$ 在整个输入范围内保持在 0.2–0.5 之间，避免极端占空比。

**具体计算（设 $N_p/N_s=1$）：**

$V_{in}=16\,\mathrm{V}$ 时：

$$
D=\frac{24}{24+16}=\frac{24}{40}=0.6
$$

$V_{in}=32\,\mathrm{V}$ 时：

$$
D=\frac{24}{24+32}=\frac{24}{56}=0.429
$$

$D$ 在 $0.429$ 到 $0.6$ 之间变化，合理。

**具体计算（设 $N_p/N_s=2$）：**

$V_{in}=16\,\mathrm{V}$ 时：

$$
D=\frac{24\times2}{24\times2+16}=\frac{48}{64}=0.75
$$

$V_{in}=32\,\mathrm{V}$ 时：

$$
D=\frac{48}{48+32}=\frac{48}{80}=0.6
$$

$D$ 在 $0.6$ 到 $0.75$ 之间，偏高但仍然合理。

**答题模板（直接抄）：**

> 选用反激变换器（flyback converter）。
>
> 理由：输入输出需要电气隔离；输出电压有时高于输入（$24>16$），需要升降压功能；反激是隔离的升降压拓扑，元件少、成本低。
>
> 输出电压关系：$V_o=V_{in}\frac{N_s}{N_p}\frac{D}{1-D}$。
>
> 通过调节占空比 $D$ 可在输入电压变化范围内维持恒定输出。匝比 $N_p/N_s$ 影响 $D$ 的工作范围，设计时应使 $D$ 保持在 0.2–0.5 附近。

## 线性稳压器 vs 开关电源效率对比（2022Q3i 型，3–4 分）

考试偶尔问"为什么开关电源比线性稳压器效率高"或"线性稳压器的效率是多少"。

### 线性稳压器效率

线性稳压器（linear regulator）靠晶体管当可调电阻来降压。多余的电压全部变成热：

$$
P_{loss,linear}=(V_{in}-V_{out})\times I_o
$$

效率：

$$
\eta_{linear}=\frac{P_{out}}{P_{in}}=\frac{V_{out}I_o}{V_{in}I_o}=\frac{V_{out}}{V_{in}}
$$

注意：线性稳压器的效率只取决于电压比，与电流无关。

### 为什么开关电源效率高

开关电源（SMPS）中，理想情况下开关管只有全开和全关两个状态：

- 全开时：$V_{DS}\approx 0$，$P=V_{DS}\times I_D\approx 0$
- 全关时：$I_D=0$，$P=V_{DS}\times I_D=0$

所以理想效率是 100%。实际效率受限于：
- MOSFET 的 $R_{DS(on)}$ 导通损耗
- 开关切换时的交叠损耗
- 二极管正向压降
- 磁芯和铜损

典型 SMPS 效率：85%–95%。

### 完整例题（2022Q3i 型：Buck 效率 vs 线性稳压器）

**已知：** $V_{in}=12\,\mathrm{V}$，$V_{out}=5\,\mathrm{V}$，$I_o=0.5\,\mathrm{A}$。分别用线性稳压器和 Buck 变换器降压。

**线性稳压器：**

$$
\eta_{linear}=\frac{V_{out}}{V_{in}}=\frac{5}{12}=41.7\%
$$

$$
P_{loss}=(12-5)\times0.5=3.5\,\mathrm{W}
$$

**Buck 变换器（假设效率 90%）：**

$$
\eta_{buck}=90\%
$$

$$
P_{out}=5\times0.5=2.5\,\mathrm{W}
$$

$$
P_{loss}=\frac{P_{out}}{\eta}-P_{out}=\frac{2.5}{0.9}-2.5=2.78-2.5=0.28\,\mathrm{W}
$$

**结论：** 线性稳压器浪费 $3.5\,\mathrm{W}$，Buck 只浪费 $0.28\,\mathrm{W}$。输入输出压差越大（$V_{in}/V_{out}$ 越大），线性稳压器浪费越多。当 $V_{in}/V_{out}>2$ 时，应优先选开关电源。

### Buck 变换器效率的精确计算（如果有 $R_{DS(on)}$ 和 $V_F$）

如果题目要求精确计算 Buck 效率而不是假设值：

$$
P_{cond,MOSFET}=I_{L,rms}^2\times R_{DS(on)}
$$

$$
P_{cond,diode}=I_{D,avg}\times V_F\approx(1-D)I_o\times V_F
$$

$$
P_{total,loss}=P_{cond,MOSFET}+P_{cond,diode}+P_{sw}
$$

$$
\eta=\frac{P_{out}}{P_{out}+P_{total,loss}}
$$

**答题模板（考试直接抄）：**

> Buck 变换器效率高于线性稳压器，因为：
> 1. 开关管在导通时 $V_{DS}\approx 0$、关断时 $I_D=0$，瞬时功耗接近零。
> 2. 效率由 $R_{DS(on)}$ 导通损耗和开关交叠损耗决定，与 $V_{in}/V_{out}$ 比值无关。
> 3. 线性稳压器效率 $=V_{out}/V_{in}$，压差越大效率越低，多余能量全部变成热。

## 固定套路

DC-DC 大题按这几行写：

1. 识别拓扑（topology）
2. 开关 ON：写 $v_{L,on}$
3. 开关 OFF：写 $v_{L,off}$
4. 伏秒平衡求占空比 $D$
5. $\Delta i_L = v_L \Delta t/L$
6. 求 $I_{L,avg}$
7. $I_{max/min} = I_{avg} \pm \Delta i/2$
8. 判断 CCM 或边界 CCM
9. 画 $v_L$ 和 $i_L$ 波形

## 别丢分

- 降压：$I_{L,avg}=I_o$。
- 升压：$I_{L,avg}=I_{in}$。
- 升降压：输出反相，$I_{L,avg}=I_o/(1-D)$。
- $\Delta i_L$ 是 peak-to-peak。
- 边界 CCM 用 $\Delta I=2I_{avg}$。
- Buck-Boost 临界电感公式和 Boost 形式相同（都是 $V_{in}D(1-D)/(2I_of_s)$），但 $I_o$ 的定义不同。
- 需要隔离时选反激，不选普通升降压。
- 线性稳压器效率 $=V_{out}/V_{in}$，与电流无关。
- 画波形时 $v_L$ 正负面积相等（伏秒平衡），$i_L$ 不会从 0 开始（CCM）。
- 隔离变换器选型题必须写理由，不能只写"选 flyback"。
- Buck 变换器效率与 $V_{in}/V_{out}$ 无关（取决于 $R_{DS(on)}$ 和开关损耗），线性稳压器效率与 $V_{in}/V_{out}$ 直接相关。压差越大，开关电源优势越明显。
- 画 $i_L$ 波形时，斜率 $=v_L/L$。$v_L$ 越大，斜率越陡。Buck 的 ON 段斜率（$V_{in}-V_o$）比 OFF 段（$V_o$）更陡（当 $V_{in}>2V_o$ 时），所以三角波上升段短而陡、下降段长而缓。
- Buck-Boost 的 $i_{out}$ 只在 OFF 期间出现（续流二极管导通），Buck 的 $i_{out}$ 全周期都有（电感在输出侧）。画波形不要搞混。
- 边界 CCM 时 $I_{L,min}=0$，三角波的底部刚好碰到时间轴。$L$ 小于临界值就进入 DCM，$V_o$ 不再等于 $DV_{in}$。
