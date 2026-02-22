// Infrastructure
export { Provider } from './provider'
export type { ProviderProps } from './provider'

// Layer 0 — Design Tokens
export {
  tokens,
  size,
  space,
  radius,
  color,
  zIndex,
  borderWidth,
  semanticColorMap,
  buildThemes,
  lightPalette,
  darkPalette,
  accentPalettes,
  lightShadows,
  darkShadows,
  createBrandConfig,
  defaultBrand,
  neonBrand,
  media,
} from '../packages/design-tokens'
export type {
  BrandDefinition,
  BorderConfig,
  OutlineConfig,
  AnimationConfig,
  TypographyConfig,
  TokenOverrides,
  FontOverrides,
  ShadowToken,
  ShadowScale,
} from '../packages/design-tokens'

// Layer 1 — Primitives
export {
  Box,
  Stack,
  VStack,
  HStack,
  Text,
  Heading,
  Icon,
  Divider,
  Spacer,
  Portal,
} from '../packages/primitives'
export type {
  BoxProps,
  StackProps,
  VStackProps,
  HStackProps,
  TextProps,
  HeadingProps,
  IconProps,
  IconFC,
  DividerProps,
  SpacerProps,
  PortalProps,
} from '../packages/primitives'

// Layer 2 — Headless Primitives
export {
  Dialog as HeadlessDialog,
  Tabs as HeadlessTabs,
  Checkbox as HeadlessCheckbox,
} from '../packages/headless'

// Layer 3 — Styled Components
export {
  Button,
  Input,
  Card,
  Dialog,
  Tabs,
} from '../packages/components'
export type {
  ButtonProps,
  InputProps,
  CardProps,
} from '../packages/components'

// Hooks
export {
  useControllableState,
  useFocusTrap,
  useKeyboardNavigation,
} from '../packages/hooks'

// Utils
export {
  mergeRefs,
  composeEventHandlers,
  cn,
} from '../packages/utils'
