<script setup>
const props = defineProps({
  sx: String,
});
</script>
<template>
  <div class="group relative transition-opacity">
    <slot></slot>
  </div>
</template>
