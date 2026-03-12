import { size, space, radius, zIndex, borderWidth } from './base'
import { lightShadows, darkShadows } from './themes'
import { generatePalette } from './generate-palette'
import { themeToVars } from './inject'
import type { Theme } from './types'

let _currentTheme: Readonly<Theme> | null = null

export interface ColorInput {
  hue: number // 0-360, required
  saturation?: number // 0-100, defaults to 85
}

export interface SecondaryColorInput {
  hue?: number // 0-360, auto-derived from primary if omitted
  saturation?: number // 0-100
  isNeutral?: boolean // if true, very low saturation
}

export interface CreateThemeOptions {
  primary: ColorInput
  secondary?: SecondaryColorInput
  tertiary?: SecondaryColorInput
  tokens?: Theme['tokens']
  shadows?: Theme['shadows']
  fonts?: Theme['fonts']
  palettes?: Partial<Theme['palettes']>
  accentPalettes?: Theme['accentPalettes']
}

const DEFAULT_FONTS: NonNullable<Theme['fonts']> = {
  heading: 'Inter, system-ui, -apple-system, sans-serif',
  body: 'Inter, system-ui, -apple-system, sans-serif',
  mono: 'JetBrains Mono, ui-monospace, SFMono-Regular, monospace',
}

const DEFAULT_TOKENS: NonNullable<Theme['tokens']> = {
  size: { ...size },
  space: { ...space },
  radius: { ...radius },
  zIndex: { ...zIndex },
  borderWidth: { ...borderWidth },
}

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
): { hue: number; saturation: number } {
  if (!input) {
    return {
      hue: (primary.hue + defaultHueOffset) % 360,
      saturation: defaultSat,
    }
  }
  const hue = input.hue ?? (primary.hue + defaultHueOffset) % 360
  const saturation = input.isNeutral ? 5 : (input.saturation ?? defaultSat)
  return { hue, saturation }
}

function deepMergeTokens(
  base: NonNullable<Theme['tokens']>,
  override: Theme['tokens'],
): NonNullable<Theme['tokens']> {
  if (!override) return base
  const result = { ...base }
  for (const key of Object.keys(override) as (keyof NonNullable<Theme['tokens']>)[]) {
    const overrideValue = override[key]
    if (overrideValue) {
      result[key] = { ...(base[key] as Record<string, number>), ...overrideValue } as never
    }
  }
  return result
}

/**
 * Create a complete theme from minimal color input.
 *
 * The minimal call `createTheme({ primary: { hue: 220 } })` produces
 * a complete, functional theme with derived secondary/tertiary colors.
 */
export function createTheme(options: CreateThemeOptions): Readonly<Theme> {
  const { primary, tokens, shadows, fonts, palettes: paletteOverrides, accentPalettes: accentOverrides } = options

  // Validate primary
  validateHue(primary.hue, 'primary')
  const primarySat = primary.saturation ?? 85
  validateSaturation(primarySat, 'primary')

  // Resolve secondary (complementary by default)
  const secondary = resolveSecondary(primary, options.secondary, 180, 50)
  validateHue(secondary.hue, 'secondary')
  validateSaturation(secondary.saturation, 'secondary')

  // Resolve tertiary (analogous by default)
  const tertiary = resolveSecondary(primary, options.tertiary, 30, 30)
  validateHue(tertiary.hue, 'tertiary')
  validateSaturation(tertiary.saturation, 'tertiary')

  // Generate palettes — primary becomes the neutral palette
  const palettes: Theme['palettes'] = {
    light: paletteOverrides?.light ?? generatePalette(primary.hue, primarySat, 'light'),
    dark: paletteOverrides?.dark ?? generatePalette(primary.hue, primarySat, 'dark'),
  }

  // Accent palettes — secondary → "primary", tertiary → "secondary"
  const accentPalettes: Theme['accentPalettes'] = accentOverrides ?? {
    primary: {
      light: generatePalette(secondary.hue, secondary.saturation, 'light'),
      dark: generatePalette(secondary.hue, secondary.saturation, 'dark'),
    },
    secondary: {
      light: generatePalette(tertiary.hue, tertiary.saturation, 'light'),
      dark: generatePalette(tertiary.hue, tertiary.saturation, 'dark'),
    },
  }

  // Merge tokens
  const mergedTokens = deepMergeTokens(DEFAULT_TOKENS, tokens)

  // Merge shadows
  const mergedShadows: Theme['shadows'] = shadows ?? {
    light: lightShadows,
    dark: darkShadows,
  }

  // Merge fonts
  const mergedFonts: Theme['fonts'] = fonts ? { ...DEFAULT_FONTS, ...fonts } : { ...DEFAULT_FONTS }

  const theme: Theme = {
    name: `theme-${primary.hue}`,
    palettes,
    accentPalettes,
    tokens: mergedTokens,
    shadows: mergedShadows,
    fonts: mergedFonts,
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
