<script setup lang="ts">
import { NuxtLinkLocale } from '#components'

const route = useRoute()
const { locale, t } = useI18n()

// Získání dat článku
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

      <!-- Zobrazení obsahu článku -->
      <ContentRenderer :value="post" />

    <!-- Tagy, pokud existují -->
    <!-- <div v-if="post.tags?.length" class="tags">
      <span v-for="tag in post.tags" :key="tag" class="tag">
        #{{ tag }}
      </span>
    </div> -->
    </article>
    <div v-else>
      <!-- Článek nenalezen -->
      <h1>{{ t('blog.notFound') }}</h1>
    </div>
  </div>
</template>
