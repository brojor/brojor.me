export default defineI18nConfig(() => ({
  legacy: false,
  locale: 'cs',
  messages: {
    cs: {
      welcome: 'Vítejte',
      blog: {
        back: 'Zpět na blog',
        notFound: 'Článek nenalezen',
        title: 'Blog webového vývojáře',
        description: 'S vášní pro Vue.js ekosystém a webové technologie sdílím své zkušenosti, praktické postřehy a elegantní řešení reálných vývojářských výzev.',
        ogImageAlt: 'Blog – Praktické postřehy ze světa webových technologií',
      },
    },
    en: {
      welcome: 'Welcome',
      blog: {
        back: 'Back to blog',
        notFound: 'Post not found',
        title: 'Web developer blog',
        description: 'With a passion for the Vue.js ecosystem and web technologies, I share my experiences, practical insights, and elegant solutions to real-world development challenges.',
        ogImageAlt: 'Blog – Practical insights from the world of web technologies',
      },
    },
  },
}))
