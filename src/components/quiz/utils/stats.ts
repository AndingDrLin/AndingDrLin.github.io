import type { Difficulty, Question, QuestionType, QuizProgress } from "../types";

export interface BucketStat {
  name: string;
  answered: number;
  correct: number;
  wrong: number;
  accuracy: number;
}

export interface WeakPoint extends BucketStat {
  weakestType?: string;
  advice: string;
}

export interface OverallStats {
  answered: number;
  correct: number;
  wrong: number;
  accuracy: number;
  byTag: BucketStat[];
  byDifficulty: BucketStat[];
  byType: BucketStat[];
  weakPoints: WeakPoint[];
}

const difficultyOrder: Difficulty[] = ["基础", "中等", "较难"];
const typeOrder: QuestionType[] = ["single", "multiple", "true_false"];
const typeLabels: Record<QuestionType, string> = {
  single: "单选题",
  multiple: "多选题",
  true_false: "判断题"
};

export function percent(correct: number, answered: number) {
  if (answered === 0) return 0;
  return Math.round((correct / answered) * 100);
}

function makeBucket(name: string, answered: number, correct: number): BucketStat {
  const wrong = answered - correct;
  return {
    name,
    answered,
    correct,
    wrong,
    accuracy: percent(correct, answered)
  };
}

function adviceForTag(tag: string) {
  const advice: Record<string, string> = {
    边界条件: "重点复习 D 的法向边界条件、E 的切向边界条件，以及有自由面电荷时的跳变条件。",
    镜像法: "建议区分接地导体、孤立导体和介质界面，牢记像电荷必须位于求解区外。",
    电介质: "建议重看 E、D、P 的关系，以及自由电荷与极化电荷的公式适用范围。",
    恒定电场: "建议对比静电场与稳态电流场，特别是 Jn 连续而非 Dn 连续。",
    导体静电平衡: "建议巩固导体内 E=0、导体等势、表面自由电荷和接地条件的区别。",
    电容与电导: "建议复习 C↔G、ε↔σc 的对偶关系，以及 RC=ε/σc 的适用条件。",
    唯一性定理: "建议把'方程 + 边界条件 ⇒ 解唯一'作为镜像法和分离变量法的判据。",
    分离变量法: "建议先判断边界条件类型，再用唯一性定理检查所得解是否完整满足边界。",
    静电场: "建议复习有源无旋、电位函数和 Poisson/Laplace 方程之间的推导链。",
    矢量分析: "建议区分积分量与局部量：通量/环量是积分，散度/旋度是点函数。",
    能量与功率: "建议复习焦耳损耗、电荷弛豫时间和正弦平均功率因子的来源。",
    常见易混概念: "建议按载体、真假、单位量纲三步辨析：导体、介质、镜像电荷不要混用。",
    电势: "建议区分'电势为常数'和'电势为零'，并用 E=-∇φ 判断电场。"
  };
  return advice[tag] ?? `建议回到 PDF 中"${tag}"相关小节，重点整理公式适用条件和常见错误表述。`;
}

export function calculateStats(questions: Question[], progress: QuizProgress): OverallStats {
  const records = Object.values(progress.answers);
  const answered = records.length;
  const correct = records.filter((record) => record.isCorrect).length;
  const questionById = new Map(questions.map((question) => [question.id, question]));
  const tagMap = new Map<string, { answered: number; correct: number }>();
  const difficultyMap = new Map<Difficulty, { answered: number; correct: number }>();
  const typeMap = new Map<QuestionType, { answered: number; correct: number }>();
  const tagTypeMap = new Map<string, Map<QuestionType, { answered: number; correct: number }>>();

  for (const record of records) {
    const question = questionById.get(record.questionId);
    if (!question) continue;

    for (const tag of question.tags) {
      const current = tagMap.get(tag) ?? { answered: 0, correct: 0 };
      tagMap.set(tag, {
        answered: current.answered + 1,
        correct: current.correct + (record.isCorrect ? 1 : 0)
      });

      const currentTypeMap = tagTypeMap.get(tag) ?? new Map<QuestionType, { answered: number; correct: number }>();
      const currentType = currentTypeMap.get(question.type) ?? { answered: 0, correct: 0 };
      currentTypeMap.set(question.type, {
        answered: currentType.answered + 1,
        correct: currentType.correct + (record.isCorrect ? 1 : 0)
      });
      tagTypeMap.set(tag, currentTypeMap);
    }

    const diff = difficultyMap.get(question.difficulty) ?? { answered: 0, correct: 0 };
    difficultyMap.set(question.difficulty, {
      answered: diff.answered + 1,
      correct: diff.correct + (record.isCorrect ? 1 : 0)
    });

    const typeStat = typeMap.get(question.type) ?? { answered: 0, correct: 0 };
    typeMap.set(question.type, {
      answered: typeStat.answered + 1,
      correct: typeStat.correct + (record.isCorrect ? 1 : 0)
    });
  }

  const byTag = Array.from(tagMap.entries())
    .map(([name, stat]) => makeBucket(name, stat.answered, stat.correct))
    .sort((a, b) => b.answered - a.answered || a.accuracy - b.accuracy);

  const byDifficulty = difficultyOrder.map((difficulty) => {
    const stat = difficultyMap.get(difficulty) ?? { answered: 0, correct: 0 };
    return makeBucket(difficulty, stat.answered, stat.correct);
  });

  const byType = typeOrder.map((type) => {
    const stat = typeMap.get(type) ?? { answered: 0, correct: 0 };
    return makeBucket(typeLabels[type], stat.answered, stat.correct);
  });

  const weakPoints = byTag
    .filter((stat) => stat.answered >= 3 && stat.accuracy < 70)
    .sort((a, b) => b.wrong / b.answered - a.wrong / a.answered || b.wrong - a.wrong)
    .map((stat) => {
      const emptyTypeMap = new Map<QuestionType, { answered: number; correct: number }>();
      const typeStats = Array.from((tagTypeMap.get(stat.name) ?? emptyTypeMap).entries())
        .map(([type, value]) => ({ type, ...makeBucket(typeLabels[type], value.answered, value.correct) }))
        .filter((item) => item.answered > 0)
        .sort((a, b) => b.wrong / b.answered - a.wrong / a.answered || b.wrong - a.wrong);
      const weakestTypeKey = typeStats[0]?.type;
      const multipleHint =
        weakestTypeKey === "multiple" ? " 该标签下多选题错误偏多，答题时要特别检查少选、多选、错选。" : "";
      return {
        ...stat,
        weakestType: typeStats[0]?.name,
        advice: `${adviceForTag(stat.name)}${multipleHint}`
      };
    });

  return {
    answered,
    correct,
    wrong: answered - correct,
    accuracy: percent(correct, answered),
    byTag,
    byDifficulty,
    byType,
    weakPoints
  };
}
