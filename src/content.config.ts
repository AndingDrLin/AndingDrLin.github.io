import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';
import { CATEGORIES } from './consts';

const baseSchema = z.object({
  title: z.string(),
  description: z.string(),
  date: z.coerce.date(),
  updated: z.coerce.date().optional(),
  tags: z.array(z.string()).default([]),
  category: z.enum(CATEGORIES),
  draft: z.boolean().default(false),
  cover: z.string().optional(),
  source: z.string().url().optional()
});

const blog = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/blog' }),
  schema: baseSchema
});

const notes = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/notes' }),
  schema: baseSchema.extend({
    docGroup: z.string().default('general'),
    order: z.number().optional()
  })
});

export const collections = { blog, notes };
