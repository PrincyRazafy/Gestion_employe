<template>
  <login v-if="!isLoggedIn" />
  <div v-else class="row">
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
          <router-link class="nav-link text-white" to="/graphe"
            >Graphe</router-link
          >
        </div>
      </div>
      <footer
        class="bg-dark text-white py-2 white-shadow fixed-bottom text-center"
      >
        <div
          class="container d-flex justify-content-between align-items-center"
        >
          <button class="btn-logout" @click="logout">
            <i class="fas fa-power-off"></i>
          </button>
          <p class="mb-0">&copy; 2025</p>
        </div>
      </footer>
    </nav>
    <div class="container center mt-3 pt-5">
      <router-view />
    </div>
    <footer
      class="bg-dark text-white py-2 white-shadow fixed-bottom text-center"
    >
      <div class="container d-flex justify-content-between align-items-center">
        <button class="btn-logout" @click="logout">
          <i class="fas fa-power-off"></i>
        </button>
        <p class="mb-0">&copy; 2025</p>
      </div>
    </footer>
  </div>
</template>
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

<script setup>
import { ref, onMounted } from "vue";
import login from "./views/login_page.vue";
import { useRouter } from "vue-router";
import Swal from "sweetalert2";
import typed from "./components/typed_js.vue";

const isLoggedIn = ref(false);
const router = useRouter();

const logout = async () => {
  const result = await Swal.fire({
    title: "Êtes-vous sûr ?",
    text: "Voulez-vous vraiment vous déconnecter?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#3085d6",
    confirmButtonText: "Oui",
    cancelButtonText: "Annuler",
    position: "center",
  });
  if (result.isConfirmed) {
    localStorage.removeItem("isLoggedIn");
    router.push("/login");
    window.location.reload();
  }
};

onMounted(() => {
  isLoggedIn.value = localStorage.getItem("isLoggedIn") === "true";
  window.addEventListener("storage", () => {
    isLoggedIn.value = localStorage.getItem("isLoggedIn") === "true";
  });
});
</script>
