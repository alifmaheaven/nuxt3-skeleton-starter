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
    'auth',
  ],
});

// import
const { $api } = useNuxtApp()
import { ref, computed } from "vue";
import { useLayout } from "@/stores/layout";
import { useAuth } from "@/stores/auth";
// define
const layoutStore = useLayout();
const layout = computed(() => layoutStore.layout);

const authStore = useAuth();
const auth = computed(() => authStore.auth);

// data

// methods

const testFunction = () => {
  $api.get('/api/v1/test').then((response) => {
    console.log(response);
  });
  authStore.setUserData();
}
testFunction();


</script>

<template>
  <section>
    <p>This page will be displayed at the /about route.</p>
  </section>
</template>