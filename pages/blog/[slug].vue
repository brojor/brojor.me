<script setup lang="ts">
import { NuxtLinkLocale } from '#components'

const route = useRoute()
const { locale, t } = useI18n()

const { data: post } = await useAsyncData(
  `post-${route.path}`,
  () => queryCollection(locale.value)
    .where('path', '=', route.path)
    .first(),
)
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
