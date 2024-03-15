<script setup>
const props = defineProps(["placeholder", "twClass", "name", "id", "label"]);
</script>
<template>
  <label v-if="label != ''" :for="id">{{ label }} </label>
  <select
    :name="name"
    :id="id"
    class="border-2 border-transparent px-2 py-1 focus:border-primary-800 focus:bg-primary-100"
    :class="$attrs.class"
    @input="(e) => (e.target.style.color = 'black')"
    :tabindex="$attrs.tabindex"
  >
    <option value="" hidden selected disabled>{{ placeholder }}</option>
    <slot />
  </select>
</template>
<style scoped>
select {
  direction: ltr;
  color: grey;
  outline: none;
}

option {
  color: black;
}
</style>
