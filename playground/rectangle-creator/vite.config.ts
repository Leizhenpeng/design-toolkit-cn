import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { viteSingleFile } from 'vite-plugin-singlefile'
import { obfuscator } from 'rollup-obfuscator'
import path from 'path'

import clientNow from './scripts/clientParse'
// https://vitejs.dev/config/

const isDev = process.env.NODE_ENV === 'development'

const ifCompress = (fn: () => any, defaultVal: any = {}) => {
  if (!isDev) return fn()
  return defaultVal
}
export const commonConfig = () => {
  return {
    resolve: {
      alias: {
        '@/': `${path.resolve(__dirname, 'src')}/`
      }
    }
  }
}

export default defineConfig({
  ...commonConfig(),
  plugins: [
    react(),
    viteSingleFile(),
    ifCompress(() =>
      obfuscator({
        optionsPreset: 'low-obfuscation'
      })
    )
  ],
  esbuild: {
    drop: ['debugger'],
    pure: ifCompress(() => {
      return ['console.log', 'console.error', 'console.warn', 'console.debug', 'console.trace']
    }, [])
  },
  build: {
    outDir: `plugin/${clientNow}/ui`,
    minify: ifCompress(() => 'esbuild', false),
    sourcemap: isDev,
    watch: isDev ? {} : null,
    cssCodeSplit: false,
    assetsInlineLimit: 100000000000000000,
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'index.html')
      },
      output: {
        entryFileNames: 'assets/[name].js'
      }
    }
  }
})
