<template>
  <login v-if="!isLoggedIn" />
  <div v-else class="row">
    <nav
      class="navbar navbar-expand-lg navbar-dark bg-dark px-4 py-3 white-shadow fixed-top"
    >
      <div class="container-fluid">
        <div class="ms-auto d-flex gap-3 fs-0">
          <router-link class="nav-link text-white" to="/ajout"
            >Ajout</router-link
          >
          <router-link class="nav-link text-white" to="/MAJ">MAJ</router-link>
          <router-link class="nav-link text-white" to="/graphe"
            >Graphe</router-link
          >
          <button class="btn btn-warning btn-sm ms-3" @click="logout">
            Déconnexion
          </button>
        </div>
      </div>
    </nav>
    <div class="container center mt-3 pt-5">
      <router-view />
    </div>
  </div>
</template>

<style scoped>
.white-shadow {
  box-shadow: 0 0.5rem 1rem rgba(248, 170, 0, 0.3);
  font-family: "Fredoka", sans-serif;
}
.nav-link:hover {
  color: #ffe082 !important;
}
.router-link-active {
  color: #ffd700 !important;
  font-weight: bold;
}
.center {
  padding-top: 80px;
}
</style>

<script setup>
import { ref, onMounted } from "vue";
import login from "./views/login_page.vue";
import { useRouter } from "vue-router";

const isLoggedIn = ref(false);
const router = useRouter();

const logout = () => {
  localStorage.removeItem("isLoggedIn");
  router.push("/login");
  window.location.reload();
};

onMounted(() => {
  isLoggedIn.value = localStorage.getItem("isLoggedIn") === "true";
  window.addEventListener("storage", () => {
    isLoggedIn.value = localStorage.getItem("isLoggedIn") === "true";
  });
});
</script>
