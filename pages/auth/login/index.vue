<script setup>
// layout
definePageMeta({
  layout: "autenticated",
  middleware: [
    function (to, from) {
      // Custom inline middleware
    },
    "auth",
  ],
});

// import
const { $api } = useNuxtApp();
import { ref, computed } from "vue";
import { useLayout } from "@/stores/layout";
import { useAuth } from "@/stores/auth";
import { useForm } from "vee-validate";
import * as yup from "yup";
// define
const layoutStore = useLayout();
const layout = computed(() => layoutStore.layout);

const authStore = useAuth();
const auth = computed(() => authStore.auth);

const validationSchema = yup.object({
  username: yup.string().required().label("Username"),
  date: yup.string().required().label("Date"),
});
const { handleSubmit, resetForm, setValues } = useForm({
  initialValues: {
    username: "",
    date: "",
  },
  validationSchema: validationSchema,
});

// data
const header = ref({
  no: "No",
  name: "Nama panjang",
  umur: "Umur sebenarnya",
});

const rows = ref([
  {
    no: 1,
    name: "kacong",
    umur: 12,
  },
]);

const pagination = reactive({
  count: 5,
  current_page: 1,
  links: {},
  per_page: 10,
  total: 5,
  total_pages: 1,
});

const data_chart_bar = [
  { name: "Laptop", total: 30 },
  { name: "Printer", total: 41 },
  { name: "Speaker", total: 30 },
  { name: "Projector", total: 30 },
  { name: "Monitor", total: 49 },
  { name: "Tablet", total: 40 },
];

const data_chart_donut = [
  { name: "Idle", total: 198 },
  { name: "Pre-order", total: 22 }
];


// methods

const getData = () => {
  $api.get('/api/v1/test').then((response) => {
    console.log(response);
  });
  authStore.setUserData();
};
getData();

const submitCreateUpdate = handleSubmit(async (values, { resetForm }) => {
  console.log("ini valuenya", values);
});
</script>

<template>
  <div class="p-4">
    <nuxt-img
      src="logo.png"
    />
    <globalTableCustom :header-names="header" :rows="rows">
      <template #no="{ row, index }">
        <span>
          {{
            (parseInt(pagination.current_page) - 1) *
              parseInt(pagination.per_page) +
            parseInt(index) +
            1
          }}
        </span>
      </template>
      <template #month_duration="{ row, index }">
        <span>{{ Math.floor(row?.month_duration) }}</span>
      </template>
    </globalTableCustom>
    <globalPaginationCustom 
      :total-page="pagination.total_pages"
      :current-page="pagination.current_page"
      :per-page="pagination.per_page"
      @change="getData"
      @update:perPage="(value) => (pagination.per_page = value)"
      @update:currentPage="(value) => (pagination.current_page = value)"
    >
    </GlobalPaginationCustom>
    <div
      class="w-full max-w-sm rounded overflow-hidden shadow-lg mb-4 border border-red-500"
    >
      <img
        class="w-full"
        src="https://tailwindcss.com/img/card-top.jpg"
        alt="Sunset in the mountains"
      />
      <div class="px-6 py-4 pb-2">
        <div class="font-bold text-xl mb-2 text-primary bg-red">
          The Coldest Sunset
        </div>
        <p class="text-primary">hallooo</p>
        <p class="text-gray-700 text-base">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus
          quia, nulla! Maiores et perferendis eaque, exercitationem praesentium
          nihil.
        </p>
        <form @submit="submitCreateUpdate">
          <globalInputText
            name="username"
            label="Username"
            placeholder="Username"
          />
          <globalInputDatepicker name="date" label="Date" placeholder="Date" />
          <button class="btn btn-primary">Submit</button>
          <button>oopen modal 
            <Icon name="uil:github" color="black" />
          </button>
        </form>
      </div>
      <div class="px-6 py-4">
        <span class="badge mr-2">#photography</span>
        <span class="badge mr-2">#travel</span>
        <span class="badge">#winter</span>
      </div>
    </div>
    <GlobalChartBar chart_id="chart bar" :chart_data="data_chart_bar" :chart_colors="['#F63D68']" chart_width="300" chart_height="300" />
    <GlobalChartDonut chart_id="chart donut" :chart_data="data_chart_donut" :chart_colors="['#E31B53', '#FEA3B4']" chart_width="300" chart_height="300" />
  </div>
  <GlobalModalCustom/>
</template>

<style lang="postcss" scoped>
.badge {
  @apply inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700;
  &:hover {
    @apply bg-gray-300;
  }
}
</style>