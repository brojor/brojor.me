export function useBlogDetailHeadLinks() {
  const { locale, baseUrl, locales } = useI18n()
  const { translatedPost } = useTranslatedPost()

  const alternateLanguage = computed(() => {
    return locales.value.find(loc => loc.code !== locale.value)
  })

  const alternateLinks = computed(() => {
    const path = translatedPost.value?.path
    if (!path)
      return []

    return [
      {
        id: `i18n-alt-${alternateLanguage.value?.code}`,
        rel: 'alternate',
        href: `${baseUrl.value}${path}`,
        hreflang: alternateLanguage.value?.code,
      },
      {
        id: `i18n-alt-${alternateLanguage.value?.language}`,
        rel: 'alternate',
        href: `${baseUrl.value}${path}`,
        hreflang: alternateLanguage.value?.language,
      },
      ...(locale.value === 'en'
        ? [{
            id: 'i18n-xd',
            rel: 'alternate',
            href: `${baseUrl.value}${path}`,
            hreflang: 'x-default',
          }]
        : []),
    ]
  })

  return alternateLinks
}
