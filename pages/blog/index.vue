<script setup lang="ts">
const { locale } = useI18n()

const { data: posts } = await useAsyncData(
  `blog-posts-${locale.value}`,
  () => queryCollection(locale.value).order('date', 'DESC').all(),
)
</script>

<template>
  <main role="main" class="text-fg max-w-[65ch] mx-auto font-normal px-2 md:px-0">
    <section class="blog-header mb-6 md:mb-8">
      <h1 class="text-2xl md:text-3xl lg:text-4xl font-bold text-fg-deeper mb-4">
        Blog
      </h1>
      <p class="text-base md:text-lg text-fg-deep max-w-2xl leading-relaxed">
        S vášní pro Vue.js ekosystém a webové technologie sdílím praktické postřehy a elegantní řešení složitých vývojářských problémů.
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
