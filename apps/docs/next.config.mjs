/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: { ignoreBuildErrors: true },
  transpilePackages: ['@vlting/ui', 'react-native-web', 'react-native-svg-web'],
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
