<!-- auto-queue -->
<!-- depends-on: 001 -->
# Verify Example App Builds and All Pages Load Without Error

## Objective

Ensure the kitchen-sink example app builds successfully and every page loads without runtime errors.

## Steps

### 1. Build Verification

Run the Vite build to check for import resolution errors, TypeScript issues, and missing dependencies:

```bash
cd examples/kitchen-sink && npx vite build --mode development
```

If the build fails:
- Read the error message carefully
- Fix the root cause (missing exports, broken imports, type errors, etc.)
- Re-run until the build succeeds

### 2. Dev Server Verification

Start the dev server and verify it launches without errors:

```bash
cd examples/kitchen-sink && npx vite --port 5199
```

### 3. Page-by-Page Verification

Using Playwright MCP, navigate to each page in the example app and check for:
- Console errors (use `browser_console_messages` with level `error`)
- Rendering failures (use `browser_snapshot` to verify content renders)
- Missing components (blank areas where content should be)

Pages to check (based on the kitchen-sink router — read `examples/kitchen-sink/src/` to find the actual routes):
- Home page (`/`)
- Primitives page
- Buttons page
- Forms page
- Data Display page
- Overlays page
- Menus page
- Composed page
- Hooks page
- Any other pages found in the router config

For each page:
1. Navigate to the page URL
2. Take a snapshot to verify content renders
3. Check console for errors
4. If errors found: fix the underlying issue in the library or example app

### 4. Fix Any Issues Found

Common issues to watch for:
- Missing barrel exports (similar to task 001's Popover fix)
- Components referenced in example pages that don't exist yet (stubs missing exports)
- Import path mismatches between the example app and the library
- Runtime errors from components that reference undefined tokens or themes
- TypeScript errors in the build

When fixing issues:
- Prefer fixing the library (`packages/`, `src/`) over patching the example app
- If a component is a stub that can't render, either add a minimal implementation or remove it from the example page
- Do NOT remove entire pages — fix or stub the broken components

### 5. Final Verification

After all fixes:
1. Run `npx vite build --mode development` one final time — must succeed with zero errors
2. Start the dev server and visit every page — zero console errors

## Scope
- **May modify**: Any files in `packages/`, `src/`, or `examples/kitchen-sink/` needed to fix build/runtime errors
- **The exact files are unknown** until the build is attempted — this task is exploratory/fix-as-you-go
- Glob estimate: `packages/**/*.ts`, `packages/**/*.tsx`, `examples/kitchen-sink/src/**/*.tsx`

## Important Notes
- This task depends on 001 (missing barrel exports) being completed first
- The goal is a GREEN build and ZERO console errors on all pages — not cosmetic polish
- If a component is genuinely unimplemented (stub), it's acceptable to show a placeholder — but it must not throw errors
