import { addStaticValuePrefix, CharHash } from "../utils"
import { ColorVars, ThemeScale } from "./scales.models"
import { getAliasMap, getCssMapFromVars, getPropsFromCssMap, getThemePropsFromCssMap } from "./scales.utils"

/** Generator function for `border` theme scale */
export function getBorder<T extends ColorVars>(hash: CharHash, color: T) {
  const primaryColorBase = { ...hash.var, value: color.primary9.ref } as const
  const primaryColorMin = { ...hash.var, value: color.primary7.ref } as const
  const primaryColorMax = { ...hash.var, value: color.primary10.ref } as const
  const secondaryColorBase = { ...hash.var, value: color.secondary9.ref } as const
  const secondaryColorMin = { ...hash.var, value: color.secondary7.ref } as const
  const secondaryColorMax = { ...hash.var, value: color.secondary10.ref } as const
  const tertiaryColorBase = { ...hash.var, value: color.tertiary9.ref } as const
  const tertiaryColorMin = { ...hash.var, value: color.tertiary7.ref } as const
  const tertiaryColorMax = { ...hash.var, value: color.tertiary10.ref } as const

  const styleDefault = { ...hash.var, value: "solid" } as const

  const widthBase = { ...hash.var, value: "2rem" } as const
  const widthMin = { ...hash.var, value: `calc(${widthBase.ref} - 1rem)` } as const
  const widthMax = { ...hash.var, value: `calc(${widthBase.ref} + 2rem)` } as const
  const widthDefault = { ...hash.var, value: widthBase.ref } as const

  const sharedVars = {
    primaryColorBase,
    primaryColorMin,
    primaryColorMax,
    secondaryColorBase,
    secondaryColorMin,
    secondaryColorMax,
    tertiaryColorBase,
    tertiaryColorMin,
    tertiaryColorMax,
    widthBase,
    widthMin,
    widthMax,
    widthDefault,
    styleDefault,
  } as const

  const vars = { ...sharedVars } as const
  const baseCssValueMap = { ...getCssMapFromVars(sharedVars) } as const
  const cssValueMap = {
    ...baseCssValueMap,

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

    // COLORS //
    topPrimaryColorBase: { borderBlockStartColor: primaryColorBase.ref },
    bottomPrimaryColorBase: { borderBlockEndColor: primaryColorBase.ref },
    leftPrimaryColorBase: { borderInlineStartColor: primaryColorBase.ref },
    rightPrimaryColorBase: { borderInlineEndColor: primaryColorBase.ref },

    topPrimaryColorMin: { borderBlockStartColor: primaryColorMin.ref },
    bottomPrimaryColorMin: { borderBlockEndColor: primaryColorMin.ref },
    leftPrimaryColorMin: { borderInlineStartColor: primaryColorMin.ref },
    rightPrimaryColorMin: { borderInlineEndColor: primaryColorMin.ref },

    topPrimaryColorMax: { borderBlockStartColor: primaryColorMax.ref },
    bottomPrimaryColorMax: { borderBlockEndColor: primaryColorMax.ref },
    leftPrimaryColorMax: { borderInlineStartColor: primaryColorMax.ref },
    rightPrimaryColorMax: { borderInlineEndColor: primaryColorMax.ref },

    topSecondaryColorBase: { borderBlockStartColor: secondaryColorBase.ref },
    bottomSecondaryColorBase: { borderBlockEndColor: secondaryColorBase.ref },
    leftSecondaryColorBase: { borderInlineStartColor: secondaryColorBase.ref },
    rightSecondaryColorBase: { borderInlineEndColor: secondaryColorBase.ref },

    topSecondaryColorMin: { borderBlockStartColor: secondaryColorMin.ref },
    bottomSecondaryColorMin: { borderBlockEndColor: secondaryColorMin.ref },
    leftSecondaryColorMin: { borderInlineStartColor: secondaryColorMin.ref },
    rightSecondaryColorMin: { borderInlineEndColor: secondaryColorMin.ref },

    topSecondaryColorMax: { borderBlockStartColor: secondaryColorMax.ref },
    bottomSecondaryColorMax: { borderBlockEndColor: secondaryColorMax.ref },
    leftSecondaryColorMax: { borderInlineStartColor: secondaryColorMax.ref },
    rightSecondaryColorMax: { borderInlineEndColor: secondaryColorMax.ref },

    topTertiaryColorBase: { borderBlockStartColor: tertiaryColorBase.ref },
    bottomTertiaryColorBase: { borderBlockEndColor: tertiaryColorBase.ref },
    leftTertiaryColorBase: { borderInlineStartColor: tertiaryColorBase.ref },
    rightTertiaryColorBase: { borderInlineEndColor: tertiaryColorBase.ref },

    topTertiaryColorMin: { borderBlockStartColor: tertiaryColorMin.ref },
    bottomTertiaryColorMin: { borderBlockEndColor: tertiaryColorMin.ref },
    leftTertiaryColorMin: { borderInlineStartColor: tertiaryColorMin.ref },
    rightTertiaryColorMin: { borderInlineEndColor: tertiaryColorMin.ref },

    topTertiaryColorMax: { borderBlockStartColor: tertiaryColorMax.ref },
    bottomTertiaryColorMax: { borderBlockEndColor: tertiaryColorMax.ref },
    leftTertiaryColorMax: { borderInlineStartColor: tertiaryColorMax.ref },
    rightTertiaryColorMax: { borderInlineEndColor: tertiaryColorMax.ref },

    // STYLES //
    topStyleDefault: { borderBlockStartStyle: styleDefault.ref },
    bottomStyleDefault: { borderBlockEndStyle: styleDefault.ref },
    leftStyleDefault: { borderInlineStartStyle: styleDefault.ref },
    rightStyleDefault: { borderInlineEndStyle: styleDefault.ref },

    // WIDTHS //
    topWidthBase: { borderBlockStartWidth: widthBase.ref },
    bottomWidthBase: { borderBlockEndWidth: widthBase.ref },
    leftWidthBase: { borderInlineStartWidth: widthBase.ref },
    rightWidthBase: { borderInlineEndWidth: widthBase.ref },

    topWidthMin: { borderBlockStartWidth: widthMin.ref },
    bottomWidthMin: { borderBlockEndWidth: widthMin.ref },
    leftWidthMin: { borderInlineStartWidth: widthMin.ref },
    rightWidthMin: { borderInlineEndWidth: widthMin.ref },

    topWidthMax: { borderBlockStartWidth: widthMax.ref },
    bottomWidthMax: { borderBlockEndWidth: widthMax.ref },
    leftWidthMax: { borderInlineStartWidth: widthMax.ref },
    rightWidthMax: { borderInlineEndWidth: widthMax.ref },

    topWidthDefault: { borderBlockStartWidth: widthDefault.ref },
    bottomWidthDefault: { borderBlockEndWidth: widthDefault.ref },
    leftWidthDefault: { borderInlineStartWidth: widthDefault.ref },
    rightWidthDefault: { borderInlineEndWidth: widthDefault.ref },
  } as const

  const { aliasMap, cssAliases } = getAliasMap(
    {
      primary: {
        borderBlockStartColor: "topPrimaryColorBase",
        borderBlockEndColor: "bottomPrimaryColorBase",
        borderInlineStartColor: "leftPrimaryColorBase",
        borderInlineEndColor: "rightPrimaryColorBase",
        borderBlockStartWidth: "topWidthDefault",
        borderBlockEndWidth: "bottomWidthDefault",
        borderInlineStartWidth: "leftWidthDefault",
        borderInlineEndWidth: "rightWidthDefault",
      },
      primaryMin: {
        borderBlockStartColor: "topPrimaryColorMin",
        borderBlockEndColor: "bottomPrimaryColorMin",
        borderInlineStartColor: "leftPrimaryColorMin",
        borderInlineEndColor: "rightPrimaryColorMin",
        borderBlockStartWidth: "topWidthDefault",
        borderBlockEndWidth: "bottomWidthDefault",
        borderInlineStartWidth: "leftWidthDefault",
        borderInlineEndWidth: "rightWidthDefault",
      },
      primaryMax: {
        borderBlockStartColor: "topPrimaryColorMax",
        borderBlockEndColor: "bottomPrimaryColorMax",
        borderInlineStartColor: "leftPrimaryColorMax",
        borderInlineEndColor: "rightPrimaryColorMax",
        borderBlockStartWidth: "topWidthDefault",
        borderBlockEndWidth: "bottomWidthDefault",
        borderInlineStartWidth: "leftWidthDefault",
        borderInlineEndWidth: "rightWidthDefault",
      },
      secondary: {
        borderBlockStartColor: "topSecondaryColorBase",
        borderBlockEndColor: "bottomSecondaryColorBase",
        borderInlineStartColor: "leftSecondaryColorBase",
        borderInlineEndColor: "rightSecondaryColorBase",
        borderBlockStartWidth: "topWidthDefault",
        borderBlockEndWidth: "bottomWidthDefault",
        borderInlineStartWidth: "leftWidthDefault",
        borderInlineEndWidth: "rightWidthDefault",
      },
      secondaryMin: {
        borderBlockStartColor: "topSecondaryColorMin",
        borderBlockEndColor: "bottomSecondaryColorMin",
        borderInlineStartColor: "leftSecondaryColorMin",
        borderInlineEndColor: "rightSecondaryColorMin",
        borderBlockStartWidth: "topWidthDefault",
        borderBlockEndWidth: "bottomWidthDefault",
        borderInlineStartWidth: "leftWidthDefault",
        borderInlineEndWidth: "rightWidthDefault",
      },
      secondaryMax: {
        borderBlockStartColor: "topSecondaryColorMax",
        borderBlockEndColor: "bottomSecondaryColorMax",
        borderInlineStartColor: "leftSecondaryColorMax",
        borderInlineEndColor: "rightSecondaryColorMax",
        borderBlockStartWidth: "topWidthDefault",
        borderBlockEndWidth: "bottomWidthDefault",
        borderInlineStartWidth: "leftWidthDefault",
        borderInlineEndWidth: "rightWidthDefault",
      },
      tertiary: {
        borderBlockStartColor: "topTertiaryColorBase",
        borderBlockEndColor: "bottomTertiaryColorBase",
        borderInlineStartColor: "leftTertiaryColorBase",
        borderInlineEndColor: "rightTertiaryColorBase",
        borderBlockStartWidth: "topWidthDefault",
        borderBlockEndWidth: "bottomWidthDefault",
        borderInlineStartWidth: "leftWidthDefault",
        borderInlineEndWidth: "rightWidthDefault",
      },
      tertiaryMin: {
        borderBlockStartColor: "topTertiaryColorMin",
        borderBlockEndColor: "bottomTertiaryColorMin",
        borderInlineStartColor: "leftTertiaryColorMin",
        borderInlineEndColor: "rightTertiaryColorMin",
        borderBlockStartWidth: "topWidthDefault",
        borderBlockEndWidth: "bottomWidthDefault",
        borderInlineStartWidth: "leftWidthDefault",
        borderInlineEndWidth: "rightWidthDefault",
      },
      tertiaryMax: {
        borderBlockStartColor: "topTertiaryColorMax",
        borderBlockEndColor: "bottomTertiaryColorMax",
        borderInlineStartColor: "leftTertiaryColorMax",
        borderInlineEndColor: "rightTertiaryColorMax",
        borderBlockStartWidth: "topWidthDefault",
        borderBlockEndWidth: "bottomWidthDefault",
        borderInlineStartWidth: "leftWidthDefault",
        borderInlineEndWidth: "rightWidthDefault",
      },
      [addStaticValuePrefix("none")]: {
        borderBlockStartColor: addStaticValuePrefix("transparent"),
        borderBlockEndColor: addStaticValuePrefix("transparent"),
        borderInlineStartColor: addStaticValuePrefix("transparent"),
        borderInlineEndColor: addStaticValuePrefix("transparent"),
        borderBlockStartWidth: addStaticValuePrefix("0"),
        borderBlockEndWidth: addStaticValuePrefix("0"),
        borderInlineStartWidth: addStaticValuePrefix("0"),
        borderInlineEndWidth: addStaticValuePrefix("0"),
      },
      [addStaticValuePrefix("initial")]: {
        borderBlockStartColor: addStaticValuePrefix("transparent"),
        borderBlockEndColor: addStaticValuePrefix("transparent"),
        borderInlineStartColor: addStaticValuePrefix("transparent"),
        borderInlineEndColor: addStaticValuePrefix("transparent"),
        borderBlockStartWidth: addStaticValuePrefix("0"),
        borderBlockEndWidth: addStaticValuePrefix("0"),
        borderInlineStartWidth: addStaticValuePrefix("0"),
        borderInlineEndWidth: addStaticValuePrefix("0"),
      },
    },
    {
      borderBlockStartStyle: "topStyleDefault",
      borderBlockEndStyle: "bottomStyleDefault",
      borderInlineStartStyle: "leftStyleDefault",
      borderInlineEndStyle: "rightStyleDefault",
    }
  )

  const cssAliasMap = { ...cssAliases } as const

  const themeProps = { ...getThemePropsFromCssMap(baseCssValueMap) } as const

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

export const borderCombos = {
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

export const borderColors = { ...borderCombos } as const

export const hiddenBorderColors = {
  ...borderCombos,
  topPrimaryColorBase: true,
  bottomPrimaryColorBase: true,
  leftPrimaryColorBase: true,
  rightPrimaryColorBase: true,
  topPrimaryColorMin: true,
  bottomPrimaryColorMin: true,
  leftPrimaryColorMin: true,
  rightPrimaryColorMin: true,
  topPrimaryColorMax: true,
  bottomPrimaryColorMax: true,
  leftPrimaryColorMax: true,
  rightPrimaryColorMax: true,
  topSecondaryColorBase: true,
  bottomSecondaryColorBase: true,
  leftSecondaryColorBase: true,
  rightSecondaryColorBase: true,
  topSecondaryColorMin: true,
  bottomSecondaryColorMin: true,
  leftSecondaryColorMin: true,
  rightSecondaryColorMin: true,
  topSecondaryColorMax: true,
  bottomSecondaryColorMax: true,
  leftSecondaryColorMax: true,
  rightSecondaryColorMax: true,
  topTertiaryColorBase: true,
  bottomTertiaryColorBase: true,
  leftTertiaryColorBase: true,
  rightTertiaryColorBase: true,
  topTertiaryColorMin: true,
  bottomTertiaryColorMin: true,
  leftTertiaryColorMin: true,
  rightTertiaryColorMin: true,
  topTertiaryColorMax: true,
  bottomTertiaryColorMax: true,
  leftTertiaryColorMax: true,
  rightTertiaryColorMax: true,
} as const

export const borderStyles = {
  styleDefault: true,
} as const

export const hiddenBorderStyles = {
  ...borderCombos,
  topStyleDefault: true,
  bottomStyleDefault: true,
  leftStyleDefault: true,
  rightStyleDefault: true,
} as const

export const borderWidths = {
  widthBase: true,
  widthMin: true,
  widthMax: true,
  widthDefault: true,
} as const

export const hiddenBorderWidths = {
  ...borderCombos,
  topWidthBase: true,
  bottomWidthBase: true,
  leftWidthBase: true,
  rightWidthBase: true,
  topWidthMin: true,
  bottomWidthMin: true,
  leftWidthMin: true,
  rightWidthMin: true,
  topWidthMax: true,
  bottomWidthMax: true,
  leftWidthMax: true,
  rightWidthMax: true,
  topWidthDefault: true,
  bottomWidthDefault: true,
  leftWidthDefault: true,
  rightWidthDefault: true,
} as const
