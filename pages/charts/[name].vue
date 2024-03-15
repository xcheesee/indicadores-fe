<script setup>
definePageMeta({
  layout: "charts",
});

onMounted(() => {
  window.scrollTo(0, 0);
});
</script>
<template>
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

.fadein-enter-from {
  opacity: 0;
}

.fadein-enter-active {
  transition: opacity 500ms cubic-bezier(0.2, 0, 0.4, 1);
}
</style>
