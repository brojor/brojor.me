<script setup>
// const route = useRoute()
// const { t } = useI18n()
const head = useLocaleHead()
// const title = computed(() => t(route.meta.title, 'Brojor'))
</script>

<template>
  <div>
    <Html :lang="head.htmlAttrs.lang" :dir="head.htmlAttrs.dir">
      <!-- <Head>
        <Title>{{ title }}</Title>
        <template v-for="link in head.link" :key="link.hid">
          <Link :id="link.hid" :rel="link.rel" :href="link.href" :hreflang="link.hreflang" />
        </template>
        <template v-for="meta in head.meta" :key="meta.hid">
          <Meta :id="meta.hid" :property="meta.property" :content="meta.content" />
        </template>
      </Head> -->
      <Body>
        <LanguageSwitcher />
        <slot />
      </Body>
    </Html>
  </div>
</template>
