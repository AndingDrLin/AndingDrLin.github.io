---
title: "# Review Log（审查记录）"
description: "Microelectronics Packaging ExamRevision work artifact"
date: 2026-06-11
category: "课程学习"
docGroup: "microelectronics-packaging-notes"
draft: true
---

# Review Log

| Round | Stage | Focus | Finding | Action | Remaining risk |
|---|---|---|---|---|---|
| 1 | Source extraction | Coverage | `封装/slides` 9 个主线文件和 documents/final_exam docx 已抽取文本 | 建立 `_extracted_text`，排除 final_exam slides | PPT 内嵌图片未逐张人工核对 |
| 2 | Source planning | Priority | 主线 slides + practice/exam 为 P0/P1；学长笔记为 P2；教材为 P3 | 写入 Source Inventory 和 Knowledge Filter | 学长笔记可能含非官方表述，正式笔记避免照搬 |
| 3 | Draft assembly | Structure | 按考试题型重组为 00-12 章，保留 Lecture 1-9 对应关系 | 生成网站 Markdown 和 SVG 图示 | 后续可继续补真实 PPT extracted images |
| 4 | QA | Link/schema/build | 待执行 Markdown 图片链接、frontmatter、Astro build 检查 | 记录在 Final_QA_Checklist | 若依赖未安装，需先 npm install |
