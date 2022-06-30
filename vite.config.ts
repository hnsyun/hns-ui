import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import legacy from '@vitejs/plugin-legacy'
import VueMd from './plugin/vite-plugin-vue-md'
import Inspect from 'vite-plugin-inspect'
import { join } from 'path'
// https://vitejs.dev/config/
export default defineConfig({
  root: join(__dirname, 'docs'),
  plugins: [
    Inspect(),

    legacy({
      targets: ['defaults', 'not IE 11']
    }),
    vueJsx(),
    vue(),
    VueMd()
  ]
})
