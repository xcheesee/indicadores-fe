<template>
  <Transition appear>
    <slot/> 
  </transition appear>
</template>

<script lang="ts" setup>
</script>

<style scoped>
.v-enter-active,
.v-leave-active {
    transition: opacity 500ms cubic-bezier(0.2, 0, 0.4, 1);
}

.v-enter-from,
.v-leave-to {
    opacity: 0;
}
</style>