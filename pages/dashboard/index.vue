<script setup>
import { useQuery } from "@tanstack/vue-query";

async function fetcher() {
  return await fetch("http://localhost:8000/api/indicadores").then((response) =>
    response.json(),
  );
}
const selectedProjeto = ref(0);
const { data: indicadores, suspense } = useQuery({
  queryKey: ["indicadores"],
  queryFn: fetcher,
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
  <div>
    <nav class="grid h-[600px] content-center justify-center">
      <DashboardSearch />
    </nav>

    <main class="mx-auto grid w-[60%] grid-cols-12 gap-3 pb-8">
      <div class="col-span-12 grid grid-cols-subgrid">
        <div class="col-span-4 flex flex-col gap-1">
          <InputSelect
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

            <InputSelectValue :value="1">Biosampa</InputSelectValue>
          </InputSelect>
        </div>
      </div>

      <template v-for="indicador in filteredIndicadores">
        <PainelBtn :texto="indicador.nome" class="col-span-3">
          <template #icone>
            <Icon name="ion:water" size="64" />
          </template>
        </PainelBtn>
      </template>

      <!--<PainelBtn texto="Ar" class="col-span-3">
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
          <div class="">
            <img
              src="@/assets/icons/biosampa.svg"
              alt=""
              class="h-full w-full object-fill"
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
          <div class="h-16">
            <img
              src="@/assets/icons/planta_mao.svg"
              alt=""
              class="h-full w-full object-fill"
            />
          </div>
        </template>
      </PainelBtn>

      <PainelBtn texto="Treinamento - CLA" class="col-span-3">
        <template #icone>
          <Icon name="mdi:book-education" size="64" />
        </template>
      </PainelBtn>

      <PainelBtn texto="Licenciamento Ambiental de NDTIC" class="col-span-12">
        <template #icone>
          <Icon name="ph:certificate" size="64" />
        </template>
      </PainelBtn>-->
    </main>
  </div>
</template>

<style scoped>
.v-enter-from {
  opacity: 0;
}

.v-enter-active {
  transition: opacity 500ms cubic-bezier(0.2, 0, 0.4, 1);
}
</style>
