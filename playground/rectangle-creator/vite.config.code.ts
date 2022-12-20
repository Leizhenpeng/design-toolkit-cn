import clientNow from './scripts/clientParse'
import { defineConfig } from 'vite'
import packageJson from './package.json'
import { KissConfigPlugin } from 'unplugin-kiss-config/vite'
import { clientType } from 'unplugin-kiss-config/types'

const config = defineConfig(({ mode }) => {
  const isDev = mode === 'development'
  const ifCompress = (fn: () => any, defaultVal: any = {}) => {
    if (isDev) {
      return fn()
    }
    return defaultVal
  }
  return {
    plugins: [KissConfigPlugin({
      outDir: 'plugin',
      client: clientNow as clientType
    })],
    build: {
      target: 'es2015',
      outDir: `plugin/${clientNow}/code`,
      minify: ifCompress(() => 'terser', false),
      terserOptions: ifCompress(
        () => ({
          compress: {
            drop_console: true
          }
        }),
        null
      ),
      watch: isDev ? {} : null,
      sourcemap: isDev,
      lib: {
        entry: './src/code.ts',
        name: packageJson.name,
        formats: ['es']
      },
      rollupOptions: {
        output: {
          entryFileNames: 'index.js',
          extend: true
        }
      }
    }
  }
})

export default config
