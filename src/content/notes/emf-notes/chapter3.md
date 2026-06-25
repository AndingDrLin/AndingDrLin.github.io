---
title: "第3章 静电场：高斯定律、电势与边界条件"
description: "面向 Q1 小计算的静电场核心模板：高斯定律、E/D/V/rho 互求、边界条件、电容与能量。"
date: 2026-06-25
tags: [electromagnetics-and-fields, 电磁场与波, 静电场]
category: "课程学习"
docGroup: "emf-notes"
order: 3
draft: false
---

## 本章对应哪些考试题

本章主要服务 **Q1 概念题和小计算题**。往年 2022–2025 的期末里，静电场反复以这些形式出现：

- 用高斯定律求无限线电荷、均匀带电球/柱、同轴线的电场。
- 由 $V$ 求 $\mathbf E$，由 $\mathbf E$ 或 $\mathbf D$ 求 $\rho_v$。
- 两种介质交界面，已知一侧电场，求另一侧电场。
- 同轴线电容、平行板电容、静电能量。
- 概念题：$\mathbf D$ 的物理意义、导体静电平衡、边界条件。

这一章不追求把库仑积分算到很复杂，而是把最常考的几类模板练熟。

## 先用人话理解本章在讲什么

静电场的核心问题是：**电荷怎样产生电场，电场怎样对应电势，遇到介质边界时场量怎么变。**

- 电荷是源：$\nabla\cdot\mathbf D=\rho_v$。
- 静电场不打转：$\nabla\times\mathbf E=0$，所以能写成 $\mathbf E=-\nabla V$。
- 高斯定律适合对称分布：不是所有电荷都适合用高斯面秒算。
- 边界条件本质来自 Maxwell 方程：切向 $\mathbf E$ 连续，法向 $\mathbf D$ 按自由面电荷跳变。

考试时不要一看到电荷就积分。先问自己：有没有球对称、柱对称、面对称？如果有，优先高斯定律。

## 必背符号和单位

| 符号 | 含义 | 单位 |
|---|---|---|
| $q,Q$ | 点电荷/总电荷 | C |
| $\rho_v$ | 体电荷密度 | C/m$^3$ |
| $\rho_s$ | 面电荷密度 | C/m$^2$ |
| $\rho_l$ | 线电荷密度 | C/m |
| $\mathbf E$ | 电场强度 | V/m 或 N/C |
| $\mathbf D$ | 电通量密度 | C/m$^2$ |
| $V,\varphi$ | 电势 | V |
| $\varepsilon$ | 介电常数 | F/m |
| $C$ | 电容 | F |
| $w_e,W_e$ | 电场能量密度、总能量 | J/m$^3$, J |

## 核心概念

### 电场强度 $\mathbf E$

**直觉解释：** 单位正电荷放在某点会受到的力。

**正式定义：**

$$
\mathbf E=\lim_{q\to0}{\mathbf F\over q}
$$

点电荷电场：

$$
\boxed{\mathbf E={Q\over4\pi\varepsilon R^2}\hat{\mathbf R}}
$$

### 电通量密度 $\mathbf D$

**直觉解释：** 把介质影响从高斯定律中分离出来后，用来数自由电荷的场量。

线性均匀介质中：

$$
\boxed{\mathbf D=\varepsilon\mathbf E}
$$

Maxwell 方程：

$$
\boxed{\nabla\cdot\mathbf D=\rho_v}
$$

**考场提醒：** $\mathbf D$ 和 $\mathbf E$ 不只是差一个常数那么简单；跨介质边界时 $\varepsilon$ 会变，法向 $D$ 和法向 $E$ 的连续性不同。

### 电势 $V$

静电场无旋，所以可以定义电势：

$$
\boxed{\mathbf E=-\nabla V}
$$

电势差：

$$
\boxed{V_A-V_B=\int_A^B \mathbf E\cdot d\mathbf l}
$$

这条公式的积分路径是从 $A$ 到 $B$。如果题目要求 $V_B-V_A$，就要写

$$
\boxed{V_B-V_A=-\int_A^B \mathbf E\cdot d\mathbf l}
$$

一维直觉：若均匀电场沿 $+x$，沿 $+x$ 方向走时电势下降，所以电场方向是电势下降最快的方向。

### 导体静电平衡

静电平衡导体满足：

- 导体内部 $\mathbf E=0$。
- 导体是等势体。
- 净电荷只分布在导体表面。
- 表面外侧电场垂直于导体表面。
- 理想导体表面切向电场为 0。

这组概念常以判断题/简答题出现。

## 核心公式与推导

### 静电场基本方程

微分形式：

$$
\boxed{\nabla\cdot\mathbf D=\rho_v},\qquad
\boxed{\nabla\times\mathbf E=0}
$$

积分形式：

$$
\boxed{\oint_S\mathbf D\cdot d\mathbf S=Q_{\rm enc}},\qquad
\boxed{\oint_C\mathbf E\cdot d\mathbf l=0}
$$

线性介质：

$$
\boxed{\mathbf D=\varepsilon\mathbf E}
$$

电势方程：

$$
\boxed{\mathbf E=-\nabla V},\qquad
\boxed{\nabla^2V=-{\rho_v\over\varepsilon}}
$$

无电荷区域：

$$
\boxed{\nabla^2V=0}
$$

### 高斯定律什么时候能秒算

只有三类高对称情况能把 $E$ 从积分号里拿出来：

| 对称 | 高斯面 | 典型题 |
|---|---|---|
| 球对称 | 同心球面 | 点电荷、均匀带电球 |
| 柱对称 | 同轴圆柱面 | 无限线电荷、同轴线 |
| 平面对称 | 平行小柱面 | 无限大带电平面、平行板 |

### 静电边界条件

设单位法向 $\hat{\mathbf n}$ 从介质 1 指向介质 2：

$$
\boxed{\hat{\mathbf n}\times(\mathbf E_2-\mathbf E_1)=0}
$$

$$
\boxed{\hat{\mathbf n}\cdot(\mathbf D_2-\mathbf D_1)=\rho_{s,\rm free}}
$$

其中 $\rho_{s,\rm free}$ 指自由面电荷密度；介质极化产生的束缚电荷已经通过 $\mathbf D=\varepsilon\mathbf E$ 的材料关系处理。

分量形式：

$$
\boxed{E_{1t}=E_{2t}},\qquad
\boxed{D_{2n}-D_{1n}=\rho_{s,\rm free}}
$$

无自由面电荷 $\rho_{s,\rm free}=0$ 时：

$$
\boxed{\varepsilon_1E_{1n}=\varepsilon_2E_{2n}}
$$

**最常见错误：** 法向 $E$ 通常不连续，连续的是法向 $D$（无自由面电荷时）。切向连续的是 $E$，不是 $D$。

### 电容与静电能量

考前优先级：必背 $C=Q/U$、平行板电容、同轴单位长度电容；能量密度和总能量次之；完整能量积分推导可在最后一天跳过。

电容定义：

$$
\boxed{C={Q\over U}}
$$

平行板电容：

$$
\boxed{C={\varepsilon S\over d}}
$$

同轴线单位长度电容：

$$
\boxed{C'={2\pi\varepsilon\over\ln(b/a)}}
$$

电场能量密度：

$$
\boxed{w_e={1\over2}\mathbf E\cdot\mathbf D={1\over2}\varepsilon E^2}
$$

总能量：

$$
\boxed{W_e=\int_V w_e\,dV={1\over2}CU^2={Q^2\over2C}}
$$

## 固定做题模板

### 模板 1：高斯定律求无限线电荷电场

题目特征：无限长线电荷，线密度 $\rho_l$，求距离 $\rho$ 处电场。

1. 对称性：$\mathbf E=E_\rho(\rho)\hat{\boldsymbol\rho}$。
2. 选半径 $\rho$、长度 $l$ 的圆柱高斯面。
3. 通量：$\oint\mathbf D\cdot d\mathbf S=D_\rho(2\pi\rho l)$。
4. 包围电荷：$Q=\rho_l l$。
5. 得

$$
D_\rho={\rho_l\over2\pi\rho},\qquad
\boxed{E_\rho={\rho_l\over2\pi\varepsilon\rho}}
$$

### 模板 2：均匀带电球

半径 $a$，体电荷密度 $\rho_v$。

内部 $r<a$：

$$
D_r(4\pi r^2)=\rho_v{4\over3}\pi r^3
$$

$$
\boxed{E_r={\rho_v r\over3\varepsilon}\quad(r<a)}
$$

外部 $r>a$：

$$
D_r(4\pi r^2)=\rho_v{4\over3}\pi a^3
$$

$$
\boxed{E_r={\rho_v a^3\over3\varepsilon r^2}\quad(r>a)}
$$

直觉：球内电场随 $r$ 增大，球外像点电荷一样按 $1/r^2$ 衰减。

### 模板 3：静电边界条件求另一侧电场

题目特征：两介质界面，已知介质 1 侧 $\mathbf E_1$，求介质 2 侧 $\mathbf E_2$。

步骤：

1. 明确法向方向 $\hat{\mathbf n}$。
2. 把 $\mathbf E_1$ 分解为切向和法向：

$$
\mathbf E_1=\mathbf E_{1t}+E_{1n}\hat{\mathbf n}
$$

3. 切向连续：$\mathbf E_{2t}=\mathbf E_{1t}$。

| 已知量 | 无自由面电荷时另一侧 |
|---|---|
| $E_{1t}$ | $E_{2t}=E_{1t}$ |
| $E_{1n}$ | $E_{2n}=(\varepsilon_1/\varepsilon_2)E_{1n}$ |
| $D_{1n}$ | $D_{2n}=D_{1n}$ |

4. 法向用 $D$：

$$
\varepsilon_2E_{2n}-\varepsilon_1E_{1n}=\rho_{s,\rm free}
$$

若无自由面电荷：

$$
E_{2n}={\varepsilon_1\over\varepsilon_2}E_{1n}
$$

5. 合成 $\mathbf E_2=\mathbf E_{2t}+E_{2n}\hat{\mathbf n}$。

### 模板 4：同轴线电容

内导体半径 $a$，外导体内半径 $b$，单位长度电荷 $\rho_l$。

由高斯定律：

$$
E_\rho={\rho_l\over2\pi\varepsilon\rho}
$$

电压：

$$
U=\int_a^b E_\rho d\rho={\rho_l\over2\pi\varepsilon}\ln{b\over a}
$$

单位长度电容：

$$
\boxed{C'={\rho_l\over U}={2\pi\varepsilon\over\ln(b/a)}}
$$

## 往年考试例题

### 例题 1：静电边界条件（mock 2026 Q1(c) 类型）

界面为 $x=0$，空气在介质 1，介质 2 为 $\varepsilon_2=\varepsilon_r\varepsilon_0$。法向取 $+\hat{\mathbf x}$ 从空气指向介质。空气侧界面电场为

$$
\mathbf E_1=E_x\hat{\mathbf x}+E_y\hat{\mathbf y}+E_z\hat{\mathbf z}
$$

无自由面电荷，求介质侧 $\mathbf E_2$。

**解：**

切向分量是 $y,z$ 分量：

$$
E_{2y}=E_y,\qquad E_{2z}=E_z
$$

法向分量满足：

$$
\varepsilon_1E_{1x}=\varepsilon_2E_{2x}
$$

所以

$$
E_{2x}={\varepsilon_0\over\varepsilon_r\varepsilon_0}E_x={E_x\over\varepsilon_r}
$$

答案：

$$
\boxed{\mathbf E_2={E_x\over\varepsilon_r}\hat{\mathbf x}+E_y\hat{\mathbf y}+E_z\hat{\mathbf z}}
$$

**易错提醒：** 不是整个 $\mathbf E$ 都除以 $\varepsilon_r$，只有法向分量变。

### 例题 2：无限线电荷（2023/2025 Q1 类型）

无限长线电荷密度为 $\rho_l$，位于 $z$ 轴，求距轴 $\rho$ 处电场。

**解：**

选半径 $\rho$、长度 $l$ 的圆柱高斯面：

$$
D_\rho(2\pi\rho l)=\rho_l l
$$

所以

$$
D_\rho={\rho_l\over2\pi\rho}
$$

线性介质中 $\mathbf D=\varepsilon\mathbf E$：

$$
\boxed{\mathbf E={\rho_l\over2\pi\varepsilon\rho}\hat{\boldsymbol\rho}}
$$

若 $\rho_l>0$，方向向外；若 $\rho_l<0$，方向向内。

### 例题 3：同轴线电场与电容（2022/2024 类型）

同轴线内导体半径 $a$，外导体内半径 $b$，中间填充介电常数 $\varepsilon$ 的介质。内外导体电压为 $U$，求 $E_\rho$ 和单位长度电容。

**解：**

设单位长度电荷为 $\rho_l$。由高斯定律：

$$
E_\rho={\rho_l\over2\pi\varepsilon\rho}
$$

电压：

$$
U=\int_a^b E_\rho d\rho={\rho_l\over2\pi\varepsilon}\ln{b\over a}
$$

解出

$$
\rho_l={2\pi\varepsilon U\over\ln(b/a)}
$$

所以

$$
\boxed{E_\rho={U\over\rho\ln(b/a)}}
$$

单位长度电容：

$$
\boxed{C'={\rho_l\over U}={2\pi\varepsilon\over\ln(b/a)}}
$$

**易错提醒：** 积分上下限会影响电压正负。考试一般问大小时写 $U=\int_a^b E_\rho d\rho$；若问矢量方向，要先明确哪个导体电势高。

## 重点难点总结

1. 高斯定律能不能用，关键看对称性，不是看你想不想用。
2. $\mathbf E=-\nabla V$ 的负号必须保留。
3. $\rho_v=\nabla\cdot\mathbf D$，线性均匀介质中才可写 $\rho_v=\varepsilon\nabla\cdot\mathbf E$。
4. 边界处切向 $E$ 连续，法向 $D$ 按自由面电荷跳变。
5. 同轴线的 $E$ 和 $C'$ 与第6章同轴线的 $H$ 和 $L'$ 形式很像，但一个用 $\varepsilon$，一个用 $\mu$。

## 自测题与答案

### 题 1

半径为 $a$ 的均匀带电球，体电荷密度 $\rho_v$。写出球内外电场。

**答案：**

球内：

$$
\boxed{\mathbf E={\rho_v r\over3\varepsilon}\hat{\mathbf r}\quad(r<a)}
$$

球外：

$$
\boxed{\mathbf E={\rho_v a^3\over3\varepsilon r^2}\hat{\mathbf r}\quad(r>a)}
$$

若 $\rho_v<0$，方向与 $\hat{\mathbf r}$ 相反。

### 题 2

两介质界面无自由面电荷，$\varepsilon_2=3\varepsilon_1$。介质 1 侧法向电场为 $E_{1n}=6$ V/m，求 $E_{2n}$。

**答案：**

无自由面电荷时

$$
\varepsilon_1E_{1n}=\varepsilon_2E_{2n}
$$

所以

$$
E_{2n}={\varepsilon_1\over\varepsilon_2}E_{1n}={1\over3}\times6=2\ \text{V/m}
$$

### 题 3

若 $V=10\ln(\rho/a)/\ln(b/a)$，求圆柱坐标中 $E_\rho$。

**答案：**

$$
E_\rho=-{\partial V\over\partial\rho}=-{10\over\rho\ln(b/a)}
$$

符号表示电场方向与 $+\hat{\boldsymbol\rho}$ 相反。若只问大小，则为 $10/[\rho\ln(b/a)]$。

### 题 4

平行板电容面积 $S$、间距 $d$、介质 $\varepsilon$，电压 $U$。求能量。

**答案：**

电容

$$
C={\varepsilon S\over d}
$$

能量

$$
\boxed{W_e={1\over2}CU^2={\varepsilon S U^2\over2d}}
$$

也可用能量密度验证：$E=U/d$，$w_e=\frac12\varepsilon E^2$，体积 $Sd$，所以 $W_e=\frac12\varepsilon(U/d)^2Sd$，结果相同。

## 学习路线

1. 先背静电场四件套：$\mathbf D=\varepsilon\mathbf E$、$\mathbf E=-\nabla V$、$\rho_v=\nabla\cdot\mathbf D$、$\nabla^2V=-\rho_v/\varepsilon$。
2. 再练高斯定律三模板：线、球、同轴。
3. 最后练边界条件，尤其是“只改法向分量”的题。
4. 若时间够，再补电容和能量。

## 和后续章节的关系

第5章的恒定电流场会把 $\mathbf D,\varepsilon$ 换成 $\mathbf J,\sigma$，形式非常像静电场。第8章反射透射也会用到本章边界条件，只是场变成时谐波。

## 一页考前速记

$$
\mathbf D=\varepsilon\mathbf E,
\quad \mathbf E=-\nabla V,
\quad \rho_v=\nabla\cdot\mathbf D,
\quad \nabla^2V=-\rho_v/\varepsilon
$$

$$
\oint_S\mathbf D\cdot d\mathbf S=Q_{\rm enc}
$$

$$
E_{1t}=E_{2t},
\qquad D_{2n}-D_{1n}=\rho_s
$$

$$
E_{\rm line}={\rho_l\over2\pi\varepsilon\rho},
\qquad C'_{\rm coax}={2\pi\varepsilon\over\ln(b/a)}
$$

看到界面题，先分解切向/法向；看到对称电荷，先选高斯面。