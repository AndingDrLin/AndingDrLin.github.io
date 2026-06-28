---
title: "矩形波导速记：Q1 概念题防身页"
description: "TE/TM 模式、截止频率、β/λg/vp/vg/Z_TE、最大功率。2022 Q8/Q10d、2023 Q9、2024 Q9、2025 Q9 必考。"
date: 2026-06-28
tags: [electromagnetics-and-fields, waveguide, 期末复习]
category: "课程学习"
docGroup: "emf-notes"
order: 13
draft: false
---

# 矩形波导速记

> 📌 考试定位：2022–2025 每年都考矩形波导（至少 1 道大题）。本页覆盖 TE/TM 模式判别、截止频率、传播参数和最大功率。

## 1. 核心公式

| 编号 | 公式 | 名称 |
|---|---|---|
| W.1 | $f_{c,mn}=\frac{1}{2\pi\sqrt{\mu\epsilon}}\sqrt{\left(\frac{m\pi}{a}\right)^2+\left(\frac{n\pi}{b}\right)^2}$ | 截止频率 |
| W.2 | $\beta=\sqrt{k^2-k_c^2}=k\sqrt{1-(f_c/f)^2}$ | 传播常数（$f>f_c$） |
| W.3 | $\lambda_g=\frac{2\pi}{\beta}=\frac{\lambda}{\sqrt{1-(f_c/f)^2}}$ | 波导波长 |
| W.4 | $v_p=\frac{\omega}{\beta}=\frac{v}{\sqrt{1-(f_c/f)^2}}$ | 相速度 |
| W.5 | $v_g=\frac{d\omega}{d\beta}=v\sqrt{1-(f_c/f)^2}$ | 群速度 |
| W.6 | $v_p\cdot v_g=v^2$ | 相速×群速关系 |
| W.7 | $Z_{TE}=\frac{\eta}{\sqrt{1-(f_c/f)^2}}$ | TE 模波阻抗 |
| W.8 | $Z_{TM}=\eta\sqrt{1-(f_c/f)^2}$ | TM 模波阻抗 |
| W.9 | $\eta=\sqrt{\mu/\epsilon}$ | 本征阻抗（空气 $\approx 377\,\Omega$） |
| W.10 | $k=\omega\sqrt{\mu\epsilon}=2\pi/\lambda$ | 自由空间波数 |
| W.11 | $k_c=\sqrt{(m\pi/a)^2+(n\pi/b)^2}$ | 截止波数 |

其中 $v=1/\sqrt{\mu\epsilon}$ 是介质中的光速（空气中 $v\approx 3\times10^8$ m/s）。

## 2. 做题套路

### 套路 1：判断传播模式

**输入：** 波导尺寸 $a\times b$（$a>b$），工作频率 $f$。

1. 计算各模式的截止频率 $f_{c,mn}$（用公式 W.1）
2. **TE 模式**：$m,n$ 可以为 0（但不同时为 0）
   - TE$_{10}$ 是主模（最低截止频率）
   - $f_{c,10}=v/(2a)$
3. **TM 模式**：$m,n$ 都不能为 0
   - TM$_{11}$ 是最低 TM 模
4. 判断条件：$f>f_c$ 则该模式可传播；$f<f_c$ 则截止

**单模条件：** $f_{c,10}<f<f_{c,20}$（或 $f_{c,01}$，取决于尺寸）

### 套路 2：求传播参数

**输入：** 工作频率 $f$、波导尺寸、模式。

1. 求截止频率 $f_c$
2. 求自由空间波长 $\lambda=v/f$
3. 求波导波长：$\lambda_g=\lambda/\sqrt{1-(f_c/f)^2}$
4. 求传播常数：$\beta=2\pi/\lambda_g$
5. 求相速度：$v_p=\omega/\beta$
6. 求群速度：$v_g=v^2/v_p$
7. 求波阻抗：TE 用 Z$_{TE}$，TM 用 Z$_{TM}$

### 套路 3：求最大传输功率

**输入：** 波导尺寸、模式、介质击穿电场 $E_{max}$。

1. TE$_{10}$ 模的最大功率：
   $$
   P_{max}=\frac{ab}{4\eta}|E_{max}|^2\sqrt{1-(f_c/f)^2}
   $$

2. 一般公式涉及模式的电场分布积分，考试通常给简化公式或要求定性分析。

### 套路 4：TE$_{10}$ 模场结构（概念题）

TE$_{10}$ 模的场分量（$z$ 方向传播）：

$$
E_y=E_0\sin\left(\frac{\pi x}{a}\right)e^{-j\beta z}
$$

$$
H_x=-\frac{E_0}{Z_{TE}}\sin\left(\frac{\pi x}{a}\right)e^{-j\beta z}
$$

$$
H_z=j\frac{E_0}{Z_{TE}}\frac{\pi}{k\eta a}\cos\left(\frac{\pi x}{a}\right)e^{-j\beta z}
$$

特点：
- $E$ 只有 $y$ 分量（横向电场）
- $H$ 有 $x$ 和 $z$ 分量
- 场沿 $x$ 方向是 $\sin(\pi x/a)$ 分布，在 $x=0$ 和 $x=a$ 处为零
- 场沿 $y$ 方向均匀（与 $y$ 无关）

## 3. 典型题

### 例题 1：截止频率和传播判断

**题目：** 矩形波导 $a=2.3\,\text{cm}$，$b=1.0\,\text{cm}$，空气填充。工作频率 $f=10\,\text{GHz}$。判断 TE$_{10}$、TE$_{20}$、TE$_{01}$、TM$_{11}$ 是否可传播。

**解答：**

空气波导中 $v=3\times10^8$ m/s。

$$
f_{c,10}=\frac{v}{2a}=\frac{3\times10^8}{2\times0.023}=6.52\,\text{GHz}
$$

$$
f_{c,20}=\frac{v}{a}=\frac{3\times10^8}{0.023}=13.04\,\text{GHz}
$$

$$
f_{c,01}=\frac{v}{2b}=\frac{3\times10^8}{2\times0.01}=15\,\text{GHz}
$$

$$
f_{c,11}=\frac{v}{2}\sqrt{(1/a)^2+(1/b)^2}=\frac{3\times10^8}{2}\sqrt{(1/0.023)^2+(1/0.01)^2}\approx 16.3\,\text{GHz}
$$

- TE$_{10}$：$f_c=6.52<f=10$ → ✅ 可传播
- TE$_{20}$：$f_c=13.04>f=10$ → ❌ 截止
- TE$_{01}$：$f_c=15>f=10$ → ❌ 截止
- TM$_{11}$：$f_c=16.3>f=10$ → ❌ 截止

**答案：** 只有 TE$_{10}$ 可传播，是单模工作。

### 例题 2：波导波长和相速度

**题目：** TE$_{10}$ 模，$f=10$ GHz，$f_c=6.52$ GHz。求 $\lambda_g$ 和 $v_p$。

**解答：**

自由空间波长：

$$
\lambda=\frac{v}{f}=\frac{3\times10^8}{10\times10^9}=3\,\text{cm}
$$

波导波长：

$$
\lambda_g=\frac{\lambda}{\sqrt{1-(f_c/f)^2}}=\frac{3}{\sqrt{1-(6.52/10)^2}}=\frac{3}{\sqrt{1-0.425}}=\frac{3}{\sqrt{0.575}}\approx 3.95\,\text{cm}
$$

相速度：

$$
v_p=\frac{c}{\sqrt{1-(f_c/f)^2}}=\frac{3\times10^8}{\sqrt{0.575}}\approx 3.95\times10^8\,\text{m/s}
$$

（注意 $v_p>c$，但群速度 $v_g<c$，$v_p\cdot v_g=c^2$）

### 例题 3：波阻抗

**题目：** 同上条件，求 TE$_{10}$ 模的波阻抗。

**解答：**

$$
Z_{TE}=\frac{\eta}{\sqrt{1-(f_c/f)^2}}=\frac{377}{\sqrt{0.575}}\approx 498\,\Omega
$$

## 4. 易错点

| ❌ 错误 | ✅ 正确 |
|---|---|
| TE$_{10}$ 和 TM$_{10}$ 都存在 | TM$_{m0}$ 和 TM$_{0n}$ 不存在（$m$ 或 $n$ 不能为 0） |
| $v_p>c$ 违反相对论 | $v_p$ 是相速度，不传递能量；$v_g<c$ |
| 截止时波导内无场 | 截止时有衰减场（evanescent），但不传播能量 |
| $\lambda_g$ 和 $\lambda$ 相同 | $\lambda_g>\lambda$（波导波长大于自由空间波长） |
| 波阻抗和自由空间 $\eta$ 相同 | TE 的 $Z_{TE}>\eta$，TM 的 $Z_{TM}<\eta$ |

## 5. 自测题

1. 矩形波导的主模是什么？截止频率公式？
2. TM$_{10}$ 模是否存在？为什么？
3. 波导波长 $\lambda_g$ 和自由空间波长 $\lambda$ 的关系？
4. $v_p$ 和 $v_g$ 的乘积等于什么？
5. TE$_{10}$ 模的电场有几个分量？

**答案：** 1. TE$_{10}$，$f_c=v/(2a)$。 2. 不存在，因为 TM 模要求 $m,n$ 都不为 0。 3. $\lambda_g>\lambda$，$\lambda_g=\lambda/\sqrt{1-(f_c/f)^2}$。 4. $v_p\cdot v_g=v^2$（$v$ 是介质中光速）。 5. 只有 $E_y$ 一个分量。
