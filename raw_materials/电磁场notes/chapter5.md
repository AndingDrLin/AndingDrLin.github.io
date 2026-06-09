# 第5章：恒定电流 (Steady Electric Currents)

## 1. 引言

恒定电流场中，电荷匀速运动，但每一点的 $\rho$ 和 $\bm{J}$ 不随时间变化（$\partial/\partial t = 0$）。与静电场的关键区别：有限电导率导体内部 $\bm{E} \neq \bm{0}$（需要电场推动电荷），导体不一定是等势体。电源外部区域仍满足 $\nabla^2\varphi = 0$，可复用第4章解法。能量从"储存"变为"耗散"。

---

## 2. 电流密度与欧姆定律

### 2.1 电流密度 $\bm{J}$

载流子密度 $N$，电量 $q$，平均漂移速度 $\bm{u}$：

$$\boxed{\bm{J} = N q \bm{u}}$$

单位：$\text{A/m}^2$。$\bm{J}$ 的方向定义为**正电荷运动方向**——电子带负电时 $\bm{J}$ 与电子运动方向相反。

电流 $I$ 是 $\bm{J}$ 穿过截面 $S$ 的通量：

$$\boxed{I = \int_S \bm{J} \cdot d\bm{S}}$$

三种分布模型：

| | 体电流 | 面电流 | 线电流 |
|---|---|---|---|
| 符号 | $\bm{J}$ | $\bm{J}_s$ | $I$ |
| 单位 | $\text{A/m}^2$ | $\text{A/m}$ | $\text{A}$ |
| 关系 | $I = \int_S \bm{J}\cdot d\bm{S}$ | $I = \int_L (\bm{J}_s \times \bm{e}_n)\cdot d\bm{l}$ | 理想细导线 |

### 2.2 欧姆定律（点形式）

$$\boxed{\bm{J} = \sigma \bm{E}}$$

$\sigma$：电导率（S/m）。适用于线性各向同性传导电流。**运流电流（$\bm{J} = \rho \bm{v}$）不服从欧姆定律。**

微观解释：金属中电子漂移速度 $\bm{u} = -\mu_e \bm{E}$（$\mu_e$ 为迁移率），代入 $\bm{J} = N(-e)\bm{u}$ 得 $\sigma = N e \mu_e$。

### 2.3 PEC 与 PED

- **PEC（理想导体）**：$\sigma \to \infty$，内部不能存在恒定 $\bm{E}$（否则 $\bm{J} \to \infty$）。
- **PED（理想绝缘体）**：$\sigma \to 0$，无传导电流。

常见电导率（S/m）：铜 $5.8\times10^7$ > 海水 $4$ > 纯水 $10^{-3}$ > 干土 $10^{-5}$ > 玻璃 $10^{-12}$ > 橡胶 $10^{-15}$。

> ⚠️ **坑**：静电场中导体内部 $\bm{E} = 0$；恒定电流场中有限 $\sigma$ 导体内部 $\bm{E} \neq 0$（$\bm{E} = \bm{J}/\sigma$）。

---

## 3. 连续性方程与恒定电流场基本方程

### 3.1 连续性方程（电荷守恒）

流出闭合面的净电流 = 内部电荷减少率：

$$\oint_S \bm{J} \cdot d\bm{S} = -\frac{\partial}{\partial t} \int_V \rho \, dV$$

散度定理 $\to$ 微分形式：

$$\boxed{\nabla \cdot \bm{J} = -\frac{\partial \rho}{\partial t}}$$

### 3.2 恒定条件

恒定 $\partial\rho/\partial t = 0$，代入得：

$$\boxed{\nabla \cdot \bm{J} = 0}, \quad \boxed{\oint_S \bm{J} \cdot d\bm{S} = 0}$$

$\bm{J}$ 线无起点无终点，形成闭合回路。积分形式 $\Leftrightarrow$ **KCL**：$\sum_j I_j = 0$。

### 3.3 保守性（KVL）

恒定电流场中积累电荷的库仑电场仍为保守场：

$$\boxed{\nabla \times \bm{E} = 0}, \quad \boxed{\oint_l \bm{E} \cdot d\bm{l} = 0} \;\Leftrightarrow\; \text{KVL}$$

均匀导电介质中：$\nabla \times \bm{J} = \nabla \times (\sigma\bm{E}) = \sigma(\nabla \times \bm{E}) = 0$，即 $\bm{J}$ 既无散又无旋。

### 3.4 电势方程

由 $\bm{E} = -\nabla\varphi$ 和 $\nabla \cdot \bm{J} = \nabla \cdot (\sigma\bm{E}) = 0$，均匀介质中：

$$\boxed{\nabla^2 \varphi = 0}$$

恒定电流场满足拉普拉斯方程，与无源静电场完全相同——可复用第4章所有解法（镜像法、分离变量法等）。

> ⚠️ **坑**：$\nabla \cdot \bm{J} = 0$ 和 $\nabla \cdot \bm{D} = \rho$ 是两套独立方程！前者描述电流守恒，后者描述电场有源。恒定电流场中两者同时成立，不要混淆。

---

## 4. 焦耳定律

功率耗散密度（$\text{W/m}^3$）：

$$\boxed{p = \bm{E} \cdot \bm{J} = \sigma E^2 = \frac{J^2}{\sigma}}$$

总功率：$P = \int_V \bm{E} \cdot \bm{J} \, dV$。对均匀截面直流导体退化为大家熟悉的形式：

$$\boxed{P = VI = I^2 R}$$

> ⚠️ **坑**：静电场储存能量（$w_e = \frac{1}{2}\varepsilon E^2$），恒定电流场耗散能量。两种能量形式在含损耗介质问题中**同时存在**。

---

## 5. 边界条件与电流折射

### 5.1 两个基本边界条件

两种导电介质（$\sigma_1 \neq 0$，$\sigma_2 \neq 0$）界面上：

**(1) $\bm{J}$ 法向连续** —— 由 $\nabla \cdot \bm{J} = 0$，在界面上取扁圆柱高斯面：

$$\boxed{J_{1n} = J_{2n}} \quad \Rightarrow \quad \sigma_1 E_{1n} = \sigma_2 E_{2n}$$

**(2) $\bm{E}$ 切向连续** —— 由 $\nabla \times \bm{E} = 0$，在界面上取窄矩形回路：

$$\boxed{E_{1t} = E_{2t}}$$

### 5.2 电流折射

由 $\tan\theta_i = E_{it}/E_{in} = E_{it}/(J_{in}/\sigma_i)$ 及上述边界条件：

$$\boxed{\frac{\tan\theta_1}{\tan\theta_2} = \frac{\sigma_1}{\sigma_2}}$$

$\theta_1, \theta_2$ 分别是 $\bm{J}$（或 $\bm{E}$）与界面法线的夹角。

- $\sigma_2 \gg \sigma_1$：$\theta_2 \to 0$，电流进入良导体后近似**垂直于界面**。
- $\sigma_2 \ll \sigma_1$：$\theta_2 \to \pi/2$，电流进入不良导体后近似**平行于界面**。

### 5.3 自由面电荷

$\bm{D}$ 的法向边界条件**同时独立成立**：

$$\boxed{D_{1n} - D_{2n} = \rho_S} \quad \Rightarrow \quad \boxed{\rho_S = \varepsilon_1 E_{1n} - \varepsilon_2 E_{2n}}$$

代入 $E_{2n} = (\sigma_1/\sigma_2)E_{1n}$：

$$\rho_S = \left(\varepsilon_1 - \varepsilon_2\frac{\sigma_1}{\sigma_2}\right)E_{1n} = \frac{\varepsilon_1\sigma_2 - \varepsilon_2\sigma_1}{\sigma_2}E_{1n}$$

界面自由电荷一般为非零，除非 $\varepsilon_1/\sigma_1 = \varepsilon_2/\sigma_2$（弛豫时间相等）。

### 5.4 电势形式边界条件

$$\boxed{\varphi_1 = \varphi_2}, \quad \boxed{\sigma_1 \frac{\partial \varphi_1}{\partial n} = \sigma_2 \frac{\partial \varphi_2}{\partial n}}$$

### 5.5 介质-导体界面（特殊情况）

介质（$\sigma=0$）与导体（$\sigma\neq0$）界面：$J_{1n} = 0 = J_{2n}$（导体中无垂直表面的电流分量），$D_{1n} = \rho_S$。

> ⚠️ **坑**：$\bm{D}$ 的边界条件是 $D_{1n} - D_{2n} = \rho_S$（有面电荷时可**不连续**）；$\bm{J}$ 的边界条件是 $J_{1n} = J_{2n}$（恒定条件下**永远连续**）。考试最喜欢用这个区别出题。

---

## 6. 电阻计算与静电比拟

### 6.1 三种计算方法

**方法一（设电流法）**：假设 $I$ $\to$ 利用对称性写出 $\bm{J}$ 分布 $\to$ $\bm{E} = \bm{J}/\sigma$ $\to$ $U = \int \bm{E} \cdot d\bm{l}$ $\to$ $R = U/I$。

适用条件：结构有足够对称性，能仅凭 $I$ 和几何参数写出 $\bm{J}$ 的空间分布（同轴径向、同心球径向、均匀截面轴向等一维问题）。

**方法二（设电压法）**：假设 $U$ $\to$ 解 $\nabla^2\varphi = 0$ 得 $\varphi$ $\to$ $\bm{E} = -\nabla\varphi$ $\to$ $\bm{J} = \sigma\bm{E}$ $\to$ $I = \int \bm{J} \cdot d\bm{S}$ $\to$ $R = U/I$。

适用条件：对称性不足以直接写 $\bm{J}$，需先解电势分布（扇形导电片、复杂几何等）。

**方法三（静电比拟法）**：已知相同电极结构的电容 $C$，直接翻译：

$$\boxed{G = \frac{\sigma}{\varepsilon} C}, \quad \boxed{R = \frac{\varepsilon}{\sigma} \cdot \frac{1}{C}}$$

### 6.2 静电比拟对照表

无源区域（$\rho=0$ 或电源外部）中两组方程完全对应：

| 静电场 | 恒定电流场 | 对应关系 |
|---|---|---|
| $\nabla \cdot \bm{D} = 0$ | $\nabla \cdot \bm{J} = 0$ | $\bm{D} \leftrightarrow \bm{J}$ |
| $\nabla \times \bm{E} = 0$ | $\nabla \times \bm{E} = 0$ | $\bm{E} \leftrightarrow \bm{E}$（相同） |
| $\bm{D} = \varepsilon \bm{E}$ | $\bm{J} = \sigma \bm{E}$ | $\varepsilon \leftrightarrow \sigma$ |
| $Q = \oint \bm{D} \cdot d\bm{S}$ | $I = \oint \bm{J} \cdot d\bm{S}$ | $Q \leftrightarrow I$ |
| $C = Q/U$ | $G = I/U$ | $C \leftrightarrow G$ |
| 电势边界：$\varepsilon_1\frac{\partial\varphi_1}{\partial n} = \varepsilon_2\frac{\partial\varphi_2}{\partial n}$ | $\sigma_1\frac{\partial\varphi_1}{\partial n} = \sigma_2\frac{\partial\varphi_2}{\partial n}$ | 形式相同，$\varepsilon\to\sigma$ |

比值的物理来源：$I = \oint \bm{J}\cdot d\bm{S} = \frac{\sigma}{\varepsilon}\oint \varepsilon\bm{E}\cdot d\bm{S} = \frac{\sigma}{\varepsilon}\oint \bm{D}\cdot d\bm{S} = \frac{\sigma}{\varepsilon}Q$，同除 $U$ 即得 $G = \frac{\sigma}{\varepsilon}C$。

> ⚠️ **坑**：设电流和设电压不能混用（过约束）。选一种路径走到底。静电比拟法注意并非 $q \leftrightarrow I$ 的简单替换——是 $Q/U$ 和 $I/U$ 的比值对应。

---

## 7. 重点例题

### 例1：含两种损耗介质的同轴电缆（考试格式）

内导体半径 $a$，电压 $V_0$；外导体半径 $c$，接地。两种介质：
- 介质1（$\sigma_1, \varepsilon_1$）：$a < \rho < b$
- 介质2（$\sigma_2, \varepsilon_2$）：$b < \rho < c$

设单位长度轴向电流为 $I_l$（A/m）。

---

**(a) 各界面的边界条件**

**介质界面（$\rho = b$）**：
- 法向 $\bm{J}$：$J_{1n} = J_{2n}$，即 $J_1(\rho=b) = J_2(\rho=b)$。电流纯径向分布，此条件给出电流连续性。
- 切向 $\bm{E}$：$E_{1t} = E_{2t}$。电场纯径向，切向分量均为零，自动满足。

**内导体表面（$\rho = a$）**：
- 导体视为 PEC（$\bm{E} = 0$ 内部）。
- 法向 $\bm{D}$：$D_{1n} - 0 = \rho_{Sa}$，即 $\varepsilon_1 E_{1\rho}(a) = \rho_{Sa}$。

**外导体表面（$\rho = c$）**：
- 法向 $\bm{D}$：$0 - D_{2n} = \rho_{Sc}$（注意法向从介质指向导体），即 $-\varepsilon_2 E_{2\rho}(c) = \rho_{Sc}$。

---

**(b) 电场分布**

柱对称 $\to$ $\bm{J} = J_\rho(\rho) \,\bm{e}_\rho$。由 $\nabla \cdot \bm{J} = 0$：

$$\frac{1}{\rho}\frac{\partial}{\partial \rho}(\rho J_\rho) = 0 \;\Rightarrow\; \rho J_\rho = \text{const}$$

设单位长度电流 $I_l$，$I_l = J_\rho \cdot 2\pi\rho$，故：

$$\boxed{\bm{J} = \bm{e}_\rho \frac{I_l}{2\pi\rho} \quad (a < \rho < c)}$$

各区域电场：

$$\boxed{\bm{E}_1 = \frac{\bm{J}}{\sigma_1} = \bm{e}_\rho \frac{I_l}{2\pi\sigma_1\rho} \quad (a < \rho < b)}$$

$$\boxed{\bm{E}_2 = \frac{\bm{J}}{\sigma_2} = \bm{e}_\rho \frac{I_l}{2\pi\sigma_2\rho} \quad (b < \rho < c)}$$

电压条件确定 $I_l$：

$$V_0 = \int_a^b E_1 d\rho + \int_b^c E_2 d\rho = \frac{I_l}{2\pi\sigma_1}\ln\frac{b}{a} + \frac{I_l}{2\pi\sigma_2}\ln\frac{c}{b}$$

$$\boxed{I_l = \frac{2\pi V_0}{\frac{1}{\sigma_1}\ln\frac{b}{a} + \frac{1}{\sigma_2}\ln\frac{c}{b}} = \frac{2\pi\sigma_1\sigma_2 V_0}{\sigma_2\ln(b/a) + \sigma_1\ln(c/b)}}$$

回代得 $\bm{E}_1, \bm{E}_2$ 用 $V_0$ 表达的最终形式（考试可直接写此结果）：

$$\boxed{\bm{E}_1 = \bm{e}_\rho \frac{\sigma_2 V_0}{\rho\left[\sigma_2\ln(b/a) + \sigma_1\ln(c/b)\right]}, \quad \bm{E}_2 = \bm{e}_\rho \frac{\sigma_1 V_0}{\rho\left[\sigma_2\ln(b/a) + \sigma_1\ln(c/b)\right]}}$$

---

**(c) 单位长度电阻**

$$R_{\text{unit}} = \frac{V_0}{I_l} = \frac{1}{2\pi\sigma_1}\ln\frac{b}{a} + \frac{1}{2\pi\sigma_2}\ln\frac{c}{b}$$

$$\boxed{R_{\text{unit}} = \frac{1}{2\pi}\left[\frac{\ln(b/a)}{\sigma_1} + \frac{\ln(c/b)}{\sigma_2}\right] \quad (\Omega \cdot \text{m})}$$

物理理解：两段圆柱形电阻器串联。当 $\sigma_1 = \sigma_2 = \sigma$ 时退化为单介质公式 $R_{\text{unit}} = \frac{\ln(c/a)}{2\pi\sigma}$。

---

**(d) 各界面的自由面电荷**

将 $I_l$ 表达式代入 $\rho_S = D_{1n} - D_{2n}$：

**内导体表面（$\rho = a$）**：
$$\boxed{\rho_{Sa} = \frac{\varepsilon_1\sigma_2 V_0}{a\left[\sigma_2\ln(b/a) + \sigma_1\ln(c/b)\right]}}$$

**介质界面（$\rho = b$）**：
$$\boxed{\rho_{Sb} = \frac{(\varepsilon_2\sigma_1 - \varepsilon_1\sigma_2)V_0}{b\left[\sigma_2\ln(b/a) + \sigma_1\ln(c/b)\right]}}$$

**外导体表面（$\rho = c$）**：
$$\boxed{\rho_{Sc} = -\frac{\varepsilon_2\sigma_1 V_0}{c\left[\sigma_2\ln(b/a) + \sigma_1\ln(c/b)\right]}}$$

> ⚠️ **关键结论**：介质界面 $\rho_{Sb} \neq 0$（除非 $\varepsilon_1\sigma_2 = \varepsilon_2\sigma_1$）。这是纯静电场中没有的——恒定电流场即使在两种介质界面上也可积累自由电荷。物理原因：$\bm{J}$ 法向连续条件 $\neq$ $\bm{D}$ 法向连续条件，两者同时作用导致面电荷。

---

### 例2：含两种不完美介质的平行板电容器

极板面积 $A$，介质1（$\varepsilon_1, \sigma_1, d_1$）和介质2（$\varepsilon_2, \sigma_2, d_2$）串联，外加电压 $U$。

$\bm{J}$ 垂直于极板均匀分布：$J_1 = J_2 = J$。

由 $\bm{J} = \sigma\bm{E}$：$\sigma_1 E_1 = \sigma_2 E_2$ (1)

电压叠加：$E_1 d_1 + E_2 d_2 = U$ (2)

联立解出：

$$\boxed{E_1 = \frac{\sigma_2 U}{\sigma_2 d_1 + \sigma_1 d_2}, \quad E_2 = \frac{\sigma_1 U}{\sigma_2 d_1 + \sigma_1 d_2}}$$

介质界面自由面电荷：

$$\boxed{\rho_S = \varepsilon_1 E_1 - \varepsilon_2 E_2 = \frac{\sigma_2\varepsilon_1 - \sigma_1\varepsilon_2}{\sigma_2 d_1 + \sigma_1 d_2}\,U}$$

单位体积功率耗散：$p_1 = \sigma_1 E_1^2$，$p_2 = \sigma_2 E_2^2$。单位体积电能：$w_{e1} = \frac{1}{2}\varepsilon_1 E_1^2$，$w_{e2} = \frac{1}{2}\varepsilon_2 E_2^2$。两者同时存在。

总电阻：$R = U/I$，其中 $I = JA = \sigma_1 E_1 A$。

> ⚠️ **若 $\sigma_1 = \sigma_2 = 0$**（纯静电场），基本方程从 $\nabla\cdot\bm{J}=0$ 变为 $\nabla\cdot\bm{D}=0$，法向条件变为 $D_{1n} = D_{2n}$（$\varepsilon_1 E_1 = \varepsilon_2 E_2$）。解法和结果**完全不同**——考试选择题喜欢考这个区分。

---

## 8. 自测题

**1. 电流密度计算**
铜导线 $N = 8.5 \times 10^{28} \text{ m}^{-3}$，电子电量 $e = 1.6 \times 10^{-19} \text{ C}$，漂移速度 $u = 2 \times 10^{-4} \text{ m/s}$。求 $|\bm{J}|$，并说明 $\bm{J}$ 的方向。

答：$J = Ne u = 8.5 \times 10^{28} \times 1.6 \times 10^{-19} \times 2 \times 10^{-4} = 2.72 \times 10^6 \text{ A/m}^2$。电子带负电，$\bm{J}$ 与电子运动方向相反（定义为正电荷方向）。

---

**2. 连续性方程验证**
已知 $\rho = \rho_0 e^{-t/\tau}$，$\bm{J} = \bm{e}_x \frac{\rho_0 x}{\tau} e^{-t/\tau}$。验证 $\nabla \cdot \bm{J} = -\partial\rho/\partial t$ 是否成立。此场是否恒定？

答：$\nabla \cdot \bm{J} = \partial J_x/\partial x = \frac{\rho_0}{\tau} e^{-t/\tau}$；$-\partial\rho/\partial t = \frac{\rho_0}{\tau} e^{-t/\tau}$。方程成立 ✓。但 $\partial\rho/\partial t \neq 0$，不是恒定场。

---

**3. 边界条件与折射**
界面 $\sigma_1 = 10^7 \text{ S/m}$，$\sigma_2 = 10^4 \text{ S/m}$。介质1中 $E_1 = 100 \text{ V/m}$，与法向夹角 $30^\circ$。求 $E_2$ 的大小及折射角 $\theta_2$，解释物理含义。

答：$E_{1t} = 50$, $E_{1n} = 86.6 \text{ V/m}$。$E_{2t} = E_{1t} = 50$；$E_{2n} = \frac{\sigma_1}{\sigma_2}E_{1n} = 1000 \times 86.6 = 86600 \text{ V/m}$。$E_2 \approx 86600$, $\theta_2 = \arctan(50/86600) \approx 0.033^\circ$。电流进入低 $\sigma$ 介质后几乎垂直界面——法向电场被放大，切向不变。

---

**4. 静电比拟法**
已知同轴电缆单位长度电容 $C = 2\pi\varepsilon/\ln(b/a)$。用静电比拟求单位长度电导和电阻。

答：$G = \frac{\sigma}{\varepsilon}C = \frac{2\pi\sigma}{\ln(b/a)}$，$R = 1/G = \frac{\ln(b/a)}{2\pi\sigma}$ ✓

---

**5. 同轴电缆两层介质——电阻**
$a = 1 \text{ mm}$, $b = 3 \text{ mm}$, $c = 5 \text{ mm}$, $\sigma_1 = 10^{-6} \text{ S/m}$, $\sigma_2 = 10^{-8} \text{ S/m}$。求单位长度电阻。

答：$\ln(b/a) = \ln 3 \approx 1.099$，$\ln(c/b) = \ln(5/3) \approx 0.511$。
$R_{\text{unit}} = \frac{1}{2\pi}\left[\frac{1.099}{10^{-6}} + \frac{0.511}{10^{-8}}\right] = \frac{1}{2\pi}(1.099\times10^6 + 5.11\times10^7) \approx 8.31 \times 10^6 \text{ }\Omega\cdot\text{m}$。第二层（$\sigma_2$ 更小）贡献了绝大部分电阻。

---

**6. 界面自由电荷**
同轴电缆两种介质，若 $\varepsilon_1/\sigma_1 = \varepsilon_2/\sigma_2$，介质界面 $\rho_S = ?$

答：$\rho_S = \frac{(\varepsilon_2\sigma_1 - \varepsilon_1\sigma_2)}{\cdots} = 0$。弛豫时间 $\tau = \varepsilon/\sigma$ 相等时无自由电荷积累。这等价于 $\varepsilon_1\sigma_2 = \varepsilon_2\sigma_1$。
