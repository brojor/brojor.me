<script setup lang="ts">
const { locale } = useI18n()

const { data: posts } = await useAsyncData(
  `blog-posts-${locale.value}`,
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
