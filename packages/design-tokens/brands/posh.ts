import type { BrandDefinition } from './index'

/**
 * Posh brand — Sophisticated, editorial, premium.
 *
 * Pure black accent (#000000), balanced true-gray neutrals,
 * square corners (radius 0), very thin borders, soft diffused shadows.
 */
export const poshBrand: BrandDefinition = {
  name: 'posh',

  palettes: {
    // Balanced true-gray neutrals (no warm or cool tint) — 12 steps light
    light: [
      '#ffffff',
      '#f8f8f8',
      '#f1f1f1',
      '#eaeaea',
      '#e0e0e0',
      '#cccccc',
      '#aaaaaa',
      '#888888',
      '#666666',
      '#484848',
      '#2a2a2a',
      '#111111',
    ],
    // Balanced true-gray neutrals — 12 steps dark
    dark: [
      '#111111',
      '#1a1a1a',
      '#232323',
      '#2c2c2c',
      '#363636',
      '#484848',
      '#666666',
      '#888888',
      '#aaaaaa',
      '#cccccc',
      '#e6e6e6',
      '#f5f5f5',
    ],
  },

  accentPalettes: {
    blue: {
      // Pure black accent — monochrome scale
      light: [
        '#f5f5f5',
        '#e8e8e8',
        '#d4d4d4',
        '#b8b8b8',
        '#999999',
        '#777777',
        '#555555',
        '#3a3a3a',
        '#262626',
        '#171717',
        '#0a0a0a',
        '#000000',
      ],
      dark: [
        '#000000',
        '#0a0a0a',
        '#171717',
        '#262626',
        '#3a3a3a',
        '#555555',
        '#777777',
        '#999999',
        '#b8b8b8',
        '#d4d4d4',
        '#e8e8e8',
        '#f5f5f5',
      ],
    },
  },

  tokens: {
    // ~110-115% of default space values
    space: {
      0: 0,
      0.25: 2,
      0.5: 5,
      0.75: 9,
      1: 11,
      1.5: 14,
      2: 18,
      2.5: 21,
      3: 23,
      3.5: 28,
      4: 32,
      4.5: 37,
      5: 41,
      6: 46,
      7: 55,
      8: 64,
      9: 74,
      10: 92,
      11: 110,
      12: 138,
      true: 18,
    },
    // ~105-110% of default size values
    size: {
      0: 0,
      0.25: 2,
      0.5: 4,
      0.75: 9,
      1: 22,
      1.5: 26,
      2: 31,
      2.5: 35,
      3: 40,
      3.5: 44,
      4: 48,
      4.5: 53,
      5: 57,
      6: 70,
      7: 81,
      8: 92,
      9: 103,
      10: 114,
      11: 136,
      12: 163,
      13: 196,
      14: 235,
      15: 284,
      16: 341,
      true: 48,
    },
    // Radius 0 — straight/square corners everywhere
    radius: {
      0: 0,
      1: 0,
      2: 0,
      3: 0,
      4: 0,
      5: 0,
      6: 0,
      7: 0,
      8: 0,
      9: 0,
      10: 0,
      11: 0,
      12: 0,
      true: 0,
    },
    // Very thin borders (0.5-1px)
    borderWidth: {
      none: 0,
      thin: 0.5,
      medium: 1,
      thick: 1.5,
    },
  },

  outline: {
    width: 1,
    offset: 1,
  },

  // Deeper overlay — dramatic, premium feel
  overlay: {
    light: 'rgba(0,0,0,0.6)',
    dark: 'rgba(0,0,0,0.7)',
  },

  // Soft, diffused shadows (large blur, low opacity)
  shadows: {
    light: {
      sm: {
        boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
        color: 'rgba(0,0,0,0.03)',
        offset: { width: 0, height: 2 },
        radius: 8,
        opacity: 0.03,
      },
      md: {
        boxShadow: '0 4px 16px rgba(0,0,0,0.05)',
        color: 'rgba(0,0,0,0.05)',
        offset: { width: 0, height: 4 },
        radius: 16,
        opacity: 0.05,
      },
      lg: {
        boxShadow: '0 8px 32px rgba(0,0,0,0.07)',
        color: 'rgba(0,0,0,0.07)',
        offset: { width: 0, height: 8 },
        radius: 32,
        opacity: 0.07,
      },
      xl: {
        boxShadow: '0 16px 48px rgba(0,0,0,0.09)',
        color: 'rgba(0,0,0,0.09)',
        offset: { width: 0, height: 16 },
        radius: 48,
        opacity: 0.09,
      },
      '2xl': {
        boxShadow: '0 24px 64px rgba(0,0,0,0.12)',
        color: 'rgba(0,0,0,0.12)',
        offset: { width: 0, height: 24 },
        radius: 64,
        opacity: 0.12,
      },
    },
    dark: {
      sm: {
        boxShadow: '0 2px 8px rgba(0,0,0,0.10)',
        color: 'rgba(0,0,0,0.10)',
        offset: { width: 0, height: 2 },
        radius: 8,
        opacity: 0.1,
      },
      md: {
        boxShadow: '0 4px 16px rgba(0,0,0,0.15)',
        color: 'rgba(0,0,0,0.15)',
        offset: { width: 0, height: 4 },
        radius: 16,
        opacity: 0.15,
      },
      lg: {
        boxShadow: '0 8px 32px rgba(0,0,0,0.20)',
        color: 'rgba(0,0,0,0.20)',
        offset: { width: 0, height: 8 },
        radius: 32,
        opacity: 0.2,
      },
      xl: {
        boxShadow: '0 16px 48px rgba(0,0,0,0.25)',
        color: 'rgba(0,0,0,0.25)',
        offset: { width: 0, height: 16 },
        radius: 48,
        opacity: 0.25,
      },
      '2xl': {
        boxShadow: '0 24px 64px rgba(0,0,0,0.32)',
        color: 'rgba(0,0,0,0.32)',
        offset: { width: 0, height: 24 },
        radius: 64,
        opacity: 0.32,
      },
    },
  },

  fontConfig: {
    heading: {
      family: 'Cormorant Garamond',
      fallback: 'EB Garamond, Georgia, serif',
      weights: { heavy: 500, light: 300 },
    },
    body: {
      family: 'Karla',
      fallback: 'Source Sans 3, Inter, system-ui, sans-serif',
      weight: 300,
    },
    mono: {
      family: 'JetBrains Mono',
      fallback: 'ui-monospace, monospace',
      weight: 400,
    },
    quote: {
      family: 'Cormorant Garamond',
      fallback: 'Georgia, serif',
      weight: 300,
      style: 'italic',
    },
  },

  fonts: {
    heading: {
      family: "'Cormorant Garamond', 'Libre Baskerville', 'EB Garamond', Georgia, serif",
      weight: { 1: '300', 2: '400', 3: '400', 4: '500', 5: '500', 6: '500', true: '500' },
      letterSpacing: {
        1: 0.5,
        2: 0.3,
        3: 0.2,
        4: 0.1,
        5: 0,
        6: -0.1,
        7: -0.2,
        8: -0.3,
        true: 0,
      },
    },
    body: {
      family: "'Karla', 'Source Sans 3', Inter, system-ui, sans-serif",
      weight: { 1: '300', 2: '300', 3: '400', 4: '400', true: '300' },
    },
  },
}
