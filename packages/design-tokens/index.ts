export { size, space, radius, color, zIndex, borderWidth } from './base'
export { semanticColorMap } from './colors'
export {
  lightPalette,
  darkPalette,
  accentPalettes,
  lightShadows,
  darkShadows,
  shadowScaleToThemeValues,
  surfaceTemplates,
  resolveTemplate,
} from './themes'
export type { ShadowToken, ShadowScale } from './themes'
export {
  defaultBrand,
  funBrand,
  poshBrand,
  shadcnBrand,
  media,
  injectBrandVars,
  getBrandStyleTag,
} from './brands'
export type { Brand } from './brands'

// Deprecated re-exports (backward compatibility)
export { createBrandConfig } from './brands'
export type {
  BrandDefinition,
  BrandFontConfig,
  BorderConfig,
  OutlineConfig,
  AnimationConfig,
  TypographyConfig,
  TokenOverrides,
  FontOverrides,
} from './brands'
