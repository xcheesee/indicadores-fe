<script setup>
const props = defineProps({ fadein: Boolean });
</script>

<template>
  <ClientOnly>
    <FadeinTransition>
      <div
        :class="$attrs.class"
        class="relative grid max-h-[600px] min-h-[400px] grid-cols-2 grid-rows-[min-content_1fr] gap-4 rounded bg-white px-4 py-2 shadow-lg"
      >
        <div class="cursor-grab justify-self-start py-2 focus:cursor-grabbing">
          <Icon name="ic:outline-drag-indicator" size="32" />
        </div>

        <TooltipWrapper class="justify-self-end">
          <InputIconBtn color="neutral">
            <Icon name="oui:popout" size="32" />
          </InputIconBtn>

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
    </FadeinTransition>
  </ClientOnly>
</template>

<style scoped>
.v-enter-from {
  opacity: 0;
}

.v-enter-active {
  transition: opacity 500ms cubic-bezier(0.2, 0, 0.4, 1);
}
</style>
