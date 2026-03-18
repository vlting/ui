import { Platform } from 'react-native'
import {
  type ColorGenOptions,
  type ColorMode,
  DEFAULT_SOURCE_COLORS,
  generateThemeColors,
} from '../shared/colorGen'

// TYPES ///////////////////////////////////////////////////////////////////////

export interface NativeThemeConfig {
  colors?: Partial<ColorGenOptions>
  space?: { base: number }
  fontSize?: { base: number }
  radius?: { base: number }
  size?: { base: number }
  overrides?: {
    space?: Record<string, number>
    color?: Record<string, string>
    fontSize?: Record<string, number>
    fontWeight?: Record<string, string>
    fontFamily?: Record<string, string>
    lineHeight?: Record<string, number>
    radius?: Record<string, number>
    size?: Record<string, number>
    zIndex?: Record<string, number>
    typoSpace?: Record<string, number>
  }
}

export interface NativeTheme {
  readonly light: Readonly<NativeTokenMaps>
  readonly dark: Readonly<NativeTokenMaps>
  readonly id: string
}

export interface NativeTokenMaps {
  readonly color: Readonly<Record<string, string>>
  readonly space: Readonly<Record<string, number>>
  readonly size: Readonly<Record<string, number>>
  readonly fontSize: Readonly<Record<string, number>>
  readonly fontWeight: Readonly<Record<string, string>>
  readonly fontFamily: Readonly<Record<string, string>>
  readonly lineHeight: Readonly<Record<string, number>>
  readonly radius: Readonly<Record<string, number>>
  readonly zIndex: Readonly<Record<string, number>>
  readonly typoSpace: Readonly<Record<string, number>>
}

// SCALE BUILDERS //////////////////////////////////////////////////////////////

function buildSpaceTokens(base: number): Record<string, number> {
  return {
    $0: 0,
    $1: 1,
    $2: base / 2,
    $4: base,
    $6: base * 1.5,
    $8: base * 2,
    $10: base * 2.5,
    $12: base * 3,
    $16: base * 4,
    $20: base * 5,
    $24: base * 6,
    $32: base * 8,
    $40: base * 10,
    $56: base * 14,
    $80: base * 20,
    $120: base * 30,
    $buttonBasePx: base * 4,
    $buttonBasePy: base,
    $tooltipBaseP: base * 2,
  }
}

function buildSizeTokens(base: number): Record<string, number> {
  return {
    $0: 0,
    $1: 1,
    $2: base / 2,
    $4: base,
    $8: base * 2,
    $12: base * 3,
    $16: base * 4,
    $20: base * 5,
    $24: base * 6,
    $32: base * 8,
    $40: base * 10,
    $56: base * 14,
    $80: base * 20,
    $120: base * 30,
    $200: base * 50,
    $320: base * 80,
    $480: base * 120,
    $640: base * 160,
    $buttonTactileHighlight: 1,
    $buttonTactileShadow: 4,
  }
}

function buildFontSizeTokens(base: number): Record<string, number> {
  const h2 = base + 14
  const p = base
  const field = p
  const button = field

  return {
    $12: base - 4,
    $13: base - 3,
    $14: base - 2,
    $15: base - 1,
    $16: base,
    $17: base + 1,
    $18: base + 2,
    $21: base + 5,
    $25: base + 9,
    $30: base + 14,
    $36: base + 20,
    $44: base + 28,
    $56: base + 40,
    $72: base + 56,
    $h1: base + 28,
    $h2: h2,
    $h3: base + 5,
    $h4: base + 5,
    $h5: base + 2,
    $h6: base,
    $p: p,
    $code: p,
    $quote: h2,
    $field: field,
    $button: button,
    $fieldTiny: field * 0.8,
    $fieldSmall: field * 0.9,
    $fieldLarge: field * 1.25,
    $buttonTiny: button * 0.8,
    $buttonSmall: button * 0.9,
    $buttonLarge: button * 1.25,
  }
}

function buildFontWeightTokens(): Record<string, string> {
  return {
    $100: '100',
    $200: '200',
    $300: '300',
    $400: '400',
    $500: '500',
    $600: '600',
    $700: '700',
    $800: '800',
    $900: '900',
    $h1: '500',
    $h2: '700',
    $h3: '600',
    $h4: '800',
    $h5: '600',
    $h6: '800',
    $p: '300',
    $a: '300',
    $code: '600',
    $quote: '300',
    // Aliases
    $thin: '100',
    $extraLight: '200',
    $light: '300',
    $regular: '400',
    $medium: '500',
    $semiBold: '600',
    $bold: '700',
    $extraBold: '800',
    $black: '900',
  }
}

function buildFontFamilyTokens(): Record<string, string> {
  const sans = Platform.OS === 'ios' ? 'System' : 'Roboto'
  const mono = Platform.OS === 'ios' ? 'Menlo' : 'monospace'
  const serif = Platform.OS === 'ios' ? 'Georgia' : 'serif'
  return {
    $heading: sans,
    $body: sans,
    $button: sans,
    $code: mono,
    $quote: sans,
    $systemSans: sans,
    $systemSerif: serif,
    $systemMono: mono,
  }
}

function buildLineHeightTokens(sizeBase: number): Record<string, number> {
  return {
    $4: sizeBase,
    $6: sizeBase + sizeBase / 2,
    $8: sizeBase * 2,
    $10: sizeBase * 2 + sizeBase / 2,
    $12: sizeBase * 3,
    $16: sizeBase * 4,
    $20: sizeBase * 5,
    $24: sizeBase * 6,
    $32: sizeBase * 8,
    $40: sizeBase * 10,
    $min: 1,
    $spaced: 1.65 * 1.1,
    $tight: 1.65 * 0.85,
    $tightest: 1.65 * 0.67,
    $flat: 1,
    $body: 1.65,
    $heading: 0.75 + 1.65 * 0.3,
    $subHeading: 1.65,
    $listItem: 0.75 + 1.65 * 0.3,
    $field: sizeBase * 5,
    $label: sizeBase * 5,
    $button: 2,
  }
}

function buildRadiusTokens(base: number): Record<string, number> {
  const field = base
  const rounded = Math.max(field, 4)

  return {
    $0: 0,
    $1: 1,
    $2: base * 0.5,
    $3: base * 0.75,
    $4: base,
    $6: base * 1.5,
    $8: base * 2,
    $10: base * 2.5,
    $12: base * 3,
    $16: base * 4,
    $24: base * 6,
    $32: base * 8,
    $40: base * 10,
    $80: base * 20,
    $rectangular: 0,
    $round: 9999,
    $pill: 9999,
    $rounded: rounded,
    $field: field,
    $button: field,
    $tooltip: rounded,
  }
}

function buildZIndexTokens(): Record<string, number> {
  return {
    $0: 0,
    $1: 10,
    $2: 50,
    $3: 100,
    $4: 200,
    $5: 300,
    $6: 400,
    $7: 500,
    $8: 600,
    $9: 700,
    $10: 800,
    $11: 900,
    $12: 1000,
    $min: -1,
    $max: 9999,
  }
}

function buildTypoSpaceTokens(): Record<string, number> {
  return {
    $emBase: 0,
    $emMin: -0.1,
    $emMax: 0.1,
    $remBase: 0,
    $remMin: -1.5,
    $remMax: 1.5,
    $chBase: 0,
    $chMin: -0.15,
    $chMax: 0.15,
    $tightest: -0.67,
    $tight: -0.33,
    $regular: 0,
    $loose: 0.5,
    $loosest: 0.75,
  }
}

// COLOR GENERATION ////////////////////////////////////////////////////////////

function buildColorTokens(
  inputColors: Partial<ColorGenOptions>,
  mode: ColorMode,
): Record<string, string> {
  const isDark = mode === 'dark'

  // generateThemeColors returns a ColorPalette<string> keyed by ThemeColor
  // The setter callback populates the palette; the return value IS the palette.
  const palette = generateThemeColors<string>(
    inputColors,
    mode,
    (key, colors, value, _numberKey, isMapped = false) => {
      if (isMapped) {
        // For mapped colors, `value` is the source color name (e.g., "primary1")
        // Copy the resolved value from the palette
        colors[key] = colors[value as keyof typeof colors] ?? ''
      } else {
        colors[key] = String(value)
      }
    },
  )

  // Convert palette (ThemeColor keys) to token map ($-prefixed keys)
  const tokens: Record<string, string> = {}
  for (const [key, value] of Object.entries(palette)) {
    tokens[`$${key}`] = value
  }

  // Add special color tokens
  tokens.$shadowBase = '0 0% 0%'
  tokens.$shadowBlack = 'hsl(0,0%,0%)'
  tokens.$defaultBody = tokens.$neutralText2 || tokens.$neutral11 || '#333333'
  tokens.$defaultHeading = tokens.$neutral10 || '#111111'
  tokens.$panel = isDark ? tokens.$background3 || '#2a2a2a' : tokens.$min || '#ffffff'
  tokens.$shadowLight = isDark ? 'rgba(0,0,0,0.2)' : 'rgba(0,0,0,0.05)'
  tokens.$shadowHeavy = isDark ? 'rgba(0,0,0,0.35)' : 'rgba(0,0,0,0.15)'
  tokens.$shadowHeaviest = isDark ? 'rgba(0,0,0,0.5)' : 'rgba(0,0,0,0.25)'

  return tokens
}

// THEME CREATION //////////////////////////////////////////////////////////////

export function createNativeTheme(config: NativeThemeConfig = {}): NativeTheme {
  const sizeBase = config.size?.base ?? 4
  const spaceBase = config.space?.base ?? sizeBase
  const fontSizeBase = config.fontSize?.base ?? 16
  const radiusBase = config.radius?.base ?? 4

  const inputColors = { ...DEFAULT_SOURCE_COLORS, ...config.colors }

  // Build non-themed (shared) scales
  const space = buildSpaceTokens(spaceBase)
  const size = buildSizeTokens(sizeBase)
  const fontSize = buildFontSizeTokens(fontSizeBase)
  const fontWeight = buildFontWeightTokens()
  const fontFamily = buildFontFamilyTokens()
  const lineHeight = buildLineHeightTokens(sizeBase)
  const radius = buildRadiusTokens(radiusBase)
  const zIndex = buildZIndexTokens()
  const typoSpace = buildTypoSpaceTokens()

  // Build themed scales (colors differ per mode)
  const lightColors = buildColorTokens(inputColors, 'light')
  const darkColors = buildColorTokens(inputColors, 'dark')

  // Apply overrides
  const overrides = config.overrides
  if (overrides) {
    if (overrides.space) applyOverrides(space, overrides.space, '$')
    if (overrides.size) applyOverrides(size, overrides.size, '$')
    if (overrides.fontSize) applyOverrides(fontSize, overrides.fontSize, '$')
    if (overrides.fontWeight) applyOverrides(fontWeight, overrides.fontWeight, '$')
    if (overrides.fontFamily) applyOverrides(fontFamily, overrides.fontFamily, '$')
    if (overrides.lineHeight) applyOverrides(lineHeight, overrides.lineHeight, '$')
    if (overrides.radius) applyOverrides(radius, overrides.radius, '$')
    if (overrides.zIndex) applyOverrides(zIndex, overrides.zIndex, '$')
    if (overrides.typoSpace) applyOverrides(typoSpace, overrides.typoSpace, '$')
    if (overrides.color) {
      applyOverrides(lightColors, overrides.color, '$')
      applyOverrides(darkColors, overrides.color, '$')
    }
  }

  const sharedScales = {
    space: Object.freeze(space),
    size: Object.freeze(size),
    fontSize: Object.freeze(fontSize),
    fontWeight: Object.freeze(fontWeight),
    fontFamily: Object.freeze(fontFamily),
    lineHeight: Object.freeze(lineHeight),
    radius: Object.freeze(radius),
    zIndex: Object.freeze(zIndex),
    typoSpace: Object.freeze(typoSpace),
  }

  return Object.freeze({
    light: Object.freeze({
      color: Object.freeze(lightColors),
      ...sharedScales,
    }),
    dark: Object.freeze({
      color: Object.freeze(darkColors),
      ...sharedScales,
    }),
    id: hashConfig(config),
  })
}

function applyOverrides<T>(
  target: Record<string, T>,
  overrides: Record<string, T>,
  prefix: string,
) {
  for (const [key, value] of Object.entries(overrides)) {
    const prefixedKey = key.startsWith(prefix) ? key : `${prefix}${key}`
    target[prefixedKey] = value
  }
}

function hashConfig(config: NativeThemeConfig): string {
  return JSON.stringify(config)
    .split('')
    .reduce((h, c) => {
      h = ((h << 5) - h + c.charCodeAt(0)) | 0
      return h
    }, 0)
    .toString(36)
}

// MODULE SINGLETON ////////////////////////////////////////////////////////////

/** Default theme — used when configureTheme() hasn't been called yet */
const defaultNativeTheme = createNativeTheme({})

let _theme: NativeTheme = defaultNativeTheme

export function configureTheme(config: NativeThemeConfig = {}) {
  _theme = createNativeTheme(config)
}

export function getTheme(): NativeTheme {
  return _theme
}

export { defaultNativeTheme }
