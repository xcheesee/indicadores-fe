<script setup>
definePageMeta({
  layout: "charts",
});

onMounted(() => {
  window.scrollTo(0, 0);
});
</script>
<template>
  <ClientOnly>
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
</style>
