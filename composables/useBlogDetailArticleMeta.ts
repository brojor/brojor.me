import type { CsCollectionItem, EnCollectionItem } from '@nuxt/content'

export function useBlogDetailArticleMeta(post: Ref<CsCollectionItem | EnCollectionItem | null>) {
  const { locale } = useI18n()

  return {
    articleAuthor: ['Bronislav Jordán'],
    articlePublishedTime: post.value?.publishedDate,
    articleModifiedTime: post.value?.modifiedDate,
    articleTag: post.value?.tags,
    articleSection: `${locale.value === 'cs' ? 'Webový vývoj' : 'Web development'}`,
  }
}
