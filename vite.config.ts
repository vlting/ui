import { resolve } from 'node:path'
import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      formats: ['es', 'cjs'],
      fileName: (format) => (format === 'es' ? 'esm/index.mjs' : 'cjs/index.cjs'),
    },
    rollupOptions: {
      external: [
        /^react/,
        /^react-dom/,
        /^react-native/,
        /^@vlting\//,
        /^@tanstack\//,
        /^expo-/,
        'victory',
      ],
    },
    outDir: 'dist',
    sourcemap: true,
    minify: false,
    target: 'esnext',
    emptyOutDir: true,
    reportCompressedSize: false,
  },
})
