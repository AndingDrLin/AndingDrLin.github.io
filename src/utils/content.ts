import { getCollection, type CollectionEntry } from 'astro:content';

export type EntryWithKind = {
  entry: CollectionEntry<'blog'> | CollectionEntry<'notes'>;
  kind: 'blog' | 'notes';
};

function getEntryDate(entry: { data?: { date: Date }; entry?: { data: { date: Date } } }) {
  return entry.data?.date ?? entry.entry?.data.date;
}

function sortByDateDesc<T extends { data?: { date: Date }; entry?: { data: { date: Date } } }>(entries: T[]) {
  return entries.sort((a, b) => getEntryDate(b)!.getTime() - getEntryDate(a)!.getTime());
}

function isPublished<T extends { data: { draft?: boolean } }>(entry: T) {
  return import.meta.env.PROD ? !entry.data.draft : true;
}

export async function getPublishedCollection(type: 'blog' | 'notes') {
  const entries = await getCollection(type, isPublished);
  return sortByDateDesc(entries);
}

export async function getLatestEntries(type: 'blog' | 'notes', count: number) {
  const entries = await getPublishedCollection(type);
  return entries.slice(0, count);
}

export async function getAllPublishedEntries() {
  const [blog, notes] = await Promise.all([
    getPublishedCollection('blog'),
    getPublishedCollection('notes')
  ]);

  return sortByDateDesc([
    ...blog.map((entry) => ({ entry, kind: 'blog' as const })),
    ...notes.map((entry) => ({ entry, kind: 'notes' as const }))
  ]);
}

export function formatDate(date: Date) {
  return new Intl.DateTimeFormat('en', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  }).format(date);
}
