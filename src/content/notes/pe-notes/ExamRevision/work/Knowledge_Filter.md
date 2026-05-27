---
title: "# Knowledge Filter（最终笔记筛选规则）"
description: "ExamRevision work artifact"
date: 2025-01-01
category: "课程学习"
docGroup: "power-electronic-notes"
draft: true
---

# Knowledge Filter（最终笔记筛选规则）

## 总目标

最终复习笔记不是完整讲义翻译，而是“能在考试中快速套用”的题型笔记。筛选标准：

1. past paper 或 feedback 明确出现过；
2. Lecture 13 有 worked solution；
3. 支撑高频计算题的必要公式、波形、图；
4. 老师反馈中点名的易错点。

## 进入最终笔记的内容（Keep）

| 模块 | 保留内容 | 理由 |
|---|---|---|
| Waveform fundamentals | Average、RMS、form factor；sine+DC offset；分段积分；symmetry 技巧 | 2017/2018、homework、feedback 均出现 |
| Rectifiers | Half-wave、full-wave bridge/centre-tap、PIV、diode/load voltage sketch、capacitor smoothing、ripple、conduction angle、VA rating | 两套 final 都有大题，且 feedback 易错多 |
| SCR phase control | SCR half-controllable definition；pure DC 不适合；half-wave/full-wave phase control waveform；average/RMS formula；back-to-back SCR | 2017/2018 + feedback 高频 |
| Switch devices | Ideal vs actual switch；MOSFET/IGBT/SCR/GTO device comparison；wind turbine 1 MW/690 V/2 kHz selection；MOSFET advantages/disadvantages | 2017 Q1、2018 Q1、feedback |
| Losses | MOSFET conduction loss、switching loss、diode reverse recovery loss formula（只保留识别和代入） | 2017/2018 Q3 直接考 |
| Thermal/heatsink | Thermal resistance ladder；`T_S/T_C/T_J` calculation；common heatsink total power warning | 每年大题，feedback 明确 common mistake |
| Snubber | Function、unpolarized RC、polarized RC/LR、ringing frequency、RC snubber sizing/loss | 2017/2018 简答 + homework design |
| DC-DC converters | Buck、Boost、Buck-Boost 的 D、`v_L` on/off、`ΔI_L`、`I_Lavg`、min/max、waveforms；Flyback isolation choice | 2017 Q4、2018 Q4、feedback |
| Inverters | Half/full bridge basics；square-wave vs PWM；SPWM `ma/mf`；bipolar/unipolar；shoot-through/blanking time；3-phase six-step table | 2017 Q5、2018 Q4、homework Q4 |
| Worked examples | 2017 MOSFET loss/thermal、2017 buck-boost、2018 boost/PWM、rectifier/SCR templates | 最接近考试的可复用套路 |
| Mistake checklist | feedback 中所有点名错误 | 可直接减少失分 |

## 压缩处理的内容（Compress）

| 来源/主题 | 压缩方式 | 原因 |
|---|---|---|
| Lecture 1 applications/background | 压缩成 5-6 个关键词：power conversion、control、electric drives、power supplies、energy processing | 直接计算题价值低，只服务简答开头 |
| Lecture 2 electric-circuit basics | 只保留公式表：inductor/capacitor、instantaneous/average power、average/RMS definitions | 多数基础内容不是考试重点本身 |
| Diode semiconductor physics | 只保留 reverse recovery 概念和 `P_RR = Q_RR V_R f_s` | final 更重视 rectifier/PIV/ripple |
| SCR internal two-transistor model | 只保留 latching、holding current、gate cannot turn off | 题目通常问 half-controllable 和 phase control |
| Heatsink CFD/fin design details | 压缩为 surface area/convection/black coating improves radiation 的一句话 | 考试主要算 thermal resistance |
| Inverter harmonic spectra details | 只保留 PWM moves harmonics to high frequency、unipolar effectively doubles switching frequency、`mf` sideband概念 | past paper 主要问输出和优缺点，不深算 harmonic spectrum |
| Flyback detailed derivation | 只保留 derived from buck-boost、turns ratio、electrical isolation | feedback 主要考 converter choice |
| Homework literature survey | 不进入核心笔记，只保留 snubber holistic mitigation keywords | 期末闭卷/限时题更可能考计算和简答 |

## 删除或不进入最终笔记的内容（Drop）

| 内容 | 删除原因 |
|---|---|
| 讲义中的课程组织、lecturer email、please read textbook 页码 | 与考试答题无关 |
| 大量图片页但无公式/题型信息的重复 slides | 只在最终笔记中重画必要图示 |
| 过细的 semiconductor construction / packaging 细节 | past paper 未体现，优先级低 |
| CFD mesh、simulation visualization 细节 | 不符合历年题套路 |
| 非正式背景故事或装饰性说明 | 不利于快速复习 |

## 最终章节大纲（建议）

1. **Exam Strategy and Formula Sheet**
   - 100 marks 题型分布；单位/working/axes 要求；常用公式总表。
2. **Waveform Calculations: Average, RMS, Form Factor**
   - 分段积分模板；sine+DC offset；triangular/pulse examples；feedback mistakes。
3. **Rectifiers and Smoothing Capacitors**
   - Half-wave vs full-wave/bridge；PIV；diode/load voltage sketches；ripple and C sizing；conduction angle effects。
4. **SCR / Thyristor Phase Control**
   - Half-controllable；DC unsuitability；half-wave/full-wave formulas；back-to-back SCR；waveform drawing checklist。
5. **Power Switches, Ratings, and Selection**
   - Ideal vs actual；MOSFET/IGBT/SCR/GTO comparison；wind turbine switch selection answer template。
6. **Power Loss and Thermal Management**
   - MOSFET current waveform template；conduction/switching loss；thermal circuit；heatsink calculations。
7. **Snubber Circuits**
   - Functions; unpolarized/polarized types; ringing frequency; RC snubber design and loss; compromise discussion。
8. **DC-DC Converters in CCM**
   - Buck、Boost、Buck-Boost formula tables；waveform templates；Flyback/isolation；common min/max current mistakes。
9. **DC-AC Inverters and PWM/SPWM**
   - Half/full bridge；square-wave vs PWM；bipolar/unipolar；`ma/mf`；shoot-through/blanking；3-phase six-step basics。
10. **Past Paper Worked Templates**
    - 2017 Q3 MOSFET loss/thermal；2017 Q4 buck-boost；2018 Q2 rectifier/SCR；2018 Q4 boost/PWM。
11. **Final Error Checklist**
    - 从 feedback 提炼的一页红框：period、absolute average、PIV、α、√2、ΔIL/2、total heatsink power、flyback vs buck-boost、control circuit vs power circuit。

## 后续生成最终笔记时的图示清单

- Average/RMS/form factor 的典型波形分段图。
- Half-wave 和 full-wave bridge rectifier circuit + load/diode voltage。
- Capacitor smoothing ripple + diode charging pulse。
- SCR half-wave delay angle waveform + back-to-back SCR circuit。
- Thermal resistance ladder：`T_J → θ_JC → T_C → θ_CS → T_S → θ_SA → T_A`。
- Buck/Boost/Buck-Boost 的 on/off 等效电路和 `i_L/v_L` waveforms。
- Full-bridge inverter bipolar/unipolar PWM comparison；3-phase six-step line voltage table。
