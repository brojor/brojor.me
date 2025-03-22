export function useTranslatedPostPath() {
  const { locale } = useI18n()
  const route = useRoute()

  const { data: originalPost, execute: fetchOriginalPost } = useAsyncData(
    `post-${route.path}`,
    () => queryCollection(locale.value).where('path', '=', route.path).first(),
    { immediate: false },
  )

  const translationKey = computed(() => originalPost.value?.translationKey)
  const alternativeLocale = computed(() => locale.value === 'cs' ? 'en' : 'cs')

  const { data: translatedPost, execute: fetchTranslatedPost } = useAsyncData(
    `translated-post-${translationKey.value}-${alternativeLocale.value}`,
    () => queryCollection(alternativeLocale.value).where('translationKey', '=', translationKey.value).first(),
    { immediate: false },
  )

  async function getTranslatedPostPath() {
    await fetchOriginalPost()
    if (!translationKey.value) {
      return null
    }
    await fetchTranslatedPost()

    return translatedPost.value?.path
  }

  return {
    getTranslatedPostPath,
  }
}
