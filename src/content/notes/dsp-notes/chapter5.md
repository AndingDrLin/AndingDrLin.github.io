---
title: "第5章 DFT、FFT 与工程频谱"
description: "DFT 定义、实序列对称、Parseval、循环卷积、谱线 Hz 换算、FFT、零填充/重复/插零和 OLA/OLS。"
date: 2026-06-26
tags: [dsp, signal-processing]
category: "课程学习"
docGroup: "dsp-notes"
order: 5
draft: false
---

# 第5章 DFT、FFT 与工程频谱

> 📌 考试定位：本章是 DSP 期末最高频章节。2022–2025 每年都考 DFT/FFT 或 DFT 性质；2025 又加入 DFT 长度变化和谱线 Hz 换算。目标是看到 `real sequence`、`DFT length`、`bit reversal`、`Parseval`、`zero padding` 就能直接套表。

## 0. 先用一句话抓住本章

DFT 把一段有限长序列变成 $N$ 个频谱点；FFT 是快速计算 DFT 的算法；考试真正考的是：**这些频谱点怎么对称、怎么移动、怎么和实际 Hz 对应、怎么用来做卷积，以及改变 DFT 长度后结果怎么变。**

题干出现这些关键词就翻本章：

- DFT / IDFT / $W_N$；
- real sequence、conjugate symmetry、odd/even DFT value；
- Parseval、$X[0]$、$x[0]$；
- circular shift、circular convolution、linear convolution by DFT；
- zero-padding、repetition、inserting zeros、changing DFT length；
- FFT、DIT、DIF、bit reversal、butterfly；
- frequency bin、spectrum line、$k$ to Hz；
- Overlap-add、Overlap-save。

最常见错误：忘记 IDFT 的 $1/N$；把线性卷积和循环卷积混用；实序列对称时把 $k=0$ 和 $k=N/2$ 的特殊点漏掉；把 $k>N/2$ 的谱线当成正频率。

## 1. 30 秒公式速查

| 编号 | 公式 / 结论 | 名称 | 看到什么题干就用 |
|---|---|---|---|
| 5.1 | $W_N=e^{-j2\pi/N}$ | 旋转因子 | DFT/FFT |
| 5.2 | $X[k]=\sum_{n=0}^{N-1}x[n]W_N^{kn}$ | DFT | 从时域到频域 |
| 5.3 | $x[n]=\frac1N\sum_{k=0}^{N-1}X[k]W_N^{-kn}$ | IDFT | 从频域回时域 |
| 5.4 | $X[0]=\sum_{n=0}^{N-1}x[n]$ | 直流分量 | 快速检查 $X[0]$ |
| 5.5 | $x[0]=\frac1N\sum_{k=0}^{N-1}X[k]$ | 第一个样本 | 已知 DFT 求 $x[0]$ |
| 5.6 | 实序列：$X[k]=X^*[\langle-k\rangle_N]$ | 共轭对称 | real sequence DFT |
| 5.7 | $\sum|x[n]|^2=\frac1N\sum|X[k]|^2$ | Parseval | 能量题 |
| 5.8 | $x[\langle n-n_0\rangle_N]\leftrightarrow W_N^{kn_0}X[k]$ | 循环时移 | $Y[k]=(-1)^kX[k]$ 等 |
| 5.9 | $W_N^{-k_0n}x[n]\leftrightarrow X[\langle k-k_0\rangle_N]$ | 频移 | 时域调制 |
| 5.10 | $x[n]\circledast_Nh[n]\leftrightarrow X[k]H[k]$ | 圆周卷积 | DFT 乘法 |
| 5.11 | 线性卷积补零长度 $L\ge L_x+L_h-1$ | DFT 算线性卷积 | 避免 time aliasing |
| 5.12 | $f_k=kF_s/N$；若 $k>N/2$，$f_k=(k-N)F_s/N$ | 谱线到 Hz | 工程频谱题 |
| 5.13 | FFT 复乘 $=\frac N2\log_2N$ | FFT 复杂度 | DIT/DIF 计算量 |
| 5.14 | FFT 复加 $=N\log_2N$ | FFT 复杂度 | DIT/DIF 计算量 |
| 5.15 | DIT：输入 bit-reversed，输出 normal | DIT 顺序 | 8 点 DIT 图 |
| 5.16 | DIF：输入 normal，输出 bit-reversed | DIF 顺序 | 8 点 DIF 图 |

## 2. 5 分钟直觉

### 2.1 DFT 是 DTFT 的采样

第3章的 DTFT 是连续频率函数：

$$
X(e^{j\omega})=\sum_nx[n]e^{-j\omega n}.
$$

DFT 只是在一个周期里取 $N$ 个等间隔点：

$$
\omega_k=\frac{2\pi k}{N},\quad k=0,1,\ldots,N-1.
$$

所以

$$
X[k]=X(e^{j\omega})\big|_{\omega=2\pi k/N}.
$$

这解释了为什么补零会让频谱“看起来更密”：补零后 $N$ 变大，取样点更多。但它没有增加真实频率分辨率，真实分辨率主要由原始有效数据长度决定。

### 2.2 为什么 DFT 里到处都是“循环”

DFT 隐含地把 $N$ 点序列看成一个 $N$ 周期序列的一个周期。所以移动、反转、卷积都会绕圈：

- 普通移位变成循环移位；
- 普通卷积变成圆周卷积；
- 长度不够时，线性卷积尾巴会绕回开头，形成 time aliasing。

这不是人为增加难度，而是 DFT 的周期假设带来的结果。

### 2.3 实序列 DFT：只需要算一半

如果 $x[n]$ 是实序列，那么它的 DFT 满足

$$
X[k]=X^*[\langle-k\rangle_N].
$$

这意味着：

- 实部偶对称；
- 虚部奇对称；
- 幅度偶对称；
- 相位奇对称；
- $X[0]$ 一定是实数；
- 若 $N$ 为偶数，$X[N/2]$ 也一定是实数。

很多真题会给你一半的 DFT 点，让你补全另一半，或者问哪些点一定为 real / imaginary。

### 2.4 谱线 $k$ 和 Hz 的对应

DFT 的第 $k$ 个点对应数字频率

$$
\omega_k=\frac{2\pi k}{N}.
$$

若采样频率是 $F_s$ Hz，则实际频率是

$$
f_k=\frac{kF_s}{N}.
$$

但这只适合 $0\le k\le N/2$ 的正频率理解。若 $k>N/2$，它代表负频率：

$$
f_k=\frac{(k-N)F_s}{N}.
$$

例如 $N=8$，$k=7$ 对应 $-F_s/8$，不是 $7F_s/8$ 的“新正频率”。

## 3. 做题套路

### 套路 1：实序列 DFT 补全

**输入：** 已知实序列的若干 $X[k]$。  
**输出：** 补全共轭点、判断实/虚性质。  
**对应真题：** 2023 Q2、2024 Q1、2025 Q5。

1. 写核心公式：

   $$
   X[k]=X^*[\langle-k\rangle_N].
   $$

2. 对每个 $k$，找配对点：

   $$
   \langle-k\rangle_N=N-k\quad (k\ne0).
   $$

3. 若 $N$ 偶数，$k=N/2$ 与自己配对，所以：

   $$
   X[N/2]=X^*[N/2]
   $$

   必须为实数。

4. $X[0]=\sum x[n]$ 也为实数。

5. 若题目问 energy，用 Parseval：

   $$
   \sum|x[n]|^2=\frac1N\sum|X[k]|^2.
   $$

⚠️ 注意：不要写成 $X[k]=X^*[N-k]$ 后忘了 $k=0$。更稳的是写 $\langle-k\rangle_N$。

### 套路 2：由 DFT 性质快速求新 DFT

**输入：** 已知 $x[n]\leftrightarrow X[k]$，题目给 $y[n]$ 是 $x[n]$ 的移位、调制、反转或乘 $(-1)^n$。  
**输出：** $Y[k]$。  
**对应真题：** 2023 Q2、2024 Q1、2025 Q5。

常见对应关系：

| 时域操作 | 频域结果 |
|---|---|
| $y[n]=x[\langle n-n_0\rangle_N]$ | $Y[k]=W_N^{kn_0}X[k]$ |
| $y[n]=W_N^{-k_0n}x[n]$ | $Y[k]=X[\langle k-k_0\rangle_N]$ |
| $y[n]=x[\langle-n\rangle_N]$ | $Y[k]=X[\langle-k\rangle_N]$ |
| $y[n]=x^*[n]$ | $Y[k]=X^*[\langle-k\rangle_N]$ |
| $y[n]=(-1)^nx[n]$，$N$ 偶数 | $Y[k]=X[\langle k-N/2\rangle_N]$ |
| $Y[k]=(-1)^kX[k]$，$N$ 偶数 | $y[n]=x[\langle n-N/2\rangle_N]$ |

最后一条很常考：因为

$$
(-1)^k=e^{-j\pi k}=W_N^{kN/2}.
$$

由循环时移定理可知它对应时域循环移位 $N/2$。

### 套路 3：DFT 谱线换 Hz

**输入：** $N$ 点 DFT、采样频率 $F_s$、谱线索引 $k$。  
**输出：** 该谱线对应实际 Hz。  
**对应真题：** 2025 Q5、Project 频谱题。

1. 先写数字频率：

   $$
   \omega_k=2\pi k/N.
   $$

2. 若 $0\le k\le N/2$，

   $$
   f_k=kF_s/N.
   $$

3. 若 $N/2<k<N$，按负频率解释：

   $$
   f_k=(k-N)F_s/N.
   $$

4. 实余弦在 $k=r$ 和 $k=N-r$ 有两个峰，对应 $+rF_s/N$ 和 $-rF_s/N$。

⚠️ 注意：若题目问“physical frequency”或 “Hz”，必须写单位；若问 DFT bin，只写 $k$。

### 套路 4：DFT 长度变化

**输入：** 原序列或原 DFT，题目改变 DFT 长度、补零、重复、插零。  
**输出：** 新 DFT 与旧 DFT 的关系。  
**对应真题：** 2024 Q1、2025 Q5。

| 操作 | 时域发生什么 | 频域怎么理解 | 考场检查 |
|---|---|---|---|
| 末尾补零到更长 $N'$ | 样本值没变，只是增加零 | 更密地采样同一个 DTFT | 不增加真实分辨率 |
| 做更短 DFT | 等价于频域点更少 | 可能无法表达全部信息 | 若截断时域会改变频谱 |
| 时域重复一次：$y[n]=x[\langle n\rangle_N]$ 重复成 $2N$ 点 | 周期更长但内容重复 | 只在偶数谱线保留信息，奇数谱线常为 0 | 可用求和分偶奇证明 |
| 时域插零：$y[2n]=x[n], y[2n+1]=0$ | 上采样 | 频谱压缩并出现镜像 | 多速率题 |
| 频域补零再 IDFT | 频域插值 | 时域变成更密采样的周期插值 | 不等于简单末尾补零 |

如果题目给具体序列，最稳做法仍是回到 DFT 定义算一遍：

$$
Y[k]=\sum_{n=0}^{N'-1}y[n]e^{-j2\pi kn/N'}.
$$

### 套路 5：FFT 复杂度与 8 点 DIT

**输入：** $N=2^m$ 点 FFT。  
**输出：** stage 数、bit reversal、复乘复加。  
**对应真题：** 2022 Q2、2023 Q2、2024 Q1。

1. stage 数：

   $$
   m=\log_2N.
   $$

2. 每级 butterfly 数：

   $$
   N/2.
   $$

3. 总复乘：

   $$
   \frac N2\log_2N.
   $$

4. 总复加：

   $$
   N\log_2N.
   $$

5. DIT 顺序：输入 bit-reversed，输出 normal。

8 点 DIT 输入顺序：

$$
0,4,2,6,1,5,3,7.
$$

![8 点 DIT FFT 流图](assets/chapter11_fig4_dit_8point_fft.jpg)

完整 FFT 旧链接和 DIF 对比见 [第11章兼容入口](/notes/digital-signal-processing/chapter11/)。

### 套路 6：Overlap-add / Overlap-save

**输入：** 长输入 $x[n]$、短滤波器 $h[n]$，要求快速卷积。  
**输出：** 分段方式、丢弃/相加规则。  
**对应真题/重点：** 期末重点明确要求了解。

Overlap-add (OLA)：

1. 把长输入切成不重叠块，每块长 $L$。
2. 每块与 $h[n]$ 做线性卷积，长度 $L+M-1$。
3. 相邻输出块重叠 $M-1$ 点，把重叠部分相加。

Overlap-save (OLS)：

1. 输入块之间重叠 $M-1$ 点。
2. 每块做 $N$ 点圆周卷积。
3. 丢掉每块输出前 $M-1$ 个污染点。
4. 保留后面 $N-M+1$ 个点拼接。

| 方法 | 输入分段 | 每块卷积 | 输出处理 |
|---|---|---|---|
| OLA | 输入块不重叠 | 线性卷积 / 补零 DFT | 重叠部分相加 |
| OLS | 输入块重叠 $M-1$ | 圆周卷积 | 丢前 $M-1$ 点 |

## 4. 典型题精讲

### 例题 1：实序列 DFT 补全

**题目：** 长度 $N=8$ 的实序列，已知 $X[1]=2-j3$，$X[3]=-1+j$。求 $X[7]$ 和 $X[5]$。

**解答：** 实序列满足

$$
X[k]=X^*[\langle-k\rangle_8].
$$

$\langle-7\rangle_8=1$，所以

$$
X[7]=X^*[1]=2+j3.
$$

$\langle-5\rangle_8=3$，所以

$$
X[5]=X^*[3]=-1-j.
$$

**答案：** $X[7]=2+j3$，$X[5]=-1-j$。

**易错提醒：** $X[4]$ 是 Nyquist 点，它自己和自己配对，因此必须为实数。

### 例题 2：由 $Y[k]=(-1)^kX[k]$ 求时域关系

**题目：** $N=8$，已知 $x[n]\leftrightarrow X[k]$，若 $Y[k]=(-1)^kX[k]$，求 $y[n]$ 与 $x[n]$ 的关系。

**解答：**

因为

$$
(-1)^k=e^{-j\pi k}=e^{-j2\pi k(4)/8}=W_8^{4k}.
$$

由循环时移定理：

$$
x[\langle n-n_0\rangle_N]\leftrightarrow W_N^{kn_0}X[k].
$$

这里 $n_0=4$，所以

$$
y[n]=x[\langle n-4\rangle_8].
$$

**答案：** $y[n]$ 是 $x[n]$ 的 8 点循环移位 4 位。

### 例题 3：谱线 Hz 换算

**题目：** 采样频率 $F_s=8000$ Hz，做 $N=16$ 点 DFT。$k=3$ 和 $k=14$ 分别对应多少 Hz？

**解答：**

$k=3\le N/2$：

$$
f_3=3\cdot8000/16=1500\text{ Hz}.
$$

$k=14>N/2$，按负频率：

$$
f_{14}=(14-16)\cdot8000/16=-1000\text{ Hz}.
$$

**答案：** $k=3$ 对应 $+1500$ Hz；$k=14$ 对应 $-1000$ Hz。

**易错提醒：** 不要把 $k=14$ 写成 $7000$ Hz 的正频率。对实信号频谱图，可以说它是 $-1000$ Hz 的谱线。

### 例题 4：Parseval 检查能量

**题目：** 4 点 DFT 为 $X[k]=[6,1-j,0,1+j]$。求时域能量。

**解答：**

由 Parseval：

$$
\sum_{n=0}^{3}|x[n]|^2=\frac14\sum_{k=0}^{3}|X[k]|^2.
$$

频域平方和：

$$
|6|^2+|1-j|^2+|0|^2+|1+j|^2=36+2+0+2=40.
$$

所以

$$
E=40/4=10.
$$

**答案：** 时域能量为 10。

### 例题 5：线性卷积 vs 圆周卷积

**题目：** $x[n]$ 长 4，$h[n]$ 长 5。用 DFT 精确计算线性卷积至少要几点 DFT？若只做 6 点 DFT，会怎样？

**解答：** 线性卷积长度：

$$
L=4+5-1=8.
$$

所以至少要做 8 点 DFT。若只做 6 点 DFT，线性卷积的第 6、7 点会按 6 点周期绕回前面，产生 time aliasing，结果不是线性卷积。

**答案：** 至少 8 点；6 点会产生循环混叠。

### 例题 6：FFT 复杂度

**题目：** $N=64$ 的 radix-2 FFT 有几级？复乘和复加次数是多少？

**解答：**

$$
\log_2 64=6.
$$

复乘：

$$
\frac{64}{2}\cdot6=192.
$$

复加：

$$
64\cdot6=384.
$$

**答案：** 6 级，192 次复乘，384 次复加。

## 5. 易错点表

| ❌ 错误做法 | ✅ 正确做法 | 来源 |
|---|---|---|
| IDFT 忘记 $1/N$ | $x[n]=\frac1N\sum X[k]W_N^{-kn}$ | DFT 基础 |
| $X[0]$ 当成平均值 | $X[0]$ 是样本和，平均值是 $X[0]/N$ | 快速检查 |
| 实序列只写幅度对称 | 还要知道实部偶、虚部奇、$X[0]$/$X[N/2]$ 为实 | 2024 Q1 |
| $k>N/2$ 仍按正频率解释 | 写成负频率 $(k-N)F_s/N$ | 2025 Q5 |
| 圆周卷积当线性卷积 | 线性卷积要补零到 $L_x+L_h-1$ | ch5 高频 |
| 补零说成提高分辨率 | 补零只是 DTFT 采样更密，不提高真实分辨率 | 频谱分析 |
| FFT 当成新变换 | FFT 是 DFT 的快速算法 | ch11/FFT |
| DIT 顺序写反 | DIT 输入 bit-reversed，输出 normal | 2022/2023 |
| OLS 丢错点 | OLS 丢每块输出前 $M-1$ 点 | 期末重点 |

## 6. 本章 90 分检查清单

- [ ] 能写 DFT/IDFT 和 $W_N$ 定义。
- [ ] 能用 $X[0]$、$x[0]$、Parseval 做快速检查。
- [ ] 能补全实序列 DFT 的共轭对称点。
- [ ] 能判断哪些 DFT 点必须为实数或纯虚数。
- [ ] 能用循环移位、频移、反转性质求新 DFT。
- [ ] 能把 DFT 谱线 $k$ 换算成 Hz，包括负频率。
- [ ] 能说明零填充、重复、插零对 DFT 的影响。
- [ ] 能计算 FFT stage、复乘、复加和 bit reversal 顺序。
- [ ] 能区分 Overlap-add 和 Overlap-save。

## 7. 自测题与答案

### 题目

1. 写出 $N$ 点 DFT 和 IDFT。
2. $x[n]=[1,1,1,1]$ 的 4 点 DFT 是什么？
3. 实序列 $N=10$，已知 $X[2]=3+j$，求 $X[8]$。
4. $N=10$ 的实序列中，哪些 DFT 点一定是实数？
5. 若 $X[k]$ 是 $x[n]$ 的 8 点 DFT，$Y[k]=X[\langle k-2\rangle_8]$ 对应时域什么操作？
6. $F_s=1000$ Hz，$N=20$，$k=18$ 对应多少 Hz？
7. 长度 6 和长度 4 的序列做线性卷积，至少几点 DFT？
8. $N=128$ FFT 的复乘次数是多少？
9. DIT FFT 的输入输出顺序是什么？
10. OLA 和 OLS 最核心区别是什么？

### 答案

1. 

   $$
   X[k]=\sum_{n=0}^{N-1}x[n]W_N^{kn},\quad W_N=e^{-j2\pi/N}.
   $$

   $$
   x[n]=\frac1N\sum_{k=0}^{N-1}X[k]W_N^{-kn}.
   $$

2. 常数序列只有直流：

   $$
   X[0]=4,
   $$

   其余 $X[1]=X[2]=X[3]=0$。

3. 实序列满足 $X[8]=X^*[2]=3-j$。

4. $X[0]$ 和 $X[N/2]=X[5]$ 一定是实数。

5. 频域循环移位 $k_0=2$ 对应时域乘

   $$
   W_8^{-2n}=e^{j2\pi(2)n/8}=e^{j\pi n/2}.
   $$

   所以 $y[n]=W_8^{-2n}x[n]$。

6. $k=18>N/2=10$，所以

   $$
   f=(18-20)\cdot1000/20=-100\text{ Hz}.
   $$

7. 线性卷积长度 $6+4-1=9$，至少 9 点 DFT。

8. 

   $$
   \frac{128}{2}\log_2 128=64\times7=448.
   $$

9. DIT 输入 bit-reversed，输出 normal。

10. OLA 输入块不重叠，输出重叠部分相加；OLS 输入块重叠 $M-1$，每块圆周卷积后丢掉前 $M-1$ 个污染点。

## 8. 学习路线

1. 先把 DFT/IDFT、$W_N$、$X[0]$、$x[0]$ 背熟。
2. 接着练实序列 DFT 对称，这是每年高频点。
3. 再练 DFT 性质题：循环移位、频移、反转、Parseval。
4. 然后学谱线 Hz 换算和 DFT 长度变化，覆盖 2025 新趋势。
5. 最后学 FFT 和 OLA/OLS。FFT 会画 8 点 DIT、会算复杂度就能覆盖大部分考试要求。

## 9. 和后续章节的关系

- [第6章](/notes/digital-signal-processing/chapter6/) 会用 Z 变换处理无限长序列和系统函数。
- [第7章](/notes/digital-signal-processing/chapter7/) 的线性相位 FIR 与本章实序列对称、DFT 频谱密切相关。
- [第10章](/notes/digital-signal-processing/chapter10/) 的 FIR 设计会用 DFT/FFT 检查频率响应，也会用本章的频率单位换算。
- [第11章](/notes/digital-signal-processing/chapter11/) 保留 FFT 旧链接和速查入口，但 FFT 主复习内容已经放在本章。
