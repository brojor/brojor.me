export function useBlogDetailHeadLinks(translatedPostPath: string | null | undefined) {
  const { locale, baseUrl, locales } = useI18n()

  const alternateLanguage = computed(() => {
    return locales.value.find(loc => loc.code !== locale.value)
  })

  return [
    {
      id: `i18n-alt-${alternateLanguage.value?.code}`,
      rel: 'alternate',
      href: `${baseUrl.value}${translatedPostPath}`,
      hreflang: alternateLanguage.value?.code,
    },
    {
      id: `i18n-alt-${alternateLanguage.value?.language}`,
      rel: 'alternate',
      href: `${baseUrl.value}${translatedPostPath}`,
      hreflang: alternateLanguage.value?.language,
    },
    ...(locale.value === 'en'
      ? [{
          id: 'i18n-xd',
          rel: 'alternate',
          href: `${baseUrl.value}${translatedPostPath}`,
          hreflang: 'x-default',
        }]
      : []),
  ]
}
