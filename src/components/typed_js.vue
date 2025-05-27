<template>
  <span>{{ displayedText }}</span>
</template>

<script setup>
import { onMounted, ref } from "vue";
const noms = ["Princy", "Fahazavana", "Miahy"];
const displayedText = ref("");

let currentTextIndex = 0;
let charIndex = 0;
let typing = true;

onMounted(() => {
  const typeSpeed = 100;
  const backSpeed = 50;
  const pauseTime = 1000;

  const type = () => {
    const currentText = noms[currentTextIndex];

    if (typing) {
      if (charIndex < currentText.length) {
        displayedText.value += currentText[charIndex];
        charIndex++;
        setTimeout(type, typeSpeed);
      } else {
        typing = false;
        setTimeout(type, pauseTime);
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
