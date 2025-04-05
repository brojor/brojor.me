<script setup lang="ts">
const route = useRoute()
const { locale, t, locales, baseUrl } = useI18n()

const { getTranslatedPostPath } = useTranslatedPostPath()
const translatedPostPath = await getTranslatedPostPath()

const alternateLanguage = computed(() => {
  return locales.value.find(loc => loc.code !== locale.value)
})

const { data: post } = await useAsyncData(
  `post-${route.path}`,
  () => queryCollection(locale.value)
    .where('path', '=', route.path)
    .first(),
)

useSeoMeta({
  title: post.value?.title,
  description: post.value?.description,
  ...useBlogDetailOgMeta(post),
  ...useBlogDetailTwitterMeta(post),
  ...useBlogDetailArticleMeta(post),
})

useHead({
  link: () => [
    {
      id: `i18n-alt-${alternateLanguage.value?.code}`,
      rel: 'alternate',
      href: `${baseUrl.value}${translatedPostPath}`,
      hreflang: alternateLanguage.value?.code,
    },
    {
      id: `i18n-alt-${alternateLanguage.value?.language}`,
      rel: 'alternate',
      href: `${baseUrl.value}${translatedPostPath}`,
      hreflang: alternateLanguage.value?.language,
    },
    ...(locale.value === 'en'
      ? [{
          id: 'i18n-xd',
          rel: 'alternate',
          href: `${baseUrl.value}/${translatedPostPath}`,
          hreflang: 'x-default',
        }]
      : []),
  ],
})
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
