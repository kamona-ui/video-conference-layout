import { resolve } from 'path'
import { defineConfig } from 'vite'
import vueJSX from '@vitejs/plugin-vue-jsx'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vueJSX()],

  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },

  base: process.env.NODE_ENV == 'production' ? '/video-conference-layout/' : '/',
})
