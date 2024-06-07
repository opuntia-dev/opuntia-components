import { defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

export default defineConfig({
  resolve: {
    conditions: ['dev'],
  },
  plugins: [
    vue(),
    vueJsx(),
  ],
  test: {
    environment: 'jsdom',
  },
})
