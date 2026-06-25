---
title: "第5章 恒定电流：电流密度、电阻与连续性"
description: "面向 Q1 小计算的恒定电流速成：J=sigma E、连续性方程、电阻、功率和导电边界条件。"
date: 2026-06-25
tags: [electromagnetics-and-fields, 电磁场与波, 恒定电流]
category: "课程学习"
docGroup: "emf-notes"
order: 5
draft: false
---

## 本章对应哪些考试题

本章主要服务 **Q1 概念题和小计算题**。往年题里，恒定电流常以这些形式出现：

- 给 $\mathbf E$ 和 $\sigma$，求 $\mathbf J$。
- 判断连续性方程、稳恒电流条件。
- 求平板、同轴、多层介质电阻。
- 比较静电场中的导体和恒定电流场中的导体。
- 计算焦耳损耗功率。

它通常不是整道大题的核心，但很适合塞进 Q1 小问。

## 先用人话理解本章在讲什么

静电场里，理想导体内部 $\mathbf E=0$，电荷不再持续运动。恒定电流场不一样：有限电导率导体里必须有电场，电荷才会持续漂移，所以

$$
\mathbf J=\sigma\mathbf E
$$

这章的直觉是：

- 电场推动电荷流动。
- 电流线在稳恒情况下不能凭空开始或结束，所以 $\nabla\cdot\mathbf J=0$。
- 电流通过电阻会消耗能量，功率密度是 $\mathbf J\cdot\mathbf E$。
- 很多电阻题和静电电容题长得像，只是把 $\varepsilon$ 换成 $\sigma$ 或 $1/\sigma$。

## 必背符号和单位

| 符号 | 含义 | 单位 |
|---|---|---|
| $\mathbf J$ | 体电流密度 | A/m$^2$ |
| $\mathbf K$ 或 $\mathbf J_s$ | 面电流密度 | A/m |
| $I$ | 电流 | A |
| $\sigma$ | 电导率 | S/m |
| $\rho_c$ | 电阻率，$\rho_c=1/\sigma$ | Ω·m |
| $\mathbf E$ | 推动电荷运动的电场 | V/m |
| $R$ | 电阻 | Ω |
| $P$ | 功率 | W |
| $p$ | 功率密度 | W/m$^3$ |

注意：本章用 $\rho_c$ 表示电阻率，避免和电荷密度 $\rho_v$ 混淆。

## 核心概念

### 电流密度 $\mathbf J$

**直觉解释：** 单位面积上穿过多少电流，并且带方向。

定义：

$$
\boxed{I=\int_S\mathbf J\cdot d\mathbf S}
$$

如果载流子密度为 $N$，电荷量为 $q$，漂移速度为 $\mathbf u$：

$$
\boxed{\mathbf J=Nq\mathbf u}
$$

电流方向按正电荷运动方向定义。电子流方向和电流方向相反。

### 点形式 Ohm 定律

线性各向同性导体中：

$$
\boxed{\mathbf J=\sigma\mathbf E}
$$

这比电路里的 $U=IR$ 更基本。电阻公式都可以从它积分出来。

### 连续性方程

电荷守恒给出：

$$
\boxed{\nabla\cdot\mathbf J=-{\partial\rho_v\over\partial t}}
$$

稳恒电流中，电荷密度不随时间变化：

$$
\boxed{\nabla\cdot\mathbf J=0}
$$

人话：稳恒电流线不能在某点突然开始或结束。

### 焦耳损耗

功率密度：

$$
\boxed{p=\mathbf J\cdot\mathbf E=\sigma E^2={J^2\over\sigma}}
$$

总功率：

$$
\boxed{P=\int_V p\,dV=UI=I^2R={U^2\over R}}
$$

## 核心公式与推导

### 恒定电流场基本方程

在均匀导电介质中：

$$
\boxed{\nabla\cdot\mathbf J=0},\qquad
\boxed{\nabla\times\mathbf E=0},\qquad
\boxed{\mathbf J=\sigma\mathbf E}
$$

因为 $\mathbf E=-\nabla V$，所以

$$
\mathbf J=-\sigma\nabla V
$$

若 $\sigma$ 为常数：

$$
\nabla\cdot\mathbf J=-\sigma\nabla^2V=0
$$

因此导电区域内电势满足

$$
\boxed{\nabla^2V=0}
$$

这就是它和静电无电荷区域的相似性。

### 电阻的场论定义

电阻定义：

$$
\boxed{R={U\over I}}
$$

其中

$$
U=\int \mathbf E\cdot d\mathbf l,
\qquad I=\int_S\mathbf J\cdot d\mathbf S
$$

均匀长导体，长度 $l$，截面积 $S$：

$$
E={U\over l},\qquad J=\sigma E={\sigma U\over l},\qquad I=JS={\sigma SU\over l}
$$

所以

$$
\boxed{R={l\over\sigma S}}
$$

### 同轴径向电阻

内半径 $a$，外半径 $b$，长度 $l$，电流径向流动。半径 $\rho$ 处面积：

$$
S(\rho)=2\pi\rho l
$$

微元电阻：

$$
dR={d\rho\over\sigma 2\pi\rho l}
$$

积分：

$$
\boxed{R={\ln(b/a)\over2\pi\sigma l}}
$$

若径向分层，每层电导率不同，串联相加：

$$
\boxed{R=\sum_i{\ln(r_{i+1}/r_i)\over2\pi\sigma_i l}}
$$

### 导电媒质边界条件

稳恒电流边界上：

1. 法向电流连续（无电荷积累）：

$$
\boxed{J_{1n}=J_{2n}}
$$

2. 切向电场连续：

$$
\boxed{E_{1t}=E_{2t}}
$$

由 $\mathbf J=\sigma\mathbf E$，可得到无电荷积累时：

$$
\sigma_1E_{1n}=\sigma_2E_{2n}
$$

**和静电边界很像：** 静电是法向 $D$ 连续；导电是法向 $J$ 连续。

| 场景 | 切向连续 | 法向连续/跳变 |
|---|---|---|
| 静电介质边界，无自由面电荷 | $E_t$ 连续 | $D_n$ 连续 |
| 稳恒导电边界，无电荷积累 | $E_t$ 连续 | $J_n$ 连续 |
| 磁介质边界，无自由面电流 | $H_t$ 连续 | $B_n$ 连续 |

## 固定做题模板

### 模板 1：给 $\mathbf E$ 求 $\mathbf J$ 和功率密度

步骤：

1. 用 $\mathbf J=\sigma\mathbf E$。
2. 用 $p=\mathbf J\cdot\mathbf E=\sigma E^2$。
3. 若要总功率，对体积积分：$P=\int p\,dV$。

易错点：$p$ 是标量，单位 W/m$^3$；$\mathbf J$ 是矢量。

### 模板 2：平板电阻

题目特征：电流均匀穿过面积 $S$、厚度 $d$ 的介质。

$$
\boxed{R={d\over\sigma S}}
$$

多层平板沿电流方向叠放：

$$
\boxed{R=\sum_i{d_i\over\sigma_i S}}
$$

多层平板并排、同电压时按并联处理。判断规则：电流依次穿过多层就是串联，电阻相加；多块介质共享同一电压并分流就是并联，电导相加；同轴径向分层通常是串联，平板并排通常是并联。

### 模板 3：同轴径向电阻

题目特征：内外圆柱电极之间有导电介质，电流沿径向流。

直接用：

$$
\boxed{R={\ln(b/a)\over2\pi\sigma l}}
$$

多层径向介质：

$$
\boxed{R=\sum_i{\ln(r_{i+1}/r_i)\over2\pi\sigma_i l}}
$$

## 往年考试例题

### 例题 1：同轴多介质电阻（2023/2025 Q2 类型）

同轴结构长度为 $l$，内半径 $a$，中间半径 $c$，外半径 $b$。$a<\rho<c$ 介质电导率为 $\sigma_1$，$c<\rho<b$ 电导率为 $\sigma_2$。求内外导体之间电阻。

**解：**

径向电流流过两层介质，等效串联。

第一层：

$$
R_1={\ln(c/a)\over2\pi\sigma_1 l}
$$

第二层：

$$
R_2={\ln(b/c)\over2\pi\sigma_2 l}
$$

总电阻：

$$
\boxed{R={\ln(c/a)\over2\pi\sigma_1 l}+{\ln(b/c)\over2\pi\sigma_2 l}}
$$

**易错提醒：** 径向分层是串联，不是把 $\sigma$ 简单平均。

### 例题 2：由电场求电流密度和损耗（Q1 类型）

某均匀导体 $\sigma=5\,\text{S/m}$，内部电场

$$
\mathbf E=2\hat{\mathbf x}-\hat{\mathbf y}\quad \text{V/m}
$$

求 $\mathbf J$ 和功率密度 $p$。

**解：**

$$
\mathbf J=\sigma\mathbf E=5(2\hat{\mathbf x}-\hat{\mathbf y})=10\hat{\mathbf x}-5\hat{\mathbf y}\quad \text{A/m}^2
$$

$$
E^2=2^2+(-1)^2=5
$$

$$
p=\sigma E^2=5\times5=25\quad \text{W/m}^3
$$

答案：

$$
\boxed{\mathbf J=10\hat{\mathbf x}-5\hat{\mathbf y}\ \text{A/m}^2},
\qquad \boxed{p=25\ \text{W/m}^3}
$$

### 例题 3：导电边界条件（2025 Q3 类型）

两种导电媒质交界面无表面电荷积累，电导率分别为 $\sigma_1$、$\sigma_2$。已知介质 1 中法向电场为 $E_{1n}$，求介质 2 中法向电场。

**解：**

稳恒电流中法向电流连续：

$$
J_{1n}=J_{2n}
$$

用 $J=\sigma E$：

$$
\sigma_1E_{1n}=\sigma_2E_{2n}
$$

所以

$$
\boxed{E_{2n}={\sigma_1\over\sigma_2}E_{1n}}
$$

**对比静电边界：** 静电无自由面电荷时是 $\varepsilon_1E_{1n}=\varepsilon_2E_{2n}$；导电稳恒边界是 $\sigma_1E_{1n}=\sigma_2E_{2n}$。

## 重点难点总结

1. 有限电导率导体中，为了维持恒定电流，内部 $\mathbf E$ 通常不为零。
2. 稳恒电流满足 $\nabla\cdot\mathbf J=0$，不是 $\mathbf J=0$。
3. 电阻题先判断电流路径：沿长度均匀流、径向流、还是多层串并联。
4. 同轴径向电阻公式和同轴电容公式相似，但电容用 $\varepsilon$，电阻用 $1/\sigma$。
5. 导电边界连续的是法向 $J$，不是法向 $E$。

## 自测题与答案

### 题 1

长为 $l$、截面积为 $S$、电导率为 $\sigma$ 的均匀导体，求电阻。

**答案：**

$$
\boxed{R={l\over\sigma S}}
$$

推导：$E=U/l$，$J=\sigma E$，$I=JS=\sigma SU/l$，所以 $R=U/I=l/(\sigma S)$。

### 题 2

同轴导电介质内半径 $a$、外半径 $b$、长度 $l$、电导率 $\sigma$，求径向电阻。

**答案：**

半径 $\rho$ 处面积 $2\pi\rho l$，所以

$$
dR={d\rho\over\sigma 2\pi\rho l}
$$

积分：

$$
\boxed{R={\ln(b/a)\over2\pi\sigma l}}
$$

### 题 3

稳恒电流中，若某点 $\nabla\cdot\mathbf J>0$，这意味着什么？为什么稳恒时不允许？

**答案：**

连续性方程：

$$
\nabla\cdot\mathbf J=-{\partial\rho_v\over\partial t}
$$

若 $\nabla\cdot\mathbf J>0$，说明该点附近净流出电流为正，电荷密度随时间减少。稳恒电流要求 $\partial\rho_v/\partial t=0$，所以必须有 $\nabla\cdot\mathbf J=0$。

### 题 4

导体中 $\mathbf J=3\hat{\mathbf x}$ A/m$^2$，$\sigma=6$ S/m，求 $\mathbf E$ 和 $p$。

**答案：**

$$
\mathbf E={\mathbf J\over\sigma}=0.5\hat{\mathbf x}\ \text{V/m}
$$

$$
p=\mathbf J\cdot\mathbf E=3\times0.5=1.5\ \text{W/m}^3
$$

## 学习路线

1. 先背 $\mathbf J=\sigma\mathbf E$、$\nabla\cdot\mathbf J=0$、$p=\mathbf J\cdot\mathbf E$。
2. 再练平板电阻和同轴径向电阻。
3. 最后把导电边界条件和静电边界条件对照背。

## 和后续章节的关系

第6章的磁场由电流产生，所以本章的 $\mathbf J$ 会进入 $\nabla\times\mathbf H=\mathbf J$。第8章有耗媒质里也会比较传导电流 $\sigma\mathbf E$ 和位移电流 $j\omega\varepsilon\mathbf E$，判断良导体/良介质。

## 一页考前速记

$$
\mathbf J=\sigma\mathbf E,
\qquad \nabla\cdot\mathbf J=0\quad\text{稳恒},
\qquad p=\mathbf J\cdot\mathbf E=\sigma E^2
$$

$$
R={l\over\sigma S},
\qquad R_{\rm coax}={\ln(b/a)\over2\pi\sigma l}
$$

径向多层同轴：

$$
R=\sum_i{\ln(r_{i+1}/r_i)\over2\pi\sigma_i l}
$$

导电边界：

$$
J_{1n}=J_{2n},
\qquad E_{1t}=E_{2t}
$$

看到电阻题，先画电流路径，再判断串联还是并联。