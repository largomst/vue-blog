<template>
  <div class="grid grid-cols-4 text-center mt-5">
    <div></div>
    <h1 class="col-start-2 col-end-4 text-4xl font-semibold p-4">
      My Drf-Vue Blog
    </h1>
    <div class="pt-5">
      <form class="flex" action="">
        <input
          v-model="searchText"
          class="flex-grow p-2 w-20 rounded-l-md border-2 border-gray-400 outline-none"
          type="text"
          placeholder="请输入搜索"
        />
        <button
          v-on:click="searchArticles"
          class="flex-grow-0 p-2 cursor-pointer bg-gray-400 rounded-r-md text-white whitespace-nowrap"
        >
          搜索
        </button>
      </form>
    </div>
  </div>
  <hr />
  <div>
    <div>
      <div v-if="hasLogin" class="text-right pr-1">
        {{ username }}
      </div>
      <div v-else class="text-right pr-1 underline">
        <router-link to="/login">登录</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "BlogHeader",
  data() {
    return {
      searchText: "",
      username: "",
      hasLogin: false,
    };
  },
  methods: {
    searchArticles(e) {
      e.preventDefault();
      const text = this.searchText.trim();
      if (text.charAt(0) !== "") {
        this.$router.push({ name: "Home", query: { search: text } });
      }
    },
  },
  mounted() {
    const that = this;
    const storage = localStorage;
    const expiredTime = storage.getItem("expiredTime.blog");
    const current = new Date().getTime();
    const refreshToken = storage.getItem("refresh.blog");
    that.username = storage.getItem("username.blog");
    if (expiredTime > current) {
      that.hasLogin = true;
    } else if (refreshToken) {
      axios
        .post("/api/token/refresh", { refresh: refreshToken })
        .then((res) => {
          storage.setItem("access.blog", res.data.access);
          const nextExpiredTime = Date.parse(res.headers.date) + 60000;
          storage.setItem("expiredTime.blog", nextExpiredTime);
          storage.removeItem("refresh.blog");
          that.hasLogin = true;
        })
        .catch(() => {
          storage.clear();
          that.hasLogin = false;
        });
    } else {
      storage.clear();
      that.hasLogin = false;
    }
  },
};
</script>
