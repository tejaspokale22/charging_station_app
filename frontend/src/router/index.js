import { createRouter, createWebHistory } from "vue-router";

// Views (Pages)
import Home from "../views/Home.vue";
import AllChargers from "../views/AllChargers.vue";
import ChargerMap from "../views/ChargerMap.vue";
import CreateCharger from "../views/CreateCharger.vue";
import MyChargers from "../views/MyChargers.vue";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";
import EditCharger from "../views/EditCharger.vue";

// Route Definitions
const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: { requiresAuth: false },
  },
  {
    path: "/chargers",
    name: "Chargers",
    component: AllChargers,
    meta: { requiresAuth: false },
  },
  {
    path: "/map",
    name: "Map",
    component: ChargerMap,
    meta: { requiresAuth: false },
  },
  {
    path: "/create-charger",
    name: "CreateCharger",
    component: CreateCharger,
    meta: { requiresAuth: true },
  },
  {
    path: "/my-chargers",
    name: "MyChargers",
    component: MyChargers,
    meta: { requiresAuth: true },
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
    meta: { requiresAuth: false },
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
    meta: { requiresAuth: false },
  },
  {
    path: "/edit-charger/:id",
    name: "EditCharger",
    component: EditCharger,
    meta: { requiresAuth: true },
  },
];

// Create Router Instance
const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Optional: Navigation Guard (protect routes requiring login)
router.beforeEach((to, from, next) => {
  const isLoggedIn = !!localStorage.getItem("token"); // You can improve this logic later
  if (to.meta.requiresAuth && !isLoggedIn) {
    next("/login");
  } else {
    next();
  }
});

export default router;
