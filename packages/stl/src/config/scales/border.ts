import { type CharHash, addStaticValuePrefix } from '../utils'
import type { ColorVars, ThemeScale } from './scales.models'
import {
  getAliasMap,
  getCssMapFromVars,
  getPropsFromCssMap,
  getThemePropsFromCssMap,
} from './scales.utils'

/** Generator function for `border` theme scale */
export function getBorder<T extends ColorVars>(hash: CharHash, color: T) {
  const primaryColorBase = { ...hash.var, value: color.primary9.ref } as const
  const primaryColorMin = { ...hash.var, value: color.primary7.ref } as const
  const primaryColorMax = { ...hash.var, value: color.primary10.ref } as const
  const secondaryColorBase = { ...hash.var, value: color.secondary9.ref } as const
  const secondaryColorMin = { ...hash.var, value: color.secondary7.ref } as const
  const secondaryColorMax = { ...hash.var, value: color.secondary10.ref } as const
  const neutralColorBase = { ...hash.var, value: color.neutral9.ref } as const
  const neutralColorMin = { ...hash.var, value: color.neutral7.ref } as const
  const neutralColorMax = { ...hash.var, value: color.neutral10.ref } as const
  const errorColorBase = { ...hash.var, value: color.error9.ref } as const
  const errorColorMin = { ...hash.var, value: color.error7.ref } as const
  const errorColorMax = { ...hash.var, value: color.error10.ref } as const
  const warningColorBase = { ...hash.var, value: color.warning9.ref } as const
  const warningColorMin = { ...hash.var, value: color.warning7.ref } as const
  const warningColorMax = { ...hash.var, value: color.warning10.ref } as const
  const successColorBase = { ...hash.var, value: color.success9.ref } as const
  const successColorMin = { ...hash.var, value: color.success7.ref } as const
  const successColorMax = { ...hash.var, value: color.success10.ref } as const
  const infoColorBase = { ...hash.var, value: color.info9.ref } as const
  const infoColorMin = { ...hash.var, value: color.info7.ref } as const
  const infoColorMax = { ...hash.var, value: color.info10.ref } as const

  const styleDefault = { ...hash.var, value: 'solid' } as const

  const widthBase = { ...hash.var, value: '1rem' } as const
  const widthMin = { ...hash.var, value: widthBase.ref } as const
  const widthMax = { ...hash.var, value: `calc(${widthBase.ref} + 2rem)` } as const
  const widthDefault = { ...hash.var, value: widthBase.ref } as const

  const sharedVars = {
    primaryColorBase,
    primaryColorMin,
    primaryColorMax,
    secondaryColorBase,
    secondaryColorMin,
    secondaryColorMax,
    neutralColorBase,
    neutralColorMin,
    neutralColorMax,
    errorColorBase,
    errorColorMin,
    errorColorMax,
    warningColorBase,
    warningColorMin,
    warningColorMax,
    successColorBase,
    successColorMin,
    successColorMax,
    infoColorBase,
    infoColorMin,
    infoColorMax,
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
    primary: 'primary',
    primaryMin: 'primaryMin',
    primaryMax: 'primaryMax',
    secondary: 'secondary',
    secondaryMin: 'secondaryMin',
    secondaryMax: 'secondaryMax',
    neutral: 'neutral',
    neutralMin: 'neutralMin',
    neutralMax: 'neutralMax',
    error: 'error',
    errorMin: 'errorMin',
    errorMax: 'errorMax',
    warning: 'warning',
    warningMin: 'warningMin',
    warningMax: 'warningMax',
    success: 'success',
    successMin: 'successMin',
    successMax: 'successMax',
    info: 'info',
    infoMin: 'infoMin',
    infoMax: 'infoMax',

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

    topNeutralColorBase: { borderBlockStartColor: neutralColorBase.ref },
    bottomNeutralColorBase: { borderBlockEndColor: neutralColorBase.ref },
    leftNeutralColorBase: { borderInlineStartColor: neutralColorBase.ref },
    rightNeutralColorBase: { borderInlineEndColor: neutralColorBase.ref },

    topNeutralColorMin: { borderBlockStartColor: neutralColorMin.ref },
    bottomNeutralColorMin: { borderBlockEndColor: neutralColorMin.ref },
    leftNeutralColorMin: { borderInlineStartColor: neutralColorMin.ref },
    rightNeutralColorMin: { borderInlineEndColor: neutralColorMin.ref },

    topNeutralColorMax: { borderBlockStartColor: neutralColorMax.ref },
    bottomNeutralColorMax: { borderBlockEndColor: neutralColorMax.ref },
    leftNeutralColorMax: { borderInlineStartColor: neutralColorMax.ref },
    rightNeutralColorMax: { borderInlineEndColor: neutralColorMax.ref },

    topErrorColorBase: { borderBlockStartColor: errorColorBase.ref },
    bottomErrorColorBase: { borderBlockEndColor: errorColorBase.ref },
    leftErrorColorBase: { borderInlineStartColor: errorColorBase.ref },
    rightErrorColorBase: { borderInlineEndColor: errorColorBase.ref },

    topErrorColorMin: { borderBlockStartColor: errorColorMin.ref },
    bottomErrorColorMin: { borderBlockEndColor: errorColorMin.ref },
    leftErrorColorMin: { borderInlineStartColor: errorColorMin.ref },
    rightErrorColorMin: { borderInlineEndColor: errorColorMin.ref },

    topErrorColorMax: { borderBlockStartColor: errorColorMax.ref },
    bottomErrorColorMax: { borderBlockEndColor: errorColorMax.ref },
    leftErrorColorMax: { borderInlineStartColor: errorColorMax.ref },
    rightErrorColorMax: { borderInlineEndColor: errorColorMax.ref },

    topWarningColorBase: { borderBlockStartColor: warningColorBase.ref },
    bottomWarningColorBase: { borderBlockEndColor: warningColorBase.ref },
    leftWarningColorBase: { borderInlineStartColor: warningColorBase.ref },
    rightWarningColorBase: { borderInlineEndColor: warningColorBase.ref },

    topWarningColorMin: { borderBlockStartColor: warningColorMin.ref },
    bottomWarningColorMin: { borderBlockEndColor: warningColorMin.ref },
    leftWarningColorMin: { borderInlineStartColor: warningColorMin.ref },
    rightWarningColorMin: { borderInlineEndColor: warningColorMin.ref },

    topWarningColorMax: { borderBlockStartColor: warningColorMax.ref },
    bottomWarningColorMax: { borderBlockEndColor: warningColorMax.ref },
    leftWarningColorMax: { borderInlineStartColor: warningColorMax.ref },
    rightWarningColorMax: { borderInlineEndColor: warningColorMax.ref },

    topSuccessColorBase: { borderBlockStartColor: successColorBase.ref },
    bottomSuccessColorBase: { borderBlockEndColor: successColorBase.ref },
    leftSuccessColorBase: { borderInlineStartColor: successColorBase.ref },
    rightSuccessColorBase: { borderInlineEndColor: successColorBase.ref },

    topSuccessColorMin: { borderBlockStartColor: successColorMin.ref },
    bottomSuccessColorMin: { borderBlockEndColor: successColorMin.ref },
    leftSuccessColorMin: { borderInlineStartColor: successColorMin.ref },
    rightSuccessColorMin: { borderInlineEndColor: successColorMin.ref },

    topSuccessColorMax: { borderBlockStartColor: successColorMax.ref },
    bottomSuccessColorMax: { borderBlockEndColor: successColorMax.ref },
    leftSuccessColorMax: { borderInlineStartColor: successColorMax.ref },
    rightSuccessColorMax: { borderInlineEndColor: successColorMax.ref },

    topInfoColorBase: { borderBlockStartColor: infoColorBase.ref },
    bottomInfoColorBase: { borderBlockEndColor: infoColorBase.ref },
    leftInfoColorBase: { borderInlineStartColor: infoColorBase.ref },
    rightInfoColorBase: { borderInlineEndColor: infoColorBase.ref },

    topInfoColorMin: { borderBlockStartColor: infoColorMin.ref },
    bottomInfoColorMin: { borderBlockEndColor: infoColorMin.ref },
    leftInfoColorMin: { borderInlineStartColor: infoColorMin.ref },
    rightInfoColorMin: { borderInlineEndColor: infoColorMin.ref },

    topInfoColorMax: { borderBlockStartColor: infoColorMax.ref },
    bottomInfoColorMax: { borderBlockEndColor: infoColorMax.ref },
    leftInfoColorMax: { borderInlineStartColor: infoColorMax.ref },
    rightInfoColorMax: { borderInlineEndColor: infoColorMax.ref },

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
        borderBlockStartColor: 'primary9',
        borderBlockEndColor: 'primary9',
        borderInlineStartColor: 'primary9',
        borderInlineEndColor: 'primary9',
        borderBlockStartWidth: 'topWidthDefault',
        borderBlockEndWidth: 'bottomWidthDefault',
        borderInlineStartWidth: 'leftWidthDefault',
        borderInlineEndWidth: 'rightWidthDefault',
      },
      primaryMin: {
        borderBlockStartColor: 'primary7',
        borderBlockEndColor: 'primary7',
        borderInlineStartColor: 'primary7',
        borderInlineEndColor: 'primary7',
        borderBlockStartWidth: 'topWidthDefault',
        borderBlockEndWidth: 'bottomWidthDefault',
        borderInlineStartWidth: 'leftWidthDefault',
        borderInlineEndWidth: 'rightWidthDefault',
      },
      primaryMax: {
        borderBlockStartColor: 'primary10',
        borderBlockEndColor: 'primary10',
        borderInlineStartColor: 'primary10',
        borderInlineEndColor: 'primary10',
        borderBlockStartWidth: 'topWidthDefault',
        borderBlockEndWidth: 'bottomWidthDefault',
        borderInlineStartWidth: 'leftWidthDefault',
        borderInlineEndWidth: 'rightWidthDefault',
      },
      secondary: {
        borderBlockStartColor: 'secondary9',
        borderBlockEndColor: 'secondary9',
        borderInlineStartColor: 'secondary9',
        borderInlineEndColor: 'secondary9',
        borderBlockStartWidth: 'topWidthDefault',
        borderBlockEndWidth: 'bottomWidthDefault',
        borderInlineStartWidth: 'leftWidthDefault',
        borderInlineEndWidth: 'rightWidthDefault',
      },
      secondaryMin: {
        borderBlockStartColor: 'secondary7',
        borderBlockEndColor: 'secondary7',
        borderInlineStartColor: 'secondary7',
        borderInlineEndColor: 'secondary7',
        borderBlockStartWidth: 'topWidthDefault',
        borderBlockEndWidth: 'bottomWidthDefault',
        borderInlineStartWidth: 'leftWidthDefault',
        borderInlineEndWidth: 'rightWidthDefault',
      },
      secondaryMax: {
        borderBlockStartColor: 'secondary10',
        borderBlockEndColor: 'secondary10',
        borderInlineStartColor: 'secondary10',
        borderInlineEndColor: 'secondary10',
        borderBlockStartWidth: 'topWidthDefault',
        borderBlockEndWidth: 'bottomWidthDefault',
        borderInlineStartWidth: 'leftWidthDefault',
        borderInlineEndWidth: 'rightWidthDefault',
      },
      neutral: {
        borderBlockStartColor: 'neutral9',
        borderBlockEndColor: 'neutral9',
        borderInlineStartColor: 'neutral9',
        borderInlineEndColor: 'neutral9',
        borderBlockStartWidth: 'topWidthDefault',
        borderBlockEndWidth: 'bottomWidthDefault',
        borderInlineStartWidth: 'leftWidthDefault',
        borderInlineEndWidth: 'rightWidthDefault',
      },
      neutralMin: {
        borderBlockStartColor: 'neutral7',
        borderBlockEndColor: 'neutral7',
        borderInlineStartColor: 'neutral7',
        borderInlineEndColor: 'neutral7',
        borderBlockStartWidth: 'topWidthDefault',
        borderBlockEndWidth: 'bottomWidthDefault',
        borderInlineStartWidth: 'leftWidthDefault',
        borderInlineEndWidth: 'rightWidthDefault',
      },
      neutralMax: {
        borderBlockStartColor: 'neutral10',
        borderBlockEndColor: 'neutral10',
        borderInlineStartColor: 'neutral10',
        borderInlineEndColor: 'neutral10',
        borderBlockStartWidth: 'topWidthDefault',
        borderBlockEndWidth: 'bottomWidthDefault',
        borderInlineStartWidth: 'leftWidthDefault',
        borderInlineEndWidth: 'rightWidthDefault',
      },
      error: {
        borderBlockStartColor: 'error9',
        borderBlockEndColor: 'error9',
        borderInlineStartColor: 'error9',
        borderInlineEndColor: 'error9',
        borderBlockStartWidth: 'topWidthDefault',
        borderBlockEndWidth: 'bottomWidthDefault',
        borderInlineStartWidth: 'leftWidthDefault',
        borderInlineEndWidth: 'rightWidthDefault',
      },
      errorMin: {
        borderBlockStartColor: 'error7',
        borderBlockEndColor: 'error7',
        borderInlineStartColor: 'error7',
        borderInlineEndColor: 'error7',
        borderBlockStartWidth: 'topWidthDefault',
        borderBlockEndWidth: 'bottomWidthDefault',
        borderInlineStartWidth: 'leftWidthDefault',
        borderInlineEndWidth: 'rightWidthDefault',
      },
      errorMax: {
        borderBlockStartColor: 'error10',
        borderBlockEndColor: 'error10',
        borderInlineStartColor: 'error10',
        borderInlineEndColor: 'error10',
        borderBlockStartWidth: 'topWidthDefault',
        borderBlockEndWidth: 'bottomWidthDefault',
        borderInlineStartWidth: 'leftWidthDefault',
        borderInlineEndWidth: 'rightWidthDefault',
      },
      warning: {
        borderBlockStartColor: 'warning9',
        borderBlockEndColor: 'warning9',
        borderInlineStartColor: 'warning9',
        borderInlineEndColor: 'warning9',
        borderBlockStartWidth: 'topWidthDefault',
        borderBlockEndWidth: 'bottomWidthDefault',
        borderInlineStartWidth: 'leftWidthDefault',
        borderInlineEndWidth: 'rightWidthDefault',
      },
      warningMin: {
        borderBlockStartColor: 'warning7',
        borderBlockEndColor: 'warning7',
        borderInlineStartColor: 'warning7',
        borderInlineEndColor: 'warning7',
        borderBlockStartWidth: 'topWidthDefault',
        borderBlockEndWidth: 'bottomWidthDefault',
        borderInlineStartWidth: 'leftWidthDefault',
        borderInlineEndWidth: 'rightWidthDefault',
      },
      warningMax: {
        borderBlockStartColor: 'warning10',
        borderBlockEndColor: 'warning10',
        borderInlineStartColor: 'warning10',
        borderInlineEndColor: 'warning10',
        borderBlockStartWidth: 'topWidthDefault',
        borderBlockEndWidth: 'bottomWidthDefault',
        borderInlineStartWidth: 'leftWidthDefault',
        borderInlineEndWidth: 'rightWidthDefault',
      },
      success: {
        borderBlockStartColor: 'success9',
        borderBlockEndColor: 'success9',
        borderInlineStartColor: 'success9',
        borderInlineEndColor: 'success9',
        borderBlockStartWidth: 'topWidthDefault',
        borderBlockEndWidth: 'bottomWidthDefault',
        borderInlineStartWidth: 'leftWidthDefault',
        borderInlineEndWidth: 'rightWidthDefault',
      },
      successMin: {
        borderBlockStartColor: 'success7',
        borderBlockEndColor: 'success7',
        borderInlineStartColor: 'success7',
        borderInlineEndColor: 'success7',
        borderBlockStartWidth: 'topWidthDefault',
        borderBlockEndWidth: 'bottomWidthDefault',
        borderInlineStartWidth: 'leftWidthDefault',
        borderInlineEndWidth: 'rightWidthDefault',
      },
      successMax: {
        borderBlockStartColor: 'success10',
        borderBlockEndColor: 'success10',
        borderInlineStartColor: 'success10',
        borderInlineEndColor: 'success10',
        borderBlockStartWidth: 'topWidthDefault',
        borderBlockEndWidth: 'bottomWidthDefault',
        borderInlineStartWidth: 'leftWidthDefault',
        borderInlineEndWidth: 'rightWidthDefault',
      },
      info: {
        borderBlockStartColor: 'info9',
        borderBlockEndColor: 'info9',
        borderInlineStartColor: 'info9',
        borderInlineEndColor: 'info9',
        borderBlockStartWidth: 'topWidthDefault',
        borderBlockEndWidth: 'bottomWidthDefault',
        borderInlineStartWidth: 'leftWidthDefault',
        borderInlineEndWidth: 'rightWidthDefault',
      },
      infoMin: {
        borderBlockStartColor: 'info7',
        borderBlockEndColor: 'info7',
        borderInlineStartColor: 'info7',
        borderInlineEndColor: 'info7',
        borderBlockStartWidth: 'topWidthDefault',
        borderBlockEndWidth: 'bottomWidthDefault',
        borderInlineStartWidth: 'leftWidthDefault',
        borderInlineEndWidth: 'rightWidthDefault',
      },
      infoMax: {
        borderBlockStartColor: 'info10',
        borderBlockEndColor: 'info10',
        borderInlineStartColor: 'info10',
        borderInlineEndColor: 'info10',
        borderBlockStartWidth: 'topWidthDefault',
        borderBlockEndWidth: 'bottomWidthDefault',
        borderInlineStartWidth: 'leftWidthDefault',
        borderInlineEndWidth: 'rightWidthDefault',
      },
      [addStaticValuePrefix('none')]: {
        borderBlockStartColor: addStaticValuePrefix('transparent'),
        borderBlockEndColor: addStaticValuePrefix('transparent'),
        borderInlineStartColor: addStaticValuePrefix('transparent'),
        borderInlineEndColor: addStaticValuePrefix('transparent'),
        borderBlockStartWidth: addStaticValuePrefix('0'),
        borderBlockEndWidth: addStaticValuePrefix('0'),
        borderInlineStartWidth: addStaticValuePrefix('0'),
        borderInlineEndWidth: addStaticValuePrefix('0'),
      },
      [addStaticValuePrefix('initial')]: {
        borderBlockStartColor: addStaticValuePrefix('transparent'),
        borderBlockEndColor: addStaticValuePrefix('transparent'),
        borderInlineStartColor: addStaticValuePrefix('transparent'),
        borderInlineEndColor: addStaticValuePrefix('transparent'),
        borderBlockStartWidth: addStaticValuePrefix('0'),
        borderBlockEndWidth: addStaticValuePrefix('0'),
        borderInlineStartWidth: addStaticValuePrefix('0'),
        borderInlineEndWidth: addStaticValuePrefix('0'),
      },
    },
    {
      borderBlockStartStyle: 'topStyleDefault',
      borderBlockEndStyle: 'bottomStyleDefault',
      borderInlineStartStyle: 'leftStyleDefault',
      borderInlineEndStyle: 'rightStyleDefault',
    },
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
  neutral: true,
  neutralMin: true,
  neutralMax: true,
  error: true,
  errorMin: true,
  errorMax: true,
  warning: true,
  warningMin: true,
  warningMax: true,
  success: true,
  successMin: true,
  successMax: true,
  info: true,
  infoMin: true,
  infoMax: true,
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
  topNeutralColorBase: true,
  bottomNeutralColorBase: true,
  leftNeutralColorBase: true,
  rightNeutralColorBase: true,
  topNeutralColorMin: true,
  bottomNeutralColorMin: true,
  leftNeutralColorMin: true,
  rightNeutralColorMin: true,
  topNeutralColorMax: true,
  bottomNeutralColorMax: true,
  leftNeutralColorMax: true,
  rightNeutralColorMax: true,
  topErrorColorBase: true,
  bottomErrorColorBase: true,
  leftErrorColorBase: true,
  rightErrorColorBase: true,
  topErrorColorMin: true,
  bottomErrorColorMin: true,
  leftErrorColorMin: true,
  rightErrorColorMin: true,
  topErrorColorMax: true,
  bottomErrorColorMax: true,
  leftErrorColorMax: true,
  rightErrorColorMax: true,
  topWarningColorBase: true,
  bottomWarningColorBase: true,
  leftWarningColorBase: true,
  rightWarningColorBase: true,
  topWarningColorMin: true,
  bottomWarningColorMin: true,
  leftWarningColorMin: true,
  rightWarningColorMin: true,
  topWarningColorMax: true,
  bottomWarningColorMax: true,
  leftWarningColorMax: true,
  rightWarningColorMax: true,
  topSuccessColorBase: true,
  bottomSuccessColorBase: true,
  leftSuccessColorBase: true,
  rightSuccessColorBase: true,
  topSuccessColorMin: true,
  bottomSuccessColorMin: true,
  leftSuccessColorMin: true,
  rightSuccessColorMin: true,
  topSuccessColorMax: true,
  bottomSuccessColorMax: true,
  leftSuccessColorMax: true,
  rightSuccessColorMax: true,
  topInfoColorBase: true,
  bottomInfoColorBase: true,
  leftInfoColorBase: true,
  rightInfoColorBase: true,
  topInfoColorMin: true,
  bottomInfoColorMin: true,
  leftInfoColorMin: true,
  rightInfoColorMin: true,
  topInfoColorMax: true,
  bottomInfoColorMax: true,
  leftInfoColorMax: true,
  rightInfoColorMax: true,
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
