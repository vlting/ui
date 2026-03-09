import type { Brand } from './types'

/**
 * Default brand — Clean, trustworthy, minimalist.
 *
 * YInMn Blue accent (#2B5B9C range), cool-tinted neutrals,
 * subtle rounding, standard borders and shadows.
 */
export const defaultBrand: Brand = {
  name: 'default',

  palettes: {
    // Cool (blue-tinted) neutrals — 12 steps light
    light: [
      '#ffffff',
      '#f8f9fb',
      '#f0f2f5',
      '#e8ebf0',
      '#dfe3e9',
      '#cdd3dc',
      '#a8b1bf',
      '#838d9e',
      '#636e80',
      '#465264',
      '#2c3544',
      '#151b24',
    ],
    // Cool neutrals — 12 steps dark
    dark: [
      '#131720',
      '#1a1f2a',
      '#212733',
      '#282f3d',
      '#323a49',
      '#434d5e',
      '#5f6b7e',
      '#7f8a9c',
      '#a0a9b8',
      '#c0c6d0',
      '#dfe2e8',
      '#f2f3f6',
    ],
  },

  accentPalettes: {
    blue: {
      // YInMn Blue range — rich, slightly muted blue
      light: [
        '#f0f4fa',
        '#dce6f4',
        '#b8cde8',
        '#8fb1da',
        '#6895cc',
        '#4a7cbe',
        '#2b5b9c',
        '#234b82',
        '#1c3c69',
        '#152e52',
        '#0f203b',
        '#081425',
      ],
      dark: [
        '#081425',
        '#0f203b',
        '#152e52',
        '#1c3c69',
        '#234b82',
        '#2b5b9c',
        '#4a7cbe',
        '#6895cc',
        '#8fb1da',
        '#b8cde8',
        '#dce6f4',
        '#f0f4fa',
      ],
    },
  },

  fonts: {
    heading: 'Inter, system-ui, -apple-system, sans-serif',
    body: 'Inter, system-ui, -apple-system, sans-serif',
    mono: 'JetBrains Mono, ui-monospace, SFMono-Regular, monospace',
  },
}
