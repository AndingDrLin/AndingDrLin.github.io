---
title: "传输线速记：Q1 概念题防身页"
description: "传输线输入阻抗、λ/4 变换器、VSWR 与 Γ 关系、stub 匹配。2024 Q10、2025 Q8/Q10 必考。"
date: 2026-06-28
tags: [electromagnetics-and-fields, transmission-line, 期末复习]
category: "课程学习"
docGroup: "emf-notes"
order: 12
draft: false
---

# 传输线速记

> 📌 考试定位：2024 Q10 和 2025 Q8(4)/Q10 考了传输线输入阻抗推导、λ/4 变换器和 VSWR。本页覆盖最常考的公式和步骤。

## 1. 核心公式

| 编号 | 公式 | 名称 |
|---|---|---|
| T.1 | $\Gamma=\frac{Z_L-Z_0}{Z_L+Z_0}$ | 反射系数 |
| T.2 | $Z_{in}(l)=Z_0\frac{Z_L+jZ_0\tan\beta l}{Z_0+jZ_L\tan\beta l}$ | 输入阻抗 |
| T.3 | $\beta=\frac{2\pi}{\lambda}$ | 相位常数 |
| T.4 | $\text{VSWR}=\frac{1+|\Gamma|}{1-|\Gamma|}$ | 电压驻波比 |
| T.5 | $V_{max}=\text{距负载}\,d_{min}+\lambda/4$ | 电压最大点位置 |
| T.6 | $Z_{in}=Z_0^2/Z_L$（当 $l=\lambda/4$） | λ/4 阻抗变换器 |
| T.7 | $Z_0=\sqrt{L/C}$ | 特性阻抗 |
| T.8 | $v_p=1/\sqrt{LC}$ | 相速度 |
| T.9 | $\lambda=v_p/f$ | 波长 |

## 2. 做题套路

### 套路 1：求输入阻抗

**输入：** $Z_L$、$Z_0$、线长 $l$（或 $l/\lambda$）。

1. 计算 $\beta l=2\pi l/\lambda$
2. 代入公式 T.2：
   $$
   Z_{in}=Z_0\frac{Z_L+jZ_0\tan\beta l}{Z_0+jZ_L\tan\beta l}
   $$
3. 特殊情况检查：
   - $l=0$：$Z_{in}=Z_L$（直接接负载）
   - $l=\lambda/2$：$Z_{in}=Z_L$（半波重复）
   - $l=\lambda/4$：$Z_{in}=Z_0^2/Z_L$（四分之一变换）
   - 短路 $Z_L=0$：$Z_{in}=jZ_0\tan\beta l$
   - 开路 $Z_L=\infty$：$Z_{in}=-jZ_0\cot\beta l$

### 套路 2：λ/4 阻抗变换器

**输入：** 负载阻抗 $Z_L$，需要匹配到 $Z_0$。

1. 插入一段 $\lambda/4$ 传输线
2. 变换器特性阻抗：$Z_{0t}=\sqrt{Z_0\cdot Z_L}$
3. 匹配后 $Z_{in}=Z_0$

⚠️ 注意：λ/4 变换器只在**单一频率**完美匹配。频率偏移时匹配变差。

### 套路 3：由 VSWR 和最小点位置求 $Z_L$

**输入：** VSWR、第一个电压最小点距负载 $d_{min}$。

1. 由 VSWR 求 $|\Gamma|$：
   $$
   |\Gamma|=\frac{\text{VSWR}-1}{\text{VSWR}+1}
   $$

2. 电压最小点处 $\Gamma$ 为负实数：$\Gamma_{min}=-|\Gamma|$

3. 从最小点向负载回退 $d_{min}$，反射系数旋转：
   $$
   \Gamma_L=\Gamma_{min}\cdot e^{-j2\beta d_{min}}
   $$

   （注意：向负载方向是逆时针，所以指数为负）

4. 由 $\Gamma_L$ 求 $Z_L$：
   $$
   Z_L=Z_0\frac{1+\Gamma_L}{1-\Gamma_L}
   $$

### 套路 4：stub 匹配（概念理解）

**目的：** 用一段短路或开路传输线（stub）并联在主线上，抵消负载的反射。

基本步骤（了解即可，考试可能只问原理）：
1. 找到主线上的一个位置，在该处归一化导纳的实部为 1
2. 在该位置并联一个 stub，其电纳恰好抵消虚部
3. stub 长度由短路/开路条件确定

## 3. 典型题

### 例题 1：λ/4 变换器

**题目：** 负载 $Z_L=200\,\Omega$，传输线 $Z_0=50\,\Omega$。用 $\lambda/4$ 变换器匹配，求变换器特性阻抗。

**解答：**

$$
Z_{0t}=\sqrt{Z_0\cdot Z_L}=\sqrt{50\times200}=\sqrt{10000}=100\,\Omega
$$

**答案：** 变换器特性阻抗为 $100\,\Omega$。

### 例题 2：输入阻抗推导

**题目：** 推导无耗传输线输入阻抗公式。

**解答：**

传输线上电压和电流可写为入射波和反射波之和：

$$
V(z)=V^+e^{-j\beta z}+V^-e^{j\beta z}
$$

$$
I(z)=\frac{V^+}{Z_0}e^{-j\beta z}-\frac{V^-}{Z_0}e^{j\beta z}
$$

在负载端 $z=0$（设负载在 $z=0$）：

$$
\Gamma=\frac{V^-}{V^+}=\frac{Z_L-Z_0}{Z_L+Z_0}
$$

在距负载 $l$ 处（$z=-l$）：

$$
Z_{in}=\frac{V(-l)}{I(-l)}=Z_0\frac{e^{j\beta l}+\Gamma e^{-j\beta l}}{e^{j\beta l}-\Gamma e^{-j\beta l}}
$$

代入 $\Gamma$ 并化简：

$$
Z_{in}=Z_0\frac{Z_L+jZ_0\tan\beta l}{Z_0+jZ_L\tan\beta l}
$$

### 例题 3：VSWR 求 $Z_L$

**题目：** $Z_0=50\,\Omega$，测得 VSWR=3，第一个电压最小点距负载 $d_{min}=0.15\lambda$。求 $Z_L$。

**解答：**

$$
|\Gamma|=\frac{3-1}{3+1}=0.5
$$

最小点处 $\Gamma=-0.5$。

从最小点向负载回退 $0.15\lambda$：

$$
2\beta d_{min}=2\cdot\frac{2\pi}{\lambda}\cdot0.15\lambda=0.6\pi=108°
$$

$$
\Gamma_L=-0.5\cdot e^{-j0.6\pi}=-0.5(\cos108°-j\sin108°)\approx 0.155+j0.476
$$

$$
Z_L=50\cdot\frac{1+0.155+j0.476}{1-0.155-j0.476}=50\cdot\frac{1.155+j0.476}{0.845-j0.476}
$$

（继续化简可得具体数值）

## 4. 易错点

| ❌ 错误 | ✅ 正确 |
|---|---|
| λ/4 变换器在所有频率匹配 | 只在单一频率完美匹配 |
| 输入阻抗公式中 $\tan$ 的参数用度数 | 必须用弧度（$\beta l$ 弧度） |
| 电压最小点在 $V_{max}$ 之前 | 从负载出发，先到最小点 |
| 向负载方向是顺时针 | 向负载方向是逆时针（Smith chart） |
| 短路线输入阻抗为零 | 只在 $l=0$ 为零；其他位置为纯电抗 |

## 5. 自测题

1. λ/4 变换器的特性阻抗公式是什么？
2. 无耗传输线 $l=\lambda/2$ 时输入阻抗等于什么？
3. 短路传输线的输入阻抗是什么形式？
4. VSWR=1 时 $|\Gamma|$ 是多少？
5. λ/4 变换器的局限性是什么？

**答案：** 1. $Z_{0t}=\sqrt{Z_0 Z_L}$。 2. $Z_{in}=Z_L$（半波重复性）。 3. 纯电抗 $jZ_0\tan\beta l$。 4. $|\Gamma|=0$（完美匹配）。 5. 只在单一频率匹配。
