<script setup lang="ts">
interface Item {
  name: string
  icon: string
  url: string
}

defineProps<{
  items: Item[]
}>()
</script>

<template>
  <ul class="flex flex-wrap justify-center gap-2 sm:justify-start">
    <TechCard v-for="item in items" :key="item.name" :item="item" />
  </ul>
</template>
