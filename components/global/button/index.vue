<template>
  <ClientOnly>
    <button
      :class="{
        [`${props.class}`] : true,
        'cursor-not-allowed opacity-50' : !!isLoading,
      }"
      :style="props.style"
      :type="props.type"
      :disabled="isLoading"
    >
      <slot v-if="!!!isLoading"></slot>
      <span v-if="!!isLoading"><Icon name="eos-icons:hourglass" /> Loading...</span>
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
  class: {
    type: String,
    default: "btn",
  },
  style: {
    type: Object,
    default: () => {},
  },
  type: {
    type: String,
    default: "button",
  },
});

const isLoading = computed(() => authStore.isLoading);
// const isLoading = computed(() => true);
</script>
