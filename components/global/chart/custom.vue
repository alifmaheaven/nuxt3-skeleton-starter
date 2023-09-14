<template>
  <div>
    <ClientOnly>
      <apexchart
        :options="chart_options"
        :series="chart_series"
        type="bar"
        height="300"
        width="500"
      />
    </ClientOnly>
  </div>
</template>

<script setup>
// apexcharts.com

const data_chart = [
  { property: "Laptop", count: 30 },
  { property: "Printer", count: 41 },
  { property: "Speaker", count: 30 },
  { property: "Projector", count: 30 },
  { property: "Monitor", count: 49 },
  { property: "Tablet", count: 40 },
];

const chart_options = {
  chart: {
    id: "my-chart-example",
  },
  xaxis: {
    categories: data_chart.map((value) => value.property),
  },
  plotOptions: {
    bar: {
      borderRadius: 10,
    },
  },
  colors: ["#F63D68"],
};

const chart_series = ref([
  {
    name: "series1",
    data: data_chart.map((value) => value.count),
  },
]);
</script>
