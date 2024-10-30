import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/profile": {
        target: "http://localhost:3000/",
        changeOrigin: false,
        secure: false,
      },
      "/verify": {
        target: "http://localhost:3000/",
        changeOrigin: false,
        secure: false,
      },
      "/auth": {
        target: "http://localhost:3000/",
        changeOrigin: false,
        secure: false,
      },
      "/local": {
        target: "http://localhost:3000/",
        changeOrigin: false,
        secure: false,
      },
      "/steam": {
        target: "http://localhost:3000/",
        changeOrigin: false,
        secure: false,
      },
    },
  },
});
