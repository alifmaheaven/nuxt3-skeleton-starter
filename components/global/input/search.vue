<template>
  <div
    class="flex flex-row items-center gap-2 rounded-lg border border-gray-300 bg-white px-3 py-1"
  >
    <Icon name="ph:magnifying-glass-bold" color="#667085" size="20px" />
    <input
      type="text"
      :placeholder="placeholder"
      class="w-full border-none focus:outline-none focus:ring-0"
    />
  </div>
</template>

<script setup>
const props = defineProps(["placeholder"]);
</script>
