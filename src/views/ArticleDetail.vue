<template>
  <BlogHeader />
  <div v-if="article !== null" class="grid grid-cols-3-1 mt-4">
    <div>
      <h1 class="text-center text-3xl">{{ article.title }}</h1>
      <p class="text-center text-sm text-gray-500">
        本文由 {{ article.author.username }} 发布于
        {{ formatted_time(article.created) }}
      </p>
      <div v-html="article.body_html" class="article-body space-y-4"></div>
    </div>
    <div class="space-y-4">
      <h3 class="font-semibold">目录</h3>
      <div v-html="article.toc_html" class="toc"></div>
    </div>
  </div>
  <BlogFooter />
</template>

<script>
import axios from "axios";

import BlogHeader from "@/components/BlogHeader";
import BlogFooter from "@/components/BlogFooter";

export default {
  name: "ArticleDetail",
  components: { BlogHeader, BlogFooter },
  data: function() {
    return {
      article: null,
    };
  },
  mounted() {
    axios
      .get("/api/article/" + this.$route.params.id)
      .then((response) => (this.article = response.data));
  },
  methods: {
    formatted_time(iso_date_string) {
      const date = new Date(iso_date_string);
      return date.toLocaleDateString();
    },
  },
};
</script>

<style>
.article-body p img {
  @apply max-w-full rounded-3xl shadow-md;
}
.toc ul {
  @apply list-none;
}
.toc a {
  @apply text-gray-600;
}
</style>
