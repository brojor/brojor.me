<script setup lang="ts">
const route = useRoute()
const { locale, t, localeProperties, baseUrl, defaultLocale } = useI18n()

const { data: post } = await useAsyncData(
  `post-${route.params.slug}`,
  () => queryCollection(locale.value)
    .where('path', '=', route.path)
    .first(),
)

const { translatedPost } = useTranslatedPost()

useSeoMeta({
  title: post.value?.title,
  description: post.value?.description,
  ...useBlogDetailOgMeta(post),
  ...useBlogDetailTwitterMeta(post),
  ...useBlogDetailArticleMeta(post),
})

useHead({
  link: useBlogDetailHeadLinks(),
})

interface TranslationRelation {
  workTranslation?: { '@id': string }
  translationOfWork?: { '@id': string }
}

const translationRelation = computed<TranslationRelation>(() => {
  if (!translatedPost.value)
    return {}

  const id = `${baseUrl.value}${translatedPost.value.path}`

  return locale.value === defaultLocale
    ? { workTranslation: { '@id': id } }
    : { translationOfWork: { '@id': id } }
})

useSchemaOrg([
  defineWebPage({
    inLanguage: localeProperties.value.language,
  }),
  defineArticle({
    '@type': 'TechArticle',
    'url': `${baseUrl.value}${route.path}`,
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
</script>

<template>
  <div class="prose prose-invert prose-zinc mx-auto my-8 px-4 md:px-0">
    <ContentRenderer v-if="post !== null" :value="post" tag="article" />
    <div v-else>
      <h1>{{ t('blog.notFound') }}</h1>
    </div>
    <NuxtLinkLocale to="/blog" class="not-prose mt-8 text-xs inline-block">
      {{ t('blog.back') }}
    </NuxtLinkLocale>
  </div>
</template>
