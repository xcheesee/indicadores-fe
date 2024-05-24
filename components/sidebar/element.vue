<script setup>
import { useQuery } from "@tanstack/vue-query";

const route = useRoute();
</script>
<template>
  <ClientOnly>
    <Transition :appear="route?.query?.fromDash !== 'false'">
      <aside
        class="fixed z-10 h-screen w-[60px] overflow-x-hidden bg-white py-4 shadow-lg transition-width duration-500 focus-within:w-[300px] hover:w-[300px]"
        id="sidebar-container"
      >
        <div class="flex h-full w-[300px] flex-col gap-8" id="sidebar">
          <NuxtLink to="/dashboard" class="flex px-4 pb-16 pt-4" tabindex="-1">
            <div class="h-11">
              <img
                src="@/assets/images/geo.png"
                class="h-full w-full cursor-pointer object-fill transition-transform duration-300 ease-in-out hover:scale-110"
              />
            </div>
          </NuxtLink>

          <SidebarSearch />
          <slot />

          <div class="mt-auto flex items-center gap-4 pl-4">
            <div class="w-[34px]">
              <img src="@/assets/icons/logo_ndtic.png" class="" />
            </div>
            <p class="">NDTIC(ndtic)</p>
          </div>
        </div>
      </aside>
    </Transition>
  </ClientOnly>
</template>

<style scoped>
.v-enter-active {
  transition: width 500ms cubic-bezier(0.2, 0, 0.4, 1);
}

.v-enter-from {
  width: 0 !important;
}
</style>
