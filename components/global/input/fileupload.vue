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
  icon: {
    type: String,
    default: "mdi:file-document-outline",
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
  accept: {
    type: String,
    default: ".pdf",
  },
  comment: {
    type: String,
    default: "PDF, DOC, DOCX. (max: 10MB)",
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
  if (!event.target.files[0]) return;
  let files = event.target.files;
  log_file.value.push(files[0]);
  var base64 = await toBase64(files[0]);
  handleChange(log_base64.value);
};

const removeFile = (index) => {
  log_base64.value.splice(index, 1);
  log_file.value.splice(index, 1);
  handleChange(log_base64.value);
};
</script>

<template>
  <div
    class="relative my-3 h-full w-full first:mt-0 last:mb-0"
    :class="{ success: meta.valid }"
  >
    <label
      v-if="label"
      :for="name"
      class="mb-2 block"
      :class="{
        'text-red-500': !!errorMessage,
      }"
    >
      <span v-if="primary">
        <span class="font-bold text-red-500">*</span>
      </span>
      {{ label }}</label
    >
    <div class="h-full">
      <label
        :class="{
          'border-red-500 ': !!errorMessage,
          'border-gray-300': !!!errorMessage,
          'is-disabled cursor-not-allowed bg-gray-400': disabled,
        }"
        class="flex h-full shrink grow basis-0 flex-col items-center justify-center self-stretch rounded-[10px] border border-gray-200 bg-white"
      >
        <div
          v-if="!!log_file?.length"
          class="flex h-full w-full flex-col items-center justify-center gap-4 rounded-[10px]"
        >
          <div class="relative grid w-full grid-cols-1 gap-2 px-2">
            <div
              v-for="(item, index) in log_file"
              :key="index"
              :class="{ 'border-red-500 ': !!errorMessage }"
              class="group relative inline-flex w-full items-center rounded-lg border bg-white p-3 shadow-sm"
            >
              <div class="flex grow-0 items-center text-lg font-semibold">
                <Icon :name="icon" class="relative h-10 w-10" />
              </div>
              <div class="grow truncate p-2 text-gray-600">
                {{ item?.name }}
              </div>
              <div
                class="absolute -top-8 hidden w-full items-center justify-center rounded-lg p-1 group-hover:inline-flex"
              >
                <label
                  class="grow-0 cursor-pointer rounded-lg bg-white p-2 text-green-500 shadow-md hover:bg-green-500 hover:text-white"
                >
                  <Icon name="material-symbols:add" class="relative h-5 w-5" />
                  <input
                    :id="name"
                    :name="name"
                    type="file"
                    class="hidden"
                    :accept="accept"
                    @change="changeFile"
                  />
                </label>
                <button
                  type="button"
                  class="grow-0 rounded-lg bg-white p-2 text-red-500 shadow-md hover:bg-red-500 hover:text-white"
                  @click="removeFile(index)"
                >
                  <Icon
                    name="material-symbols:delete-outline-rounded"
                    class="relative h-5 w-5"
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
        <div
          v-if="!!!log_file?.length"
          class="flex h-full w-full cursor-pointer flex-col items-center justify-center gap-4 rounded-[10px] hover:bg-slate-100"
        >
          <div
            class="flex h-[94px] flex-col items-center justify-start gap-3 self-stretch"
          >
            <div
              class="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-gray-200 bg-white p-2.5 shadow"
            >
              <Icon
                name="ph:cloud-arrow-up-duotone"
                class="relative flex h-5 w-5 flex-col items-start justify-start"
              />
            </div>
            <div
              class="flex h-[42px] flex-col items-center justify-start gap-1 self-stretch"
            >
              <div
                class="inline-flex items-start justify-center gap-1 self-stretch"
              >
                <div class="flex items-center justify-center gap-2">
                  <div
                    class="text-sm font-semibold leading-tight text-gray-700"
                  >
                    Klik untuk unggah
                  </div>
                </div>
                <div class="text-sm font-normal leading-tight text-slate-600">
                  atau drag & drop
                </div>
              </div>
              <div
                class="self-stretch text-center text-xs font-normal leading-[18px] text-slate-600"
              >
                {{ comment }}
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
          :accept="accept"
          @change="changeFile"
        />
      </label>
    </div>
    <div
      v-if="!!errorMessage"
      class="absolute -bottom-5 right-0 mt-1 text-xs text-red-500 dark:text-red-500"
    >
      {{ errorMessage }}
    </div>
  </div>
</template>

<style lang="scss"></style>
