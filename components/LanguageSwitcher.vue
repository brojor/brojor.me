<script setup lang="ts">
const { locale, locales, setLocale, setLocaleCookie } = useI18n()
const route = useRoute()
const { getTranslatedPost } = useTranslatedPost()

async function switchLocale(code: 'en' | 'cs') {
  if (route.name?.toString().includes('blog-slug')) {
    setLocaleCookie(code)

    const translatedPost = await getTranslatedPost()
    if (translatedPost.value) {
      navigateTo(translatedPost.value.path)
    }
  }
  else {
    setLocale(code)
  }
}
</script>

<template>
  <ToggleSwitcher :model-value="locale" :options="locales.map(loc => loc.code)" @update:model-value="switchLocale" />
</template>
