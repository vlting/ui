<!-- LAT: 2026-03-10T04:34:53Z -->
<!-- PID: 29583 -->
<!-- auto-queue -->
<!-- target-branch: feat/component-quality/token-migration -->
# Task: Replace hardcoded values with tokens — medium-violation components

## Goal
Replace hardcoded px/hex/rgb/hsl values with STL token references.

## Instructions

1. Fix these components (touch ONLY these files):
- `packages/components/Slider/Slider.tsx` (12)
- `packages/components/Select/Select.tsx` (12)
- `packages/components/NavigationMenu/NavigationMenu.tsx` (12)
- `packages/components/Drawer/Drawer.tsx` (12)
- `packages/components/Toast/Toast.tsx` (11)
- `packages/components/RadioGroup/RadioGroup.tsx` (11)
- `packages/components/Dialog/Dialog.tsx` (11)
- `packages/components/Carousel/Carousel.tsx` (10)
- `packages/components/Calendar/Calendar.tsx` (10)

2. **Token replacement patterns:**
   - `#ffffff` / `#fff` → `var(--stl-surface1, #fff)`
   - `#000` / dark colors → `var(--stl-color, #000)` or `var(--stl-foreground, #000)`
   - Gray colors → `var(--stl-surface2, fallback)` or `var(--stl-color8, fallback)`
   - `rgba(0,0,0,N)` → `var(--stl-overlay, rgba(0,0,0,N))`
   - px values → `var(--stl-space-N, Npx)` or `var(--stl-radius-N, Npx)`

3. **Rules:**
   - Keep CSS fallback values in var()
   - Don't change visual appearance
   - Skip 1px borders, 0px, viewBox, strokeWidth
   - Run `npx tsx scripts/validate-tokens.ts` after to verify reduction

## Key files
- Listed component files above