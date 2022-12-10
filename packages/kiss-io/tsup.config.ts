import type { Options } from 'tsup'

export const tsup: Options = {
  dts: true,
  outDir: 'dist',
  splitting: false,
  clean: true,
  format: ['cjs', 'esm'],
  ignoreWatch: [
    'dist',
  ],
  entryPoints: [
    'src/index.ts',
  ],
}
