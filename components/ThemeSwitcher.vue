<script setup lang="ts">
import { useDark } from '@vueuse/core'

const isDark = useDark()
const modelValue = ref(isDark.value)

watch(modelValue, (val) => {
  setTimeout(() => {
    isDark.value = val
  }, 150)
})

const options = [{ icon: 'darkMode', value: true }, { icon: 'lightMode', value: false }]
</script>

<template>
  <ClientOnly>
    <ToggleSwitcher id="theme" v-model="modelValue" :options="options" />
  </ClientOnly>
</template>
