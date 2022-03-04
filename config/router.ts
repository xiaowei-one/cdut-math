import CompeteVue from "@/pages/compete/compete.vue";
import HelloWorldVue from "@/pages/HelloWorld.vue";
import HomeVue from "@/pages/Home.vue";
import NotFoundVue from "@/pages/NotFound.vue";
import SignDetailVue from "@/pages/compete/signDetail/signDetail.vue";
import Download from "@/pages/download/download.vue";
import Upload from "@/pages/upload/upload.vue";

import MenuPage from "@/pages/MenuPage.vue";

export const routes = [
    { path: "/", component: HomeVue },
    { path: "/:pathMatch(.*)*", name: "NotFound", component: NotFoundVue },
    { path: "/hello", component: HelloWorldVue },
    // { path: "/base/compete/signDetail", component: MenuPage },
    {
        path: "/base",
        component: MenuPage,
        children: [
            {
                path: "/base/compete",
                component: CompeteVue,
            },
            {
                path: "/base/compete/signUp",
                component: SignDetailVue,
            },
            {
                path: "/base/download",
                component: Download,
            },
            {
                path: "/base/upload",
                component: Upload,
            },
        ],
    },
];
