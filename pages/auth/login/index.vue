<script setup>
// layout
definePageMeta({
  layout: "autenticated",
});

definePageMeta({
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
});
const { handleSubmit, resetForm, setValues } = useForm({
  initialValues: {
    username: "",
  },
  validationSchema: validationSchema,
});

// data

// methods

const testFunction = () => {
  // $api.get('/api/v1/test').then((response) => {
  //   console.log(response);
  // });
  // authStore.setUserData();
};
testFunction();

const submitCreateUpdate = handleSubmit(async (values, { resetForm }) => {
  console.log("ini valuenya", values);
});
</script>

<template>
  <div class="p-4">
    <div class="w-full max-w-sm rounded overflow-hidden shadow-lg mb-4">
      <img
        class="w-full"
        src="https://tailwindcss.com/img/card-top.jpg"
        alt="Sunset in the mountains"
      />
      <div class="px-6 py-4 pb-2">
        <div class="font-bold text-xl mb-2 text-primary bg-red">
          The Coldest Sunset
        </div>
        <p class="text-primary">hallooo</p>
        <p class="text-gray-700 text-base">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus
          quia, nulla! Maiores et perferendis eaque, exercitationem praesentium
          nihil.
        </p>
        <form @submit="submitCreateUpdate">
          <globalInputText
            name="username"
            label="Username"
            placeholder="Username"
          />
          <button type="submit" class="btn btn-primary">Submit</button>
        </form>
      </div>
      <div class="px-6 py-4">
        <span class="badge mr-2">#photography</span>
        <span class="badge mr-2">#travel</span>
        <span class="badge">#winter</span>
      </div>
    </div>
  </div>
</template>

<style lang="postcss" scoped>
.badge {
  @apply inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700;
  &:hover {
    @apply bg-gray-300;
  }
}
</style>