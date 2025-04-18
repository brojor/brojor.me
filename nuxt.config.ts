// https://nuxt.com/docs/api/configuration/nuxt-config
import process from 'node:process'

export default defineNuxtConfig({
  app: {
    head: {
      script: [
        {
          src: '/color-scheme-init.js',
          type: 'text/javascript',
        },
      ],
      templateParams: {
        siteName: process.env.NUXT_PUBLIC_SITE_NAME,
      },
      titleTemplate: '%s %separator %siteName',
    },
  },
  compatibilityDate: '2024-11-01',
  content: {
    build: {
      markdown: {
        highlight: {
          langs: ['vue', 'css', 'shell'],
          theme: {
            default: 'vitesse-dark',
            light: 'vitesse-light',
          },
        },
      },
    },
  },
  css: ['~/assets/css/reset.css', '~/assets/css/markdown.css', '~/assets/css/prose.css', '~/assets/css/main.css'],
  devtools: { enabled: true },
  eslint: {
    config: {
      standalone: false,
    },
  },
  i18n: {
    baseUrl: process.env.NUXT_PUBLIC_BASE_URL,
    bundle: {
      optimizeTranslationDirective: false,
    },
    defaultLocale: 'cs',
    detectBrowserLanguage: {
      cookieKey: 'i18n_redirected',
      redirectOn: 'root',
      useCookie: true,
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
    strategy: 'prefix_except_default',
    vueI18n: './i18n.config.ts',
  },
  icon: {
    aliases: {
      darkMode: 'material-symbols:dark-mode-outline-rounded',
      lightMode: 'material-symbols:light-mode-outline-rounded',
    },
  },
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
    '@nuxt/icon',
  ],
  runtimeConfig: {
    public: {
      siteName: process.env.NUXT_PUBLIC_SITE_NAME,
    },
  },
  schemaOrg: {
    defaults: false,
  },
  sitemap: {
    sources: [
      '/api/__sitemap__/urls',
    ],
  },
})
