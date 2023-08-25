<script setup>
import { computed, toRef, ref, useSlots } from "vue";
import { useField } from "vee-validate";
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

let params = {
  per_page: 9999,
};
// axios({
//   url: `${import.meta.env.VITE_API_BASE_URL_ORGANISATIONS}/api/codes/${
//     props.isareas ? "areas" : "countries"
//   }`,
//   params: params,
//   method: "GET",
// })
//   .then((result) => {
//     phonecoderesult.value = result.data.data;
//   })
//   .catch((err) => {
//     console.log("error", err);
//   });

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
    <div class="flex">
      <TomSelect
        v-model="country_code_value"
        class="w-[25%]"
        :class="{
          'border-red-500 dark:border-red-500': !!errorMessage,
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
      </TomSelect>
      <input
        :id="name"
        v-model="phone_number_value"
        :name="name"
        type="text"
        class="form-control block w-[75%]"
        :class="{
          'border-red-500 dark:border-red-500': !!errorMessage,
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
      class="text-xs text-red-500 dark:text-red-500 mt-1"
    >
      {{ errorMessage || errorMessagePrefix }}
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
