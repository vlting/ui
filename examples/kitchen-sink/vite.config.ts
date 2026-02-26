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
      'react-native-svg': 'react-native-svg-web',
      'react-native': 'react-native-web',
      '@vlting/ui': path.resolve(__dirname, '../../src'),
    },
  },
})
