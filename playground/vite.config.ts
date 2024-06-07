import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

// import AutoImport from 'unplugin-auto-import/vite'
// import Components from 'unplugin-vue-components/vite'
// import { OpuntiaResolver } from 'opuntia-ui'

export default defineConfig({
  server: {
    port: 5173,
    host: true,
  },
  resolve: {
    conditions: ['dev'],
  },
  plugins: [
    vue(),
    vueJsx(),
    // AutoImport({
    //   resolvers: [OpuntiaResolver()],
    //   dts: './src/auto-imports.d.ts',
    // }),
    // Components({
    //   resolvers: [OpuntiaResolver()],
    //   dts: './src/components.d.ts',
    // }),
  ],
})
