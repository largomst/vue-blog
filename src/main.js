import { createApp } from "vue";
import App from "./App.vue";
import "./assets/css/tailwind.css";
import installElementPlus from "./plugins/element";

createApp(App)
  .use(installElementPlus)
  .mount("#app");
