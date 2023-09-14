module.exports = {
  env: {
    node: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:vue/vue3-recommended",
    "plugin:prettier/recommended",
    "plugin:prettier-plugin-tailwindcss/recommended",
    "prettier",
    "prettier-plugin-tailwindcss",
  ],
  rules: {
    // override/add rules settings here, such as:
    "vue/no-unused-vars": "error",
    "vue/require-default-prop": "off",
    "vue/multi-word-component-names": "off",
    "vue/no-v-html": "off",
    "vue/no-multiple-template-root": "off",
  },
};
