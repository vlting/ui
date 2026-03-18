<!-- LAT: 2026-03-10T03:33:50Z -->
<!-- PID: 5792 -->
<!-- auto-queue -->
<!-- target-branch: feat/production-ready/a11y-token-validation -->
# Task: Add contrast ratio validation for STL color matrix

## Context
STL generates 12-step palettes for each color (primary, secondary, tertiary, plus accent colors). Each step needs adequate contrast against its computed text color. The colorGen system already computes text colors (`getTextColor` in `packages/stl/src/shared/utils/colorGen.utils.ts`), but there's no automated validation that the contrast ratios meet WCAG AA standards.

## Instructions

1. **Create `scripts/validate-contrast.ts`**:
   - Import or replicate the color generation logic from `packages/stl/src/shared/utils/colorGen.utils.ts`
   - Import the color scale definitions from `packages/stl/src/config/scales/color.ts`
   - For each palette step (1-12) × each color family:
     - Compute the background color
     - Compute the text color (using same logic as `getTextColor`)
     - Calculate WCAG contrast ratio using the formula: `(L1 + 0.05) / (L2 + 0.05)` where L1/L2 are relative luminances
     - Flag any pair below 4.5:1 (normal text) or 3:1 (large text/UI components)
   - Test both light and dark mode palettes
   - Output: table of violations with step, color, mode, ratio, required ratio

2. **Add npm script** to root `package.json`:
   ```
   "validate:contrast": "npx tsx scripts/validate-contrast.ts"
   ```

3. The script should exit 0 with a report (not blocking CI yet — violations expected until E3 fixes them).

## Key file references
- `packages/stl/src/shared/utils/colorGen.utils.ts` — palette generation + text color computation
- `packages/stl/src/config/scales/color.ts` — color scale definitions
- `packages/stl/src/shared/models/colorGen.models.ts` — color types

## Files to create
- `scripts/validate-contrast.ts`

## Files to modify
- `package.json` (add validate:contrast script)

## Acceptance criteria
- `yarn validate:contrast` runs and reports contrast ratios
- Violations clearly identify which palette step × color × mode fails
- Script doesn't fail CI (report-only mode)

## Checklist
- [ ] Read colorGen source files
- [ ] Create validate-contrast.ts
- [ ] Add npm script
- [ ] Test locally
