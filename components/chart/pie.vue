<script setup>
import { use } from "echarts/core";
import { CanvasRenderer } from "echarts/renderers";
import { PieChart } from "echarts/charts";
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  DatasetComponent,
} from "echarts/components";
import VChart, { THEME_KEY } from "vue-echarts";

use([
  CanvasRenderer,
  PieChart,
  DatasetComponent,
  TitleComponent,
  TooltipComponent,
  LegendComponent,
]);

provide(THEME_KEY, "light");

const option = ref({
  title: {
    text: "Traffic Sources",
    left: "center",
  },
  tooltip: {
    trigger: "item",
    //formatter: "{a} <br/>{c} ({d}%)",
  },
  legend: {
    orient: "vertical",
    left: "left",
    data: ["Direct", "Email", "Ad Networks", "Video Ads", "Search Engines"],
  },
  dataset: {
    source: [
      ["Direct", 335],
      ["Email", 310],
      ["Ad Networks", 234],
      ["Video Ads", 135],
      ["Search Engines", 1548],
    ],
  },
  series: [
    {
      name: "Traffic Sources",
      type: "pie",
      //radius: "55%",
      //center: ["50%", "60%"],
      //emphasis: {
      //  itemStyle: {
      //    shadowBlur: 10,
      //    shadowOffsetX: 0,
      //    shadowColor: "rgba(0, 0, 0, 0.5)",
      //  },
      //},
      tooltip: {
        valueFormatter: (val) => val + " mi",
      },
    },
  ],
});
</script>
<template>
  <v-chart class="h-full w-full" :option="option" autoresize />
</template>
