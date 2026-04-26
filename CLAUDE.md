# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development commands

- `npm install` — install dependencies
- `npm run dev` — start the Astro dev server
- `npm run build` — create the production build in `dist/`
- `npm run preview` — preview the production build locally

## Architecture overview

- This repository is a static Astro blog for **Latent Notes** deployed to GitHub Pages as a user-site repo.
- The production site URL is `https://yujialin-523.github.io/`, so Astro should use that `site` value and should not use a project-site `base` path unless the deployment target changes.
- Content is organized with Astro Content Collections in two parallel authoring streams:
  - `src/content/blog/` for longer posts
  - `src/content/notes/` for shorter notes
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
