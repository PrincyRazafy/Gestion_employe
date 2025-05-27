<template>
  <span>{{ displayedText }}</span>
</template>

<script setup>
import { onMounted, ref } from "vue";
const noms = ["Princy", "Fahazavana", "Miahy"];
const displayedText = ref("");

let currentTextIndex = 0; //index du mot en cours noms[0],....
let charIndex = 0; //position dans le mot noms.length
let typing = true; // if true on ecrit, false si on efface

onMounted(() => {
  const typeSpeed = 100; // vitesse d'ecriture en ms
  const backSpeed = 50; // vitesse d'effacementen ms
  const pauseTime = 1000; // pause apres l'ecriture

  const type = () => {
    const currentText = noms[currentTextIndex]; // noms[0]

    if (typing) {
      if (charIndex < currentText.length) {
        displayedText.value += currentText[charIndex];
        charIndex++;
        setTimeout(type, typeSpeed);
      } else {
        typing = false; // on arret l'ecriture
        setTimeout(type, pauseTime); // on appelle type apres la pause
      }
    } else {
      if (charIndex > 0) {
        displayedText.value = currentText.substring(0, charIndex - 1);
        charIndex--;
        setTimeout(type, backSpeed);
      } else {
        typing = true;
        currentTextIndex = (currentTextIndex + 1) % noms.length;
        setTimeout(type, typeSpeed);
      }
    }
  };

  type();
});
</script>

<style scoped>
span {
  color: #ffd700;
  font-size: 1.5rem;
  font-weight: bold;
  border-right: 2px solid black;
  padding-right: 4px;
  animation: blink 1s step-end infinite;
  font-family: "Poetsen One", sans-serif;
}

@keyframes blink {
  50% {
    border-color: transparent;
  }
}
</style>
