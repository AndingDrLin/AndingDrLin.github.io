---
title: "第3章 DTFT、采样与恢复"
description: "DTFT 定义、频率单位换算、采样频谱、混叠、重构、带通采样和频谱搬移。"
date: 2026-06-26
tags: [dsp, signal-processing]
category: "课程学习"
docGroup: "dsp-notes"
order: 3
draft: false
---

# 第3章 DTFT、采样与恢复

> 📌 考试定位：本章对应 2022 Q3、2025 Q1 和复习题采样恢复题。近年趋势是把采样、数字滤波和 D/A 恢复放在一条链路里考，尤其要会处理 $(-1)^n$ 造成的频谱平移。

## 0. 先用一句话抓住本章

第3章解决的问题是：**连续信号采样成序列后，频谱怎么复制、怎么缩放、什么时候混叠、怎样通过数字滤波和重构滤波恢复想要的连续信号。**

题干出现这些关键词就翻本章：

- DTFT、$X(e^{j\omega})$、periodic with $2\pi$；
- sampling、aliasing、Nyquist rate、folding frequency；
- C/D、D/C、ideal interpolator、reconstruction filter；
- $\omega$、$\Omega$、Hz、rad/s、rad/sample 换算；
- $(-1)^n$、modulation、spectrum shift by $\pi$；
- bandpass sampling / undersampling。

最常见错误：漏掉采样频谱中的 $1/T$ 幅度因子；把模拟角频率 $\Omega$ 和数字角频率 $\omega$ 混用；看到 $(-1)^n$ 没想到频谱平移 $\pi$。

## 1. 30 秒公式速查

| 编号 | 公式 / 结论 | 名称 | 看到什么题干就用 |
|---|---|---|---|
| 3.1 | $X(e^{j\omega})=\sum_{n=-\infty}^{\infty}x[n]e^{-j\omega n}$ | DTFT | 离散序列频谱 |
| 3.2 | $x[n]=\frac1{2\pi}\int_{-\pi}^{\pi}X(e^{j\omega})e^{j\omega n}d\omega$ | IDTFT | 从 DTFT 恢复序列 |
| 3.3 | $X(e^{j(\omega+2\pi)})=X(e^{j\omega})$ | DTFT 周期性 | 频率折叠、混叠 |
| 3.4 | $\omega=\Omega T=2\pi f/F_s$ | 频率换算 | Hz / rad/s / 数字频率互转 |
| 3.5 | $f=\omega F_s/(2\pi)$ | 数字频率到 Hz | DFT 谱线、采样题 |
| 3.6 | $G_p(j\Omega)=\frac1T\sum_kG_a(j(\Omega-k\Omega_s))$ | 理想采样频谱 | 采样后频谱复制 |
| 3.7 | $\Omega_s=2\pi/T=2\pi F_s$ | 采样角频率 | 模拟频域图 |
| 3.8 | 无混叠：$\Omega_s>2\Omega_m$ 或 $F_s>2f_m$ | Nyquist 条件 | 判断 aliasing |
| 3.9 | $H_r(j\Omega)=T$ in passband | 理想重构滤波器增益 | 恢复时补偿 $1/T$ |
| 3.10 | $e^{j\omega_0n}x[n]\leftrightarrow X(e^{j(\omega-\omega_0)})$ | 频移定理 | 调制、乘 $(-1)^n$ |
| 3.11 | $(-1)^n=e^{j\pi n}$ | 频谱平移 $\pi$ | 2025 频谱复用题 |
| 3.12 | $x[n]*h[n]\leftrightarrow X(e^{j\omega})H(e^{j\omega})$ | 卷积定理 | LTI 频域输出 |
| 3.13 | $\sum|x[n]|^2=\frac1{2\pi}\int_{-\pi}^{\pi}|X(e^{j\omega})|^2d\omega$ | Parseval | 能量题 |

## 2. 5 分钟直觉

### 2.1 DTFT 为什么是周期的

DTFT 的频率变量是 $\omega$，单位是 rad/sample。因为 $n$ 总是整数，

$$
e^{j(\omega+2\pi)n}=e^{j\omega n}e^{j2\pi n}=e^{j\omega n}.
$$

所以对离散序列来说，$\omega$ 和 $\omega+2\pi$ 是完全相同的频率。这就是为什么数字频率只需要看一个周期，通常取 $[-\pi,\pi]$ 或 $[0,2\pi)$。

### 2.2 采样在频域做了什么

连续信号 $g_a(t)$ 被理想冲激串采样后，频域不是只“变宽”或“变稀”，而是：**原频谱被按采样角频率 $\Omega_s$ 周期复制，并整体乘以 $1/T$。**

$$
G_p(j\Omega)=\frac1T\sum_{k=-\infty}^{\infty}G_a(j(\Omega-k\Omega_s)).
$$

这个公式同时解释两件事：

- 为什么采样率不够会混叠：副本之间重叠，信息叠在一起，无法分开；
- 为什么重构滤波器通带增益要取 $T$：采样时多了 $1/T$，恢复时要乘回去。

### 2.3 数字处理连续信号的完整链路

考试里常见链路是：

$$
x_a(t)\rightarrow \text{C/D}\rightarrow x[n]\rightarrow \text{数字滤波 }H(e^{j\omega})\rightarrow y[n]\rightarrow \text{D/C}\rightarrow y_a(t).
$$

做这种题时不要只盯着某一个模块，要按顺序跟踪频谱：

1. C/D：$\Omega$ 轴变成 $\omega=\Omega T$，频谱周期化；
2. 数字滤波：$Y(e^{j\omega})=H(e^{j\omega})X(e^{j\omega})$；
3. D/C：把数字频谱映射回模拟频率，并用理想重构滤波器选出想要的副本。

### 2.4 $(-1)^n$ 是 2025 新题型的关键

$$
(-1)^n=e^{j\pi n}.
$$

所以如果

$$
y[n]=x_1[n]+(-1)^nx_2[n],
$$

那么 $x_2[n]$ 的频谱会整体平移 $\pi$：

$$
Y(e^{j\omega})=X_1(e^{j\omega})+X_2(e^{j(\omega-\pi)}).
$$

直觉上，这是把一个信号放在低频，把另一个信号搬到靠近 $\pi$ 的高频区域。只要二者频带不重叠，就可以用数字低通/高通滤波器把它们拆开，再分别 D/A 恢复。

## 3. 做题套路

### 套路 1：采样频谱与混叠判断

**输入：** 连续信号最高频率 $f_m$ 或 $\Omega_m$，采样频率 $F_s$ 或采样周期 $T$。  
**输出：** 是否混叠，采样后数字频率是多少。  
**对应真题：** 2022 Q3、复习题采样判断。

1. 把角频率和 Hz 分清：

   $$
   \Omega=2\pi f.
   $$

2. 判断 Nyquist 条件：

   $$
   F_s>2f_m
   $$

   或

   $$
   \Omega_s>2\Omega_m.
   $$

3. 求每个频率分量的数字频率：

   $$
   \omega=2\pi f/F_s.
   $$

4. 如果 $|\omega|>\pi$，折回到 $[-\pi,\pi]$。常用 Hz 版本：频率 $f$ 采样后等效为距离最近的 $kF_s$ 的差值。

⚠️ 注意：临界采样 $F_s=2f_m$ 在理论图上刚好不重叠，但实际题里若是正弦，采样相位可能导致全采到零点。工程上通常要求严格大于。

### 套路 2：采样—数字滤波—恢复链路

**输入：** $X_a(j\Omega)$ 的频谱范围、采样频率、数字滤波器 $H(e^{j\omega})$。  
**输出：** 恢复后的连续信号频谱或表达式。  
**对应真题：** 2022 Q3、2025 Q1。

1. 画或描述采样后的频谱副本：间隔 $\Omega_s=2\pi/T$，幅度乘 $1/T$。
2. 映射到数字频率：

   $$
   \omega=\Omega T.
   $$

3. 乘数字滤波器：

   $$
   Y(e^{j\omega})=H(e^{j\omega})X(e^{j\omega}).
   $$

4. D/C 恢复时，选重构滤波器通带。若要恢复基带，低通通带覆盖原信号频谱；若要恢复某个搬移后的副本，通带要放在对应模拟频段。
5. 重构滤波器通带增益通常取 $T$，用于抵消采样时的 $1/T$。

检查：恢复出的频谱幅度是否回到原来的尺度？频率位置是否正确？

### 套路 3：$(-1)^n$ 频谱复用与拆分

**输入：** $y[n]=x_1[n]+(-1)^nx_2[n]$ 或类似结构。  
**输出：** 解释频谱如何复用，如何恢复 $x_1$ 和 $x_2$。  
**对应真题：** 2025 Q1。

1. 写出 $(-1)^n=e^{j\pi n}$。
2. 用频移定理：

   $$
   (-1)^nx_2[n]\leftrightarrow X_2(e^{j(\omega-\pi)}).
   $$

3. 判断 $X_1$ 和搬移后的 $X_2$ 是否在数字频域重叠。
4. 若不重叠：
   - 用数字低通提取低频的 $X_1$；
   - 用数字高通或带通提取靠近 $\pi$ 的 $X_2$；
   - 对 $X_2$ 分支再乘 $(-1)^n$ 可搬回基带；
   - 分别 D/A 恢复。
5. 若重叠：说明不可无失真分离。

⚠️ 注意：频谱平移后要按 $2\pi$ 周期折回。靠近 $\pi$ 的部分等价于靠近 $-\pi$ 的部分。

### 套路 4：带通采样判断

**输入：** 带通信号频率范围 $[f_L,f_H]$。  
**输出：** 是否能低于 $2f_H$ 采样，以及可选采样率。  
**对应真题/复习题：** 欠采样题。

1. 计算带宽：

   $$
   B=f_H-f_L.
   $$

2. 低通 Nyquist 会要求 $F_s>2f_H$，但带通采样只要求频谱副本不重叠，理论最低可接近 $2B$。
3. 若题目给简化条件 $f_H=MB$，可取

   $$
   F_s=2B.
   $$

4. 更一般地要检查各副本是否重叠；如果没有图，按题目给的公式或范围求解。

⚠️ 注意：带通采样不是随便低采样。前提是只有该带通信号存在，且抗混叠滤波器先把其他频带清掉。

## 4. 典型题精讲

### 例题 1：混叠判断

**题目：** $x_a(t)=\cos(2\pi\cdot 40t)+\cos(2\pi\cdot 90t)$，以 $F_s=100$ Hz 采样。求采样后数字频率，并判断混叠。

**解答：**

采样周期 $T=1/100$。数字频率：

$$
\omega_1=2\pi\frac{40}{100}=0.8\pi.
$$

$$
\omega_2=2\pi\frac{90}{100}=1.8\pi.
$$

$0.8\pi<\pi$，40 Hz 分量无混叠。$1.8\pi>\pi$，90 Hz 分量会折回：

$$
\cos(1.8\pi n)=\cos(2\pi n-0.2\pi n)=\cos(0.2\pi n).
$$

所以采样序列可写为

$$
x[n]=\cos(0.8\pi n)+\cos(0.2\pi n).
$$

**答案：** 90 Hz 分量混叠为 10 Hz 等效分量；40 Hz 分量仍对应 $0.8\pi$。

**易错提醒：** 不要说“90 Hz 消失了”。它没有消失，而是伪装成 10 Hz。

### 例题 2：恢复滤波器为什么增益是 $T$

**题目：** 理想采样后频谱为

$$
G_p(j\Omega)=\frac1T\sum_kG_a(j(\Omega-k\Omega_s)).
$$

若无混叠，为什么理想低通重构滤波器通带增益取 $T$？

**解答：**

无混叠时，基带副本为

$$
\frac1T G_a(j\Omega).
$$

要恢复原始频谱 $G_a(j\Omega)$，低通滤波器在基带内需要乘以 $T$：

$$
T\cdot \frac1T G_a(j\Omega)=G_a(j\Omega).
$$

**答案：** 因为采样在频域引入 $1/T$ 幅度缩放，重构滤波器必须用增益 $T$ 抵消它。

### 例题 3：$(-1)^n$ 频谱搬移

**题目：** 已知 $x_1[n]$ 是低频信号，频谱集中在 $|\omega|<0.25\pi$；$x_2[n]$ 也是低频信号，频谱集中在 $|\omega|<0.25\pi$。令

$$
y[n]=x_1[n]+(-1)^nx_2[n].
$$

说明如何从 $y[n]$ 中恢复 $x_1[n]$ 和 $x_2[n]$。

**解答：**

因为

$$
(-1)^n=e^{j\pi n},
$$

所以

$$
(-1)^nx_2[n]\leftrightarrow X_2(e^{j(\omega-\pi)}).
$$

这会把 $x_2$ 的低频频谱搬移到 $\omega=\pi$ 附近。$x_1$ 仍在 $|\omega|<0.25\pi$。两者不重叠。

恢复 $x_1$：对 $y[n]$ 通过数字低通，通带覆盖 $|\omega|<0.25\pi$。

恢复 $x_2$：对 $y[n]$ 通过数字高通或带通，取出 $\pi$ 附近的频谱，再乘 $(-1)^n$ 把它搬回基带：

$$
(-1)^n\cdot (-1)^nx_2[n]=x_2[n].
$$

**答案：** 低通分支取 $x_1$；高通/带通分支取出搬移后的 $x_2$，再乘 $(-1)^n$ 搬回基带。

**易错提醒：** 第二个分支只滤出 $\pi$ 附近还不够，若要得到原始 $x_2[n]$，还要再乘一次 $(-1)^n$。

### 例题 4：频率单位换算

**题目：** 采样频率 $F_s=8$ kHz，数字频率 $\omega=0.75\pi$ 对应多少 Hz？

**解答：**

$$
f=\frac{\omega F_s}{2\pi}=\frac{0.75\pi\times8000}{2\pi}=3000\text{ Hz}.
$$

**答案：** 3 kHz。

**易错提醒：** $\omega=\pi$ 对应 $F_s/2$，不是 $F_s$。

### 例题 5：采样-数字滤波-恢复链路（2022 Q3 / 2025 Q1 型）

**题目：** 模拟信号 $x_a(t)$ 的频谱 $X_a(j\Omega)$ 仅在 $|\Omega|\leq 2000\pi$ 非零。以采样频率 $F_s=4000$ Hz（即 $T=1/4000$）采样得到序列 $x[n]$，经过理想数字低通滤波器 $H(e^{j\omega})$（截止频率 $\omega_c=\pi/2$，通带增益 1），输出 $y[n]$ 再通过理想 D/C 转换器（同样使用 $T=1/4000$）恢复为 $y_a(t)$。

(1) 最高模拟频率 $\Omega_m$ 是多少？是否发生混叠？
(2) 画出或描述 $X(e^{j\omega})$——$x[n]$ 的 DTFT。
(3) 画出数字滤波后的 $Y(e^{j\omega})$。
(4) 恢复后模拟输出 $y_a(t)$ 的频谱 $Y_a(j\Omega)$ 是什么？

链路总览：

$$
x_a(t)\xrightarrow{\text{C/D}}x[n]\xrightarrow{H(e^{j\omega})}y[n]\xrightarrow{\text{D/C}}y_a(t).
$$

**解答：**

**(1) 混叠判断**

$$
\Omega_m=2000\pi\implies f_m=1000\text{ Hz}.
$$

$$
F_s=4000\text{ Hz}>2f_m=2000\text{ Hz}.
$$

Nyquist 条件满足，**无混叠**。

**(2) 采样后频谱 $X(e^{j\omega})$**

采样把模拟频率 $\Omega$ 映射到数字频率：

$$
\omega=\Omega T=\frac{\Omega}{4000}.
$$

所以最高频率分量对应的数字频率为

$$
\omega_m=\frac{2000\pi}{4000}=\frac{\pi}{2}.
$$

采样后频谱的幅度要乘 $1/T=4000$，同时以 $2\pi$ 为周期复制：

$$
X(e^{j\omega})=\frac{1}{T}\sum_k X_a\!\left(j\frac{\omega-2\pi k}{T}\right)=4000\cdot X_a(j4000\omega),\quad|\omega|\leq\frac{\pi}{2}.
$$

基带非零范围 $|\omega|\leq\pi/2$，在 $[-\pi,\pi]$ 内不会与相邻副本重叠（因为无混叠）。

**(3) 数字滤波后 $Y(e^{j\omega})$**

理想低通滤波器 $H(e^{j\omega})$ 在 $|\omega|<\pi/2$ 内增益为 1，其余为 0。

由于 $X(e^{j\omega})$ 仅在 $|\omega|\leq\pi/2$ 非零，恰好完全落在滤波器通带内：

$$
Y(e^{j\omega})=H(e^{j\omega})\cdot X(e^{j\omega})=X(e^{j\omega}).
$$

信号**完全通过**，没有任何损失。

**(4) D/C 恢复后的频谱 $Y_a(j\Omega)$**

D/C 转换先把数字频率映射回模拟频率（$\Omega=\omega/T$），再通过理想重构滤波器。重构滤波器在通带内的增益取 $T$，以抵消采样时引入的 $1/T$：

$$
Y_a(j\Omega)=T\cdot Y(e^{j\Omega T})=T\cdot\frac{1}{T}X_a(j\Omega)=X_a(j\Omega),\quad|\Omega|\leq 2000\pi.
$$

**答案：** 完美恢复 $x_a(t)$，频谱与原信号完全一致。

---

**变式：如果数字滤波器截止频率改为 $\omega_c=\pi/4$ 会怎样？**

$\omega_c=\pi/4$ 对应模拟频率

$$
\Omega_c=\frac{\pi/4}{T}=\frac{\pi}{4}\times 4000=1000\pi\quad(f_c=500\text{ Hz}).
$$

滤波器只保留 $|\omega|<\pi/4$ 的部分，即模拟频率 $|\Omega|<1000\pi$ 的部分被保留，$1000\pi<|\Omega|\leq 2000\pi$ 的部分被滤掉。

恢复后：

$$
Y_a(j\Omega)=X_a(j\Omega)\cdot\operatorname{rect}\!\left(\frac{\Omega}{2000\pi}\right).
$$

输出信号的带宽从 1000 Hz 变窄到 500 Hz，高频信息丢失。

**易错提醒：**
- **别漏 $1/T$。** 采样后频谱幅度是 $\frac{1}{T}X_a$，不是 $X_a$。漏掉这个因子，后面 D/C 恢复的幅度就全错了。
- **重构滤波器增益是 $T$，不是 1。** 它的作用就是把采样乘的 $1/T$ 抵消回去。
- **频率位置和幅度要同时跟踪。** 很同学只关注频率有没有混叠、通带是否覆盖，最后忘了幅度要从头乘到尾。整条链路的幅度传递是：$1/T$（采样）$\times$ 滤波器增益 $\times$ $T$（恢复）$=1$。如果某一步漏了，最终输出幅度就不对。

## 5. 易错点表

| ❌ 错误做法 | ✅ 正确做法 | 来源 |
|---|---|---|
| 把 DTFT 当成非周期函数 | DTFT 以 $2\pi$ 为周期 | ch3 基础 |
| 把 $\Omega$ 和 $\omega$ 混用 | $\omega=\Omega T$，单位不同 | 采样题 |
| 漏采样频谱的 $1/T$ | 写 $G_p(j\Omega)=\frac1T\sum G_a(j(\Omega-k\Omega_s))$ | 2022 Q3 |
| 恢复滤波器增益写 1 | 理想重构通带增益应为 $T$ | 2022 Q3 |
| 认为混叠能靠后端滤波修好 | 一旦副本重叠，信息已相加，不可逆 | 采样判断 |
| 看到 $(-1)^n$ 只想到符号交替 | $(-1)^n=e^{j\pi n}$，频谱平移 $\pi$ | 2025 Q1 |
| 高于 $\pi$ 的数字频率不折回 | 数字频率按 $2\pi$ 周期等效 | aliasing |
| 带通采样随便低采样 | 前提是频带不重叠且先带通限频 | 欠采样 |

## 6. 本章 90 分检查清单

- [ ] 能写出 DTFT 和 IDTFT 定义。
- [ ] 能解释 DTFT 为什么 $2\pi$ 周期。
- [ ] 能在 Hz、rad/s、rad/sample 三种频率之间转换。
- [ ] 能画出采样后的频谱复制，并写出 $1/T$ 幅度因子。
- [ ] 能判断是否混叠，并给出折回后的等效频率。
- [ ] 能说明理想重构滤波器的通带位置和增益。
- [ ] 能处理 $(-1)^n$ 频谱平移题。
- [ ] 能说明带通采样为什么可能低于 $2f_H$。

## 7. 自测题与答案

### 题目

1. 写出 DTFT 正变换和逆变换。
2. 为什么 $X(e^{j\omega})$ 以 $2\pi$ 为周期？
3. $F_s=10$ kHz 时，$f=2$ kHz 对应的数字角频率是多少？
4. $F_s=12$ kHz 时，$\omega=\pi/3$ 对应多少 Hz？
5. $x_a(t)=\cos(2\pi\cdot7t)$ 以 $F_s=10$ Hz 采样，等效频率是多少？
6. 采样频谱中的 $1/T$ 因子在恢复时如何补偿？
7. $(-1)^nx[n]$ 的 DTFT 是什么？
8. 带通信号 $f_L=20$ kHz、$f_H=25$ kHz，带宽是多少？理论最低采样率可能接近多少？

### 答案

1. 

   $$
   X(e^{j\omega})=\sum_{n=-\infty}^{\infty}x[n]e^{-j\omega n}.
   $$

   $$
   x[n]=\frac1{2\pi}\int_{-\pi}^{\pi}X(e^{j\omega})e^{j\omega n}d\omega.
   $$

2. 因为 $e^{-j(\omega+2\pi)n}=e^{-j\omega n}e^{-j2\pi n}=e^{-j\omega n}$，其中 $n$ 是整数。

3. 

   $$
   \omega=2\pi\frac{2}{10}=0.4\pi.
   $$

4. 

   $$
   f=\frac{\omega F_s}{2\pi}=\frac{(\pi/3)\cdot12000}{2\pi}=2000\text{ Hz}.
   $$

5. 7 Hz 超过折叠频率 5 Hz，会折回为 $|7-10|=3$ Hz。数字频率 $1.4\pi$ 等效为 $-0.6\pi$，余弦等效为 $0.6\pi$。

6. 理想重构滤波器通带增益取 $T$，使 $T\cdot(1/T)G_a(j\Omega)=G_a(j\Omega)$。

7. 

   $$
   (-1)^nx[n]=e^{j\pi n}x[n]\leftrightarrow X(e^{j(\omega-\pi)}).
   $$

8. 带宽 $B=25-20=5$ kHz。若满足带通采样条件，理论最低采样率可接近 $2B=10$ kHz。

## 8. 学习路线

1. 先学 DTFT 定义和周期性，这是后面所有频谱图的基础。
2. 再练频率换算：$f$、$\Omega$、$\omega$ 三者一定要熟。
3. 然后学采样频谱复制和 $1/T$ 幅度因子。
4. 接着做混叠判断题，把高于折叠频率的分量折回。
5. 最后学 $(-1)^n$ 频谱平移和 C/D—数字滤波—D/C 链路，这是 2025 新题型重点。

## 9. 和后续章节的关系

- [第4章](/notes/digital-signal-processing/chapter4/) 会把 $Y(e^{j\omega})=H(e^{j\omega})X(e^{j\omega})$ 用到系统分析。
- [第5章](/notes/digital-signal-processing/chapter5/) 会把连续的 DTFT 采样成 DFT 点，真正用于计算机计算。
- [第9章](/notes/digital-signal-processing/chapter9/) 和 [第10章](/notes/digital-signal-processing/chapter10/) 的滤波器设计都依赖本章的频率换算。
