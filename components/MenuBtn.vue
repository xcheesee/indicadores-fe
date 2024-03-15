<script setup>
const { texto, rota } = defineProps({
  texto: String,
  rota: String,
});

const transitionContainer = ref(false);

async function triggerPressAnimation(element) {
  const parent = element.parentNode;

  const pressAnimation = [
    { transform: "scale(100%)" },
    { transform: "scale(80%)" },
    { transform: "scale(100%)" },
  ];

  const transitionAnimation = [
    { opacity: "1", offset: 0.7 },
    { opacity: "0.8", offset: 0.8 },
    { opacity: "0" },
  ];

  const pressTiming = {
    duration: 500,
    iterations: 1,
    fill: "forwards",
    easing: "cubic-bezier(0.4, 0, 0.2, 1)",
  };

  return await Promise.all([
    element.animate(pressAnimation, pressTiming).finished,
    parent.animate(transitionAnimation, pressTiming).finished,
  ]);
}
</script>

<template>
  <div
    class="absolute left-0 top-0 z-20 h-full w-full"
    :class="transitionContainer ? '' : 'hidden'"
  ></div>

  <button
    @click="
      async (e) => {
        await triggerPressAnimation(e.currentTarget);
        return navigateTo({ path: rota, query: { fromDash: 'true' } });
      }
    "
    class="relative flex h-[200px] w-full items-center justify-center gap-4 rounded border-2 border-primary-500 bg-secondary-50 py-4 shadow-lg *:text-primary-700 hover:border-primary-800 hover:bg-primary-300 focus:border-primary-800 focus:bg-primary-300"
  >
    <div class="flex items-center justify-center gap-4 px-4">
      <slot name="icone"></slot>
      <p class="text-center text-3xl font-bold">
        {{ texto }}
      </p>
    </div>
  </button>
</template>

<style scoped>
button {
  outline: none;
}
</style>
