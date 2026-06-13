import { useEffect, useMemo, useState } from "react";
import { InlineMath } from "react-katex";
import { subjects } from "../../question-banks/subjects";
import type { Difficulty, Question, QuestionMode, Subject } from "./types";
import { isAnswerCorrect } from "./utils/grading";
import { formatAnswerIds, getRenderableOptions, questionTypeLabel } from "./utils/questionUtils";
import { calculateStats } from "./utils/stats";
import { applyAnswer, emptyQuizProgress, loadQuizProgress, resetQuizProgress, saveQuizProgress } from "./utils/storage";

const difficulties: Array<Difficulty | "全部"> = ["全部", "基础", "中等", "较难"];

function shuffleQuestions(list: Question[], seed: number) {
  const copy = [...list];
  let state = seed || 1;
  const random = () => {
    state = (state * 1664525 + 1013904223) % 4294967296;
    return state / 4294967296;
  };
  for (let index = copy.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(random() * (index + 1));
    [copy[index], copy[swapIndex]] = [copy[swapIndex], copy[index]];
  }
  return copy;
}

function TextWithMath({ text }: { text: string }) {
  const parts = text.split(/(\$[^$]+\$)/g);
  return (
    <>
      {parts.map((part, index) => {
        if (part.startsWith("$") && part.endsWith("$")) {
          return <InlineMath key={`${part}-${index}`} math={part.slice(1, -1)} renderError={() => <span>{part}</span>} />;
        }
        return <span key={`${part}-${index}`}>{part}</span>;
      })}
    </>
  );
}

function formatRate(value: number) {
  return `${value}%`;
}

function modeLabel(mode: QuestionMode) {
  if (mode === "wrong") return "错题本未掌握";
  if (mode === "mastered") return "已掌握错题";
  return "全部题目";
}

function getWrongQuestionIds(progress: ReturnType<typeof loadQuizProgress>) {
  return Object.values(progress.answers)
    .filter((record) => record.wrongCount > 0)
    .map((record) => record.questionId);
}

function selectedSubjectFromId(subjectId: string): Subject {
  return subjects.find((subject) => subject.id === subjectId) ?? subjects[0];
}

export default function App() {
  const [subjectId, setSubjectId] = useState(subjects[0].id);
  const subject = selectedSubjectFromId(subjectId);
  const [progress, setProgress] = useState(() => loadQuizProgress(subjects[0].id));
  const [selectedTag, setSelectedTag] = useState("全部");
  const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty | "全部">("全部");
  const [mode, setMode] = useState<QuestionMode>("all");
  const [isShuffled, setIsShuffled] = useState(false);
  const [shuffleSeed, setShuffleSeed] = useState(20260509);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [draftSelection, setDraftSelection] = useState<string[]>([]);
  const [showExplanation, setShowExplanation] = useState(false);
  const [retryingQuestionId, setRetryingQuestionId] = useState<string | null>(null);

  useEffect(() => {
    setProgress(loadQuizProgress(subjectId));
    setSelectedTag("全部");
    setSelectedDifficulty("全部");
    setMode("all");
    setCurrentIndex(0);
    setDraftSelection([]);
    setShowExplanation(false);
    setRetryingQuestionId(null);
  }, [subjectId]);

  useEffect(() => {
    saveQuizProgress(progress);
  }, [progress]);

  const allTags = useMemo(() => {
    return ["全部", ...Array.from(new Set(subject.questions.flatMap((question) => question.tags))).sort((a, b) => a.localeCompare(b, "zh-CN"))];
  }, [subject.questions]);

  const wrongQuestionIds = useMemo(() => getWrongQuestionIds(progress), [progress]);

  const filteredQuestions = useMemo(() => {
    const filtered = subject.questions.filter((question) => {
      const tagMatched = selectedTag === "全部" || question.tags.includes(selectedTag);
      const difficultyMatched = selectedDifficulty === "全部" || question.difficulty === selectedDifficulty;
      const modeMatched =
        mode === "all" ||
        (mode === "wrong" && wrongQuestionIds.includes(question.id) && !progress.masteredWrongQuestionIds.includes(question.id)) ||
        (mode === "mastered" && progress.masteredWrongQuestionIds.includes(question.id));
      return tagMatched && difficultyMatched && modeMatched;
    });
    return isShuffled ? shuffleQuestions(filtered, shuffleSeed) : filtered;
  }, [isShuffled, mode, progress.masteredWrongQuestionIds, selectedDifficulty, selectedTag, shuffleSeed, subject.questions, wrongQuestionIds]);

  useEffect(() => {
    setCurrentIndex(0);
    setDraftSelection([]);
    setShowExplanation(false);
    setRetryingQuestionId(null);
  }, [mode, selectedTag, selectedDifficulty, isShuffled, shuffleSeed]);

  useEffect(() => {
    if (currentIndex >= filteredQuestions.length) {
      setCurrentIndex(Math.max(0, filteredQuestions.length - 1));
    }
  }, [currentIndex, filteredQuestions.length]);

  const stats = useMemo(() => calculateStats(subject.questions, progress), [progress, subject.questions]);
  const currentQuestion = filteredQuestions[currentIndex];
  const currentRecord = currentQuestion ? progress.answers[currentQuestion.id] : undefined;
  const isRetrying = currentQuestion?.id === retryingQuestionId;
  const committedSelection = isRetrying ? undefined : currentRecord?.selectedOptionIds;
  const visibleSelection = committedSelection ?? draftSelection;
  const hasSubmitted = Boolean(committedSelection);
  const shouldReveal = Boolean(hasSubmitted || showExplanation);

  function toggleOption(optionId: string) {
    if (!currentQuestion || (hasSubmitted && !isRetrying)) return;
    if (currentQuestion.type === "multiple") {
      setDraftSelection((previous) => (previous.includes(optionId) ? previous.filter((id) => id !== optionId) : [...previous, optionId]));
    } else {
      setDraftSelection([optionId]);
    }
  }

  function submitAnswer() {
    if (!currentQuestion || draftSelection.length === 0) return;
    const correct = isAnswerCorrect(currentQuestion, draftSelection);
    setProgress((previous) =>
      applyAnswer(previous, {
        questionId: currentQuestion.id,
        selectedOptionIds: draftSelection,
        isCorrect: correct,
        answeredAt: new Date().toISOString()
      })
    );
    setRetryingQuestionId(null);
    setShowExplanation(true);
  }

  function nextQuestion() {
    setCurrentIndex((index) => Math.min(index + 1, filteredQuestions.length - 1));
    setDraftSelection([]);
    setShowExplanation(false);
    setRetryingQuestionId(null);
  }

  function previousQuestion() {
    setCurrentIndex((index) => Math.max(index - 1, 0));
    setDraftSelection([]);
    setShowExplanation(false);
    setRetryingQuestionId(null);
  }

  function resetAllRecords() {
    if (!window.confirm(`确定要清空「${subject.nameZh}」的答题记录、错题和已掌握状态吗？`)) return;
    resetQuizProgress(subject.id);
    setProgress(emptyQuizProgress(subject.id));
    setCurrentIndex(0);
    setDraftSelection([]);
    setShowExplanation(false);
    setRetryingQuestionId(null);
  }

  function startRetry() {
    if (!currentQuestion) return;
    setRetryingQuestionId(currentQuestion.id);
    setDraftSelection([]);
    setShowExplanation(false);
  }

  const renderableOptions = currentQuestion ? getRenderableOptions(currentQuestion) : [];

  return (
    <main className="app-shell">
      <header className="hero">
        <div>
          <p className="eyebrow">多学科通用自测平台</p>
          <h1>{subject.nameZh}刷题自测</h1>
          <p className="subtitle">
            {subject.description} 当前学科共 {subject.questions.length} 道题，覆盖 {allTags.length - 1} 个知识点标签。当前筛选：
            {modeLabel(mode)}，{filteredQuestions.length} 道。
          </p>
        </div>
        <div className="summary-card">
          <span>已答 {stats.answered}</span>
          <strong>{formatRate(stats.accuracy)}</strong>
          <small>
            正确 {stats.correct} / 错误 {stats.wrong}
          </small>
        </div>
      </header>

      <div className="layout">
        <aside className="panel controls">
          <h2>筛选与模式</h2>
          <label>
            学科
            <select value={subjectId} onChange={(event) => setSubjectId(event.target.value)}>
              {subjects.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.nameZh} / {item.nameEn}
                </option>
              ))}
            </select>
          </label>
          <label>
            知识点标签
            <select value={selectedTag} onChange={(event) => setSelectedTag(event.target.value)}>
              {allTags.map((tag) => (
                <option key={tag} value={tag}>
                  {tag}
                </option>
              ))}
            </select>
          </label>
          <label>
            难度
            <select value={selectedDifficulty} onChange={(event) => setSelectedDifficulty(event.target.value as Difficulty | "全部")}>
              {difficulties.map((difficulty) => (
                <option key={difficulty} value={difficulty}>
                  {difficulty}
                </option>
              ))}
            </select>
          </label>
          <label>
            练习模式
            <select value={mode} onChange={(event) => setMode(event.target.value as QuestionMode)}>
              <option value="all">全部题目</option>
              <option value="wrong">错题本未掌握</option>
              <option value="mastered">已掌握错题</option>
            </select>
          </label>
          <label className="checkbox-row">
            <input type="checkbox" checked={isShuffled} onChange={(event) => setIsShuffled(event.target.checked)} />
            随机打乱题目顺序
          </label>
          <button className="secondary" type="button" onClick={() => setShuffleSeed(Date.now())}>
            重新随机
          </button>
          <button className="danger" type="button" onClick={resetAllRecords}>
            重置当前学科记录
          </button>
        </aside>

        <section className="panel quiz-card">
          {!currentQuestion ? (
            <div className="empty-state">
              <h2>当前筛选下没有题目</h2>
              <p>可以切回全部题目，或调整标签、难度、错题模式。</p>
            </div>
          ) : (
            <>
              <div className="question-topline">
                <span>
                  第 {currentIndex + 1} / {filteredQuestions.length} 题
                </span>
                <span>题库 ID #{currentQuestion.id}</span>
              </div>

              <div className="meta-row">
                <span className="tag type-tag">题型：{questionTypeLabel(currentQuestion.type)}</span>
                <span className={`difficulty difficulty-${currentQuestion.difficulty}`}>{currentQuestion.difficulty}</span>
                {currentQuestion.tags.map((tag) => (
                  <span className="tag" key={tag}>
                    {tag}
                  </span>
                ))}
                {wrongQuestionIds.includes(currentQuestion.id) && <span className="tag warning">错题本</span>}
                {progress.masteredWrongQuestionIds.includes(currentQuestion.id) && <span className="tag success">已掌握</span>}
              </div>

              {currentQuestion.type === "multiple" && <p className="question-hint">本题为多选题，少选、错选、多选均不得分。</p>}

              <div className="question-text">
                <h2>
                  <TextWithMath text={currentQuestion.questionZh} />
                </h2>
                <p>
                  <TextWithMath text={currentQuestion.questionEn} />
                </p>
              </div>

              <div className="options">
                {renderableOptions.map((option) => {
                  const isCorrect = currentQuestion.answer.includes(option.id);
                  const isSelected = visibleSelection.includes(option.id);
                  const className = shouldReveal
                    ? isCorrect
                      ? "option correct"
                      : isSelected
                        ? "option wrong"
                        : "option muted"
                    : isSelected
                      ? "option selected"
                      : "option";

                  return (
                    <button
                      key={option.id}
                      className={className}
                      type="button"
                      disabled={hasSubmitted && !isRetrying}
                      onClick={() => toggleOption(option.id)}
                    >
                      <span className="option-letter">{currentQuestion.type === "multiple" ? (isSelected ? "✓" : "□") : option.id}</span>
                      <span className="option-copy">
                        <strong>
                          {option.id}. <TextWithMath text={option.textZh} />
                        </strong>
                        <small>
                          <TextWithMath text={option.textEn} />
                        </small>
                      </span>
                    </button>
                  );
                })}
              </div>

              {hasSubmitted && (
                <div className={currentRecord?.isCorrect ? "result correct-text" : "result wrong-text"}>
                  {currentRecord?.isCorrect ? "回答正确" : `回答错误，正确答案：${formatAnswerIds(currentQuestion.answer)}`}
                  <span className="answer-detail">你的选择：{formatAnswerIds(committedSelection ?? []) || "未选择"}</span>
                </div>
              )}

              <div className="actions">
                <button className="secondary" type="button" onClick={previousQuestion} disabled={currentIndex === 0}>
                  上一题
                </button>
                {!shouldReveal && (
                  <button className="secondary" type="button" onClick={() => setShowExplanation(true)}>
                    查看解析
                  </button>
                )}
                {hasSubmitted && (
                  <button className="secondary" type="button" onClick={startRetry}>
                    重新作答
                  </button>
                )}
                <button className="primary" type="button" onClick={submitAnswer} disabled={draftSelection.length === 0 || (hasSubmitted && !isRetrying)}>
                  提交答案
                </button>
                <button className="primary ghost" type="button" onClick={nextQuestion} disabled={currentIndex >= filteredQuestions.length - 1}>
                  下一题
                </button>
              </div>

              {shouldReveal && (
                <article className="explanation">
                  <h3>解析</h3>
                  <p>
                    <TextWithMath text={currentQuestion.explanationZh} />
                  </p>
                </article>
              )}
            </>
          )}
        </section>

        <aside className="panel stats">
          <h2>统计</h2>
          <div className="stat-grid">
            <div>
              <strong>{stats.answered}</strong>
              <span>已答</span>
            </div>
            <div>
              <strong>{stats.correct}</strong>
              <span>正确</span>
            </div>
            <div>
              <strong>{stats.wrong}</strong>
              <span>错误</span>
            </div>
            <div>
              <strong>{formatRate(stats.accuracy)}</strong>
              <span>正确率</span>
            </div>
          </div>

          <h3>题型正确率</h3>
          <div className="mini-list">
            {stats.byType.map((stat) => (
              <div key={stat.name}>
                <span>{stat.name}</span>
                <b>
                  {stat.answered} 题 / {formatRate(stat.accuracy)}
                </b>
              </div>
            ))}
          </div>

          <h3>难度正确率</h3>
          <div className="mini-list">
            {stats.byDifficulty.map((stat) => (
              <div key={stat.name}>
                <span>{stat.name}</span>
                <b>
                  {stat.answered} 题 / {formatRate(stat.accuracy)}
                </b>
              </div>
            ))}
          </div>

          <h3>标签正确率</h3>
          <div className="mini-list scroll">
            {stats.byTag.length === 0 && <p className="muted-text">答题后显示各知识点正确率。</p>}
            {stats.byTag.map((stat) => (
              <div key={stat.name}>
                <span>{stat.name}</span>
                <b>
                  {stat.correct}/{stat.answered} · {formatRate(stat.accuracy)}
                </b>
              </div>
            ))}
          </div>

          <h3>薄弱点总结</h3>
          <div className="weak-list">
            {stats.weakPoints.length === 0 && <p className="muted-text">同一标签答题 ≥3 且正确率低于 70% 后会自动显示。</p>}
            {stats.weakPoints.map((point) => (
              <article key={point.name}>
                <strong>{point.name}</strong>
                <span>
                  已答 {point.answered}，错 {point.wrong}，正确率 {formatRate(point.accuracy)}
                </span>
                {point.weakestType && <span>主要错误题型：{point.weakestType}</span>}
                <p>{point.advice}</p>
              </article>
            ))}
          </div>
        </aside>
      </div>
    </main>
  );
}
