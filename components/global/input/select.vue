<script setup>
import { computed, toRef, useSlots } from "vue";
import { useField } from "vee-validate";
import Multiselect from "@vueform/multiselect";

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
  },
  placeholder: {
    type: String,
    default: "",
  },
  icon: {
    type: String,
    default: "",
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
  options: {
    type: Array,
    default: () => [],
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

const dropdowninput = computed({
  get() {
    console.log("inputValue.value", `${name.value}`);
    // return 'ADSTAFF'
    return inputValue.value;
  },
  set(value) {
    handleChange(value);
    emit("update:value", value);
  },
});
</script>

<template>
  <div class="mb-6 w-full last:mb-0" :class="{ success: meta.valid }">
    <label
      v-if="label"
      :for="name"
      class="form-label mb-2 block"
      :class="{
        'font-bold text-red-500': !!errorMessage,
      }"
    >
      <span v-if="primary">
        <span class="font-bold text-red-500">*</span>
      </span>
      {{ label }}</label
    >
    <div class="relative">
      <multiselect
        v-model="dropdowninput"
        :placeholder="placeholder"
        :disabled="disabled || readonly"
        value-prop="id"
        :options="options"
        class="form-control block w-full"
        :class="{
          'border-red-500 dark:border-red-500': !!errorMessage,
          'pl-10': !!icon,
        }"
        :classes="{
          search: 'multiselect-search bg-transparent border-none',
          dropdown:
            'multiselect-dropdown bg-white dark:bg-darkmode-600 border-2 border-gray-300 dark:border-gray-700',
        }"
        label="name"
        track-by="name"
        :searchable="true"
        @blur="handleBlur"
      >
      </multiselect>
    </div>
    <div
      v-if="!!errorMessage"
      class="mt-1 text-xs text-red-500 dark:text-red-500"
    >
      {{ errorMessage }}
    </div>
  </div>
</template>

<style src="@vueform/multiselect/themes/default.css"></style>
