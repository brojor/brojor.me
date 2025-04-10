<script setup lang="ts">
import { useDark } from '@vueuse/core'

const isDark = useDark()
</script>

<template>
  <ClientOnly>
    <ToggleSwitcher v-model="isDark" :options="[true, false]" />
  </ClientOnly>
</template>
