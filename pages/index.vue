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
      <h2 :id="`${$t('landingPage.techStack.title')}`" class="text-2xl font-semibold md:text-3xl">
        <NuxtLink :to="`#${$t('landingPage.techStack.title')}`">
          {{ $t('landingPage.techStack.title') }}
        </NuxtLink>
      </h2>
      <hr class="mb-6 mt-3 border-accent-light/50 md:mb-10 md:mt-4">

      <div class="space-y-10 md:space-y-12">
        <article v-for="(items, category) in techstack" :key="category">
          <h3 class="mb-4 text-lg font-medium md:mb-5 md:text-xl">
            {{ $t(`landingPage.techStack.${category}`) }}:
          </h3>
          <TechCards :items="items" />
        </article>
      </div>
    </section>
  </main>
</template>
