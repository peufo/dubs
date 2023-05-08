import { sveltekit } from '@sveltejs/kit/vite'
import { imagetools } from 'vite-imagetools'

const payloadUrl = 'http://localhost:5002'

/** @type {import('vite').UserConfig} */
const config = {
  plugins: [imagetools(), sveltekit()],
  server: {
    proxy: {
      '/api': payloadUrl,
      '/media': payloadUrl,
      '/admin': payloadUrl,
    },
  },
}

export default config
