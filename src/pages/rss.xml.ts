import rss from '@astrojs/rss';
import { SITE_DESCRIPTION, SITE_TITLE } from '../consts';
import { getFeedEntries } from '../utils/content';

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
      link: `/${kind}/${entry.id}/`,
      categories: entry.data.tags
    }))
  });
}
