import type { FontConfig } from './googleFontsUrl'
import { useFontLoader } from './useFontLoader'

export type { FontConfig } from './googleFontsUrl'
export { getGoogleFontsUrl } from './googleFontsUrl'

export interface FontLoaderProps {
  fontConfig?: FontConfig
}

/**
 * Thin wrapper that loads Google Fonts as a side-effect component.
 * Prefer using the `useFontLoader` hook directly in new code.
 */
export function FontLoader({ fontConfig }: FontLoaderProps): null {
  useFontLoader(fontConfig)
  return null
}
