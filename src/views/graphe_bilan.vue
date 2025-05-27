<template>
  <div class="row">
    <div class="col-6 box text-center">
      <h6>Situations des Employés</h6>
      <canvas ref="salairePie" class="mx-auto d-block mt-5"></canvas>
      <div class="mt-3">
        <ul>
          <li v-for="(label, i) in pieLabels" :key="label">
            <div :class="['bin', ['orange', 'blue', 'red'][i]]"></div>
            <span>{{ label }} : {{ piePercentages[i] }}%</span>
          </li>
        </ul>
      </div>
    </div>
    <div class="col-6 box text-center">
      <h6>Bilan du salaire</h6>
      <canvas
        ref="salaireHist"
        class="mx-auto d-block mt-5"
        style="height: 300px; width: 300px"
      ></canvas>
      <div class="mt-3">
        <ul>
          <li>
            <div class="bin blue"></div>
            <span>Total: {{ employes[0]?.Total }} (£)</span>
          </li>
          <li>
            <div class="bin red"></div>
            <span>Maximal: {{ employes[0]?.Maximal }} (£)</span>
          </li>
          <li>
            <div class="bin orange"></div>
            <span>Minimal: {{ employes[0]?.Minimal }} (£)</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import axios from "axios";
import Chart from "chart.js/auto";
import { onMounted, ref } from "vue";
const employes = ref([]);
const categories = ref([]);
const salairePie = ref(null);
const salaireHist = ref(null);

let pieLabels = [];
let pieData = [];
let piePercentages = [];

onMounted(async () => {
  try {
    const response = await axios.get("http://localhost/GestionEmp/graphe.php");
    employes.value = response.data.bilan;
    categories.value = response.data.categories;

    // Prépare les données pour le bar chart
    const valeurs = [
      employes.value[0]["Minimal"],
      employes.value[0]["Total"],
      employes.value[0]["Maximal"],
    ];

    // Prépare les données pour le pie chart
    pieLabels = categories.value.map((item) => item.categorie_salaire);
    pieData = categories.value.map((item) => item.total_employes);
    const totalPie = pieData.reduce((sum, val) => sum + val, 0);
    piePercentages = pieData.map((val) => ((val / totalPie) * 100).toFixed(1));

    // Chart Pie (valeurs brutes)
    new Chart(salairePie.value, {
      type: "pie",
      data: {
        labels: pieLabels,
        datasets: [
          {
            data: pieData,
            backgroundColor: [
              "#FF9800", // orange
              "#2196F3", // bleu
              "#F44336", // rouge
            ],
          },
        ],
      },
      options: {
        responsive: false,
        animation: {
          duration: 4000,
          easing: "easeOutBounce",
        },
        plugins: {
          legend: {
            labels: {
              color: "#fff",
            },
          },
        },
      },
    });

    // Chart Bar
    new Chart(salaireHist.value, {
      type: "bar",
      data: {
        labels: ["Minimal", "Total", "Maximal"],
        datasets: [
          {
            data: valeurs,
            backgroundColor: [
              "#FF9800", // orange
              "#2196F3", // bleu
              "#F44336", // rouge
            ],
            barPercentage: 0.2,
          },
        ],
      },
      options: {
        responsive: false,
        animation: {
          duration: 4000,
          easing: "easeOutBounce",
        },
        plugins: {
          legend: {
            display: false,
            labels: {
              color: "#fff",
            },
          },
          title: {
            color: "#fff",
          },
        },
        scales: {
          y: {
            type: "logarithmic",
            beginAtZero: true,
            title: { display: true, text: "Salaire (€)", color: "#fff" },
            ticks: { color: "#fff" },
          },
          x: {
            ticks: { color: "#fff" },
          },
        },
      },
    });
  } catch (error) {
    console.error("Erreur lors de la récupération :", error);
  }
});
</script>

<style scoped>
.box {
  height: 450px;
  width: 500px;
  margin: auto;
  margin-top: 50px;
  border-radius: 5px;
  padding: 10px;
  background-color: #2c5364;
  font-family: "Merriweather", serif;
}
h6 {
  font-family: "Poetsen One", sans-serif;
  color: #dfe5e7;
}
ul {
  list-style-type: none;
  padding: 0;
  display: flex;
  gap: 50px;
  justify-content: center;
  align-items: center;
  font-family: "Merriweather", serif;
  color: #fff;
  font-size: 11px;
}
li {
  display: flex;
  gap: 6px;
}
.bin {
  width: 12px;
  height: 12px;
  border-radius: 3px;
  display: inline-block;
}
.orange {
  background: #ff9800;
}
.blue {
  background: #2196f3;
}
.red {
  background: #f44336;
}
.row,
.box,
ul,
li,
span,
div,
p {
  color: #fff;
}
</style>
