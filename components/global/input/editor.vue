<script setup>
// kalo mau otak atik settingannya bisa langsung di plugins/QuillEditor.client.js
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
});
const name = toRef(props, "name");
const {
  value: inputValue,
  errorMessage,
  handleBlur,
  handleChange,
  meta,
} = useField(name);

const editorvalue = computed({
  get() {
    return inputValue.value;
  },
  set(value) {
    handleChange(value);
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
      <ClientOnly>
        <QuillEditor
          v-model:content="editorvalue"
          class="block w-full rounded-[9px] border border-slate-300 bg-slate-50 text-dark shadow"
          :disabled="disabled"
          :readonly="readonly"
          :class="{
            '!dark:border-red-500 !border-red-500': !!errorMessage,
            'pl-10': !!icon,
          }"
          content-type="html"
          toolbar="full"
          theme="snow"
        />
      </ClientOnly>
      <!-- <div
        v-if="icon"
        class="absolute inset-y-0 left-0 flex items-center px-3 text-gray-500"
      >
        <Icon :name="icon" class="w-5 h-5" />
      </div> -->
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
