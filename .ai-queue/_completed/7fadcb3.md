<!-- LAT: 2026-03-10T04:03:39Z -->
<!-- PID: 28592 -->
<!-- auto-queue -->
<!-- target-branch: feat/theming-hardening/brand-customization -->
# Task: Verify complementary palette generation

## Goal
Verify and fix the complementary palette generation pipeline (primary → secondary → tertiary).

## Instructions

1. Read all brand definitions in `packages/design-tokens/brands/`:
   - `default.ts`, `fun.ts`, `posh.ts`, `shadcn.ts`

2. For each brand, check:
   - Does the primary palette have correct contrast (step 0 vs step 11)?
   - Do accent palettes exist and are they harmonious with the primary?
   - Are `accentPalettes` properly keyed and do they have both light/dark variants?
   - Does `isNeutral` behavior work correctly in `colorGen.utils.ts`?

3. Verify that `injectBrandVars()` correctly maps:
   - Primary palette → `--vlt-color-1` through `--vlt-color-12`
   - Accent palettes → `--vlt-{name}-1` through `--vlt-{name}-12`

4. If any brand has gaps (missing accent palette, incorrect contrast, missing dark mode variant), fix them.

5. Verify the 4 brands all produce usable output:
   ```ts
   import { defaultBrand, funBrand, poshBrand, shadcnBrand } from './brands'
   import { injectBrandVars } from './brands/inject'
   // Each should produce valid CSS vars for both modes
   ```

6. Add inline comments if you find the complementary color logic unclear.

## Key files
- `packages/design-tokens/brands/*.ts`
- `packages/design-tokens/brands/inject.ts`
- `packages/stl/src/shared/utils/colorGen.utils.ts`
