<template>
  <div class="container mt-4 list">
    <div class="d-flex justify-content-between align-items-center mb-3">
      <input
        v-model="recherche"
        type="text"
        class="form-control w-25"
        placeholder="Rechercher par nom ou prenom"
      />
      <div class="d-flex gap-2">
        <button class="btn btn-outline-info" @click="modifier">Modifier</button>
        <button class="btn btn-outline-danger" @click="supprimer">
          Supprimer
        </button>
      </div>
    </div>

    <table class="table table-bordered table-hover">
      <thead class="table-dark">
        <tr>
          <th>Numero</th>
          <th>Nom</th>
          <th>Prénom</th>
          <th>Observation</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="employe in donneesFiltrees" :key="employe.numEmp">
          <td :style="{ backgroundColor: '#2c5364', color: 'white' }">
            {{ employe.numEmp }}
          </td>
          <td :style="{ backgroundColor: '#2c5364', color: 'white' }">
            {{ employe.nom }}
          </td>
          <td :style="{ backgroundColor: '#2c5364', color: 'white' }">
            {{ employe.prenom }}
          </td>
          <td :style="{ backgroundColor: '#2c5364', color: 'white' }">
            {{ obs(employe.Salaire) }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import axios from "axios";
import { computed, onMounted, ref } from "vue";

const employes = ref([]);
const recherche = ref("");

const obs = (salaire) => {
  if (salaire < 1000) return "Médiocre";
  if (salaire >= 1000 && salaire <= 5000) return "Moyen";
  return "Grand";
};
const afficherEmploye = async () => {
  try {
    const response = await axios.get(
      "http://localhost/GestionEmp/affichageemp.php"
    );
    employes.value = response.data;
  } catch (error) {
    console.error(
      "Une erreur est survenue lors de la récupération des employés :",
      error.message
    );
  }
};

const donneesFiltrees = computed(() => {
  if (!recherche.value) return employes.value;
  const rechercheLower = recherche.value.toLowerCase();
  return employes.value.filter(
    (employes) =>
      employes.nom.toLowerCase().includes(rechercheLower) ||
      employes.prenom.toLowerCase().includes(rechercheLower)
  );
});
onMounted(afficherEmploye);
</script>

<style scoped>
.list {
  font-family: "Roboto", sans-serif;
  padding: 1rem;
}
</style>
