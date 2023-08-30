<script setup>
// layout

// import
const { $api } = useNuxtApp();
import { ref, computed } from "vue";

// define

const route = useRoute()

console.log(route.href);

// data

const menu_sidebar = ref([
  {
    name: "Beranda",
    icon: "ri:home-6-line",
    link: "/",
    sub_menu: [
      {
        name: "Overview",
        link: "/",
      },
      {
        name: "Notifikasi",
        link: "/notification",
        label: "10",
      },
    ],
  },
  {
    name: "Tanda Tangan",
    icon: "material-symbols:layers-outline-rounded",
    link: "/tanda-tangan",
    sub_menu: [
      {
        name: "Tanda Tangan Individu",
        link: "/",
      },
      {
        name: "Tanda Tangan Kelompok",
        link: "/",
      },
    ],
  },
  {
    name: "Pengaturan",
    icon: "mdi:account-multiple-outline",
    link: "/pengaturan",
    sub_menu: [
      {
        name: "Pengaturan Akun",
        link: "/",
      },
      {
        name: "Pengaturan Aplikasi",
        link: "/",
      },
    ],
  },
]);

const sub_menu = computed(() => {
  return menu_sidebar.value.find((item) => item.link === route.href);
});

// methods
</script>

<template>
  <!-- component -->
  <div class="flex">
    <!-- add minimize class to body tag -->
    <!-- want to open give it expand -->
    <aside class="group sidebar sticky ">
      <div class="grid grid-cols-12 gap-1 h-full">
        <div
          class="col-span-3 mini-sidebar h-full border-r border-gray-200 flex-col justify-between inline-flex"
        >
          <div class="upper-menu">
            <ul>
              <li class="my-5 flex justify-center">
                <nuxt-img src="/images/logo.png" />
              </li>
              <li v-for="(value_of_menu_sidebar) in menu_sidebar" class="my-4 flex justify-center">
                <nuxt-link
                  :to="value_of_menu_sidebar.link"
                  class="w-12 h-12 p-3 rounded-md justify-start items-start gap-2 inline-flex"
                >
                  <Icon :name="value_of_menu_sidebar.icon" class="w-6 h-6 relative" />
                </nuxt-link>
              </li>
            </ul>
          </div>
          <div
            class="lower-menu w-full h-32 px-4 pb-6 flex-col justify-center items-center gap-6 inline-flex"
          >
            <div
              class="self-stretch h-12 flex-col justify-start items-start gap-2 flex"
            >
              <div
                class="p-3 bg-white rounded-md justify-start items-start gap-2 inline-flex"
              >
                <div class="w-6 h-6 relative">
                  <Icon name="mdi:cog-outline" class="w-6 h-6 relative" />
                </div>
              </div>
            </div>
            <div class="w-8 h-8 relative bg-gray-100 rounded-[200px]">
              <div
                class="w-8 h-8 left-0 top-0 absolute opacity-10 rounded-[200px] border border-gray-900"
              ></div>
              <div
                class="w-8 left-0 top-[6px] absolute text-center text-slate-600 text-sm font-semibold leading-tight"
              >
                AF
              </div>
            </div>
          </div>
        </div>
        <div class="col-span-9 expand-sidebar">
          <div
            class="w-full h-full bg-white flex-col justify-between items-start gap-4 inline-flex"
          >
            <div
              class="self-stretch h-40 px-4 pt-9 flex-col justify-start items-start gap-4 flex"
            >
              <div
                class="self-stretch text-gray-900 text-base font-medium leading-normal"
              >
                {{ sub_menu.name }}
              </div>
              <div
                class="self-stretch h-[84px] flex-col justify-start items-start gap-1 flex"
              >
                <nuxt-link
                  v-for="(value_of_sub_menu_sidebar) in sub_menu.sub_menu"
                  :to="value_of_sub_menu_sidebar.link"
                  class="self-stretch px-3 py-2 bg-white rounded-md justify-start items-center gap-2 inline-flex"
                >
                  <div
                    class="grow shrink basis-0 h-6 justify-start items-center gap-3 flex"
                  >
                    <div class="w-6 h-6 relative"></div>
                    <div
                      class="text-slate-700 text-base font-semibold leading-normal"
                    >
                      {{ value_of_sub_menu_sidebar.name }}
                    </div>
                  </div>
                  <div
                    v-if="value_of_sub_menu_sidebar.label"
                    class="px-2 py-0.5 bg-gray-50 rounded-2xl border border-gray-200 justify-start items-center flex"
                  >
                    <div
                      class="text-center text-slate-700 text-xs font-medium leading-[18px]"
                    >
                      {{ value_of_sub_menu_sidebar.label }}
                    </div>
                  </div>
                </nuxt-link>
              </div>
            </div>
            <div
              class="self-stretch h-max py-6 px-3 justify-start items-start gap-1 flex flex-row"
            >
              <div
                class="self-stretch h-11 flex-col justify-start items-start flex"
              >
                <div
                  class="self-stretch text-gray-900 text-base font-normal leading-normal"
                >
                  Ahmad Fauzan
                </div>
                <div
                  class="self-stretch text-slate-600 text-sm font-medium leading-tight"
                >
                  ahmad.fauzan01@sigma.co.id
                </div>
              </div>
              <div
                class="p-2 rounded-lg justify-center items-center gap-2 inline-flex"
              >
                <Icon name="ic:outline-log-out" class="w-7 h-7 relative" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </aside>
    <div class="ml-auto mb-6 w-full">
      <div class="sticky z-10 top-0 h-16 bg-white lg:py-2.5 flex items-center">
        <div
          class="px-6 flex items-center justify-start space-x-4 2xl:container"
        >
          <div class="w-full h-7 justify-start items-center inline-flex">
            <div class="justify-start items-center gap-2 flex">
              <div class="flex flex-row items-center">
                <div class="p-1 rounded-md justify-start items-start flex">
                  <Icon name="ri:home-6-line" class="w-5 h-5 relative" />
                </div>
                <Icon
                  name="material-symbols:arrow-forward-ios"
                  class="w-4 h-4 relative text-slate-500"
                />
                <div
                  class="px-2 py-1 rounded-md justify-center items-center flex"
                >
                  <div class="text-slate-600 text-sm font-medium leading-tight">
                    Overview
                  </div>
                </div>
                <Icon
                  name="material-symbols:arrow-forward-ios"
                  class="w-4 h-4 relative text-slate-500"
                />
                <div
                  class="px-2 py-1 bg-gray-50 rounded-md justify-center items-center flex"
                >
                  <div
                    class="text-slate-700 text-sm font-semibold leading-tight"
                  >
                    Tanda Tangan Individu
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="px-4 pt-4 2xl:container">
        <slot />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.sidebar {
  $parent: &;
  @apply z-10 top-0 px-0 w-full flex flex-col justify-between h-screen border-r bg-white transition duration-300 md:w-4/12;
}

a.active{
  @apply bg-gray-50
}
</style>
