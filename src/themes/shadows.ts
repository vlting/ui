export interface ShadowToken {
  /** Complete CSS box-shadow string. Stored as a theme variable, so changes with light/dark mode. */
  boxShadow: string
  /** RGBA color — used as shadowColor in React Native */
  color: string
  /** React Native shadowOffset */
  offset?: { width: number; height: number }
  /** React Native shadowRadius */
  radius?: number
  /** React Native shadowOpacity */
  opacity?: number
}

export type ShadowScale = {
  sm?: ShadowToken
  md?: ShadowToken
  lg?: ShadowToken
  xl?: ShadowToken
  '2xl'?: ShadowToken
}

/** Maps semantic shadow scale keys to Tamagui theme variable names */
const SHADOW_VAR_NAMES: Record<keyof ShadowScale, string> = {
  sm: 'shadowSm',
  md: 'shadowMd',
  lg: 'shadowLg',
  xl: 'shadowXl',
  '2xl': 'shadow2xl',
}

/**
 * Convert a ShadowScale to theme nonInheritedValues (Record<string, string>).
 *
 * Each level produces two vars:
 *   - `shadowMd`      → full CSS box-shadow string (use as `boxShadow="$shadowMd"` on web)
 *   - `shadowMdColor` → rgba color only (use as `shadowColor="$shadowMdColor"` in React Native)
 */
export function shadowScaleToThemeValues(scale: ShadowScale): Record<string, string> {
  const values: Record<string, string> = {}
  for (const [level, varName] of Object.entries(SHADOW_VAR_NAMES) as [keyof ShadowScale, string][]) {
    const token = scale[level]
    if (!token) continue
    values[varName] = token.boxShadow
    values[`${varName}Color`] = token.color
  }
  return values
}

export const lightShadows: ShadowScale = {
  sm: {
    boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
    color: 'rgba(0,0,0,0.05)',
    offset: { width: 0, height: 1 },
    radius: 2,
    opacity: 0.05,
  },
  md: {
    boxShadow: '0 4px 8px rgba(0,0,0,0.08), 0 2px 4px rgba(0,0,0,0.04)',
    color: 'rgba(0,0,0,0.08)',
    offset: { width: 0, height: 4 },
    radius: 8,
    opacity: 0.08,
  },
  lg: {
    boxShadow: '0 8px 16px rgba(0,0,0,0.12), 0 4px 8px rgba(0,0,0,0.06)',
    color: 'rgba(0,0,0,0.12)',
    offset: { width: 0, height: 8 },
    radius: 16,
    opacity: 0.12,
  },
  xl: {
    boxShadow: '0 16px 32px rgba(0,0,0,0.16), 0 8px 16px rgba(0,0,0,0.08)',
    color: 'rgba(0,0,0,0.16)',
    offset: { width: 0, height: 16 },
    radius: 32,
    opacity: 0.16,
  },
  '2xl': {
    boxShadow: '0 24px 48px rgba(0,0,0,0.24), 0 12px 24px rgba(0,0,0,0.12)',
    color: 'rgba(0,0,0,0.24)',
    offset: { width: 0, height: 24 },
    radius: 48,
    opacity: 0.24,
  },
}

export const darkShadows: ShadowScale = {
  sm: {
    boxShadow: '0 1px 2px rgba(0,0,0,0.15)',
    color: 'rgba(0,0,0,0.15)',
    offset: { width: 0, height: 1 },
    radius: 2,
    opacity: 0.15,
  },
  md: {
    boxShadow: '0 4px 8px rgba(0,0,0,0.24), 0 2px 4px rgba(0,0,0,0.12)',
    color: 'rgba(0,0,0,0.24)',
    offset: { width: 0, height: 4 },
    radius: 8,
    opacity: 0.24,
  },
  lg: {
    boxShadow: '0 8px 16px rgba(0,0,0,0.32), 0 4px 8px rgba(0,0,0,0.16)',
    color: 'rgba(0,0,0,0.32)',
    offset: { width: 0, height: 8 },
    radius: 16,
    opacity: 0.32,
  },
  xl: {
    boxShadow: '0 16px 32px rgba(0,0,0,0.40), 0 8px 16px rgba(0,0,0,0.20)',
    color: 'rgba(0,0,0,0.40)',
    offset: { width: 0, height: 16 },
    radius: 32,
    opacity: 0.4,
  },
  '2xl': {
    boxShadow: '0 24px 48px rgba(0,0,0,0.52), 0 12px 24px rgba(0,0,0,0.26)',
    color: 'rgba(0,0,0,0.52)',
    offset: { width: 0, height: 24 },
    radius: 48,
    opacity: 0.52,
  },
}
