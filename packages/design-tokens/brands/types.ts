import type { ShadowScale } from '../themes'

/**
 * Brand — a simple data object describing visual identity.
 *
 * No factory pattern, no framework dependencies.
 * Consumed by `injectBrandVars()` to produce CSS custom properties.
 */
export interface Brand {
  name: string
  palettes: {
    light: string[] // 12-step palette
    dark: string[] // 12-step palette
  }
  accentPalettes?: Record<
    string,
    {
      light: string[]
      dark: string[]
    }
  >
  tokens?: {
    size?: Record<string | number, number>
    space?: Record<string | number, number>
    radius?: Record<string | number, number>
    zIndex?: Record<string | number, number>
    borderWidth?: Record<string, number>
  }
  shadows?: {
    light?: ShadowScale
    dark?: ShadowScale
  }
  fonts?: {
    heading?: string
    body?: string
    mono?: string
  }
}
