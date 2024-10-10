import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import HomeView from "../views/HomeView.vue";
import LoginView from "@/views/auth/LoginView.vue";
import SignupView from "@/views/auth/SignupView.vue";
import CreateShop from "@/views/shop/CreateShop.vue";
import BrowseShops from "@/views/shop/BrowseShops.vue";
import ShopDetails from "@/views/shop/ShopDetails.vue";
import CartView from "@/views/cart/CartView.vue";

import { projectAuth } from "@/firebase/config";

const requireAuth = (to: any, from:any, next:any) => {
  const user = projectAuth.currentUser
  if (!user) {
    next({ name: 'login' })
  } else {
    next()
  }
}

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/login",
    name: "login",
    component: LoginView,
  },
  {
    path: "/sign-up",
    name: "signup",
    component: SignupView,
  },
  {
    path: "/shop/create",
    name: "createShop",
    component: CreateShop,
    beforeEnter: requireAuth,
  },
  {
    path: "/shops",
    name: "browseShops",
    component: BrowseShops,
    beforeEnter: requireAuth,
  },
  {
    path: "/shop/:id",
    name: "shopDetails",
    component: ShopDetails,
    props: true,
    beforeEnter: requireAuth,
  },
  {
    path: "/cart/:id",
    name: "cart",
    component: CartView,
    props: true,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
