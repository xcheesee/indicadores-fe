<script setup>
const props = defineProps({
  regioes: String,
});

const regiaoModel = ref("");
const periodoModel = ref("");

const filterIcon = ref(null);
const searchIcon = ref(null);
function animateEnterFilter(e) {
  const filter = filterIcon.value;
  const search = searchIcon.value;
  if (e.currentTarget.classList.contains("activ")) return;
  filter.style.opacity = 0;
  search.style.opacity = 1;
  e.currentTarget.style.width = "500px";
  e.currentTarget.style.cursor = "auto";
  e.currentTarget.classList.add("activ");
}

function animateLeaveFilter(e) {
  const filter = e.currentTarget.children[1];
  const search = e.currentTarget.children[2];
  if (!e.currentTarget.classList.contains("activ")) return;
  filter.style.opacity = 1;
  search.style.opacity = 0;
  e.currentTarget.style.width = "48px";
  e.currentTarget.style.cursor = "pointer";
  e.currentTarget.classList.remove("activ");
}

onMounted(async () => {
  //3 nextTicks para avancar o eventloop de forma que seja possivel acessar elementos do DOM
  await nextTick();
  await nextTick();
  await nextTick();

  const container = document.getElementById("filter-container");
  container.style.cursor = "pointer";
  ["click", "focusin"].forEach((event) => {
    container.addEventListener(event, animateEnterFilter);
  });

  container.addEventListener("focusout", animateLeaveFilter);

  clickAwayStore.instance.register(container, () => {
    if (!container.classList.contains("activ")) return;
    filterIcon.value.style.opacity = 1;
    searchIcon.value.style.opacity = 0;
    container.style.width = "48px";
    container.style.cursor = "pointer";
    container.classList.remove("activ");
  });
});

onBeforeUnmount(() => {
  const container = document.getElementById("filter-container");

  ["click", "focusin"].forEach((event) => {
    container.removeEventListener(event, animateEnterFilter);
  });

  container.removeEventListener("focusout", animateLeaveFilter);
});
</script>
<template>
  <ClientOnly>
    <FadeinTransition>
      <div
        class="relative ml-auto h-12 w-12 overflow-hidden rounded-full bg-white shadow transition-width"
        id="filter-container"
        ref="container"
      >
        <div
          class="flex h-full w-[500px] items-center justify-end gap-4 px-4"
          id="input-wrapper"
        >
          <FilterSelect
            label="Regiao"
            name="regiao"
            class="bg-secondary-50 w-48 rounded-lg"
            v-model="regiaoModel"
          >
            <option value="">Todas</option>
            <template v-for="regiao in regioes">
              <option :value="regiao.id">{{ regiao.nome }}</option>
            </template>
          </FilterSelect>

          <FilterSelect
            name="periodo"
            class="bg-secondary-50 w-48 rounded-lg"
            label="Periodo"
            v-model="periodoModel"
          >
            <InputSelectValue value="">Todos</InputSelectValue>
            <InputSelectValue value="1">Periodo 1</InputSelectValue>
          </FilterSelect>
        </div>

        <div
          class="absolute right-0 top-1/2 -translate-x-1/4 -translate-y-1/2 transition-opacity"
          ref="filterIcon"
        >
          <Icon name="mdi:filter" size="32" />
        </div>

        <div
          class="absolute right-0 top-1/2 -translate-x-1/4 -translate-y-1/2 opacity-0 transition-opacity"
          ref="searchIcon"
        >
          <Icon name="mdi:search" size="32" />
        </div>
      </div>
    </FadeinTransition>
  </ClientOnly>
</template>

<style scoped>
#input-wrapper,
#filter-container {
  direction: rtl;
}
</style>
