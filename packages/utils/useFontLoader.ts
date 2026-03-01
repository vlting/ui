import { useEffect, useRef } from 'react'
import type { BrandFontConfig } from './googleFontsUrl'
import { getGoogleFontsUrl } from './googleFontsUrl'

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface FontLoadState {
  loaded: boolean
  error: Error | null
}

// ---------------------------------------------------------------------------
// CSS.escape fallback
// ---------------------------------------------------------------------------

const cssEscape =
  typeof CSS !== 'undefined' && CSS.escape
    ? CSS.escape
    : (s: string) => s.replace(/["\\]/g, '\\$&')

// ---------------------------------------------------------------------------
// useFontLoader (web)
//
// Injects a <link rel="stylesheet"> for Google Fonts into <head>.
// Returns { loaded: true } immediately — the CSS uses `display=swap`
// so text renders with fallback fonts until the web font arrives.
// ---------------------------------------------------------------------------

export function useFontLoader(fontConfig?: BrandFontConfig): FontLoadState {
  const linkRef = useRef<HTMLLinkElement | null>(null)

  useEffect(() => {
    if (typeof document === 'undefined' || !fontConfig) return

    const url = getGoogleFontsUrl(fontConfig)
    if (!url) return

    const existing = document.querySelector(
      `link[href="${cssEscape(url)}"]`,
    )
    if (existing) {
      linkRef.current = existing as HTMLLinkElement
      return
    }

    const link = document.createElement('link')
    link.rel = 'stylesheet'
    link.href = url
    link.dataset.vltFonts = 'true'
    document.head.appendChild(link)
    linkRef.current = link

    return () => {
      if (linkRef.current?.dataset.vltFonts && linkRef.current.parentNode) {
        linkRef.current.parentNode.removeChild(linkRef.current)
        linkRef.current = null
      }
    }
  }, [fontConfig])

  // Web always reports loaded — display=swap handles the swap visually
  return { loaded: true, error: null }
}
