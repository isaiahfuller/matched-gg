import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const url = "https://isaiah.moe/gbk";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 4467,
    proxy: {
      "/games": {
        target: url,
        changeOrigin: false,
        secure: false,
      },
      "/profile": {
        target: url,
        changeOrigin: false,
        secure: false,
      },
      "/verify": {
        target: url,
        changeOrigin: false,
        secure: false,
      },
      "/auth": {
        target: url,
        changeOrigin: false,
        secure: false,
      },
      "/local": {
        target: url,
        changeOrigin: false,
        secure: false,
      },
      "/steam": {
        target: url,
        changeOrigin: false,
        secure: false,
      },
    },
  },
});
