export function useListingOgMeta() {
  const { locale, t, baseUrl } = useI18n()

  return {
    ogDescription: t('blog.description'),
    ogType: 'website',
    ogImage: `${baseUrl.value}/images/social/blog/og-image-${locale.value}.png`,
    ogImageWidth: 1200,
    ogImageHeight: 630,
  } as const
}
