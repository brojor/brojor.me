import { defineCollection, defineContentConfig, z } from '@nuxt/content'
import { asSitemapCollection } from '@nuxtjs/sitemap/content'

const blogSchema = z.object({
  title: z.string(),
  description: z.string(),
  publishedDate: z.string(),
  modifiedDate: z.string().optional(),
  tags: z.array(z.string()),
  readingTime: z.number(),
  translationKey: z.string(),
})

export default defineContentConfig({
  collections: {
    cs: defineCollection(asSitemapCollection({
      source: {
        include: 'cs/*.md',
        prefix: '/blog',
      },
      type: 'page',
      schema: blogSchema,
    })),

    en: defineCollection(asSitemapCollection({
      source: {
        include: 'en/*.md',
        prefix: '/en/blog',
      },
      type: 'page',
      schema: blogSchema,
    })),
  },
})
