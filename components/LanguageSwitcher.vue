<script setup lang="ts">
const { locale, locales, setLocale, setLocaleCookie } = useI18n()
const route = useRoute()
const currentLocale = computed(() => {
  return locales.value.find(loc => loc.code === locale.value)
})

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
  <div class="language-switcher">
    <a
      v-for="loc in locales"
      :key="loc.code"
      :class="{ active: loc.code === currentLocale?.code }"
      @click.prevent.stop="switchLocale(loc.code)"
    >
      {{ loc.code }}
    </a>
  </div>
</template>

<style scoped>
.language-switcher {
  display: inline-flex;
  gap: 5px;
  padding: 5px;
  border-radius: 5px;
  border: 1px solid gray;
}

.language-switcher a {
  color: gray;
  text-decoration: none;
  cursor: pointer;
  user-select: none;
}

.language-switcher a.active {
  color: black;
}
</style>
