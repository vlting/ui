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
  CoreColorName,
  DEFAULT_SOURCE_COLORS,
  FlavorColorName,
  StatusColorName,
  type ColorMode,
  type ColorNumberKey,
  type ColorPalette,
  type ScaleColorName,
  type ThemeColor,
} from '../packages/stl/src/shared/models/colorGen.models'
import { generateThemeColors, getTextColor } from '../packages/stl/src/shared/utils/colorGen.utils'

// HSL parsing and color math

function parseHSL(hsl: string): { h: number; s: number; l: number } | null {
  const m = hsl.match(/hsl\((\d+),(\d+)%,([.\d]+)%/)
  if (!m) return null
  return { h: +m[1], s: +m[2], l: +m[3] }
}

function sRGBtoLinear(c: number): number {
  return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4
}

function hslToLuminance(h: number, s: number, l: number): number {
  s /= 100
  l /= 100
  const c = (1 - Math.abs(2 * l - 1)) * s
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1))
  const m = l - c / 2
  let r = 0, g = 0, b = 0
  if (h < 60)       { r = c; g = x; b = 0 }
  else if (h < 120) { r = x; g = c; b = 0 }
  else if (h < 180) { r = 0; g = c; b = x }
  else if (h < 240) { r = 0; g = x; b = c }
  else if (h < 300) { r = x; g = 0; b = c }
  else              { r = c; g = 0; b = x }
  return 0.2126 * sRGBtoLinear(r + m) + 0.7152 * sRGBtoLinear(g + m) + 0.0722 * sRGBtoLinear(b + m)
}

function contrastRatio(l1: number, l2: number): number {
  const lighter = Math.max(l1, l2)
  const darker = Math.min(l1, l2)
  return (lighter + 0.05) / (darker + 0.05)
}

// Generate palette as raw HSL strings

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

  // Resolve mapped colors (stored as reference keys, not HSL)
  for (const key of Object.keys(palette)) {
    const val = palette[key as ThemeColor]
    if (val && !val.startsWith('hsl(')) {
      const resolved = palette[val as ThemeColor]
      if (resolved) palette[key as ThemeColor] = resolved
    }
  }

  // Static min/max
  if (!palette['min' as ThemeColor]) {
    palette['min' as ThemeColor] = mode === 'light' ? 'hsl(0,0%,100%)' : 'hsl(0,0%,0%)'
  }
  if (!palette['max' as ThemeColor]) {
    palette['max' as ThemeColor] = mode === 'light' ? 'hsl(0,0%,0%)' : 'hsl(0,0%,100%)'
  }

  return palette
}

// Color families to test (non-mapped that generate real palettes)
const COLOR_FAMILIES: ScaleColorName[] = [
  CoreColorName.primary,
  CoreColorName.secondary,
  CoreColorName.tertiary,
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

      const bgParsed = parseHSL(bgHSL)
      const fgParsed = parseHSL(fgHSL)
      if (!bgParsed || !fgParsed) continue

      const bgLum = hslToLuminance(bgParsed.h, bgParsed.s, bgParsed.l)
      const fgLum = hslToLuminance(fgParsed.h, fgParsed.s, fgParsed.l)
      const ratio = contrastRatio(bgLum, fgLum)

      // WCAG AA: 4.5:1 for normal text, 3:1 for large text/UI
      if (ratio < 3) {
        violations.push({ color, step, mode, ratio: Math.round(ratio * 100) / 100, required: 3, bg: bgHSL, fg: fgHSL })
      } else if (ratio < 4.5) {
        violations.push({ color, step, mode, ratio: Math.round(ratio * 100) / 100, required: 4.5, bg: bgHSL, fg: fgHSL })
      }
    }
  }
}

// Report

if (violations.length === 0) {
  console.log('✓ All color pairs meet WCAG AA contrast requirements')
  process.exit(0)
}

const critical = violations.filter(v => v.ratio < 3)
const warnings = violations.filter(v => v.ratio >= 3)

console.log(`\n✗ Found ${violations.length} contrast violation(s)\n`)

if (critical.length > 0) {
  console.log(`  FAIL (<3:1) — ${critical.length} pairs below minimum for large text/UI:`)
  console.log('  ┌─────────────┬──────┬───────┬───────┬──────────┐')
  console.log('  │ Color       │ Step │ Mode  │ Ratio │ Required │')
  console.log('  ├─────────────┼──────┼───────┼───────┼──────────┤')
  for (const v of critical) {
    console.log(
      `  │ ${v.color.padEnd(11)} │ ${String(v.step).padStart(4)} │ ${v.mode.padEnd(5)} │ ${v.ratio.toFixed(2).padStart(5)} │ ${v.required.toFixed(1).padStart(8)} │`,
    )
  }
  console.log('  └─────────────┴──────┴───────┴───────┴──────────┘')
  console.log()
}

if (warnings.length > 0) {
  console.log(`  WARN (3:1–4.5:1) — ${warnings.length} pairs below normal text requirement:`)
  console.log('  ┌─────────────┬──────┬───────┬───────┬──────────┐')
  console.log('  │ Color       │ Step │ Mode  │ Ratio │ Required │')
  console.log('  ├─────────────┼──────┼───────┼───────┼──────────┤')
  for (const v of warnings) {
    console.log(
      `  │ ${v.color.padEnd(11)} │ ${String(v.step).padStart(4)} │ ${v.mode.padEnd(5)} │ ${v.ratio.toFixed(2).padStart(5)} │ ${v.required.toFixed(1).padStart(8)} │`,
    )
  }
  console.log('  └─────────────┴──────┴───────┴───────┴──────────┘')
}

console.log()
// Report-only — don't fail CI
process.exit(0)
