// https://nuxt.com/docs/api/configuration/nuxt-config
import { defineNuxtConfig } from "nuxt/config";

export default defineNuxtConfig({
  devtools: { enabled: true },
  app:{
    // baseURL: '/skeleton/'
    head: {
      title: "Skeleton"
    }
  },
  components: ["~/components"], // components: [{ path: "./components", prefix: "SKELETON" }], // using <SKELETON-Button /> or <SKELETONButton />
  // extends: ["../MASTER-Repo"], // to inmport all components from MASTER-Repo
  modules: [
    "@pinia/nuxt",
    "nuxt-icon", // use: <Icon name="uil:github" color="black" /> icon source : https://icones.js.org/
    "@nuxt/image", // use: <nuxt-img src="logo.png" /> https://image.nuxtjs.org/
    "@nuxt/ui", // https://ui.nuxt.com/, cara pake iconnya dari icones ex: octicon:logo-github-16 = i-octicon-logo-github-16
    "@nuxtjs/tailwindcss",
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
      dynamic: true,
    },
  },
  ssr: true,
  nitro: {
    // baseURL: process.env.NUXT_BASE_URL_PUBLIC,
    prerender: {
      crawlLinks: true,
      failOnError: false,
    },
    compressPublicAssets: true,
  },
});
