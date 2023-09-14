<template>
  <!-- how to use 
    make header variable & pasing into properties like

    const header = ref({
        no: "No",
        name: "Nama panjang",
        umur: "Umur sebenarnya",
    });

    const rows = ref([
    {
      no: 1,
      name:"kacong",
      umur: 12
    }
    
    
    ]);
    <template>
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
    </template>


    want add detail on clicked
    add detail_action to column slot & add detail_row_table slot
    theres example : 

    add click function theres example :
    <template #whatefer="{ row, index, detail_action }">
      <span @click="detail_action">
        {{ row?.relation_unit?.unit?.name }}
      </span>
    </template>

    <template #detail_row_table="{row}">
        <h1>heyy</h1>
      </template>
  -->
  <div class="w-full overflow-x-auto">
    <table class="table-bordered table-mobile table min-w-full border">
      <thead
        class="h-11 border border-gray-200 bg-slate-50 px-6 py-3 text-slate-500"
      >
        <tr>
          <th
            v-for="(header, index) in Object.keys(headerNames)"
            :key="index"
            class="whitespace-nowrap"
          >
            <!-- Use a slot for each header name -->
            <slot :name="`header-${header}`">{{ headerNames[header] }}</slot>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(row, index) in rows"
          :key="index"
          class="h-[72px] border border-gray-200 px-6 py-3 text-slate-700"
        >
          <template v-if="!!!isLoading">
            <td
              v-if="index_show_detail == index"
              :colspan="Object.keys(headerNames).length"
              :class="{
                'cursor-pointer hover:bg-slate-100': !!$slots.detail_row_table,
              }"
              @click="
                !!$slots.detail_row_table &&
                  (index_show_detail =
                    index_show_detail === index ? null : index)
              "
            >
              <slot name="detail_row_table" :row="row" :index="index"> </slot>
            </td>
            <td
              v-for="(header, index2) in Object.keys(headerNames)"
              v-else
              :key="index2"
              :data-label="headerNames[header]"
            >
              <!-- Use a slot for each column -->
              <slot
                :name="header"
                :row="row"
                :index="index"
                :detail_action="
                  () => {
                    !!$slots.detail_row_table &&
                      (index_show_detail =
                        index_show_detail === index ? null : index);
                  }
                "
              >
                {{ row[header] }}
              </slot>
            </td>
          </template>
        </tr>
        <tr>
          <td v-if="!!isLoading" :colspan="Object.keys(headerNames).length">
            <div class="flex items-center justify-center">
              <span v-if="!!isLoading">Loading</span>
              <!-- <LoadingIcon
                v-if="!!isLoading"
                icon="spinning-circles"
                class="w-4 h-4 ml-2"
              /> -->
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { computed, ref, watch } from "vue";
import { useAuth } from "@/stores/auth";
const authStore = useAuth();

const props = defineProps({
  headerNames: {
    type: Object,
    default: () => [],
  },
  rows: {
    type: Array,
    default: () => [],
  },
});

const isLoading = computed(() => authStore.isLoading);

const index_show_detail = ref(null);

watch(isLoading, (newVal) => {
  if (newVal) {
    index_show_detail.value = null;
  }
});
</script>

<style lang="scss" scoped>
@media (max-width: 767px) {
  .table-mobile {
    display: table;
    width: 100%;
    max-width: 100%;
  }

  .table-mobile thead {
    display: none;
  }

  .table-mobile tbody {
    display: block;
    width: 100%;
  }

  .table-mobile tr {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    border-bottom: 1px solid #ddd;
    margin-bottom: 1rem;
  }

  .table-mobile td {
    display: flex;
    flex-direction: column;
    padding: 0.5rem;
    width: 100%;
  }

  .table-mobile td:before {
    font-weight: bold;
    margin-bottom: 0.5rem;
  }

  .table-mobile td:before {
    content: attr(data-label);
    margin-right: 1rem;
  }
}
</style>
