// CONSTANTS //////////////////////////////////////////////////////////////////////////////////////

export const DEFAULT_COLOR_MODE = "light" as const

// Neutron Palette
export const DEFAULT_HUE = 174
export const DEFAULT_PALETTE = 2
// Launchfox Palette
// export const DEFAULT_HUE = 217
// export const DEFAULT_PALETTE = 3
// Stepflow Palette
// export const DEFAULT_HUE = 224
// export const DEFAULT_PALETTE = 2

const DEFAULT_SATURATIONS: [number, number, number] = [87, 50, 5]
export const DEFAULT_NEUTRAL_SATURATION = 7
export const MAX_NEUTRAL_SATURATION = 40

export const TEXT_COLOR_TARGETS = {
  1: 10,
  2: 11,
  3: 11,
  4: 12,
  5: 12,
  6: 12,
  7: 12,
  8: 12,
  9: "min",
  10: "min",
  11: 3,
  12: 5,
} as const

export const ALPHA_TEXT_COLOR_TARGETS = {
  1: "max",
  2: "max",
  3: "max",
  4: "max",
  5: "max",
  6: "max",
  7: "max",
  8: "max",
  9: "min",
  10: "min",
  11: 1,
  12: 2,
} as const

export const MIN_ALPHA_TEXT_COLOR_TARGETS = {
  1: "max",
  2: "max",
  3: 12,
  4: 12,
  5: 11,
  6: 11,
  7: 10,
  8: 10,
  9: 9,
  10: 9,
  11: 8,
  12: 8,
} as const

export const MAX_ALPHA_TEXT_COLOR_TARGETS = {
  1: "max",
  2: "max",
  3: "max",
  4: "max",
  5: "max",
  6: "max",
  7: "max",
  8: "min",
  9: "min",
  10: 1,
  11: 2,
  12: 3,
} as const

export const ALPHA_VALUES = [0.015, 0.05, 0.1, 0.15, 0.23, 0.32, 0.42, 0.53, 0.75, 0.85, 0.9, 0.95] as const

export const ZERO_SATURATION_LUMINANCE = `|{ywrnhaF?5)|{ywsnhaF?5)&+15:=@EUbjy"&,037:=S]jz`
export const ZERO_SATURATION_INDICES = {
  light: {
    color: 0,
    neutral: 12,
  },
  dark: {
    color: 24,
    neutral: 36,
  },
}

/** Base indices of color modes in the encoded color matrix */
export const MATRIX_INDICES = {
  light: {
    color: 0,
    neutral: 17280,
  },
  dark: {
    color: 34560,
    neutral: 51840,
  },
} as const

/** Size (in characters) of different types of encoded segments */
export const SEGMENT_SIZE = {
  hue: 48, // == half-sat values + full-sat values
  set: 24, // == scale of values for either half-sat, or full-sat
  valuePair: 2, // == a saturation value + a luminosity value
  value: 1, // == a single, ASCII-encoded value
} as const

export const DECODE_DIFF = -26

export const COLOR_KEYS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] as const

export const DEFAULT_SOURCE_COLORS: ColorGenOptions = {
  // Core colors
  ...generatePaletteFromHue(DEFAULT_HUE, DEFAULT_PALETTE, [85, 50, 0]),
  // Neutral colors
  min: { hue: 0, saturation: 0, contrast: 0 },
  max: { hue: 0, saturation: 0, contrast: 100 },
  // Status colors
  info: { hue: 194, saturation: 95 },
  success: { hue: 123, saturation: 90 },
  warning: { hue: 33, saturation: 100 },
  error: { hue: 350, saturation: 75 },
  // Flavor colors
  tomato: { hue: 8, saturation: 90 },
  amber: { hue: 45, saturation: 100 },
  grass: { hue: 77, saturation: 100 },
  forest: { hue: 138, saturation: 90 },
  aqua: { hue: 193, saturation: 90 },
  indigo: { hue: 222, saturation: 90 },
  plum: { hue: 267, saturation: 90 },
  magenta: { hue: 313, saturation: 80 },
}

// TYPES //////////////////////////////////////////////////////////////////////////////////////////

export type ColorMode = "light" | "dark"
export type ColorType = "color" | "neutral"

export enum StaticColorName {
  max = "max",
  min = "min",
}

export enum CoreColorName {
  primary = "primary",
  secondary = "secondary",
  tertiary = "tertiary",
}

export enum StatusColorName {
  error = "error",
  info = "info",
  success = "success",
  warning = "warning",
}

// Colors from a broad spectrum of hues, for general purposes
export enum FlavorColorName {
  tomato = "tomato",
  amber = "amber",
  grass = "grass",
  forest = "forest",
  aqua = "aqua",
  indigo = "indigo",
  plum = "plum",
  magenta = "magenta",
}

// Translucent colors
export enum AlphaColorName {
  primaryAlpha = "primaryAlpha",
  secondaryAlpha = "secondaryAlpha",
  tertiaryAlpha = "tertiaryAlpha",
  maxAlpha = "maxAlpha",
  minAlpha = "minAlpha",
}
export const ALPHA_KEY = "Alpha"

export type ColorNumberKey = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12

export type TextColor<Base extends string> = `${Base}Text`
export type ScaleColor<Base extends string> = `${Base}${ColorNumberKey}`

type ColorObject = {
  hue: number
  saturation?: number
  isNeutral?: boolean
}

/** Source color can either be a hue, or a hue + saturation object */
export type SourceColor = number | `${ScaleColorName}` | ColorObject

/** Used for non-scaled colors in the palette */
export type StaticSourceColor = {
  hue: number
  saturation: number
  /** Value from 0 (no contrast) to 100 (max contrast) */
  contrast: number
}

export type SemanticColors = { [k in CoreColorName]: ColorObject }

export type ColorGenOptions = { [k in CoreColorName]: SourceColor } & { [k in StaticColorName]?: StaticSourceColor } & {
  [k in StatusColorName | FlavorColorName]?: SourceColor
}

export type ScaleColorName = CoreColorName | StatusColorName | FlavorColorName | AlphaColorName
export type TextColorName = TextColor<ScaleColorName>

export type ScaleTextColor = ScaleColor<TextColorName>

export type ThemeColor = `${StaticColorName}` | ScaleColor<ScaleColorName> | ScaleTextColor

export type ColorPalette<T = string> = {
  [key in ThemeColor]: T
}

// Complimentary Colors ///////////////////////////////////////////////////////////////////////////
function shiftHue(hue: number, shift: number) {
  if (shift > 359) {
    throw new Error("Shift parameter must be less than 360")
  }
  const sum = shift + hue
  return sum > 360 ? sum - 360 : sum
}

function getColorPalettes(
  hue: number,
  saturations: [number, number, number],
): [SemanticColors, SemanticColors, SemanticColors] {
  const colors: SemanticColors[] = []
  const isTealish = 110 <= hue && hue <= 208
  const isGreenish = 60 <= hue && hue < 110
  const isYellowish = 35 <= hue && hue < 85
  const isRedToned = 279 <= hue || hue < 16

  // Tetrad
  const tetradSecondary = shiftHue(hue, 180)
  const tetradSecondaryVariant = shiftHue(hue, 90)
  // Triad
  const triadSecondary = shiftHue(hue, 120)
  const triadSecondaryVariant = shiftHue(hue, 240)
  // Split Complements
  const splitSecondary = shiftHue(hue, 150)
  const splitSecondaryVariant = shiftHue(hue, 210)

  // PALETTE 1: Pure Tetrad
  colors.push({
    primary: { hue, saturation: saturations[0] },
    secondary: {
      hue: isTealish ? triadSecondaryVariant : tetradSecondary,
      saturation: saturations[1],
    },
    tertiary: {
      hue: isTealish ? triadSecondaryVariant : tetradSecondary,
      saturation: saturations[2],
      isNeutral: true,
    },
  } as SemanticColors)
  // PALETTE 2: Pure Triad
  colors.push({
    primary: { hue, saturation: saturations[0] },
    secondary: {
      hue: isGreenish || isRedToned ? triadSecondary : tetradSecondaryVariant,
      saturation: saturations[1],
    },
    tertiary: {
      hue: isGreenish || isRedToned ? triadSecondary : tetradSecondaryVariant,
      saturation: saturations[2],
      isNeutral: true,
    },
  } as SemanticColors)
  // PALETTE 3: Pure Split Complements
  colors.push({
    primary: { hue, saturation: saturations[0] },
    secondary: {
      hue: isYellowish ? splitSecondaryVariant : isRedToned ? triadSecondaryVariant : splitSecondary,
      saturation: saturations[1],
    },
    tertiary: {
      hue: isYellowish ? splitSecondaryVariant : isRedToned ? triadSecondaryVariant : splitSecondary,
      saturation: saturations[2],
      isNeutral: true,
    },
  } as SemanticColors)

  return colors as [SemanticColors, SemanticColors, SemanticColors]
}

/** Get a set of 3 complementary color palettes, from one base hue */
export function getComplementaryHues(
  hue: number,
  saturations: [number, number, number] = DEFAULT_SATURATIONS,
): [SemanticColors, SemanticColors, SemanticColors] {
  if (hue < 0 || hue > 360) {
    throw new Error("Parameter `hue` must be a number between 0 and 360")
  }
  return getColorPalettes(hue, saturations)
}

/** Generates a set of complementary colors from one base hue. */
export function generatePaletteFromHue(
  hue: number,
  variant: 1 | 2 | 3 = 1,
  saturations: [number, number, number] = DEFAULT_SATURATIONS,
): SemanticColors {
  return getComplementaryHues(hue, saturations)[variant - 1]
}
