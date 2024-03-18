<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
<style>
.fadein-enter-from {
  opacity: 0;
}

.fadein-enter-active {
  transition: opacity 500ms cubic-bezier(0.2, 0, 0.4, 1);
}
</style>
