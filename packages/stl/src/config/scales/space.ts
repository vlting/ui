import type { CharHash } from '../utils'
import type { BaseVars, ThemeScale } from './scales.models'
import {
  getCssMapFromVars,
  getPropsFromCssMap,
  getThemePropsFromCssMap,
} from './scales.utils'

/** Generator function for `space` theme scale */
export function getSpace<T extends BaseVars>(hash: CharHash, size: T) {
  const base = { ...hash.var, value: size.base.ref } as const
  const size4 = { ...hash.var, value: base.ref } as const
  const size8 = { ...hash.var, value: `calc(${base.ref} * 2)` } as const
  const size12 = { ...hash.var, value: `calc(${base.ref} * 3)` } as const

  const sharedVars = {
    0: { ...hash.var, value: '0' },
    1: { ...hash.var, value: '1rem' },
    2: { ...hash.var, value: `calc(${base.ref} / 2)` },
    4: size4,
    6: { ...hash.var, value: `calc(${base.ref} * 1.5)` },
    8: size8,
    10: { ...hash.var, value: `calc(${base.ref} * 2.5)` },
    12: size12,
    16: { ...hash.var, value: `calc(${base.ref} * 4)` },
    20: { ...hash.var, value: `calc(${base.ref} * 5)` },
    24: { ...hash.var, value: `calc(${base.ref} * 6)` },
    28: { ...hash.var, value: `calc(${base.ref} * 7)` },
    32: { ...hash.var, value: `calc(${base.ref} * 8)` },
    36: { ...hash.var, value: `calc(${base.ref} * 9)` },
    40: { ...hash.var, value: `calc(${base.ref} * 10)` },
    48: { ...hash.var, value: `calc(${base.ref} * 12)` },
    56: { ...hash.var, value: `calc(${base.ref} * 14)` },
    64: { ...hash.var, value: `calc(${base.ref} * 16)` },
    80: { ...hash.var, value: `calc(${base.ref} * 20)` },
    96: { ...hash.var, value: `calc(${base.ref} * 24)` },
    120: { ...hash.var, value: `calc(${base.ref} * 30)` },
    // Component
    buttonBasePy: { ...hash.var, value: size4.ref },
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
