<script setup>
//para adicionar popup menu a um elemento, passar o evento de click para o metodo toggle
import { clickAwayStore } from "@/utils/store";

const show = ref(false);
const container = ref(null);
const content = ref(null);
const anchor = ref(null);

let popoverTop, popoverLeft;

function toggle(event) {
  anchor.value = event.target;
  if (show.value) {
    return (show.value = false);
  }
  const { height, top, left } = event.currentTarget.getBoundingClientRect();
  popoverLeft = left + window.scrollX;
  popoverTop = top + height + window.scrollY;
  return (show.value = true);
}

onMounted(() => {
  clickAwayStore.instance.register(container.value, (e) => {
    if (e.target != anchor.value) show.value = false;
  });
});

watch(show, () => {
  nextTick(() => {
    const height = content.value.clientHeight;
    container.value.style.height = height + "px";
  });
});

defineExpose({
  toggle,
});
</script>
<template>
  <Teleport to="body">
    <Transition>
      <div
        v-show="show"
        ref="container"
        class="absolute z-50 overflow-hidden rounded border bg-white"
        id="menu"
        :style="{
          top: popoverTop + 'px',
          left: popoverLeft + 'px',
        }"
      >
        <div ref="content">
          <slot />
        </div>
      </div>
    </Transition>
  </Teleport>
</template>
<style scoped>
.v-enter-from,
.v-leave-to {
  height: 0px !important;
}

.v-enter-active {
  transform-origin: top;
  transition: height 500ms cubic-bezier(0.2, 0, 0.4, 1);
}

.v-leave-active {
  transform-origin: top;
  transition: height 200ms cubic-bezier(0.2, 0, 1, 1);
}
</style>
