import type { LegacyQuestion, Question, QuestionOption } from "../types";

const optionIds = ["A", "B", "C", "D", "E", "F", "G", "H"];

export function getRenderableOptions(question: Question): QuestionOption[] {
  if (question.type === "true_false" && question.options.length === 0) {
    return [
      { id: "true", textZh: "正确", textEn: "True" },
      { id: "false", textZh: "错误", textEn: "False" }
    ];
  }

  return question.options;
}

export function migrateLegacyQuestion(oldQuestion: LegacyQuestion, englishQuestion?: LegacyQuestion): Question {
  return {
    id: `em-${String(oldQuestion.id).padStart(3, "0")}`,
    type: "single",
    questionZh: oldQuestion.question,
    questionEn: englishQuestion?.question ?? "",
    options: oldQuestion.options.map((text, index) => ({
      id: optionIds[index] ?? `OPT${index + 1}`,
      textZh: text,
      textEn: englishQuestion?.options[index] ?? ""
    })),
    answer: [optionIds[oldQuestion.answer] ?? `OPT${oldQuestion.answer + 1}`],
    explanationZh: oldQuestion.explanation,
    tags: oldQuestion.tags,
    difficulty: oldQuestion.difficulty
  };
}

const answerDisplayMap: Record<string, string> = {
  true: "正确",
  false: "错误",
};

export function formatAnswerIds(answer: string[]) {
  return answer.map((id) => answerDisplayMap[id] ?? id).join("、");
}

export function rotate<T>(items: T[], shift: number) {
  const offset = shift % items.length;
  return [...items.slice(offset), ...items.slice(0, offset)];
}

export function questionTypeLabel(type: Question["type"]) {
  const labels: Record<Question["type"], string> = {
    single: "单选题",
    multiple: "多选题",
    true_false: "判断题"
  };
  return labels[type];
}
