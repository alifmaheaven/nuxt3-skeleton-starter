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
    default: "material-symbols:add-photo-alternate-outline-sharp",
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

// data
var image_error = ref(false);

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
  var base64 = await toBase64(event.target.files[0]);
  handleChange(base64);
};

const check = (test) => {
  return inputValue.value.name;
};

const resetField = () => {
  inputValue.value = "";
  image_error.value = false;
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
      class="mb-2 block w-40 font-bold"
      :class="{
        'font-medium text-red-500': !!errorMessage,
        'mr-2 inline-block': inline,
      }"
    >
      <span v-if="primary">
        <span class="font-bold text-red-500">*</span>
      </span>
      {{ label }}</label
    >
    <div class="relative h-80 w-full p-2">
      <label
        :class="{
          'border-red-500 ': !!errorMessage,
          'border-gray-700': !!!errorMessage,
          'is-disabled cursor-not-allowed bg-gray-400': disabled,
        }"
        class="flex h-full shrink grow basis-0 flex-col items-center justify-center self-stretch rounded-[10px] border border-gray-200 bg-white"
      >
        <div
          v-if="!!inputValue"
          class="group relative flex h-full w-full cursor-pointer flex-col items-center justify-center gap-4 rounded-[10px] hover:bg-red-700"
          @click="resetField()"
        >
          <div
            class="relative hidden h-[94px] flex-col items-center justify-center self-stretch group-hover:flex"
          >
            <div
              class="inline-flex hidden h-10 w-10 items-center justify-center rounded-lg border border-gray-200 p-2.5 shadow group-hover:block group-hover:bg-red-950"
            >
              <Icon
                name="mdi:file-remove-outline"
                class="relative hidden h-5 w-5 flex-col items-start justify-center text-white group-hover:block"
              />
            </div>
            <div
              class="flex h-full flex-col items-center justify-center gap-1 self-stretch"
            >
              <div
                class="self-stretch text-center text-xs font-normal leading-[18px] text-slate-600"
              >
                <span class="text-sm font-bold group-hover:hidden">{{
                  check(inputValue)
                }}</span>
                <span class="hidden text-xl text-white group-hover:block"
                  >Click to delete existing file!</span
                >
              </div>
            </div>
          </div>
          <div
            class="relative flex h-full flex-col items-center justify-center self-stretch group-hover:hidden"
          >
            <img
              v-if="!image_error"
              class="h-full w-full rounded-[10px]"
              :src="`${inputValue}`"
              alt="Red dot"
              @error="image_error = true"
            />
            <Vue3Lottie
              v-if="image_error"
              animation-link="/animation/animation_failed_load_image.json"
              :height="500"
              :width="500"
              :loop="false"
            />
          </div>
        </div>
        <div
          v-if="!!!inputValue"
          class="flex h-full w-full cursor-pointer flex-col items-center justify-center gap-4 rounded-[10px] hover:bg-slate-100"
        >
          <div
            class="flex h-[94px] flex-col items-center justify-start gap-3 self-stretch"
          >
            <div
              class="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-gray-200 bg-white p-2.5 shadow"
            >
              <Icon
                :name="icon"
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
                JPG & PNG. (max: 10MB)
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
          @change="changeFile"
        />
      </label>
    </div>
    <div
      v-if="!!errorMessage"
      class="absolute -bottom-3 right-0 mt-1 text-xs text-red-500 dark:text-red-500"
    >
      {{ errorMessage }}
    </div>
  </div>
</template>

<style lang="scss"></style>
