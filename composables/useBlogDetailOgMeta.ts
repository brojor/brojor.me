import type { CsCollectionItem, EnCollectionItem } from '@nuxt/content'

export function useBlogDetailOgMeta(post: Ref<CsCollectionItem | EnCollectionItem | null>) {
  const { locale, baseUrl } = useI18n()

  return {
    ogTitle: post.value?.title,
    ogDescription: post.value?.description,
    ogType: 'article',
    ogImage: `${baseUrl.value}/images/social/${post.value?.translationKey}/og-image-${locale.value}.png`,
    ogImageWidth: 1200,
    ogImageHeight: 630,
    ogImageAlt: `${post.value?.title}`,
  } as const
}
