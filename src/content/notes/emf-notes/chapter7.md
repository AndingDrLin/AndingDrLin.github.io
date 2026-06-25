---
title: "第7章 时变场与 Maxwell 方程：Q3 的源头"
description: "面向 Q1/Q3 的时变场速成：Faraday 定律、位移电流、Maxwell 方程、位函数、相量和损耗角正切。"
date: 2026-06-25
tags: [electromagnetics-and-fields, 电磁场与波, Maxwell方程]
category: "课程学习"
docGroup: "emf-notes"
order: 9
draft: false
---

## 本章对应哪些考试题

本章主要服务两类题：

- **Q1 概念题**：Faraday 定律、位移电流、Maxwell 方程组、边界条件、位函数、Coulomb gauge 和 Lorenz gauge。
- **Q3 大题前置知识**：从 Maxwell 方程推出波动方程，进入第8章的平面波传播。

2026 mock Q1 已经直接问到矢量位 $\mathbf A$、标量位 $\varphi$、Coulomb gauge、Lorenz gauge。外部课程 Chapter 7 也把 Faraday、运动电动势、位移电流、Maxwell 方程、波动方程、位函数、时谐相量、复介电常数放在同一章。因此本章必须会背概念，也要知道它们如何连接到平面波。

## 先用人话理解本章在讲什么

静态场里，电场和磁场像两套分开的工具：电荷产生电场，电流产生磁场。时变场里，这个分离会失效：

- 变化的磁场会产生有旋电场：Faraday 定律。
- 变化的电场也会产生磁场：Maxwell 的位移电流修正。
- 两者互相“接力”，就能在没有电荷和电流的空间里传播，这就是电磁波。

所以第7章的真正作用是把前面静态公式改造成完整 Maxwell 方程，并为第8章平面波做准备。

## 必背符号和单位

| 符号 | 含义 | 单位 | 考试用途 |
|---|---|---|---|
| $\mathbf E$ | 电场强度 | V/m | Faraday、边界、波动方程 |
| $\mathbf D$ | 电通量密度 | C/m$^2$ | 位移电流 |
| $\mathbf H$ | 磁场强度 | A/m | Ampere-Maxwell 定律 |
| $\mathbf B$ | 磁感应强度 | T | 磁通、Faraday |
| $\mathbf J$ | 传导电流密度 | A/m$^2$ | 自由电流 |
| $\mathbf J_d$ | 位移电流密度 | A/m$^2$ | $\partial\mathbf D/\partial t$ |
| $\rho_v$ | 自由体电荷密度 | C/m$^3$ | Gauss 定律 |
| $\mathbf A$ | 磁矢位 | Wb/m | $\mathbf B=\nabla\times\mathbf A$ |
| $\varphi$ | 标量电位 | V | $\mathbf E=-\partial\mathbf A/\partial t-\nabla\varphi$ |
| $\omega$ | 角频率 | rad/s | 相量法 |
| $\varepsilon_c$ | 复介电常数 | F/m | 有耗媒质 |
| $\tan\delta$ | 损耗角正切 | 1 | 判断损耗强弱 |

本章默认使用时间因子 $e^{j\omega t}$。因此相量域里

$$
\boxed{{\partial\over\partial t}\to j\omega}
$$

## 核心概念

### Faraday 电磁感应定律

**直觉解释：** 磁通变化会产生绕着它的电场。这个电场不是静电场，不一定能写成单纯的 $-\nabla V$。

积分形式：

$$
\boxed{\oint_C\mathbf E\cdot d\mathbf l=-{d\over dt}\int_S\mathbf B\cdot d\mathbf S}
$$

若回路不动：

$$
\boxed{\oint_C\mathbf E\cdot d\mathbf l=-\int_S{\partial\mathbf B\over\partial t}\cdot d\mathbf S}
$$

微分形式：

$$
\boxed{\nabla\times\mathbf E=-{\partial\mathbf B\over\partial t}}
$$

负号来自 Lenz 定律：感应效应反抗磁通变化，而不是简单“反抗磁场”。

### 运动电动势

低优先级。除非题目出现 moving conductor、velocity 或 $\mathbf v\times\mathbf B$，否则考前一天先跳过，优先掌握 Maxwell 方程、位函数和相量法。

如果导体以速度 $\mathbf v$ 在磁场中运动，导体内电荷受洛伦兹力 $q\mathbf v\times\mathbf B$，产生运动电动势：

$$
\boxed{\mathcal E_m=\oint_C(\mathbf v\times\mathbf B)\cdot d\mathbf l}
$$

一般情况下，总电动势可以理解为变压器电动势和运动电动势叠加：

$$
\boxed{\mathcal E=\oint_C\mathbf E\cdot d\mathbf l+\oint_C(\mathbf v\times\mathbf B)\cdot d\mathbf l}
$$

### 位移电流

静磁场中有

$$
\nabla\times\mathbf H=\mathbf J
$$

但时变场里电荷密度会随时间变化，连续性方程为

$$
\boxed{\nabla\cdot\mathbf J=-{\partial\rho_v\over\partial t}}
$$

如果仍然写 $\nabla\times\mathbf H=\mathbf J$，两边取散度会得到 $\nabla\cdot\mathbf J=0$，和时变电荷守恒矛盾。

Maxwell 的修正是加入位移电流：

$$
\boxed{\mathbf J_d={\partial\mathbf D\over\partial t}}
$$

于是

$$
\boxed{\nabla\times\mathbf H=\mathbf J+{\partial\mathbf D\over\partial t}}
$$

人话：传导电流是电荷真的在运动，位移电流是时变电场对磁场的贡献。位移电流没有传导电流那种焦耳热，但在 Maxwell 方程里同样能产生磁场。

### Maxwell 方程组

微分形式：

$$
\boxed{\nabla\cdot\mathbf D=\rho_v}
$$

$$
\boxed{\nabla\cdot\mathbf B=0}
$$

$$
\boxed{\nabla\times\mathbf E=-{\partial\mathbf B\over\partial t}}
$$

$$
\boxed{\nabla\times\mathbf H=\mathbf J+{\partial\mathbf D\over\partial t}}
$$

积分形式：

$$
\boxed{\oint_S\mathbf D\cdot d\mathbf S=Q}
$$

$$
\boxed{\oint_S\mathbf B\cdot d\mathbf S=0}
$$

$$
\boxed{\oint_C\mathbf E\cdot d\mathbf l=-{d\over dt}\int_S\mathbf B\cdot d\mathbf S}
$$

$$
\boxed{\oint_C\mathbf H\cdot d\mathbf l=\int_S\mathbf J\cdot d\mathbf S+{d\over dt}\int_S\mathbf D\cdot d\mathbf S}
$$

本构关系：

$$
\boxed{\mathbf D=\varepsilon\mathbf E},
\qquad
\boxed{\mathbf B=\mu\mathbf H},
\qquad
\boxed{\mathbf J=\sigma\mathbf E}
$$

## 核心公式与推导

### Maxwell 方程的物理意义表

| 方程 | 人话理解 | 常见考法 |
|---|---|---|
| $\nabla\cdot\mathbf D=\rho_v$ | 电荷是电场源 | 高斯定律、由 $\mathbf D$ 求电荷 |
| $\nabla\cdot\mathbf B=0$ | 没有磁荷，磁力线闭合 | 磁边界、概念题 |
| $\nabla\times\mathbf E=-\partial\mathbf B/\partial t$ | 变化磁场产生有旋电场 | Faraday、感应电动势 |
| $\nabla\times\mathbf H=\mathbf J+\partial\mathbf D/\partial t$ | 电流和变化电场产生磁场 | 位移电流、Maxwell 修正 |

### 边界条件

设 $\hat{\mathbf n}$ 从介质 1 指向介质 2：

$$
\boxed{\hat{\mathbf n}\cdot(\mathbf D_2-\mathbf D_1)=\rho_{s,\rm free}}
$$

$$
\boxed{\hat{\mathbf n}\cdot(\mathbf B_2-\mathbf B_1)=0}
$$

$$
\boxed{\hat{\mathbf n}\times(\mathbf E_2-\mathbf E_1)=0}
$$

$$
\boxed{\hat{\mathbf n}\times(\mathbf H_2-\mathbf H_1)=\mathbf K_s}
$$

其中 $\rho_{s,\rm free}$ 是自由面电荷密度，$\mathbf K_s$ 是自由面电流密度。$\mathbf K_s$ 的符号与所选 $\hat{\mathbf n}$ 配套；教材若采用相反法向，右端符号会相应改变。

时变场的边界条件形式和静态场一致。原因是推导时用无限薄的 pillbox 或窄矩形回路，面积趋于 0 后时间变化项的面积分也趋于 0。

### 波动方程

在无源、均匀、无耗介质中：

$$
\rho_v=0,
\qquad \mathbf J=0,
\qquad \mathbf D=\varepsilon\mathbf E,
\qquad \mathbf B=\mu\mathbf H
$$

如果考试要求推导电场波动方程，按四步写：

1. 对 Faraday 定律取旋度：

$$
\nabla\times\nabla\times\mathbf E
=-\mu{\partial\over\partial t}(\nabla\times\mathbf H)
$$

2. 无源无耗介质中：

$$
\nabla\times\mathbf H=\varepsilon{\partial\mathbf E\over\partial t}
$$

3. 使用恒等式

$$
\nabla\times\nabla\times\mathbf E=\nabla(\nabla\cdot\mathbf E)-\nabla^2\mathbf E
$$

且无源均匀介质中 $\nabla\cdot\mathbf E=0$。

4. 得到

$$
\boxed{\nabla^2\mathbf E-\mu\varepsilon{\partial^2\mathbf E\over\partial t^2}=0}
$$

同理可得磁场波动方程：

$$
\boxed{\nabla^2\mathbf H-\mu\varepsilon{\partial^2\mathbf H\over\partial t^2}=0}
$$

波速：

$$
\boxed{v={1\over\sqrt{\mu\varepsilon}}}
$$

真空中：

$$
\boxed{c={1\over\sqrt{\mu_0\varepsilon_0}}}
$$

### 位函数与 gauge

因为

$$
\nabla\cdot\mathbf B=0
$$

可以引入磁矢位：

$$
\boxed{\mathbf B=\nabla\times\mathbf A}
$$

代入 Faraday 定律：

$$
\nabla\times\mathbf E=-{\partial\over\partial t}(\nabla\times\mathbf A)
$$

得到

$$
\nabla\times\left(\mathbf E+{\partial\mathbf A\over\partial t}\right)=0
$$

无旋场可写成负梯度，所以

$$
\boxed{\mathbf E=-{\partial\mathbf A\over\partial t}-\nabla\varphi}
$$

这就是时变场中引入矢量位 $\mathbf A$ 和标量位 $\varphi$ 的过程。

#### Coulomb gauge

$$
\boxed{\nabla\cdot\mathbf A=0}
$$

它在静态或准静态问题中常用，能让磁矢位方程简化。

#### Lorenz gauge

$$
\boxed{\nabla\cdot\mathbf A+\mu\varepsilon{\partial\varphi\over\partial t}=0}
$$

在时变电磁场中更常用，因为它能让 $\mathbf A$ 和 $\varphi$ 的波动方程解耦，形式更对称。

> 注意写法：这里是 Lorenz gauge，不是 Lorentz force。很多资料会混写，但考试通常接受“Lorentz gauge”这个常见拼法；写公式最重要。

### 时谐场与相量

位函数概念题可以压缩成三句话背：因为 $\nabla\cdot\mathbf B=0$，所以可令 $\mathbf B=\nabla\times\mathbf A$；代入 Faraday 定律后，$\mathbf E+\partial\mathbf A/\partial t$ 是无旋场，所以可写成 $-\nabla\varphi$；由于位函数不唯一，需要 gauge 条件简化方程。

若场随时间按单一频率变化：

$$
\mathbf E(\mathbf r,t)=\operatorname{Re}\left[\mathbf E(\mathbf r)e^{j\omega t}\right]
$$

则

$$
{\partial\over\partial t}\to j\omega
$$

Maxwell 方程变成相量形式：

$$
\boxed{\nabla\times\mathbf E=-j\omega\mu\mathbf H}
$$

$$
\boxed{\nabla\times\mathbf H=(\sigma+j\omega\varepsilon)\mathbf E}
$$

在无源无耗介质中：

$$
\boxed{\nabla^2\mathbf E+k^2\mathbf E=0},
\qquad
\boxed{\nabla^2\mathbf H+k^2\mathbf H=0}
$$

其中

$$
\boxed{k=\omega\sqrt{\mu\varepsilon}}
$$

这就是 Helmholtz 方程，第8章平面波就是它的一类解。

### 复介电常数与损耗角正切

有耗媒质中：

$$
\nabla\times\mathbf H=(\sigma+j\omega\varepsilon)\mathbf E
$$

可以把传导损耗并入复介电常数。采用 $e^{j\omega t}$ 约定时，常写

$$
\boxed{\varepsilon_c=\varepsilon-j{\sigma\over\omega}}
$$

使得

$$
\sigma+j\omega\varepsilon=j\omega\varepsilon_c
$$

损耗角正切：

$$
\boxed{\tan\delta={\sigma\over\omega\varepsilon}}
$$

判断：

- $\sigma\ll\omega\varepsilon$：良介质，损耗小。
- $\sigma\gg\omega\varepsilon$：良导体，传导电流占主导。

## 固定做题模板

### 模板 1：Faraday 感应电动势

题目特征：给线圈面积、磁场 $B(t)$，求感应电动势。

步骤：

1. 写磁通：$\Phi=\int_S\mathbf B\cdot d\mathbf S$。
2. 若 $N$ 匝，磁链 $\Psi=N\Phi$。
3. 感应电动势：

$$
\mathcal E=-{d\Psi\over dt}
$$

4. 方向用 Lenz 定律判断。

### 模板 2：位移电流概念题

答题框架：

1. 连续性方程要求 $\nabla\cdot\mathbf J=-\partial\rho_v/\partial t$。
2. 若仍写 $\nabla\times\mathbf H=\mathbf J$，取散度会强迫 $\nabla\cdot\mathbf J=0$，与时变电荷矛盾。
3. Maxwell 加入 $\partial\mathbf D/\partial t$，得到

$$
\nabla\times\mathbf H=\mathbf J+\partial\mathbf D/\partial t
$$

4. 位移电流使电容器极板间也能产生磁场，并保证电流连续。

### 模板 3：位函数与 gauge（mock 2026 Q1(a)(b) 类型）

答题框架：

1. 因 $\nabla\cdot\mathbf B=0$，引入 $\mathbf A$：

$$
\mathbf B=\nabla\times\mathbf A
$$

2. 代入 Faraday 定律，得到：

$$
\mathbf E=-{\partial\mathbf A\over\partial t}-\nabla\varphi
$$

3. gauge 是对 $\mathbf A,\varphi$ 的附加约束，因为位函数不唯一。
4. Coulomb gauge：$\nabla\cdot\mathbf A=0$。
5. Lorenz gauge：$\nabla\cdot\mathbf A+\mu\varepsilon\partial\varphi/\partial t=0$。
6. 时变场常用 Lorenz gauge，因为能让位函数方程解耦成波动方程。

### 模板 4：判断良导体/良介质

题目特征：给 $\sigma,\varepsilon,f$，判断媒质性质。

步骤：

1. 算 $\omega=2\pi f$。
2. 比较 $\sigma$ 和 $\omega\varepsilon$。
3. 若 $\sigma\gg\omega\varepsilon$，良导体；若 $\sigma\ll\omega\varepsilon$，良介质。
4. 第8章再用对应近似公式求 $\alpha,\beta,\delta,\eta_c$。

## 往年考试例题

### 例题 1：位函数引入过程（mock 2026 Q1(a)(b) 类型）

说明时变电磁场中如何引入矢量位 $\mathbf A$ 和标量位 $\varphi$，并解释 Coulomb gauge 和 Lorenz gauge。

**答案：**

由 Maxwell 方程

$$
\nabla\cdot\mathbf B=0
$$

可引入矢量位

$$
\mathbf B=\nabla\times\mathbf A
$$

代入 Faraday 定律：

$$
\nabla\times\mathbf E=-{\partial\mathbf B\over\partial t}
=-{\partial\over\partial t}(\nabla\times\mathbf A)
$$

即

$$
\nabla\times\left(\mathbf E+{\partial\mathbf A\over\partial t}\right)=0
$$

无旋场可表示为负梯度：

$$
\mathbf E+{\partial\mathbf A\over\partial t}=-\nabla\varphi
$$

因此

$$
\boxed{\mathbf E=-{\partial\mathbf A\over\partial t}-\nabla\varphi}
$$

Coulomb gauge：

$$
\boxed{\nabla\cdot\mathbf A=0}
$$

Lorenz gauge：

$$
\boxed{\nabla\cdot\mathbf A+\mu\varepsilon{\partial\varphi\over\partial t}=0}
$$

时变场通常使用 Lorenz gauge，因为它能让 $\mathbf A$ 和 $\varphi$ 满足形式类似的波动方程，便于分析电磁波传播。

### 例题 2：位移电流（概念题）

为什么电容器充电时，两极板间没有传导电流，却仍然可以有磁场？

**答案：**

电容器导线中有传导电流 $\mathbf J$，但极板间介质或真空中没有自由电荷跨越间隙，因此传导电流为零。充电过程中极板间电场随时间变化，所以 $\mathbf D$ 随时间变化，存在位移电流密度

$$
\mathbf J_d={\partial\mathbf D\over\partial t}
$$

Ampere-Maxwell 定律为

$$
\nabla\times\mathbf H=\mathbf J+{\partial\mathbf D\over\partial t}
$$

因此极板间虽然没有传导电流，仍有位移电流产生磁场。这个修正确保不同取面计算同一个环路的磁场环量时结果一致。

### 例题 3：判断媒质类型（2023/2025 良导体题前置）

某媒质 $\sigma=4$ S/m，$\varepsilon_r=80$，频率 $f=1$ MHz。判断传导电流和位移电流谁占主导。

**解：**

$$
\omega=2\pi f=2\pi\times10^6
$$

$$
\varepsilon=80\varepsilon_0\approx80\times8.854\times10^{-12}=7.08\times10^{-10}\ \text{F/m}
$$

$$
\omega\varepsilon\approx2\pi\times10^6\times7.08\times10^{-10}\approx4.45\times10^{-3}\ \text{S/m}
$$

比较：

$$
\sigma=4\gg4.45\times10^{-3}=\omega\varepsilon
$$

所以传导电流占主导，该媒质在此频率下可按良导体近似处理。

## 重点难点总结

1. Faraday 定律负号表示 Lenz 定律，方向题要单独判断。
2. 位移电流不是电荷穿过介质，而是时变电场对磁场的贡献。
3. Maxwell 方程四条必须会默写微分形式和物理意义。
4. 时变场仍使用和静态场形式相同的边界条件。
5. $\mathbf A$、$\varphi$ 在时变场中满足 $\mathbf B=\nabla\times\mathbf A$、$\mathbf E=-\partial\mathbf A/\partial t-\nabla\varphi$。
6. 时谐相量下 $\partial/\partial t\to j\omega$，这是第8章所有传播公式的入口。

## 自测题与答案

### 题 1

写出 Maxwell 方程组的微分形式。

**答案：**

$$
\nabla\cdot\mathbf D=\rho_v
$$

$$
\nabla\cdot\mathbf B=0
$$

$$
\nabla\times\mathbf E=-{\partial\mathbf B\over\partial t}
$$

$$
\nabla\times\mathbf H=\mathbf J+{\partial\mathbf D\over\partial t}
$$

### 题 2

无源无耗均匀介质中的电场波速是多少？

**答案：**

波动方程为

$$
\nabla^2\mathbf E-\mu\varepsilon{\partial^2\mathbf E\over\partial t^2}=0
$$

所以波速

$$
\boxed{v={1\over\sqrt{\mu\varepsilon}}}
$$

### 题 3

使用 $e^{j\omega t}$ 相量约定时，$\partial\mathbf D/\partial t$ 在相量域中变成什么？

**答案：**

若

$$
\mathbf D(t)=\operatorname{Re}[\mathbf D e^{j\omega t}]
$$

则

$$
{\partial\mathbf D\over\partial t}\leftrightarrow j\omega\mathbf D
$$

所以 Ampere-Maxwell 定律相量形式为

$$
\nabla\times\mathbf H=\mathbf J+j\omega\mathbf D
$$

若 $\mathbf J=\sigma\mathbf E$、$\mathbf D=\varepsilon\mathbf E$，则

$$
\nabla\times\mathbf H=(\sigma+j\omega\varepsilon)\mathbf E
$$

### 题 4

为什么时变场中只用 $\mathbf E=-\nabla V$ 不够？

**答案：**

时变磁场存在时，Faraday 定律给出

$$
\nabla\times\mathbf E=-{\partial\mathbf B\over\partial t}
$$

一般不为零。而 $-\nabla V$ 的旋度恒为零，不能表示有旋的感应电场。因此时变场中必须写成

$$
\mathbf E=-{\partial\mathbf A\over\partial t}-\nabla\varphi
$$

其中 $-\partial\mathbf A/\partial t$ 描述由时变磁场引起的有旋部分。

## 学习路线

1. 先背 Maxwell 方程四条和物理意义。
2. 再理解位移电流为什么必须加。
3. 然后背位函数公式和两个 gauge。
4. 最后掌握相量替换 $\partial/\partial t\to j\omega$，转入第8章平面波。

## 和后续章节的关系

第8章所有平面波公式都来自本章 Maxwell 方程的时谐形式。尤其是：

- $\nabla\times\mathbf E=-j\omega\mu\mathbf H$ 决定 $\mathbf E$ 和 $\mathbf H$ 的方向关系。
- $\nabla\times\mathbf H=(\sigma+j\omega\varepsilon)\mathbf E$ 决定有耗媒质中的传播常数。
- 边界条件决定反射系数和透射系数。

## 一页考前速记

Maxwell 方程：

$$
\nabla\cdot\mathbf D=\rho_v,
\quad \nabla\cdot\mathbf B=0,
\quad \nabla\times\mathbf E=-{\partial\mathbf B\over\partial t},
\quad \nabla\times\mathbf H=\mathbf J+{\partial\mathbf D\over\partial t}
$$

位移电流：

$$
\mathbf J_d={\partial\mathbf D\over\partial t}
$$

位函数：

$$
\mathbf B=\nabla\times\mathbf A,
\qquad
\mathbf E=-{\partial\mathbf A\over\partial t}-\nabla\varphi
$$

Gauge：

$$
\nabla\cdot\mathbf A=0\quad\text{Coulomb gauge}
$$

$$
\nabla\cdot\mathbf A+\mu\varepsilon{\partial\varphi\over\partial t}=0\quad\text{Lorenz gauge}
$$

时谐相量：

$$
{\partial\over\partial t}\to j\omega,
\qquad \tan\delta={\sigma\over\omega\varepsilon}
$$
