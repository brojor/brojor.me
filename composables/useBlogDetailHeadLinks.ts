import type { CsCollectionItem, EnCollectionItem } from '@nuxt/content'

export function useBlogDetailHeadLinks(translatedPost: Ref<CsCollectionItem | EnCollectionItem | null>) {
  const { locale, baseUrl, locales } = useI18n()

  const alternateLanguage = computed(() => {
    return locales.value.find(loc => loc.code !== locale.value)
  })

  const alternateLinks = computed(() => [
    {
      id: `i18n-alt-${alternateLanguage.value?.code}`,
      rel: 'alternate',
      href: `${baseUrl.value}${translatedPost.value?.path}`,
      hreflang: alternateLanguage.value?.code,
    },
    {
      id: `i18n-alt-${alternateLanguage.value?.language}`,
      rel: 'alternate',
      href: `${baseUrl.value}${translatedPost.value?.path}`,
      hreflang: alternateLanguage.value?.language,
    },
    ...(locale.value === 'en'
      ? [{
          id: 'i18n-xd',
          rel: 'alternate',
          href: `${baseUrl.value}${translatedPost.value?.path}`,
          hreflang: 'x-default',
        }]
      : []),
  ])

  return alternateLinks
}
