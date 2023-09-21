<template>
  <div class="bg-login inline-flex items-center justify-center">
    <slot />
  </div>
  <LayoutLanguagedarkswitcher />
</template>

<script setup>
</script>

<style lang="scss" scoped>
.bg-login {
  height: 100vh;
  width: 100vw;
  background-image: url("/images/bg-login.jpeg");
  background-size: cover;
  margin: 0;
}
</style>
