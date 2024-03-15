<script setup>
import Select from "../input/Select.vue";
import SelectValue from "../input/SelectValue.vue";
const props = defineProps(["placeholder", "name", "tw"]);
</script>
<template>
  <Select :twClass="tw" :placeholder="placeholder" class="bg-neutral-100">
    <SelectValue value="1">Val1</SelectValue>
    <SelectValue value="2">Val2</SelectValue>
  </Select>
</template>
