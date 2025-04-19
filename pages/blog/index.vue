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
  <main role="main" class="mx-auto max-w-[65ch] px-2 font-normal md:px-0">
    <section class="my-6 md:my-8">
      <h1 class="mb-4 text-2xl font-bold lg:text-4xl md:text-3xl">
        {{ $t('blog.title') }}
      </h1>
      <p class="max-w-2xl leading-relaxed text-soft">
        {{ $t('blog.description') }}
      </p>
    </section>
    <section>
      <ul class="scroll-smooth space-y-6 md:space-y-8">
        <li v-for="post in posts" :key="post.id">
          <article>
            <NuxtLink :to="post.path" class="group block border rounded-lg p-4 transition-all duration-300 ease space-y-3 md:p-6 sm:p-5 md:space-y-4 border-card">
              <header>
                <h2 class="line-clamp-2 text-lg font-bold leading-snug sm:text-xl text-strong">
                  {{ post.title }}
                </h2>
                <BlogMeta :published-date="post.publishedDate" :reading-time="post.readingTime" class="mt-2" />
              </header>
              <div class="line-clamp-3 leading-relaxed text-soft">
                <p>{{ post.description }}</p>
              </div>
              <footer class="flex justify-end text-[13px] sm:text-[14px]">
                <span class="border-b border-accent-light/40 transition-border duration-300 ease-in-out dark:border-accent-dark/40 group-hover:border-accent-light text-accent dark:group-hover:border-accent-dark">
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
