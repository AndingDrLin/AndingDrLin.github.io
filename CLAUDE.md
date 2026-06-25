# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

本文件为 Claude Code (claude.ai/code) 提供项目指引。

**交流语言：请始终使用中文与用户交流。**

## 开发命令

```bash
npm install          # 安装依赖
npm run dev          # 本地开发服务器
npm run build        # 生产构建 + Pagefind 搜索索引
npm run preview      # 预览生产构建
npm run validate     # 校验所有内容的 frontmatter
npm run validate:blog   # 只校验博客
npm run validate:notes  # 只校验笔记
npm run check        # Astro 类型检查 (astro check)
npm run test         # 运行 Vitest 测试
npm run test -- src/utils/__tests__/noteTree.test.ts  # 运行单个测试文件
npm run test:watch   # Vitest 监听模式
npm run publish:course <docGroup>  # 课程发布前的完整校验流程
```

Node 版本要求为 `>=22.12.0`。TypeScript strict mode 通过 `tsconfig.json` 启用。

### CI 工作流

| 文件 | 触发条件 | 作用 |
|---|---|---|
| `.github/workflows/deploy.yml` | push to `main`（内容/配置相关路径）/ 手动 | 构建 + 部署到 GitHub Pages |
| `.github/workflows/check.yml` | PR + push to `main` | validation → type check → build check (PR only) |
| `.github/workflows/links.yml` | 每周一 / 手动 | 构建后用 lychee 检查断链 |
| `.github/dependabot.yml` | 自动 | npm + GitHub Actions 依赖更新 |

## 项目架构

Astro v6 静态站点，部署到 GitHub Pages 用户站点。生产 URL：`https://andingdrlin.github.io/`，**没有 `base` 路径**。

### 内容集合

两个集合，定义在 `src/content.config.ts`，使用 Astro v2 `glob` loader：

- `src/content/blog/` — 博客文章
- `src/content/notes/` — 课程笔记、教程、独立笔记

共用 `baseSchema`：title, description, date, updated, tags, category, draft, cover, source。Notes 额外扩展 `docGroup` (string) 和 `order` (optional number)。

`category` 允许值（`src/consts.ts` 枚举）：`AI Tools` · `3D Vision` · `Agents` · `Research Notes` · `Essays` · `Tutorials` · `课程学习`。

### 路由 — docGroup 桥接

`docGroup` 是内容和路由之间的关键桥梁。每个 note 的 `docGroup` 必须映射到 `src/consts.ts` 中 `NOTE_COURSES` 或 `NOTE_TUTORIALS` 的条目。**dict key（如 `'dsp-notes'`）≠ URL slug** — 条目内的 `slug` 字段（如 `'digital-signal-processing'`）才是 URL 中出现的。

| 路由 | 文件 | 说明 |
|---|---|---|
| `/notes/` | `notes/index.astro` | 笔记首页，展示课程和教程卡片 |
| `/notes/[course]/` | `notes/[course]/index.astro` | 课程着陆页，使用 `NoteDirectoryList` |
| `/notes/[course]/[...slug]/` | `notes/[course]/[...slug].astro` | 文章页**和**嵌套目录页共用，通过 `'directoryPrefix' in props` 判断渲染模式 |
| `/notes/tutorial/[tutorial]/[...slug]/` | 同课程路由 | 教程路由 |
| `/notes/[slug]/` | `notes/[...slug].astro` | 不属于任何课程/教程的独立笔记 |
| `/notes/quiz/` | `notes/quiz.astro` | React 测验应用 (`client:only="react"`) |

**README 约定**：名为 `readme.md`（不区分大小写）的笔记会从所有列表和目录视图中过滤掉。其 `description` 用作课程着陆页的兜底描述。

### 添加新课程

1. 在 `src/consts.ts` 的 `NOTE_COURSES` 中添加条目
2. 创建目录 `src/content/notes/{docGroup-key}/`
3. 添加 `README.md`，设置 `order: -1` 和相同的 `docGroup` 值
4. 添加章节 `.md` 文件，`order` 顺序递增

完整流程见 `CONTRIBUTING.md` 和 `scripts/notes-pipeline/PUBLISH_CHECKLIST.md`。可以用 `npm run publish:course <docGroup>` 自动运行发布前校验。

### 电力电子课程工作流

电力电子课程（`pe-notes`）是一个特殊的已发布课程，工作时注意以下几点：

**目录与 docGroup 的命名差异：** 物理目录名是 `pe-notes`，但 docGroup 值和 `NOTE_COURSES` key 都是 `power-electronic-notes`，URL slug 是 `power-electronics`。三者各不相同。路由系统按 `docGroup` 匹配，所以内容能正常路由；但 `validate-content.mjs` 通过 `entry.name`（目录名）查 `REGISTERED_DOC_GROUPS`，`pe-notes` 不在集合中，因此不会触发"docGroup ≠ directory name"的交叉校验，也不会强制要求 README 和 order。

**内容结构惯例：** 每章遵循固定结构——先用直觉性介绍（"先讲清楚"）引入概念，再给出 LaTeX 公式推导和分步例题，然后收成可重复的做题套路（"固定套路"），最后列出常见丢分点（"别丢分"）。编辑现有章节时保持这个结构。

**资产管理：**
- `assets/` — SVG 波形/拓扑图，用相对路径 `./assets/xxx.svg` 通过 Markdown 图片语法引用
- `materials/` — 课程 PDF 材料（试卷、作业、tutorial），供读者下载参考
- `slides/` — 讲座 PDF（Lecture 1–13），`archive/` 子目录存 pptx 源文件
- 公式统一用 `$$...$$` 块级或 `$...$` 行内 LaTeX；技术术语中英双写，如"占空比(duty cycle)"、"触发角(firing angle)"

**课程 URL 结构：** 章节文件的 `order` 为 0–9，README 的 `order` 为 -1。发布后的 URL 格式为 `/notes/power-electronics/00-exam-strategy/`。

### 电磁场与波课程工作流

电磁场与波课程（`emf-notes`）目前是期末复习重点，来源材料和已发布内容分开管理：

**课程映射：** 物理目录、`docGroup` 和 `NOTE_COURSES` key 都是 `emf-notes`，URL slug 是 `electromagnetics-and-fields`。发布后的章节 URL 格式为 `/notes/electromagnetics-and-fields/chapter6/`。

**已发布内容：** `src/content/notes/emf-notes/` 下有 README、chapter2–chapter8、`important_problems.md`、`emt-midterm-mock-test-2.md`，以及 `assets/` PNG 图和 `slides/` 课件。README 的 `order: -1`，章节 order 当前从 2 开始；不要为了“补齐”order 随意重排，否则课程页排序和已有链接会变化。

**期末原始材料：** `raw_materials/emf-final/` 存放 2022、2023、2024、2025 四套期末 PDF、对应提取的 Markdown（`202204-exam.md` 等）和 `mock-test-2026.md` / `Final Mock Test 2026.doc`。这些是工作源材料，不是发布内容；用于整理期末题型、补全 chapter6–8 与后续微波/传输线/波导内容时，先在 `raw_materials/emf-final/*.md` 查题干，再决定是否转写到 `src/content/notes/emf-notes/`。

**出题范围观察：** 期末真题覆盖矢量分析、静电/恒定电流、静磁场、时变场与平面波，也反复出现 Smith chart、传输线和矩形波导。现有章节只到 chapter8（平面波）；若根据期末材料新增传输线/波导复习页，需要同步更新 `README.md` 目录，并保持 `docGroup: "emf-notes"`、`category: "课程学习"`、`draft: false`。

**写作风格：** 这门课的笔记更偏考试复习而不是研究随笔。编辑时保持“主线/符号表/核心公式/典型题/易错点”的结构，用中文解释直觉，公式用块级 LaTeX；题干、公式和标准术语可以保留英文。不要把整份真题原样搬进课程目录，应该抽象成题型模板、解题步骤和易错点。

**资产与课件：** 图片用相对路径 `assets/xxx.png` 引用。`slides/` 中 PDF/PPTX 已在仓库中，用作课程材料来源；新增大文件前先确认是否确实需要发布到站点。`raw_materials/emf-final/` 中的 PDF/DOC/提取稿已经是仓库内源材料，但其它临时提取文本、review 日志仍应放到 `_archive/` 或仓库外。

### 布局与组件

- `BaseLayout.astro` — 根布局：lang、CSS、KaTeX、Mermaid CDN loader、主题闪烁防护、skip-to-content 无障碍链接、Header + Footer + SEO（含 JSON-LD 结构化数据）
- `PostLayout.astro` — 文章外壳：eyebrow、h1、meta（date/readingTime/category/updated/source）、TOC、内容 slot
- `PostCard.astro` — 文章卡片，URL 解析逻辑复杂（课程、教程、独立笔记三路判断）
- `NoteDirectoryList.astro` — 渲染课程页的目录卡片 + 笔记卡片
- `Search.astro` — Pagefind 搜索对话框，`Cmd+K` 快捷键

### 工具函数 (`src/utils/`)

- `content.ts` — `getPublishedCollection()`、`getLatestNotes()`、`getFeedEntries()`、`formatDate()` 等
- `noteTree.ts` — 目录树逻辑：`getNoteSlug()`、`getNoteDirectoryListing()`、`getNoteBreadcrumbs()`、`sortNoteEntries()`（共享排序函数）
- `readingTime.ts` — 双语计算：英文 220 WPM，中文 500 CPM

### Markdown 处理管线

`remark-math` → 自定义 `remarkMermaid`（转为 `<pre class="mermaid">`）→ `rehype-katex`。Mermaid 客户端渲染，仅在页面存在 `.mermaid` 元素时加载 CDN。Shiki 使用 `github-light` / `github-dark` 双主题。

### 样式

纯 CSS，`src/styles/global.css`。CSS 自定义属性用于主题化（`--bg`、`--text`、`--accent` 等）。暗色模式通过 `:root[data-theme='dark']`。无框架或工具类。

### Quiz 系统（React，client-only）

项目中唯一的 React 用途。位于 `/notes/quiz/`。题库在 `src/data/question-banks/`（TypeScript 文件）。所有状态存 `localStorage`。数学公式用 `$...$` 通过 `react-katex` 渲染。

## 测试

```bash
npm run test              # 运行所有测试
npm run test:watch        # 监听模式
```

测试文件位于：
- `src/utils/__tests__/readingTime.test.ts` — 阅读时间计算
- `src/utils/__tests__/noteTree.test.ts` — 目录树工具函数
- `scripts/__tests__/validate-content.test.mjs` — 校验脚本集成测试

## 编辑前必读

1. **`docGroup` key ≠ URL slug。** `'dsp-notes'` 是 key，`'digital-signal-processing'` 是 slug。搞混了链接全断。
2. **`getNoteSlug()` 假设第一段路径是 docGroup。** `entry.id.replace(/^[^/]+\//, '')`。不要用不同的嵌套约定添加内容文件。
3. **`PostCard` 的链接逻辑很复杂。** 它检查 README 状态、课程归属和教程归属。修改路由结构必须同步修改这里。
4. **`getPublishedCollection('notes')` 包含 README；`getLatestNotes()` 不包含。** 根据页面需求选择正确的函数。
5. **`notes/[...slug].astro` 只处理不属于任何课程/教程的笔记。** 它会显式过滤掉 `docGroup` 匹配已注册 key 的条目。
6. **`unist-util-visit` 在 `astro.config.mjs` 中使用但不在 `package.json` 中。** 作为 remark 的传递依赖可以工作。如果直接使用，需要加入 `package.json`。
7. **Pagefind 是构建后步骤**，不是 Astro 集成。如果 `astro build` 失败，搜索索引会过期。
8. **没有定时发布。** `isPublished` 只检查 `draft`，不检查 `date`。
9. **不要将源课件或工作文档提交到内容目录。** 开发笔记、提取的文本文件、review 日记和原始素材放在仓库之外。`draft: true` 只用于真正未完成的内容。工作制品放在 `_archive/`（已 gitignore）。
10. **Quiz 进度仅存 localStorage。** 清除浏览器数据会丢失，没有导出/导入功能。
11. **`validate-content.mjs` 的常量从 `src/consts.ts` 动态读取。** 修改 CATEGORIES 或 NOTE_COURSES 后校验脚本自动同步，不需要手动更新。
12. **`sortNoteEntries()` 是 `noteTree.ts` 导出的共享排序函数。** `content.ts` 和 `noteTree.ts` 都使用它，不要在别处重复实现。
13. **`pe-notes` 目录名 ≠ `power-electronic-notes` docGroup。** 这是已知的命名不一致。路由系统按 docGroup 匹配所以正常工作，但 `validate-content.mjs` 按目录名查找注册状态，会把 pe-notes 当作未注册目录。如果需要修改 PE 课程的 docGroup 或目录名，两者要同步改，并更新 `src/consts.ts` 和所有章节文件的 frontmatter。
14. **`validate-content.mjs` 只对已注册目录强制要求 README 和 order。** 未注册目录（包括 pe-notes，因目录名不匹配）的 README/order 校验是可选的。新增课程时，务必保证目录名与 `NOTE_COURSES` 的 key 完全一致，否则校验脚本无法正确执行交叉校验。

## 部署

- GitHub Actions：`.github/workflows/deploy.yml`
- push to `main`（内容/配置相关路径）或手动触发
- Node 22，`npm ci` → `npm run build`（含 Pagefind）→ 上传到 GitHub Pages
- GitHub Pages 必须配置为从 **GitHub Actions** 部署（不是从分支）

## 写作规范

内容使用中文写作。以下规则适用于所有博客、笔记和长文。

### 整体基调

文章应像清醒的、以实验驱动的研究笔记——不是爆款文、营销文案、课程幻灯片或翻译论文。作者不是全知专家，而是在做具体研究/项目的人。写给"未来的自己和同领域的同行"。语气自然但不油腻，有判断但不装，有反思但不说教。

### 五条核心原则

1. **从具体问题出发，不要宏大叙事开头。** 禁止"随着 AI 的快速发展..."式开头。开头必须回答：我在做什么？遇到了什么具体问题？为什么值得写？
2. **每篇文章必须有明确的中心判断。** 不要只堆材料。判断可以保守，但必须存在。
3. **承认边界，不要假装完全理解。** 允许："我目前的理解是..."、"这个结论只适用于我当前的实验设置。"禁止："显而易见..."、"这充分证明..."、"这全面系统地揭示了..."
4. **用实验思维写作。** 一个好的句子包含：观察到的现象、条件、可能原因、下一步验证。
5. **写"局限"，不写"意义"。** 写"这个方法目前最大的局限是..."、"这个实验无法证明..."。避免"为未来研究提供了重要参考"式空话。

### 推荐文章结构

- **研究反思**（踩坑、失败实验、方向判断）：问题怎么来的 → 我一开始怎么想的 → 真正的问题是什么 → 证据支持什么结论 → 不支持什么结论 → 下一步 2–4 个具体行动。
- **论文/方向阅读**（论文评述、技术路线评估）：解决什么问题 → 为什么现在重要 → 核心方法 → 我觉得真正有价值的地方 → 我不同意或还没理解的地方 → 对我自己项目的启发。
- **技术决策**（实习选择、方法选择、开源策略）：定义目标 → 列出选项 → 分析各选项的收益和代价 → 说明当前阶段的选择 → 指出什么条件会改变这个选择。

### 段落和语言风格

一个段落一个观点，大致 3–6 行。每隔几段丢一句清晰的判断句（如"所以我目前的判断：这个问题不应该再靠调超参数来解决了"）。

允许的表达：说白了...、更现实的问题是...、我之前忽略的一点是...、这听起来像废话，但在实际做实验时很重要。

禁止的表达：赋能、打造、深度融合、闭环生态、显著提升、具有重要意义、为未来研究提供新思路、在当今快速发展的时代背景下，以及类似的官话/标题党用语。

### AI 写作模式硬禁

- 禁止宏大叙事开头
- 禁止无证据的夸张
- 禁止每节结尾都写"具有重要意义"或等价表达
- 禁止论文摘要式写作
- 禁止假装作者完全理解一切
- 禁止没有真实逻辑的"首先，其次，最后"堆砌
- 禁止过于工整的排比句式
- 禁止为了显得全面而水字数

### 发布前自检

这篇文章有没有具体问题？有没有明确判断？有没有来自实验、论文、代码或经验的证据？有没有说明不确定性？有没有删掉废话？读完之后读者知不知道下一步该做什么？任何一个答案是否，重写。

## 相关文档

| 文件 | 说明 |
|---|---|
| `CONTRIBUTING.md` | 贡献指南：内容类型、frontmatter 规范、添加流程、CI 说明 |
| `templates/` | 内容模板（blog、note、docs、tutorial、course-config） |
| `scripts/validate-content.mjs` | 统一 frontmatter 校验脚本（动态读取 consts） |
| `scripts/publish-course.mjs` | 课程发布自动化校验（validate → typecheck → build → link check） |
| `scripts/notes-pipeline/` | 课程发布流水线（checklist、review prompt） |
| `.claude/commands/review-notes.md` | Claude Code slash command：课程笔记生成与审查 |
| `.editorconfig` | 编辑器统一配置 |
| `.github/CODEOWNERS` | 代码所有权 |
| `.github/dependabot.yml` | 自动依赖更新 |
