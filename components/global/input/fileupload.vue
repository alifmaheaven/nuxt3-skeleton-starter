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

// data
var log_file = ref([]);
var log_base64 = ref([]);

const toBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      resolve(reader.result);
    };
    reader.onerror = (error) => {
      reject(error);
    };
  });
};

const changeFile = async (event) => {
  if (!!!event.target.files[0]) return;
  let files = event.target.files;
  log_file.value.push(files[0]);
  var base64 = await toBase64(files[0]);
  log_base64.value.push({base64, name: files[0].name});
  handleChange(log_base64.value);
};

const removeFile = (index) => {
  log_base64.value.splice(index, 1);
  log_file.value.splice(index, 1);
  console.log(log_base64.value);
  handleChange(log_base64.value);
};
</script>

<template>
  <div
    class="my-3 first:mt-0 last:mb-0 w-full relative h-full"
    :class="{ success: meta.valid }"
  >
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
          v-if="!!log_file?.length"
          class="w-full h-full flex-col justify-center items-center gap-4 flex rounded-[10px]"
        >
          <div class="grid grid-cols-1 gap-2 relative w-full px-2">
            <div
              v-for="(item, index) in log_file"
              :key="index"
              :class="{ 'border-red-500 ': !!errorMessage }"
              class="bg-white rounded-lg shadow-sm border p-3 inline-flex items-center w-full relative group"
            >
              <div class="grow-0 text-lg font-semibold flex items-center">
                <Icon
                  name="mdi:file-document-outline"
                  class="w-10 h-10 relative"
                />
              </div>
              <div class="grow text-gray-600 p-2 truncate">
                {{ item?.name }}
              </div>
              <div
                class="hidden rounded-lg p-1 group-hover:inline-flex justify-center items-center w-full absolute -top-8"
              >
                <label
                  class="grow-0 bg-white shadow-md text-green-500 p-2 rounded-lg hover:bg-green-500 hover:text-white cursor-pointer"
                >
                  <Icon name="material-symbols:add" class="w-5 h-5 relative" />
                  <input
                    :id="name"
                    :name="name"
                    type="file"
                    class="hidden"
                    @change="changeFile"
                    accept=".pdf"
                  />
                </label>
                <button
                  type="button"
                  class="grow-0 bg-white shadow-md text-red-500 p-2 rounded-lg hover:bg-red-500 hover:text-white"
                  @click="removeFile(index)"
                >
                  <Icon
                    name="material-symbols:delete-outline-rounded"
                    class="w-5 h-5 relative"
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
        <div
          v-if="!!!log_file?.length"
          class="w-full h-full flex-col justify-center items-center gap-4 flex cursor-pointer hover:bg-slate-100 rounded-[10px]"
        >
          <div
            class="self-stretch h-[94px] flex-col justify-start items-center gap-3 flex"
          >
            <div
              class="w-10 h-10 p-2.5 bg-white rounded-lg shadow border border-gray-200 justify-center items-center inline-flex"
            >
              <Icon
                name="ph:cloud-arrow-up-duotone"
                class="w-5 h-5 relative flex-col justify-start items-start flex"
              />
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
                <div class="text-slate-600 text-sm font-normal leading-tight">
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
          v-if="!!!log_file?.length && !disabled"
          :id="name"
          :name="name"
          type="file"
          class="hidden"
          @change="changeFile"
          accept=".pdf"
        />
      </label>
    </div>
    <div
      v-if="!!errorMessage"
      class="text-xs text-red-500 dark:text-red-500 mt-1 absolute -bottom-5 right-0"
    >
      {{ errorMessage }}
    </div>
  </div>
</template>

<style lang="scss"></style>
