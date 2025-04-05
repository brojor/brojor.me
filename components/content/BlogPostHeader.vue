<script setup lang="ts">
defineProps<{
  title: string
  publishedDate: string
  readingTime: number
}>()
</script>

<template>
  <header class="mb-8">
    <h1>
      {{ title }}
    </h1>
    <BlogMeta :published-date="publishedDate" :reading-time="readingTime" class="-mt-4" />
  </header>
</template>
