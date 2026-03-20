import { radius, zIndex } from './base'
import { lightShadows, darkShadows } from './themes'
import { generatePalette } from './generate-palette'
import { ALPHA_VALUES } from '../shared/models/colorGen.models'
import { themeToVars } from './inject'
import type { Theme } from './types'
import type { FontFamilySpec, HtmlHeadLink } from '../shared/models/theme.models'
import { bodyFonts, headingFonts, codeFonts } from '../shared/models/theme.models'
import { getFontLinks } from '../shared/utils/theme.utils'

let _currentTheme: Readonly<Theme> | null = null

export interface ColorInput {
  hue: number // 0-360, required
  saturation?: number // 0-100, defaults to 85
  isNeutral?: boolean // if true, very low saturation (rawSat / 10)
  isTinted?: boolean // if true, keep higher saturation (overrides isNeutral)
  highContrast?: boolean // if true, step 9 uses 0%/100% lightness
}

export interface PaletteColorInput {
  hue?: number // 0-360, auto-derived from primary if omitted
  saturation?: number // 0-100
  isNeutral?: boolean // if true, very low saturation (rawSat / 10)
  isTinted?: boolean // if true, keep higher saturation (overrides isNeutral)
  highContrast?: boolean // if true, step 9 uses 0%/100% lightness
}

export interface CreateThemeOptions {
  primary: ColorInput
  secondary?: PaletteColorInput
  neutral?: PaletteColorInput
  background?: PaletteColorInput
  // Flattened token overrides
  size?: Record<string | number, number>
  space?: Record<string | number, number>
  radius?: Record<string | number, number>
  zIndex?: Record<string | number, number>
  fontSize?: Record<string, number>
  borderWidth?: Record<string, number>
  shadows?: Theme['shadows']
  fonts?: FontFamilySpec
  gradients?: Theme['gradients']
  glass?: Theme['glass']
}

/** Default font spec using registry keys */
const DEFAULT_FONT_SPEC: FontFamilySpec = {
  body: 'inter',
  heading: 'montserrat',
  code: 'firaCode',
}

/** Token scale defaults */
const DEFAULT_RADIUS = { ...radius }
const DEFAULT_ZINDEX = { ...zIndex }

function validateHue(hue: number, label: string): void {
  if (hue < 0 || hue > 360 || !Number.isFinite(hue)) {
    throw new Error(`${label} hue must be between 0 and 360, got ${hue}`)
  }
}

function validateSaturation(sat: number, label: string): void {
  if (sat < 0 || sat > 100 || !Number.isFinite(sat)) {
    throw new Error(`${label} saturation must be between 0 and 100, got ${sat}`)
  }
}

function resolvePalette(
  primary: ColorInput,
  input: PaletteColorInput | undefined,
  defaultHueOffset: number,
  defaultSat: number,
  defaultIsNeutral = false,
): { hue: number; saturation: number; highContrast?: boolean } {
  if (!input) {
    return {
      hue: (primary.hue + defaultHueOffset) % 360,
      saturation: defaultIsNeutral ? defaultSat / 10 : defaultSat,
    }
  }
  const hue = input.hue ?? (primary.hue + defaultHueOffset) % 360
  const rawSat = input.saturation ?? defaultSat
  const isNeutral = input.isTinted ? false : (input.isNeutral ?? defaultIsNeutral)
  const saturation = isNeutral ? rawSat / 10 : rawSat
  return { hue, saturation, highContrast: input.highContrast }
}

/** Generate a 12-step alpha palette from hue + saturation */
function generateAlphaPalette(hue: number, saturation: number, luminance: number): string[] {
  return ALPHA_VALUES.map((alpha) => {
    const a = String(alpha).replace('0.', '.')
    return `hsl(${hue},${Math.round(saturation)}%,${luminance}%,${a})`
  })
}

function mergeScale<T extends Record<string | number, number>>(
  base: T,
  override: Record<string | number, number> | undefined,
): T {
  if (!override) return base
  return { ...base, ...override } as T
}

/** Resolve FontFamilySpec keys to CSS font-family strings + Google Fonts links */
function resolveFontSpec(spec: FontFamilySpec): {
  fonts: NonNullable<Theme['fonts']>
  fontLinks: HtmlHeadLink[]
} {
  const bodyKey = spec.body ?? DEFAULT_FONT_SPEC.body!
  const headingKey = spec.heading ?? DEFAULT_FONT_SPEC.heading!
  const codeKey = spec.code ?? DEFAULT_FONT_SPEC.code!

  const bodyFont = bodyFonts[bodyKey]
  const headingFont = headingFonts[headingKey]
  const codeFont = codeFonts[codeKey]

  // Subheading: look up in both registries, fall back to heading
  const subheadingKey = spec.subheading
  let subheadingCss: string | undefined
  if (subheadingKey) {
    const fromBody = bodyFonts[subheadingKey as keyof typeof bodyFonts]
    const fromHeading = headingFonts[subheadingKey as keyof typeof headingFonts]
    const font = fromBody ?? fromHeading
    if (font) subheadingCss = `${font.family}, ${font.fallback}`
  }

  return {
    fonts: {
      heading: `${headingFont.family}, ${headingFont.fallback}`,
      ...(subheadingCss && { subheading: subheadingCss }),
      body: `${bodyFont.family}, ${bodyFont.fallback}`,
      mono: `${codeFont.family}, ${codeFont.fallback}`,
    },
    fontLinks: getFontLinks(spec),
  }
}

/**
 * Create a complete theme from minimal color input.
 *
 * Direct mapping: options.primary → theme.palettes.primary → $primary1-12
 */
export function createTheme(options: CreateThemeOptions): Readonly<Theme> {
  const { primary, shadows } = options

  // Validate primary
  validateHue(primary.hue, 'primary')
  const rawPrimarySat = primary.saturation ?? 85
  const primaryIsNeutral = primary.isTinted ? false : (primary.isNeutral ?? false)
  const primarySat = primaryIsNeutral ? rawPrimarySat / 10 : rawPrimarySat
  validateSaturation(primarySat, 'primary')

  // Resolve secondary (complementary by default)
  const secondary = resolvePalette(primary, options.secondary, 180, 50)
  validateHue(secondary.hue, 'secondary')
  validateSaturation(secondary.saturation, 'secondary')

  // Resolve neutral (analogous by default, isNeutral defaults true)
  const neutral = resolvePalette(primary, options.neutral, 30, 30, true)
  validateHue(neutral.hue, 'neutral')
  validateSaturation(neutral.saturation, 'neutral')

  // Resolve background (analogous by default, chromatic)
  const background = resolvePalette(primary, options.background, 30, 30)
  validateHue(background.hue, 'background')
  validateSaturation(background.saturation, 'background')

  // Generate palettes — direct mapping
  const palettes: Theme['palettes'] = {
    primary: {
      light: generatePalette(primary.hue, primarySat, 'light', primary.highContrast),
      dark: generatePalette(primary.hue, primarySat, 'dark', primary.highContrast),
    },
    secondary: {
      light: generatePalette(secondary.hue, secondary.saturation, 'light', secondary.highContrast),
      dark: generatePalette(secondary.hue, secondary.saturation, 'dark', secondary.highContrast),
    },
    neutral: {
      light: generatePalette(neutral.hue, neutral.saturation, 'light', neutral.highContrast),
      dark: generatePalette(neutral.hue, neutral.saturation, 'dark', neutral.highContrast),
    },
    background: {
      light: generatePalette(background.hue, background.saturation, 'light', background.highContrast),
      dark: generatePalette(background.hue, background.saturation, 'dark', background.highContrast),
    },
  }

  // Generate alpha palettes — theme-aware translucent colors
  const alphaPalettes: NonNullable<Theme['alphaPalettes']> = {
    primary: {
      light: generateAlphaPalette(primary.hue, primarySat, 50),
      dark: generateAlphaPalette(primary.hue, primarySat, 50),
    },
    secondary: {
      light: generateAlphaPalette(secondary.hue, secondary.saturation, 50),
      dark: generateAlphaPalette(secondary.hue, secondary.saturation, 50),
    },
    neutral: {
      light: generateAlphaPalette(neutral.hue, neutral.saturation, 50),
      dark: generateAlphaPalette(neutral.hue, neutral.saturation, 50),
    },
    background: {
      light: generateAlphaPalette(background.hue, background.saturation, 50),
      dark: generateAlphaPalette(background.hue, background.saturation, 50),
    },
    min: {
      light: generateAlphaPalette(0, 0, 100),
      dark: generateAlphaPalette(0, 0, 0),
    },
    max: {
      light: generateAlphaPalette(0, 0, 0),
      dark: generateAlphaPalette(0, 0, 100),
    },
  }

  // Resolve fonts
  const fontSpec = options.fonts ?? DEFAULT_FONT_SPEC
  const { fonts, fontLinks } = resolveFontSpec(fontSpec)

  // Merge shadows
  const mergedShadows: Theme['shadows'] = shadows ?? {
    light: lightShadows,
    dark: darkShadows,
  }

  const theme: Theme = {
    name: `theme-${primary.hue}`,
    palettes,
    alphaPalettes,
    fontSize: options.fontSize,
    size: options.size,
    space: options.space,
    radius: (() => {
      const merged = mergeScale(DEFAULT_RADIUS, options.radius)
      if (options.radius?.buttonGrouped === undefined && options.radius?.button !== undefined) {
        ;(merged as any).buttonGrouped = Math.min(options.radius.button as number, 24)
      }
      return merged
    })(),
    zIndex: mergeScale(DEFAULT_ZINDEX, options.zIndex),
    borderWidth: options.borderWidth,
    shadows: mergedShadows,
    fonts,
    fontLinks,
    gradients: options.gradients,
    glass: options.glass,
  }

  return Object.freeze(theme)
}

// TODO: Native parity
// On native, applyTheme should store the theme in a singleton that
// the native StlProvider reads for token resolution. The native
// tokenResolver would look up values from the active theme's palettes
// instead of the build-time defaults. Same createTheme + applyTheme
// API surface, different internal mechanism (no CSS, no DOM attributes).

/**
 * Set the active theme and inject CSS variables into the DOM.
 * In non-browser environments (SSR), only sets the singleton.
 */
export function applyTheme(theme: Readonly<Theme>, mode: 'light' | 'dark' = 'light'): void {
  _currentTheme = theme
  if (typeof document !== 'undefined') {
    const vars = themeToVars(theme, mode)
    let styleEl = document.getElementById('stl-active-theme')
    if (!styleEl) {
      styleEl = document.createElement('style')
      styleEl.id = 'stl-active-theme'
      document.head.appendChild(styleEl)
    }
    const declarations = Object.entries(vars)
      .map(([name, value]) => `  ${name}: ${value};`)
      .join('\n')
    styleEl.textContent = `:root {\n${declarations}\n}`
  }
}

/**
 * Get the currently active theme, or null if none has been applied.
 */
export function getTheme(): Readonly<Theme> | null {
  return _currentTheme
}
