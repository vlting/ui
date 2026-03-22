module.exports = {
  testEnvironment: 'jsdom',
  testEnvironmentOptions: {
    customExportConditions: ['node', 'require'],
  },
  testMatch: ['**/*.test.[jt]s?(x)'],
  testPathIgnorePatterns: [
    '/node_modules/',
    'packages/stl-native/',
    // Stubbed components — re-enable as each is rebuilt
    // 'packages/components/Accordion/', // re-enabled
    // 'packages/components/AlertDialog/', // re-enabled
    // 'packages/components/Breadcrumb/', // re-enabled
    'packages/components/Calendar/',
    'packages/components/Carousel/',
    'packages/components/Chart/',
    // 'packages/components/Checkbox/', // re-enabled
    // 'packages/components/Collapsible/', // re-enabled
    // 'packages/components/Combobox/', // re-enabled
    // 'packages/components/Command/', // re-enabled
    // 'packages/components/ContextMenu/', // re-enabled
    'packages/components/DataTable/',
    'packages/components/DatePicker/',
    // 'packages/components/Dialog/', // re-enabled
    // 'packages/components/Drawer/', // re-enabled
    // 'packages/components/DropdownMenu/', // re-enabled
    // 'packages/components/Field/', // re-enabled
    // 'packages/components/Form/', // re-enabled
    // 'packages/components/HoverCard/', // re-enabled
    // 'packages/components/InputGroup/', // re-enabled
    // 'packages/components/InputOTP/', // re-enabled
    // 'packages/components/Menu/', // re-enabled
    // 'packages/components/Menubar/', // re-enabled
    // 'packages/components/NavigationMenu/', // re-enabled
    // 'packages/components/Pagination/', // re-enabled
    // 'packages/components/Popover/', // re-enabled
    'packages/components/Resizable/',
    'packages/components/ScrollArea/',
    // 'packages/components/Select/', // re-enabled
    // 'packages/components/Sheet/', // re-enabled
    // 'packages/components/Sidebar/', // re-enabled
    // 'packages/components/Slider/', // re-enabled
    'packages/components/Table/',
    // 'packages/components/Tabs/', // re-enabled
    // 'packages/components/Toast/', // re-enabled
    // 'packages/components/Toggle/', // re-enabled
    // 'packages/components/Tooltip/', // re-enabled
  ],
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
    '^@vlting/stl$': '<rootDir>/packages/stl/src/index.ts',
    '^@vlting/stl/(.*)$': '<rootDir>/packages/stl/src/$1',
    '^@vanilla-extract/css$': '<rootDir>/src/__test-utils__/mocks/vanilla-extract-css.js',
    '^react-native-svg$': '<rootDir>/src/__test-utils__/mocks/react-native-svg.js',
    '^react-native-svg/(.*)$': '<rootDir>/src/__test-utils__/mocks/react-native-svg.js',
    '^react-native$': '<rootDir>/src/__test-utils__/mocks/react-native.js',
  },
  transform: {
    '^.+\\.(js|jsx|ts|tsx|mjs|cjs)$': ['babel-jest', { configFile: './babel.config.js' }],
  },
  setupFilesAfterEnv: ['./jest.setup.js'],
  transformIgnorePatterns: [
    'node_modules/(?!(react-native|@react-native|react-native-web|@tiptap|invariant|scheduler|@react-aria)/)',
  ],
}
