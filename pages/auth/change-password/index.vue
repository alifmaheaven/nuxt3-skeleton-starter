<script setup>
// layout
definePageMeta({
  layout: "default",
  middleware: [
    function (to, from) {
      // Custom inline middleware
    },
    "auth",
  ],
});

// import
const { $api } = useNuxtApp();
import { ref, computed } from "vue";
import { useLayout } from "@/stores/layout";
import { useAuth } from "@/stores/auth";
import { useForm } from "vee-validate";
import * as yup from "yup";
// define
const layoutStore = useLayout();
const layout = computed(() => layoutStore.layout);

const authStore = useAuth();
const auth = computed(() => authStore.auth);

const validationSchema = yup.object({
  username: yup.string().required().label("Username"),
  password: yup.string().required().label("Password"),
});
const { handleSubmit, resetForm, setValues } = useForm({
  initialValues: {
    username: "",
    password: "",
  },
  validationSchema: validationSchema,
});

// data

// methods
const getData = () => {
  $api.get("/api/v1/test").then((response) => {
    console.log(response);
  });
  authStore.setUserData();
};
getData();

const submitLogin = handleSubmit(async (values, { resetForm }) => {
  console.log("ini valuenya", values);
});
</script>

<template>
  <div class="inline-flex min-h-max min-w-max items-center justify-center">
    <div
      class="inline-flex shrink grow basis-0 flex-col items-center justify-start rounded-xl border border-gray-200 bg-gray-50 shadow"
    >
      <div
        class="flex h-[180px] flex-col items-center justify-start gap-4 self-stretch p-6"
      >
        <div
          class="inline-flex h-14 w-14 items-center justify-center rounded-xl border border-gray-200 bg-white p-3.5 shadow"
        >
          <Icon
            name="ic:outline-log-in"
            class="relative flex h-7 w-7 flex-col items-start justify-start"
          />
        </div>
        <div
          class="flex h-[60px] flex-col items-start justify-center gap-3 self-stretch"
        >
          <div
            class="flex h-[60px] flex-col items-start justify-start gap-1 self-stretch"
          >
            <div
              class="self-stretch text-center text-2xl font-semibold leading-loose text-gray-900"
            >
              Buat Password Baru!
            </div>
            <div
              class="w-96 text-center text-base font-normal leading-normal text-slate-600"
            >
              Pastikan password memiliki minimal 8 karakter yang terdiri dari
              huruf besar, huruf kecil, angka, dan karakter khusus
            </div>
          </div>
        </div>
      </div>
      <form
        class="flex min-h-max flex-col items-center justify-start gap-8 self-stretch border-gray-200 px-20 py-12"
        @submit="submitLogin"
      >
        <div
          class="flex min-h-min flex-col items-start justify-start self-stretch"
        >
          <globalInputPassword
            icon="icon-park-outline:lock"
            name="password"
            placeholder="Masukkan Password Baru"
          />
          <globalInputPassword
            icon="icon-park-outline:lock"
            name="password"
            placeholder="Konfirmasi Password Baru"
          />
        </div>
        <div
          class="flex min-h-min flex-col items-start justify-start gap-3 self-stretch"
        >
          <GlobalButton
            class="inline-flex items-center justify-center gap-2 self-stretch rounded-lg border border-gray-600 bg-gray-600 px-5 py-3 text-base font-semibold leading-normal text-white shadow"
            type="submit"
          >
            Masuk
          </GlobalButton>
        </div>
      </form>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.badge {
  @apply inline-block rounded-full bg-gray-200 px-3 py-1 text-sm font-semibold text-gray-700;
  &:hover {
    @apply bg-gray-300;
  }
}
</style>
