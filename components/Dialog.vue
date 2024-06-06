<script setup>
const props = defineProps({
  open: Boolean,
});

const modal = ref(null);
watch(
  () => props.open,
  (newValue, _oldValue) => {
    if (newValue) {
      modal.value.showModal();
    } else {
      modal.value.close();
    }
  },
);

onMounted(() => {
  if (props.open) {
    modal.value.showModal();
  }
});
</script>

<template>
  <dialog ref="modal" class="bg-white rounded fade">
    <div
      class="grid grid-rows-[min-content_1fr_min-content] px-4 py-2 rounded gap-6"
    >
      <slot name="title" />
      <slot name="content" />
      <slot />
      <slot name="action" />
    </div>
  </dialog>
</template>

<style scoped>
dialog::backdrop {
  background-color: rgba(0, 0, 0, 0.8);
}

.fade {
  animation: fadein 200ms ease-in;
}

@keyframes fadein {
  0% {
    opacity: 0%;
  }

  100% {
    opacity: 100%;
  }
}
</style>
