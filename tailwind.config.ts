import type { Config } from "tailwindcss";
import defaultTheme from "tailwindcss/defaultTheme";
import colors from "tailwindcss/colors";
const tailwindForms = require("@tailwindcss/forms");

// https://uicolors.app color pallet

export default <Partial<Config>>{
  mode: "jit",
  darkMode: "class",
  content: [
    "./components/**/*.{vue,js,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./composables/**/*.{js,ts}",
    "./plugins/**/*.{js,ts}",
    "./App.{js,ts,vue}",
    "./app.{js,ts,vue}",
    "./Error.{js,ts,vue}",
    "./error.{js,ts,vue}",
    "docs/content/**/*.md",
  ],
  theme: {
    screens: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
    extend: {
      maxWidth: {
        "8xl": "90rem",
      },
      colors: {
        custom_primary_color: {
          default: "#f37480",
          50: '#fef2f2',
          100: '#fee5e6',
          200: '#fbd0d3',
          300: '#f8a9af',
          400: '#f37480',
          500: '#ea495d',
          600: '#d62845',
          700: '#b51b39',
          800: '#971a36',
          900: '#821934',
          950: '#480918',
        },
        secondary: colors.gray,
        success: colors.emerald,
        info: colors.sky,
        warning: colors.amber,
        pending: colors.amber,
        danger: colors.red,
        light: "var(--color-light)",
        dark: "var(--color-dark)",
        transparent: colors.transparent,
        current: colors.current,
        black: colors.black,
        white: colors.white,
        gray: colors.slate,
        green: colors.emerald,
        purple: colors.violet,
        yellow: colors.amber,
        pink: colors.fuchsia,
        red: colors.rose,
        blue: colors.blue,
        indigo: colors.indigo,
        slate: {
          50: "var(--color-slate-50)",
          100: "var(--color-slate-100)",
          200: "var(--color-slate-200)",
          300: "var(--color-slate-300)",
          400: "var(--color-slate-400)",
          500: "var(--color-slate-500)",
          600: "var(--color-slate-600)",
          700: "var(--color-slate-700)",
          800: "var(--color-slate-800)",
          900: "var(--color-slate-900)",
        },
        darkmode: {
          50: "var(--color-darkmode-50)",
          100: "var(--color-darkmode-100)",
          200: "var(--color-darkmode-200)",
          300: "var(--color-darkmode-300)",
          400: "var(--color-darkmode-400)",
          500: "var(--color-darkmode-500)",
          600: "var(--color-darkmode-600)",
          700: "var(--color-darkmode-700)",
          800: "var(--color-darkmode-800)",
          900: "var(--color-darkmode-900)",
        },
      },
      fontFamily: {
        sans: ["Nunito", ...defaultTheme.fontFamily.sans],
        inter: ["Inter Variable"],
        bitstream: ["Bitstream Iowan Old Style"],
      },
      container: {
        center: true,
      },
    },
  },
  backgroundColor: (theme: any) => ({
    ...theme("colors"),
  }),
  borderColor: (theme: any) => ({
    ...theme("colors"),
  }),
  plugins: [tailwindForms],
};
