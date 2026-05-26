# Latent Note 课程笔记发布 Checklist

这份 checklist 用于 Latent Note 项目的课程笔记发布流程，适用于后续所有新课程，不只是某一次发布。

## Pre-flight

- [ ] 确认源课件（PPT/PDF）可访问
- [ ] 确定课程 `docGroup`（与 `src/content/notes/<docGroup>/` 目录名一致）
- [ ] 确定课程 URL `slug`
- [ ] 确定中文课程标题与课程简介
- [ ] 确定章节顺序与章节标题

## Step 1：目录清理

- [ ] 删除 `src/content/notes/<docGroup>/` 中的非笔记文件（agent prompt、review report、临时文件、空 assets 目录）
- [ ] 只保留真正要发布到网站的 Markdown 文件
- [ ] 如果目录里混入了错误课程内容，先处理清楚再继续

## Step 2：内容生成或改写

- [ ] 使用 `scripts/notes-pipeline/REVIEW_AGENT_PROMPT_TEMPLATE.md` 作为通用 agent prompt
- [ ] 按统一结构改写或生成章节：
  - 学习目标
  - 先用人话理解本章在讲什么
  - 核心概念
  - 核心公式与推导
  - 配套例题 / 易错提醒 / 自测题
  - 学习路线与后续章节关系
- [ ] 每个章节文件都有完整 YAML frontmatter
- [ ] README.md 的 `order` 为 `-1`

## Step 3：Frontmatter 校验

- [ ] 运行：
  ```bash
  node scripts/notes-pipeline/validate-frontmatter.mjs src/content/notes/<docGroup>/
  ```
- [ ] 修复脚本报出的所有错误
- [ ] 最终校验结果为 0 错误

## Step 4：注册课程

- [ ] 在 `src/consts.ts` 的 `NOTE_COURSES` 中新增课程条目
- [ ] 保证 `docGroup` 与笔记文件里的 `docGroup` 一致
- [ ] 保证 `slug` 就是站点 URL 中的 `/notes/<slug>/`

## Step 5：构建验证

- [ ] 运行 `npm run build`
- [ ] 确认无 Astro / content collection 报错
- [ ] 运行 `npm run preview`
- [ ] 检查 `/notes/` 首页是否出现课程卡片
- [ ] 检查 `/notes/<slug>/` 是否列出章节
- [ ] 检查 2–3 个章节页能否正常打开
- [ ] 检查 LaTeX、元信息、阅读时间是否正常

## Step 6：三轮 Review

### Round 1：源覆盖
- [ ] 对照源课件检查章节是否覆盖关键定义、公式、例题
- [ ] 修正明显遗漏与章节顺序错误

### Round 2：正确性
- [ ] 检查公式、符号、LaTeX、推导步骤
- [ ] 检查章节之间的衔接是否准确

### Round 3：弱基础可读性
- [ ] 检查是否默认读者已经知道某些前置概念
- [ ] 补充推导中间步骤与易错提醒
- [ ] 确保例题答案有完整过程

## Frontmatter Schema

```yaml
---
title: "第N章 中文标题"
description: "一句话描述，用于列表卡片与 SEO。"
date: YYYY-MM-DD
tags: [course-slug, 中文标签]
category: "课程学习"
docGroup: "<docGroup>"
order: N
draft: false
---
```

README.md：

```yaml
---
title: "课程名自学笔记"
description: "课程笔记总目录。"
date: YYYY-MM-DD
tags: [course-slug, 中文标签]
category: "课程学习"
docGroup: "<docGroup>"
order: -1
draft: false
---
```

## 交付标准

发布完成时应满足：

- `src/content/notes/<docGroup>/` 中只保留 `README.md` 和章节 `.md` 文件
- 源课件如果已完成对照，可直接删除
- `node scripts/notes-pipeline/validate-frontmatter.mjs` 无报错
- `npm run build` 成功
- `/notes/<slug>/` 课程页和章节页均可正常访问
