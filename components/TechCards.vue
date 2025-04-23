<script setup lang="ts">
interface Item {
  name: string
  icon: string
  url: string
}

defineProps<{
  items: Item[]
}>()
const { x, y } = useMouse()
const refs = useTemplateRefsList<HTMLDivElement>()

function updateMousePosition() {
  for (const card of refs.value) {
    const rect = card.getBoundingClientRect()
    card.style.setProperty('--mouse-x', `${x.value - window.scrollX - rect.left}px`)
    card.style.setProperty('--mouse-y', `${y.value - window.scrollY - rect.top}px`)
  }
}

useEventListener('mousemove', updateMousePosition)
useEventListener('scroll', updateMousePosition)
</script>

<template>
  <ul class="flex flex-wrap justify-center gap-2 sm:justify-start">
    <li v-for="item in items" :key="item.name">
      <NuxtLink :to="item.url" target="_blank" class="relative h-[98px] w-[98px] flex-center rounded-lg bg-black/20 md:h-[114px] md:w-[114px] dark:bg-white/20">
        <div :ref="refs.set" aria-hidden="true" class="absolute inset-0 z-1 rounded-lg hoverable:bg-[radial-gradient(300px_circle_at_var(--mouse-x)_var(--mouse-y),_#00D7B8,_transparent_40%)]" />
        <figure class="relative z-2 h-full w-full flex flex-col justify-center border border-black/20 rounded-[7px] hoverable:h-[calc(100%-2px)] hoverable:w-[calc(100%-2px)] dark:border-white/20 hoverable:border-none bg-default">
          <Icon :name="item.icon" class="mx-auto h-10 w-10 opacity-90 md:h-12 md:w-12" />
          <figcaption class="mt-2 text-center text-xs md:mt-3 md:text-sm">
            {{ item.name }}
          </figcaption>
        </figure>
      </NuxtLink>
    </li>
  </ul>
</template>
