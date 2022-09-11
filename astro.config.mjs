import { defineConfig } from 'astro/config'
import tailwind from '@astrojs/tailwind'
import solidJs from '@astrojs/solid-js'

import node from '@astrojs/node'

// https://astro.build/config
export default defineConfig({
  vite: {
    resolve: {
      alias: {
        $src: '/src',
        $types: '/src/types',
        $lib: '/src/lib',
        $layouts: '/src/layouts',
        $pages: '/src/pages',
      },
    },
  },
  integrations: [tailwind(), solidJs()],
  output: 'server',
  adapter: node(),
})
