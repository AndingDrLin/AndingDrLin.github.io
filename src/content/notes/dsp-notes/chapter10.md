---
title: "第10章 FIR 数字滤波器设计"
description: "FIR 窗函数法、频率采样法、阶数估计、线性相位类型和最省资源结构。"
date: 2026-06-26
tags: [dsp, signal-processing]
category: "课程学习"
docGroup: "dsp-notes"
order: 10
draft: false
---

# 第10章 FIR 数字滤波器设计

> 📌 考试定位：本章对应 2022 Q4、2024 Q4、复习题滤波器设计题，以及 2025 Q6 的“任选 FIR/IIR 设计”。目标不是把所有 FIR 设计理论讲完，而是让你能在考场上把指标翻译成一个可写清步骤的 FIR 滤波器。

## 0. 先用一句话抓住本章

FIR 设计题的主线是：**把频率指标变成理想响应 $H_d(e^{j\omega})$，写出无限长理想冲激响应 $h_d[n]$，再用有限长窗口 $w[n]$ 截断并平移成因果线性相位滤波器。**

题干出现这些关键词就翻本章：

- window method / windowing technique / Hamming window / Hanning window / Blackman window；
- passband edge、stopband edge、transition bandwidth、stopband attenuation；
- design a linear-phase FIR filter；
- fewest multipliers / adders / delays；
- choose FIR or IIR design。

最常见错误不是不会公式，而是 **频率单位、阶数符号、长度符号混在一起**：题目给 Hz，却直接拿去代数字频率；题目问 order，却写成 length；窗口表里给的是 transition width，却忘记向上取整。

## 1. 30 秒公式速查

| 编号 | 公式 / 结论 | 名称 | 看到什么题干就用 |
|---|---|---|---|
| 10.1 | $\omega=2\pi f/F_s$ | Hz 到数字角频率 | 题目给 Hz、kHz、sampling frequency |
| 10.2 | $\Delta\omega=\omega_s-\omega_p$ | 过渡带宽 | low-pass / high-pass 给通带边缘和阻带边缘 |
| 10.3 | $\omega_c=(\omega_p+\omega_s)/2$ | 理想截止频率 | 窗函数法低通/高通设计 |
| 10.4 | $M\approx C/\Delta\omega$，$N=M+1$ | 阶数与长度 | 根据窗函数估算 order / length |
| 10.5 | $\alpha=M/2=(N-1)/2$ | 线性相位中心 | 把零相位理想响应平移成因果 FIR |
| 10.6 | $h[n]=h_d[n-\alpha]w[n]$ | 窗函数法核心 | design FIR by window method |
| 10.7 | $h_d[m]=\sin(\omega_c m)/(\pi m)$，$h_d[0]=\omega_c/\pi$ | 理想低通冲激响应 | low-pass FIR |
| 10.8 | 高通：$h_{HP}[m]=\delta[m]-h_{LP}[m]$ | 频谱反转 | high-pass FIR |
| 10.9 | 带通：$h_{BP}[m]=\frac{\sin(\omega_2m)-\sin(\omega_1m)}{\pi m}$ | 理想带通 | band-pass FIR |
| 10.10 | 带阻：$h_{BS}[m]=\delta[m]-h_{BP}[m]$ | 频谱反转 | band-stop FIR |
| 10.11 | 对称 FIR 乘法器数约为 $\lceil N/2\rceil$ | 最省乘法结构 | fewest multipliers |
| 10.12 | Type I：对称、奇数长度；Type II：对称、偶数长度 | 线性相位类型 | 判断能否做低通/高通 |

> 本章统一符号：$M$ 表示 FIR **阶数(order)**，$N=M+1$ 表示 **长度(length)**，$\alpha=M/2=(N-1)/2$ 表示群延迟和对称中心。不同教材会把 $N$ 用作阶数，做题时先看题目约定；若题目没说明，建议在答案里先声明自己的符号。

## 2. 5 分钟直觉

### 2.1 为什么 FIR 设计要“截断 + 加窗”

理想低通滤波器在频域长得很干净：通带是 1，阻带是 0，中间垂直跳变。问题是，它的时域冲激响应是无限长 sinc：

$$
h_{LP}[m]=\frac{\sin(\omega_c m)}{\pi m},\quad m\ne0
$$

$$
h_{LP}[0]=\frac{\omega_c}{\pi}
$$

无限长意味着不能直接实现。实际 FIR 只能有有限个系数，所以要把无限长 $h_d[m]$ 截出一段。直接硬截断等价于乘矩形窗，会带来较大的旁瓣和 Gibbs ripple。换一个更平滑的窗，比如 Hamming、Hann、Blackman，可以牺牲过渡带宽，换更好的阻带衰减。

所以窗函数法的本质是一个 trade-off：

- 窗越短，阶数低，但过渡带宽，阻带衰减差；
- 窗越长，过渡带窄，但计算量大；
- 窗越平滑，阻带衰减好，但主瓣更宽，需要更高阶。

### 2.2 为什么要把 $h_d[m]$ 平移成 $h[n]$

理想冲激响应 $h_d[m]$ 通常以 $m=0$ 为中心，左右两边都有值。比如 $m=-3,-2,-1,0,1,2,3$。这不是因果系统，因为它需要未来输入。

FIR 实现要求下标从 $n=0$ 到 $n=M$，所以要令

$$
m=n-\alpha,
$$

把中心从 $m=0$ 平移到 $n=\alpha=M/2$。这样得到

$$
h[n]=h_d[n-\alpha]w[n],\quad 0\le n\le M.
$$

如果 $h_d[m]$ 是偶对称的，平移后 $h[n]$ 会满足

$$
h[n]=h[M-n],
$$

这就是线性相位(linear phase) FIR 的关键。它让所有频率分量有相同群延迟 $\alpha$，波形不容易被相位扭曲。

### 2.3 FIR 设计题到底在考什么

FIR 设计题通常不是让你写出几十个具体系数。它更看重以下过程：

1. 能不能把 Hz/kHz 指标换成数字频率；
2. 能不能从通带/阻带边缘得到过渡带和理想截止频率；
3. 能不能根据阻带衰减选择合适窗口；
4. 能不能估算阶数 $M$ 和长度 $N$，并向上取整到合适整数；
5. 能不能写出 $h_d[m]$ 和 $h[n]=h_d[n-\alpha]w[n]$；
6. 能不能说明线性相位类型和最省乘法结构。

只要这 6 步完整，即使不逐项算出所有系数，也能拿到大部分分数。

## 3. 做题套路

### 套路 1：低通 FIR 窗函数法

**输入：** $F_s$，通带边缘 $f_p$ 或 $\omega_p$，阻带边缘 $f_s$ 或 $\omega_s$，通带/阻带波纹或阻带衰减要求。  
**输出：** FIR 的阶数、长度、理想冲激响应、加窗后的 $h[n]$，必要时画结构。  
**对应真题：** 2022 Q4、2024 Q4、复习题 FIR 设计、2025 Q6 可选设计。

1. **统一频率单位。** 若题目给 Hz：

   $$
   \omega_p=2\pi f_p/F_s,\quad \omega_s=2\pi f_s/F_s.
   $$

2. **求过渡带宽和理想截止频率。**

   $$
   \Delta\omega=\omega_s-\omega_p,
   $$

   $$
   \omega_c=\frac{\omega_p+\omega_s}{2}.
   $$

3. **根据阻带衰减选窗。** 常用经验表见第 4 节。若题目指定窗口，直接用指定窗口。

4. **估算阶数。** 用窗口对应的 transition width 公式求 $M$。若算得小数，必须向上取整。为了保持 Type I 对称低通，常选 **偶数阶 $M$**，使长度 $N=M+1$ 为奇数。

5. **写理想低通冲激响应。** 令 $m=n-\alpha$，$\alpha=M/2$：

   $$
   h_d[m]=\begin{cases}
   \dfrac{\sin(\omega_c m)}{\pi m}, & m\ne0 \\
   \dfrac{\omega_c}{\pi}, & m=0
   \end{cases}
   $$

6. **加窗并因果化。**

   $$
   h[n]=h_d[n-\alpha]w[n],\quad 0\le n\le M.
   $$

7. **检查。** $h[n]$ 是否关于 $M/2$ 对称？$M$、$N$、$\alpha$ 是否写清？频率是否都在 $[0,\pi]$？

⚠️ 注意：题目给的是 $f_s$ 时，可能是 stopband frequency，也可能是 sampling frequency。为了避免混淆，本笔记用 $F_s$ 表示采样频率，用 $f_{st}$ 表示阻带边缘频率。

### 套路 2：高通 FIR 设计

**输入：** 高通通带边缘和阻带边缘。  
**输出：** 高通 FIR 设计表达式。  
**对应真题：** 复习题、2025 Q6 可选。

高通设计可以先设计一个低通原型，再做频谱反转。

1. 对高通，通常阻带在低频，通带在高频，所以 $\omega_s<\omega_p$。先求

   $$
   \Delta\omega=\omega_p-\omega_s,
   $$

   $$
   \omega_c=\frac{\omega_p+\omega_s}{2}.
   $$

2. 先写低通原型 $h_{LP}[m]$，截止频率为 $\omega_c$。

3. 做频谱反转：

   $$
   h_{HP}[m]=\delta[m]-h_{LP}[m].
   $$

4. 因果化并加窗：

   $$
   h[n]=h_{HP}[n-\alpha]w[n],\quad 0\le n\le M.
   $$

⚠️ 注意：普通高通希望在 $\omega=\pi$ 处非零。Type II FIR 在 $\omega=\pi$ 被迫为零，所以不要选对称偶数长度 Type II 来做普通高通。更稳的是选 Type I：对称、奇数长度。

### 套路 3：带通 / 带阻 FIR 设计

**输入：** 两个通带/阻带边缘，或中心频率与带宽。  
**输出：** 带通或带阻 FIR 表达式。  
**对应真题：** 复习题、课程设计类题。

带通理想响应保留 $\omega_1\le |\omega|\le\omega_2$。理想冲激响应为：

$$
h_{BP}[m]=\begin{cases}
\dfrac{\sin(\omega_2m)-\sin(\omega_1m)}{\pi m}, & m\ne0 \\
\dfrac{\omega_2-\omega_1}{\pi}, & m=0
\end{cases}
$$

带阻由全通减带通：

$$
h_{BS}[m]=\delta[m]-h_{BP}[m].
$$

做题步骤和低通相同：先确定过渡带、选窗和阶数，再写 $h[n]=h_d[n-\alpha]w[n]$。

### 套路 4：最省乘法器结构

**输入：** FIR 系数或设计得到的线性相位 FIR。  
**输出：** fewest multipliers/adders/delayers。  
**对应真题：** 2022 Q4(c)、复习题滤波器结构小问。

如果 $h[n]=h[M-n]$，则

$$
y[k]=\sum_{n=0}^{M}h[n]x[k-n]
$$

可以把对称项合并：

$$
y[k]=\sum_{n=0}^{\alpha-1}h[n]\{x[k-n]+x[k-M+n]\}+h[\alpha]x[k-\alpha]
$$

这里假设 $M$ 为偶数、长度 $N=M+1$ 为奇数。乘法器数从 $N$ 个降为 $\alpha+1=(N+1)/2$ 个。

如果是偶数长度对称 FIR，没有中心项，乘法器数约为 $N/2$。

⚠️ 注意：乘以 1 或 -1 是否算乘法器要看题目约定。考试答案里可以写：“若常数 1 不计入乘法器，则可进一步减少”。

### 套路 5：2025 自选 FIR/IIR 设计时怎么答

**输入：** 题目给一组滤波器指标，但允许选择 FIR 或 IIR。  
**输出：** 选择一种设计路线并写完整步骤。  
**对应真题：** 2025 Q6。

考场建议：如果题目没有强制要求较低阶数，而你能使用窗口表，优先选 FIR。原因是 FIR 答案更结构化：

1. 声明选择 FIR window method，优点是稳定、可线性相位。
2. 把 Hz 指标换成数字频率。
3. 算 $\Delta\omega$ 和 $\omega_c$。
4. 根据阻带衰减选窗。
5. 估算 $M,N,\alpha$。
6. 写 $h_d[m]$ 和 $h[n]$。
7. 说明结构：对称系数，fewest multipliers。

如果题目给了 Butterworth、bilinear transform 或 prewarping 的明确提示，就转去 [第9章](/notes/digital-signal-processing/chapter9/) 做 IIR。

## 4. 窗函数表与阶数估计

下面是考试常用的经验表。不同教材常数略有差异；如果题目给出指定表格，以题目表格为准。

| 窗函数 | 常见阻带衰减 | 过渡带宽经验式 | 什么时候用 |
|---|---:|---|---|
| Rectangular | 约 21 dB | $\Delta\omega\approx 4\pi/N$ | 只要求粗略、阶数很低 |
| Hann / Hanning | 约 44 dB | $\Delta\omega\approx 8\pi/N$ | 中等衰减，旁瓣比矩形好 |
| Hamming | 约 53 dB | $\Delta\omega\approx 8\pi/N$ | 常见默认选择，考试高频 |
| Blackman | 约 74 dB | $\Delta\omega\approx 12\pi/N$ | 阻带衰减要求高 |

这里 $N$ 是长度，$M=N-1$ 是阶数。若用长度公式估计：

$$
N\approx \frac{C\pi}{\Delta\omega}
$$

其中 $C$ 对应上表的 4、8、8、12。再令 $M=N-1$。有的课件直接给 $M\approx C\pi/\Delta\omega$，这时按题目符号来；答案中写清“本题取 $N$ 为长度”可以避免歧义。

**选窗原则：** 用更严格的误差指标决定阻带衰减。若题目给 $\delta_p$ 和 $\delta_s$，一般取

$$
\delta=\min(\delta_p,\delta_s)
$$

再换成衰减

$$
A=-20\log_{10}\delta.
$$

然后选第一个能满足 $A$ 的窗口。比如 $A=45$ dB，Hann 约 44 dB 可能刚好不够，Hamming 约 53 dB 更稳。

## 5. 典型题精讲

### 例题 1：低通 FIR 窗函数法完整模板

**题目：** 设计一个线性相位 FIR 低通滤波器。采样频率 $F_s=10\text{ kHz}$，通带边缘 $f_p=1\text{ kHz}$，阻带边缘 $f_{st}=1.5\text{ kHz}$，阻带衰减要求至少 50 dB。使用 Hamming 窗。

**解题思路：** 先换数字频率，再算过渡带和截止频率，使用 Hamming 窗估算长度，最后写出 $h[n]$。

**解答：**

1. 换算频率：

$$
\omega_p=2\pi\frac{1000}{10000}=0.2\pi
$$

$$
\omega_s=2\pi\frac{1500}{10000}=0.3\pi
$$

2. 过渡带和截止频率：

$$
\Delta\omega=0.3\pi-0.2\pi=0.1\pi
$$

$$
\omega_c=\frac{0.2\pi+0.3\pi}{2}=0.25\pi
$$

3. Hamming 窗长度估计。用 $\Delta\omega\approx 8\pi/N$：

$$
N\approx \frac{8\pi}{0.1\pi}=80
$$

为了得到 Type I 低通，取奇数长度，令 $N=81$，阶数

$$
M=N-1=80,
$$

中心

$$
\alpha=M/2=40.
$$

4. 理想低通冲激响应：令 $m=n-40$，

$$
h_d[m]=\begin{cases}
\dfrac{\sin(0.25\pi m)}{\pi m}, & m\ne0 \\
0.25, & m=0
\end{cases}
$$

5. Hamming 窗：

$$
w[n]=0.54-0.46\cos\left(\frac{2\pi n}{M}\right),\quad 0\le n\le M.
$$

6. FIR 系数：

$$
h[n]=h_d[n-40]\left[0.54-0.46\cos\left(\frac{2\pi n}{80}\right)\right],\quad 0\le n\le80.
$$

**答案：** 取 $M=80$ 阶、$N=81$ 点 Hamming 窗 Type I 线性相位 FIR，系数如上式。

**易错提醒：** 如果直接取 $N=80$，长度为偶数，Type II 在 $\omega=\pi$ 有强制零点。低通不是一定不能用 Type II，但考试中 Type I 更稳，也更容易写中心 $\alpha=40$。

### 例题 2：高通 FIR 的频谱反转

**题目：** 设计高通 FIR，阻带边缘 $0.35\pi$，通带边缘 $0.45\pi$，使用 Blackman 窗。写出设计表达式。

**解答：**

1. 高通过渡带：

$$
\Delta\omega=0.45\pi-0.35\pi=0.10\pi
$$

2. 截止频率：

$$
\omega_c=\frac{0.35\pi+0.45\pi}{2}=0.40\pi
$$

3. Blackman 窗长度估计：

$$
N\approx \frac{12\pi}{0.10\pi}=120.
$$

为了高通不在 $\omega=\pi$ 被迫为零，取 Type I，令长度 $N=121$，阶数 $M=120$，$\alpha=60$。

4. 低通原型：

$$
h_{LP}[m]=\begin{cases}
\dfrac{\sin(0.4\pi m)}{\pi m}, & m\ne0 \\
0.4, & m=0
\end{cases}
$$

5. 高通理想冲激响应：

$$
h_{HP}[m]=\delta[m]-h_{LP}[m].
$$

6. Blackman 窗：

$$
w[n]=0.42-0.5\cos\left(\frac{2\pi n}{M}\right)+0.08\cos\left(\frac{4\pi n}{M}\right).
$$

7. 最终：

$$
h[n]=h_{HP}[n-60]w[n],\quad 0\le n\le120.
$$

**易错提醒：** 高通的 $\omega_s$ 和 $\omega_p$ 顺序与低通相反。低通是 $\omega_p<\omega_s$，高通常是 $\omega_s<\omega_p$。

### 例题 3：最省乘法器结构

**题目：** FIR 系数为

$$
h[0]=h[6]=1,
$$

$$
h[1]=h[5]=2,
$$

$$
h[2]=h[4]=3,
$$

$$
h[3]=4.
$$

写出直接型和对称结构下的输出表达式，并估算乘法器数。

**解答：**

直接型：

$$
y[n]=x[n]+2x[n-1]+3x[n-2]+4x[n-3]+3x[n-4]+2x[n-5]+x[n-6].
$$

需要 7 个系数乘法器。

利用对称性合并：

$$
y[n]=1\{x[n]+x[n-6]\}+2\{x[n-1]+x[n-5]\}+3\{x[n-2]+x[n-4]\}+4x[n-3].
$$

若乘以 1 不计乘法器，则需要 3 个非平凡乘法器；若所有系数都计，则需要 4 个乘法器。延时器仍需要 6 个来形成 $x[n-1]$ 到 $x[n-6]$。

**易错提醒：** 先加后乘才能省乘法器。如果先分别乘 $h[0]x[n]$ 和 $h[6]x[n-6]$，就没有省掉乘法器。

## 6. 易错点表

| ❌ 错误做法 | ✅ 正确做法 | 来源 |
|---|---|---|
| 题目给 Hz，直接当 $\omega$ 用 | 先用 $\omega=2\pi f/F_s$ 换成数字角频率 | 2022/2024 设计题 |
| 把采样频率 $F_s$ 和阻带边缘 $f_s$ 混在一起 | 采样频率写 $F_s$，阻带边缘写 $f_{st}$ 或 $\omega_s$ | 设计题通病 |
| 只写“选 Hamming 窗”，不说明为什么 | 用阻带衰减 $A=-20\log_{10}\delta$ 说明该窗满足指标 | FIR 设计题 |
| 阶数算出小数后四舍五入 | 必须向上取整，且必要时调整奇偶性 | 2024 Q4 |
| 混淆 $M$ 和 $N$ | 明确 $M$ 为阶数，$N=M+1$ 为长度 | 所有 FIR 题 |
| 忘记 $m=0$ 处单独取值 | 对 sinc 型公式写 $m=0$ 的极限值 | 2022 Q4 |
| 高通直接写低通公式 | 先写低通原型，再 $h_{HP}=\delta-h_{LP}$ | 复习题 |
| 线性相位结构仍按每个系数单独乘 | 对称系数先合并输入，再乘共享系数 | fewest multipliers |
| Type II 用来做普通高通 | 普通高通更稳地选 Type I，因为 Type II 在 $\pi$ 处为零 | ch7/ch10 衔接 |
| 只给公式，不写检查方法 | 最后检查通带/阻带方向、长度、对称性、群延迟 | 2025 Q6 |

## 7. 本章 90 分检查清单

- [ ] 能把 Hz/kHz 指标换成数字角频率 $\omega$。
- [ ] 能从 $\omega_p,\omega_s$ 求 $\Delta\omega$ 和 $\omega_c$。
- [ ] 能根据阻带衰减选择 Rectangular/Hann/Hamming/Blackman。
- [ ] 能说明 $M$、$N=M+1$、$\alpha=M/2$ 的含义。
- [ ] 能写出低通、高通、带通、带阻的理想冲激响应。
- [ ] 能写出 $h[n]=h_d[n-\alpha]w[n]$，并说明它为什么因果。
- [ ] 能判断线性相位 FIR 类型，知道 Type II 在 $\omega=\pi$ 处为零。
- [ ] 能画或描述对称 FIR 的最省乘法器结构。
- [ ] 能在 2025 自选设计题里说明为什么选择 FIR。

## 8. 自测题与答案

### 题目

1. FIR 窗函数法为什么不能直接实现理想低通 $H_d(e^{j\omega})$？
2. 已知 $F_s=20$ kHz，$f_p=4$ kHz，$f_{st}=6$ kHz，求 $\omega_p,\omega_s,\Delta\omega,\omega_c$。
3. 若 Hamming 窗过渡带宽近似 $8\pi/N$，第 2 题应取多大长度 $N$？若要 Type I，如何调整？
4. 写出理想低通 $h_d[m]$ 在 $m\ne0$ 和 $m=0$ 的表达式。
5. 高通 FIR 如何由低通原型得到？
6. 为什么普通高通不建议用 Type II 线性相位 FIR？
7. 对称 FIR 长度 $N=9$，最少需要几个系数乘法器？
8. 题目给 $\delta_p=0.01$、$\delta_s=0.001$，选窗时应按哪个误差决定？对应衰减多少 dB？
9. 设计题中“order”和“length”分别是什么？
10. 2025 自选设计题中，选择 FIR 的一句话理由怎么写？

### 答案

1. 理想低通的冲激响应是无限长 sinc，并且通常非因果，有限阶 FIR 不能精确实现；窗函数法用有限长窗口截断近似它。

2. 

$$
\omega_p=2\pi\frac{4}{20}=0.4\pi,
$$

$$
\omega_s=2\pi\frac{6}{20}=0.6\pi,
$$

$$
\Delta\omega=0.2\pi,
$$

$$
\omega_c=0.5\pi.
$$

3. 

$$
N\approx \frac{8\pi}{0.2\pi}=40.
$$

若要 Type I，取奇数长度，可取 $N=41$，阶数 $M=40$，中心 $\alpha=20$。

4. 

$$
h_d[m]=\frac{\sin(\omega_c m)}{\pi m},\quad m\ne0,
$$

$$
h_d[0]=\frac{\omega_c}{\pi}.
$$

5. 先设计截止频率为 $\omega_c$ 的低通 $h_{LP}[m]$，再做频谱反转：

$$
h_{HP}[m]=\delta[m]-h_{LP}[m].
$$

最后平移并加窗。

6. Type II 是对称、偶数长度 FIR，在 $\omega=\pi$ 处被迫为零；普通高通通常希望靠近 $\pi$ 的频率能通过，所以 Type II 不合适。

7. $N=9$ 对称 FIR 有 4 对对称系数加 1 个中心系数，所以需要 $5$ 个系数乘法器。若某些系数为 1 或 0，可按题目约定进一步减少。

8. 取更严格误差：

$$
\delta=\min(0.01,0.001)=0.001.
$$

对应衰减：

$$
A=-20\log_{10}(0.001)=60\text{ dB}.
$$

9. order 是阶数 $M$；length 是系数个数 $N=M+1$。例如 40 阶 FIR 有 41 个系数。

10. 可以写：我选择 FIR 窗函数法，因为 FIR 天然 BIBO 稳定，且通过对称系数可以实现精确线性相位，便于给出结构和资源估算。

## 9. 学习路线

如果时间紧张，不要先背所有窗函数细节。按下面顺序学：

1. 先掌握低通窗函数法 6 步：换频率、算过渡带、算截止、选窗、算阶数、写 $h[n]$。
2. 再学高通/带通/带阻只是低通原型的组合或反转。
3. 接着背窗口表，只需要知道阻带衰减和过渡带宽的大致级别。
4. 最后练最省乘法器结构，因为它常作为设计题的小问出现。

做真题时，先写完整流程，再代数值。FIR 设计题的分数通常按步骤给，少一步就会丢一块。

## 10. 和前后章节的关系

本章直接依赖 [第7章](/notes/digital-signal-processing/chapter7/) 的线性相位 FIR 四类型，以及 [第8章](/notes/digital-signal-processing/chapter8/) 的 FIR 结构实现。和 [第9章](/notes/digital-signal-processing/chapter9/) 的 IIR 设计相比，本章更适合回答“线性相位、稳定、结构清晰”的设计题。

考试中如果遇到滤波器设计大题，可以先判断它更像 ch9 还是 ch10：

- 出现 Butterworth、bilinear transform、prewarping → ch9；
- 出现 window、linear phase、Hamming、fewest multipliers → ch10；
- 题目允许任选 → 选择自己更熟的一条路线，但必须写清完整设计步骤。
