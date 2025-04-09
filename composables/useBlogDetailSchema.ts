import type { CsCollectionItem, EnCollectionItem } from '@nuxt/content'

interface TranslationRelation {
  workTranslation?: { '@id': string }
  translationOfWork?: { '@id': string }
}

export function useBlogDetailSchema(post: Ref<CsCollectionItem | EnCollectionItem | null>) {
  const { localeProperties, baseUrl, locale, defaultLocale } = useI18n()
  const { translatedPost } = useTranslatedPost()

  const translationRelation = computed<TranslationRelation>(() => {
    if (!translatedPost.value)
      return {}

    const id = `${baseUrl.value}${translatedPost.value.path}`

    return locale.value === defaultLocale
      ? { workTranslation: { '@id': id } }
      : { translationOfWork: { '@id': id } }
  })

  const schema = computed(() => [
    defineWebPage({
      inLanguage: localeProperties.value.language,
    }),
    defineArticle({
      '@type': 'TechArticle',
      'url': `${baseUrl.value}${post.value?.path}`,
      'headline': post.value?.title,
      'description': post.value?.description,
      'datePublished': post.value?.publishedDate,
      'dateModified': post.value?.modifiedDate,
      'timeRequired': `PT${post.value?.readingTime}M`,
      'image': `${baseUrl.value}/images/social/${post.value?.translationKey}/og-image-${locale.value}.png`,
      'keywords': post.value?.tags,
      'alternateName': translatedPost.value?.title,
      ...translationRelation.value,
    }),
  ])

  return { schema }
}
