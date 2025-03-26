<script setup lang="ts">
defineProps<{ date: string, readingTime: number }>()

const { locale } = useI18n()
</script>

<template>
  <div class="space-x-2 text-sm leading-relaxed text-fg/70">
    <time :datetime="new Date(date).toISOString().split('T')[0]">{{ new Date(date).toLocaleDateString(locale) }}</time>
    <span>·</span>
    <span>{{ readingTime }} min čtení</span>
  </div>
</template>
