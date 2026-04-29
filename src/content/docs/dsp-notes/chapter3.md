---
title: "第3章 离散时间信号频域分析"
description: "数字信号处理第3章：离散时间信号的频域表示与变换。"
date: 2026-04-30
tags: [dsp, signal-processing]
category: "课程复习"
docGroup: "dsp-notes"
order: 3
draft: false
---
# 第 3 章：离散时间信号的频域分析

## 0. 本章学习目标

学完本章后，你应该能够：

- 理解离散时间傅里叶变换（DTFT）的定义，并能计算简单序列的 DTFT
- 说出 DTFT 与连续时间傅里叶变换（CTFT）的关键区别：DTFT 在频域是周期的（周期 $2\pi$）
- 利用 DTFT 的对称性质简化实序列的频谱分析
- 使用 DTFT 定理（线性、时移、频移、卷积、微分等）计算复杂序列的 DTFT
- 理解采样的频域效果：时域离散化导致频域周期化
- 解释奈奎斯特采样定理，判断给定采样频率是否会导致混叠
- 理解从采样信号中恢复原始连续信号的条件和方法
- 理解带通信号的欠采样原理

## 1. 先用人话理解本章在讲什么

### 1.1 本章要解决什么问题

第二章我们学习了怎么在**时域**表示离散时间信号（用加权延迟的单位采样序列的线性组合）。但时域表示有一个大问题：你盯着 $x[n] = \{1, 0.5, -0.3, \ldots\}$ 看半天，看不出来这个信号是"低频"还是"高频"，也看不出来它的能量主要集中在哪个频率范围。

**频域分析**正是为了解决这个问题。它让我们换一个角度看信号：不再问"在时刻 n 信号值是多少"，而是问"信号里包含了哪些频率成分，每个频率成分的强度和相位是多少"。

### 1.2 这一章在 DSP 中的位置

本章是连接"连续时间信号处理"和"数字信号处理"的桥梁：

- **前半章（3.1-3.7）**：定义离散时间傅里叶变换（DTFT），并建立一套完整的频域分析工具。
- **后半章（3.8-3.9）**：回答一个根本问题——我们把连续信号采样成离散序列，然后在数字计算机里处理，最后还能不能恢复出原来的连续信号？如果能，需要什么条件？

### 1.3 和前一章的关系

第二章在时域分析离散信号（序列的表示、基本运算、卷积），本章把时域概念搬到频域。你会看到时域的卷积对应频域的乘法——这是 DSP 中最重要的关系之一。

### 1.4 初学者最容易卡在哪里

1. **角频率的三种表示容易混淆**：模拟角频率 $\Omega$（rad/s）、数字角频率 $\omega$（rad/sample）、以及归一化频率 $\omega/\pi$。
2. **DTFT 是 $\omega$ 的周期函数**：周期为 $2\pi$，这和 CTFT 完全不同。很多初学者忘了这一点，在画频谱时只画了 $[-\pi, \pi]$ 却不知道外面还在重复。
3. **采样时频率轴的缩放关系**：$\omega = \Omega T$，这个简单公式贯穿整个采样理论。
4. **混叠的本质**：不是"采样不够快所以信号质量差"，而是不同频率的连续信号在采样后变成完全相同的离散序列，无法区分。

## 2. 核心概念

### 2.1 信号表示：时域 vs 频域

**一句话理解：**
时域告诉我们信号每一时刻的取值；频域告诉我们信号由哪些"基本频率成分"组成。

**正式定义（课件第 3 页）：**
- 时域表示：$x[n] = \sum_{k=-\infty}^{\infty} a_k \delta[n-k]$（单位采样序列的加权线性组合）
- 频域表示：用复指数序列 $\{e^{-j\omega n}\}$ 来描述序列

**直观例子：**
一段音乐录音，时域看是幅度随时间变化的波形；频域看是各个音高（频率）上的能量分布。两者描述同一个东西，但视角不同。

### 2.2 连续时间傅里叶变换（CTFT）回顾

**一句话理解：**
CTFT 把时间连续、非周期的信号变成频率连续、非周期的频谱。

**正式定义：**
$$
X_a(j\Omega) = \int_{-\infty}^{\infty} x_a(t) e^{-j\Omega t} dt
$$

逆变换：
$$
x_a(t) = \frac{1}{2\pi} \int_{-\infty}^{\infty} X_a(j\Omega) e^{j\Omega t} d\Omega
$$

其中：
- $x_a(t)$：连续时间信号（下标 $a$ 表示 analog）
- $\Omega$：模拟角频率，单位 rad/s
- $X_a(j\Omega)$：复数频谱，通常包含幅度谱和相位谱

**幅度谱和相位谱：**
$X_a(j\Omega)$ 一般是复数，可以写成：
- 直角形式：$X_a(j\Omega) = \text{Re}\{X_a(j\Omega)\} + j \cdot \text{Im}\{X_a(j\Omega)\}$
- 极形式：$X_a(j\Omega) = |X_a(j\Omega)| e^{j\theta_a(\Omega)}$
  - $|X_a(j\Omega)|$：幅度谱（magnitude spectrum）
  - $\theta_a(\Omega) = \arg\{X_a(j\Omega)\}$：相位谱（phase spectrum）

**CTFT 存在的条件（Dirichlet 条件）：**
1. 在任意有限区间内，只有有限个间断点和有限个极大/极小值
2. 信号绝对可积：$\int_{-\infty}^{\infty} |x_a(t)| dt < \infty$
3. 一个更宽松的条件（有限能量）：$\int_{-\infty}^{\infty} |x_a(t)|^2 dt < \infty$

**容易混淆的点：**
CTFT 和 FS（傅里叶级数）不同。CTFT 处理的是非周期连续信号（时域连续非周期 $\leftrightarrow$ 频域连续非周期），FS 处理的是周期连续信号（时域连续周期 $\leftrightarrow$ 频域离散非周期）。

### 2.3 CTFT 实例回顾

**例 1：单边指数衰减信号**

$$
x_a(t) = \begin{cases} e^{-\alpha t}, & t \geq 0 \\ 0, & t < 0 \end{cases}
$$

CTFT：
$$
X_a(j\Omega) = \int_{0}^{\infty} e^{-\alpha t} e^{-j\Omega t} dt = \frac{1}{\alpha + j\Omega}
$$

幅度谱：$|X_a(j\Omega)| = \frac{1}{\sqrt{\alpha^2 + \Omega^2}}$

相位谱：$\theta(\Omega) = -\tan^{-1}(\Omega/\alpha)$

**补充理解：** 幅度谱在 $\Omega = 0$ 处最大（$1/\alpha$），随着 $|\Omega|$ 增大而衰减，说明这个信号主要是低频成分。

**例 2：单位冲激 $\delta(t)$**

$\Delta(j\Omega) = \int_{-\infty}^{\infty} \delta(t) e^{-j\Omega t} dt = 1$

冲激信号的频谱是常数 1，意味着所有频率成分强度相同。

**例 3：正弦和余弦信号**

- $F[\cos \omega_0 t] = \pi[\delta(\omega + \omega_0) + \delta(\omega - \omega_0)]$
- $F[\sin \omega_0 t] = j\pi[\delta(\omega + \omega_0) - \delta(\omega - \omega_0)]$

纯正弦/余弦信号的频谱只在 $\pm\omega_0$ 处有冲激，这是"单一频率"在频域的体现。

**例 4：Parseval 定理**

信号的总能量既可以在时域算，也可以在频域算：
$$
\varepsilon_x = \int_{-\infty}^{\infty} |x_a(t)|^2 dt = \frac{1}{2\pi} \int_{-\infty}^{\infty} |X_a(j\Omega)|^2 d\Omega
$$

能量密度谱：$S_{xx}(\Omega) = |X_a(j\Omega)|^2$

### 2.4 离散时间傅里叶变换（DTFT）定义

**一句话理解：**
DTFT 是"离散时间信号"的傅里叶变换——输入是离散的序列 $x[n]$，输出是频率 $\omega$ 的连续、周期函数。

**正式定义：**

正变换：
$$
X(e^{j\omega}) = \sum_{n=-\infty}^{\infty} x[n] e^{-j\omega n}
$$

逆变换（IDTFT）：
$$
x[n] = \frac{1}{2\pi} \int_{-\pi}^{\pi} X(e^{j\omega}) e^{j\omega n} d\omega
$$

其中：
- $x[n]$：离散时间序列，$n$ 是整数序号
- $\omega$：数字角频率，单位是 rad/sample（弧度/采样点）
- $X(e^{j\omega})$：DTFT，是 $\omega$ 的复函数
- 求和范围 $(-\infty, \infty)$：理论上可以是无限长序列
- 积分范围 $[-\pi, \pi]$：只在一个周期内积分

**这个公式在干什么：**
DTFT 本质上是在问：序列 $x[n]$ 和不同频率的复指数信号 $e^{-j\omega n}$ 有多"像"（内积）。如果某个频率 $\omega_0$ 的复指数和 $x[n]$ 很匹配，$X(e^{j\omega_0})$ 的值就大。

**DTFT 的关键性质——频域周期性：**

$$
X(e^{j(\omega + 2\pi k)}) = X(e^{j\omega}), \quad k \in \mathbb{Z}
$$

证明思路：因为 $e^{-j(\omega + 2\pi k)n} = e^{-j\omega n} \cdot e^{-j 2\pi k n}$，而对整数 $k, n$，$e^{-j 2\pi k n} = 1$。

**为什么 DTFT 在频域是周期的？**
本质原因是：输入 $x[n]$ 只在整数 $n$ 处有定义。对离散时间信号来说，频率 $\omega$ 和 $\omega + 2\pi$ 的复指数序列是完全一样的（因为 $e^{j(\omega + 2\pi)n} = e^{j\omega n}$ 对整数 $n$ 成立）。所以 DTFT 每 $2\pi$ 重复一次。

**DTFT 与 CTFT 的对比：**

| 特性 | CTFT | DTFT |
|------|------|------|
| 输入信号 | 连续时间 $x_a(t)$ | 离散时间 $x[n]$ |
| 频率变量 | $\Omega$ (rad/s) | $\omega$ (rad/sample) |
| 频域特性 | 非周期 | 周期 $2\pi$ |
| 变换方式 | 积分 | 求和 |
| 逆变换 | 积分 | 积分（一个周期内） |

**DTFT 作为傅里叶级数：**
从频域周期性可以看出，$X(e^{j\omega})$ 可以看作傅里叶级数，其中傅里叶系数正是 $x[n]$。这和 DTFT 逆变换 $\frac{1}{2\pi}\int_{-\pi}^{\pi}$ 提取系数的形式一致。

### 2.5 DTFT 的基本形式

**一句话理解：**
DTFT 是复数，可以用直角坐标或极坐标表示。

**直角形式：**
$$
X(e^{j\omega}) = X_{re}(e^{j\omega}) + j X_{im}(e^{j\omega})
$$

其中：
$$
X_{re}(e^{j\omega}) = \frac{1}{2}[X(e^{j\omega}) + X^*(e^{j\omega})]
$$
$$
X_{im}(e^{j\omega}) = \frac{1}{2j}[X(e^{j\omega}) - X^*(e^{j\omega})]
$$

**极形式：**
$$
X(e^{j\omega}) = |X(e^{j\omega})| e^{j\theta(\omega)}
$$

其中：
- $|X(e^{j\omega})|$：幅度函数（magnitude function）
- $\theta(\omega) = \arg\{X(e^{j\omega})\}$：相位函数（phase function）

**两种表示的转换关系：**
- $X_{re}(e^{j\omega}) = |X(e^{j\omega})| \cos \theta(\omega)$
- $X_{im}(e^{j\omega}) = |X(e^{j\omega})| \sin \theta(\omega)$
- $|X(e^{j\omega})|^2 = X_{re}^2(e^{j\omega}) + X_{im}^2(e^{j\omega})$
- $\tan \theta(\omega) = X_{im}(e^{j\omega}) / X_{re}(e^{j\omega})$

**实序列的重要性：**
对于实序列 $x[n]$（实际物理信号基本都是实序列），$|X(e^{j\omega})|$ 和 $X_{re}(e^{j\omega})$ 是 $\omega$ 的偶函数，$\theta(\omega)$ 和 $X_{im}(e^{j\omega})$ 是 $\omega$ 的奇函数。

### 2.6 DTFT 的相位：缠绕相位与解缠绕

**一句话理解：**
相位被限制在 $[-\pi, \pi]$ 内会产生不连续跳变，需要"解缠绕"恢复连续相位。

**正式定义：**
- 主值（缠绕相位，wrapped phase）：相位值被限制在 $-\pi \leq \theta(\omega) \leq \pi$ 范围内
- 解缠绕相位（unwrapped phase）：通过消除 $2\pi$ 的不连续跳变，得到的连续相位函数，记为 $\theta_c(\omega)$

**为什么会有缠绕？**
$X(e^{j\omega}) = |X(e^{j\omega})| e^{j[\theta(\omega) + 2\pi k]}$，对于任何整数 $k$ 都成立。当计算的相位超出 $[-\pi, \pi]$，会被模 $2\pi$ 运算拉回来，在图上就表现为 $2\pi$ 的跳变。

**解缠绕的数学原理：**

从 $\ln X(e^{j\omega}) = \ln |X(e^{j\omega})| + j\theta(\omega)$ 出发：
$$
\frac{d \ln X(e^{j\omega})}{d\omega} = \frac{d \ln |X(e^{j\omega})|}{d\omega} + j\frac{d\theta(\omega)}{d\omega}
$$

可以通过相位导数 $d\theta/d\omega$ 的积分唯一定义 $\theta(\omega)$：
$$
\theta(\omega) = \int_{0}^{\omega} \frac{d\theta(\eta)}{d\eta} d\eta, \quad \theta(0)=0
$$

此外，如果 $\frac{1}{2\pi} \int_{0}^{2\pi} \frac{d\theta(\eta)}{d\eta} d\eta = 0$，则 $\theta(\omega)$ 是奇函数。

**MATLAB 实现：**
使用 `unwrap(angle(h))` 函数。

**容易混淆的点：**
解缠绕并不改变信息，只是让相位在图上看起来连续。缠绕相位和解缠绕相位在数学上是等价的（差 $2\pi k$）。

### 2.7 常用 DTFT 对

以下是课件表 3.3 列出的基本 DTFT 对，需要熟记：

| 序号 | 序列 $x[n]$ | DTFT $X(e^{j\omega})$ |
|------|------------|----------------------|
| 1 | $\delta[n]$ | $1$ |
| 2 | $1$（常数序列） | $\sum_{k=-\infty}^{\infty} 2\pi \delta(\omega + 2\pi k)$ |
| 3 | $\mu[n]$（单位阶跃） | $\frac{1}{1 - e^{-j\omega}} + \sum_{k=-\infty}^{\infty} \pi \delta(\omega + 2\pi k)$ |
| 4 | $e^{j\omega_0 n}$（复指数） | $\sum_{k=-\infty}^{\infty} 2\pi \delta(\omega - \omega_0 + 2\pi k)$ |
| 5 | $\alpha^n \mu[n], \quad |\alpha| < 1$ | $\frac{1}{1 - \alpha e^{-j\omega}}$ |

**关于常数序列的 DTFT：**
常数 1 的 DTFT 是以 $2\pi$ 为周期的冲激串。这对应于 CTFT 中 $1 \leftrightarrow 2\pi\delta(\omega)$ 在离散域的推广（由于周期性而重复）。

### 2.8 DTFT 的收敛条件

**一句话理解：**
不是所有序列都有 DTFT——序列需要满足一定条件，DTFT 才存在（收敛）。

**三种收敛情况：**

**（1）均匀收敛（Uniform Convergence）**

条件：序列绝对可和（absolutely summable）

$$
\sum_{n=-\infty}^{\infty} |x[n]| < \infty
$$

如果满足此条件，则：
$$
|X(e^{j\omega})| = \left|\sum_{n=-\infty}^{\infty} x[n] e^{-j\omega n}\right| \leq \sum_{n=-\infty}^{\infty} |x[n]| < \infty
$$

DTFT 对所有的 $\omega$ 都一致收敛，且 $X(e^{j\omega})$ 是 $\omega$ 的连续函数。

**（2）均方收敛（Mean-Square Convergence）**

条件：序列能量有限（finite energy）

$$
\sum_{n=-\infty}^{\infty} |x[n]|^2 < \infty
$$

等价于：
$$
\lim_{K \to \infty} \int_{-\pi}^{\pi} |X(e^{j\omega}) - X_K(e^{j\omega})|^2 d\omega = 0
$$

**重要关系：** 绝对可和 $\Rightarrow$ 能量有限，但能量有限 $\nRightarrow$ 绝对可和。

**为什么绝对可和更强？**
因为 $\sum |x[n]|^2 \leq (\sum |x[n]|)^2$，所以绝对可和的序列一定能量有限。反过来不成立，比如 $x[n] = 1/n$（$n > 0$），能量有限但不绝对可和。

**总结（来自课件第 30 页）：**

| 条件 | 收敛类型 |
|------|---------|
| $\sum \mid x[n]\mid < \infty$ | 均匀收敛（更强） |
| $\sum \mid x[n]\mid^2 < \infty$ | 均方收敛（更弱） |

**（3）包含冲激函数的 DTFT**

某些既不绝对可和也不平方可和的序列（如 $\mu[n]$、$\cos(\omega_0 n + \phi)$），借助 Dirac Delta 函数 $\delta(\omega)$ 也能定义 DTFT。此时频谱中包含冲激。

**Dirac Delta 函数 $\delta(\omega)$：**
- 高度无限、宽度为零、面积为 1 的理想脉冲
- 是窄脉冲 $p_\Delta(\omega)$ 在 $\Delta \to 0$ 时的极限
- 满足：$\int_{-\infty}^{\infty} \delta(\omega) d\omega = 1$

**Gibbs 现象（重要！）：**

课件以理想低通滤波器为例说明：

$$
H_{LP}(e^{j\omega}) = \begin{cases} 1, & 0 \leq |\omega| \leq \omega_c \\ 0, & \omega_c < |\omega| \leq \pi \end{cases}
$$

其逆 DTFT 为：
$$
h_{LP}[n] = \begin{cases} \frac{\omega_c}{\pi}, & n = 0 \\ \frac{\sin \omega_c n}{\pi n}, & n \neq 0 \end{cases}
$$

用有限项 $K$ 近似 $H_{LP,K}(e^{j\omega}) = \sum_{n=-K}^{K} \frac{\sin \omega_c n}{\pi n} e^{-j\omega n}$ 时，无论 $K$ 多大，在截止频率 $\omega_c$ 附近总是有过冲和振荡（ripples）。

**关键观察：**
- 振荡的幅度不随 $K$ 增大而减小（最大 ripple 高度保持不变）
- 振荡的数量随 $K$ 增大而增多
- 这不影响均方收敛，因为在间断点处均方意义上的逼近仍然有效

这就是**Gibbs 现象**：用有限项傅里叶级数逼近有间断点的函数时，在间断点处无法均匀收敛。

### 2.9 DTFT 的对称关系

**一句话理解：**
序列的对称性决定了 DTFT 的对称性，利用对称关系可以简化计算和验证结果。

**实序列的对称性（课件表 3.2 上半部分）：**

| $x[n]$ | $X(e^{j\omega})$ |
|--------|-----------------|
| 实序列 | $X(e^{j\omega}) = X^*(e^{-j\omega})$（共轭对称） |
| 实偶序列 | 实偶函数 |
| 实奇序列 | 虚奇函数 |

**复序列的对称性（课件表 3.2 下半部分）：**

| $x[n]$ | $X(e^{j\omega})$ |
|--------|-----------------|
| 共轭对称 $x[n] = x^*[-n]$ | 实函数 |
| 共轭反对称 $x[n] = -x^*[-n]$ | 虚函数 |

**实用意义：**
对于实际中的实序列信号，知道 $|X(e^{j\omega})|$ 是偶函数后，频谱只需画 $[0, \pi]$ 就够了，$[-\pi, 0]$ 部分是镜像。

### 2.10 重要实例：指数序列的 DTFT

$$
x[n] = \alpha^n \mu[n], \quad |\alpha| < 1
$$

DTFT：
$$
X(e^{j\omega}) = \sum_{n=0}^{\infty} \alpha^n e^{-j\omega n} = \sum_{n=0}^{\infty} (\alpha e^{-j\omega})^n = \frac{1}{1 - \alpha e^{-j\omega}}
$$

收敛条件：$|\alpha e^{-j\omega}| = |\alpha| < 1$，所以只要 $|\alpha| < 1$，DTFT 对所有 $\omega$ 存在。

幅度谱：
$$
|X(e^{j\omega})| = \frac{1}{\sqrt{1 - 2\alpha\cos\omega + \alpha^2}}
$$

相位谱：
$$
\theta(\omega) = \tan^{-1}\left(\frac{-\alpha \sin\omega}{1 - \alpha \cos\omega}\right)
$$

**观察：** 当 $\alpha = 0.5$ 时，$|X(e^{j\omega})|$ 在 $\omega = 0$ 处最大（= 2），在 $\omega = \pm\pi$ 处最小（= 2/3）。这是一个典型的低通信号，低频成分被放大。

**对称性验证：** $|X(e^{j\omega})| = |X(e^{-j\omega})|$（偶对称），$\theta(\omega) = -\theta(-\omega)$（奇对称）。

### 2.11 DTFT 的范数（Lp-norm）

**一句话理解：**
DTFT 的范数量化了变换的"强度"。

**定义：**
$$
\|X\|_p = \left(\frac{1}{2\pi} \int_{-\pi}^{\pi} |X(e^{j\omega})|^p d\omega\right)^{1/p}
$$

常用的 $p$ 值为 1、2 或 $\infty$。MATLAB 中可用 `filternorm` 计算。

### 2.12 离散时间能量密度谱

**一句话理解：**
序列的能量不仅可以在时域计算，也可以从 DTFT 的幅度平方在频域计算。

**定义：**

序列 $g[n]$ 的总能量：
$$
\mathcal{E}_g = \sum_{n=-\infty}^{\infty} |g[n]|^2
$$

由 Parseval 关系：
$$
\mathcal{E}_g = \sum_{n=-\infty}^{\infty} |g[n]|^2 = \frac{1}{2\pi} \int_{-\pi}^{\pi} |G(e^{j\omega})|^2 d\omega
$$

**能量密度谱：**
$$
S_{gg}(\omega) = |G(e^{j\omega})|^2
$$

在频率范围 $[-\pi, \pi]$ 上 $S_{gg}(\omega)$ 曲线下的面积除以 $2\pi$ 就是序列的总能量。

**计算实例（课件例 3.15）：**

对 $h_{LP}[n] = \frac{\sin \omega_c n}{\pi n}$：
$$
\sum_{n=-\infty}^{\infty} |h_{LP}[n]|^2 = \frac{1}{2\pi} \int_{-\omega_c}^{\omega_c} 1^2 d\omega = \frac{\omega_c}{\pi} < \infty
$$

所以 $h_{LP}[n]$ 是有限能量序列。

**计算实例（课件例 3.16）：**

对指数序列 $\alpha^n \mu[n]$：
$$
\mathcal{E}_x = \frac{1}{2\pi} \int_{-\pi}^{\pi} \left|\frac{1}{1 - \alpha e^{-j\omega}}\right|^2 d\omega = \sum_{n=0}^{\infty} |\alpha|^{2n} = \frac{1}{1 - \alpha^2}
$$

当 $\alpha = 0.5$ 时，$\mathcal{E}_x = 1.3333$。

### 2.13 频带受限信号

**（A）连续时间频带受限信号**

理想频带受限信号的频谱在某个频率范围外严格为零：
$$
X_a(j\Omega) = \begin{cases} 0, & 0 \leq |\Omega| \leq \Omega_a \\ 0, & \Omega_b \leq |\Omega| \leq \infty \end{cases}
$$

分类：
- **低通信号**：频谱在 $0 < |\Omega| \leq \Omega_p < \infty$，带宽为 $\Omega_p$
- **高通信号**：频谱在 $0 < \Omega_p \leq |\Omega| < \infty$，带宽从 $\Omega_p$ 到 $\infty$
- **带通信号**：频谱在 $0 < \Omega_L \leq |\Omega| \leq \Omega_H < \infty$，带宽为 $\Omega_H - \Omega_L$

带宽的精确定义依赖于应用。例如 80% 能量带宽：包含信号 80% 能量的频率范围。

**补充理解：** 实际中没有真正"严格"频带受限的信号——因为时限信号不可能是频带受限的。但很多信号的能量高度集中在某个频率范围内，在工程上可以近似看作频带受限。

**（B）离散时间频带受限信号**

离散信号的频谱是周期性（周期 $2\pi$）的：
- **全频带信号**：频谱占据整个 $-\pi \leq \omega \leq \pi$
- **频带受限信号**：频谱只占 $[-\pi, \pi]$ 的一部分

理想离散时间频带受限信号：
$$
X(e^{j\omega}) = \begin{cases} 0, & 0 \leq |\omega| \leq \omega_a \\ 0, & \omega_b \leq |\omega| \leq \pi \end{cases}
$$

分类（实信号）：
- **低通**：频谱在 $0 < |\omega| \leq \omega_p < \pi$，带宽 $\omega_p$
- **高通**：频谱在 $0 < \omega_p \leq |\omega| < \pi$，带宽 $\pi - \omega_p$
- **带通**：频谱在 $0 < \omega_L \leq |\omega| \leq \omega_H < \pi$，带宽 $\omega_H - \omega_L$

注意：高通的带宽是 $\pi - \omega_p$ 而不是 $\omega_p$，这点常搞错。

**实例：** $x[n] = (0.5)^n \mu[n]$ 的 80% 能量集中在 $0 \leq |\omega| \leq 0.5081\pi$，所以其 80% 带宽为 $0.5081\pi$。

## 3. 核心公式与推导

### 3.1 DTFT 正变换公式

$$
X(e^{j\omega}) = \sum_{n=-\infty}^{\infty} x[n] e^{-j\omega n}
$$

其中：
- $x[n]$：离散时间序列
- $\omega$：数字角频率，单位 rad/sample
- $n$：整数时间序号
- $e^{-j\omega n}$：复指数，$\cos(\omega n) - j\sin(\omega n)$

**这个公式在干什么：**
对每个频率 $\omega$，把序列的每个值 $x[n]$ 与对应频率的复指数 $e^{-j\omega n}$ 相乘后累加。如果序列和该频率"共振"（相关度高），结果就大。

**常见错误：**
- 把 $\omega$ 写成 $\Omega$（没有区分模拟和数字角频率）
- 忘记求和范围是 $(-\infty, \infty)$，对因果序列起止点写错

### 3.2 IDTFT 逆变换公式

$$
x[n] = \frac{1}{2\pi} \int_{-\pi}^{\pi} X(e^{j\omega}) e^{j\omega n} d\omega
$$

其中：
- 积分范围只在 $[-\pi, \pi]$（一个周期）
- $1/(2\pi)$ 是归一化因子

**这个公式在干什么：**
已知频谱 $X(e^{j\omega})$，要恢复出时域序列 $x[n]$。本质是把 $X(e^{j\omega})$ 看作傅里叶级数，$x[n]$ 就是傅里叶系数。

**常见错误：**
- 积分范围搞错，写成 $(-\infty, \infty)$——DTFT 是周期的，只需要一个周期
- 漏掉 $1/(2\pi)$ 因子

### 3.3 DTFT 定理汇总（课件表 3.4）

设 $g[n] \leftrightarrow G(e^{j\omega})$，$h[n] \leftrightarrow H(e^{j\omega})$：

**1. 线性性：**
$$
\alpha g[n] + \beta h[n] \leftrightarrow \alpha G(e^{j\omega}) + \beta H(e^{j\omega})
$$

**2. 时移：**
$$
g[n - n_0] \leftrightarrow e^{-j\omega n_0} G(e^{j\omega})
$$

**这个公式在干什么：** 时域延迟 $n_0$ 个采样点，频域乘以一个纯相位因子 $e^{-j\omega n_0}$。幅度谱不变，只改变相位谱。

**3. 频移：**
$$
e^{j\omega_0 n} g[n] \leftrightarrow G(e^{j(\omega - \omega_0)})
$$

**这个公式在干什么：** 时域乘以复指数（调制），频域整体搬移 $\omega_0$。这是通信中"调制"的数学基础。

**4. 频率微分：**
$$
n g[n] \leftrightarrow j \frac{d G(e^{j\omega})}{d\omega}
$$

**这个公式在干什么：** 时域乘以 $n$，对应频域微分。用来计算含 $n$ 乘以已知序列的 DTFT。

**用法示例：** 已知 $\alpha^n \mu[n] \leftrightarrow 1/(1-\alpha e^{-j\omega})$，要求 $n\alpha^n \mu[n]$ 的 DTFT：
$$
j\frac{d}{d\omega}\left(\frac{1}{1-\alpha e^{-j\omega}}\right) = j \cdot \frac{-\alpha(-j)e^{-j\omega}}{(1-\alpha e^{-j\omega})^2} = \frac{\alpha e^{-j\omega}}{(1-\alpha e^{-j\omega})^2}
$$

**5. 卷积定理：**
$$
g[n] * h[n] \leftrightarrow G(e^{j\omega}) H(e^{j\omega})
$$

**这个公式在干什么：** 这是 DSP 中最重要的关系之一！时域的线性卷积变成了频域的简单乘法。计算卷积时可以：先做 DTFT，相乘，再做 IDTFT。

**6. 调制定理：**
$$
g[n] h[n] \leftrightarrow \frac{1}{2\pi} \int_{-\pi}^{\pi} G(e^{j\theta}) H(e^{j(\omega - \theta)}) d\theta
$$

时域逐点相乘，频域变成卷积（周期卷积）。

**7. Parseval 关系：**
$$
\sum_{n=-\infty}^{\infty} g[n] h^*[n] = \frac{1}{2\pi} \int_{-\pi}^{\pi} G(e^{j\omega}) H^*(e^{j\omega}) d\omega
$$

特例（$g = h$）即能量守恒。

### 3.4 采样的频域公式

**理想采样：**

采样冲激串：
$$
\delta_T(t) = \sum_{n=-\infty}^{\infty} \delta(t - nT)
$$

时域（采样输出）：
$$
g_p(t) = g_a(t) \cdot \delta_T(t) = \sum_{n=-\infty}^{\infty} g_a(nT) \delta(t - nT)
$$

频域（关键公式）：
$$
G_p(j\Omega) = \frac{1}{T} \sum_{k=-\infty}^{\infty} G_a(j(\Omega - k\Omega_T))
$$

其中：
- $T$：采样周期（秒）
- $\Omega_T = 2\pi/T$：采样角频率（rad/s）
- $g_a(t)$：原始连续信号
- $g_p(t)$：采样后的冲激串
- $G_p(j\Omega)$：采样信号的频谱

**这个公式在干什么：**
采样在时域把连续信号离散化，在频域的效果是把原信号频谱 $G_a(j\Omega)$ 以 $\Omega_T$ 为间隔周期性地复制（Periodization），并乘以 $1/T$。

**核心直觉（课件第 4 页讲义）：**
- 时域离散化 $\leftrightarrow$ 频域周期化
- 时域周期化 $\leftrightarrow$ 频域离散化

这是傅里叶分析中最基本的对偶关系。

> **$1/T$ 因子从哪来？** 这个因子是冲激串 $\delta_T(t)$ 的傅里叶级数展开带出来的。不推导也可以先记住结论：采样让频谱幅度变成了原来的 $1/T$ 倍，这就是为什么后面恢复信号时，重构滤波器增益要设为 $T$ 来补偿。

### 3.5 $G_p(j\Omega)$ 的两种等价表达式

**形式（1）——直接从采样值出发：**
$$
G_p(j\Omega) = \sum_{n=-\infty}^{\infty} g_a(nT) e^{-j\Omega nT}
$$

**形式（2）——从频谱复制出发：**
$$
G_p(j\Omega) = \frac{1}{T} \sum_{k=-\infty}^{\infty} G_a(j(\Omega - k\Omega_T))
$$

两种形式描述同一个东西：形式（1）方便从采样值计算，形式（2）方理解采样在频域的效果。

### 3.6 DTFT 与采样频谱的关系

$$
G(e^{j\omega}) = G_p(j\Omega) \big|_{\Omega = \omega/T}
$$

等价地：
$$
G_p(j\Omega) = G(e^{j\omega}) \big|_{\omega = \Omega T}
$$

**这个公式的关键：**
- 模拟频率 $\Omega$ 和数字频率 $\omega$ 通过 $\omega = \Omega T$ 互相转换
- DTFT $G(e^{j\omega})$ 是 $G_p(j\Omega)$ 做了频率轴缩放后的结果

进一步展开：
$$
G(e^{j\omega}) = \frac{1}{T} \sum_{k=-\infty}^{\infty} G_a\left(j\frac{\omega}{T} - jk\Omega_T\right) = \frac{1}{T} \sum_{k=-\infty}^{\infty} G_a\left(j\frac{\omega}{T} - j\frac{2\pi k}{T}\right)
$$

**为什么 DTFT 的周期是 $2\pi$：**
因为 $G_p(j\Omega)$ 以 $\Omega_T = 2\pi/T$ 为周期，经过映射 $\omega = \Omega T$ 后，$2\pi/T$ 的周期就变成了 $2\pi$。

### 3.7 奈奎斯特采样定理

设 $g_a(t)$ 是频带受限信号，$G_a(j\Omega) = 0$ 当 $|\Omega| > \Omega_m$。

则 $g_a(t)$ 可由其采样值 $g_a(nT)$ 唯一确定，当且仅当：
$$
\Omega_T \geq 2\Omega_m, \quad \text{其中 } \Omega_T = \frac{2\pi}{T}
$$

**相关术语：**
- **折叠频率（folding frequency）**：$\Omega_T/2$，也叫奈奎斯特频率（Nyquist frequency）
- **奈奎斯特速率（Nyquist rate）**：$2\Omega_m$（无混叠的最小采样频率）

> **术语辨析（重要！）：** 不同教材对"奈奎斯特频率"的叫法不同。有的书把 $\Omega_T/2$ 叫奈奎斯特频率，有的把 $\Omega_m$ 叫奈奎斯特频率。本笔记沿用课件用法：**奈奎斯特频率 = $\Omega_m$（信号最高频率），奈奎斯特速率 = $2\Omega_m$（最低采样频率）**。考试时注意看清题目用的是哪个定义。

**三种采样情况：**
- **过采样（Oversampling）**：$\Omega_T > 2\Omega_m$，频谱副本之间有间隙
- **临界采样（Critical sampling）**：$\Omega_T = 2\Omega_m$，频谱副本刚好接触
- **欠采样（Undersampling）**：$\Omega_T < 2\Omega_m$，频谱副本重叠 $\to$ 混叠（aliasing）

**特殊注意（课件强调）：** 纯正弦信号在临界采样时可能无法恢复。例如以恰好两倍频率采样正弦波 $x(t) = \sin(2\pi f t)$，采样率 $F_T = 2f$：采样时刻为 $t = nT = n/(2f)$，采样值 $x[n] = \sin(2\pi f \cdot n/(2f)) = \sin(\pi n) = 0$ 对所有 $n$ 都成立——**全部采到零点，得到一串零，信号完全丢失！** 而如果换个相位（比如采样 $\cos$ 而不是 $\sin$），就能采到峰值。这说明临界采样下能否恢复取决于采样时刻的相位，在实际中不可靠，所以工程上都用**过采样**。

**实际例子：**
- 数字电话：信号带宽 3.4 kHz，采样率 8 kHz（$> 2 \times 3.4$）
- CD 音乐：信号带宽 20 kHz，采样率 44.1 kHz（$> 2 \times 20$）

### 3.8 模拟信号恢复公式

用理想低通滤波器 $H_r(j\Omega)$ 恢复原始信号：

$$
H_r(j\Omega) = \begin{cases} T, & |\Omega| \leq \Omega_c \\ 0, & |\Omega| > \Omega_c \end{cases}
$$

其中 $\Omega_m < \Omega_c < \Omega_T - \Omega_m$。

滤波器的冲激响应：
$$
h_r(t) = \frac{\sin(\Omega_c t)}{\Omega_T t / 2}, \quad -\infty < t < \infty
$$

恢复出的信号（假设 $\Omega_c = \Omega_T / 2 = \pi / T$）：

$$
\hat{g}_a(t) = \sum_{n=-\infty}^{\infty} g[n] \frac{\sin[\pi(t - nT)/T]}{\pi(t - nT)/T}
$$

**这个公式叫 Poisson 求和公式（也叫插值公式）。**

**这个公式在干什么：**
把每个采样值 $g[n]$ 放在它对应的时刻 $nT$，用一个 $\text{sinc}$ 函数加权（sinc 函数在该采样点取值为 1，在其他采样点取值为 0），然后把所有加权 sinc 函数叠加起来，完美恢复原始信号。

**直观理解：** 如果把采样看成"钉钉子"，恢复就是把每个钉子位置放一个 sinc 形状的隆起，所有隆起加起来就是原来的平滑曲线。

如果 $\Omega_T < 2\Omega_m$（采样不足），频谱重叠导致混叠，此时无法通过滤波恢复 $G_a(j\Omega)$——混叠造成的失真不可逆。

### 3.9 带通信号采样定理

对于带通信号（频谱在 $\Omega_L \leq |\Omega| \leq \Omega_H$，$\Omega_L > 0$），设 $\Delta\Omega = \Omega_H - \Omega_L$ 为带宽。

假设 $\Omega_H = M(\Delta\Omega)$（$M$ 为整数），可以选择采样频率：
$$
\Omega_T = 2(\Delta\Omega) = \frac{2\Omega_H}{M}
$$

**关键点：** $\Omega_T$ 可以远小于 $2\Omega_H$（低通信号的奈奎斯特速率），这就是**欠采样（undersampling）**。

**为什么可行？** 利用带通信号频谱的"空隙"，让复制后的频谱副本恰好填满这些空隙而不重叠。

**通用带通采样公式（课件讨论）：**
$$
f_s = \frac{2(f_L + f_H)}{2n + 1} = \frac{4f_0}{2n + 1}
$$

其中 $n$ 是满足 $f_s \geq 2(f_H - f_L) = 2B$ 的最大整数（$n = 0, 1, 2, \ldots$）。

最低采样率 $f_s = 2B$ 时，信号中心频率需满足：
$$
f_0 = \frac{2n + 1}{2} B \quad \text{或} \quad f_L + f_H = (2n + 1)B
$$

**重要结论：**
带通采样将频率范围 $(nB, (n+1)B)$ 的信号搬移到 $(0, B)$：
- 当 $n$ 为奇数：搬移后频谱会反转
- 当 $n$ 为偶数：搬移后频谱不反转

**局限：**
- 带通采样前，只能有一个频带内有信号
- 恢复时需使用理想带通滤波器（而非低通滤波器），通带为 $\Omega_L \leq |\Omega| \leq \Omega_H$，增益为 $T$

### 3.10 实际采样（补充内容）

课件中补充了实际采样与理想采样的区别。实际中 $p(t)$ 是宽度为 $\tau$ 的周期矩形脉冲，而非理想冲激串。

傅里叶系数：
$$
C_k = \frac{\tau}{T} \cdot \frac{\sin(k\Omega_s \tau / 2)}{k\Omega_s \tau / 2} \cdot e^{-jk\Omega_s \tau/2}
$$

实际采样后的频谱：
$$
G_p(j\Omega) = \sum_{k=-\infty}^{\infty} C_k G_a(j\Omega - jk\Omega_s)
$$

与理想采样的区别：副本的幅度不是常数 $1/T$，而是按 $\text{sinc}$ 包络变化。

## 4. 图像与直观理解

### 4.1 采样前后的频谱变化

采样前，$G_a(j\Omega)$ 是频带受限的（在 $[-\Omega_m, \Omega_m]$ 外为零）。采样后，$G_p(j\Omega)$ 以 $\Omega_T$ 为周期不断复制 $G_a(j\Omega)$。

- 当 $\Omega_T > 2\Omega_m$：各副本之间有间隙，不重叠。可以用低通滤波器提取基带副本。
- 当 $\Omega_T < 2\Omega_m$：副本之间重叠，高频部分"折叠"回低频区域，造成混叠。

**图中应该看什么：**
- 第一眼看 $\Omega_T$ 和 $\Omega_m$ 的大小关系
- 三角形状的频谱副本是否重叠
- 虚线框表示理想低通滤波器，它的截止频率能否恰好分离出基带频谱

### 4.2 Gibbs 现象示意图

课件第 34 页展示了不同 $K$ 值（10, 20, 30, 40）下 $H_{LP,K}(e^{j\omega})$ 逼近理想低通滤波器的情况。

**图中应该看什么：**
- 在截止频率 $\omega_c$ 两侧总是有过冲（overshoot），形成 ripple
- $K$ 增大时 ripple 变多但最大高度不变
- 这就是 Gibbs 现象的典型表现

### 4.3 缠绕相位与解缠绕相位

课件第 62 页展示了一个 DTFT 的相位谱在 $\omega = 0.72$ 处出现 $2\pi$ 跳变（缠绕相位），第 71 页展示了用 `unwrap` 消除跳变后的结果（解缠绕）。

**图中应该看什么：**
- 缠绕相位：在跳变点前后，相位从 $\pi$ 突然跳到 $-\pi$（或反过来）
- 解缠绕相位：连续的单调递减曲线，没有跳变
- 解缠绕不改变信息，只让图看起来更自然

### 4.4 带通采样频谱示意图

课件第 34-35 页展示了带通信号采样前后频谱的变化。

**M=3 的情况：** 采样后的副本间隔为 $2\Delta\Omega$，各副本恰好不重叠。
**M=4 的情况：** 同样无重叠，副本分布在不同位置。

**图中应该看什么：**
- 原始频谱（正频和负频的对称矩形）
- 采样后副本的间距恰好等于两倍带宽
- 各副本之间没有重叠——这是带通采样能工作的直观原因

### 4.5 三个正弦信号的混叠演示

课件第 14-19 页用三个不同频率的正弦信号展示了混叠问题：

$$
g_1(t) = \cos(6\pi t), \quad g_2(t) = \cos(14\pi t), \quad g_3(t) = \cos(26\pi t)
$$

以 $T = 0.1$（采样频率 $\Omega_T = 20\pi$）采样后：

$$
\begin{aligned}
g_1[n] &= \cos(6\pi n/10) = \cos(0.6\pi n) \\
g_2[n] &= \cos(14\pi n/10) = \cos(1.4\pi n) = \cos(0.6\pi n) \\
g_3[n] &= \cos(26\pi n/10) = \cos(2.6\pi n) = \cos(0.6\pi n)
\end{aligned}
$$

三个不同频率的连续信号采样后变成完全相同的离散序列！这就是混叠的实质。

**关键观察：**
- $\cos(1.4\pi n) = \cos(2\pi n - 0.6\pi n) = \cos(0.6\pi n)$（因为 $2\pi n$ 对整数 $n$ 是 $2\pi$ 的整数倍）
- 类似地 $\cos(2.6\pi n) = \cos(0.6\pi n)$（因为 $2.6\pi = 2\pi + 0.6\pi$）
- 高频信号（14$\pi$, 26$\pi$）在采样后"伪装"成了低频信号（$0.6\pi$）

**恢复时的选择：**
- 如果重构滤波器通带选择在 $6\pi$ 附近（基带），恢复出 $\cos(6\pi t)$
- 如果重构滤波器通带选择在 $34\pi$ 附近（某个副本），恢复出 $\cos(34\pi t)$
- 这说明采样后的频谱副本中，**任何**一个都可以用来重构信号

## 5. 本章重点总结

| 知识点 | 要记住什么 | 常见错误 |
|--------|-----------|---------|
| DTFT 定义 | $X(e^{j\omega}) = \sum_{n} x[n] e^{-j\omega n}$，连续周期函数 | 把 $\omega$ 写成 $\Omega$，忘记频域周期性 |
| DTFT 周期 | DTFT 以 $2\pi$ 为周期 | 以为像 CTFT 一样非周期 |
| DTFT 存在条件 | 绝对可和 $\to$ 均匀收敛；能量有限 $\to$ 均方收敛 | 以为平方可和一定绝对可和 |
| DTFT 定理 | 卷积变乘法，时移变相位 | 漏因子、搞混卷积与乘法对应关系 |
| 频率微分 | $n x[n] \leftrightarrow j\, dX/d\omega$ | 忘记乘 $j$ |
| 采样频域效果 | $G_p(j\Omega) = \frac{1}{T}\sum G_a(j(\Omega - k\Omega_T))$ | 漏 $1/T$ 因子 |
| $\omega$ 与 $\Omega$ 关系 | $\omega = \Omega T$ | 忘记这个映射，搞混 DTFT 和 CTFT |
| 奈奎斯特定理 | $\Omega_T \geq 2\Omega_m$ | 把折叠频率和奈奎斯特频率搞反 |
| 混叠 | 采样率不够时，频谱重叠，不可逆失真 | 以为只是"质量差"，不理解不可逆性 |
| Gibbs 现象 | 用有限项逼近有间断的频谱时有过冲 | 以为增加项数能消除过冲 |
| 信号恢复 | 用理想低通（sinc 插值）$\hat{g}_a(t) = \sum g[n] \text{sinc}$ | 忘记恢复滤波器增益应为 $T$ |
| 带通采样 | 可以低于 $2\Omega_H$ 采样，利用频谱空隙 | 以为所有信号都必须满足奈奎斯特低通条件 |
| 相位解缠绕 | 消除 $2\pi$ 跳变，恢复连续相位 | 以为解缠绕改变了信号的信息 |
| 能量密度谱 | $S_{gg}(\omega) = \mid G(e^{j\omega})\mid ^2$，总能量 = 面积$/2\pi$ | 忘记除以 $2\pi$ |

## 6. 配套例题

### 例题 1：DTFT 基础计算

**题目：**
求单位采样序列 $\delta[n]$ 的 DTFT。

**解题思路：**
直接代入 DTFT 定义，注意 $\delta[n]$ 只在 $n=0$ 时非零。

**解答：**
$$
X(e^{j\omega}) = \sum_{n=-\infty}^{\infty} \delta[n] e^{-j\omega n}
$$

求和只有 $n=0$ 一项非零，此时 $\delta[0] = 1$，$e^{-j\omega \cdot 0} = 1$：
$$
X(e^{j\omega}) = 1 \cdot 1 = 1
$$

**答案：** $\Delta(e^{j\omega}) = 1$（常数频谱，所有频率分量强度相同）

**易错提醒：**
新手容易把 $\delta[n]$ 和 $\delta(\omega)$ 搞混。$\delta[n]$ 是时域的单位采样序列（只在 $n=0$ 处为 1），$\delta(\omega)$ 是频域的冲激函数。

### 例题 2：利用 DTFT 定理计算

**题目：**
已知 $x[n] = \alpha^n \mu[n] \quad (|\alpha| < 1)$ 的 DTFT 为 $X(e^{j\omega}) = \frac{1}{1 - \alpha e^{-j\omega}}$。
求 $y[n] = (n+1)\alpha^n \mu[n]$ 的 DTFT $Y(e^{j\omega})$。

**解题思路：**
$y[n] = n x[n] + x[n]$，第一项用频率微分定理，第二项直接已知。再用线性性相加。

**解答：**

步骤 1：$n x[n]$ 的 DTFT

由频率微分定理 $n x[n] \leftrightarrow j \frac{d X(e^{j\omega})}{d\omega}$：
$$
\frac{d}{d\omega}\left(\frac{1}{1 - \alpha e^{-j\omega}}\right) = \frac{d}{d\omega}(1 - \alpha e^{-j\omega})^{-1} = -(1 - \alpha e^{-j\omega})^{-2} \cdot (-\alpha)(-j)e^{-j\omega}
$$

注意求导时要小心：$\frac{d}{d\omega} e^{-j\omega} = -j e^{-j\omega}$。

$$
\frac{d}{d\omega}\left(\frac{1}{1 - \alpha e^{-j\omega}}\right) = -\frac{1}{(1 - \alpha e^{-j\omega})^2} \cdot (j\alpha e^{-j\omega}) = \frac{-j\alpha e^{-j\omega}}{(1 - \alpha e^{-j\omega})^2}
$$

所以：
$$
n x[n] \leftrightarrow j \cdot \frac{-j\alpha e^{-j\omega}}{(1 - \alpha e^{-j\omega})^2} = \frac{\alpha e^{-j\omega}}{(1 - \alpha e^{-j\omega})^2}
$$

步骤 2：由线性性
$$
Y(e^{j\omega}) = \frac{\alpha e^{-j\omega}}{(1 - \alpha e^{-j\omega})^2} + \frac{1}{1 - \alpha e^{-j\omega}}
$$

步骤 3：通分
$$
Y(e^{j\omega}) = \frac{\alpha e^{-j\omega} + (1 - \alpha e^{-j\omega})}{(1 - \alpha e^{-j\omega})^2} = \frac{1}{(1 - \alpha e^{-j\omega})^2}
$$

**答案：** $Y(e^{j\omega}) = \frac{1}{(1 - \alpha e^{-j\omega})^2}$

**易错提醒：**
- 对 $e^{-j\omega}$ 求导时，注意 $\frac{d}{d\omega}e^{-j\omega} = -j e^{-j\omega}$，不要漏掉 $-j$
- $j \times (-j) = 1$，如果算成 $j^2 = -1$ 就错了

### 例题 3：卷积计算（DTFT 方法）

**题目：**
用 DTFT 方法计算 $x[n] = \alpha^n \mu[n]$ 和 $h[n] = \beta^n \mu[n]$ 的卷积 $y[n] = x[n] * h[n]$，其中 $|\alpha| < 1$，$|\beta| < 1$，$\alpha \neq \beta$。

**解题思路：**
利用 DTFT 卷积定理：时域卷积 $\leftrightarrow$ 频域乘法。

**解答：**

步骤 1：求 DTFT
$$
X(e^{j\omega}) = \frac{1}{1 - \alpha e^{-j\omega}}, \quad H(e^{j\omega}) = \frac{1}{1 - \beta e^{-j\omega}}
$$

步骤 2：频域相乘
$$
Y(e^{j\omega}) = X(e^{j\omega}) H(e^{j\omega}) = \frac{1}{(1 - \alpha e^{-j\omega})(1 - \beta e^{-j\omega})}
$$

步骤 3：部分分式展开
$$
\frac{1}{(1 - \alpha e^{-j\omega})(1 - \beta e^{-j\omega})} = \frac{A}{1 - \alpha e^{-j\omega}} + \frac{B}{1 - \beta e^{-j\omega}}
$$

解得：$A = \frac{\alpha}{\alpha - \beta}$，$B = \frac{-\beta}{\alpha - \beta}$

步骤 4：逆 DTFT
$$
Y(e^{j\omega}) = \frac{\alpha}{\alpha - \beta} \cdot \frac{1}{1 - \alpha e^{-j\omega}} - \frac{\beta}{\alpha - \beta} \cdot \frac{1}{1 - \beta e^{-j\omega}}
$$

利用已知 DTFT 对 $1/(1 - \alpha e^{-j\omega}) \leftrightarrow \alpha^n \mu[n]$：
$$
y[n] = \frac{\alpha}{\alpha - \beta} \alpha^n \mu[n] - \frac{\beta}{\alpha - \beta} \beta^n \mu[n] = \frac{\alpha^{n+1} - \beta^{n+1}}{\alpha - \beta} \mu[n]
$$

**答案：** $y[n] = \frac{\alpha^{n+1} - \beta^{n+1}}{\alpha - \beta} \mu[n]$

**易错提醒：**
部分分式展开时，系数容易算错。检验方法：代入 $e^{-j\omega} = 0$，左边 = 1，右边 $\frac{\alpha}{\alpha-\beta} - \frac{\beta}{\alpha-\beta} = \frac{\alpha-\beta}{\alpha-\beta} = 1$，正确。

### 例题 4：奈奎斯特采样判断

**题目：**
信号 $x_a(t) = \cos(200\pi t) + 2\cos(600\pi t)$ 以采样频率 $f_s = 500$ Hz 进行采样。
（1）信号中的最高频率是多少？奈奎斯特速率是多少？
（2）采样后会不会产生混叠？为什么？
（3）如果能无混叠地恢复信号，需要什么样的重构滤波器？

**解题思路：**
先求每个余弦分量的频率，确定最高频率，再与折叠频率比较。

**解答：**

（1）信号中的频率成分：
- $\cos(200\pi t)$：$\Omega_1 = 200\pi$ rad/s $\to f_1 = \Omega_1/(2\pi) = 100$ Hz
- $2\cos(600\pi t)$：$\Omega_2 = 600\pi$ rad/s $\to f_2 = \Omega_2/(2\pi) = 300$ Hz

最高频率：$f_m = 300$ Hz

奈奎斯特速率：$2f_m = 600$ Hz

（2）采样频率 $f_s = 500$ Hz，折叠频率 $f_s/2 = 250$ Hz。

因为 $f_s/2 = 250 < f_m = 300$，即 $\Omega_T = 1000\pi < 2\Omega_m = 1200\pi$，所以**会产生混叠**。

具体来说：300 Hz 的信号分量在采样后会"折回"到 $f_s - 300 = 500 - 300 = 200$ Hz 的位置（或等效为 $|300 - 500| = 200$ Hz）。

（3）无法无混叠恢复原始信号。采样频率不满足奈奎斯特条件，混叠是不可逆的。

**答案：**
（1）$f_m = 300$ Hz，奈奎斯特速率 $= 600$ Hz
（2）会产生混叠，因为 $f_s = 500 < 600$
（3）无法无失真恢复

**易错提醒：**
- 注意区分角频率 $\Omega$（rad/s）和频率 $f$（Hz）：$\Omega = 2\pi f$
- 奈奎斯特速率是最低采样频率（= $2f_m$），不是折叠频率（= $f_s/2$）

### 例题 5：混叠实例分析

**题目：**
连续信号 $x_a(t) = \cos(2\pi \cdot 40 t) + \cos(2\pi \cdot 90 t)$ 以 $f_s = 100$ Hz 采样。
（1）写出离散序列 $x[n] = x_a(nT)$ 的表达式。
（2）采样后，原信号的两个频率分量分别变成了多少（归一化数字频率 $\omega$）？
（3）是否存在混叠？如果混叠，哪个分量受到了影响？

**解题思路：**
代入 $T = 1/f_s = 0.01$，计算各分量的数字频率 $\omega = 2\pi f / f_s$。

**解答：**

（1）$T = 1/100 = 0.01$ 秒。
$$
x[n] = \cos(2\pi \cdot 40 \cdot 0.01 n) + \cos(2\pi \cdot 90 \cdot 0.01 n) = \cos(0.8\pi n) + \cos(1.8\pi n)
$$

（2）数字频率 $\omega = 2\pi f / f_s$：
- $f_1 = 40$ Hz：$\omega_1 = 2\pi \cdot 40 / 100 = 0.8\pi$ rad/sample
- $f_2 = 90$ Hz：$\omega_2 = 2\pi \cdot 90 / 100 = 1.8\pi$ rad/sample

（3）折叠频率为 $\Omega_T/2$，对应的数字频率为 $\pi$。
- $\omega_1 = 0.8\pi < \pi$：无混叠
- $\omega_2 = 1.8\pi > \pi$：有混叠

$\cos(1.8\pi n) = \cos(2\pi n - 0.2\pi n) = \cos(0.2\pi n)$

所以 $x[n] = \cos(0.8\pi n) + \cos(0.2\pi n)$

90 Hz 的分量在采样后"伪装"成了 10 Hz 的信号（因为 $0.2\pi$ 对应 $f = 0.2\pi \cdot f_s/(2\pi) = 0.1 \cdot 100 = 10$ Hz，或直接：$|90 - 100| = 10$ Hz）。

**答案：**
（1）$x[n] = \cos(0.8\pi n) + \cos(1.8\pi n)$
（2）$\omega_1 = 0.8\pi$，$\omega_2 = 1.8\pi$
（3）存在混叠，90 Hz 分量的数字频率 $1.8\pi > \pi$，采样后等效为 $\omega = 0.2\pi$（对应 10 Hz）

**易错提醒：**
数字频率 $\omega > \pi$ 就一定发生了混叠。因为 $\omega$ 的取值范围是 $[-\pi, \pi]$（或 $[0, 2\pi]$），超出这个范围的频率都会被折叠回来。

### 例题 6：能量计算

**题目：**
求序列 $x[n] = (0.5)^n \mu[n]$ 的总能量，分别用时域和频域两种方法计算。

**解题思路：**
时域直接求 $\sum |x[n]|^2$；频域利用 DTFT $X(e^{j\omega}) = 1/(1 - 0.5e^{-j\omega})$ 和 Parseval 定理。

**解答：**

方法一（时域）：
$$
\mathcal{E}_x = \sum_{n=0}^{\infty} |(0.5)^n|^2 = \sum_{n=0}^{\infty} (0.25)^n = \frac{1}{1 - 0.25} = \frac{4}{3} \approx 1.3333
$$

方法二（频域）：已知 $X(e^{j\omega}) = \frac{1}{1 - 0.5e^{-j\omega}}$

$$
|X(e^{j\omega})|^2 = \frac{1}{(1 - 0.5e^{-j\omega})(1 - 0.5e^{j\omega})} = \frac{1}{1 - 0.5e^{-j\omega} - 0.5e^{j\omega} + 0.25} = \frac{1}{1.25 - \cos\omega}
$$

由 Parseval 定理：
$$
\mathcal{E}_x = \frac{1}{2\pi} \int_{-\pi}^{\pi} \frac{1}{1.25 - \cos\omega} d\omega
$$

这个积分直接计算较复杂，但利用已知结果（课件例 3.16）：
$$
\mathcal{E}_x = \frac{1}{1 - \alpha^2} = \frac{1}{1 - 0.25} = \frac{4}{3}
$$

**答案：** $\mathcal{E}_x = 4/3 \approx 1.3333$

**易错提醒：**
时域计算时注意 $|(0.5)^n|^2 = (0.5^2)^n = (0.25)^n$，不要直接从 $n=0$ 想起始值为 1（$0.25^0 = 1$，$0.5^{2 \times 0} = 0.5^0 = 1$，一致）。

### 例题 7：对称性应用

**题目：**
已知实序列 $x[n]$ 的 DTFT 在 $\omega \in [0, \pi]$ 的幅度谱为 $|X(e^{j\omega})| = 2 + \cos\omega$，相位谱为 $\theta(\omega) = -\omega/2$。
请写出整个周期 $[-\pi, \pi]$ 上的 $|X(e^{j\omega})|$ 和 $\theta(\omega)$。

**解题思路：**
利用实序列 DTFT 的对称性：幅度谱是偶函数，相位谱是奇函数。

**解答：**

幅度谱（偶函数）：
$$
|X(e^{j\omega})| = \begin{cases} 2 + \cos\omega, & \omega \in [0, \pi] \\ 2 + \cos(-\omega) = 2 + \cos\omega, & \omega \in [-\pi, 0] \end{cases}
$$

所以 $|X(e^{j\omega})| = 2 + \cos\omega$ 在整个 $[-\pi, \pi]$ 上成立（本来就是偶函数）。

相位谱（奇函数）：
$$
\theta(\omega) = \begin{cases} -\omega/2, & \omega \in [0, \pi] \\ -(-\omega)/2 = \omega/2, & \omega \in [-\pi, 0] \end{cases}
$$

所以 $\theta(\omega) = -|\omega|/2 \cdot \text{sgn}(\omega)$，或者直接写 $\theta(-\omega) = -\theta(\omega)$（奇函数）。

**答案：**
- $|X(e^{j\omega})| = 2 + \cos\omega$，$\omega \in [-\pi, \pi]$（偶函数，不变）
- $\theta(\omega) = -\omega/2$（$\omega \geq 0$），$\theta(-\omega) = \omega/2$（$\omega < 0$）

**易错提醒：**
偶函数指 $f(-\omega) = f(\omega)$，奇函数指 $f(-\omega) = -f(\omega)$。不是"在负频率部分等于零"。

### 例题 8：带通采样判断

**题目：**
带通信号频谱范围 $f_L = 20$ kHz，$f_H = 25$ kHz（带宽 $B = 5$ kHz）。如果使用低通信号的奈奎斯特采样，需要 $f_s \geq 50$ kHz。请问是否可以用更低的采样频率？如果可以，最低采样频率是多少？

**解题思路：**
利用带通采样定理，检查 $f_H$ 是否是 $B$ 的整数倍，然后选择采样频率。

**解答：**

带宽 $B = f_H - f_L = 5$ kHz。

检验：$f_H / B = 25 / 5 = 5$（整数），所以 $M = 5$。

按带通采样定理，可以选：
$$
f_s^{(1)} = 2B = 10 \text{ kHz}
$$

检查中心频率条件：
$$
f_0 = \frac{f_L + f_H}{2} = \frac{20 + 25}{2} = 22.5 \text{ kHz}
$$
$$
n = \frac{2f_0}{B} - \frac{1}{2} = \frac{45}{5} \cdot \frac{1}{2} - \frac{1}{2} = 4.5 - 0.5 = 4
$$

$n = 4$ 是整数，所以 $f_s = 10$ kHz 可行。

也可以选其他满足条件的采样率（此时 $n$ 取 0, 1, 2, 3）：
$$
f_s = \frac{2 \times 45}{2n + 1} = \frac{90}{2n + 1} \text{ kHz}
$$

需要 $f_s \geq 2B = 10$ kHz：
- $n=0$：$f_s = 90$ kHz（浪费）
- $n=1$：$f_s = 30$ kHz
- $n=2$：$f_s = 18$ kHz
- $n=3$：$f_s \approx 12.86$ kHz
- $n=4$：$f_s = 10$ kHz（最低）

**答案：**
可以。最低采样频率 $f_s = 10$ kHz（等于 $2B$），远小于低通信号所需的 50 kHz。也可选 $f_s = 12.86$ kHz、18 kHz 或 30 kHz。

**易错提醒：**
带通采样要求 $f_H$ 是带宽 $B$ 的整数倍时才可以将采样频率降到恰好 $2B$。如果 $f_H/B$ 不是整数，最低采样率会高于 $2B$。

## 7. 自测题

### 自测题

1. DTFT $X(e^{j\omega})$ 的周期是多少？为什么？
2. 序列 $x[n] = \{1, 2, 3\}$（$n=0,1,2$，其余为 0）的 DTFT 是什么？（写出表达式）
3. 判断：能量有限的序列一定绝对可和。（对/错？为什么？）
4. Gibbs 现象是在什么情况下出现的？
5. 折叠频率（folding frequency）的定义是什么？它和采样频率的关系是什么？
6. 以 8 kHz 采样的信号，其离散时间频谱中 $\omega = \pi/2$ 对应于模拟频率多少 Hz？
7. 连续信号 $x_a(t) = \sin(2\pi \cdot 1000 t)$ 以 $f_s = 1600$ Hz 采样，会不会发生混叠？采样后的数字频率是多少？
8. 在重构连续信号时，理想重构滤波器的增益为什么应该设为 $T$（而非 1）？
9. 带通采样和低通采样（奈奎斯特采样）的根本区别是什么？
10. MATLAB 中 `unwrap` 函数的作用是什么？

### 自测题答案

1. 周期为 $2\pi$。因为 $e^{-j(\omega + 2\pi k)n} = e^{-j\omega n} e^{-j2\pi kn} = e^{-j\omega n}$（$k, n$ 都是整数），所以 $X(e^{j(\omega + 2\pi)}) = X(e^{j\omega})$。

2. $X(e^{j\omega}) = 1 \cdot e^{-j\omega \cdot 0} + 2 \cdot e^{-j\omega \cdot 1} + 3 \cdot e^{-j\omega \cdot 2} = 1 + 2e^{-j\omega} + 3e^{-j2\omega}$

3. 错。能量有限不一定绝对可和。例如 $x[n] = 1/n$（$n \geq 1$），$\sum 1/n^2 = \pi^2/6 < \infty$（能量有限），但 $\sum 1/n \to \infty$（不绝对可和）。

4. Gibbs 现象出现在用有限项傅里叶级数逼近有间断点（跳变）的函数时。在间断点附近产生过冲和振荡，且振荡的最大幅度不随项数增加而减小（只变得越来越多、越来越窄）。

5. 折叠频率 = 采样频率的一半 = $f_s/2 = \Omega_T/2$。之所以叫"折叠"，是因为高于折叠频率的信号成分会被"折叠"回低频区域。

6. $\omega = 2\pi f / f_s$，所以 $f = \omega \cdot f_s / (2\pi) = (\pi/2) \cdot 8000 / (2\pi) = 2000$ Hz。

7. 信号频率 $f = 1000$ Hz，奈奎斯特速率 $2f = 2000$ Hz。$f_s = 1600 < 2000$，发生混叠。数字频率 $\omega = 2\pi \cdot 1000 / 1600 = 1.25\pi$ rad/sample，因为 $|\omega| > \pi$，等效为 $1.25\pi - 2\pi = -0.75\pi$（或 $0.75\pi$，取决于相位）。

8. 因为采样过程在频域除以了 $T$（$G_p(j\Omega)$ 中的 $1/T$ 因子），重构时需要乘以 $T$ 来补偿。

9. 低通采样要求 $f_s \geq 2f_H$（最高频率的两倍）。带通采样利用频谱中的空隙，采样频率可以低至 $2B$（$B$ 是带宽），仅需满足副本不重叠即可。

10. `unwrap` 消除相位谱中的 $2\pi$ 跳变（不连续点），将缠绕相位转换为连续的相位函数。

## 8. 本章学习路线

建议按以下顺序学习：

1. **先读第 1 节（人话理解）**：明确本章要解决什么问题，建立全局观。
2. **回顾 CTFT（第 2.2-2.3 节）**：如果对连续时间傅里叶变换还有印象，快速过一遍；如果忘了，重点看 CTFT 的定义和它与 DTFT 的区别。
3. **重点学习 DTFT 定义（第 2.4 节）**：这是本章核心。记住公式、理解为什么周期是 $2\pi$。这个理解不透，后面全都会卡住。
4. **做例题 1-2**：验证对 DTFT 定义和定理的基本掌握。
5. **学习 DTFT 定理（第 3.3 节）**：边看定理边做例题 3，尤其是卷积定理。
6. **学习对称性（第 2.9 节）**：做例题 7 加深理解。
7. **学习收敛条件和 Gibbs 现象（第 2.8 节）**：理解不是所有序列都有 DTFT。
8. **学习采样理论（第 3.4-3.8 节）**：这是本章后半部分的核心。先理解"时域离散化 = 频域周期化"，再看奈奎斯特定理。
9. **做例题 4-5**：检验对采样和混叠的理解。
10. **学习带通采样（第 3.9 节）**：在前面基础上拓展。
11. **做例题 6、8**：检验对能量计算和带通采样的掌握。
12. **做自测题**：查漏补缺。

**如果时间紧张，优先掌握：**
- DTFT 定义（2.4）
- DTFT 定理表（3.3），尤其是时移和卷积定理
- 奈奎斯特采样定理（3.7）
- 例题 1-5

## 9. 和下一章的关系

本章建立了离散时间信号的频域分析框架（DTFT）和连续信号到离散信号的桥梁（采样理论）。

**第四章将进入离散时间系统**——讨论信号通过系统后会发生什么变化。你会看到时域的卷积在频域就变成了 DTFT 的乘法（$Y(e^{j\omega}) = H(e^{j\omega})X(e^{j\omega})$），这就是本章卷积定理的直接应用。第五章才会引入**离散傅里叶变换（DFT）**——对 DTFT 在频域采样，使得频域分析可以真正在计算机上跑起来。

所以本章的 DTFT 是 DFT 的理论基础：理解了 DTFT 的周期性和定义，DFT 就只是"在频域也做一次采样"。采样的对偶关系（时域离散化 $\leftrightarrow$ 频域周期化，频域离散化 $\leftrightarrow$ 时域周期化）将为理解 DFT 提供直接的思维框架。

**补充理解：** 如果把 DTFT 看作一座理论上的桥（连续频率），那么 DFT 就是在桥上铺的台阶（离散频率点），让你真的能走上去（用计算机算）。

---

**参考课件：**
- `Slides/chapter3-1.pdf`：DTFT 的定义、性质、定理、对称性、能量谱、频带受限信号、MATLAB 计算（对应教材第 3.1-3.7 节）
- `Slides/chapter3-2.pdf`：连续时间信号的数字处理，包括采样、恢复、混叠，以及带通信号采样（对应教材第 3.8-3.9 节）

**建议课后习题（课件推荐）：**
3.11, 3.17, 3.18(a)(c)(e), 3.25, 3.58, 3.62, 3.63, 3.66, M3.1, M3.2
