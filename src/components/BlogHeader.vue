<template>
  <div class="grid grid-cols-4 text-center mt-5">
    <div></div>
    <h1 class="col-start-2 col-end-4 text-4xl font-semibold p-4">
      My Drf-Vue Blog
    </h1>
    <search-button class="pt-5" />
  </div>
  <hr />
  <div>
    <div>
      <div v-if="hasLogin" class="text-right pr-1 underline">
        <Menu>
          <MenuButton>{{ name }}</MenuButton>
          <MenuItems>
            <MenuItem v-slot="{ active }">
              <router-link
                :to="{ name: 'UserCenter', params: { username: username } }"
                :class="{ 'bg-blue-200': active }"
                >User Center</router-link
              >
            </MenuItem>
            <MenuItem v-slot="{ active }">
              <div @click="logout" :class="{ 'bg-blue-200': active }" href="#">
                Logout
              </div>
            </MenuItem>
          </MenuItems>
        </Menu>
      </div>
      <div v-else class="text-right pr-1 underline">
        <router-link to="/login">登录</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import SearchButton from "../components/SearchButton.vue";
import authorization from "../utils/authorization";
import { Menu, MenuButton, MenuItems, MenuItem } from "@headlessui/vue";

export default {
  name: "BlogHeader",
  props: ["welcomeName"],
  data() {
    return {
      username: "",
      hasLogin: false,
    };
  },
  components: {
    SearchButton,
    Menu,
    MenuButton,
    MenuItems,
    MenuItem,
  },
  mounted() {
    authorization().then((data) => {
      [this.hasLogin, this.username] = data;
    });
  },
  methods: {
    logout() {
      const storage = localStorage;
      storage.removeItem("access.blog");
      storage.removeItem("refresh.blog");
      storage.removeItem("username.blog");
      storage.removeItem("expiredTime.blog");
      this.hasLogin = false;
      this.$router.push("/");
    },
  },
  computed: {
    name() {
      return this.welcomeName !== undefined ? this.welcomeName : this.username;
    },
  },
};
</script>
