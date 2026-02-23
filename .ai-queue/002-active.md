<!-- auto-queue -->
# Audit and Remove Headless Components

## Context
The `packages/headless/` directory contains 3 deprecated headless components:
- `HeadlessCheckbox` (`packages/headless/Checkbox/`)
- `HeadlessDialog` (`packages/headless/Dialog/`)
- `HeadlessTabs` (`packages/headless/Tabs/`)

All are marked `@deprecated` and re-exported from `src/index.ts`. The user's design philosophy is clear: **all externally available components should be styled using config/theme and customizable via brand config**. Headless primitives don't fit this model.

## Tasks

1. **Remove the headless components entirely:**
   - Delete `packages/headless/Checkbox/` directory
   - Delete `packages/headless/Dialog/` directory
   - Delete `packages/headless/Tabs/` directory
   - If the `packages/headless/` directory is now empty, delete it too
   - Check for and delete any `packages/headless/index.ts` barrel export

2. **Remove headless re-exports from the main barrel:**
   - In `src/index.ts`, remove the `HeadlessDialog`, `HeadlessTabs`, and `HeadlessCheckbox` exports
   - Remove any import lines referencing `packages/headless`

3. **Remove the HeadlessPage from the kitchen-sink:**
   - Delete `examples/kitchen-sink/src/pages/HeadlessPage.tsx`
   - In `examples/kitchen-sink/src/App.tsx`, remove the `HeadlessPage` import and route
   - In `examples/kitchen-sink/src/layouts/BrandLayout.tsx`, remove "Headless" from the `navLinks` array (the top nav)
   - The sidebar (`sidebarGroups`) does not appear to have a headless entry, but check and remove if present

4. **Check for any other references** to `HeadlessCheckbox`, `HeadlessDialog`, `HeadlessTabs`, or `packages/headless` throughout the codebase and remove them.

## Scope
- `packages/headless/**` (delete)
- `src/index.ts` (remove headless exports)
- `examples/kitchen-sink/src/pages/HeadlessPage.tsx` (delete)
- `examples/kitchen-sink/src/App.tsx` (remove HeadlessPage import/route)
- `examples/kitchen-sink/src/layouts/BrandLayout.tsx` (remove "Headless" from navLinks)

## Acceptance Criteria
- No headless components exist in the codebase
- No headless re-exports in `src/index.ts`
- No headless page/route in the kitchen-sink app
- TypeScript compiles cleanly (no broken imports)
