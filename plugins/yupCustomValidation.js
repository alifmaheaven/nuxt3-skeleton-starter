// dokumentasinya ada di

import { setLocale, addMethod, string, mixed } from "yup";

export default defineNuxtPlugin((nuxtApp) => {
  // cara make tinggal file: yup.fileSize().fileTypeCSV().required()

  function dataURItoBlob(dataURI) {
    if (!dataURI) return;
    const byteString = atob(dataURI.split(",")[1]);
    const mimeString = dataURI.split(",")[0].split(":")[1].split(";")[0];
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    const blob = new Blob([ab], { type: mimeString });
    return blob;
  }

  addMethod(mixed, "fileSize", function () {
    return this.test("fileSize", "File size too large", (value) => {
      if (!value.length) return true; // attachment is optional
      const totalSize = value.reduce((acc, file) => {
        const blob = dataURItoBlob(file);
        return acc + blob?.size;
      }, 0);
      return totalSize <= 10000000; // 10MB
    });
  });

  addMethod(mixed, "fileTypeCSV", function () {
    return this.test("fileType", "Only CSV files are allowed", (value) => {
      if (!value.length) return true; // attachment is optional
      return value.every((file) => {
        const blob = dataURItoBlob(file);
        console.log(blob?.type);
        return ["text/csv"].includes(blob?.type);
      });
    });
  });
  // nuxtApp.vueApp.use(twElements);
});
