---
title: "第8章 Bode 图与稳定裕度"
description: "掌握 Bode 图的标准因子、手绘步骤、gain/phase margin 读法，以及根据稳定裕度反求增益的方法。"
date: 2026-05-26
updated: 2026-07-27
tags: [dynamics-and-control, 控制理论]
category: "课程学习"
docGroup: "dc-notes"
order: 8
draft: false
---

## 学习目标

学完本章后，你应该能够：

1. 把传递函数写成 time constant form。
2. 分解出增益、积分器、一阶极点/零点、二阶因子和 delay。
3. 手绘 Bode magnitude plot 和 phase plot。
4. 从 Bode 图读 gain crossover、phase crossover、GM 和 PM。
5. 根据指定 PM 或 GM 反求增益 $K$。
6. 根据实验频率响应图反推近似传递函数。

## 本章考试会怎么考

| 题型 | 解题动作 |
|---|---|
| 手绘 Bode 图 | 标准形式 → corner frequencies → 斜率叠加 → 相位叠加 |
| 求 GM/PM | PM 在 gain crossover 读，GM 在 phase crossover 读 |
| 给 PM 反求 $K$ | 先用相位找新 $\omega_{gc}$，再让幅值等于 1 |
| 给 GM 反求 $K$ | 先找 $\omega_{pc}$，再按目标裕度调整幅值 |
| delay 影响 | 幅值不变，相位额外减 $\omega T$ |
| 由图反推传函 | 低频斜率、斜率突变、corner frequency、相位校验 |

## 先用人话理解本章在讲什么

Nyquist 图把 $G(j\omega)$ 画在复平面里，很直观但不太方便手算。Bode 图把同一个频率响应拆成两张图：一张画幅值，一张画相位。

Bode 图的好处是乘法变加法：传递函数由几个因子相乘，dB 幅值和相位都可以逐项叠加。考试中手绘 Bode 图，本质就是把每个因子的贡献加起来。

## 公式速查

频率响应：

$$
G(j\omega)=G(s)|_{s=j\omega}
$$

幅值 dB：

$$
20\log_{10}|G(j\omega)|
$$

相位：

$$
\angle G(j\omega)
$$

Gain crossover frequency：

$$
|G(j\omega_{gc})|=1
$$

Phase crossover frequency：

$$
\angle G(j\omega_{pc})=-180^\circ
$$

Phase margin：

$$
PM=180^\circ+\angle G(j\omega_{gc})
$$

Gain margin：

$$
GM=\frac{1}{|G(j\omega_{pc})|}
$$

dB 形式：

$$
GM_{dB}=-20\log_{10}|G(j\omega_{pc})|
$$

## 标准因子表

| 因子 | 幅值斜率 | 相位贡献 |
|---|---|---|
| $K$ | 常数 $20\log K$ | $0^\circ$，若 $K>0$ |
| $s$ | $+20$ dB/dec | $+90^\circ$ |
| $1/s$ | $-20$ dB/dec | $-90^\circ$ |
| $1+s/\omega_c$ | 过 $\omega_c$ 后 $+20$ dB/dec | $0^\circ \to +90^\circ$ |
| $1/(1+s/\omega_c)$ | 过 $\omega_c$ 后 $-20$ dB/dec | $0^\circ \to -90^\circ$ |
| 二阶极点 | 过 $\omega_n$ 后 $-40$ dB/dec | $0^\circ \to -180^\circ$ |
| $e^{-sT}$ | 0 dB | $-\omega T$ rad |

## 核心概念

### 1. Time constant form

Bode 图必须先把传递函数写成：

$$
G(s)=K\frac{(1+s/\omega_{z1})(1+s/\omega_{z2})\cdots}{s^r(1+s/\omega_{p1})(1+s/\omega_{p2})\cdots}
$$

或者用 $1+Ts$ 的形式。关键是把 corner frequency 读出来。

例如：

$$
s+5=5\left(1+\frac{s}{5}\right)
$$

corner frequency 是 $5$ rad/s。不要直接把常数项 5 扔掉。

### 2. 手绘幅值图

步骤：

1. 写低频起点。
2. 积分器从一开始就是 $-20$ dB/dec。
3. 每遇到一个 zero，斜率加 $20$ dB/dec。
4. 每遇到一个 pole，斜率减 $20$ dB/dec。
5. 二阶 pole/zero 斜率变化翻倍。

### 3. 手绘相位图

常用近似：一阶因子的相位变化从 $0.1\omega_c$ 到 $10\omega_c$，在 $\omega_c$ 附近约为 $\pm45^\circ$。

总相位就是所有因子相位相加。

## 标准解题模板

### 模板 A：手绘 Bode 图

1. 化成 time constant form。
2. 列出所有 corner frequencies。
3. 计算低频增益和初始斜率。
4. 按频率从小到大叠加斜率。
5. 分别画 phase contributions。
6. 标出 $\omega_{gc}$、$\omega_{pc}$。
7. 读 GM、PM。

### 模板 B：给 PM 反求 $K$

1. 先忽略 $K$，画/算相位。
2. 由目标 PM 找目标相位：

$$
\angle G_0(j\omega_{gc})=-180^\circ+PM_{target}
$$

3. 求对应频率 $\omega_{gc}$。
4. 令 $|KG_0(j\omega_{gc})|=1$。
5. 得：

$$
K=\frac{1}{|G_0(j\omega_{gc})|}
$$

### 模板 C：给 GM 反求 $K$

1. 找 phase crossover：$\angle G_0(j\omega_{pc})=-180^\circ$。
2. 计算 $|G_0(j\omega_{pc})|$。
3. 目标 $GM$ 为：

$$
GM=\frac{1}{K|G_0(j\omega_{pc})|}
$$

4. 解 $K$。

## 配套例题

### 例题 1：给 PM 反求增益

开环：

$$
L(s)=K\frac{1}{s(1+s/2)}
$$

要求 phase margin 为 $45^\circ$，求 $K$。

不含 $K$ 的部分：

$$
G_0(s)=\frac{1}{s(1+s/2)}
$$

相位：

$$
\angle G_0(j\omega)=-90^\circ-\tan^{-1}(\omega/2)
$$

PM 要求：

$$
PM=180^\circ+\angle L(j\omega_{gc})=45^\circ
$$

所以：

$$
\angle G_0(j\omega_{gc})=-135^\circ
$$

$$
-90^\circ-\tan^{-1}(\omega_{gc}/2)=-135^\circ
$$

$$
\tan^{-1}(\omega_{gc}/2)=45^\circ
$$

$$
\omega_{gc}=2
$$

在该频率处幅值：

$$
|G_0(j2)|=\frac{1}{2\sqrt{1+(2/2)^2}}=\frac{1}{2\sqrt{2}}
$$

要求 gain crossover 处 $|KG_0|=1$：

$$
K=2\sqrt{2}
$$

### 例题 2：求 GM

开环：

$$
L(s)=\frac{1}{s(1+s)(1+s/4)}
$$

相位：

$$
\angle L=-90^\circ-\tan^{-1}\omega-\tan^{-1}(\omega/4)
$$

phase crossover 条件：

$$
\tan^{-1}\omega+\tan^{-1}(\omega/4)=90^\circ
$$

当两个反正切相加为 $90^\circ$ 时，有：

$$
\omega\cdot\frac{\omega}{4}=1
$$

$$
\omega_{pc}=2
$$

幅值：

$$
|L(j2)|=\frac{1}{2\sqrt{1+2^2}\sqrt{1+(2/4)^2}}
$$

$$
=\frac{1}{2\sqrt{5}\sqrt{1.25}}=\frac{1}{5}
$$

所以：

$$
GM=\frac{1}{1/5}=5
$$

dB 形式：

$$
GM_{dB}=20\log_{10}5\approx 14\text{ dB}
$$

## 从实验频响反推传递函数

做这类题时按下面顺序：

1. 看低频斜率：若一开始是 $-20$ dB/dec，说明有一个积分器。
2. 看斜率在哪些频率改变：这些是 corner frequencies。
3. 斜率增加说明 zero，斜率减少说明 pole。
4. 低频幅值决定增益 $K$。
5. 用 phase plot 校验 pole/zero 数量是否合理。

## 易错点与扣分点

1. **没化成 time constant form。** $s+5$ 要写成 $5(1+s/5)$。
2. **幅值用错 log。** 传递函数幅值用 $20\log_{10}$，不是 $10\log_{10}$。
3. **PM/GM 读反。** PM 在 $|L|=1$ 处读相位；GM 在相位 $-180^\circ$ 处读幅值。
4. **以为 $K$ 改变相位。** 正增益 $K$ 只上下平移 magnitude，不改变 phase。
5. **delay 处理错。** $e^{-sT}$ 不改变幅值，只增加负相位。

## 自测题与答案

### 题 1

$G(s)=10/(s+5)$ 的 time constant form 是什么？

**答案：**

$$
s+5=5(1+s/5)
$$

$$
G(s)=\frac{10}{5(1+s/5)}=\frac{2}{1+s/5}
$$

corner frequency 是 $5$ rad/s。

### 题 2

如果相位交越频率处 $|L|=0.2$，求 GM 和 dB。

**答案：**

$$
GM=\frac{1}{0.2}=5
$$

$$
GM_{dB}=20\log_{10}5\approx14\text{ dB}
$$

### 题 3

若 gain crossover 处相位为 $-140^\circ$，PM 是多少？

**答案：**

$$
PM=180^\circ-140^\circ=40^\circ
$$

## 学习路线

先练标准因子表，再练手绘幅值斜率，最后练 GM/PM。Bode 图最怕“看懂但不会画”，一定要自己动手画几条渐近线。

## 和后续章节的关系

补偿器设计几乎都在 Bode 图上完成。Lead compensator 要增加 phase margin，lag compensator 要提高低频增益，判断它们有没有达到目标，靠的就是本章的 GM、PM 和 crossover frequency。
