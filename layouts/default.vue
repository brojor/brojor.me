<script setup>
const head = useLocaleHead()
const { baseUrl } = useI18n()

useSeoMeta({
  ogTitle: '%s',
  ogSiteName: `${useRuntimeConfig().public.siteName}`,
  twitterCard: 'summary_large_image',
  twitterSite: '@brojor_dev',
})

useSchemaOrg([
  definePerson({
    name: 'BroJor',
    image: '/profile-photo.webp',
    description:
        'Passionate web developer focusing on Vue.js ecosystem.',
    url: baseUrl.value,
    sameAs: [
      'https://github.com/brojor',
      'https://www.linkedin.com/in/brojor',
      'https://x.com/brojor_dev',
    ],
  }),
  defineWebSite({
    name: `${useRuntimeConfig().public.siteName}`,
  }),
])
</script>

<template>
  <div>
    <Html :lang="head.htmlAttrs.lang" :dir="head.htmlAttrs.dir">
      <Head>
        <template v-for="link in head.link" :key="link.hid">
          <Link :id="link.hid" :rel="link.rel" :href="link.href" :hreflang="link.hreflang" />
        </template>
        <template v-for="meta in head.meta" :key="meta.hid">
          <Meta :id="meta.hid" :property="meta.property" :content="meta.content" />
        </template>
      </Head>
      <Body class="font-sans bg-default text-default">
        <header class="flex justify-between items-center fixed top-0 left-0 right-0 z-50 px-4 py-2 sm:px-6 bg-white/70 dark:bg-zinc-950/70 header-backdrop">
          <Logo />
          <div class="flex gap-2 items-center">
            <NuxtLinkLocale to="/blog" class="text-lg font-medium hover:text-strong transition-colors mr-2 flex items-center gap-1">
              <Icon name="material-symbols:article-outline" class="w-6 h-6" />
              Blog
            </NuxtLinkLocale>
            <ThemeSwitcher />
            <LanguageSwitcher />
          </div>
        </header>
        <slot />
        <footer class="mt-8 border-t border-t-black/20 dark:border-t-white/20">
          <div class="max-w-[65ch] mx-auto">
            <div class="py-4 text-sm text-center">
              <div>
                &copy; {{ new Date().getFullYear() }} Bronislav Jordán
                <span class="ml-2">
                  <a href="https://creativecommons.org/licenses/by-nc-sa/4.0/" target="_blank" rel="license noopener" class="hover:text-strong transition-colors duration-300">
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
