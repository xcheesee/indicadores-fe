<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
<style>
::-webkit-scrollbar {
  width: 10px;
}

::-webkit-scrollbar-thumb {
  background: #3fc88c;
  border-radius: 10px;
  border: 2px solid #f0f9ff;
}
::-webkit-scrollbar-track {
  background: #f0f9ff;
}

.page-enter-active,
.page-leave-active {
  transition: opacity 500ms cubic-bezier(0.2, 0, 0.4, 1);
}

.page-enter-from,
.page-leave-to {
  opacity: 0;
}
</style>
