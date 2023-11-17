import { useAuth } from "@/stores/auth.js";

export function useAjax(url, options = {}) {
  const defaults = {
    baseURL:
      useRuntimeConfig().MODE === "production"
        ? window.location.origin
        : useRuntimeConfig().public.BASE_URL_PUBLIC,
    key: url,
    headers: {
      ...(useAuth().token && { Authorization: `Bearer ${useAuth().token}` }),
    },
    onRequest({ request, options }) {
      useAuth().setLoading(true);
      // Set the request headers
      // options.headers = options.headers || {}
      // options.headers.authorization = '...'
    },
    onRequestError({ request, options, error }) {
      useAuth().setLoading(false);
      // Handle the request errors
    },
    onResponse({ request, response, options }) {
      useAuth().setLoading(false);
      // Process the response data
    },
    onResponseError({ request, response, options }) {
      useAuth().setLoading(false);
      // Handle the response errors
    },
  };

  const params = Object.assign({}, defaults, options);

  return useFetch(url, params);
}

// usage
// useAjax('/kacong/coba/post', {
//   method: 'POST', // PUT, DELETE, POST, GET, PATCH
//   body: JSON.stringify(values),
//   // params: {}
// })
