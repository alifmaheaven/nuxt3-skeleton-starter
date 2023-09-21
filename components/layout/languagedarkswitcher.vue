
<template>
    <div class="shadow-md absolute bottom-3 right-3 border flex flex-row bg-slate-50 p-1">
    <form class="mr-4">
      <!-- <label for="locale-select" class="mb-2 block font-bold text-gray-700"
        >{{ $t("language") }}:</label
      > -->
      <div class="relative">
        <select
          id="locale-select"
          v-model="localeValue"
          class="focus:shadow-outline-blue block appearance-none rounded border border-gray-400 bg-white dark:bg-gray-800 dark:text-white px-4 py-2 pr-8 leading-tight shadow hover:border-gray-500 focus:border-blue-500 focus:outline-none dark:border-gray-600"
        >
          <option v-for="value in availableLocales" :value="value">{{value}}</option>
        </select>
      </div>
    </form>
    <div class="flex items-center justify-end">
      <button @click="darkMode" class="shadow-sm p-1 bg-white text-black dark:bg-black dark:text-white flex justify-center items-center rounded-full cursor-pointer">
        <Icon name="material-symbols:dark-mode" class="relative h-8 w-8 visible dark:collapse" />
        <Icon name="material-symbols:light-mode" class="relative h-8 w-8 invisible dark:visible" />
      </button>
    </div>
  </div>
</template>

<script setup>
import { useLayout } from "@/stores/layout";
import { useI18n } from 'vue-i18n'


const layoutStore = useLayout();
const { locale, availableLocales } = useI18n()

const localeValue = computed({
  get() {
    return layoutStore.language;
  },
  set(value) {
    locale.value = value;
    layoutStore.languageSwitch(value)
  },
});

const darkMode = () => {
  layoutStore.thameSwitch()
}

</script>