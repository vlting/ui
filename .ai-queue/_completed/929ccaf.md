<!-- LAT: 2026-03-09T05:58:41Z -->
<!-- PID: 54318 -->
<!-- worktree: .worktrees/q-006 -->
<!-- branch: q-006 -->
<!-- auto-queue -->
<!-- target-branch: feat/stl-foundation/token-scale-mapping -->
# Task: Replace BrandDefinition factory with simple brand data objects

## What
Replace vlt-ui's complex `BrandDefinition` + `createBrandConfig()` factory pattern with simple brand data objects and CSS variable injection. The factory was needed for Tamagui's provider config — stl uses CSS variables directly.

## Reference
Read these files first:
- `packages/design-tokens/brands/index.ts` — current BrandDefinition type + createBrandConfig factory + 4 built-in brands
- `packages/design-tokens/themes.ts` — buildThemes(), componentThemes, surface templates
- `packages/design-tokens/base.ts` — base token values
- `packages/design-tokens/index.ts` — exports
- `packages/stl-react/src/providers/StlProvider.tsx` — stl's provider (for understanding theme override API)

## Steps

### 1. Create new brand type (`packages/design-tokens/brands/types.ts`)
Simple data object — no factory needed:
```ts
export interface Brand {
  name: string
  palettes: {
    light: string[]    // 12-step palette
    dark: string[]     // 12-step palette
  }
  accentPalettes?: Record<string, {
    light: string[]
    dark: string[]
  }>
  tokens?: {
    size?: Record<string, number>
    space?: Record<string, number>
    radius?: Record<string, number>
    zIndex?: Record<string, number>
    borderWidth?: Record<string, number>
  }
  shadows?: {
    light?: Record<string, string>   // CSS box-shadow strings
    dark?: Record<string, string>
  }
  fonts?: {
    heading?: string
    body?: string
    mono?: string
  }
}
```

### 2. Migrate built-in brands
Convert `defaultBrand`, `funBrand`, `poshBrand`, `shadcnBrand` from BrandDefinition to the new `Brand` type. Keep the palette values, simplify the structure. Remove Tamagui-specific config (createTokens, createFont, etc.).

### 3. Create CSS variable injection utility (`packages/design-tokens/brands/inject.ts`)
```ts
export function injectBrandVars(brand: Brand): Record<string, string> {
  // Returns a flat map of CSS variable name → value
  // e.g., { '--vlt-color-1': '#fff', '--vlt-color-2': '#f8f8f8', ... }
  // Handles palette → CSS var mapping
  // Handles token overrides → CSS var mapping
}

export function getBrandStyleTag(brand: Brand, mode: 'light' | 'dark'): string {
  // Returns a <style> tag string with :root CSS variables for the brand
}
```

### 4. Update exports (`packages/design-tokens/index.ts`)
- Export new `Brand` type
- Export `injectBrandVars`, `getBrandStyleTag`
- Keep exporting brand objects (defaultBrand, etc.)
- Mark old `BrandDefinition` and `createBrandConfig` as deprecated (add `@deprecated` JSDoc)

### 5. Update brands/index.ts
- Remove the massive `createBrandConfig()` function (it creates Tamagui config objects)
- Remove imports from `tamagui`, `@tamagui/theme-builder`, etc.
- Keep brand data (palettes, tokens) in simplified `Brand` format
- Remove `buildThemes()` call chain

### 6. Update themes.ts
- Remove `@tamagui/theme-builder` import and usage
- Remove `buildThemes()` function
- Keep surface template definitions (they're useful design abstractions)
- Convert surface templates to work with CSS variable references instead of Tamagui theme objects

## Files touched
- `packages/design-tokens/brands/types.ts` (new)
- `packages/design-tokens/brands/inject.ts` (new)
- `packages/design-tokens/brands/index.ts` (major rewrite)
- `packages/design-tokens/themes.ts` (major rewrite)
- `packages/design-tokens/index.ts` (update exports)
- `packages/design-tokens/base.ts` (remove Tamagui-specific types if any)

## Acceptance criteria
- `Brand` type is a simple data object (no factory pattern)
- 4 built-in brands preserved with same palette values
- `injectBrandVars()` converts brand → CSS variable map
- No imports from `tamagui` or `@tamagui/*` in design-tokens package
- Old `BrandDefinition` and `createBrandConfig` marked deprecated
- Surface template definitions preserved as design abstractions
