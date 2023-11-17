<script setup>
import { computed } from "vue";
import { useAuth } from "@/stores/auth";
const authStore = useAuth();

const emit = defineEmits();

const props = defineProps({
  totalPage: {
    default: 0,
  },
  currentPage: {
    default: 0,
  },
  perPage: {
    default: 0,
  },
  pageOptions: {
    type: Array,
    default: () => [5, 10, 20, 30],
  },
});

const isLoading = computed(() => authStore.isLoading);

const perPageChange = computed({
  get() {
    return props.perPage;
  },
  set(value) {
    emit("update:perPage", value);
    emit("update:currentPage", 1);
  },
});

const currentPageChange = (value) => {
  emit("update:currentPage", value);
  emit("change");
};
</script>

<template>
  <!-- how to use 
    const pagination = reactive({
      count: 5,
      current_page: 1,
      links: {},
      per_page: 10,
      total: 5,
      total_pages: 1,
    });

    <pagination-custom
      :total-page="pagination.total_pages"
      :current-page="pagination.current_page"
      :per-page="pagination.per_page"
      @change="getData"
      @update:perPage="(value) => (pagination.per_page = value)"
      @update:currentPage="(value) => (pagination.current_page = value)"
    >
    </pagination-custom>
    --->
  <div
    class="inline-flex h-20 w-full items-center justify-between gap-5 border-t border-gray-200 p-5"
  >
    <div
      class="flex cursor-pointer items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-3.5 py-2 shadow hover:bg-slate-300"
      @click="currentPage != 1 && currentPageChange(currentPage - 1)"
    >
      <Icon name="ph:arrow-left-bold" class="relative h-5 w-5"></Icon>
      <div class="text-sm font-semibold leading-tight text-slate-700">
        Sebelumnya
      </div>
    </div>
    <div class="flex items-start justify-start gap-0.5">
      <template v-for="page in totalPage" :key="page">
        <div
          v-if="
            page === 1 ||
            page === totalPage ||
            (page >= currentPage - 2 && page <= currentPage + 2)
          "
          :active="page === perPage"
          class="flex h-10 w-10 cursor-pointer items-center justify-center rounded-[20px] hover:bg-slate-300"
          :class="{ 'bg-slate-100': page === currentPage }"
        >
          <div
            v-if="page != currentPage"
            class="inline-flex w-10 items-center justify-center self-stretch rounded-[20px] p-3"
            @click="currentPageChange(page)"
          >
            <div
              class="text-center text-sm font-medium leading-tight text-slate-800"
            >
              {{ page }}
            </div>
          </div>
          <div
            v-else
            class="inline-flex w-10 items-center justify-center self-stretch rounded-[20px] p-3"
          >
            <div
              class="text-center text-sm font-medium leading-tight text-slate-800"
            >
              {{ page }}
            </div>
          </div>
        </div>
        <div
          v-else-if="page >= currentPage - 3 && page <= currentPage + 3"
          class="flex h-10 w-10 items-center justify-center rounded-[20px]"
        >
          <div
            class="inline-flex w-10 items-center justify-center self-stretch rounded-[20px] p-3"
          >
            <div
              class="text-center text-sm font-medium leading-tight text-slate-600"
            >
              ...
            </div>
          </div>
        </div>
      </template>
    </div>
    <div
      class="flex cursor-pointer items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-3.5 py-2 shadow hover:bg-slate-300"
      @click="currentPage != totalPage && currentPageChange(currentPage + 1)"
    >
      <div class="text-sm font-semibold leading-tight text-slate-700">
        Berikutnya
      </div>
      <div class="relative h-5 w-5"></div>
      <Icon name="ph:arrow-right-bold" class="relative h-5 w-5"></Icon>
    </div>
  </div>
  <!-- <div
    v-if="!!!isLoading"
    class="intro-y my-2 col-span-12 flex flex-wrap sm:flex-row sm:flex-nowrap items-center"
  >
    <nav class="w-full sm:w-auto sm:mr-auto">
      <ul class="pagination">
        <template v-for="page in totalPage" :key="page">
          <li
            v-if="
              page === 1 ||
              page === totalPage ||
              (page >= currentPage - 2 && page <= currentPage + 2)
            "
            :active="page === perPage"
            class="page-item"
            :class="{ active: page == currentPage }"
            small
          >
            <a
              v-if="page != currentPage"
              class="page-link text-primary"
              @click="currentPageChange(page)"
            >
              {{ page }}
            </a>
            <a v-else class="page-link" disabled>{{ page }}</a>
          </li>
          <li
            v-else-if="page >= currentPage - 3 && page <= currentPage + 3"
            class="page-item"
          >
            <a class="page-link" disabled>...</a>
          </li>
        </template>
      </ul>
    </nav>
    <select
      v-model="perPageChange"
      class="w-20 form-select mt-3 sm:mt-0"
      aria-label="Droopdown page"
      @change="$emit('change')"
    >
      <option v-for="item in pageOptions" :key="item">
        {{ item }}
      </option>
    </select>
  </div> -->
</template>

<style lang="scss" scoped>
.page-item {
  cursor: pointer;
  a.page-link {
    @apply text-primary font-bold;
  }
  &.active {
    a.page-link {
      @apply bg-primary cursor-default text-white;
    }
  }
}
</style>
