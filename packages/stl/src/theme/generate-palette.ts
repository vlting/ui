/**
 * Generate a 12-step OKLCH palette from a single hue + saturation.
 *
 * Uses perceptually uniform lightness distribution via OKLCH color space.
 * Light mode: step 0 = near-white → step 11 = near-black
 * Dark mode: step 0 = near-black → step 11 = near-white
 */

// OKLCH lightness stops (0–1 range, perceptually uniform)
const LIGHT_LIGHTNESS = [0.98, 0.95, 0.90, 0.83, 0.74, 0.64, 0.53, 0.42, 0.32, 0.23, 0.15, 0.08]
const DARK_LIGHTNESS = [0.08, 0.12, 0.18, 0.24, 0.32, 0.42, 0.53, 0.64, 0.74, 0.83, 0.90, 0.96]

// Chroma curve — reduced at lightness extremes to avoid neon/muddy artifacts
const CHROMA_CURVE = [0.15, 0.3, 0.5, 0.7, 0.85, 0.95, 1, 0.95, 0.9, 0.85, 0.75, 0.6]

// Max chroma for saturation=100
const MAX_CHROMA = 0.37

/**
 * Generate a 12-step palette from hue (0-360) and saturation (0-100).
 *
 * @param hue - Hue angle (0-360)
 * @param saturation - Base saturation (0-100), converted to chroma internally
 * @param mode - 'light' or 'dark'
 * @returns Array of 12 OKLCH color strings
 */
export function generatePalette(
  hue: number,
  saturation: number,
  mode: 'light' | 'dark',
  highContrast?: boolean,
): string[] {
  const lightness = [...(mode === 'light' ? LIGHT_LIGHTNESS : DARK_LIGHTNESS)]
  if (highContrast) {
    lightness[8] = mode === 'light' ? 0 : 1
  }
  const maxChroma = (saturation / 100) * MAX_CHROMA
  return lightness.map((l, i) => {
    const c = +(maxChroma * CHROMA_CURVE[i]).toFixed(4)
    return `oklch(${l} ${c} ${hue})`
  })
}

/**
 * Convert OKLCH to linear sRGB.
 * Uses the OKLab intermediate step.
 */
function oklchToLinearRgb(l: number, c: number, h: number): [number, number, number] {
  // OKLCH → OKLab
  const hRad = (h * Math.PI) / 180
  const a = c * Math.cos(hRad)
  const b = c * Math.sin(hRad)

  // OKLab → linear LMS (approximate inverse of Björn Ottosson's transform)
  const l_ = l + 0.3963377774 * a + 0.2158037573 * b
  const m_ = l - 0.1055613458 * a - 0.0638541728 * b
  const s_ = l - 0.0894841775 * a - 1.2914855480 * b

  // Cube the LMS values
  const lCubed = l_ * l_ * l_
  const mCubed = m_ * m_ * m_
  const sCubed = s_ * s_ * s_

  // LMS → linear sRGB
  const r = +4.0767416621 * lCubed - 3.3077115913 * mCubed + 0.2309699292 * sCubed
  const g = -1.2684380046 * lCubed + 2.6097574011 * mCubed - 0.3413193965 * sCubed
  const bl = -0.0041960863 * lCubed - 0.7034186147 * mCubed + 1.7076147010 * sCubed

  return [r, g, bl]
}

/**
 * WCAG 2.1 relative luminance from OKLCH values.
 * Converts oklch → linear sRGB → relative luminance.
 */
function relativeLuminance(l: number, c: number, h: number): number {
  const [r, g, b] = oklchToLinearRgb(l, c, h)

  // Clamp to [0, 1] — out-of-gamut colors can produce values outside range
  const clamp = (v: number) => Math.max(0, Math.min(1, v))

  return 0.2126 * clamp(r) + 0.7152 * clamp(g) + 0.0722 * clamp(b)
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
 * @param saturation - Base saturation of the palette (0-100)
 * @param mode - 'light' or 'dark'
 * @returns Step index (0-11) for text color
 */
export function getTextColorStep(
  backgroundStep: number,
  hue: number,
  saturation: number,
  mode: 'light' | 'dark',
  highContrast?: boolean,
): number {
  const lightness = [...(mode === 'light' ? LIGHT_LIGHTNESS : DARK_LIGHTNESS)]
  if (highContrast) {
    lightness[8] = mode === 'light' ? 0 : 1
  }
  const maxChroma = (saturation / 100) * MAX_CHROMA
  const bgC = maxChroma * CHROMA_CURVE[backgroundStep]
  const bgL = relativeLuminance(lightness[backgroundStep], bgC, hue)

  // Search from the opposite end toward the background
  const isLightBg = backgroundStep < 6
  const start = isLightBg ? 11 : 0
  const step = isLightBg ? -1 : 1
  const end = isLightBg ? -1 : 12

  for (let i = start; i !== end; i += step) {
    const fgC = maxChroma * CHROMA_CURVE[i]
    const fgL = relativeLuminance(lightness[i], fgC, hue)
    if (contrastRatio(bgL, fgL) >= 4.5) {
      return i
    }
  }

  // Fallback: most extreme step
  return isLightBg ? 11 : 0
}
