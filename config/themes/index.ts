// ---------------------------------------------------------------------------
// Sample theme presets for playground / docs — NOT library exports.
// ---------------------------------------------------------------------------

import { createGradient, createTheme, type CreateThemeOptions } from '@vlting/stl'

/**
 * Popsicle — Playful, expressive.
 *
 * Pinkish-purple primary, complementary lime-green secondary.
 * Neutral: auto-dampened purple, high contrast. Background: tinted purple chrome.
 * Flat hard-edge shadows, generous rounding.
 */
export const THEME_PRESET_POPSICLE: CreateThemeOptions = {
  primary: { hue: 290, saturation: 65 },
  secondary: { saturation: 50 },
  neutral: { hue: 290, highContrast: true },
  background: { hue: 290, saturation: 25 },
  fontSize: { base: 18, h1: 50, h2: 34 },
  radius: { base: 8, button: 9999, field: 24 },
  borderWidth: { none: 0, thin: 0, medium: 0, thick: 0 },
  shadows: {
    light: {
      sm: { boxShadow: '0 1px 3px 0 hsla(290, 20%, 20%, 0.04)', color: 'hsla(290, 20%, 20%, 0.04)' },
      md: { boxShadow: '0 2px 5px 0 hsla(290, 20%, 20%, 0.06), 0 1px 3px -1px hsla(290, 20%, 20%, 0.06)', color: 'hsla(290, 20%, 20%, 0.06)' },
      lg: { boxShadow: '0 5px 10px -1px hsla(290, 20%, 20%, 0.08), 0 3px 6px -2px hsla(290, 20%, 20%, 0.06)', color: 'hsla(290, 20%, 20%, 0.08)' },
      xl: { boxShadow: '0 12px 22px -4px hsla(290, 20%, 20%, 0.08), 0 5px 10px -5px hsla(290, 20%, 20%, 0.06)', color: 'hsla(290, 20%, 20%, 0.08)' },
      '2xl': { boxShadow: '0 24px 38px -6px hsla(290, 20%, 20%, 0.10), 0 10px 16px -8px hsla(290, 20%, 20%, 0.08)', color: 'hsla(290, 20%, 20%, 0.10)' },
      buttonShadow: { boxShadow: '0 1px 3px 0 hsla(290, 20%, 20%, 0.05)', color: 'hsla(290, 20%, 20%, 0.05)' },
      buttonShadowHover: { boxShadow: '0 2px 5px 0 hsla(290, 20%, 20%, 0.08), 0 1px 3px -1px hsla(290, 20%, 20%, 0.06)', color: 'hsla(290, 20%, 20%, 0.08)' },
    },
    dark: {
      sm: { boxShadow: '0 1px 3px 0 hsla(290, 15%, 5%, 0.20)', color: 'hsla(290, 15%, 5%, 0.20)' },
      md: { boxShadow: '0 2px 5px 0 hsla(290, 15%, 5%, 0.30), 0 1px 3px -1px hsla(290, 15%, 5%, 0.25)', color: 'hsla(290, 15%, 5%, 0.30)' },
      lg: { boxShadow: '0 5px 10px -1px hsla(290, 15%, 5%, 0.30), 0 3px 6px -2px hsla(290, 15%, 5%, 0.25)', color: 'hsla(290, 15%, 5%, 0.30)' },
      xl: { boxShadow: '0 12px 22px -4px hsla(290, 15%, 5%, 0.35), 0 5px 10px -5px hsla(290, 15%, 5%, 0.30)', color: 'hsla(290, 15%, 5%, 0.35)' },
      '2xl': { boxShadow: '0 24px 38px -6px hsla(290, 15%, 5%, 0.40), 0 10px 16px -8px hsla(290, 15%, 5%, 0.35)', color: 'hsla(290, 15%, 5%, 0.40)' },
      buttonShadow: { boxShadow: '0 1px 3px 0 hsla(290, 15%, 5%, 0.15)', color: 'hsla(290, 15%, 5%, 0.15)' },
      buttonShadowHover: { boxShadow: '0 2px 5px 0 hsla(290, 15%, 5%, 0.25), 0 1px 3px -1px hsla(290, 15%, 5%, 0.20)', color: 'hsla(290, 15%, 5%, 0.25)' },
    },
  },
  fonts: { heading: 'playfairDisplay', subheading: 'raleway', body: 'raleway', code: 'firaCode' },
}

/**
 * Carbon — Clean, professional.
 *
 * Black primary, blue secondary.
 * Neutral: true achromatic. Background: true achromatic.
 * Slightly rounded, standard Tailwind-style shadows.
 */
export const THEME_PRESET_CARBON: CreateThemeOptions = {
  primary: { hue: 0, saturation: 0, isNeutral: true, highContrast: true },
  secondary: { hue: 215, saturation: 80 },
  neutral: { hue: 0, saturation: 0, isNeutral: true },
  background: { hue: 0, saturation: 0 },
  radius: { base: 8 },
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
  fonts: { heading: 'sourceSansPro', body: 'inter', code: 'firaCode' },
}

/**
 * Mint — Sophisticated, editorial.
 *
 * Teal primary, complementary secondary (auto).
 * Neutral: auto-dampened teal. Background: barely tinted teal.
 * Zero radius everywhere.
 */
export const THEME_PRESET_MINT: CreateThemeOptions = {
  primary: { hue: 159, saturation: 90 },
  secondary: { saturation: 50 },
  neutral: { hue: 159 },
  background: { hue: 159, saturation: 5 },
  fontSize: { base: 17, h1: 56, h2: 38, h3: 25, h4: 25, h5: 21, h6: 18 },
  radius: { base: 0, badge: 0 },
  borderWidth: { none: 0, thin: 0.5, medium: 1, thick: 1.5 },
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
  fonts: { heading: 'ebGaramond', subheading: 'firaSans', body: 'firaSans', code: 'inconsolata' },
}

/**
 * Aurora — Neon, vivid.
 *
 * Purply-fuchsia primary, raspberry secondary — dark neon vibe.
 * Gradient showcase: raspberry → purply-fuchsia (primary as second stop).
 * Near-black background, pill buttons. Defaults to dark mode.
 */
export const THEME_PRESET_AURORA: CreateThemeOptions = {
  primary: { hue: 295, saturation: 100 },
  secondary: { hue: 340, saturation: 100 },
  neutral: { hue: 295, highContrast: true },
  background: { hue: 310, saturation: 5 },
  radius: { base: 14, button: 9999 },
  gradients: {
    primary: createGradient(170, '$secondary9', '$primary8'),
  },
  glass: null,
  fonts: { heading: 'lora', body: 'inter', code: 'firaCode' },
}

/**
 * Frost — Dark, moody glass.
 *
 * Rose primary, slate-blue secondary — inspired by dark glass UIs.
 * Glass showcase: warm-tinted frosted panels on dark charcoal.
 * Blur capped at 12px for mobile GPU perf. Defaults to dark mode.
 */
export const THEME_PRESET_FROST: CreateThemeOptions = {
  primary: { hue: 350, saturation: 65, highContrast: true },
  secondary: { hue: 220, saturation: 45 },
  neutral: { hue: 350, highContrast: true },
  background: { hue: 350, saturation: 5 },
  radius: { base: 12 },
  glass: {
    blur: '12px',
    tint: 'hsla(350, 10%, 15%, 0.55)',
    border: '1px solid hsla(350, 20%, 40%, 0.2)',
    gradient: 'linear-gradient(180deg, hsla(0,0%,100%,0.08), hsla(0,0%,100%,0.02))',
  },
  fonts: { heading: 'rubik', body: 'inter', code: 'firaCode' },
}

// ---------------------------------------------------------------------------
// Pre-generated themes
// ---------------------------------------------------------------------------

export const popsicleTheme = createTheme(THEME_PRESET_POPSICLE)
export const mintTheme = createTheme(THEME_PRESET_MINT)
export const carbonTheme = createTheme(THEME_PRESET_CARBON)
export const auroraTheme = createTheme(THEME_PRESET_AURORA)
export const frostTheme = createTheme(THEME_PRESET_FROST)
