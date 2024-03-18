<script setup></script>

<template>
  <ClientOnly>
    <div>
      <header id="header" class="relative grid w-full items-center">
        <NuxtLink
          to="/"
          class="mt-8 flex h-32 justify-center transition-all duration-300"
          id="header-img-container"
        >
          <img
            src="@/assets/images/geo5.png"
            alt=""
            class="h-full object-contain hover:cursor-pointer"
          />
        </NuxtLink>
      </header>

      <nav class="grid h-[600px] content-center justify-center">
        <Transition name="expand" appear>
          <DashboardSearch />
        </Transition>
      </nav>

      <transition appear>
        <main class="mx-auto grid w-[60%] grid-cols-12 gap-3 pb-8">
          <div class="col-span-12 grid grid-cols-subgrid">
            <div class="col-span-4 flex flex-col gap-1">
              <label for="projeto" class="text-xl font-bold text-primary-800"
                >Projeto</label
              >
              <InputSelect
                name="projeto"
                id="projeto"
                class="h-8 w-full rounded bg-primary-100 px-2"
                tabindex="100"
                placeholder="Selecione um Projeto"
              >
                <InputSelectValue value="2">Todos</InputSelectValue>
                <InputSelectValue value="1">Biosampa</InputSelectValue>
              </InputSelect>
            </div>
          </div>

          <PainelBtn texto="Agua" class="col-span-3">
            <template #icone>
              <Icon name="ion:water" size="64" />
            </template>
          </PainelBtn>

          <PainelBtn texto="Ar" class="col-span-3">
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

          <PainelBtn
            texto="Licenciamento Ambiental de NDTIC"
            class="col-span-12"
          >
            <template #icone>
              <Icon name="ph:certificate" size="64" />
            </template>
          </PainelBtn>
        </main>
      </transition>
    </div>
  </ClientOnly>
</template>

<style scoped>
.v-enter-from {
  opacity: 0;
}

.v-enter-active {
  transition: opacity 500ms cubic-bezier(0.2, 0, 0.4, 1);
}

.expand-enter-active {
  transition-property: width;
  transition-duration: 500ms;
  transition-timing-function: cubic-bezier(0.2, 0, 0.4, 1);
}

.expand-enter-from {
  width: 0 !important;
  border: 0px solid #199a66;
}
</style>
