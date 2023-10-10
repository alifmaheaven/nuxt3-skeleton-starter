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

// if not working try this at page or layout you want implement tw element 

// onMounted(async () => {
//   const { Collapse, initTE } = await import("tw-elements");
//   initTE({ Collapse });
// });
