import adapter from '@sveltejs/adapter-node'
import { vitePreprocess } from '@sveltejs/kit/vite'
const dev = process.env.NODE_ENV !== 'production'

/** @type {import('@sveltejs/kit').Config} */
const config = {
  // Consult https://kit.svelte.dev/docs/integrations#preprocessors
  preprocess: vitePreprocess(),
  kit: {
    adapter: adapter({
      envPrefix: 'DUBS_',
      precompress: true,
    }),
    csrf: {
      checkOrigin: !dev,
    },
    alias: {
      $lib: './src/lib',
      types: '../types',
    },
  },
}

export default config
