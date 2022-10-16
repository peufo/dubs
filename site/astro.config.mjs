import { defineConfig } from 'astro/config'
import tailwind from '@astrojs/tailwind'
import solidJs from '@astrojs/solid-js'
import node from '@astrojs/node'

export default defineConfig({
  integrations: [tailwind(), solidJs()],
  output: 'server',
  adapter: node({ mode: 'middleware' }),
  vite: {
    resolve: {
      alias: {
        types: '../types',
        $public: '/public',
        $src: '/src',
        $lib: '/src/lib',
        $layouts: '/src/layouts',
        $pages: '/src/pages',
        $models: '/src/models',
      },
    },
  },
})
