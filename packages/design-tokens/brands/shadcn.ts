import type { BrandDefinition } from './index'

/**
 * shadcn brand — Pixel-perfect match for shadcn/ui's default "Neutral" theme.
 *
 * Pure neutral grays (zero chroma OKLCH), destructive red accent,
 * 10px base border-radius, 1px borders, subtle Tailwind-style shadows.
 *
 * OKLCH → hex conversions (0 chroma = pure gray):
 *   oklch(1 0 0)     = #ffffff
 *   oklch(0.985 0 0)  ≈ #fafafa
 *   oklch(0.97 0 0)   ≈ #f5f5f5
 *   oklch(0.922 0 0)  ≈ #e5e5e5
 *   oklch(0.708 0 0)  ≈ #b3b3b3
 *   oklch(0.556 0 0)  ≈ #737373
 *   oklch(0.269 0 0)  ≈ #262626
 *   oklch(0.205 0 0)  ≈ #171717
 *   oklch(0.145 0 0)  ≈ #0a0a0a
 *   oklch(0.577 0.245 27.325) ≈ #ef4444  (destructive red)
 */
export const shadcnBrand: BrandDefinition = {
  name: 'shadcn',

  palettes: {
    // Pure neutral grays — 12 steps, lightest to darkest
    // Mapped to shadcn's semantic tokens:
    //   0  → background (#ffffff)
    //   1  → card/popover surface (#ffffff)
    //   2  → secondary/muted/accent (#f5f5f5, oklch 0.97)
    //   3  → border/input (#e5e5e5, oklch 0.922)
    //   4  → ~#d4d4d4 (interpolated)
    //   5  → ~#c4c4c4 (interpolated)
    //   6  → ring (#b3b3b3, oklch 0.708)
    //   7  → muted-foreground (#737373, oklch 0.556)
    //   8  → ~#525252 (interpolated)
    //   9  → ~#404040 (interpolated)
    //  10  → primary / secondary-foreground (#171717, oklch 0.205)
    //  11  → foreground (#0a0a0a, oklch 0.145)
    light: [
      '#ffffff', // 0  — background
      '#ffffff', // 1  — card / popover
      '#f5f5f5', // 2  — secondary / muted / accent
      '#e5e5e5', // 3  — border / input
      '#d4d4d4', // 4  — (interpolated)
      '#c4c4c4', // 5  — (interpolated)
      '#b3b3b3', // 6  — ring
      '#737373', // 7  — muted-foreground
      '#525252', // 8  — (interpolated)
      '#404040', // 9  — (interpolated)
      '#171717', // 10 — primary
      '#0a0a0a', // 11 — foreground
    ],
    // Pure neutral grays — 12 steps, darkest to lightest (inverted for dark theme)
    // Mapped to shadcn's dark-mode semantic tokens:
    //   0  → background (#0a0a0a, oklch 0.145)
    //   1  → card surface (#171717, oklch 0.205)
    //   2  → secondary / muted (#262626, oklch 0.269)
    //   3  → border (#262626, oklch(1 0 0 / 10%) ≈ #ffffff1a, rendered on dark bg)
    //   4  → (interpolated)
    //   5  → ring in dark (#737373, oklch 0.556)
    //   6  → (interpolated)
    //   7  → muted-foreground (#b3b3b3, oklch 0.708)
    //   8  → (interpolated)
    //   9  → (interpolated)
    //  10  → primary (#e5e5e5, oklch 0.922)
    //  11  → foreground (#fafafa, oklch 0.985)
    dark: [
      '#0a0a0a', // 0  — background
      '#171717', // 1  — card
      '#262626', // 2  — secondary / muted
      '#2e2e2e', // 3  — border (darker than light border)
      '#3a3a3a', // 4  — (interpolated)
      '#737373', // 5  — ring (dark)
      '#8a8a8a', // 6  — (interpolated)
      '#b3b3b3', // 7  — muted-foreground (dark)
      '#c4c4c4', // 8  — (interpolated)
      '#d4d4d4', // 9  — (interpolated)
      '#e5e5e5', // 10 — primary (dark)
      '#fafafa', // 11 — foreground (dark)
    ],
  },

  accentPalettes: {
    // Destructive red — oklch(0.577 0.245 27.325) ≈ #ef4444
    red: {
      light: [
        '#fef2f2', // lightest red bg
        '#fee2e2',
        '#fecaca',
        '#fca5a5',
        '#f87171',
        '#ef4444', // destructive (mid-point)
        '#dc2626',
        '#b91c1c',
        '#991b1b',
        '#7f1d1d',
        '#581111',
        '#300a0a',
      ],
      dark: [
        '#300a0a',
        '#581111',
        '#7f1d1d',
        '#991b1b',
        '#b91c1c',
        '#dc2626',
        '#ef4444', // destructive (mid-point)
        '#f87171',
        '#fca5a5',
        '#fecaca',
        '#fee2e2',
        '#fef2f2',
      ],
    },
  },

  tokens: {
    // shadcn base --radius: 0.625rem (10px)
    // sm = calc(radius - 4px) = 6px, md = calc(radius - 2px) = 8px, lg = radius = 10px
    radius: {
      0: 0,
      1: 2,
      2: 4,
      3: 6, // sm
      4: 8, // md
      5: 10, // lg (base --radius)
      6: 12,
      7: 14,
      8: 16,
      9: 20,
      10: 24,
      11: 32,
      12: 9999, // full / pill
      true: 8,
    },
    // shadcn button heights: sm=32px (h-8), default=36px (h-9), lg=40px (h-10)
    // input height: 36px (h-9)
    size: {
      0: 0,
      0.25: 2,
      0.5: 4,
      0.75: 8,
      1: 20,
      1.5: 24,
      2: 28,
      2.5: 32, // button sm (h-8)
      3: 36, // button default / input (h-9)
      3.5: 40, // button lg (h-10)
      4: 44,
      4.5: 48,
      5: 52,
      6: 64,
      7: 74,
      8: 84,
      9: 94,
      10: 104,
      11: 124,
      12: 148,
      13: 178,
      14: 214,
      15: 258,
      16: 310,
      true: 36, // default component height
    },
    // shadcn padding: buttons px-4 (16px) py-2 (8px), inputs px-3 (12px) py-1 (4px)
    space: {
      0: 0,
      0.25: 1,
      0.5: 2,
      0.75: 4, // py-1
      1: 6,
      1.5: 8, // py-2
      2: 10,
      2.5: 12, // px-3
      3: 14,
      3.5: 16, // px-4
      4: 20,
      4.5: 24,
      5: 32,
      6: 40,
      7: 48,
      8: 56,
      9: 64,
      10: 80,
      11: 96,
      12: 120,
      true: 16,
    },
  },

  borders: {
    widths: { thin: 1 },
  },

  outline: {
    width: 2,
    offset: 2,
  },

  shadows: {
    light: {
      sm: {
        boxShadow: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
        color: 'rgba(0,0,0,0.05)',
        offset: { width: 0, height: 1 },
        radius: 2,
        opacity: 0.05,
      },
      md: {
        boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
        color: 'rgba(0,0,0,0.1)',
        offset: { width: 0, height: 1 },
        radius: 3,
        opacity: 0.1,
      },
      lg: {
        boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
        color: 'rgba(0,0,0,0.1)',
        offset: { width: 0, height: 4 },
        radius: 6,
        opacity: 0.1,
      },
      xl: {
        boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
        color: 'rgba(0,0,0,0.1)',
        offset: { width: 0, height: 10 },
        radius: 15,
        opacity: 0.1,
      },
      '2xl': {
        boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
        color: 'rgba(0,0,0,0.1)',
        offset: { width: 0, height: 20 },
        radius: 25,
        opacity: 0.1,
      },
    },
    dark: {
      sm: {
        boxShadow: '0 1px 2px 0 rgb(0 0 0 / 0.15)',
        color: 'rgba(0,0,0,0.15)',
        offset: { width: 0, height: 1 },
        radius: 2,
        opacity: 0.15,
      },
      md: {
        boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.25), 0 1px 2px -1px rgb(0 0 0 / 0.2)',
        color: 'rgba(0,0,0,0.25)',
        offset: { width: 0, height: 1 },
        radius: 3,
        opacity: 0.25,
      },
      lg: {
        boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.25), 0 2px 4px -2px rgb(0 0 0 / 0.2)',
        color: 'rgba(0,0,0,0.25)',
        offset: { width: 0, height: 4 },
        radius: 6,
        opacity: 0.25,
      },
      xl: {
        boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.3), 0 4px 6px -4px rgb(0 0 0 / 0.25)',
        color: 'rgba(0,0,0,0.3)',
        offset: { width: 0, height: 10 },
        radius: 15,
        opacity: 0.3,
      },
      '2xl': {
        boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.35), 0 8px 10px -6px rgb(0 0 0 / 0.3)',
        color: 'rgba(0,0,0,0.35)',
        offset: { width: 0, height: 20 },
        radius: 25,
        opacity: 0.35,
      },
    },
  },

  fonts: {
    heading: {
      family: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      weight: { 1: '400', 2: '500', 3: '600', 4: '600', 5: '700', 6: '700', true: '600' },
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
    },
    body: {
      family: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      weight: { 1: '400', 2: '400', 3: '500', 4: '600', true: '400' },
    },
  },

  typography: {
    heading: { transform: 'none' },
  },
}
