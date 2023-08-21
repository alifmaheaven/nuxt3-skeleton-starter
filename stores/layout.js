import { defineStore } from "pinia";

export const useLayout = defineStore('layout', {
  state: () => ({
    alerts: [],
  }),
  getters: {
    getAlerts: (state) => state.alerts,
  },
  actions: {
    addAlert(alert) {
      this.alerts.push(alert)
    }
  }
})