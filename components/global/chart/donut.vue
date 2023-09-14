<template>
  <div>
    <ClientOnly>
      <apexchart
        :options="chart_options"
        :series="chart_series"
        :height="chart_height"
        :width="chart_width"
      />
    </ClientOnly>
  </div>
</template>

<script setup>
// apexcharts.com
import { ref, computed } from "vue";

const props = defineProps({
  chart_data: {
    type: Array,
  },
  chart_colors: {
    type: Array,
  },
  chart_id: {
    type: String,
    default: "donut-chart",
  },
  chart_width: {
    type: String,
  },
  chart_height: {
    type: String,
  },
});

const chart_options = computed(() => {
  return {
    chart: {
      id: props.chart_id,
      type: "donut",
    },
    plotOptions: {
      pie: {
        donut: {
          size: "50%",
        },
      },
    },
    labels: props.chart_data.map((value) => value.name),
    colors: props.chart_colors,
    legend: {
      show: false,
    },
  };
});

const chart_series = computed(() => {
  return props.chart_data.map((value) => value.total);
});
</script>
