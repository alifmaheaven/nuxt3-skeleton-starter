import axios from "axios";
import { useAuth } from "@/stores/auth.js";
export default defineNuxtPlugin((nuxtApp) => {
  let ajax = axios.create({
    baseURL:
    useRuntimeConfig().MODE === "production"
        ? window.location.origin
        : useRuntimeConfig().public.BASE_URL_PUBLIC,
    // baseURL: window.location.origin,
    // headers: {
    //     'Content-Type': 'application/json',
    //     // 'Authorization': store.getters.isLoggedIn ? 'Bearer ' + '' : 'Bearer '+ localStorage.getItem('token')
    // },
  });

  ajax.CancelToken = axios.CancelToken;
  ajax.isCancel = axios.isCancel;

  /*
 * The interceptor here ensures that we check for the token in local storage every time an ajax request is made
 */
  ajax.interceptors.request.use(
    (config) => {
      useAuth().setLoading(true);
      let token = useAuth().token;

      if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
      }

      // if (['post', 'put', 'patch', 'delete'].includes(config.method)) {
      //   config.data = { data: { ...encrypt(JSON.parse(JSON.stringify(config.data))) } }
      // }

      return config;
    },

    (error) => {
      return Promise.reject(error);
    }
  );

  ajax.interceptors.response.use(
    (response) => {
      // if (response.status >= 200 && response.status < 300) {
      //   response.data = JSON.parse(decrypt(response.data.data));
      // }
      useAuth().setLoading(false);
      return response;
    },
    function (err) {
      return new Promise(function () {
        /*resolve, reject*/
        useAuth().setLoading(false);
        if (
          err.response.status === 401 &&
          err.config &&
          !err.config.__isRetryRequest
        ) {
        //   createToast(
        //     {
        //       title: "Sorry",
        //       description: "Your Session about expired!",
        //     },
        //     {
        //       hideProgressBar: false,
        //       type: "danger",
        //       showIcon: true,
        //       toastBackgroundColor: "red",
        //       timeout: 10000,
        //     }
        //   );
        //   // if you ever get an unauthorized, logout the user
        //   // useAuthStore().removeSession();
        //   try {
        //     useAuth().logout();
        //     router.push("/login");
        //   } catch (error) {
        //     console.log("error", error);
        //   }
        //   // you can also redirect to /login if needed !
        }
        // err.response.data = JSON.parse(decrypt(err.response.data.data));
        console.log(err);
        throw err;
      });
    }
  );

  return {
    provide: {
      api: ajax,
    },
  };
});