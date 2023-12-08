// QuillEditor
// Mau nambah module? https://vueup.github.io/vue-quill/guide/modules.html

import { QuillEditor, Quill } from "@vueup/vue-quill";
// import BlotFormatter from 'quill-blot-formatter'
import BlotFormatter from "quill-blot-formatter/dist/BlotFormatter";
// import ImageUploader from 'quill-image-uploader';
import "@vueup/vue-quill/dist/vue-quill.snow.css";

export default defineNuxtPlugin((nuxtApp) => {
  const modules = [
    {
      name: "blotFormatter",
      module: BlotFormatter,
      options: {},
    },
    // kalo pas upload image mau diupload dulu ke server
    // {
    //   name: 'imageUploader',
    //   module: ImageUploader,
    //   options: {
    //     upload: file => {
    //       return new Promise((resolve, reject) => {
    //         const formData = new FormData();
    //         formData.append("image", file);

    //         useNuxtApp().$api.post('/upload-image', formData)
    //           .then(res => {
    //             console.log(res)
    //             resolve(res.data.url);
    //           })
    //           .catch(err => {
    //             reject("Upload failed");
    //             console.error("Error:", err)
    //           })
    //       })
    //     }
    //   }
    // }
  ];

  const globalOptions = {
    debug: "info",
    modules: {
      table: true, // disable table module
    },
    theme: "snow",
  };
  // // set default globalOptions prop
  QuillEditor.props.globalOptions.default = () => globalOptions;
  QuillEditor.props.modules.default = () => modules;

  // // register component
  nuxtApp.vueApp.component("QuillEditor", QuillEditor);
});
