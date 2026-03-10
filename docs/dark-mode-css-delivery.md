# Dark Mode CSS Variable Delivery — Implementation Plan

## Context

In STL (`@vlting/stl`), dark mode CSS variables are currently injected as **inline styles on `<html>`** via `document.documentElement.setAttribute("style", styleString)`. This:

- Clutters markup with ~2-5KB of CSS custom properties (~200+ color vars, ~10 shadow vars)
- Can't be cached by the browser
- Clobbers any other inline styles on `<html>`
- Has maximum specificity (breaks cascade)
- Ships `darkVarMap` as JS even though it's fully known at build time

## Approach

Move dark mode vars from inline `<html style>` to **build-time CSS** via `globalStyle('[data-color-mode="dark"]', darkVarMap)`. Toggle with a `data-color-mode` attribute on `<html>`. Only inject a `<style>` tag at runtime if user overrides (`themeOverrides`/`semanticColorOverrides`) are provided.

**Key insight:** `darkVarMap` is already fully computed at build time (lines 701-702 of `styles.css.ts`) — it just needs to be emitted as CSS instead of shipped as JS for runtime injection. One line of `globalStyle()` does it.

## Steps

### 1. Export shared constant

Export `COLOR_MODE_ATTR = "data-color-mode" as const` from `@vlting/stl` (in `shared/models/` alongside `DEFAULT_COLOR_MODE`). Both the build-time CSS selector and runtime attribute setter must derive from this single constant. Re-export from `@vlting/stl` package index.

### 2. Add build-time dark mode CSS

**File:** `packages/stl/src/config/styles.css.ts`

Add **after line 704** (after the `:root` globalStyle call — source order is critical):

```ts
// IMPORTANT: This rule MUST appear after the :root rule above.
// Both selectors have specificity (0,1,0) — source order is the tiebreaker.
// Moving this above :root will silently break dark mode.
globalStyle(`[${COLOR_MODE_ATTR}="dark"]`, darkVarMap)
```

`darkVarMap` is already populated. No new build step — uses existing vanilla-extract `globalStyle()`.

### 3. Remove `darkVarMap` from runtime style injection

**File:** `packages/stl/src/config/utils/styles.utils.ts` (line 41-44)

Change:
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

Dark vars are now in the static CSS file. `getThemeOverrides()` returns only user overrides. Add JSDoc clarifying the narrowed contract.

**Note:** `style` was only consumed by `useThemeStyle` to build the inline CSS string. The `tokenValue` object (what components actually use) is built from `overrides`, which never contained dark vars. No functional impact.

### 4. Remove dead exports

Remove `darkColor` and `darkShadow` named exports from `styles.css.ts`. They are not re-exported from the package index and have zero consumers outside `getThemeOverrides`.

Mark `darkVarMap` as `@deprecated` — it becomes build-time-only after this change.

### 5. Replace inline styles with data attribute + `<style>` tag

**File:** `packages/stl-react/src/hooks/useThemeStyle.tsx`

Replace `document.documentElement.setAttribute("style", styleString)` with:

1. **Set data attribute:** `document.documentElement.setAttribute(COLOR_MODE_ATTR, colorMode)`
2. **If user overrides exist**, inject/update a `<style id="stl-theme-overrides">` tag with `:root { ...overrideVars }`.
3. **If no overrides**, remove any previously injected `<style>` tag.
4. **On first run**, remove any legacy inline `style` attribute from `<html>`.

### 6. Move DOM mutations to `useEffect`

The current code performs DOM mutations inside `useMemo` — this is semantically wrong and fires twice in React 18 strict mode. Split:
- `useMemo` → computes `tokenValue` (pure)
- `useEffect` → performs DOM mutations (setAttribute, `<style>` tag lifecycle) with proper cleanup return that removes the `<style>` tag on unmount

### 7. Update example apps

#### Docs Site (`apps/docs/`)
- Uses `next-themes` with class-based dark mode (`attribute="class"`) — separate system from STL inline injection
- Verify no conflict between `next-themes` class toggle and new `data-color-mode` attribute
- If `StlProvider` is used in docs component demos, ensure `data-color-mode` is set correctly
- Update `apps/docs/components/providers.tsx` if `useBrandCSSProperties()` interacts with color mode

### 8. Add test coverage

**File:** `packages/stl-react/src/__tests__/provider.test.tsx`

- Assert `document.documentElement.getAttribute("data-color-mode")` is set after render with `defaultColorMode="dark"`
- Assert no inline `style` attribute on `<html>` when no overrides provided
- Assert `<style id="stl-theme-overrides">` is injected when `themeOverrides` are provided
- Assert `<style id="stl-theme-overrides">` is removed when overrides are cleared

**Build-output verification:**
- Add a test or build script that inspects compiled `stl.css` for the `[data-color-mode="dark"]` rule appearing after the `:root` rule, to guard against source-order regressions from vanilla-extract upgrades

### 9. Document FOUC prevention pattern

Add a section to docs site (or README) documenting the consumer pattern for SSR FOUC prevention:

```html
<!-- Add to <head> for instant dark mode (before CSS paints) -->
<script>
  (function() {
    var mode = localStorage.getItem('stl-color-mode');
    if (mode) document.documentElement.setAttribute('data-color-mode', mode);
  })()
</script>
```

For Next.js apps using `next-themes`: configure `attribute="data-color-mode"` instead of `"class"` to align with STL's selector.

## Files to Modify

| File | Change |
|------|--------|
| `packages/stl/src/shared/models/*.ts` | Export `COLOR_MODE_ATTR` constant |
| `packages/stl/src/index.ts` | Re-export `COLOR_MODE_ATTR` |
| `packages/stl/src/config/styles.css.ts` | Add `globalStyle` for dark mode after `:root` (line 704+); remove dead `darkColor`/`darkShadow` exports; deprecate `darkVarMap` |
| `packages/stl/src/config/utils/styles.utils.ts` | Remove `darkVarMap` spread from `getThemeOverrides()` |
| `packages/stl-react/src/hooks/useThemeStyle.tsx` | Replace `setAttribute("style")` with data attribute + `<style>` tag; split `useMemo`/`useEffect` |
| `packages/stl-react/src/providers/StlProvider.tsx` | Verify `data-color-mode` integration |
| `packages/stl-react/src/__tests__/provider.test.tsx` | Add dark mode DOM mutation tests |
| `apps/docs/components/providers.tsx` | Verify/update `next-themes` + STL color mode alignment |

## Risks

1. **Source order fragility** — `:root` and `[data-color-mode="dark"]` have equal specificity `(0,1,0)`; source order is the only tiebreaker. Mitigated by code comment + build-output verification test.
2. **SSR FOUC** — Consumers must set `data-color-mode` server-side or via blocking script. Not a regression (no SSR dark mode today). Documented as consumer pattern.
3. **CSS file size** — Adds ~4-5KB gzipped to `stl.css` (permanent, all users). Offset by removing same data from JS bundle + browser cacheability.
4. **`<style>` tag orphaning** — Must use `useEffect` cleanup return. Addressed in step 6.
5. **`getThemeOverrides()` contract narrowing** — `style` no longer contains `darkVarMap`. Internal-only consumer today, but noted in changelog.

## Verification

1. `yarn build:lib` — ensure vanilla-extract generates dark mode CSS rules
2. Inspect compiled CSS — confirm `[data-color-mode="dark"] { ... }` rules exist **after** `:root` rules
3. Showcase-web dev server — toggle dark mode, verify variables switch correctly
4. DevTools: confirm no inline `style` on `<html>`, `data-color-mode` attribute toggles
5. Test with `themeOverrides` — verify `<style id="stl-theme-overrides">` appears
6. Test without overrides — verify no `<style>` tag injected
7. Docs site — verify no conflict between `next-themes` and `data-color-mode`
8. Run automated tests — provider tests pass with new assertions

---
*Reconciled from 5 council perspectives (arch, pragma, perf, dx, maint) — unanimous on core approach. Council reviewed 2025-03-09.*
