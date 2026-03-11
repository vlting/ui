---
slug: theme-overhaul
status: in-progress
created: 2026-03-10
---
# Theme Architecture Overhaul

## Overview
Replace branding system with `generateTheme()` helper, remove Tailwind from docs, fix all hardcoded values, simplify color mode to light/dark only with system detection.

Key decisions (from council):
- `generateTheme()` returns `Readonly<Brand>` (existing type, not new)
- STL `styled()` replaces Tailwind in docs (pre-generated classes, no inline styles)
- No `DesignPhilosophy` enum — flat overrides + named preset configs
- Native hardcoded values deferred to separate effort
- Two color systems coexist (generatePalette user-facing, COLOR_MATRIX STL internal)

## Metadata
- **Epic branch:** epic/theme-overhaul
- **Epic issue:** #178
- **PR:** #179
- **Created:** 2026-03-10
- **Auto-merge:** true
- **Watch:** true
- **Integrations:** github

## Stage 1: Theme System Core
**Branch prefix:** feat
**Acceptance criteria:**
- [x] `generateTheme()` function in `packages/design-tokens/` — accepts `GenerateThemeOptions` (primary hue required, optional secondary/tertiary/tokens/shadows/fonts/overrides), returns `Readonly<Brand>`
- [x] Minimal call `generateTheme({ primary: { hue: 220 } })` produces fully functional WCAG-AA theme
- [x] 4 preset configs exported: `THEME_PRESET_DEFAULT`, `THEME_PRESET_FUN`, `THEME_PRESET_POSH`, `THEME_PRESET_SHADCN`
- [x] `injectBrandVars()` renamed to `themeToVars(theme, mode)` with backwards-compat re-export
- [x] Brand infrastructure deleted: 4 brand files, BrandProvider, BrandSwitcher, BrandContext, useBrand, useBrandCSSProperties
- [x] `getColorModeScript(defaultMode?)` export added to `@vlting/stl` for FOUC prevention
- [x] StlProvider: 50ms setTimeout replaced with requestAnimationFrame for system color mode sync
- [x] `hightContrast` typo fixed to `highContrast` in conditions.ts and all references
- [x] `Object.freeze()` applied to token/theme/tokenValue exports
- [x] Build succeeds, existing tests pass
**Stage PR:** #180
**Status:** done

## Stage 2: Docs Tailwind Removal
**Branch prefix:** feat
**Acceptance criteria:**
- [ ] Tailwind removed: tailwind.config.ts, postcss tailwind plugin, @import 'tailwindcss' and @theme from globals.css
- [ ] globals.css replaced with minimal STL-var-based styles
- [ ] next-themes removed; ThemeToggle wired to useColorMode() from @vlting/stl-react
- [ ] Provider stack collapsed to StlProvider only (with theme demo mechanism via <style> tag swap)
- [ ] All 29 docs files converted from Tailwind utilities to STL styled() + primitives
- [ ] No inline style attributes for values that should be tokens
- [ ] Docs app builds and renders correctly in light and dark modes
**Status:** pending

## Stage 3: Hardcoded Value Audit
**Branch prefix:** fix
**Acceptance criteria:**
- [ ] Chart components: hex colors replaced with STL accent token refs, hardcoded padding/fontSize replaced with tokens
- [ ] Blocks: all hardcoded gap/padding/color values replaced with token references (AuthBlock gap: '16px' → '$8', etc.)
- [ ] Components: audit of packages/components/ for remaining hardcoded hex/px/font-size — all replaced with tokens
- [ ] No hex color literals remain in component/block source files (excluding .native.tsx)
- [ ] Build succeeds, all tests pass across all 3 apps
**Status:** pending
