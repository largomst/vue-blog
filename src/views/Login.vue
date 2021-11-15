<template>
  <BlogHeader />
  <div class="mt-8 grid grid-cols-2">
    <div>
      <h3 class="text-center font-semibold text-xl">注册账号</h3>
      <form class="text-center" action="">
        <div class="p-3">
          <span>账号</span>
          <input
            v-model="signupName"
            class="form-elem"
            type="text"
            placeholder="输入用户名"
          />
        </div>
        <div class="p-3">
          <span>密码</span>
          <input
            v-model="signuPwd"
            class="form-elem"
            type="password"
            placeholder="输入密码"
          />
        </div>
        <div class="btn">
          <button @click.prevent="signup">提交</button>
        </div>
      </form>
    </div>
    <div>
      <div>
        <h3 class="text-center font-semibold text-xl">登录账号</h3>
        <form class="text-center" action="">
          <div class="p-3">
            <span>账号</span>
            <input type="text" />
          </div>
          <div class="p-3">
            <span>密码</span>
            <input type="password" />
          </div>
          <div>
            <button @click.prevent="signin" class="btn">提交</button>
          </div>
        </form>
      </div>
    </div>
  </div>
  <BlogFooter />
</template>
<script>
import axios from "axios";
import BlogHeader from "@/components/BlogHeader";
import BlogFooter from "@/components/BlogFooter";
export default {
  name: "Login",
  components: {
    BlogHeader,
    BlogFooter,
  },
  data() {
    return {
      signupName: "",
      signuPwd: "",
      signupResponse: null,
    };
  },
  methods: {
    signup() {
      const that = this;
      axios
        .post("/api/user/", {
          username: this.signupName,
          password: this.signuPwd,
        })
        .then((response) => {
          that.signupResponse = response.data;
          alert("用户注册完成，请登录");
        })
        .catch((e) => {
          alert(e.message);
        });
    },
    signin() {
      const that = this;
      axios
        .post("api/token/", {
          username: this.signupName,
          password: this.signuPwd,
        })
        .then((response) => {
          console.log("signin");
          const storage = localStorage;
          const expiredTime = Date.parse(response.headers.date) + 60000;
          storage.setItem("access.blog", response.data.access);
          storage.setItem("refresh.blog", response.data.refresh);
          storage.setItem("expiredTime.blog", expiredTime);
          storage.setItem("username.blog", that.signupName);
          that.$router.push({ name: "Home" });
        });
    },
  },
};
</script>
<style scoped>
input {
  @apply h-7 p-2 ml-4 border-2 border-gray-400 outline-none;
}
.btn {
  @apply p-3 bg-gray-400 mx-auto text-white rounded-md w-16;
}
</style>
