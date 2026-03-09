import { CharHash } from "../utils"
import { ColorVars, ThemeScale } from "./scales.models"
import { getCssMapFromVars, getPropsFromCssMap, getThemePropsFromCssMap } from "./scales.utils"

/** Generator function for `shadow` theme scale */
export function getShadow<T extends ColorVars>(hash: CharHash, color: T) {
  // LIGHT MODE SHADOWS
  const low = { ...hash.var, value: getLowShadow(color.shadowBase.ref) } as const
  const medium = {
    ...hash.var,
    value: getMediumShadow(color.shadowBase.ref),
  } as const
  const high = {
    ...hash.var,
    value: getHighShadow(color.shadowBase.ref),
  } as const
  const highSoft = {
    ...hash.var,
    value: getHighSoftShadow(color.shadowBase.ref),
  } as const
  const highHeavy = {
    ...hash.var,
    value: getHighHeavyShadow(color.shadowBase.ref),
  } as const

  const vars = {
    low,
    medium,
    high,
    highSoft,
    highHeavy,
  } as const
  const darkVars = {
    low: { ...low, value: `0px 1.5px 2.3px hsl(${color.shadowBase.ref} / .38)` },
    medium: {
      ...medium,
      value: `0px 2.6px 3.9px hsl(${color.shadowBase.ref} / .25),
0px 7.5px 11.3px hsl(${color.shadowBase.ref} / .40)`,
    },
    high: {
      ...high,
      value: `0px 8.6px 12.9px hsl(${color.shadowBase.ref} / .22),
    0px 19.1px 28.7px hsl(${color.shadowBase.ref} / .35),
    0px 40.8px 61.2px hsl(${color.shadowBase.ref} / .55)`,
    },
    highSoft: {
      ...highSoft,
      value: `0px 8.6px 12.9px hsl(${color.shadowBase.ref} / .18),
    0px 19.1px 28.7px hsl(${color.shadowBase.ref} / .30),
    0px 40.8px 61.2px hsl(${color.shadowBase.ref} / .44)`,
    },
    highHeavy: {
      ...highHeavy,
      value: `0px 8.6px 20px hsl(${color.shadowBase.ref} / .2),
    0px 19.1px 50px hsl(${color.shadowBase.ref} / .35),
    0px 40.8px 100px hsl(${color.shadowBase.ref} / .5)`,
    },
  } as const
  const cssValueMap = { ...getCssMapFromVars(vars) } as const
  const themeProps = { ...getThemePropsFromCssMap(cssValueMap) } as const

  return {
    vars,
    darkVars,
    themeProps,
    cssValueMap,
    cssValueMapProps: getPropsFromCssMap(cssValueMap),
  } as ThemeScale<typeof vars, typeof themeProps, typeof cssValueMap>
}

// UTILS //
export function getLowShadow<C extends string>(color: C) {
  return `0px 1px 1.5px hsl(${color} / .18)` as const
}
export function getMediumShadow<C extends string>(color: C) {
  return `0px 1.8px 2.7px hsl(${color} / .08),
0px 5.1px 7.7px hsl(${color} / .16)` as const
}
export function getHighShadow<C extends string>(color: C) {
  return `0px 3.7px 5.6px hsl(${color} / .03),
0px 8px 12px hsl(${color} / .05),
0px 17px 25.5px hsl(${color} / .12)` as const
}
export function getHighSoftShadow<C extends string>(color: C) {
  return `0px 3.7px 5.6px hsl(${color} / .01),
0px 8px 12px hsl(${color} / .02),
0px 17px 25.5px hsl(${color} / .04)` as const
}
export function getHighHeavyShadow<C extends string>(color: C) {
  return `0px 5px 20px hsl(${color} / .04),
0px 10px 50px hsl(${color} / .08),
0px 20px 100px hsl(${color} / .16)` as const
}
