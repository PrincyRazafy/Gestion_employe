<template>
  <div class="row">
    <nav
      class="navbar navbar-expand-lg navbar-dark bg-dark px-4 py-3 white-shadow fixed-top"
    >
      <div class="container-fluid">
        <typed />
        <div class="ms-auto d-flex gap-3 fs-0">
          <router-link class="nav-link text-white" to="/ajout"
            >Ajout</router-link
          >
          <router-link class="nav-link text-white" to="/MAJ">MAJ</router-link>
          <router-link class="nav-link text-white" to="/bilan"
            >Graphe</router-link
          >
        </div>
      </div>
    </nav>
  </div>
  <div class="center mt-3 pt-5">
    <router-view />
  </div>
  <footer class="bg-dark text-white py-2 white-shadow fixed-bottom text-center">
    <div class="container d-flex justify-content-between align-items-center">
      <button class="btn-logout" @click="logout">
        <i class="fas fa-power-off"></i>
      </button>
      <p class="mb-0">&copy; 2025</p>
    </div>
  </footer>
</template>
<script setup>
import typed from "./components/typed_js.vue";
</script>
<style scoped>
.btn-logout {
  background-color: #ffe082;
  transition: background-color 0.3s ease;
  padding: 8px 15px;
  border-radius: 5px;
  cursor: pointer;
}

.btn-logout:hover {
  background-color: #ffd700;
}

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
