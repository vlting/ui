import { addStaticValuePrefix, CharHash } from "../utils"
import { ColorVars, ThemeScale } from "./scales.models"
import { getAliasMap, getCssMapFromVars, getPropsFromCssMap, getThemePropsFromCssMap } from "./scales.utils"

/** Generator function for `outline` theme scale */
export function getOutline<T extends ColorVars>(hash: CharHash, color: T) {
  const widthBase = { ...hash.var, value: "2rem" } as const
  const widthMin = { ...hash.var, value: `calc(${widthBase.ref} - 1rem)` } as const
  const widthMax = { ...hash.var, value: `calc(${widthBase.ref} + 2rem)` } as const
  const widthDefault = { ...hash.var, value: widthBase.ref } as const

  const primaryColorBase = { ...hash.var, value: color.primary9.ref } as const
  const primaryColorMin = { ...hash.var, value: color.primary7.ref } as const
  const primaryColorMax = { ...hash.var, value: color.primary10.ref } as const
  const secondaryColorBase = { ...hash.var, value: color.secondary9.ref } as const
  const secondaryColorMin = { ...hash.var, value: color.secondary7.ref } as const
  const secondaryColorMax = { ...hash.var, value: color.secondary10.ref } as const
  const tertiaryColorBase = { ...hash.var, value: color.tertiary9.ref } as const
  const tertiaryColorMin = { ...hash.var, value: color.tertiary7.ref } as const
  const tertiaryColorMax = { ...hash.var, value: color.tertiary10.ref } as const

  const offsetBase = { ...hash.var, value: widthBase.ref } as const
  const offsetMin = { ...hash.var, value: `max(0, calc(${offsetBase.ref}) - 2rem)` } as const
  const offsetMax = { ...hash.var, value: `calc(${offsetBase.ref} + 2rem)` } as const
  const offsetDefault = { ...hash.var, value: offsetBase.ref } as const

  const styleDefault = { ...hash.var, value: "solid" } as const

  const vars = {
    widthBase,
    widthMin,
    widthMax,
    widthDefault,
    primaryColorBase,
    primaryColorMin,
    primaryColorMax,
    secondaryColorBase,
    secondaryColorMin,
    secondaryColorMax,
    tertiaryColorBase,
    tertiaryColorMin,
    tertiaryColorMax,
    offsetBase,
    offsetMin,
    offsetMax,
    offsetDefault,
    styleDefault,
  } as const

  // These keys will get mapped into classes with multiple CSS properties
  const cssValueMap = {
    ...getCssMapFromVars(vars),
    // COMBO PLACEHOLDERS //
    primary: "primary",
    primaryMin: "primaryMin",
    primaryMax: "primaryMax",
    secondary: "secondary",
    secondaryMin: "secondaryMin",
    secondaryMax: "secondaryMax",
    tertiary: "tertiary",
    tertiaryMin: "tertiaryMin",
    tertiaryMax: "tertiaryMax",
  } as const

  const { aliasMap, cssAliases } = getAliasMap(
    {
      primary: { outlineColor: "primaryColorBase" },
      primaryMin: { outlineColor: "primaryColorMin" },
      primaryMax: { outlineColor: "primaryColorMax" },
      secondary: { outlineColor: "secondaryColorBase" },
      secondaryMin: { outlineColor: "secondaryColorMin" },
      secondaryMax: { outlineColor: "secondaryColorMax" },
      tertiary: { outlineColor: "tertiaryColorBase" },
      tertiaryMin: { outlineColor: "tertiaryColorMin" },
      tertiaryMax: { outlineColor: "tertiaryColorMax" },
      [addStaticValuePrefix("none")]: { outlineColor: addStaticValuePrefix("transparent") },
      [addStaticValuePrefix("initial")]: { outlineColor: addStaticValuePrefix("transparent") },
    },
    {
      outlineWidth: "widthDefault",
      outlineStyle: "styleDefault",
      outlineOffset: "offsetDefault",
    }
  )

  const cssAliasMap = { ...cssAliases } as const

  const themeProps = { ...getThemePropsFromCssMap(cssValueMap) } as const

  return {
    vars,
    themeProps,
    cssValueMap,
    cssValueMapProps: getPropsFromCssMap(cssValueMap),
    cssAliasMap,
    aliasMap,
  } as ThemeScale<typeof vars, typeof themeProps, typeof cssValueMap, typeof cssAliasMap>
}

// FILTER KEYS ////////////////////////////////////////////////////////////////
// Used for generating types that map to only parts of this scale

export const outlineCombos = {
  primary: true,
  primaryMin: true,
  primaryMax: true,
  secondary: true,
  secondaryMin: true,
  secondaryMax: true,
  tertiary: true,
  tertiaryMin: true,
  tertiaryMax: true,
} as const

export const hiddenOutlineWidths = { ...outlineCombos } as const
export const outlineWidths = {
  widthBase: true,
  widthMin: true,
  widthMax: true,
  widthDefault: true,
} as const

export const hiddenOutlineColors = {
  ...outlineCombos,
  primaryColor: true,
  primaryColorBase: true,
  primaryColorMin: true,
  primaryColorMax: true,
  secondaryColor: true,
  secondaryColorBase: true,
  secondaryColorMin: true,
  secondaryColorMax: true,
  tertiaryColor: true,
  tertiaryColorBase: true,
  tertiaryColorMin: true,
  tertiaryColorMax: true,
} as const
export const outlineColors = { ...outlineCombos } as const

export const hiddenOutlineStyles = { ...outlineCombos } as const
export const outlineStyles = {
  styleDefault: true,
} as const

export const hiddenOutlineOffsets = { ...outlineCombos } as const
export const outlineOffsets = {
  offsetBase: true,
  offsetMin: true,
  offsetMax: true,
  offsetDefault: true,
} as const
