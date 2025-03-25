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
  <div class="prose prose-invert prose-zinc mx-auto px-4 md:px-0">
    <article v-if="post !== null">
      <p>{{ new Date(post.date).toLocaleDateString(locale) }}</p>

      <ContentRenderer :value="post" />

      <div v-if="post.tags?.length">
        <span v-for="tag in post.tags" :key="tag">
          #{{ tag }}
        </span>
      </div>
    </article>
    <div v-else>
      <h1>{{ t('blog.notFound') }}</h1>
    </div>
    <NuxtLinkLocale to="/blog" class="not-prose mt-8 text-xs inline-block">
      {{ t('blog.back') }}
    </NuxtLinkLocale>
  </div>
</template>
