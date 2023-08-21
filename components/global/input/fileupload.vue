<script setup>
import { computed, toRef, useSlots } from "vue";
import { useField } from "vee-validate";
// import BaseIcon from "@/components/BaseIcon.vue";
// import { mdiFile, mdiFileRemove, mdiFileUpload } from "@mdi/js";

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
    required: true,
  },
  placeholder: {
    type: String,
    default: "",
  },
  // icon: {
  //   type: String,
  //   default: mdiFile,
  // },
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

const toBase64 = (file) => {
  var reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = function () {
    console.log(reader.result);
    return reader.result;
  };
  reader.onerror = function (error) {
    console.log("Error: ", error);
  };
};

const check = (test) => {
  return inputValue.value.name;
};

const resetField = () => {
  inputValue.value = "";
};
</script>

<template>
  <div class="mb-6 last:mb-0" :class="{ success: meta.valid }">
    <label
      v-if="label"
      :for="name"
      class="block font-bold mb-2"
      :class="{
        'text-red-500': !!errorMessage,
      }"
    >
      <span v-if="primary">
        <span class="text-red-500 font-bold">*</span>
      </span>
      {{ label }}</label
    >
    <div>
      <div class="relative">
        <div class="flex items-center justify-center w-full">
          <label
            :class="{
              'border-red-500 ': !!errorMessage,
              'border-gray-700': !!!errorMessage,
              'is-disabled bg-gray-400 cursor-not-allowed': disabled,
            }"
            class="flex flex-col rounded border-2 border-dashed w-full h-60 p-10 group text-center group"
          >
            <div
              v-if="!!inputValue"
              class="h-full w-full text-center flex flex-col items-center justify-center group-hover:bg-grey-500"
            >
              <FileTextIcon
                class="has-mask w-4/5 h-4/5 object-center p-1 group-hover:hidden text-green-700"
              />
              <FileMinusIcon
                class="has-mask w-4/5 h-4/5 object-center p-1 hidden group-hover:block text-red-700 cursor-pointer"
                @click="resetField()"
              />
              <p class="pointer-none group-hover:hidden">
                <span class="text-sm">{{ check(inputValue) }}</span>
              </p>
            </div>
            <div
              v-if="!!!inputValue"
              class="h-full w-full text-center flex flex-col items-center justify-center"
            >
              <div class="flex flex-auto max-h-48 w-2/5 mx-auto">
                <!-- <img class="has-mask h-36 object-center p-1" src="https://img.freepik.com/free-vector/image-upload-concept-landing-page_52683-27130.jpg?size=338&amp;ext=jpg" alt="freepik image"> -->

                <!-- <BaseIcon
                  :path="mdiFileUpload"
                  w="w-4/5"
                  h="h-4/5"
                  size="100"
                  class="has-mask h-36 object-center p-1"
                /> -->
                <FilePlusIcon class="has-mask w-4/5 h-4/5 object-center p-1" />
              </div>
              <p class="pointer-none">
                <span class="text-sm">Drag and drop</span> files here <br />
                or
                <a class="text-blue-600 hover:underline cursor-pointer"
                  >select a file</a
                >
                from your computer
              </p>
            </div>
            <input
              v-if="!!!inputValue && !disabled"
              :id="name"
              :name="name"
              type="file"
              class="hidden"
              @change="handleChange"
              @blur="handleBlur"
            />
          </label>
        </div>
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

<style lang="scss"></style>
