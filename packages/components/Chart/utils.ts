import type { ChartConfig } from './types'
import { defaultChartColors } from './theme'

/**
 * Resolves a Tamagui token reference to a hex color value.
 * Token refs like "$blue8" or "$color9" are looked up in the theme object.
 * If the token starts with "$", strip the "$" and look up in the theme.
 * If it's already a hex value (starts with "#"), return as-is.
 */
export function resolveChartColor(
  tokenRef: string,
  theme: Record<string, string>,
): string {
  if (tokenRef.startsWith('#')) return tokenRef
  const key = tokenRef.startsWith('$') ? tokenRef.slice(1) : tokenRef
  return theme[key] || tokenRef
}

/**
 * Resolves all series colors from a ChartConfig.
 * Returns a Record mapping series keys to resolved hex colors.
 * Falls back to defaultChartColors for series without explicit colors.
 */
export function getSeriesColors(
  config: ChartConfig,
  theme: Record<string, string>,
): Record<string, string> {
  const result: Record<string, string> = {}
  const keys = Object.keys(config)
  for (let i = 0; i < keys.length; i++) {
    const key = keys[i]
    const entry = config[key]
    if (entry.color) {
      result[key] = resolveChartColor(entry.color, theme)
    } else {
      result[key] = defaultChartColors[i % defaultChartColors.length]
    }
  }
  return result
}
