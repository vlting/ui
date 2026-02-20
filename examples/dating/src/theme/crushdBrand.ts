import { createBrandConfig } from '@vlting/ui/brands'
import type { BrandDefinition } from '@vlting/ui/brands'

// Neutral palettes — warm mauve (pink-gray undertone, 12-step)
const lightNeutral: string[] = [
  '#faf8f9', '#f3eff1', '#e8e2e6', '#dbd3d8', '#c9bfc6', '#afa3ac',
  '#8f8390', '#706474', '#544959', '#3d3342', '#28202d', '#17111b',
]

const darkNeutral: string[] = [
  '#17111b', '#1f1825', '#28202d', '#332a39', '#3f3547', '#504659',
  '#665a6d', '#7e7285', '#9c90a3', '#bcb2c1', '#dad2de', '#f0ecf2',
]

// Accent palette — electric purple
const lightPurple: string[] = [
  '#f5f0ff', '#ede5ff', '#d8c8ff', '#c0a5ff', '#a67fff', '#8b5cf6',
  '#7c3aed', '#6d28d9', '#5b21b6', '#4c1d95', '#3b0f7a', '#2a0860',
]

const darkPurple: string[] = [
  '#2a0860', '#3b0f7a', '#4c1d95', '#5b21b6', '#6d28d9', '#7c3aed',
  '#8b5cf6', '#a67fff', '#c0a5ff', '#d8c8ff', '#ede5ff', '#f5f0ff',
]

export const crushdBrand: BrandDefinition = {
  name: 'crushd',

  palettes: {
    light: lightNeutral,
    dark: darkNeutral,
  },

  accentPalettes: {
    purple: {
      light: lightPurple,
      dark: darkPurple,
    },
  },

  tokens: {
    radius: {
      0: 0, 1: 6, 2: 8, 3: 12, 4: 16, 5: 20, 6: 24, 7: 28, 8: 32, 9: 40, 10: 48, 11: 56, 12: 9999,
      true: 12,
    },
  },

  outline: {
    width: 2,
    offset: 2,
  },

  shadows: {
    light: {
      sm: '0 1px 2px rgba(23, 17, 27, 0.06)',
      md: '0 4px 8px rgba(23, 17, 27, 0.08), 0 1px 3px rgba(23, 17, 27, 0.05)',
      lg: '0 8px 24px rgba(23, 17, 27, 0.10), 0 2px 8px rgba(23, 17, 27, 0.06)',
      xl: '0 16px 48px rgba(23, 17, 27, 0.14), 0 4px 16px rgba(23, 17, 27, 0.08)',
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
      spring: 'cubic-bezier(0.22, 1.6, 0.36, 1)',
    },
  },
}

export const crushdConfig = createBrandConfig(crushdBrand)
