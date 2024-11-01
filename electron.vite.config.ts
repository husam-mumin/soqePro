import { join, resolve } from 'path'
import { defineConfig, externalizeDepsPlugin } from 'electron-vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  main: {
    plugins: [externalizeDepsPlugin()],
    build: {
      rollupOptions: {
        external: ['electron-settings']
      }
    }
  },
  preload: {
    build: {
      rollupOptions: {
        input: {
          index: join(__dirname, './src/preload/index.ts'),
          login: join(__dirname, './src/preload/login/login.ts'),
          label: join(__dirname, './src/preload/static/label.ts')
        }
      }
    },
    plugins: [externalizeDepsPlugin()]
  },
  renderer: {
    build: {
      rollupOptions: {
        input: {
          index: join(__dirname, './src/renderer/index.html'),
          login: join(__dirname, './src/renderer/login.html'),
          label: join(__dirname, './src/renderer/static/label.html')
        }
      }
    },
    resolve: {
      alias: {
        '@renderer': resolve('src/renderer/src')
      }
    },
    plugins: [react()]
  }
})
