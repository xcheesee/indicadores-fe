<script setup></script>
<template>
  <ClientOnly>
    <Transition appear name="expand">
      <div class="relative mx-auto w-[720px] overflow-hidden">
        <input
          class="w-full rounded border-2 border-primary-500 bg-secondary-50 px-4 shadow focus:border-primary-800 focus:bg-secondary-100"
          placeholder="Tema"
          tabindex="99"
        />
        <Icon
          name="mdi:search"
          class="absolute right-0 top-1/2 -translate-y-1/2 cursor-pointer text-neutral-500"
          size="36"
        />
      </div>
    </Transition>
  </ClientOnly>
</template>
<style scoped>
input::placeholder,
input {
  font-size: 1.75rem;
}

input {
  outline: none;
}

.expand-enter-active {
  transition-property: width;
  transition-duration: 500ms;
  transition-timing-function: cubic-bezier(0.2, 0, 0.4, 1);
}

.expand-enter-from {
  width: 0 !important;
  border: 0px solid #199a66;
}
</style>
