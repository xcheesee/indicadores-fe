<script setup>
import { Icon } from "@iconify/vue";
import { TooltipText, TooltipWrapper } from "../tooltip";
import IconBtn from "../input/IconBtn.vue";

const props = defineProps({ fadein: Boolean });
</script>

<template>
  <Transition :appear="fadein">
    <div
      :class="$attrs.class"
      class="relative grid max-h-[600px] min-h-[400px] grid-cols-2 grid-rows-[min-content_1fr] gap-4 rounded bg-white px-4 py-2 shadow-lg"
    >
      <div class="cursor-grab justify-self-start py-2 focus:cursor-grabbing">
        <Icon icon="ic:outline-drag-indicator" width="32" />
      </div>

      <TooltipWrapper class="justify-self-end">
        <IconBtn color="neutral">
          <Icon icon="oui:popout" width="32" />
        </IconBtn>

        <TooltipText
          ><p class="whitespace-nowrap text-sm font-medium">
            Exportar Gráfico
          </p></TooltipText
        >
      </TooltipWrapper>

      <div class="col-span-2">
        <slot />
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.v-enter-from {
  opacity: 0;
}

.v-enter-active {
  transition: opacity 500ms cubic-bezier(0.2, 0, 0.4, 1);
}
</style>
