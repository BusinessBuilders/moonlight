import { defineConfig } from 'tsup'

export default defineConfig([
  {
    entry: ['src/index.ts'],
    format: ['esm', 'cjs'],
    dts: true,
    sourcemap: true,
    clean: true,
    target: 'es2018',
    external: ['react', 'react-dom'],
    esbuildOptions(options) {
      options.banner = {
        js: '"use client"',
      }
    },
  },
  {
    entry: ['src/server.ts'],
    format: ['esm', 'cjs'],
    dts: true,
    sourcemap: true,
    target: 'es2018',
    external: ['react', 'react-dom'],
  },
])
