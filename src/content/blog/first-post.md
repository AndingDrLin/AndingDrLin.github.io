---
title: Building Latent Notes with Astro
description: Why this site starts from a minimal static setup, and what matters for a durable technical writing workflow.
date: 2026-04-26
tags:
  - Astro
  - Blog
  - AI Tools
category: AI Tools
draft: false
---

A personal technical blog works best when the publishing system does not compete with the writing.

For **Latent Notes**, the first priority is a setup that stays readable in two directions:

1. readable for the person reading the essays,
2. readable for the person or agent editing the site later.

## Why Astro

Astro is a good fit for a calm, static blog because it keeps the output simple while still giving us a structured authoring system.

That matters for technical notes. Many posts here will be half research log, half explanation, and they should be easy to revise without touching a backend.

## What the first version optimizes for

The initial version of the site is intentionally modest.

- Content lives in collections.
- Posts and notes are separate on purpose.
- The layout is text-first.
- The site can deploy cleanly to GitHub Pages.

## What comes later

There is plenty of room to add search, richer project pages, or better social cards later.

For now, the important thing is that a new post can be created by adding a single Markdown or MDX file.
