<template>
  <ClientOnly>
    <button
      :class="{
        [`${props.class} ${props.buttonClass}`]: true,
        'cursor-not-allowed opacity-50': !!isLoading,
      }"
      :style="props.style || props.buttonStyle"
      :type="props.type || props.buttonType"
      :disabled="isLoading"
      @click="$emit('click')"
    >
      <slot v-if="!!!isLoading"></slot>
      <span v-if="!!isLoading"
        ><Icon name="eos-icons:hourglass" /> Loading...</span
      >
    </button>
  </ClientOnly>
</template>

<script setup>
import { computed } from "vue";
import { useAuth } from "@/stores/auth";
const authStore = useAuth();

const props = defineProps({
  class: {
    type: String,
    default: "btn",
  },
  buttonClass: {
    type: String,
    default: "btn",
  },
  style: {
    type: Object,
    default: () => {},
  },
  buttonStyle: {
    type: Object,
    default: () => {},
  },
  type: {
    type: String,
  },
  buttonType: {
    type: String,
    default: "button",
  },
});

const isLoading = computed(() => authStore.isLoading);
// const isLoading = computed(() => true);
</script>
