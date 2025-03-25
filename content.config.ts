import { defineCollection, defineContentConfig, z } from '@nuxt/content'

const blogSchema = z.object({
  title: z.string(),
  description: z.string(),
  date: z.date(),
  tags: z.array(z.string()),
  readingTime: z.number(),
  translationKey: z.string(),
})

export default defineContentConfig({
  collections: {
    cs: defineCollection({
      source: {
        include: 'cs/*.md',
        prefix: '/blog',
      },
      type: 'page',
      schema: blogSchema,
    }),

    en: defineCollection({
      source: {
        include: 'en/*.md',
        prefix: '/en/blog',
      },
      type: 'page',
      schema: blogSchema,
    }),
  },
})
