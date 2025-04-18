<script setup>
import techstack from '@/assets/data/techstack.json'

definePageMeta({
  title: 'welcome',
})
</script>

<template>
  <main class="max-w-[65ch] mx-auto">
    <section class="my-16 md:my-32">
      <h1 class="text-4xl md:text-6xl font-bold">
        {{ $t('landingPage.hi') }}, <br>
        {{ $t('landingPage.iAm') }} <BroJor />,
        <br>{{ $t('landingPage.webDeveloper') }}.
      </h1>
      <p class="text-lg md:text-xl mt-4 md:mt-5">
        {{ $t('landingPage.description') }}
      </p>
    </section>
    <section>
      <h2 class="text-2xl md:text-3xl font-semibold">
        {{ $t('landingPage.techStack.title') }}
      </h2>
      <hr class="border-accent-light/50 mt-3 md:mt-4 mb-6 md:mb-10">

      <div class="space-y-10 md:space-y-12">
        <div v-for="(items, category) in techstack" :key="category">
          <h3 class="text-lg md:text-xl font-medium mb-4 md:mb-5">
            {{ $t(`landingPage.techStack.${category}`) }}:
          </h3>
          <div class="flex flex-wrap gap-2 justify-center sm:justify-start">
            <div v-for="item in items" :key="item.name" class="border border-white/20 w-[98px] md:w-[114px] py-3 md:py-4 rounded-lg">
              <Icon :name="item.icon" class="mx-auto opacity-90 h-10 w-10 md:h-12 md:w-12" />
              <p class="text-center text-xs md:text-sm mt-2 md:mt-3">
                {{ item.name }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>
