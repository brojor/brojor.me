<script setup lang="ts">
const { locale, locales, setLocale, setLocaleCookie } = useI18n()
const route = useRoute()
const { translatedPost } = useTranslatedPost()

async function switchLocale(code: 'en' | 'cs') {
  if (route.name?.toString().includes('blog-slug')) {
    setLocaleCookie(code)

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
  <ToggleSwitcher id="lang" :model-value="locale" :options="locales.map(loc => loc.code)" label="Jazyk" @update:model-value="switchLocale" />
</template>
