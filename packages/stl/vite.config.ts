import path from 'path'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'
import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin'

export default defineConfig({
  build: {
    minify: true,
    emptyOutDir: false,
    reportCompressedSize: false,
    outDir: path.resolve(__dirname, './dist'),
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      formats: ['es', 'cjs'],
      fileName: (format) => (format === 'cjs' ? 'stl.js' : `stl.${format}.js`),
    },
    rollupOptions: {
      output: {
        assetFileNames: ({ name }: Record<string, any>) => {
          if (name === 'style.css') return 'stl.css'
          return name ?? 'custom.js'
        },
        sourcemapExcludeSources: true,
      },
    },
    sourcemap: true,
    // Reduce bloat from legacy polyfills.
    target: 'esnext',
  },
  optimizeDeps: {
    esbuildOptions: {
      keepNames: true,
    },
  },
  plugins: [dts(), vanillaExtractPlugin({ identifiers: 'short' })],
})
