---
title: "第0章 2022–2025 真题题型索引"
description: "按 2022–2025 期末题整理 Q1–Q4 题型、必写步骤和对应章节。"
date: 2026-05-17
tags: [power-electronics, 电力电子]
category: "课程学习"
docGroup: "power-electronic-notes"
order: 0
draft: false
---
## 2022–2025 真题题型

| 年份 | Q1 | Q2 | Q3 | Q4 |
|---|---|---|---|---|
| 2022 | 波形 average/RMS；电感电压；SOA；diode transient；SCR；centre-tapped rectifier | Bridge rectifier + capacitor ripple + PIV + VA rating | Buck：duty、$i_L$、$v_L$、ripple、linear regulator 对比 | Snubber 作用与计算；thermal ladder |
| 2023 | Full-wave rectified waveform；diode loss；SCR AC control；bridge rectifier；thermal | MOSFET PWM current、average/RMS、conduction/switching loss | Buck boundary CCM；waveforms；替代 converter | Three-phase PWM inverter；square-wave；phase sequence；shoot-through |
| 2024 | SCR bridge/DC motor；MOSFET 优缺点；MOSFET 并联；heatsink；centre-tapped rectifier | Rectifier + capacitor + linear regulator + transformer VA | Boost 推导；isolated converter；snubber 选择 | Three-phase six-step table；single-phase unipolar PWM |
| 2025 | 分段 load current；back-to-back SCR；MOSFET 优缺点；common heatsink；centre-tapped rectifier | Half-wave rectifier + capacitor；diode waveform；SCR half-wave average/RMS | Buck 完整计算；Flyback isolation | Bipolar/unipolar PWM；switching conditions；$m_a$、$m_f$；comparator circuit |

## 按题型查

| 题型 | 常见问法 | 必须写出的东西 | 去哪章 |
|---|---|---|---|
| 分段波形 | average、RMS、form factor | 周期、分段积分、单位；RMS 要平方积分 | 第1章 |
| 电感电压反推 | given $i_L(t)$, derive/sketch $v_L(t)$ | 每段斜率、$v_L=Ldi/dt$、正负电压、时间轴 | 第1章 |
| Rectifier 波形 | half-wave / bridge / centre-tapped output | 导通二极管、输出波形、diode drop、peak | 第2章 |
| PIV | find PIV rating | 关断二极管两端最大反压；bridge 和 centre-tap 分开算 | 第2章 |
| Capacitor ripple | ripple、required $C$、conduction angle | $\Delta V=I\Delta t/C$；half-wave/full-wave ripple period | 第2章 |
| Regulated supply | secondary voltage、capacitor rating、PIV、VA | dropout → ripple valley → peak → RMS；diode drop；VA/form factor | 第2章 |
| SCR 原理 | explain half-controllable | gate turn-on；gate 不能 turn-off；holding current/natural commutation | 第3章 |
| SCR 相控 | firing angle waveform、average/RMS | 标 $\alpha$；导通区间；积分；RMS 算 power | 第3章 |
| SOA / diode waveform | label SOA or diode switching curve | voltage/current/power/thermal limits；$V_F,I_F,V_R,I_R$ 等标注 | 第4章 |
| Diode loss | conduction + reverse recovery loss | $P_D\approx V_F I_{avg}$；$P_{RR}=Q_{RR}V_Rf_s$ | 第4章 |
| MOSFET loss | PWM current loss calculation | $I_{avg}$、$I_{rms}$、$P_{cond}$、$P_{sw}$、$P_{tot}$ | 第4章 |
| MOSFET 并联 | why current sharing | $R_{DS(on)}$ 正温度系数；仍需 matched layout/source resistor | 第4章 |
| Thermal | junction/case/sink temperature | thermal ladder；$T_A,T_S,T_C,T_J$；safe/unsafe | 第5章 |
| Shared heatsink | common heatsink sizing | $T_S$ 用总功耗；每个 $T_J$ 单独算 | 第5章 |
| Snubber | choose/draw snubber | 保护对象、能量路径、$di/dt$、ringing frequency、loss | 第6章 |
| Flyback isolation | choose isolated converter | flyback；turns ratio；duty；不是普通 buck-boost | 第6章、第7章 |
| Buck | duty、ripple、waveforms | $V_o=DV_{in}$；$v_L$ on/off；$\Delta i_L$；$I_{max/min}$ | 第7章 |
| Boost | derive output relation | volt-second balance；$V_o=V_{in}/(1-D)$；$I_L=I_{in}$ | 第7章 |
| Boundary CCM | calculate boundary $L$ | $I_{L,min}=0$；$\Delta I_L=2I_{L,avg}$ | 第7章 |
| PWM inverter | bipolar/unipolar conditions | comparator rule、switching table、output levels、dead time | 第8章 |
| Three-phase inverter | line voltage table | $v_{AB}=v_A-v_B$；每 60° 状态；符号 | 第8章 |

## 图和计算最低要求

- 计算题：公式、代入、单位都写。只写答案容易丢 working marks。
- 波形题：标 axis、period、peak、zero、导通区间。
- 电路题：先标导通路径，再写公式。
- 热题：画 thermal ladder，再算温度。
- PWM 题：先写 comparator rule，再写 switch state，不要直接跳输出波形。
