/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
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
        primary: "#1c7ed6",
        primaryLight: "#a5d8ff",
        primaryDark: "#1864ab",
        secondary: "#37b24d",
        "gray-opacity": "rgba(0, 0, 0, 0.15)",
        info: "#5BC0DE",
        warning: "#F0AD4E",
        error: "#f03e3e",
        success: "#55C57A",
      },
      animation: {
        slideDown: "slideDown 0.5s ease-out forwards",
        moveInnerLoaderToRight: "moveInnerLoaderToRight 0.8s infinite ease-out",
        increaseWidthFromZeroToFull: "increaseWidthFromZeroToFull 5s linear",
        radiate: "radiate 5s linear",
      },
      keyframes: {
        slideDown: {
          "0%": { opacity: "0", transform: "translateY(-150px)" },
          "100%": { opacity: "1", transform: "translateY(0px)" },
        },
        moveInnerLoaderToRight: {
          "0%": { left: "0%" },
          "100%": { left: "45%" },
        },
        increaseWidthFromZeroToFull: {
          "0%": { width: "0%" },
          "100%": { width: "100%" },
        },
        radiate: {
          "0%": { transform: "scaleX(0)" },
          "100%": { transform: "scaleX(1)" },
        },
      },
      spacing: {
        "left-height": "calc(50vh - 2rem)",
        "right-height": "calc(50vh + 2rem)",
      },
    },
  },
  plugins: [],
});
