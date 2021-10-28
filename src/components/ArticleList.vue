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
    <div class="px-0 py-1">
      <router-link
        :to="{ name: 'ArticleDetail', params: { id: article.id } }"
        class="text-3xl  text-gray-800 font-semibold"
      >
        {{ article.title }}
      </router-link>
    </div>
    <div class="text-sm">{{ formatted_time(article.created) }}</div>
  </div>

  <div class="absolute bottom-20 w-full flex justify-around">
    <div>
      <span v-if="is_page_exists('prev')">
        <router-link
          :to="{ name: 'Home', query: { page: get_page_param('prev') } }"
          class=""
        >
          Prev
        </router-link>
      </span>
      <span class="text-xl pl-3 pr-3 font-bold">{{
        get_page_param("current")
      }}</span>
      <span v-if="is_page_exists('next')">
        <router-link
          :to="{ name: 'Home', query: { page: get_page_param('next') } }"
        >
          Next
        </router-link>
      </span>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "ArticleList",
  data() {
    return {
      articles: "",
      link: { next: null, prev: null },
    };
  },
  methods: {
    formatted_time: function(iso_date_string) {
      const date = new Date(iso_date_string);
      return date.toLocaleDateString();
    },
    extract_prev_next_from_headers_link(link) {
      const nextPattern = /rel="next"/;
      const prevPattern = /rel="prev"/;
      const linkPattern = /(?<=<)(.*)(?=>)/;
      let links = [];
      if (link !== undefined) {
        links = link.split(",");
        this.link = { next: null, prev: null };
        links.forEach((str) => {
          if (nextPattern.test(str)) {
            this.link.next = str.match(linkPattern)[0];
          }
          if (prevPattern.test(str)) {
            this.link.prev = str.match(linkPattern)[0];
          }
        });
        // console.log(this.link);
      }
    },
    get_article_data() {
      let url = "/api/article/";
      const page = Number(this.$route.query.page);
      if (!isNaN(page) && page !== 0) {
        url = url + "?page=" + page;
      }
      axios.get(url).then((response) => {
        this.articles = response.data;
        this.extract_prev_next_from_headers_link(response.headers.link);
      });
    },
    is_page_exists(direction) {
      if (direction == "next") {
        return this.link.next !== null;
      } else {
        return this.link.prev !== null;
      }
    },
    get_page_param(direction) {
      try {
        let url_string;
        switch (direction) {
          case "next":
            url_string = this.link.next;
            break;
          case "prev":
            url_string = this.link.prev;
            break;
          default:
            return this.$route.query.page;
        }
        const url = new URL(url_string);
        console.log(url.searchParams.get("page"));
        return url.searchParams.get("page");
      } catch (err) {
        console.log(err);
        return;
      }
    },
  },
  mounted() {
    this.get_article_data();
  },
  watch: {
    $route() {
      this.get_article_data();
    },
  },
};
</script>
