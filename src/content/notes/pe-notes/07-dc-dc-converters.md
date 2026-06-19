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

纹波：

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

## 降压变换器（Buck converter）

降压是 $V_o < V_{in}$。

**开关 ON：** 输入电压 $V_{in}$ 直接加到电感和负载（load）上，电流从输入经开关、电感流向负载，电感储能增加。

**开关 OFF：** 开关断开，电感电流不能突变，续流二极管导通，电感通过二极管继续给负载供电，电流逐渐减小。

![Buck converter waveforms](./assets/buck_waveforms.svg)

ON 时，输入给电感和负载：

$$
v_L=V_{in}-V_o
$$

OFF 时，电感通过续流二极管续流：

$$
v_L=-V_o
$$

伏秒平衡：

$$
(V_{in}-V_o)D+(-V_o)(1-D)=0
$$

化简：

$$
V_o=DV_{in}
$$

纹波：

$$
\Delta i_L=\frac{(V_{in}-V_o)D}{Lf_s}
$$

降压中电感在输出侧：

$$
I_{L,avg}=I_o
$$

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

## 升压变换器（Boost converter）

升压是 $V_o > V_{in}$。

**开关 ON：** 开关导通，输入电压直接加在电感两端，电感电流线性上升、储存能量。此时二极管反偏，负载由输出电容（capacitor）供电。

**开关 OFF：** 开关断开，电感和输入串联向输出放电，电感电流线性减小，同时给电容充电。

![Boost converter waveforms](./assets/boost_waveforms.svg)

ON 时，电感接输入储能：

$$
v_L=V_{in}
$$

OFF 时，电感和输入一起给输出：

$$
v_L=V_{in}-V_o
$$

伏秒平衡：

$$
V_{in}D+(V_{in}-V_o)(1-D)=0
$$

化简：

$$
V_o=\frac{V_{in}}{1-D}
$$

占空比：

$$
D=1-\frac{V_{in}}{V_o}
$$

升压中电感在输入侧：

$$
I_{L,avg}=I_{in}=\frac{V_oI_o}{V_{in}}
$$

## 升降压变换器（Buck-Boost converter）

升降压可升可降，但输出极性反相。

**开关 ON：** 开关导通，输入电压加在电感两端，电感电流线性上升，储存能量。此时输出端由电容维持，二极管反偏。

**开关 OFF：** 开关断开，电感电流通过二极管流向输出电容和负载，电感释放能量，极性反转使输出为负电压。

![Inverting buck-boost converter waveforms](./assets/buck_boost_waveforms.svg)

ON：

$$
v_L=V_{in}
$$

OFF：

$$
v_L=-|V_o|
$$

输出幅值关系：

$$
|V_o|=\frac{D}{1-D}V_{in}
$$

占空比：

$$
D=\frac{|V_o|}{V_{in}+|V_o|}
$$

输出只在 OFF interval 得到电感电流：

$$
I_o=(1-D)I_{L,avg}
$$

$$
I_{L,avg}=\frac{I_o}{1-D}
$$

## 边界 CCM

边界 CCM 是电感电流刚好降到 0。

$$
I_{L,min}=0
$$

所以：

$$
\Delta I_L=2I_{L,avg}
$$

降压边界电感常写：

$$
L_b=\frac{(V_{in}-V_o)D}{2I_of_s}
$$

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
- 升降压：输出反相。
- $\Delta i_L$ 是 peak-to-peak。
- 边界 CCM 用 $\Delta I=2I_{avg}$。
- 需要隔离时选反激，不选普通升降压。
