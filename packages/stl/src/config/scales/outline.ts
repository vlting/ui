import { type CharHash, addStaticValuePrefix } from '../utils'
import type { ColorVars, ThemeScale } from './scales.models'
import {
  getAliasMap,
  getCssMapFromVars,
  getPropsFromCssMap,
  getThemePropsFromCssMap,
} from './scales.utils'

/** Generator function for `outline` theme scale */
export function getOutline<T extends ColorVars>(hash: CharHash, color: T) {
  const widthBase = { ...hash.var, value: '2rem' } as const
  const widthMin = { ...hash.var, value: `calc(${widthBase.ref} - 1rem)` } as const
  const widthMax = { ...hash.var, value: `calc(${widthBase.ref} + 2rem)` } as const
  const widthDefault = { ...hash.var, value: widthBase.ref } as const

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
  const infoColorBase = { ...hash.var, value: color.info9.ref } as const
  const infoColorMin = { ...hash.var, value: color.info7.ref } as const
  const infoColorMax = { ...hash.var, value: color.info10.ref } as const
  const successColorBase = { ...hash.var, value: color.success9.ref } as const
  const successColorMin = { ...hash.var, value: color.success7.ref } as const
  const successColorMax = { ...hash.var, value: color.success10.ref } as const
  const warningColorBase = { ...hash.var, value: color.warning9.ref } as const
  const warningColorMin = { ...hash.var, value: color.warning7.ref } as const
  const warningColorMax = { ...hash.var, value: color.warning10.ref } as const

  const offsetBase = { ...hash.var, value: widthBase.ref } as const
  const offsetMin = {
    ...hash.var,
    value: `max(0, calc(${offsetBase.ref}) - 2rem)`,
  } as const
  const offsetMax = { ...hash.var, value: `calc(${offsetBase.ref} + 2rem)` } as const
  const offsetDefault = { ...hash.var, value: offsetBase.ref } as const

  const styleDefault = { ...hash.var, value: 'solid' } as const

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
    neutralColorBase,
    neutralColorMin,
    neutralColorMax,
    errorColorBase,
    errorColorMin,
    errorColorMax,
    infoColorBase,
    infoColorMin,
    infoColorMax,
    successColorBase,
    successColorMin,
    successColorMax,
    warningColorBase,
    warningColorMin,
    warningColorMax,
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
    info: 'info',
    infoMin: 'infoMin',
    infoMax: 'infoMax',
    success: 'success',
    successMin: 'successMin',
    successMax: 'successMax',
    warning: 'warning',
    warningMin: 'warningMin',
    warningMax: 'warningMax',
  } as const

  const { aliasMap, cssAliases } = getAliasMap(
    {
      primary: { outlineColor: 'primaryColorBase' },
      primaryMin: { outlineColor: 'primaryColorMin' },
      primaryMax: { outlineColor: 'primaryColorMax' },
      secondary: { outlineColor: 'secondaryColorBase' },
      secondaryMin: { outlineColor: 'secondaryColorMin' },
      secondaryMax: { outlineColor: 'secondaryColorMax' },
      neutral: { outlineColor: 'neutralColorBase' },
      neutralMin: { outlineColor: 'neutralColorMin' },
      neutralMax: { outlineColor: 'neutralColorMax' },
      error: { outlineColor: 'errorColorBase' },
      errorMin: { outlineColor: 'errorColorMin' },
      errorMax: { outlineColor: 'errorColorMax' },
      info: { outlineColor: 'infoColorBase' },
      infoMin: { outlineColor: 'infoColorMin' },
      infoMax: { outlineColor: 'infoColorMax' },
      success: { outlineColor: 'successColorBase' },
      successMin: { outlineColor: 'successColorMin' },
      successMax: { outlineColor: 'successColorMax' },
      warning: { outlineColor: 'warningColorBase' },
      warningMin: { outlineColor: 'warningColorMin' },
      warningMax: { outlineColor: 'warningColorMax' },
      [addStaticValuePrefix('none')]: {
        outlineColor: addStaticValuePrefix('transparent'),
      },
      [addStaticValuePrefix('initial')]: {
        outlineColor: addStaticValuePrefix('transparent'),
      },
    },
    {
      outlineWidth: 'widthDefault',
      outlineStyle: 'styleDefault',
      outlineOffset: 'offsetDefault',
    },
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
  neutral: true,
  neutralMin: true,
  neutralMax: true,
  error: true,
  errorMin: true,
  errorMax: true,
  info: true,
  infoMin: true,
  infoMax: true,
  success: true,
  successMin: true,
  successMax: true,
  warning: true,
  warningMin: true,
  warningMax: true,
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
  neutralColor: true,
  neutralColorBase: true,
  neutralColorMin: true,
  neutralColorMax: true,
  errorColor: true,
  errorColorBase: true,
  errorColorMin: true,
  errorColorMax: true,
  infoColor: true,
  infoColorBase: true,
  infoColorMin: true,
  infoColorMax: true,
  successColor: true,
  successColorBase: true,
  successColorMin: true,
  successColorMax: true,
  warningColor: true,
  warningColorBase: true,
  warningColorMin: true,
  warningColorMax: true,
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
