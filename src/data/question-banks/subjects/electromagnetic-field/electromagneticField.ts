import { englishQuestionById } from "./em-legacy-english-specs";
import { questions as legacyQuestions } from "./em-legacy-specs";
import { migrateLegacyQuestion } from "../../../../components/quiz/utils/questionUtils";
import type { Question } from "../../../../components/quiz/types";

const migratedQuestions = legacyQuestions.map((question) => migrateLegacyQuestion(question, englishQuestionById.get(question.id)));

const extraQuestions: Question[] = [
  {
    id: "em-extra-001",
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
    explanationZh:
      "A 正确，静电场满足 $\\nabla\\times E=0$，因此 $E_t$ 连续。B 正确，$D_n$ 的跃变量等于自由面电荷密度，若无自由面电荷则连续。C 正确，普通介质界面处电势通常连续。D 错误，$E_n$ 会随介电常数变化。E 错误，通常连续的是 $E_t$，不是 $D_t$。",
    tags: ["边界条件", "电介质", "静电场"],
    difficulty: "中等"
  },
  {
    id: "em-extra-002",
    type: "true_false",
    questionZh: "在静电场中，导体内部电势一定为零。",
    questionEn: "In an electrostatic field, the potential inside a conductor must be zero.",
    options: [],
    answer: ["false"],
    explanationZh:
      "该说法错误。静电平衡时导体内部电场为零，因此电势处处相等，但该常数不一定为零。只有当导体接地并选大地为零电位时，导体电势才通常取为零。",
    tags: ["导体静电平衡", "电势"],
    difficulty: "基础"
  },
  {
    id: "em-extra-003",
    type: "single",
    questionZh: "镜像法中像电荷必须放在求解区外，最主要原因是什么？",
    questionEn: "In the method of images, why must image charges be placed outside the solution region?",
    options: [
      {
        id: "A",
        textZh: "否则会改变求解区内的源分布，破坏与原问题的等价性",
        textEn: "Otherwise they would change the source distribution in the solution region and break equivalence with the original problem"
      },
      {
        id: "B",
        textZh: "因为像电荷是真实电荷，不能放在导体内部",
        textEn: "Because image charges are real charges and cannot be placed inside conductors"
      },
      {
        id: "C",
        textZh: "因为像电荷只能用于计算导体内部电场",
        textEn: "Because image charges can only be used to compute the field inside conductors"
      }
    ],
    answer: ["A"],
    explanationZh:
      "A 正确。镜像法的合法性来自唯一性定理：等效问题必须在求解区内满足与原问题相同的方程和边界条件。若像电荷放入求解区，就改变了求解区内的源。B 错在像电荷是虚构工具；C 错在镜像法主要给出求解区内、通常是导体外部区域的场。",
    tags: ["镜像法", "唯一性定理"],
    difficulty: "中等"
  }
];

export const electromagneticFieldQuestions: Question[] = [...migratedQuestions, ...extraQuestions];
