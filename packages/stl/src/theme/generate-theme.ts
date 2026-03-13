import { size, space, radius, zIndex, borderWidth } from './base'
import { lightShadows, darkShadows } from './themes'
import { generatePalette } from './generate-palette'
import { themeToVars } from './inject'
import type { Theme } from './types'
import type { FontFamilySpec, HtmlHeadLink } from '../shared/models/theme.models'
import { bodyFonts, headingFonts, codeFonts } from '../shared/models/theme.models'
import { getFontLinks } from '../shared/utils/theme.utils'

let _currentTheme: Readonly<Theme> | null = null

export interface ColorInput {
  hue: number // 0-360, required
  saturation?: number // 0-100, defaults to 85
  isNeutral?: boolean // if true, very low saturation
  highContrast?: boolean // if true, step 9 uses 0%/100% lightness
}

export interface SecondaryColorInput {
  hue?: number // 0-360, auto-derived from primary if omitted
  saturation?: number // 0-100
  isNeutral?: boolean // if true, very low saturation
  highContrast?: boolean // if true, step 9 uses 0%/100% lightness
}

export interface CreateThemeOptions {
  primary: ColorInput
  secondary?: SecondaryColorInput
  tertiary?: SecondaryColorInput
  // Flattened token overrides
  size?: Record<string | number, number>
  space?: Record<string | number, number>
  radius?: Record<string | number, number>
  zIndex?: Record<string | number, number>
  fontSize?: Record<string, number>
  borderWidth?: Record<string, number>
  shadows?: Theme['shadows']
  fonts?: FontFamilySpec
}

/** Default font spec using registry keys */
const DEFAULT_FONT_SPEC: FontFamilySpec = {
  body: 'inter',
  heading: 'montserrat',
  code: 'firaCode',
}

/** Token scale defaults */
const DEFAULT_SIZE = { ...size }
const DEFAULT_SPACE = { ...space }
const DEFAULT_RADIUS = { ...radius }
const DEFAULT_ZINDEX = { ...zIndex }
const DEFAULT_BORDER_WIDTH = { ...borderWidth }

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

function resolveSecondary(
  primary: ColorInput,
  input: SecondaryColorInput | undefined,
  defaultHueOffset: number,
  defaultSat: number,
): { hue: number; saturation: number; highContrast?: boolean } {
  if (!input) {
    return {
      hue: (primary.hue + defaultHueOffset) % 360,
      saturation: defaultSat,
    }
  }
  const hue = input.hue ?? (primary.hue + defaultHueOffset) % 360
  const rawSat = input.saturation ?? defaultSat
  const saturation = input.isNeutral ? rawSat / 10 : rawSat
  return { hue, saturation, highContrast: input.highContrast }
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
  const primarySat = primary.isNeutral ? rawPrimarySat / 10 : rawPrimarySat
  validateSaturation(primarySat, 'primary')

  // Resolve secondary (complementary by default)
  const secondary = resolveSecondary(primary, options.secondary, 180, 50)
  validateHue(secondary.hue, 'secondary')
  validateSaturation(secondary.saturation, 'secondary')

  // Resolve tertiary (analogous by default)
  const tertiary = resolveSecondary(primary, options.tertiary, 30, 30)
  validateHue(tertiary.hue, 'tertiary')
  validateSaturation(tertiary.saturation, 'tertiary')

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
    tertiary: {
      light: generatePalette(tertiary.hue, tertiary.saturation, 'light', tertiary.highContrast),
      dark: generatePalette(tertiary.hue, tertiary.saturation, 'dark', tertiary.highContrast),
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
    fontSize: options.fontSize,
    size: mergeScale(DEFAULT_SIZE, options.size),
    space: mergeScale(DEFAULT_SPACE, options.space),
    radius: mergeScale(DEFAULT_RADIUS, options.radius),
    zIndex: mergeScale(DEFAULT_ZINDEX, options.zIndex),
    borderWidth: mergeScale(DEFAULT_BORDER_WIDTH, options.borderWidth),
    shadows: mergedShadows,
    fonts,
    fontLinks,
  }

  return Object.freeze(theme)
}

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
