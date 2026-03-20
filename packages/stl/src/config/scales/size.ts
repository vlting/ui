import type { CharHash } from '../utils'
import type { ThemeScale } from './scales.models'
import {
  getCssMapFromVars,
  getPropsFromCssMap,
  getThemePropsFromCssMap,
} from './scales.utils'

/** Generator function for `size` theme scale */
export function getSize(hash: CharHash) {
  const base = { ...hash.var, value: '4rem' } as const

  const sharedVars = {
    0: { ...hash.var, value: '0' },
    1: { ...hash.var, value: '1rem' },
    2: { ...hash.var, value: `calc(${base.ref} / 2)` },
    4: { ...hash.var, value: base.ref },
    6: { ...hash.var, value: `calc(${base.ref} * 1.5)` },
    8: { ...hash.var, value: `calc(${base.ref} * 2)` },
    12: { ...hash.var, value: `calc(${base.ref} * 3)` },
    16: { ...hash.var, value: `calc(${base.ref} * 4)` },
    20: { ...hash.var, value: `calc(${base.ref} * 5)` },
    24: { ...hash.var, value: `calc(${base.ref} * 6)` },
    28: { ...hash.var, value: `calc(${base.ref} * 7)` },
    32: { ...hash.var, value: `calc(${base.ref} * 8)` },
    36: { ...hash.var, value: `calc(${base.ref} * 9)` },
    40: { ...hash.var, value: `calc(${base.ref} * 10)` },
    44: { ...hash.var, value: `calc(${base.ref} * 11)` },
    48: { ...hash.var, value: `calc(${base.ref} * 12)` },
    52: { ...hash.var, value: `calc(${base.ref} * 13)` },
    56: { ...hash.var, value: `calc(${base.ref} * 14)` },
    64: { ...hash.var, value: `calc(${base.ref} * 16)` },
    72: { ...hash.var, value: `calc(${base.ref} * 18)` },
    80: { ...hash.var, value: `calc(${base.ref} * 20)` },
    96: { ...hash.var, value: `calc(${base.ref} * 24)` },
    120: { ...hash.var, value: `calc(${base.ref} * 30)` },
    200: { ...hash.var, value: `calc(${base.ref} * 50)` },
    320: { ...hash.var, value: `calc(${base.ref} * 80)` },
    480: { ...hash.var, value: `calc(${base.ref} * 120)` },
    640: { ...hash.var, value: `calc(${base.ref} * 160)` },
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
