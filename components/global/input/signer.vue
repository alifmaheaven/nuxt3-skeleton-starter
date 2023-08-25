<script setup>
import { computed, toRef, useSlots } from "vue";
import { useField } from "vee-validate";

import Vue3Signature from "vue3-signature"; // https://github.com/WangShayne/vue3-signature

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
  option: {
    type: Object,
    default: () => {
      return {
        penColor: "rgb(0, 0, 0)",
        backgroundColor: "rgb(255 255 255 / 0%)",
      };
    },
  },
});
const name = toRef(props, "name");
const {
  value: inputValue,
  errorMessage,
  handleBlur,
  handleChange,
  meta,
} = useField(name);

var signature1 = ref(null);

const clear = () => {
  signature1.value.clear();
};

const undo = () => {
  signature1.value.undo();
};

const save = (t) => {
  handleChange(signature1.value.save(t));
};

const reset = () => {
  handleChange(null);
};

const npwpvalue = computed({
  get() {
    return inputValue.value;
  },
  set(value) {
    handleChange(value);
  },
});
</script>

<template>
  <div class="mb-6 last:mb-0 w-full" :class="{ success: meta.valid }">
    <label
      v-if="label"
      :for="name"
      class="form-label block mb-2"
      :class="{
        'text-red-500 font-bold': !!errorMessage,
      }"
    >
      <span v-if="primary">
        <span class="text-red-500 font-bold">*</span>
      </span>
      {{ label }}</label
    >
    <div
      v-if="!!!inputValue"
      class="relative w-96 h-48 border shadow-md bg-white"
      :class="{
        'border-red-500 dark:border-red-500': !!errorMessage,
      }"
    >
      <button
        @click="clear()"
        type="button"
        class="absolute top-1 right-1 px-2 py-1 text-sm font-medium text-white bg-orange-500 rounded-md hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
      >
        <Icon name="carbon:reset" />
      </button>
      <button
        @click="undo()"
        type="button"
        class="absolute top-1 right-10 px-2 py-1 text-sm font-medium text-white bg-gray-500 rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
      >
        <Icon name="carbon:undo" />
      </button>
      <button
        @click="save('png')"
        type="button"
        class="absolute top-1 left-1 px-2 py-1 text-sm font-medium text-white bg-green-500 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
      >
        <Icon name="carbon:save" />
      </button>
      <ClientOnly>
        <Vue3Signature
          ref="signature1"
          :sigOption="option"
          :disabled="false"
          class="example"
        ></Vue3Signature>
      </ClientOnly>
    </div>
    <div v-else class="relative w-96 h-48 border shadow-md bg-white">
      <button
        @click="reset()"
        type="button"
        class="absolute top-1 right-1 px-2 py-1 text-sm font-medium text-white bg-orange-500 rounded-md hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
      >
        <Icon name="material-symbols:delete-outline" />
      </button>
      <img :src="inputValue" class="w-full h-full" />
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
