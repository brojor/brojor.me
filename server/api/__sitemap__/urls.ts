import type { SitemapUrlInput } from '#sitemap/types'
import { defineSitemapEventHandler } from '#imports'
import matter from 'gray-matter'

const BLOG_PATH = {
  cs: '/blog',
  en: '/en/blog',
} as const

const LANG_CONFIG = {
  cs: { hreflang: 'cs-CZ', sitemap: 'cs-CZ' },
  en: { hreflang: 'en-US', sitemap: 'en-US' },
} as const

function getBlogPath(lang: LangCode, slug: string): string {
  const cleanSlug = slug.replace(/\.md$/, '')
  return `${BLOG_PATH[lang]}/${cleanSlug}`
}

function getLangConfig(lang: LangCode) {
  const config = LANG_CONFIG[lang]
  if (!config)
    throw new Error(`Nepodporovaný jazyk: ${lang}`)
  return config
}

function parseFilePath(filePath: string): [LangCode, string] {
  const [lang, slug] = filePath.split(':')
  if (!lang || !slug)
    throw new Error(`Neplatný formát cesty: ${filePath}`)
  return [lang as LangCode, slug]
}

function createTranslation(lang: LangCode, slug: string): BlogPostTranslation {
  return {
    hreflang: getLangConfig(lang).hreflang,
    href: getBlogPath(lang, slug),
  }
}

export default defineSitemapEventHandler(async (e) => {
  const storage = e.context.contentStorage
  const filePaths = await storage.getKeys()

  // Process all files in parallel
  const fileMetadata: BlogPostMetadata[] = await Promise.all(
    filePaths.map(async (filePath: string) => {
      const [lang, slug] = parseFilePath(filePath)
      const fileContent = await storage.getItem(filePath)
      const { data } = matter(fileContent)
      return { lang, slug, translationKey: data.translationKey as string }
    }),
  )

  // Group by translation key
  const translationsByKey = fileMetadata.reduce((acc, { translationKey, lang, slug }) => {
    if (!acc[translationKey])
      acc[translationKey] = {} as Record<LangCode, string>
    acc[translationKey][lang] = slug
    return acc
  }, {} as BlogPostTranslations)

  // Create sitemap entries
  return fileMetadata.map(({ lang, slug, translationKey }) => {
    const translations = translationsByKey[translationKey]
    const langConfig = getLangConfig(lang)

    const alternatives = Object.entries(translations)
      .filter(([transLang]) => transLang !== lang)
      .map(([transLang, targetSlug]) => createTranslation(transLang as LangCode, targetSlug))

    // Add x-default for English posts
    if (lang === 'en' && translations.cs) {
      alternatives.push({
        hreflang: 'x-default',
        href: getBlogPath('cs', translations.cs),
      })
    }

    return {
      loc: getBlogPath(lang, slug),
      alternatives,
      _sitemap: langConfig.sitemap,
    }
  }) satisfies SitemapUrlInput[]
})
