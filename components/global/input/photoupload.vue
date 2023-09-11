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
    default: 'material-symbols:add-photo-alternate-outline-sharp',
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
    <div class="my-3 first:mt-0 last:mb-0 w-full relative" :class="{ success: meta.valid, 'inline-flex items-center': inline }">
    <label
      v-if="label"
      :for="name"
      class="block font-bold mb-2 w-40"
      :class="{
        'text-red-500 font-medium': !!errorMessage,
        'inline-block mr-2': inline,
      }"
    >
      <span v-if="primary">
        <span class="text-red-500 font-bold">*</span>
      </span>
      {{ label }}</label
    >
    <div class="h-80 p-2 relative w-full">
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
            class="w-full h-full flex-col justify-center items-center gap-4 flex cursor-pointer group hover:bg-red-700 rounded-[10px] relative"
          >
            <div
              class="self-stretch h-[94px] flex-col justify-center items-center relative hidden group-hover:flex"
            >
              <div
                class="w-10 h-10 p-2.5 group-hover:block group-hover:bg-red-950 rounded-lg shadow border border-gray-200 justify-center items-center inline-flex hidden"
              >
                <Icon name="mdi:file-remove-outline" class="w-5 h-5 relative flex-col justify-center items-start hidden group-hover:block text-white"/>
              </div>
              <div
                class="self-stretch h-full flex-col justify-center items-center gap-1 flex"
              >
                <div
                  class="self-stretch text-center text-slate-600 text-xs font-normal leading-[18px]"
                >
                  <span class="text-sm group-hover:hidden font-bold">{{ check(inputValue) }}</span>
                  <span class="text-xl hidden group-hover:block text-white">Click to delete existing file!</span>
                </div>
              </div>
            </div>
            <div
              class="self-stretch h-full flex-col justify-center items-center flex relative group-hover:hidden"
            >
                <img v-if="!image_error" class="w-full h-full rounded-[10px]" :src="`${inputValue}`" alt="Red dot" @error="image_error = true" />
                <Vue3Lottie
                  v-if="image_error"
                  animationLink="/animation/animation_failed_load_image.json"
                  :height="500"
                  :width="500"
                  :loop="false"
                 />
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
                <Icon :name="icon" class="w-5 h-5 relative flex-col justify-start items-start flex"/>
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
      class="text-xs text-red-500 dark:text-red-500 mt-1 absolute -bottom-3 right-0"
    >
      {{ errorMessage }}
    </div>
  </div>
</template>

<style lang="scss"></style>
