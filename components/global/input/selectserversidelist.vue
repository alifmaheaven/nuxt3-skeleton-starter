<script setup>
// https://github.com/vueform/multiselect#using-with-vue-3
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
  isloading: {
    type: Boolean,
    default: false,
  },
  icon: {
    type: String,
    // default: mdiFormDropdown,
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
  dropdown_label: {
    type: String,
    default: "name",
  },
  dropdown_value: {
    type: String,
    default: "id",
  },
  dropdown_trackby: {
    type: String,
    default: "id",
  },
  options: {
    type: Array,
    default: () => [],
  },
});
const emit = defineEmits(["functionSearch"]);

const name = toRef(props, "name");
const {
  value: inputValue,
  errorMessage,
  handleBlur,
  handleChange,
  meta,
} = useField(name);

// method
const functionSearch = (search) => {
  emit("functionSearch", search);
};
</script>

<template>
  <div class="mb-6 last:mb-0" :class="{ success: meta.valid }">
    <label
      v-if="label"
      :for="name"
      class="mb-2 block font-bold"
      :class="{
        'text-red-500': !!errorMessage,
      }"
    >
      <span v-if="primary">
        <span class="font-bold text-red-500">*</span>
      </span>
      {{ label }}</label
    >
    <div>
      <div class="relative">
        <multiselect
          :value="inputValue"
          :placeholder="placeholder"
          :loading="isloading"
          :disabled="disabled || readonly"
          :value-prop="dropdown_value"
          :options="options"
          :label="dropdown_label"
          :searchable="true"
          :preselect-first="false"
          :internal-search="false"
          @search-change="functionSearch"
          @input="handleChange"
          @blur="handleBlur"
        >
          <!-- <template v-slot:tag="{ option, handleTagRemove, disabled }">
            <slot
              name="custom-label"
              :option="option"
              :handleTagRemove="handleTagRemove"
              :disabled="disabled">
            </slot>
          </template> -->
        </multiselect>
      </div>
    </div>
    <div
      v-if="!!errorMessage"
      class="absolute -bottom-3 right-0 mt-1 text-xs text-red-500 dark:text-red-500"
    >
      {{ errorMessage }}
    </div>
  </div>
  <!-- this how to consume -->
  <!-- <selectinput
      primary
      label="Organization"
      name="organization"
      placeholder="Select Organization"
      :loading="false"
      dropdown_value="code"
      dropdown_trackby="code"
      dropdown_label="name"
      :options="dynamical_list_organization"
      @functionSearch="functionSearch"
    >
    </selectinput> -->
</template>

<style lang="scss" scoped></style>

<style src="@vueform/multiselect/themes/default.css"></style>
