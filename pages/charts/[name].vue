<script setup>
import { useQuery } from "@tanstack/vue-query";
import TableHeader from "~/components/table/TableHeader.vue";

definePageMeta({
  layout: "charts",
  pageTransition: false,
});

const openDialog = ref(false);

const { data: regioes, isPending: loadingRegioes } = useQuery({
  queryKey: ["regioes"],
  queryFn: () => fetcher("/tipo_regioes"),
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
        {{ $route.params.name }}
      </h1>

      <TooltipWrapper>
        <InputIconBtn
          color="primary"
          @click="
            (e) => {
              e.currentTarget.blur();
              openDialog = true;
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
              e.currentTarget.blur();
              openDialog = true;
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
    <div class="grid h-full w-full grid-cols-12 gap-8 px-4 py-4">
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
  <Dialog :open="openDialog" class="w-[600px]">
    <template #title
      ><h2 class="text-3xl font-bold text-primary-800">
        Tabela de Dados
      </h2></template
    >
    <template #content>
      <Table class="">
        <template #head>
          <TableRow>
            <TableHeader>Periodo</TableHeader>
            <TableHeader>Regiao</TableHeader>
            <TableHeader>Valor</TableHeader>
          </TableRow>
        </template>
        <template #body>
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
          </TableRow>
          <TableRow>
            <TableCell>2020</TableCell>
            <TableCell>Helipa</TableCell>
            <TableCell>2</TableCell>
          </TableRow>
        </template>
      </Table>
    </template>
    <template #action>
      <div class="flex justify-end">
        <button
          @click="openDialog = false"
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
