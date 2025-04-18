<script setup lang="ts">
import { useDark } from '@vueuse/core'

const isDark = useDark()
const { t } = useI18n()
const modelValue = ref(isDark.value)

watch(modelValue, (val) => {
  setTimeout(() => {
    isDark.value = val
  }, 150)
})

const options = computed(() => [
  { icon: 'darkMode', value: true, label: t('themeSwitcher.dark') },
  { icon: 'lightMode', value: false, label: t('themeSwitcher.light') },
])
</script>

<template>
  <ClientOnly>
    <ToggleSwitcher id="theme" v-model="modelValue" :options="options" />
    <template #fallback>
      <div
        class="w-[78px] h-[28px] border border-black/15 dark:border-white/15 rounded-lg flex items-center text-zinc-500 p-[2px]"
      >
        <div class="w-[36px] h-[22px] flex items-center justify-center">
          <Icon name="darkMode" :size="20" />
        </div>
        <div class="w-[36px] h-[22px] flex items-center justify-center">
          <Icon name="lightMode" :size="20" />
        </div>
      </div>
    </template>
  </ClientOnly>
</template>
