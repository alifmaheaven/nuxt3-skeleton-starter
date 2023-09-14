<template>
  <div class="columns">
    <div id="digitgroup" class="digit-group column is-10">
      <input
        v-for="(item, index) in valueToInput"
        :id="`digit-${index}`"
        :key="index"
        v-model="valueToInput[index]"
        :type="`${!show && type == 'pin' ? 'password' : 'text'}`"
        maxlength="1"
        :class="{
          invalid: errorMessage,
        }"
        @keyup="pushValues"
        @keypress="onlynumber"
      />
      <div v-if="errorMessage" class="columns">
        <div class="column">
          <p style="color: red; font-weight: bold">{{ errorMessage }}</p>
        </div>
      </div>
    </div>
    <div
      v-if="type == 'pin'"
      class="column is-2 is-flex is-justify-content-center is-flex-direction-row"
    >
      <button
        type="button"
        style="background: transparent; border: none"
        @click="show = !show"
      >
        <Icon
          :name="show ? 'iconoir:eye-alt' : 'iconoir:eye-close'"
          class="relative h-10 w-10"
        />
      </button>
    </div>
  </div>
</template>

<script setup>
import { computed, toRef, useSlots, ref } from "vue";
import { useField } from "vee-validate";
import { number } from "yup";

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
  jumlahdigit: {
    type: Number,
    default: 4,
  },
  type: {
    type: String,
    default: "otp",
  },
});

var show = ref(false);

const name = toRef(props, "name");
const {
  value: inputValue,
  errorMessage,
  handleBlur,
  handleChange,
  meta,
} = useField(name);

const valueToInput = computed({
  get() {
    var valuenya = inputValue.value;
    var arrayobject = [];
    var jumlahdigit = parseInt(props.jumlahdigit);
    if (valuenya == null) {
      for (let index = 0; index < jumlahdigit; index++) {
        arrayobject.push("");
      }
      return arrayobject;
    } else {
      valuenya.split("").forEach((element) => {
        arrayobject.push(element);
      });
      if (valuenya.length != jumlahdigit) {
        for (let index = 0; index < jumlahdigit - valuenya.length; index++) {
          arrayobject.push("");
        }
      }
      return arrayobject;
    }
  },
  set: function (newValue) {
    handleChange(newValue.join("").replace(/\D/g, ""));
  },
});

const onlynumber = (e) => {
  var keyCode = e.which;
  // var value = e.target.value
  /*
      48-57 - (0-9)Numbers
      45 - (strip)
      46 - (titik)
      65-90 - (A-Z)
      97-122 - (a-z)
      8 - (backspace)
      32 - (space)
      */
  // Not allow special
  // if (value.length < 12) {
  if (keyCode < 48 || keyCode > 58) {
    e.preventDefault();
  }
  // } else {
  //     e.preventDefault();
  // }
};

const pushValues = (e) => {
  const arraytoinput = valueToInput.value;
  const parent = document.getElementById("digitgroup");
  const allChildElements = parent.querySelectorAll("input");
  const length = arraytoinput.join("").length;

  switch (e.key) {
    case "Backspace":
    case "ArrowLeft":
      if (length !== 0 && allChildElements[length - 1]) {
        allChildElements[length - 1].focus();
      }
      break;
    default:
      const keyCode = parseInt(e.key);
      if (keyCode >= 0 && keyCode <= 9) {
        if (
          length !== parseInt(props.jumlahdigit) &&
          allChildElements[length]
        ) {
          allChildElements[length].focus();
        }
      }
  }

  if (length !== parseInt(props.jumlahdigit)) {
    handleChange(arraytoinput.join("").replace(/\D/g, ""));
  } else {
    handleChange(arraytoinput.join("").replace(/\D/g, ""));
  }
  if (e.key === "Backspace") {
    e.preventDefault();
  }
};
</script>

<style scoped>
.digit-group input {
  @apply h-16 w-16 rounded-lg border border-gray-300 bg-white px-2 py-3 shadow;
  background-color: #ffffff;
  line-height: 50px;
  text-align: center;
  font-size: 24px;
  font-family: "Raleway", sans-serif;
  font-weight: 200;
  color: black;
  margin: 0 2px;
}
.digit-group .splitter {
  padding: 0 5px;
  color: white;
  font-size: 24px;
}
.invalid {
  border: 3px solid red !important;
}
</style>
