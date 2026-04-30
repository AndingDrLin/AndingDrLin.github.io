# Latent Note

一处存放笔记、想法与未完成答案的隐空间。记录 AI、3D 视觉与工具背后，那些仍在生长的想法。

## Stack

- Astro 6
- TypeScript
- Astro Content Collections
- Markdown and MDX
- KaTeX for LaTeX math rendering
- Pagefind for full-text search
- Static output for GitHub Pages

## Development

Install dependencies:

```bash
npm install
```

Start the local dev server:

```bash
npm run dev
```

Create a production build (includes Pagefind search index):

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

## Content authoring

Content lives in Astro Content Collections:

- `src/content/blog/` for longer posts
- `src/content/notes/` for course notes and shorter records

### Adding new content

Use the templates in `templates/` as a starting point:

1. Copy the appropriate template:
   - `templates/blog-template.md` for blog posts
   - `templates/note-template.md` for short notes
   - `templates/docs-template.md` for course notes

2. Move it into the correct content directory

3. Fill in the frontmatter and write your content

4. Set `draft: false` when ready to publish

All site-facing text is centralized in `src/consts.ts` for easy customization.

### Frontmatter schema

```yaml
---
title: Example title
description: Short summary
date: 2026-04-30
updated: 2026-05-01 # optional
tags:
  - Example
category: AI Tools
draft: false
docGroup: dsp-notes # docs collection only
order: 1 # docs collection only, optional
cover: /path/to/image.png # optional
source: https://example.com # optional
---
```

Allowed categories: `AI Tools`, `3D Vision`, `Agents`, `Research Notes`, `Essays`, `Tutorials`, `课程学习`

Draft entries are hidden in production builds.

### LaTeX math support

Inline math and display math are supported via KaTeX:

- Inline: `$E = mc^2$`
- Display:

```
$$
\int_{-\infty}^{\infty} e^{-x^2} dx = \sqrt{\pi}
$$
```

## Search

The site includes full-text search powered by Pagefind:

- Click the search button in the header, or press `Cmd+K` (Mac) / `Ctrl+K` (Windows/Linux)
- Supports Chinese and English content with fuzzy matching
- Results show highlighted matching excerpts

Search is built automatically during `npm run build`.

## Deployment

This repository is a GitHub Pages **user site** repository, production URL:

- `https://andingdrlin.github.io/`

Deployment is handled by GitHub Actions using `.github/workflows/deploy.yml`.

Repository settings should use **Pages source:** GitHub Actions.

## Structure

- `src/pages/` — route entrypoints
- `src/layouts/` — shared page and article layouts
- `src/components/` — navigation, search, metadata, and shared UI pieces
- `src/content/` — post, note, and docs content
- `src/content.config.ts` — collection schema and loaders
- `src/consts.ts` — site title, navigation, and all user-facing text
- `src/utils/` — content sorting, date formatting, and reading time helpers
- `templates/` — starter templates for new content
