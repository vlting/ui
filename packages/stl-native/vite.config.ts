import path from 'node:path'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'
import pkg from './package.json'

export default defineConfig({
  build: {
    minify: true,
    emptyOutDir: false,
    reportCompressedSize: false,
    outDir: path.resolve(__dirname, './dist'),
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      formats: ['es', 'cjs'],
      fileName: (format) =>
        format === 'cjs' ? 'stl-native.js' : `stl-native.${format}.js`,
    },
    rollupOptions: {
      external: (id: string) =>
        Object.keys(pkg.peerDependencies).some(
          (dep) => id === dep || id.startsWith(`${dep}/`),
        ),
      output: {
        sourcemapExcludeSources: true,
      },
    },
    sourcemap: true,
    target: 'esnext',
  },
  optimizeDeps: {
    esbuildOptions: {
      keepNames: true,
    },
  },
  plugins: [
    dts({
      beforeWriteFile: (filePath, content) => ({
        filePath,
        content: content.replace(/packages\/stl\/dist[^'")]*/g, '@vlting/stl'),
      }),
    }),
  ],
})
