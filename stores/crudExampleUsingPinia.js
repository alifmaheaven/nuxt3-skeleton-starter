import { defineStore } from "pinia";

// i am recomend you each enpoint for CRUD i one pinia, if its another CRUD, you can create another pinia.
// its just for one endpoint CRUD example dude, dont be so stupid using it with multiple endpoint CRUD
export const usecrudExampleUsingPinia = defineStore("crudExampleUsingPinia", {
  state: () => ({
    rows_data: null,
    meta_data: {
      page_size: 10,
      current_page: 1,
      pages: 1,
      count: 0,
    },
  }),
  getters: {
    rows: (state) => state.rows_data,
    meta: (state) => state.meta_data,
  },
  actions: {
    getData(params) {
      // or you can useAjax from composables/useAjax.js
      return new Promise((resolve, reject) => {
        this.rows_data = [];
        useNuxtApp().$api({
          url: "/api/example/",
          method: "GET",
          params: {
            page_size: this.meta.page_size,
            page: this.meta.current_page,
            ...params,
          },
        })
          .then((result) => {
            this.rows_data = result.data.data;
            this.meta_data.pages = result.data.meta[0].paginator.pages;
            this.meta_data.current_page = result.data.meta[0].paginator.current_page;
            this.meta_data.count = result.data.meta[0].paginator.count;
            resolve(result.data.data);
          })
          .catch((err) => {
            this.rows_data = [];
            this.meta_data.pages = 1;
            reject(err);
          });
      });
    },
    createData(values) {
      return new Promise((resolve, reject) => {
        // or you can useAjax from composables/useAjax.js
        useNuxtApp().$api({
          url: "api/example/",
          method: "POST",
          data: values,
        })
          .then((response) => {
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    updateData(values){
      // or you can useAjax from composables/useAjax.js
      return new Promise((resolve,reject)=>{
        useNuxtApp().$api({
          url: "api/examples/",
          method: "POST",
          data: values,
        })
        .then((result)=>{
          resolve(result.data.data);
        })
        .catch((err)=>{
          reject(err);
        })
      })
    },
    deleteData(values) {
      // or you can useAjax from composables/useAjax.js
      return new Promise((resolve, reject) => {
        useNuxtApp().$api({
          url: `/api/examples/`,
          method: "DELETE",
          data: values,
        })
          .then((result) => {
            resolve(result.data.data);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
  },
});