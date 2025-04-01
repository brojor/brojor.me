---
title: "Implementace vícejazyčného blogu v Nuxt 3 s Content modulem"
description: "Objevte postup vytvoření vícejazyčného blogu s Nuxt 3 a Content modulem. Naučte se organizovat obsah, propojit jazykové verze a optimalizovat URL pro dokonalé SEO."
date: "2025-03-23"
tags:
  - nuxt3
  - i18n
  - vue
  - lokalizace
  - seo
translationKey: "multilingual-blog"
readingTime: 15
---

::blog-post-header{:title="title" :date="date" :reading-time="readingTime"}
::

Když jsem začal psát blog o technologiích, které používám, narazil jsem na problém: jak nabídnout obsah v češtině i angličtině, aniž by to komplikovalo správu článků nebo zhoršilo SEO?

Využití **Nuxt Content** a **Nuxt I18n** modulů se ukázalo jako ideální řešení. V tomto článku se s vámi podělím o svůj postup: od architektury adresářů přes propojení jazykových verzí až po optimalizaci URL a výkonu. Pokud se chystáte postavit vícejazyčný web nebo se chcete dozvědět, jak zvládnout lokalizaci v moderním [Vue](https://vuejs.org/) ekosystému, tento návod je právě pro vás.

## Požadavky a cíle

Před zahájením implementace jsem si stanovil několik klíčových požadavků:

1. **Plnohodnotná podpora češtiny a angličtiny** - všechny části webu včetně blogu musí být dostupné v obou jazycích.
2. **Optimalizované URL adresy** - čisté URL v češtině bez jazykového prefixu, anglické s prefixem `/en/`.
3. **Propojení překladů** - možnost přepnout mezi jazykovými verzemi stejného článku.
4. **Jednotné uživatelské rozhraní** - konzistentní přepínač jazyků na všech stránkách.
5. **SEO optimalizace** - správné metadata pro každý jazyk.

Pro implementaci jsem zvolil následující technologie:
- [**Nuxt 3**](https://nuxt.com/) - jako základní framework pro vývoj aplikace
- [**@nuxt/content**](https://content.nuxt.com/) - modul pro správu obsahu ve formátu Markdown
- [**@nuxtjs/i18n**](https://i18n.nuxtjs.org/) - modul pro lokalizaci aplikace

## Architektura řešení

### Struktura adresářů

Pro organizaci vícejazyčného obsahu jsem zvolil jednoduchou a přehlednou strukturu:

```none
content/
├── cs/
│   ├── prvni-clanek.md
│   ├── druhy-clanek.md
│   └── treti-clanek.md
└── en/
    ├── first-article.md
    ├── second-article.md
    └── third-article.md
```

Tato struktura umožňuje snadnou navigaci a správu obsahu, přičemž jasně odděluje články podle jazyka. Soubory jsou propojeny přes unikátní `translationKey` definovaný v metadatech každého článku.

### Konfigurace Content modulu

V souboru `content.config.ts` jsem definoval [kolekce](https://content.nuxt.com/docs/collections/define) rozdělené podle jazyků, což umožňuje efektivní správu obsahu. Zásadním prvkem této konfigurace je parametr `prefix`, který zajišťuje správné generování URL adres pro články:

```typescript
// content.config.ts
import { defineCollection, defineContentConfig, z } from '@nuxt/content'

export default defineContentConfig({
  collections: {
    cs: defineCollection({
      source: {
        include: 'cs/*.md',
        prefix: '/blog', // Důležité pro generování správných URL
      },
      type: 'page',
      schema: z.object({
        title: z.string(),
        description: z.string(),
        image: z.string().optional(),
        date: z.date(),
        tags: z.array(z.string()),
        translationKey: z.string(),
      }),
    }),

    en: defineCollection({
      source: {
        include: 'en/*.md',
        prefix: '/en/blog', // Generuje správné URL s prefixem jazyka
      },
      type: 'page',
      schema: z.object({
        title: z.string(),
        description: z.string(),
        image: z.string().optional(),
        date: z.date(),
        tags: z.array(z.string()),
        translationKey: z.string(),
      }),
    }),
  },
})
```

Toto nastavení zajišťuje, že české články budou mít URL ve formátu `/blog/prvni-clanek` a anglické ve formátu `/en/blog/first-article`, což odpovídá naší strategii lokalizace URL. Všimněte si použití property `schema`, která umožňuje definovat vlastní strukturu dat pomocí (Zod)[https://zod.dev/].

### Konfigurace i18n modulu

Pro lokalizaci aplikace jsem použil [strategii](https://i18n.nuxtjs.org/docs/guide#strategies) `prefix_except_default`, která zajišťuje čisté URL pro výchozí jazyk (čeština) a přidává prefix `/en/` pro anglickou verzi:

```typescript
// nuxt.config.ts
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  modules: ['@nuxt/content', '@nuxtjs/i18n'],
  i18n: {
    strategy: 'prefix_except_default',
    defaultLocale: 'cs',
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      redirectOn: 'root',
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
  },
})
```

Nastavení `detectBrowserLanguage` optimalizuje uživatelský zážitek následujícími způsoby:

- **useCookie: true** - Zapamatuje si jazykovou preferenci uživatele mezi návštěvami pomocí cookie
- **cookieKey: 'i18n_redirected'** - Definuje standardní název cookie pro jazykové přesměrování
- **redirectOn: 'root'** - Zajišťuje, že detekce jazyka a přesměrování proběhne pouze při návštěvě hlavní stránky ('/')

Tato konfigurace vytváří rovnováhu mezi uživatelskou přívětivostí (automatická detekce jazyka) a předvídatelností chování (bez nečekaných přesměrování na vnořených stránkách).

Doplňující konfigurace překladů uživatelského rozhraní se nachází v souboru `i18n.config.ts`:

```typescript
// i18n/i18n.config.ts
export default defineI18nConfig(() => ({
  legacy: false,
  locale: 'cs',
  messages: {
    cs: {
      blog: {
        back: 'Zpět na blog',
        notFound: 'Článek nenalezen',
      },
    },
    en: {
      blog: {
        back: 'Back to blog',
        notFound: 'Post not found',
      },
    },
  },
}))
```

### Tok dat a interakce komponent

Nyní, když jsme si definovali architekturu a nastavení projektu, podívejme se na konkrétní implementaci jednotlivých částí aplikace. Začneme výpisem blogových příspěvků, který slouží jako vstupní bod do našeho blogu.

## Implementace výpisu blogových příspěvků

Pro výpis článků jsem vytvořil stránku, která automaticky načítá obsah podle aktuálního jazyka:

```vue
<!-- pages/blog/index.vue -->
<script setup lang="ts">
const { locale } = useI18n()

const { data: posts } = await useAsyncData(
  `blog-posts-${locale.value}`, // Dynamický klíč zajišťuje oddělenou cache pro každý jazyk
  () => queryCollection(locale.value).order('date', 'DESC').all(),
)
</script>

<template>
  <div class="blog-container">
    <h1>Blog</h1>
    <ul class="post-list">
      <li v-for="post in posts" :key="post.id" class="post-card">
        <h2>
          <NuxtLink :to="post.path">
            {{ post.title }}
          </NuxtLink>
        </h2>
        <p class="date">
          {{ new Date(post.date).toLocaleDateString(locale) }}
        </p>
        <p class="description">
          {{ post.description }}
        </p>
        <NuxtLink :to="post.path" class="read-more">
          {{ locale === 'cs' ? 'Číst více' : 'Read more' }}
        </NuxtLink>
      </li>
    </ul>
  </div>
</template>
```

Důležitým detailem v implementaci je dynamický klíč v `useAsyncData` (`blog-posts-${locale.value}`). Tento přístup přináší několik zásadních výhod:

1. **Oddělená cache pro každý jazyk** - Nuxt vytvoří samostatnou cache pro české a anglické články, což umožňuje efektivní přepínání mezi jazyky.

2. **Automatické obnovení dat při změně jazyka** - Při přepnutí jazyka se změní klíč cache, což spustí nové načtení dat pro aktuální jazyk.

3. **Paralelní ukládání dat** - Data pro různé jazyky mohou být uložena souběžně v cache. Při opětovném přepnutí na předchozí jazyk se data nemusí znovu načítat ze serveru.

Tento zdánlivě drobný detail významně zlepšuje uživatelský zážitek a výkon aplikace při přepínání mezi jazyky.

V šabloně pak zobrazuji seznam příspěvků s jejich názvy, daty a popisky. Datumy jsou automaticky formátovány podle aktuálního jazyka díky použití `toLocaleDateString(locale)`.

## Implementace detailu článku

Stránka detailu článku zobrazuje obsah a poskytuje možnost navigace zpět na seznam článků:

```vue
<!-- pages/blog/[slug].vue -->
<script setup lang="ts">
import { NuxtLinkLocale } from '#components'

const route = useRoute()
const { locale, t } = useI18n()

const { data: post } = await useAsyncData(
  `post-${route.path}`,
  () => queryCollection(locale.value)
    .where('path', '=', route.path)
    .first(),
)
</script>

<template>
  <div>
    <NuxtLinkLocale to="/blog">
      {{ t('blog.back') }}
    </NuxtLinkLocale>
    <article v-if="post !== null">
      <p>{{ new Date(post.date).toLocaleDateString(locale) }}</p>

      <ContentRenderer :value="post" />

      <div v-if="post.tags?.length">
        <span v-for="tag in post.tags" :key="tag">
          #{{ tag }}
        </span>
      </div>
    </article>
    <div v-else>
      <h1>{{ t('blog.notFound') }}</h1>
    </div>
  </div>
</template>
```

V detailu článku používám `ContentRenderer` komponentu, která automaticky renderuje [Markdown](https://content.nuxt.com/docs/files/markdown) obsah z Content modulu. Důležitým prvkem je použití `NuxtLinkLocale` místo běžného `NuxtLink`, což zajišťuje správné zachování aktuálního jazyka při navigaci.

Pro zobrazení chybových zpráv a navigačních textů používám lokalizované texty z i18n konfigurace pomocí `t('blog.back')` a `t('blog.notFound')`, což zajišťuje konzistentní uživatelský zážitek v obou jazycích.

## Vytvoření composable pro překlady článků

Pro oddělení zodpovědností a zapouzdření veškeré logiky spojené s propojením jazykových verzí jsem vytvořil vlastní composable funkci:

```typescript
// composables/useTranslatedPostPath.ts
export function useTranslatedPostPath() {
  const { locale } = useI18n()
  const route = useRoute()

  const { data: originalPost, execute: fetchOriginalPost } = useAsyncData(
    `post-${route.path}`,
    () => queryCollection(locale.value).where('path', '=', route.path).first(),
    { immediate: false }, // zabraňuje automatickému spuštění dotazů při inicializaci
  )

  const translationKey = computed(() => originalPost.value?.translationKey)
  const alternativeLocale = computed(() => locale.value === 'cs' ? 'en' : 'cs')

  const { data: translatedPost, execute: fetchTranslatedPost } = useAsyncData(
    `translated-post-${translationKey.value}-${alternativeLocale.value}`,
    () => queryCollection(alternativeLocale.value)
      .where('translationKey', '=', translationKey.value)
      .first(),
    { immediate: false }, // zabraňuje automatickému spuštění dotazů při inicializaci
  )

  async function getTranslatedPostPath() {
    await fetchOriginalPost()
    if (!translationKey.value) {
      return null
    }
    await fetchTranslatedPost()

    return translatedPost.value?.path
  }

  return {
    getTranslatedPostPath,
  }
}
```

Důležitým detailem implementace je nastavení `{ immediate: false }` u obou volání `useAsyncData`. Toto nastavení zabraňuje automatickému spuštění dotazů při vytvoření composable. Namísto toho explicitně kontrolujeme tok dat voláním funkcí `fetchOriginalPost()` a `fetchTranslatedPost()` uvnitř metody `getTranslatedPostPath()`.

Tento přístup nám dává větší kontrolu nad načítáním dat a eliminuje potenciální problémy s nesprávným přesměrováním, které by mohly nastat, kdyby se data načítala a zpracovávala automaticky.

Struktura composable je jednoduchá a efektivní:

1. Nejprve načte aktuální článek a získá jeho `translationKey`
2. Poté najde článek se stejným `translationKey` v druhém jazyce
3. Vrátí cestu k přeloženému článku, pokud existuje

Tato composable funkce tak poskytuje jednoduché rozhraní `getTranslatedPostPath()`, které skrývá veškerou komplexitu vyhledávání a propojování článků mezi jazyky.

## Implementace přepínače jazyků

Klíčovou komponentou pro uživatelskou interakci je přepínač jazyků:

```vue
<!-- components/LanguageSwitcher.vue -->
<script setup lang="ts">
const { locale, locales, setLocale, setLocaleCookie } = useI18n()
const route = useRoute()
const currentLocale = computed(() => {
  return locales.value.find(loc => loc.code === locale.value)
})

const { getTranslatedPostPath } = useTranslatedPostPath()

async function switchLocale(code: 'en' | 'cs') {
  // Detekce, zda jsme na stránce detailu blogu
  if (route.name?.toString().includes('blog-slug')) {
    setLocaleCookie(code)

    const translatedPostPath = await getTranslatedPostPath()
    if (translatedPostPath) {
      navigateTo(translatedPostPath)
    }
  }
  else {
    setLocale(code)
  }
}
</script>

<template>
  <div class="language-switcher">
    <a
      v-for="loc in locales"
      :key="loc.code"
      :class="{ active: loc.code === currentLocale?.code }"
      @click.prevent.stop="switchLocale(loc.code)"
    >
      {{ loc.code }}
    </a>
  </div>
</template>

<style scoped>
.language-switcher {
  display: inline-flex;
  gap: 5px;
  padding: 5px;
  border-radius: 5px;
  border: 1px solid gray;
}

.language-switcher a {
  color: gray;
  text-decoration: none;
  cursor: pointer;
  user-select: none;
}

.language-switcher a.active {
  color: black;
}
</style>
```

Tato komponenta řeší dva různé scénáře:

1. **Přepnutí jazyka na běžné stránce** - jednoduše změní jazyk a zachová aktuální cestu
2. **Přepnutí jazyka na detailu článku** - vyhledá odpovídající přeložený článek a přesměruje na něj

Druhý scénář je složitější a vyžadoval speciální pozornost. Využívám zde dříve vytvořenou composable `useTranslatedPostPath`, která zajišťuje správné nalezení přeložené verze článku. Proces přepnutí jazyka na stránce detailu článku pak probíhá následovně:

1. Nastavení cookie s novým jazykem pomocí `setLocaleCookie(code)`
2. Získání cesty k přeloženému článku pomocí `getTranslatedPostPath()`
3. Přesměrování na nalezenou cestu pomocí `navigateTo(translatedPostPath)`

Toto řešení zajišťuje plynulý přechod mezi jazykovými verzemi článků a zachovává kontext uživatele.

## Tok dat při přepínání jazyků

Nyní se podívejme, jak přesně funguje přepínání mezi jazyky v naší aplikaci. Následující diagram ilustruje interakci mezi jednotlivými komponentami:

![Diagram znázorňující interakci komponent](/diagram.png)

Zatímco běžné stránky vyžadují pouze změnu locale, u detailu článku je potřeba navíc vyhledat odpovídající přeloženou verzi a zajistit správné přesměrování.

## Integrace do layoutu

Pro zajištění globální dostupnosti přepínače jazyků a správného [nastavení HTML atributů](https://i18n.nuxtjs.org/docs/guide/seo) podle aktivního jazyka jsem vytvořil univerzální layout:

```vue
<!-- layouts/default.vue -->
<script setup>
const head = useLocaleHead()
</script>

<template>
  <Html :lang="head.htmlAttrs.lang" :dir="head.htmlAttrs.dir">
    <Body>
      <LanguageSwitcher />
      <slot />
    </Body>
  </Html>
</template>
```

Tento layout automaticky nastavuje atributy `lang` a `dir` v HTML elementu podle aktuálního jazyka díky použití `useLocaleHead()` hooku z Nuxt i18n modulu. To je důležité nejen pro správné fungování jazykově specifických funkcí prohlížeče, ale také pro SEO a přístupnost webu.

Přepínač jazyků je umístěn přímo v layoutu, což zajišťuje jeho konzistentní přítomnost na všech stránkách aplikace. Díky tomu má uživatel vždy možnost změnit jazyk bez ohledu na to, kde se v aplikaci nachází.

## Ukázka obsahu článku

Pro ilustraci, zde je ukázka, jak vypadá Markdown soubor pro článek v češtině:

```none
---
description: Nuxt 3 přinesl revoluci do způsobu, jakým vyvíjím Vue aplikace. Podělím se o své zkušenosti z migrace a konkrétní benefity tohoto frameworku.
date: 2025-03-22
tags:
  - vue
  - nuxt
  - webdev
  - frontend
translationKey: nuxt3-new-project
---

# Proč jsem zvolil Nuxt 3 pro svůj nový projekt

Nuxt 3 přinesl revoluci do způsobu, jakým vyvíjím Vue aplikace. Díky hybridnímu renderování a vylepšenému API je vývoj rychlejší a příjemnější. V tomto článku se podělím o své zkušenosti z migrace starších projektů na nejnovější verzi a ukážu konkrétní benefity, které mi tento framework přinesl.
```

A jeho anglická verze:

```none
---
description: Nuxt 3 has revolutionized the way I develop Vue applications. I'll share my experiences migrating older projects and the specific benefits of this framework.
date: 2025-03-22
tags:
  - vue
  - nuxt
  - webdev
  - frontend
translationKey: nuxt3-new-project
---

# Why I Chose Nuxt 3 for My New Project

Nuxt 3 has revolutionized the way I develop Vue applications. Thanks to hybrid rendering and improved API, development is faster and more enjoyable. In this article, I'll share my experiences migrating older projects to the latest version and demonstrate the specific benefits this framework has brought me.
```

Klíčem k propojení těchto článků je shodná hodnota `translationKey: nuxt3-new-project`, která umožňuje našemu systému identifikovat, že se jedná o překlady stejného obsahu.

## Plánovaná vylepšení

V budoucnu se plánuji zaměřit především na vylepšení SEO aspektů vícejazyčného blogu:

1. **Strukturovaná data pro články** - Implementace [JSON-LD schématu](https://json-ld.org/) pro články v obou jazycích zlepší interpretaci obsahu vyhledávači a umožní bohatší zobrazení ve výsledcích vyhledávání.
2. **Optimalizace meta tagů** - Vytvoření dynamičtějších a kontextově přesnějších meta popisků a titulků včetně [Open Graph](https://ogp.me/) a Twitter karet usnadní sdílení na sociálních sítích.
3. **Alternativní hreflang tagy** - Vylepšení implementace hreflang tagů pro jasnější propojení jazykových variant článků pomůže vyhledávačům správně indexovat a zobrazovat relevantní jazykové verze uživatelům.
4. **Dynamická sitemap** - Vytvoření vícejazyčné sitemapy, která bude automaticky zahrnovat všechny články v obou jazycích s korektními hreflang odkazy.
5. **Optimalizace rychlosti načítání** - Zlepšení Core Web Vitals metrik s ohledem na různé jazykové verze a specifické požadavky pro různé lokality.

Tyto SEO vylepšení nejen zvýší viditelnost blogu ve vyhledávačích, ale také zlepší uživatelský zážitek při sdílení obsahu a navigaci mezi jazykovými verzemi.

## Závěr

Cesta k vytvoření kvalitního vícejazyčného blogu představuje více než jen technickou implementaci – je to vyvážení potřeb uživatelů, vývojářů a vyhledávačů.

Moje řešení přináší několik zásadních výhod:

- **Jednoduchá tvorba obsahu** – díky markdown souborům s jasnou strukturou mohu snadno přidávat nové články v obou jazycích bez potřeby složitých redakčních systémů
- **Přirozená navigace pro uživatele** – přepínání mezi jazyky je intuitivní a zachovává kontext, což výrazně zlepšuje uživatelský zážitek
- **Vývojářská přívětivost** – architektura založená na kompozičních funkcích a jasné separaci zodpovědností usnadňuje údržbu a rozšiřování webu
- **SEO optimalizace** – čisté URL, správná metadata a propojení jazykových verzí přispívají k lepší viditelnosti ve vyhledávačích

Během této implementace jsem zjistil, že klíčem k úspěchu není jen technická stránka řešení, ale především důkladné promyšlení uživatelských potřeb. Pokud stojíte před podobnou výzvou, doporučuji nejprve jasně definovat požadavky na uživatelský zážitek a až poté hledat vhodné nástroje. Nuxt 3 s jeho ekosystémem se v mém případě ukázal jako vynikající základ, který jsem mohl přizpůsobit specifickým potřebám vícejazyčného webu.

Celý tento proces pro mě byl cennou zkušeností. Troufám si říct, že se mi podařilo elegantně vyřešit komplexní problém. Sdílením těchto postupů doufám, že usnadním cestu dalším vývojářům, kteří chtějí vytvořit kvalitní vícejazyčné webové aplikace.
