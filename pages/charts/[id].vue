<script setup>
import { useQuery } from "@tanstack/vue-query";
import TableHeader from "~/components/table/TableHeader.vue";

definePageMeta({
  layout: "charts",
  pageTransition: false,
});

const route = useRoute();
//const openDialog = ref(false);
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

const variavelId = computed(() => variavel?.value?.data[0]?.variavel?.id);

const variavelEnabled = computed(
  () => !!variavel?.value?.data[0]?.variavel?.id,
);

const { data: valores, isPending: loadingValores } = useQuery({
  queryKey: ["valores", variavelId],
  queryFn: () => fetcher(`/variavel/${variavelId.value}/valores`),
  enabled: variavelEnabled,
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
              if (!variavel || loadingValores) {
                return;
              }
              openTabelaDialog = true;
            }
          "
        >
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
            class="cursor-pointer text-primary-600"
          />
        </InputIconBtn>

        <TooltipText
          ><p class="whitespace-nowrap text-sm font-medium">
            Ficha do Indicador
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
      <div v-if="loadingValores || loadingVariaveis">Carregando</div>
      <template v-else>
        <div>
          <!--<span class="text-neutral-400">Variavel:</span>-->
          <span class="font-bold text-primary-600 text-xl">{{
            variavel?.data[0]?.variavel?.nome
          }}</span>
        </div>
        <Table class="">
          <template #head>
            <TableRow>
              <TableHeader>Periodo</TableHeader>
              <TableHeader>Regiao</TableHeader>
              <TableHeader>Valor</TableHeader>
            </TableRow>
          </template>
          <template #body>
            <TableRow v-for="valor in valores.data">
              <TableCell>{{ valor.periodo }}</TableCell>
              <TableCell>{{ valor.regiao.nome }}</TableCell>
              <TableCell>{{ valor.valor }}</TableCell>
            </TableRow>
            <!--<TableRow>
            <TableCell>2020</TableCell>
            <TableCell>Helipa</TableCell>
            <TableCell>2</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>2020</TableCell>
            <TableCell>Helipa</TableCell>
            <TableCell>2</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>2020</TableCell>
            <TableCell>Helipa</TableCell>
            <TableCell>2</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>2020</TableCell>
            <TableCell>Helipa</TableCell>
            <TableCell>2</TableCell>
          </TableRow>-->
          </template>
        </Table>
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
          class="bg-primary-100 px-4 flex justify-end py-2 text-primary-900 font-bold px-2"
        >
          Projeto:
        </div>
        <div class="py-2 px-4">
          {{ indicador?.data?.projeto }}
        </div>

        <div
          class="bg-primary-100 px-4 flex justify-end py-2 text-primary-900 font-bold px-2"
        >
          Departamento:
        </div>
        <div class="py-2 px-4">
          {{ indicador?.data?.departamento.nome }}({{
            indicador?.data?.departamento.sigla
          }})
        </div>

        <div
          class="bg-primary-100 px-4 flex justify-end py-2 text-primary-900 font-bold px-2"
        >
          Periodicidade:
        </div>
        <div class="py-2 px-4">
          {{ indicador?.data?.periodicidade }}
        </div>

        <div
          class="bg-primary-100 px-4 py-2 flex justify-end text-primary-900 font-bold px-2"
        >
          Nota Tecnica:
        </div>
        <div class="py-2 px-4">{{ indicador?.data?.nota_tecnica }}</div>

        <div
          class="bg-primary-100 px-4 py-2 flex justify-end text-primary-900 font-bold px-2"
        >
          Observacao:
        </div>
        <div class="py-2 px-4">{{ indicador?.data?.observacao }}</div>

        <div
          class="bg-primary-100 px-4 py-2 flex justify-end text-primary-900 font-bold px-2"
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
