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
    definePerson({
      name: 'BroJor',
      image: '/profile-photo.webp',
      description:
        'Passionate web developer focusing on Vue.js ecosystem.',
      url: baseUrl.value,
      sameAs: [
        'https://github.com/brojor',
        'https://www.linkedin.com/in/brojor',
        'https://x.com/brojor_dev',
      ],
    }),
    defineWebSite({
      name: `${useRuntimeConfig().public.siteName}`,
    }),
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
