import { getCollection } from 'astro:content';

export const getPs = async () =>
  (await getCollection('p'))
    .sort(
      (a, b) =>
        new Date(b.data.pubDate).getTime() - new Date(a.data.pubDate).getTime()
    )
    .slice(0, 150);
