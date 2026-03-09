import { addStaticValuePrefix, CharHash } from "../utils"
import { ColorVars, ThemeScale } from "./scales.models"
import { getAliasMap, getCssMapFromVars, getPropsFromCssMap, getThemePropsFromCssMap } from "./scales.utils"

/** Generator function for `textDecoration` theme scale */
export function getTextDecoration<T extends ColorVars>(hash: CharHash, color: T) {
  const underlineStyle = { ...hash.var, value: "solid" } as const
  const underlineThickness = { ...hash.var, value: "auto" } as const

  const strikeStyle = { ...hash.var, value: "solid" } as const
  const strikeThickness = { ...hash.var, value: "auto" } as const

  const altType = { ...hash.var, value: "overline" } as const
  const altStyle = { ...hash.var, value: "solid" } as const
  const altThickness = { ...hash.var, value: "auto" } as const

  const highlightType = { ...hash.var, value: "underline" } as const
  const highlightStyle = { ...hash.var, value: "wavy" } as const
  const highlightThickness = { ...hash.var, value: "1.5rem" } as const

  const defaultColor = { ...hash.var, value: "currentColor" } as const
  const primaryColor = { ...hash.var, value: color.primary9.ref } as const
  const secondaryColor = { ...hash.var, value: color.secondary9.ref } as const
  const infoColor = { ...hash.var, value: color.info9.ref } as const
  const successColor = { ...hash.var, value: color.success9.ref } as const
  const warningColor = { ...hash.var, value: color.warning9.ref } as const
  const errorColor = { ...hash.var, value: color.error9.ref } as const

  const vars = {
    underlineStyle,
    underlineThickness,
    strikeStyle,
    strikeThickness,
    altType,
    altStyle,
    altThickness,
    highlightType,
    highlightStyle,
    highlightThickness,
    defaultColor,
    primaryColor,
    secondaryColor,
    infoColor,
    successColor,
    warningColor,
    errorColor,
  } as const

  const cssValueMap = {
    ...getCssMapFromVars(vars),
    underlineDefault: "underlineDefault",
    underlinePrimary: "underlinePrimary",
    underlineSecondary: "underlineSecondary",
    strikeDefault: "strikeDefault",
    strikePrimary: "strikePrimary",
    strikeSecondary: "strikeSecondary",
    altDefault: "altDefault",
    altPrimary: "altPrimary",
    altSecondary: "altSecondary",
    highlightPrimary: "highlightPrimary",
    highlightSecondary: "highlightSecondary",
    highlightInfo: "highlightInfo",
    highlightSuccess: "highlightSuccess",
    highlightWarning: "highlightWarning",
    highlightError: "highlightError",
  } as const

  const { aliasMap, cssAliases } = getAliasMap({
    underlineDefault: {
      textDecorationLine: addStaticValuePrefix("underline"),
      textDecorationStyle: "underlineStyle",
      textDecorationColor: "defaultColor",
      textDecorationThickness: "underlineThickness",
    },
    underlinePrimary: {
      textDecorationLine: addStaticValuePrefix("underline"),
      textDecorationStyle: "underlineStyle",
      textDecorationColor: "primaryColor",
      textDecorationThickness: "underlineThickness",
    },
    underlineSecondary: {
      textDecorationLine: addStaticValuePrefix("underline"),
      textDecorationStyle: "underlineStyle",
      textDecorationColor: "secondaryColor",
      textDecorationThickness: "underlineThickness",
    },
    strikeDefault: {
      textDecorationLine: addStaticValuePrefix("line-through"),
      textDecorationStyle: "strikeStyle",
      textDecorationColor: "defaultColor",
      textDecorationThickness: "strikeThickness",
    },
    strikePrimary: {
      textDecorationLine: addStaticValuePrefix("line-through"),
      textDecorationStyle: "strikeStyle",
      textDecorationColor: "primaryColor",
      textDecorationThickness: "strikeThickness",
    },
    strikeSecondary: {
      textDecorationLine: addStaticValuePrefix("line-through"),
      textDecorationStyle: "strikeStyle",
      textDecorationColor: "secondaryColor",
      textDecorationThickness: "strikeThickness",
    },
    altDefault: {
      textDecorationLine: "altType",
      textDecorationStyle: "altStyle",
      textDecorationColor: "defaultColor",
      textDecorationThickness: "altThickness",
    },
    altPrimary: {
      textDecorationLine: "altType",
      textDecorationStyle: "altStyle",
      textDecorationColor: "primaryColor",
      textDecorationThickness: "altThickness",
    },
    altSecondary: {
      textDecorationLine: "altType",
      textDecorationStyle: "altStyle",
      textDecorationColor: "secondaryColor",
      textDecorationThickness: "altThickness",
    },
    highlightPrimary: {
      textDecorationLine: "highlightType",
      textDecorationStyle: "highlightStyle",
      textDecorationColor: "primaryColor",
      textDecorationThickness: "highlightThickness",
    },
    highlightSecondary: {
      textDecorationLine: "highlightType",
      textDecorationStyle: "highlightStyle",
      textDecorationColor: "secondaryColor",
      textDecorationThickness: "highlightThickness",
    },
    highlightInfo: {
      textDecorationLine: "highlightType",
      textDecorationStyle: "highlightStyle",
      textDecorationColor: "infoColor",
      textDecorationThickness: "highlightThickness",
    },
    highlightSuccess: {
      textDecorationLine: "highlightType",
      textDecorationStyle: "highlightStyle",
      textDecorationColor: "successColor",
      textDecorationThickness: "highlightThickness",
    },
    highlightWarning: {
      textDecorationLine: "highlightType",
      textDecorationStyle: "highlightStyle",
      textDecorationColor: "warningColor",
      textDecorationThickness: "highlightThickness",
    },
    highlightError: {
      textDecorationLine: "highlightType",
      textDecorationStyle: "highlightStyle",
      textDecorationColor: "errorColor",
      textDecorationThickness: "highlightThickness",
    },
  })

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

export const textDecorationCombos = {
  underlineDefault: true,
  underlinePrimary: true,
  underlineSecondary: true,
  strikeDefault: true,
  strikePrimary: true,
  strikeSecondary: true,
  altDefault: true,
  altPrimary: true,
  altSecondary: true,
  highlightPrimary: true,
  highlightSecondary: true,
  highlightInfo: true,
  highlightSuccess: true,
  highlightWarning: true,
  highlightError: true,
} as const

export const textDecorationLines = {
  altType: true,
  highlightType: true,
} as const
export const hiddenTextDecorationLines = { ...textDecorationCombos } as const
export const textDecorationStyles = {
  underlineStyle: true,
  strikeStyle: true,
  altStyle: true,
  highlightStyle: true,
} as const
export const hiddenTextDecorationStyles = { ...textDecorationCombos } as const
export const textDecorationColors = {
  defaultColor: true,
  primaryColor: true,
  secondaryColor: true,
  infoColor: true,
  successColor: true,
  warningColor: true,
  errorColor: true,
} as const
export const hiddenTextDecorationColors = { ...textDecorationCombos } as const
export const textDecorationThicknesses = {
  underlineThickness: true,
  strikeThickness: true,
  altThickness: true,
  highlightThickness: true,
} as const
export const hiddenTextDecorationThicknesses = { ...textDecorationCombos } as const
