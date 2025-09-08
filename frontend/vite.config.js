import { sveltekit } from "@sveltejs/kit/vite";
import { imagetools } from "vite-imagetools";

const payloadUrl = `http://localhost:${
  process.env.PUBLIC_BACKEND_PORT || 5000
}`;

/** @type {import('vite').UserConfig} */
const config = {
  plugins: [imagetools(), sveltekit()],
  server: {
    proxy: {
      "/api": payloadUrl,
      "/media": payloadUrl,
      "/admin": payloadUrl,
    },
  },
};

export default config;
