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
    class="my-3 first:mt-0 last:mb-0 w-full relative"
    :class="{ success: meta.valid }"
  >
    <div
      class="w-full h-full px-16 py-8 bg-gray-50 rounded-xl border border-gray-200 flex-col justify-center items-center gap-6 inline-flex"
      :class="{
        'border-red-500 dark:border-red-500': !!errorMessage,
      }"
    >
      <div
        class="self-stretch h-24 flex-col justify-center items-center gap-2 flex"
      >
        <div
          class="self-stretch h-7 flex-col justify-start items-start gap-1 flex"
        >
          <div
            class="self-stretch text-center text-gray-900 text-lg font-semibold leading-7"
          >
            Izinkan akses kamera
          </div>
        </div>
        <div
          class="self-stretch h-[60px] flex-col justify-start items-start gap-4 flex"
        >
          <div
            class="self-stretch text-center text-slate-600 text-sm font-normal leading-tight"
          >
            Kami melakukan perekaman terhadap wajah anda untuk dilakukan
            verifikasi data biometrik dengan proses analisa dan perbandingan
            data referensi. Mohon untuk tidak mengenakan aksesoris di wajah
            ketika melakukan perekaman (misal: Kaca mata).
          </div>
        </div>
      </div>
      <div
        class="self-stretch h-fit w-full px-16 flex-col justify-start items-center gap-4 flex"
      >
        <button
          id="enableCamera"
          type="button"
          class="self-stretch px-[18px] py-2.5 bg-white rounded-lg shadow border border-gray-300 justify-center items-center gap-2 inline-flex"
        >
          <Icon
            name="material-symbols:android-camera-outline"
            class="w-5 h-5 relative"
          />
          <div class="text-slate-700 text-base font-semibold leading-normal">
            Izinkan akses
          </div>
        </button>
        <div
          id="videoContainer"
          class="bg-white rounded-[9px] shadow border border-gray-300 w-full"
          :class="{
            'border-red-500 dark:border-red-500': !!errorMessage,
          }"
          style="background-color: #cccccc; position: relative; display: none"
        >
          <video
            class="bg-white rounded-[9px] shadow border border-gray-300 w-full"
            style="position: relative; z-index: 0"
            id="selfVideo"
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
              class="block w-full py-2 px-4 border border-transparent text-sm font-medium text-slate-700 bg-white hover:bg-slate-200 rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500"
            >
              Mulai Rekam
            </button>
            <button
              id="restartRecord"
              type="button"
              class="block w-full py-2 px-4 border border-transparent text-sm font-medium text-slate-700 bg-white hover:bg-slate-200 rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500"
              style="display: none"
            >
              Ulangi
            </button>
          </div>
        </div>
        <div style="z-index: 1; width: 100%">
            <p
              align="center"
              class="text-slate-900 py-2 px-4 text-lg font-semibold"
              style="display: none"
              id="lookCamera"
            >
              Silahkan tegakan badan anda dan menghadap kamera
            </p>
            <p
              align="center"
              class="text-slate-900 py-2 px-4 text-lg font-semibold"
              style="display: none"
              id="openMouth"
            >
              Silakan buka mulut anda
            </p>
            <p
              align="center"
              class="text-slate-900 py-2 px-4 text-lg font-semibold"
              style="display: none"
              id="closeMouth"
            >
              Tutup mulut anda kembali
            </p>
            <p
              align="center"
              class="text-slate-900 py-2 px-4 text-lg font-semibold"
              style="display: none"
              id="openEye"
            >
              Kedipkan mata anda
            </p>
            <p
              align="center"
              class="text-slate-900 py-2 px-4 text-lg font-semibold"
              style="display: none"
              id="openEye2"
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
      <div class="w-full flex justify-center items-center">
        <!-- <button
          id="enableCamera"
          type="button"
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
        >
          Aktifkan Kamera
        </button> -->
        <div
          id="videoContainer"
          class="bg-white rounded-[9px] shadow border border-gray-300"
          :class="{
            'border-red-500 dark:border-red-500': !!errorMessage,
          }"
          style="background-color: #cccccc; position: relative; display: none"
        >
          <video
            class="bg-white rounded-[9px] shadow border border-gray-300"
            style="position: relative; z-index: 0"
            id="selfVideo"
            width="100%"
            autoplay
            playsinline
          ></video>
          <div style="position: absolute; top: 0; z-index: 1; width: 100%">
            <p
              align="center"
              class="text-slate-900 py-2 px-4"
              style="display: none"
              id="openMouth"
            >
              Silakan buka mulut anda
            </p>
            <p
              align="center"
              class="text-slate-900 py-2 px-4"
              style="display: none"
              id="closeMouth"
            >
              Tutup mulut anda kembali
            </p>
            <p
              align="center"
              class="text-slate-900 py-2 px-4"
              style="display: none"
              id="openEye"
            >
              Kedipkan mata anda
            </p>
            <p
              align="center"
              class="text-slate-900 py-2 px-4"
              style="display: none"
              id="openEye2"
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
              class="block w-full py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Mulai Rekam
            </button>
            <button
              id="restartRecord"
              type="button"
              class="block w-full py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
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
      class="text-xs text-red-500 dark:text-red-500 mt-1 absolute -bottom-5 right-0"
    >
      {{ errorMessage }}
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
