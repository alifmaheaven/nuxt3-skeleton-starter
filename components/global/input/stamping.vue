<script setup>
import { computed, toRef, useSlots } from "vue";
import { useField } from "vee-validate";

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
  inline: {
    type: Boolean,
    default: false,
  },
  stamp_image: {
    type: String,
  },
  source: {
    type: String,
  },
});
const emit = defineEmits();
const name = toRef(props, "name");
const {
  value: inputValue,
  errorMessage,
  handleBlur,
  handleChange,
  meta,
} = useField(name);

const npwpvalue = computed({
  get() {
    return inputValue.value;
  },
  set(value) {
    handleChange(value);
  },
});

// data
var pdfRef = ref(null);
var imageStamping = ref(null);
// var rendered_component = ref(false);

var viewpdf = ref({
  page: 1,
  pageCount: 0,
  canvasWidth: 0,
  canvasHight: 0,
});

var stamp_cordinate = ref({
  x: 0,
  y: 0,
  w: 0,
  h: 0,
  active: false,
});

const print = (event) => {
  console.log(event);
};

const handleDocumentRender = (args) => {
  viewpdf.value.pageCount = pdfRef.value.pageCount;
  viewpdf.value.canvasWidth = Number(
    document.getElementById("canvas_content").clientWidth.toFixed(),
  );
  viewpdf.value.canvasHight = Number(
    document.getElementById("canvas_content").clientHeight.toFixed(),
  );
};

const handleImageStampeOnloaded = (e) => {
  var image = document.getElementById("imageStamping");
  stamp_cordinate.value.w = image.width;
  stamp_cordinate.value.h = image.height;
};

const stampOnChange = () => {
  // var stamp_data = {
  //   canvas_width: viewpdf.value.canvasWidth,
  //   canvas_height: viewpdf.value.canvasHight,
  //   canvas_page: viewpdf.value.page,
  //   canvas_total_page: viewpdf.value.pageCount,
  //   stamp_x_left: stamp_cordinate.value.x,
  //   stamp_y_top: stamp_cordinate.value.y,
  //   stamp_x_right:
  //     viewpdf.value.canvasWidth -
  //     (stamp_cordinate.value.x + stamp_cordinate.value.w),
  //   stamp_y_bottom:
  //     viewpdf.value.canvasHight -
  //     (stamp_cordinate.value.y + stamp_cordinate.value.h),
  //   stamp_width: stamp_cordinate.value.w,
  //   stamp_height: stamp_cordinate.value.h,
  // };
  // handleChange(JSON.stringify(stamp_data));
  // emit("update:value", JSON.stringify(stamp_data));
  // console.log("stampOnChange", );

  var canvas_width = viewpdf.value.canvasWidth;
  var canvas_height = viewpdf.value.canvasHight;
  var tempactualWidth = document
    .getElementById("parent_canvas")
    .getBoundingClientRect()
    .width.toFixed();
  var tempactualHeight = document
    .getElementById("parent_canvas")
    .getBoundingClientRect()
    .height.toFixed();
  var page = viewpdf.value.page;
  var scale = tempactualWidth / canvas_width;

  var x2 = stamp_cordinate.value.x + stamp_cordinate.value.w;
  var y2 = stamp_cordinate.value.y + stamp_cordinate.value.h;
  var visLLX = stamp_cordinate.value.x * scale;
  var visLLY = tempactualHeight - 13 - y2 * scale;

  if (visLLX < 0) {
    var visLLX = 0;
  }

  if (visLLY < 0) {
    var visLLY = 0;
  }

  // "lowerLeftX": "",
  //   "lowerLeftY": "",
  //   "upperRightX": "",
  //   "upperRightY": "",

  var data_cordinate = {
    lowerLeftX: visLLX,
    lowerLeftY: visLLY,
    upperRightX: x2 * scale,
    upperRightY: tempactualHeight - 13 - stamp_cordinate.value.y * scale,
    canvasWidth: canvas_width,
    canvasHeight: canvas_height,
    page: page,
  };

  // console.log("data_cordinate", data_cordinate);
  handleChange(JSON.stringify(data_cordinate));
  emit("update:value", data_cordinate);

  // let canvasWidth = viewpdf.value.canvasWidth;
  // let canvasHeight = viewpdf.value.canvasHight;
  // let x = parseFloat(stamp_cordinate.value.x);
  // let y = parseFloat(stamp_cordinate.value.y);

  // let width = document
  //   .getElementById("parent_canvas")
  //   .getBoundingClientRect()
  //   .width.toFixed();
  // let heigh = document
  //   .getElementById("parent_canvas")
  //   .getBoundingClientRect()
  //   .height.toFixed();

  // let scalew = width / canvasWidth;

  // let percent = scalew - 1;
  // let bulat = percent * 100;

  // let pbulat = percent * bulat;

  // if (Math.abs(pbulat) <= 10) {
  //   pbulat = 0;
  // }

  // let scale = scalew * 2;

  // y = y / heigh;
  // y = y * canvasHeight;
  // x = x / width;
  // x = x * canvasWidth;

  // let multi = 1 + scalew;
  // if (width > heigh) {
  //   multi = scale;
  // }

  // let tambah = (Math.abs(bulat) + Math.abs(pbulat)) * multi;
  // if (width >= 700) {
  //   tambah = 0;
  // }

  // y = canvasHeight - y;

  // y = parseFloat(y) + scale;
  // x = parseFloat(x) - scale;

  // let x2 = x + 100 - scale - bulat + pbulat - tambah;
  // let y2 = y - 100 + scale + bulat - pbulat + tambah;

  // console.log("hasil", {
  //   visLLX: x,
  //   visLLY: parseFloat(y2),
  //   visURX: parseFloat(x2),
  //   visURY: y,
  //   visSignaturePage: viewpdf.value.page,
  //   canvasHeight: canvasHeight,
  //   canvasWidth: canvasWidth,
  //   docpass: "",
  //   certificatelevel: "NOT_CERTIFIED",
  //   location: "JAKARTA",
  //   profileName: "emeteraicertificateSigner",
  // });
};

// onMounted(() => {
//   console.log("onMounted");
//   rendered_component.value = true;
// })

// onUnmounted(() => {
//   console.log("onUnmounted");
//   rendered_component.value = false;
// })
</script>

<template>
  <div v-if="source" class="relative flex h-full w-full justify-center">
    <ClientOnly>
      <div
        id="parent_canvas"
        class="relative h-full w-full border-dotted border-gray-400"
      >
        <vue-pdf-embed
          id="canvas_content"
          ref="pdfRef"
          :page="viewpdf.page"
          :source="source"
          class="absolute w-full border"
          :class="{
            'border-red-500 ': !!errorMessage,
            'is-disabled cursor-not-allowed bg-gray-400': disabled,
          }"
          @rendered="handleDocumentRender"
        />
        <div
          id="materai_canvas"
          :style="{
            height: `${viewpdf.canvasHight}px`,
            width: `${viewpdf.canvasWidth}px`,
          }"
        >
          <vue3-draggable-resizable
            v-if="viewpdf.canvasWidth && stamp_image && !readonly"
            v-model:x="stamp_cordinate.x"
            v-model:y="stamp_cordinate.y"
            v-model:w="stamp_cordinate.w"
            v-model:h="stamp_cordinate.h"
            v-model:active="stamp_cordinate.active"
            :init-w="Number(viewpdf.canvasWidth * 0.11)"
            :init-h="Number(viewpdf.canvasHight * 0.11)"
            :draggable="true"
            :resizable="true"
            :lock-aspect-ratio="true"
            :parent="true"
            :handles="['tl', 'tm', 'tr', 'ml', 'mr', 'bl', 'bm', 'br']"
            class-name-draggable="bg-no-repeat bg-cover bg-center relative"
            @activated="print('activated')"
            @deactivated="print('deactivated')"
            @drag-start="print('drag-start')"
            @resize-start="print('resize-start')"
            @dragging="print('dragging')"
            @resizing="print('resizing')"
            @drag-end="stampOnChange()"
            @resize-end="stampOnChange()"
          >
            <img
              id="imageStamping"
              :src="stamp_image"
              class="basolute w-full"
              alt="stamp_image"
              draggable="false"
              @load="
                (e) => {
                  handleImageStampeOnloaded(e);
                }
              "
            />
          </vue3-draggable-resizable>
        </div>
        <!-- up navigation -->
        <div
          class="absolute top-0 flex w-full items-center justify-between bg-slate-50"
        >
          <button
            type="button"
            :disabled="viewpdf.page === 1"
            class="rounded-l bg-slate-500 px-4 py-2 font-bold text-white hover:bg-slate-700"
            @click="viewpdf.page--"
          >
            Sebelumnya
          </button>
          <div class="flex items-center">
            <span class="">
              Page {{ viewpdf.page }} of {{ viewpdf.pageCount }}
            </span>
          </div>
          <button
            type="button"
            :disabled="viewpdf.page === viewpdf.pageCount"
            class="rounded-r bg-slate-500 px-4 py-2 font-bold text-white hover:bg-slate-700"
            @click="viewpdf.page++"
          >
            Selanjutnya
          </button>
        </div>
        <!-- bottom navigation -->
        <div
          class="absolute bottom-0 flex w-full items-center justify-between bg-slate-50"
        >
          <button
            type="button"
            :disabled="viewpdf.page === 1"
            class="rounded-l bg-slate-500 px-4 py-2 font-bold text-white hover:bg-slate-700"
            @click="viewpdf.page--"
          >
            Sebelumnya
          </button>
          <div class="flex items-center">
            <span class="">
              Page {{ viewpdf.page }} of {{ viewpdf.pageCount }}
            </span>
          </div>
          <button
            type="button"
            :disabled="viewpdf.page === viewpdf.pageCount"
            class="rounded-r bg-slate-500 px-4 py-2 font-bold text-white hover:bg-slate-700"
            @click="viewpdf.page++"
          >
            Selanjutnya
          </button>
        </div>
      </div>
      <div
        v-if="!!errorMessage"
        class="absolute -bottom-5 right-0 mt-1 text-xs text-red-500 dark:text-red-500"
      >
        {{ errorMessage }}
      </div>
    </ClientOnly>
  </div>
</template>
