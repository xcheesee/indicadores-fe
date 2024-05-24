<script setup>
import { useQuery } from "@tanstack/vue-query";

onMounted(() => {
  window.scrollTo(0, 0);
});
const { data: indicadores, isPending: loadingIndicadores } = useQuery({
  queryKey: ["indicadores"],
  queryFn: () => fetcher("/indicadores"),
});
const { data: projetos, isPending: loadingProjetos } = useQuery({
  queryKey: ["projetos"],
  queryFn: () => fetcher("/projetos"),
});
</script>
<template>
  <div>
    <SidebarElement>
      <div class="flex gap-4 px-4">
        <Icon name="ic:round-folder" size="32" />
        <div v-if="loadingProjetos">Carregando...</div>
        <InputSelect
          v-else
          name="projeto"
          id="projeto"
          class="h-8 w-full rounded bg-secondary-50 px-2"
          tabindex="100"
          placeholder="Selecione um Projeto"
        >
          <template v-for="projeto in projetos.data">
            <InputSelectValue :value="projeto.id">{{
              projeto.nome
            }}</InputSelectValue>
          </template>
        </InputSelect>
      </div>
      <div v-if="loadingIndicadores">Carregando...</div>
      <template v-else>
        <template v-for="indicador in indicadores.data">
          <SidebarBtn :title="indicador.nome">
            <template #icone>
              <div class="relative w-8 h-8">
                <img
                  :src="indicador.imagem"
                  alt=""
                  class="absolute w-full h-full"
                />
              </div>
            </template>
          </SidebarBtn>
        </template>
      </template>
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
