# AI 题库生成规范

## 1. 文件目的

本文档规定本项目题库文件的统一格式。以后让 AI 根据任意课程资料生成题库时，必须遵守本文档中的类型结构、语言规范、题型规范、ID 规则、标签规则和质量要求。

题库文件应放在 `question-banks/subjects/` 下对应学科的子目录中，并通过 `question-banks/subjects.ts` 注册为一个学科。每个学科独立保存在自己的子目录中，不要把不同课程题目混在一个巨大文件中。

## 2. 题库语言规范

- 所有题目必须中英双语。
- `questionZh` 为中文题干。
- `questionEn` 为英文题干。
- 每个选项必须包含 `textZh` 和 `textEn`。
- `explanationZh` 使用中文。
- 如果题目来自英文教材或专业资料，专业术语可以保留英文。
- 中文解析中可以保留英文专业词汇，例如 electric field、electric displacement、boundary condition、scalar potential、Laplace equation、Poisson equation、Fourier transform、convolution。

## 3. 题型规范

支持三类题：

```ts
type QuestionType = "single" | "multiple" | "true_false";
```

- 单选题：`type: "single"`，`answer` 只能有一个元素，例如 `["B"]`。
- 多选题：`type: "multiple"`，`answer` 可以有多个元素，例如 `["A", "C", "D"]`。
- 判断题：`type: "true_false"`，`answer` 只能是 `["true"]` 或 `["false"]`。
- 所有题型的 `answer` 都必须是字符串数组。
- 判题逻辑按集合严格一致判断，多选题少选、错选、多选都算错误。

## 4. 选项数量规范

- 单选题不限制只能 4 个选项，可以有 2、3、4、5 个或更多选项。
- 多选题建议 4 到 6 个选项。
- 判断题可以不写 `options`，由前端自动生成“正确 / 错误”和 “True / False”。
- 选项 `id` 建议使用 `"A"`, `"B"`, `"C"` 等稳定编号。
- 判断题使用 `"true"` 和 `"false"`。

## 5. ID 命名规范

题目 ID 必须稳定、唯一，不要使用随机 ID。

建议格式：

```text
学科缩写-章节编号-题号
```

例如：

```text
em-01-001
em-01-002
sig-02-001
logic-03-014
```

如果后续修改题干或选项，除非题目语义已经变成另一道题，否则不要改变 ID，以免破坏用户历史答题记录。

## 6. 标签规范

每道题必须有 `tags`。

- 至少 1 个标签。
- 建议 1 到 3 个标签。
- 标签应表示知识点，而不是章节标题。
- 标签应尽量稳定，不要同义词混用。

电磁场推荐示例：

```ts
["静电场", "边界条件"]
["导体静电平衡", "电势"]
["镜像法", "接地导体"]
["分离变量法", "拉普拉斯方程"]
```

## 7. 难度规范

难度只能使用：

```ts
type Difficulty = "基础" | "中等" | "较难";
```

不要使用其他值，例如“简单”“困难”“hard”。

## 8. 解析规范

- 解析必须是中文。
- 不能只写“答案是 B”。
- 需要解释正确答案为什么正确。
- 对错误选项也要简要说明为什么错误。
- 多选题必须逐项解释。
- 判断题必须说明命题为什么成立或不成立。
- 解析中可以使用专业英文词汇。
- 如涉及公式，应使用 Markdown/LaTeX 格式，例如 `$\\nabla\\cdot D=\\rho_f$`。

## 9. 示例题库格式

### 单选题示例

```ts
{
  id: "em-01-001",
  type: "single",
  questionZh: "静电平衡时，理想导体内部电场强度为何为零？",
  questionEn: "Why is the electric field inside an ideal conductor zero under electrostatic equilibrium?",
  options: [
    {
      id: "A",
      textZh: "因为导体内部没有自由电荷",
      textEn: "Because there are no free charges inside the conductor"
    },
    {
      id: "B",
      textZh: "因为若内部存在电场，自由电荷会继续定向移动",
      textEn: "Because if an internal electric field existed, free charges would continue to move directionally"
    },
    {
      id: "C",
      textZh: "因为导体表面电荷密度一定为零",
      textEn: "Because the surface charge density must be zero"
    },
    {
      id: "D",
      textZh: "因为导体内部电势一定为零",
      textEn: "Because the potential inside the conductor must be zero"
    }
  ],
  answer: ["B"],
  explanationZh: "B 正确。静电平衡意味着自由电荷不再发生宏观定向移动。如果导体内部仍存在 electric field，自由电荷会受到电场力而继续运动，因此内部电场必须为零。A 错在导体内有大量自由电子；C 错在导体表面可以有面电荷；D 错在导体电势为常数但不一定为零。",
  tags: ["导体静电平衡", "静电场"],
  difficulty: "基础"
}
```

### 多选题示例

```ts
{
  id: "em-01-002",
  type: "multiple",
  questionZh: "关于静电场边界条件，下列说法正确的是哪些？",
  questionEn: "Which statements about electrostatic boundary conditions are correct?",
  options: [
    {
      id: "A",
      textZh: "电场强度的切向分量在介质分界面两侧连续",
      textEn: "The tangential component of electric field intensity is continuous across a dielectric interface"
    },
    {
      id: "B",
      textZh: "电位移矢量的法向分量在无自由面电荷时连续",
      textEn: "The normal component of electric displacement is continuous when there is no free surface charge"
    },
    {
      id: "C",
      textZh: "电势在普通介质分界面处通常连续",
      textEn: "The electric potential is usually continuous across an ordinary dielectric interface"
    },
    {
      id: "D",
      textZh: "电场强度的法向分量在任意介质分界面处都连续",
      textEn: "The normal component of electric field intensity is always continuous across any dielectric interface"
    },
    {
      id: "E",
      textZh: "电位移矢量的切向分量一定连续",
      textEn: "The tangential component of electric displacement is always continuous"
    }
  ],
  answer: ["A", "B", "C"],
  explanationZh: "A 正确，静电场满足 $\\nabla\\times E=0$，因此 $E_t$ 连续。B 正确，$D_n$ 的跃变量等于自由面电荷密度；无自由面电荷时 $D_n$ 连续。C 正确，有限电场下电势通常连续。D 错误，$E_n$ 会随介电常数变化。E 错误，通常连续的是 $E_t$，不是 $D_t$。",
  tags: ["边界条件", "电介质", "静电场"],
  difficulty: "中等"
}
```

### 判断题示例

```ts
{
  id: "em-01-003",
  type: "true_false",
  questionZh: "在静电场中，导体内部电势一定为零。",
  questionEn: "In an electrostatic field, the potential inside a conductor must be zero.",
  options: [],
  answer: ["false"],
  explanationZh: "该说法错误。静电平衡时导体内部 electric field 为零，因此电势处处相等，但该常数不一定为零。只有当导体接地时，电势才通常取为零。",
  tags: ["导体静电平衡", "电势"],
  difficulty: "基础"
}
```

## 10. 质量要求

- 不要生成重复题。
- 不要生成换皮题。
- 不要让答案分布过于集中。
- 不要所有题都考定义。
- 应多考概念辨析、适用条件、边界条件、常见误区和“哪个说法错误”。
- 多选题不要设置过多“全对/全错”式机械题。
- 英文题干应自然准确，不要机械翻译。
- 中文题干应符合考试表达。
- 如果根据 PDF 生成题库，应尽量覆盖所有重要章节。
- 如果 OCR 不完整，应在生成说明中标注限制。

## 11. 学科注册方式

新增题库后，在 `question-banks/subjects.ts` 中注册：

```ts
import { newCourseQuestions } from "./subjects/new-course/newCourse";

export const subjects = [
  {
    id: "new-course",
    nameZh: "新课程",
    nameEn: "New Course",
    description: "课程覆盖范围说明。",
    questions: newCourseQuestions
  }
];
```

`id` 会用于 localStorage key：`quiz-progress-${subjectId}`，一旦发布后不要随意修改。
