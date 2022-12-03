
import { defineConfig } from 'tsup'

export default defineConfig({
    entryPoints: ['src/index.ts'],
    format: ['esm', 'cjs'],
    splitting: false,
    clean: true,
    dts: true,
    outDir: "dist",
})