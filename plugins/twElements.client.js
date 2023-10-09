// dokumentasinya https://tailwind-elements.com/docs/getting-started/vue/

import * as twElements from "tw-elements";

export default defineNuxtPlugin((nuxtApp) => {
  // initTE

  twElements.initTE({
    Modal: twElements.Modal,
    Ripple: twElements.Ripple,
  });
  // nuxtApp.vueApp.use(twElements);
});
