import type { EntryWithKind } from './content';

export function slugifyTag(tag: string) {
  return tag
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function collectTags(entries: EntryWithKind[]) {
  const map = new Map<string, { label: string; count: number }>();

  for (const { entry } of entries) {
    for (const tag of entry.data.tags) {
      const slug = slugifyTag(tag);
      const existing = map.get(slug);

      if (existing) {
        existing.count += 1;
      } else {
        map.set(slug, { label: tag, count: 1 });
      }
    }
  }

  return [...map.entries()]
    .map(([slug, value]) => ({ slug, ...value }))
    .sort((a, b) => a.label.localeCompare(b.label));
}
