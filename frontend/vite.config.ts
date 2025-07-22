import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const url = "http://localhost:4468";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    include: ["**/*.test.tsx"],
    setupFiles: ["./src/setupTests.ts"],
    environment: "jsdom",
    globals: true,
  },
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
      "/logout": {
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
