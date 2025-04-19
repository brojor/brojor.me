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
        class="h-[28px] w-[78px] flex items-center border border-black/15 rounded-lg p-[2px] text-zinc-500 dark:border-white/15"
      >
        <div class="h-[22px] w-[36px] flex items-center justify-center">
          <Icon name="darkMode" :size="20" />
        </div>
        <div class="h-[22px] w-[36px] flex items-center justify-center">
          <Icon name="lightMode" :size="20" />
        </div>
      </div>
    </template>
  </ClientOnly>
</template>
