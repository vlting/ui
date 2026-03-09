import { vi } from "vitest"

// Mock react-native
vi.mock("react-native", () => ({
  View: "View",
  Text: "Text",
  Pressable: "Pressable",
  Image: "Image",
  ScrollView: "ScrollView",
  Animated: {
    Value: class AnimatedValue {
      _value: number
      constructor(v: number) { this._value = v }
    },
    timing: (_value: any, _config: any) => ({
      start: (cb?: any) => cb?.({ finished: true }),
    }),
    View: "Animated.View",
  },
  Dimensions: {
    get: () => ({ width: 375, height: 812 }),
    addEventListener: vi.fn(() => ({ remove: vi.fn() })),
  },
  Appearance: {
    getColorScheme: () => "light",
    addChangeListener: vi.fn(() => ({ remove: vi.fn() })),
  },
  AccessibilityInfo: {
    isReduceMotionEnabled: vi.fn(() => Promise.resolve(false)),
    addEventListener: vi.fn(() => ({ remove: vi.fn() })),
  },
  I18nManager: { isRTL: false },
  Linking: { openURL: vi.fn() },
  useWindowDimensions: () => ({ width: 375, height: 812 }),
  StyleSheet: {
    create: (styles: any) => styles,
    flatten: (style: any) => Object.assign({}, ...(Array.isArray(style) ? style : [style])),
  },
  Platform: { OS: "ios" },
}))
