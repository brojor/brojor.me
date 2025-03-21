<script setup lang="ts">
const { locale, setLocaleCookie, locales } = useI18n()

const currentLocale = computed(() => {
  return locales.value.find(loc => loc.code === locale.value)
})

watch(locale, (newLocale) => {
  setLocaleCookie(newLocale)
})

const switchLocalePath = useSwitchLocalePath()
</script>

<template>
  <div class="language-switcher">
    <NuxtLink
      v-for="loc in locales"
      :key="loc.code"
      :class="{ active: loc.code === currentLocale?.code }"
      :to="switchLocalePath(loc.code)"
    >
      {{ loc.code }}
    </NuxtLink>
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
}

.language-switcher a.active {
  color: black;
}
</style>
