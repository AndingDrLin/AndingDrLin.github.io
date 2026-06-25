---
title: "第1章 一天应试地图与公式总表"
description: "把电磁场与波期末 Q1-Q4 拆成可执行的复习路线、公式表和固定模板。"
date: 2026-06-25
tags: [electromagnetics-and-fields, 电磁场与波, 期末复习]
category: "课程学习"
docGroup: "emf-notes"
order: 1
draft: false
---

## 本章对应哪些考试题

本章不讲新理论，只解决一个问题：**一天内怎么把电磁场与波复习到能做题。**

老师给出的范围可以直接翻译成四套模板：

| 题号 | 你要能做什么 | 最该先看的章节 |
|---|---|---|
| Q1 | 全书概念 + 小计算，分离变量法不考；若老师按“全书”严格出题，传输线/波导/Smith chart 也可能作为概念题出现 | 第2–8章概念速记；传输线/波导需另补一页速记 |
| Q2 | 静磁场大题：$\mathbf B,\mathbf H,\mathbf M,\mathbf J_M$，自感、互感、磁能 | 第6章 |
| Q3 | CH7–CH8：无耗/有耗媒质中平面波传播 | 第7章，第8章前半 |
| Q4 | CH8：电磁波法向入射、反射、透射 | 第8章后半 |

往年题给出的信号很明显：2022–2025 都反复出现高斯定律、边界条件、良导体、极化、法向入射；2026 mock 则几乎就是这次 Q1–Q4 的缩略版。所以本笔记按“会考什么、怎么套模板”组织，而不是按课件从头到尾铺开。

## 先用人话理解整门课

电磁场与波其实只有四条主线：

1. **电荷产生电场**：用 $\nabla\cdot\mathbf D=\rho_v$、高斯定律、电势处理。
2. **电流产生磁场**：用 $\nabla\times\mathbf H=\mathbf J$、安培环路定律处理。
3. **变化的电场和磁场互相产生**：这就是 Maxwell 方程，推出电磁波。
4. **电磁波遇到介质边界会反射/透射**：用波阻抗和边界条件处理。

考场上真正要做的是识别题型：

- 看到“对称电荷分布” → 高斯定律。
- 看到“界面两侧场量” → 边界条件。
- 看到“同轴线、螺线管、电感” → 安培环路 + 磁能/磁链。
- 看到“给定 $\mathbf E$ 或 $\mathbf H$ 的波” → 先判断传播方向，再用右手关系。
- 看到“空气入射到介质” → 先算 $\eta$，再算 $\Gamma,\tau$。

## 一日复习顺序

### 0. 先背本章公式表

时间：30–45 分钟。不要一开始就推导。先知道四道题的公式入口。

### 1. Q1 小题工具箱

时间：2–3 小时。看第2–5章，重点是：

- 散度、旋度、拉普拉斯。
- 高斯定律。
- 静电边界条件。
- 镜像法。
- 恒定电流和电阻。
- 极化判断、电磁势和规范。

### 2. Q2 静磁场大题

时间：2 小时。看第6章，把同轴线和螺线管模板写熟。

### 3. Q3 平面波传播

时间：2 小时。看第7章和第8章前半，把无耗媒质、有耗媒质、良导体公式写熟。

### 4. Q4 反射透射

时间：1.5–2 小时。看第8章后半，重点练反射波磁场方向。

## 四道题的考场流程

### Q1：概念和小计算

1. 先判断题型：矢量算子 / 静电高斯 / 边界条件 / 镜像法 / 恒定电流 / 极化或位函数。
2. 找对应公式，不要从 Maxwell 方程重新推。
3. 最后检查单位、方向、法向定义。

### Q2：静磁场大计算

1. 先求 $\mathbf H$ 或 $\mathbf B$。
2. 再求磁通、磁链或磁能。
3. 最后由 $L=\Psi/I$、$M=\Psi_{21}/I_1$ 或 $L=2W_m/I^2$ 求自感/互感。

### Q3：平面波传播

1. 先看指数项判断传播方向。
2. 算 $\eta$、$\beta$、$\lambda$；若有损耗，先比较 $\sigma$ 和 $\omega\varepsilon$。
3. 用叉乘求另一个场，再算平均 Poynting 矢量。

### Q4：反射透射

1. 先算两侧波阻抗 $\eta_1,\eta_2$。
2. 算 $\Gamma$、$\tau$、$SWR$。
3. 写入射、反射、透射总场，特别检查 $\mathbf H_r$ 的符号。

## 总符号表

| 符号 | 含义 | 单位 | 最常出现在哪里 |
|---|---|---|---|
| $\mathbf E$ | 电场强度 | V/m | Q1、Q3、Q4 |
| $\mathbf D$ | 电通量密度，$\mathbf D=\varepsilon\mathbf E$ | C/m$^2$ | Q1 |
| $V$ 或 $\varphi$ | 电势 | V | Q1 |
| $\rho_v,\rho_s,\rho_l$ | 体/面/线电荷密度 | C/m$^3$, C/m$^2$, C/m | Q1 |
| $\mathbf J$ | 自由电流密度 | A/m$^2$ | Q1、Q2 |
| $\mathbf B$ | 磁感应强度 | T | Q2 |
| $\mathbf H$ | 磁场强度 | A/m | Q2、Q3、Q4 |
| $\mathbf M$ | 磁化强度 | A/m | Q2 概念 |
| $\mathbf J_M$ | 体磁化电流密度 | A/m$^2$ | Q2 概念 |
| $L,M$ | 自感、互感 | H | Q2 |
| $\eta$ | 波阻抗 | Ω | Q3、Q4 |
| $\alpha,\beta,\gamma$ | 衰减常数、相位常数、传播常数 | Np/m, rad/m, 1/m | Q3 |
| $\lambda,f,\omega$ | 波长、频率、角频率 | m, Hz, rad/s | Q3、Q4 |
| $\Gamma,\tau$ | 电场反射/透射系数 | 1 | Q4 |

## Q1 必背公式表

### 1. 静电场四件套

$$
\boxed{\mathbf D=\varepsilon\mathbf E},\qquad
\boxed{\mathbf E=-\nabla V},\qquad
\boxed{\rho_v=\nabla\cdot\mathbf D},\qquad
\boxed{\nabla^2 V=-\rho_v/\varepsilon}
$$

考场用法：

- 给 $V$ 求 $\mathbf E$：先做负梯度。
- 给 $\mathbf E$ 求 $\mathbf D$：乘 $\varepsilon$。
- 给 $\mathbf D$ 求电荷密度：做散度。
- 让判断是否满足 Laplace 方程：算 $\nabla^2V$ 是否为 0。

### 2. 高斯定律

$$
\boxed{\oint_S \mathbf D\cdot d\mathbf S=Q_{\rm enc}},\qquad
\boxed{\nabla\cdot\mathbf D=\rho_v}
$$

三类对称场最常考：

| 对称 | 结果 |
|---|---|
| 无限线电荷 $\rho_l$ | $E_\rho=\rho_l/(2\pi\varepsilon\rho)$ |
| 均匀带电球，半径 $a$ | 内部 $E_r=\rho_v r/(3\varepsilon)$，外部 $E_r=\rho_v a^3/(3\varepsilon r^2)$ |
| 同轴线，内半径 $a$ 外半径 $b$ | $E_\rho=U/[\rho\ln(b/a)]$，$C'=2\pi\varepsilon/\ln(b/a)$ |

### 3. 静电边界条件

设单位法向 $\hat{\mathbf n}$ 从介质 1 指向介质 2：

$$
\boxed{\hat{\mathbf n}\times(\mathbf E_2-\mathbf E_1)=0},\qquad
\boxed{\hat{\mathbf n}\cdot(\mathbf D_2-\mathbf D_1)=\rho_{s,\rm free}}
$$

其中 $\rho_{s,\rm free}$ 指自由面电荷密度；介质极化产生的束缚电荷已经通过材料关系处理。

无自由面电荷时：

$$
\boxed{E_{1t}=E_{2t}},\qquad
\boxed{\varepsilon_1E_{1n}=\varepsilon_2E_{2n}}
$$

### 4. 镜像法最小模板

点电荷 $q$ 在接地无限导体平面上方距离 $h$：

- 镜像电荷：$q'=-q$，位置在平面另一侧距离 $h$。
- 真实区域电势 = 真电荷 + 镜像电荷的叠加。
- 点电荷受力大小：

$$
\boxed{F=\frac{q^2}{16\pi\varepsilon_0h^2}}
$$

方向指向导体平面。最常见错误是把距离写成 $h$，实际真电荷到镜像电荷距离是 $2h$。

### 5. 恒定电流

$$
\boxed{\mathbf J=\sigma\mathbf E},\qquad
\boxed{\nabla\cdot\mathbf J=0},\qquad
\boxed{p=\mathbf J\cdot\mathbf E=\sigma E^2}
$$

常用电阻：

$$
\boxed{R={l\over \sigma S}},\qquad
\boxed{R_{\rm coax}={\ln(b/a)\over 2\pi\sigma l}}
$$

径向多层同轴电阻按层串联：

$$
R=\sum_i {\ln(r_{i+1}/r_i)\over 2\pi\sigma_i l}
$$

## Q2 必背公式表：静磁场、电感、磁能

### 1. 基本关系

$$
\boxed{\mathbf B=\mu_0(\mathbf H+\mathbf M)},\qquad
\boxed{\mathbf B=\mu\mathbf H\quad \text{线性介质}}
$$

$$
\boxed{\nabla\times\mathbf H=\mathbf J},\qquad
\boxed{\nabla\cdot\mathbf B=0}
$$

磁化电流：

$$
\boxed{\mathbf J_M=\nabla\times\mathbf M},\qquad
\boxed{\mathbf K_M=\mathbf M\times\hat{\mathbf n}}
$$

### 2. 磁边界条件

设 $\hat{\mathbf n}$ 从介质 1 指向介质 2：

$$
\boxed{\hat{\mathbf n}\cdot(\mathbf B_2-\mathbf B_1)=0},\qquad
\boxed{\hat{\mathbf n}\times(\mathbf H_2-\mathbf H_1)=\mathbf K_s}
$$

无自由面电流时，$H_t$ 连续；永远有 $B_n$ 连续。

### 3. 同轴线磁场、电感

理想同轴线，内导体半径 $a$，外导体内半径 $b$，中间介质磁导率 $\mu$：

$$
\boxed{H_\phi={I\over 2\pi\rho}\quad (a<\rho<b)}
$$

单位长度磁能：

$$
\boxed{W_m'={\mu I^2\over 4\pi}\ln{b\over a}}
$$

单位长度电感：

$$
\boxed{L'={2W_m'\over I^2}={\mu\over 2\pi}\ln{b\over a}}
$$

### 4. 螺线管

长螺线管，长度 $l$，匝数 $N$，截面积 $S$：

$$
\boxed{H={NI\over l}},\qquad
\boxed{B=\mu{NI\over l}},\qquad
\boxed{L={\mu N^2S\over l}}
$$

## Q3 必背公式表：平面波传播

### 1. 无耗媒质

$$
\boxed{\eta=\sqrt{\mu/\varepsilon}},\qquad
\boxed{\beta=\omega\sqrt{\mu\varepsilon}},\qquad
\boxed{v_p={1\over\sqrt{\mu\varepsilon}}},\qquad
\boxed{\lambda={2\pi\over\beta}}
$$

场方向关系：

$$
\boxed{\mathbf H={1\over\eta}\hat{\mathbf k}\times\mathbf E},\qquad
\boxed{\mathbf E=\eta\mathbf H\times\hat{\mathbf k}}
$$

平均 Poynting 矢量：

$$
\boxed{\langle\mathbf S\rangle={1\over2}\operatorname{Re}(\mathbf E\times\mathbf H^*)}
$$

### 2. 有耗媒质与良导体

$$
\boxed{\gamma=\alpha+j\beta=\sqrt{j\omega\mu(\sigma+j\omega\varepsilon)}}
$$

$$
\boxed{\eta_c=\sqrt{{j\omega\mu\over\sigma+j\omega\varepsilon}}}
$$

良导体条件：$\sigma\gg\omega\varepsilon$。此时：

$$
\boxed{\alpha\approx\beta\approx\sqrt{\pi f\mu\sigma}=\sqrt{\omega\mu\sigma/2}},\qquad
\boxed{\delta={1\over\alpha}=\sqrt{2\over\omega\mu\sigma}}
$$

$$
\boxed{\eta_c\approx(1+j)\sqrt{\omega\mu\over2\sigma}}
$$

## Q4 必背公式表：法向入射反射透射

介质 1 入射到介质 2：

$$
\boxed{\Gamma={E_r\over E_i}={\eta_2-\eta_1\over\eta_2+\eta_1}},\qquad
\boxed{\tau={E_t\over E_i}=1+\Gamma={2\eta_2\over\eta_1+\eta_2}}
$$

驻波比：

$$
\boxed{SWR={1+|\Gamma|\over1-|\Gamma|}}
$$

若空气入射到 $\mu_r=1,\varepsilon_r=4$ 的无耗介质：

$$
\eta_2={\eta_0\over2},\qquad \Gamma=-{1\over3},\qquad \tau={2\over3},\qquad SWR=2
$$

反射波磁场方向不要背符号，用这一条算：

$$
\boxed{\mathbf H={1\over\eta}\hat{\mathbf k}\times\mathbf E}
$$

## 高频模板索引

| 模板 | 关键词 | 去哪里看 |
|---|---|---|
| 高斯定律求场 | 无限线电荷、球/柱对称、同轴电容 | 第3章 |
| 静电边界条件 | 两介质交界、已知一侧 $\mathbf E$ 求另一侧 | 第3章 |
| 算子小题 | 散度、旋度、拉普拉斯、Stokes | 第2章 |
| 镜像法 | 接地导体平面、点电荷受力 | 第4章 |
| 恒定电流电阻 | $\mathbf J=\sigma\mathbf E$、同轴电阻、多层介质 | 第5章 |
| 同轴线电感 | $H_\phi$、磁能、电感 | 第6章 |
| 螺线管互感 | 磁通、磁链、自感、互感 | 第6章 |
| 无耗平面波 | 给 $\mathbf E$ 求 $\mathbf H$，求 $f,\lambda$ | 第8章 |
| 良导体传播 | 皮肤深度、衰减常数、复波阻抗 | 第8章 |
| 法向入射 | $\Gamma,\tau,SWR$、反射透射场 | 第8章 |

## 往年题型证据

不用死记年份，但要知道这些模板确实反复出现：

- 高斯定律、静电边界条件：2022–2025 多年 Q1/Q2/Q3 都出现。
- 算子、Stokes、散度定理：2022 Q1、2023 Q1/Q2、2024 Q1/Q3、2025 Q2。
- 同轴线磁场/电感：2022 Q9、2025 Q4、mock 2026 Q2。
- 螺线管自感/互感：2023 Q3、2024 Q4。
- 良导体传播：2022 Q6、2023 Q5、2024 Q6、2025 Q6。
- 平面波 $\mathbf E/\mathbf H$ 互求：2022 Q10、2025 Q7、mock 2026 Q3。
- 极化判断：2022 Q5、2023 Q6、2024 Q7、2025 Q7、mock 2026 Q1。
- 法向入射反射透射：2022 Q7、2023 Q7、2024 Q7、mock 2026 Q4。

## 自测题与答案

### 题 1：空气到 $\varepsilon_r=4$ 介质，$\mu_r=1$，求 $\eta_2,\Gamma,\tau,SWR$。

答案：

$$
\eta_2=\sqrt{\mu_0/(4\varepsilon_0)}={\eta_0\over2}
$$

$$
\Gamma={\eta_2-\eta_0\over\eta_2+\eta_0}={{\eta_0/2}-\eta_0\over {\eta_0/2}+\eta_0}=-{1\over3}
$$

$$
\tau=1+\Gamma={2\over3},\qquad SWR={1+1/3\over1-1/3}=2
$$

### 题 2：同轴线中 $a<\rho<b$，为什么 $H_\phi=I/(2\pi\rho)$？

答案：选半径为 $\rho$ 的圆形安培回路。对称性说明 $\mathbf H$ 沿 $\phi$ 方向且大小恒定：

$$
\oint \mathbf H\cdot d\mathbf l=H_\phi(2\pi\rho)=I
$$

所以 $H_\phi=I/(2\pi\rho)$。方向由右手定则确定。

### 题 3：为什么平均 Poynting 矢量有 $1/2$？

答案：本笔记用相量峰值表示。若瞬时场是 $E_0\cos(\omega t-\beta z)$，平均平方值是峰值平方的一半，所以相量计算中平均功率密度为

$$
\langle\mathbf S\rangle={1\over2}\operatorname{Re}(\mathbf E\times\mathbf H^*)
$$

如果题目明确给的是 RMS 值，就不再乘 $1/2$。考试通常给相量峰值，默认用上式。

## 一页考前速记

- Q1：先判断是“算子 / 高斯 / 边界 / 镜像 / 电阻 / 极化”。不要把所有章节混在一起；若老师按“全书”严格覆盖，传输线、Smith chart、矩形波导至少要会基本定义和参数含义，本轮正文未展开这些低优先概念。
- Q2：同轴线和螺线管最重要；电感用 $L=2W/I^2$ 或 $L=N\Phi/I$。
- Q3：平面波先看指数项判断传播方向，再用 $\mathbf H=(1/\eta)\hat{\mathbf k}\times\mathbf E$。
- Q4：先算 $\eta_1,\eta_2$，再算 $\Gamma,\tau$；反射波磁场方向必须用叉乘。
- 分离变量法本轮不考，不要在最后一天投入大量时间。
