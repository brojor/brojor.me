<script setup>
import techstack from '@/assets/data/techstack.json'
import profilePhoto from '@/assets/profile-photo.png'

definePageMeta({
  title: 'welcome',
})
</script>

<template>
  <main class="mx-auto max-w-[75ch] font-landing-page">
    <section class="my-16 flex flex-col items-center md:my-32 md:flex-row">
      <div class="[container-type:inline-size] w-full md:w-[65%]">
        <h1 class="text-[32px] font-bold leading-tight md:text-[40px]">
          {{ $t('landingPage.hi') }}, <br>
          {{ $t('landingPage.iAm') }} <BroJor />,
          <br>{{ $t('landingPage.webDeveloper') }}.
        </h1>
        <p class="mt-4 text-[20px] md:mt-5">
          {{ $t('landingPage.description') }}.
        </p>
      </div>
      <div class="hidden w-full md:w-[35%] md:flex md:justify-end">
        <img
          :src="profilePhoto"
          alt="Profile photo"
        >
      </div>
    </section>
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
  </main>
</template>
