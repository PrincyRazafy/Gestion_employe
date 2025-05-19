<template>
  <div class="row">
    <nav
      class="navbar navbar-expand-lg navbar-dark bg-dark px-4 position-relative z-1 py-3 shadow-lg"
    >
      <div class="container-fluid">
        <div class="ms-auto d-flex gap-3 fs-0">
          <router-link class="nav-link text-white" to="/ajout"
            >Ajout</router-link
          >
          <router-link class="nav-link text-white" to="/MAJ">MAJ</router-link>
          <router-link class="nav-link text-white" to="/">Graphe</router-link>
        </div>
      </div>
    </nav>
  </div>
  <div class="center">
    <router-view />
  </div>
</template>
<script setup></script>
<style scoped>
.center {
  background: linear-gradient(-45deg, #0f2027, #203a43, #2c5364, #0f2027);
  background-size: 400% 400%;
  animation: gradientMove 5s ease infinite;
  height: 89vh;
}

@keyframes gradientMove {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}
</style>
