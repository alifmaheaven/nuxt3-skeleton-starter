<template>
  <div class="flex flex-col gap-4">
    <div class="flex flex-row items-center justify-between gap-2">
      <div
        id="image"
        class="flex h-12 w-2/3 items-center justify-center rounded-lg border border-black px-4 py-2 text-xl font-semibold tracking-[.25em]"
        :class="[text_decoration, font_style, decoration_style]"
        selectable="False"
      ></div>

      <Icon
        name="material-symbols:refresh-rounded"
        color="#000"
        size="20px"
        class="flex h-12 w-1/3 cursor-pointer items-center justify-center rounded-lg border border-black px-4 py-2"
        @click="generateCaptcha()"
      />
    </div>

    <input
      id="submit"
      type="text"
      placeholder="Captcha code"
      class="rounded-lg border border-black"
    />

    <button
      class="rounded-lg bg-green-500 px-4 py-2 text-white"
      @click="printmsg()"
    >
      Submit
    </button>

    <p id="key"></p>
  </div>
</template>

<script setup>
let captcha;
var text_decoration = ref();
var font_style = ref();
var decoration_style = ref();

const generateCaptcha = () => {
  // Clear old input
  document.getElementById("submit").value = "";

  // Access the element to store
  // the generated captcha
  captcha = document.getElementById("image");
  let uniquechar = "";

  const randomchar =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#&";
  const decoration = ["underline", "line-through"];
  const style = ["italic", "not-italic"];
  const decoration_type = [
    "decoration-solid",
    "decoration-double",
    "decoration-dotted",
    "decoration-dashed",
    "decoration-wavy",
  ];

  // Generate captcha for length of
  // 5 with random character
  for (let i = 1; i < 5; i++) {
    uniquechar += randomchar.charAt(Math.random() * randomchar.length);
  }

  // Random style
  const random_decoration = Math.floor(Math.random() * decoration.length);
  const random_style = Math.floor(Math.random() * style.length);
  const random_decoration_type = Math.floor(
    Math.random() * decoration_type.length,
  );

  // Store generated input
  captcha.innerHTML = uniquechar;
  console.log(text_decoration.value);

  // Add classes
  text_decoration.value = decoration[random_decoration];
  font_style.value = style[random_style];
  decoration_style = decoration_type[random_decoration_type];
};

const printmsg = () => {
  const usr_input = document.getElementById("submit").value;

  // Check whether the input is equal
  // to generated captcha or not
  if (usr_input == captcha.innerHTML) {
    let s = (document.getElementById("key").innerHTML = "Matched");
    generateCaptcha();
  } else {
    let s = (document.getElementById("key").innerHTML = "not Matched");
    generateCaptcha();
  }
};

onMounted(() => {
  generateCaptcha();
});
</script>

<style lang="scss" scoped></style>
