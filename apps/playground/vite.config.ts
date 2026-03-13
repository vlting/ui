import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { viteAliases } from '../../config/resolve'

export default defineConfig({
  define: {
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
  },
  plugins: [vanillaExtractPlugin(), react()],
  optimizeDeps: {
    exclude: ['react-native-svg'],
    entries: ['index.html'],
  },
  resolve: {
    alias: viteAliases(__dirname),
  },
})
