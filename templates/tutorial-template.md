<!--
  教程笔记模板 — 用于 src/content/notes/<docGroup>/ 下的教程章节
  存放位置: src/content/notes/<docGroup>/<chapter>.md

  使用方式:
    cp templates/tutorial-template.md src/content/notes/<docGroup>/chapter1.md
    然后填写 frontmatter 并开始写作

  要求:
    - docGroup 必须在 src/consts.ts 的 NOTE_TUTORIALS 中注册
    - 每个教程目录必须有 README.md (order: -1)
    - category 通常为 "Tutorials"

  注册的教程 docGroup 值:
    - agent-tutorial  → AI Agent 从零到精通

  完整 frontmatter 规范见 CONTRIBUTING.md
-->
---
title: "在此输入章节标题"
description: "简短描述，用于列表卡片和 SEO。"
date: YYYY-MM-DD
# updated: YYYY-MM-DD  # 可选：最后更新日期
tags: []
category: "Tutorials"
docGroup: "在此输入教程组标识"  # 必须与 src/consts.ts 中的 key 一致
# 当前可选: agent-tutorial
order: 1  # 数字越小越靠前；README.md 必须为 -1
draft: true  # 改为 false 发布
# cover: /path/to/image.png  # 可选
# source: https://example.com  # 可选
---

在此开始写作...
