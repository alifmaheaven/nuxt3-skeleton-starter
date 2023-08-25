<template>
  <div class="bg-login justify-center items-center inline-flex">
    <slot />
  </div>
</template>


<style lang="scss" scoped>
  .bg-login {
    height: 100vh;
    width: 100vw;
    background-image: url('/images/bg-login.jpeg');
    background-size: cover;
    margin: 0;
  }
</style>