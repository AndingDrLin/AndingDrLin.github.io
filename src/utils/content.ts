import { getCollection, type CollectionEntry } from 'astro:content';

export type ContentKind = 'blog' | 'notes';

export type SiteEntry = CollectionEntry<'blog'> | CollectionEntry<'notes'>;

export type EntryWithKind = {
  entry: SiteEntry;
  kind: ContentKind;
};

function getEntryDate(entry: { data?: { date: Date }; entry?: { data: { date: Date } } }) {
  return entry.data?.date ?? entry.entry?.data.date;
}

function sortByDateDesc<T extends { data?: { date: Date }; entry?: { data: { date: Date } } }>(entries: T[]) {
  return entries.sort((a, b) => getEntryDate(b)!.getTime() - getEntryDate(a)!.getTime());
}

function sortNotes<T extends CollectionEntry<'notes'>>(entries: T[]) {
  return entries.sort((a, b) => {
    const orderA = a.data.order ?? Number.POSITIVE_INFINITY;
    const orderB = b.data.order ?? Number.POSITIVE_INFINITY;

    if (orderA !== orderB) return orderA - orderB;
    return a.id.localeCompare(b.id);
  });
}

function isPublished<T extends { data: { draft?: boolean } }>(entry: T) {
  return import.meta.env.PROD ? !entry.data.draft : true;
}

export async function getPublishedCollection(type: 'blog'): Promise<CollectionEntry<'blog'>[]>;
export async function getPublishedCollection(type: 'notes'): Promise<CollectionEntry<'notes'>[]>;
export async function getPublishedCollection(type: ContentKind) {
  const entries = await getCollection(type, isPublished);
  return type === 'notes' ? sortNotes(entries as CollectionEntry<'notes'>[]) : sortByDateDesc(entries);
}

export async function getLatestEntries(type: ContentKind, count: number) {
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

export async function getFeedEntries() {
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
  return new Intl.DateTimeFormat('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(date);
}
