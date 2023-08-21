import { defineStore } from "pinia";

export const useLayout = defineStore('layout', {
  state: () => ({
    dark_data: false,
  }),
  getters: {
    dark: (state) => state.dark_data,
  },
  actions: {
    darkModeSwitch() {
      this.dark_data = !this.dark_data
    }
  }
})