<script setup lang="ts">
const { locale, t } = useI18n()

useSeoMeta({
  title: 'Blog',
  description: t('blog.description'),
  ...useListingOgMeta(),
  ...useListingTwitterMeta(),
})

const { data: posts } = await useAsyncData(
  `blog-posts-${locale.value}`,
  () => queryCollection(locale.value).order('publishedDate', 'DESC').all(),
)

const { schema } = useBlogListingSchema(posts)

useSchemaOrg(schema.value)
</script>

<template>
  <main role="main" class="max-w-[65ch] mx-auto font-normal px-2 md:px-0">
    <section class="my-6 md:my-8">
      <h1 class="text-2xl md:text-3xl lg:text-4xl font-bold mb-4">
        {{ $t('blog.title') }}
      </h1>
      <p class="text-soft max-w-2xl leading-relaxed">
        {{ $t('blog.description') }}
      </p>
    </section>
    <section>
      <ul class="space-y-6 md:space-y-8 scroll-smooth">
        <li v-for="post in posts" :key="post.id">
          <article>
            <NuxtLink :to="post.path" class="block group p-4 sm:p-5 md:p-6 space-y-3 md:space-y-4 border border-card rounded-lg transition-all duration-300 ease">
              <header>
                <h2 class="text-lg sm:text-xl leading-snug text-strong font-bold line-clamp-2">
                  {{ post.title }}
                </h2>
                <BlogMeta :published-date="post.publishedDate" :reading-time="post.readingTime" class="mt-2" />
              </header>
              <div class="leading-relaxed text-soft line-clamp-3">
                <p>{{ post.description }}</p>
              </div>
              <footer class="text-[13px] sm:text-[14px] flex justify-end">
                <span class="border-b border-accent-light/40 dark:border-accent-dark/40 group-hover:border-accent-light dark:group-hover:border-accent-dark transition-border duration-300 ease-in-out text-accent">
                  {{ $t('blogListing.readMore') }}
                </span>
              </footer>
            </NuxtLink>
          </article>
        </li>
      </ul>
    </section>
  </main>
</template>
