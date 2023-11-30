# Nuxt 3 Minimal Starter

Look at the [Nuxt 3 documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

## Requirment

- pnpm command already exist in your command line, havent yet?

```bash

npm  install  -g  pnpm

```

- node 20 stable its must

- vue & nuxt global command

## Setup

Make sure to install the dependencies:

```bash

pnpm  install

```

## Development Server

Start the development server on `http://localhost:3000`:

```bash

pnpm  run  dev

```

## Production

Build the application for production:

```bash

pnpm  run  build

```

Locally preview production build:

```bash

pnpm  run  preview

```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.

"@headlessui/vue": "^1.7.16",

"@pinia/nuxt": "^0.4.11",

"@tailwindcss/forms": "^0.5.4",

"@vueform/multiselect": "^2.6.2",

"@vuepic/vue-datepicker": "^6.0.1",

"apexcharts": "^3.41.1",

"axios": "^1.4.0",

"nuxt-icon": "^0.5.0",

"nuxt-storage": "^1.2.2",

"pinia": "^2.1.6",

"postcss-advanced-variables": "^3.0.1",

"postcss-import": "^15.1.0",

"sass": "^1.66.1",

"sass-loader": "^13.3.2",

"tailwindcss": "^3.3.3",

"vee-validate": "^4.11.2",

"vue3-apexcharts": "^1.4.4",

"vue3-lottie": "^3.1.0",

"yup": "^1.2.0"

## Features

- [x] ✨ [Headless UI](https://headlessui.dev/)

- [x] 🛹 [State & Store Management (Pinia)](https://pinia.vuejs.org/)

- [x] 💨 [Tailwind CSS v3](https://tailwindcss.com/)

- [x] 📄 [Tailwind Forms](https://tailwindcss.com/docs/forms)

- [x] 📄 [Tailwind Elements](https://tailwind-elements.com/)

- [x] 📄 [Vue Form](https://vueform.com/)

- [x] 📄 [Vee Validate](https://vee-validate.logaretm.com/v4/)

- [x] 📄 [Yup](https://www.npmjs.com/package/yup)

- [x] 📄 [Vue Datepicker](https://vue3-datepicker.netlify.app/)

- [x] 📄 [Apex Chart](https://apexcharts.com/)

- [x] 📄 [Lottie](https://lottiefiles.com/)

- [x] 📄 [Vue Apex Chart](https://apexcharts.com/docs/vue-charts/)

- [x] 📄 [Nuxt Storage](https://storage.nuxtjs.org/)

- [x] 📄 [Axios](https://axios.nuxtjs.org/)

- [x] 📄 [Sass](https://sass-lang.com/)

- [x] 📄 [PostCSS](https://postcss.org/)

- [x] 📄 [vue3-apexcharts](https://apexcharts.com/docs/vue-charts/)

- [x] 📄 [vue3-lottie](https://vue3-lottie.vercel.app/)

- [x] 🔔 [Nuxt Icon](https://icones.js.org/)

- [x] 📦 [PNPM](https://pnpm.io/)

## How to use all component inside

### Input

#### text input

```
<globalInputText
	name="username"
	placeholder="Masukkan username"
/>
```

##### props :

| props       |  type   |                                      example |
| :---------- | :-----: | -------------------------------------------: |
| label       | String  |                   "Username", "Email", "etc" |
| name        | String  |                   "username", "email", "etc" |
| placeholder | String  | "Masukkan username", "Masukkan email", "etc" |
| inline      | Boolean |                                  true, false |

## License

[MIT License](./LICENSE)

Made with ❤️ by JeSiCa
