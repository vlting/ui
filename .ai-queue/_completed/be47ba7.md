<!-- auto-queue -->
<!-- target-branch: feat/token-audit-fonts/font-system-foundation -->

# Commit History
- `4587cfb` feat(token-audit-fonts): add FontLoader component and Google Fonts URL builder
- `be47ba7` feat(token-audit-fonts): merge segment 002 — FontLoader component

# Segment 2: Create FontLoader component

**Epic:** #12 | **Stage:** #13 (Font System Foundation)

## Scope
- `packages/utils/FontLoader.tsx` (new file)

## Instructions

Create a new file `packages/utils/FontLoader.tsx` that provides Google Fonts loading for web.

### 1. Create `getGoogleFontsUrl` helper

```typescript
import type { BrandFontConfig } from '../design-tokens/brands'
```

Write a function that:
- Accepts a `BrandFontConfig`
- Collects all unique font families and their required weights
- Builds a Google Fonts CSS2 API URL
- Uses `display=swap` for FOUT prevention

```typescript
export function getGoogleFontsUrl(config: BrandFontConfig): string {
  // Collect all unique families and their weights
  const familyWeights = new Map<string, Set<number>>()

  const addFamily = (family: string, weights: number[]) => {
    // Skip system font stacks (they contain commas in the primary family name
    // or start with common system font names)
    if (isSystemFont(family)) return
    const existing = familyWeights.get(family) ?? new Set()
    for (const w of weights) existing.add(w)
    familyWeights.set(family, existing)
  }

  // Heading: needs both heavy and light weights
  addFamily(config.heading.family, [
    config.heading.weights.heavy,
    config.heading.weights.light,
  ])

  // Body
  addFamily(config.body.family, [config.body.weight])

  // Mono
  addFamily(config.mono.family, [config.mono.weight])

  // Quote — include italic variant if style is italic
  const quoteWeights = [config.quote.weight]
  addFamily(config.quote.family, quoteWeights)

  if (familyWeights.size === 0) return ''

  // Build Google Fonts CSS2 URL
  // Format: https://fonts.googleapis.com/css2?family=Inter:ital,wght@0,400;0,700&family=...&display=swap
  const familyParams = Array.from(familyWeights.entries())
    .map(([family, weights]) => {
      const sortedWeights = Array.from(weights).sort((a, b) => a - b)
      const encodedFamily = family.replace(/ /g, '+')

      // Check if this family needs italic (used by quote font)
      const needsItalic =
        config.quote.family === family &&
        (config.quote.style ?? 'italic') === 'italic'

      if (needsItalic) {
        // Include both normal and italic variants
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

function isSystemFont(family: string): boolean {
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
    'Inter',  // Inter is a system-installed font on many platforms; skip Google Fonts for it
  ]
  // A family is "system" if its primary name (before any comma) matches
  return systemFonts.some(
    (sf) => family.toLowerCase() === sf.toLowerCase()
  )
}
```

**Important decision about Inter:** Inter is bundled with many modern OSes and is a common default. Include it in the `isSystemFont` list so it doesn't trigger a Google Fonts load unless the brand explicitly needs Google Fonts for other families. If the consumer wants to force-load Inter from Google Fonts, they can use the low-level `fonts` override API.

Actually, on reconsideration: **do NOT include Inter in systemFonts**. Users who specify `family: 'Inter'` in their `fontConfig` intend for it to load via Google Fonts for consistency. Only skip truly generic/system stack names. Remove `'Inter'` from the list.

### 2. Create `FontLoader` component

```typescript
import { useEffect, useRef } from 'react'

export interface FontLoaderProps {
  fontConfig?: BrandFontConfig
}

export function FontLoader({ fontConfig }: FontLoaderProps): null {
  const linkRef = useRef<HTMLLinkElement | null>(null)

  useEffect(() => {
    // Only run on web (document exists)
    if (typeof document === 'undefined' || !fontConfig) return

    const url = getGoogleFontsUrl(fontConfig)
    if (!url) return

    // Check if a link with this exact href already exists (idempotent)
    const existing = document.querySelector(`link[href="${CSS.escape(url)}"]`)
    if (existing) {
      linkRef.current = existing as HTMLLinkElement
      return
    }

    // Create and inject the link element
    const link = document.createElement('link')
    link.rel = 'stylesheet'
    link.href = url
    link.dataset.vltFonts = 'true'  // Mark for easy identification
    document.head.appendChild(link)
    linkRef.current = link

    // Cleanup on unmount
    return () => {
      if (linkRef.current?.dataset.vltFonts && linkRef.current.parentNode) {
        linkRef.current.parentNode.removeChild(linkRef.current)
        linkRef.current = null
      }
    }
  }, [fontConfig])

  return null
}
```

**Key behaviors:**
- Returns `null` (renders nothing) — it's a side-effect-only component
- On React Native (`typeof document === 'undefined'`): no-op
- Idempotent: checks for existing `<link>` with the same href before creating
- Cleanup: removes the `<link>` on unmount (only if it was created by us, identified by `data-vlt-fonts`)
- Depends on `fontConfig` reference — if the config object changes, the effect re-runs

### 3. Use `CSS.escape` safely

`CSS.escape` may not exist in all environments. Add a fallback:

```typescript
// At the top of the file, after imports
const cssEscape = typeof CSS !== 'undefined' && CSS.escape
  ? CSS.escape
  : (s: string) => s.replace(/["\\]/g, '\\$&')
```

Then use `cssEscape(url)` instead of `CSS.escape(url)` in the querySelector.

## Verification

- File compiles with no TypeScript errors
- `getGoogleFontsUrl` produces valid Google Fonts CSS2 URLs
- System fonts (Georgia, monospace, etc.) are excluded from the URL
- Italic variants are included for the quote font when `style: 'italic'`
- `FontLoader` component returns `null`
- `FontLoader` is a no-op when `typeof document === 'undefined'`
- `FontLoader` doesn't duplicate `<link>` elements on re-render

## Task Progress
<!-- lat: 2026-03-01T21:34:00Z -->
<!-- agent-pid: 20571 -->
<!-- worktree: .worktrees/q-002 -->
<!-- branch: q/002 -->

### Checklist
- [x] Created worktree from target branch
- [x] Created FontLoader.tsx with all components (getGoogleFontsUrl, FontLoader, cssEscape fallback)
- [x] TypeScript compiles cleanly
- [ ] **ACTIVE** → Commit, rebase, and merge

### Handoff Context
- Target branch: feat/token-audit-fonts/font-system-foundation
- Created: packages/utils/FontLoader.tsx
- BrandFontConfig defined locally to avoid dependency on segment 001 (integration segment 004 will consolidate)
