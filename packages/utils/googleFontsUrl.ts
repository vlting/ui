// ---------------------------------------------------------------------------
// Shared Google Fonts utilities (platform-independent)
// ---------------------------------------------------------------------------

/**
 * High-level 4-slot font configuration.
 * Canonical type also lives in `packages/design-tokens/brands/index.ts`.
 * Duplicated here to avoid circular dependency between utils ↔ design-tokens.
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

export function isSystemFont(family: string): boolean {
  return systemFonts.some((sf) => family.toLowerCase() === sf.toLowerCase())
}

// ---------------------------------------------------------------------------
// Extract unique non-system families from a BrandFontConfig
// ---------------------------------------------------------------------------

export function extractFamiliesFromConfig(config: BrandFontConfig): string[] {
  const families = new Set<string>()
  for (const family of [
    config.heading.family,
    config.body.family,
    config.mono.family,
    config.quote.family,
  ]) {
    if (!isSystemFont(family)) families.add(family)
  }
  return Array.from(families)
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
