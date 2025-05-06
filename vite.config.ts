import tailwindcss from "@tailwindcss/vite";
import vue from "@vitejs/plugin-vue";
import path from "node:path";
import unused from "unplugin-unused/vite";
import router from "unplugin-vue-router/vite";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    router(),
    vue(),
    tailwindcss(),
    unused({
      ignore: {
        dependencies: ["@tailwindcss/vite", "tailwindcss", "tw-animate-css"],
      },
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    cors: true,
    hmr: {
      overlay: true,
    },
    port: 3000,
  },
});
