---
title: "DSP 期末考试速查"
description: "结合 2022–2025 四套真题整理的开卷速查：高频公式、做题流程、易错检查和题型-章节映射。"
date: 2026-06-28
tags: [dsp, signal-processing, exam]
category: "课程学习"
docGroup: "dsp-notes"
order: 12
draft: false
---

# DSP 期末考试速查

> 本页是把 11 章笔记按考试使用频率重新排列的精简版。考场翻到这一页，先确认题型属于哪一类，再按流程写答案。

## 1. 题型 → 章节速查表

| 题干关键词 | 章节 | 核心操作 |
|---|---|---|
| real sequence DFT、conjugate symmetry、odd/even DFT | ch5 | $X[k]=X^*[\langle-k\rangle_N]$ |
| DIT-FFT、bit reversal、butterfly、复乘复加 | ch5+ch11 | $N/2\cdot\log_2 N$ 复乘，DIT 输入比特反转 |
| DFT length change、zero padding、repeat、upsample | ch5 | 补零→更密采样DTFT；重复→奇数bin为零；插零→频谱压缩+镜像 |
| sampling、aliasing、reconstruction、$(-1)^n$ | ch3 | $\omega=\Omega T=2\pi f/F_s$；$(-1)^n=e^{j\pi n}$ 平移 $\pi$ |
| linear、time-invariant、causal、stable | ch4 | 按定义证明 |
| cascade、parallel、overall response | ch4 | 级联 $H=H_1H_2$；并联 $H=H_1+H_2$ |
| input/output spectrum、system identification | ch4 | $H=Y/X$ 只在 $X\ne0$ 频率可确定；$\delta[n]$ 最佳 |
| $H(z)$、ROC、pole-zero、difference equation | ch6 | 差分方程 $\leftrightarrow H(z) \leftrightarrow h[n]$；因果 ROC 在最外极点外 |
| Direct Form II、canonical structure | ch8 | 分母反馈 $-a_k$、分子前馈 $b_k$ 共用延时链 |
| linear phase FIR Type I–IV | ch7 | 对称/反对称 + 长度奇偶 |
| minimum phase、maximum phase、allpass、equalizer | ch7 | 单位圆外零点倒共轭 $1/z_0^*$ 进单位圆 |
| Butterworth、bilinear transform、prewarping | ch9 | $\Omega=\frac{2}{T}\tan(\omega/2)$；阶数向上取整 |
| window method、Hamming/Hann/Blackman | ch10 | 指标→$\omega_c$→选窗→算阶数→$h[n]=h_d[n-\alpha]w[n]$ |
| fewest multipliers、linear phase structure | ch8+ch10 | 对称先加再乘 |

## 2. 频率换算三件套

$$
\boxed{\omega=\Omega T=\frac{2\pi f}{F_s}}
$$

| 已知 | 求 | 公式 |
|---|---|---|
| Hz $f$ | 数字频率 $\omega$ | $\omega=2\pi f/F_s$ |
| 数字频率 $\omega$ | Hz $f$ | $f=\omega F_s/(2\pi)$ |
| 模拟角频率 $\Omega$ | 数字频率 $\omega$ | $\omega=\Omega T$ |
| DFT bin $k$ | Hz $f_k$ | $f_k=kF_s/N$（$k\le N/2$）；$f_k=(k-N)F_s/N$（$k>N/2$） |
| $f=F_s/2$ | $\omega$ | $\omega=\pi$（Nyquist） |

⚠️ **考场第一件事：** 看题目给的频率单位。给 Hz 先换 $\omega$，给 kHz 先除 1000。

## 3. DFT / FFT 核心公式

### 3.1 DFT 定义

$$
X[k]=\sum_{n=0}^{N-1}x[n]W_N^{kn},\quad W_N=e^{-j2\pi/N}
$$

$$
x[n]=\frac{1}{N}\sum_{k=0}^{N-1}X[k]W_N^{-kn}
$$

⚠️ IDFT 有 $1/N$。考试常见丢分点。

### 3.2 快速检查公式

| 检查项 | 公式 |
|---|---|
| $X[0]$（直流） | $\sum_{n=0}^{N-1}x[n]$ |
| $x[0]$ | $\frac{1}{N}\sum_{k=0}^{N-1}X[k]$ |
| 能量（Parseval） | $\sum\|x[n]\|^2=\frac{1}{N}\sum\|X[k]\|^2$ |

### 3.3 实序列 DFT 对称

$$
X[k]=X^*[\langle -k\rangle_N]
$$

- $X[0]$ 一定实数
- $N$ 偶数时 $X[N/2]$ 一定实数
- 实部偶对称、虚部奇对称、幅度偶对称、相位奇对称

### 3.4 DFT 性质速查

| 时域 | 频域 |
|---|---|
| $x[\langle n-n_0\rangle_N]$ | $W_N^{kn_0}X[k]$ |
| $W_N^{-k_0n}x[n]$ | $X[\langle k-k_0\rangle_N]$ |
| $(-1)^n x[n]$（$N$ 偶） | $X[\langle k-N/2\rangle_N]$ |
| $Y[k]=(-1)^kX[k]$ | $y[n]=x[\langle n-N/2\rangle_N]$ |

### 3.5 FFT 复杂度

- 级数：$\log_2 N$
- 复乘：$\frac{N}{2}\log_2 N$
- 复加：$N\log_2 N$
- DIT：输入 bit-reversed，输出 normal
- DIF：输入 normal，输出 bit-reversed

8 点 DIT 输入顺序：$0,4,2,6,1,5,3,7$

### 3.6 DFT 长度变化

| 操作 | 频域效果 |
|---|---|
| 末尾补零到 $N'$ | DTFT 更密采样，不增加真实分辨率 |
| 时域重复成 $2N$ 点 | $Y[2k]=2X[k]$，$Y[2k+1]=0$ |
| 时域插零（$y[2n]=x[n]$） | $Y[k]=X[k\bmod N]$（频谱压缩+镜像） |

## 4. 采样与恢复

### 4.1 采样频谱

$$
G_p(j\Omega)=\frac{1}{T}\sum_{k=-\infty}^{\infty}G_a(j(\Omega-k\Omega_s))
$$

- 幅度有 $1/T$ 因子
- 副本间隔 $\Omega_s=2\pi/T=2\pi F_s$

### 4.2 Nyquist 条件

$$
F_s>2f_m\quad\Longleftrightarrow\quad\Omega_s>2\Omega_m
$$

### 4.3 混叠折回

频率 $f$ 采样后等效为距最近 $kF_s$ 的差：

$$
f_{alias}=|f-kF_s|
$$

数字频率 $>\pi$ 折回：$\cos(\omega n)=\cos((\omega-2\pi)n)$（$\omega>\pi$ 时）

### 4.4 重构滤波器

通带增益 $=T$（抵消采样时 $1/T$）

### 4.5 $(-1)^n$ 频谱搬移

$$
(-1)^n=e^{j\pi n},\quad (-1)^n x[n]\leftrightarrow X(e^{j(\omega-\pi)})
$$

频谱复用 $y[n]=x_1[n]+(-1)^n x_2[n]$：低频 $x_1$ + 高频搬移的 $x_2$，可用低通/高通分离。

## 5. Z 变换与系统函数

### 5.1 常用变换对

| 序列 | Z 变换 | ROC |
|---|---|---|
| $a^n u[n]$ | $\frac{1}{1-az^{-1}}$ | $\|z\|>\|a\|$ |
| $-a^n u[-n-1]$ | $\frac{1}{1-az^{-1}}$ | $\|z\|<\|a\|$ |
| $\delta[n]$ | $1$ | 全平面 |

### 5.2 ROC 判断

| 序列类型 | ROC |
|---|---|
| 右边序列（因果） | 最外极点外 |
| 左边序列（反因果） | 最内极点内 |
| 双边序列 | 极点之间圆环 |

### 5.3 因果稳定

- 因果：ROC 在最外极点外
- 稳定：ROC 包含单位圆
- **因果且稳定有理系统：所有极点在单位圆内**

### 5.4 差分方程 → $H(z)$

$$
\sum a_k y[n-k]=\sum b_k x[n-k]\quad\Longleftrightarrow\quad H(z)=\frac{\sum b_k z^{-k}}{\sum a_k z^{-k}}
$$

⚠️ 反馈项符号：分母 $1+a_1 z^{-1}$ 对应 $y[n]=-a_1 y[n-1]+\cdots$

### 5.5 频率响应

$$
H(e^{j\omega})=H(z)\big|_{z=e^{j\omega}}
$$

前提是单位圆在 ROC 中。

## 6. 系统性质证明模板

### 线性

1. 设 $x_1\to y_1$，$x_2\to y_2$
2. 令 $x=ax_1+bx_2$
3. 算输出，看是否等于 $ay_1+by_2$

### 时不变

1. 原输入 $x_1\to y_1$
2. 延迟输入 $x_2[n]=x_1[n-n_0]$
3. 新输出 $y_2[n]$ vs 原输出延迟 $y_1[n-n_0]$

### 因果

看 $y[n_0]$ 是否依赖 $x[n]$（$n>n_0$）

### 稳定（LTI）

$$
\sum_n |h[n]|<\infty
$$

## 7. 线性相位 FIR 四类型

| 类型 | 对称/反对称 | 长度 | 强制零点 | 适合 |
|---|---|---|---|---|
| Type I | 对称 | 奇数 | 无 | 低通（首选） |
| Type II | 对称 | 偶数 | $\omega=\pi$ | 低通（可行）；**不做普通高通** |
| Type III | 反对称 | 奇数 | $\omega=0,\pi$ | Hilbert、微分器 |
| Type IV | 反对称 | 偶数 | $\omega=0$ | Hilbert、微分器 |

### 最小相位构造

零点 $z_0$ 在单位圆外 → 替换为 $1/z_0^*$（倒共轭到单位圆内） → 原系统 = 最小相位 × 全通

### 均衡器

原系统有单位圆外零点 → 逆系统有单位圆外极点 → **不存在稳定因果逆**

## 8. IIR 滤波器设计（Butterworth + 双线性）

### 考场完整流程

$$
\boxed{
\text{Hz}\xrightarrow{\omega=2\pi f/F_s}\text{数字频率}\xrightarrow{\Omega=\frac{2}{T}\tan(\omega/2)}\text{预畸变}\xrightarrow{\epsilon^2,A^2}\text{阶数}\xrightarrow{\text{BLT}}H(z)
}
$$

**步骤 1：** 统一数字频率 $\omega_p=2\pi f_p/F_s$，$\omega_s=2\pi f_s/F_s$

**步骤 2：** 预畸变 $\Omega_p=\frac{2}{T}\tan(\omega_p/2)$，$\Omega_s=\frac{2}{T}\tan(\omega_s/2)$

**步骤 3：** dB → 线性
$$
\epsilon^2=10^{\alpha_p/10}-1,\quad A^2=10^{\alpha_s/10}
$$

**步骤 4：** Butterworth 阶数（**向上取整**）
$$
N\ge\frac{\log_{10}[(A^2-1)/\epsilon^2]}{2\log_{10}(\Omega_s/\Omega_p)}
$$

**步骤 5：** 截止频率 $\Omega_c=\Omega_p/\epsilon^{1/N}$

**步骤 6：** 双线性变换 $s=\frac{2}{T}\frac{1-z^{-1}}{1+z^{-1}}$

⚠️ 常见错：不做预畸变、阶数四舍五入、dB 用 $10\log$ 代替 $20\log$

## 9. FIR 滤波器设计（窗函数法）

### 考场完整流程

$$
\boxed{
\text{Hz}\to\omega\to\Delta\omega\to\omega_c\to\text{选窗}\to M,N\to h_d[m]\to h[n]=h_d[n-\alpha]w[n]
}
$$

**步骤 1：** $\omega_p=2\pi f_p/F_s$，$\omega_s=2\pi f_s/F_s$

**步骤 2：** $\Delta\omega=\omega_s-\omega_p$，$\omega_c=(\omega_p+\omega_s)/2$

**步骤 3：** 选窗（阻带衰减 $A=-20\log_{10}\delta$，$\delta=\min(\delta_p,\delta_s)$）

| 窗 | 衰减 | 过渡带宽 |
|---|---|---|
| Rectangular | ~21 dB | $4\pi/N$ |
| Hann | ~44 dB | $8\pi/N$ |
| Hamming | ~53 dB | $8\pi/N$ |
| Blackman | ~74 dB | $12\pi/N$ |

**步骤 4：** 估算 $N\approx C\pi/\Delta\omega$，Type I 取奇数 $N$，$M=N-1$，$\alpha=M/2$

**步骤 5：** 理想低通 $h_d[m]=\frac{\sin(\omega_c m)}{\pi m}$（$m\ne0$），$h_d[0]=\omega_c/\pi$

**步骤 6：** 加窗 $h[n]=h_d[n-\alpha]w[n]$

**步骤 7：** 最省乘法结构：对称先加再乘，乘法器数 $\lceil N/2\rceil$

### 高通 / 带通 / 带阻

- 高通：$h_{HP}[m]=\delta[m]-h_{LP}[m]$
- 带通：$h_{BP}[m]=\frac{\sin(\omega_2 m)-\sin(\omega_1 m)}{\pi m}$
- 带阻：$h_{BS}[m]=\delta[m]-h_{BP}[m]$

## 10. 滤波器结构

### 基本构件

| 构件 | 符号 | 作用 |
|---|---|---|
| 延时器 | $z^{-1}$ | 存储一个采样点 |
| 乘法器 | 系数 $a_k$, $b_k$ | 乘以常数 |
| 加法器 | $+$ | 求和 |

### DF-I vs DF-II

| 特性 | DF-I | DF-II |
|---|---|---|
| 延时链 | 两条（前馈 + 反馈） | 一条（共用 $w[n]$） |
| 延时器数 | $M+N$ | $\max(M,N)$ |
| 别名 | — | canonical structure |
| 优先级 | 概念清晰 | 考试首选 |

### DF-II 核心方程

$$
w[n]=x[n]-\sum_{k=1}^{N}a_k w[n-k]
$$

$$
y[n]=\sum_{k=0}^{M}b_k w[n-k]
$$

延时器数：$\max(M,N)$（canonical）

⚠️ 反馈来自 $w[n-k]$，不是 $y[n-k]$。

### 级联 vs 并联

| 特性 | 级联 (Cascade) | 并联 (Parallel) |
|---|---|---|
| 系统函数 | $H=\prod H_i$（相乘） | $H=C+\sum H_i$（相加） |
| 实现方式 | 前一节输出接后一节输入 | 所有支路共用输入，输出相加 |
| 展开方法 | 因式分解 | 部分分式展开 |
| 优点 | 量化误差可控 | 各支路独立，易于并行 |

**级联结构步骤：**
1. 因式分解 $H(z)=G\prod H_i(z)$
2. 每个 $H_i(z)$ 用一阶或二阶节实现
3. 复共轭极/零点放同一二阶节

**并联结构步骤：**
1. 部分分式展开 $H(z)=C+\sum H_i(z)$
2. 不要漏掉常数直通项 $C$
3. 每个支路独立实现

### FIR 对称省乘法

$$
h[n]=h[M-n]\Rightarrow h[n]\{x[k-n]+x[k-M+n]\}
$$

先加后乘，乘法器数从 $N$ 降到 $\lceil N/2\rceil$

## 11. 考场策略

### 2022–2025 真题分布

| 年份 | Q1 | Q2 | Q3 | Q4 | Q5 | Q6 |
|---|---|---|---|---|---|---|
| 2022 | 线性相位FIR(ch7) | DFT/FFT(ch5) | 采样恢复(ch3) | FIR设计(ch10) | — | — |
| 2023 | H(z)零极点(ch6) | DFT对称(ch5) | 线性相位FIR设计(ch7) | IIR设计(ch9) | — | — |
| 2024 | DFT性质(ch5) | 零极点+h[n](ch6) | 最小相位(ch7) | FIR设计(ch10) | — | — |
| 2025 | 采样+$(-1)^n$(ch3) | 级联系统(ch4) | 系统辨识(ch4) | H(z)+DF-II(ch6+ch8) | DFT长度(ch5) | 自选设计(ch9/10) |

### 必考公式 Top 10

1. $\omega=2\pi f/F_s$（频率换算）
2. $X[k]=\sum x[n]W_N^{kn}$（DFT 定义）
3. $X[k]=X^*[\langle -k\rangle_N]$（实序列对称）
4. $\sum|x[n]|^2=\frac{1}{N}\sum|X[k]|^2$（Parseval）
5. $(-1)^n=e^{j\pi n}$（频谱搬移 $\pi$）
6. $a^n u[n]\leftrightarrow 1/(1-az^{-1})$，$|z|>|a|$（Z 变换）
7. $\Omega=\frac{2}{T}\tan(\omega/2)$（预畸变）
8. $N\ge\frac{\log[(A^2-1)/\epsilon^2]}{2\log(\Omega_s/\Omega_p)}$（Butterworth 阶数）
9. $h_d[m]=\sin(\omega_c m)/(\pi m)$（理想低通）
10. $h[n]=h_d[n-\alpha]w[n]$（窗函数法）

### 时间分配建议（2 小时 / 100 分）

- 每个 Q 约 20–25 分钟
- 先做最熟的题型，拿稳基础分
- 设计题（FIR/IIR）步骤多但套路固定，留足 25 分钟
- 最后检查：频率单位、$1/N$、ROC、阶数取整、对称类型
