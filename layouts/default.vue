<template>
  <div class="bg-login inline-flex items-center justify-center bg-light">
    <slot />
  </div>
  <LayoutLanguagedarkswitcher />
</template>

<script setup></script>

<style lang="scss" scoped>
.bg-login {
  height: 100vh;
  width: 100vw;
  background-image: url("/images/bg-login3.png");
  background-size: cover;
  background-repeat: no-repeat;
  background-attachment: fixed;
  // margin: 0;
  background-position: top center;
}
</style>
