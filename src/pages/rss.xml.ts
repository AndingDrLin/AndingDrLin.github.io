import rss from '@astrojs/rss';
import { SITE_DESCRIPTION, SITE_TITLE } from '../consts';
import { getFeedEntries } from '../utils/content';
import { getNoteUrl } from '../utils/noteTree';

export async function GET(context: { site: URL }) {
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
