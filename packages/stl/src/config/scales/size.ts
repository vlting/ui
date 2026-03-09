import { CharHash } from "../utils"
import { ThemeScale } from "./scales.models"
import { getCssMapFromVars, getPropsFromCssMap, getThemePropsFromCssMap } from "./scales.utils"

/** Generator function for `size` theme scale */
export function getSize(hash: CharHash) {
  const base = { ...hash.var, value: "4rem" } as const

  const sharedVars = {
    0: { ...hash.var, value: "0" },
    1: { ...hash.var, value: "1rem" },
    2: { ...hash.var, value: `calc(${base.ref} / 2)` },
    4: { ...hash.var, value: base.ref },
    8: { ...hash.var, value: `calc(${base.ref} * 2)` },
    12: { ...hash.var, value: `calc(${base.ref} * 3)` },
    16: { ...hash.var, value: `calc(${base.ref} * 4)` },
    20: { ...hash.var, value: `calc(${base.ref} * 5)` },
    24: { ...hash.var, value: `calc(${base.ref} * 6)` },
    32: { ...hash.var, value: `calc(${base.ref} * 8)` },
    40: { ...hash.var, value: `calc(${base.ref} * 10)` },
    56: { ...hash.var, value: `calc(${base.ref} * 14)` },
    80: { ...hash.var, value: `calc(${base.ref} * 20)` },
    120: { ...hash.var, value: `calc(${base.ref} * 30)` },
    200: { ...hash.var, value: `calc(${base.ref} * 50)` },
    320: { ...hash.var, value: `calc(${base.ref} * 80)` },
    480: { ...hash.var, value: `calc(${base.ref} * 120)` },
    640: { ...hash.var, value: `calc(${base.ref} * 160)` },
    buttonTactileHighlight: { ...hash.var, value: "1rem" },
    buttonTactileShadow: { ...hash.var, value: "4rem" },
  } as const

  const vars = { ...sharedVars, base } as const
  const cssValueMap = { ...getCssMapFromVars(sharedVars) } as const
  const themeProps = { ...getThemePropsFromCssMap(cssValueMap) } as const

  return {
    vars,
    themeProps,
    cssValueMap,
    cssValueMapProps: getPropsFromCssMap(cssValueMap),
  } as ThemeScale<typeof vars, typeof themeProps, typeof cssValueMap>
}
