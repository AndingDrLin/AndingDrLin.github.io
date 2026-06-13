export type Difficulty = "基础" | "中等" | "较难";
export type QuestionType = "single" | "multiple" | "true_false";

export interface Question {
  id: string;
  type: QuestionType;
  questionZh: string;
  questionEn: string;
  options: QuestionOption[];
  answer: string[];
  explanationZh: string;
  tags: string[];
  difficulty: Difficulty;
}

export interface QuestionOption {
  id: string;
  textZh: string;
  textEn: string;
}

export interface Subject {
  id: string;
  nameZh: string;
  nameEn: string;
  description: string;
  questions: Question[];
}

export interface UserAnswerRecord {
  questionId: string;
  selectedOptionIds: string[];
  isCorrect: boolean;
  answeredAt: string;
  attemptCount: number;
  wrongCount: number;
}

export interface QuizProgress {
  subjectId: string;
  answers: Record<string, UserAnswerRecord>;
  masteredWrongQuestionIds: string[];
  updatedAt: string;
}

export interface LegacyQuestion {
  id: number;
  question: string;
  options: string[];
  answer: number;
  explanation: string;
  tags: string[];
  difficulty: Difficulty;
}

export type QuestionMode = "all" | "wrong" | "mastered";
