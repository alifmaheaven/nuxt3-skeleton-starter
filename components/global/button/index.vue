<template>
  <ClientOnly>
    <button
      :class="[buttonClass]"
      :style="buttonStyle"
      :type="buttonType"
      :disabled="isLoading"
    >
      <slot v-if="!!!isLoading"></slot>
      <span v-if="!!isLoading">Loading...</span>
      <!-- <LoadingIcon
      v-if="!!isLoading"
      icon="spinning-circles"
      class="w-4 h-4 ml-2"
    /> -->
    </button>
  </ClientOnly>
</template>

<script setup>
import { computed } from "vue";
import { useAuth } from "@/stores/auth";
const authStore = useAuth();

const props = defineProps({
  buttonClass: {
    type: String,
    default: "btn",
  },
  buttonStyle: {
    type: Object,
    default: () => {},
  },
  buttonType: {
    type: String,
    default: "button",
  },
});

const isLoading = computed(() => authStore.isLoading);
</script>
