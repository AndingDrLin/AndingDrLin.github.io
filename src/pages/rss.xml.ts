import rss from '@astrojs/rss';
import { SITE_DESCRIPTION, SITE_TITLE, NOTE_COURSES, NOTE_TUTORIALS } from '../consts';
import { getFeedEntries } from '../utils/content';

function getNoteUrl(entry) {
  const course = NOTE_COURSES[entry.data.docGroup as keyof typeof NOTE_COURSES];
  const tutorial = NOTE_TUTORIALS[entry.data.docGroup as keyof typeof NOTE_TUTORIALS];
  const slug = entry.id.replace(/^[^/]+\//, '');

  if (course) return `/notes/${course.slug}/${slug}/`;
  if (tutorial) return `/notes/tutorial/${tutorial.slug}/${slug}/`;
  return `/notes/${entry.id}/`;
}

export async function GET(context) {
  const entries = await getFeedEntries();

  return rss({
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    site: context.site,
    items: entries.map(({ entry, kind }) => ({
      title: entry.data.title,
      description: entry.data.description,
      pubDate: entry.data.date,
      link: kind === 'blog' ? `/blog/${entry.id}/` : getNoteUrl(entry),
      categories: entry.data.tags
    }))
  });
}
