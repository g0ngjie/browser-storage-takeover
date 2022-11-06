import { defineConfig } from 'vite'
import path from 'path'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  return {
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
      },
    },
    build: {
      outDir: 'dist',
      target: 'esnext',
      minify: 'terser',
      lib: {
        entry: './src/main.ts',
        name: '__component__',
        formats: ['iife'],
        fileName: 'index'
      },
    },
    define: {
      'process.env': {},
      __DEV__: mode === 'development'
    },
    plugins: [vue()]
  }
})
