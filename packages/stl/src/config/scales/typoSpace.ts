import { CharHash } from "../utils"
import { ThemeScale } from "./scales.models"
import { getCssMapFromVars, getPropsFromCssMap, getThemePropsFromCssMap } from "./scales.utils"

/** Generator function for `typoSpace` theme scale */
export function getTypoSpace(hash: CharHash) {
  const emBase = { ...hash.var, value: "0em" } as const
  const remBase = { ...hash.var, value: "0rem" } as const
  const chBase = { ...hash.var, value: "0ch" } as const

  const sharedVars = {
    emBase,
    emMin: { ...hash.var, value: `calc(${emBase.ref} - .1em)` },
    emMax: { ...hash.var, value: `calc(${emBase.ref} + .1em)` },
    remBase,
    remMin: { ...hash.var, value: `calc(${remBase.ref} - 1.5rem)` },
    remMax: { ...hash.var, value: `calc(${remBase.ref} + 1.5rem)` },
    chBase,
    chMin: { ...hash.var, value: `calc(${chBase.ref} - .15ch)` },
    chMax: { ...hash.var, value: `calc(${chBase.ref} + .15ch)` },

    tightest: { ...hash.var, value: `calc(${remBase.ref} - .67rem)` },
    tight: { ...hash.var, value: `calc(${remBase.ref} - .33rem)` },
    regular: { ...hash.var, value: remBase.ref },
    loose: { ...hash.var, value: `calc(${remBase.ref} + .5rem)` },
    loosest: { ...hash.var, value: `calc(${remBase.ref} + .75rem)` },
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
