import type { CsCollectionItem, EnCollectionItem } from '@nuxt/content'

export function useBlogDetailTwitterMeta(post: Ref<CsCollectionItem | EnCollectionItem | null>) {
  const { locale, baseUrl } = useI18n()

  return {
    twitterCreator: '@brojor_dev',
    twitterTitle: post.value?.title,
    twitterDescription: post.value?.description,
    twitterImage: `${baseUrl.value}/images/social/${post.value?.translationKey}/x-image-${locale.value}.png`,
    twitterImageAlt: `${post.value?.title}`,
    twitterLabel1: locale.value === 'cs' ? 'Autor' : 'Author',
    twitterData1: 'BroJor',
    twitterLabel2: locale.value === 'cs' ? 'Doba čtení' : 'Reading time',
    twitterData2: `${post.value?.readingTime} min`,
  } as const
}
