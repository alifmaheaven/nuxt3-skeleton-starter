import * as i18n from "vue-i18n";
import { useLayout } from "@/stores/layout";
import en from "../locales/en.json";
import fr from "../locales/fr.json";
import ja from "../locales/ja.json";
import id from "../locales/id.json";

export default defineNuxtPlugin((nuxtApp) => {
  const i18nCreate = i18n.createI18n({
    legacy: false,
    globalInjection: true,
    locale: useLayout().language,
    messages: {
      id,
      en,
      fr,
      ja,
    },
  });

  nuxtApp.vueApp.use(i18nCreate);
  return {
    provide: {
      i18n: i18n,
    },
  };
});
