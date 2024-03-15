<script setup>
import {
  ChartCardElement,
  PieChart,
  BarChart,
  LineChart,
} from "@/components/charts";
import { onMounted } from "vue";

definePageMeta({
  layout: "charts",
});

onMounted(() => {
  window.scrollTo(0, 0);
});
</script>
<template>
  <ChartCardElement
    class="col-span-12 2xl:col-span-6"
    :fadein="$route.query.fromDash === 'true'"
    ><PieChart
  /></ChartCardElement>

  <ChartCardElement
    class="col-span-12 2xl:col-span-6"
    :fadein="$route.query.fromDash === 'true'"
    ><LineChart
  /></ChartCardElement>

  <ChartCardElement
    class="col-span-12"
    :fadein="$route.query.fromDash === 'true'"
    ><BarChart
  /></ChartCardElement>

  <ChartCardElement
    class="col-span-12"
    :fadein="$route.query.fromDash === 'true'"
    ><BarChart
  /></ChartCardElement>

  <ChartCardElement
    class="col-span-12"
    :fadein="$route.query.fromDash === 'true'"
    ><BarChart
  /></ChartCardElement>
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
