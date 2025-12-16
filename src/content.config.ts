import { defineCollection, z } from 'astro:content';

const p = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    pubDate: z.date(),
    image: z.string().url(),
    author: z
      .string()
      .nullable()
      .optional()
      .transform((v) => v ?? undefined),
  }),
});

export const collections = { p };
