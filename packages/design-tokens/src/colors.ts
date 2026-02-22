/**
 * Semantic color token mappings.
 *
 * These define the role-based color slots consumed by components.
 * They map to 12-step palette indices (0=lightest, 11=darkest for light mode).
 * The actual values come from themes built via @tamagui/theme-builder.
 */

/** Palette index mapping for semantic roles */
export const semanticColorMap = {
  /** Primary content background */
  background: 0,
  /** Hover state for backgrounds */
  backgroundHover: 1,
  /** Press/active state for backgrounds */
  backgroundPress: 2,
  /** Focus state for backgrounds */
  backgroundFocus: 1,

  /** Primary text color */
  color: 11,
  /** Hover state text */
  colorHover: 11,
  /** Press state text */
  colorPress: 10,
  /** Focus state text */
  colorFocus: 11,

  /** Subtitle/secondary text */
  colorSubtitle: 8,
  /** Placeholder text in inputs */
  placeholderColor: 7,

  /** Default border */
  borderColor: 4,
  /** Border hover state */
  borderColorHover: 5,
  /** Border press state */
  borderColorPress: 3,
  /** Border focus state */
  borderColorFocus: 5,

  /** Focus ring color */
  outlineColor: 5,
  /** Shadow color */
  shadowColor: 0,

  /** Direct palette access (color1=lightest, color12=darkest in light mode) */
  color1: 0,
  color2: 1,
  color3: 2,
  color4: 3,
  color5: 4,
  color6: 5,
  color7: 6,
  color8: 7,
  color9: 8,
  color10: 9,
  color11: 10,
  color12: 11,
} as const
