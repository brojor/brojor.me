<script setup lang="ts">
const route = useRoute()
const { locale, t } = useI18n()

const { data: post } = await useAsyncData(
  `post-${route.params.slug}`,
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
  link: useBlogDetailHeadLinks(),
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
