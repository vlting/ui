import type { CharHash } from '../utils'
import type { ThemeScale } from './scales.models'
import {
  getCssMapFromVars,
  getPropsFromCssMap,
  getThemePropsFromCssMap,
} from './scales.utils'

/** Generator function for `radius` theme scale */
export function getRadius(hash: CharHash) {
  const base = { ...hash.var, value: '4rem' } as const
  const field = { ...hash.var, value: base.ref } as const
  const rounded = { ...hash.var, value: `max(${field.ref}, 4rem)` } as const

  const sharedVars = {
    0: { ...hash.var, value: '0' },
    1: { ...hash.var, value: '1rem' },
    2: { ...hash.var, value: `calc(${base.ref} * .5)` },
    3: { ...hash.var, value: `calc(${base.ref} * .75)` },
    4: { ...hash.var, value: base.ref },
    5: { ...hash.var, value: `calc(${base.ref} * 1.25)` },
    6: { ...hash.var, value: `calc(${base.ref} * 1.5)` },
    7: { ...hash.var, value: `calc(${base.ref} * 1.75)` },
    8: { ...hash.var, value: `calc(${base.ref} * 2)` },
    9: { ...hash.var, value: `calc(${base.ref} * 2.25)` },
    10: { ...hash.var, value: `calc(${base.ref} * 2.5)` },
    11: { ...hash.var, value: `calc(${base.ref} * 2.75)` },
    12: { ...hash.var, value: `calc(${base.ref} * 3)` },
    16: { ...hash.var, value: `calc(${base.ref} * 4)` },
    19: { ...hash.var, value: `calc(${base.ref} * 4.75)` },
    22: { ...hash.var, value: `calc(${base.ref} * 5.5)` },
    24: { ...hash.var, value: `calc(${base.ref} * 6)` },
    26: { ...hash.var, value: `calc(${base.ref} * 6.5)` },
    32: { ...hash.var, value: `calc(${base.ref} * 8)` },
    34: { ...hash.var, value: `calc(${base.ref} * 8.5)` },
    40: { ...hash.var, value: `calc(${base.ref} * 10)` },
    42: { ...hash.var, value: `calc(${base.ref} * 10.5)` },
    50: { ...hash.var, value: `calc(${base.ref} * 12.5)` },
    80: { ...hash.var, value: `calc(${base.ref} * 20)` },
    // Shapes
    rectangular: { ...hash.var, value: '0' },
    round: { ...hash.var, value: '50%' },
    pill: { ...hash.var, value: '400rem' },
    full: { ...hash.var, value: '9999rem' },
    rounded,
    // Component
    field,
    button: { ...hash.var, value: field.ref },
    card: { ...hash.var, value: `calc(${base.ref} * 2)` },
    badge: { ...hash.var, value: '9999rem' },
    tooltip: { ...hash.var, value: rounded.ref },
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
