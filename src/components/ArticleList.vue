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
      <span v-if="link.prev !== null">
        <router-link :to="prev">
          Prev
        </router-link>
      </span>
      <span class="text-xl pl-3 pr-3 font-bold">{{ $route.query.page }}</span>
      <span v-if="link.next !== null">
        <router-link :to="next">
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
      search: null,
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

      let params = new URLSearchParams();

      let page = this.$route.query.page;
      let search = this.$route.query.search;

      if (page !== undefined && page !== null) {
        params.append("page", this.$route.query.page);
      }
      if (search !== undefined && search !== null) {
        params.append("search", this.$route.query.search);
      }

      const paramsString = params.toString();

      if (paramsString.charAt(0) !== "") {
        url += "?" + paramsString;
      }

      axios.get(url).then((response) => {
        this.articles = response.data;
        this.extract_prev_next_from_headers_link(response.headers.link);
      });
    },
    get_page(link) {
      return new URL(link).searchParams.get("page");
    },
    get_search() {
      this.search =
        this.$route.query.search === undefined
          ? null
          : this.$route.query.search;
    },
  },
  mounted() {
    this.get_article_data();
    this.get_search();
  },
  computed: {
    prev() {
      let data = { name: "Home", query: {} };
      if (this.search) {
        data = { ...data, query: { ...data.query, search: this.search } };
      }
      if (this.link.prev) {
        data = {
          ...data,
          query: { ...data.query, page: this.get_page(this.link.prev) },
        };
      }
      return data;
    },
    next() {
      let data = { name: "Home", query: {} };
      if (this.search) {
        data = { ...data, query: { ...data.query, search: this.search } };
      }
      if (this.link.next) {
        data = {
          ...data,
          query: { ...data.query, page: this.get_page(this.link.next) },
        };
      }
      return data;
    },
  },
  watch: {
    $route() {
      this.get_article_data();
    },
  },
};
</script>
