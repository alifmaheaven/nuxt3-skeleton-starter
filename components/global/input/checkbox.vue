<template>
  <div class="relative">
    <div
      @click="isOpen = !isOpen"
      class="flex flex-row items-center gap-2 bg-white px-4 py-2 rounded-lg border border-gray-300 cursor-pointer"
    >
      <span class="font-semibold text-gray-700">{{ getValue }}</span>
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
        class="flex flex-row gap-2 items-center cursor-pointer px-4 py-2"
      >
        <input
          v-model="all_checked"
          type="checkbox"
          class="checkbox"
          ref="parent_checkbox"
          @change="checkAll()"
        >
        <span class="text-gray-700 font-medium text-sm">All {{ name }}</span>
      </label>
      <label
        v-for="(option, index) in options"
        :key="index"
        class="flex flex-row gap-2 items-center cursor-pointer px-4 py-2"
      >
        <input
          v-model="value"
          type="checkbox"
          :value="option"
          class="checkbox"
          ref="child_checkbox"
          @change="subCheckAll()"
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
  placeholder: {
    type: String,
    default: ""
  },
  name: {
    type: String
  }
})
const isOpen = ref(false)
const all_checked = ref(false)
const value = ref([props.options[0]])
const getValue = computed(() => {
  var total_selected = 0
  if (all_checked.value == true) {
    return `All ${props.name}`
  } else {
    if (value.value.length > 1) {
      total_selected += (value.value.length - 1)
      return `${value.value[0]} +${total_selected}`
    } else if (value.value.length == 0) {
      return props.placeholder
    } else {
      return value.value[0]
    }
  }
})
const child_checkbox = ref()
const parent_checkbox = ref()

// Function
const checkAll = () => {
  if (all_checked.value == true) {
    for (let i = 0; i < child_checkbox.value.length; i++) {
      child_checkbox.value[i].checked = true
    }
  } else {
    for (let i = 0; i < child_checkbox.value.length; i++) {
      child_checkbox.value[i].checked = false
    }
    value.value = []
  }
}

const subCheckAll = () => {
  if (value.value.length == props.options.length) {
    parent_checkbox.value.checked = true
    all_checked.value = true
  } else {
    parent_checkbox.value.checked = false
    all_checked.value = false
  }
}
</script>

<style lang="scss" scoped>
.checkbox {
  @apply border border-gray-200 rounded h-4 w-4 text-red-600 checked:border-red-600 checked:bg-red-600 hover:border-red-50 hover:bg-red-50 active:border-red-600 active:bg-red-50 focus:border-red-600 focus:bg-red-600 focus:ring-0
}
</style>