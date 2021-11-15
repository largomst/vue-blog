<template>
  <blog-header />
  <div>
    <h3>更新资料</h3>
    <form action="">
      <div>
        <label for="">用户名</label>
        <input type="text" v-model="username" placeholder="请输入用户名" />
      </div>
      <div>
        <label for="">新密码</label>
        <input type="password" v-model="password" placeholder="请输入密码" />
      </div>
      <div><button @click.prevent="changeInfo">更新</button></div>
    </form>
  </div>
  <blog-footer />
</template>

<script>
import BlogFooter from "../components/BlogFooter.vue";
import BlogHeader from "../components/BlogHeader.vue";
import authorization from "../utils/authorization";
import axios from "axios";
const storage = localStorage;
export default {
  components: { BlogFooter, BlogHeader },
  data() {
    return {
      username: "",
      password: "",
      token: "",
    };
  },
  mounted() {
    this.username = storage.getItem("username.blog");
  },
  methods: {
    changeInfo() {
      const that = this;
      authorization().then((res) => {
        if (!res[0]) {
          alert("登录过期");
          return;
        }
        console.log("change info start");
        if (0 < that.password.length && that.password.length < 6) {
          alert("密码过短");
        }
        const oldName = storage.getItem("username.blog");
        let data = {};
        if (that.username !== "") {
          data.username = that.username;
        }
        if (that.password !== "") {
          data.password = that.password;
        }
        that.token = storage.getItem("access.blog");
        axios
          .patch("/api/user/" + oldName + "/", data, {
            headers: { Authorization: "Bearer " + that.token },
          })
          .then((res) => {
            const name = res.data.username;
            storage.setItem("username.blog", name);
            that.$router.push({
              name: "UserCenter",
              params: { username: name },
            });
          });
      });
    },
  },
};
</script>
