import { createWebHistory, createRouter } from "vue-router";
import Home from "@/views/Home";
import ArticleDetail from "@/views/ArticleDetail";
import Login from "@/views/Login";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/article/:id",
    name: "ArticleDetail",
    component: ArticleDetail,
  },
  { path: "/login", name: "Login", component: Login },
];
const router = createRouter({
  history: createWebHistory(),
  routes,
});
export default router;
