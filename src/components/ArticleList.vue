<template>
  <div class="p-3" v-for="article in articles" v-bind:key="article.url">
    <div>
      <span
        class="px-1 py-0.5 mt-1 mr-1 mb-1 font-serif text-sm bg-gray-400 rounded text-gray-50"
        v-for="tag in article.tags"
        v-bind:key="tag"
        >{{ tag }}</span
      >
    </div>
    <div class="px-0 py-1  text-3xl  text-gray-800 font-semibold">
      {{ article.title }}
    </div>
    <div class="text-sm">{{ formatted_time(article.created) }}</div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "ArticleList",
  data() {
    return {
      articles: "",
    };
  },
  methods: {
    formatted_time: function(iso_date_string) {
      const date = new Date(iso_date_string);
      return date.toLocaleDateString();
    },
  },
  mounted() {
    axios
      .get("/api/article/")
      .then((response) => (this.articles = response.data));
  },
};
</script>
