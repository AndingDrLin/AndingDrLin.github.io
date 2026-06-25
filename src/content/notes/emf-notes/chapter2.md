---
title: "第2章 矢量分析：Q1 小计算工具箱"
description: "面向 Q1 小计算的梯度、散度、旋度、通量、环量、Gauss 定理与 Stokes 定理速成。"
date: 2026-06-25
tags: [electromagnetics-and-fields, 电磁场与波, 矢量分析]
category: "课程学习"
docGroup: "emf-notes"
order: 2
draft: false
---

## 本章对应哪些考试题

本章主要服务 **Q1 概念题和小计算题**。往年题里，矢量分析通常不会单独出很长的大题，但会以这些形式出现：

- 给一个矢量场，算 $\nabla\cdot\mathbf A$ 或 $\nabla\times\mathbf A$。
- 给一个标量场，算 $\nabla V$ 或 $\nabla^2V$。
- 问 Gauss 定理、Stokes 定理的物理意义。
- 用散度/旋度判断场是不是源场、涡旋场。
- 在圆柱坐标中算散度，最容易漏掉 $1/\rho$。

这章的目标不是学会所有数学细节，而是在考场看到算子题时能稳定拿分。

## 先用人话理解本章在讲什么

电磁场是“空间每一点都有一个物理量”。如果这个物理量是电势，就是标量场；如果是电场、磁场，就是矢量场。

矢量分析里最重要的三个运算可以这样理解：

- **梯度 gradient**：标量场变化最快的方向。电场和电势的关系就是 $\mathbf E=-\nabla V$。
- **散度 divergence**：看一个矢量场在某点像不像“源”或“汇”。电荷是电场的源，所以 $\nabla\cdot\mathbf D=\rho_v$。
- **旋度 curl**：看一个矢量场在某点有没有“打转”。电流让磁场打转，所以静磁场里 $\nabla\times\mathbf H=\mathbf J$。

考试里常见错误不是概念完全不会，而是坐标系公式用错，尤其是圆柱坐标。

## 必背符号和单位

| 符号 | 含义 | 考试用途 |
|---|---|---|
| $\nabla V$ | 标量场的梯度 | 由电势求电场 |
| $\nabla\cdot\mathbf A$ | 矢量场的散度 | 由 $\mathbf D$ 求 $\rho_v$，判断源 |
| $\nabla\times\mathbf A$ | 矢量场的旋度 | 由 $\mathbf H$ 求 $\mathbf J$，判断涡旋 |
| $\nabla^2V$ | 标量场的 Laplacian | Poisson/Laplace 方程 |
| $d\mathbf l$ | 线元 | 环量、Stokes 定理 |
| $d\mathbf S$ | 有向面元 | 通量、Gauss 定理 |
| $dV$ | 体元 | 体积分 |

## 核心概念

### 标量场与矢量场

**直觉解释：** 标量场只给大小，矢量场给大小和方向。

**正式定义：**

- 标量场：$V(x,y,z)$。
- 矢量场：$\mathbf A(x,y,z)=A_x\hat{\mathbf x}+A_y\hat{\mathbf y}+A_z\hat{\mathbf z}$。

**考场问法：** 电势 $V$ 是标量场，电场 $\mathbf E$ 是矢量场；温度是标量场，速度是矢量场。

### 通量与环量

通量看“穿过多少”：

$$
\Phi=\int_S\mathbf A\cdot d\mathbf S
$$

环量看“沿闭合曲线绕一圈累积多少”：

$$
\oint_C\mathbf A\cdot d\mathbf l
$$

电磁场里：

- $\oint_S\mathbf D\cdot d\mathbf S=Q$ 是电通量和电荷的关系。
- $\oint_C\mathbf H\cdot d\mathbf l=I$ 是磁场环量和电流的关系。

### Gauss 定理

$$
\boxed{\oint_S\mathbf A\cdot d\mathbf S=\int_V\nabla\cdot\mathbf A\,dV}
$$

人话：闭合面流出去多少，等于体内每一点“源强度”的总和。

电磁场里最重要的应用是：

$$
\oint_S\mathbf D\cdot d\mathbf S=\int_V\rho_v\,dV=Q
$$

### Stokes 定理

$$
\boxed{\oint_C\mathbf A\cdot d\mathbf l=\int_S(\nabla\times\mathbf A)\cdot d\mathbf S}
$$

人话：沿边界绕一圈的环量，等于面内每一点旋转强度的总和。

电磁场里最重要的应用是：

$$
\oint_C\mathbf H\cdot d\mathbf l=\int_S\mathbf J\cdot d\mathbf S=I
$$

## 核心公式与推导

### 直角坐标公式

考前优先级：直角坐标的梯度、散度、Laplacian 必背；圆柱坐标散度必背；圆柱坐标旋度会查即可；球坐标完整公式低优先，本章只保留径向散度常用形式。

对 $V=V(x,y,z)$：

$$
\boxed{\nabla V={\partial V\over\partial x}\hat{\mathbf x}+{\partial V\over\partial y}\hat{\mathbf y}+{\partial V\over\partial z}\hat{\mathbf z}}
$$

对 $\mathbf A=A_x\hat{\mathbf x}+A_y\hat{\mathbf y}+A_z\hat{\mathbf z}$：

$$
\boxed{\nabla\cdot\mathbf A={\partial A_x\over\partial x}+{\partial A_y\over\partial y}+{\partial A_z\over\partial z}}
$$

$$
\boxed{
\nabla\times\mathbf A=
\begin{vmatrix}
\hat{\mathbf x} & \hat{\mathbf y} & \hat{\mathbf z}\\
\partial/\partial x & \partial/\partial y & \partial/\partial z\\
A_x & A_y & A_z
\end{vmatrix}}
$$

$$
\boxed{\nabla^2V={\partial^2V\over\partial x^2}+{\partial^2V\over\partial y^2}+{\partial^2V\over\partial z^2}}
$$

### 圆柱坐标公式

圆柱坐标 $\rho,\phi,z$ 最适合同轴线、无限长直线、圆柱电荷。

线元、面元、体元：

$$
d\mathbf l=\hat{\boldsymbol\rho}\,d\rho+\hat{\boldsymbol\phi}\,\rho d\phi+\hat{\mathbf z}\,dz
$$

$$
dS_\rho=\rho d\phi dz,\qquad dS_z=\rho d\rho d\phi,
\qquad dV=\rho d\rho d\phi dz
$$

梯度：

$$
\boxed{\nabla V={\partial V\over\partial \rho}\hat{\boldsymbol\rho}+{1\over\rho}{\partial V\over\partial \phi}\hat{\boldsymbol\phi}+{\partial V\over\partial z}\hat{\mathbf z}}
$$

散度：

$$
\boxed{\nabla\cdot\mathbf A={1\over\rho}{\partial(\rho A_\rho)\over\partial\rho}+{1\over\rho}{\partial A_\phi\over\partial\phi}+{\partial A_z\over\partial z}}
$$

旋度：

$$
\boxed{
\nabla\times\mathbf A=\left({1\over\rho}{\partial A_z\over\partial\phi}-{\partial A_\phi\over\partial z}\right)\hat{\boldsymbol\rho}
+\left({\partial A_\rho\over\partial z}-{\partial A_z\over\partial\rho}\right)\hat{\boldsymbol\phi}
+{1\over\rho}\left({\partial(\rho A_\phi)\over\partial\rho}-{\partial A_\rho\over\partial\phi}\right)\hat{\mathbf z}}
$$

标量 Laplacian：

$$
\boxed{\nabla^2V={1\over\rho}{\partial\over\partial\rho}\left(\rho{\partial V\over\partial\rho}\right)+{1\over\rho^2}{\partial^2V\over\partial\phi^2}+{\partial^2V\over\partial z^2}}
$$

### 球坐标最常用项

球坐标最常用于点电荷、带电球：

$$
dS_r=r^2\sin\theta\,d\theta d\phi,
\qquad dV=r^2\sin\theta\,drd\theta d\phi
$$

若场只有径向分量 $\mathbf A=A_r(r)\hat{\mathbf r}$，散度可简化为：

$$
\boxed{\nabla\cdot\mathbf A={1\over r^2}{d\over dr}(r^2A_r)}
$$

这个公式足够处理大多数带电球/点电荷的 Q1 小题。

## 固定做题模板

### 模板 1：给 $V$ 求 $\mathbf E$ 和 $\rho_v$

题目特征：给一个电势 $V(x,y,z)$，让求电场或电荷密度。

步骤：

1. 先看变量是直角坐标 $x,y,z$，还是圆柱坐标 $\rho,\phi,z$。如果是圆柱坐标，梯度中的 $\phi$ 项有 $1/\rho$，散度也不能直接用直角坐标公式。
2. 用 $\mathbf E=-\nabla V$。
3. 用 $\mathbf D=\varepsilon\mathbf E$。
4. 用 $\rho_v=\nabla\cdot\mathbf D$。
5. 若 $\varepsilon$ 为常数，也可以直接用 $\rho_v=-\varepsilon\nabla^2V$。

易错点：$\mathbf E$ 前面有负号；$\rho_v$ 是 $\nabla\cdot\mathbf D$，不是 $\nabla\cdot\mathbf E$，除非再乘 $\varepsilon$。

### 模板 2：给 $\mathbf D$ 求总电荷

题目特征：给 $\mathbf D$，让求某体积内总电荷。

两种方法：

- 如果闭合面简单：直接算 $Q=\oint_S\mathbf D\cdot d\mathbf S$。
- 如果体积分简单：先算 $\rho_v=\nabla\cdot\mathbf D$，再算 $Q=\int_V\rho_v dV$。

两种方法理论上一样，选更省事的。

### 模板 3：给 $\mathbf A$ 判断源和旋

题目特征：问“该场是否 solenoidal/irrotational”。

- Solenoidal 无散场：$\nabla\cdot\mathbf A=0$。
- Irrotational 无旋场：$\nabla\times\mathbf A=0$。

电磁场对应：

- $\nabla\cdot\mathbf B=0$：磁场无散。
- 静电场 $\nabla\times\mathbf E=0$：静电场无旋。

## 往年考试例题

### 例题 1：柱坐标散度（2024 Q1 类型）

给定圆柱坐标矢量场

$$
\mathbf D=\rho^2\hat{\boldsymbol\rho}\quad \text{C/m}^2
$$

求体电荷密度 $\rho_v$。

**解：**

用圆柱坐标散度公式：

$$
\rho_v=\nabla\cdot\mathbf D={1\over\rho}{\partial(\rho D_\rho)\over\partial\rho}+{1\over\rho}{\partial D_\phi\over\partial\phi}+{\partial D_z\over\partial z}
$$

这里 $D_\rho=\rho^2$，$D_\phi=0$，$D_z=0$，所以

$$
\rho_v={1\over\rho}{\partial(\rho^3)\over\partial\rho}=3\rho
$$

答案：

$$
\boxed{\rho_v=3\rho\ \text{C/m}^3}
$$

**易错提醒：** 不能写成 $\partial D_\rho/\partial\rho=2\rho$，因为圆柱坐标散度有 $\frac1\rho\frac{\partial(\rho D_\rho)}{\partial\rho}$。

### 例题 2：由电势求电场和电荷密度（2023/2024 Q1 类型）

均匀介质中

$$
V=x^2+2y^2-3z
$$

求 $\mathbf E$ 和 $\rho_v$。

**解：**

先求梯度：

$$
\nabla V=2x\hat{\mathbf x}+4y\hat{\mathbf y}-3\hat{\mathbf z}
$$

所以

$$
\boxed{\mathbf E=-2x\hat{\mathbf x}-4y\hat{\mathbf y}+3\hat{\mathbf z}}
$$

若介电常数为 $\varepsilon$，则

$$
\rho_v=-\varepsilon\nabla^2V
$$

而

$$
\nabla^2V={\partial^2V\over\partial x^2}+{\partial^2V\over\partial y^2}+{\partial^2V\over\partial z^2}=2+4+0=6
$$

所以

$$
\boxed{\rho_v=-6\varepsilon}
$$

**易错提醒：** $V$ 中的 $-3z$ 对电场有贡献，对 Laplacian 没贡献，因为二阶导为 0。

### 例题 3：Stokes 定理的物理意义（2025 Q2 类型）

说明 Stokes 定理在静磁场中的意义。

**答题框架：**

Stokes 定理为

$$
\oint_C\mathbf H\cdot d\mathbf l=\int_S(\nabla\times\mathbf H)\cdot d\mathbf S
$$

静磁场中

$$
\nabla\times\mathbf H=\mathbf J
$$

因此

$$
\oint_C\mathbf H\cdot d\mathbf l=\int_S\mathbf J\cdot d\mathbf S=I_{\rm enc}
$$

物理意义：磁场沿闭合路径的环量等于穿过该路径所围曲面的总电流。这就是安培环路定律。

## 重点难点总结

1. 圆柱坐标最容易漏 $\rho$：线元有 $\rho d\phi$，面元和体元也有 $\rho$。
2. 散度是源强度，旋度是打转强度；不要只背公式。
3. 静电场无旋：$\nabla\times\mathbf E=0$，所以可写 $\mathbf E=-\nabla V$。
4. 磁场无散：$\nabla\cdot\mathbf B=0$，所以磁力线闭合。
5. Gauss 定理是“闭合面通量 ↔ 体内散度”，Stokes 定理是“边界环量 ↔ 面内旋度”。

## 自测题与答案

### 题 1

在圆柱坐标中，$\mathbf A={1\over\rho}\hat{\boldsymbol\rho}$。求 $\nabla\cdot\mathbf A$（$\rho\ne0$）。

**答案：**

$$
\nabla\cdot\mathbf A={1\over\rho}{\partial(\rho A_\rho)\over\partial\rho}={1\over\rho}{\partial(1)\over\partial\rho}=0
$$

注意 $\rho=0$ 处有奇异性，常对应线源；普通小计算若说明 $\rho\ne0$，答案就是 0。

### 题 2

给 $V=5x-2y+z^2$，求 $\mathbf E$。

**答案：**

$$
\nabla V=5\hat{\mathbf x}-2\hat{\mathbf y}+2z\hat{\mathbf z}
$$

$$
\boxed{\mathbf E=-5\hat{\mathbf x}+2\hat{\mathbf y}-2z\hat{\mathbf z}}
$$

### 题 3

若 $\nabla\times\mathbf E=0$，能否一定说 $\mathbf E=0$？

**答案：**不能。$\nabla\times\mathbf E=0$ 只表示电场无旋、保守，可以写成 $\mathbf E=-\nabla V$。电场本身可以不为零，例如均匀静电场 $\mathbf E=E_0\hat{\mathbf x}$，旋度为零但场不为零。

### 题 4

写出 Gauss 定理，并说明它和电场高斯定律的关系。

**答案：**

Gauss 定理：

$$
\oint_S\mathbf A\cdot d\mathbf S=\int_V\nabla\cdot\mathbf A\,dV
$$

令 $\mathbf A=\mathbf D$，再用 Maxwell 方程 $\nabla\cdot\mathbf D=\rho_v$，得到

$$
\oint_S\mathbf D\cdot d\mathbf S=\int_V\rho_v dV=Q
$$

这就是电场高斯定律。

## 学习路线

如果你基础弱，本章按这个顺序学：

1. 先记住梯度、散度、旋度分别在问什么。
2. 只背直角坐标和圆柱坐标公式；球坐标先背径向散度简式。
3. 做 3 个小题：由 $V$ 求 $\mathbf E$，由 $\mathbf D$ 求 $\rho_v$，由 $\mathbf A$ 求旋度。
4. 再去第3章用这些工具处理电场问题。

## 和后续章节的关系

- 第3章用 $\nabla\cdot\mathbf D=\rho_v$ 和 $\mathbf E=-\nabla V$。
- 第5章用 $\nabla\cdot\mathbf J=0$ 描述稳恒电流。
- 第6章用 $\nabla\times\mathbf H=\mathbf J$ 求磁场。
- 第7章把这些算子组合成 Maxwell 方程。

## 一页考前速记

$$
\nabla V=\left({\partial V\over\partial x},{\partial V\over\partial y},{\partial V\over\partial z}\right)
$$

$$
\nabla\cdot\mathbf A={\partial A_x\over\partial x}+{\partial A_y\over\partial y}+{\partial A_z\over\partial z}
$$

$$
\nabla^2V={\partial^2V\over\partial x^2}+{\partial^2V\over\partial y^2}+{\partial^2V\over\partial z^2}
$$

圆柱坐标散度一定写成：

$$
\nabla\cdot\mathbf A={1\over\rho}{\partial(\rho A_\rho)\over\partial\rho}+{1\over\rho}{\partial A_\phi\over\partial\phi}+{\partial A_z\over\partial z}
$$

Gauss 定理：闭合面通量 = 体内散度积分。Stokes 定理：闭合线环量 = 面内旋度积分。