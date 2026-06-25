---
title: "第6章 静磁场：Q2 磁场、电感与磁能"
description: "面向 Q2 大题的静磁场应试模板：B/H/M/J_M、磁边界条件、同轴线磁场-磁能-电感、螺线管自感互感。"
date: 2026-06-25
tags: [electromagnetics-and-fields, 电磁场与波, 静磁场]
category: "课程学习"
docGroup: "emf-notes"
order: 8
draft: false
---

## 本章对应哪些考试题

本章是 **Q2 的主战场**。老师明确点名：CH6，概念题 + 大计算题，范围包括

$$
\mathbf B,
\quad \mathbf H,
\quad \mathbf M,
\quad \mathbf J_M,
\quad \text{自感},
\quad \text{互感},
\quad \text{磁能}
$$

从往年题和 mock 2026 看，最值得优先掌握的是两套大题模板：

1. **同轴线磁场-磁能-电感**：mock 2026 Q2、2022 Q9、2025 Q4 都能对应。
2. **螺线管自感/互感**：2023 Q3、2024 Q4 反复出现。

概念题则集中在 $\mathbf B$、$\mathbf H$、$\mathbf M$ 的区别，磁化电流，以及磁边界条件。

## 先用人话理解本章在讲什么

第3章是“电荷产生电场”，本章是“电流产生磁场”。静磁场的直觉是：

- 电流让磁场绕起来，所以用环路积分最方便。
- 磁场线永远闭合，没有孤立磁荷，所以 $\nabla\cdot\mathbf B=0$。
- 在介质中，真实微观电流很复杂，于是引入 $\mathbf H$ 和 $\mathbf M$，把自由电流和磁化效应分开。
- 电感不是电路里凭空来的元件参数，本质是“电流产生磁链的能力”。
- 磁能可以从场能密度积分，也可以从 $W_m=\frac12 LI^2$ 反推电感。

Q2 不怕公式多，怕你不知道从哪里开始。看到“同轴线/螺线管/磁能/电感”，第一反应都应该是：先求 $\mathbf H$ 或 $\mathbf B$。

## 必背符号和单位

| 符号 | 含义 | 单位 | 考试提醒 |
|---|---|---|---|
| $\mathbf B$ | 磁感应强度/磁通密度 | T | 进入磁通 $\Phi$ |
| $\mathbf H$ | 磁场强度 | A/m | 安培环路定律常用 |
| $\mathbf M$ | 磁化强度 | A/m | 单位体积磁偶极矩 |
| $\mathbf J$ | 自由体电流密度 | A/m$^2$ | $\nabla\times\mathbf H=\mathbf J$ |
| $\mathbf J_M$ | 体磁化电流密度 | A/m$^2$ | $\mathbf J_M=\nabla\times\mathbf M$ |
| $\mathbf K_M$ | 面磁化电流密度 | A/m | $\mathbf K_M=\mathbf M\times\hat{\mathbf n}$ |
| $\mu$ | 磁导率 | H/m | 线性介质 $\mathbf B=\mu\mathbf H$ |
| $\Phi$ | 磁通 | Wb | $\Phi=\int\mathbf B\cdot d\mathbf S$ |
| $\Psi$ | 磁链 | Wb | 多匝线圈 $\Psi=N\Phi$ |
| $L$ | 自感 | H | $L=\Psi/I$ |
| $M$ | 互感 | H | $M=\Psi_{21}/I_1$ |
| $w_m$ | 磁能密度 | J/m$^3$ | $w_m=\frac12\mathbf B\cdot\mathbf H$ |

注意：互感 $M$ 和磁化强度 $\mathbf M$ 符号相同但含义不同。写题时用粗体 $\mathbf M$ 表示磁化强度，用标量 $M$ 表示互感。

## 核心概念

### $\mathbf B$、$\mathbf H$、$\mathbf M$ 的区别

- $\mathbf B$：真正进入洛伦兹力和磁通的磁感应强度，表示总磁效应。
- $\mathbf H$：把自由电流单独拎出来后使用的辅助磁场，环路积分直接对应自由电流。
- $\mathbf M$：介质被磁化后，单位体积内的磁偶极矩；磁化效应可用 $\mathbf M$ 或等效磁化电流描述。

一般关系：

$$
\boxed{\mathbf B=\mu_0(\mathbf H+\mathbf M)}
$$

线性各向同性介质中：

$$
\boxed{\mathbf M=\chi_m\mathbf H},
\qquad
\boxed{\mathbf B=\mu\mathbf H=\mu_0(1+\chi_m)\mathbf H}
$$

**考场答法：** $\mathbf B$ 描述总磁场效果，$\mathbf H$ 与自由电流关系最直接，$\mathbf M$ 描述介质磁化。

### 磁化电流

磁化强度不均匀或有边界时，会等效出束缚电流：

$$
\boxed{\mathbf J_M=\nabla\times\mathbf M}
$$

$$
\boxed{\mathbf K_M=\mathbf M\times\hat{\mathbf n}}
$$

其中 $\hat{\mathbf n}$ 是介质表面向外法向。老师点名 $J_M$，所以即使往年大题不一定展开，也必须会写定义和物理意义。

### 安培环路定律

静磁场宏观形式：

$$
\boxed{\oint_C\mathbf H\cdot d\mathbf l=I_{\rm free,enc}}
$$

微分形式：

$$
\boxed{\nabla\times\mathbf H=\mathbf J}
$$

它适合高对称电流分布：无限长直导线、同轴线、长螺线管、环形磁芯。

### 磁边界条件

设 $\hat{\mathbf n}$ 从介质 1 指向介质 2：

$$
\boxed{\hat{\mathbf n}\cdot(\mathbf B_2-\mathbf B_1)=0}
$$

$$
\boxed{\hat{\mathbf n}\times(\mathbf H_2-\mathbf H_1)=\mathbf K_s}
$$

分量人话：

- 法向 $B$ 连续：$B_{1n}=B_{2n}$。
- 切向 $H$ 因自由面电流跳变；若无自由面电流，则 $H_{1t}=H_{2t}$。

这里的 $\mathbf K_s$ 方向必须与所选 $\hat{\mathbf n}$ 配套；如果教材采用相反法向，右端符号会相应改变。考试时先画出 $\hat{\mathbf n}$ 和 $\mathbf K_s$，再代入边界条件。

**和静电边界对比：** 静电是切向 $E$ 连续、法向 $D$ 跳变；静磁是法向 $B$ 连续、切向 $H$ 跳变。

## 核心公式与推导

### 静磁场基本方程

$$
\boxed{\nabla\cdot\mathbf B=0},
\qquad
\boxed{\nabla\times\mathbf H=\mathbf J}
$$

积分形式：

$$
\boxed{\oint_S\mathbf B\cdot d\mathbf S=0},
\qquad
\boxed{\oint_C\mathbf H\cdot d\mathbf l=I_{\rm enc}}
$$

真空中 $\mathbf B=\mu_0\mathbf H$，所以也可写

$$
\nabla\times\mathbf B=\mu_0\mathbf J
$$

### 磁矢位

因为 $\nabla\cdot\mathbf B=0$，可以引入磁矢位：

$$
\boxed{\mathbf B=\nabla\times\mathbf A}
$$

静磁场中常配合 Coulomb gauge：

$$
\boxed{\nabla\cdot\mathbf A=0}
$$

概念题常问：为什么能引入 $\mathbf A$？答：因为 $\mathbf B$ 无散，任意旋度的散度恒为零。

### 磁能与电感

磁能密度：

$$
\boxed{w_m={1\over2}\mathbf B\cdot\mathbf H={1\over2}\mu H^2={B^2\over2\mu}}
$$

总磁能：

$$
\boxed{W_m=\int_V w_m\,dV}
$$

自感定义：

$$
\boxed{L={\Psi\over I}}
$$

磁能与电感关系：

$$
\boxed{W_m={1\over2}LI^2},
\qquad
\boxed{L={2W_m\over I^2}}
$$

**易错点：** 从磁能求电感时必须乘 2，不能写 $L=W/I^2$。

互感定义：

$$
\boxed{M_{21}={\Psi_{21}\over I_1}}
$$

其中 $\Psi_{21}$ 是线圈 1 的电流 $I_1$ 在线圈 2 中产生的磁链。

## 固定做题模板

### 模板 1：同轴线磁场-磁能-电感

题目特征：内导体半径 $a$，外导体内半径 $b$，中间填充磁导率 $\mu$ 的介质，电流 $I$ 和回流 $-I$。

先判断模型：

| 题干关键词 | 采用模型 | 是否算导体内部磁能 |
|---|---|---|
| ideal conductor / current on surface / outer conductor thickness neglected | 表面电流模型 | 不算 |
| solid conductor / uniformly distributed current / DC current in conductor volume | 均匀体电流模型 | 要算 |
| 只问介质区域 $a<\rho<b$ | 只算介质区域 | 不补导体内部 |

#### 第一步：用安培环路定律求 $H$

在 $a<\rho<b$：

$$
H_\phi(2\pi\rho)=I
$$

$$
\boxed{\mathbf H={I\over2\pi\rho}\hat{\boldsymbol\phi}\quad(a<\rho<b)}
$$

理想导体/表面电流模型下：

$$
\boxed{\mathbf H=0\quad(\rho<a)},
\qquad
\boxed{\mathbf H=0\quad(\rho>b)}
$$

如果题目明确说内导体为实心且电流均匀分布，则内导体中要改用

$$
\boxed{\mathbf H={I\rho\over2\pi a^2}\hat{\boldsymbol\phi}\quad(\rho<a)}
$$

本次 mock 2026 的描述“外导体厚度忽略、中间填充介质”更适合先按理想同轴线模板处理；若老师特别强调 DC 均匀电流，再补内导体内磁能。

#### 第二步：积分单位长度磁能

单位长度体元：

$$
dV'=2\pi\rho\,d\rho
$$

磁能密度：

$$
w_m={1\over2}\mu H^2={1\over2}\mu\left({I\over2\pi\rho}\right)^2
$$

单位长度磁能：

$$
W_m'=\int_a^b {1\over2}\mu\left({I\over2\pi\rho}\right)^2 2\pi\rho\,d\rho
$$

$$
\boxed{W_m'={\mu I^2\over4\pi}\ln{b\over a}}
$$

#### 第三步：由磁能求电感

$$
L'={2W_m'\over I^2}
$$

所以

$$
\boxed{L'={\mu\over2\pi}\ln{b\over a}}
$$

### 模板 2：长螺线管自感

题目特征：长螺线管长度 $l$，匝数 $N$，截面积 $S$，电流 $I$。

1. 安培环路：

$$
\boxed{H={NI\over l}}
$$

2. 磁感应强度：

$$
\boxed{B=\mu H=\mu{NI\over l}}
$$

3. 单匝磁通：

$$
\Phi=BS=\mu{NI\over l}S
$$

4. 磁链：

$$
\Psi=N\Phi=\mu{N^2SI\over l}
$$

5. 自感：

$$
\boxed{L={\Psi\over I}={\mu N^2S\over l}}
$$

### 模板 3：互感

题目特征：线圈 1 产生磁场，问线圈 2 的磁链或互感。

步骤：

1. 只让线圈 1 通电 $I_1$。
2. 求它在目标区域的 $B_1$。
3. 求穿过线圈 2 单匝的磁通 $\Phi_{21}$。
4. 求线圈 2 的磁链 $\Psi_{21}=N_2\Phi_{21}$。
5. 互感

$$
\boxed{M_{21}={\Psi_{21}\over I_1}}
$$

若两个线圈耦合完全且共用同一磁通区域，结果通常也满足 $M_{12}=M_{21}$。

常见长螺线管互感模板：线圈 1 为长螺线管，长度 $l$、匝数 $N_1$、截面积 $S_1$；线圈 2 有 $N_2$ 匝并套在共同磁通区域内，有效耦合面积为 $S_{\rm eff}$。线圈 1 通电 $I_1$ 时，

$$
H_1={N_1I_1\over l},
\qquad B_1=\mu{N_1I_1\over l}
$$

线圈 2 单匝磁通为

$$
\Phi_{21}=B_1S_{\rm eff}
$$

磁链为

$$
\Psi_{21}=N_2\Phi_{21}
$$

所以互感为

$$
\boxed{M_{21}={\Psi_{21}\over I_1}={\mu N_1N_2S_{\rm eff}\over l}}
$$

若两线圈完全同轴且截面积不同，通常取 $S_{\rm eff}$ 为共同穿过磁通的较小面积。

### 模板 4：磁边界条件题

题目特征：两种磁介质界面，给一侧 $\mathbf B$ 或 $\mathbf H$，求另一侧分量。

步骤：

1. 分解法向/切向。
2. 法向 $B$ 连续：$B_{1n}=B_{2n}$。
3. 若无自由面电流，切向 $H$ 连续：$H_{1t}=H_{2t}$。
4. 用 $B=\mu H$ 在各自介质中换算。

## 往年考试例题

### 例题 1：同轴线磁场、磁能、电感（mock 2026 Q2 类型）

同轴线内导体半径 $a$，外导体内半径 $b$，外导体厚度忽略，中间填充磁导率 $\mu$ 的介质。内外导体携带大小相等、方向相反的直流电流 $I$。求各区域磁场、中间介质单位长度磁能和单位长度电感。

**解：**

在 $a<\rho<b$ 选半径 $\rho$ 的圆形安培回路：

$$
\oint\mathbf H\cdot d\mathbf l=H_\phi2\pi\rho=I
$$

所以

$$
\boxed{\mathbf H={I\over2\pi\rho}\hat{\boldsymbol\phi}\quad(a<\rho<b)}
$$

理想导体表面电流模型下：

$$
\boxed{\mathbf H=0\quad(\rho<a)},
\qquad
\boxed{\mathbf H=0\quad(\rho>b)}
$$

单位长度磁能：

$$
W_m'=\int_a^b {1\over2}\mu\left({I\over2\pi\rho}\right)^2 2\pi\rho\,d\rho
$$

$$
= {\mu I^2\over4\pi}\int_a^b {1\over\rho}d\rho
={\mu I^2\over4\pi}\ln{b\over a}
$$

因此

$$
\boxed{W_m'={\mu I^2\over4\pi}\ln{b\over a}}
$$

单位长度电感：

$$
\boxed{L'={2W_m'\over I^2}={\mu\over2\pi}\ln{b\over a}}
$$

**易错提醒：** 介质中求磁能时体元是单位长度圆柱壳 $2\pi\rho d\rho$，不能写成 $\pi(b^2-a^2)$ 乘平均场，因为 $H$ 随 $1/\rho$ 变化。

### 例题 2：长螺线管自感（2023/2024 Q3 类型）

长螺线管长度 $l$，匝数 $N$，截面积 $S$，填充磁导率 $\mu$ 的磁介质，求自感。

**解：**

长螺线管内部磁场近似均匀：

$$
H={NI\over l}
$$

$$
B=\mu H=\mu{NI\over l}
$$

单匝磁通：

$$
\Phi=BS=\mu{NI\over l}S
$$

磁链：

$$
\Psi=N\Phi=\mu{N^2SI\over l}
$$

所以

$$
\boxed{L={\Psi\over I}={\mu N^2S\over l}}
$$

### 例题 3：磁边界条件（2024 Q4 类型）

两磁介质界面无自由面电流，磁导率分别为 $\mu_1$、$\mu_2$。已知介质 1 中切向磁场 $H_{1t}$ 和法向磁感应强度 $B_{1n}$，求介质 2 中对应分量。

**解：**

无自由面电流：

$$
H_{2t}=H_{1t}
$$

法向 $B$ 永远连续：

$$
B_{2n}=B_{1n}
$$

若要换成 $H_{2n}$，用 $B_{2n}=\mu_2H_{2n}$：

$$
H_{2n}={B_{1n}\over\mu_2}
$$

若要换成 $B_{2t}$，用 $B_{2t}=\mu_2H_{2t}$：

$$
B_{2t}=\mu_2H_{1t}
$$

**易错提醒：** 无面电流时连续的是切向 $H$，不是切向 $B$。

### 例题 4：磁化电流概念题

均匀磁化介质内 $\mathbf M=M_0\hat{\mathbf z}$ 为常量，问体磁化电流 $\mathbf J_M$ 是否存在。

**解：**

$$
\mathbf J_M=\nabla\times\mathbf M
$$

因为 $\mathbf M$ 是常量，旋度为零：

$$
\boxed{\mathbf J_M=0}
$$

但如果介质有边界，面磁化电流可能存在：

$$
\mathbf K_M=\mathbf M\times\hat{\mathbf n}
$$

所以“体磁化电流为零”不代表“完全没有磁化等效电流”。

## 重点难点总结

1. $\mathbf B$ 进磁通，$\mathbf H$ 进安培环路，$\mathbf M$ 描述磁化。
2. $\mathbf J_M=\nabla\times\mathbf M$，$\mathbf K_M=\mathbf M\times\hat{\mathbf n}$。
3. 同轴线电感模板一定按 $H \to W_m' \to L'$ 走。
4. 磁能求电感：$L=2W/I^2$，别漏 2。
5. 螺线管自感：$L=\mu N^2S/l$。
6. 磁边界条件：$B_n$ 连续，$H_t$ 因面电流跳变。

## 自测题与答案

### 题 1

同轴线 $a<\rho<b$ 中 $\mathbf H=I/(2\pi\rho)\hat{\boldsymbol\phi}$，求 $\mathbf B$。

**答案：**

线性介质中 $\mathbf B=\mu\mathbf H$，所以

$$
\boxed{\mathbf B={\mu I\over2\pi\rho}\hat{\boldsymbol\phi}}
$$

### 题 2

同轴线单位长度磁能为 $W_m'=\mu I^2\ln(b/a)/(4\pi)$，求单位长度电感。

**答案：**

$$
L'={2W_m'\over I^2}={2\over I^2}{\mu I^2\over4\pi}\ln{b\over a}
$$

$$
\boxed{L'={\mu\over2\pi}\ln{b\over a}}
$$

### 题 3

为什么 $\nabla\cdot\mathbf B=0$ 可以理解为“没有磁荷”？

**答案：**

散度描述场线的源或汇。$\nabla\cdot\mathbf B=0$ 表示磁感应线没有起点和终点，任意闭合面的总磁通为零。因此不存在孤立的北极或南极磁荷，磁力线总是闭合。

### 题 4

某介质 $\mathbf M=M_0\rho\hat{\boldsymbol\phi}$，柱坐标下求 $J_{Mz}$。

**答案：**

柱坐标旋度的 $z$ 分量：

$$
(\nabla\times\mathbf M)_z={1\over\rho}{\partial(\rho M_\phi)\over\partial\rho}-{1\over\rho}{\partial M_\rho\over\partial\phi}
$$

这里 $M_\phi=M_0\rho$，$M_\rho=0$，所以

$$
J_{Mz}={1\over\rho}{\partial(M_0\rho^2)\over\partial\rho}=2M_0
$$

$$
\boxed{\mathbf J_M=2M_0\hat{\mathbf z}}
$$

## 学习路线

1. 先背 $\mathbf B=\mu_0(\mathbf H+\mathbf M)$ 和磁化电流定义。
2. 再练同轴线模板，必须能从头推到 $L'$。
3. 然后练螺线管自感和互感。
4. 最后补磁边界条件概念题。

## 和后续章节的关系

第7章会把静磁场的 $\nabla\times\mathbf H=\mathbf J$ 改成

$$
\nabla\times\mathbf H=\mathbf J+{\partial\mathbf D\over\partial t}
$$

也就是加入位移电流。第8章平面波中的磁场 $\mathbf H$ 仍然和这里同一个物理量，只是变成随时间和空间传播的波。

## 一页考前速记

$$
\mathbf B=\mu_0(\mathbf H+\mathbf M),
\qquad \mathbf B=\mu\mathbf H\quad\text{线性介质}
$$

$$
\mathbf J_M=\nabla\times\mathbf M,
\qquad \mathbf K_M=\mathbf M\times\hat{\mathbf n}
$$

$$
\oint_C\mathbf H\cdot d\mathbf l=I_{\rm enc},
\qquad \nabla\cdot\mathbf B=0
$$

同轴线：

$$
H_\phi={I\over2\pi\rho},
\quad W_m'={\mu I^2\over4\pi}\ln{b\over a},
\quad L'={\mu\over2\pi}\ln{b\over a}
$$

螺线管：

$$
H={NI\over l},
\quad B=\mu{NI\over l},
\quad L={\mu N^2S\over l}
$$

边界：$B_n$ 连续；$H_t$ 无自由面电流时连续，有自由面电流时跳变。