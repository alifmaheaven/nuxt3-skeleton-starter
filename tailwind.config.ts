import type { Config } from "tailwindcss";
import defaultTheme from "tailwindcss/defaultTheme";
import colors from "tailwindcss/colors";
const tailwindForms = require("@tailwindcss/forms");

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
        primary: {
          default: "#e31b54",
          50: "#ffcdd2",
          100: "#ef9a9a",
          200: "#e57373",
          300: "#ef5350",
          400: "#f44336",
          500: "#e31b54",
          600: "#e53935",
          700: "#d32f2f",
          800: "#c62828",
          900: "#b71c1c",
        },
        primary_for_nuxtui: {
          default: "#e31b54",
          50: "#ffcdd2",
          100: "#ef9a9a",
          200: "#e57373",
          300: "#ef5350",
          400: "#f44336",
          500: "#e31b54",
          600: "#e53935",
          700: "#d32f2f",
          800: "#c62828",
          900: "#b71c1c",
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
