import type { CsCollectionItem, EnCollectionItem } from '@nuxt/content'

export function useBlogListingSchema(
  posts: Ref<(CsCollectionItem | EnCollectionItem)[] | null>,
) {
  const { t, localeProperties, baseUrl } = useI18n()

  const listElement = computed(() =>
    posts.value?.map((post, index) => ({
      '@type': 'ListItem',
      'position': index + 1,
      'url': `${baseUrl.value}${post.path}`,
    })),
  )

  const schema = computed(() => [
    defineWebPage({
      '@type': ['Blog', 'WebPage'],
      'inLanguage': localeProperties.value.language,
      'publisher': {
        '@id': `${baseUrl.value}/#identity`,
      },
      'isPartOf': {
        '@id': `${baseUrl.value}/blog#webpage`,
      },
    }),
    defineItemList({
      '@id': `${baseUrl.value}/blog#itemlist`,
      'name': t('blog.itemList'),
      'itemListElement': listElement.value,
    }),
  ])

  return { schema }
}
