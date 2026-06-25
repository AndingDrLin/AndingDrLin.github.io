---
title: "第8章 平面电磁波：Q3 传播与 Q4 反射透射"
description: "面向 Q3/Q4 的平面电磁波应试模板：无耗/有耗传播、良导体、Poynting 矢量、极化、法向入射反射透射。"
date: 2026-06-25
tags: [electromagnetics-and-fields, 电磁场与波, 平面电磁波]
category: "课程学习"
docGroup: "emf-notes"
order: 10
draft: false
---

## 本章对应哪些考试题

本章是 **Q3 和 Q4 的主战场**。

- **Q3：CH7–CH8 平面波传播。** 常见问法是：给定 $\mathbf E$ 或 $\mathbf H$ 的相量，求另一个场、传播方向、波长、频率、平均 Poynting 矢量；或者给有耗媒质参数，求 $\alpha,\beta,\delta,\eta_c$。
- **Q4：CH8 反射与透射。** 常见问法是：空气到无耗介质法向入射，求 $\Gamma,\tau,SWR$，写总电场和总磁场；或者理想导体边界形成驻波。

往年题型证据很强：2022 Q6/Q7/Q10、2023 Q5/Q7、2024 Q6/Q7、2025 Q6/Q7、mock 2026 Q3/Q4 都在这章范围内。

## 先用人话理解本章在讲什么

第7章告诉我们 Maxwell 方程能推出波动方程。本章的问题是：这些波在介质里到底长什么样？

最核心的直觉只有三条：

1. **均匀平面波里 $\mathbf E$、$\mathbf H$、传播方向互相垂直。** 它们组成右手系，能量沿 $\mathbf E\times\mathbf H$ 方向传播。
2. **无耗介质只改变相位，不衰减；有耗介质一边传播一边衰减。** 衰减由 $e^{-\alpha z}$ 描述。
3. **波遇到边界时，反射和透射由波阻抗决定。** 阻抗差越大，反射越强。

考试最容易丢分的不是公式本身，而是方向符号：特别是反射波的 $\mathbf H_r$。不要凭直觉写，统一用

$$
\boxed{\mathbf H={1\over\eta}\hat{\mathbf k}\times\mathbf E}
$$

判断。

## 必背符号和单位

| 符号 | 含义 | 单位/说明 |
|---|---|---|
| $\hat{\mathbf k}$ | 传播方向单位矢量 | 指向能量传播方向 |
| $\beta$ | 相位常数 | rad/m |
| $\alpha$ | 衰减常数 | Np/m |
| $\gamma$ | 传播常数 | $\gamma=\alpha+j\beta$ |
| $\lambda$ | 波长 | $\lambda=2\pi/\beta$ |
| $v_p$ | 相速度 | $v_p=\omega/\beta$ |
| $\eta$ | 无耗媒质波阻抗 | $\eta=\sqrt{\mu/\varepsilon}$ |
| $\eta_c$ | 有耗媒质复波阻抗 | 复数 |
| $\delta$ | 趋肤深度 | $\delta=1/\alpha$ |
| $\mathbf S$ | Poynting 矢量 | W/m$^2$ |
| $\Gamma$ | 电场反射系数 | $E_r/E_i$ |
| $\tau$ | 电场透射系数 | $E_t/E_i$ |
| $SWR$ | 驻波比 | $(1+|\Gamma|)/(1-|\Gamma|)$ |

本章默认使用 $e^{j\omega t}$ 相量约定。沿 $+z$ 传播的波写作 $e^{-j\beta z}$，沿 $-z$ 传播的波写作 $e^{+j\beta z}$。

## 核心概念

### 均匀平面波

**直觉解释：** 同一时刻相位相同的点构成平面，而且在这个平面上场强大小不变。

沿 $+z$ 传播的电场相量可写为

$$
\boxed{\mathbf E(z)=\mathbf E_0 e^{-j\beta z}}
$$

瞬时场为

$$
\mathbf E(z,t)=\operatorname{Re}\left[\mathbf E_0 e^{-j\beta z}e^{j\omega t}\right]
$$

相位为 $\omega t-\beta z$。固定相位不变时，$z$ 随 $t$ 增大，所以波沿 $+z$ 传播。

### $\mathbf E$、$\mathbf H$、$\hat{\mathbf k}$ 的关系

无耗介质中：

$$
\boxed{\mathbf H={1\over\eta}\hat{\mathbf k}\times\mathbf E}
$$

等价地：

$$
\boxed{\mathbf E=\eta\mathbf H\times\hat{\mathbf k}}
$$

这两条比死背方向更可靠。检查结果时用：

$$
\mathbf E\times\mathbf H \parallel \hat{\mathbf k}
$$

### 波阻抗

无耗媒质中：

$$
\boxed{\eta=\sqrt{\mu\over\varepsilon}}
$$

空气/真空中：

$$
\boxed{\eta_0=\sqrt{\mu_0\over\varepsilon_0}=120\pi\ \Omega\approx377\ \Omega}
$$

如果 $\mu_r=1$，$\varepsilon_r=4$：

$$
\eta={\eta_0\over\sqrt{4}}={\eta_0\over2}
$$

### Poynting 矢量

瞬时功率流密度：

$$
\boxed{\mathbf S(t)=\mathbf E(t)\times\mathbf H(t)}
$$

相量峰值表示下的平均功率流密度：

$$
\boxed{\langle\mathbf S\rangle={1\over2}\operatorname{Re}(\mathbf E\times\mathbf H^*)}
$$

无耗媒质中若电场峰值幅度为 $E_0$：

$$
\boxed{\langle S\rangle={E_0^2\over2\eta}={\eta H_0^2\over2}}
$$

这里默认 $E_0,H_0$ 是峰值相量幅度。如果题目给的是 RMS 值，平均功率公式中不要再乘 $1/2$。

### 极化

极化描述电场矢量端点随时间怎么运动。

假设波沿 $+z$ 传播，电场有两个正交分量：

$$
\mathbf E=\hat{\mathbf x}E_x+\hat{\mathbf y}E_y
$$

判断规则：

| 条件 | 极化 |
|---|---|
| 两分量同相或反相 | 线极化 |
| 两分量等幅，相位差 $\pm90^\circ$ | 圆极化 |
| 两分量不等幅且相位差 $\pm90^\circ$ | 椭圆极化 |
| 一般相位差 | 椭圆极化 |

往年极化题很多，通常不要求很深的旋向判断；先把类型判断稳住。

若题目进一步问 RHCP/LHCP 或旋向，按这个低优先级模板处理：

1. 先声明观察方向，例如“沿传播方向看”。
2. 取固定空间点，让 $t$ 增大，看电场端点从哪个轴转向哪个轴。
3. 按课程约定判断右旋/左旋；如果课件约定不明，答案里写清“沿传播方向观察时顺/逆时针”。

不同教材对 RHCP/LHCP 的观察方向约定可能不同，考试时优先跟老师课件。

## 核心公式与推导

### 无耗媒质传播参数

$$
\boxed{\eta=\sqrt{\mu\over\varepsilon}}
$$

$$
\boxed{\beta=\omega\sqrt{\mu\varepsilon}}
$$

$$
\boxed{v_p={\omega\over\beta}={1\over\sqrt{\mu\varepsilon}}}
$$

$$
\boxed{\lambda={2\pi\over\beta}}
$$

$$
\boxed{f={\omega\over2\pi}={v_p\over\lambda}}
$$

空气中常用：

$$
\beta_0={\omega\over c},
\qquad
\lambda_0={2\pi\over\beta_0},
\qquad
f={c\over\lambda_0}
$$

### 有耗媒质传播参数

有耗媒质中：

考场决策流程：

1. 先算或比较 $\sigma$ 和 $\omega\varepsilon$。
2. 若 $\sigma=0$：无耗介质，$\alpha=0$，$\beta=\omega\sqrt{\mu\varepsilon}$。
3. 若 $\sigma\ll\omega\varepsilon$：低损耗介质，优先用完整 $\gamma$ 和 $\eta_c$，除非题目给近似公式。
4. 若 $\sigma\gg\omega\varepsilon$：良导体，直接用 $\alpha\approx\beta\approx\sqrt{\omega\mu\sigma/2}$。
5. 不要把良导体公式套到普通介质。

完整传播常数为：

$$
\boxed{\gamma=\alpha+j\beta=\sqrt{j\omega\mu(\sigma+j\omega\varepsilon)}}
$$

复波阻抗：

$$
\boxed{\eta_c=\sqrt{{j\omega\mu\over\sigma+j\omega\varepsilon}}}
$$

沿 $+z$ 传播时，场可写成

$$
\boxed{\mathbf E(z)=\mathbf E_0e^{-\gamma z}=\mathbf E_0e^{-\alpha z}e^{-j\beta z}}
$$

其中：

- $e^{-\alpha z}$ 控制幅度衰减；
- $e^{-j\beta z}$ 控制相位变化。

### 良导体近似

判断条件：

$$
\boxed{\sigma\gg\omega\varepsilon}
$$

近似公式：

$$
\boxed{\alpha\approx\beta\approx\sqrt{\pi f\mu\sigma}=\sqrt{\omega\mu\sigma\over2}}
$$

$$
\boxed{\delta={1\over\alpha}=\sqrt{2\over\omega\mu\sigma}}
$$

$$
\boxed{\eta_c\approx(1+j)\sqrt{\omega\mu\over2\sigma}}
$$

直觉：良导体中波很快衰减，只能进入表面附近一个趋肤深度量级。

### 法向入射反射透射

设界面为 $z=0$，介质 1 在 $z<0$，介质 2 在 $z>0$，入射波沿 $+z$ 方向传播。

指数符号先固定：

| 波 | 传播方向 | 指数因子 |
|---|---|---|
| 入射波 | $+z$ | $e^{-j\beta_1z}$ |
| 反射波 | $-z$ | $e^{+j\beta_1z}$ |
| 透射波 | $+z$ | $e^{-j\beta_2z}$ |

$\mathbf H_r$ 的符号不要照抄 $\mathbf E_r$，必须由 $(-\hat{\mathbf z})\times\mathbf E_r$ 决定。

电场反射系数：

$$
\boxed{\Gamma={E_r\over E_i}={\eta_2-\eta_1\over\eta_2+\eta_1}}
$$

电场透射系数：

$$
\boxed{\tau={E_t\over E_i}=1+\Gamma={2\eta_2\over\eta_1+\eta_2}}
$$

注意：这里的 $\tau$ 是电场幅度透射系数，不是功率透射率。无耗介质法向入射时，平均功率反射率为

$$
\boxed{R=|\Gamma|^2}
$$

功率透射率为

$$
\boxed{T={\eta_1\over\eta_2}|\tau|^2}
$$

并满足 $R+T=1$。例如空气到 $\varepsilon_r=4$ 时，$\Gamma=-1/3$、$\tau=2/3$，功率反射率是 $1/9$，功率透射率是 $8/9$，不是 $4/9$。

驻波比：

$$
\boxed{SWR={1+|\Gamma|\over1-|\Gamma|}}
$$

若 $\eta_1=\eta_2$，则 $\Gamma=0$，无反射。

### 反射波磁场符号

假设入射电场沿 $\hat{\mathbf x}$：

$$
\mathbf E_i=\hat{\mathbf x}E_0e^{-j\beta_1z}
$$

入射波传播方向 $\hat{\mathbf k}_i=\hat{\mathbf z}$，所以

$$
\mathbf H_i={1\over\eta_1}\hat{\mathbf z}\times\hat{\mathbf x}E_0e^{-j\beta_1z}
=\hat{\mathbf y}{E_0\over\eta_1}e^{-j\beta_1z}
$$

反射波传播方向 $\hat{\mathbf k}_r=-\hat{\mathbf z}$，电场

$$
\mathbf E_r=\hat{\mathbf x}\Gamma E_0e^{+j\beta_1z}
$$

因此

$$
\mathbf H_r={1\over\eta_1}(-\hat{\mathbf z})\times\hat{\mathbf x}\Gamma E_0e^{+j\beta_1z}
=-\hat{\mathbf y}{\Gamma E_0\over\eta_1}e^{+j\beta_1z}
$$

所以入射区总场为

$$
\boxed{\mathbf E_1=\hat{\mathbf x}E_0\left(e^{-j\beta_1z}+\Gamma e^{+j\beta_1z}\right)}
$$

$$
\boxed{\mathbf H_1=\hat{\mathbf y}{E_0\over\eta_1}\left(e^{-j\beta_1z}-\Gamma e^{+j\beta_1z}\right)}
$$

透射区：

$$
\boxed{\mathbf E_2=\hat{\mathbf x}\tau E_0e^{-j\beta_2z}}
$$

$$
\boxed{\mathbf H_2=\hat{\mathbf y}{\tau E_0\over\eta_2}e^{-j\beta_2z}}
$$

### PEC 反射

理想导体表面切向电场为零。法向入射到 PEC 时：

$$
\boxed{\Gamma_E=-1}
$$

所以导体表面处入射电场和反射电场相消。磁场反射等效为同相叠加，形成驻波。

## 固定做题模板

### 模板 1：给 $\mathbf H$ 求 $\mathbf E$（mock 2026 Q3 类型）

题目特征：给空气中平面波

$$
\mathbf H=A\hat{\mathbf x}e^{-jky}
$$

求 $\mathbf E$、波长、频率、平均 Poynting 矢量。

步骤：

1. 由 $e^{-jky}$ 判断传播方向：$+y$。
2. 传播方向 $\hat{\mathbf k}=\hat{\mathbf y}$。
3. 用

$$
\mathbf E=\eta_0\mathbf H\times\hat{\mathbf k}
$$

4. 因 $\hat{\mathbf x}\times\hat{\mathbf y}=\hat{\mathbf z}$，所以

$$
\boxed{\mathbf E=\eta_0A\hat{\mathbf z}e^{-jky}}
$$

5. 波长和频率：

$$
\boxed{\lambda={2\pi\over k}},
\qquad
\boxed{f={ck\over2\pi}}
$$

如果题目写成 $e^{+jky}$，则传播方向改为 $-y$，此时 $\hat{\mathbf k}=-\hat{\mathbf y}$，叉乘方向必须重新算，不能照搬本例。

6. 平均 Poynting 矢量：

$$
\boxed{\langle\mathbf S\rangle={1\over2}\eta_0|A|^2\hat{\mathbf y}}
$$

如果题目还问 $A$ 的数值，必须使用题干给出的场强幅值或功率条件；mock 原始提取稿缺少图片信息，不能凭空确定 $A$。

### 模板 2：无耗媒质中由 $\mathbf E$ 求 $\mathbf H$

题目特征：给

$$
\mathbf E=\hat{\mathbf x}E_0e^{-j\beta z}
$$

媒质参数 $\varepsilon,\mu$ 已知。

步骤：

1. $e^{-j\beta z}$ 表示沿 $+z$ 传播。
2. $\eta=\sqrt{\mu/\varepsilon}$。
3. 用 $\mathbf H=(1/\eta)\hat{\mathbf z}\times\mathbf E$。
4. $\hat{\mathbf z}\times\hat{\mathbf x}=\hat{\mathbf y}$。

答案：

$$
\boxed{\mathbf H=\hat{\mathbf y}{E_0\over\eta}e^{-j\beta z}}
$$

### 模板 3：良导体传播题

题目特征：给 $f,\mu,\varepsilon,\sigma$，且 $\sigma\gg\omega\varepsilon$。

步骤：

1. 算 $\omega=2\pi f$。
2. 检查 $\sigma\gg\omega\varepsilon$。
3. 用良导体近似：

$$
\alpha\approx\beta\approx\sqrt{\omega\mu\sigma/2}
$$

4. 趋肤深度：

$$
\delta=1/\alpha
$$

5. 复波阻抗：

$$
\eta_c\approx(1+j)\sqrt{\omega\mu/(2\sigma)}
$$

6. 场随距离衰减：

$$
|E(z)|=|E_0|e^{-\alpha z}
$$

### 模板 4：极化判断

题目特征：给两个正交分量，如

$$
\mathbf E=\hat{\mathbf x}E_x+\hat{\mathbf y}E_ye^{j\phi}
$$

步骤：

1. 看两个分量是否同方向传播、是否正交。
2. 比较幅值 $|E_x|$ 和 $|E_y|$。
3. 看相位差 $\phi$。
4. 套表判断：同相/反相线极化；等幅 $90^\circ$ 圆极化；不等幅或一般相位差椭圆极化。

### 模板 5：法向入射完整场表达

题目特征：空气或介质 1 入射到介质 2，界面 $z=0$，求反射/透射场。

步骤：

1. 求 $\eta_1,\eta_2$。
2. 求 $\beta_1,\beta_2$。
3. 算

$$
\Gamma={\eta_2-\eta_1\over\eta_2+\eta_1},
\qquad
\tau={2\eta_2\over\eta_1+\eta_2}
$$

4. 写 $\mathbf E_i,\mathbf E_r,\mathbf E_t$。
5. 用 $\mathbf H=(1/\eta)\hat{\mathbf k}\times\mathbf E$ 写 $\mathbf H_i,\mathbf H_r,\mathbf H_t$。
6. 入射区总场 = 入射 + 反射；透射区只有透射。
7. 若问驻波比，用 $SWR=(1+|\Gamma|)/(1-|\Gamma|)$。

## 往年考试例题

### 例题 1：空气中给 $\mathbf H$ 求 $\mathbf E$（mock 2026 Q3 类型）

空气中均匀平面波磁场相量为

$$
\mathbf H=A\hat{\mathbf x}e^{-jky}
$$

求电场、波长、频率和平均 Poynting 矢量。

**解：**

指数项 $e^{-jky}$ 表示沿 $+y$ 传播，所以

$$
\hat{\mathbf k}=\hat{\mathbf y}
$$

空气中波阻抗 $\eta_0=120\pi\ \Omega$。由

$$
\mathbf E=\eta_0\mathbf H\times\hat{\mathbf k}
$$

得

$$
\mathbf E=\eta_0A(\hat{\mathbf x}\times\hat{\mathbf y})e^{-jky}
$$

$$
\boxed{\mathbf E=\eta_0A\hat{\mathbf z}e^{-jky}}
$$

波长：

$$
\boxed{\lambda={2\pi\over k}}
$$

空气中 $k=\omega/c=2\pi f/c$，所以

$$
\boxed{f={ck\over2\pi}}
$$

平均 Poynting 矢量：

$$
\langle\mathbf S\rangle={1\over2}\operatorname{Re}(\mathbf E\times\mathbf H^*)
$$

$$
\mathbf E\times\mathbf H^*=\eta_0|A|^2(\hat{\mathbf z}\times\hat{\mathbf x})=\eta_0|A|^2\hat{\mathbf y}
$$

所以

$$
\boxed{\langle\mathbf S\rangle={1\over2}\eta_0|A|^2\hat{\mathbf y}}
$$

### 例题 2：良导体趋肤深度（2023 Q5 / 2025 Q6 类型）

某良导体参数为 $\mu,\sigma$，频率为 $f$。求衰减常数、相位常数、趋肤深度和复波阻抗。

**解：**

良导体条件：$\sigma\gg\omega\varepsilon$。取 $\omega=2\pi f$。

衰减常数和相位常数：

$$
\boxed{\alpha\approx\beta\approx\sqrt{\pi f\mu\sigma}}
$$

趋肤深度：

$$
\boxed{\delta={1\over\alpha}=\sqrt{2\over\omega\mu\sigma}}
$$

复波阻抗：

$$
\boxed{\eta_c\approx(1+j)\sqrt{\omega\mu\over2\sigma}}
$$

若问传播 $z$ 后幅度变为多少：

$$
\boxed{|E(z)|=|E_0|e^{-\alpha z}}
$$

### 例题 3：空气到 $\varepsilon_r=4$ 介质法向入射（mock 2026 Q4 / 2023 Q7 类型）

空气中入射电场为

$$
\mathbf E_i=\hat{\mathbf x}E_0e^{-j\beta_0z}
$$

波从 $z<0$ 的空气入射到 $z>0$ 的无耗介质，介质参数 $\mu_r=1,\varepsilon_r=4$。求反射/透射系数、两侧总场和驻波比。

**解：**

空气：

$$
\eta_1=\eta_0,
\qquad \beta_1=\beta_0
$$

介质 2：

$$
\eta_2={\eta_0\over\sqrt{\varepsilon_r}}={\eta_0\over2}
$$

$$
\beta_2=\beta_0\sqrt{\varepsilon_r}=2\beta_0
$$

反射系数：

$$
\Gamma={\eta_2-\eta_1\over\eta_2+\eta_1}={{\eta_0/2}-\eta_0\over{\eta_0/2}+\eta_0}=-{1\over3}
$$

透射系数：

$$
\tau=1+\Gamma={2\over3}
$$

入射区总电场：

$$
\boxed{\mathbf E_1=\hat{\mathbf x}E_0\left(e^{-j\beta_0z}-{1\over3}e^{+j\beta_0z}\right)}
$$

入射区总磁场：

$$
\mathbf H_1=\hat{\mathbf y}{E_0\over\eta_0}\left(e^{-j\beta_0z}-\Gamma e^{+j\beta_0z}\right)
$$

代入 $\Gamma=-1/3$：

$$
\boxed{\mathbf H_1=\hat{\mathbf y}{E_0\over\eta_0}\left(e^{-j\beta_0z}+{1\over3}e^{+j\beta_0z}\right)}
$$

透射区总电场：

$$
\boxed{\mathbf E_2=\hat{\mathbf x}{2E_0\over3}e^{-j2\beta_0z}}
$$

透射区总磁场：

$$
\mathbf H_2=\hat{\mathbf y}{\tau E_0\over\eta_2}e^{-j\beta_2z}
=\hat{\mathbf y}{(2/3)E_0\over\eta_0/2}e^{-j2\beta_0z}
$$

$$
\boxed{\mathbf H_2=\hat{\mathbf y}{4E_0\over3\eta_0}e^{-j2\beta_0z}}
$$

驻波比：

$$
\boxed{SWR={1+|\Gamma|\over1-|\Gamma|}={1+1/3\over1-1/3}=2}
$$

**易错提醒：** 反射波电场系数是 $-1/3$，但反射波磁场在总场表达里出现的是 $-\Gamma$，所以变成 $+1/3$。

### 例题 4：PEC 反射（2022 Q10 / 2024 Q7 类型）

一均匀平面波法向入射到理想导体平面 $z=0$，入射区为 $z<0$。若

$$
\mathbf E_i=\hat{\mathbf x}E_0e^{-j\beta z}
$$

求反射电场。

**解：**

PEC 表面切向总电场为零：

$$
\mathbf E_t(z=0)=\mathbf E_i(0)+\mathbf E_r(0)=0
$$

因此电场反射系数

$$
\Gamma_E=-1
$$

反射波沿 $-z$ 传播，所以

$$
\boxed{\mathbf E_r=-\hat{\mathbf x}E_0e^{+j\beta z}}
$$

总电场：

$$
\mathbf E=\hat{\mathbf x}E_0(e^{-j\beta z}-e^{+j\beta z})
=-2j\hat{\mathbf x}E_0\sin(\beta z)
$$

这表示入射区形成驻波，导体表面 $z=0$ 处电场节点。

## 重点难点总结

1. $e^{-j\beta z}$ 在 $e^{j\omega t}$ 约定下表示沿 $+z$ 传播。
2. $\mathbf E,\mathbf H,\hat{\mathbf k}$ 组成右手系；方向不确定时用叉乘。
3. 平均 Poynting 矢量用 $\frac12\operatorname{Re}(\mathbf E\times\mathbf H^*)$，别漏 $1/2$。
4. 良导体中 $\alpha\approx\beta$，但它不是无耗波，会按 $e^{-\alpha z}$ 衰减。
5. 法向入射先算波阻抗，再算 $\Gamma,\tau$。
6. 反射波磁场符号最容易错：$\mathbf H_r=(1/\eta)(-\hat{\mathbf z})\times\mathbf E_r$。
7. 空气到 $\varepsilon_r=4$、$\mu_r=1$ 的介质：$\eta_2=\eta_0/2$，$\Gamma=-1/3$，$\tau=2/3$，$SWR=2$。

## 自测题与答案

### 题 1

空气中平面波

$$
\mathbf E=30\pi\hat{\mathbf x}e^{-j\beta z}\ \text{V/m}
$$

求 $\mathbf H$。

**答案：**

沿 $+z$ 传播，$\eta_0=120\pi\ \Omega$。

$$
\mathbf H={1\over\eta_0}\hat{\mathbf z}\times\mathbf E
$$

$$
\hat{\mathbf z}\times\hat{\mathbf x}=\hat{\mathbf y}
$$

所以

$$
\boxed{\mathbf H={30\pi\over120\pi}\hat{\mathbf y}e^{-j\beta z}=0.25\hat{\mathbf y}e^{-j\beta z}\ \text{A/m}}
$$

### 题 2

若某波相量中含 $e^{+j\beta z}$，在 $e^{j\omega t}$ 约定下传播方向是什么？

**答案：**

瞬时相位为 $\omega t+\beta z$。令相位常数不变，$z$ 随 $t$ 增大而减小，所以波沿 $-z$ 传播。

### 题 3

良导体中 $\alpha=20$ Np/m，求趋肤深度。传播 $z=0.1$ m 后幅度变为原来的多少？

**答案：**

$$
\delta={1\over\alpha}={1\over20}=0.05\ \text{m}
$$

幅度衰减因子：

$$
e^{-\alpha z}=e^{-20\times0.1}=e^{-2}\approx0.135
$$

即约为原来的 13.5%。

### 题 4

介质 1 的波阻抗 $\eta_1=300\ \Omega$，介质 2 的波阻抗 $\eta_2=100\ \Omega$，法向入射。求 $\Gamma$ 和 $SWR$。

**答案：**

$$
\Gamma={\eta_2-\eta_1\over\eta_2+\eta_1}={100-300\over100+300}=-{1\over2}
$$

$$
SWR={1+|\Gamma|\over1-|\Gamma|}={1+1/2\over1-1/2}=3
$$

### 题 5

电场两个正交分量等幅，相位差 $90^\circ$。极化类型是什么？

**答案：**

等幅、正交、相位差 $\pm90^\circ$，所以是圆极化。若题目进一步要求左旋/右旋，需要结合传播方向和相位超前关系判断。

## 学习路线

1. 先练传播方向判断：$e^{-j\beta z}$、$e^{+j\beta z}$、$e^{-jky}$。
2. 再练 $\mathbf E$ 和 $\mathbf H$ 互求，统一用叉乘。
3. 然后背无耗媒质参数：$\eta,\beta,\lambda,v_p$。
4. 再背良导体三公式：$\alpha\approx\beta$、$\delta$、$\eta_c$。
5. 最后练法向入射完整场表达。

## 和前后章节的关系

本章所有传播公式来自第7章的 Maxwell 方程相量形式。反射透射部分则回到边界条件：切向 $\mathbf E$ 和切向 $\mathbf H$ 在无表面源界面连续。没有新的物理定律，只是把边界条件应用到波上。

## 一页考前速记

无耗媒质：

$$
\eta=\sqrt{\mu/\varepsilon},
\quad \beta=\omega\sqrt{\mu\varepsilon},
\quad \lambda={2\pi\over\beta},
\quad v_p={1\over\sqrt{\mu\varepsilon}}
$$

场方向：

$$
\mathbf H={1\over\eta}\hat{\mathbf k}\times\mathbf E,
\qquad \mathbf E=\eta\mathbf H\times\hat{\mathbf k}
$$

平均功率：

$$
\langle\mathbf S\rangle={1\over2}\operatorname{Re}(\mathbf E\times\mathbf H^*)
$$

良导体：

$$
\alpha\approx\beta\approx\sqrt{\pi f\mu\sigma},
\quad \delta={1\over\alpha},
\quad \eta_c\approx(1+j)\sqrt{\omega\mu\over2\sigma}
$$

法向入射：

$$
\Gamma={\eta_2-\eta_1\over\eta_2+\eta_1},
\qquad
\tau={2\eta_2\over\eta_1+\eta_2},
\qquad
SWR={1+|\Gamma|\over1-|\Gamma|}
$$

空气到 $\varepsilon_r=4$：

$$
\eta_2={\eta_0\over2},
\quad \Gamma=-{1\over3},
\quad \tau={2\over3},
\quad SWR=2
$$

反射波磁场符号不背，用叉乘算。