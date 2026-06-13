import { electromagneticFieldQuestions } from "./subjects/electromagnetic-field/electromagneticField";
import { exampleSubjectQuestions } from "./subjects/example/exampleSubject";
import { epmfQuestions } from "./subjects/epmf/epmf";
import type { Subject } from "../platform/src/types";

export const subjects: Subject[] = [
  {
    id: "electromagnetic-field",
    nameZh: "电磁场",
    nameEn: "Electromagnetic Field",
    description: "静电场、恒定电场、边界条件、镜像法、分离变量法等内容。",
    questions: electromagneticFieldQuestions
  },
  {
    id: "signals-and-systems",
    nameZh: "信号与系统示例",
    nameEn: "Signals and Systems Example",
    description: "示例学科，用于展示单选题、多选题和判断题的数据格式。",
    questions: exampleSubjectQuestions
  },
  {
    id: "epmf",
    nameZh: "EPMF 工程项目管理与财务",
    nameEn: "Engineering Project Management & Finance",
    description: "Block 1 项目管理 · Block 2 DFM与质量 · Block 3 工程经济学 · Block 4 公司管理。共 157 题，覆盖全部考点。",
    questions: epmfQuestions
  }
];
