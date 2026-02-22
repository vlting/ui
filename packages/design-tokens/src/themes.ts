import { createThemeBuilder } from '@tamagui/theme-builder'

// ---------------------------------------------------------------------------
// Palettes
// ---------------------------------------------------------------------------

export const lightPalette: string[] = [
  '#ffffff', '#f9f9f9', '#f3f3f3', '#ededed', '#e8e8e8', '#d4d4d4',
  '#b0b0b0', '#898989', '#6a6a6a', '#4a4a4a', '#2b2b2b', '#111111',
]

export const darkPalette: string[] = [
  '#111111', '#1a1a1a', '#222222', '#2a2a2a', '#333333', '#444444',
  '#666666', '#888888', '#aaaaaa', '#cccccc', '#e8e8e8', '#f5f5f5',
]

export const accentPalettes: Record<string, { light: string[]; dark: string[] }> = {
  blue: {
    light: ['#f0f7ff','#dceefb','#b6d9f7','#8ac0f0','#5aa7e8','#3b8fdb','#2270c2','#1a5aa0','#134580','#0d3060','#082040','#041020'],
    dark: ['#041020','#082040','#0d3060','#134580','#1a5aa0','#2270c2','#3b8fdb','#5aa7e8','#8ac0f0','#b6d9f7','#dceefb','#f0f7ff'],
  },
  red: {
    light: ['#fff5f5','#ffe0e0','#ffc0c0','#ff9999','#ff6666','#ee4444','#cc2222','#aa1111','#880808','#660404','#440202','#220101'],
    dark: ['#220101','#440202','#660404','#880808','#aa1111','#cc2222','#ee4444','#ff6666','#ff9999','#ffc0c0','#ffe0e0','#fff5f5'],
  },
  green: {
    light: ['#f0fff4','#dcfce7','#bbf7d0','#86efac','#4ade80','#22c55e','#16a34a','#15803d','#166534','#14532d','#0d3820','#062010'],
    dark: ['#062010','#0d3820','#14532d','#166534','#15803d','#16a34a','#22c55e','#4ade80','#86efac','#bbf7d0','#dcfce7','#f0fff4'],
  },
  orange: {
    light: ['#fff7ed','#ffedd5','#fed7aa','#fdba74','#fb923c','#f97316','#ea580c','#c2410c','#9a3412','#7c2d12','#5c1d08','#3c0e04'],
    dark: ['#3c0e04','#5c1d08','#7c2d12','#9a3412','#c2410c','#ea580c','#f97316','#fb923c','#fdba74','#fed7aa','#ffedd5','#fff7ed'],
  },
  purple: {
    light: ['#faf5ff','#f3e8ff','#e9d5ff','#d8b4fe','#c084fc','#a855f7','#9333ea','#7e22ce','#6b21a8','#581c87','#3b1064','#200840'],
    dark: ['#200840','#3b1064','#581c87','#6b21a8','#7e22ce','#9333ea','#a855f7','#c084fc','#d8b4fe','#e9d5ff','#f3e8ff','#faf5ff'],
  },
  pink: {
    light: ['#fdf2f8','#fce7f3','#fbcfe8','#f9a8d4','#f472b6','#ec4899','#db2777','#be185d','#9d174d','#831843','#5c1033','#380820'],
    dark: ['#380820','#5c1033','#831843','#9d174d','#be185d','#db2777','#ec4899','#f472b6','#f9a8d4','#fbcfe8','#fce7f3','#fdf2f8'],
  },
  yellow: {
    light: ['#fefce8','#fef9c3','#fef08a','#fde047','#facc15','#eab308','#ca8a04','#a16207','#854d0e','#713f12','#532e0a','#351e04'],
    dark: ['#351e04','#532e0a','#713f12','#854d0e','#a16207','#ca8a04','#eab308','#facc15','#fde047','#fef08a','#fef9c3','#fefce8'],
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
}

const SHADOW_VAR_NAMES: Record<keyof ShadowScale, string> = {
  sm: 'shadowSm',
  md: 'shadowMd',
  lg: 'shadowLg',
  xl: 'shadowXl',
  '2xl': 'shadow2xl',
}

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
  sm: { boxShadow: '0 1px 2px rgba(0,0,0,0.05)', color: 'rgba(0,0,0,0.05)', offset: { width: 0, height: 1 }, radius: 2, opacity: 0.05 },
  md: { boxShadow: '0 4px 8px rgba(0,0,0,0.08), 0 2px 4px rgba(0,0,0,0.04)', color: 'rgba(0,0,0,0.08)', offset: { width: 0, height: 4 }, radius: 8, opacity: 0.08 },
  lg: { boxShadow: '0 8px 16px rgba(0,0,0,0.12), 0 4px 8px rgba(0,0,0,0.06)', color: 'rgba(0,0,0,0.12)', offset: { width: 0, height: 8 }, radius: 16, opacity: 0.12 },
  xl: { boxShadow: '0 16px 32px rgba(0,0,0,0.16), 0 8px 16px rgba(0,0,0,0.08)', color: 'rgba(0,0,0,0.16)', offset: { width: 0, height: 16 }, radius: 32, opacity: 0.16 },
  '2xl': { boxShadow: '0 24px 48px rgba(0,0,0,0.24), 0 12px 24px rgba(0,0,0,0.12)', color: 'rgba(0,0,0,0.24)', offset: { width: 0, height: 24 }, radius: 48, opacity: 0.24 },
}

export const darkShadows: ShadowScale = {
  sm: { boxShadow: '0 1px 2px rgba(0,0,0,0.15)', color: 'rgba(0,0,0,0.15)', offset: { width: 0, height: 1 }, radius: 2, opacity: 0.15 },
  md: { boxShadow: '0 4px 8px rgba(0,0,0,0.24), 0 2px 4px rgba(0,0,0,0.12)', color: 'rgba(0,0,0,0.24)', offset: { width: 0, height: 4 }, radius: 8, opacity: 0.24 },
  lg: { boxShadow: '0 8px 16px rgba(0,0,0,0.32), 0 4px 8px rgba(0,0,0,0.16)', color: 'rgba(0,0,0,0.32)', offset: { width: 0, height: 8 }, radius: 16, opacity: 0.32 },
  xl: { boxShadow: '0 16px 32px rgba(0,0,0,0.40), 0 8px 16px rgba(0,0,0,0.20)', color: 'rgba(0,0,0,0.40)', offset: { width: 0, height: 16 }, radius: 32, opacity: 0.4 },
  '2xl': { boxShadow: '0 24px 48px rgba(0,0,0,0.52), 0 12px 24px rgba(0,0,0,0.26)', color: 'rgba(0,0,0,0.52)', offset: { width: 0, height: 24 }, radius: 48, opacity: 0.52 },
}

// ---------------------------------------------------------------------------
// Theme Builder
// ---------------------------------------------------------------------------

const templates = {
  base: {
    background: 0, backgroundHover: 1, backgroundPress: 2, backgroundFocus: 1, backgroundTransparent: 0,
    color: 11, colorHover: 11, colorPress: 10, colorFocus: 11, colorTransparent: 11,
    borderColor: 4, borderColorHover: 5, borderColorPress: 3, borderColorFocus: 5,
    colorSubtitle: 8, placeholderColor: 7, outlineColor: 5, shadowColor: 0,
    color1: 0, color2: 1, color3: 2, color4: 3, color5: 4, color6: 5,
    color7: 6, color8: 7, color9: 8, color10: 9, color11: 10, color12: 11,
  },
  surface1: {
    background: 1, backgroundHover: 2, backgroundPress: 3, backgroundFocus: 2,
    borderColor: 4, borderColorHover: 5, borderColorPress: 3, borderColorFocus: 5,
  },
  surface2: {
    background: 2, backgroundHover: 3, backgroundPress: 4, backgroundFocus: 3,
    borderColor: 5, borderColorHover: 6, borderColorPress: 4, borderColorFocus: 6,
  },
  surface3: {
    background: 3, backgroundHover: 4, backgroundPress: 5, backgroundFocus: 4,
    borderColor: 6, borderColorHover: 7, borderColorPress: 5, borderColorFocus: 7,
  },
  inverse: {
    background: 11, backgroundHover: 10, backgroundPress: 9, backgroundFocus: 10,
    color: 0, colorHover: 0, colorPress: 1, colorFocus: 0,
    borderColor: 8, borderColorHover: 7, borderColorPress: 9, borderColorFocus: 7,
  },
}

export function buildThemes(
  overridePalettes?: Record<string, string[]>,
  overrideShadows?: { light?: ShadowScale; dark?: ShadowScale },
) {
  const mergedLightShadows = shadowScaleToThemeValues(overrideShadows?.light ?? lightShadows)
  const mergedDarkShadows = shadowScaleToThemeValues(overrideShadows?.dark ?? darkShadows)

  const colorChildThemes: Record<string, unknown> = {
    blue: [
      { parent: 'light', palette: 'light_blue', template: 'base' },
      { parent: 'dark', palette: 'dark_blue', template: 'base' },
    ],
    red: [
      { parent: 'light', palette: 'light_red', template: 'base' },
      { parent: 'dark', palette: 'dark_red', template: 'base' },
    ],
    green: [
      { parent: 'light', palette: 'light_green', template: 'base' },
      { parent: 'dark', palette: 'dark_green', template: 'base' },
    ],
    orange: [
      { parent: 'light', palette: 'light_orange', template: 'base' },
      { parent: 'dark', palette: 'dark_orange', template: 'base' },
    ],
    purple: [
      { parent: 'light', palette: 'light_purple', template: 'base' },
      { parent: 'dark', palette: 'dark_purple', template: 'base' },
    ],
    pink: [
      { parent: 'light', palette: 'light_pink', template: 'base' },
      { parent: 'dark', palette: 'dark_pink', template: 'base' },
    ],
    yellow: [
      { parent: 'light', palette: 'light_yellow', template: 'base' },
      { parent: 'dark', palette: 'dark_yellow', template: 'base' },
    ],
  }

  const themeBuilder = createThemeBuilder()
    .addPalettes({
      light: overridePalettes?.light ?? lightPalette,
      dark: overridePalettes?.dark ?? darkPalette,
      light_blue: overridePalettes?.light_blue ?? accentPalettes.blue.light,
      dark_blue: overridePalettes?.dark_blue ?? accentPalettes.blue.dark,
      light_red: overridePalettes?.light_red ?? accentPalettes.red.light,
      dark_red: overridePalettes?.dark_red ?? accentPalettes.red.dark,
      light_green: overridePalettes?.light_green ?? accentPalettes.green.light,
      dark_green: overridePalettes?.dark_green ?? accentPalettes.green.dark,
      light_orange: overridePalettes?.light_orange ?? accentPalettes.orange.light,
      dark_orange: overridePalettes?.dark_orange ?? accentPalettes.orange.dark,
      light_purple: overridePalettes?.light_purple ?? accentPalettes.purple.light,
      dark_purple: overridePalettes?.dark_purple ?? accentPalettes.purple.dark,
      light_pink: overridePalettes?.light_pink ?? accentPalettes.pink.light,
      dark_pink: overridePalettes?.dark_pink ?? accentPalettes.pink.dark,
      light_yellow: overridePalettes?.light_yellow ?? accentPalettes.yellow.light,
      dark_yellow: overridePalettes?.dark_yellow ?? accentPalettes.yellow.dark,
    })
    .addTemplates(templates)
    .addThemes({
      light: { template: 'base', palette: 'light', nonInheritedValues: mergedLightShadows },
      dark: { template: 'base', palette: 'dark', nonInheritedValues: mergedDarkShadows },
    })
    // @ts-expect-error v2 RC: addChildThemes palette type inference limitation
    .addChildThemes(colorChildThemes)
    .addChildThemes(
      {
        alt1: { template: 'surface1' },
        alt2: { template: 'surface2' },
        surface1: { template: 'surface1' },
        surface2: { template: 'surface2' },
        surface3: { template: 'surface3' },
        inverseSurface: { template: 'inverse' },
      },
      { avoidNestingWithin: ['alt1', 'alt2', 'surface1', 'surface2', 'surface3', 'inverseSurface'] },
    )

  return themeBuilder.build()
}
