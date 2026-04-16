<script setup>
import { computed } from "vue";
import { useRoute } from "vitepress";
import DefaultTheme from "vitepress/theme";

const { Layout } = DefaultTheme;
const route = useRoute();

const showBackToHome = computed(() => {
  const path = route.path || "/";
  if (path.startsWith("/reading/")) return path !== "/reading/";
  if (path.startsWith("/thinking/")) return path !== "/thinking/";
  return false;
});
</script>

<template>
  <Layout>
    <template #doc-top>
      <div v-if="showBackToHome" class="vp-back-home">
        <a class="vp-back-home__link" href="/">返回首页</a>
      </div>
    </template>
  </Layout>
</template>
