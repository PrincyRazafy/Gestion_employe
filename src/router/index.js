import ajout_emp from "@/views/ajout_emp.vue";
import graphe_bilan from "@/views/graphe_bilan.vue";
import mise_jour from "@/views/mise_jour.vue";
import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
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

export default router;
