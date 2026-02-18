import { createAnimations as createCSSAnimations } from '@tamagui/animations-css'
import { createTokens } from '@tamagui/core'
import { shorthands } from '@tamagui/shorthands'
import { type CreateTamaguiProps, createFont } from 'tamagui'
import { media } from '../../config/media'
import { buildThemes } from '../themes/buildThemes'
import { color } from '../tokens/color'
import { radius } from '../tokens/radius'
import { size } from '../tokens/size'
import { space } from '../tokens/space'
import { zIndex } from '../tokens/zIndex'
import type { BrandDefinition } from './types'

const defaultHeadingFont = createFont({
  family: 'Inter',
  size: {
    1: 12,
    2: 14,
    3: 16,
    4: 18,
    5: 20,
    6: 24,
    7: 28,
    8: 32,
    9: 40,
    10: 48,
    11: 56,
    12: 64,
    true: 20,
  },
  weight: {
    1: '300',
    2: '400',
    3: '500',
    4: '600',
    5: '700',
    6: '800',
    true: '600',
  },
  lineHeight: {
    1: 18,
    2: 20,
    3: 24,
    4: 26,
    5: 28,
    6: 32,
    7: 36,
    8: 40,
    9: 52,
    10: 60,
    11: 68,
    12: 76,
    true: 28,
  },
  letterSpacing: {
    1: 0,
    2: 0,
    3: -0.2,
    4: -0.3,
    5: -0.4,
    6: -0.5,
    7: -0.6,
    8: -0.7,
    true: -0.4,
  },
})

const defaultBodyFont = createFont({
  family: 'Inter',
  size: {
    1: 11,
    2: 12,
    3: 13,
    4: 14,
    5: 16,
    6: 18,
    7: 20,
    8: 24,
    9: 28,
    10: 32,
    true: 14,
  },
  weight: {
    1: '300',
    2: '400',
    3: '500',
    4: '600',
    true: '400',
  },
  lineHeight: {
    1: 16,
    2: 18,
    3: 20,
    4: 22,
    5: 24,
    6: 28,
    7: 30,
    8: 34,
    9: 38,
    10: 42,
    true: 22,
  },
  letterSpacing: {
    1: 0,
    2: 0,
    3: 0,
    true: 0,
  },
})

const defaultMonoFont = createFont({
  family: 'ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, monospace',
  size: {
    1: 11,
    2: 12,
    3: 13,
    4: 14,
    5: 16,
    6: 18,
    true: 14,
  },
  weight: {
    1: '400',
    2: '500',
    true: '400',
  },
  lineHeight: {
    1: 18,
    2: 20,
    3: 22,
    4: 24,
    5: 26,
    6: 30,
    true: 24,
  },
  letterSpacing: {
    1: 0,
    true: 0,
  },
})

export function createBrandConfig(brand: BrandDefinition): CreateTamaguiProps {
  const mergedSize = brand.tokens?.size ? { ...size, ...brand.tokens.size } : size
  const mergedSpace = brand.tokens?.space ? { ...space, ...brand.tokens.space } : space
  const mergedRadius = brand.tokens?.radius
    ? { ...radius, ...brand.tokens.radius }
    : radius
  const mergedZIndex = brand.tokens?.zIndex
    ? { ...zIndex, ...brand.tokens.zIndex }
    : zIndex

  const mergedTokens = createTokens({
    size: mergedSize,
    space: mergedSpace,
    radius: mergedRadius,
    color,
    zIndex: mergedZIndex,
  })

  const headingFont = brand.fonts?.heading
    ? createFont({ ...defaultHeadingFont, ...brand.fonts.heading })
    : defaultHeadingFont
  const bodyFont = brand.fonts?.body
    ? createFont({ ...defaultBodyFont, ...brand.fonts.body })
    : defaultBodyFont
  const monoFont = brand.fonts?.mono
    ? createFont({ ...defaultMonoFont, ...brand.fonts.mono })
    : defaultMonoFont

  const palettes: Record<string, string[]> = {
    light: brand.palettes.light,
    dark: brand.palettes.dark,
  }
  if (brand.accentPalettes) {
    for (const [name, palette] of Object.entries(brand.accentPalettes)) {
      palettes[`light_${name}`] = palette.light
      palettes[`dark_${name}`] = palette.dark
    }
  }

  const themes = buildThemes(
    palettes,
    brand.shadows
      ? {
          light: brand.shadows.light as Record<string, string>,
          dark: brand.shadows.dark as Record<string, string>,
        }
      : undefined,
  )

  const animations = createCSSAnimations({
    fast: 'ease-in-out 150ms',
    medium: 'ease-in-out 250ms',
    slow: 'ease-in-out 450ms',
    bouncy: 'cubic-bezier(0.34, 1.56, 0.64, 1) 300ms',
    lazy: 'ease-in-out 600ms',
    tooltip: 'ease-in 100ms',
  })

  return {
    tokens: mergedTokens,
    themes,
    media: brand.media ?? media,
    shorthands,
    fonts: {
      heading: headingFont,
      body: bodyFont,
      mono: monoFont,
    },
    animations,
    settings: {
      allowedStyleValues: 'somewhat-strict-web',
      autocompleteSpecificTokens: 'except-special',
    },
  }
}
