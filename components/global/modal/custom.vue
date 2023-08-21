<template>
  <div class="fixed z-10 inset-0 overflow-y-auto" :class="{ 'hidden': !isOpen }">
    <div class="flex items-center justify-center min-h-screen">
      <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" @click="close"></div>

      <div class="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all max-w-lg w-full" role="dialog" aria-modal="true" :aria-labelledby="title">
        <div class="bg-gray-50 px-4 py-3 border-b border-gray-200 flex justify-between items-center">
          <h2 class="text-lg font-medium text-gray-900" :id="title">{{ title }}</h2>
          <button class="text-gray-500 hover:text-gray-700 focus:outline-none focus:text-gray-700" @click="close">
            <span class="sr-only">Close</span>
            <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div class="px-4 py-5 sm:p-6">
          <slot></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'


const props = defineProps({
  isOpen: {
    type: Boolean,
  },
  title: {
    type: String,
  },
});

// export default {
//   props: {
//     isOpen: {
//       type: Boolean,
//       required: true
//     },
//     title: {
//       type: String,
//       required: true
//     }
//   },
//   emits: ['close'],
//   setup(props, { emit }) {
//     const close = () => {
//       emit('close')
//     }

//     return {
//       close
//     }
//   }
// }
</script>

<style scoped>
/* Add your custom styles here */
</style>
