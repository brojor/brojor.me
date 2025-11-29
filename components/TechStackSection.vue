<script setup>
import techstack from '@/assets/data/techstack.json'
</script>

<template>
  <section>
    <h2 :id="`${$t('landingPage.techStack.title')}`" class="text-[22px] font-semibold md:text-[26px]">
      <NuxtLink :to="`#${$t('landingPage.techStack.title')}`">
        {{ $t('landingPage.techStack.title') }}
      </NuxtLink>
    </h2>
    <hr class="mb-6 mt-3 border-accent-light/50 md:mb-10 md:mt-4">

    <div class="space-y-10 md:space-y-12">
      <article v-for="(items, category) in techstack" :key="category">
        <h3 class="mb-4 text-[16px] font-medium md:mb-5 md:text-[18px]">
          {{ $t(`landingPage.techStack.${category}`) }}:
        </h3>
        <TechCards :items="items" />
      </article>
    </div>
  </section>
</template>
