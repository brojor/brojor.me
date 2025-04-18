export default defineI18nConfig(() => ({
  legacy: false,
  locale: 'cs',
  messages: {
    cs: {
      welcome: 'Vítejte',
      blogListing: {
        readMore: 'Číst článek',
      },
      blog: {
        back: 'Zpět na blog',
        notFound: 'Článek nenalezen',
        title: 'Blog webového vývojáře',
        description: 'S vášní pro Vue.js ekosystém a webové technologie sdílím své zkušenosti, praktické postřehy a elegantní řešení reálných vývojářských výzev.',
        ogImageAlt: 'Blog – Praktické postřehy ze světa webových technologií',
        itemList: 'Seznam článků na blogu',
      },
      toggleSwitcher: {
        legend: {
          lang: 'Jazyk',
          theme: 'Barevný režim',
        },
      },
      themeSwitcher: {
        dark: 'Tmavý režim',
        light: 'Světlý režim',
      },
      blogMeta: {
        readingTime: 'min čtení',
      },
      landingPage: {
        hi: 'Ahoj',
        iAm: 'jsem',
        webDeveloper: 'webový vývojář',
        description: 'Rád tvořím nápaditá řešení pomocí webových technologií',
      },
    },
    en: {
      welcome: 'Welcome',
      blogListing: {
        readMore: 'Read more',
      },
      blog: {
        back: 'Back to blog',
        notFound: 'Post not found',
        title: 'Web developer blog',
        description: 'With a passion for the Vue.js ecosystem and web technologies, I share my experiences, practical insights, and elegant solutions to real-world development challenges.',
        ogImageAlt: 'Blog – Practical insights from the world of web technologies',
        itemList: 'List of blog posts',
      },
      toggleSwitcher: {
        legend: {
          lang: 'Language',
          theme: 'Color scheme',
        },
      },
      themeSwitcher: {
        dark: 'Dark mode',
        light: 'Light mode',
      },
      blogMeta: {
        readingTime: 'min read',
      },
      landingPage: {
        hi: 'Hi',
        iAm: 'I am',
        webDeveloper: 'web developer',
        description: 'I like to create amazing things using web technologies',
      },
    },
  },
}))
