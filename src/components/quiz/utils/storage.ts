import type { QuizProgress, UserAnswerRecord } from "../types";

function storageKey(subjectId: string) {
  return `quiz-progress-${subjectId}`;
}

export const emptyQuizProgress = (subjectId: string): QuizProgress => ({
  subjectId,
  answers: {},
  masteredWrongQuestionIds: [],
  updatedAt: new Date().toISOString()
});

export function loadQuizProgress(subjectId: string): QuizProgress {
  try {
    const raw = localStorage.getItem(storageKey(subjectId));
    if (!raw) return emptyQuizProgress(subjectId);
    const parsed = JSON.parse(raw) as Partial<QuizProgress>;
    return {
      subjectId,
      answers: parsed.answers ?? {},
      masteredWrongQuestionIds: parsed.masteredWrongQuestionIds ?? [],
      updatedAt: parsed.updatedAt ?? new Date().toISOString()
    };
  } catch {
    return emptyQuizProgress(subjectId);
  }
}

export function saveQuizProgress(progress: QuizProgress) {
  localStorage.setItem(storageKey(progress.subjectId), JSON.stringify(progress));
}

export function resetQuizProgress(subjectId: string) {
  localStorage.removeItem(storageKey(subjectId));
}

function unique(ids: string[]) {
  return Array.from(new Set(ids));
}

export function applyAnswer(progress: QuizProgress, record: Omit<UserAnswerRecord, "attemptCount" | "wrongCount">): QuizProgress {
  const previous = progress.answers[record.questionId];
  const attemptCount = (previous?.attemptCount ?? 0) + 1;
  const wrongCount = (previous?.wrongCount ?? 0) + (record.isCorrect ? 0 : 1);

  const masteredWrongQuestionIds =
    record.isCorrect && wrongCount > 0
      ? unique([...progress.masteredWrongQuestionIds, record.questionId])
      : progress.masteredWrongQuestionIds.filter((id) => id !== record.questionId);

  return {
    subjectId: progress.subjectId,
    answers: {
      ...progress.answers,
      [record.questionId]: {
        ...record,
        attemptCount,
        wrongCount
      }
    },
    masteredWrongQuestionIds,
    updatedAt: new Date().toISOString()
  };
}
