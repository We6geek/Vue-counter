import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  base: './', // Или '/vue-counter/' если хотите абсолютные пути
  build: {
    outDir: 'dist',
    assetsDir: 'assets'
  }
})