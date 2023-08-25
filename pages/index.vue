<script setup>
// layout
definePageMeta({
  layout: "autenticated",
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
</script>


<template>
  <div>
    <div
      class="w-full h-min-max flex-col justify-start items-start gap-1 inline-flex mb-4"
    >
      <div
        class="self-stretch text-gray-900 text-3xl font-semibold leading-full"
      >
        Selamat datang, Fauzan!
      </div>
      <div
        class="self-stretch text-slate-600 text-base font-normal leading-normal"
      >
        Berikut ringkasan informasi terakhir tentang aktivitas tanda tangan Anda
      </div>
    </div>
    <div class="flex flex-row">
      <div class="basis-1/2 p-1">
        <div
          class="w-full h-full justify-center items-center gap-6 inline-flex"
        >
          <div
            class="grow shrink basis-0 self-stretch bg-white rounded-xl border border-gray-200 flex-col justify-center items-start inline-flex shadow"
          >
            <div
              class="self-stretch grow shrink basis-0 p-6 flex-col justify-center items-end gap-8 flex"
            >
              <div
                class="self-stretch grow shrink basis-0 flex-col justify-center items-end gap-4 flex"
              >
                <div
                  class="self-stretch h-[52px] flex-col justify-start items-start gap-5 flex"
                >
                  <div
                    class="self-stretch justify-start items-start gap-4 inline-flex"
                  >
                    <div
                      class="grow shrink basis-0 self-stretch flex-col justify-center items-start gap-1 inline-flex"
                    >
                      <div
                        class="self-stretch text-gray-900 text-lg font-semibold leading-7"
                      >
                        Unggah dokumen
                      </div>
                      <div
                        class="self-stretch text-slate-600 text-sm font-normal leading-tight"
                      >
                        Unggah satu atau lebih dokumen untuk ditandatangani.
                      </div>
                    </div>
                  </div>
                </div>
                <GlobalInputFileupload />
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
          class="w-full h-full justify-start items-start gap-6 inline-flex rounded-lg"
        >
          <div
            class="grow shrink basis-0 h-full justify-start items-center gap-6 flex"
          >
            <div
              class="grow shrink basis-0 bg-white rounded-xl border border-gray-200 flex-col justify-start items-start inline-flex shadow"
            >
              <div
                class="self-stretch h-full p-6 flex-col justify-start items-start gap-5 flex"
              >
                <div
                  class="self-stretch h-7 flex-col justify-start items-start gap-5 flex"
                >
                  <div
                    class="self-stretch justify-start items-start gap-4 inline-flex"
                  >
                    <div
                      class="grow shrink basis-0 self-stretch flex-col justify-center items-start gap-1 inline-flex"
                    >
                      <div
                        class="self-stretch text-gray-900 text-lg font-semibold leading-7"
                      >
                        Log penandatanganan
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  class="self-stretch h-full bg-white rounded-lg flex-col justify-center items-center gap-2 flex"
                >
                  <template v-for="data in 4">
                    <div
                      class="self-stretch bg-white justify-center items-center inline-flex"
                    >
                      <div class="flex flex-row border-b">
                        <div
                          class="basis-2/12 p-3 flex justify-center items-center"
                        >
                          <Icon
                            name="mdi:file-document-outline"
                            class="w-10 h-10 relative"
                          ></Icon>
                        </div>
                        <div
                          class="basis-6/12 p-3 flex justify-center items-center"
                        >
                          <span>Panduang_Penggunaan_Signature.pdf</span>
                        </div>
                        <div
                          class="basis-2/12 p-3 flex justify-center items-center"
                        >
                          <div
                            class="px-2 py-0.5 bg-emerald-50 rounded-2xl border border-emerald-200 justify-start items-center flex"
                          >
                            <div
                              class="text-center text-emerald-700 text-xs font-medium leading-[18px]"
                            >
                              Selesai
                            </div>
                          </div>
                        </div>
                        <div
                          class="basis-2/12 p-3 flex justify-center items-center"
                        >
                          <Icon
                            name="material-symbols:edit"
                            class="w-5 h-5 relative"
                          />
                        </div>
                      </div>
                    </div>
                  </template>
                  <div
                    class="self-stretch h-5 flex-col justify-start items-center gap-5 flex"
                  >
                    <div
                      class="self-stretch justify-end items-center gap-5 inline-flex"
                    >
                      <div class="justify-center items-center gap-2 flex">
                        <div
                          class="text-gray-700 text-sm font-semibold leading-tight"
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
      <div class="basis-12/12 p-1 w-full">
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
                  <input type="checkbox" class="form-check-input" name="" id="" value="checkedValue" checked>
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
          @update:perPage="(value) => (pagination.per_page = value)"
          @update:currentPage="(value) => (pagination.current_page = value)"
        >
        </GlobalPaginationCustom>
      </div>
    </div>
    <!-- <AppAlert>
      This is an auto-imported component
    </AppAlert> -->
  </div>
</template>