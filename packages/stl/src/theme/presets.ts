import type { GenerateThemeOptions } from './generate-theme'

/**
 * Default — Clean neutral grays + cyan-blue primary + muted purple secondary.
 *
 * Neutral: hue 290, saturation 0 (true achromatic gray)
 * Primary accent: hue 200, saturation 85 (rich cyan-blue)
 * Secondary accent: hue 290, saturation 50 (muted purple)
 */
export const THEME_PRESET_DEFAULT: GenerateThemeOptions = {
  primary: { hue: 290, saturation: 0 },
  secondary: { hue: 200, saturation: 85 },
  tertiary: { hue: 290, saturation: 50 },
  fonts: {
    heading: 'Inter, system-ui, -apple-system, sans-serif',
    body: 'Inter, system-ui, -apple-system, sans-serif',
    mono: 'JetBrains Mono, ui-monospace, SFMono-Regular, monospace',
  },
}

/**
 * Flat — Playful, expressive, dark-first.
 *
 * Purple-tinted neutrals, pinkish-purple accent, generous rounding,
 * no borders, flat/no shadows.
 */
export const THEME_PRESET_FLAT: GenerateThemeOptions = {
  primary: { hue: 300, saturation: 15 },
  secondary: { hue: 280, saturation: 85 },
  tertiary: { hue: 300, saturation: 30 },
  tokens: {
    space: {
      0: 0, 0.25: 2, 0.5: 5, 0.75: 10, 1: 12, 1.5: 14, 2: 19, 2.5: 22,
      3: 24, 3.5: 29, 4: 34, 4.5: 38, 5: 43, 6: 48, 7: 56, 8: 65,
      9: 74, 10: 92, 11: 110, 12: 138, true: 19,
    },
    size: {
      0: 0, 0.25: 2, 0.5: 4, 0.75: 7, 1: 18, 1.5: 22, 2: 25, 2.5: 29,
      3: 33, 3.5: 36, 4: 40, 4.5: 43, 5: 47, 6: 58, 7: 67, 8: 76,
      9: 85, 10: 94, 11: 112, 12: 133, 13: 160, 14: 193, 15: 232, 16: 279,
      true: 40,
    },
    radius: {
      0: 0, 1: 6, 2: 8, 3: 10, 4: 12, 5: 14, 6: 16, 7: 20, 8: 24,
      9: 28, 10: 36, 11: 44, 12: 50, true: 14,
    },
    borderWidth: { none: 0, thin: 0, medium: 0, thick: 0 },
  },
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
    heading: "'DM Serif Display', 'Playfair Display', 'Lora', Georgia, serif",
    body: "'DM Sans', 'Nunito Sans', Inter, system-ui, sans-serif",
    mono: 'Fira Code, ui-monospace, monospace',
  },
  overrides: {
    palettes: {
      light: [
        '#fdfcfe', '#f8f6fb', '#f2eff7', '#ebe7f2', '#e3deed', '#d3cce0',
        '#b3aac6', '#9489aa', '#766a90', '#5a4f74', '#3c3456', '#1f1a38',
      ],
      dark: [
        '#1a1730', '#22203a', '#2b2844', '#34304e', '#3e3a5a', '#524d6e',
        '#6d6788', '#8c86a2', '#aba6bc', '#cac6d6', '#e5e2ed', '#f6f5f9',
      ],
    },
    accentPalettes: {
      blue: {
        light: [
          '#faf5ff', '#f3e8ff', '#e9d5ff', '#d8b4fe', '#c084fc', '#a855f7',
          '#9333ea', '#7e22ce', '#6b21a8', '#581c87', '#3b1064', '#200840',
        ],
        dark: [
          '#200840', '#3b1064', '#581c87', '#6b21a8', '#7e22ce', '#9333ea',
          '#a855f7', '#c084fc', '#d8b4fe', '#e9d5ff', '#f3e8ff', '#faf5ff',
        ],
      },
    },
  },
}

/**
 * Sharp — Sophisticated, editorial, premium.
 *
 * Pure black accent, true-gray neutrals, square corners,
 * very thin borders, soft diffused shadows.
 */
export const THEME_PRESET_SHARP: GenerateThemeOptions = {
  primary: { hue: 0, saturation: 0 },
  secondary: { hue: 0, saturation: 0, isNeutral: true },
  tertiary: { hue: 0, saturation: 0, isNeutral: true },
  tokens: {
    space: {
      0: 0, 0.25: 2, 0.5: 5, 0.75: 9, 1: 11, 1.5: 14, 2: 18, 2.5: 21,
      3: 23, 3.5: 28, 4: 32, 4.5: 37, 5: 41, 6: 46, 7: 55, 8: 64,
      9: 74, 10: 92, 11: 110, 12: 138, true: 18,
    },
    size: {
      0: 0, 0.25: 2, 0.5: 4, 0.75: 9, 1: 22, 1.5: 26, 2: 31, 2.5: 35,
      3: 40, 3.5: 44, 4: 48, 4.5: 53, 5: 57, 6: 70, 7: 81, 8: 92,
      9: 103, 10: 114, 11: 136, 12: 163, 13: 196, 14: 235, 15: 284, 16: 341,
      true: 48,
    },
    radius: {
      0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0,
      9: 0, 10: 0, 11: 0, 12: 0, true: 0,
    },
    borderWidth: { none: 0, thin: 0.5, medium: 1, thick: 1.5 },
  },
  shadows: {
    light: {
      sm: { boxShadow: '0 2px 8px rgba(0,0,0,0.03)', color: 'rgba(0,0,0,0.03)', offset: { width: 0, height: 2 }, radius: 8, opacity: 0.03 },
      md: { boxShadow: '0 4px 16px rgba(0,0,0,0.05)', color: 'rgba(0,0,0,0.05)', offset: { width: 0, height: 4 }, radius: 16, opacity: 0.05 },
      lg: { boxShadow: '0 8px 32px rgba(0,0,0,0.07)', color: 'rgba(0,0,0,0.07)', offset: { width: 0, height: 8 }, radius: 32, opacity: 0.07 },
      xl: { boxShadow: '0 16px 48px rgba(0,0,0,0.09)', color: 'rgba(0,0,0,0.09)', offset: { width: 0, height: 16 }, radius: 48, opacity: 0.09 },
      '2xl': { boxShadow: '0 24px 64px rgba(0,0,0,0.12)', color: 'rgba(0,0,0,0.12)', offset: { width: 0, height: 24 }, radius: 64, opacity: 0.12 },
    },
    dark: {
      sm: { boxShadow: '0 2px 8px rgba(0,0,0,0.10)', color: 'rgba(0,0,0,0.10)', offset: { width: 0, height: 2 }, radius: 8, opacity: 0.1 },
      md: { boxShadow: '0 4px 16px rgba(0,0,0,0.15)', color: 'rgba(0,0,0,0.15)', offset: { width: 0, height: 4 }, radius: 16, opacity: 0.15 },
      lg: { boxShadow: '0 8px 32px rgba(0,0,0,0.20)', color: 'rgba(0,0,0,0.20)', offset: { width: 0, height: 8 }, radius: 32, opacity: 0.2 },
      xl: { boxShadow: '0 16px 48px rgba(0,0,0,0.25)', color: 'rgba(0,0,0,0.25)', offset: { width: 0, height: 16 }, radius: 48, opacity: 0.25 },
      '2xl': { boxShadow: '0 24px 64px rgba(0,0,0,0.32)', color: 'rgba(0,0,0,0.32)', offset: { width: 0, height: 24 }, radius: 64, opacity: 0.32 },
    },
  },
  fonts: {
    heading: "'Cormorant Garamond', 'Libre Baskerville', 'EB Garamond', Georgia, serif",
    body: "'Karla', 'Source Sans 3', Inter, system-ui, sans-serif",
    mono: 'JetBrains Mono, ui-monospace, monospace',
  },
  overrides: {
    palettes: {
      light: [
        '#ffffff', '#f8f8f8', '#f1f1f1', '#eaeaea', '#e0e0e0', '#cccccc',
        '#aaaaaa', '#888888', '#666666', '#484848', '#2a2a2a', '#111111',
      ],
      dark: [
        '#111111', '#1a1a1a', '#232323', '#2c2c2c', '#363636', '#484848',
        '#666666', '#888888', '#aaaaaa', '#cccccc', '#e6e6e6', '#f5f5f5',
      ],
    },
    accentPalettes: {
      blue: {
        light: [
          '#f5f5f5', '#e8e8e8', '#d4d4d4', '#b8b8b8', '#999999', '#777777',
          '#555555', '#3a3a3a', '#262626', '#171717', '#0a0a0a', '#000000',
        ],
        dark: [
          '#000000', '#0a0a0a', '#171717', '#262626', '#3a3a3a', '#555555',
          '#777777', '#999999', '#b8b8b8', '#d4d4d4', '#e8e8e8', '#f5f5f5',
        ],
      },
    },
  },
}

/**
 * Pro — Pixel-perfect match for shadcn/ui's default "Neutral" theme.
 *
 * Pure neutral grays, destructive red accent, 10px base radius,
 * 1px borders, subtle Tailwind-style shadows.
 */
export const THEME_PRESET_PRO: GenerateThemeOptions = {
  primary: { hue: 0, saturation: 0 },
  secondary: { hue: 0, saturation: 85 },
  tertiary: { hue: 0, saturation: 0, isNeutral: true },
  tokens: {
    radius: {
      0: 0, 1: 2, 2: 4, 3: 6, 4: 8, 5: 10, 6: 12, 7: 14, 8: 16,
      9: 20, 10: 24, 11: 32, 12: 9999, true: 8,
    },
    size: {
      0: 0, 0.25: 2, 0.5: 4, 0.75: 8, 1: 20, 1.5: 24, 2: 28, 2.5: 32,
      3: 36, 3.5: 40, 4: 44, 4.5: 48, 5: 52, 6: 64, 7: 74, 8: 84,
      9: 94, 10: 104, 11: 124, 12: 148, 13: 178, 14: 214, 15: 258, 16: 310,
      true: 36,
    },
    space: {
      0: 0, 0.25: 1, 0.5: 2, 0.75: 4, 1: 6, 1.5: 8, 2: 10, 2.5: 12,
      3: 14, 3.5: 16, 4: 20, 4.5: 24, 5: 32, 6: 40, 7: 48, 8: 56,
      9: 64, 10: 80, 11: 96, 12: 120, true: 16,
    },
  },
  shadows: {
    light: {
      sm: { boxShadow: '0 1px 2px 0 rgb(0 0 0 / 0.05)', color: 'rgba(0,0,0,0.05)', offset: { width: 0, height: 1 }, radius: 2, opacity: 0.05 },
      md: { boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)', color: 'rgba(0,0,0,0.1)', offset: { width: 0, height: 1 }, radius: 3, opacity: 0.1 },
      lg: { boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)', color: 'rgba(0,0,0,0.1)', offset: { width: 0, height: 4 }, radius: 6, opacity: 0.1 },
      xl: { boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)', color: 'rgba(0,0,0,0.1)', offset: { width: 0, height: 10 }, radius: 15, opacity: 0.1 },
      '2xl': { boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)', color: 'rgba(0,0,0,0.1)', offset: { width: 0, height: 20 }, radius: 25, opacity: 0.1 },
    },
    dark: {
      sm: { boxShadow: '0 1px 2px 0 rgb(0 0 0 / 0.15)', color: 'rgba(0,0,0,0.15)', offset: { width: 0, height: 1 }, radius: 2, opacity: 0.15 },
      md: { boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.25), 0 1px 2px -1px rgb(0 0 0 / 0.2)', color: 'rgba(0,0,0,0.25)', offset: { width: 0, height: 1 }, radius: 3, opacity: 0.25 },
      lg: { boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.25), 0 2px 4px -2px rgb(0 0 0 / 0.2)', color: 'rgba(0,0,0,0.25)', offset: { width: 0, height: 4 }, radius: 6, opacity: 0.25 },
      xl: { boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.3), 0 4px 6px -4px rgb(0 0 0 / 0.25)', color: 'rgba(0,0,0,0.3)', offset: { width: 0, height: 10 }, radius: 15, opacity: 0.3 },
      '2xl': { boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.35), 0 8px 10px -6px rgb(0 0 0 / 0.3)', color: 'rgba(0,0,0,0.35)', offset: { width: 0, height: 20 }, radius: 25, opacity: 0.35 },
    },
  },
  fonts: {
    heading: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    body: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    mono: 'JetBrains Mono, ui-monospace, SFMono-Regular, monospace',
  },
  overrides: {
    palettes: {
      light: [
        '#ffffff', '#ffffff', '#f5f5f5', '#e5e5e5', '#d4d4d4', '#c4c4c4',
        '#b3b3b3', '#737373', '#525252', '#404040', '#171717', '#0a0a0a',
      ],
      dark: [
        '#0a0a0a', '#171717', '#262626', '#2e2e2e', '#3a3a3a', '#737373',
        '#8a8a8a', '#b3b3b3', '#c4c4c4', '#d4d4d4', '#e5e5e5', '#fafafa',
      ],
    },
    accentPalettes: {
      red: {
        light: [
          '#fef2f2', '#fee2e2', '#fecaca', '#fca5a5', '#f87171', '#ef4444',
          '#dc2626', '#b91c1c', '#991b1b', '#7f1d1d', '#581111', '#300a0a',
        ],
        dark: [
          '#300a0a', '#581111', '#7f1d1d', '#991b1b', '#b91c1c', '#dc2626',
          '#ef4444', '#f87171', '#fca5a5', '#fecaca', '#fee2e2', '#fef2f2',
        ],
      },
    },
  },
}
