/**
 * Contrast Ratio Validation Script
 *
 * Validates WCAG AA contrast ratios between palette background colors
 * and their computed text colors from the STL color system.
 *
 * Usage: npx tsx scripts/validate-contrast.ts
 */

import {
  COLOR_KEYS,
  type ColorMode,
  type ColorNumberKey,
  type ColorPalette,
  CoreColorName,
  DEFAULT_SOURCE_COLORS,
  FlavorColorName,
  type ScaleColorName,
  StatusColorName,
  type ThemeColor,
} from '../packages/stl/src/shared/models/colorGen.models'
import {
  generateThemeColors,
  getTextColor,
} from '../packages/stl/src/shared/utils/colorGen.utils'

// OKLCH parsing and color math

function parseOKLCH(color: string): { l: number; c: number; h: number } | null {
  const m = color.match(/oklch\(([.\d]+)\s+([.\d]+)\s+([.\d]+)\)/)
  if (!m) return null
  return { l: +m[1], c: +m[2], h: +m[3] }
}

function oklchToLinearRgb(l: number, c: number, h: number): [number, number, number] {
  const hRad = (h * Math.PI) / 180
  const a = c * Math.cos(hRad)
  const b = c * Math.sin(hRad)
  const l_ = l + 0.3963377774 * a + 0.2158037573 * b
  const m_ = l - 0.1055613458 * a - 0.0638541728 * b
  const s_ = l - 0.0894841775 * a - 1.2914855480 * b
  const lCubed = l_ * l_ * l_
  const mCubed = m_ * m_ * m_
  const sCubed = s_ * s_ * s_
  const r = +4.0767416621 * lCubed - 3.3077115913 * mCubed + 0.2309699292 * sCubed
  const g = -1.2684380046 * lCubed + 2.6097574011 * mCubed - 0.3413193965 * sCubed
  const bl = -0.0041960863 * lCubed - 0.7034186147 * mCubed + 1.7076147010 * sCubed
  return [r, g, bl]
}

function oklchToLuminance(l: number, c: number, h: number): number {
  const [r, g, b] = oklchToLinearRgb(l, c, h)
  const clamp = (v: number) => Math.max(0, Math.min(1, v))
  return 0.2126 * clamp(r) + 0.7152 * clamp(g) + 0.0722 * clamp(b)
}

function contrastRatio(l1: number, l2: number): number {
  const lighter = Math.max(l1, l2)
  const darker = Math.min(l1, l2)
  return (lighter + 0.05) / (darker + 0.05)
}

// Generate palette as raw OKLCH strings

function generatePalette(mode: ColorMode): ColorPalette<string> {
  const palette = generateThemeColors<string>(
    DEFAULT_SOURCE_COLORS,
    mode,
    (key, pal, value, _numberKey, isMapped) => {
      if (!isMapped) {
        pal[key] = String(value)
      } else {
        // Mapped/aliased — value is a reference key like "aqua1"
        pal[key] = String(value)
      }
    },
  )

  // Resolve mapped colors (stored as reference keys, not oklch)
  for (const key of Object.keys(palette)) {
    const val = palette[key as ThemeColor]
    if (val && !val.startsWith('oklch(')) {
      const resolved = palette[val as ThemeColor]
      if (resolved) palette[key as ThemeColor] = resolved
    }
  }

  // Static min/max
  if (!palette['min' as ThemeColor]) {
    palette['min' as ThemeColor] = mode === 'light' ? 'oklch(1 0 0)' : 'oklch(0 0 0)'
  }
  if (!palette['max' as ThemeColor]) {
    palette['max' as ThemeColor] = mode === 'light' ? 'oklch(0 0 0)' : 'oklch(1 0 0)'
  }

  return palette
}

// Color families to test (non-mapped that generate real palettes)
const COLOR_FAMILIES: ScaleColorName[] = [
  CoreColorName.primary,
  CoreColorName.secondary,
  CoreColorName.neutral,
  CoreColorName.background,
  StatusColorName.info,
  StatusColorName.success,
  StatusColorName.warning,
  StatusColorName.error,
  FlavorColorName.tomato,
  FlavorColorName.amber,
  FlavorColorName.grass,
  FlavorColorName.forest,
  FlavorColorName.aqua,
  FlavorColorName.indigo,
  FlavorColorName.plum,
  FlavorColorName.magenta,
]

interface Violation {
  color: string
  step: ColorNumberKey
  mode: ColorMode
  ratio: number
  required: number
  bg: string
  fg: string
}

const violations: Violation[] = []
const modes: ColorMode[] = ['light', 'dark']

for (const mode of modes) {
  const palette = generatePalette(mode)

  for (const color of COLOR_FAMILIES) {
    for (const step of COLOR_KEYS) {
      const bgKey = `${color}${step}` as ThemeColor
      const textColorKey = getTextColor(color, step)

      const bgHSL = palette[bgKey]
      const fgHSL = palette[textColorKey]

      if (!bgHSL || !fgHSL) continue

      const bgParsed = parseOKLCH(bgHSL)
      const fgParsed = parseOKLCH(fgHSL)
      if (!bgParsed || !fgParsed) continue

      const bgLum = oklchToLuminance(bgParsed.l, bgParsed.c, bgParsed.h)
      const fgLum = oklchToLuminance(fgParsed.l, fgParsed.c, fgParsed.h)
      const ratio = contrastRatio(bgLum, fgLum)

      // WCAG AA: 4.5:1 for normal text, 3:1 for large text/UI
      if (ratio < 3) {
        violations.push({
          color,
          step,
          mode,
          ratio: Math.round(ratio * 100) / 100,
          required: 3,
          bg: bgHSL,
          fg: fgHSL,
        })
      } else if (ratio < 4.5) {
        violations.push({
          color,
          step,
          mode,
          ratio: Math.round(ratio * 100) / 100,
          required: 4.5,
          bg: bgHSL,
          fg: fgHSL,
        })
      }
    }
  }
}

// Report

if (violations.length === 0) {
  process.exit(0)
}

const critical = violations.filter((v) => v.ratio < 3)
const warnings = violations.filter((v) => v.ratio >= 3)

if (critical.length > 0) {
  for (const _v of critical) {
  }
}

if (warnings.length > 0) {
  for (const _v of warnings) {
  }
}
// Report-only — don't fail CI
process.exit(0)
