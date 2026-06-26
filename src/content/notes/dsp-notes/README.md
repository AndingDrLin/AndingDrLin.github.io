---
title: "数字信号处理期末复习笔记"
description: "面向 DSP 期末考试的题型地图、三天复习路线和章节速查入口。"
date: 2026-06-26
tags: [dsp, signal-processing]
category: "课程学习"
docGroup: "dsp-notes"
order: -1
draft: false
---

这套笔记现在按一个更现实的目标来组织：**不是把 DSP 教材重讲一遍，而是让你能从题干关键词快速翻到公式、套路和检查方法。**

近四年真题的重心很稳定：DFT/FFT、采样恢复、系统函数与零极点、线性相位/最小相位、FIR/IIR 设计几乎每年都出现。2025 年开始更偏系统级综合，比如频谱复用、级联系统、输入输出谱辨识和自由选择滤波器设计。因此复习时不要只背公式，要能把题干翻译成对应章节的做题流程。

## 你现在该从哪里开始？

- 如果你完全没学过：先做下面 5 道诊断题，错哪题就从对应章节补起。
- 如果你只想过考试：走“三天 90 分路线”，不要线性从 ch1 慢慢读到 ch11。
- 如果你已经学过：直接看“题型地图”，按真题关键词回查章节。

### 5 道诊断题

1. 复数与欧拉公式：求 $e^{-j\pi/2}$、$|1+j|$、$\angle(1+j)$。  
   **答案：** $e^{-j\pi/2}=-j$；$|1+j|=\sqrt{2}$；$\angle(1+j)=\pi/4$。

2. 线性卷积：计算 $[1,2,1]*[1,-1]$。  
   **答案：** $[1,1,-1,-1]$。检查长度为 $3+2-1=4$。

3. 4 点 DFT：$x[n]=[1,1,1,1]$ 的 DFT 是什么？  
   **答案：** $X[0]=4$，$X[1]=X[2]=X[3]=0$。常数序列只有直流分量。

4. Z 域稳定性：$H(z)=1/(1-0.5z^{-1})$ 因果时是否稳定？  
   **答案：** 因果 ROC 为 $|z|>0.5$，包含单位圆，所以稳定；极点 $0.5$ 在单位圆内。

5. FIR 窗函数截止频率：给定 $\omega_p$ 和 $\omega_s$，理想截止频率怎么取？  
   **答案：** 常取过渡带中点 $\omega_c=(\omega_p+\omega_s)/2$。

如果第 1、2 题不熟，先看 [第2章](/notes/digital-signal-processing/chapter2/)；第 3 题不熟，先看 [第5章](/notes/digital-signal-processing/chapter5/)；第 4 题不熟，先看 [第6章](/notes/digital-signal-processing/chapter6/)；第 5 题不熟，直接看 [第10章](/notes/digital-signal-processing/chapter10/)。

## 三天 90 分路线

| 时间 | 学什么 | 目标 |
|---|---|---|
| Day 1 上午 | ch2/ch4：序列、卷积、系统性质、LTI | 能按定义判断线性、时不变、因果、稳定；能手算短卷积 |
| Day 1 下午 | ch3/ch5：采样、DTFT、DFT 基础 | 能做采样频谱、混叠判断、实序列 DFT 对称题 |
| Day 2 上午 | ch5/ch11：FFT、DFT 长度变化、OLA/OLS | 能画 8 点 DIT 流图，算复乘/复加，判断补零/重复/插零影响 |
| Day 2 下午 | ch6/ch7：$H(z)$、ROC、零极点、相位系统 | 能从差分方程、零极点、$h[n]$ 互转；能做最小相位和均衡器 |
| Day 3 上午 | ch9/ch10：IIR 与 FIR 设计 | 能独立完成 20 分滤波器设计题，并说明为什么选 FIR 或 IIR |
| Day 3 下午 | 2022–2025 真题回归 | 按题干关键词回查本页“题型地图”，补缺口 |

## 题型地图：题干出现什么就翻哪章

| 题干关键词 | 先翻章节 | 常用公式 / 套路 | 近年真题定位 |
|---|---|---|---|
| `real sequence`、共轭对称、odd/even DFT value、Parseval | [ch5](/notes/digital-signal-processing/chapter5/) | $X[k]=X^*[\langle-k\rangle_N]$、$\sum|x[n]|^2=\frac1N\sum|X[k]|^2$ | 2023 Q2、2024 Q1、2025 Q5 |
| DIT-FFT、bit reversal、butterfly、复乘复加 | [ch5](/notes/digital-signal-processing/chapter5/) + [ch11](/notes/digital-signal-processing/chapter11/) | $\frac{N}{2}\log_2N$ 复乘，$N\log_2N$ 复加；DIT 输入比特反转 | 2022 Q2、2023 Q2、2024 Q1 |
| sampling、reconstruction、aliasing、$(-1)^n$ | [ch3](/notes/digital-signal-processing/chapter3/) | $\omega=\Omega T=2\pi f/F_s$；采样频谱幅度有 $1/T$；$(-1)^n=e^{j\pi n}$ 平移 $\pi$ | 2022 Q3、2025 Q1 |
| linear、time-invariant、causal、stable | [ch4](/notes/digital-signal-processing/chapter4/) | 必须按定义证明，不要只凭直觉判断 | 2025 Q2、复习题 |
| cascade、parallel、overall response | [ch4](/notes/digital-signal-processing/chapter4/) | 级联：$H=H_1H_2$、$h=h_1*h_2$；并联：$H=H_1+H_2$ | 2025 Q2 |
| input/output spectrum、system identification、test signal | [ch4](/notes/digital-signal-processing/chapter4/) + [ch6](/notes/digital-signal-processing/chapter6/) | $H(e^{j\omega})=Y/X$ 只在 $X\ne0$ 的频率可确定；$\delta[n]$ 最能测完整 $h[n]$ | 2025 Q3 |
| $H(z)$、ROC、pole-zero、difference equation、$h[n]$ | [ch6](/notes/digital-signal-processing/chapter6/) | 差分方程 $\leftrightarrow H(z) \leftrightarrow$ 极零图 $\leftrightarrow h[n]$；因果 ROC 在最外极点外 | 2023 Q1、2024 Q2、2025 Q4 |
| Direct Form II、canonical structure | [ch8](/notes/digital-signal-processing/chapter8/) | 分母反馈、分子前馈共用延时链；延时器数最少 | 2025 Q4 |
| linear phase FIR、Type I–IV、minimum phase、allpass | [ch7](/notes/digital-signal-processing/chapter7/) | 对称/反对称 + 长度奇偶；单位圆外零点倒共轭进单位圆 | 2022 Q1、2024 Q3 |
| Butterworth、bilinear transform、prewarping、IIR design | [ch9](/notes/digital-signal-processing/chapter9/) | $\Omega=\frac{2}{T}\tan(\omega/2)$；阶数向上取整 | 2023 Q4、2025 Q6 可选 |
| window method、Hamming/Hann/Blackman、FIR order | [ch10](/notes/digital-signal-processing/chapter10/) | 指标换频率 → 取 $\omega_c$ → 选窗 → 算阶数 → 写 $h[n]=h_d[n-\alpha]w[n]$ | 2022 Q4、2024 Q4、2025 Q6 可选 |
| Overlap-add、Overlap-save | [ch5](/notes/digital-signal-processing/chapter5/) | OLA：输入不重叠，输出重叠相加；OLS：输入重叠，丢前 $M-1$ 点 | 期末重点 |

## 章节目录

- [第1章 信号与信号处理](/notes/digital-signal-processing/chapter1/) — 课程导论、模拟/数字信号、DSP 与 ASP。考试权重很低，快速浏览即可。
- [第2章 离散时间信号时域分析](/notes/digital-signal-processing/chapter2/) — 序列、典型信号、三角恒等式、线性卷积和周期性判断。
- [第3章 DTFT、采样与恢复](/notes/digital-signal-processing/chapter3/) — DTFT、频率单位换算、采样频谱、混叠、恢复和频谱搬移。
- [第4章 离散时间系统](/notes/digital-signal-processing/chapter4/) — 系统性质证明、LTI、卷积、级联系统和系统辨识。
- [第5章 DFT、FFT 与工程频谱](/notes/digital-signal-processing/chapter5/) — DFT 性质、实序列对称、FFT、谱线 Hz 换算、OLA/OLS。
- [第6章 Z 变换与系统函数](/notes/digital-signal-processing/chapter6/) — ZT、ROC、零极点、差分方程、$h[n]$ 与 Direct Form II 入口。
- [第7章 相位系统与线性相位 FIR](/notes/digital-signal-processing/chapter7/) — FIR/IIR、全通、最小/最大/混合相位、线性相位四型。
- [第8章 数字滤波器结构](/notes/digital-signal-processing/chapter8/) — DF-I/DF-II、级联、并联、线性相位结构和资源估算。
- [第9章 IIR 数字滤波器设计](/notes/digital-signal-processing/chapter9/) — Butterworth、预畸变、双线性变换、IIR 考场答题流程。
- [第10章 FIR 数字滤波器设计](/notes/digital-signal-processing/chapter10/) — 窗函数法、频率采样法、阶数估计、最省乘法结构。
- [第11章 FFT 兼容入口](/notes/digital-signal-processing/chapter11/) — 旧链接保留页；FFT 主内容逐步并入 ch5，这里保留最常用速查。

## 高频公式入口

| 场景 | 公式 | 检查点 |
|---|---|---|
| Hz 到数字频率 | $\omega=2\pi f/F_s$ | $f=F_s/2$ 对应 $\omega=\pi$ |
| 模拟角频率到数字频率 | $\omega=\Omega T$ | $T=1/F_s$ |
| DFT 谱线到 Hz | $f_k=kF_s/N$；若 $k>N/2$，用 $f_k=(k-N)F_s/N$ | 高于 $N/2$ 的谱线是负频率 |
| 线性卷积长度 | $L=L_x+L_h-1$ | 用 DFT 算线性卷积时至少补零到 $L$ |
| DFT / IDFT | $X[k]=\sum_{n=0}^{N-1}x[n]W_N^{kn}$；$x[n]=\frac1N\sum_{k=0}^{N-1}X[k]W_N^{-kn}$ | IDFT 有 $1/N$ |
| 实序列 DFT | $X[k]=X^*[\langle-k\rangle_N]$ | $X[0]$ 和偶数点 $X[N/2]$ 为实数 |
| Z 变换常用对 | $a^n u[n]\leftrightarrow 1/(1-az^{-1}), |z|>|a|$ | 同一分式配不同 ROC 会对应不同序列 |
| 因果稳定 | 因果 ROC 在最外极点外；稳定要求 ROC 包含单位圆 | 因果稳定有理系统：所有极点在单位圆内 |
| 双线性预畸变 | $\Omega=\frac{2}{T}\tan(\omega/2)$ | 先预畸变，再设计模拟原型 |
| FIR 窗函数截止 | $\omega_c=(\omega_p+\omega_s)/2$ | 过渡带越窄，阶数越高 |

## 考场上选 FIR 还是 IIR？

| 情况 | 更适合 | 原因 |
|---|---|---|
| 题目要求 linear phase、对称系数、最少乘法器结构 | FIR | FIR 容易做精确线性相位，系数对称可省乘法器 |
| 题目给 Butterworth、Chebyshev、bilinear transform、prewarping | IIR | 明确是模拟原型到数字滤波器的路线 |
| 题目只说“任选 FIR 或 IIR 设计”且通带/阻带指标较常规 | 看自己熟练度 | 若会窗函数表，FIR 答题更稳；若会 Butterworth 阶数和双线性，IIR 阶数更低 |
| 题目强调稳定性、线性相位和结构可解释 | FIR | FIR 天然 BIBO 稳定，结构更容易画 |
| 题目强调较低阶数、较少延时器 | IIR | IIR 通常用更低阶达到相同幅度指标，但要检查极点稳定性 |

## 复习时的使用方法

1. 先用“题型地图”把真题题干翻译成章节。
2. 到对应章节先看“30 秒公式速查”，确认该用哪个公式。
3. 再看“做题套路”，按输入、输出、步骤、检查四部分写答案。
4. 最后用“易错点表”检查：频率单位、符号、$1/N$、ROC、阶数取整、线性/循环卷积是否混用。

如果一道题找不到入口，优先判断它属于三类之一：

- **信号怎么变频谱：** ch3/ch5。
- **系统怎么从输入变输出：** ch4/ch6/ch8。
- **滤波器怎么按指标设计：** ch9/ch10。
