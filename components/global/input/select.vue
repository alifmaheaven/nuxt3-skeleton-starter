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
  inline: {
    type: Boolean,
    default: false,
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
    // console.log("inputValue.value", `${name.value}`);
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
  <div
    class="relative my-3 w-full first:mt-0 last:mb-0"
    :class="{ success: meta.valid, 'inline-flex items-center': inline }"
  >
    <label
      v-if="label"
      :for="name"
      class="form-label mb-2 block w-40"
      :class="{
        'font-bold text-red-500': !!errorMessage,
        'mr-2 inline-block': inline,
      }"
    >
      <span v-if="primary">
        <span class="font-bold text-red-500">*</span>
      </span>
      {{ label }}
    </label>
    <div class="relative w-full">
      <multiselect
        v-model="dropdowninput"
        :value="dropdowninput"
        :placeholder="placeholder"
        :disabled="disabled || readonly"
        value-prop="id"
        :options="options"
        class="block !rounded-[9px] border border-slate-300 bg-slate-50 text-dark shadow"
        :class="{
          '!dark:border-red-500 !border-red-500': !!errorMessage,
          'pl-10': !!icon,
        }"
        :classes="{
          search: 'multiselect-search !bg-transparent border-none',
          dropdown:
            'multiselect-dropdown bg-white dark:bg-darkmode-600 border-2 border-gray-300 dark:border-gray-700 !rounded-[9px]',
        }"
        label="name"
        track-by="name"
        :searchable="true"
        @blur="handleBlur"
      >
      </multiselect>
      <div
        v-if="icon"
        class="absolute inset-y-0 left-0 flex items-center px-3 text-gray-500"
      >
        <Icon :name="icon" class="h-5 w-5" />
      </div>
    </div>
    <div
      v-if="!!errorMessage"
      class="absolute -bottom-5 right-0 mt-1 text-xs text-red-500 dark:text-red-500"
    >
      {{ errorMessage }}
    </div>
  </div>
</template>

<style src="@vueform/multiselect/themes/default.css"></style>
