import { createApp } from "vue";
import App from "./App.vue";
import "./assets/css/tailwind.css";
// import installElementPlus from "./plugins/element";
import router from "./router";

createApp(App)
  // .use(installElementPlus)
  .use(router)
  .mount("#app");
