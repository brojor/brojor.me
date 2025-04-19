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
        <header class="fixed left-0 right-0 top-0 z-50 flex items-center justify-between bg-white/70 px-4 py-2 header-backdrop dark:bg-zinc-950/70 sm:px-6">
          <Logo />
          <div class="flex items-center gap-2">
            <NuxtLinkLocale to="/blog" class="mr-2 flex items-center gap-1 text-lg font-medium transition-colors hover:text-strong">
              <Icon name="material-symbols:article-outline" class="h-6 w-6" />
              Blog
            </NuxtLinkLocale>
            <ThemeSwitcher />
            <LanguageSwitcher />
          </div>
        </header>
        <slot />
        <footer class="mt-8 border-t border-t-black/20 dark:border-t-white/20">
          <div class="mx-auto max-w-[65ch]">
            <div class="py-4 text-center text-sm">
              <div>
                &copy; {{ new Date().getFullYear() }} Bronislav Jordán
                <span class="ml-2">
                  <a href="https://creativecommons.org/licenses/by-nc-sa/4.0/" target="_blank" rel="license noopener" class="transition-colors duration-300 hover:text-strong">
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
