// ---------------------------------------------------------------------------
// New Brand API (simple data objects + CSS variable injection)
// ---------------------------------------------------------------------------

export { generatePalette, getTextColorStep } from './generate-palette'
export { getBrandStyleTag, injectBrandVars } from './inject'
export type { Brand } from './types'

// ---------------------------------------------------------------------------
// Built-in brands
// ---------------------------------------------------------------------------

export { defaultBrand } from './default'
export { funBrand } from './fun'
export { poshBrand } from './posh'
export { shadcnBrand } from './shadcn'

// ---------------------------------------------------------------------------
// Media queries (framework-agnostic, kept as-is)
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

// ---------------------------------------------------------------------------
// Deprecated — old legacy types
// ---------------------------------------------------------------------------

/** @deprecated Use `Brand` instead. Will be removed in a future version. */
export type BrandDefinition = import('./types').Brand

/** @deprecated No longer needed — use `injectBrandVars()` instead. */
export function createBrandConfig(_brand: import('./types').Brand): never {
  throw new Error(
    'createBrandConfig() has been removed. Use injectBrandVars() for CSS variable injection.',
  )
}

/** @deprecated Use `Brand['tokens']` instead. */
export type TokenOverrides = NonNullable<import('./types').Brand['tokens']>

/** @deprecated No longer needed. */
export type BorderConfig = Record<string, unknown>
/** @deprecated No longer needed. */
export type OutlineConfig = Record<string, unknown>
/** @deprecated No longer needed. */
export type AnimationConfig = Record<string, unknown>
/** @deprecated No longer needed. */
export type TypographyConfig = Record<string, unknown>
/** @deprecated No longer needed. */
export type FontOverrides = Record<string, unknown>
/** @deprecated No longer needed. */
export type BrandFontConfig = Record<string, unknown>
