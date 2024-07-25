<script setup>
import { use } from "echarts/core";
import { BarChart } from "echarts/charts";
import { GridComponent, DatasetComponent } from "echarts/components";
import { CanvasRenderer } from "echarts/renderers";
import VChart from "vue-echarts";

use([GridComponent, DatasetComponent, BarChart, CanvasRenderer]);

const option = ref({
  legend: {},
  tooltip: {},
  dataset: {
    // Provide a set of data.
    dimensions: ["tipo", "comes", "bebes"],
    source: [
      ["Mon", 43.3, 50],
      ["Tue", 83.1, 60],
      ["Wed", 86.4, 50],
      ["Thr", 72.4, 80],
    ],
  },
  // Declare an x-axis (category axis).
  // The category map the first column in the dataset by default.
  xAxis: { type: "category" },
  // Declare a y-axis (value axis).
  yAxis: {},
  // Declare several 'bar' series,
  // every series will auto-map to each column by default.
  series: [
    {
      type: "line",
      //encode: {
      //  x: "R",
      //  y: "product",
      //},
    },
    {
      type: "bar",
    },
  ],
});
</script>
<template>
  <v-chart class="h-full w-full" :option="option" autoresize />
</template>
