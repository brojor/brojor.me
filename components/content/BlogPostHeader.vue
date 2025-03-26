<script setup lang="ts">
defineProps<{
  title: string
  date: string
  readingTime: number
}>()
</script>

<template>
  <header class="mb-8">
    <h1>
      {{ title }}
    </h1>
    <BlogMeta :date="date" :reading-time="readingTime" class="-mt-4" />
  </header>
</template>
