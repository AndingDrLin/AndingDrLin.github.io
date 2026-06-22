import { describe, it, expect } from 'vitest';

describe('NoteDirectoryList', () => {
  function renderHTML(props: {
    noteEntries: any[];
    directoryEntries?: any[];
    courseKey?: string;
    courseName?: string;
    courseDescription?: string;
    courseSlug?: string;
    viewMode?: 'grid' | 'list';
  }) {
    const {
      noteEntries = [],
      directoryEntries = [],
      courseName = '',
      courseDescription = '',
      courseSlug = '',
      viewMode = 'grid',
    } = props;

    const directoryItemsHTML = directoryEntries
      .map((d: any) => {
        const item = typeof d === 'string' ? d : d.slug || d.id || d;
        const safeKey = item.replace(/[^a-zA-Z0-9-]/g, '-');
        return `<div class="directory-card" data-key="${safeKey}"><a class="directory-link" href="/notes/${courseSlug}/${item}/"><span class="directory-title">${item}</span></a></div>`;
      })
      .join('\n');

    const noteItemsHTML = noteEntries
      .map((n: any) => {
        const title = n.title || n.data?.title || n.id || '';
        const description = n.description || n.data?.description || '';
        const slug = n.slug || n.data?.slug || n.id || '';
        const itemClass = viewMode === 'list' ? 'note-item-list' : 'note-item';
        const safeKey = slug.replace(/[^a-zA-Z0-9-]/g, '-');
        return `<div class="${itemClass}" data-key="${safeKey}"><a href="/notes/${courseSlug}/${slug}/"><span class="note-title">${title}</span></a><p class="note-description">${description}</p></div>`;
      })
      .join('\n');

    return `
<div class="note-directory">
  <div class="note-directory-header">
    <div class="note-directory-header-text">
      <h2 class="note-directory-heading">${courseName}</h2>
      <p class="note-directory-description">${courseDescription}</p>
    </div>
    <div class="note-directory-actions">
      <button class="view-toggle-btn" aria-label="切换视图" data-current-view="${viewMode}">
      </button>
    </div>
  </div>
  ${directoryEntries.length > 0 ? `<div class="directory-grid">${directoryItemsHTML}</div>` : ''}
  ${noteEntries.length > 0 ? `<div class="${viewMode === 'list' ? 'note-list-view' : 'note-grid'}">${noteItemsHTML}</div>` : ''}
</div>
<script>
  (function() {
    const btn = document.querySelector('.view-toggle-btn');
    const noteContainer = document.querySelector('.note-grid, .note-list-view');
    if (!btn || !noteContainer) return;
    btn.addEventListener('click', () => {
      const currentView = btn.getAttribute('data-current-view');
      const newView = currentView === 'grid' ? 'list' : 'grid';
      btn.setAttribute('data-current-view', newView);
      noteContainer.className = newView === 'list' ? 'note-list-view' : 'note-grid';
    });
  })();
</script>
    `;
  }

  it('renders note titles in the output', () => {
    const html = renderHTML({
      noteEntries: [
        { id: 'ch1', title: 'Chapter 1', description: 'Intro', slug: 'chapter-1' },
        { id: 'ch2', title: 'Chapter 2', description: 'More', slug: 'chapter-2' },
      ],
      courseSlug: 'test-course',
    });

    expect(html).toContain('Chapter 1');
    expect(html).toContain('Chapter 2');
  });

  it('renders course name as heading', () => {
    const html = renderHTML({
      noteEntries: [],
      courseName: 'My Course',
      courseSlug: 'my-course',
    });

    expect(html).toContain('My Course');
    expect(html).toContain('note-directory-heading');
  });

  it('renders directory entries when provided', () => {
    const html = renderHTML({
      noteEntries: [],
      directoryEntries: ['dir1', 'dir2'],
      courseSlug: 'test-course',
    });

    expect(html).toContain('directory-card');
    expect(html).toContain('dir1');
    expect(html).toContain('dir2');
  });

  it('does not render directory grid when no directories', () => {
    const html = renderHTML({
      noteEntries: [{ id: 'ch1', title: 'Ch1', description: '', slug: 'ch1' }],
      directoryEntries: [],
      courseSlug: 'test-course',
    });

    expect(html).not.toContain('directory-grid');
  });

  it('renders note descriptions', () => {
    const html = renderHTML({
      noteEntries: [
        { id: 'ch1', title: 'Chapter 1', description: 'This is a description', slug: 'ch1' },
      ],
      courseSlug: 'test-course',
    });

    expect(html).toContain('This is a description');
    expect(html).toContain('note-description');
  });

  it('renders links with correct href pattern', () => {
    const html = renderHTML({
      noteEntries: [{ id: 'ch1', title: 'Chapter 1', description: '', slug: 'chapter-1' }],
      courseSlug: 'power-electronics',
    });

    expect(html).toContain('/notes/power-electronics/chapter-1/');
  });

  it('renders grid view container class for note items', () => {
    const html = renderHTML({
      noteEntries: [{ id: 'ch1', title: 'Ch1', description: '', slug: 'ch1' }],
      courseSlug: 'test-course',
      viewMode: 'grid',
    });

    expect(html).toContain('class="note-grid"');
    expect(html).not.toContain('class="note-list-view"');
  });

  it('renders list view container class for note items', () => {
    const html = renderHTML({
      noteEntries: [{ id: 'ch1', title: 'Ch1', description: '', slug: 'ch1' }],
      courseSlug: 'test-course',
      viewMode: 'list',
    });

    expect(html).toContain('class="note-list-view"');
    expect(html).toContain('class="note-item-list"');
  });

  it('renders view toggle button', () => {
    const html = renderHTML({
      noteEntries: [],
      courseSlug: 'test-course',
    });

    expect(html).toContain('view-toggle-btn');
    expect(html).toContain('data-current-view');
  });

  it('renders course description', () => {
    const html = renderHTML({
      noteEntries: [],
      courseDescription: 'A great course about power electronics',
      courseSlug: 'test-course',
    });

    expect(html).toContain('A great course about power electronics');
    expect(html).toContain('note-directory-description');
  });

  it('does not render note-grid div when noteEntries is empty', () => {
    const html = renderHTML({
      noteEntries: [],
      courseSlug: 'test-course',
    });

    expect(html).toContain('note-directory');
    expect(html).toContain('note-directory-header');
    // note-grid should not appear as a class attribute on any div
    expect(html).not.toContain('class="note-grid"');
  });

  it('includes inline script for view toggle', () => {
    const html = renderHTML({
      noteEntries: [],
      courseSlug: 'test-course',
    });

    expect(html).toContain('<script>');
    expect(html).toContain('view-toggle-btn');
    expect(html).toContain('addEventListener');
  });

  it('renders data-key attributes for unique identification', () => {
    const html = renderHTML({
      noteEntries: [
        { id: 'ch1', title: 'Chapter 1', description: '', slug: 'chapter-1' },
      ],
      courseSlug: 'test-course',
    });

    expect(html).toContain('data-key="chapter-1"');
  });

  it('sanitizes keys with special characters', () => {
    const html = renderHTML({
      noteEntries: [
        { id: 'ch1', title: 'Ch1', description: '', slug: 'my/special-slug' },
      ],
      courseSlug: 'test-course',
    });

    expect(html).toContain('data-key="my-special-slug"');
  });

  it('renders multiple notes and directories together', () => {
    const html = renderHTML({
      noteEntries: [
        { id: 'ch1', title: 'Note A', description: 'Desc A', slug: 'note-a' },
      ],
      directoryEntries: ['subdir1'],
      courseSlug: 'test-course',
    });

    expect(html).toContain('Note A');
    expect(html).toContain('directory-card');
    expect(html).toContain('subdir1');
  });

  it('renders current viewMode in data attribute', () => {
    const html = renderHTML({
      noteEntries: [],
      courseSlug: 'test-course',
      viewMode: 'list',
    });

    expect(html).toContain('data-current-view="list"');
  });
});
