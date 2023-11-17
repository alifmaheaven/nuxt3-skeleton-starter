<template>
  <div>
    <h1 class="text-2xl font-bold">Testing</h1>
    <!-- <GlobalChartBar :chart_data="chart_data" chart_colors="#1A1A1A" chart_id="example-chart" chart_width="100%" chart_height="300px" /> -->
    <GlobalInputManualcaptcha class="mt-10 w-40" />
    <div class="my-4 flex flex-row gap-4">
      <GlobalInputRadio
        :options="optionsByType"
        @update:value="(value) => {}"
      />
      <!-- Checkbox is not ready -->
      <GlobalInputCheckbox
        :options="optionsByCategory"
        placeholder="Choose category"
        name="Category"
        @update:value="(value) => {}"
      />
    </div>
    <Vue3Lottie
      animation-link="/animation/success.json"
      :height="300"
      :width="300"
    />
    <!-- :loop="false" for 1 time animation -->
    <!-- https://lottiefiles.com/ for the animation files -->
    <GlobalTableRounded :table_header="table_header" :table_body="table_body" />
  </div>
</template>

<script setup>
definePageMeta({
  layout: "autenticated",
});
import dataTable from "~/assets/fakeData/dataTable.json";

const data_chart = [
  { property: "Laptop", count: 30 },
  { property: "Printer", count: 41 },
  { property: "Speaker", count: 30 },
  { property: "Projector", count: 30 },
  { property: "Monitor", count: 49 },
  { property: "Tablet", count: 40 },
];
const optionsByType = ref(["By PO", "By Non PO"]);
const optionsByCategory = ref([
  "Electronic",
  "Furniture",
  "Office Supplies",
  "Reference Materials",
]);
const table_header = ref([
  "",
  "KODE GEDUNG",
  "ALAMAT",
  "KOTA",
  "LANTAI",
  "WING",
  "KODE RUANGAN",
  "AKSI",
]);
const table_body = computed(() => {
  return dataTable.map(
    ({ id, kode_gedung, alamat, kota, lantai, wing, kode_ruangan }) => {
      return {
        id: id,
        value1: kode_gedung,
        value2: alamat,
        value3: kota,
        value4: lantai,
        value5: wing,
        value6: kode_ruangan,
      };
    },
  );
});
const chart_data = computed(() => {
  return data_chart.map(({ property, count }) => {
    return {
      name: property, // Change property to name "@/component/global/chart/bar line 39"
      total: count, // Change count to total "@/component/global/chart/bar line 54"
    };
  });
});
</script>

<style lang="scss" scoped></style>
