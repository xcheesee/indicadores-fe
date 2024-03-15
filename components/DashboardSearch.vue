<script setup>
import { Icon } from "@iconify/vue";
</script>
<template>
  <div class="relative mx-auto w-[720px] overflow-hidden">
    <input
      class="w-full rounded border-2 border-primary-500 bg-secondary-50 px-4 shadow focus:border-primary-800 focus:bg-secondary-100"
      placeholder="Tema"
      tabindex="99"
    />
    <Icon
      icon="mdi:search"
      class="absolute right-0 top-1/2 -translate-y-1/2 cursor-pointer text-neutral-500"
      width="36"
    />
  </div>
</template>
<style scoped>
input::placeholder,
input {
  font-size: 1.75rem;
}

input {
  outline: none;
}
</style>
