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

const options = [{ icon: 'darkMode', value: true, label: t('themeSwitcher.dark') }, { icon: 'lightMode', value: false, label: t('themeSwitcher.light') }]
</script>

<template>
  <ClientOnly>
    <ToggleSwitcher id="theme" v-model="modelValue" :options="options" />
    <template #fallback>
      <div class="w-[82px] h-[34px] border border-black/10 dark:border-white/10 rounded-lg flex items-center text-zinc-500">
        <div class="pl-[12px] py-[2px]">
          <Icon name="darkMode" :size="20" />
        </div>
        <div class="pl-[16px] py-[2px]">
          <Icon name="lightMode" :size="20" />
        </div>
      </div>
    </template>
  </ClientOnly>
</template>
