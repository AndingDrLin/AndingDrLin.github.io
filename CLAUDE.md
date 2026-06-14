# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development commands

- `npm install` — install dependencies
- `npm run dev` — start the Astro dev server
- `npm run build` — production build + Pagefind search index (`astro build && npx pagefind --site dist --force-language zh`)
- `npm run preview` — preview the production build locally

There are **no lint, test, or format commands** configured. TypeScript strict mode is enabled via `tsconfig.json`.

## Architecture overview

This repository is a static Astro site for **Latent Note** (隐空间) deployed to GitHub Pages as a user-site repo. The production URL is `https://andingdrlin.github.io/` — there is **no `base` path**.

### Content collections

Two collections in `src/content.config.ts` using Astro v2 `glob` loader:

- `src/content/blog/` — longer posts
- `src/content/notes/` — course notes, tutorials, and shorter records

Both share a `baseSchema` (title, description, date, updated, tags, category, draft, cover, source). Notes extend it with `docGroup` (string) and `order` (optional number).

Allowed `category` values (enum in `src/consts.ts`): `AI Tools`, `3D Vision`, `Agents`, `Research Notes`, `Essays`, `Tutorials`, `课程学习`.

### Routing — the `docGroup` link

`docGroup` is the critical link between content and routing. Each note's `docGroup` must map to an entry in `NOTE_COURSES` or `NOTE_TUTORIALS` in `src/consts.ts`. **The dict key (e.g. `'dsp-notes'`) is NOT the URL slug** — the `slug` field inside each entry (e.g. `'digital-signal-processing'`) is what appears in URLs.

| Route | File | Notes |
|---|---|---|
| `/notes/` | `notes/index.astro` | Hub page with course + tutorial cards |
| `/notes/[course]/` | `notes/[course]/index.astro` | Course landing, uses `NoteDirectoryList` |
| `/notes/[course]/[...slug]/` | `notes/[course]/[...slug].astro` | **Both** article pages **and** nested directory pages in one route. Checks `'directoryPrefix' in props` to decide rendering mode |
| `/notes/tutorial/[tutorial]/[...slug]/` | mirrors course routing | For tutorials |
| `/notes/[slug]/` | `notes/[...slug].astro` | Standalone notes not in any course/tutorial |
| `/notes/quiz/` | `notes/quiz.astro` | React quiz app (`client:only="react"`) |

**README convention**: Notes named `readme.md` (case-insensitive) are filtered from all listings and directory views. Their `description` is used as the course landing page fallback description.

### Adding a new course

1. Add entry to `NOTE_COURSES` in `src/consts.ts`
2. Create directory `src/content/notes/{docGroup-key}/`
3. Add `README.md` with `order: -1` and the same `docGroup` value
4. Add chapter `.md` files with sequential `order` values

### Layouts and components

- `BaseLayout.astro` — root layout: lang, CSS, KaTeX, Mermaid CDN loader, theme flash prevention, Header + Footer + SEO
- `PostLayout.astro` — article shell: eyebrow, h1, meta (date/readingTime/category/updated/source), TOC, content slot
- `PostCard.astro` — article card with complex URL-resolution logic for courses, tutorials, and standalone notes
- `NoteDirectoryList.astro` — renders directory cards + note cards for a course page
- `Search.astro` — Pagefind search dialog with `Cmd+K` shortcut

### Styling

Plain CSS in `src/styles/global.css`. CSS custom properties for theming (`--bg`, `--text`, `--accent`, etc.). Dark mode via `:root[data-theme='dark']`. No framework or utility classes.

### Quiz system (React, client-only)

The only React usage. Lives at `/notes/quiz/`. Question banks are in `src/data/question-banks/` as TypeScript files. All state is in `localStorage`. Math uses `$...$` rendered via `react-katex`.

### Utility functions (`src/utils/`)

- `content.ts` — `getPublishedCollection()`, `getLatestNotes()`, `formatDate()`, etc.
- `noteTree.ts` — directory tree logic: `getNoteSlug()`, `getNoteDirectoryListing()`, `getNoteBreadcrumbs()`
- `readingTime.ts` — bilingual: 220 WPM English, 500 CPM Chinese. Returns `{minutes, text}`

### Markdown pipeline

`remark-math` → custom `remarkMermaid` (converts to `<pre class="mermaid">`) → `rehype-katex`. Mermaid renders client-side from CDN only if `.mermaid` elements exist. Shiki uses `github-light` / `github-dark` dual themes.

## Pitfalls — read before editing

1. **`docGroup` key ≠ URL slug.** `'dsp-notes'` is the key, `'digital-signal-processing'` is the slug. Confusing them breaks links.
2. **`getNoteSlug()` assumes the first path segment is the docGroup.** `entry.id.replace(/^[^/]+\//, '')`. Do not add content files with different nesting conventions.
3. **`PostCard` link logic is intricate.** It checks README status, course membership, and tutorial membership. Changes to routing structure must be reflected here.
4. **`getPublishedCollection('notes')` includes READMEs; `getLatestNotes()` does not.** Choose the right one for your page.
5. **`notes/[...slug].astro` only handles notes NOT in any course or tutorial.** It explicitly filters out entries whose `docGroup` matches a registered key.
6. **`unist-util-visit` is imported in `astro.config.mjs` but not in `package.json`.** It works as a transitive dep of remark. If you add direct usage, add it to `package.json`.
7. **Pagefind runs as a post-build step**, not an Astro integration. If `astro build` fails, the search index will be stale.
8. **No scheduled publishing.** The `isPublished` check only looks at `draft`, not `date`.
9. **Do not commit source artifacts or working documents to content directories.** Development notes, extracted text files, review logs, and raw source material belong outside the repo or in a private location — they bloat the build and may expose internal data. Use `draft: true` only for genuinely unfinished content, not for staging files.
10. **Quiz progress is localStorage-only.** Clearing browser data loses it. There is no export/import.

## Deployment

- GitHub Actions workflow: `.github/workflows/deploy.yml`
- Triggers on push to `main` or manual dispatch
- Node 22, `npm ci` → `npm run build` (includes Pagefind) → upload to GitHub Pages
- GitHub Pages must be configured to deploy from **GitHub Actions** (not branch)

## Writing style for Latent Note

Content is written in Chinese. The following rules apply to all blog posts, notes, and any other long-form writing in this repo.

### Overall tone

Articles should read like sober, clear-eyed, experiment-driven research notes — not viral posts, marketing copy, course slides, or translated papers. The author is not an omniscient expert but someone doing concrete research/project work. Write for "future me and peers in the same field." Tone is natural but never greasy; judgmental but never pretentious; reflective but never preachy.

### Five core principles

1. **Start with a concrete problem, never a grand opening.** Ban openings like "With the rapid development of AI, computer vision is profoundly changing the world..." An opening must answer: What am I working on? What specific problem did I hit? Why is it worth writing about?

2. **Every article must have a clear central judgment.** Do not just stack materials. The judgment can be conservative, but it must exist.

3. **Acknowledge boundaries; don't pretend to fully understand.** Allowed: "My current understanding is...", "I'm not sure about this yet.", "This conclusion only applies to my current experimental setup." Banned: "It is obvious that...", "This fully proves...", "This comprehensively and systematically reveals..."

4. **Write with an experimental sensibility.** A good sentence includes: observed phenomenon, conditions, possible cause, next verification step.

5. **Write "limitations," not "significance."** Write "The biggest limitation of this method right now is...", "This experiment cannot prove...", "This result only supports a weak conclusion..." Avoid empty statements like "This provides important reference for future research."

### Recommended article structures

- **Research reflection** (pitfalls, failed experiments, direction judgment): Where the problem came from → What I initially thought → What the real problem turned out to be → What conclusions the evidence supports → What conclusions it does NOT support → Next 2–4 concrete actions.
- **Paper/direction reading** (paper reviews, surveys, technical route assessment): What problem it solves → Why it matters now → Core method → What I find genuinely valuable → What I disagree with or don't yet understand → How it informs my own project.
- **Technical decision** (internship choices, method selection, open-source strategy): Define the goal → List options → Analyze payoff and cost of each → State the current-stage choice → Specify what conditions would change that choice.

### Paragraph and language style

One idea per paragraph, roughly 3–6 lines. Every few paragraphs, drop a clear judgment line (e.g., "So my current judgment: this problem should no longer be solved by tuning hyperparameters.").

Allowed register: casual-but-sober expressions like "说白了...", "更现实的问题是...", "我之前忽略的一点是...", "这听起来像废话，但在实际做实验时很重要."

Banned register: 赋能, 打造, 深度融合, 闭环生态, 显著提升, 具有重要意义, 为未来研究提供新思路, 在当今快速发展的时代背景下, and similar bureaucratic/clickbait phrases.

### Hard bans on AI writing patterns

- No grand narrative openings
- No exaggeration without evidence
- No ending every section with "具有重要意义" or equivalent
- No writing in standard paper-abstract style
- No pretending the author fully understands everything
- No piling up "首先，其次，最后" without real logic
- No overly neat parallel sentence structures
- No padding paragraphs just to appear comprehensive

### Self-check before publishing

Does this article have a concrete problem? A clear judgment? Evidence from experiments, papers, code, or experience? Stated uncertainties? Deleted filler? After reading, does the reader know what to do next? If any answer is no, rewrite.
