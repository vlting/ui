---
slug: dark-mode-css-delivery
status: planning
created: 2026-03-09
---
# Dark Mode CSS Variable Delivery

## Overview
Move STL dark mode CSS variables from runtime inline style injection to build-time CSS via vanilla-extract `globalStyle()`. Toggle via `data-color-mode` attribute on `<html>`. Eliminates ~2-5KB uncacheable inline styles, fixes cascade/specificity issues, removes `darkVarMap` from JS bundle.

Council consensus: unanimous across arch, pragma, perf, dx, maint. Plan doc: `docs/dark-mode-css-delivery.md`.

## Metadata
- **Epic branch:** epic/dark-mode-css-delivery
- **PR:** (TBD)
- **Created:** 2026-03-09
- **Auto-merge:** false
- **Integrations:** github
- **Risk summary:** Source-order specificity fragility (mitigated by test + comment); CSS size increase ~4-5KB gzipped (offset by JS bundle reduction + cacheability)

## Stage 1: Core — build-time CSS + runtime attribute toggle
**Branch prefix:** feat
**Acceptance criteria:**
- [ ] `COLOR_MODE_ATTR` constant exported from `@vlting/stl`, used by both build-time selector and runtime setter
- [ ] `globalStyle('[data-color-mode="dark"]', darkVarMap)` emitted after `:root` in compiled CSS with source-order comment
- [ ] `darkVarMap` spread removed from `getThemeOverrides()` — returns user overrides only
- [ ] Dead `darkColor`/`darkShadow` exports removed; `darkVarMap` marked `@deprecated`
- [ ] `useThemeStyle` sets `data-color-mode` attribute instead of inline `style`
- [ ] `useThemeStyle` injects `<style id="stl-theme-overrides">` only when user overrides exist
- [ ] DOM mutations moved from `useMemo` to `useEffect` with cleanup return
- [ ] `<html>` has no inline `style` attribute when no overrides are provided
**Status:** pending

## Stage 2: Tests + build verification
**Branch prefix:** chore
**Acceptance criteria:**
- [ ] Provider test: `data-color-mode` attribute set after render with `defaultColorMode="dark"`
- [ ] Provider test: no inline `style` on `<html>` with no overrides
- [ ] Provider test: `<style id="stl-theme-overrides">` injected/removed with overrides
- [ ] Build-output test: compiled `stl.css` contains `[data-color-mode="dark"]` rule after `:root` rule
**Status:** pending

## Stage 3: Example apps + docs
**Branch prefix:** docs
**Acceptance criteria:**
- [ ] Kitchen-sink: dark mode toggle works with new data-attribute approach
- [ ] Kitchen-sink: FOUC-prevention script added to `index.html`
- [ ] Kitchen-sink: color mode preference persisted to localStorage
- [ ] Docs site: no conflict between `next-themes` class toggle and `data-color-mode` attribute
- [ ] Docs site: component demos using `StlProvider` work correctly in dark mode
- [ ] FOUC prevention pattern documented (consumer-facing docs or README section)
**Status:** pending
