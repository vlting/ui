export { borderWidth, color, radius, size, space, zIndex } from './base'
export type {
  AnimationConfig,
  BorderConfig,
  Brand,
  BrandDefinition,
  BrandFontConfig,
  FontOverrides,
  OutlineConfig,
  TokenOverrides,
  TypographyConfig,
} from './brands'
// Deprecated re-exports (backward compatibility)
export {
  createBrandConfig,
  defaultBrand,
  funBrand,
  generatePalette,
  getBrandStyleTag,
  getTextColorStep,
  injectBrandVars,
  media,
  poshBrand,
  shadcnBrand,
} from './brands'
export { semanticColorMap } from './colors'
export type { ShadowScale, ShadowToken } from './themes'
export {
  accentPalettes,
  darkPalette,
  darkShadows,
  lightPalette,
  lightShadows,
  resolveTemplate,
  shadowScaleToThemeValues,
  surfaceTemplates,
} from './themes'
