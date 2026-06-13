# 多学科自测平台 / Multi-Subject Quiz Platform

> 基于 React + TypeScript + Vite 的本地刷题前端。支持单选题、多选题、判断题，提供知识点筛选、薄弱点分析、错题本和进度持久化。
>
> A local-first quiz platform built with React + TypeScript + Vite. Supports single-choice, multiple-choice, and true/false questions with tag-based filtering, weak-point analysis, wrong-question book, and localStorage progress tracking.

![TypeScript](https://img.shields.io/badge/TypeScript-6.x-blue?logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/React-19-61dafb?logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-8-646cff?logo=vite&logoColor=white)
![License](https://img.shields.io/badge/license-MIT-green)

---

## 功能亮点 / Features

- **多学科支持** — 通过 `subjects.ts` 注册新学科，各学科数据独立
- **三种题型** — 单选题、多选题、判断题 (single / multiple / true-false)
- **中英双语** — 题干、选项、解析中英对照
- **LaTeX 数学公式** — 基于 KaTeX，用 `$...$` 分隔渲染
- **知识点筛选** — 按标签和难度快速定位题目
- **薄弱点分析** — 自动识别正确率低于 70% 的知识点并给出复习建议
- **错题本** — 答错自动收录，答对可标记"已掌握"
- **本地持久化** — localStorage 保存进度，学科间互不干扰
- **随机打乱** — 支持可复现的种子随机，确保每次练习顺序不同

## 环境要求 / Prerequisites

- **Node.js** >= 18
- **npm** >= 9

## 快速开始 / Quick Start

```bash
# 安装依赖 / Install dependencies
cd course-quiz/platform && npm install

# 启动开发服务器 / Start dev server
npm run dev
# → http://localhost:5173

# 生产构建 / Production build
npm run build

# 预览生产版本 / Preview production build
npm run preview
```

## 项目结构 / Project Structure

```
.
├── CLAUDE.md                            # Claude Code 项目指引
├── README.md
└── course-quiz/                         # 项目主目录 / Project root
    ├── platform/                        # 网页基建 / Quiz web app infrastructure
    │   ├── src/
    │   │   ├── App.tsx                  # 主组件（UI + 状态管理）
    │   │   ├── main.tsx                 # React 入口
    │   │   ├── styles.css               # 全局样式
    │   │   ├── types.ts                 # 共享类型定义
    │   │   ├── vite-env.d.ts           # Vite / react-katex 类型声明
    │   │   └── utils/
    │   │       ├── grading.ts           # 判题逻辑（集合严格一致）
    │   │       ├── questionUtils.ts     # 题目工具函数
    │   │       ├── stats.ts             # 统计与薄弱点分析
    │   │       └── storage.ts           # localStorage 持久化
    │   ├── index.html
    │   ├── package.json
    │   ├── tsconfig.json
    │   └── vite.config.ts
    └── question-banks/                  # 题库数据 / Question bank data
        ├── subjects.ts                  # 学科注册表（入口）
        ├── AI_QUESTION_BANK_README.md   # AI 题库生成规范
        └── subjects/                    # 各学科题库 / Per-subject data
            ├── electromagnetic-field/
            │   ├── electromagneticField.ts  # 电磁场题库（223 题）
            │   ├── em-legacy-specs.ts       # 电磁场旧版中文规格
            │   └── em-legacy-english-specs.ts
            ├── epmf/
            │   └── epmf.ts                  # EPMF 工程项目管理与财务（157 题）
            └── example/
                └── exampleSubject.ts        # 信号与系统示例（3 题）
```

**网页基建** (`platform/`) 包含全部前端逻辑、UI 渲染和工具函数，不包含任何题目数据。**题库** (`question-banks/`) 只包含学科注册表和题目数组，通过 `subjects.ts` 桥接。

---

## 如何添加新学科 / Adding a New Subject

### 1. 创建题库文件 / Create a question bank file

```ts
// course-quiz/question-banks/subjects/your-subject/yourSubject.ts
import type { Question } from "../../../platform/src/types";

export const yourSubjectQuestions: Question[] = [
  {
    id: "ys-01-001",
    type: "single",
    questionZh: "中文题干",
    questionEn: "English question stem",
    options: [
      { id: "A", textZh: "中文选项 A", textEn: "English option A" },
      { id: "B", textZh: "中文选项 B", textEn: "English option B" },
      { id: "C", textZh: "中文选项 C", textEn: "English option C" },
      { id: "D", textZh: "中文选项 D", textEn: "English option D" },
    ],
    answer: ["B"],
    explanationZh: "B 正确，因为…… A 错在…… C 错在…… D 错在……",
    tags: ["知识点A", "知识点B"],
    difficulty: "基础",
  },
];
```

### 2. 注册学科 / Register in `course-quiz/question-banks/subjects.ts`

```ts
import { yourSubjectQuestions } from "./subjects/your-subject/yourSubject";

// 添加到 subjects 数组：
{
  id: "your-subject",          // ⚠ 不要更改，用于 localStorage key
  nameZh: "你的学科",
  nameEn: "Your Subject",
  description: "课程范围说明。",
  questions: yourSubjectQuestions
}
```

> **重要** Subject `id` 用于 localStorage key（`quiz-progress-${subjectId}`）。一旦发布，修改 id 会导致用户丢失进度。
>
> **Important** The subject `id` is used as the localStorage key. Changing it after release will cause users to lose their progress. The file lives in `course-quiz/question-banks/subjects.ts`.

---

## 题库数据格式 / Question Data Format

详见 [AI_QUESTION_BANK_README.md](./course-quiz/question-banks/AI_QUESTION_BANK_README.md)。

### 核心类型 / Core Types

```ts
type QuestionType = "single" | "multiple" | "true_false";
type Difficulty = "基础" | "中等" | "较难";

interface Question {
  id: string;              // 格式: 学科缩写-章节-题号 (e.g. "em-01-001")
  type: QuestionType;
  questionZh: string;      // 中文题干
  questionEn: string;      // 英文题干
  options: QuestionOption[];
  answer: string[];        // 如 ["B"], ["A","C","D"], ["true"]
  explanationZh: string;   // 中文解析
  tags: string[];          // 知识点标签
  difficulty: Difficulty;
}
```

### 题型说明 / Question Types

| 类型 | `type` | `answer` 示例 | 说明 |
|------|--------|--------------|------|
| 单选题 | `"single"` | `["B"]` | answer 只有一个元素 |
| 多选题 | `"multiple"` | `["A","C","D"]` | 全部选对才得分，少选、错选均不得分 |
| 判断题 | `"true_false"` | `["true"]` / `["false"]` | options 可为空数组，前端自动生成 |

### ID 命名规范

题目 ID 必须稳定、唯一。建议格式：`学科缩写-章节编号-题号`。

示例：`em-01-001`、`sig-02-001`、`epmf-3-015`

> 修改题干或选项时，除非语义已变为另一道题，否则不要改变 ID，以免破坏用户答题记录。

---

## 使用说明 / Usage

- **顶部** 显示当前学科、总题数、当前筛选题数、已答题数和正确率。
- **左侧** 可切换学科，不同学科的答题记录、错题本和统计互相隔离。
- 每道题同时显示**中文题干**和**英文题干**，选项中英对照，解析使用中文。
- 左侧可按**知识点**、**难度**筛选，也可切换全部题目、错题本未掌握、已掌握错题。
- 开启"**随机打乱题目顺序**"后，可点击"重新随机"换一组顺序。
- 单选题、多选题、判断题统一使用"**提交答案**"判定。
- 多选题少选、错选、多选均不得分。
- 提交后会高亮正确选项和错误选择，并显示解析。
- 答错题会自动进入**错题本**；在错题模式中重新答对后，会标记为"**已掌握**"。
- "**薄弱点总结**"会在某个标签答题数达到阈值且正确率偏低时自动显示复习建议。

### 重置记录

页面左侧点击"重置当前学科记录"会清空当前学科在 localStorage 中保存的全部答题记录。每个学科使用独立 key：`quiz-progress-${subjectId}`。

---

## 旧题库迁移 / Legacy Question Migration

旧格式（`LegacyQuestion`）使用数字 id 和数字答案索引：

```ts
{
  id: 1,
  question: "...",
  options: ["A", "B", "C", "D"],
  answer: 1,
  explanation: "...",
  tags: ["..."],
  difficulty: "基础"
}
```

可通过 `migrateLegacyQuestion()` 转换为新格式：

```ts
import { migrateLegacyQuestion } from "../../platform/src/utils/questionUtils";

const newQuestion = migrateLegacyQuestion(oldQuestion, optionalEnglishQuestion);
```

迁移后会变为 `type: "single"`，题目 ID 形如 `em-001`，答案从数字索引转换为 `["A"]`、`["B"]` 这样的字符串数组。

---

## 开发命令 / Commands

所有命令在 `course-quiz/platform/` 目录下运行：
All commands run from the `course-quiz/platform/` directory:

| 命令 | 说明 |
|------|------|
| `npm run dev` | 启动开发服务器（默认 `http://localhost:5173`） |
| `npm run build` | 类型检查（`tsc -b`）+ 生产构建 |
| `npm run preview` | 预览生产版本 |

---

## 贡献指南 / Contributing

欢迎提交 Issue 和 Pull Request。

1. Fork 本仓库
2. 创建功能分支：`git checkout -b feature/your-feature`
3. 提交更改：`git commit -m 'Add your feature'`
4. 推送分支：`git push origin feature/your-feature`
5. 创建 Pull Request

## 许可证 / License

[待定 / TBD]
