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
// const getData = () => {
//   $api.get("/api/v1/test").then((response) => {
//     console.log(response);
//   });
//   authStore.setUserData();
// };
// getData();

const submitLogin = handleSubmit(async (values, { resetForm }) => {
  console.log("ini valuenya", values);
});
</script>

<template>
  <div class="inline-flex min-h-fit max-w-[23rem] items-center justify-center">
    <div
      class="inline-flex shrink grow basis-0 flex-col items-center justify-start rounded-xl border border-slate-200 bg-slate-50 shadow"
    >
      <div
        class="flex h-fit flex-col items-center justify-start gap-4 self-stretch p-6 relative"
      >
        <div class="h-36 w-full relative">
            <div
              class="absolute inline-flex h-48 w-48 items-center justify-center rounded-xl p-3.5 left-0 right-0 -top-7 m-auto bg-transparent"
            >
              <Vue3Lottie
                  animationLink="/animation/think_doubt.json"
                  :height="500"
                  :width="500"
                  :loop="true"
                />
            </div>
        </div>
        <div
          class="flex h-fit flex-col items-start justify-center gap-3 self-stretch"
        >
          <div
            class="flex h-fit flex-col items-start justify-start gap-1 self-stretch"
          >
            <div
              class="self-stretch text-center text-2xl font-semibold leading-loose text-primary"
            >
              Register
            </div>
            <div
              class="self-stretch text-center text-base font-normal leading-normal text-slate-600"
            >
              Mohon daftarkan akun Anda di bawah ini
            </div>
          </div>
        </div>
      </div>
      <form
        class="flex min-h-max flex-col items-center justify-start gap-8 self-stretch border-gray-200 px-10 py-6"
        @submit="submitLogin"
      >
        <div
          class="flex min-h-min flex-col items-start justify-start self-stretch"
        >
          <globalInputText
            icon="icon-park-outline:mail"
            name="username"
            placeholder="Masukkan username"
          />
          <globalInputPassword
            icon="icon-park-outline:lock"
            name="password"
            placeholder="Masukkan password"
          />
        </div>
        <div
          class="flex min-h-min flex-col items-start justify-start gap-3 self-stretch"
        >
          <GlobalButton
            class="self-stretch px-5 py-3 bg-primary rounded-lg shadow hover:shadow-slate-300 border hover:border-primary hover:bg-slate-50 justify-center items-center gap-2 inline-flex text-light hover:text-primary text-base font-semibold leading-normal"
            type="submit"
          >
            Masuk
          </GlobalButton>
        </div>
        <div
          class="flex h-[52px] flex-col items-center justify-start gap-3 self-stretch"
        >
          <div
            class="inline-flex items-center justify-center gap-1 self-stretch"
          >
            <div class="text-sm font-normal leading-tight text-slate-600">
              Sudah memiliki akun ?
            </div>
            <div class="flex items-center justify-center gap-2">
              <NuxtLink
                to="/auth/login"
                class="text-sm font-semibold leading-tight text-primary"
              >
                Login sekarang
              </NuxtLink>
            </div>
          </div>
          <!-- <div class="inline-flex items-start justify-center gap-1">
            <div class="flex items-center justify-center gap-2">
              <NuxtLink
                to="/auth/forgot-password"
                class="text-sm font-semibold leading-tight text-primary"
              >
                Lupa password
              </NuxtLink>
            </div>
          </div> -->
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
