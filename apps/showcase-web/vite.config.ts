import path from 'node:path'
import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig({
  define: {
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
  },
  plugins: [vanillaExtractPlugin(), react()],
  optimizeDeps: {
    exclude: ['@playwright/test', '@axe-core/playwright', 'react-native-svg'],
    entries: ['index.html'],
  },
  resolve: {
    alias: [
      { find: 'react-native-svg', replacement: 'react-native-svg-web' },
      { find: /^react-native$/, replacement: 'react-native-web' },
      {
        find: '@vlting/ui/design-tokens',
        replacement: path.resolve(__dirname, '../../packages/design-tokens'),
      },
      {
        find: '@vlting/ui/primitives',
        replacement: path.resolve(__dirname, '../../packages/primitives'),
      },
      {
        find: '@vlting/ui/components',
        replacement: path.resolve(__dirname, '../../packages/components'),
      },
      {
        find: '@vlting/ui/hooks',
        replacement: path.resolve(__dirname, '../../packages/hooks'),
      },
      {
        find: '@vlting/ui/blocks',
        replacement: path.resolve(__dirname, '../../packages/blocks'),
      },
      {
        find: '@vlting/ui/icons',
        replacement: path.resolve(__dirname, '../../packages/icons'),
      },
      {
        find: '@vlting/ui/utils',
        replacement: path.resolve(__dirname, '../../packages/utils'),
      },
      { find: '@vlting/ui', replacement: path.resolve(__dirname, '../../src') },
      {
        find: '@vlting/stl-react',
        replacement: path.resolve(__dirname, '../../packages/stl-react/src'),
      },
      {
        find: '@vlting/stl-headless',
        replacement: path.resolve(__dirname, '../../packages/stl-headless/src'),
      },
      {
        find: '@vlting/stl/styles',
        replacement: path.resolve(__dirname, '../../packages/stl/src/config/styles.css.ts'),
      },
      {
        find: '@vlting/stl',
        replacement: path.resolve(__dirname, '../../packages/stl/src'),
      },
    ],
  },
})
