import { defineStore } from "pinia";

export const useLayout = defineStore("layout", {
  state: () => ({
    theme_data: "",
    language_data: "",
  }),
  getters: {
    theme: (state) => state.theme_data || useCookie("theme").value || "dark",
    language: (state) =>
      state.language_data || useCookie("language").value || "id",
  },
  actions: {
    thameSwitch() {
      var light_dark = this.theme == "dark" ? "light" : "dark";
      this.theme_data = light_dark;
      useCookie("theme").value = light_dark;
    },
    languageSwitch(val) {
      var language = val;
      this.language_data = language;
      useCookie("language").value = language;
    },
  },
});
