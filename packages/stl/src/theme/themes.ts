// ---------------------------------------------------------------------------
// Palettes
// ---------------------------------------------------------------------------

export const lightPalette: string[] = [
  '#ffffff',
  '#f9f9f9',
  '#f3f3f3',
  '#ededed',
  '#e8e8e8',
  '#d4d4d4',
  '#b0b0b0',
  '#898989',
  '#6a6a6a',
  '#4a4a4a',
  '#2b2b2b',
  '#111111',
]

export const darkPalette: string[] = [
  '#111111',
  '#1a1a1a',
  '#222222',
  '#2a2a2a',
  '#333333',
  '#444444',
  '#666666',
  '#888888',
  '#aaaaaa',
  '#cccccc',
  '#e8e8e8',
  '#f5f5f5',
]

export const accentPalettes: Record<string, { light: string[]; dark: string[] }> = {
  blue: {
    light: [
      '#f0f7ff',
      '#dceefb',
      '#b6d9f7',
      '#8ac0f0',
      '#5aa7e8',
      '#3b8fdb',
      '#2270c2',
      '#1a5aa0',
      '#134580',
      '#0d3060',
      '#082040',
      '#041020',
    ],
    dark: [
      '#041020',
      '#082040',
      '#0d3060',
      '#134580',
      '#1a5aa0',
      '#2270c2',
      '#3b8fdb',
      '#5aa7e8',
      '#8ac0f0',
      '#b6d9f7',
      '#dceefb',
      '#f0f7ff',
    ],
  },
  red: {
    light: [
      '#fff5f5',
      '#ffe0e0',
      '#ffc0c0',
      '#ff9999',
      '#ff6666',
      '#ee4444',
      '#cc2222',
      '#aa1111',
      '#880808',
      '#660404',
      '#440202',
      '#220101',
    ],
    dark: [
      '#220101',
      '#440202',
      '#660404',
      '#880808',
      '#aa1111',
      '#cc2222',
      '#ee4444',
      '#ff6666',
      '#ff9999',
      '#ffc0c0',
      '#ffe0e0',
      '#fff5f5',
    ],
  },
  green: {
    light: [
      '#f0fff4',
      '#dcfce7',
      '#bbf7d0',
      '#86efac',
      '#4ade80',
      '#22c55e',
      '#16a34a',
      '#15803d',
      '#166534',
      '#14532d',
      '#0d3820',
      '#062010',
    ],
    dark: [
      '#062010',
      '#0d3820',
      '#14532d',
      '#166534',
      '#15803d',
      '#16a34a',
      '#22c55e',
      '#4ade80',
      '#86efac',
      '#bbf7d0',
      '#dcfce7',
      '#f0fff4',
    ],
  },
  orange: {
    light: [
      '#fff7ed',
      '#ffedd5',
      '#fed7aa',
      '#fdba74',
      '#fb923c',
      '#f97316',
      '#ea580c',
      '#c2410c',
      '#9a3412',
      '#7c2d12',
      '#5c1d08',
      '#3c0e04',
    ],
    dark: [
      '#3c0e04',
      '#5c1d08',
      '#7c2d12',
      '#9a3412',
      '#c2410c',
      '#ea580c',
      '#f97316',
      '#fb923c',
      '#fdba74',
      '#fed7aa',
      '#ffedd5',
      '#fff7ed',
    ],
  },
  purple: {
    light: [
      '#faf5ff',
      '#f3e8ff',
      '#e9d5ff',
      '#d8b4fe',
      '#c084fc',
      '#a855f7',
      '#9333ea',
      '#7e22ce',
      '#6b21a8',
      '#581c87',
      '#3b1064',
      '#200840',
    ],
    dark: [
      '#200840',
      '#3b1064',
      '#581c87',
      '#6b21a8',
      '#7e22ce',
      '#9333ea',
      '#a855f7',
      '#c084fc',
      '#d8b4fe',
      '#e9d5ff',
      '#f3e8ff',
      '#faf5ff',
    ],
  },
  pink: {
    light: [
      '#fdf2f8',
      '#fce7f3',
      '#fbcfe8',
      '#f9a8d4',
      '#f472b6',
      '#ec4899',
      '#db2777',
      '#be185d',
      '#9d174d',
      '#831843',
      '#5c1033',
      '#380820',
    ],
    dark: [
      '#380820',
      '#5c1033',
      '#831843',
      '#9d174d',
      '#be185d',
      '#db2777',
      '#ec4899',
      '#f472b6',
      '#f9a8d4',
      '#fbcfe8',
      '#fce7f3',
      '#fdf2f8',
    ],
  },
  yellow: {
    light: [
      '#fefce8',
      '#fef9c3',
      '#fef08a',
      '#fde047',
      '#facc15',
      '#eab308',
      '#ca8a04',
      '#a16207',
      '#854d0e',
      '#713f12',
      '#532e0a',
      '#351e04',
    ],
    dark: [
      '#351e04',
      '#532e0a',
      '#713f12',
      '#854d0e',
      '#a16207',
      '#ca8a04',
      '#eab308',
      '#facc15',
      '#fde047',
      '#fef08a',
      '#fef9c3',
      '#fefce8',
    ],
  },
}

// ---------------------------------------------------------------------------
// Shadows
// ---------------------------------------------------------------------------

export interface ShadowToken {
  boxShadow: string
  color: string
  offset?: { width: number; height: number }
  radius?: number
  opacity?: number
}

export type ShadowScale = {
  sm?: ShadowToken
  md?: ShadowToken
  lg?: ShadowToken
  xl?: ShadowToken
  '2xl'?: ShadowToken
  buttonShadow?: ShadowToken
  buttonShadowHover?: ShadowToken
}

export function shadowScaleToThemeValues(scale: ShadowScale): Record<string, string> {
  const SHADOW_VAR_NAMES: Record<keyof ShadowScale, string> = {
    sm: 'shadowSm',
    md: 'shadowMd',
    lg: 'shadowLg',
    xl: 'shadowXl',
    '2xl': 'shadow2xl',
    buttonShadow: 'buttonShadow',
    buttonShadowHover: 'buttonShadowHover',
  }
  const values: Record<string, string> = {}
  for (const [level, varName] of Object.entries(SHADOW_VAR_NAMES) as [
    keyof ShadowScale,
    string,
  ][]) {
    const token = scale[level]
    if (!token) continue
    values[varName] = token.boxShadow
    values[`${varName}Color`] = token.color
  }
  return values
}

export const lightShadows: ShadowScale = {
  sm: {
    boxShadow: '0 1px 2px rgba(0,0,0,0.03)',
    color: 'rgba(0,0,0,0.03)',
    offset: { width: 0, height: 1 },
    radius: 2,
    opacity: 0.03,
  },
  md: {
    boxShadow: '0 4px 8px rgba(0,0,0,0.05), 0 2px 4px rgba(0,0,0,0.03)',
    color: 'rgba(0,0,0,0.05)',
    offset: { width: 0, height: 4 },
    radius: 8,
    opacity: 0.05,
  },
  lg: {
    boxShadow: '0 8px 16px rgba(0,0,0,0.07), 0 4px 8px rgba(0,0,0,0.04)',
    color: 'rgba(0,0,0,0.07)',
    offset: { width: 0, height: 8 },
    radius: 16,
    opacity: 0.07,
  },
  xl: {
    boxShadow: '0 16px 32px rgba(0,0,0,0.10), 0 8px 16px rgba(0,0,0,0.05)',
    color: 'rgba(0,0,0,0.10)',
    offset: { width: 0, height: 16 },
    radius: 32,
    opacity: 0.1,
  },
  '2xl': {
    boxShadow: '0 24px 48px rgba(0,0,0,0.14), 0 12px 24px rgba(0,0,0,0.07)',
    color: 'rgba(0,0,0,0.14)',
    offset: { width: 0, height: 24 },
    radius: 48,
    opacity: 0.14,
  },
  buttonShadow: { boxShadow: 'none', color: 'transparent' },
  buttonShadowHover: { boxShadow: 'none', color: 'transparent' },
}

export const darkShadows: ShadowScale = {
  sm: {
    boxShadow: '0 1px 2px rgba(0,0,0,0.10)',
    color: 'rgba(0,0,0,0.10)',
    offset: { width: 0, height: 1 },
    radius: 2,
    opacity: 0.1,
  },
  md: {
    boxShadow: '0 4px 8px rgba(0,0,0,0.15), 0 2px 4px rgba(0,0,0,0.08)',
    color: 'rgba(0,0,0,0.15)',
    offset: { width: 0, height: 4 },
    radius: 8,
    opacity: 0.15,
  },
  lg: {
    boxShadow: '0 8px 16px rgba(0,0,0,0.20), 0 4px 8px rgba(0,0,0,0.10)',
    color: 'rgba(0,0,0,0.20)',
    offset: { width: 0, height: 8 },
    radius: 16,
    opacity: 0.2,
  },
  xl: {
    boxShadow: '0 16px 32px rgba(0,0,0,0.25), 0 8px 16px rgba(0,0,0,0.12)',
    color: 'rgba(0,0,0,0.25)',
    offset: { width: 0, height: 16 },
    radius: 32,
    opacity: 0.25,
  },
  '2xl': {
    boxShadow: '0 24px 48px rgba(0,0,0,0.32), 0 12px 24px rgba(0,0,0,0.16)',
    color: 'rgba(0,0,0,0.32)',
    offset: { width: 0, height: 24 },
    radius: 48,
    opacity: 0.32,
  },
  buttonShadow: { boxShadow: 'none', color: 'transparent' },
  buttonShadowHover: { boxShadow: 'none', color: 'transparent' },
}

