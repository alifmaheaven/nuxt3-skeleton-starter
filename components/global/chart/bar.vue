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
    default: "bar-chart",
  },
  chart_width: {
    type: String,
  },
  chart_height: {
    type: String,
  },
});

var chart_options = computed(() => {
  return {
    chart: {
      id: props.chart_id,
      type: "bar",
    },
    xaxis: {
      categories: props.chart_data.map((value) => value.name),
    },
    plotOptions: {
      bar: {
        borderRadius: 10,
      },
    },
    colors: props.chart_colors,
    noData: {
      text: "Loading...", // Show the text where there is no data
    },
    responsive: [
      // Change the width or height of the chart when max width is true
      {
        breakpoint: 1024, // @media max-width: 1024px (style for the tablet)
        options: {
          chart: {
            width: "475px",
          },
        },
      },
      {
        breakpoint: 768, // @media max-width: 768px (style for the hp)
        options: {
          chart: {
            width: "300px",
          },
        },
      },
    ],
  };
});

const chart_series = computed(() => {
  return [
    {
      name: "Total",
      data: props.chart_data.map((value) => value.total),
    },
  ];
});
</script>
