<template>
  <div>
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
</template>
<script>
export default {
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
