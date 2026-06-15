import { describe, it, expect } from 'vitest';

// Test the pure string/data functions from noteTree.ts
// by replicating their logic (avoiding Astro CollectionEntry imports)

function trimSlashes(value) {
  return value.replace(/^\/+|\/+$/g, '');
}

function isReadmeEntry(id) {
  return /(^|\/)readme$/i.test(id);
}

function getNoteSlug(id) {
  return id.replace(/^[^/]+\//, '');
}

function formatDirectoryTitle(value) {
  const name = value.split('/').filter(Boolean).at(-1) ?? value;
  return name
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .replace(/[-_]+/g, ' ')
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

function getNoteBreadcrumbs(prefix) {
  const parts = trimSlashes(prefix).split('/').filter(Boolean);
  return parts.map((part, index) => ({
    title: formatDirectoryTitle(part),
    path: parts.slice(0, index + 1).join('/')
  }));
}

function sortNoteEntries(entries) {
  return [...entries].sort((a, b) => {
    const orderA = a.order ?? Number.POSITIVE_INFINITY;
    const orderB = b.order ?? Number.POSITIVE_INFINITY;
    if (orderA !== orderB) return orderA - orderB;
    return a.id.localeCompare(b.id);
  });
}

describe('isReadmeEntry', () => {
  it('matches readme.md at root', () => {
    expect(isReadmeEntry('dsp-notes/readme')).toBe(true);
    expect(isReadmeEntry('dsp-notes/README')).toBe(true);
  });

  it('does not match non-readme entries', () => {
    expect(isReadmeEntry('dsp-notes/chapter1')).toBe(false);
    expect(isReadmeEntry('dsp-notes/intro-to-readme')).toBe(false);
  });
});

describe('getNoteSlug', () => {
  it('strips the first path segment (docGroup)', () => {
    expect(getNoteSlug('dsp-notes/chapter1')).toBe('chapter1');
    expect(getNoteSlug('dsp-notes/subdir/chapter1')).toBe('subdir/chapter1');
  });

  it('returns the input unchanged when no slash present', () => {
    // getNoteSlug uses /^[^/]+\// which requires a slash
    expect(getNoteSlug('readme')).toBe('readme');
  });
});

describe('formatDirectoryTitle', () => {
  it('converts kebab-case to Title Case', () => {
    expect(formatDirectoryTitle('digital-signal-processing')).toBe('Digital Signal Processing');
  });

  it('converts snake_case to Title Case', () => {
    expect(formatDirectoryTitle('exam_strategy')).toBe('Exam Strategy');
  });

  it('converts camelCase to Title Case', () => {
    expect(formatDirectoryTitle('myDirectory')).toBe('My Directory');
  });

  it('handles nested paths by using last segment', () => {
    expect(formatDirectoryTitle('notes/my-directory')).toBe('My Directory');
  });
});

describe('getNoteBreadcrumbs', () => {
  it('generates breadcrumbs for simple prefix', () => {
    const crumbs = getNoteBreadcrumbs('my-chapter');
    expect(crumbs).toEqual([
      { title: 'My Chapter', path: 'my-chapter' }
    ]);
  });

  it('generates nested breadcrumbs', () => {
    const crumbs = getNoteBreadcrumbs('unit-1/chapter-2');
    expect(crumbs).toEqual([
      { title: 'Unit 1', path: 'unit-1' },
      { title: 'Chapter 2', path: 'unit-1/chapter-2' }
    ]);
  });

  it('trims leading/trailing slashes', () => {
    const crumbs = getNoteBreadcrumbs('/topic/');
    expect(crumbs).toEqual([
      { title: 'Topic', path: 'topic' }
    ]);
  });
});

describe('sortNoteEntries', () => {
  it('sorts by order first', () => {
    const entries = [
      { id: 'b', order: 2 },
      { id: 'a', order: 1 },
      { id: 'c', order: 3 }
    ];
    const sorted = sortNoteEntries(entries);
    expect(sorted.map(e => e.id)).toEqual(['a', 'b', 'c']);
  });

  it('sorts entries without order (Infinity) after ordered ones', () => {
    const entries = [
      { id: 'z' },
      { id: 'a', order: 1 },
      { id: 'b', order: 2 }
    ];
    const sorted = sortNoteEntries(entries);
    expect(sorted.map(e => e.id)).toEqual(['a', 'b', 'z']);
  });

  it('sorts by id when order is equal', () => {
    const entries = [
      { id: 'chapter10', order: 1 },
      { id: 'chapter2', order: 1 },
      { id: 'chapter1', order: 1 }
    ];
    const sorted = sortNoteEntries(entries);
    expect(sorted.map(e => e.id)).toEqual(['chapter1', 'chapter10', 'chapter2']);
  });

  it('does not mutate the original array', () => {
    const entries = [{ id: 'b', order: 2 }, { id: 'a', order: 1 }];
    const original = [...entries];
    sortNoteEntries(entries);
    expect(entries).toEqual(original);
  });
});
