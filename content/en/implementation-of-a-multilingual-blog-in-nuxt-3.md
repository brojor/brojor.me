---
title: "Implementation of a Multilingual Blog in Nuxt 3 with Content Module"
description: "Dive into creating a multilingual blog with Nuxt 3 and the Content module. Learn how to organize content, connect language versions, and optimize URLs for perfect SEO."
date: "2025-03-23"
tags:
  - nuxt3
  - i18n
  - vue
  - localisation
  - seo
translationKey: "multilingual-blog"
readingTime: 15
---

::blog-post-header{:title="title" :date="date" :reading-time="readingTime"}
::

When I started writing a blog about the technologies I use, I encountered a problem: how to offer content in both Czech and English without complicating article management or degrading SEO?

Using the **Nuxt Content** and **Nuxt I18n** modules proved to be the ideal solution. In this article, I'll share my approach: from directory architecture through connecting language versions to URL optimization and performance. If you're planning to build a multilingual website or want to learn how to handle localization in the modern [Vue](https://vuejs.org/) ecosystem, this guide is for you.

## Requirements and Goals

Before starting the implementation, I established several key requirements:

1. **Full support for Czech and English** - all parts of the website including the blog must be available in both languages.
2. **Optimized URL addresses** - clean URLs in Czech without a language prefix, English ones with the `/en/` prefix.
3. **Translation linking** - the ability to switch between language versions of the same article.
4. **Unified user interface** - consistent language switcher on all pages.
5. **SEO optimization** - proper metadata for each language.

For implementation, I chose the following technologies:
- [**Nuxt 3**](https://nuxt.com/) - as the base framework for application development
- [**@nuxt/content**](https://content.nuxt.com/) - module for managing content in Markdown format
- [**@nuxtjs/i18n**](https://i18n.nuxtjs.org/) - module for application localization

## Solution Architecture

### Directory Structure

For organizing multilingual content, I chose a simple and clear structure:

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

This structure allows for easy navigation and content management, clearly separating articles by language. Files are linked through a unique `translationKey` defined in the metadata of each article.

### Content Module Configuration

In the `content.config.ts` file, I defined [collections](https://content.nuxt.com/docs/collections/define) divided by languages, enabling efficient content management. A crucial element of this configuration is the `prefix` parameter, which ensures proper URL generation for articles:

```typescript
// content.config.ts
import { defineCollection, defineContentConfig, z } from '@nuxt/content'

export default defineContentConfig({
  collections: {
    cs: defineCollection({
      source: {
        include: 'cs/*.md',
        prefix: '/blog', // Important for generating correct URLs
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
        prefix: '/en/blog', // Generates correct URLs with language prefix
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

This setting ensures that Czech articles will have URLs in the format `/blog/prvni-clanek` and English ones in the format `/en/blog/first-article`, which corresponds to our URL localization strategy. Note the use of the `schema` property, which allows defining a custom data structure using [Zod](https://zod.dev/).

### I18n Module Configuration

For application localization, I used the `prefix_except_default` [strategy](https://i18n.nuxtjs.org/docs/guide#strategies), which ensures clean URLs for the default language (Czech) and adds the `/en/` prefix for the English version:

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

The `detectBrowserLanguage` setting optimizes the user experience in the following ways:

- **useCookie: true** - Remembers the user's language preference between visits using a cookie
- **cookieKey: 'i18n_redirected'** - Defines a standard cookie name for language redirection
- **redirectOn: 'root'** - Ensures that language detection and redirection only occurs when visiting the main page ('/')

This configuration creates a balance between user-friendliness (automatic language detection) and predictable behavior (no unexpected redirects on nested pages).

Supplementary configuration for user interface translations is located in the `i18n.config.ts` file:

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

### Data Flow and Component Interaction

Now that we've defined the project architecture and settings, let's look at the specific implementation of individual parts of the application. We'll start with the blog post listing, which serves as the entry point to our blog.

## Blog Post Listing Implementation

For listing articles, I created a page that automatically loads content based on the current language:

```vue
<!-- pages/blog/index.vue -->
<script setup lang="ts">
const { locale } = useI18n()

const { data: posts } = await useAsyncData(
  `blog-posts-${locale.value}`, // Dynamic key ensures separate cache for each language
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

An important detail in the implementation is the dynamic key in `useAsyncData` (`blog-posts-${locale.value}`). This approach brings several key benefits:

1. **Separate cache for each language** - Nuxt creates a separate cache for Czech and English articles, allowing efficient switching between languages.

2. **Automatic data refresh on language change** - When the language is switched, the cache key changes, triggering a new data load for the current language.

3. **Parallel data storage** - Data for different languages can be stored concurrently in the cache. When switching back to a previous language, data doesn't need to be reloaded from the server.

This seemingly minor detail significantly improves the user experience and application performance when switching between languages.

In the template, I display a list of posts with their titles, dates, and descriptions. Dates are automatically formatted according to the current language thanks to the use of `toLocaleDateString(locale)`.

## Article Detail Implementation

The article detail page displays content and provides the option to navigate back to the article list:

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

In the article detail, I use the `ContentRenderer` component, which automatically renders [Markdown](https://content.nuxt.com/docs/files/markdown) content from the Content module. An important element is the use of `NuxtLinkLocale` instead of the regular `NuxtLink`, which ensures that the current language is properly preserved during navigation.

For displaying error messages and navigation texts, I use localized texts from the i18n configuration using `t('blog.back')` and `t('blog.notFound')`, which ensures a consistent user experience in both languages.

## Creating a Composable for Article Translations

To separate responsibilities and encapsulate all logic related to linking language versions, I created a custom composable function:

```typescript
// composables/useTranslatedPostPath.ts
export function useTranslatedPostPath() {
  const { locale } = useI18n()
  const route = useRoute()

  const { data: originalPost, execute: fetchOriginalPost } = useAsyncData(
    `post-${route.path}`,
    () => queryCollection(locale.value).where('path', '=', route.path).first(),
    { immediate: false }, // prevents automatic query execution during initialization
  )

  const translationKey = computed(() => originalPost.value?.translationKey)
  const alternativeLocale = computed(() => locale.value === 'cs' ? 'en' : 'cs')

  const { data: translatedPost, execute: fetchTranslatedPost } = useAsyncData(
    `translated-post-${translationKey.value}-${alternativeLocale.value}`,
    () => queryCollection(alternativeLocale.value)
      .where('translationKey', '=', translationKey.value)
      .first(),
    { immediate: false }, // prevents automatic query execution during initialization
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

An important implementation detail is setting `{ immediate: false }` for both `useAsyncData` calls. This setting prevents automatic query execution when the composable is created. Instead, we explicitly control the data flow by calling the `fetchOriginalPost()` and `fetchTranslatedPost()` functions inside the `getTranslatedPostPath()` method.

This approach gives us greater control over data loading and eliminates potential issues with incorrect redirection that could occur if data were loaded and processed automatically.

The composable structure is simple and effective:

1. First, it loads the current article and gets its `translationKey`
2. Then it finds an article with the same `translationKey` in the other language
3. It returns the path to the translated article, if it exists

This composable function thus provides a simple `getTranslatedPostPath()` interface that hides all the complexity of searching for and linking articles between languages.

## Language Switcher Implementation

A key component for user interaction is the language switcher:

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
  // Detection if we're on a blog detail page
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

This component addresses two different scenarios:

1. **Switching language on a regular page** - simply changes the language and preserves the current path
2. **Switching language on an article detail** - finds the corresponding translated article and redirects to it

The second scenario is more complex and required special attention. I use the previously created composable `useTranslatedPostPath` here, which ensures that the translated version of the article is correctly found. The process of switching language on an article detail page then proceeds as follows:

1. Setting a cookie with the new language using `setLocaleCookie(code)`
2. Getting the path to the translated article using `getTranslatedPostPath()`
3. Redirecting to the found path using `navigateTo(translatedPostPath)`

This solution ensures a smooth transition between language versions of articles and preserves the user's context.

## Data Flow When Switching Languages

Now let's look at exactly how language switching works in our application. The following diagram illustrates the interaction between individual components:

![Diagram showing component interaction](/multilingual-blog/diagram-en.png)

While regular pages only require a locale change, article details additionally need to find the corresponding translated version and ensure proper redirection.

## Layout Integration

To ensure global availability of the language switcher and proper [setting of HTML attributes](https://i18n.nuxtjs.org/docs/guide/seo) according to the active language, I created a universal layout:

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

This layout automatically sets the `lang` and `dir` attributes in the HTML element according to the current language thanks to the use of the `useLocaleHead()` hook from the Nuxt i18n module. This is important not only for the proper functioning of language-specific browser features but also for SEO and website accessibility.

The language switcher is placed directly in the layout, ensuring its consistent presence on all pages of the application. This gives the user the ability to change the language regardless of where they are in the application.

## Article Content Example

For illustration, here is an example of what a Markdown file for an article in Czech looks like:

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

And its English version:

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

The key to linking these articles is the identical value `translationKey: nuxt3-new-project`, which allows our system to identify that they are translations of the same content.

## Planned Improvements

In the future, I plan to focus primarily on improving the SEO aspects of the multilingual blog:

1. **Structured data for articles** - Implementing [JSON-LD schema](https://json-ld.org/) for articles in both languages will improve search engines' interpretation of content and enable richer display in search results.
2. **Meta tag optimization** - Creating more dynamic and contextually accurate meta descriptions and titles including [Open Graph](https://ogp.me/) and Twitter cards will facilitate sharing on social networks.
3. **Alternative hreflang tags** - Improving the implementation of hreflang tags for clearer linking of language variants of articles will help search engines correctly index and display relevant language versions to users.
4. **Dynamic sitemap** - Creating a multilingual sitemap that will automatically include all articles in both languages with correct hreflang links.
5. **Load speed optimization** - Improving Core Web Vitals metrics with regard to different language versions and specific requirements for different localities.

These SEO improvements will not only increase the blog's visibility in search engines but also improve the user experience when sharing content and navigating between language versions.

## Conclusion

The journey to creating a quality multilingual blog represents more than just a technical implementation – it's a balance of user, developer, and search engine needs.

My solution brings several key advantages:

- **Simple content creation** – thanks to markdown files with a clear structure, I can easily add new articles in both languages without the need for complex editorial systems
- **Natural navigation for users** – switching between languages is intuitive and preserves context, which significantly improves the user experience
- **Developer-friendly** – architecture based on composition functions and clear separation of responsibilities facilitates website maintenance and expansion
- **SEO optimization** – clean URLs, proper metadata, and linking language versions contribute to better visibility in search engines

During this implementation, I discovered that the key to success is not just the technical side of the solution, but primarily a thorough consideration of user needs. If you face a similar challenge, I recommend first clearly defining the requirements for the user experience and only then looking for appropriate tools. Nuxt 3 with its ecosystem proved in my case to be an excellent foundation that I could adapt to the specific needs of a multilingual website.

This entire process was a valuable experience for me. I dare say that I managed to elegantly solve a complex problem. By sharing these approaches, I hope to make the path easier for other developers who want to create quality multilingual web applications.
