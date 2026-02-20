module.exports = {
  testEnvironment: 'jsdom',
  testEnvironmentOptions: {
    customExportConditions: ['node', 'require'],
  },
  testMatch: ['**/*.test.[jt]s?(x)'],
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/**/*.d.ts',
    '!src/**/index.{ts,tsx}',
    '!src/__test-utils__/**',
  ],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'mjs', 'cjs'],
  moduleNameMapper: {
    '^@vlting/ui$': '<rootDir>/src/index.ts',
    '^@vlting/ui/(.*)$': '<rootDir>/src/$1',
    '^react-native-svg$': '<rootDir>/src/__test-utils__/mocks/react-native-svg.js',
    '^react-native-svg/(.*)$': '<rootDir>/src/__test-utils__/mocks/react-native-svg.js',
    '^react-native$': '<rootDir>/src/__test-utils__/mocks/react-native.js',
  },
  transform: {
    '^.+\\.(js|jsx|ts|tsx|mjs|cjs)$': [
      'babel-jest',
      { configFile: './babel.config.js' },
    ],
  },
  setupFilesAfterEnv: ['./jest.setup.js'],
  transformIgnorePatterns: [
    'node_modules/(?!(tamagui|@tamagui|react-native|@react-native|react-native-web|@tiptap|invariant|scheduler)/)',
  ],
}
