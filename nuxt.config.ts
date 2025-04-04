// https://nuxt.com/docs/api/configuration/nuxt-config
import process from 'node:process'

export default defineNuxtConfig({
  app: {
    head: {
      titleTemplate: '%s %separator %siteName',
      templateParams: {
        siteName: process.env.NUXT_PUBLIC_SITE_NAME,
      },
    },
  },
  runtimeConfig: {
    public: {
      siteName: process.env.NUXT_PUBLIC_SITE_NAME,
    },
  },
  compatibilityDate: '2024-11-01',
  content: { build: { markdown: { highlight: { theme: 'vitesse-dark', langs: ['vue'] } } } },
  css: ['~/assets/css/reset.css', '~/assets/css/markdown.css', '~/assets/css/prose.css'],
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/robots',
    '@nuxt/content',
    '@nuxt/eslint',
    '@nuxt/fonts',
    '@nuxtjs/i18n',
    '@unocss/nuxt',
  ],
  eslint: {
    config: {
      standalone: false,
    },
  },
  i18n: {
    strategy: 'prefix_except_default',
    defaultLocale: 'cs',
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      redirectOn: 'root',
    },
    bundle: {
      optimizeTranslationDirective: false,
    },
    locales: [
      {
        code: 'cs',
        language: 'cs-CZ',
        name: 'Česky',
      },
      {
        code: 'en',
        language: 'en-US',
        name: 'English',
      },
    ],
    baseUrl: 'https://brojor.me',
    vueI18n: './i18n.config.ts',
  },
})
