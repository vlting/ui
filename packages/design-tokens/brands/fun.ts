import type { BrandDefinition } from './index'

/**
 * Fun brand — Playful, expressive, dark-first.
 *
 * Pinkish-purple accent (#A855F7 range), purple-tinted neutrals,
 * generous rounding, no borders, flat/no shadows.
 */
export const funBrand: BrandDefinition = {
  name: 'fun',

  palettes: {
    // Purple-tinted neutrals — 12 steps light (faint purple undertone, ~300° hue)
    light: [
      '#fdfcfe',
      '#f8f6fb',
      '#f2eff7',
      '#ebe7f2',
      '#e3deed',
      '#d3cce0',
      '#b3aac6',
      '#9489aa',
      '#766a90',
      '#5a4f74',
      '#3c3456',
      '#1f1a38',
    ],
    // Purple-tinted neutrals — 12 steps dark
    dark: [
      '#1a1730',
      '#22203a',
      '#2b2844',
      '#34304e',
      '#3e3a5a',
      '#524d6e',
      '#6d6788',
      '#8c86a2',
      '#aba6bc',
      '#cac6d6',
      '#e5e2ed',
      '#f6f5f9',
    ],
  },

  accentPalettes: {
    blue: {
      // Pinkish-purple accent
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
  },

  tokens: {
    // ~110-120% of default space values
    space: {
      0: 0,
      0.25: 2,
      0.5: 5,
      0.75: 10,
      1: 12,
      1.5: 14,
      2: 19,
      2.5: 22,
      3: 24,
      3.5: 29,
      4: 34,
      4.5: 38,
      5: 43,
      6: 48,
      7: 56,
      8: 65,
      9: 74,
      10: 92,
      11: 110,
      12: 138,
      true: 19,
    },
    // ~90-95% of default size values
    size: {
      0: 0,
      0.25: 2,
      0.5: 4,
      0.75: 7,
      1: 18,
      1.5: 22,
      2: 25,
      2.5: 29,
      3: 33,
      3.5: 36,
      4: 40,
      4.5: 43,
      5: 47,
      6: 58,
      7: 67,
      8: 76,
      9: 85,
      10: 94,
      11: 112,
      12: 133,
      13: 160,
      14: 193,
      15: 232,
      16: 279,
      true: 40,
    },
    // Generous rounding (12-16px default)
    radius: {
      0: 0,
      1: 6,
      2: 8,
      3: 10,
      4: 12,
      5: 14,
      6: 16,
      7: 20,
      8: 24,
      9: 28,
      10: 36,
      11: 44,
      12: 50,
      true: 14,
    },
    // Completely flat, borderless design
    borderWidth: {
      none: 0,
      thin: 0,
      medium: 0,
      thick: 0,
    },
  },

  outline: {
    width: 3,
    offset: 3,
  },

  // Flat / no shadows
  shadows: {
    light: {
      sm: { boxShadow: '0 0 0 transparent', color: 'transparent' },
      md: { boxShadow: '0 0 0 transparent', color: 'transparent' },
      lg: { boxShadow: '0 0 0 transparent', color: 'transparent' },
      xl: { boxShadow: '0 0 0 transparent', color: 'transparent' },
      '2xl': { boxShadow: '0 0 0 transparent', color: 'transparent' },
    },
    dark: {
      sm: { boxShadow: '0 0 0 transparent', color: 'transparent' },
      md: { boxShadow: '0 0 0 transparent', color: 'transparent' },
      lg: { boxShadow: '0 0 0 transparent', color: 'transparent' },
      xl: { boxShadow: '0 0 0 transparent', color: 'transparent' },
      '2xl': { boxShadow: '0 0 0 transparent', color: 'transparent' },
    },
  },

  fonts: {
    heading: {
      family: "'DM Serif Display', 'Playfair Display', 'Lora', Georgia, serif",
      weight: { 1: '400', 2: '400', 3: '400', 4: '400', 5: '400', 6: '400', true: '400' },
    },
    body: {
      family: "'DM Sans', 'Nunito Sans', Inter, system-ui, sans-serif",
    },
  },
}
