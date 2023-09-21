<script setup>
import { computed, toRef, useSlots } from "vue";
import { useField } from "vee-validate";

const emit = defineEmits();
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
  inline: {
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

var valueChange = computed({
  get: () => inputValue.value,
  set: (val) => {
    handleChange(val)
    emit("update:value", val);
  },
});
</script>

<template>
  <div class="my-3 first:mt-0 last:mb-0 w-full relative" :class="{ success: meta.valid, 'inline-flex items-center': inline }">
    <label
      v-if="label"
      :for="name"
      class="form-label block mb-2 w-40"
      :class="{
        'text-red-500 font-bold': !!errorMessage,
        'inline-block mr-2': inline,
      }"
    >
      <span v-if="primary">
        <span class="text-red-500 font-bold">*</span>
      </span>
      {{ label }}
    </label>
    <div class="relative w-full">
      <input
        :id="name"
        :name="name"
        type="text"
        class="w-full block bg-white rounded-[9px] shadow border border-gray-300"
        :class="{
          'border-red-500 dark:border-red-500': !!errorMessage,
          'pl-10': !!icon,
          'inline-block': inline,
        }"
        :disabled="disabled"
        :readonly="readonly"
        v-model="valueChange"
        :placeholder="placeholder"
      />
      <div
        v-if="icon"
        class="absolute inset-y-0 left-0 flex items-center px-3 text-gray-500"
      >
        <Icon :name="icon" class="w-5 h-5" />
      </div>
    </div>
    <div
      v-if="!!errorMessage"
      class="text-xs text-red-500 dark:text-red-500 mt-1 absolute -bottom-5 right-0"
    >
      {{ errorMessage }}
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
