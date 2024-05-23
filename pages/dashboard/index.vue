<script setup>
import { useQuery } from "@tanstack/vue-query";

async function fetcher(url) {
  return await fetch("http://10.30.18.9:81/indicadores_be/api" + url).then(
    (response) => response.json(),
  );
}
const selectedProjeto = ref(0);
const { data: indicadores, isPending: loadingIndicadores } = useQuery({
  queryKey: ["indicadores"],
  queryFn: () => fetcher("/indicadores"),
});

const { data: projetos, isPending: loadingProjetos } = useQuery({
  queryKey: ["projetos"],
  queryFn: () => fetcher("/projetos"),
});

const filteredIndicadores = computed(() => {
  if (!indicadores.value || selectedProjeto.value === "") return [];
  if (selectedProjeto.value === 0) {
    return indicadores.value.data;
  }
  return indicadores.value.data.filter(
    (indicador) => indicador.projeto_id === selectedProjeto.value,
  );
});
</script>

<template>
  <main
    class="mx-auto grid w-[60%] grid-cols-12 gap-3 pb-8 self-end justify-self-end mt-[200px]"
  >
    <div class="col-span-12 grid grid-cols-subgrid gap-4 items-end justify-end">
      <div class="col-span-4 flex flex-col gap-1">
        <div v-if="loadingProjetos">Carregando...</div>
        <InputSelect
          v-else
          name="projeto"
          id="projeto"
          class="h-8 w-full rounded bg-primary-100 px-2"
          v-model="selectedProjeto"
          tabindex="100"
          placeholder="Selecione um Projeto"
        >
          <template #label>
            <p class="text-xl font-bold text-primary-800">Projeto</p>
          </template>
          <InputSelectValue :value="0">Todos</InputSelectValue>
          <template v-for="projeto in projetos.data">
            <InputSelectValue :value="projeto.id">{{
              projeto.nome
            }}</InputSelectValue>
          </template>
        </InputSelect>
      </div>
      <div class="col-span-8">
        <DashboardSearch />
      </div>
    </div>

    <div v-if="loadingIndicadores">Carregando Indicadores</div>

    <div
      v-else
      class="flex col-span-12 flex-wrap gap-4 *:basis-[25%] *:grow *: shrink-0"
    >
      <template v-for="indicador in filteredIndicadores">
        <PainelBtn :texto="indicador.nome" class="col-span-3">
          <template #icone>
            <Icon name="ion:water" size="64" />
          </template>
        </PainelBtn>
      </template>
    </div>
    <!--<div class="flex col-span-12 flex-wrap gap-4 *:grow *:shrink-0">
        <PainelBtn texto="Ar" class="">
          <template #icone>
            <Icon name="ph:wind" size="64" />
          </template>
        </PainelBtn>

        <PainelBtn texto="Área verde pública" class="col-span-6">
          <template #icone>
            <Icon name="healthicons:forest" size="64" />
          </template>
        </PainelBtn>

        <PainelBtn texto="Cobertura vegetal" class="col-span-4">
          <template #icone>
            <Icon name="foundation:trees" size="64" />
          </template>
        </PainelBtn>

        <PainelBtn texto="Licenciamento Ambiental" class="col-span-8">
          <template #icone>
            <Icon name="ph:certificate" size="64" />
          </template>
        </PainelBtn>

        <PainelBtn texto="Fauna" class="col-span-3">
          <template #icone>
            <Icon name="mdi:paw" size="64" />
          </template>
        </PainelBtn>

        <PainelBtn texto="Biosampa" class="col-span-3">
          <template #icone>
            <div class="relative h-32 w-32">
              <img
                src="@/assets/icons/biosampa.svg"
                alt=""
                class="absolute h-full w-full object-contain"
              />
            </div>
          </template>
        </PainelBtn>

        <PainelBtn texto="Novo projeto NDTIC" class="col-span-6">
          <template #icone>
            <div class="relative h-32 w-32">
              <img
                src="@/assets/icons/ndtic.svg"
                alt=""
                class="absolute h-full w-full object-contain"
              />
            </div>
          </template>
        </PainelBtn>

        <PainelBtn texto="Treinamento - CPA\DIA" class="col-span-6">
          <template #icone>
            <Icon name="mdi:book-education" size="64" />
          </template>
        </PainelBtn>

        <PainelBtn texto="Solo" class="col-span-3">
          <template #icone>
            <div class="relative w-16 h-16">
              <img
                src="@/assets/icons/planta_mao.svg"
                alt=""
                class="absolute h-full w-full object-contain"
              />
            </div>
          </template>
        </PainelBtn>

        <PainelBtn texto="Treinamento - CLA" class="col-span-3">
          <template #icone> 
          </template>
        </PainelBtn>

        <PainelBtn texto="Licenciamento Ambiental de NDTIC" class="col-span-12">
          <template #icone>
            <Icon name="ph:certificate" size="64" />
          </template>
        </PainelBtn>
      </div>-->
  </main>
</template>

<style scoped>
.v-enter-from {
  opacity: 0;
}

.v-enter-active {
  transition: opacity 500ms cubic-bezier(0.2, 0, 0.4, 1);
}
</style>
