import { createI18n } from "vue-i18n";
import { useLayout  } from "@/stores/layout";
import en from "../locales/en.json";
import fr from "../locales/fr.json";
import ja from "../locales/ja.json";
import id from "../locales/id.json";

export default defineNuxtPlugin(({ vueApp }) => {
  const i18n = createI18n({
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

  vueApp.use(i18n);
});
