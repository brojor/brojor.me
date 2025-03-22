import { defineCollection, defineContentConfig, z } from '@nuxt/content'

export default defineContentConfig({
  collections: {
    cs: defineCollection({
      source: {
        include: 'cs/*.md',
        prefix: '/blog',
      },
      type: 'page',
      schema: z.object({
        title: z.string(),
        description: z.string(),
        image: z.string().optional(),
        date: z.date(),
        tags: z.array(z.string()),
        translationKey: z.string(),
      }),
    }),

    en: defineCollection({
      source: {
        include: 'en/*.md',
        prefix: '/en/blog',
      },
      type: 'page',
      schema: z.object({
        title: z.string(),
        description: z.string(),
        image: z.string().optional(),
        date: z.date(),
        tags: z.array(z.string()),
        translationKey: z.string(),
      }),
    }),
  },
})
