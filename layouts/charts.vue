<script setup>
onMounted(() => {
  window.scrollTo(0, 0);
});
</script>
<template>
  <div>
    <SidebarElement>
      <div class="flex gap-4 px-4">
        <Icon name="ic:round-folder" size="32" />
        <InputSelect
          name="projeto"
          id="projeto"
          class="h-8 w-full rounded bg-secondary-50 px-2"
          tabindex="100"
          placeholder="Selecione um Projeto"
        >
          <InputSelectValue value="1">Biosampa</InputSelectValue>
        </InputSelect>
      </div>

      <SidebarBtn icone="ic:round-air" title="Ar" collapsable active />
      <SidebarBtn icone="ph:plant" title="Plantil" collapsable />
      <SidebarBtn icone="mdi:forest" title="Área Verde Pública" />
      <SidebarBtn icone="mdi:water" title="Água" />
      <SidebarBtn icone="mdi:education-outline" title="Treinamento" />
      <SidebarBtn icone="mdi:paw" title="Fauna" />
    </SidebarElement>
    <slot />
  </div>
</template>

<style>
#sidebar-container {
  scrollbar-width: none !important;
  -ms-overflow-style: none !important;
  overscroll-behavior: contain;
}

#sidebar-container::-webkit-scrollbar {
  width: 0px;
  background: transparent;
}

.fadein-enter-from {
  opacity: 0;
}

.fadein-enter-active {
  transition: opacity 500ms cubic-bezier(0.2, 0, 0.4, 1);
}
</style>
