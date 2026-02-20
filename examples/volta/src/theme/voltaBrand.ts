import { createBrandConfig } from '@vlting/ui/brands'
import type { BrandDefinition } from '@vlting/ui/brands'

// ---------------------------------------------------------------------------
// Neutral palette — cool-toned slate (blue-gray undertone)
// ---------------------------------------------------------------------------

const lightNeutral: string[] = [
  '#f7f8fb', // 1  — near-white with subtle blue tint
  '#eef0f6', // 2  — very light slate
  '#e2e6ee', // 3  — light slate
  '#d2d8e6', // 4  — medium-light slate
  '#bcc5d8', // 5  — medium slate
  '#9da9c0', // 6  — medium-strong slate
  '#7a88a4', // 7  — slate
  '#5b6a88', // 8  — dark slate
  '#404f6c', // 9  — darker slate
  '#2d3a55', // 10 — very dark slate
  '#1b2840', // 11 — near-black slate
  '#0d1628', // 12 — darkest slate (near-black)
]

const darkNeutral: string[] = [
  '#0d1628', // 1  — near-black
  '#131e36', // 2  — very dark slate
  '#1b2840', // 3  — dark slate
  '#243250', // 4  — dark slate
  '#2e3e62', // 5  — medium-dark slate
  '#3c4e74', // 6  — medium slate
  '#506086', // 7  — medium-light slate
  '#647598', // 8  — lighter slate
  '#8092b0', // 9  — light slate
  '#a0b2ca', // 10 — very light slate
  '#c0d0e4', // 11 — near-white slate
  '#e4ecf6', // 12 — near-white (text on dark)
]

// ---------------------------------------------------------------------------
// Primary accent — cobalt blue
// ---------------------------------------------------------------------------

const lightCobalt: string[] = [
  '#f0f4ff', // 1  — near-white with blue tint
  '#e0eaff', // 2  — very light cobalt
  '#c2d4ff', // 3  — light cobalt
  '#99b8ff', // 4  — medium-light cobalt
  '#6c97ff', // 5  — medium cobalt
  '#4272f5', // 6  — medium-strong cobalt
  '#2554e8', // 7  — cobalt (primary action — main brand color)
  '#1842cc', // 8  — deep cobalt
  '#1134b0', // 9  — deeper cobalt
  '#0c2894', // 10 — very deep cobalt
  '#071c78', // 11 — darkest cobalt
  '#040e50', // 12 — near-black cobalt
]

const darkCobalt: string[] = [
  '#040e50', // 1
  '#071c78', // 2
  '#0c2894', // 3
  '#1134b0', // 4
  '#1842cc', // 5
  '#2554e8', // 6
  '#4272f5', // 7  — cobalt (primary action in dark mode)
  '#6c97ff', // 8
  '#99b8ff', // 9
  '#c2d4ff', // 10
  '#e0eaff', // 11
  '#f0f4ff', // 12
]

// ---------------------------------------------------------------------------
// Brand definition
// ---------------------------------------------------------------------------

export const voltaBrand: BrandDefinition = {
  name: 'volta',

  palettes: {
    light: lightNeutral,
    dark: darkNeutral,
  },

  accentPalettes: {
    cobalt: {
      light: lightCobalt,
      dark: darkCobalt,
    },
  },

  tokens: {
    radius: {
      0: 0,
      1: 4,
      2: 6,
      3: 8,
      4: 12,
      5: 16,
      6: 20,
      7: 24,
      8: 28,
      9: 32,
      10: 40,
      11: 48,
      12: 9999,
      true: 8,
    },
  },

  outline: {
    width: 2,
    offset: 2,
  },

  shadows: {
    light: {
      sm: '0 1px 2px rgba(13, 22, 40, 0.06)',
      md: '0 4px 8px rgba(13, 22, 40, 0.08), 0 1px 3px rgba(13, 22, 40, 0.05)',
      lg: '0 8px 24px rgba(13, 22, 40, 0.10), 0 2px 8px rgba(13, 22, 40, 0.06)',
      xl: '0 16px 48px rgba(13, 22, 40, 0.14), 0 4px 16px rgba(13, 22, 40, 0.08)',
    },
    dark: {
      sm: '0 1px 2px rgba(0, 0, 0, 0.30)',
      md: '0 4px 8px rgba(0, 0, 0, 0.40), 0 1px 3px rgba(0, 0, 0, 0.24)',
      lg: '0 8px 24px rgba(0, 0, 0, 0.50), 0 2px 8px rgba(0, 0, 0, 0.30)',
      xl: '0 16px 48px rgba(0, 0, 0, 0.60), 0 4px 16px rgba(0, 0, 0, 0.40)',
    },
  },

  animations: {
    driver: 'css',
    durations: {
      instant: 80,
      fast: 120,
      medium: 200,
      slow: 350,
    },
    easings: {
      standard: 'cubic-bezier(0.4, 0, 0.2, 1)',
      enter: 'cubic-bezier(0, 0, 0.2, 1)',
      exit: 'cubic-bezier(0.4, 0, 1, 1)',
      spring: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
    },
  },
}

export const voltaConfig = createBrandConfig(voltaBrand)
