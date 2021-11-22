import CompeteVue from "../src/components/Compete.vue";
import HelloWorldVue from "../src/components/HelloWorld.vue";
import HomeVue from "../src/components/Home.vue";
import NotFoundVue from "../src/components/NotFound.vue";
import SignDetailVue from "../src/components/SignDetail.vue";

export const routes = [
  { path: "/", component: HomeVue },
  { path: "/:pathMatch(.*)*", name: "NotFound", component: NotFoundVue },
  { path: "/hello", component: HelloWorldVue },
  { path: "/compete", component: CompeteVue },
  { path: "/signDetail", component: SignDetailVue },
];
