<!-- auto-queue -->
<!-- target-branch: feat/token-audit-fonts/font-system-foundation -->

# Commit History
- `e67a32c` — feat(design-tokens): add BrandFontConfig, quote font, and heading weight alternation
- `1e6fee1` — Merge q/001 into feat/token-audit-fonts/font-system-foundation

# Segment 1: Extend brand types, add quote font, implement heading weight alternation

**Epic:** #12 | **Stage:** #13 (Font System Foundation)

## Scope
- `packages/design-tokens/brands/index.ts`

## Instructions

Modify `packages/design-tokens/brands/index.ts` to add the 4-slot font config system with heading weight alternation and a quote font.

### 1. Add `BrandFontConfig` interface

Add this new interface BEFORE the `FontOverrides` interface (around line 43):

```typescript
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
```

### 2. Update `FontOverrides` to add `quote` slot

```typescript
export interface FontOverrides {
  heading?: Partial<GenericFont>
  body?: Partial<GenericFont>
  mono?: Partial<GenericFont>
  quote?: Partial<GenericFont>
}
```

### 3. Add `fontConfig` to `BrandDefinition`

Add `fontConfig?: BrandFontConfig` to the `BrandDefinition` interface, right after `fonts?: FontOverrides`:

```typescript
export interface BrandDefinition {
  // ... existing fields ...
  fonts?: FontOverrides
  fontConfig?: BrandFontConfig   // NEW — high-level 4-slot font API
  typography?: TypographyConfig
  // ... rest ...
}
```

### 4. Add `defaultQuoteFont`

Add this after `defaultMonoFont` (around line 173):

```typescript
const defaultQuoteFont = createFont({
  family: 'Georgia, "Times New Roman", serif',
  size: { 1: 14, 2: 16, 3: 18, 4: 20, 5: 24, 6: 28, true: 18 },
  weight: { 1: '300', 2: '400', true: '300' },
  lineHeight: { 1: 22, 2: 26, 3: 30, 4: 34, 5: 38, 6: 44, true: 30 },
  letterSpacing: { 1: 0, true: 0 },
  style: { 1: 'italic', 2: 'italic', 3: 'italic', 4: 'italic', 5: 'italic', 6: 'italic', true: 'italic' },
})
```

### 5. Add `buildFontFamily` helper

Add a small helper function (after `applyTypographyToFont`):

```typescript
function buildFontFamily(family: string, fallback?: string): string {
  return fallback ? `${family}, ${fallback}` : family
}
```

### 6. Update `createBrandConfig()` font processing

Replace the font processing section (currently lines 240-252) with logic that:

1. **If `brand.fontConfig` exists**, derive fonts from it with heading weight alternation:

```typescript
// --- Font processing ---
let headingFont: ReturnType<typeof createFont>
let bodyFont: ReturnType<typeof createFont>
let monoFont: ReturnType<typeof createFont>
let quoteFont: ReturnType<typeof createFont>

if (brand.fontConfig) {
  const fc = brand.fontConfig
  const headingFamily = buildFontFamily(fc.heading.family, fc.heading.fallback)
  const bodyFamily = buildFontFamily(fc.body.family, fc.body.fallback)
  const monoFamily = buildFontFamily(fc.mono.family, fc.mono.fallback)
  const quoteFamily = buildFontFamily(fc.quote.family, fc.quote.fallback)

  // Heading weight alternation: h1(heavy) h2(light) h3(heavy) h4(light) h5(heavy) h6(light)
  // Tamagui font weight keys map to heading levels in reverse (key 6 = largest = h1):
  // key 1 = h6 (light), key 2 = h5 (heavy), key 3 = h4 (light),
  // key 4 = h3 (heavy), key 5 = h2 (light), key 6 = h1 (heavy)
  const heavy = String(fc.heading.weights.heavy)
  const light = String(fc.heading.weights.light)
  const headingWeights = {
    1: light,   // h6
    2: heavy,   // h5
    3: light,   // h4
    4: heavy,   // h3
    5: light,   // h2
    6: heavy,   // h1
    true: heavy,
  }

  headingFont = createFont({
    ...defaultHeadingFont,
    family: headingFamily,
    weight: headingWeights,
  })

  const bodyWeight = String(fc.body.weight)
  bodyFont = createFont({
    ...defaultBodyFont,
    family: bodyFamily,
    weight: { 1: bodyWeight, 2: bodyWeight, 3: bodyWeight, 4: bodyWeight, true: bodyWeight },
  })

  const monoWeight = String(fc.mono.weight)
  monoFont = createFont({
    ...defaultMonoFont,
    family: monoFamily,
    weight: { 1: monoWeight, 2: monoWeight, true: monoWeight },
  })

  const quoteWeight = String(fc.quote.weight)
  const quoteStyle = fc.quote.style ?? 'italic'
  const quoteStyleScale = Object.fromEntries(
    Object.keys(defaultQuoteFont.size).map((k) => [k, quoteStyle])
  )
  quoteFont = createFont({
    ...defaultQuoteFont,
    family: quoteFamily,
    weight: { 1: quoteWeight, 2: quoteWeight, true: quoteWeight },
    style: quoteStyleScale,
  })
} else {
  // Legacy path: no fontConfig, use defaults
  headingFont = defaultHeadingFont
  bodyFont = defaultBodyFont
  monoFont = defaultMonoFont
  quoteFont = defaultQuoteFont
}

// Apply typography extras (transform, style overrides)
headingFont = applyTypographyToFont(headingFont, brand.typography?.heading)
bodyFont = applyTypographyToFont(bodyFont, brand.typography?.body)

// Apply low-level font overrides (existing `fonts` API)
if (brand.fonts?.heading) {
  headingFont = createFont({ ...headingFont, ...brand.fonts.heading })
}
if (brand.fonts?.body) {
  bodyFont = createFont({ ...bodyFont, ...brand.fonts.body })
}
if (brand.fonts?.mono) {
  monoFont = createFont({ ...monoFont, ...brand.fonts.mono })
}
if (brand.fonts?.quote) {
  quoteFont = createFont({ ...quoteFont, ...brand.fonts.quote })
}
```

2. **Update the return value** to include quote font:

Change:
```typescript
fonts: { heading: headingFont, body: bodyFont, mono: monoFont },
```
To:
```typescript
fonts: { heading: headingFont, body: bodyFont, mono: monoFont, quote: quoteFont },
```

### 7. Ensure `BrandFontConfig` is exported

The `export interface BrandFontConfig` declaration already handles this via the `export` keyword.

## Verification

- TypeScript compiles without errors
- The `BrandFontConfig` type is exported
- The `createBrandConfig()` function accepts brands with or without `fontConfig`
- When `fontConfig` is provided, heading weights alternate correctly (h1=heavy, h2=light, etc.)
- When `fontConfig` is NOT provided, existing behavior is preserved (backward compatible)
- The quote font is always included in the output (defaulting to Georgia italic)

## Task Progress
<!-- lat: 2026-03-01T21:52:00Z -->
<!-- agent-pid: 36295 -->
<!-- worktree: .worktrees/q-001 -->
<!-- branch: q/001 -->

### Checklist
- [x] Create worktree from target branch
- [x] Add BrandFontConfig interface
- [x] Update FontOverrides with quote slot
- [x] Add fontConfig to BrandDefinition
- [x] Add defaultQuoteFont
- [x] Add buildFontFamily helper
- [x] Update createBrandConfig() with heading weight alternation
- [x] Update return value to include quote font
- [x] Verify TypeScript compiles
- [ ] **ACTIVE** → Commit, rebase, merge

### Handoff Context
- Target branch: feat/token-audit-fonts/font-system-foundation
- Single file to modify: packages/design-tokens/brands/index.ts
