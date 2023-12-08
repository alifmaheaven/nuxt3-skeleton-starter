<script setup>
import { computed, toRef, useSlots } from "vue";
import { useField } from "vee-validate";

const props = defineProps({
  value: {
    type: String,
    default: "",
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
    emit("update:value", {
      value: props.value,
      checked: value.includes(props.value),
    });
  },
});
</script>

<template>
  <div
    class="inline-flex w-full items-center justify-center"
    :class="{ success: meta.valid }"
  >
    <label
      v-if="label"
      :for="name"
      class="form-label mb-2 inline-flex items-center"
      :class="{
        'font-bold text-red-500': !!errorMessage,
      }"
    >
      <span v-if="primary">
        <span class="font-bold text-red-500">*</span>
      </span>
      {{ label }}
      <GlobalTooltip
        v-if="tooltipTitle || tooltipDescription"
        :title="tooltipTitle"
        :description="tooltipDescription"
      />
    </label>
    <div class="item relative inline-flex justify-center">
      <input
        :id="name"
        v-model="modelValue"
        :name="name"
        type="checkbox"
        class="cursor-pointer rounded-md border border-gray-300 bg-white text-primary-500 shadow focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:border-gray-600 dark:bg-gray-700 dark:focus:ring-gray-600 dark:focus:ring-offset-gray-900 sm:text-sm"
        :class="{
          'border-red-500 dark:border-red-500': !!errorMessage,
        }"
        :value="value"
        :disabled="disabled"
        :readonly="readonly"
      />
    </div>
    <div
      v-if="!!errorMessage"
      class="mt-1 text-xs text-red-500 dark:text-red-500"
    >
      {{ errorMessage }}
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
