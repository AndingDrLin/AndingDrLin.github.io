---
title: "第7章 DC-DC Converters"
description: "期末 DC-DC 题要用的 Buck、Boost、Buck-Boost、Flyback、ripple 和 boundary CCM。"
date: 2026-05-17
tags: [power-electronics, 电力电子]
category: "课程学习"
docGroup: "power-electronic-notes"
order: 7
draft: false
---
## 会怎么考

- 识别 Buck / Boost / Buck-Boost / Flyback。
- 用 volt-second balance 推导 $V_o$ 和 $D$。
- 求 $T_{on}$、$v_L$、$di_L/dt$、$\Delta i_L$。
- 求 $I_{L,avg}$、$I_{L,max}$、$I_{L,min}$。
- 画 $i_L$、$v_L$、diode current、input current。
- Boundary CCM：令 $I_{L,min}=0$。
- 需要 isolation：选 Flyback。

## 通用步骤

所有 CCM 题按这几步写：

1. 画 switch ON 等效电路。
2. 画 switch OFF 等效电路。
3. 写两段 $v_L$。
4. 用 volt-second balance：

$$
D v_{L,on}+(1-D)v_{L,off}=0
$$

5. 求 duty。
6. 用：

$$
\Delta i_L=\frac{v_L\Delta t}{L}
$$

7. 求平均电感电流。
8. 算：

$$
I_{L,max}=I_{L,avg}+\frac{\Delta i_L}{2}
$$

$$
I_{L,min}=I_{L,avg}-\frac{\Delta i_L}{2}
$$

9. 检查 CCM：$I_{L,min}>0$。

## Buck

![Buck converter waveforms](./assets/buck_waveforms.svg)

ON：

$$
v_L=V_{in}-V_o
$$

OFF：

$$
v_L=-V_o
$$

Volt-second balance：

$$
(V_{in}-V_o)D+(-V_o)(1-D)=0
$$

$$
V_o=DV_{in}
$$

$$
D=\frac{V_o}{V_{in}}
$$

Ripple：

$$
\Delta i_L=\frac{(V_{in}-V_o)D}{Lf_s}
$$

Buck 中：

$$
I_{L,avg}=I_o
$$

若题目给 output power：

$$
I_o=\frac{P_o}{V_o}
$$

Input average current 可用理想功率守恒：

$$
I_{in,avg}=\frac{V_oI_o}{V_{in}}
$$

或近似：

$$
I_{in,avg}=DI_L
$$

## Boost

![Boost converter waveforms](./assets/boost_waveforms.svg)

ON：

$$
v_L=V_{in}
$$

OFF：

$$
v_L=V_{in}-V_o
$$

Volt-second balance：

$$
V_{in}D+(V_{in}-V_o)(1-D)=0
$$

$$
V_o=\frac{V_{in}}{1-D}
$$

$$
D=1-\frac{V_{in}}{V_o}
$$

Ripple：

$$
\Delta i_L=\frac{V_{in}D}{Lf_s}
$$

Boost 中 inductor 在输入侧：

$$
I_{L,avg}=I_{in,avg}=\frac{V_oI_o}{V_{in}}
$$

不要写成 $I_o$。

## Buck-Boost

![Inverting buck-boost converter waveforms](./assets/buck_boost_waveforms.svg)

输出反相。计算常用幅值。

ON：

$$
v_L=V_{in}
$$

OFF：

$$
v_L=-|V_o|
$$

$$
|V_o|=\frac{D}{1-D}V_{in}
$$

$$
D=\frac{|V_o|}{V_{in}+|V_o|}
$$

Ripple：

$$
\Delta i_L=\frac{V_{in}D}{Lf_s}
$$

输出只在 OFF interval 得到电感电流：

$$
I_o=(1-D)I_{L,avg}
$$

$$
I_{L,avg}=\frac{I_o}{1-D}
$$

## Boundary CCM

Boundary condition 就是电感电流刚好降到 0：

$$
I_{L,min}=0
$$

所以：

$$
\Delta I_L=2I_{L,avg}
$$

Buck boundary 常用：

$$
\Delta i_L=\frac{(V_{in}-V_o)D}{Lf_s}
$$

令它等于 $2I_o$：

$$
L_b=\frac{(V_{in}-V_o)D}{2I_of_s}
$$

若题目给 load resistance：

$$
I_o=\frac{V_o}{R}
$$

## Flyback

需要 isolation 时选 Flyback，不选普通 buck-boost。

理想幅值关系：

$$
\frac{V_o}{V_{in}}=\frac{N_s}{N_p}\frac{D}{1-D}
$$

答题句：

```text
A flyback converter is suitable because it provides galvanic isolation through the coupled inductor/transformer and its output can be adjusted by duty cycle and turns ratio.
```

## 波形要画什么

| Converter | $v_L$ | $i_L$ | 其他 |
|---|---|---|---|
| Buck | ON: $V_{in}-V_o$；OFF: $-V_o$ | 连续三角波，围绕 $I_o$ | input current 是脉冲 |
| Boost | ON: $V_{in}$；OFF: $V_{in}-V_o$ | 连续三角波，围绕 $I_{in}$ | diode current 只在 OFF 有 |
| Buck-Boost | ON: $V_{in}$；OFF: $-|V_o|$ | 连续三角波 | 输出反相，input current 是脉冲 |

## 2022/2025 Buck 题板书顺序

```text
D = V_o / V_in
T_on = D / f_s
I_o = P_o / V_o 或 V_o/R
I_L,avg = I_o
v_L,on = V_in - V_o
v_L,off = -V_o
Δi_L = (V_in - V_o)D/(Lf_s)
I_max/min = I_avg ± Δi_L/2
```

## 别丢分

- Buck 的 $I_L$ 平均值是 $I_o$；Boost 的 $I_L$ 平均值是 $I_{in}$。
- Boost 不是 $V_o=DV_{in}$。
- Buck-Boost 要写输出反相，或说明自己用的是 $|V_o|$。
- $\Delta i_L$ 是 peak-to-peak，最大最小用一半。
- Boundary CCM 不是 $\Delta I=I_o$，而是 $\Delta I=2I_o$。
- Switching frequency 先转成 period：$T=1/f_s$。
- 画波形必须标 ON/OFF 区间和电压值。
