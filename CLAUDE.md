# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development commands

- `npm install` — install dependencies
- `npm run dev` — start the Astro dev server
- `npm run build` — create the production build in `dist/`
- `npm run preview` — preview the production build locally

## Architecture overview

- This repository is a static Astro blog for **Latent Note** deployed to GitHub Pages as a user-site repo.
- The production site URL is `https://andingdrlin.github.io/`, so Astro should use that `site` value and should not use a project-site `base` path unless the deployment target changes.
- Content is organized with Astro Content Collections in two parallel authoring streams:
  - `src/content/blog/` for longer posts
  - `src/content/notes/` for course notes and shorter records
- Collection schemas and loaders live in `src/content.config.ts`. New writing should usually be added by creating a Markdown or MDX file in one of the content directories rather than editing route code.
- Route entrypoints live in `src/pages/` and are intentionally simple. Shared behavior should usually go into:
  - `src/layouts/` for page/article structure
  - `src/components/` for reusable UI pieces
  - `src/utils/` for content sorting, date formatting, reading time, and tag helpers
- `src/layouts/PostLayout.astro` is the main reading experience shell for blog posts and notes. It handles metadata display, tags, and optional table-of-contents rendering.
- Styling is centralized in `src/styles/global.css` with plain CSS rather than a component library or utility framework. Keep the design minimal, text-first, and easy to modify.
- SEO metadata is centralized through `src/components/SEO.astro`, and RSS/sitemap generation are part of the Astro build.

## Deployment notes

- GitHub Actions workflow: `.github/workflows/deploy.yml`
- GitHub Pages should be configured to deploy from **GitHub Actions**.
- CI currently uses Node 22 to match the Astro 6 toolchain in this repo.

## Writing style for Latent Note

Content is written in Chinese. The following rules apply to all blog posts (`src/content/blog/`), notes (`src/content/notes/`), and any other long-form writing in this repo.

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
