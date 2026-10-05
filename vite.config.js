import { defineConfig } from "vite";

export default defineConfig({
  base: "/memory-game/",
  build: {
    sourcemap: true,
    rollupOptions: {
      input: {
        main: "index.html",
      },
    },
  },
});
