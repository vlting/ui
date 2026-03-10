import { resolve } from 'path'
import { fileURLToPath } from 'url'

const __dirname = fileURLToPath(new URL('.', import.meta.url))

/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: { ignoreBuildErrors: true },
  outputFileTracingRoot: resolve(__dirname, '../../'),
  transpilePackages: ['react-native-web', 'react-native-svg-web'],
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      'react-native$': 'react-native-web',
      'react-native-svg': 'react-native-svg-web',
    }
    return config
  },
}

export default nextConfig
