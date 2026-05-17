# Source Inventory（资料清单）

> 范围：`materials/` 7 个文件 + `slides/` Lecture 1-13。用途是为期末复习笔记筛选来源；不代表所有内容都等权进入最终笔记。

| Source ID | 文件 | 类型 | 主题 | 考试相关性 | 优先级 |
|---|---|---|---|---|---|
| M01 | `materials/homework.pdf` | Homework / mock-style problem set | 100 marks 综合练习：RMS/form factor、双 SCR 交流调功、MOSFET 优缺点、thermal/heatsink、全波整流与 smoothing、RC snubber、三相 inverter | 与考试题型高度重合，尤其是反馈中提到的易错题 | P1 |
| M02 | `materials/final_2017.pdf` | Past paper | 100 marks：Q1 switches/snubber/inductor waveform；Q2 half-wave rectifier + SCR；Q3 MOSFET current/loss/thermal；Q4 buck-boost；Q5 PWM inverter | 最高价值，直接给出题型、分值、公式表 | P0 |
| M03 | `materials/Review of week 5 and week 6 lectures for final exam.pdf` | Revision handout | RMS with DC offset、form factor、SCR、power switches、diode/rectifier、thermal review | 明确写着 final exam review，补充 Week 5/6 重点与易错公式 | P1 |
| M04 | `materials/feedback on final exam.docx` | Exam feedback | 各题得分、常见错误：average=0、form factor 要取 absolute、SCR 延迟角、PIV、buck converter、flyback vs buck-boost、inverter control circuit | 最高价值，告诉哪些地方最容易丢分 | P0 |
| M05 | `materials/Tutorial_2.pdf` | Tutorial | Buck、Boost、Buck-Boost 计算：duty cycle、average/min/max inductor current、output ripple | DC-DC 计算训练，支撑 2017 Q4 / 2018 Q4 | P1 |
| M06 | `materials/Tutorial_1.pdf` | Tutorial | Average/RMS/form factor、inductor current/energy、saw-tooth RMS | 基础波形计算训练，支撑 Q1/Q3 类题 | P2 |
| M07 | `materials/final_2018.pdf` | Past paper | 100 marks：Q1 ideal vs actual switches、wind turbine switch selection、snubber、RMS/form factor；Q2 full-wave rectifier + half-wave SCR；Q3 thermal + MOSFET loss；Q4 boost + PWM | 最高价值，直接给出题型、分值、公式表 | P0 |
| L01 | `slides/Lecture 1 Introduction.pdf` | Lecture slides | Power electronics scope、applications、power conversion and control overview | 背景性内容，可能用于 advantages/applications 简答 | P3 |
| L02 | `slides/Lecture 2 Revision of Electric Circuit.pdf` | Lecture slides | Circuit basics、average/RMS、instantaneous/average power、inductor/capacitor relations | 公式基础，支撑所有计算题 | P2 |
| L03 | `slides/Lecture 3 Power Switches Overview.pdf` | Lecture slides | Ideal vs actual power switches、constraints、losses、device ratings | 2018 Q1(a)、switch selection 和 loss 题基础 | P1 |
| L04 | `slides/Lecture 4 Uncontrolled Switch -Diodes.pdf` | Lecture slides | Diodes、reverse recovery、half/full-wave rectifier、PIV、smoothing capacitor、ripple、form factor | 2017/2018 Q2 高频来源 | P0 |
| L05 | `slides/Lecture 5 Controllable Switches .pdf` | Lecture slides | SCR/thyristor half-controllable behavior、phase-angle control、half/full-wave SCR RMS/average formula、GTO/TRIAC/MOSFET/IGBT | 2017/2018 SCR 题与 power switch selection 来源 | P0 |
| L06 | `slides/Lecture 6 Heatsinks.pdf` | Lecture slides | Thermal management、thermal resistance model、heatsink design、junction/case/sink/ambient temperatures | 2017 Q3(g)、2018 Q3、homework thermal 题来源 | P0 |
| L07 | `slides/Lecture 7 DC-DC Converters_BckGnd_BuckCov.pdf` | Lecture slides | SMPS concepts、Buck converter、CCM waveforms、duty relation、inductor current ripple、output ripple | Buck 题基础；feedback 指出 buck 推导和 IL min/max 易错 | P1 |
| L08 | `slides/Lecture 8 DC-DC Converters_Boost_BuckBoostConv.pdf` | Lecture slides | Boost、Buck-Boost converter、CCM waveforms、input/output relation、inductor current、ripple、converter choice | 2017 Q4 buck-boost、2018 Q4 boost 核心来源 | P0 |
| L09 | `slides/Lecture 9 Flyback and Snubber Circuits.pdf` | Lecture slides | Flyback converter、isolation、snubber function/classes、ringing、RC snubber design and loss | Snubber 简答/设计、flyback vs buck-boost 易错点来源 | P1 |
| L10 | `slides/Lecture 10 - DC-AC-Inverters_Half_Bridge.pdf` | Lecture slides | DC-AC inverter fundamentals、half-bridge、square-wave/PWM、harmonics、shoot-through | Inverter 入门，支撑 PWM 概念题 | P2 |
| L11 | `slides/Lecture 11 DC-AC-Inverters_Full_Bridge.pdf` | Lecture slides | Full-bridge inverter、square-wave、bipolar/unipolar PWM、SPWM modulation ratios、harmonics、blanking time | 2017 Q5、2018 Q4(g-i) 核心来源 | P0 |
| L12 | `slides/Lecture 12 DC-AC-Inverters_3Phase_PE_Applciations.pdf` | Lecture slides | Three-phase 3-leg inverter、six-step square-wave table、line voltages、3-phase PWM、mf choice | Homework 三相 inverter 与可能扩展题来源 | P1 |
| L13 | `slides/Lecture 13  - Revisions.pdf` | Lecture slides | Past exam worked solutions：MOSFET average/RMS/loss/thermal、buck-boost、boost、PWM | 直接给 worked solutions，计算题最高价值 | P0 |

## 优先级说明

- P0：必须进入最终复习；past papers、revision solutions 或连续出现的考试题源。
- P1：高频支撑材料；用于补公式、图示和标准表述。
- P2：基础训练或局部支撑；最终笔记压缩成公式/方法。
- P3：背景理解；只保留能服务简答题的关键词。
