import type { CreateTamaguiProps, GenericFont } from 'tamagui'
import type { ShadowScale } from '../themes/shadows'

// ---------------------------------------------------------------------------
// Border
// ---------------------------------------------------------------------------

/** Named border width tokens. Referenced in components as `$borderWidth.thin` etc. */
export interface BorderConfig {
  widths?: {
    /** No border. Default: 0 */
    none?: number
    /** Hairline border. Default: 1 */
    thin?: number
    /** Standard border. Default: 2 */
    medium?: number
    /** Emphatic border. Default: 3 */
    thick?: number
  }
}

// ---------------------------------------------------------------------------
// Outline
// ---------------------------------------------------------------------------

/** Focus-ring configuration. Stored as `$outline.width` / `$outline.offset` tokens. */
export interface OutlineConfig {
  /** Focus ring width in px. Default: 2 */
  width?: number
  /** Focus ring offset in px. Default: 2 */
  offset?: number
}

// ---------------------------------------------------------------------------
// Animation
// ---------------------------------------------------------------------------

export interface AnimationConfig {
  /** Animation driver. Default: 'css' */
  driver?: 'css' | 'reanimated'
  durations?: {
    /** Tooltips, hover reveals. Default: 100 ms */
    instant?: number
    /** Button presses, toggles. Default: 150 ms */
    fast?: number
    /** Modals, drawers, expanding panels. Default: 250 ms */
    medium?: number
    /** Page transitions, large reveals. Default: 400 ms */
    slow?: number
  }
  easings?: {
    /** Default transition curve. Default: 'ease-in-out' */
    standard?: string
    /** Elements entering the screen. Default: 'ease-out' */
    enter?: string
    /** Elements leaving the screen. Default: 'ease-in' */
    exit?: string
    /** Springy / bouncy feel. Default: 'cubic-bezier(0.34, 1.56, 0.64, 1)' */
    spring?: string
  }
}

// ---------------------------------------------------------------------------
// Typography extras
// ---------------------------------------------------------------------------

/**
 * Simple per-role typography overrides that don't require full GenericFont knowledge.
 * Applied before `fonts` overrides — `fonts` always wins for the same property.
 */
export interface TypographyConfig {
  heading?: {
    /**
     * CSS text-transform applied uniformly to all heading sizes.
     * Useful for editorial brands that use ALL-CAPS headings. Default: 'none'
     */
    transform?: 'none' | 'uppercase' | 'lowercase' | 'capitalize'
    /** CSS font-style. Default: 'normal' */
    style?: 'normal' | 'italic'
  }
  body?: {
    /** CSS font-style. Default: 'normal' */
    style?: 'normal' | 'italic'
  }
}

// ---------------------------------------------------------------------------
// Tokens
// ---------------------------------------------------------------------------

export interface TokenOverrides {
  size?: Record<string | number, number>
  space?: Record<string | number, number>
  radius?: Record<string | number, number>
  zIndex?: Record<string | number, number>
  /** Override individual named border-width values. Merges with defaults. */
  borderWidth?: Partial<{ none: number; thin: number; medium: number; thick: number }>
}

// ---------------------------------------------------------------------------
// Fonts
// ---------------------------------------------------------------------------

export interface FontOverrides {
  heading?: Partial<GenericFont>
  body?: Partial<GenericFont>
  mono?: Partial<GenericFont>
}

// ---------------------------------------------------------------------------
// BrandDefinition
// ---------------------------------------------------------------------------

export interface BrandDefinition {
  name: string

  // --- Color ---
  palettes: {
    light: string[]
    dark: string[]
  }
  accentPalettes?: Record<string, { light: string[]; dark: string[] }>

  // --- Spacing / sizing / shape ---
  tokens?: TokenOverrides

  // --- Border ---
  borders?: BorderConfig

  // --- Outline / focus ring ---
  outline?: OutlineConfig

  // --- Shadow ---
  /** Complete shadow definitions. Each level emits two theme vars:
   *  `$shadowMd` (full box-shadow string) and `$shadowMdColor` (rgba, for RN). */
  shadows?: {
    light?: ShadowScale
    dark?: ShadowScale
  }

  // --- Typography ---
  fonts?: FontOverrides
  /** Simplified typography helpers. Applied before `fonts`; `fonts` takes priority. */
  typography?: TypographyConfig

  // --- Motion ---
  animations?: AnimationConfig

  media?: CreateTamaguiProps['media']
}
