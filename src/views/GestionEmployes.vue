<template>
  <div class="container mt-4 list">
    <div class="d-flex justify-content-between align-items-center mb-3">
      <input
        v-model="recherche"
        type="text"
        class="form-control w-25"
        placeholder="Rechercher par nom ou prenom"
      />
      <div>
        <h2>{{ titre }}</h2>
      </div>
      <div class="d-flex gap-2">
        <template v-if="!modeedit">
          <button
            class="btn btn-outline-info"
            @click="modifie"
            :disabled="modesupp"
          >
            Modifier
          </button>
        </template>

        <template v-if="modeedit"
          ><button class="btn btn-outline-info" @click="enregistre">
            Enregistrer
          </button>
        </template>

        <template v-if="!modesupp && !modeedit"
          ><button class="btn btn-outline-danger" @click="supprime">
            Supprimer
          </button>
        </template>
        <template v-if="modesupp || modeedit">
          <button class="btn btn-outline-danger" @click="annule">
            Annuler
          </button>
        </template>
      </div>
    </div>
    <div class="table-container">
      <table class="table table-bordered table-hover">
        <thead class="table-dark">
          <tr>
            <th>Numero</th>
            <th>Nom</th>
            <th>Prénom</th>
            <th>Observation</th>
          </tr>
        </thead>
        <transition-group name="slide-left" tag="tbody">
          <tr v-for="employe in donneesFiltrees" :key="employe.numEmp">
            <td
              :style="{
                backgroundColor: '#2c5364',
                color: 'white',
              }"
            >
              {{ employe.numEmp }}
            </td>
            <td
              :style="{
                backgroundColor: '#2c5364',
                color: 'white',
                textAlign: 'center',
              }"
            >
              <template v-if="modeedit">
                <input
                  v-model="employe.nom"
                  class="form-control form-control-sm"
                  :style="{
                    backgroundColor: '#2c5364',
                    color: 'white',
                    border: 'none',
                  }"
                />
              </template>
              <template v-else>
                {{ employe.nom }}
              </template>
            </td>
            <td :style="{ backgroundColor: '#2c5364', color: 'white' }">
              <template v-if="modeedit">
                <input
                  v-model="employe.prenom"
                  class="form-control form-control-sm"
                  :style="{
                    backgroundColor: '#2c5364',
                    color: 'white',
                    border: 'none',
                  }"
                />
              </template>
              <template v-else>
                {{ employe.prenom }}
              </template>
            </td>
            <td :style="{ backgroundColor: '#2c5364', color: 'white' }">
              <template v-if="modeedit"
                ><input
                  type="number"
                  v-model.number="employe.Salaire"
                  class="form-control form-control-sm"
                  :style="{
                    backgroundColor: '#2c5364',
                    color: 'white',
                    border: 'none',
                  }"
                />
              </template>
              <template v-else>
                {{ obs(employe.Salaire) }}
              </template>
            </td>
            <td
              v-if="modesupp"
              :style="{
                backgroundColor: '#2c5364',
                color: 'white',
                cursor: 'pointer',
              }"
            >
              <template v-if="modesupp">
                <span
                  @click="supprimeEmploye(employe.numEmp)"
                  title="Supprimer l'employé"
                  class="fas fa-xmark"
                  style="color: red"
                >
                </span>
              </template>
            </td>
          </tr>
        </transition-group>
      </table>
    </div>
  </div>
</template>

<script setup>
import axios from "axios";
import Swal from "sweetalert2";
import { computed, onMounted, ref } from "vue";

const employes = ref([]);
const recherche = ref("");
const animationaff = ref([]);
const titre = ref("Liste des employés");

const affichageprogs = async () => {
  animationaff.value = [];
  let i = 0;
  const interval = setInterval(() => {
    if (i >= employes.value.length) {
      clearInterval(interval);
    } else {
      animationaff.value.push(employes.value[i]);
      i++;
    }
  }, 300);
};

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
    affichageprogs();
  } catch (error) {
    console.error(
      "Une erreur est survenue lors de la récupération des employés :",
      error.message
    );
  }
};

const donneesFiltrees = computed(() => {
  const r = recherche.value.toLowerCase();
  return animationaff.value.filter(
    (e) => e.nom.toLowerCase().includes(r) || e.prenom.toLowerCase().includes(r)
  );
});

onMounted(afficherEmploye);

///////////////// Modification et suppression ////////////////

const modeedit = ref(false);
const modesupp = ref(false);

////////////////////// Modification /////////////////////////

const employesBackup = ref([]);

const modifie = () => {
  employesBackup.value = JSON.parse(JSON.stringify(employes.value));
  modeedit.value = true;
  titre.value = "Modification des employés";
};
const enregistre = async () => {
  try {
    await axios.post(
      "http://localhost/GestionEmp/modifieremp.php",
      employes.value
    );
    Swal.fire({
      icon: "success",
      title: "Succès",
      text: "Modifications réussies",
      timer: 3000,
      showConfirmButton: false,
      position: "center",
    });
    modeedit.value = false;
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Erreur",
      text: "Une erreur est survenue lors de l'enregistrement.",
      position: "center",
    });
  }
  titre.value = "Liste des employés";
};

////////////////////// Suppression /////////////////////////

const annule = () => {
  if (modeedit.value) {
    employes.value = JSON.parse(JSON.stringify(employesBackup.value));
  }
  modesupp.value = false;
  modeedit.value = false;
  titre.value = "Liste des employés";
};

const supprime = () => {
  modesupp.value = true;
  titre.value = "Suppression des employés";
};

const supprimeEmploye = async (numEmp) => {
  const result = await Swal.fire({
    title: "Êtes-vous sûr ?",
    text: "Voulez-vous vraiment supprimer cet employé ?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#3085d6",
    confirmButtonText: "Oui, supprimer",
    cancelButtonText: "Annuler",
    position: "center",
  });

  if (!result.isConfirmed) return;

  try {
    await axios.post("http://localhost/GestionEmp/supprimeremp.php", {
      numEmp: numEmp,
    });
    employes.value = employes.value.filter((e) => e.numEmp !== numEmp);
    animationaff.value = animationaff.value.filter((e) => e.numEmp !== numEmp);
    Swal.fire({
      icon: "success",
      title: "Supprimé",
      text: "Employé supprimé avec succès !",
      showConfirmButton: false,
      timer: 3000,
      position: "center",
    });
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Erreur",
      text: "Erreur lors de la suppression : " + error.message,
      position: "center",
    });
  }
};
</script>

<style scoped>
.table-container {
  max-height: 400px;
  overflow-y: auto;
  overflow-x: hidden;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th,
td {
  padding: 10px;
  text-align: center;
  border: 1px solid #333;
}

thead th {
  position: sticky;
  top: 0;
  z-index: 1;
}

h2 {
  color: #dfe5e7;
  font-family: "Poetsen One", sans-serif;
}

.list {
  font-family: "Roboto", sans-serif;
  padding: 1rem;
  text-align: center;
}
.slide-left-enter-active,
.slide-left-leave-active {
  transition: all 0.5s ease;
}

.slide-left-enter-from {
  opacity: 0;
  transform: translateX(100px);
}

.slide-left-enter-to {
  opacity: 1;
  transform: translateX(0);
}

.slide-left-leave-from {
  opacity: 1;
  transform: translateX(0);
}

.slide-left-leave-to {
  opacity: 0;
  transform: translateX(100px);
}
</style>
