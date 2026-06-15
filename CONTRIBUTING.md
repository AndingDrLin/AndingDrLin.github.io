# Contributing to Latent Note

本项目是一个 Astro 静态站点，所有内容以 Markdown 文件的形式存放在 `src/content/` 下。欢迎通过 PR 添加内容或修复问题。

## 快速开始

```bash
npm install          # 安装依赖
npm run dev          # 本地开发服务器
npm run validate     # 校验所有内容的 frontmatter
npm run build        # 生产构建（含 Pagefind 搜索索引）
npm run check        # Astro 类型检查
npm run test         # 运行测试
```

## 内容类型

| 类型 | 存放位置 | 模板 |
|---|---|---|
| 博客文章 | `src/content/blog/` | `templates/blog-template.md` |
| 独立笔记 | `src/content/notes/` | `templates/note-template.md` |
| 课程章节 | `src/content/notes/<docGroup>/` | `templates/docs-template.md` |
| 教程章节 | `src/content/notes/<docGroup>/` | `templates/tutorial-template.md` |

## Frontmatter 规范

### 所有内容共有的字段

| 字段 | 类型 | 必填 | 说明 |
|---|---|---|---|
| `title` | string | ✅ | 文章/笔记标题 |
| `description` | string | ✅ | 一句话描述，用于卡片和 SEO |
| `date` | YYYY-MM-DD | ✅ | 发布日期 |
| `updated` | YYYY-MM-DD | 可选 | 最后更新日期 |
| `tags` | string[] | ✅ | 标签列表，可为空 `[]` |
| `category` | enum | ✅ | 见下方分类列表 |
| `draft` | boolean | ✅ | `true` = 不发布，`false` = 发布 |
| `cover` | string | 可选 | 封面图路径 |
| `source` | URL string | 可选 | 来源链接，必须是 `http(s)://` 开头 |

### 课程/教程额外字段

| 字段 | 类型 | 必填 | 说明 |
|---|---|---|---|
| `docGroup` | string | ✅ | 课程/教程组标识，必须在 `src/consts.ts` 中注册 |
| `order` | number | ✅* | 章节顺序，数字越小越靠前。README.md 必须为 `-1` |

\* 独立笔记（`docGroup` 默认为 `'general'`）不需要 `order`。

### 允许的 category 值

```
AI Tools | 3D Vision | Agents | Research Notes | Essays | Tutorials | 课程学习
```

### 已注册的 docGroup

**课程** (`NOTE_COURSES`):

| docGroup key | URL slug | 课程名 |
|---|---|---|
| `dc-notes` | `dynamics-and-control` | 动力学与控制 |
| `dsp-notes` | `digital-signal-processing` | 数字信号处理 |
| `emf-notes` | `electromagnetics-and-fields` | 电磁场与波 |
| `power-electronic-notes` | `power-electronics` | 电力电子 |
| `microelectronics-packaging-notes` | `microelectronics-packaging` | 微电子封装 |
| `epmf-final-exam-revision-notes` | `engineering-project-management-and-finance` | 工程项目管理与财务 |

**教程** (`NOTE_TUTORIALS`):

| docGroup key | URL slug | 教程名 |
|---|---|---|
| `agent-tutorial` | `ai-agent` | AI Agent 从零到精通 |

> ⚠️ `docGroup` key 和 URL slug 是两个不同的东西。`'dsp-notes'` 是 key，`'digital-signal-processing'` 是 slug。搞混了链接就全断了。

## 添加博客文章

1. 复制模板：
   ```bash
   cp templates/blog-template.md src/content/blog/my-post.md
   ```
2. 填写 frontmatter，将 `draft` 设为 `false`
3. 写作
4. 本地验证：`npm run validate && npm run build`
5. 提交 PR

## 添加独立笔记

1. 复制模板：
   ```bash
   cp templates/note-template.md src/content/notes/my-note.md
   ```
2. 填写 frontmatter，`docGroup` 和 `order` 不需要手动设置
3. 验证、提交 PR

## 添加新课程

完整流程见 `scripts/notes-pipeline/PUBLISH_CHECKLIST.md`。核心步骤：

1. **确定课程信息**：docGroup key、URL slug、课程名、简介
2. **创建目录**：`src/content/notes/<docGroup>/`
3. **添加 README.md**：
   ```bash
   cp templates/docs-template.md src/content/notes/<docGroup>/README.md
   ```
   设置 `order: -1`，`description` 写课程总目录说明
4. **添加章节文件**：每个章节一个 `.md`，`order` 从 1 开始递增
5. **注册课程**：在 `src/consts.ts` 的 `NOTE_COURSES` 中新增条目
6. **一键校验**：
   ```bash
   npm run publish:course <docGroup>   # 自动运行 validate → typecheck → build → link check
   npm run preview                      # 本地预览检查
   ```
7. 提交 PR

## CI 检查

所有 PR 会自动运行以下检查：

| 检查项 | 说明 |
|---|---|
| **Content validation** | `npm run validate` — 检查所有 frontmatter 字段是否符合 schema，包含 order 重复检测 |
| **Type check** | `npx astro check` — TypeScript 和 Astro 组件类型检查 |
| **Build check** | `npm run build` — 确保站点能成功构建（仅 PR） |

此外，每周自动运行 [lychee](https://github.com/lycheeverse/lychee) 断链检查。

三项全部通过才能合并。

## 写作规范

内容语言为中文。以下是核心原则：

1. **从具体问题出发**，不要宏大叙事开头
2. **每篇文章要有明确判断**，不要只堆材料
3. **承认边界**，不要假装完全理解
4. **用实验思维写作**：观察到什么、条件是什么、可能原因、下一步验证
5. **写「局限」，不写「意义」**

完整写作规范见 `CLAUDE.md` 的「写作规范」一节。

## 本地验证 Checklist

提交 PR 前确认：

- [ ] `npm run validate` 通过（frontmatter 无误）
- [ ] `npm run build` 通过（站点可构建）
- [ ] `npm run test` 通过（测试无失败）
- [ ] 新文件没有混入临时文件、调试内容
- [ ] 课程笔记目录下有 README.md（`order: -1`）
- [ ] 无 AI 八股文开头（"随着...的快速发展..."）

## 模板一览

| 文件 | 用途 |
|---|---|
| `templates/blog-template.md` | 博客文章 |
| `templates/note-template.md` | 独立笔记 |
| `templates/docs-template.md` | 课程章节笔记 |
| `templates/tutorial-template.md` | 教程章节 |
| `templates/course-config-template.md` | 新课程配置参考 |
| `scripts/notes-pipeline/PUBLISH_CHECKLIST.md` | 课程发布完整 Checklist |
| `.claude/commands/review-notes.md` | Claude Code slash command：课程笔记生成与审查 |

## 项目架构简述

- Astro v6 静态站点，部署到 GitHub Pages
- 两个内容集合：`blog` 和 `notes`，schema 定义在 `src/content.config.ts`
- `docGroup` 是内容和路由之间的关键桥梁
- 纯 CSS 样式，无框架；暗色模式用 `data-theme` 属性
- JSON-LD 结构化数据，Open Graph + Twitter Cards
- 无障碍支持：skip-to-content、语义化 HTML、ARIA 标签
- 唯一的 React 用途是 Quiz 系统（`/notes/quiz/`）

详细架构见 `CLAUDE.md`。
