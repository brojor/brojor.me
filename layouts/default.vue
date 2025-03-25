<script setup>
// const route = useRoute()
// const { t } = useI18n()
const head = useLocaleHead()
// const title = computed(() => t(route.meta.title, 'Brojor'))
</script>

<template>
  <div>
    <Html :lang="head.htmlAttrs.lang" :dir="head.htmlAttrs.dir" class="dark">
      <!-- <Head>
        <Title>{{ title }}</Title>
        <template v-for="link in head.link" :key="link.hid">
          <Link :id="link.hid" :rel="link.rel" :href="link.href" :hreflang="link.hreflang" />
        </template>
        <template v-for="meta in head.meta" :key="meta.hid">
          <Meta :id="meta.hid" :property="meta.property" :content="meta.content" />
        </template>
      </Head> -->
      <Body class="bg-zinc-950 font-sans">
        <LanguageSwitcher />
        <slot />
        <footer class="mt-8 border-t border-bg-deeper text-fg">
          <div class="max-w-[65ch] mx-auto">
            <div class="py-4 text-sm">
              <div>
                &copy; {{ new Date().getFullYear() }} Bronislav Jordán
                <span class="ml-2">
                  <a href="https://creativecommons.org/licenses/by-nc-sa/4.0/" target="_blank" rel="license noopener" class="hover:text-fg-deeper transition-colors duration-300">
                    CC BY-NC-SA 4.0
                  </a>
                </span>
              </div>
            </div>
          </div>
        </footer>
      </Body>
    </Html>
  </div>
</template>
