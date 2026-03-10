/**
 * Generate a 12-step HSL palette from a single hue + saturation.
 *
 * Uses perceptually uniform lightness distribution.
 * Light mode: step 0 = near-white → step 11 = near-black
 * Dark mode: step 0 = near-black → step 11 = near-white
 */

// Perceptually uniform lightness stops (light mode, 12 steps)
// Designed so middle steps (5-6) sit around 50% lightness where
// color perception is strongest, while extremes approach white/black.
const LIGHT_LIGHTNESS = [98, 95, 90, 83, 74, 64, 53, 42, 32, 23, 15, 8]
const DARK_LIGHTNESS = [8, 12, 18, 24, 32, 42, 53, 64, 74, 83, 90, 96]

// Saturation is reduced at lightness extremes to avoid neon/muddy artifacts
const SATURATION_CURVE = [0.15, 0.3, 0.5, 0.7, 0.85, 0.95, 1, 0.95, 0.9, 0.85, 0.75, 0.6]

/**
 * Generate a 12-step palette from hue (0-360) and saturation (0-100).
 *
 * @param hue - Hue angle (0-360)
 * @param saturation - Base saturation (0-100)
 * @param mode - 'light' or 'dark'
 * @returns Array of 12 HSL color strings
 */
export function generatePalette(
  hue: number,
  saturation: number,
  mode: 'light' | 'dark',
): string[] {
  const lightness = mode === 'light' ? LIGHT_LIGHTNESS : DARK_LIGHTNESS
  return lightness.map((l, i) => {
    const s = Math.round(saturation * SATURATION_CURVE[i])
    return `hsl(${hue}, ${s}%, ${l}%)`
  })
}

/**
 * WCAG 2.1 relative luminance calculation for an HSL color.
 * Returns a value between 0 (black) and 1 (white).
 */
function relativeLuminance(h: number, s: number, l: number): number {
  // Convert HSL to RGB [0-1]
  const sNorm = s / 100
  const lNorm = l / 100
  const c = (1 - Math.abs(2 * lNorm - 1)) * sNorm
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1))
  const m = lNorm - c / 2

  let r = 0,
    g = 0,
    b = 0
  if (h < 60) {
    r = c
    g = x
  } else if (h < 120) {
    r = x
    g = c
  } else if (h < 180) {
    g = c
    b = x
  } else if (h < 240) {
    g = x
    b = c
  } else if (h < 300) {
    r = x
    b = c
  } else {
    r = c
    b = x
  }

  r += m
  g += m
  b += m

  // sRGB linearization
  const linearize = (v: number) =>
    v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4

  return 0.2126 * linearize(r) + 0.7152 * linearize(g) + 0.0722 * linearize(b)
}

/**
 * WCAG 2.1 contrast ratio between two relative luminance values.
 */
function contrastRatio(l1: number, l2: number): number {
  const lighter = Math.max(l1, l2)
  const darker = Math.min(l1, l2)
  return (lighter + 0.05) / (darker + 0.05)
}

/**
 * Given a background step index (0-11), returns the best text step index
 * that meets WCAG AA contrast (≥ 4.5:1) for normal text.
 *
 * Strategy: start from the opposite end of the palette and walk inward
 * until we find the first step meeting AA.
 *
 * @param backgroundStep - Index of the background color (0-11)
 * @param hue - Hue of the palette
 * @param saturation - Base saturation of the palette
 * @param mode - 'light' or 'dark'
 * @returns Step index (0-11) for text color
 */
export function getTextColorStep(
  backgroundStep: number,
  hue: number,
  saturation: number,
  mode: 'light' | 'dark',
): number {
  const lightness = mode === 'light' ? LIGHT_LIGHTNESS : DARK_LIGHTNESS
  const bgS = Math.round(saturation * SATURATION_CURVE[backgroundStep])
  const bgL = relativeLuminance(hue, bgS, lightness[backgroundStep])

  // Search from the opposite end toward the background
  const isLightBg = backgroundStep < 6
  const start = isLightBg ? 11 : 0
  const step = isLightBg ? -1 : 1
  const end = isLightBg ? -1 : 12

  for (let i = start; i !== end; i += step) {
    const fgS = Math.round(saturation * SATURATION_CURVE[i])
    const fgL = relativeLuminance(hue, fgS, lightness[i])
    if (contrastRatio(bgL, fgL) >= 4.5) {
      return i
    }
  }

  // Fallback: most extreme step
  return isLightBg ? 11 : 0
}
