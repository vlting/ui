// ---------------------------------------------------------------------------
// Theme generation API
// ---------------------------------------------------------------------------

import { createTheme as _createTheme } from './generate-theme'
import { THEME_PRESET_DEFAULT as _DEFAULT } from './presets'

export { createTheme, applyTheme, getTheme } from './generate-theme'
export type { ColorInput, CreateThemeOptions, PaletteColorInput } from './generate-theme'
export { THEME_PRESET_DEFAULT } from './presets'

// ---------------------------------------------------------------------------
// CSS variable injection
// ---------------------------------------------------------------------------

export { getThemeStyleTag, themeToVars } from './inject'

// ---------------------------------------------------------------------------
// Types & palette utilities
// ---------------------------------------------------------------------------

export type { Theme } from './types'
export { generatePalette, getTextColorStep } from './generate-palette'

// ---------------------------------------------------------------------------
// Built-in themes (generated from presets)
// ---------------------------------------------------------------------------

export const defaultTheme = _createTheme(_DEFAULT)

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
