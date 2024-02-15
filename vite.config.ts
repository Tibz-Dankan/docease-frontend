import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()],
// });
export default defineConfig({
  plugins: [react()],
  base: "/",
  build: {
    rollupOptions: {
      input: ["index.html", "firebase-messaging-sw.js"],
      output: {
        entryFileNames: "[name].js",
      },
    },
  },
});
