<script setup lang="ts">
defineProps<{ publishedDate: string, readingTime: number }>()

const { locale, t } = useI18n()
</script>

<template>
  <div class="space-x-2 text-sm leading-relaxed text-black-mute/70 dark:text-white-mute/70">
    <time :datetime="new Date(publishedDate).toISOString().split('T')[0]">{{ new Date(publishedDate).toLocaleDateString(locale) }}</time>
    <span>·</span>
    <span>{{ `${readingTime} ${t('blogMeta.readingTime')}` }}</span>
  </div>
</template>
