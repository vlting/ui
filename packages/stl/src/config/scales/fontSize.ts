import { CharHash } from "../utils"
import { ThemeScale } from "./scales.models"
import { getCssMapFromVars, getPropsFromCssMap, getThemePropsFromCssMap } from "./scales.utils"

/** Generator function for `fontSize` theme scale */
export function getFontSize(hash: CharHash) {
  const base = { ...hash.var, value: "16rem" } as const
  const baseVars = {
    12: { ...hash.var, value: `calc(${base.ref} - 4rem)` },
    13: { ...hash.var, value: `calc(${base.ref} - 3rem)` },
    14: { ...hash.var, value: `calc(${base.ref} - 2rem)` },
    15: { ...hash.var, value: `calc(${base.ref} - 1rem)` },
    16: { ...hash.var, value: base.ref },
    17: { ...hash.var, value: `calc(${base.ref} + 1rem)` },
    18: { ...hash.var, value: `calc(${base.ref} + 2rem)` },
    21: { ...hash.var, value: `calc(${base.ref} + 5rem)` },
    25: { ...hash.var, value: `calc(${base.ref} + 9rem)` },
    30: { ...hash.var, value: `calc(${base.ref} + 14rem)` },
    36: { ...hash.var, value: `calc(${base.ref} + 20rem)` },
    44: { ...hash.var, value: `calc(${base.ref} + 28rem)` },
    56: { ...hash.var, value: `calc(${base.ref} + 40rem)` },
    72: { ...hash.var, value: `calc(${base.ref} + 56rem)` },
  } as const

  const h2 = { ...hash.var, value: baseVars[30].ref } as const
  const p = { ...hash.var, value: baseVars[16].ref } as const
  const field = { ...hash.var, value: p.ref } as const
  const button = { ...hash.var, value: field.ref } as const

  const sharedVars = {
    ...baseVars,
    // Typo elements
    h1: { ...hash.var, value: baseVars[44].ref },
    h2,
    h3: { ...hash.var, value: baseVars[21].ref },
    h4: { ...hash.var, value: baseVars[21].ref },
    h5: { ...hash.var, value: baseVars[18].ref },
    h6: { ...hash.var, value: baseVars[16].ref },
    p,
    code: { ...hash.var, value: p.ref },
    quote: { ...hash.var, value: h2.ref },
    // Components
    field,
    button,
    fieldTiny: { ...hash.var, value: `calc(${field.ref} * .8)` },
    fieldSmall: { ...hash.var, value: `calc(${field.ref} * .9)` },
    fieldLarge: { ...hash.var, value: `calc(${field.ref} * 1.25)` },
    buttonTiny: { ...hash.var, value: `calc(${button.ref} * .8)` },
    buttonSmall: { ...hash.var, value: `calc(${button.ref} * .9)` },
    buttonLarge: { ...hash.var, value: `calc(${button.ref} * 1.25)` },
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
