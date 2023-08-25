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
    required: false,
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
  <div class="mb-6 last:mb-0 w-full h-full" :class="{ success: meta.valid }">
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
    <div class="h-full">
        <label
          :class="{
              'border-red-500 ': !!errorMessage,
              'border-gray-700': !!!errorMessage,
              'is-disabled bg-gray-400 cursor-not-allowed': disabled,
          }"
          class="h-full self-stretch grow shrink basis-0 bg-white rounded-[10px] border border-gray-200 flex-col justify-center items-center flex"
        >
        <div
            v-if="!!inputValue"
            @click="resetField()"
            class="w-full h-full flex-col justify-center items-center gap-4 flex cursor-pointer group hover:bg-red-700 rounded-[10px]"
          >
            <div
              class="self-stretch h-[94px] flex-col justify-start items-center gap-3 flex"
            >
              <div
                class="w-10 h-10 p-2.5 bg-white group-hover:hidden rounded-lg shadow border border-gray-200 justify-center items-center inline-flex"
              >
                <Icon name="mdi:file-document-outline" class="w-5 h-5 relative flex-col justify-start items-start block group-hover:hidden"/>
              </div>
              <div
                class="w-10 h-10 p-2.5 bg-white group-hover:block group-hover:bg-red-950 rounded-lg shadow border border-gray-200 justify-center items-center inline-flex hidden"
              >
                <Icon name="mdi:file-remove-outline" class="w-5 h-5 relative flex-col justify-start items-start hidden group-hover:block text-white"/>
              </div>
              <div
                class="self-stretch h-[42px] flex-col justify-start items-center gap-1 flex"
              >
                <div
                  class="self-stretch text-center text-slate-600 text-xs font-normal leading-[18px]"
                >
                  <span class="text-sm group-hover:hidden font-bold">{{ check(inputValue) }}</span>
                  <span class="text-xl hidden group-hover:block text-white">Click to delete existing file!</span>
                </div>
              </div>
            </div>
          </div>
          <div
            v-if="!!!inputValue"
            class="w-full h-full flex-col justify-center items-center gap-4 flex cursor-pointer hover:bg-slate-100 rounded-[10px]"
          >
            <div
              class="self-stretch h-[94px] flex-col justify-start items-center gap-3 flex"
            >
              <div
                class="w-10 h-10 p-2.5 bg-white rounded-lg shadow border border-gray-200 justify-center items-center inline-flex"
              >
                <Icon name="ph:cloud-arrow-up-duotone" class="w-5 h-5 relative flex-col justify-start items-start flex"/>
              </div>
              <div
                class="self-stretch h-[42px] flex-col justify-start items-center gap-1 flex"
              >
                <div
                  class="self-stretch justify-center items-start gap-1 inline-flex"
                >
                  <div class="justify-center items-center gap-2 flex">
                    <div
                      class="text-gray-700 text-sm font-semibold leading-tight"
                    >
                      Klik untuk unggah
                    </div>
                  </div>
                  <div
                    class="text-slate-600 text-sm font-normal leading-tight"
                  >
                    atau drag & drop
                  </div>
                </div>
                <div
                  class="self-stretch text-center text-slate-600 text-xs font-normal leading-[18px]"
                >
                  PDF, DOC, DOCX. (max: 10MB)
                </div>
              </div>
            </div>
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
        <!-- <div class="flex items-center justify-center w-full">
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
          </label>
        </div> -->
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
