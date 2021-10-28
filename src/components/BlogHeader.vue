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
  <div class="text-right pr-1 underline">
    <router-link to="/login">登录</router-link>
  </div>
</template>

<script>
export default {
  name: "BlogHeader",
  data() {
    return {
      searchText: "",
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
};
</script>
