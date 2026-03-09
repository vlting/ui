import { CharHash } from "../utils"
import { ThemeScale } from "./scales.models"
import { getCssMapFromVars, getPropsFromCssMap, getThemePropsFromCssMap } from "./scales.utils"

/** Generator function for `zIndex` theme scale */
export function getZIndex(hash: CharHash) {
  const vars = {
    0: { ...hash.var, value: "0" },
    1: { ...hash.var, value: "10" },
    2: { ...hash.var, value: "50" },
    3: { ...hash.var, value: "100" },
    4: { ...hash.var, value: "200" },
    5: { ...hash.var, value: "300" },
    6: { ...hash.var, value: "400" },
    7: { ...hash.var, value: "500" },
    8: { ...hash.var, value: "600" },
    9: { ...hash.var, value: "700" },
    10: { ...hash.var, value: "800" },
    11: { ...hash.var, value: "900" },
    12: { ...hash.var, value: "1000" },
    min: { ...hash.var, value: "-1" },
    max: { ...hash.var, value: "9999" },
  } as const

  const cssValueMap = { ...getCssMapFromVars(vars) } as const
  const themeProps = { ...getThemePropsFromCssMap(cssValueMap) } as const

  return {
    vars,
    themeProps,
    cssValueMap,
    cssValueMapProps: getPropsFromCssMap(cssValueMap),
  } as ThemeScale<typeof vars, typeof themeProps, typeof cssValueMap>
}
