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

// define

// data

// methods


</script>

<template>
  <section>
    <p>This page will be displayed at the /about route.</p>
  </section>
</template>