import { defineStore } from "pinia";
// const nuxtApp = useNuxtApp()

export const useAuth = defineStore("auth", {
  state: () => ({
    user_data: null,
    token_data: "",
    isAuth_data: false,
    isLoading_data: false,
  }),
  getters: {
    user(state) {
      return {
        ...state.user_data,
      };
    },
    token: (state) => state.token_data || useCookie("token").value,
    isAuth: (state) => state.isAuth_data || useCookie("token").value,
    isLoading: (state) => state.isLoading_data,
  },
  actions: {
    setUserData() {
      return new Promise((resolve, reject) => {
        // set user data to cookie, or you can add your own logic here
      });
    },
    setTempUserData(temp_user_data) {
      this.temp_user_data = temp_user_data;
    },
    setToken(token) {
      useCookie("token").value = token;
      this.token_data = token;
      this.isAuth_data = true;
    },
    logout() {
      return new Promise(async (resolve) => {
        useCookie("counter").value = "";
        useCookie("token").value = "";
        this.isAuth_data = false;
        this.user_data = {};
        this.token_data = "";

        resolve();
      });
    },
    setLoading(isLoading) {
      this.isLoading_data = isLoading;
    },
  },
});
