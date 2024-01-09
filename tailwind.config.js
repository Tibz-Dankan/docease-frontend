/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      xs: "480px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
    extend: {
      colors: {
        transparent: "transparent",
        current: "currentColor",
        primary: "#1c7ed6",
        primaryDark: "#1864ab",
        primaryLight: "#d0ebff",
        secondary: "#18A0A9",
      },
    },
  },
  plugins: [],
};
