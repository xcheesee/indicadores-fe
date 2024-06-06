<script setup>
const props = defineProps({
  placeholder: {
    type: String,
    default: "",
  },
  name: String,
  id: String,
});
const value = defineModel();
</script>
<template>
  <ClientOnly>
    <FadeinTransition>
      <div class="relative">
        <label :for="id">
          <slot name="label" />
        </label>
        <select
          :name="name"
          :id="id"
          class="border-2 border-transparent px-2 py-1 focus:border-primary-800 focus:bg-primary-100"
          :class="$attrs.class"
          v-model="value"
          @input="(e) => (e.target.style.color = 'black')"
          :tabindex="$attrs.tabindex"
        >
          <option
            v-if="placeholder !== ''"
            value="placeholder"
            hidden
            selected
            disabled
          >
            {{ placeholder }}
          </option>
          <slot />
        </select>
      </div>
    </FadeinTransition>
  </ClientOnly>
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
