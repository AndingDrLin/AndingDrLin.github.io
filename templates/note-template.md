<!--
  独立笔记模板 — 用于不属于任何课程/教程的笔记
  存放位置: src/content/notes/ 直接下或任意非注册子目录

  使用方式:
    cp templates/note-template.md src/content/notes/my-note.md
    然后填写 frontmatter 并开始写作

  注意: 独立笔记不需要 docGroup 和 order 字段
        docGroup 会自动使用默认值 'general'
        独立笔记由 notes/[...slug].astro 路由处理

  可用 category: AI Tools | 3D Vision | Agents | Research Notes | Essays | Tutorials | 课程学习
  完整 frontmatter 规范见 CONTRIBUTING.md
-->
---
title: "在此输入笔记标题"
description: "简短描述，用于列表卡片和 SEO。"
date: YYYY-MM-DD
# updated: YYYY-MM-DD  # 可选：最后更新日期
tags: []
category: "在此选择分类"
# AI Tools | 3D Vision | Agents | Research Notes | Essays | Tutorials | 课程学习
draft: true  # 改为 false 发布
# cover: /path/to/image.png  # 可选
# source: https://example.com  # 可选
---

在此开始写作...
