import type { Question } from "../types";

export function isAnswerCorrect(question: Question, selectedOptionIds: string[]): boolean {
  const correct = [...question.answer].sort();
  const selected = [...selectedOptionIds].sort();

  if (correct.length !== selected.length) return false;

  return correct.every((id, index) => id === selected[index]);
}
