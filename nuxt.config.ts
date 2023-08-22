// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  components: [
    '~/components',
  ],
  modules: [
    '@pinia/nuxt',
    'nuxt-icon', // use: <Icon name="uil:github" color="black" /> icon source : https://icones.js.org/
  ],
  css: ['~/assets/css/main.css', '~/assets/scss/main.scss'],
  runtimeConfig: {
    MODE: process.env.NUXT_MODE, // important
    public: {
      BASE_URL_PUBLIC: process.env.NUXT_BASE_URL_PUBLIC,
      TOKEN_EXPIRES_IN_PUBLIC: Number(process.env.NUXT_TOKEN_EXPIRES_IN_PUBLIC), // important
    },
  },
  postcss: {
    plugins: {
      'postcss-import': {},
      'tailwindcss/nesting': {},
      tailwindcss: {},
      autoprefixer: {},
      'postcss-advanced-variables': {},
    },
  },
})
