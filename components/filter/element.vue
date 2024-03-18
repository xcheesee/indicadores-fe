<script setup>
const filterIcon = ref(null);
const searchIcon = ref(null);
function animateEnterFilter(e) {
  const container = e.currentTarget;
  const filter = container.children[1];
  const search = container.children[2];
  if (container.classList.contains("activ")) return;
  filter.style.opacity = 0;
  search.style.opacity = 1;
  container.style.width = "500px";
  container.style.cursor = "auto";
  container.classList.add("activ");
}

function animateLeaveFilter(e) {
  const container = e.currentTarget;
  const filter = container.children[1];
  const search = container.children[2];
  if (!container.classList.contains("activ")) return;
  filter.style.opacity = 1;
  search.style.opacity = 0;
  container.style.width = "48px";
  container.style.cursor = "pointer";
  container.classList.remove("activ");
}

onMounted(() => {
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
  <div
    class="relative ml-auto h-12 w-12 overflow-hidden rounded-full bg-white shadow transition-width"
    id="filter-container"
  >
    <div
      class="flex h-full w-[500px] items-center justify-end gap-4 px-4"
      id="input-wrapper"
    >
      <FilterSelect
        placeholder="Regiao"
        name="regiao"
        class="bg-secondary-50 w-48 rounded-lg"
      />

      <FilterSelect
        placeholder="Periodo"
        name="periodo"
        class="bg-secondary-50 w-48 rounded-lg"
      />
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
</template>

<style scoped>
#input-wrapper,
#filter-container {
  direction: rtl;
}
</style>
