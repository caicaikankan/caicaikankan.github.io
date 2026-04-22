<script setup>
import { computed } from "vue";
import { useData, useRoute, withBase } from "vitepress";
import DefaultTheme from "vitepress/theme";

const { Layout } = DefaultTheme;
const route = useRoute();
const { frontmatter, page } = useData();

const isArticlePage = computed(() => {
  const path = route.path || "/";
  const isReadingArticle = path.startsWith("/reading/") && path !== "/reading/";
  const isThinkingArticle = path.startsWith("/thinking/") && path !== "/thinking/";

  return isReadingArticle || isThinkingArticle;
});

const articleMeta = computed(() => {
  const meta = frontmatter.value || {};

  return {
    title: meta.articleTitle || page.value.title || "",
    author: meta.author || "Yu",
    publishDate: meta.publishDate || "",
    readingTime: meta.readingTime || "",
    lastUpdated: meta.lastUpdated || meta.publishDate || "",
    cover: meta.cover || "/covers/default-article-cover.svg"
  };
});

const showBackToHome = computed(() => {
  return isArticlePage.value;
});
</script>

<template>
  <Layout :class="{ 'is-article-page': isArticlePage }">
    <template #doc-top>
      <div v-if="showBackToHome" class="vp-back-home">
        <a class="vp-back-home__link" href="/">返回首页</a>
      </div>
      <section v-if="isArticlePage" class="article-hero">
        <h1 class="article-hero__title">{{ articleMeta.title }}</h1>
        <div class="article-hero__cover-frame">
          <img
            class="article-hero__cover"
            :src="withBase(articleMeta.cover)"
            :alt="articleMeta.title"
          >
        </div>
        <div class="article-hero__meta">
          <span>作者：{{ articleMeta.author }}</span>
          <span>/</span>
          <span>{{ articleMeta.publishDate }}</span>
          <span>/</span>
          <span>阅读时间约 {{ articleMeta.readingTime }}</span>
        </div>
      </section>
    </template>
    <template #doc-after>
      <footer v-if="isArticlePage" class="article-footer">
        <span>作者：{{ articleMeta.author }}</span>
        <span>发布时间：{{ articleMeta.publishDate }}</span>
        <span>最近更新：{{ articleMeta.lastUpdated }}</span>
      </footer>
    </template>
  </Layout>
</template>
