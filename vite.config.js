import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  base: '/sistema-Farma/',

  plugins: [
    react(),
    tailwindcss(),
  ],

  server: {
    port: 5173,
    open: true,
  },

  resolve: {
    alias: {
      '@layouts': '/src/layouts',
      '@': '/src',
      '@components': '/src/components',
      '@pages': '/src/pages',
      '@services': '/src/services',
      '@context': '/src/context',
      '@utils': '/src/utils',
      '@config': '/src/config',
      '@router': '/src/router',
      '@styles': '/src/styles',
    },
  },
})