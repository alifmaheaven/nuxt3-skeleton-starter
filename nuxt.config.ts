// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  components: [
    '~/components',
  ],
  modules: [
    '@pinia/nuxt',
    '@nuxtjs/tailwindcss',
  ],
  runtimeConfig: {
    MODE: process.env.NUXT_MODE, // important
    public: {
      BASE_URL_PUBLIC: process.env.NUXT_BASE_URL_PUBLIC,
      TOKEN_EXPIRES_IN_PUBLIC: Number(process.env.NUXT_TOKEN_EXPIRES_IN_PUBLIC), // important
    },
  },
})
