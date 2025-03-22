<script setup lang="ts">
const { locale, locales, setLocale, setLocaleCookie } = useI18n()
const route = useRoute()
const currentLocale = computed(() => {
  return locales.value.find(loc => loc.code === locale.value)
})

const { data: post } = await useAsyncData(
  `post-${route.path}`,
  () => queryCollection(locale.value)
    .where('path', '=', route.path)
    .first(),
  { watch: [locale] },
)
const alternativeLocale = computed(() => locale.value === 'cs' ? 'en' : 'cs')
const translationKey = post.value?.translationKey

const { data: translatedPost } = await useAsyncData(
  `translated-post-${translationKey}-${alternativeLocale.value}`,
  async () => {
    if (!translationKey)
      return null

    return queryCollection(alternativeLocale.value)
      .where('translationKey', '=', translationKey)
      .first()
  },
  { watch: [post, locale] },
)

async function switchLocale(code: 'en' | 'cs') {
  if (route.name?.toString().includes('blog-slug')) {
    setLocaleCookie(code)
    navigateTo(translatedPost.value?.path)
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
