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
  // showError({
  //   statusCode: 404,
  //   statusMessage: "Page Not Found"
  // })
});
</script>

<template>
  <div class="inline-flex min-h-max max-w-[23rem] items-center justify-center">
    <div
      class="inline-flex shrink grow basis-0 flex-col items-center justify-start rounded-xl border border-slate-200 bg-slate-50 shadow"
    >
      <div
        class="relative flex h-fit flex-col items-center justify-start gap-4 self-stretch p-6"
      >
        <div class="relative h-36 w-full">
          <div
            class="absolute -top-7 left-0 right-0 m-auto inline-flex h-48 w-48 items-center justify-center rounded-xl bg-transparent p-3.5"
          >
            <ClientOnly>
              <Vue3Lottie
                animation-link="/animation/think_doubt.json"
                :height="500"
                :width="500"
                :loop="true"
              />
            </ClientOnly>
          </div>
        </div>
        <div
          class="flex h-fit flex-col items-start justify-center gap-3 self-stretch"
        >
          <div
            class="flex h-fit flex-col items-start justify-start gap-1 self-stretch"
          >
            <div
              class="text-primary self-stretch text-center text-2xl font-semibold leading-loose"
            >
              Login
            </div>
            <div
              class="self-stretch text-center text-base font-normal leading-normal text-slate-600 font-inter"
            >
              Mohon masukkan kredensial Anda di bawah ini
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
            class="bg-primary-500 hover:border-primary hover:text-primary inline-flex items-center justify-center gap-2 self-stretch rounded-lg border px-5 py-3 text-base font-semibold leading-normal text-light shadow hover:bg-slate-50 hover:shadow-slate-300"
            type="submit"
          >
            Masuk
          </GlobalButton>
        </div>
        <Icon name="i-octicon-logo-github-16" />
        <Icon name="octicon:logo-github-16" />
        <UDivider icon="i-octicon-logo-github-16" />
        <UButton
          icon="i-heroicons-battery-50-20-solid"
          size="sm"
          color="primary"
          variant="solid"
          label="Button"
          :trailing="false"
        />

        <div
          class="flex h-[52px] flex-col items-center justify-start gap-3 self-stretch"
        >
          <div
            class="inline-flex items-center justify-center gap-1 self-stretch"
          >
            <div class="text-sm font-normal leading-tight text-slate-600">
              Belum memiliki akun?
            </div>
            <div class="flex items-center justify-center gap-2">
              <NuxtLink
                to="/auth/register"
                class="text-primary text-sm font-semibold leading-tight"
              >
                Daftar sekarang
              </NuxtLink>
            </div>
          </div>
          <div class="inline-flex items-start justify-center gap-1">
            <div class="flex items-center justify-center gap-2">
              <NuxtLink
                to="/auth/forgot-password"
                class="text-primary text-sm font-semibold leading-tight"
              >
                Lupa password
              </NuxtLink>
            </div>
          </div>
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
