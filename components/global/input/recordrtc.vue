<script setup>
// config
useHead({
  title: "Login",
  script: [
    {
      src: "/_nuxt/eksternal/RecordRTC/RecordRTC.js",
      body: true,
    },
    {
      src: "/_nuxt/eksternal/RecordRTC/adapter-latest.js",
      body: true,
    },
  ],
});

// import
import { computed, toRef, useSlots, onMounted } from "vue";
import { useField } from "vee-validate";

onMounted(() => {
  var submitKyc = document.getElementById("submitKyc");
  var resubmitKyc = document.getElementById("resubmitKyc");
  var loadingText = document.getElementById("loadingText");

  var selfVideo = document.getElementById("selfVideo");
  var enableCamera = document.getElementById("enableCamera");
  var videoContainer = document.getElementById("videoContainer");

  var lookCamera = document.getElementById("lookCamera");
  var openMouth = document.getElementById("openMouth");
  var closeMouth = document.getElementById("closeMouth");
  var openEye = document.getElementById("openEye");
  var openEye2 = document.getElementById("openEye2");
  var saySentence1 = document.getElementById("saySentence1");
  var saySentence2 = document.getElementById("saySentence2");

  var startRecord = document.getElementById("startRecord");
  var restartRecord = document.getElementById("restartRecord");

  var enableButton = false;
  var recorder;

  var responseText = document.getElementById("responseText");
  var base64Video = document.getElementById("base64Video");

  var selectVideo = false;

  var imageFile;
  var videoFile;
  var imageFiles;
  var videoFiles;

  // function formValidation() {
  //   if (selectVideo) {
  //     submitKyc.disabled = false;
  //   } else {
  //     submitKyc.disabled = true;
  //   }
  // }

  function captureCamera(callback) {
    navigator.mediaDevices
      .getUserMedia({ audio: true, video: true })
      .then(function (camera) {
        callback(camera);
      })
      .catch(function (error) {
        alert("Unable to capture your camera. Please check console logs.");
        // console.error(error);
      });
  }

  enableCamera.onclick = function () {
    this.style.display = "none";
    videoContainer.style.display = "block";

    captureCamera(function (camera) {
      selfVideo.muted = true;
      selfVideo.srcObject = camera;
      selfVideo.camera = camera;
      selfVideo.controls = false;
    });
  };

  restartRecord.onclick = function () {
    this.style.display = "none";
    startRecord.style.display = "block";
    videoContainer.style.display = "block";

    captureCamera(function (camera) {
      selfVideo.muted = true;
      selfVideo.srcObject = camera;
      selfVideo.camera = camera;
      selfVideo.controls = false;
    });
  };

  startRecord.onclick = function () {
    this.style.display = "none";

    captureCamera(function (camera) {
      recorder = RecordRTC(selfVideo.camera, {
        type: "video",
        canvas: {
          width: 640,
          height: 480,
        },
        video: {
          width: 640,
          height: 480,
        },
      });

      recorder.startRecording();
      recorder.camera = camera;

      var milliSeconds = 17 * 1000;

      setTimeout(function () {
        lookCamera.style.display = "block";
      }, 1000);

      setTimeout(function () {
        lookCamera.style.display = "none";
        openEye.style.display = "block";
      }, 5000);

      setTimeout(function () {
        openEye.style.display = "none";
        openEye2.style.display = "block";
      }, 8000);

      setTimeout(function () {
        openEye2.style.display = "none";
        openMouth.style.display = "block";
      }, 12000);

      setTimeout(function () {
        openMouth.style.display = "none";
        closeMouth.style.display = "block";
      }, 14000);

      /*
      setTimeout(function() {
        closeMouth.style.display = 'none';
        saySentence1.style.display = 'block';
      }, 10000);
      
      setTimeout(function() {
        saySentence1.style.display = 'none';
        saySentence2.style.display = 'block';
      }, 13000);
      */

      setTimeout(function () {
        recorder.stopRecording(function () {
          selfVideo.src = selfVideo.srcObject = null;
          selfVideo.muted = false;
          selfVideo.volume = 1;
          selfVideo.src = URL.createObjectURL(recorder.getBlob());

          var blob = recorder.getBlob();

          var fileName = getFileName("webm");
          videoFile = new File([blob], fileName, {
            type: "video/webm",
          });

          var reader = new FileReader();
          reader.readAsDataURL(videoFile);
          reader.onloadend = function () {
            var dataUrl = reader.result;
            var base64data = dataUrl.split(",")[1];
            // console.log(base64data);
            handleChange(base64data);
            videoFiles = base64data;
            // base64Video.value = base64data;
          };

          recorder.camera.stop();
          recorder.destroy();
          recorder = null;
        });

        restartRecord.style.display = "block";
        closeMouth.style.display = "none";
        selectVideo = true;
        // formValidation();
      }, milliSeconds);
    });
  };

  // submitKyc.onclick = function() {
  //   this.style.display = 'none';
  //   loadingText.style.display = 'block';
  //   return true;
  // }

  function getFileName(fileExtension) {
    var d = new Date();
    var year = d.getUTCFullYear();
    var month = d.getUTCMonth();
    var date = d.getUTCDate();
    return (
      "WebCamRecord-" +
      year +
      month +
      date +
      "-" +
      getRandomString() +
      "." +
      fileExtension
    );
  }

  function getRandomString() {
    if (
      window.crypto &&
      window.crypto.getRandomValues &&
      navigator.userAgent.indexOf("Safari") === -1
    ) {
      var a = window.crypto.getRandomValues(new Uint32Array(3)),
        token = "";
      for (var i = 0, l = a.length; i < l; i++) {
        token += a[i].toString(36);
      }
      return token;
    } else {
      return (Math.random() * new Date().getTime())
        .toString(36)
        .replace(/\./g, "");
    }
  }
});

const props = defineProps({
  value: {
    type: String,
    default: "",
  },
  name: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    required: false,
  },
  placeholder: {
    type: String,
    default: "",
  },
  icon: {
    type: String,
    default: "",
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  readonly: {
    type: Boolean,
    default: false,
  },
  primary: {
    type: Boolean,
    default: false,
  },
});
const name = toRef(props, "name");
const {
  value: inputValue,
  errorMessage,
  handleBlur,
  handleChange,
  meta,
} = useField(name);
</script>

<template>
  <div
    class="relative my-3 w-full first:mt-0 last:mb-0"
    :class="{ success: meta.valid }"
  >
    <div
      class="inline-flex h-full w-full flex-col items-center justify-center gap-6 rounded-xl border border-gray-200 bg-gray-50 px-16 py-8"
      :class="{
        '!dark:border-red-500 !border-red-500': !!errorMessage,
      }"
    >
      <div
        class="flex h-24 flex-col items-center justify-center gap-2 self-stretch"
      >
        <div
          class="flex h-7 flex-col items-start justify-start gap-1 self-stretch"
        >
          <div
            class="self-stretch text-center text-lg font-semibold leading-7 text-gray-900"
          >
            Izinkan akses kamera
          </div>
        </div>
        <div
          class="flex h-[60px] flex-col items-start justify-start gap-4 self-stretch"
        >
          <div
            class="self-stretch text-center text-sm font-normal leading-tight text-slate-600"
          >
            Kami melakukan perekaman terhadap wajah anda untuk dilakukan
            verifikasi data biometrik dengan proses analisa dan perbandingan
            data referensi. Mohon untuk tidak mengenakan aksesoris di wajah
            ketika melakukan perekaman (misal: Kaca mata).
          </div>
        </div>
      </div>
      <div
        class="flex h-fit w-full flex-col items-center justify-start gap-4 self-stretch px-16"
      >
        <button
          id="enableCamera"
          type="button"
          class="inline-flex items-center justify-center gap-2 self-stretch rounded-lg border border-gray-300 bg-white px-[18px] py-2.5 shadow"
        >
          <Icon
            name="material-symbols:android-camera-outline"
            class="relative h-5 w-5"
          />
          <div class="text-base font-semibold leading-normal text-slate-700">
            Izinkan akses
          </div>
        </button>
        <div
          id="videoContainer"
          class="w-full rounded-[9px] border border-slate-300 bg-slate-50 text-dark shadow"
          :class="{
            '!dark:border-red-500 !border-red-500': !!errorMessage,
          }"
          style="background-color: #cccccc; position: relative; display: none"
        >
          <video
            id="selfVideo"
            class="w-full rounded-[9px] border border-slate-300 bg-slate-50 text-dark shadow"
            style="position: relative; z-index: 0"
            width="100%"
            height="100%"
            autoplay
            playsinline
          ></video>
          <div
            style="
              position: absolute;
              top: 10px;
              left: 10px;
              right: 10px;
              z-index: 1;
            "
            align="center"
          >
            <button
              id="startRecord"
              type="button"
              class="block w-full rounded-lg border border-transparent bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow hover:bg-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2"
            >
              Mulai Rekam
            </button>
            <button
              id="restartRecord"
              type="button"
              class="block w-full rounded-lg border border-transparent bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow hover:bg-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2"
              style="display: none"
            >
              Ulangi
            </button>
          </div>
        </div>
        <div style="z-index: 1; width: 100%">
          <p
            id="lookCamera"
            align="center"
            class="px-4 py-2 text-lg font-semibold text-slate-900"
            style="display: none"
          >
            Silahkan tegakan badan anda dan menghadap kamera
          </p>
          <p
            id="openMouth"
            align="center"
            class="px-4 py-2 text-lg font-semibold text-slate-900"
            style="display: none"
          >
            Silakan buka mulut anda
          </p>
          <p
            id="closeMouth"
            align="center"
            class="px-4 py-2 text-lg font-semibold text-slate-900"
            style="display: none"
          >
            Tutup mulut anda kembali
          </p>
          <p
            id="openEye"
            align="center"
            class="px-4 py-2 text-lg font-semibold text-slate-900"
            style="display: none"
          >
            Kedipkan mata anda
          </p>
          <p
            id="openEye2"
            align="center"
            class="px-4 py-2 text-lg font-semibold text-slate-900"
            style="display: none"
          >
            Sekali lagi, kedipkan mata anda
          </p>
          <!--
                <p align="center" style="background-color: #f00; color: #fff; display: none" id="saySentence1">
                  Silakan ikuti kalimat berikut ini
                </p>
                <p align="center" style="background-color: #f00; color: #fff; display: none" id="saySentence2">
                  "Saya, (nama anda), tanggal lahir (tanggal lahir anda), dengan ini menyatakan setuju untuk melakukan pembukaan rekening di Bank BRI."
                </p>
                -->
        </div>
      </div>
    </div>
    <!-- <label
      v-if="label"
      :for="name"
      class="form-label block mb-2"
      :class="{
        'text-red-500 font-bold': !!errorMessage,
      }"
    >
      <span v-if="primary">
        <span class="text-red-500 font-bold">*</span>
      </span>
      {{ label }} Rekam Wajah</label> -->
    <!-- <p class="w-full text-sm overflow-hidden">
      Kami melakukan perekaman terhadap wajah anda untuk dilakukan verifikasi
      data biometrik dengan proses analisa dan perbandingan data referensi.
      Mohon untuk tidak mengenakan aksesoris di wajah ketika melakukan perekaman
      (misal: Kaca mata).
    </p> -->
    <div class="relative">
      <div class="flex w-full items-center justify-center">
        <!-- <button
          id="enableCamera"
          type="button"
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
        >
          Aktifkan Kamera
        </button> -->
        <div
          id="videoContainer"
          class="rounded-[9px] border border-slate-300 bg-slate-50 text-dark shadow"
          :class="{
            '!dark:border-red-500 !border-red-500': !!errorMessage,
          }"
          style="background-color: #cccccc; position: relative; display: none"
        >
          <video
            id="selfVideo"
            class="rounded-[9px] border border-slate-300 bg-slate-50 text-dark shadow"
            style="position: relative; z-index: 0"
            width="100%"
            autoplay
            playsinline
          ></video>
          <div style="position: absolute; top: 0; z-index: 1; width: 100%">
            <p
              id="openMouth"
              align="center"
              class="px-4 py-2 text-slate-900"
              style="display: none"
            >
              Silakan buka mulut anda
            </p>
            <p
              id="closeMouth"
              align="center"
              class="px-4 py-2 text-slate-900"
              style="display: none"
            >
              Tutup mulut anda kembali
            </p>
            <p
              id="openEye"
              align="center"
              class="px-4 py-2 text-slate-900"
              style="display: none"
            >
              Kedipkan mata anda
            </p>
            <p
              id="openEye2"
              align="center"
              class="px-4 py-2 text-slate-900"
              style="display: none"
            >
              Sekali lagi, kedipkan mata anda
            </p>
            <!--
                <p align="center" style="background-color: #f00; color: #fff; display: none" id="saySentence1">
                  Silakan ikuti kalimat berikut ini
                </p>
                <p align="center" style="background-color: #f00; color: #fff; display: none" id="saySentence2">
                  "Saya, (nama anda), tanggal lahir (tanggal lahir anda), dengan ini menyatakan setuju untuk melakukan pembukaan rekening di Bank BRI."
                </p>
                -->
          </div>
          <div
            style="
              position: absolute;
              top: 10px;
              left: 10px;
              right: 10px;
              z-index: 1;
            "
            align="center"
          >
            <button
              id="startRecord"
              type="button"
              class="block w-full rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Mulai Rekam
            </button>
            <button
              id="restartRecord"
              type="button"
              class="block w-full rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              style="display: none"
            >
              Ulangi
            </button>
          </div>
        </div>
      </div>
      <!-- <hr /> -->
      <!-- Change this to a button or input when using this as a form -->
      <!-- <p
        id="responseText"
        class="text-center"
        style="font-weight: bold; display: none"
      >
        Response Text
      </p>
      <p id="loadingText" class="text-center" style="display: none">
        <strong>Menunggu Proses...</strong>
      </p>
      <input type="hidden" name="base64Video" id="base64Video" /> -->
      <!-- <div
        v-if="icon"
        class="absolute inset-y-0 left-0 flex items-center px-3 text-gray-500"
      >
        <Icon :name="icon" class="w-5 h-5" />
      </div> -->
    </div>
    <div
      v-if="!!errorMessage"
      class="absolute -bottom-5 right-0 mt-1 text-xs text-red-500 dark:text-red-500"
    >
      {{ errorMessage }}
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
