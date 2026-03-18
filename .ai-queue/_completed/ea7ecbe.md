<!-- LAT: 2026-03-09T22:02:10Z -->
<!-- PID: 5792 -->
<!-- auto-queue -->
<!-- target-branch: feat/dark-mode-css-delivery/core -->
# Task: Remove darkVarMap from getThemeOverrides runtime

## Files to modify
- `packages/stl/src/config/utils/styles.utils.ts`

## Instructions

### 1. Remove `darkVarMap` import and spread

In `packages/stl/src/config/utils/styles.utils.ts`:

- Remove `darkVarMap` from the import on line 6:
  ```ts
  // Before:
  import { darkVarMap, CSS, tokenToVarMap } from "../styles.css"
  // After:
  import { CSS, tokenToVarMap } from "../styles.css"
  ```

- Change lines 41-44 from:
  ```ts
  const style = {
    ...(colorMode === "dark" ? darkVarMap : {}),
    ...flattenOverrides(overrides),
  }
  ```
  To:
  ```ts
  const style = flattenOverrides(overrides)
  ```

### 2. Update JSDoc

Update the JSDoc on `getThemeOverrides` (line 27) to clarify the narrowed contract:

```ts
/**
 * Get theme tokens that need to override the pre-generated design system.
 * Returns only user-provided overrides — dark mode vars are now delivered via build-time CSS.
 */
```

## Acceptance criteria
- `darkVarMap` no longer imported in `styles.utils.ts`
- `getThemeOverrides()` returns only flattened user overrides in `style` (no dark vars)
- JSDoc updated to reflect narrowed contract
