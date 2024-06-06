<script setup>
const props = defineProps(["placeholder", "label", "name"]);
const value = defineModel();
</script>
<template>
  <InputSelect
    :placeholder="placeholder"
    class="bg-neutral-100 relative"
    :class="$attrs.class"
    v-model="value"
  >
    <template #label
      ><div
        class="absolute left-0 top-0 -mt-2 mx-1 bg-white text-xs px-2 rounded z-10"
      >
        {{ label }}
      </div></template
    >
    <slot />
  </InputSelect>
</template>
