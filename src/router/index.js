import ajout_emp from "@/views/ajout_emp.vue";
import graphe_bilan from "@/views/graphe_bilan.vue";
import Login_page from "@/views/login_page.vue";
import mise_jour from "@/views/mise_jour.vue";
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
    path: "/MAJ",
    name: "mise_jour",
    component: mise_jour,
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
    next("/MAJ");
  } else {
    next();
  }
});

export default router;
