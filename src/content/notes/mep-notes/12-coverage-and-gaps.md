---
title: "第12章 Coverage and Gaps"
description: "微电子封装笔记来源覆盖、章节映射和资料边界说明。"
date: 2026-06-11
tags: [microelectronics-packaging, coverage]
category: "课程学习"
docGroup: "microelectronics-packaging-notes"
order: 12
draft: false
---
## 考试要会什么

- 知道每个正式章节分别来自哪份 Lecture、practice、past exam 或考前资料。
- 知道哪些内容是 slides-backed，哪些只是 exam-signal，避免把学长资料当官方定义。
- 知道哪些资料被明确排除，尤其是 `final_exam` 中的 slides。

## 一句话记忆

> 这页不是知识点正文，而是整套笔记的“来源账本”：以后补资料、查缺口、追溯某个结论都从这里开始。

## 来源等级说明

| 等级 | 含义 |
|---|---|
| `Slides-backed` | 主线 `封装/slides` 有明确支撑 |
| `Slides + Exam-backed` | slides 有基础，practice/exam 确认考法 |
| `Exam-signal` | 考前/学长资料提示高频，但正式定义仍需回到 slides |
| `Background-only` | 教材或背景资料，仅作术语校对 |

## Lecture → 笔记对照表

| Source | 支撑主题 | 对应笔记 | 等级 |
|---|---|---|---|
| Lecture1 Fundamentals-Packaging | packaging functions, classification, waves, Moore's Law | 01, 00, 10 | Slides + Exam-backed |
| Lecture2 Fundamental Electrical Package Design | electrical path, parasitics, DFR/DFT, environment | 02, 10, 11 | Slides + Exam-backed |
| Lecture3 Packaging-Materials | materials, CTE, assembly methods, solder/TIM/substrate | 03, 09, 10 | Slides + Exam-backed |
| Lecture4 Role-Packaging in Microelectronics | IC packaging role, SoC/SiP, challenges | 04, 08, 10 | Slides + Exam-backed |
| Lecture5 Role-Packaging in Microsystem | microsystems, MEMS, industry requirements | 05, 10 | Slides-backed |
| Lecture6 ImpactSi-Processing | low-k ILD, die thinning, TSV, interposer, MEMS/MOEMS | 06, 10 | Slides + Exam-backed |
| Lecture7 Thermal-Management | conduction, convection, radiation, cooling | 07, 10, 11 | Slides + Exam-backed |
| Lecture8 System-Package | SoC/SiP/SoP, CSP/WLP, wafer-level test | 08, 10 | Slides + Exam-backed |
| Additional Lecture9 | wire bonding, TAB, flip-chip, BGA/CSP/WLP, 3D | 09, 10 | Slides + Exam-backed |
| electronic-packaging-technology.pdf | packaging technology background | 09, 12 | Background-only |

## Exam / Practice → 笔记对照表

| Source | 用途 | 对应笔记 | 等级 |
|---|---|---|---|
| Example_PracticeQuestions_MEP2026 | expected-answer structure and high-frequency topics | 00-11 | Exam-backed |
| PracticeQuestions_ME2025 | MCQ/short-answer concept boundary | 00-11 | Exam-backed |
| questions_answers | cross-check answer phrasing | 10, 11 | Exam-signal |
| Exam paper2022 | past exam topic confirmation, thermal calculation | 00, 07, 10 | Exam-backed |
| 考前一小时 / 绝密级 | last-hour重点和易错提醒 | 00, 10, 11 | Exam-signal |
| 超超整理 / notes | senior notes, translation, missing-topic check | 04-09, 10 | Exam-signal |
| textbook PDF | terminology check | 12 | Background-only |

## 明确边界

- `final_exam` 中的 slides 不纳入本套笔记，因为用户已经说明不用管。
- 学长笔记可作为高频信号，但不作为最高优先级定义来源。
- 正式笔记没有逐页翻译 PPT，也没有整页截图。
- 图片采用重画 SVG，服务考试图示和比较题。

## 仍可后续加强的地方

1. 如果老师发新的 final feedback，应更新 `Exam_Point_Map.md`。
2. 如果需要更贴近原 PPT 图，可从 PPTX media 中挑选非整页图片补进 `assets/`。
3. 如果考试明确给 formula sheet，应把 thermal calculation 章节再压缩成公式速查版。
