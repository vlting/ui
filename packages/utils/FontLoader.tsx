import { useEffect, useRef } from 'react'

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

/**
 * High-level 4-slot font configuration.
 * Locally defined to avoid a circular dependency on segment 001.
 * The canonical type lives in `packages/design-tokens/brands/index.ts`
 * as `BrandFontConfig` — the integration segment (004) will consolidate
 * this import once all segments are merged.
 */
export interface BrandFontConfig {
  heading: {
    family: string
    fallback?: string
    weights: { heavy: number; light: number }
  }
  body: {
    family: string
    fallback?: string
    weight: number
  }
  mono: {
    family: string
    fallback?: string
    weight: number
  }
  quote: {
    family: string
    fallback?: string
    weight: number
    style?: 'normal' | 'italic'
  }
}

// ---------------------------------------------------------------------------
// CSS.escape fallback
// ---------------------------------------------------------------------------

const cssEscape =
  typeof CSS !== 'undefined' && CSS.escape
    ? CSS.escape
    : (s: string) => s.replace(/["\\]/g, '\\$&')

// ---------------------------------------------------------------------------
// System font detection
// ---------------------------------------------------------------------------

const systemFonts = [
  'system-ui',
  '-apple-system',
  'BlinkMacSystemFont',
  'Segoe UI',
  'Roboto',
  'Helvetica',
  'Arial',
  'sans-serif',
  'serif',
  'monospace',
  'ui-monospace',
  'SFMono-Regular',
  'SF Mono',
  'Menlo',
  'Consolas',
  'Georgia',
  'Times New Roman',
]

function isSystemFont(family: string): boolean {
  return systemFonts.some((sf) => family.toLowerCase() === sf.toLowerCase())
}

// ---------------------------------------------------------------------------
// Google Fonts URL builder
// ---------------------------------------------------------------------------

export function getGoogleFontsUrl(config: BrandFontConfig): string {
  const familyWeights = new Map<string, Set<number>>()

  const addFamily = (family: string, weights: number[]) => {
    if (isSystemFont(family)) return
    const existing = familyWeights.get(family) ?? new Set()
    for (const w of weights) existing.add(w)
    familyWeights.set(family, existing)
  }

  addFamily(config.heading.family, [
    config.heading.weights.heavy,
    config.heading.weights.light,
  ])
  addFamily(config.body.family, [config.body.weight])
  addFamily(config.mono.family, [config.mono.weight])
  addFamily(config.quote.family, [config.quote.weight])

  if (familyWeights.size === 0) return ''

  const familyParams = Array.from(familyWeights.entries())
    .map(([family, weights]) => {
      const sortedWeights = Array.from(weights).sort((a, b) => a - b)
      const encodedFamily = family.replace(/ /g, '+')

      const needsItalic =
        config.quote.family === family &&
        (config.quote.style ?? 'italic') === 'italic'

      if (needsItalic) {
        const specs = sortedWeights
          .flatMap((w) => [`0,${w}`, `1,${w}`])
          .join(';')
        return `family=${encodedFamily}:ital,wght@${specs}`
      }

      const specs = sortedWeights.join(';')
      return `family=${encodedFamily}:wght@${specs}`
    })
    .join('&')

  return `https://fonts.googleapis.com/css2?${familyParams}&display=swap`
}

// ---------------------------------------------------------------------------
// FontLoader component
// ---------------------------------------------------------------------------

export interface FontLoaderProps {
  fontConfig?: BrandFontConfig
}

export function FontLoader({ fontConfig }: FontLoaderProps): null {
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

  return null
}
