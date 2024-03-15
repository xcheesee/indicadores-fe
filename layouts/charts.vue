<script setup>
onMounted(() => {
  window.scrollTo(0, 0);
});
</script>
<template>
  <ClientOnly>
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

    <main
      class="flex min-h-screen flex-col bg-primary-200 pl-20 pr-4"
      id="container"
    >
      <div class="flex w-full items-end gap-4 px-4 py-3">
        <h1 class="text-5xl font-bold text-primary-900">
          {{ $route.params.name }}
        </h1>

        <Transition name="fadein" :appear="$route.query.fromDash === 'true'">
          <TooltipWrapper>
            <InputIconBtn color="primary">
              <Icon
                name="fluent:document-data-16-filled"
                size="24"
                class="cursor-pointer text-primary-600"
              />
            </InputIconBtn>

            <TooltipText>
              <p class="whitespace-nowrap text-sm font-medium">
                Tabela de Dados
              </p></TooltipText
            >
          </TooltipWrapper>
        </Transition>

        <Transition name="fadein" :appear="$route.query.fromDash === 'true'">
          <TooltipWrapper>
            <InputIconBtn color="primary">
              <Icon
                name="icomoon-free:database"
                size="24"
                class="cursor-pointer text-primary-600"
              />
            </InputIconBtn>

            <TooltipText
              ><p class="whitespace-nowrap text-sm font-medium">
                Indicadores
              </p></TooltipText
            >
          </TooltipWrapper>
        </Transition>

        <Transition name="fadein" :appear="$route.query.fromDash === 'true'">
          <FilterElement />
        </Transition>
      </div>
      <div class="grid h-full w-full grid-cols-12 gap-8 px-4 py-4">
        <slot />
      </div>
    </main>
  </ClientOnly>
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
