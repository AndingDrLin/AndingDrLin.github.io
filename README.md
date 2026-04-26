# Latent Notes

Latent Notes is a minimal Astro blog for technical writing about AI, 3D vision, tools, agents, research reproduction, and short technical essays.

## Stack

- Astro 6
- TypeScript
- Astro Content Collections
- Markdown and MDX
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

Create a production build:

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
- `src/content/notes/` for shorter notes

Create a new `.md` or `.mdx` file in one of those folders with this frontmatter shape:

```yaml
---
title: Example title
description: Short summary
date: 2026-04-26
updated: 2026-04-27 # optional
tags:
  - Example
category: AI Tools
draft: false
cover: /path/to/image.png # optional
source: https://example.com # optional
---
```

Allowed categories:

- `AI Tools`
- `3D Vision`
- `Agents`
- `Research Notes`
- `Essays`
- `Tutorials`

Draft entries are hidden in production builds.

## Deployment

This repository is set up as a GitHub Pages **user site** repository, so the production URL is expected to be:

- `https://yujialin-523.github.io/`

Deployment is handled by GitHub Actions using `.github/workflows/deploy.yml`.

Repository settings should use:

- **Pages source:** GitHub Actions

## Structure

Important directories:

- `src/pages/` route entrypoints
- `src/layouts/` shared page and article layouts
- `src/components/` navigation, metadata, tags, and shared UI pieces
- `src/content/` post and note content
- `src/content.config.ts` collection schema and loaders
- `src/utils/` content sorting, tag handling, and reading time helpers
