<script setup>
const props = defineProps(["placeholder", "name", "tw"]);
</script>
<template>
  <InputSelect :twClass="tw" :placeholder="placeholder" class="bg-neutral-100">
    <InputSelectValue value="1">Val1</InputSelectValue>
    <InputSelectValue value="2">Val2</InputSelectValue>
  </InputSelect>
</template>
