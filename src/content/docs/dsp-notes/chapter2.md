---
title: "第2章 离散时间信号时域分析"
description: "数字信号处理第2章：离散时间信号的时域表示与运算。"
date: 2026-04-30
tags: [dsp, signal-processing]
category: "课程复习"
docGroup: "dsp-notes"
order: 2
draft: false
---
# 第二章 离散时间信号的时域分析

> 自学笔记 | 基于课程 Slides Chapter 2
> Discrete-Time Signals in the Time Domain

---

## 本章学习目标

- 理解离散时间信号的时域表示方法
- 掌握序列的基本运算（加法、乘法、移位、反转、卷积）
- 理解有限长序列的循环移位与循环反转
- 会判断序列的类型（对称性、周期性、能量/功率信号等）
- 熟悉典型序列（单位采样、单位阶跃、正弦、指数序列）
- 理解采样过程及混叠现象
- 能用 MATLAB 生成基本序列

---

## 2.1 时域表示 (Time-Domain Representation)

### 2.1.1 什么是离散时间信号

**离散时间信号** $x[n]$ 表示为一个序列，其中 $n$ 为整数，取值范围为 $-\infty < n < \infty$。

关键点：
- $x[n]$ 只在整数 $n$ 处有定义，非整数处**无定义**
- 通常用花括号表示：$\{x[n]\}$
- 箭头 $\downarrow$ 标记 $n=0$ 的位置

**序列的表示法（序列分析的基础语法）：**

离散时间信号通常写为 $\{x[n]\}$ 或简写为 $x[n]$。当用花括号列出具体数值时，用箭头 $\downarrow$ 标记 $n=0$ 的位置：

$$\{x[n]\} = \{\ldots, -0.2, 2.2, \underline{1.1}, 0.2, -3.7, 2.9, \ldots\}$$

这里 $x[-1] = -0.2$，$x[0] = 2.2$，$x[1] = 1.1$，以此类推。**没有箭头时，通常默认第一个数是 $n=0$**，但这不绝对——做题时一定要先确认 $n=0$ 的位置。

MATLAB 中数组下标从 1 开始，而数学中 $n$ 可以从任意整数开始，这是初学编程时最常搞错的地方。

> **补充理解：** 注意离散时间信号和"数字信号"的区别——离散时间信号的自变量是离散的但幅值可以是连续的，而数字信号的幅值也被量化成离散值。

### 2.1.2 从连续信号采样得到离散信号

很多离散时间序列 $\{x[n]\}$ 是通过对连续时间信号 $x_a(t)$ 等间隔采样得到的：

$$x[n] = x_a(t)\big|_{t=nT} = x_a(nT), \quad n = \ldots, -2, -1, 0, 1, 2, \ldots$$

- $T$：**采样间隔**（sampling interval / sampling period）
- $F_T = \frac{1}{T}$：**采样频率**（sampling frequency），单位 Hz
- 实序列：$x[n]$ 对所有 $n$ 都是实数
- 复序列：$x[n]$ 存在虚部

复序列的表示：
$$\{x[n]\} = \{x_{re}[n]\} + j\{x_{im}[n]\}$$

复共轭序列：
$$\{x^*[n]\} = \{x_{re}[n]\} - j\{x_{im}[n]\}$$

**示例：**
- $\{x[n]\} = \{\cos 0.25n\}$ → 实序列
- $\{y[n]\} = \{e^{j0.3n}\} = \{\cos 0.3n\} + j\{\sin 0.3n\}$ → 复序列

### 2.1.3 序列的长度

**有限长序列**（finite-length / finite-duration）：只在有限区间 $N_1 \leq n \leq N_2$ 内有非零值。

长度定义：
$$N = N_2 - N_1 + 1$$

常用技巧——**零填充**（zero-padding）：在序列末尾补零以扩展长度。

> **为什么要零填充？** 两个常见场景：(1) 序列实际没那么长，但后文的 DFT/FFT 要求固定长度，就补零凑数；(2) 做 DFT 时补零可以让频谱采样更密——虽然不增加分辨率，但画出来的频谱曲线更光滑（详见第五章）。

向量形式（从 $n=0$ 开始的长为 $N$ 的序列）：
$$\mathbf{x} = [x[0]\quad x[1]\quad \ldots\quad x[N-1]]$$

**无限长序列的分类：**

| 类型 | 定义 | 特殊情况 |
|------|------|----------|
| **右边序列** (right-sided) | $x[n] = 0$ 对于 $n < N_1$ | 若 $N_1 \geq 0$，称为**因果序列** |
| **左边序列** (left-sided) | $x[n] = 0$ 对于 $n > N_2$ | 若 $N_2 \leq 0$，称为**反因果序列** |

### 2.1.4 信号的强度——范数 (Norm)

离散时间信号的强度通常用 $L_p$ 范数衡量：

$$||x||_p = \left(\sum_{n=-\infty}^{\infty} |x[n]|^p\right)^{1/p}$$

其中 $p$ 为正整数，工程中最常用 $p = 1, 2, \infty$：

| 范数 | 定义 | MATLAB |
|------|------|--------|
| $L_1$ | $\|x\|_1 = \sum \|x[n]\|$（绝对值之和） | `norm(x, 1)` |
| $L_2$ | $\|x\|_2 = \sqrt{\sum \|x[n]\|^2}$（欧几里得范数） | `norm(x, 2)` |
| $L_\infty$ | $\|x\|_\infty = \max\|x[n]\|$（峰值绝对值） | `norm(x, inf)` |

对于长度为 $N$ 的序列：
- $\frac{\|x\|_2}{\sqrt{N}}$ = **均方根值** (RMS)
- $\frac{\|x\|_1}{N}$ = **平均绝对值**

> 可以证明：$\|x\|_2 \leq \|x\|_1$

**应用——近似误差的度量：**

用 $y[n]$ 近似 $x[n]$（$0 \leq n \leq N-1$）：

- **均方误差** (MSE)：
  $$MSE = \frac{1}{N}\|y[n] - x[n]\|_2^2$$

- **相对误差**：
  $$E_{rel} = \frac{\|y[n] - x[n]\|_2}{\|x[n]\|_2}$$

---

## 2.2 序列的基本运算 (Basic Operations on Sequences)

### 2.2.1 基本运算

| 运算 | 表达式 | 框图符号 | 说明 |
|------|--------|----------|------|
| **调制**（乘积/加窗） | $w_1[n] = x[n] \cdot y[n]$ | $\otimes$ | 逐点相乘。叫"调制"因为乘一个高频载波就能搬移频谱；叫"加窗"因为乘一个有限长序列就能截断信号 |
| **数乘** | $w_2[n] = A \cdot x[n]$ | — | 缩放 |
| **加法** | $w_3[n] = x[n] + y[n]$ | $\oplus$ | 逐点相加 |
| **单位延时** | $w_4[n] = x[n-1]$ | $z^{-1}$ | 右移一位 |
| **单位超前** | $w_5[n] = x[n+1]$ | $z$ | 左移一位 |
| **时间反转** | $x[-n]$ | — | 以 $n=0$ 为轴翻转 |

### 2.2.2 示例：集合平均 (Ensemble Average)

> 这是一个将基本运算组合起来解决实际问题的好例子。

**问题：** 有一组含噪测量值 $\mathbf{x}_i = \mathbf{s} + \mathbf{d}_i$，其中 $\mathbf{s}$ 是真实信号，$\mathbf{d}_i$ 是第 $i$ 次测量的噪声向量。

**集合平均：**
$$\mathbf{x}_{ave} = \frac{1}{K}\sum_{i=1}^{K}\mathbf{x}_i = \frac{1}{K}\sum_{i=1}^{K}(\mathbf{s} + \mathbf{d}_i) = \mathbf{s} + \frac{1}{K}\sum_{i=1}^{K}\mathbf{d}_i$$

当 $K$ 足够大时，噪声平均 $\frac{1}{K}\sum\mathbf{d}_i$ 趋近于零，$\mathbf{x}_{ave} \to \mathbf{s}$。

> **补充理解：** 这就是为什么多次测量取平均能提高信噪比——信号成分相干叠加（增长 $K$ 倍），噪声非相干叠加（只增长 $\sqrt{K}$ 倍），信噪比提升 $\sqrt{K}$ 倍。

### 2.2.3 卷积和 (Convolution Sum)

**卷积和**是 DT 信号处理中最重要的运算之一：

$$y[n] = \sum_{k=-\infty}^{\infty} x[k]\,h[n-k] = \sum_{k=-\infty}^{\infty} h[k]\,x[n-k]$$

简记为：
$$y[n] = x[n] * h[n]$$

**卷积的计算步骤**（翻转-移位-相乘-求和）：
1. 将 $h[k]$ 翻转为 $h[-k]$
2. 将 $h[-k]$ 移位得到 $h[n-k]$
3. 逐点相乘 $x[k] \cdot h[n-k]$
4. 对所有 $k$ 求和

**示例：** $x[n] = h[n] = \delta[n] + \delta[n-1] + \delta[n-2]$

$$y[n] = x[n] * h[n] = \delta[n] + 2\delta[n-1] + 3\delta[n-2] + 2\delta[n-3] + \delta[n-4]$$

直观理解——想象两个"矩形"序列滑动重叠：
- $n=0$：重叠 1 个 → $y[0]=1$
- $n=1$：重叠 2 个 → $y[1]=2$
- $n=2$：重叠 3 个 → $y[2]=3$
- $n=3$：重叠 2 个 → $y[3]=2$
- $n=4$：重叠 1 个 → $y[4]=1$

**长度性质：** 若 $x[n]$ 长度为 $M$，$h[n]$ 长度为 $N$，则 $y[n] = x[n] * h[n]$ 的长度为 $M + N - 1$。

### 2.2.4 采样率变换 (Sampling Rate Alteration)

**上采样** (Up-sampling) —— 因子 $L$，在每两个样本之间插入 $L-1$ 个零：

$$x_u[n] = \begin{cases} x[n/L], & n = 0, \pm L, \pm 2L, \ldots \\ 0, & \text{otherwise} \end{cases}$$

**下采样** (Down-sampling) —— 因子 $M$，每隔 $M$ 个样本取一个：

$$x_d[n] = x[Mn]$$

> **补充理解：** 上采样不丢失信息（可以恢复），但下采样可能造成混叠（高频折叠到低频），所以实际系统中通常先低通滤波再下采样。

---

## 2.3 有限长序列的运算

对于定义在 $0 \leq n \leq N-1$ 的长度为 $N$ 的序列，普通的移位/反转会超出定义范围，需要定义"循环"版本的运算。

### 2.3.1 取模运算 (Modulo Operation)

$$\langle m \rangle_N = m \bmod N$$

含义：找到唯一的 $r \in [0, N-1]$ 使得 $m = r + \ell N$（$\ell$ 为整数）。

**示例：**
- $N=7,\; m=25$：$r = 25 - 7 \times 3 = 4$，故 $\langle 25 \rangle_7 = 4$
- $N=7,\; m=-15$：$r = -15 + 7 \times 3 = 6$，故 $\langle -15 \rangle_7 = 6$

### 2.3.2 循环时间反转

$$\{y[n]\} = \{x[\langle -n \rangle_N]\}, \quad 0 \leq n \leq N-1$$

等价于：
$$x[\langle -n \rangle_N] = \begin{cases} x[N-n], & 1 \leq n \leq N-1 \\ x[n], & n = 0 \end{cases}$$

> 因为 $\langle -n \rangle_N = \langle N-n \rangle_N$（当 $1 \leq n \leq N-1$ 时）

### 2.3.3 循环移位

$$x_c[n] = x[\langle n - n_0 \rangle_N]$$

对于 $n_0 > 0$（向右循环移位）：

$$x_c[n] = \begin{cases} x[n - n_0], & n_0 \leq n \leq N-1 \\ x[N - n_0 + n], & 0 \leq n < n_0 \end{cases}$$

> 直观理解：序列像围成一个圆圈，移位时从一端移出的样本从另一端绕回来。

### 2.3.4 序列的分类

#### (1) 按对称性分类

| | 复序列 $x[n]$ | 实序列 $x[n]$ |
|---|---|---|
| **对称** | 共轭对称：$x^*[n] = x[-n]$ | 偶对称：$x[n] = x[-n]$ |
| **反对称** | 共轭反对称：$x^*[n] = -x[-n]$ | 奇对称：$x[n] = -x[-n]$ |

任意复序列可分解为两部分：
$$x_{cs}[n] = \frac{1}{2}\{x[n] + x^*[-n]\} \quad \text{（共轭对称部分）}$$
$$x_{ca}[n] = \frac{1}{2}\{x[n] - x^*[-n]\} \quad \text{（共轭反对称部分）}$$

#### (2) 按周期性分类

周期序列满足：
$$\tilde{x}[n] = \tilde{x}[n + kN], \quad \forall n$$

$N$ 称为周期。**基波周期** $N_f$ = 满足上述条件的最小正整数 $N$。

**两个周期序列相加的周期：**
$$N = LCM(N_a, N_b) = \frac{N_a \cdot N_b}{GCD(N_a, N_b)}$$

**示例：** $f[n] = \cos\frac{\pi}{8}n + \frac{1}{2}\sin\frac{\pi}{6}n$

- $\cos\frac{\pi}{8}n$ 的周期：$\frac{2\pi}{\pi/8} = 16$
- $\sin\frac{\pi}{6}n$ 的周期：$\frac{2\pi}{\pi/6} = 12$
- $GCD(16, 12) = 4$
- 基波周期 $N = \frac{16 \times 12}{4} = 48$

#### (3) 能量信号与功率信号

**总能量：**
$$\mathcal{E}_x = \sum_{n=-\infty}^{\infty} |x[n]|^2$$

**平均功率：**
$$P_x = \lim_{K \to \infty} \frac{1}{2K+1} \sum_{n=-K}^{K} |x[n]|^2$$

| 类型 | 能量 | 功率 |
|------|------|------|
| **能量信号** | 有限 | 零 |
| **功率信号** | 无限 | 有限且非零 |

**示例——功率信号：**
$$x[n] = \begin{cases} 3(-1)^n, & n \geq 0 \\ 0, & n < 0 \end{cases}$$
能量无限，但平均功率：
$$P_x = \lim_{K \to \infty} \frac{1}{2K+1} \cdot 9(K+1) = 4.5$$

#### (4) 其他分类

**有界序列：** $|x[n]| \leq B_x < \infty$
- 例：$x[n] = \cos(0.3\pi n)$，$|x[n]| \leq 1$

**绝对可和** (absolutely summable)：$\sum_{n=-\infty}^{\infty} |x[n]| < \infty$
- 例：$y[n] = 0.3^n$（$n \geq 0$），$\sum 0.3^n = \frac{1}{1-0.3} \approx 1.43$

**平方可和** (square-summable)：$\sum_{n=-\infty}^{\infty} |x[n]|^2 < \infty$
- 例：$h[n] = \frac{\sin 0.4n}{\pi n}$，平方可和但非绝对可和

**$N$ 周期延拓：**
$$\tilde{y}[n] = \sum_{k=-\infty}^{\infty} x[n + kN]$$
既非绝对可和也非平方可和。

---

## 2.4 典型序列与表示

### 2.4.1 基本序列

**单位采样序列**（unit sample / 离散 $\delta$ 函数）：
$$\delta[n] = \begin{cases} 1, & n = 0 \\ 0, & n \neq 0 \end{cases}$$

**单位阶跃序列**（unit step）：
$$\mu[n] = \begin{cases} 1, & n \geq 0 \\ 0, & n < 0 \end{cases}$$

两者的关系：
- $\mu[n] = \sum_{k=-\infty}^{n} \delta[k]$（阶跃是 $\delta$ 的累加）
- $\delta[n] = \mu[n] - \mu[n-1]$（$\delta$ 是阶跃的差分）

### 2.4.2 任意序列的脉冲表示

任意序列都可以表示为加权延时的单位采样之和：

$$x[n] = \sum_{k=-\infty}^{\infty} x[k]\,\delta[n-k]$$

**示例：**
$$x[n] = 0.5\delta[n+2] + 1.5\delta[n-1] - \delta[n-2] + \delta[n-4] + 0.75\delta[n-6]$$

> 这就是为什么理解系统对 $\delta[n]$ 的响应如此重要——知道单位脉冲响应 $h[n]$，就可以通过卷积求任意输入的输出。

### 2.4.3 矩形窗序列 (Box-car Sequence)

$$w_R[n] = \begin{cases} 0, & n < N_1 \\ 1, & N_1 \leq n \leq N_2 \\ 0, & n > N_2 \end{cases}$$

**加窗操作：**
$$x[n] \cdot w_R[n] = \begin{cases} 0, & n < N_1 \\ x[n], & N_1 \leq n \leq N_2 \\ 0, & n > N_2 \end{cases}$$

> 将无限长序列截断为有限长——这是实际频谱分析中不可避免的操作（第三章会详细讨论加窗对频谱的影响）。

### 2.4.4 正弦序列 (Sinusoidal Sequence)

$$x[n] = A\cos(\omega_0 n + \phi), \quad -\infty < n < \infty$$

- $A$：振幅 (amplitude)
- $\omega_0$：**归一化数字角频率** (normalized digital angular frequency)，单位 rad/sample
- $\phi$：相位 (phase)，单位 rad
- $f_0 = \frac{\omega_0}{2\pi}$：归一化频率，单位 cycles/sample

**同相/正交分解：**
$$x[n] = x_i[n] + x_q[n]$$

其中：
$$x_i[n] = A\cos\phi \cdot \cos(\omega_0 n) \quad \text{（同相分量）}$$
$$x_q[n] = -A\sin\phi \cdot \sin(\omega_0 n) \quad \text{（正交分量）}$$

### 2.4.5 指数序列 (Exponential Sequence)

**一般形式：**
$$x[n] = A\alpha^n, \quad -\infty < n < \infty$$

其中 $A$ 和 $\alpha$ 可以为实数或复数。

**复指数序列：** 令 $\alpha = e^{\sigma_0 + j\omega_0}$，$A = |A|e^{j\phi}$：

$$x[n] = |A|e^{\sigma_0 n} e^{j(\omega_0 n + \phi)}$$

$$= |A|e^{\sigma_0 n}\cos(\omega_0 n + \phi) + j|A|e^{\sigma_0 n}\sin(\omega_0 n + \phi)$$

实部和虚部：
$$x_{re}[n] = |A|e^{\sigma_0 n}\cos(\omega_0 n + \phi)$$
$$x_{im}[n] = |A|e^{\sigma_0 n}\sin(\omega_0 n + \phi)$$

特例——**复正弦序列**（$\sigma_0 = 0$）：
$$e^{j\omega_0 n} = \cos\omega_0 n + j\sin\omega_0 n$$

实际指数序列（$A$、$\alpha$ 均为实数）：
- $\alpha > 1$：增长型指数
- $0 < \alpha < 1$：衰减型指数
- $\alpha < 0$：交替变号

### 2.4.6 正弦和指数序列的周期性

**判断准则：** $x[n] = A\cos(\omega_0 n + \phi)$ 是周期序列 **当且仅当** $\frac{2\pi}{\omega_0}$ 是有理数。

**推导过程：**

要使 $x_1[n] = A\cos(\omega_0 n + \phi)$ 和 $x_2[n] = A\cos(\omega_0(n+N) + \phi)$ 相等。

首先用三角恒等式展开 $x_2[n]$（令 $A = \omega_0 n + \phi$，$B = \omega_0 N$，用 $\cos(A+B)=\cos A\cos B-\sin A\sin B$）：

$$x_2[n] = \cos(\omega_0 n + \phi)\cos\omega_0 N - \sin(\omega_0 n + \phi)\sin\omega_0 N$$

这等于 $x_1[n]$ 当且仅当 $\sin\omega_0 N = 0$ 且 $\cos\omega_0 N = 1$。

这要求：
$$\omega_0 N = 2\pi r \quad \text{或} \quad \frac{2\pi}{\omega_0} = \frac{N}{r}$$

其中 $N$ 和 $r$ 为正整数。基波周期为使上式成立的最小 $N$。

**示例：**
- $x[n] = \sin(3n)$：$2\pi/3$ 是无理数 → **非周期**
- $y[n] = \cos(0.1\pi n)$：$2\pi/0.1\pi = 20$，有理数 → **周期** $N = 20$

### 2.4.7 正弦序列的两个重要性质

#### 性质 1：频率的 $2\pi$ 周期性

若 $\omega_2 = \omega_1 + 2\pi k$（$k$ 为整数），则：
$$x_2[n] = A\cos((\omega_1 + 2\pi k)n + \phi) = A\cos(\omega_1 n + \phi) = x_1[n]$$

> $\omega_1$ 和 $\omega_2$ **不可区分**。所以我们通常限制 $\omega \in [0, 2\pi)$ 或 $[-\pi, \pi)$。

#### 性质 2：最高振荡频率为 $\pi$

- 离散正弦序列的最高频率是 $\omega = \pi$（即 $f = 0.5$ cycles/sample）
- $\cos(1.1\pi n) = \cos((2\pi - 1.1\pi)n) = \cos(0.9\pi n)$
- $\cos(0.8\pi n) = \cos((2\pi - 0.8\pi)n) = \cos(1.2\pi n)$

$\omega = \pi$ 称为**折叠频率** (folding frequency)。

> **补充理解：** 类比于采样定理——要在每个周期至少采两个点才能分辨该频率。$\omega = \pi$ 意味着每个周期正好 2 个样点，这是离散系统能表示的最高频率。

### 2.4.8 MATLAB 生成序列

**示例：** 生成复指数序列 $x[n] = \exp\left((-\frac{1}{12} + j\frac{\pi}{6})n\right)$

```matlab
n = 0:40;
K = 1;
c = (-1 + j*pi) / 12;
x = K * exp(c * n);

stem(n, real(x));  title('Real part');
stem(n, imag(x));  title('Imaginary part');
```

---

## 2.5 采样过程 (The Sampling Process)

### 2.5.1 均匀采样

从连续时间信号 $x_a(t)$ 通过等间隔采样得到离散序列：

$$x[n] = x_a(t)\big|_{t=nT} = x_a(nT)$$

时间变量之间的关系：
$$t_n = nT = \frac{n}{F_T} = \frac{2\pi n}{\Omega_T}$$

其中：
- $F_T = 1/T$：采样频率 (Hz)
- $\Omega_T = 2\pi F_T$：采样角频率 (rad/s)

### 2.5.2 频率量的总结

| 符号 | 含义 | 单位 |
|------|------|------|
| $f_0$ | 连续信号频率 | Hz (cycles/sec) |
| $\Omega_0 = 2\pi f_0$ | 连续信号角频率 | rad/sec |
| $F_T$ | 采样频率 | Hz (samples/sec) |
| $T = 1/F_T$ | 采样间隔 | sec (sec/sample) |
| $\omega_0 = \Omega_0 T$ | 归一化数字角频率 | rad/sample |

### 2.5.3 对正弦信号的采样

连续正弦信号：
$$x(t) = A\cos(2\pi f_0 t + \phi) = A\cos(\Omega_0 t + \phi)$$

采样后的离散序列：
$$x[n] = A\cos(\Omega_0 nT + \phi) = A\cos\left(\frac{2\pi\Omega_0}{\Omega_T}n + \phi\right) = A\cos(\omega_0 n + \phi)$$

其中归一化数字角频率：
$$\omega_0 = \frac{2\pi\Omega_0}{\Omega_T} = \Omega_0 T$$

### 2.5.4 混叠现象 (Aliasing)

**关键实验（Example 2.15）：** 三个不同频率的连续信号

$$g_1(t) = \cos(6\pi t) \quad (3\text{ Hz})$$
$$g_2(t) = \cos(14\pi t) \quad (7\text{ Hz})$$
$$g_3(t) = \cos(26\pi t) \quad (13\text{ Hz})$$

以 $T = 0.1$ sec 采样后：

$$g_1[n] = \cos(0.6\pi n)$$
$$g_2[n] = \cos(1.4\pi n) = \cos((2\pi - 0.6\pi)n) = \cos(0.6\pi n)$$
$$g_3[n] = \cos(2.6\pi n) = \cos((2\pi + 0.6\pi)n) = \cos(0.6\pi n)$$

**三个不同频率的信号采样后完全一样！**

这就是**混叠**（aliasing）——高频连续信号经采样后伪装成低频离散序列。

**防止混叠的条件（采样定理）：**

已知 $\omega_0 = 2\pi\Omega_0/\Omega_T$

- 若 $\Omega_T > 2\Omega_0$：$\omega_0 \in (-\pi, \pi)$，**无混叠**
- 若 $\Omega_T < 2\Omega_0$：$\omega_0$ 折叠进 $(-\pi, \pi)$，**发生混叠**

> **结论：采样频率必须大于信号最高频率的 2 倍**（奈奎斯特采样定理，第三章将严格推导）。

---

## 重点难点总结

| 重点/难点 | 说明 |
|-----------|------|
| 序列表示法 | 区分 $x[n]$（第 $n$ 个样值）和 $\{x[n]\}$（整个序列）；注意箭头标记 $n=0$ |
| 卷积和 | 理解翻转→移位→相乘→求和四步骤；记住长度公式 $M+N-1$ |
| 循环移位 vs 线性移位 | 有限长序列用取模实现循环，普通移位会超出定义域 |
| 周期性判断 | 关键公式：$2\pi/\omega_0$ 必须是有理数 |
| 共轭对称分解 | 任意复序列 = 共轭对称部分 + 共轭反对称部分 |
| 混叠的本质 | $\cos(2\pi k \pm \omega)n = \cos\omega n$，离散域频率有 $2\pi$ 周期性 |
| 折叠频率 $\pi$ | 离散系统能表示的最高频率，高于 $\pi$ 的频率等价于低于 $\pi$ 的频率 |

---

## 配套例题

**例 1：判断序列长度和类型**

序列 $x[n] = \{0, 0, \underline{1}, 2, 3, 0, 0\}$（仅显示非零区间）

- $N_1 = 0$，$N_2 = 4$，长度 $N = 5$
- $x[n] = 0$ 对于 $n < 0$ → 右边序列
- 又 $N_1 = 0 \geq 0$ → **因果序列**

**例 2：卷积计算**

$x[n] = \{\underline{1}, 1\}$，$h[n] = \{\underline{1}, 1\}$

| $n$ | $h[n-k]$ 与 $x[k]$ 重叠 | $y[n]$ |
|-----|--------------------------|--------|
| 0 | $x[0]h[0] = 1$ | 1 |
| 1 | $x[0]h[1] + x[1]h[0] = 1+1$ | 2 |
| 2 | $x[1]h[1] = 1$ | 1 |

$y[n] = \{\underline{1}, 2, 1\}$，长度 $2+2-1 = 3$ ✓

**例 3：判断周期性**

$x[n] = \cos(0.5n)$

- $\omega_0 = 0.5$，$2\pi/0.5 = 4\pi$ → 无理数
- **非周期序列**

---

## 自测题

1. 离散时间信号 $x[n]$ 中 $n$ 可以是非整数吗？为什么？
2. 长度分别为 5 和 7 的两个序列做卷积，结果长度为多少？
3. "因果序列"和"右边序列"有什么区别？
4. 判断 $\cos(0.25\pi n)$ 是否是周期序列？若是，基波周期是多少？
5. 为什么说离散正弦序列的最高频率是 $\pi$？
6. 用 $F_T = 100$ Hz 采样 $x_a(t) = \cos(2\pi \cdot 60 t)$，会发生混叠吗？为什么？
7. 长度为 8 的序列 $x[n]$ 进行 $\langle -3 \rangle_8$ 的循环反转，结果索引 $n=3$ 处取原序列的哪个值？

**答案：**
1. 不可以，$n$ 必须是整数，非整数处无定义
2. $5 + 7 - 1 = 11$
3. 因果序列是右边序列在 $N_1 \geq 0$ 时的特例；右边序列只要求存在某个 $N_1$ 使得 $n < N_1$ 时 $x[n]=0$
4. 是周期序列。$\omega_0 = 0.25\pi$，$2\pi/\omega_0 = 2\pi/0.25\pi = 8$，基波周期 $N=8$
5. 因为 $\cos((2\pi - \omega)n) = \cos(\omega n)$，频率高于 $\pi$ 等价于低于 $\pi$ 的某个频率。$\pi$ 就是折叠频率
6. 会混叠。信号频率 60 Hz，采样频率 100 Hz，$100 < 2 \times 60 = 120$，不满足奈奎斯特条件
7. 循环反转的定义是 $y[n] = x[\langle -n \rangle_N]$（$0 \leq n \leq N-1$）。题目问 $n=3$ 时 $y[3]$ 取 $x$ 的哪个值——先算 $\langle -3 \rangle_8 = 8 - 3 = 5$（因为 $-3 + 8 \times 1 = 5$），所以 $y[3] = x[5]$。就是说，在长度为 8 的圆环上，位置 3 在反转后对应原序列的位置 5。

---

## 学习建议

1. **先理解概念再做题**：清晰地理解"离散"的含义和序列表示法是后续所有内容的基础
2. **多动手算卷积**：拿出纸笔，对简单的短序列手算几个卷积，真正理解翻转-移位-相乘-求和的过程
3. **与 MATLAB 联动**：用 `conv`、`filter`、`stem` 命令验证手算结果
4. **混叠是关键**：2.5 节的混叠概念在第三章采样定理中会再次出现，确保这里完全理解
5. **作业**：课后完成习题 2.3, 2.4(a)(b), 2.5, 2.9, 2.19, 2.21, 2.27, 2.28, 2.47, 2.51 和 MATLAB 习题 M2.2, M2.3, M2.4

---

## 后续章节衔接

- **第三章**：将本章时域概念扩展到频域（DTFT），并严格推导采样定理
- **后续章节**：卷积和是 LTI 系统分析的核心，所有滤波操作都基于卷积

---

*Last updated: 2026-04-28*
