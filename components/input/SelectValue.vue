<script setup>
const props = defineProps(["value", "disabled", "hidden", "selected"]);
</script>
<template>
  <option
    :value="value"
    :disabled="disabled"
    :hidden="hidden"
    :selected="selected"
  >
    <slot />
  </option>
</template>
<style>
option {
  color: black;
}
</style>
