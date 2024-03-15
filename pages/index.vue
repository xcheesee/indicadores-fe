<script setup>
import MenuBtn from "@/components/MenuBtn.vue";
</script>

<template>
  <header class="relative">
    <div class="flex h-40 items-center justify-center pt-8">
      <div class="z-50 flex h-full w-full justify-center">
        <img src="@/assets/images/geo5.png" alt="" class="object-fit" />
      </div>
    </div>
  </header>

  <main
    class="mx-auto grid h-full w-[1440px] flex-1 grid-cols-4 place-content-center items-center gap-4 transition-opacity duration-500"
  >
    <MenuBtn texto="Painel" rota="/dashboard">
      <template #icone>
        <Icon name="charm:layout-stack-v" size="64" />
      </template>
    </MenuBtn>

    <MenuBtn texto="Metadados">
      <template #icone>
        <Icon name="carbon:ibm-cloud-bare-metal-server" size="64" />
      </template>
    </MenuBtn>

    <MenuBtn texto="GIS Desktop">
      <template #icone>
        <Icon name="streamline:web" size="64" />
      </template>
    </MenuBtn>

    <MenuBtn texto="WebMap">
      <template #icone>
        <Icon name="gis:poi-map" size="64" />
      </template>
    </MenuBtn>
  </main>
</template>
