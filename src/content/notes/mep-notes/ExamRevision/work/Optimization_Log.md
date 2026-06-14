---
title: "# Optimization Log（分析与优化记录）"
description: "Microelectronics Packaging ExamRevision work artifact"
date: 2026-06-11
category: "课程学习"
docGroup: "microelectronics-packaging-notes"
draft: true
---

# Optimization Log（分析与优化记录）

## Round 0：资料定位

目标不是把 PPT 逐页翻译，而是复刻 PE/EPMF 的制作方式：先做资料清单，再根据考试资料决定取舍，最后生成正式网站笔记。

### 发现

- 主线课件在 `封装/slides/`，包括 Lecture 1-8、Additional Lecture 9 和 `electronic-packaging-technology.pdf`。
- `封装/documents/` 中有 practice questions 和 question/answer，属于考试高优先级资料。
- `封装/final_exam/` 中的 slides 用户明确排除；其中 exam paper、考前一小时、绝密级、超超整理、notes 作为考试信号和学长参考。

### 决策

- 使用 `封装/slides` 作为正式定义和章节主线。
- 使用 practice/exam 决定高频题型和答题模板。
- 使用学长笔记发现遗漏，但不直接作为最高优先级定义来源。

## Round 1：Source Inventory

### 方法

仿照 PE `Source_Inventory.md`，把资料分为 P0/P1/P2/P3/Drop。

### 优化点

- `final_exam` slides 不进入主线，避免重复和混乱。
- textbook PDF 只作为 terminology check，避免笔记变成教材摘录。
- `超超整理` 和 `考前一小时` 被标为 exam signal，而不是 official slide source。

## Round 2：Exam Point Map

### 方法

仿照 PE `Exam_Point_Map.md`，把课程内容压成可考试的 Topic ID：Packaging functions、technology waves、electrical design、DFR/DFT、materials、CTE、wire bonding/TAB/flip-chip、SoC/SiP、MEMS、Si processing、thermal、WLP/CSP/3D。

### 优化点

- 每个 topic 都写：来源、考试怎么问、必会结论、需要图示、常见错误。
- 重点从“PPT 讲了什么”转为“考试会怎么问”。

## Round 3：Knowledge Filter

### 方法

仿照 PE `Knowledge_Filter.md`，把内容分成 Keep / Compress / Drop。

### 优化点

- Keep：能形成定义、机制、比较、公式、图示和答题模板的内容。
- Compress：行业案例、教材背景、学长翻译稿。
- Drop：装饰页、课程组织、final_exam slides、无考试价值的重复材料。

## Round 4：首版 Draft

### 发现

首版网站笔记已经具备 frontmatter、章节结构、SVG 图示和课程入口，但内容密度只有 70-100 行/章，明显低于 PE/EPMF 成品。

### 问题

- 缺少 PE/EPMF 风格的“零基础先览”。
- 缺少完整答题段落和错项陷阱。
- 缺少“为什么这样筛选”的过程说明。
- 文件级 QA 还不够细。

## Round 5：内容补强

### 动作

- 每篇核心笔记新增本章概览、零基础解释、标准答案段落、Self-check、Reference。
- 强化技术比较：SoC/SiP、CSP/WLP/flip-chip、wire bonding/TAB/flip-chip。
- 增加 thermal worked mini example。
- 增加 answer template 和 common mistake 红线。

### 结果

笔记从“站点可用骨架”升级为“考试复习型笔记”，更接近 PE/EPMF 的高密度风格。

## Round 6：Review workflow

### 后续执行

- Student reviewer：检查基础弱学生是否能读懂。
- TA reviewer：检查准确性、来源边界和考试覆盖。
- File-by-file audit：逐篇检查内容、格式、来源、图示、残余风险。
