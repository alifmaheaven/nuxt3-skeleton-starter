<script setup>
import { computed, toRef, useSlots } from "vue";
import { useField } from "vee-validate";

const props = defineProps({
  value: {
    type: String,
    default: '',
  },
  name: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    required: false,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  readonly: {
    type: Boolean,
    default: false,
  },
  primary: {
    type: Boolean,
    default: false,
  },
  tooltipTitle: {
    type: String,
    default: "",
  },
  tooltipDescription: {
    type: String,
    default: "",
  },
});
const emit = defineEmits();
const name = toRef(props, "name");
const {
  value: inputValue,
  errorMessage,
  handleBlur,
  handleChange,
  meta,
} = useField(name);

const modelValue = computed({
  get() {
    return inputValue.value;
  },
  set(value) {
    handleChange(value);
    emit("update:value", {value:props.value, checked:value.includes(props.value)});
  },
});
</script>

<template>
  <div class="w-full inline-flex justify-center items-center" :class="{ success: meta.valid }">
    <label
      v-if="label"
      :for="name"
      class="form-label mb-2 inline-flex items-center"
      :class="{
        'text-red-500 font-bold': !!errorMessage,
      }"
    >
      <span v-if="primary">
        <span class="text-red-500 font-bold">*</span>
      </span>
      {{ label }}
      <GlobalTooltip
        v-if="tooltipTitle || tooltipDescription"
        :title="tooltipTitle"
        :description="tooltipDescription"
      />
    </label>
    <div class="relative inline-flex justify-center item">
      <input
        :id="name"
        :name="name"
        type="checkbox"
        class="bg-white shadow border border-gray-300 text-primary-500 cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-offset-gray-900 dark:focus:ring-gray-600 rounded-md sm:text-sm"
        :class="{
          'border-red-500 dark:border-red-500': !!errorMessage,
        }"
        :value="value"
        v-model="modelValue"
        :disabled="disabled"
        :readonly="readonly"
      />
    </div>
    <div
      v-if="!!errorMessage"
      class="text-xs text-red-500 dark:text-red-500 mt-1"
    >
      {{ errorMessage }}
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
