<script setup>
let aFrame;

onMounted(() => {
  const el = document.getElementById("three-container");
  worldStore.init(el);
  function animate() {
    aFrame = requestAnimationFrame(animate);
    worldStore.render();
  }
  animate();
});

onUnmounted(() => cancelAnimationFrame(aFrame));
</script>
<template>
  <div
    id="three-container"
    aria-hidden="true"
    class="fixed -z-10 h-screen w-screen blur-[2px]"
  ></div>
  <div class="flex flex-col min-h-screen w-full">
    <slot />
  </div>
</template>
