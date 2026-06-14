---
title: "# Source Inventory（资料清单）"
description: "Microelectronics Packaging ExamRevision work artifact"
date: 2026-06-11
category: "课程学习"
docGroup: "microelectronics-packaging-notes"
draft: true
---

# Source Inventory（资料清单）

> 范围：主线只使用 `封装/slides/`；`封装/documents/` 与 `封装/final_exam/` 中的 exam/practice/docx 笔记作为考试信号与补充。`封装/final_exam` 里的 slides 不纳入。

## Source Priority

| 等级 | 含义 | 使用方式 |
|---|---|---|
| P0 | 考试高优先级 | past paper / practice / slides 中反复出现，必须进入正式笔记和答题模板 |
| P1 | 重要支撑 | 主线 PPT 明确讲解，或考前资料反复提醒，进入对应章节 |
| P2 | 参考补充 | 学长笔记、翻译稿、背景文档，用来补关键词与检查遗漏 |
| P3 | 背景校对 | 教材/大 PDF，只用于术语校对，不大段展开 |
| Drop | 不纳入 | 重复版本、final_exam 中的 slides、装饰页、课程组织信息 |

## 主线 Slides（纳入）

| Source ID | 文件 | 页数/幻灯片 | 主题 | 进入章节 | 优先级 |
|---|---|---:|---|---|---|
| S01 | `封装/slides/Lecture1_Fundamentals-Packaging.pptx` | 38 | packaging 定义、功能、分类、Moore's Law、技术演进、assembly intro | 01, 00, 10 | P0 |
| S02 | `封装/slides/Lecture2_Fundamental Electrical Package Design.pptx` | 46 | electrical package design、signal/power path、parasitics、DFR/DFT、environment | 02, 10, 11 | P0 |
| S03 | `封装/slides/Lecture3_Packaging-Materials.pptx` | 33 | underfill、molding、solder、TIM、substrate、CTE、wire bonding/TAB/flip-chip | 03, 10, 11 | P0 |
| S04 | `封装/slides/Lecture4_Role-Packaging in Microelectronics.pptx` | 29 | microelectronics、IC package function、SoC/SiP、packaging challenges、roadmap | 04, 10 | P0 |
| S05 | `封装/slides/Lecture5_Role-Packaging in Microsystem.pptx` | 21 | microsystem anatomy、industry applications、MEMS、medical/automotive/telecom packaging | 05, 10 | P1 |
| S06 | `封装/slides/Lecture6_ImpactSi-Processing.pptx` | 36 | Si processing、CMOS/MEMS/MOEMS、low-k ILD、die thinning、interposer/TSV | 06, 10 | P0 |
| S07 | `封装/slides/Lecture7_Thermal-Management.pptx` | 34 | heat generation、thermal hierarchy、conduction/convection/radiation、cooling methods | 07, 10 | P0 |
| S08 | `封装/slides/Lecture8_System-Package.pptx` | 32 | SoC/SiP/SoP、CSP、WLP、wafer-level burn-in/test、SiP thermal challenge | 08, 10 | P0 |
| S09 | `封装/slides/Additional_Lecture9.pptx` | 30 | wire bonding、TAB、flip-chip、BGA、CSP、WLP、2D/3D packaging | 09, 10 | P0 |
| S10 | `封装/slides/electronic-packaging-technology.pdf` | PDF | electronic packaging technology background | 09, 12 | P2 |

## 考试与练习资料（纳入为考试信号）

| Source ID | 文件 | 类型 | 主题 | 使用方式 | 优先级 |
|---|---|---|---|---|---|
| M01 | `封装/documents/Example_PracticeQuestions_MEP2026(1).docx` | practice with expected answers | technology waves、future trends、multidisciplinary packaging、IC assembly、wire bonding/TAB/flip-chip、CTE、MEMS、WLP | 决定问答题模板和高频考点 | P0 |
| M02 | `封装/documents/PracticeQuestions_ME2025.docx` | practice / MCQ | chapter-wise MCQ 与简答 | 校对选择题型与概念边界 | P0 |
| M03 | `封装/documents/questions_answers.docx` | Q&A summary | PPT1-8 的问答整理 | 补充答题措辞 | P1 |
| M04 | `封装/final_exam/Exam paper2022(1).docx` | past exam | microsystem waves、thermal、package design、materials、system package | 最高价值题型来源 | P0 |
| M05 | `封装/final_exam/考前一小时.docx` | last-hour notes | DFT/DFR、frequency challenge、CTE thermal stress、wire bonding、materials、TAB/TSV/interposer | 高频提醒与易错点 | P1 |
| M06 | `封装/final_exam/绝密级.docx` | exam signal / senior summary | L1/L2/L3/L5/L6/L7 重点提醒 | 只作考试信号，不作为官方定义来源 | P1 |
| M07 | `封装/final_exam/一级文件-1.docx` | senior summary | L1-L7 汇总 | 交叉校对 | P2 |
| M08 | `封装/final_exam/超超整理/*.docx` | senior notes / translations | L1、L2、L3、L5、L6、L7 问答和翻译 | 辅助发现遗漏，不直接照搬 | P2 |
| M09 | `封装/final_exam/notes/lecture5.docx`, `lecture7.docx` | senior notes | interposer、SiP/SoC、system package | 辅助补充 | P2 |
| M10 | `封装/final_exam/What are Microsystem_Microelectronics.docx` | background | microsystem 与 microelectronics 概念 | 背景校对 | P2 |
| M11 | `封装/final_exam/Fundamentals of Microsystems Packaging (Rao R.... (Z-Library).pdf` | textbook | full textbook | 只作低优先级术语校对，不大段搬运 | P3 |

## 明确排除

- `封装/final_exam` 中的 PPTX slides：用户已说明不用管，不进入 Source Inventory 的主线来源。
- `__MACOSX`、`.DS_Store`、zip 包：不进入笔记。
- 课程书单、联系方式、装饰性封面页：只在需要解释资料来源时保留，不进入正式复习内容。
