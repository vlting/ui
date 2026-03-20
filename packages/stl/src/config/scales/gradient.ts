import type { CharHash } from '../utils'
import type { ThemeScale } from './scales.models'
import {
  getCssMapFromVars,
  getPropsFromCssMap,
  getThemePropsFromCssMap,
} from './scales.utils'

/** Generator function for `gradient` theme scale */
export function getGradient(hash: CharHash) {
  const vars = {
    gradientPrimary: { ...hash.var, value: 'var(--stl-gradient-primary, none)' },
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

// FILTER KEYS ////////////////////////////////////////////////////////////////

export const gradients = {
  gradientPrimary: true,
} as const
