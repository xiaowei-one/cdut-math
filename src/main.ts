import { createApp } from "vue";
import App from "./App.vue";
import { routes } from "../config/router";
import { createRouter, createWebHashHistory } from "vue-router";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

const app = createApp(App);

app.use(router);
app.use(ElementPlus);
app.mount("#app");
