<script setup>
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

const npwpvalue = computed({
  get() {
    return sparatorformater(inputValue.value);
  },
  set(value) {
    handleChange(value.replace(/[^\w\s]/gi, ""));
  },
});

const onlynumber = (e) => {
  var keyCode = e.which;
  var value = e.target.value;
  /* 
  48-57 - (0-9)Numbers
  45 - (strip)
  46 - (titik)
  65-90 - (A-Z)
  97-122 - (a-z)
  8 - (backspace)
  32 - (space)
  */
  // Not allow special
  if (value.length > 19) {
    e.preventDefault();
  } else if (keyCode < 48 || keyCode > 57) {
    e.preventDefault();
  }
};

const sparatorformater = (value) => {
  if (value === null || value === undefined || value === "" || value === 0) {
    return value;
  } else {
    const numberArray = value
      .toString()
      .replace(/[^,\d]/g, "")
      .split(",");
    const sisa = numberArray[0].length % 3;
    let angka_hasil = numberArray[0].substr(0, sisa);
    const ribuan = numberArray[0].substr(sisa).match(/\d{3}/g);

    if (numberArray[0].length > 1) {
      // tambahkan kondisi panjang angka
      angka_hasil = angka_hasil.replace(/^0+/, ""); // hapus angka 0 di depan
    }

    // tambahkan titik jika yang di input sudah menjadi angka ribuan
    if (ribuan) {
      const separator = sisa ? "." : "";
      angka_hasil += separator + ribuan.join(".");
    }

    angka_hasil =
      numberArray[1] !== undefined
        ? angka_hasil + "," + numberArray[1]
        : angka_hasil;
    return angka_hasil;
  }
};
</script>

<template>
  <div
    class="mb-6 last:mb-0"
    :class="{ success: meta.valid, 'inline-flex items-center': inline }"
  >
    <label
      v-if="label"
      :for="name"
      class="form-label mb-2 mr-2 block"
      :class="{
        'font-bold text-red-500': !!errorMessage,
      }"
    >
      <span v-if="primary">
        <span class="font-bold text-red-500">*</span>
      </span>
      {{ label }}
    </label>
    <div class="relative">
      <input
        :id="name"
        v-model="npwpvalue"
        :name="name"
        type="text"
        class="form-control block w-full"
        :class="{
          '!dark:border-red-500 !border-red-500': !!errorMessage,
          'pl-10': !!icon,
        }"
        :disabled="disabled"
        :readonly="readonly"
        :placeholder="placeholder"
        @blur="handleBlur"
        @keypress="onlynumber"
      />

      <!-- <BaseIcon
        v-if="icon"
        :path="icon"
        w="w-10"
        h="h-12"
        class="absolute top-0 left-0 z-10 pointer-events-none text-gray-500 dark:text-slate-400"
      /> -->
      <!-- <div class="absolute inset-y-0 right-0 flex items-center px-3 text-gray-600">
        <i class="fa fa-eye" :class="iconClasses"></i>
      </div> -->

      <div
        v-if="icon"
        class="absolute inset-y-0 left-0 flex items-center px-3 text-gray-600"
      >
        <component :is="icon" />
      </div>
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
