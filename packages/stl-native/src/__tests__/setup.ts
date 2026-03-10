// Mock react-native
jest.mock('react-native', () => ({
  View: 'View',
  Text: 'Text',
  Pressable: 'Pressable',
  Image: 'Image',
  ScrollView: 'ScrollView',
  Animated: {
    Value: class AnimatedValue {
      _value: number
      constructor(v: number) {
        this._value = v
      }
    },
    timing: (_value: any, _config: any) => ({
      start: (cb?: any) => cb?.({ finished: true }),
    }),
    View: 'Animated.View',
  },
  Dimensions: {
    get: () => ({ width: 375, height: 812 }),
    addEventListener: jest.fn(() => ({ remove: jest.fn() })),
  },
  Appearance: {
    getColorScheme: () => 'light',
    addChangeListener: jest.fn(() => ({ remove: jest.fn() })),
  },
  AccessibilityInfo: {
    isReduceMotionEnabled: jest.fn(() => Promise.resolve(false)),
    addEventListener: jest.fn(() => ({ remove: jest.fn() })),
  },
  I18nManager: { isRTL: false },
  Linking: { openURL: jest.fn() },
  useWindowDimensions: () => ({ width: 375, height: 812 }),
  StyleSheet: {
    create: (styles: any) => styles,
    flatten: (style: any) =>
      Object.assign({}, ...(Array.isArray(style) ? style : [style])),
  },
  Platform: { OS: 'ios' },
}))
