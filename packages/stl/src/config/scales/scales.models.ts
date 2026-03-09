import { THEME_PREFIX, VarData } from "../utils"
import { BodyFontFamily, HeadingFontFamily, CodeFontFamily } from "../../shared/models"
import { ColorNumberKey, ColorPalette, ThemeColor } from "../../shared/models/colorGen.models"

export const SCALED_ALIAS = "@"

export const STATIC_VALUE_PREFIX = "^"

// TYPES //////////////////////////////////////////////////////////////////////
export type ThemePropValue = string
export type CssValue = string | Record<string, string | number>
export type CssAlias<T extends string | number = string | number> = `${typeof THEME_PREFIX}${T}` | typeof SCALED_ALIAS
export type ScaleEntry = VarData & {
  value: CssValue
}
export type ThemeProps = Record<string | number, ThemePropValue>
export type CssValueMap = Record<string | number, CssValue>
export type CssValueMapProps<C extends CssValueMap> = Record<PrefixedKey<C>, [string, string | number][] | null>
export type CssAliasMap<C extends CssValueMap = CssValueMap> = Record<string | number, CssAlias<keyof Omit<C, symbol>>>
export type BaseVars<T extends string | number = string | number> = Record<T, ScaleEntry>
export type FlatMap = Record<string, string>
export type AliasMap = Record<string, string | FlatMap>

export type Font = BaseVars<
  "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "body" | "code" | "quote" | "li" | "small" | "em" | "strong"
>
export type LineHeight = BaseVars<
  | 4
  | 8
  | 12
  | 16
  | 24
  | 32
  | 40
  | "min"
  | "spaced"
  | "tight"
  | "tightest"
  | "flat"
  | "body"
  | "heading"
  | "subHeading"
  | "listItem"
  | "field"
  | "label"
  | "button"
>
export type FontSize = BaseVars<
  | 14
  | 16
  | 18
  | 21
  | 25
  | 30
  | 36
  | 44
  | 56
  | 72
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6"
  | "p"
  | "code"
  | "quote"
  | "field"
  | "button"
  | "fieldTiny"
  | "fieldSmall"
  | "fieldLarge"
  | "buttonTiny"
  | "buttonSmall"
  | "buttonLarge"
>
export type TypeSpace = BaseVars<
  | "emBase"
  | "emMin"
  | "emMax"
  | "remBase"
  | "remMin"
  | "remMax"
  | "chBase"
  | "chMin"
  | "chMax"
  | "tightest"
  | "tight"
  | "regular"
  | "loose"
>
export type FontWeight = BaseVars<
  | "100"
  | "200"
  | "300"
  | "400"
  | "500"
  | "600"
  | "700"
  | "800"
  | "900"
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6"
  | "p"
  | "a"
  | "code"
  | "quote"
>
export type FontFamily = BaseVars<
  | "heading"
  | "body"
  | "button"
  | "code"
  | "quote"
  | "systemSans"
  | "systemSerif"
  | "systemMono"
  | keyof typeof BodyFontFamily
  | keyof typeof HeadingFontFamily
  | keyof typeof CodeFontFamily
>

export type CoreColorKeys = ThemeColor | "shadowBase"
export type ColorVars = Record<CoreColorKeys, ScaleEntry>
export type ColorPaletteEntry = ColorPalette<ScaleEntry>
export type ColorSetter<T = ScaleEntry> = (
  key: keyof ColorPalette<T>,
  palette: ColorPalette<T>,
  value: string | number,
  numberKey?: ColorNumberKey,
  isMapped?: boolean,
) => void

export type KeyframeObject = Record<string, Record<string, string>>
export type Keyframes = Record<string, KeyframeObject>

export interface ThemeScale<
  S extends BaseVars = BaseVars,
  T extends ThemeProps = ThemeProps,
  C extends CssValueMap = CssValueMap,
  A extends CssAliasMap<C> | Record<any, any> = Record<any, any>,
  K extends Keyframes | Record<any, any> = Keyframes,
> {
  /** Used for theme definition and customization */
  vars: S
  /** For color scales, the default set of vars is `light`, so they may also return a `dark` set */
  darkVars?: Record<keyof S, ScaleEntry>
  /** Used for building a consumable, typed $theme object, with theme tokens */
  themeProps: T
  /** Used to generate static CSS classes, and the prop values that reference them */
  cssValueMap: C
  /** Used to match combo classes with the CSS props in that combo */
  cssValueMapProps: CssValueMapProps<C>
  /**
   * Used to generate aliases for some CSS classes
   *
   * NOTE: These keys must ALSO be added to `cssValueMap`, for the generated types to work properly.
   * NOTE 2: These keys MUST have `THEME_PREFIX` as a prefix
   */
  cssAliasMap?: A
  /** Used for building keyframe-based animations */
  keyframes?: K
  /**
   * Used for mapping aliases based on the prop used (i.e., in cases where the same value,
   * given to different props, could give different results).
   *
   * This is particularly useful with mapped props, if the mapped prop is a shorthand with
   * different value types, such as the `border` prop.
   */
  aliasMap?: AliasMap
}

export enum Scale {
  animation = "animation",
  border = "border",
  color = "color",
  column = "column",
  font = "font",
  fontFamily = "fontFamily",
  fontSize = "fontSize",
  fontWeight = "fontWeight",
  lineHeight = "lineHeight",
  outline = "outline",
  radius = "radius",
  row = "row",
  shadow = "shadow",
  size = "size",
  space = "space",
  textDecoration = "textDecoration",
  typoSpace = "typoSpace",
  typo = "typo",
  zIndex = "zIndex",
}

export type Scales = {
  [key in Scale]: ThemeScale
}

export type PrefixedKey<T extends Record<string | number | symbol, unknown>> = `${typeof THEME_PREFIX}${Exclude<
  keyof T,
  symbol
>}`
