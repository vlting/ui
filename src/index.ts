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
  media,
} from '../packages/design-tokens/src'
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
} from '../packages/design-tokens/src'

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
} from '../packages/primitives/src'
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
} from '../packages/primitives/src'

// Layer 2 — Headless Primitives
export {
  Dialog as HeadlessDialog,
  Tabs as HeadlessTabs,
  Checkbox as HeadlessCheckbox,
} from '../packages/headless/src'

// Layer 3 — Styled Components
export {
  Button,
  Input,
  Card,
  Dialog,
  Tabs,
} from '../packages/components/src'
export type {
  ButtonProps,
  InputProps,
  CardProps,
} from '../packages/components/src'

// Hooks
export {
  useControllableState,
  useFocusTrap,
  useKeyboardNavigation,
} from '../packages/hooks/src'

// Utils
export {
  mergeRefs,
  composeEventHandlers,
  cn,
} from '../packages/utils/src'
