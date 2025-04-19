<script setup lang="ts">
defineProps<{ publishedDate: string, readingTime: number }>()

const { locale, t } = useI18n()
</script>

<template>
  <div class="text-sm text-black-mute/70 leading-relaxed space-x-2 dark:text-white-mute/70">
    <time :datetime="new Date(publishedDate).toISOString().split('T')[0]">{{ new Date(publishedDate).toLocaleDateString(locale) }}</time>
    <span>·</span>
    <span>{{ `${readingTime} ${t('blogMeta.readingTime')}` }}</span>
  </div>
</template>
