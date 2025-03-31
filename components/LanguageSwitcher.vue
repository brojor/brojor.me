<script setup lang="ts">
const { locale, locales, setLocale, setLocaleCookie } = useI18n()
const route = useRoute()
const { getTranslatedPostPath } = useTranslatedPostPath()

async function switchLocale(code: 'en' | 'cs') {
  if (route.name?.toString().includes('blog-slug')) {
    setLocaleCookie(code)

    const translatedPostPath = await getTranslatedPostPath()
    if (translatedPostPath) {
      navigateTo(translatedPostPath)
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
