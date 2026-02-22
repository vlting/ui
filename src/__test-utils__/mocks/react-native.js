// Mock for react-native in Jest (jsdom environment)
// Components that import from react-native directly need this mock.
const React = require('react')

const Platform = {
  OS: 'web',
  select: (obj) => obj.web ?? obj.default,
  isPad: false,
  isTVOS: false,
  Version: 0,
}

const View = (props) => React.createElement('div', props)
const Text = (props) => React.createElement('span', props)
const TextInput = (props) => React.createElement('input', props)
const TouchableOpacity = (props) =>
  React.createElement('button', { onClick: props.onPress, ...props })
const TouchableHighlight = TouchableOpacity
const Pressable = (props) =>
  React.createElement('div', { onClick: props.onPress, ...props })
const ScrollView = (props) => React.createElement('div', props)
const FlatList = (props) => React.createElement('div', props)
const Image = (props) => React.createElement('img', props)
const StyleSheet = {
  create: (styles) => styles,
  flatten: (style) => style,
  hairlineWidth: 1,
}
const Dimensions = {
  get: () => ({ width: 375, height: 812 }),
  addEventListener: () => ({ remove: () => {} }),
}
const Animated = {
  Value: class {
    constructor(v) {
      this.value = v
    }
  },
  View: View,
  Text: Text,
  Image: Image,
  timing: () => ({ start: (cb) => cb?.() }),
  spring: () => ({ start: (cb) => cb?.() }),
  createAnimatedComponent: (Component) => Component,
}
const Alert = { alert: () => {} }
const Modal = (props) => (props.visible ? React.createElement('div', props) : null)
const ActivityIndicator = (props) => React.createElement('div', props)
const Keyboard = { dismiss: () => {}, addListener: () => ({ remove: () => {} }) }

module.exports = {
  __esModule: true,
  Platform,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableHighlight,
  Pressable,
  ScrollView,
  FlatList,
  Image,
  StyleSheet,
  Dimensions,
  Animated,
  Alert,
  Modal,
  ActivityIndicator,
  Keyboard,
  useColorScheme: () => 'light',
  NativeModules: {},
  NativeEventEmitter: class {},
  DeviceEventEmitter: { addListener: () => ({ remove: () => {} }) },
  AppState: { addEventListener: () => ({ remove: () => {} }) },
  Linking: { openURL: () => {}, addEventListener: () => ({ remove: () => {} }) },
  InteractionManager: { runAfterInteractions: (cb) => cb?.() },
  LayoutAnimation: { configureNext: () => {} },
  UIManager: {},
  I18nManager: { isRTL: false },
  AccessibilityInfo: { addEventListener: () => ({ remove: () => {} }) },
}
