<template>
  <div>
    <vue-recaptcha
      ref="recaptcha"
      @verify="onCaptchaVerified"
      :sitekey="RECAPTCHA_SITE_KEY"
      :theme="darkMode ? 'dark' : 'light'"
      :class="{
        'border-red-500 text-red-500' : !!errorMessage,
      }"
    />
    <div v-if="!!errorMessage" class="text-xs text-red-500 dark:text-red-500 mt-1">
      {{ errorMessage }}
    </div>
    <!-- <span v-show="errors.has('recaptcha')">{{ errors.first('recaptcha') }}</span> -->
  </div>
</template>

<script setup>
import { VueRecaptcha } from 'vue-recaptcha'
import { useField } from 'vee-validate'
import { computed, toRef, useSlots, ref } from 'vue';
// import { useDarkModeStore } from "@/stores/dark-mode";

// const darkModeStore = useDarkModeStore();
// const darkMode = computed(() => darkModeStore.darkMode);
var darkMode = ref(false);

// const props = defineProps({
//   siteKey: {
//     type: String,
//     required: true
//   }
// });

var RECAPTCHA_SITE_KEY = ref('6LcChbImAAAAAJd9r3XdlH4YXtDAESI7m8FXU22Q');

const { value: recaptchaResponse,handleChange, errorMessage, meta } = useField(
  'recaptcha',
  '',
  value => value !== ''
)

const onCaptchaVerified = response => {
  handleChange(response)
  // recaptchaResponse.value = response
  // validate()
  // emit('verified', response)
}
</script>