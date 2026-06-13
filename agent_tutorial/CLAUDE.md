# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

An AI Agent tutorial (Chinese-language) targeting beginners with Python/ML basics. 11 Markdown chapters (00–10) with companion Python code files, exercises, and solutions. The content will be migrated to an Astro site (`AndingDrLin.github.io`) using MDX + Shiki + remark-math/rehype-katex.

## Writing Conventions for Markdown Files

Every `.md` file must have YAML frontmatter matching the Astro `notes` collection schema:

```yaml
---
title: "章节标题"
description: "一句话描述"
date: 2026-06-13
tags: [agent, LLM, tutorial]
category: "Tutorials"
docGroup: "agent-tutorial"
order: 1        # -1 for README, 0–10 for chapters
draft: false
---
```

- Code blocks must specify language (`python`, `bash`, `json`, `mermaid`, `text`)
- Inline math: `$...$`, block math: `$$...$$` (standard LaTeX)
- Internal links use relative paths: `[text](./02-prompt-engineering.md)`
- Images use relative paths: `./assets/images/xxx.png`
- Use blockquote callouts for tips/warnings: `> **关键理解**：...`
- Each chapter follows the "sandwich" structure: scene intro → minimal runnable code → theory → code walkthrough → 3 exercises (basic/advanced/challenge) → 3–5 FAQ items

## Code File Conventions

- Each `.py` file must be independently runnable (`python code/XX-name/file.py`)
- Each file includes a docstring listing required dependencies
- All files use `python-dotenv` to load `OPENAI_API_KEY` from `.env`
- Exercises in `exercises/` have `TODO` stubs; answers in `solutions/` are complete
- Chinese comments/docstrings throughout (matches target audience)

## Environment

- Python 3.10+, virtual env via `python -m venv .venv`
- Install: `pip install -r requirements.txt` (or per-chapter subset)
- API key: copy `.env.example` to `.env`, fill in `OPENAI_API_KEY`

## Key Chapter Dependencies

Chapter 5 (Agent Loop / ReAct from scratch) is the core chapter. Chapters 3 (RAG) and 4 (Tool Use) are prerequisites for 5. Chapter 6 (LangGraph) reimplements Ch5 with a framework. Ch7–10 build on the agent foundation.
