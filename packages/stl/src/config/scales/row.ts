import { CharHash } from "../utils"
import { BaseVars, ThemeScale } from "./scales.models"
import { getCssMapFromVars, getPropsFromCssMap, getThemePropsFromCssMap } from "./scales.utils"

/** Generator function for `row` theme scale */
export function getRow<T extends BaseVars>(hash: CharHash, column: T) {
  const sharedVars = {
    40: { ...hash.var, value: column[40].ref },
    80: { ...hash.var, value: column[80].ref },
    120: { ...hash.var, value: column[120].ref },
    200: { ...hash.var, value: column[200].ref },
    320: { ...hash.var, value: column[320].ref },
  } as const

  const vars = sharedVars
  const cssValueMap = { ...getCssMapFromVars(sharedVars) } as const
  const themeProps = { ...getThemePropsFromCssMap(cssValueMap) } as const

  return {
    vars,
    themeProps,
    cssValueMap,
    cssValueMapProps: getPropsFromCssMap(cssValueMap),
  } as ThemeScale<typeof vars, typeof themeProps, typeof cssValueMap>
}
