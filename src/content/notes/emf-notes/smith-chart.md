---
title: "Smith Chart 速记：Q1 概念题防身页"
description: "Smith chart 原理、归一化阻抗/导纳、反射系数圆、VSWR 和电压最小/最大点。2023 Q8、2024 Q8、2025 Q8/Q10 必考。"
date: 2026-06-28
tags: [electromagnetics-and-fields, smith-chart, 期末复习]
category: "课程学习"
docGroup: "emf-notes"
order: 11
draft: false
---

# Smith Chart 速记

> 📌 考试定位：2023 Q8、2024 Q8、2025 Q8/Q10 都考了 Smith chart。本页覆盖 Smith chart 的原理、使用步骤和常见计算。

## 1. 核心概念

### 1.1 Smith chart 是什么

Smith chart 是把复数反射系数 $\Gamma$ 的极坐标图和归一化阻抗 $z=Z_L/Z_0$ 的等值线叠在一起的图形工具。它的核心用途是：**在传输线上从负载阻抗出发，沿等 VSWR 圆移动，快速求出任意位置的输入阻抗。**

### 1.2 反射系数

$$
\Gamma=\frac{Z_L-Z_0}{Z_L+Z_0}
$$

- $|\Gamma|\le 1$（无源负载）
- $\Gamma=0$：匹配（$Z_L=Z_0$），在 Smith chart 中心
- $|\Gamma|=1$：全反射（纯电抗负载或短路/开路），在 Smith chart 边缘

### 1.3 归一化阻抗

$$
z=\frac{Z_L}{Z_0}=r+jx
$$

Smith chart 上：
- **等 $r$ 圆**：一系列与实轴相切于 $(1,0)$ 的圆
- **等 $x$ 圆**：一系列与实轴相切于 $(1,0)$ 的圆弧
- 实轴上半部分：感性（$x>0$）
- 实轴下半部分：容性（$x<0$）
- 最左边：短路点（$z=0$）
- 最右边：开路点（$z=\infty$）
- 中心：匹配点（$z=1$）

### 1.4 归一化导纳

$$
y=\frac{Y_L}{Y_0}=\frac{Z_0}{Z_L}=g+jb
$$

从阻抗到导纳：**沿等 $|\Gamma|$ 圆旋转 $180°$**（到 Smith chart 的对侧点）。

### 1.5 VSWR（电压驻波比）

$$
\text{VSWR}=\frac{1+|\Gamma|}{1-|\Gamma|}
$$

- VSWR=1：完美匹配
- VSWR=$\infty$：全反射
- VSWR 圆 = 等 $|\Gamma|$ 圆 = 以中心为圆心的同心圆

### 1.6 电压最大点和最小点

- **电压最大点**：在实轴 $r>1$ 侧（正实轴方向），$\Gamma$ 为正实数
- **电压最小点**：在实轴 $r<1$ 侧（负实轴方向），$\Gamma$ 为负实数
- 从负载向源方向移动：**先到电压最小点**（顺时针旋转）
- 最小点与最大点相距 $\lambda/4$（Smith chart 上旋转 $180°$）

## 2. 做题套路

### 套路 1：由 $Z_L$ 求 $\Gamma$ 和 VSWR

**输入：** 负载阻抗 $Z_L$ 和特性阻抗 $Z_0$。

1. 归一化：$z_L=Z_L/Z_0=r+jx$
2. 在 Smith chart 上找到 $(r,x)$ 对应的点
3. 该点到中心的距离即 $|\Gamma|$，角度即 $\angle\Gamma$
4. 计算：$\Gamma=(z_L-1)/(z_L+1)$
5. VSWR=$(1+|\Gamma|)/(1-|\Gamma|)$

### 套路 2：沿传输线求输入阻抗

**输入：** 负载阻抗 $Z_L$、特性阻抗 $Z_0$、传输线长度 $l$。

1. 归一化 $z_L$，在 Smith chart 上标出
2. 画等 $|\Gamma|$ 圆（VSWR 圆）
3. 从负载点沿**顺时针**方向旋转（向源移动）
4. 旋转角度 $=2\beta l=4\pi l/\lambda$
5. 到达新点，读出归一化阻抗 $z_{in}=r+jx$
6. 反归一化：$Z_{in}=z_{in}\cdot Z_0$

⚠️ 注意：顺时针是"向源移动"。$\lambda/2$ 对应旋转 $360°$（回到原点），$\lambda/4$ 对应旋转 $180°$。

### 套路 3：由 VSWR 和电压最小点位置求 $Z_L$

**输入：** VSWR 值、第一个电压最小点距离负载的位置 $d_{min}$。

1. 在 Smith chart 上画 VSWR 圆
2. 找到实轴 $r<1$ 侧的点（电压最小点）
3. 从最小点**逆时针**旋转 $2\beta d_{min}$（向负载方向）
4. 到达的点即为 $Z_L$ 的归一化值
5. 反归一化得 $Z_L$

## 3. 典型题

### 例题 1：求反射系数

**题目：** $Z_L=75+j50\,\Omega$，$Z_0=50\,\Omega$。求 $\Gamma$ 和 VSWR。

**解答：**

归一化：$z_L=75/50+j50/50=1.5+j1$

$$
\Gamma=\frac{z_L-1}{z_L+1}=\frac{0.5+j1}{2.5+j1}=\frac{(0.5+j1)(2.5-j1)}{|2.5+j1|^2}=\frac{1.25-j0.5+j2.5+1}{7.25}=\frac{2.25+j2}{7.25}\approx 0.31+j0.28
$$

$$
|\Gamma|\approx\sqrt{0.31^2+0.28^2}\approx 0.42
$$

$$
\text{VSWR}=\frac{1+0.42}{1-0.42}\approx 2.45
$$

### 例题 2：沿传输线求输入阻抗

**题目：** $Z_L=100\,\Omega$，$Z_0=50\,\Omega$，线长 $l=\lambda/8$。求 $Z_{in}$。

**解答：**

归一化：$z_L=2+j0$

在 Smith chart 上，$z_L$ 在实轴 $r=2$ 处。沿顺时针旋转 $2\beta l=2\cdot(2\pi/\lambda)\cdot(\lambda/8)=\pi/2=90°$。

从 $r=2$ 圆上顺时针转 $90°$，到达的点大约在 $z_{in}\approx 0.5-j0.5$（可在 Smith chart 上读出）。

$$
Z_{in}=(0.5-j0.5)\times 50=25-j25\,\Omega
$$

## 4. 易错点

| ❌ 错误 | ✅ 正确 |
|---|---|
| 沿逆时针向源移动 | 顺时针是向源移动 |
| $\lambda/4$ 线旋转 $90°$ | $\lambda/4$ 旋转 $180°$（$2\beta l=4\pi l/\lambda=\pi$） |
| VSWR 圆不画就求输入阻抗 | 必须先画等 $|\Gamma|$ 圆 |
| 电压最大点在 $r<1$ 侧 | 最大点在 $r>1$ 侧（正实轴） |
| 从阻抗到导纳直接算 | 旋转 $180°$ 更快 |

## 5. 自测题

1. Smith chart 中心对应什么阻抗？
2. $Z_L=Z_0$ 时 $\Gamma$ 和 VSWR 分别是多少？
3. 从负载向源移动，Smith chart 上是顺时针还是逆时针？
4. $\lambda/4$ 阻抗变换器在 Smith chart 上对应旋转多少度？
5. 电压最小点在 Smith chart 实轴的哪一侧？

**答案：** 1. $Z_L=Z_0$（匹配）。 2. $\Gamma=0$，VSWR=1。 3. 顺时针。 4. $180°$。 5. $r<1$ 侧（负实轴方向）。
