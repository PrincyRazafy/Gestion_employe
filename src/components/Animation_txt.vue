<template>
  <h2 :class="titleClass">
    <span
      v-for="(char, index) in text.split('')"
      :key="index"
      class="letter"
      :style="{ animationDelay: index * 0.05 + 's' }"
    >
      {{ char }}
    </span>
  </h2>
</template>

<script>
export default {
  name: "AnimatedText",
  props: {
    text: {
      type: String,
      required: true,
    },
    titleClass: {
      type: String,
      default: "",
    },
  },
};
</script>

<style scoped>
.letter {
  display: inline-block;
  opacity: 0;
  transform: translateX(20px);
  animation: slideIn 1s ease forwards;
}

@keyframes slideIn {
  to {
    opacity: 1;
    transform: translateX(0);
  }
}
</style>
