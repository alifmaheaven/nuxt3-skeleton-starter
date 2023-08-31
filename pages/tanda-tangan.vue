<template>
  <div>
    <h1 class="text-2xl font-bold">Testing</h1>
    <GlobalChartBar :chart_data="chart_data" chart_colors="#1A1A1A" chart_id="example-chart" chart_width="100%" chart_height="300px" />
  </div>
</template>

<script setup>
definePageMeta({
  layout: "autenticated",
});

const data_chart = [
  { property: "Laptop", count: 30 },
  { property: "Printer", count: 41 },
  { property: "Speaker", count: 30 },
  { property: "Projector", count: 30 },
  { property: "Monitor", count: 49 },
  { property: "Tablet", count: 40 },
];

const chart_data = computed(() => {
  return data_chart.map(({property, count}) => {
    return {
      name: property, // Change property to name "@/component/global/chart/bar line 39"
      total: count // Change count to total "@/component/global/chart/bar line 54"
    }
  })
})
</script>

<style lang="scss" scoped>

</style>