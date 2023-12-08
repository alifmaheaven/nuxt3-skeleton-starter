<script setup>
// layout
definePageMeta({
  layout: "autenticated",
  // middleware: ["auth"],
  breadcrumb: computed(
    () =>
      `${
        (useRoute().params.RISKCD == "-" && "Add") || "Edit"
      } Risk: General Information`,
  ),
});

// import

// define

// data
const header = ref({
  no: "No",
  name: "Nama Dokumen",
  date: "Waktu Unggah",
  status: "Status",
  action: "Aksi",
});

const rows = ref([
  {
    no: 1,
    name: "kacong",
    date: "05 Agustus 2023",
    status: "Selesai",
  },
  {
    no: 1,
    name: "kacong",
    date: "05 Agustus 2023",
    status: "Selesai",
  },
  {
    no: 1,
    name: "kacong",
    date: "05 Agustus 2023",
    status: "Selesai",
  },
  {
    no: 1,
    name: "kacong",
    date: "05 Agustus 2023",
    status: "Selesai",
  },
  {
    no: 1,
    name: "kacong",
    date: "05 Agustus 2023",
    status: "Selesai",
  },
  {
    no: 1,
    name: "kacong",
    date: "05 Agustus 2023",
    status: "Selesai",
  },
  {
    no: 1,
    name: "kacong",
    date: "05 Agustus 2023",
    status: "Selesai",
  },
  {
    no: 1,
    name: "kacong",
    date: "05 Agustus 2023",
    status: "Selesai",
  },
  {
    no: 1,
    name: "kacong",
    date: "05 Agustus 2023",
    status: "Selesai",
  },
  {
    no: 1,
    name: "kacong",
    date: "05 Agustus 2023",
    status: "Selesai",
  },
]);

const pagination = reactive({
  count: 100,
  current_page: 1,
  links: {},
  per_page: 10,
  total: 5,
  total_pages: 10,
});

// methods
const getData = () => {
  // $api.get("/api/v1/test").then((response) => {
  //   console.log(response);
  // });
  // authStore.setUserData();
};
</script>

<template>
  <div>
    <div
      class="h-min-max mb-4 inline-flex w-full flex-col items-start justify-start gap-1"
    >
      <div class="w-full rounded-lg bg-red-600 p-4 text-white">
        {{ formatIndoDateWithClockV2("2023-11-16 11:31:55") }}
      </div>
      <div
        class="leading-full self-stretch text-3xl font-semibold text-gray-900"
      >
        Selamat datang, Fauzan!
      </div>
      <div
        class="self-stretch text-base font-normal leading-normal text-slate-600"
      >
        Berikut ringkasan informasi terakhir tentang aktivitas tanda tangan Anda
      </div>
    </div>
    <GlobalInputTiptapeditor />
    <div class="flex flex-row">
      <div class="basis-1/2 p-1">
        <div
          class="inline-flex h-full w-full items-center justify-center gap-6"
        >
          <div
            class="inline-flex shrink grow basis-0 flex-col items-start justify-center self-stretch rounded-xl border border-gray-200 bg-white shadow"
          >
            <div
              class="flex shrink grow basis-0 flex-col items-end justify-center gap-8 self-stretch p-6"
            >
              <div
                class="flex shrink grow basis-0 flex-col items-end justify-center gap-4 self-stretch"
              >
                <div
                  class="flex h-[52px] flex-col items-start justify-start gap-5 self-stretch"
                >
                  <div
                    class="inline-flex items-start justify-start gap-4 self-stretch"
                  >
                    <div
                      class="inline-flex shrink grow basis-0 flex-col items-start justify-center gap-1 self-stretch"
                    >
                      <div
                        class="self-stretch text-lg font-semibold leading-7 text-gray-900"
                      >
                        Unggah dokumen
                      </div>
                      <div
                        class="self-stretch text-sm font-normal leading-tight text-slate-600"
                      >
                        Unggah satu atau lebih dokumen untuk ditandatangani.
                      </div>
                    </div>
                  </div>
                </div>
                <GlobalInputFileupload name="upload" />
              </div>
              <!-- <button
                class="self-stretch px-5 py-3 bg-gray-600 rounded-lg shadow border border-gray-600 justify-center items-center gap-2 inline-flex"
              >
                <div class="text-white text-base font-semibold leading-normal">
                  Unggah
                </div>
                <Icon name="ph:cloud-arrow-up-duotone" class="w-5 h-5 relative text-white"/>
              </button> -->
            </div>
          </div>
        </div>
      </div>
      <div class="basis-1/2 p-1">
        <div
          class="inline-flex h-full w-full items-start justify-start gap-6 rounded-lg"
        >
          <div
            class="flex h-full shrink grow basis-0 items-center justify-start gap-6"
          >
            <div
              class="inline-flex shrink grow basis-0 flex-col items-start justify-start rounded-xl border border-gray-200 bg-white shadow"
            >
              <div
                class="flex h-full flex-col items-start justify-start gap-5 self-stretch p-6"
              >
                <div
                  class="flex h-7 flex-col items-start justify-start gap-5 self-stretch"
                >
                  <div
                    class="inline-flex items-start justify-start gap-4 self-stretch"
                  >
                    <div
                      class="inline-flex shrink grow basis-0 flex-col items-start justify-center gap-1 self-stretch"
                    >
                      <div
                        class="self-stretch text-lg font-semibold leading-7 text-gray-900"
                      >
                        Log penandatanganan
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  class="flex h-full flex-col items-center justify-center gap-2 self-stretch rounded-lg bg-white"
                >
                  <template v-for="data in 4">
                    <div
                      class="inline-flex items-center justify-center self-stretch bg-white"
                    >
                      <div class="flex flex-row border-b">
                        <div
                          class="flex basis-2/12 items-center justify-center p-3"
                        >
                          <Icon
                            name="mdi:file-document-outline"
                            class="relative h-10 w-10"
                          ></Icon>
                        </div>
                        <div
                          class="flex basis-6/12 items-center justify-center p-3"
                        >
                          <span>Panduang_Penggunaan_Signature.pdf</span>
                        </div>
                        <div
                          class="flex basis-2/12 items-center justify-center p-3"
                        >
                          <div
                            class="flex items-center justify-start rounded-2xl border border-emerald-200 bg-emerald-50 px-2 py-0.5"
                          >
                            <div
                              class="text-center text-xs font-medium leading-[18px] text-emerald-700"
                            >
                              Selesai
                            </div>
                          </div>
                        </div>
                        <div
                          class="flex basis-2/12 items-center justify-center p-3"
                        >
                          <Icon
                            name="material-symbols:edit"
                            class="relative h-5 w-5"
                          />
                        </div>
                      </div>
                    </div>
                  </template>
                  <div
                    class="flex h-5 flex-col items-center justify-start gap-5 self-stretch"
                  >
                    <div
                      class="inline-flex items-center justify-end gap-5 self-stretch"
                    >
                      <div class="flex items-center justify-center gap-2">
                        <div
                          class="text-sm font-semibold leading-tight text-gray-700"
                        >
                          Lebih lengkap
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="flex flex-row">
      <div class="basis-12/12 w-full p-1">
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
          <template #header-no="{}">
            <span>
              <div class="form-check">
                <label class="form-check-label">
                  <input
                    id=""
                    type="checkbox"
                    class="form-check-input"
                    name=""
                    value="checkedValue"
                    checked
                  />
                </label>
              </div>
            </span>
          </template>
        </globalTableCustom>
        <globalPaginationCustom
          :total-page="pagination.total_pages"
          :current-page="pagination.current_page"
          :per-page="pagination.per_page"
          @change="getData"
          @update:per-page="(value) => (pagination.per_page = value)"
          @update:current-page="(value) => (pagination.current_page = value)"
        >
        </globalPaginationCustom>
      </div>
    </div>
    <!-- <AppAlert>
      This is an auto-imported component
    </AppAlert> -->
  </div>
</template>
