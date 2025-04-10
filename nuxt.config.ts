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
  css: ['~/assets/css/reset.css', '~/assets/css/markdown.css', '~/assets/css/prose.css', '~/assets/css/main.css'],
  content: {
    build: {
      markdown: {
        highlight: {
          theme: {
            light: 'vitesse-light',
            default: 'vitesse-dark',
          },
          langs: ['vue', 'css', 'shell'],
        },
      },
    },
  },
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/sitemap',
    '@nuxtjs/robots',
    '@nuxt/content',
    '@nuxt/eslint',
    '@nuxt/fonts',
    '@nuxtjs/i18n',
    '@unocss/nuxt',
    'nuxt-schema-org',
    '@vueuse/nuxt',
  ],
  eslint: {
    config: {
      standalone: false,
    },
  },
  sitemap: {
    sources: [
      '/api/__sitemap__/urls',
    ],
  },
  schemaOrg: {
    defaults: false,
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
    baseUrl: process.env.NUXT_PUBLIC_BASE_URL,
    vueI18n: './i18n.config.ts',
  },
})
