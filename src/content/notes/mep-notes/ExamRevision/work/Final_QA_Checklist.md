---
title: "# Final QA Checklist（最终检查清单）"
description: "Microelectronics Packaging ExamRevision work artifact"
date: 2026-06-11
category: "课程学习"
docGroup: "microelectronics-packaging-notes"
draft: true
---

# Final QA Checklist

## Source Coverage

| 检查项 | 方法 | 结果 |
|---|---|---|
| 主线 slides 覆盖 | 检查 S01-S10 是否全部进入 `Source_Inventory.md` | PASS |
| documents 覆盖 | 检查 `封装/documents/*.docx` 是否全部分类 | PASS |
| final_exam docx 覆盖 | 检查 exam、考前、绝密、notes、超超整理是否分类 | PASS |
| final_exam slides 排除 | Source Inventory 明确 Drop，不纳入主线 | PASS |
| textbook 限制 | 只列为 P3 背景校对 | PASS |

## Content QA

| 检查项 | 期望 | 结果 |
|---|---|---|
| Frontmatter | 所有公开笔记、公开 work draft 和 ExamRevision source draft 有 title/description/date/category/docGroup/draft | PASS：40 个 MEP Markdown 通过 |
| 章节结构 | 正式笔记包含考试重点、概念、题型模板、易错点、来源说明 | PASS：README 与 00-12 均含 `考试要会什么`、`一句话记忆`、`来源` |
| 图片链接 | 所有 `./assets/*.svg` 文件真实存在 | PASS |
| Work 文件镜像 | `notes/mep-notes/ExamRevision/work` 中存在 PE 风格过程文件 | PASS：12 个 work Markdown + 34 个 `_extracted_text` |
| ExamRevision 源稿 | `notes/mep-notes/ExamRevision/src` 中存在合并总稿和 00-12 源章节 | PASS：1 个合并稿 + 13 个源章节，并同步到 `_note-sources` |
| 公式 | CTE、thermal resistance、conduction、convection、radiation 单位说明完整 | PASS |
| 风格 | 中文为主，保留必要英文术语；不整页堆 PPT 截图；内容完整充实但不按行数硬凑 PE/EPMF | PASS |
| 网站入口 | `NOTE_COURSES` 增加 `microelectronics-packaging-notes` | PASS |

## Post-generation Commands

```bash
rg -n "!\[" src/content/notes/mep-notes
npm install
npm run build
```

## Actual Validation on 2026-06-11

| 命令 / 检查 | 结果 | 说明 |
|---|---|---|
| MEP frontmatter script | PASS | 检查 `src/content/notes/mep-notes` 下 40 个 Markdown |
| MEP image link script | PASS | 所有 Markdown 图片链接可解析到真实 SVG |
| Formal note structure script | PASS | README 与 00-12 均有 PE/EPMF 风格入口小节 |
| Work mirror script | PASS | 公开 `ExamRevision/work` 文件齐全 |
| `node node_modules/astro/bin/astro.mjs build` | PASS | Astro 生成 40 个页面，包含 `/notes/microelectronics-packaging/` 与 00-12 路由 |
| Local preview HTTP check | PASS | `http://127.0.0.1:4322/notes/microelectronics-packaging/`、第7章、第10章均返回预期标题和正文小节 |
| `npm run build` | ENV ISSUE | `npm install` 在本机长时间卡住，导致 `node_modules/.bin/astro` 未生成 |
| Pagefind direct runner | ENV ISSUE | `@pagefind/darwin-arm64` 二进制存在，但当前 macOS 环境返回 `Unknown system error -88`；不影响 Markdown 内容与 Astro 路由验证 |
| Browser plugin check | ENV ISSUE | 当前会话没有可用的 `iab` browser 实例；已用本地 HTTP 预览检查替代 |
