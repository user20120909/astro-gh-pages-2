import { Marked, Renderer } from '@ts-stack/markdown';

Marked.setOptions({
  renderer: new Renderer(),
  gfm: true,
  tables: true,
  breaks: false,
  pedantic: false,
  sanitize: false,
  smartLists: true,
  smartypants: false,
});

const split = (text: string) => {
  const split = text.replaceAll('\r\n', '\n').split('\n');
  let toAdd = '';
  const res = [];
  for (const row of split) {
    if (row.length === 0 && toAdd.length > 0) {
      res.push(toAdd);
      toAdd = '';
    }
    if (row.length > 0) {
      toAdd += row + '\n';
    }
  }
  if (toAdd.length > 0) {
    res.push(toAdd);
  }
  return res;
};

export interface Section {
  title?: string;
  content: string;
}

export const extractSections = (text: string): Section[] => {
  const sections: Section[] = [];
  const blocks = split(text);

  for (const block of blocks) {
    const html = Marked.parse(block);
    const h2Match = html.match(/<h2[^>]*>(.*?)<\/h2>/);
    const content = html
      .replace(/<h2[^>]*>.*?<\/h2>/g, '')
      .trim()
      .replace(/<\/?(p|ul)>/g, '');
    if (!content) continue;
    sections.push({
      title: h2Match ? h2Match[1] : undefined,
      content,
    });
  }

  return sections;
};
