<template>
  <div class="flex w-full flex-col items-center">
    <table
      class="w-full table-auto border-separate border-spacing-0 text-gray-900"
    >
      <thead class="rounded-t-lg border-b border-gray-200 bg-white">
        <tr>
          <th
            v-for="(value_of_table_header, index) in table_header"
            :key="index"
            class="border-y border-r border-gray-200 p-4 text-sm font-semibold text-gray-500 first:rounded-tl-lg first:border-l last:rounded-tr-lg"
            :class="index == 6 ? '' : 'text-left'"
            scope="col"
          >
            {{ value_of_table_header }}
          </th>
        </tr>
      </thead>

      <tbody class="rounded-b-lg bg-white">
        <tr
          v-for="(value_of_table_body, index) in showing_item"
          :key="value_of_table_body.id"
          class="text-sm"
        >
          <td
            class="border-x border-b border-gray-200 p-4"
            :data-label="table_header[0]"
          >
            <div class="flex h-full w-full items-center justify-center">
              <input
                ref="checkbox"
                type="checkbox"
                class="h-5 w-5 rounded border border-gray-200 text-red-600 checked:border-red-600 checked:bg-red-600 hover:border-red-50 hover:bg-red-50 focus:border-red-600 focus:bg-red-600 focus:ring-0 active:border-red-600 active:bg-red-50"
              />
              <!-- :checked="pengaturan_store.bulk_delete_lokasi.includes(value_of_table_body.id)" -->
              <!-- @click="getIdBulkDelete({index,...value_of_table_body})" -->
            </div>
          </td>

          <td
            v-if="value_of_table_body.value1"
            class="border-b border-r border-gray-200 p-4 text-left"
            :data-label="table_header[1]"
          >
            {{ value_of_table_body.value1 }}
          </td>

          <td
            v-if="value_of_table_body.value2"
            class="border-b border-r border-gray-200 p-4 text-left"
            :data-label="table_header[2]"
          >
            {{ value_of_table_body.value2 }}
          </td>

          <td
            v-if="value_of_table_body.value3"
            class="border-b border-r border-gray-200 p-4 text-left"
            :data-label="table_header[3]"
          >
            {{ value_of_table_body.value3 }}
          </td>

          <td
            v-if="value_of_table_body.value4"
            class="border-b border-r border-gray-200 p-4 text-left"
            :data-label="table_header[4]"
          >
            {{ value_of_table_body.value4 }}
          </td>

          <td
            v-if="value_of_table_body.value5"
            class="border-b border-r border-gray-200 p-4 text-left"
            :data-label="table_header[5]"
          >
            {{ value_of_table_body.value5 }}
          </td>

          <td
            v-if="value_of_table_body.value6"
            class="border-b border-r border-gray-200 p-4 text-left"
            :data-label="table_header[6]"
          >
            {{ value_of_table_body.value6 }}
          </td>

          <td
            class="flex justify-center border-b border-r border-gray-200 p-4 text-left"
            :data-label="table_header[table_header.length - 1]"
          >
            <Icon
              name="material-symbols:info-outline-rounded"
              size="24px"
              class="cursor-pointer text-gray-400"
            />
          </td>
        </tr>
      </tbody>
    </table>

    <div class="mt-8 flex w-full flex-row items-center justify-between">
      <div
        class="relative flex cursor-pointer flex-row items-center justify-between gap-2 rounded-lg border border-gray-300 bg-white px-2.5 py-2"
        @click="listOpen = !listOpen"
      >
        <span>{{ items_per_page }}</span>
        <Icon name="ion:chevron-down" color="#667085" size="20px" />
        <div
          v-if="listOpen"
          class="absolute left-0 top-full mt-1 flex w-full cursor-pointer flex-col items-center gap-2 rounded-lg border border-gray-300 bg-white p-2 shadow-sm"
          @click="listOpen = !listOpen"
        >
          <span class="w-full text-center" @click="changeItemPerPage(10)"
            >10</span
          >
          <span class="w-full text-center" @click="changeItemPerPage(15)"
            >15</span
          >
          <span class="w-full text-center" @click="changeItemPerPage(20)"
            >20</span
          >
          <span class="w-full text-center" @click="changeItemPerPage(25)"
            >25</span
          >
        </div>
      </div>

      <div class="flex flex-row items-center gap-4">
        <Icon
          name="material-symbols:chevron-left-rounded"
          :color="current_page == 1 ? '#D0D5DD' : '#667085'"
          size="25px"
          :class="current_page == 1 ? '' : 'cursor-pointer'"
          @click="previousPage()"
        />
        <div class="flex flex-row items-center gap-2">
          <template v-for="(page, index) in total_pages" :key="index">
            <div
              v-if="
                page == 1 ||
                page == total_pages ||
                (page >= current_page - 1 && page <= current_page + 1)
              "
              class="cursor-pointer rounded-lg px-4 py-2 font-medium text-gray-600"
              :class="current_page == page ? 'bg-red-600 text-white' : ''"
              @click="changeByNumber(page)"
            >
              <span v-if="page != current_page">{{ page }}</span>
              <span v-else>{{ page }}</span>
            </div>

            <span
              v-else-if="page >= current_page - 2 && page <= current_page + 2"
            >
              ...
            </span>
          </template>
        </div>
        <Icon
          name="material-symbols:chevron-right-rounded"
          :color="current_page == total_pages ? '#D0D5DD' : '#667085'"
          size="25px"
          :class="current_page == total_pages ? '' : 'cursor-pointer'"
          @click="nextPage()"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";

// Variabel
const props = defineProps({
  table_header: {
    type: Array,
  },
  table_body: {
    type: Array,
    default: () => [],
  },
  table_type: {
    type: String,
    default: "",
  },
});
const items_per_page = ref(10);
const current_page = ref(1);
const listOpen = ref(false);
const checkbox = ref([]);

// Function
const total_pages = computed(() =>
  Math.ceil(props.table_body.length / items_per_page.value),
);
const showing_item = computed(() => {
  const items = Number(items_per_page.value);
  const start = (current_page.value - 1) * items;
  const end = start + items;
  return props.table_body.slice(start, end);
});
const previousPage = () => {
  if (current_page.value == 1) {
    current_page.value = 1;
  } else {
    current_page.value -= 1;
  }
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
};
const nextPage = () => {
  if (current_page.value == total_pages.value) {
    current_page.value = total_pages.value;
  } else {
    current_page.value += 1;
  }
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
};
const changeByNumber = (page) => {
  current_page.value = page;
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
};
const changeItemPerPage = (number) => {
  items_per_page.value = number;
  listOpen.value = false;
};
// const getIdBulkDelete = ({id, index}) => {
//   var index = pengaturan_store.bulk_delete_lokasi.indexOf(id)
//     if (index == -1) {
//       pengaturan_store.bulk_delete_lokasi.push(id)
//     } else {
//       pengaturan_store.bulk_delete_lokasi.splice(index, 1)
//     }
// }
</script>

<style lang="scss" scoped>
table tr:last-child td:last-child {
  @apply rounded-br-lg;
}

table tr:last-child td:first-child {
  @apply rounded-bl-lg;
}

@media screen and (max-width: 768px) {
  table {
    border: 1px solid #000;
  }

  table thead {
    border: none;
    clip: rect(0 0 0 0);
    height: 1px;
    width: 1px;
    margin: -1px;
    overflow: hidden;
    padding: 0;
    position: absolute;
  }

  table tr {
    border-bottom: 3px solid #000;
    display: block;
  }

  table td {
    border-bottom: 1px solid #000;
    display: flex;
    font-size: 0.8em;
    text-align: right;
    align-items: center;
    justify-content: space-between;
  }

  table td::before {
    /*
    * aria-label has no advantage, it won't be read inside a table
    content: attr(aria-label);
    */
    content: attr(data-label);
    float: left;
    font-weight: 500;
    text-transform: uppercase;
    text-align: left;
  }

  table td:last-child {
    border-bottom: 0;
  }
}
</style>
