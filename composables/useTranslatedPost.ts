export function useTranslatedPost() {
  const { locale, availableLocales } = useI18n()
  const route = useRoute()

  // Nejprve načteme původní post podle aktuálního jazyka a cesty
  const { data: originalPost } = useAsyncData(
    `post-${route.params.slug}`,
    () => queryCollection(locale.value)
      .where('path', '=', route.path)
      .first(),
    {
      watch: [() => route.params.slug],
    },
  )

  const translationKey = computed(() => originalPost.value?.translationKey)
  const alternateLocale = computed(() => availableLocales.find(loc => loc !== locale.value)!)

  // Pak zkusíme najít překlad podle translationKey a alternativního jazyka
  const { data: translatedPost } = useAsyncData(
    `translation-of-${route.params.slug}`,
    () => queryCollection(alternateLocale.value)
      .where('translationKey', '=', translationKey.value)
      .first(),
    {
      watch: [originalPost],
    },
  )

  return {
    translatedPost,
  }
}
