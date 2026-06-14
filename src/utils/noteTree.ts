import type { CollectionEntry } from 'astro:content';

export type NoteDirectory = {
  name: string;
  path: string;
  title: string;
  count: number;
};

export type NoteBreadcrumb = {
  title: string;
  path: string;
};

function trimSlashes(value: string) {
  return value.replace(/^\/+|\/+$/g, '');
}

function sortNoteEntries(entries: CollectionEntry<'notes'>[]) {
  return [...entries].sort((a, b) => {
    const orderA = a.data.order ?? Number.POSITIVE_INFINITY;
    const orderB = b.data.order ?? Number.POSITIVE_INFINITY;

    if (orderA !== orderB) return orderA - orderB;
    return a.id.localeCompare(b.id);
  });
}

export function isReadmeEntry(entry: CollectionEntry<'notes'>) {
  return /(^|\/)readme$/i.test(entry.id);
}

export function getNoteSlug(entry: CollectionEntry<'notes'>) {
  return entry.id.replace(/^[^/]+\//, '');
}

export function formatDirectoryTitle(value: string) {
  const name = value.split('/').filter(Boolean).at(-1) ?? value;

  return name
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .replace(/[-_]+/g, ' ')
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

export function getNoteBreadcrumbs(prefix: string): NoteBreadcrumb[] {
  const parts = trimSlashes(prefix).split('/').filter(Boolean);

  return parts.map((part, index) => ({
    title: formatDirectoryTitle(part),
    path: parts.slice(0, index + 1).join('/')
  }));
}

export function getNoteDirectoryPrefixes(entries: CollectionEntry<'notes'>[]) {
  const directories = new Set<string>();

  for (const entry of entries) {
    if (isReadmeEntry(entry)) continue;

    const parts = getNoteSlug(entry).split('/').filter(Boolean);

    for (let index = 1; index < parts.length; index += 1) {
      directories.add(parts.slice(0, index).join('/'));
    }
  }

  return [...directories].sort((a, b) => a.localeCompare(b));
}

export function getNoteDirectoryListing(entries: CollectionEntry<'notes'>[], prefix = '') {
  const normalizedPrefix = trimSlashes(prefix);
  const prefixWithSlash = normalizedPrefix ? `${normalizedPrefix}/` : '';
  const directories = new Map<string, NoteDirectory>();
  const currentEntries: CollectionEntry<'notes'>[] = [];

  for (const entry of entries) {
    if (isReadmeEntry(entry)) continue;

    const slug = getNoteSlug(entry);

    if (normalizedPrefix && !slug.startsWith(prefixWithSlash)) continue;

    const relativeSlug = normalizedPrefix ? slug.slice(prefixWithSlash.length) : slug;
    if (!relativeSlug) continue;

    const [directoryName, ...rest] = relativeSlug.split('/');

    if (rest.length === 0) {
      currentEntries.push(entry);
      continue;
    }

    const directoryPath = `${prefixWithSlash}${directoryName}`;
    const directory = directories.get(directoryPath);

    if (directory) {
      directory.count += 1;
      continue;
    }

    directories.set(directoryPath, {
      name: directoryName,
      path: directoryPath,
      title: formatDirectoryTitle(directoryName),
      count: 1
    });
  }

  return {
    directories: [...directories.values()].sort((a, b) => a.path.localeCompare(b.path)),
    entries: sortNoteEntries(currentEntries)
  };
}
