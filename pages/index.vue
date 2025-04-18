<script setup>
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
  </main>
</template>
