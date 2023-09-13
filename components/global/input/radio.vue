<template>
  <div class="relative">
    <div
      @click="isOpen = !isOpen"
      class="flex flex-row items-center gap-2 bg-white px-4 py-2 rounded-lg border border-gray-300 cursor-pointer"
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
      class="bg-white rounded-lg border border-gray-300 shadow-md absolute divide-y top-10 left-0 mt-1 z-20 min-w-max flex flex-col"
    >
      <label
        v-for="(option, index) in options"
        :key="index"
        class="flex flex-row gap-2 items-center cursor-pointer px-4 py-2"
      >
        <input
          v-model="value"
          type="radio"
          :value="option"
          id="filter-radio"
          class="radio"
        >
        <span class="text-gray-700 font-medium text-sm">{{ option }}</span>
      </label>
    </div>
  </div>
  <div
    v-if="isOpen"
    @click="isOpen = !isOpen"
    class="fixed inset-0 h-screen w-screen z-10"
  ></div>
</template>

<script setup>
import { ref } from "vue"

// Variabel
const props = defineProps({
  options: {
    type: Array,
    default: () => []
  },
})
const isOpen = ref(false)
const value = ref(props.options[0])

// Function
</script>

<style lang="scss" scoped>
.radio {
  @apply border border-gray-200 h-4 w-4 checked:border-red-600 checked:bg-red-600 hover:border-red-50 hover:bg-red-50 active:border-red-600 active:bg-red-50 focus:border-red-600 focus:bg-red-600 focus:ring-0
}
</style>