<script setup lang="ts">
interface Item {
  name: string
  icon: string
  url: string
}

defineProps<{
  item: Item
}>()

const card = ref<HTMLDivElement>()
const { x, y } = useMouse()

watchEffect(() => {
  if (!card.value)
    return

  const rect = card.value.getBoundingClientRect()
  const relativeX = x.value - window.scrollX - rect.left
  const relativeY = y.value - window.scrollY - rect.top

  card.value.style.setProperty('--mouse-x', `${relativeX}px`)
  card.value.style.setProperty('--mouse-y', `${relativeY}px`)
})
</script>

<template>
  <li ref="card">
    <NuxtLink :to="item.url" target="_blank" class="relative h-[98px] w-[98px] flex-center rounded-lg bg-black/20 md:h-[114px] md:w-[114px] dark:bg-white/20">
      <div aria-hidden="true" class="absolute inset-0 z-1 rounded-lg hoverable:bg-[radial-gradient(300px_circle_at_var(--mouse-x)_var(--mouse-y),_#00D7B8,_transparent_40%)]" />
      <figure class="relative z-2 h-full w-full flex flex-col justify-center border border-black/20 rounded-[7px] hoverable:h-[calc(100%-2px)] hoverable:w-[calc(100%-2px)] dark:border-white/20 hoverable:border-none bg-default">
        <Icon :name="item.icon" class="mx-auto h-10 w-10 opacity-90 md:h-12 md:w-12" />
        <figcaption class="mt-2 text-center text-xs md:mt-3 md:text-sm">
          {{ item.name }}
        </figcaption>
      </figure>
    </NuxtLink>
  </li>
</template>
