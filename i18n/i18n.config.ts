export default defineI18nConfig(() => ({
  legacy: false,
  locale: 'cs',
  messages: {
    cs: {
      welcome: 'Vítejte',
      blog: {
        back: 'Zpět na blog',
        notFound: 'Článek nenalezen',
      },
    },
    en: {
      welcome: 'Welcome',
      blog: {
        back: 'Back to blog',
        notFound: 'Post not found',
      },
    },
  },
}))
