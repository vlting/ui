import type { BrandDefinition } from './index'

/**
 * Example "Neon" brand — demonstrates a second brand with a completely
 * different visual appearance while using the same component library.
 *
 * Key differences from default:
 * - Vibrant cyan/magenta palettes instead of neutral gray
 * - Larger border radius for a softer look
 * - Uppercase heading transforms
 * - Snappier animations
 */
export const neonBrand: BrandDefinition = {
  name: 'neon',

  palettes: {
    light: [
      '#f0fdfa', '#ccfbf1', '#99f6e4', '#5eead4', '#2dd4bf', '#14b8a6',
      '#0d9488', '#0f766e', '#115e59', '#134e4a', '#0c3c38', '#062726',
    ],
    dark: [
      '#062726', '#0c3c38', '#134e4a', '#115e59', '#0f766e', '#0d9488',
      '#14b8a6', '#2dd4bf', '#5eead4', '#99f6e4', '#ccfbf1', '#f0fdfa',
    ],
  },

  accentPalettes: {
    blue: {
      light: [
        '#f0f9ff', '#e0f2fe', '#bae6fd', '#7dd3fc', '#38bdf8', '#0ea5e9',
        '#0284c7', '#0369a1', '#075985', '#0c4a6e', '#083551', '#042034',
      ],
      dark: [
        '#042034', '#083551', '#0c4a6e', '#075985', '#0369a1', '#0284c7',
        '#0ea5e9', '#38bdf8', '#7dd3fc', '#bae6fd', '#e0f2fe', '#f0f9ff',
      ],
    },
    red: {
      light: [
        '#fdf2f8', '#fce7f3', '#fbcfe8', '#f9a8d4', '#f472b6', '#ec4899',
        '#db2777', '#be185d', '#9d174d', '#831843', '#5c1033', '#380820',
      ],
      dark: [
        '#380820', '#5c1033', '#831843', '#9d174d', '#be185d', '#db2777',
        '#ec4899', '#f472b6', '#f9a8d4', '#fbcfe8', '#fce7f3', '#fdf2f8',
      ],
    },
  },

  tokens: {
    radius: {
      0: 0,
      1: 4,
      2: 8,
      3: 12,
      4: 16,
      5: 20,
      6: 24,
      7: 28,
      8: 32,
      9: 36,
      10: 40,
      11: 44,
      12: 50,
      true: 16,
    },
  },

  typography: {
    heading: {
      transform: 'uppercase',
    },
  },

  fonts: {
    heading: {
      family: 'system-ui, -apple-system, sans-serif',
    },
  },

  animations: {
    durations: {
      instant: 80,
      fast: 120,
      medium: 200,
      slow: 320,
    },
  },
}
