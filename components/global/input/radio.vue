<template>
  <div class="relative">
    <div
      class="flex cursor-pointer flex-row items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2"
      @click="isOpen = !isOpen"
    >
      <span class="font-semibold text-gray-700">{{ value }}</span>
      <Icon
        name="tabler:chevron-down"
        color="#344054"
        size="20px"
        class="trasnition-all duration-200"
        :class="isOpen ? 'rotate-180' : 'rotate-0'"
      />
    </div>

    <div
      v-if="isOpen"
      class="absolute left-0 top-10 z-20 mt-1 flex min-w-max flex-col divide-y rounded-lg border border-gray-300 bg-white shadow-md"
    >
      <label
        v-for="(option, index) in options"
        :key="index"
        class="flex cursor-pointer flex-row items-center gap-2 px-4 py-2"
      >
        <input
          id="filter-radio"
          v-model="value"
          type="radio"
          :value="option"
          class="radio"
        />
        <span class="text-sm font-medium text-gray-700">{{ option }}</span>
      </label>
    </div>
  </div>
  <div
    v-if="isOpen"
    class="fixed inset-0 z-10 h-screen w-screen"
    @click="isOpen = !isOpen"
  ></div>
</template>

<script setup>
import { ref } from "vue";

// Variabel
const props = defineProps({
  options: {
    type: Array,
    default: () => [],
  },
});
const isOpen = ref(false);
const value = ref(props.options[0]);

// Function
</script>

<style lang="scss" scoped>
.radio {
  @apply h-4 w-4 border border-gray-200 checked:border-red-600 checked:bg-red-600 hover:border-red-50 hover:bg-red-50 focus:border-red-600 focus:bg-red-600 focus:ring-0 active:border-red-600 active:bg-red-50;
}
</style>
