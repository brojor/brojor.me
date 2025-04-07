import type { SitemapUrlInput } from '#sitemap/types'
import { defineSitemapEventHandler } from '#imports'

export default defineSitemapEventHandler(async (e) => {
  const csPosts = await queryCollection(e, 'cs').select('path', 'translationKey').all()
  const enPosts = await queryCollection(e, 'en').select('path', 'translationKey').all()

  const csOverrides = csPosts.map(({ path, translationKey }) => {
    const alt = enPosts.find(({ translationKey: altTranslationKey }) => altTranslationKey === translationKey)!
    return {
      loc: path,
      alternatives: [{ hreflang: 'en-US', href: alt?.path }],
      _sitemap: 'cs-CZ',
    }
  })

  const enOverrides = enPosts.map(({ path, translationKey }) => {
    const alt = csPosts.find(({ translationKey: altTranslationKey }) => altTranslationKey === translationKey)!
    return {
      loc: path,
      alternatives: [{ hreflang: 'cs-CZ', href: alt?.path }, { hreflang: 'x-default', href: alt?.path }],
      _sitemap: 'en-US',
    }
  })

  return [...csOverrides, ...enOverrides] satisfies SitemapUrlInput[]
})
