import { defineConfig } from 'astro/config'
import tailwind from '@astrojs/tailwind'
import solidJs from '@astrojs/solid-js'

// https://astro.build/config
export default defineConfig({
  vite: {
    resolve: {
      alias: {
        $lib: '/src/lib',
        $layouts: '/src/layouts',
        $pages: '/src/pages',
      },
    },
  },
  integrations: [tailwind(), solidJs()],
})
