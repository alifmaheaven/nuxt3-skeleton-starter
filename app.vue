<script setup>
// import
// import { ref } from "vue";
import { useLayout } from "@/stores/layout";

// define
const layoutStore = useLayout();

// data

// methods
</script>

<template>
  <div :class="layoutStore.theme">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>
