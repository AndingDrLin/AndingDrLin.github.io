---
title: "第9章 频域补偿器设计"
description: "掌握 lead、lag、lead-lag compensator 的频域作用、零极点位置、相位公式和考试设计流程。"
date: 2026-05-26
updated: 2026-07-27
tags: [dynamics-and-control, 控制理论]
category: "课程学习"
docGroup: "dc-notes"
order: 9
draft: false
---

## 学习目标

学完本章后，你应该能够：

1. 区分 controller 和 compensator。
2. 说明 lead、lag、lead-lag compensator 分别改善什么性能。
3. 按本课程的 $\alpha>1$ 约定写出 lead/lag 的标准形式。
4. 根据零极点位置判断一个补偿器是 lead 还是 lag。
5. 用 Bode 图解释补偿前后 phase margin、低频增益和 crossover frequency 的变化。
6. 按目标相位裕度或稳态误差指标完成基本设计步骤。

## 本章考试会怎么考

| 题型 | 拿分点 |
|---|---|
| 判断 lead/lag | 看 pole 和 zero 谁更靠近原点 |
| 写补偿器标准形式 | 必须说明本课程采用 $\alpha>1$ |
| 设计 lead | 求所需相位超前 → 求 $\alpha$ → 放置零极点 |
| 设计 lag | 求低频增益提升 → pole/zero 放在 crossover 以下 |
| Bode 对比 | lead 提 PM，lag 提低频增益，最后检查指标 |
| 解释作用 | 不要把 lead 和 lag 的功能写反 |

## 先用人话理解本章在讲什么

前面 PID 是在时域里调比例、积分、微分。补偿器设计是在频域里调开环曲线：哪里需要多一点相位，哪里需要多一点低频增益，就用零点和极点去塑形。

只调增益 $K$ 的问题是：它会把整条 Bode magnitude 图上下平移，但不会改变相位。若系统 phase margin 不够，只调 $K$ 很可能顾此失彼。Lead/lag compensator 的价值就在于：**通过放置零极点，分别改变相位和幅值形状。**

## 公式速查：本课程的 $\alpha>1$ 约定

课件定义页采用 $\alpha>1$。注意：有些频域设计教材会用 $0<\alpha<1$ 的倒数记号；考试按本课程 slides 的定义写，避免混用。

### Lead compensator

$$
G_c(s)=K\frac{1+s/\omega_c}{1+s/(\alpha\omega_c)}
=K\alpha\frac{s+\omega_c}{s+\alpha\omega_c},\qquad \alpha>1
$$

零极点：

- zero: $s=-\omega_c$，更靠近原点；
- pole: $s=-\alpha\omega_c$，更靠左。

口诀：**lead：zero nearer origin, pole farther left。**

最大相位超前：

$$
\phi_m=\tan^{-1}\left(\frac{\alpha-1}{2\sqrt{\alpha}}\right)
$$

等价：

$$
\sin\phi_m=\frac{\alpha-1}{\alpha+1}
$$

最大相位频率：

$$
\omega_m=\sqrt{\alpha}\omega_c
$$

### Lag compensator

$$
G_c(s)=K\alpha\frac{1+s/(\alpha\omega_c)}{1+s/\omega_c}
=K\frac{s+\alpha\omega_c}{s+\omega_c},\qquad \alpha>1
$$

上式中的换行只为排版；实际是：

$$
G_c(s)=K\frac{s+\alpha\omega_c}{s+\omega_c}
$$

零极点：

- pole: $s=-\omega_c$，更靠近原点；
- zero: $s=-\alpha\omega_c$，更靠左。

口诀：**lag：pole nearer origin, zero farther left。**

Lag 的相位为负。最大滞后量的大小：

$$
|\phi_m|=\tan^{-1}\left(\frac{\alpha-1}{2\sqrt{\alpha}}\right)
$$

相位本身可写成：

$$
\phi_{m,lag}=-\tan^{-1}\left(\frac{\alpha-1}{2\sqrt{\alpha}}\right)
$$

## 核心概念

### 1. Lead 补偿器

Lead 的主要作用：

- 增加正相位；
- 提高 phase margin；
- 通常提高 crossover frequency；
- 改善暂态响应和相对稳定性。

直觉：zero 先出现，给幅值增加斜率并提供相位超前；pole 后出现，把高频斜率拉回来。

### 2. Lag 补偿器

Lag 的主要作用：

- 提高低频增益；
- 改善稳态误差；
- 尽量少影响 crossover 附近相位；
- 可能稍微降低响应速度。

直觉：pole 更靠近原点，zero 更靠左，低频增益比高频增益大。设计时通常把 lag 的 pole/zero 放在 crossover frequency 以下，让它主要影响低频。

### 3. Lead-lag 补偿器

Lead-lag 可以看成 lead 和 lag 串联：

$$
G_c(s)=G_{lead}(s)G_{lag}(s)
$$

lead 负责相位裕度和暂态，lag 负责低频增益和稳态误差。综合题中常先设计 lead 满足 PM，再加 lag 修正稳态误差；也可能按题目要求反过来。

## 标准解题模板

### 模板 A：Lead 设计

1. 根据未补偿系统求当前 phase margin。
2. 计算所需相位超前：

$$
\phi_{add}=PM_{desired}-PM_{current}+\Delta\phi
$$

其中 $\Delta\phi$ 是预留的安全裕量。

3. 用：

$$
\sin\phi_m=\frac{\alpha-1}{\alpha+1}
$$

求 $\alpha$。
4. 选择新的 crossover frequency，通常放在最大相位频率附近。
5. 用：

$$
\omega_m=\sqrt{\alpha}\omega_c
$$

确定 zero 和 pole。
6. 调整增益 $K$，让新 crossover 处幅值为 0 dB。
7. 重新检查 PM/GM。

### 模板 B：Lag 设计

1. 根据稳态误差要求确定低频增益需要提高多少倍。
2. 选 $\alpha$ 等于所需低频增益提升倍数。
3. 把 lag 的 pole/zero 放在原 crossover frequency 以下，尽量少影响相位裕度。
4. 检查新的低频增益、crossover frequency、PM。

### 模板 C：判断 lead 还是 lag

看负实轴上的 pole 和 zero：

- zero 靠近原点，pole 更靠左 → lead；
- pole 靠近原点，zero 更靠左 → lag。

不要只看分子分母谁在上面，要先把它们写成 $s+a$ 的形式并画在负实轴上。

## 配套例题

### 例题 1：Lead 补偿器参数

要求设计一个 lead compensator，使最大相位超前为 $30^\circ$，且最大相位发生在 $\omega_m=5$ rad/s。采用本课程 $\alpha>1$ 约定，求 $\alpha$、zero 和 pole 位置。

由：

$$
\sin\phi_m=\frac{\alpha-1}{\alpha+1}
$$

代入 $\phi_m=30^\circ$：

$$
\frac{\alpha-1}{\alpha+1}=0.5
$$

$$
\alpha-1=0.5\alpha+0.5
$$

$$
0.5\alpha=1.5
$$

$$
\alpha=3
$$

最大相位频率：

$$
\omega_m=\sqrt{\alpha}\omega_c
$$

所以：

$$
\omega_c=\frac{5}{\sqrt{3}}
$$

Lead 的 zero 在：

$$
s=-\omega_c=-\frac{5}{\sqrt{3}}
$$

pole 在：

$$
s=-\alpha\omega_c=-3\cdot\frac{5}{\sqrt{3}}=-5\sqrt{3}
$$

**检查：** zero 更靠近原点，pole 更靠左，符合 lead。

### 例题 2：Lag 补偿器提高低频增益

希望低频增益提高 10 倍，但尽量不改变高频 crossover 附近形状。采用 lag compensator，取 $\alpha=10$，令 $\omega_c=0.1$ rad/s。写出补偿器并说明零极点位置。

Lag 标准形式：

$$
G_c(s)=K\frac{s+\alpha\omega_c}{s+\omega_c}
$$

先取 $K=1$：

$$
G_c(s)=\frac{s+10(0.1)}{s+0.1}=\frac{s+1}{s+0.1}
$$

pole：

$$
s=-0.1
$$

zero：

$$
s=-1
$$

低频增益：

$$
G_c(0)=\frac{1}{0.1}=10
$$

高频增益趋近 1。

**解释：** 这正是 lag 的作用：提高低频增益来改善稳态误差，但高频附近尽量不改变太多。

### 例题 3：为什么只调 $K$ 不够

某系统 PM 太小，但稳态误差也偏大。若只增大 $K$，低频增益会上升，稳态误差变小；但 magnitude 图整体上移，gain crossover frequency 往右移，通常相位更滞后，PM 可能更小。

更合理的策略：

1. 用 lag 提高低频增益，改善稳态误差。
2. 用 lead 增加相位，补回 phase margin。
3. 最后检查补偿后 Bode 图是否同时满足稳态和稳定裕度要求。

## 易错点与扣分点

1. **混用 $\alpha$ 记号。** 本课程定义页用 $\alpha>1$；若看到 $0<\alpha<1$，那是倒数记号。
2. **lead/lag 零极点顺序写反。** lead 是 zero 近原点；lag 是 pole 近原点。
3. **以为 lag 增加相位裕度。** Lag 主要改善低频稳态误差，会带来相位滞后；不要把它写成增加正相位。
4. **设计后不检查。** 补偿器设计不是写出 $G_c$ 就结束，必须检查 PM/GM 或稳态误差是否达到指标。
5. **把 $K$ 的作用说错。** 正增益 $K$ 只平移 magnitude，不改变 phase。

## 自测题与答案

### 题 1

某补偿器 zero 在 $-2$，pole 在 $-10$。这是 lead 还是 lag？

**答案：** zero $-2$ 更靠近原点，pole $-10$ 更靠左，所以是 lead compensator。

### 题 2

某补偿器 pole 在 $-0.5$，zero 在 $-5$。这是 lead 还是 lag？

**答案：** pole 更靠近原点，zero 更靠左，所以是 lag compensator。

### 题 3

采用本课程 $\alpha>1$ 约定，lead compensator 的 $\alpha=4$，$\omega_c=2$。求 zero、pole 和 $\omega_m$。

**答案：**

zero：

$$
s=-\omega_c=-2
$$

pole：

$$
s=-\alpha\omega_c=-8
$$

最大相位频率：

$$
\omega_m=\sqrt{\alpha}\omega_c=2\times2=4\text{ rad/s}
$$

### 题 4

Lag compensator 为什么能改善阶跃稳态误差？

**答案：** Lag 提高低频增益。稳态误差由低频 loop gain 决定；低频增益越大，单位阶跃误差通常越小。Lag 的设计目标是在提高低频增益的同时，把 pole/zero 放在 crossover 以下，尽量不破坏 phase margin。

## 学习路线

先把 lead/lag 的零极点顺序画熟，再学设计公式。补偿器设计最怕公式记了但方向反了；只要负实轴上 pole/zero 位置画对，很多错误会自动暴露。

## 和课程收尾的关系

频域补偿器是本课程后半部分的综合题：它同时用到 Bode 图、phase margin、gain crossover、稳态误差和闭环稳定性。做这类题时不要追求一步到位，按“未补偿系统分析 → 设计补偿器 → 补偿后检查”三步写，最稳。
