/** @type {import('next').NextConfig} */
const nextConfig = {
  // Block components (packages/blocks/) have pre-existing Tamagui v2 RC type
  // issues. Type-checking for blocks happens in the main package; skipping here
  // avoids false build failures from upstream source types.
  typescript: { ignoreBuildErrors: true },
  transpilePackages: ['@vlting/ui', 'tamagui', 'react-native-web', 'react-native-svg-web'],
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
