<template>
  <div class="container">
    <div class="row text-center">
      <h2 class="mt-4 ecriture">Ajouter un employé</h2>
    </div>
    <div class="row mt-3 fomu">
      <form @submit.prevent="ajouterEmploye">
        <div class="row mb-4 mt-4">
          <label class="row mb-1">Nom:</label>
          <div class="row">
            <input
              type="text"
              class="form-control"
              :class="{
                'is-valid': touche && estValide,
                'is-invalid': touche && !estValide,
              }"
              v-model="nom"
              @input="touche = true"
            />
            <div class="valid-feedback" v-if="touche && estValide">
              Nom valide!
            </div>
            <div class="invalid-feedback" v-if="touche && !estValide">
              Veuillez entrer un nom valide.
            </div>
          </div>
        </div>
        <div class="row mb-4">
          <label class="row mb-1">Prénom:</label>
          <div class="row">
            <input
              type="text"
              class="form-control"
              :class="{
                'is-valid': touche1 && estValide1,
                'is-invalid': touche1 && !estValide1,
              }"
              v-model="prenom"
              @input="touche1 = true"
            />
            <div class="valid-feedback" v-if="touche1 && estValide1">
              Prénom valide!
            </div>
            <div class="invalid-feedback" v-if="touche1 && !estValide1">
              Veuillez entrer un prénom valide.
            </div>
          </div>
        </div>
        <div class="row mb-4">
          <label class="row mb-1">Salaire:</label>
          <div class="row">
            <input
              type="number"
              class="form-control"
              :class="{
                'is-valid': touche2 && estValide2,
                'is-invalid': touche2 && !estValide2,
              }"
              v-model="salaire"
              @input="touche2 = true"
            />
            <div class="valid-feedback" v-if="touche2 && estValide2">
              Salaire valide!
            </div>
            <div class="invalid-feedback" v-if="touche2 && !estValide2">
              Veuillez entrer un salaire valide.
            </div>
          </div>
        </div>
        <div class="row">
          <div class="bt">
            <input type="submit" class="bout" value="Ajouter" />
          </div>
        </div>
      </form>
    </div>
  </div>
</template>
<style scoped>
.fomu {
  width: 500px;
  height: 400px;
  background-color: #2c5364;
  margin-left: 27%;
  padding: 3% 10% 2% 10%;
  border-radius: 4px;
  color: rgb(221, 226, 231);
  font-family: "Merriweather", serif;
  font-size: 14px;
  animation: fadeIn 0.8s ease-in-out;
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
}
.bout:hover {
  background-color: #253e3f;
  color: #d8dbe0;
  transition: all 2s ease;
}
.bt {
  margin-left: 23%;
  margin-top: 5px;
}

@keyframes gauche {
  0% {
    opacity: 0;
    transform: translateX(-30px);
  }
  100% {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes droite {
  0% {
    opacity: 0;
    transform: translateX(30px);
  }
  100% {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes fadeIn {
  0% {
    opacity: 0;
    transform: scale(0.98);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}

label {
  animation: gauche 1s ease forwards;
  opacity: 0;
}

input {
  animation: droite 1s ease forwards;
  opacity: 0;
}
</style>
<script setup>
import axios from "axios";
import Swal from "sweetalert2";
import { computed, ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const nom = ref("");
const prenom = ref("");
const salaire = ref();
const touche = ref(false);
const touche1 = ref(false);
const touche2 = ref(false);
const estValide = computed(() => /^[A-Za-zÀ-ÿ\s'-]{3,}$/.test(nom.value));
const estValide1 = computed(() => /^[A-Za-zÀ-ÿ\s'-]{3,}$/.test(prenom.value));
const estValide2 = computed(() => salaire.value > 0);

const ajouterEmploye = async () => {
  if (estValide.value && estValide1.value && estValide2.value) {
    try {
      const response = await axios.post(
        "http://localhost/GestionEmp/ajout_emp.php",
        {
          nom: nom.value,
          prenom: prenom.value,
          salaire: salaire.value,
        }
      );

      if (response.data.success) {
        await Swal.fire({
          icon: "success",
          title: "Succès",
          text: "Employé ajouté avec succès !",
          showConfirmButton: false,
          timer: 3000,
          position: "center",
        });
        router.push("/gestion-employes");

        nom.value = "";
        prenom.value = "";
        salaire.value = null;
        touche.value = touche1.value = touche2.value = false;
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
  } else {
    Swal.fire({
      icon: "warning",
      title: "Champs invalides",
      text: "Veuillez corriger les erreurs dans le formulaire.",
      position: "center",
    });
  }
};
</script>
