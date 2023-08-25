<template>
  <div class="flex flex-row border border-gray-300 gap-2 bg-white px-3 py-1 items-center rounded-lg">
    <Icon name="ph:magnifying-glass-bold" color="#667085" size="20px" />
    <input type="text" :placeholder="placeholder" class="focus:outline-none focus:ring-0 w-full border-none" />
  </div>
</template>

<script setup>
const props = defineProps(["placeholder"]);
</script>