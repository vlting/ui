import { CharHash } from "../utils"
import { BaseVars, ThemeScale } from "./scales.models"
import { getPropsFromCssMap, getThemePropsFromCssMap } from "./scales.utils"

/** Generator function for `column` theme scale */
export function getColumn<T extends BaseVars>(hash: CharHash, size: T) {
  const base = { ...hash.var, value: size.base.ref } as const
  const repeaterMin = { ...hash.var, value: "0" } as const

  const c40 = { ...hash.var, value: `calc(${base.ref} * 10)` } as const
  const c80 = { ...hash.var, value: `calc(${base.ref} * 20)` } as const
  const c120 = { ...hash.var, value: `calc(${base.ref} * 30)` } as const
  const c200 = { ...hash.var, value: `calc(${base.ref} * 50)` } as const
  const c320 = { ...hash.var, value: `calc(${base.ref} * 80)` } as const

  const vars = { base, repeaterMin, 40: c40, 80: c80, 120: c120, 200: c200, 320: c320 } as const
  const cssValueMap = {
    1: `repeat(1, minmax(${repeaterMin.ref}, 1fr))`,
    2: `repeat(2, minmax(${repeaterMin.ref}, 1fr))`,
    3: `repeat(3, minmax(${repeaterMin.ref}, 1fr))`,
    4: `repeat(4, minmax(${repeaterMin.ref}, 1fr))`,
    5: `repeat(5, minmax(${repeaterMin.ref}, 1fr))`,
    6: `repeat(6, minmax(${repeaterMin.ref}, 1fr))`,
    7: `repeat(7, minmax(${repeaterMin.ref}, 1fr))`,
    8: `repeat(8, minmax(${repeaterMin.ref}, 1fr))`,
    9: `repeat(9, minmax(${repeaterMin.ref}, 1fr))`,
    10: `repeat(10, minmax(${repeaterMin.ref}, 1fr))`,
    11: `repeat(11, minmax(${repeaterMin.ref}, 1fr))`,
    12: `repeat(12, minmax(${repeaterMin.ref}, 1fr))`,
    fill40: `repeat(auto-fill, minmax(${c40.ref}, 1fr))`,
    fill80: `repeat(auto-fill, minmax(${c80.ref}, 1fr))`,
    fill120: `repeat(auto-fill, minmax(${c120.ref}, 1fr))`,
    fill200: `repeat(auto-fill, minmax(${c200.ref}, 1fr))`,
    fill320: `repeat(auto-fill, minmax(${c320.ref}, 1fr))`,
    fit40: `repeat(auto-fit, minmax(${c40.ref}, 1fr))`,
    fit80: `repeat(auto-fit, minmax(${c80.ref}, 1fr))`,
    fit120: `repeat(auto-fit, minmax(${c120.ref}, 1fr))`,
    fit200: `repeat(auto-fit, minmax(${c200.ref}, 1fr))`,
    fit320: `repeat(auto-fit, minmax(${c320.ref}, 1fr))`,
  } as const
  const themeProps = { ...getThemePropsFromCssMap(cssValueMap) } as const

  return {
    vars,
    themeProps,
    cssValueMap,
    cssValueMapProps: getPropsFromCssMap(cssValueMap),
  } as ThemeScale<typeof vars, typeof themeProps, typeof cssValueMap>
}
