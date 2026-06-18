---
title: "第0章 期末题型和学习顺序"
description: "把 2022–2025 期末题拆成学习顺序：先补基础，再练固定题型。"
date: 2026-05-17
tags: [power-electronics, 电力电子]
category: "课程学习"
docGroup: "power-electronic-notes"
order: 0
draft: false
---
## 这门课的题不是散的

期末卷看起来有很多电路，但做法其实重复：先看波形和导通区间，再写公式，最后算电压、电流、损耗或温度。

如果第一次学，先把下面这条链走通：

```text
波形 average/RMS
→ diode rectifier
→ SCR phase control
→ switch loss
→ thermal
→ DC-DC converter
→ inverter/PWM
```

后面的所有大题都在重复这条链里的某一段。

## 2022–2025 真题怎么分布

| 年份 | Q1 | Q2 | Q3 | Q4 |
|---|---|---|---|---|
| 2022 | 波形、SOA、diode transient、SCR、centre-tapped rectifier | Bridge rectifier + capacitor | Buck converter | Snubber + thermal |
| 2023 | 整流波形、diode loss、SCR、thermal、bridge rectifier | MOSFET PWM loss | Buck boundary CCM | Three-phase PWM inverter |
| 2024 | SCR bridge、MOSFET、heatsink、centre-tapped rectifier | Rectifier + regulator supply | Boost + flyback + snubber | Three-phase inverter + unipolar PWM |
| 2025 | 分段电流、SCR、MOSFET、common heatsink、centre-tapped rectifier | Half-wave rectifier + SCR | Buck + flyback isolation | Bipolar / unipolar PWM |

## 第一遍该学什么

| 顺序 | 先弄懂什么 | 为什么要先学 |
|---|---|---|
| 1 | average、RMS、form factor | 后面所有功率、损耗、波形题都靠它 |
| 2 | diode rectifier | 每年都有输出波形、PIV、ripple |
| 3 | SCR | 相控题就是整流题加一个 firing angle |
| 4 | MOSFET / diode loss | thermal 题的输入功率从这里来 |
| 5 | thermal ladder | 考试常让你从 loss 算 junction temperature |
| 6 | DC-DC | Buck、Boost 是大题固定来源 |
| 7 | inverter/PWM | Q4 常考波形、truth table、shoot-through |

## 做题时先问自己四个问题

1. 这是波形题、电路题、损耗题，还是控制题？
2. 题目要的是 average、RMS、peak，还是 peak-to-peak？
3. 哪个器件在导通，哪个器件在关断？
4. 最后答案需要画图、写公式，还是给设计理由？

这四个问题问完，大多数题就知道该翻哪一章。

## 题型索引

| 题型 | 要先懂的基础 | 固定输出 | 对应章节 |
|---|---|---|---|
| 分段波形 | 面积和平方积分 | $X_{avg}$、$X_{rms}$、form factor | 第1章 |
| 电感电压 | 电感电流不能突变 | $v_L=Ldi/dt$ 和电压波形 | 第1章 |
| 整流输出 | diode 单向导通 | load waveform、diode drop、RMS/average | 第2章 |
| PIV | diode 关断时承受反压 | each diode PIV | 第2章 |
| 电容滤波 | capacitor 峰值充电、负载放电 | ripple、required $C$、conduction angle | 第2章 |
| SCR 相控 | gate 只控制开通 | firing angle、导通区间、积分 | 第3章 |
| diode / MOSFET loss | 平均电流和 RMS 电流用途不同 | conduction loss、switching loss、total loss | 第4章 |
| thermal | 热阻像电阻一样串联 | $T_S$、$T_C$、$T_J$、heatsink | 第5章 |
| snubber | 电感电流不能突然断掉 | current path、$di/dt$、ringing frequency | 第6章 |
| DC-DC | 电感一周期平均电压为 0 | duty、ripple、$I_{max/min}$ | 第7章 |
| PWM inverter | 开关状态决定输出电压 | switching condition、line voltage、dead time | 第8章 |

## 例题应该怎么写

考试给分看过程。每个计算题至少写这四行：

```text
1. 已知量：列出题目给的 V、I、R、L、C、f、D 或 alpha
2. 公式：写出本题适用公式
3. 代入：数值带单位代进去
4. 结论：答案 + 单位 + 简短判断
```

画图题至少标：axis、peak、zero line、导通区间、关键电压/电流值。
