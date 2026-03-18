<!-- LAT: 2026-03-10T20:58:21Z -->
<!-- PID: 96331 -->
<!-- auto-queue -->
<!-- target-branch: feat/foundation-cleanup/default-theme-packaging -->
# Task: Regenerate default brand palette

## Context
The default brand in `packages/design-tokens/brands/default.ts` currently uses hard-coded hex colors (YInMn Blue accent, cool blue-tinted neutrals). It needs to be regenerated using the `generatePalette()` utility from `packages/design-tokens/brands/generate-palette.ts` with specific HSL values.

## Spec
- **Primary accent** (replaces `accentPalettes.blue`): `generatePalette(200, 85, mode)` — rich cyan-blue
- **Secondary accent** (NEW): `generatePalette(290, 50, mode)` — muted purple
- **Neutral palette** (replaces `palettes.light/dark`): `generatePalette(290, 0, mode)` — achromatic (0 saturation = true neutral gray)

## Files to modify
- `packages/design-tokens/brands/default.ts` — ONLY this file

## Implementation
1. Add import: `import { generatePalette } from './generate-palette'`
2. Replace hard-coded `palettes.light` with `generatePalette(290, 0, 'light')`
3. Replace hard-coded `palettes.dark` with `generatePalette(290, 0, 'dark')`
4. Replace `accentPalettes.blue.light` with `generatePalette(200, 85, 'light')`
5. Replace `accentPalettes.blue.dark` with `generatePalette(200, 85, 'dark')`
6. Rename `accentPalettes.blue` → `accentPalettes.primary`
7. Add `accentPalettes.secondary` with `generatePalette(290, 50, 'light')` / `generatePalette(290, 50, 'dark')`
8. Update JSDoc comment to reflect new palette description (clean neutral + cyan-blue primary + purple secondary)
9. Keep `fonts` section unchanged

## Acceptance
- `defaultBrand.palettes.light` uses `generatePalette(290, 0, 'light')`
- `defaultBrand.palettes.dark` uses `generatePalette(290, 0, 'dark')`
- `defaultBrand.accentPalettes.primary.light` uses `generatePalette(200, 85, 'light')`
- `defaultBrand.accentPalettes.primary.dark` uses `generatePalette(200, 85, 'dark')`
- `defaultBrand.accentPalettes.secondary.light` uses `generatePalette(290, 50, 'light')`
- `defaultBrand.accentPalettes.secondary.dark` uses `generatePalette(290, 50, 'dark')`
- File compiles without errors
- Commit with conventional commit message