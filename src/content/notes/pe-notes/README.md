---
title: "电力电子课程笔记"
description: "电力电子课程复习笔记总目录，按章节整理整流、功率开关、热设计、DC-DC、逆变与 PWM 等内容。"
date: 2026-05-17
tags: [power-electronics, 电力电子]
category: "课程学习"
docGroup: "power-electronic-notes"
order: -1
draft: false
---
这套笔记按电力电子期末复习的知识链路整理：先处理波形平均值和 RMS，再进入整流、SCR、功率开关、热设计、DC-DC 和逆变/PWM。它不是完整教材，更像一份面向做题和复盘的课程笔记。

## 最后 3 小时怎么用

1. 翻 **第 0 章** 看考试总览和高频题型
2. 按薄弱模块回对应章节查公式和做题步骤
3. 用 **第 9 章** 的 worked examples 对照自己的做题过程
4. 考前最后 10 分钟翻 **第 10 章** 的红线清单

## 章节目录

- [第0章 考试总览与高分策略](/notes/power-electronics/00-exam-strategy/) — 高频题型、通用做题顺序和必背公式。
- [第1章 波形基础](/notes/power-electronics/01-waveform-basics/) — average、RMS、form factor、duty cycle 与分段积分。
- [第2章 Diodes 与 Rectifiers](/notes/power-electronics/02-diodes-rectifiers/) — half-wave、full-wave、bridge、PIV、smoothing 与 ripple。
- [第3章 SCR / Thyristor Phase Control](/notes/power-electronics/03-scr-phase-control/) — firing angle、导通区间、average/RMS 和功率计算。
- [第4章 Power Switches and Losses](/notes/power-electronics/04-power-switches-losses/) — MOSFET/IGBT 选择、conduction loss 与 switching loss。
- [第5章 Thermal Management and Heatsink](/notes/power-electronics/05-thermal-heatsink/) — thermal resistance chain、junction temperature 和 heatsink 选择。
- [第6章 Snubber Circuits and Flyback Converter](/notes/power-electronics/06-snubber-flyback/) — snubber 的抑制目标、flyback 的工作阶段与常见计算。
- [第7章 DC-DC Converters](/notes/power-electronics/07-dc-dc-converters/) — Buck、Boost、Buck-Boost、Flyback 的 CCM 关系和纹波计算。
- [第8章 DC-AC Inverters and PWM](/notes/power-electronics/08-dc-ac-inverters-pwm/) — half/full bridge、三相逆变、PWM/SPWM 与调制指标。
- [第9章 Past Paper Worked Examples](/notes/power-electronics/09-past-paper-worked-examples/) — 历年题中反复出现的计算模板。
- [第10章 Common Mistakes Checklist](/notes/power-electronics/10-common-mistakes-checklist/) — 考前需要主动规避的公式、单位、符号和作答错误。

## 来源说明

- 所有内容基于 13 份 Lecture PDF slides、2 份 Past Final Exam（2017/2018）、homework、tutorial 和 exam feedback
- 标注级别：
  - `Slides-backed`：Lecture slides 有明确支撑
  - `Past paper-backed`：历年题中直接出现
  - `Exam-only signal`：feedback 或 Reviewer 报告中提到但 slides 无直接支撑
