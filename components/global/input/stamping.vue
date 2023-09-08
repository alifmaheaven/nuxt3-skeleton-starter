<script setup>
import VuePdfEmbed from "vue-pdf-embed";
import Vue3DraggableResizable from "vue3-draggable-resizable";
import "vue3-draggable-resizable/dist/Vue3DraggableResizable.css";
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
    default: "/images/logo-ematerai.png",
  },
  source: {
    type: String,
    default:
      "https://afrovenator.digitalevent.id/ptba/file/file_1622775526_Notulen%20Kebijakan%20ITMS.pdf?X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=Omi2rSOjfWRDE4816slEp7KxiCbkxz3N%2F20230907%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20230907T034603Z&X-Amz-SignedHeaders=host&X-Amz-Expires=86400&X-Amz-Signature=d789b6fc7cc49d0a66828f4f7f4062e5b0be11a700ec866677ba5ac283e44a6a",
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
    document.getElementById("canvas_content").clientWidth.toFixed()
  );
  viewpdf.value.canvasHight = Number(
    document.getElementById("canvas_content").clientHeight.toFixed()
  );
};

const handleImageStampeOnloaded = (e) => {
  var image = document.getElementById("imageStamping");
  stamp_cordinate.value.w = image.width;
  stamp_cordinate.value.h = image.height;
};

const stampOnChange = () => {
  var stamp_data = {
    canvas_width: viewpdf.value.canvasWidth,
    canvas_height: viewpdf.value.canvasHight,
    canvas_page: viewpdf.value.page,
    canvas_total_page: viewpdf.value.pageCount,
    stamp_x_left: stamp_cordinate.value.x,
    stamp_y_top: stamp_cordinate.value.y,
    stamp_x_right: viewpdf.value.canvasWidth - (stamp_cordinate.value.x + stamp_cordinate.value.w),
    stamp_y_bottom: viewpdf.value.canvasHight - (stamp_cordinate.value.y + stamp_cordinate.value.h),
    stamp_width: stamp_cordinate.value.w,
    stamp_height: stamp_cordinate.value.h,
  }
  handleChange(JSON.stringify(stamp_data));
  // console.log("stampOnChange", );
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
</script>

<template>
  <div class="w-full h-full flex justify-center">
    <ClientOnly>
      <div
        id="parent_canvas"
        class="border-dotted border-gray-400 relative w-fit h-full"
      >
        <VuePdfEmbed
          id="canvas_content"
          ref="pdfRef"
          :page="viewpdf.page"
          :source="source"
          @rendered="handleDocumentRender"
          class="absolute"
        />
        <div
          id="materai_canvas"
          :style="{
            height: `${viewpdf.canvasHight}px`,
            width: `${viewpdf.canvasWidth}px`,
          }"
        >
          <Vue3DraggableResizable
            v-if="viewpdf.canvasWidth && stamp_image"
            :initW="Number(viewpdf.canvasWidth * 0.11)"
            :initH="Number(viewpdf.canvasHight * 0.11)"
            v-model:x="stamp_cordinate.x"
            v-model:y="stamp_cordinate.y"
            v-model:w="stamp_cordinate.w"
            v-model:h="stamp_cordinate.h"
            v-model:active="stamp_cordinate.active"
            :draggable="true"
            :resizable="true"
            :lockAspectRatio="true"
            :parent="true"
            :handles="['tl', 'tm', 'tr', 'ml', 'mr', 'bl', 'bm', 'br']"
            @activated="print('activated')"
            @deactivated="print('deactivated')"
            @drag-start="print('drag-start')"
            @resize-start="print('resize-start')"
            @dragging="print('dragging')"
            @resizing="print('resizing')"
            @drag-end="stampOnChange()"
            @resize-end="stampOnChange()"
            classNameDraggable="bg-no-repeat bg-cover bg-center relative"
          >
            <img
              id="imageStamping"
              :src="stamp_image"
              class="w-full basolute"
              alt="stamp_image"
              draggable="false"
              @load="
                (e) => {
                  handleImageStampeOnloaded(e);
                }
              "
            />
          </Vue3DraggableResizable>
        </div>
      </div>
    </ClientOnly>
  </div>
</template>