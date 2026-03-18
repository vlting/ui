<!-- auto-queue -->
<!-- depends-on: 001, 002, 003 -->
<!-- target-branch: feat/docs-site/icon-theming-migration -->
# Integration — Build Verification

Verify that all Stage 4 pages build correctly and the overall site is consistent.

## Instructions

### 1. Run Next.js Build
```bash
cd examples/docs && npx next build
```
- Verify build completes with no errors
- Verify the following pages are in the output:
  - `/docs/icons` (icon browser)
  - `/docs/theming` (theming documentation)
  - `/docs/migration` (migration guide)

### 2. Fix any build issues
- If any TypeScript errors, fix them
- If any import issues, fix them
- Ensure all pages generate correctly

### 3. Verify navigation consistency
- Check `examples/docs/lib/navigation.ts` — the icon browser, theming, and migration pages should already be in the navigation from Stage 1 (they were added as part of the initial sidebar setup)
- If any navigation entries are missing or have wrong hrefs, fix them

## Scope
- `examples/docs/lib/navigation.ts` (only if fixes needed)
- Any files from segments 001-003 that need build fixes

## Verification
- `npx next build` passes with no errors
- All 3 new pages appear in the build output
- Total page count should be ~99+ (96 existing + 3 new)
