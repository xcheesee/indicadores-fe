<script setup>
const props = defineProps({
  color: {
    type: String,
    default: "neutral",
  },
});

const focusColor = {
  primary: "hover:bg-primary-300 focus:bg-primary-300",
  secondary: "hover:bg-secondary-300 focus:bg-secondary-300",
  neutral: "hover:bg-neutral-200 focus:bg-neutral-200",
};
</script>
<template>
  <button class="rounded-full p-2" :class="focusColor[props.color]">
    <slot />
  </button>
</template>
<style scoped>
button {
  outline: none;
}
</style>
