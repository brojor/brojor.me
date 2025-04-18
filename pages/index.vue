<script setup>
import techstack from '@/assets/data/techstack.json'

definePageMeta({
  title: 'welcome',
})
</script>

<template>
  <main class="max-w-[65ch] mx-auto mt-12">
    <section>
      <h1 class="text-6xl font-bold">
        {{ $t('landingPage.hi') }}, <br>
        {{ $t('landingPage.iAm') }} <BroJor />,
        <br>{{ $t('landingPage.webDeveloper') }}.
      </h1>
      <p class="text-xl mt-5">
        {{ $t('landingPage.description') }}
      </p>
    </section>
    <section class="mt-20">
      <h2 class="text-3xl font-semibold mb-10">
        {{ $t('landingPage.techStack.title') }}
      </h2>

      <div v-for="(items, category) in techstack" :key="category" class="mt-8">
        <h3 class="text-xl font-medium mb-5">
          {{ $t(`landingPage.techStack.${category}`) }}
        </h3>

        <div class="flex flex-wrap gap-2">
          <div v-for="item in items" :key="item.name">
            <Icon :name="item.icon" size="4rem" />
          </div>
        </div>
      </div>
    </section>
  </main>
</template>
