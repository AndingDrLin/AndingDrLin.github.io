# Latent Note

一处存放笔记、想法与未完成答案的隐空间。记录 AI、3D 视觉与工具背后，那些仍在生长的想法。

## Stack

- **Framework:** [Astro 6](https://astro.build/) with TypeScript strict mode
- **Content:** Astro Content Collections (Markdown + MDX)
- **Math:** KaTeX via `remark-math` + `rehype-katex`
- **Diagrams:** Mermaid (client-side CDN, triggered by ` ```mermaid ``` ` code blocks)
- **Search:** [Pagefind](https://pagefind.app/) with `--force-language zh` for Chinese tokenization
- **Quiz:** React 19 (`client:only="react"`) — the only client-side interactive component
- **Deployment:** GitHub Pages via GitHub Actions

## Development

```bash
npm install          # install dependencies
npm run dev          # start dev server
npm run build        # production build + Pagefind search index
npm run preview      # preview production build locally
```

Node >= 22 required. No lint/test/format tooling is configured.

## Content authoring

Content lives in two Astro Content Collections:

| Collection | Directory | Purpose |
|---|---|---|
| `blog` | `src/content/blog/` | Longer posts |
| `notes` | `src/content/notes/` | Course notes, tutorials, shorter records |

### Adding a new course

1. Add an entry to `NOTE_COURSES` in `src/consts.ts` — the dict key is the `docGroup`, the `slug` field becomes the URL path
2. Create `src/content/notes/{docGroup}/README.md` with `order: -1`
3. Add chapter `.md` files with sequential `order` values
4. Use `templates/docs-template.md` as a starting point

### Adding a blog post

Copy `templates/blog-template.md` into `src/content/blog/`, fill in frontmatter, set `draft: false` when ready.

### Frontmatter reference

```yaml
---
title: Required title
description: Required short summary (used in cards and SEO)
date: 2026-06-15          # required
updated: 2026-06-16       # optional
tags: [tag1, tag2]        # optional, defaults to []
category: "课程学习"       # required, see allowed values below
docGroup: dsp-notes       # notes only — maps to NOTE_COURSES key
order: 1                  # notes only — lower = earlier in listings
draft: false              # hidden in production when true
cover: /path/to/image.png # optional
source: https://example.com # optional, must be valid URL
---
```

**Allowed categories:** `AI Tools`, `3D Vision`, `Agents`, `Research Notes`, `Essays`, `Tutorials`, `课程学习`

### LaTeX math

Inline: `$E = mc^2$`

Display:

```
$$
\int_{-\infty}^{\infty} e^{-x^2} dx = \sqrt{\pi}
$$
```

## Project structure

```
src/
├── pages/           # route entrypoints
├── layouts/         # BaseLayout, PostLayout
├── components/      # Header, Footer, PostCard, Search, NoteDirectoryList, quiz/
├── content/         # blog/ and notes/ collections
├── content.config.ts # collection schemas (glob loader)
├── consts.ts        # NOTE_COURSES, CATEGORIES, NAV_LINKS, all site text
├── utils/
│   ├── content.ts   # getPublishedCollection, formatDate, readingTime
│   ├── noteTree.ts  # directory tree logic for nested course notes
│   └── readingTime.ts # bilingual WPM/CPM estimation
├── data/
│   └── question-banks/ # quiz question banks (TypeScript)
└── styles/
    └── global.css   # plain CSS, custom properties, dark mode
templates/           # starter templates for new content
```

## Key design decisions

- **No `base` path.** This is a GitHub Pages user site (`andingdrlin.github.io`), not a project site.
- **`docGroup` links content to routing.** The dict key in `NOTE_COURSES` is not the URL slug — the `slug` field inside each entry is.
- **README files are hidden.** Notes named `readme.md` (case-insensitive) are filtered from listings but provide course descriptions.
- **Plain CSS only.** No component library, no utility framework, no preprocessor. All styles in `src/styles/global.css`.
- **Content source files stay out of the repo.** Working documents, extracted text, and raw materials should not be committed.

## Search

Click the search button in the header, or press `Cmd+K` (Mac) / `Ctrl+K` (Windows/Linux). Supports Chinese and English with fuzzy matching.

## Deployment

GitHub Actions workflow: `.github/workflows/deploy.yml` — triggers on push to `main`.

Repository settings: **Pages source** must be **GitHub Actions** (not "Deploy from a branch").
