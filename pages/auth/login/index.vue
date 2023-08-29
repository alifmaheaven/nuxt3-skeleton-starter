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
  <div class="min-w-max min-h-max justify-center items-center inline-flex">
    <div
      class="grow shrink basis-0 bg-gray-50 rounded-xl shadow border border-gray-200 flex-col justify-start items-center inline-flex"
    >
      <div
        class="self-stretch h-[180px] p-6 flex-col justify-start items-center gap-4 flex"
      >
        <div
          class="w-14 h-14 p-3.5 bg-white rounded-xl shadow border border-gray-200 justify-center items-center inline-flex"
        >
          <Icon
            name="ic:outline-log-in"
            class="w-7 h-7 relative flex-col justify-start items-start flex"
          />
        </div>
        <div
          class="self-stretch h-[60px] flex-col justify-center items-start gap-3 flex"
        >
          <div
            class="self-stretch h-[60px] flex-col justify-start items-start gap-1 flex"
          >
            <div
              class="self-stretch text-center text-gray-900 text-2xl font-semibold leading-loose"
            >
              Selamat Datang Kembali!
            </div>
            <div
              class="self-stretch text-center text-slate-600 text-base font-normal leading-normal"
            >
              Mohon masukkan kredensial Anda di bawah ini
            </div>
          </div>
        </div>
      </div>
      <form
        @submit="submitLogin"
        class="self-stretch min-h-max px-20 py-12 border-gray-200 flex-col justify-start items-center gap-8 flex"
      >
        <div
          class="self-stretch min-h-min flex-col justify-start items-start flex"
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
          <GlobalInputEditor
            name="halo"
            placeholder="Masukkan password"
          />
        </div>
        <div
          class="self-stretch min-h-min flex-col justify-start items-start gap-3 flex"
        >
          <GlobalButton
            buttonClass="self-stretch px-5 py-3 bg-gray-600 rounded-lg shadow border border-gray-600 justify-center items-center gap-2 inline-flex text-white text-base font-semibold leading-normal"
            buttonType="submit"
          >
            Masuk
          </GlobalButton>
        </div>
        <div
          class="self-stretch h-[52px] flex-col justify-start items-center gap-3 flex"
        >
          <div
            class="self-stretch justify-center items-center gap-1 inline-flex"
          >
            <div class="text-slate-600 text-sm font-normal leading-tight">
              Belum memiliki akun?
            </div>
            <div class="justify-center items-center gap-2 flex">
              <div class="text-gray-700 text-sm font-semibold leading-tight">
                Daftar sekarang
              </div>
            </div>
          </div>
          <div class="justify-center items-start gap-1 inline-flex">
            <div class="justify-center items-center gap-2 flex">
              <NuxtLink to="/auth/forgot-password" class="text-gray-700 text-sm font-semibold leading-tight">
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
  @apply inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700;
  &:hover {
    @apply bg-gray-300;
  }
}
</style>