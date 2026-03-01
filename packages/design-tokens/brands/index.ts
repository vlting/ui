import { createAnimations as createCSSAnimations } from '@tamagui/animations-css'
import { createTokens } from '@tamagui/core'
import { shorthands } from '@tamagui/shorthands'
import { type CreateTamaguiProps, type GenericFont, createFont } from 'tamagui'
import { buildFaceMapsFromConfig } from '../../utils/nativeFontFace'
import { borderWidth, color, radius, size, space, zIndex } from '../base'
import { type ShadowScale, buildThemes } from '../themes'

// ---------------------------------------------------------------------------
// Brand types
// ---------------------------------------------------------------------------

export interface BorderConfig {
  widths?: { none?: number; thin?: number; medium?: number; thick?: number }
}

export interface OutlineConfig {
  width?: number
  offset?: number
}

export interface AnimationConfig {
  driver?: 'css' | 'reanimated'
  durations?: { instant?: number; fast?: number; medium?: number; slow?: number }
  easings?: { standard?: string; enter?: string; exit?: string; spring?: string }
}

export interface TypographyConfig {
  heading?: {
    transform?: 'none' | 'uppercase' | 'lowercase' | 'capitalize'
    style?: 'normal' | 'italic'
  }
  body?: { style?: 'normal' | 'italic' }
}

export interface TokenOverrides {
  size?: Record<string | number, number>
  space?: Record<string | number, number>
  radius?: Record<string | number, number>
  zIndex?: Record<string | number, number>
  borderWidth?: Partial<{ none: number; thin: number; medium: number; thick: number }>
}

export interface BrandFontConfig {
  heading: {
    family: string
    fallback?: string
    weights: { heavy: number; light: number }
  }
  body: {
    family: string
    fallback?: string
    weight: number
  }
  mono: {
    family: string
    fallback?: string
    weight: number
  }
  quote: {
    family: string
    fallback?: string
    weight: number
    style?: 'normal' | 'italic'
  }
}

export interface FontOverrides {
  heading?: Partial<GenericFont>
  body?: Partial<GenericFont>
  mono?: Partial<GenericFont>
  quote?: Partial<GenericFont>
}

export interface BrandDefinition {
  name: string
  palettes: { light: string[]; dark: string[] }
  accentPalettes?: Record<string, { light: string[]; dark: string[] }>
  tokens?: TokenOverrides
  borders?: BorderConfig
  outline?: OutlineConfig
  shadows?: { light?: ShadowScale; dark?: ShadowScale }
  overlay?: { light?: string; dark?: string }
  fonts?: FontOverrides
  fontConfig?: BrandFontConfig
  typography?: TypographyConfig
  animations?: AnimationConfig
  media?: CreateTamaguiProps['media']
}

// ---------------------------------------------------------------------------
// Media queries
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
// Default fonts
// ---------------------------------------------------------------------------

const defaultHeadingFont = createFont({
  family: 'Inter',
  size: {
    1: 12,
    2: 14,
    3: 16,
    4: 18,
    5: 20,
    6: 24,
    7: 28,
    8: 32,
    9: 40,
    10: 48,
    11: 56,
    12: 64,
    true: 20,
  },
  weight: { 1: '300', 2: '400', 3: '500', 4: '600', 5: '700', 6: '800', true: '600' },
  lineHeight: {
    1: 18,
    2: 20,
    3: 24,
    4: 26,
    5: 28,
    6: 32,
    7: 36,
    8: 40,
    9: 52,
    10: 60,
    11: 68,
    12: 76,
    true: 28,
  },
  letterSpacing: {
    1: 0,
    2: 0,
    3: -0.2,
    4: -0.3,
    5: -0.4,
    6: -0.5,
    7: -0.6,
    8: -0.7,
    true: -0.4,
  },
})

const defaultBodyFont = createFont({
  family: 'Inter',
  size: {
    1: 11,
    2: 12,
    3: 13,
    4: 14,
    5: 16,
    6: 18,
    7: 20,
    8: 24,
    9: 28,
    10: 32,
    true: 14,
  },
  weight: { 1: '300', 2: '400', 3: '500', 4: '600', 5: '700', true: '400' },
  lineHeight: {
    1: 16,
    2: 18,
    3: 20,
    4: 22,
    5: 24,
    6: 28,
    7: 30,
    8: 34,
    9: 38,
    10: 42,
    true: 22,
  },
  letterSpacing: { 1: 0, 2: 0, 3: 0, true: 0 },
})

const defaultMonoFont = createFont({
  family: 'ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, monospace',
  size: { 1: 11, 2: 12, 3: 13, 4: 14, 5: 16, 6: 18, true: 14 },
  weight: { 1: '400', 2: '500', true: '400' },
  lineHeight: { 1: 18, 2: 20, 3: 22, 4: 24, 5: 26, 6: 30, true: 24 },
  letterSpacing: { 1: 0, true: 0 },
})

const defaultQuoteFont = createFont({
  family: 'Georgia, "Times New Roman", serif',
  size: { 1: 14, 2: 16, 3: 18, 4: 20, 5: 24, 6: 28, true: 18 },
  weight: { 1: '300', 2: '400', true: '300' },
  lineHeight: { 1: 22, 2: 26, 3: 30, 4: 34, 5: 38, 6: 44, true: 30 },
  letterSpacing: { 1: 0, true: 0 },
  style: {
    1: 'italic',
    2: 'italic',
    3: 'italic',
    4: 'italic',
    5: 'italic',
    6: 'italic',
    true: 'italic',
  },
})

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

type FontTypographyExtras = {
  transform?: 'none' | 'uppercase' | 'lowercase' | 'capitalize'
  style?: 'normal' | 'italic'
}

function applyTypographyToFont(
  base: ReturnType<typeof createFont>,
  typo: FontTypographyExtras | undefined,
): ReturnType<typeof createFont> {
  if (!typo?.transform && !typo?.style) return base
  const keys = Object.keys(base.size)
  const extras: Record<string, unknown> = {}
  if (typo.transform) {
    extras.transform = Object.fromEntries(keys.map((k) => [k, typo.transform]))
  }
  if (typo.style) {
    extras.style = Object.fromEntries(keys.map((k) => [k, typo.style]))
  }
  return createFont({ ...base, ...extras })
}

function buildFontFamily(family: string, fallback?: string): string {
  return fallback ? `${family}, ${fallback}` : family
}

// ---------------------------------------------------------------------------
// Main factory
// ---------------------------------------------------------------------------

export function createBrandConfig(brand: BrandDefinition): CreateTamaguiProps {
  const mergedSize = brand.tokens?.size ? { ...size, ...brand.tokens.size } : size
  const mergedSpace = brand.tokens?.space ? { ...space, ...brand.tokens.space } : space
  const mergedRadius = brand.tokens?.radius
    ? { ...radius, ...brand.tokens.radius }
    : radius
  const mergedZIndex = brand.tokens?.zIndex
    ? { ...zIndex, ...brand.tokens.zIndex }
    : zIndex

  const mergedBorderWidth = brand.tokens?.borderWidth
    ? { ...borderWidth, ...brand.tokens.borderWidth }
    : brand.borders?.widths
      ? {
          none: brand.borders.widths.none ?? borderWidth.none,
          thin: brand.borders.widths.thin ?? borderWidth.thin,
          medium: brand.borders.widths.medium ?? borderWidth.medium,
          thick: brand.borders.widths.thick ?? borderWidth.thick,
        }
      : borderWidth

  const outlineTokens = {
    width: brand.outline?.width ?? 2,
    offset: brand.outline?.offset ?? 1,
  }

  const mergedTokens = createTokens({
    size: mergedSize,
    space: mergedSpace,
    radius: mergedRadius,
    color,
    zIndex: mergedZIndex,
    borderWidth: mergedBorderWidth,
    outline: outlineTokens,
  })

  // --- Font processing ---
  let headingFont: ReturnType<typeof createFont>
  let bodyFont: ReturnType<typeof createFont>
  let monoFont: ReturnType<typeof createFont>
  let quoteFont: ReturnType<typeof createFont>

  if (brand.fontConfig) {
    const fc = brand.fontConfig
    const headingFamily = buildFontFamily(fc.heading.family, fc.heading.fallback)
    const bodyFamily = buildFontFamily(fc.body.family, fc.body.fallback)
    const monoFamily = buildFontFamily(fc.mono.family, fc.mono.fallback)
    const quoteFamily = buildFontFamily(fc.quote.family, fc.quote.fallback)

    // Build face maps for RN font weight resolution.
    // On web this returns { heading: undefined, ... } — a no-op when spread.
    const faceMaps = buildFaceMapsFromConfig(fc)

    // Heading weight alternation: h1(heavy) h2(light) h3(heavy) h4(light) h5(heavy) h6(light)
    // Tamagui font weight keys map to heading levels in reverse (key 6 = largest = h1):
    // key 1 = h6 (light), key 2 = h5 (heavy), key 3 = h4 (light),
    // key 4 = h3 (heavy), key 5 = h2 (light), key 6 = h1 (heavy)
    const heavy = String(fc.heading.weights.heavy)
    const light = String(fc.heading.weights.light)
    const headingWeights = {
      1: light, // h6
      2: heavy, // h5
      3: light, // h4
      4: heavy, // h3
      5: light, // h2
      6: heavy, // h1
      true: heavy,
    }

    headingFont = createFont({
      ...defaultHeadingFont,
      family: headingFamily,
      weight: headingWeights,
      ...(faceMaps.heading && { face: faceMaps.heading }),
    })

    const bodyWeight = String(fc.body.weight)
    bodyFont = createFont({
      ...defaultBodyFont,
      family: bodyFamily,
      weight: { 1: bodyWeight, 2: bodyWeight, 3: bodyWeight, 4: bodyWeight, 5: bodyWeight, true: bodyWeight },
      ...(faceMaps.body && { face: faceMaps.body }),
    })

    const monoWeight = String(fc.mono.weight)
    monoFont = createFont({
      ...defaultMonoFont,
      family: monoFamily,
      weight: { 1: monoWeight, 2: monoWeight, true: monoWeight },
      ...(faceMaps.mono && { face: faceMaps.mono }),
    })

    const quoteWeight = String(fc.quote.weight)
    const quoteStyle = fc.quote.style ?? 'italic'
    const quoteStyleScale = Object.fromEntries(
      Object.keys(defaultQuoteFont.size).map((k) => [k, quoteStyle]),
    )
    quoteFont = createFont({
      ...defaultQuoteFont,
      family: quoteFamily,
      weight: { 1: quoteWeight, 2: quoteWeight, true: quoteWeight },
      style: quoteStyleScale,
      ...(faceMaps.quote && { face: faceMaps.quote }),
    })
  } else {
    // Legacy path: no fontConfig, use defaults
    headingFont = defaultHeadingFont
    bodyFont = defaultBodyFont
    monoFont = defaultMonoFont
    quoteFont = defaultQuoteFont
  }

  // Apply typography extras (transform, style overrides)
  headingFont = applyTypographyToFont(headingFont, brand.typography?.heading)
  bodyFont = applyTypographyToFont(bodyFont, brand.typography?.body)

  // Apply low-level font overrides (existing `fonts` API)
  if (brand.fonts?.heading) {
    headingFont = createFont({ ...headingFont, ...brand.fonts.heading })
  }
  if (brand.fonts?.body) {
    bodyFont = createFont({ ...bodyFont, ...brand.fonts.body })
  }
  if (brand.fonts?.mono) {
    monoFont = createFont({ ...monoFont, ...brand.fonts.mono })
  }
  if (brand.fonts?.quote) {
    quoteFont = createFont({ ...quoteFont, ...brand.fonts.quote })
  }

  const palettes: Record<string, string[]> = {
    light: brand.palettes.light,
    dark: brand.palettes.dark,
  }
  if (brand.accentPalettes) {
    for (const [name, palette] of Object.entries(brand.accentPalettes)) {
      palettes[`light_${name}`] = palette.light
      palettes[`dark_${name}`] = palette.dark
    }
  }

  const themes = buildThemes(palettes, brand.shadows, outlineTokens, brand.overlay)

  const dur = brand.animations?.durations
  const eas = brand.animations?.easings
  const instant = dur?.instant ?? 100
  const fast = dur?.fast ?? 150
  const mdDur = dur?.medium ?? 250
  const slow = dur?.slow ?? 400
  const easeStandard = eas?.standard ?? 'ease-in-out'
  const easeEnter = eas?.enter ?? 'ease-out'
  const easeExit = eas?.exit ?? 'ease-in'
  const easeSpring = eas?.spring ?? 'cubic-bezier(0.34, 1.56, 0.64, 1)'

  const animations = createCSSAnimations({
    instant: `${easeStandard} ${instant}ms`,
    fast: `${easeStandard} ${fast}ms`,
    medium: `${easeStandard} ${mdDur}ms`,
    slow: `${easeStandard} ${slow}ms`,
    enter: `${easeEnter} ${mdDur}ms`,
    exit: `${easeExit} ${mdDur}ms`,
    bouncy: `${easeSpring} ${mdDur}ms`,
    tooltip: `${easeEnter} ${instant}ms`,
  })

  return {
    tokens: mergedTokens,
    themes,
    media: brand.media ?? media,
    shorthands,
    fonts: { heading: headingFont, body: bodyFont, mono: monoFont, quote: quoteFont },
    animations,
    settings: {
      allowedStyleValues: 'somewhat-strict-web',
      autocompleteSpecificTokens: 'except-special',
    },
  }
}

export { defaultBrand } from './default'
export { funBrand } from './fun'
export { poshBrand } from './posh'
export { shadcnBrand } from './shadcn'
