<!-- auto-queue -->
# Commit History
- Exported `neonBrand` through the barrel chain (brands/index → design-tokens/index → src/index)
- Fixed kitchen-sink brands.ts to import from `@vlting/ui` instead of relative path

# Task: Verify kitchen-sink builds and runs properly

## Objective
Ensure the kitchen-sink example app builds without errors and renders correctly in the browser. Fix any issues found — including workspace configuration if needed.

## Context
- The repo uses Yarn v1 workspaces (`"workspaces": [".", "examples/*"]` in root `package.json`)
- Tamagui v2 RC (2.0.0-rc.14) is the UI framework
- Known Tamagui v2 quirks are documented in the project's MEMORY.md (the agent should consult it)
- The kitchen-sink app imports from `@vlting/ui` which re-exports from `packages/*/src/`

## Steps

### 1. Install dependencies
From the repo root:
```bash
yarn install
```
If there are resolution errors, check for conflicting peer dependencies or missing packages.

### 2. Run the dev server
```bash
yarn dev:kitchen-sink
```
Check for:
- Vite startup errors (missing plugins, config issues)
- Module resolution failures (can't find `@vlting/ui`, Tamagui packages, etc.)
- TypeScript errors if using `tsc` or Vite's TS checking

### 3. Open in browser and check for runtime errors
- Open the reported localhost URL
- Check the browser console for errors
- Verify components render (not blank page or error boundary)
- Test brand switching if implemented
- Test light/dark toggle if implemented

### 4. Run a production build
```bash
cd examples/kitchen-sink && yarn build
```
Fix any build-time errors (TS errors, missing types, bundle issues).

### 5. Common issues to watch for
- **Tamagui config not found**: Ensure `tamagui.config.ts` is properly referenced
- **React version mismatch**: The root uses React 19.1.0 — the example should use the same
- **`styled()` TS errors**: Known v2 RC issue — add `// @ts-expect-error Tamagui v2 RC` where needed
- **`GetProps<>` resolving to `undefined`**: Known issue — define props from scratch instead
- **Missing workspace symlinks**: Run `yarn install` from root to regenerate

### 6. Fix all issues found
Apply whatever fixes are needed to make both dev and production builds succeed cleanly.

## Verification
- `yarn dev:kitchen-sink` starts without errors
- Browser shows rendered components (not blank/error page)
- `cd examples/kitchen-sink && yarn build` succeeds
- No TypeScript errors on `yarn typecheck` (if configured)
