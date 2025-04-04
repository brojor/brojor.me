<script setup lang="ts">
const { locale, t, baseUrl } = useI18n()

useSeoMeta({
  title: 'Blog',
  description: t('blog.description'),
  ogDescription: t('blog.description'),
  ogType: 'website',
  ogImage: `${baseUrl.value}/blog/og-image-${locale.value}.png`,
  ogImageWidth: 1200,
  ogImageHeight: 630,
  ogImageAlt: t('blog.ogImageAlt'),
  twitterTitle: t('blog.title'),
  twitterDescription: t('blog.description'),
  twitterImage: `${baseUrl.value}/blog/x-image-${locale.value}.png`,
  twitterImageAlt: t('blog.ogImageAlt'),
})

const { data: posts } = await useAsyncData(
  `blog-posts-${locale.value}`,
  () => queryCollection(locale.value).order('date', 'DESC').all(),
)
</script>

<template>
  <main role="main" class="text-fg max-w-[65ch] mx-auto font-normal px-2 md:px-0">
    <section class="blog-header my-6 md:my-8">
      <h1 class="text-2xl md:text-3xl lg:text-4xl font-bold text-fg-deeper mb-4">
        {{ $t('blog.title') }}
      </h1>
      <p class="text-fg-deep max-w-2xl leading-relaxed">
        {{ $t('blog.description') }}
      </p>
    </section>
    <section>
      <ul class="space-y-6 md:space-y-8 scroll-smooth">
        <li v-for="post in posts" :key="post.id">
          <article>
            <NuxtLink :to="post.path" class="block group p-4 sm:p-5 md:p-6 space-y-3 md:space-y-4 border border-white/07 hover:border-white/20 border-bg-deeper rounded-lg bg-gradient-linear shape-[145deg] from-accent-coral-peach/06 to-bg-deep transition-all duration-300 ease shadow-lg hover:shadow-xl shadow-white/02">
              <header>
                <h2 class="text-lg sm:text-xl leading-snug text-fg-deeper font-bold line-clamp-2">
                  {{ post.title }}
                </h2>
                <BlogMeta :date="post.date" :reading-time="post.readingTime" class="mt-2" />
              </header>
              <div class="leading-relaxed text-fg-deep line-clamp-3">
                <p>{{ post.description }}</p>
              </div>
              <footer class="text-[14px] sm:text-[15px] font-light flex justify-end">
                <span class="text-accent-sea-green relative border-b border-accent-sea-green/30 group-hover:border-accent-sea-green transition-border duration-300 ease-in-out">
                  Číst článek
                </span>
              </footer>
            </NuxtLink>
          </article>
        </li>
      </ul>
    </section>
  </main>
</template>
