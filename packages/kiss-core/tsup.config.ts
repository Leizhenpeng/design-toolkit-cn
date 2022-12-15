import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/index.ts', 'types/index.ts'],
  format: ['esm', 'cjs'],
  splitting: false,
  clean: true,
  dts: true,
  outDir: 'dist',
})
