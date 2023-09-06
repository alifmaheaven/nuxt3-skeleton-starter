<template>
  <div class="flex flex-col gap-4">
    <div class="flex flex-row items-center gap-2 justify-between">
      <div 
        id="image"
        class="border border-black px-4 py-2 rounded-lg text-xl tracking-[.25em] font-semibold w-2/3 h-12 flex items-center justify-center"
        :class="[text_decoration, font_style, decoration_style]"
        selectable="False"
      >
      </div>

      <Icon
        @click="generateCaptcha()"
        name="material-symbols:refresh-rounded"
        color="#000"
        size="20px"
        class="cursor-pointer border border-black px-4 py-2 rounded-lg w-1/3 h-12 flex items-center justify-center"
      />
    </div>

    <input
      type="text"
      id="submit"
      placeholder="Captcha code"
      class="border border-black rounded-lg"
    />
  
    <button 
      @click="printmsg()"
      class="rounded-lg bg-green-500 text-white px-4 py-2"
    >
      Submit
    </button>

    <p id="key"></p>
  </div>
</template>

<script setup>
let captcha;
var text_decoration = ref()
var font_style = ref()
var decoration_style = ref()

const generateCaptcha = () => {

	// Clear old input
	document.getElementById("submit").value = "";

	// Access the element to store
	// the generated captcha
	captcha = document.getElementById("image");
	let uniquechar = "";

	const randomchar = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#&";
  const decoration = [
    "underline", "line-through"
  ]
  const style = [
    "italic", "not-italic"
  ]
  const decoration_type = [
    "decoration-solid", "decoration-double", "decoration-dotted", "decoration-dashed", "decoration-wavy"
  ]

	// Generate captcha for length of
	// 5 with random character
	for (let i = 1; i < 5; i++) {
		uniquechar += randomchar.charAt(Math.random() * randomchar.length)
	}

  // Random style
  const random_decoration = Math.floor(Math.random() * decoration.length)
  const random_style = Math.floor(Math.random() * style.length)
  const random_decoration_type = Math.floor(Math.random() * decoration_type.length)

	// Store generated input
	captcha.innerHTML = uniquechar;
  console.log(text_decoration.value);

  // Add classes
  text_decoration.value = decoration[random_decoration]
  font_style.value = style[random_style]
  decoration_style = decoration_type[random_decoration_type]
}

const printmsg = () => {
	const usr_input = document.getElementById("submit").value;

	// Check whether the input is equal
	// to generated captcha or not
	if (usr_input == captcha.innerHTML) {
		let s = document.getElementById("key").innerHTML = "Matched";
		generateCaptcha();
	}
	else {
		let s = document.getElementById("key").innerHTML = "not Matched";
		generateCaptcha();
	}
}

onMounted(() => {
  generateCaptcha()
})
</script>

<style lang="scss" scoped>
</style>