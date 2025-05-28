<template>
  <div class="container mt-4">
    <div class="fomu mx-auto">
      <form @submit.prevent="connecter">
        <div class="row text-center">
          <h2 class="mt-3">Connexion</h2>
        </div>
        <div class="mb-4 mt-4">
          <label>Identifiant:</label>
          <input
            type="text"
            class="form-control"
            v-model="util"
            placeholder="@username"
          />
        </div>
        <div class="mb-4">
          <label>Mot de passe:</label>
          <input
            type="password"
            class="form-control"
            v-model="pwd"
            placeholder="******"
          />
        </div>
        <div class="text-center">
          <input type="submit" class="bout" value="Se connecter" />
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped>
.fomu {
  background-color: #2c5364;
  border-radius: 4px;
  color: rgb(221, 226, 231);
  font-family: "Merriweather", serif;
  padding: 3% 10% 2% 10%;
  margin-top: 10%;
  box-shadow: 0 0.5rem 1rem rgba(44, 83, 100, 0.15);
  max-width: 400px;
  width: 100%;
}
input {
  background-color: rgb(255, 255, 255);
  border-radius: 5px;
  border: none;
  height: 30px;
  font-size: 13px !important;
}
h2 {
  color: #dfe5e7;
  font-family: "Poetsen One", sans-serif;
}
.bout {
  background-color: #dfe5e7;
  color: #545557;
  border-radius: 5px;
  height: 30px;
  width: 100px;
  border: none;
}
.bout:hover {
  background-color: #253e3f;
  color: #d8dbe0;
  transition: all 0.3s ease;
}
</style>

<script setup>
import axios from "axios";
import Swal from "sweetalert2";
import { ref } from "vue";

const util = ref("");
const pwd = ref("");

const connecter = async () => {
  if (!util.value || !pwd.value) {
    Swal.fire({
      icon: "warning",
      title: "Champs invalides",
      text: "Les champs doivent être remplis.",
      position: "center",
    });
    return;
  }
  try {
    const response = await axios.post("http://localhost/GestionEmp/login.php", {
      util: util.value,
      pwd: pwd.value,
    });
    console.log(response.data);
    if (response.data.success) {
      await Swal.fire({
        icon: "success",
        title: "Succès",
        text: "Connexion reussi!",
        showConfirmButton: false,
        timer: 2000,
        position: "center",
      });
      localStorage.setItem("isLoggedIn", "true");
      window.location.reload();
    } else {
      Swal.fire({
        icon: "error",
        title: "Erreur",
        text: "Erreur : " + response.data.message,
        position: "center",
      });
    }
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Erreur serveur",
      text: "Erreur lors de la connexion au serveur.",
      position: "center",
    });
    console.error(error);
  }
};
</script>
