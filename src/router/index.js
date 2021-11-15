import { createWebHistory, createRouter } from "vue-router";
import Home from "@/views/Home";
import ArticleDetail from "@/views/ArticleDetail";
import Login from "@/views/Login";
import About from "@/views/About";
import UserCenter from "@/views/UserCenter";

const routes = [
  { path: "/", name: "Home", component: Home },
  { path: "/article/:id", name: "ArticleDetail", component: ArticleDetail },
  { path: "/login", name: "Login", component: Login },
  { path: "/about", name: "About", component: About },
  { path: "/user/:username", name: "UserCenter", component: UserCenter },
];
const router = createRouter({
  history: createWebHistory(),
  routes,
});
export default router;
