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
    <header id="header" class="relative grid w-full items-center">
      <NuxtLink
        to="/"
        class="mt-8 flex h-32 justify-center transition-all duration-300"
        id="header-img-container"
        tabindex="-1"
      >
        <img
          src="@/assets/images/geo.png"
          alt=""
          class="h-full object-contain"
        />
      </NuxtLink>
    </header>
    <slot />
  </div>
</template>
