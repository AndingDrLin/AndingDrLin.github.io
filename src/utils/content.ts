import { getCollection, type CollectionEntry } from 'astro:content';
import { isReadmeEntry, sortNoteEntries } from './noteTree';

export type ContentKind = 'blog' | 'notes';

export type SiteEntry = CollectionEntry<'blog'> | CollectionEntry<'notes'>;

export type EntryWithKind = {
  entry: SiteEntry;
  kind: ContentKind;
};

function sortByDateDesc<T>(items: T[], getDate: (item: T) => Date): T[] {
  return [...items].sort((a, b) => getDate(b).getTime() - getDate(a).getTime());
}

function isPublished<T extends { data: { draft?: boolean } }>(entry: T) {
  return import.meta.env.PROD ? !entry.data.draft : true;
}

export async function getPublishedCollection(type: 'blog'): Promise<CollectionEntry<'blog'>[]>;
export async function getPublishedCollection(type: 'notes'): Promise<CollectionEntry<'notes'>[]>;
export async function getPublishedCollection(type: ContentKind) {
  const entries = await getCollection(type, isPublished);
  return type === 'notes'
    ? sortNoteEntries(entries as CollectionEntry<'notes'>[])
    : sortByDateDesc(entries, (e) => e.data.date);
}

export async function getLatestEntries(type: ContentKind, count: number) {
  const entries = await getPublishedCollection(type);
  return entries.slice(0, count);
}

export async function getLatestNotes(count: number) {
  const entries = await getCollection('notes', isPublished);

  return sortByDateDesc(
    entries.filter((entry) => !isReadmeEntry(entry)),
    (e) => e.data.date
  ).slice(0, count);
}

export async function getFeedEntries() {
  const [blog, notes] = await Promise.all([
    getPublishedCollection('blog'),
    getPublishedCollection('notes')
  ]);

  return sortByDateDesc(
    [
      ...blog.map((entry) => ({ entry, kind: 'blog' as const })),
      ...notes.map((entry) => ({ entry, kind: 'notes' as const }))
    ],
    (item) => item.entry.data.date
  );
}

export function formatDate(date: Date) {
  return new Intl.DateTimeFormat('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(date);
}
