export function useListingTwitterMeta() {
  const { locale, t, baseUrl } = useI18n()

  return {
    twitterTitle: t('blog.title'),
    twitterDescription: t('blog.description'),
    twitterImage: `${baseUrl.value}/images/social/blog/x-image-${locale.value}.png`,
    twitterImageAlt: t('blog.ogImageAlt'),
  } as const
}
