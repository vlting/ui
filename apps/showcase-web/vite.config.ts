import path from 'path'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig({
  define: {
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
  },
  plugins: [react()],
  resolve: {
    alias: {
      'react-native': 'react-native-web',
      '@vlting/ui': path.resolve(__dirname, '../../src'),
      '@vlting/stl': path.resolve(__dirname, '../../packages/stl/src'),
      '@vlting/stl-react': path.resolve(__dirname, '../../packages/stl-react/src'),
      '@vlting/stl-headless': path.resolve(__dirname, '../../packages/stl-headless/src'),
    },
  },
})
