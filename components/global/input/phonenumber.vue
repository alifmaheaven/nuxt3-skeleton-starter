<script setup>
const { $api } = useNuxtApp();

import { computed, toRef, ref, useSlots } from "vue";
import { useField } from "vee-validate";
import Multiselect from "@vueform/multiselect";
// import axios from "@/api";

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
  isareas: {
    type: Boolean,
    default: false,
  },
  inline: {
    type: Boolean,
    default: false,
  },
});
const name = toRef(props, "name");
// console.log('name', `${name.value}.prefix`);

const {
  value: inputValuePrefix,
  errorMessage: errorMessagePrefix,
  handleBlur: handleBlurPrefix,
  handleChange: handleChangePrefix,
  meta: metaPrefix,
} = useField(`${name.value}.prefix`, undefined, {
  initialValue: props.value.prefix,
});

const {
  value: inputValue,
  errorMessage,
  handleBlur,
  handleChange,
  meta,
} = useField(`${name.value}.number`, undefined, {
  initialValue: props.value.number,
});

const phone_number_value = computed({
  get() {
    // console.log("inputValue.value.number", inputValue.value.number);
    return phoneformarter(inputValue.value);
  },
  set(value) {
    handleChange(value.replace(/[^\w\s]/gi, "").replace(/\s/g, ""));
  },
});

const country_code_value = computed({
  get() {
    // console.log("inputValue.value.prefix", inputValuePrefix.value);
    return inputValuePrefix.value;
  },
  set(value) {
    handleChangePrefix(value.replace(/[^\w\s]/gi, "").replace(/\s/g, ""));
  },
});

// data
const phonecoderesult = ref(null);

// methods
const onlynumber = (e) => {
  var keyCode = e.which;
  var value = e.target.value;
  if (keyCode < 48 || keyCode > 58) {
    e.preventDefault();
  }
};

const getPhonePrefix = async () => {
  try {
    const { data } = await useFetch(
      `https://cuik-projects.github.io/country-list/countries.json`,
    );
    phonecoderesult.value = JSON.parse(JSON.stringify(data.value));
  } catch (error) {
    console.error(error);
  }
};
getPhonePrefix();

const phoneformarter = (phoneNumber) => {
  const cleaned = ("" + phoneNumber).replace(/\D/g, "").split("");
  var result = "";

  cleaned.forEach((value, index) => {
    if (index == 3) {
      result += " - " + value;
    } else if (index == 7) {
      result += " - " + value;
    } else {
      if (value == 0 && index == 0) {
        result += "";
      } else if (inputValuePrefix.value == "62" && value != 8 && index == 0) {
        // when +62 must be 8 in the first letter
        result += "";
      } else {
        result += value;
      }
    }
  });

  return result;
};
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
    <div class="inline-flex w-full">
      <!-- <TomSelect
          v-model="country_code_value"
          class="block bg-white rounded-[9px] shadow border border-gray-300 w-[25%]"
          :class="{
            '!border-red-500 !dark:border-red-500': !!errorMessage,
          }"
          :disabled="disabled"
          :readonly="readonly"
          @blur="handleBlurPrefix"
        >
          <option
            v-for="(items, index) in phonecoderesult"
            :key="index"
            :value="items.code"
          >
            {{ items.code }}
          </option>
        </TomSelect> -->
      <multiselect
        v-model="country_code_value"
        :disabled="disabled || readonly"
        value-prop="id"
        :options="
          phonecoderesult?.map(({ dial_code }) => ({
            id: dial_code,
            name: dial_code,
          })) || []
        "
        class="block !w-[30%] !rounded-[9px] border border-slate-300 bg-slate-50 text-dark shadow"
        :class="{
          '!dark:border-red-500 !border-red-500': !!errorMessage,
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
      <input
        :id="name"
        v-model="phone_number_value"
        :name="name"
        type="text"
        class="block w-[70%] rounded-[9px] border border-slate-300 bg-slate-50 text-dark shadow"
        :class="{
          '!dark:border-red-500 !border-red-500': !!errorMessage,
        }"
        :disabled="disabled"
        :readonly="readonly"
        :placeholder="placeholder"
        @blur="handleBlur"
        @keypress="onlynumber"
      />
    </div>
    <div
      v-if="!!errorMessage || !!errorMessagePrefix"
      class="absolute -bottom-3 right-0 mt-1 text-xs text-red-500 dark:text-red-500"
    >
      {{ errorMessage || errorMessagePrefix }}
    </div>
  </div>
</template>

<style src="@vueform/multiselect/themes/default.css"></style>
