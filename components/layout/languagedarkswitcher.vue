<template>
  <div
    class="fixed bottom-3 right-3 flex flex-row rounded-full border border-slate-500 bg-slate-400 p-1 shadow-md"
  >
    <form class="mr-4">
      <!-- <label for="locale-select" class="mb-2 block font-bold text-gray-700"
        >{{ $t("language") }}:</label
      > -->
      <div class="relative">
        <select
          id="locale-select"
          v-model="localeValue"
          class="focus:shadow-outline-blue block cursor-pointer appearance-none rounded-full border border-gray-400 bg-white px-4 py-2 pr-8 leading-tight shadow hover:border-gray-500 focus:border-blue-500 focus:outline-none dark:border-gray-600 dark:bg-gray-800 dark:text-white"
        >
          <option
            v-for="value in availableLocales"
            class="cursor-pointer"
            :value="value"
          >
            {{ value }}
          </option>
        </select>
      </div>
    </form>
    <div class="flex items-center justify-end">
      <button
        id="btn-dark-mode"
        class="flex cursor-pointer items-center justify-center rounded-full bg-white p-1 text-black shadow-sm dark:bg-black dark:text-white"
        @click="darkMode()"
      >
        <Icon
          name="material-symbols:dark-mode"
          class="visible relative h-8 w-8 dark:collapse"
        />
        <Icon
          name="material-symbols:light-mode"
          class="invisible relative h-8 w-8 dark:visible"
        />
      </button>
    </div>
  </div>
</template>

<script setup>
const { $api, $i18n } = useNuxtApp();
import { useLayout } from "@/stores/layout";

const layoutStore = useLayout();
const { locale, availableLocales } = $i18n.useI18n();

const localeValue = computed({
  get() {
    return layoutStore.language;
  },
  set(value) {
    locale.value = value;
    layoutStore.languageSwitch(value);
  },
});

const darkMode = () => {
  layoutStore.thameSwitch();
};

onMounted(() => {
  document.documentElement.classList = `${layoutStore.theme}`;
  document.body.classList = `bg-light`;
  document
    .getElementById("btn-dark-mode")
    .addEventListener("click", function () {
      document.documentElement.classList = `${layoutStore.theme}`;
    });
});
</script>
