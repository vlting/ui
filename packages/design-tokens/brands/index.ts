// ---------------------------------------------------------------------------
// Theme generation API
// ---------------------------------------------------------------------------

import { generateTheme as _generateTheme } from './generate-theme'
import {
  THEME_PRESET_DEFAULT as _DEFAULT,
  THEME_PRESET_FUN as _FUN,
  THEME_PRESET_POSH as _POSH,
  THEME_PRESET_SHADCN as _SHADCN,
} from './presets'

export { generateTheme } from './generate-theme'
export type { ColorInput, GenerateThemeOptions, SecondaryColorInput } from './generate-theme'
export {
  THEME_PRESET_DEFAULT,
  THEME_PRESET_FUN,
  THEME_PRESET_POSH,
  THEME_PRESET_SHADCN,
} from './presets'

// ---------------------------------------------------------------------------
// CSS variable injection
// ---------------------------------------------------------------------------

export { getBrandStyleTag, getThemeStyleTag, injectBrandVars, themeToVars } from './inject'

// ---------------------------------------------------------------------------
// Types & palette utilities
// ---------------------------------------------------------------------------

export type { Brand } from './types'
export { generatePalette, getTextColorStep } from './generate-palette'

// ---------------------------------------------------------------------------
// Built-in brands (generated from presets)
// ---------------------------------------------------------------------------

export const defaultBrand = _generateTheme(_DEFAULT)
export const funBrand = _generateTheme(_FUN)
export const poshBrand = _generateTheme(_POSH)
export const shadcnBrand = _generateTheme(_SHADCN)

// ---------------------------------------------------------------------------
// Media queries (framework-agnostic)
// ---------------------------------------------------------------------------

export const media = {
  xxl: { maxWidth: 1536 },
  xl: { maxWidth: 1280 },
  lg: { maxWidth: 1024 },
  md: { maxWidth: 768 },
  sm: { maxWidth: 640 },
  xs: { maxWidth: 460 },
  xxs: { maxWidth: 340 },
  gtXxs: { minWidth: 341 },
  gtXs: { minWidth: 461 },
  gtSm: { minWidth: 641 },
  gtMd: { minWidth: 769 },
  gtLg: { minWidth: 1025 },
  gtXl: { minWidth: 1281 },
  pointerFine: { pointer: 'fine' },
} as const
