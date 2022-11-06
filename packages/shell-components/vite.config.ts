import { BuildOptions, defineConfig } from 'vite'
import path from 'path'
import vue from '@vitejs/plugin-vue'

// const mode = process.env.MODE

const modalBuild: BuildOptions = {
  outDir: 'dist/modal',
  target: 'esnext',
  minify: 'terser',
  lib: {
    entry: 'src/modal/index.ts',
    formats: ['umd'],
    name: 'modal',
    fileName: 'modal',
  },
}

const build = modalBuild

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@modal': path.resolve(__dirname, 'src/modal'),
    },
  },
  build,
  plugins: [vue({
    // template: {
    //   compilerOptions: {
    //     // 将所有包含短横线的标签作为自定义元素处理
    //     isCustomElement: tag => tag.includes('-')
    //   }
    // }
  })]
})
