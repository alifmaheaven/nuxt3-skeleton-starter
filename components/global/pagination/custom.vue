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
  </div>
</template>

<style lang="scss" scoped>
.page-item {
  cursor: pointer;
  a.page-link {
    @apply text-primary font-bold;
  }
  &.active {
    a.page-link {
      @apply bg-primary text-white cursor-default;
    }
  }
}
</style>
