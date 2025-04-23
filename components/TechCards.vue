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
    <li v-for="item in items" :key="item.name">
      <NuxtLink :to="item.url" target="_blank">
        <figure class="w-[98px] border border-white/20 rounded-lg py-3 md:w-[114px] md:py-4">
          <Icon :name="item.icon" class="mx-auto h-10 w-10 opacity-90 md:h-12 md:w-12" />
          <figcaption class="mt-2 text-center text-xs md:mt-3 md:text-sm">
            {{ item.name }}
          </figcaption>
        </figure>
      </NuxtLink>
    </li>
  </ul>
</template>
