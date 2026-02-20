import { createBrandConfig } from '@vlting/ui/brands'
import type { BrandDefinition } from '@vlting/ui/brands'

// Neutral palettes — warm gray/taupe undertone (12-step)
const lightNeutral: string[] = [
  '#faf8f6', '#f3efec', '#e8e2dc', '#dbd3cb', '#cbc1b7', '#b5a99d',
  '#978a7d', '#7a6d60', '#5e5248', '#443a32', '#2c231d', '#18120d',
]

const darkNeutral: string[] = [
  '#18120d', '#221a14', '#2c231d', '#382e26', '#463b31', '#564a3e',
  '#6b5d50', '#877766', '#a69484', '#c4b5a6', '#e0d6cc', '#f5f1ed',
]

// Accent palette — warm coral (#FF6B6B range)
const lightCoral: string[] = [
  '#fff5f5', '#ffe8e8', '#ffd4d4', '#ffb8b8', '#ff9696', '#ff6b6b',
  '#f04e4e', '#d63a3a', '#b82a2a', '#961e1e', '#741616', '#4c0d0d',
]

const darkCoral: string[] = [
  '#4c0d0d', '#741616', '#961e1e', '#b82a2a', '#d63a3a', '#f04e4e',
  '#ff6b6b', '#ff9696', '#ffb8b8', '#ffd4d4', '#ffe8e8', '#fff5f5',
]

export const kinshipBrand: BrandDefinition = {
  name: 'kinship',

  palettes: {
    light: lightNeutral,
    dark: darkNeutral,
  },

  accentPalettes: {
    coral: {
      light: lightCoral,
      dark: darkCoral,
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
      sm: '0 1px 3px rgba(24, 18, 13, 0.06)',
      md: '0 4px 8px rgba(24, 18, 13, 0.08), 0 1px 3px rgba(24, 18, 13, 0.05)',
      lg: '0 8px 24px rgba(24, 18, 13, 0.10), 0 2px 8px rgba(24, 18, 13, 0.06)',
      xl: '0 16px 48px rgba(24, 18, 13, 0.14), 0 4px 16px rgba(24, 18, 13, 0.08)',
    },
    dark: {
      sm: '0 1px 3px rgba(0, 0, 0, 0.30)',
      md: '0 4px 8px rgba(0, 0, 0, 0.40), 0 1px 3px rgba(0, 0, 0, 0.24)',
      lg: '0 8px 24px rgba(0, 0, 0, 0.50), 0 2px 8px rgba(0, 0, 0, 0.30)',
      xl: '0 16px 48px rgba(0, 0, 0, 0.60), 0 4px 16px rgba(0, 0, 0, 0.40)',
    },
  },

  animations: {
    driver: 'css',
    durations: {
      instant: 80,
      fast: 140,
      medium: 240,
      slow: 400,
    },
    easings: {
      standard: 'cubic-bezier(0.4, 0, 0.2, 1)',
      enter: 'cubic-bezier(0, 0, 0.2, 1)',
      exit: 'cubic-bezier(0.4, 0, 1, 1)',
      spring: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
    },
  },
}

export const kinshipConfig = createBrandConfig(kinshipBrand)
