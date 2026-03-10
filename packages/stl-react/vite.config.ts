import path from 'path'
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
        format === 'cjs' ? 'stl-react.js' : `stl-react.${format}.js`,
    },
    rollupOptions: {
      external: (id: string) =>
        Object.keys(pkg.peerDependencies).some(
          (dep) => id === dep || id.startsWith(dep + '/'),
        ),
      output: {
        assetFileNames: ({ name }: Record<string, any>) => {
          if (name === 'style.css') return 'stl-react.css'
          return name ?? 'custom.js'
        },
        // Since we publish our ./src folder, there's no point
        // in bloating sourcemaps with another copy of it.
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
  ssr: {
    noExternal: true,
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
