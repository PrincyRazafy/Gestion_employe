<template>
  <div class="row">
    <nav
      class="navbar navbar-expand-lg navbar-dark bg-dark px-4 position-relative z-1 py-3 white-shadow"
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
<style scoped>
.white-shadow {
  box-shadow: 0 0.5rem 1rem rgba(248, 170, 0, 0.3);
  font-family: "Fredoka", sans-serif;
}
.nav-link:hover {
  color: #ffe082 !important;
}
</style>
