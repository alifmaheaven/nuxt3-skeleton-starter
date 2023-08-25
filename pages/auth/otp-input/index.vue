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
  otp: yup.string().required().label("Otp"),
  sign: yup.string().required().label("Sign"),
});
const { handleSubmit, resetForm, setValues } = useForm({
  initialValues: {
    otp: "",
    sign: "",
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
            name="mdi:shield-key"
            class="w-7 h-7 relative flex-col justify-start items-start flex"
          />
        </div>
        <div
          class="self-stretch h-full flex-col justify-center items-start gap-3 flex"
        >
          <div
            class="self-stretch h-full flex-col justify-start items-start gap-1 flex"
          >
            <div
              class="self-stretch text-center text-gray-900 text-2xl font-semibold leading-loose"
            >
              Masukan Kode OTP
            </div>
            <div class="w-full text-center text-slate-600 text-base font-normal leading-normal">Kode OTP telah dikirimkan melalui email dan SMS Anda</div>
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
          <globalInputPin
            name="otp"
            placeholder="Masukkan Email"
            type="otp"
          />
          <globalInputSigner
            class="w-50 h-50"
            name="sign"
          />
        </div>
        <div class="w-full text-slate-600 text-sm font-normal leading-tight">Jangan berikan kode OTP kepada siapapun.</div>
        <div class="w-full h-full justify-end items-center gap-3 inline-flex">
            <div class="justify-start items-start flex">
                <div class="px-5 py-3 rounded-lg justify-center items-center gap-2 flex">
                    <div class="justify-start items-start flex">
                        <div class="px-2 py-0.5 bg-gray-50 rounded-2xl border border-gray-200 justify-start items-center flex">
                            <div class="text-center text-slate-700 text-xs font-medium leading-[18px]">5</div>
                        </div>
                    </div>
                    <div class="text-gray-300 text-base font-semibold leading-normal">Kirim Ulang</div>
                </div>
            </div>
            <GlobalButton
              buttonClass="px-5 py-3 bg-gray-600 rounded-lg shadow border border-gray-600 justify-center items-center gap-2 flex text-white text-base font-semibold leading-normal"
              buttonType="submit"
            >
              Konfimasi
            </GlobalButton>
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