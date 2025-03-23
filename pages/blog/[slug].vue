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
  <div>
    <NuxtLinkLocale to="/blog">
      {{ t('blog.back') }}
    </NuxtLinkLocale>
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
  </div>
</template>
