<script setup>
import profilePhoto from '@/assets/profile-photo.png'
</script>

<template>
  <section class="my-16 flex flex-col items-center md:my-32 md:flex-row">
    <div class="w-full md:w-[65%]">
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
</template>
