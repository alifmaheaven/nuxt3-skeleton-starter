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
</script>

<template>
  <div
    class="relative my-3 w-full first:mt-0 last:mb-0"
    :class="{ success: meta.valid }"
  >
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
    <div
      v-if="!!!inputValue"
      class="relative h-80 w-full border bg-white shadow-md"
      :class="{
        '!dark:border-red-500 !border-red-500': !!errorMessage,
      }"
    >
      <button
        type="button"
        class="absolute right-1 top-1 rounded-md bg-orange-500 px-2 py-1 text-sm font-medium text-white hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
        @click="clear()"
      >
        <Icon name="carbon:reset" />
      </button>
      <button
        type="button"
        class="absolute right-10 top-1 rounded-md bg-gray-500 px-2 py-1 text-sm font-medium text-white hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
        @click="undo()"
      >
        <Icon name="carbon:undo" />
      </button>
      <button
        type="button"
        class="absolute left-1 top-1 rounded-md bg-green-500 px-2 py-1 text-sm font-medium text-white hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
        @click="save('png')"
      >
        <Icon name="carbon:save" />
      </button>
      <ClientOnly>
        <Vue3Signature
          ref="signature1"
          :sig-option="option"
          :disabled="false"
          class="example"
        ></Vue3Signature>
      </ClientOnly>
    </div>
    <div v-else class="relative h-80 w-full border bg-white shadow-md">
      <button
        type="button"
        class="absolute right-1 top-1 rounded-md bg-orange-500 px-2 py-1 text-sm font-medium text-white hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
        @click="reset()"
      >
        <Icon name="material-symbols:delete-outline" />
      </button>
      <img :src="inputValue" class="h-full w-full" />
    </div>
    <div
      v-if="!!errorMessage"
      class="absolute -bottom-3 right-0 mt-1 text-xs text-red-500 dark:text-red-500"
    >
      {{ errorMessage }}
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
