import { defineStore } from "pinia";
import nuxtStorage from 'nuxt-storage';
// import { useNuxtApp } from '@nuxtjs/composition-api';
// const nuxtApp = useNuxtApp()

export const useAuth = defineStore("auth", {
  state: () => ({
    user_data: null,
    token_data:
      nuxtStorage?.localStorage?.getData("token") ||
      "",
    isAuth_data: false || nuxtStorage?.localStorage?.getData("token"),
    isLoading_data: false,
  }),
  getters: {
    user(state) {
      return {
        ...state.user_data
      };
    },
    token: (state) => state.token_data,
    isAuth: (state) => state.isAuth_data,
    isLoading: (state) => state.isLoading_data,
  },
  actions: {
    setUserData() {
      return new Promise((resolve, reject) => {
        useNuxtApp().$api({
          url: "/api/user",
          method: "GET",
        })
          .then((result) => {
            this.user_data = result.data;
            resolve(result.data.data);
          })
          .catch((err) => {
            console.error(err);
            reject(err);
          });
      });
    },
    setTempUserData(temp_user_data) {
      this.temp_user_data = temp_user_data;
    },
    setToken(token) {
      nuxtStorage.localStorage.setData("token", token, useRuntimeConfig().public.TOKEN_EXPIRES_IN_PUBLIC);
      this.token_data = token;
      this.isAuth_data = true;
    },
    logout() {
      return new Promise(async (resolve) => {
          nuxtStorage.localStorage.removeItem("token");
          nuxtStorage.localStorage.removeItem("user");
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
