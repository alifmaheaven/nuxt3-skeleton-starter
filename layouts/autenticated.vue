<script setup>
// layout

// import
const { $api } = useNuxtApp();
import { useAuth } from "@/stores/auth";

// define
const authStore = useAuth();
const router = useRouter();
const route = useRoute();
// const user_data = authStore.getProfile();

const breadcrumbs = computed(() => {
  return router.options.routes
    .filter((value_router) => {
      const current_route = route.path.split("/").filter((x) => x);
      const route_value = value_router.path.split("/").filter((x) => x);
      const isMatched = route_value.every((value_route_value) => {
        if (value_route_value.indexOf(":") > -1) {
          return route.params[
            value_route_value?.split(":")?.[1]?.replace("()", "")
          ];
        } else {
          return current_route.includes(value_route_value);
        }
      });
      return isMatched && value_router.meta && value_router.meta.breadcrumb;
    })
    .sort((a, b) => a.path.length - b.path.length)
    .map((value) => {
      const to_breadcrumbs = {
        path: value.path,
        meta: value.meta,
      };
      Object.keys(route.params).forEach((key) => {
        to_breadcrumbs.path = to_breadcrumbs.path.replace(
          `:${key}()`,
          route.params[key],
        );
      });
      return to_breadcrumbs;
    });
});

// tiap page kasih parameter breadcrumb. contoh :
// definePageMeta({
//   layout: "autentication",
//   // middleware: ["auth"],
//   breadcrumb: {
//     text: "Kesesuaian Pengisian",
//     href: "/risk-function/performance-review/personnel-rm-admin/kesesuaian-pengisian-risk-register",
//   },
// });

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
    <aside class="sidebar group sticky">
      <div class="grid h-full grid-cols-12 gap-1">
        <div
          class="mini-sidebar col-span-3 inline-flex h-full flex-col justify-between border-r border-gray-200"
        >
          <div class="upper-menu">
            <ul>
              <li class="my-5 flex justify-center">
                <nuxt-img src="/images/logo.png" />
              </li>
              <li
                v-for="value_of_menu_sidebar in menu_sidebar"
                class="my-4 flex justify-center"
              >
                <nuxt-link
                  :to="value_of_menu_sidebar?.link"
                  class="inline-flex h-12 w-12 items-start justify-start gap-2 rounded-md p-3"
                >
                  <Icon
                    :name="value_of_menu_sidebar?.icon"
                    class="relative h-6 w-6"
                  />
                </nuxt-link>
              </li>
            </ul>
          </div>
          <div
            class="lower-menu inline-flex h-32 w-full flex-col items-center justify-center gap-6 px-4 pb-6"
          >
            <div
              class="flex h-12 flex-col items-start justify-start gap-2 self-stretch"
            >
              <div
                class="inline-flex items-start justify-start gap-2 rounded-md bg-white p-3"
              >
                <div class="relative h-6 w-6">
                  <Icon name="mdi:cog-outline" class="relative h-6 w-6" />
                </div>
              </div>
            </div>
            <div class="relative h-8 w-8 rounded-[200px] bg-gray-100">
              <div
                class="absolute left-0 top-0 h-8 w-8 rounded-[200px] border border-gray-900 opacity-10"
              ></div>
              <div
                class="absolute left-0 top-[6px] w-8 text-center text-sm font-semibold leading-tight text-slate-600"
              >
                AF
              </div>
            </div>
          </div>
        </div>
        <div class="expand-sidebar col-span-9">
          <div
            class="inline-flex h-full w-full flex-col items-start justify-between gap-4 bg-white"
          >
            <div
              class="flex h-40 flex-col items-start justify-start gap-4 self-stretch px-4 pt-9"
            >
              <div
                class="self-stretch text-base font-medium leading-normal text-gray-900"
              >
                {{ sub_menu?.name }}
              </div>
              <div
                class="flex h-[84px] flex-col items-start justify-start gap-1 self-stretch"
              >
                <nuxt-link
                  v-for="value_of_sub_menu_sidebar in sub_menu?.sub_menu"
                  :to="value_of_sub_menu_sidebar?.link"
                  class="inline-flex items-center justify-start gap-2 self-stretch rounded-md bg-white px-3 py-2"
                >
                  <div
                    class="flex h-6 shrink grow basis-0 items-center justify-start gap-3"
                  >
                    <div class="relative h-6 w-6"></div>
                    <div
                      class="text-base font-semibold leading-normal text-slate-700"
                    >
                      {{ value_of_sub_menu_sidebar?.name }}
                    </div>
                  </div>
                  <div
                    v-if="value_of_sub_menu_sidebar?.label"
                    class="flex items-center justify-start rounded-2xl border border-gray-200 bg-gray-50 px-2 py-0.5"
                  >
                    <div
                      class="text-center text-xs font-medium leading-[18px] text-slate-700"
                    >
                      {{ value_of_sub_menu_sidebar?.label }}
                    </div>
                  </div>
                </nuxt-link>
              </div>
            </div>
            <div
              class="flex h-max flex-row items-start justify-start gap-1 self-stretch px-3 py-6"
            >
              <div
                class="flex h-11 flex-col items-start justify-start self-stretch"
              >
                <div
                  class="self-stretch text-base font-normal leading-normal text-gray-900"
                >
                  Ahmad Fauzan
                </div>
                <div
                  class="self-stretch text-sm font-medium leading-tight text-slate-600"
                >
                  ahmad.fauzan01@sigma.co.id
                </div>
              </div>
              <div
                class="inline-flex items-center justify-center gap-2 rounded-lg p-2"
              >
                <Icon name="ic:outline-log-out" class="relative h-7 w-7" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </aside>
    <div class="mb-6 ml-auto w-full">
      <div class="sticky top-0 z-10 flex h-16 items-center bg-white lg:py-2.5">
        <div
          class="flex items-center justify-start space-x-4 px-6 2xl:container"
        >
          <div class="inline-flex h-7 w-full items-center justify-start">
            <div class="flex items-center justify-start gap-2">
              <template
                v-for="(value_breadcrumbs, index_breadcrumbs) in breadcrumbs"
                :key="index_breadcrumbs"
              >
                <div
                  class="inline-flex items-start justify-start rounded-md px-2 py-1"
                >
                  <NuxtLink
                    :to="value_breadcrumbs.path"
                    class="font-montserrat text-sm font-semibold leading-tight text-slate-700"
                    :class="{
                      'font-montserrat cursor-pointer text-sm font-normal text-slate-400':
                        index_breadcrumbs != breadcrumbs.length - 1,
                    }"
                  >
                    <!-- <Icon
                      name="material-symbols:arrow-forward-ios"
                      class="w-4 h-4 relative text-slate-500"
                    />  -->
                    {{
                      value_breadcrumbs?.meta?.breadcrumb?.text ||
                      value_breadcrumbs?.meta?.breadcrumb?.value ||
                      value_breadcrumbs?.meta?.breadcrumb
                    }}
                  </NuxtLink>
                </div>
                <Icon
                  v-if="index_breadcrumbs < breadcrumbs.length - 1"
                  name="material-symbols:arrow-forward-ios"
                  class="relative h-4 w-4 text-slate-500"
                />
              </template>
            </div>
          </div>
        </div>
      </div>

      <div class="px-4 pt-4 2xl:container">
        <slot />
      </div>
    </div>
  </div>
  <LayoutLanguagedarkswitcher />
</template>

<style lang="scss" scoped>
.sidebar {
  $parent: &;
  @apply top-0 z-10 flex h-screen w-full flex-col justify-between border-r bg-white px-0 transition duration-300 md:w-4/12;
}

a.active {
  @apply bg-gray-50;
}
</style>
