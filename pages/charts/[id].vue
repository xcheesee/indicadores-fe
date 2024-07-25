<script setup>
import { useQueries, useQuery } from "@tanstack/vue-query";
import TableHeader from "~/components/table/TableHeader.vue";

definePageMeta({
  layout: "charts",
  pageTransition: false,
});

const route = useRoute();
const openFichaDialog = ref(false);
const openTabelaDialog = ref(false);

const { data: regioes, isPending: loadingRegioes } = useQuery({
  queryKey: ["regioes"],
  queryFn: () => fetcher("/tipo_regioes"),
});

const { data: indicador, isPending: loadingIndicador } = useQuery({
  queryKey: ["indicador", route.params.id],
  queryFn: () => fetcher("/indicador/" + route.params.id),
});

const { data: variavel, isPending: loadingVariaveis } = useQuery({
  queryKey: ["variavel", route.params.id],
  queryFn: () => fetcher(`/indicador/${route.params.id}/variavel`),
});

const variaveisId = computed(() =>
  variavel?.value?.data.map((entry) => entry.variavel.id),
);

const valorQueries = computed(() => {
  if (!variaveisId.value) return [];
  return variaveisId.value.map((id) => {
    return {
      queryKey: ["valor", id],
      queryFn: async () => {
        const res = await fetcher(`/variavel/${id}/valores`);
        return { ...res, variavelId: id };
      },
    };
  });
});

const valores = useQueries({
  queries: valorQueries,
  combine: (results) => {
    return {
      data: results.map((result) => result.data),
      isPending: results.some((result) => result.isPending),
      initialData: [],
    };
  },
});

onMounted(() => {
  window.scrollTo(0, 0);
});
</script>
<template>
  <main
    class="flex min-h-screen flex-col bg-primary-200 pl-20 pr-4"
    id="container"
  >
    <div class="flex w-full items-end gap-4 px-4 py-3">
      <h1 class="text-5xl font-bold text-primary-900">
        {{ $route.query.name }}
      </h1>

      <TooltipWrapper>
        <InputIconBtn
          color="primary"
          @click="
            (e) => {
              e.currentTarget.blur();
              if (!variavel || valores.isPending) {
                return;
              }
              openTabelaDialog = true;
            }
          "
        >
          <Icon
            name="fluent:document-data-16-filled"
            size="24"
            class="cursor-pointer"
            :class="[
              loadingVariaveis || valores.isPending
                ? 'text-primary-300'
                : 'text-primary-600',
            ]"
          />
        </InputIconBtn>

        <TooltipText>
          <p class="whitespace-nowrap text-sm font-medium">
            {{
              loadingVariaveis || valores.isPending
                ? "Carregando..."
                : "Tabela de Dados"
            }}
          </p></TooltipText
        >
      </TooltipWrapper>

      <TooltipWrapper>
        <InputIconBtn
          color="primary"
          @click="
            (e) => {
              if (loadingIndicador) return;
              e.currentTarget.blur();
              openFichaDialog = true;
            }
          "
        >
          <Icon
            name="icomoon-free:database"
            size="24"
            class="cursor-pointer"
            :class="[
              loadingIndicador ? 'text-primary-300' : 'text-primary-600',
            ]"
          />
        </InputIconBtn>

        <TooltipText
          ><p class="whitespace-nowrap text-sm font-medium">
            {{ loadingVariaveis ? "Carregando..." : "Ficha do Indicador" }}
          </p></TooltipText
        >
      </TooltipWrapper>
      <div class="flex ml-auto justify-end" v-if="loadingRegioes">
        <CircularSpinner />
      </div>
      <FilterElement v-else :regioes="regioes.data" />
    </div>

    <div
      v-if="loadingIndicador"
      class="grid h-[90vh] w-full justify-center items-center"
    >
      <CircularSpinner />
    </div>

    <div class="grid h-full w-full grid-cols-12 gap-8 px-4 py-4" v-else>
      <ChartCardWrapper
        class="col-span-12 2xl:col-span-6"
        :fadein="$route.query.fromDash === 'true'"
        ><ChartPie
      /></ChartCardWrapper>

      <ChartCardWrapper
        class="col-span-12 2xl:col-span-6"
        :fadein="$route.query.fromDash === 'true'"
        ><ChartLine
      /></ChartCardWrapper>

      <ChartCardWrapper
        class="col-span-12"
        :fadein="$route.query.fromDash === 'true'"
        ><ChartBar
      /></ChartCardWrapper>

      <ChartCardWrapper
        class="col-span-12"
        :fadein="$route.query.fromDash === 'true'"
        ><ChartBar
      /></ChartCardWrapper>

      <ChartCardWrapper
        class="col-span-12"
        :fadein="$route.query.fromDash === 'true'"
        ><ChartBar
      /></ChartCardWrapper>
    </div>
  </main>

  <Dialog :open="openTabelaDialog" class="w-[600px]">
    <template #title
      ><h2 class="text-3xl font-bold text-primary-800">
        Tabela de Dados
      </h2></template
    >
    <template #content>
      <div v-if="valores.isPending || loadingVariaveis">Carregando</div>
      <template v-else>
        <template v-for="entry in valores?.data">
          <div>
            <span class="font-bold text-primary-600 text-xl">{{
              variavel?.data.find((v) => v.variavel.id == entry.variavelId)
                ?.variavel?.nome
            }}</span>
          </div>

          <Table>
            <template #head>
              <TableRow>
                <TableHeader>Periodo</TableHeader>
                <TableHeader>Regiao</TableHeader>
                <TableHeader>Valor</TableHeader>
              </TableRow>
            </template>

            <template #body>
              <TableRow v-for="valor in entry?.data">
                <TableCell>{{ valor.periodo }}</TableCell>
                <TableCell>{{ valor.regiao.nome }}</TableCell>
                <TableCell>{{ valor.valor }}</TableCell>
              </TableRow>
            </template>
          </Table>
        </template>
      </template>
    </template>

    <template #action>
      <div class="flex justify-end">
        <button
          @click="openTabelaDialog = false"
          class="bg-red-500 py-2 px-4 text-white font-bold rounded hover:bg-red-800 focus:bg-red-800"
        >
          Fechar
        </button>
      </div>
    </template>
  </Dialog>

  <Dialog :open="openFichaDialog" class="w-[600px]">
    <template #title
      ><h2 class="text-3xl font-bold text-primary-800">
        Ficha do Indicador -
        <span class="text-xl text-primary-600 m-auto">{{
          indicador?.data?.nome
        }}</span>
      </h2></template
    >

    <template #content>
      <div
        class="grid grid-cols-[max-content_1fr] rounded divide-primary-300 overflow-auto mx-4 my-2"
      >
        <div
          class="bg-primary-100 px-4 flex justify-end py-2 text-primary-900 font-bold"
        >
          Projeto:
        </div>
        <div class="py-2 px-4">
          {{ indicador?.data?.projeto }}
        </div>

        <div
          class="bg-primary-100 px-4 flex justify-end py-2 text-primary-900 font-bold"
        >
          Departamento:
        </div>
        <div class="py-2 px-4">
          {{ indicador?.data?.departamento.nome }}({{
            indicador?.data?.departamento.sigla
          }})
        </div>

        <div
          class="bg-primary-100 px-4 flex justify-end py-2 text-primary-900 font-bold"
        >
          Periodicidade:
        </div>
        <div class="py-2 px-4">
          {{ indicador?.data?.periodicidade }}
        </div>

        <div
          class="bg-primary-100 px-4 py-2 flex justify-end text-primary-900 font-bold"
        >
          Nota Tecnica:
        </div>
        <div class="py-2 px-4">{{ indicador?.data?.nota_tecnica }}</div>

        <div
          class="bg-primary-100 px-4 py-2 flex justify-end text-primary-900 font-bold"
        >
          Observacao:
        </div>
        <div class="py-2 px-4">{{ indicador?.data?.observacao }}</div>

        <div
          class="bg-primary-100 px-4 py-2 flex justify-end text-primary-900 font-bold"
        >
          Fonte de Dados:
        </div>
        <div class="py-2 px-4">
          {{ indicador?.data?.fonte?.nome }} -
          {{ indicador?.data?.fonte?.descricao.split("-")[1] }}
        </div>
      </div>
    </template>

    <template #action>
      <div class="flex justify-end">
        <button
          @click="openFichaDialog = false"
          class="bg-red-500 py-2 px-4 text-white font-bold rounded hover:bg-red-800 focus:bg-red-800"
        >
          Fechar
        </button>
      </div>
    </template>
  </Dialog>
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
</style>
