import type { SitemapUrlInput } from '#sitemap/types'
import { defineSitemapEventHandler } from '#imports'
import matter from 'gray-matter'

type LangCode = 'cs' | 'en'

/**
 * Získá detaily jazyka (hreflang a sitemap identifikátor)
 * @param {string} lang - Kód jazyka (cs, en)
 * @returns {object} - Objekt s hreflang a sitemap hodnotami
 */
function getLangDetails(lang: LangCode) {
  switch (lang) {
    case 'cs':
      return { hreflang: 'cs-CZ', sitemap: 'cs-CZ' }
    case 'en':
      return { hreflang: 'en-US', sitemap: 'en-US' }
    default:
      throw new Error(`Nepodporovaný jazyk: ${lang}`)
  }
}

/**
 * Vytvoří URL cestu pro daný jazyk a slug
 * @param {string} lang - Kód jazyka (cs, en)
 * @param {string} slug - Slug článku bez přípony .md
 * @returns {string} - URL cesta
 */
function getUrlPath(lang: LangCode, slug: string) {
  // Odstranění přípony .md
  const cleanSlug = slug.replace(/\.md$/, '')

  // Pro angličtinu použijeme /en/blog/ strukturu
  if (lang === 'en') {
    return `/en/blog/${cleanSlug}`
  }

  // Pro češtinu pouze /blog/
  return `/blog/${cleanSlug}`
}

export default defineSitemapEventHandler(async (e) => {
  const storage = e.context.contentStorage
  const filePaths = await storage.getKeys()

  // Vytvoříme mapu translationKey => { cs: path, en: path }
  const translationMap = new Map()
  const fileMetadataMap = new Map()

  // Nejprve zpracujeme všechny soubory a extrahujeme metadata
  for (const filePath of filePaths) {
    // Rozdělení cesty na jazyk a slug
    const [lang, slug] = filePath.split(':')

    // Získání obsahu souboru
    const fileContent = await storage.getItem(filePath)

    // Parsování frontmatteru
    const { data } = matter(fileContent)
    const translationKey = data.translationKey

    // Uložení do mapy translací
    if (!translationMap.has(translationKey)) {
      translationMap.set(translationKey, {})
    }
    translationMap.get(translationKey)[lang] = slug

    // Uložení metadat do mapy
    fileMetadataMap.set(filePath, {
      lang,
      slug,
      translationKey,
    })
  }

  // Vytvoření výsledných sitemap objektů
  const sitemapEntries = []

  for (const filePath of filePaths) {
    const metadata = fileMetadataMap.get(filePath)
    const { lang, slug, translationKey } = metadata

    // Nastavení jazykových kódů a cest pro sitemap
    const langDetails = getLangDetails(lang)
    const alternativesData = []

    // Procházení všech dostupných překladů pro daný translationKey
    const translations = translationMap.get(translationKey)
    for (const [transLang, transSlug] of Object.entries(translations) as [LangCode, string][]) {
      // Přeskočíme aktuální jazyk (ten bude v loc)
      if (transLang === lang)
        continue

      const transLangDetails = getLangDetails(transLang)

      alternativesData.push({
        hreflang: transLangDetails.hreflang,
        href: getUrlPath(transLang, transSlug),
      })
    }

    // Pro anglické články přidáme x-default alternativu ukazující na českou verzi
    if (lang === 'en' && translations.cs) {
      alternativesData.push({
        hreflang: 'x-default',
        href: getUrlPath('cs', translations.cs),
      })
    }

    // Vytvoření sitemap objektu
    sitemapEntries.push({
      loc: getUrlPath(lang, slug),
      alternatives: alternativesData,
      _sitemap: langDetails.sitemap,
    })
  }

  return sitemapEntries satisfies SitemapUrlInput[]
})
