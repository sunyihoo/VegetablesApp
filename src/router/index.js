import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "guide",
    component: () => import("../views/GuideView.vue"),
  },
  {
    path: "/login",
    name: "login",
    component: () => import("../views/LoginView.vue"),
  },
  {
    path: "/main",
    redirect: "/main/home",
    component: () => import("../views/MainView.vue"),
    children: [
      {
        path: "home",
        component: () => import("../components/TheHome.vue"),
      },
      {
        path: "goods",
        component: () => import("../views/GoodsView.vue"),
      },
      {
        path: "cart",
        component: () => import("../views/CartView.vue"),
      },
      {
        path: "mine",
        component: () => import("@/views/MineView.vue"),
      },
    ],
  },
  {
    path: "/location",
    redirect: "/location/addressset",
    component: () => import("../views/LocationView.vue"),
    children: [
      {
        path: "addressset",
        component: () => import("../components/AddressSet.vue"),
      },
      {
        path: "addressedit",
        component: () => import("../components/AddressEdit.vue"),
      },
    ],
  },
  {
    path: "/forget",
    component: () => import("../components/ForgetPasswd.vue"),
  },
  {
    path: "/order",
    component: () => import("../views/OrderView.vue"),
  },
  {
    path: "/setting",
    component: () => import("../components/SettingInfo.vue"),
  },
  {
    path: "/detail",
    component: () => import("../views/DetailView.vue"),
  },
  {
    path: "/search",
    component: () => import("../components/SearchGoods.vue"),
  },
];

const router = new VueRouter({
  routes,
});

export default router;
