---
title: "Review of Static Electric Fields 参考答案"
description: "电磁场与波前五章重要题型"
date: 2026-05-05
tags: [electromagnetics, fields]
category: "课程学习"
docGroup: "emf-notes"
order: 6
draft: false
---
## 符号约定

$\vec{E}$：电场强度 (V/m) | $\vec{D}$：电位移矢量 (C/m²) | $\vec{J}$：传导电流密度 (A/m²) | $\varphi$：电势 (V) | $\varepsilon$：介电常数 (F/m)，$\varepsilon = \varepsilon_0 \varepsilon_r$ | $\sigma$：电导率 (S/m) | $\varepsilon_0 = 8.85 \times 10^{-12} \ \text{F/m}$ | $\rho_s$：面电荷密度 (C/m²) | $\vec{P}$：极化强度 (C/m²)

---

## Series 1：平行板电容器 (Parallel-plate Capacitors)

平行板电容器是考试最常见的基本模型。核心思路是：**用 $\nabla \cdot \vec{J} = 0$（恒定电流场）求 $\vec{E}$ 的分布，再通过 $\vec{E}$ 求 $\vec{D}$、电荷和能量**。

**关键物理量关系（必须记住）：**

| 关系 | 公式 | 说明 |
|------|------|------|
| 传导电流 | $\vec{J} = \sigma \vec{E}$ | 欧姆定律的微分形式，有耗介质中电流由电场驱动 |
| 电位移 | $\vec{D} = \varepsilon \vec{E}$ | 介质本构关系 |
| 极化强度 | $\vec{P} = \vec{D} - \varepsilon_0 \vec{E} = (\varepsilon - \varepsilon_0)\vec{E}$ | 介质对外加电场的响应 |
| 焦耳热密度 | $p = \vec{J} \cdot \vec{E} = \sigma E^2$ | 单位体积的功率耗散 |
| 电场能量密度 | $w_e = \frac{1}{2}\vec{D} \cdot \vec{E} = \frac{1}{2}\varepsilon E^2$ | 单位体积储存的电场能 |
| 电容 | $C = Q / U$ | 极板电荷与电压之比 |
| 电导 | $G = I / U$ | 漏电流与电压之比 |

**求解有耗介质问题的通用策略：**

1. **先求 $\vec{E}$**：通过 $\nabla \cdot \vec{J} = 0$（$\vec{J}$ 连续）和电压条件 $U = \int \vec{E} \cdot d\vec{l}$ 联立求解
2. **再求 $\vec{D}$**：用 $\vec{D} = \varepsilon \vec{E}$
3. **求电荷**：用边界条件 $\vec{n} \cdot (\vec{D}_2 - \vec{D}_1) = \rho_{sf}$（自由电荷面密度），$\rho_{sp} = \vec{P} \cdot \vec{n}_{out}$（极化电荷面密度）
4. **求能量和耗散**：对密度积分
5. **求 $C$ 和 $G$**：用 $U$ 除 $Q$ 和 $I$

---

### Q1：两层有耗介质，上下各半填充

**几何结构：** 两块平行金属板，面积 $S$，间距 $d$。外加电压 $U$。上半部分（厚度 $d/2$）填充介质 1，参数 $\varepsilon_1$, $\sigma_1$；下半部分（厚度 $d/2$）填充介质 2，参数 $\varepsilon_2$, $\sigma_2$。两种介质的分界面平行于极板。

```
    ┌───────────┐  ← 上极板 (φ = U)
    │  ε1, σ1   │  d/2
    ├───────────┤  ← 介质分界面 y = d/2
    │  ε2, σ2   │  d/2
    └───────────┘  ← 下极板 (φ = 0)
```

#### 1. 审题与物理分析

**坐标系选择：** 直角坐标系。设 $y$ 轴垂直于极板，从下极板 ($y=0$) 指向上极板 ($y=d$)。

**物理判断：** 两种介质都是有耗的 ($\sigma_1, \sigma_2 \neq 0$)。DC 稳态下 $\nabla \cdot \vec{J} = 0$，在界面处取 pillbox 得 $J_{1n} = J_{2n}$——电流密度法向连续。对于平行板几何，即 $J_1 = J_2$。

所以：**先通过 $\vec{J}$ 的连续性 + 电压约束求 $\vec{E}$，再求 $\vec{D}$。**

（如果两种介质无耗，则 $\nabla \cdot \vec{D} = 0$，$D$ 法向连续——这是两种路线的根本区别。）

#### 2. 核心方程

- **$\vec{J}$ 连续（法向）：** $J_{1n} = J_{2n}$，在平行板中即 $J_1 = J_2$（电流密度大小相同，方向垂直于界面）
- **欧姆定律：** $J_1 = \sigma_1 E_1$, $J_2 = \sigma_2 E_2$
- **电压条件：** $E_1 \cdot \frac{d}{2} + E_2 \cdot \frac{d}{2} = U$
- **$\vec{E}$ 的无旋性：** 平行板中场均匀，$\vec{E}$ 在各自区域内是常数，方向垂直于极板

#### 3. 逐步求解

##### Step 1：求 $E_1$, $E_2$

由 $\vec{J}$ 的连续性：

$$
J_1 = J_2 \quad \Rightarrow \quad \sigma_1 E_1 = \sigma_2 E_2 \tag{1}
$$

由电压条件（$E_1$, $E_2$ 在各自区域内均匀）：

$$
E_1 \cdot \frac{d}{2} + E_2 \cdot \frac{d}{2} = U \tag{2}
$$

将 $(1)$ 代入 $(2)$：$E_2 = \frac{\sigma_1}{\sigma_2}E_1$

$$
E_1 \cdot \frac{d}{2} + \frac{\sigma_1}{\sigma_2}E_1 \cdot \frac{d}{2} = U
$$

$$
E_1 \cdot \frac{d}{2}\left(1 + \frac{\sigma_1}{\sigma_2}\right) = U
$$

$$
E_1 = \frac{2U}{d} \cdot \frac{\sigma_2}{\sigma_1 + \sigma_2} \tag{3}
$$

同理：

$$
E_2 = \frac{2U}{d} \cdot \frac{\sigma_1}{\sigma_1 + \sigma_2} \tag{4}
$$

**讨论：** 如果 $\sigma_1 = \sigma_2$（两层电导率相同），则 $E_1 = E_2 = U/d$，退化到均匀介质的情况。如果 $\sigma_2 \gg \sigma_1$（介质 2 导电性好很多），则 $E_1 \approx 2U/d$（电场集中在介质 1 中），$E_2 \approx 0$。这意味着**电场集中在电阻更大的那层**（串联电阻分压原理）。

##### Step 2：求电势分布 $\varphi(y)$

设下极板 $\varphi(0) = 0$，上极板 $\varphi(d) = U$。由 $\vec{E} = -\nabla \varphi$：$E_y = -d\varphi/dy$。上极板电势高、下极板低，$d\varphi/dy > 0$，因此 $E_y < 0$（电场指向 $-y$）。

设 $E_1$, $E_2$ 为场的大小（正值），$E_y = -E_1$（上半）、$E_y = -E_2$（下半）。由 $\varphi(y) = \varphi(0) - \int_0^y E_y dy'$：

下半区域 ($0 \le y \le d/2$)：
$$
\varphi(y) = 0 - \int_0^y (-E_2) dy' = E_2 y
$$

上半区域 ($d/2 \le y \le d$)：
$$
\varphi(y) = E_2 \cdot \frac{d}{2} - \int_{d/2}^y (-E_1) dy' = E_2 \cdot \frac{d}{2} + E_1\left(y - \frac{d}{2}\right)
$$

验证：$y = d$ 时 $\varphi(d) = \frac{d}{2}(E_1+E_2) = U$. ✓

##### Step 3：求 $\vec{D}$ 分布

在下半区域（介质 2）：
$$
D_2 = \varepsilon_2 E_2 = \varepsilon_2 \cdot \frac{2U}{d} \cdot \frac{\sigma_1}{\sigma_1 + \sigma_2} \tag{5}
$$

在上半区域（介质 1）：
$$
D_1 = \varepsilon_1 E_1 = \varepsilon_1 \cdot \frac{2U}{d} \cdot \frac{\sigma_2}{\sigma_1 + \sigma_2} \tag{6}
$$

$D_1$ 和 $D_2$ 大小不同（因为 $\varepsilon_1 \neq \varepsilon_2$ 且 $E_1 \neq E_2$），所以在分界面处 $\vec{D}$ **不连续**。

**为什么 $D$ 不连续？** 因为在介质分界面处积累了自由电荷，正是这些自由电荷使得 $\vec{D}$ 发生突变。

##### Step 4：求自由电荷面密度

边界条件：$\vec{n} \cdot (\vec{D}_{2} - \vec{D}_{1}) = \rho_{sf}$

电场方向从上极板（高电势）指向下极板（低电势）：$\vec{D} = -\varepsilon E \,\vec{e}_y$。

**下极板 ($y = 0$)：** $\vec{n} = +\vec{e}_y$（从导体指向介质 2）：
$$
\rho_{sf}(0) = \vec{e}_y \cdot (-\varepsilon_2 E_2 \vec{e}_y - 0) = -\varepsilon_2 E_2 \quad (\text{负自由电荷})
$$

**分界面 ($y = d/2$)：** $\vec{n} = +\vec{e}_y$（从介质 2 指向介质 1）：
$$
\rho_{sf}(d/2) = \vec{e}_y \cdot [(-\varepsilon_1 E_1 \vec{e}_y) - (-\varepsilon_2 E_2 \vec{e}_y)] = \varepsilon_2 E_2 - \varepsilon_1 E_1
$$

代入 $(5)(6)$：
$$
\rho_{sf}(d/2) = \frac{2U}{d} \cdot \frac{\varepsilon_2 \sigma_1 - \varepsilon_1 \sigma_2}{\sigma_1 + \sigma_2} \tag{7}
$$

当 $\frac{\varepsilon_1}{\sigma_1} = \frac{\varepsilon_2}{\sigma_2}$ 时界面无自由电荷。

**上极板 ($y = d$)：** $\vec{n} = -\vec{e}_y$（从导体指向介质 1）：
$$
\rho_{sf}(d) = -\vec{e}_y \cdot (-\varepsilon_1 E_1 \vec{e}_y - 0) = +\varepsilon_1 E_1 \quad (\text{正自由电荷})
$$

##### Step 5：求极化电荷面密度

$\rho_{sp} = \vec{P} \cdot \vec{n}_{out}$，$\vec{P} = (\varepsilon - \varepsilon_0)\vec{E}$。由于 $\vec{E}$ 指向 $-y$，$\vec{P}_1 = -(\varepsilon_1 - \varepsilon_0)E_1 \vec{e}_y$，$\vec{P}_2 = -(\varepsilon_2 - \varepsilon_0)E_2 \vec{e}_y$。

**介质 2 下表面 ($y = 0$)：** $\vec{n}_{out} = -\vec{e}_y$（从介质指向导体）→ $\rho_{sp2}(0) = +(\varepsilon_2 - \varepsilon_0)E_2$

**介质 2 上表面 ($y = d/2$)：** $\vec{n}_{out} = +\vec{e}_y$ → $\rho_{sp2}(d/2) = -(\varepsilon_2 - \varepsilon_0)E_2$

**介质 1 下表面 ($y = d/2$)：** $\vec{n}_{out} = -\vec{e}_y$ → $\rho_{sp1}(d/2) = +(\varepsilon_1 - \varepsilon_0)E_1$

分界面总极化电荷：$\rho_{sp}(d/2) = (\varepsilon_1 - \varepsilon_0)E_1 - (\varepsilon_2 - \varepsilon_0)E_2$

**介质 1 上表面 ($y = d$)：** $\vec{n}_{out} = +\vec{e}_y$ → $\rho_{sp1}(d) = -(\varepsilon_1 - \varepsilon_0)E_1$

> 考试时先写出 $\rho_{sp} = \vec{P} \cdot \vec{n}$，再代入计算，让阅卷人看到思路。

##### Step 6：功率耗散密度

$p = \vec{J} \cdot \vec{E} = \sigma E^2$

$p_1 = \sigma_1 E_1^2$，$p_2 = \sigma_2 E_2^2$

总耗散功率：
$$
P_{total} = (p_1 + p_2) \cdot S \cdot \frac{d}{2} = \frac{2SU^2}{d} \cdot \frac{\sigma_1 \sigma_2}{\sigma_1 + \sigma_2}
$$

##### Step 7：电场能量

$w_e = \frac{1}{2} \vec{D} \cdot \vec{E} = \frac{1}{2} \varepsilon E^2$

$w_{e1} = \frac{1}{2} \varepsilon_1 E_1^2$，$w_{e2} = \frac{1}{2} \varepsilon_2 E_2^2$

总能量：
$$
W_e = (w_{e1} + w_{e2}) \cdot S \cdot \frac{d}{2} = \frac{S d}{4} (\varepsilon_1 E_1^2 + \varepsilon_2 E_2^2)
$$

##### Step 8：求 $C$ 和 $G$

总电流 $I = J \cdot S$（$J_1 = J_2 = J$）：
$$
G = \frac{I}{U} = \frac{\sigma_1 E_1 S}{U} = \frac{2S}{d} \cdot \frac{\sigma_1 \sigma_2}{\sigma_1 + \sigma_2} \tag{8}
$$

（等效为 $G_1 = 2\sigma_1 S/d$ 与 $G_2 = 2\sigma_2 S/d$ 串联：$1/G = 1/G_1 + 1/G_2$）

上极板（正极板）自由电荷 $Q = \rho_{sf}(d) \cdot S = \varepsilon_1 E_1 S$：
$$
C = \frac{Q}{U} = \frac{2S}{d} \cdot \frac{\varepsilon_1 \sigma_2}{\sigma_1 + \sigma_2} \tag{9}
$$

由上极板电荷有 $C/G = \varepsilon_1 / \sigma_1$（介质 1 的弛豫时间）。

---

### Q2：两层有耗介质，左右各半填充

**几何结构：** 平行板电容器，面积 $S$（左右各 $S/2$），间距 $d$，电压 $U$。左侧（面积 $S/2$）介质参数 $\varepsilon_1$, $\sigma_1$；右侧（面积 $S/2$）介质参数 $\varepsilon_2$, $\sigma_2$。介质分界面**垂直于**极板。

```
    ┌───────────┐  ← 上极板
    │           │
    │  ε1, σ1   │  ε2, σ2
    │           │
    └───────────┘  ← 下极板
     ← S/2 →← S/2 →
```

#### 1. 审题与物理分析

Q1 中两种介质**串联**（电流必须先后经过两层），Q2 中两种介质**并联**（两侧各自独立通路）。左右两侧承受相同的电压 $U$、厚度 $d$，因此：
$$
E_1 = E_2 = \frac{U}{d}
$$

**容易犯的错：** 在 Q2 中也去用 $J$ 连续求 $E$——这是错的，$J_1$ 和 $J_2$ 在不同路径上，互不影响。

#### 2. 各小问求解答

##### (1) $\vec{E}$ 和 $\varphi$ 分布

$$
E_1 = E_2 = E = \frac{U}{d}
$$

$\vec{E}$ 方向垂直于极板（从高电势到低电势）。电势 $\varphi$ 在左右两侧都是从下极板的 $0$ 线性增长到上极板的 $U$（完全对称）。

##### (2) $\vec{D}$ 分布

左侧：$D_1 = \varepsilon_1 E = \varepsilon_1 \frac{U}{d}$

右侧：$D_2 = \varepsilon_2 E = \varepsilon_2 \frac{U}{d}$

两侧的 $\vec{D}$ **大小不同**（因为 $\varepsilon$ 不同，$E$ 相同）。

##### (3) 自由电荷面密度

**下极板表面：**
左侧：$\rho_{sf1}(0) = D_1 = \varepsilon_1 \frac{U}{d}$
右侧：$\rho_{sf2}(0) = D_2 = \varepsilon_2 \frac{U}{d}$

极板上左右两侧的自由面电荷密度不同（正比于各自的 $\varepsilon$）。

**介质分界面（垂直面）：**

分界面法向在 $x$ 方向，而 $\vec{D}$ 只有 $y$ 分量，所以 $D_{n} = 0$。

$\vec{n} \cdot (\vec{D}_2 - \vec{D}_1) = 0 - 0 = 0$

**垂直分界面上没有自由电荷。**

##### (4) 极化电荷面密度

$\rho_{sp} = \vec{P} \cdot \vec{n}_{out}$，$\vec{P} = (\varepsilon - \varepsilon_0)\vec{E}$。

电场方向：上极板（$U$）到下极板（$0$），$\vec{E} = -E\,\vec{e}_y$（$E = U/d$）。所以：
$$
\vec{P}_1 = -(\varepsilon_1 - \varepsilon_0)E\,\vec{e}_y,\quad \vec{P}_2 = -(\varepsilon_2 - \varepsilon_0)E\,\vec{e}_y
$$

**下极板表面 ($y = 0$)：** $\vec{n}_{out}$ 从介质指向下极板导体，即 $-\vec{e}_y$：
$$
\begin{aligned}
\rho_{sp1}(0) &= \vec{P}_1 \cdot (-\vec{e}_y) = [-(\varepsilon_1 - \varepsilon_0)E\,\vec{e}_y] \cdot (-\vec{e}_y) = +(\varepsilon_1 - \varepsilon_0)E \\
\rho_{sp2}(0) &= \vec{P}_2 \cdot (-\vec{e}_y) = [-(\varepsilon_2 - \varepsilon_0)E\,\vec{e}_y] \cdot (-\vec{e}_y) = +(\varepsilon_2 - \varepsilon_0)E
\end{aligned}
$$

**上极板表面 ($y = d$)：** $\vec{n}_{out}$ 从介质指向上极板导体，即 $+\vec{e}_y$：
$$
\begin{aligned}
\rho_{sp1}(d) &= \vec{P}_1 \cdot (+\vec{e}_y) = -(\varepsilon_1 - \varepsilon_0)E \\
\rho_{sp2}(d) &= \vec{P}_2 \cdot (+\vec{e}_y) = -(\varepsilon_2 - \varepsilon_0)E
\end{aligned}
$$

**垂直分界面 ($\phi$ 方向)：** $\vec{P}$ 只有 $y$ 分量，界面法向在 $x$ 方向，$P_n = 0$。**垂直分界面上没有极化面电荷。**

##### (5) 功率耗散密度

左侧：$p_1 = \sigma_1 E^2 = \sigma_1 \frac{U^2}{d^2}$

右侧：$p_2 = \sigma_2 E^2 = \sigma_2 \frac{U^2}{d^2}$

总耗散功率：
$$
P_{total} = p_1 \cdot \frac{S}{2} d + p_2 \cdot \frac{S}{2} d = \frac{SU^2}{2d}(\sigma_1 + \sigma_2)
$$

##### (6) 电场能量

左侧：$w_{e1} = \frac{1}{2} \varepsilon_1 E^2 = \frac{1}{2} \varepsilon_1 \frac{U^2}{d^2}$

右侧：$w_{e2} = \frac{1}{2} \varepsilon_2 E^2 = \frac{1}{2} \varepsilon_2 \frac{U^2}{d^2}$

总能量：
$$
W_e = \frac{S}{2} d (w_{e1} + w_{e2}) = \frac{SU^2}{4d}(\varepsilon_1 + \varepsilon_2)
$$

##### (7) $C$ 和 $G$

总电流：$I = J_1 \cdot \frac{S}{2} + J_2 \cdot \frac{S}{2} = \frac{S}{2}(\sigma_1 + \sigma_2) \frac{U}{d}$

$$
G = \frac{I}{U} = \frac{S}{2d}(\sigma_1 + \sigma_2)
$$

这相当于两个电导**并联**：$G = G_1 + G_2$，其中 $G_1 = \sigma_1 \frac{S/2}{d}$，$G_2 = \sigma_2 \frac{S/2}{d}$。

总极板电荷：$Q = D_1 \cdot \frac{S}{2} + D_2 \cdot \frac{S}{2} = \frac{S}{2}(\varepsilon_1 + \varepsilon_2) \frac{U}{d}$

$$
C = \frac{Q}{U} = \frac{S}{2d}(\varepsilon_1 + \varepsilon_2)
$$

相当于两个电容**并联**：$C = C_1 + C_2$，其中 $C_1 = \varepsilon_1 \frac{S/2}{d}$，$C_2 = \varepsilon_2 \frac{S/2}{d}$。

**Q1 vs Q2 对比总结：**

| 比较项 | Q1（上下叠放，串联） | Q2（左右并列，并联） |
|--------|---------------------|---------------------|
| $E$ 分布 | $E_1 \neq E_2$，由 $J$ 连续性决定 | $E_1 = E_2 = U/d$，电场相同 |
| $J$ 分布 | $J_1 = J_2$，电流相同 | $J_1 \neq J_2$，各自独立 |
| $D$ 分布 | $D_1 \neq D_2$ | $D_1 \neq D_2$ |
| 等效电路 | 两个 $RC$ 串联 | 两个 $RC$ 并联 |
| $C$ | $\frac{2S}{d} \frac{\varepsilon_1 \sigma_2}{\sigma_1+\sigma_2}$ | $\frac{S}{2d}(\varepsilon_1 + \varepsilon_2)$ |
| $G$ | $\frac{2S}{d} \frac{\sigma_1 \sigma_2}{\sigma_1+\sigma_2}$ | $\frac{S}{2d}(\sigma_1 + \sigma_2)$ |

---

### Q3：充电后断开，插入无耗介质

**题目：** 平行板电容器（面积 $S$，间距 $d$）充电至电压 $U_0$，然后断开电源。断开后插入一块厚度为 $t$、介电常数为 $\varepsilon$ 的无耗介质板（$\sigma = 0$）。求 $\vec{E}$ 和 $C$ 的变化。

**关键条件：** 断开电源 → 极板上的电荷 $Q$ **保持不变**（开路，没有电流通路）。

#### 1. 审题分析

**插入前（初始状态）：**

$$
C_0 = \frac{\varepsilon_0 S}{d}, \quad Q = C_0 U_0 = \frac{\varepsilon_0 S U_0}{d}, \quad E_0 = \frac{U_0}{d}
$$

$D_0 = \varepsilon_0 E_0 = \frac{\varepsilon_0 U_0}{d} = \frac{Q}{S}$（由 Gauss 定律直接得出，$D$ 由自由电荷决定）。

**插入后：** 设介质板在极板之间（比如紧贴下极板），厚度 $t$。剩余空间 $(d-t)$ 为空气（$\varepsilon_0$）。

插入后变为两层"串联"结构：空气层 ($d-t$) + 介质层 ($t$)。

#### 2. 求 $E$ 的变化

**关键推理：** 因为 $Q$ 不变，没有自由体电荷（$\rho_f = 0$ 在极板之间），由 Gauss 定律，$\vec{D}$ 在空间恒定：

$$
D = \frac{Q}{S} = \varepsilon_0 E_0 \quad (\text{与插入前相同})
$$

空气层中的电场：
$$
E_{air} = \frac{D}{\varepsilon_0} = \frac{Q}{\varepsilon_0 S} = E_0 \quad (\text{不变！})
$$

介质层中的电场：
$$
E_{diel} = \frac{D}{\varepsilon} = \frac{Q}{\varepsilon S} = \frac{\varepsilon_0}{\varepsilon}E_0 = \frac{E_0}{\varepsilon_r}
$$

因为 $\varepsilon_r > 1$，$E_{diel} < E_0$。**介质层中的电场减小了。**

**结论：** 空气区域的 $\vec{E}$ 与插入前相同；介质区域的 $\vec{E}$ 减小为原来的 $1/\varepsilon_r$。

#### 3. 求 $C$ 的变化

插入后总电压：
$$
U' = E_{air}(d-t) + E_{diel} \cdot t = E_0(d-t) + \frac{E_0}{\varepsilon_r}t
$$

$$
U' = \frac{Q}{\varepsilon_0 S}(d-t) + \frac{Q}{\varepsilon S}t = Q\left[\frac{d-t}{\varepsilon_0 S} + \frac{t}{\varepsilon S}\right]
$$

新电容：
$$
C' = \frac{Q}{U'} = \frac{1}{\frac{d-t}{\varepsilon_0 S} + \frac{t}{\varepsilon S}} = \frac{\varepsilon_0 \varepsilon S}{\varepsilon(d-t) + \varepsilon_0 t}
$$

也可以写成：
$$
C' = \frac{\varepsilon_0 S}{d - t\left(1 - \frac{1}{\varepsilon_r}\right)}
$$

因为 $1 - 1/\varepsilon_r > 0$，分母 $< d$，所以 $C' > C_0 = \varepsilon_0 S / d$。

**结论：电容增大。** 物理直观：插入高介电常数的材料使等效板间距"减小"了。

**特殊情况验证：**
- 如果 $t = 0$（没插入）：$C' = C_0$ ✓
- 如果 $t = d$ 且 $\varepsilon = \varepsilon_r \varepsilon_0$（完全填充）：$C' = \varepsilon S / d = \varepsilon_r C_0$ ✓——标准全填充公式

---

### Q4：插入有耗介质

**题目：** 与 Q3 相同条件（充电后断开），但插入的介质有耗（$\varepsilon, \sigma \neq 0$）。求 $\vec{E}$ 和 $C$ 的变化。

#### 1. 审题分析

$\sigma \neq 0$ → 介质可以传导电流。电容器断开电源，但介质内部可形成暂时的泄漏通路。

#### 2. 物理过程

**初始瞬态：** $Q$ 没来得及变化，与 Q3 完全相同：$D = Q/S$，$E_{air} = E_0$，$E_{diel} = E_0/\varepsilon_r$。但有 $\sigma \neq 0$，$J = \sigma E_{diel} \neq 0$ 使电荷开始泄漏。

**稳态 ($t \to \infty$)：** 电荷泄漏完毕。$J = 0$，$\sigma \neq 0$ 推出 $E_{diel} = 0$，进而 $E_{air} = 0$。$E = 0$ 处处，$Q = 0$。

#### 3. 答案

**$\vec{E}$：** 初始同 Q3（$E_{air}$ 不变，$E_{diel}$ 减小为 $E_0/\varepsilon_r$），随后逐渐衰减至零。时间常数 $\tau = RC$。

**$C$：** 与 Q3 完全相同：$C' = \frac{\varepsilon_0 \varepsilon S}{\varepsilon(d-t) + \varepsilon_0 t}$。$\sigma$ 不影响 $C$（$C$ 是纯介电性质），但使电容成为有损元件 ($G \neq 0$)，储存的电荷会随时间泄漏。

---

## Series 2：同轴线 (Coaxial Line)

圆柱坐标系。径向场按 $1/r$ 衰减，积分出现 $\ln$。

**均匀介质预记公式：** $E_r(r) = \frac{V}{r \ln(b/a)}$，$C_0 = \frac{2\pi\varepsilon}{\ln(b/a)}$，$G_0 = \frac{2\pi\sigma}{\ln(b/a)}$

圆柱坐标散度：$\nabla \cdot \vec{D} = \frac{1}{r}\frac{\partial(r D_r)}{\partial r}$。$r D_r = \text{const}$ 时无源。

---

### Q1：两层同轴介质

**几何结构：** 无限长同轴线，内导体半径 $a$，外导体内半径 $b$，电压 $V$。
- 内层介质 ($a < r < c$)：$\varepsilon_1$, $\sigma_1$
- 外层介质 ($c < r < b$)：$\varepsilon_2$, $\sigma_2$

```
        外层 ε2,σ2
    ┌─────────────────┐
    │   ┌─────────┐   │
    │   │ ε1,σ1   │   │
    │   │  ┌───┐  │   │
    │   │  │ ○ │  │   │  ← 内导体 a
    │   │  └───┘  │   │
    │   └─────────┘   │
    └─────────────────┘
                   ← 外导体 b
         ← 界面 c →
```

#### 1. 审题与物理分析

**对称性：** 轴对称 + 无限长 → 所有场仅是 $r$ 的函数，只有径向分量 $\vec{e}_r$。

**有耗介质 → 从 $\vec{J}$ 入手。** 恒定电流：$\nabla \cdot \vec{J} = 0$。

在圆柱坐标中（仅有 $J_r(r)$）：
$$
\nabla \cdot \vec{J} = \frac{1}{r}\frac{\partial(r J_r)}{\partial r} = 0
$$

推导：$\frac{\partial(r J_r)}{\partial r} = 0$，所以 $r J_r(r) = \text{constant}$。

设 $K$ 为常数：$r J_r(r) = K$，即 $J_r(r) = \frac{K}{r}$。

#### 2. 各小问求解答

##### (1) $\vec{E}$, $\vec{D}$, $\vec{J}$ 和单位长度 $C$, $G$

**求 $\vec{E}$：**

设单位长度上的总径向电流为 $I_0$（单位：A/m）：

$$
I_0 = J_r(r) \cdot 2\pi r = \frac{K}{r} \cdot 2\pi r = 2\pi K \quad (\text{与 } r \text{ 无关！})
$$

所以 $K = \frac{I_0}{2\pi}$，$J_r(r) = \frac{I_0}{2\pi r}$。

**$\vec{J}$ 的连续性是自动满足的：** $J_r(r) = \frac{I_0}{2\pi r}$ 在两层中都对（但两层中的 $I_0$ 是同一个值——电流守恒）。

在每层中：
$$
E_{r1}(r) = \frac{J_r(r)}{\sigma_1} = \frac{I_0}{2\pi \sigma_1 r}, \quad a < r < c \tag{10}
$$

$$
E_{r2}(r) = \frac{J_r(r)}{\sigma_2} = \frac{I_0}{2\pi \sigma_2 r}, \quad c < r < b \tag{11}
$$

**由电压条件确定 $I_0$：**

$$
V = \int_a^b E_r(r) \, dr = \int_a^c \frac{I_0}{2\pi \sigma_1 r} \, dr + \int_c^b \frac{I_0}{2\pi \sigma_2 r} \, dr
$$

$$
V = \frac{I_0}{2\pi\sigma_1} \ln\frac{c}{a} + \frac{I_0}{2\pi\sigma_2} \ln\frac{b}{c}
$$

$$
I_0 = \frac{2\pi V}{\frac{1}{\sigma_1}\ln\frac{c}{a} + \frac{1}{\sigma_2}\ln\frac{b}{c}} \tag{12}
$$

**代回得 $\vec{E}$：**

$$
E_{r1}(r) = \frac{V}{\sigma_1 r\left(\frac{1}{\sigma_1}\ln\frac{c}{a} + \frac{1}{\sigma_2}\ln\frac{b}{c}\right)} = \frac{V}{r\left(\ln\frac{c}{a} + \frac{\sigma_1}{\sigma_2}\ln\frac{b}{c}\right)}, \quad a < r < c
$$

$$
E_{r2}(r) = \frac{V}{\sigma_2 r\left(\frac{1}{\sigma_1}\ln\frac{c}{a} + \frac{1}{\sigma_2}\ln\frac{b}{c}\right)} = \frac{V}{r\left(\frac{\sigma_2}{\sigma_1}\ln\frac{c}{a} + \ln\frac{b}{c}\right)}, \quad c < r < b
$$

**求 $\vec{D}$：**

$$
D_{r1}(r) = \varepsilon_1 E_{r1}(r), \quad D_{r2}(r) = \varepsilon_2 E_{r2}(r)
$$

**求 $\vec{J}$：** 已经得到 $J_r(r) = I_0/(2\pi r)$，在两层中完全一样（$J$ 连续全区域）。

**求单位长度电导 $G_0$：**

$$
G_0 = \frac{I_0}{V} = \frac{2\pi}{\frac{1}{\sigma_1}\ln\frac{c}{a} + \frac{1}{\sigma_2}\ln\frac{b}{c}} \tag{13}
$$

相当于两个电导的**串联**（电流路径经过两层）：$G_{01} = \frac{2\pi\sigma_1}{\ln(c/a)}$，$G_{02} = \frac{2\pi\sigma_2}{\ln(b/c)}$，串联公式 $\frac{1}{G_0} = \frac{1}{G_{01}} + \frac{1}{G_{02}}$。

**求单位长度电容 $C_0$：**

$C_0 = Q_0 / V$，其中 $Q_0$ 是内导体表面单位长度的自由电荷。

$$
Q_0 = D_{r1}(a) \cdot 2\pi a = \varepsilon_1 E_{r1}(a) \cdot 2\pi a
$$

代入 $E_{r1}(a)$：

$$
Q_0 = \varepsilon_1 \cdot \frac{V}{a\left(\ln\frac{c}{a} + \frac{\sigma_1}{\sigma_2}\ln\frac{b}{c}\right)} \cdot 2\pi a = \frac{2\pi \varepsilon_1 V}{\ln\frac{c}{a} + \frac{\sigma_1}{\sigma_2}\ln\frac{b}{c}}
$$

$$
C_0 = \frac{Q_0}{V} = \frac{2\pi \varepsilon_1}{\ln\frac{c}{a} + \frac{\sigma_1}{\sigma_2}\ln\frac{b}{c}} \tag{14}
$$

$C_0$ 依赖 $\sigma_1/\sigma_2$——有耗串联时 $E$ 分布受 $\sigma$ 影响，进而 $Q$（涉及 $D=\varepsilon E$）也受 $\sigma$ 影响，所以 $C=Q/V$ 同时依赖 $\varepsilon$ 和 $\sigma$。并联情形下 $E$ 由几何和电压直接决定，不依赖 $\sigma$。

##### (2) 各界面上的自由电荷面密度

边界条件：$\vec{n} \cdot (\vec{D}_{out} - \vec{D}_{in}) = \rho_{sf}$

**$r = a$（内导体表面）：**

$\vec{n}$ 从导体指向介质 1：$+\vec{e}_r$，导体内 $\vec{D} = 0$：
$$
\rho_{sf}(a) = D_{r1}(a) = \varepsilon_1 E_{r1}(a)
$$

**$r = c$（介质 1-2 分界面）：**

$\vec{n}$ 从介质 1 指向介质 2：$+\vec{e}_r$：
$$
\rho_{sf}(c) = D_{r2}(c) - D_{r1}(c) = \varepsilon_2 E_{r2}(c) - \varepsilon_1 E_{r1}(c)
$$

代入 $E_{r1}(c)$, $E_{r2}(c)$：

$$
\rho_{sf}(c) = \frac{I_0}{2\pi c}\left(\frac{\varepsilon_2}{\sigma_2} - \frac{\varepsilon_1}{\sigma_1}\right)
$$

**讨论：** 当 $\frac{\varepsilon_1}{\sigma_1} = \frac{\varepsilon_2}{\sigma_2}$ 时，分界面无自由电荷。

**$r = b$（外导体内表面）：**

$\vec{n}$ 从外导体指向介质 2：$-\vec{e}_r$：
$$
\rho_{sf}(b) = -\vec{e}_r \cdot \vec{D}_{r2}(b) = -D_{r2}(b) = -\varepsilon_2 E_{r2}(b)
$$

##### (3) 各介质表面的极化电荷面密度

$\rho_{sp} = \vec{P} \cdot \vec{n}_{out}$

在 $r = a$（介质 1 内表面）：$\vec{n}_{out} = -\vec{e}_r$（从介质 1 指向内导体）：
$$
\rho_{sp1}(a) = -(\varepsilon_1 - \varepsilon_0)E_{r1}(a)
$$

在 $r = c$（介质 1 外表面）：$\vec{n}_{out} = +\vec{e}_r$；介质 2 内表面：$\vec{n}_{out} = -\vec{e}_r$：
$$
\rho_{sp}(c) = (\varepsilon_1 - \varepsilon_0)E_{r1}(c) - (\varepsilon_2 - \varepsilon_0)E_{r2}(c)
$$

在 $r = b$（介质 2 外表面）：$\vec{n}_{out} = +\vec{e}_r$：
$$
\rho_{sp2}(b) = +(\varepsilon_2 - \varepsilon_0)E_{r2}(b)
$$

---

### Q2：介质方位角各半排列

**几何结构：** 内导体 $a$，外导体 $b$。两层介质在方位角 ($\phi$) 方向各占一半：
- 上半 ($0 < \phi < \pi$)：$\varepsilon_1$, $\sigma_1$
- 下半 ($\pi < \phi < 2\pi$)：$\varepsilon_2$, $\sigma_2$

两层都延伸 $a < r < b$（均在径向贯穿）。

#### 1. 审题与物理分析

**对称性：** 几何结构沿 $\phi$ 方向不再均匀，但电极仍是同轴的圆柱 → $\vec{E}$ 仍是纯径向（$\vec{e}_r$），**且在同半径 $r$ 处，上下的 $E_r$ 必须相同**（因为 $E$ 的切向连续——$\phi$ 方向的分界面以径向为切向）。

**所以 $E_r(r)$ 是同一个函数，与 $\phi$ 无关。**

这类似于 Q2 在平行板中的并联情况——电流在上下两半中分别流动。

#### 2. 逐步求解

##### 求 $\vec{E}$ 和 $I_0$

设单位长度总电流为 $I_0$。电流密度与 $\phi$ 有关：
- 上半 ($0 < \phi < \pi$)：$J_1(r) = \sigma_1 E_r(r)$
- 下半 ($\pi < \phi < 2\pi$)：$J_2(r) = \sigma_2 E_r(r)$

总电流：
$$
I_0 = \int_0^{\pi} J_1(r) \cdot r \, d\phi + \int_{\pi}^{2\pi} J_2(r) \cdot r \, d\phi = \pi r (\sigma_1 + \sigma_2) E_r(r)
$$

由此：
$$
E_r(r) = \frac{I_0}{\pi r (\sigma_1 + \sigma_2)} \tag{15}
$$

电压条件：
$$
V = \int_a^b E_r(r) \, dr = \frac{I_0}{\pi (\sigma_1 + \sigma_2)} \ln\frac{b}{a}
$$

$$
I_0 = \frac{\pi (\sigma_1 + \sigma_2) V}{\ln(b/a)}, \quad E_r(r) = \frac{V}{r \ln(b/a)} \tag{16}
$$

$E_r(r)$ 与均匀介质表达式相同——$E$ 由电压除以 $\int dr/r$ 决定，电流分布不影响 $E$ 的径向依赖。

##### 求 $\vec{D}$ 和 $\vec{J}$

上半：$D_1(r) = \varepsilon_1 E_r(r) = \frac{\varepsilon_1 V}{r \ln(b/a)}$，$J_1(r) = \sigma_1 E_r(r) = \frac{\sigma_1 V}{r \ln(b/a)}$

下半：$D_2(r) = \varepsilon_2 E_r(r) = \frac{\varepsilon_2 V}{r \ln(b/a)}$，$J_2(r) = \sigma_2 E_r(r) = \frac{\sigma_2 V}{r \ln(b/a)}$

##### 求单位长度 $G_0$ 和 $C_0$

$$
G_0 = \frac{I_0}{V} = \frac{\pi (\sigma_1 + \sigma_2)}{\ln(b/a)} \tag{17}
$$

相当于两个电导**并联**：$G_{01} = \frac{\pi\sigma_1}{\ln(b/a)}$，$G_{02} = \frac{\pi\sigma_2}{\ln(b/a)}$。

内导体表面的单位长度自由电荷：
$$
Q_0 = D_1(a) \cdot \pi a + D_2(a) \cdot \pi a = \pi a [\varepsilon_1 E_r(a) + \varepsilon_2 E_r(a)] = \frac{\pi (\varepsilon_1 + \varepsilon_2) V}{\ln(b/a)}
$$

$$
C_0 = \frac{Q_0}{V} = \frac{\pi (\varepsilon_1 + \varepsilon_2)}{\ln(b/a)} \tag{18}
$$

相当于两个电容**并联**。

##### 各界面自由电荷面密度

**$r = a$（内导体表面）：**
上半：$\rho_{sf1}(a) = D_1(a) = \frac{\varepsilon_1 V}{a \ln(b/a)}$
下半：$\rho_{sf2}(a) = D_2(a) = \frac{\varepsilon_2 V}{a \ln(b/a)}$

**$\phi$ 分界面 ($\phi = 0$ 和 $\phi = \pi$)：** 分界面法向在 $\vec{e}_\phi$ 方向，而 $\vec{D}$ 只有 $\vec{e}_r$ 分量 → $D_n = 0$．**无自由面电荷。**

**$r = b$（外导体内表面）：** 类似，符号相反。

##### 各介质表面极化电荷面密度

$\rho_{sp} = \vec{P} \cdot \vec{n}_{out}$，$\vec{P} = (\varepsilon - \varepsilon_0)\vec{E}$。

电场径向向外：$\vec{E} = E_r(r)\vec{e}_r$，$E_r(r) = \dfrac{V}{r\ln(b/a)}$。因此 $\vec{P}_1 = (\varepsilon_1 - \varepsilon_0)E_r(r)\vec{e}_r$，$\vec{P}_2 = (\varepsilon_2 - \varepsilon_0)E_r(r)\vec{e}_r$。

**$r = a$（介质内表面）：** $\vec{n}_{out}$ 从介质指向内导体，即 $-\vec{e}_r$：
$$
\begin{aligned}
\rho_{sp1}(a) &= \vec{P}_1(a) \cdot (-\vec{e}_r) = -(\varepsilon_1 - \varepsilon_0)E_r(a) = -\frac{(\varepsilon_1 - \varepsilon_0)V}{a\ln(b/a)} \\
\rho_{sp2}(a) &= -(\varepsilon_2 - \varepsilon_0)E_r(a) = -\frac{(\varepsilon_2 - \varepsilon_0)V}{a\ln(b/a)}
\end{aligned}
$$

**$r = b$（介质外表面）：** $\vec{n}_{out}$ 从介质指向外导体，即 $+\vec{e}_r$：
$$
\begin{aligned}
\rho_{sp1}(b) &= +(\varepsilon_1 - \varepsilon_0)E_r(b) = +\frac{(\varepsilon_1 - \varepsilon_0)V}{b\ln(b/a)} \\
\rho_{sp2}(b) &= +(\varepsilon_2 - \varepsilon_0)E_r(b) = +\frac{(\varepsilon_2 - \varepsilon_0)V}{b\ln(b/a)}
\end{aligned}
$$

**$\phi$ 分界面 ($\phi = 0, \pi$)：** $\vec{P}$ 无 $\vec{e}_\phi$ 分量，**极化面电荷为零**。

---

## Series 3：同心球 (Co-center Ball)

球坐标系。径向场按 $1/r^2$ 衰减，积分出现 $1/a - 1/b$。

**均匀介质预记公式：** $E_r(r) = \frac{Vab}{(b-a)r^2}$，$C = \frac{4\pi\varepsilon ab}{b-a}$，$G = \frac{4\pi\sigma ab}{b-a}$

球坐标散度：$\nabla \cdot \vec{D} = \frac{1}{r^2}\frac{\partial(r^2 D_r)}{\partial r}$。$r^2 D_r = \text{const}$ 时无源。

---

### Q1：两层同心介质

**几何结构：** 同心球，内球半径 $a$，外球内半径 $b$，电压 $V$。
- 内层介质 ($a < r < c$)：$\varepsilon_1$, $\sigma_1$
- 外层介质 ($c < r < b$)：$\varepsilon_2$, $\sigma_2$

#### 1. 审题与物理分析

**对称性：** 球对称 → 所有场仅是 $r$ 的函数，只有径向分量 $\vec{e}_r$。

**有耗介质 → 从 $\vec{J}$ 入手。** $\nabla \cdot \vec{J} = 0$：

在球坐标中：
$$
\nabla \cdot \vec{J} = \frac{1}{r^2}\frac{\partial(r^2 J_r)}{\partial r} = 0
$$

推导：$r^2 J_r(r) = \text{constant}$。

设常数 $K$：$r^2 J_r(r) = K$，即 $J_r(r) = \frac{K}{r^2}$。

#### 2. 各小问求解答

##### (1) $\vec{E}$, $\vec{D}$, $\vec{J}$ 和 $C$, $G$

**求 $\vec{E}$：**

设总电流为 $I$（整个球面的径向电流）：

$$
I = J_r(r) \cdot 4\pi r^2 = \frac{K}{r^2} \cdot 4\pi r^2 = 4\pi K \quad (\text{与 } r \text{ 无关！})
$$

所以 $K = I/(4\pi)$，$J_r(r) = \frac{I}{4\pi r^2}$——**$J$ 按 $1/r^2$ 衰减。**

在每层中：
$$
E_{r1}(r) = \frac{J_r(r)}{\sigma_1} = \frac{I}{4\pi \sigma_1 r^2}, \quad a < r < c \tag{19}
$$

$$
E_{r2}(r) = \frac{J_r(r)}{\sigma_2} = \frac{I}{4\pi \sigma_2 r^2}, \quad c < r < b \tag{20}
$$

**电压条件：**

$$
V = \int_a^b E_r(r) \, dr = \frac{I}{4\pi\sigma_1} \int_a^c \frac{dr}{r^2} + \frac{I}{4\pi\sigma_2} \int_c^b \frac{dr}{r^2}
$$

$\int \frac{dr}{r^2} = -\frac{1}{r}$，所以：
$$
V = \frac{I}{4\pi\sigma_1}\left(\frac{1}{a} - \frac{1}{c}\right) + \frac{I}{4\pi\sigma_2}\left(\frac{1}{c} - \frac{1}{b}\right)
$$

$$
I = \frac{4\pi V}{\frac{1}{\sigma_1}\left(\frac{1}{a} - \frac{1}{c}\right) + \frac{1}{\sigma_2}\left(\frac{1}{c} - \frac{1}{b}\right)} \tag{21}
$$

代回求 $\vec{E}$：

$$
E_{r1}(r) = \frac{V}{\sigma_1 r^2\left[\frac{1}{\sigma_1}\left(\frac{1}{a} - \frac{1}{c}\right) + \frac{1}{\sigma_2}\left(\frac{1}{c} - \frac{1}{b}\right)\right]}, \quad a < r < c
$$

$$
E_{r2}(r) = \frac{V}{\sigma_2 r^2\left[\frac{1}{\sigma_1}\left(\frac{1}{a} - \frac{1}{c}\right) + \frac{1}{\sigma_2}\left(\frac{1}{c} - \frac{1}{b}\right)\right]}, \quad c < r < b
$$

**求 $\vec{D}$：** $D_{r1} = \varepsilon_1 E_{r1}$，$D_{r2} = \varepsilon_2 E_{r2}$

**求 $\vec{J}$：** $J_r(r) = I/(4\pi r^2)$（同一表达式，全区域连续）

**求电导 $G$：**

$$
G = \frac{I}{V} = \frac{4\pi}{\frac{1}{\sigma_1}\left(\frac{1}{a} - \frac{1}{c}\right) + \frac{1}{\sigma_2}\left(\frac{1}{c} - \frac{1}{b}\right)} \tag{22}
$$

相当于两个电导**串联**：$G_1 = \frac{4\pi\sigma_1 ac}{c-a}$（内层），$G_2 = \frac{4\pi\sigma_2 cb}{b-c}$（外层）。

**求电容 $C$：**

内导体表面 $r=a$ 的自由电荷：
$$
Q = D_{r1}(a) \cdot 4\pi a^2 = \varepsilon_1 E_{r1}(a) \cdot 4\pi a^2 = \frac{\varepsilon_1 I}{\sigma_1}
$$

$$
C = \frac{Q}{V} = \frac{\varepsilon_1 I / \sigma_1}{I/G} = \frac{\varepsilon_1}{\sigma_1} G \tag{23}
$$

也可以直接写：

$$
C = \frac{4\pi \varepsilon_1 a^2 E_{r1}(a)}{V}
$$

##### (2) 各界面上的自由电荷面密度

**$r = a$（内球表面）：**

$\vec{n}$ 从导体指向介质 1：$+\vec{e}_r$，导体内 $\vec{D} = 0$：
$$
\rho_{sf}(a) = D_{r1}(a) = \varepsilon_1 E_{r1}(a)
$$

**$r = c$（介质分界面）：**

$\vec{n}$ 从介质 1 指向介质 2：$+\vec{e}_r$：
$$
\rho_{sf}(c) = D_{r2}(c) - D_{r1}(c) = \varepsilon_2 E_{r2}(c) - \varepsilon_1 E_{r1}(c)
$$

代入 $J_r(c) = I/(4\pi c^2)$ 和 $E_{r1}(c) = J_r(c)/\sigma_1$, $E_{r2}(c) = J_r(c)/\sigma_2$：
$$
\rho_{sf}(c) = \frac{I}{4\pi c^2}\left(\frac{\varepsilon_2}{\sigma_2} - \frac{\varepsilon_1}{\sigma_1}\right)
$$

**$r = b$（外球内表面）：**

$\vec{n}$ 从外导体指向介质 2：$-\vec{e}_r$：
$$
\rho_{sf}(b) = -D_{r2}(b) = -\varepsilon_2 E_{r2}(b)
$$

##### (3) 各介质表面的极化电荷面密度

**$r = a$（介质 1 内表面）：** $\vec{n}_{out} = -\vec{e}_r$：
$$
\rho_{sp1}(a) = \vec{P}_1 \cdot (-\vec{e}_r) = -(\varepsilon_1 - \varepsilon_0)E_{r1}(a)
$$

**$r = c$：**
介质 1 外表面 ($\vec{n}_{out} = +\vec{e}_r$)：$\rho_{sp1}(c) = +(\varepsilon_1 - \varepsilon_0)E_{r1}(c)$
介质 2 内表面 ($\vec{n}_{out} = -\vec{e}_r$)：$\rho_{sp2}(c) = -(\varepsilon_2 - \varepsilon_0)E_{r2}(c)$
总计：$\rho_{sp}(c) = (\varepsilon_1 - \varepsilon_0)E_{r1}(c) - (\varepsilon_2 - \varepsilon_0)E_{r2}(c)$

**$r = b$（介质 2 外表面）：** $\vec{n}_{out} = +\vec{e}_r$：
$$
\rho_{sp2}(b) = +(\varepsilon_2 - \varepsilon_0)E_{r2}(b)
$$

---

### Q2：上下半球各半排列

**几何结构：** 同心球电极 $a$, $b$。两层介质在极角 ($\theta$) 方向各占一半：
- 上半球 ($0 < \theta < \pi/2$)：$\varepsilon_1$, $\sigma_1$
- 下半球 ($\pi/2 < \theta < \pi$)：$\varepsilon_2$, $\sigma_2$

两层都延伸 $a < r < b$。

#### 1. 审题与物理分析

**对称性：** 电极仍是同心的球面 → 电场方向仍是纯径向 $\vec{e}_r$。在 $\theta = \pi/2$ 的赤道面（介质分界面）上，$\vec{E}$ 只有切向分量 $E_\theta = 0$ 和法向分量 $E_r$。$E_r$ 必须连续（切向 $E$ 连续），所以 $E_r$ 在上下半球中**相同**。

这与 Series 2 Q2 的并联情况类似。

#### 2. 逐步求解

##### 求 $\vec{E}$ 和 $I$

$$E_r(r) \text{ 上下相同，与 } \theta \text{ 无关}$$

上下半球电流密度：
- 上 ($0 < \theta < \pi/2$)：$J_1(r) = \sigma_1 E_r(r)$
- 下 ($\pi/2 < \theta < \pi$)：$J_2(r) = \sigma_2 E_r(r)$

总电流：$I = \text{（上半径球面上的积分）} + \text{（下半球面上的积分）}$

上半球面面积 = $2\pi r^2$（半球面），下半球面面积 = $2\pi r^2$：

$$
I = J_1(r) \cdot 2\pi r^2 + J_2(r) \cdot 2\pi r^2 = 2\pi r^2 (\sigma_1 + \sigma_2) E_r(r)
$$

$$
E_r(r) = \frac{I}{2\pi r^2 (\sigma_1 + \sigma_2)} \tag{24}
$$

电压条件：
$$
V = \int_a^b E_r(r) \, dr = \frac{I}{2\pi(\sigma_1+\sigma_2)} \int_a^b \frac{dr}{r^2} = \frac{I}{2\pi(\sigma_1+\sigma_2)} \left(\frac{1}{a} - \frac{1}{b}\right)
$$

$$
I = \frac{2\pi(\sigma_1+\sigma_2)V}{\frac{1}{a} - \frac{1}{b}} \tag{25}
$$

$$
E_r(r) = \frac{V}{r^2\left(\frac{1}{a} - \frac{1}{b}\right)} = \frac{Vab}{(b-a)r^2} \tag{26}
$$

$E_r(r)$ 与均匀介质表达式相同。

##### 求 $\vec{D}$ 和 $\vec{J}$

上：$D_1(r) = \varepsilon_1 E_r(r) = \frac{\varepsilon_1 Vab}{(b-a)r^2}$，$J_1(r) = \frac{\sigma_1 Vab}{(b-a)r^2}$

下：$D_2(r) = \varepsilon_2 E_r(r) = \frac{\varepsilon_2 Vab}{(b-a)r^2}$，$J_2(r) = \frac{\sigma_2 Vab}{(b-a)r^2}$

##### 求 $G$ 和 $C$

$$
G = \frac{I}{V} = \frac{2\pi(\sigma_1+\sigma_2)}{\frac{1}{a} - \frac{1}{b}} = \frac{2\pi(\sigma_1+\sigma_2)ab}{b-a} \tag{27}
$$

相当于两个电导**并联**。

内球表面的自由电荷（上半 + 下半）：
$$
Q = D_1(a) \cdot 2\pi a^2 + D_2(a) \cdot 2\pi a^2 = 2\pi a^2(\varepsilon_1 + \varepsilon_2) \cdot \frac{Vab}{(b-a)a^2} = \frac{2\pi(\varepsilon_1 + \varepsilon_2)Vab}{b-a}
$$

$$
C = \frac{Q}{V} = \frac{2\pi(\varepsilon_1+\varepsilon_2)}{\frac{1}{a} - \frac{1}{b}} = \frac{2\pi(\varepsilon_1+\varepsilon_2)ab}{b-a} \tag{28}
$$

相当于两个电容**并联**。

##### 各界面自由电荷面密度

**$r = a$（内球表面）：**
上半：$\rho_{sf1}(a) = D_1(a) = \frac{\varepsilon_1 V b}{(b-a)a}$
下半：$\rho_{sf2}(a) = D_2(a) = \frac{\varepsilon_2 V b}{(b-a)a}$

**$\theta = \pi/2$ 赤道面（介质分界面）：** 分界面法向为 $\vec{e}_\theta$，$\vec{D}$ 只有 $\vec{e}_r$ 分量 → $D_n = 0$。**无自由面电荷。**

##### 各介质表面极化电荷面密度

$\rho_{sp} = \vec{P} \cdot \vec{n}_{out}$，$\vec{P} = (\varepsilon - \varepsilon_0)\vec{E}$。

电场径向向外：$\vec{E} = E_r(r)\vec{e}_r$，$E_r(r) = \dfrac{Vab}{(b-a)r^2}$。因此：
$\vec{P}_1 = (\varepsilon_1 - \varepsilon_0)E_r(r)\vec{e}_r$，$\vec{P}_2 = (\varepsilon_2 - \varepsilon_0)E_r(r)\vec{e}_r$。

**$r = a$（介质内表面）：** $\vec{n}_{out}$ 从介质指向内球导体，即 $-\vec{e}_r$：
$$
\begin{aligned}
\rho_{sp1}(a) &= \vec{P}_1(a) \cdot (-\vec{e}_r) = -(\varepsilon_1 - \varepsilon_0)E_r(a) = -\frac{(\varepsilon_1 - \varepsilon_0)V b}{(b-a)a} \\
\rho_{sp2}(a) &= -(\varepsilon_2 - \varepsilon_0)E_r(a) = -\frac{(\varepsilon_2 - \varepsilon_0)V b}{(b-a)a}
\end{aligned}
$$

**$r = b$（介质外表面）：** $\vec{n}_{out}$ 从介质指向外球导体，即 $+\vec{e}_r$：
$$
\begin{aligned}
\rho_{sp1}(b) &= +(\varepsilon_1 - \varepsilon_0)E_r(b) = +\frac{(\varepsilon_1 - \varepsilon_0)V a}{(b-a)b} \\
\rho_{sp2}(b) &= +(\varepsilon_2 - \varepsilon_0)E_r(b) = +\frac{(\varepsilon_2 - \varepsilon_0)V a}{(b-a)b}
\end{aligned}
$$

**$\theta = \pi/2$ 分界面：** $\vec{P}$ 无 $\vec{e}_\theta$ 分量，**极化面电荷为零**。

---

## 三大系列横向对比总结

| 几何 | Q序号 | 介质排列 | 等效电路 | $E$ 是否均匀 | $C$ 公式模式 |
|------|-------|---------|---------|-------------|-------------|
| 平行板 | Q1 | 上下叠放 | **串联** | $E_1 \neq E_2$ | $\propto \frac{\sigma_2}{\sigma_1+\sigma_2}$ |
| 平行板 | Q2 | 左右并列 | **并联** | $E_1 = E_2$ | $\propto \varepsilon_1+\varepsilon_2$ |
| 平行板 | Q3,Q4 | 部分填充 | 空气+介质串联 | $E_{air} \neq E_{diel}$ | $\frac{\varepsilon_0\varepsilon S}{\varepsilon(d-t)+\varepsilon_0 t}$ |
| 同轴线 | Q1 | 同轴分层 | **串联** | $E$ 按 $1/r$ | 含 $\sigma_1/\sigma_2$ |
| 同轴线 | Q2 | 半方位角 | **并联** | $E$ 按 $1/r$（同均匀） | $\propto \varepsilon_1+\varepsilon_2$ |
| 同心球 | Q1 | 同心分层 | **串联** | $E$ 按 $1/r^2$ | 含 $\sigma_1/\sigma_2$ |
| 同心球 | Q2 | 上下半球 | **并联** | $E$ 按 $1/r^2$（同均匀） | $\propto \varepsilon_1+\varepsilon_2$ |

**核心规律：**

1. **分界面法向与 $\vec{E}$ 平行（介质沿电场方向堆叠）→ 串联。** $J$ 连续，$E$ 不连续。$C$ 和 $G$ 用串联公式。
2. **分界面法向与 $\vec{E}$ 垂直（介质并排）→ 并联。** $E$ 连续，$J$ 不连续。$C$ 和 $G$ 用并联公式。
3. **判断方法：** 电流从正电极到负电极——必须先后经过两种介质 → 串联；可选择走哪种介质 → 并联。
4. **$G/C = \sigma/\varepsilon$：** 均匀介质中成立。多层介质中每层内部成立，但全局关系因 $E$ 分配不同而更复杂。在并联情形下，$E$ 分布由几何决定，$C$ 不依赖于 $\sigma$。

---

## 考试技巧速记

### 拿到题的 5 秒判断法

1. **看几何** → 选坐标系（平板→直角，同轴→圆柱，同心球→球）
2. **看 $\sigma$** → $\sigma \neq 0$ 且有外加电压 → 从 $\vec{J}$ 入手；$\sigma = 0$ → 从 $\vec{D}$ 入手
3. **看分界面方向** → 分界面法向与 $\vec{E}$ 平行（即界面垂直于 $\vec{E}$，介质沿场方向堆叠）→ 串联；分界面法向与 $\vec{E}$ 垂直（即界面平行于 $\vec{E}$，介质并排）→ 并联
4. **看电源状态** → 连电源 → $U$ 固定；断电源 → $Q$ 固定

### 易错点清单（考试前过一遍）

- [ ] 圆柱坐标的散度中 $(1/r)\partial(rD_r)/\partial r$，不要漏掉 $1/r$
- [ ] 球坐标的散度中 $(1/r^2)\partial(r^2 D_r)/\partial r$，不要漏掉 $1/r^2$
- [ ] 同轴线的 $C_0$ 和 $G_0$ 是**单位长度**的值，不是总的值
- [ ] 断电后 $Q$ 不变（不是 $U$ 不变），接入电源时 $U$ 不变
- [ ] 极化电荷的符号：$\rho_{sp} = \vec{P} \cdot \vec{n}_{out}$，一定要写 $\vec{n}_{out}$
- [ ] 有耗介质分界面处 $D$ 一般不连续（有界面自由电荷），$J$ 连续
- [ ] 球面面积 $4\pi r^2$，半球面积 $2\pi r^2$，柱面面积（侧面）$2\pi r L$
- [ ] $\int \frac{dr}{r} = \ln r$（同轴线），$\int \frac{dr}{r^2} = -\frac{1}{r}$（同心球）
