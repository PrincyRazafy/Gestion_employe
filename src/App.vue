<template>
  <div class="bg-dark text-light min-vh-100 position-relative overflow-hidden">
    <!-- Fond lumineux -->
    <nav
      class="navbar navbar-expand-lg navbar-dark bg-dark px-4 position-relative z-1"
    >
      <ul class="navbar-nav ms-auto d-flex gap-3">
        <li class="nav-item">
          <router-link to="/ajout">Ajout</router-link>
          <router-link to="/MAJ">MAj</router-link>
          <router-link to="/">Gaphe</router-link>
        </li>
      </ul>
    </nav>
  </div>
  <div class="navbar">
    <router-view />
    <br />
  </div>
</template>
