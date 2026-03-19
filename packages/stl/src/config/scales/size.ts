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
    74: { ...hash.var, value: `calc(${base.ref} * 18.5)` },
    80: { ...hash.var, value: `calc(${base.ref} * 20)` },
    84: { ...hash.var, value: `calc(${base.ref} * 21)` },
    94: { ...hash.var, value: `calc(${base.ref} * 23.5)` },
    96: { ...hash.var, value: `calc(${base.ref} * 24)` },
    104: { ...hash.var, value: `calc(${base.ref} * 26)` },
    120: { ...hash.var, value: `calc(${base.ref} * 30)` },
    124: { ...hash.var, value: `calc(${base.ref} * 31)` },
    148: { ...hash.var, value: `calc(${base.ref} * 37)` },
    178: { ...hash.var, value: `calc(${base.ref} * 44.5)` },
    200: { ...hash.var, value: `calc(${base.ref} * 50)` },
    214: { ...hash.var, value: `calc(${base.ref} * 53.5)` },
    258: { ...hash.var, value: `calc(${base.ref} * 64.5)` },
    310: { ...hash.var, value: `calc(${base.ref} * 77.5)` },
    320: { ...hash.var, value: `calc(${base.ref} * 80)` },
    480: { ...hash.var, value: `calc(${base.ref} * 120)` },
    640: { ...hash.var, value: `calc(${base.ref} * 160)` },
    // vlt-ui fractional key aliases
    0.25: { ...hash.var, value: `calc(${base.ref} / 2)` },
    0.5: { ...hash.var, value: base.ref },
    0.75: { ...hash.var, value: `calc(${base.ref} * 2)` },
    1.5: { ...hash.var, value: `calc(${base.ref} * 6)` },
    2.5: { ...hash.var, value: `calc(${base.ref} * 8)` },
    3.5: { ...hash.var, value: `calc(${base.ref} * 10)` },
    4.5: { ...hash.var, value: `calc(${base.ref} * 12)` },
    // vlt-ui semantic sizes
    sidebar: { ...hash.var, value: '256rem' },
    sidebarCollapsed: { ...hash.var, value: '48rem' },
    drawer: { ...hash.var, value: '360rem' },
    dialogSm: { ...hash.var, value: '400rem' },
    dialogMd: { ...hash.var, value: '500rem' },
    dialogLg: { ...hash.var, value: '640rem' },
    menuMin: { ...hash.var, value: '192rem' },
    // Component
    buttonTactileHighlight: { ...hash.var, value: '1rem' },
    buttonTactileShadow: { ...hash.var, value: '4rem' },
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
