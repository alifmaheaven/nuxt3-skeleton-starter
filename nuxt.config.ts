// https://nuxt.com/docs/api/configuration/nuxt-config
import { defineNuxtConfig } from "nuxt/config";

export default defineNuxtConfig({
  devtools: { enabled: true },
  components: ["~/components"],
  modules: [
    "@pinia/nuxt",
    "nuxt-icon", // use: <Icon name="uil:github" color="black" /> icon source : https://icones.js.org/
    "@nuxt/image", // use: <nuxt-img src="logo.png" /> https://image.nuxtjs.org/
    "@nuxt/ui", // https://ui.nuxt.com/
  ],
  image: {
    dir: "public",
  },
  css: ["~/assets/css/main.css", "~/assets/scss/main.scss"],
  runtimeConfig: {
    MODE: process.env.NUXT_MODE, // important
    public: {
      BASE_URL_PUBLIC: process.env.NUXT_BASE_URL_PUBLIC,
      TOKEN_EXPIRES_IN_PUBLIC: Number(process.env.NUXT_TOKEN_EXPIRES_IN_PUBLIC), // important
    },
  },
  postcss: {
    plugins: {
      "postcss-import": {},
      "tailwindcss/nesting": {},
      tailwindcss: {},
      autoprefixer: {},
      "postcss-advanced-variables": {},
    },
  },
  ui: {
    global: true,
    icons: {
      dynamic: true
    }
  }
  // ssr: true,
  // nitro: {
  // //   baseURL: "http://localhost:8000",
  //   prerender: {
  //     crawlLinks: true,
  //     failOnError: true,
  //   },
  // },
});
