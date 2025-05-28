import ajout_emp from "@/views/ajout_emp.vue";
import GestionEmployes from "@/views/GestionEmployes.vue";
import graphe_bilan from "@/views/graphe_bilan.vue";
import Login_page from "@/views/login_page.vue";
import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    redirect: "/login",
  },
  {
    path: "/login",
    name: "login",
    component: Login_page,
  },
  {
    path: "/graphe",
    name: "graphe_bilan",
    component: graphe_bilan,
  },
  {
    path: "/ajout",
    name: "ajoutemp",
    component: ajout_emp,
  },
  {
    path: "/gestion-employes",
    name: "GestionEmployes",
    component: GestionEmployes,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  if (to.path !== "/login" && !isLoggedIn) {
    next("/login");
  } else if (to.path === "/login" && isLoggedIn) {
    next("/graphe");
  } else {
    next();
  }
});

export default router;
