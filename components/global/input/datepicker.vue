<script setup>
import { computed, toRef, useSlots, ref } from "vue";
import { useField } from "vee-validate";
import { useDarkModeStore } from "@/stores/dark-mode";

import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";

const darkModeStore = useDarkModeStore();
const darkMode = computed(() => darkModeStore.darkMode);

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
  min: {
    type: String,
    default: "",
  },
  max: {
    type: String,
    default: "",
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

const datevalue = computed({
  get() {
    return inputValue.value;
  },
  set(value) {
    handleChange(formatDate(value));
    emit("update:changeDate", formatDate(value));
  },
});

const startTime = ref({ hours: 0, minutes: 0 });

// const onlynumber = (e) => {
//   var keyCode = e.which;
//   var value = e.target.value;
//   /*
//   48-57 - (0-9)Numbers
//   45 - (strip)
//   46 - (titik)
//   65-90 - (A-Z)
//   97-122 - (a-z)
//   8 - (backspace)
//   32 - (space)
//   */
//   // Not allow special
//   if (value.length > 19) {
//     e.preventDefault();
//   } else if (keyCode < 48 || keyCode > 57) {
//     e.preventDefault();
//   }
// };

const formatDate = (date) => {
  var d = new Date(date),
    year = d.getFullYear(),
    month = ("0" + (d.getMonth() + 1)).slice(-2),
    day = ("0" + d.getDate()).slice(-2),
    hours = ("0" + d.getHours()).slice(-2),
    minutes = ("0" + d.getMinutes()).slice(-2),
    seconds = ("0" + d.getSeconds()).slice(-2);

  return (
    [year, month, day].join("-") + " " + [hours, minutes, seconds].join(":")
  );
};
</script>

<template>
  <div class="mb-6 last:mb-0" :class="{ success: meta.valid }">
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
    <div class="relative">
      <VueDatePicker
        :id="name"
        v-model="datevalue"
        :name="name"
        :placeholder="placeholder"
        :disabled="disabled"
        :class="{
          'pl-10': !!icon,
        }"
        :input-class-name="
          !!errorMessage ? 'border-red-500 dark:border-red-500' : ''
        "
        class="form-control w-full block"
        :enable-time-picker="true"
        :min-date="min ? new Date(min) : null"
        :max-date="max ? new Date(max) : null"
        :start-time="startTime"
        :dark="darkMode"
        @blur="handleBlur"
      >
      </VueDatePicker>

      <div
        v-if="icon"
        class="absolute inset-y-0 left-0 flex items-center px-3 text-gray-600"
      >
        <component :is="icon" />
      </div>
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
