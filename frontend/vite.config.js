import { sveltekit } from "@sveltejs/kit/vite";
import { imagetools } from "vite-imagetools";
import { defineConfig, loadEnv } from "vite";

export default defineConfig(({ mode }) => {
  // Unique .env du projet, à la racine du monorepo
  const env = loadEnv(mode, "..", "");
  const backendUrl = env.BACKEND_URL || "http://localhost:5555";

  return {
    plugins: [imagetools(), sveltekit()],
    server: {
      proxy: {
        "/api": backendUrl,
        "/media": backendUrl,
        "/admin": backendUrl,
      },
    },
  };
});
