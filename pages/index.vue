<script setup>
import techstack from '@/assets/data/techstack.json'

definePageMeta({
  title: 'welcome',
})
</script>

<template>
  <main class="mx-auto max-w-[65ch]">
    <section class="my-16 md:my-32">
      <h1 class="text-4xl font-bold md:text-6xl">
        {{ $t('landingPage.hi') }}, <br>
        {{ $t('landingPage.iAm') }} <BroJor />,
        <br>{{ $t('landingPage.webDeveloper') }}.
      </h1>
      <p class="mt-4 text-lg md:mt-5 md:text-xl">
        {{ $t('landingPage.description') }}
      </p>
    </section>
    <section>
      <h2 class="text-2xl font-semibold md:text-3xl">
        {{ $t('landingPage.techStack.title') }}
      </h2>
      <hr class="mb-6 mt-3 border-accent-light/50 md:mb-10 md:mt-4">

      <div class="space-y-10 md:space-y-12">
        <div v-for="(items, category) in techstack" :key="category">
          <h3 class="mb-4 text-lg font-medium md:mb-5 md:text-xl">
            {{ $t(`landingPage.techStack.${category}`) }}:
          </h3>
          <div class="flex flex-wrap justify-center gap-2 sm:justify-start">
            <NuxtLink v-for="item in items" :key="item.name" :to="item.url" target="_blank" class="w-[98px] border border-white/20 rounded-lg py-3 md:w-[114px] md:py-4">
              <Icon :name="item.icon" class="mx-auto h-10 w-10 opacity-90 md:h-12 md:w-12" />
              <p class="mt-2 text-center text-xs md:mt-3 md:text-sm">
                {{ item.name }}
              </p>
            </NuxtLink>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>
