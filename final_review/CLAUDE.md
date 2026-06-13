# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

A multi-subject quiz platform for exam preparation. React + TypeScript + Vite SPA with Chinese/English bilingual questions, localStorage-based progress tracking, and weak-point analysis.

## Commands

All commands run from the `platform/` directory:

```bash
cd platform
npm install          # install dependencies
npm run dev          # start dev server (default http://localhost:5173)
npm run build        # type-check (tsc -b) + production build
npm run preview      # preview production build
```

No test framework or linter is configured.

## Architecture

The project is split into two top-level directories:

### `platform/` — Quiz web app infrastructure

Single-page app with one main component (`platform/src/App.tsx`) — all quiz UI, filtering, shuffling, and state management live here. There is no routing or component splitting.

- `platform/src/types.ts` — `Question`, `QuestionOption`, `Subject`, `QuizProgress`, `UserAnswerRecord`, `LegacyQuestion`. All questions use string-based `id` and `answer: string[]`.
- `platform/src/utils/storage.ts` — per-subject localStorage keys (`quiz-progress-${subjectId}`). Functions: `loadQuizProgress`, `saveQuizProgress`, `applyAnswer`, `resetQuizProgress`.
- `platform/src/utils/grading.ts` — `isAnswerCorrect` does sorted-array strict equality (no partial credit for multi-select).
- `platform/src/utils/stats.ts` — `calculateStats` aggregates by tag, difficulty, and question type; identifies weak points (>=3 attempts and <70% accuracy).
- `platform/src/utils/questionUtils.ts` — legacy question migration (`migrateLegacyQuestion`), true/false option generation (`getRenderableOptions`), display helpers, `rotate` array utility.

### `question-banks/` — All question data

- `question-banks/subjects.ts` — exports `subjects: Subject[]`. Each entry bundles an id, display name, description, and a `Question[]` array imported from its own data file.
- `question-banks/subjects/` — per-subject subdirectories containing question data files.
- `question-banks/AI_QUESTION_BANK_README.md` — bilingual format spec for authoring new questions.

### Data flow

1. `subjects.ts` imports question arrays from each subject's entry file under `subjects/`.
2. `App.tsx` imports `subjects` from `subjects.ts` and renders the quiz UI.
3. Progress is persisted per-subject in localStorage via `storage.ts`.

### Question types supported

- `single` — single choice, `answer` has one element like `["B"]`
- `multiple` — multi-select, all-or-nothing grading
- `true_false` — `options` can be empty array (UI auto-generates true/false buttons), `answer` is `["true"]` or `["false"]`

### Math rendering

Questions use `$...$` delimiters for LaTeX math, rendered via `react-katex` (`InlineMath`). The `TextWithMath` component in `App.tsx` splits text on `$...$` boundaries.

### Legacy data

`question-banks/subjects/electromagnetic-field/em-legacy-specs.ts` (Chinese) and `em-legacy-english-specs.ts` (English) use the old `LegacyQuestion` format (numeric id, numeric answer index). These are consumed by `electromagneticField.ts` via `migrateLegacyQuestion()` in `questionUtils.ts`.

## Adding a New Subject

1. Create `question-banks/subjects/your-subject/yourSubject.ts`, export a `Question[]` array.
2. Register in `question-banks/subjects.ts` with a unique `id` (used as localStorage key, so don't change after users have progress).
3. Follow the bilingual format spec in `question-banks/AI_QUESTION_BANK_README.md` for question authoring rules (ID naming, tags, difficulty levels, explanation quality).

## Key Constraints

- Subject `id` is baked into localStorage keys — changing it loses user progress.
- Question `id` should be stable (format: `subject-prefix-chapter-number`, e.g. `em-01-001`). Changing an id orphans the user's answer record for that question.
- Difficulty values must be exactly `"基础"`, `"中等"`, or `"较难"`.
- Tags use Chinese labels and serve as both filter categories and weak-point analysis buckets.
