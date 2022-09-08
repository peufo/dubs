import { defineConfig } from 'astro/config'

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
})
