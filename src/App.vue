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
  <div class="row">
    <router-view />
  </div>
</template>
