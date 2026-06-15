<!--
  课程笔记模板 — 用于 src/content/notes/<docGroup>/ 下的课程章节笔记
  存放位置: src/content/notes/<docGroup>/<chapter>.md

  使用方式:
    cp templates/docs-template.md src/content/notes/<docGroup>/chapter1.md
    然后填写 frontmatter 并开始写作

  要求:
    - docGroup 必须在 src/consts.ts 的 NOTE_COURSES 中注册
    - 每个课程目录必须有 README.md (order: -1)
    - category 固定为 "课程学习"

  注册的 docGroup 值:
    - dc-notes                      → 动力学与控制
    - dsp-notes                     → 数字信号处理
    - emf-notes                     → 电磁场与波
    - power-electronic-notes        → 电力电子
    - microelectronics-packaging-notes → 微电子封装
    - epmf-final-exam-revision-notes   → 工程项目管理与财务

  完整 frontmatter 规范见 CONTRIBUTING.md
-->
---
title: "在此输入文档标题"
description: "简短描述，用于列表卡片和 SEO。"
date: YYYY-MM-DD
# updated: YYYY-MM-DD  # 可选：最后更新日期
tags: []
category: "课程学习"
docGroup: "在此输入课程组标识"  # 必须与 src/consts.ts 中的 key 一致
# 可选值: dc-notes | dsp-notes | emf-notes | power-electronic-notes
#         microelectronics-packaging-notes | epmf-final-exam-revision-notes
order: 1  # 数字越小越靠前；README.md 必须为 -1
draft: true  # 改为 false 发布
# cover: /path/to/image.png  # 可选
# source: https://example.com  # 可选
---

## 学习目标

## 先用人话理解本章在讲什么

## 核心概念

## 核心公式与推导

## 配套例题

## 重点难点总结

## 自测题与答案

## 学习路线

## 和后续章节的关系
