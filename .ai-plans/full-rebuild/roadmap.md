---
slug: full-rebuild
status: in-progress
scope: large
created: 2026-03-11
current_epic: 3
current_stage: 1
phase: breakdown
---
# Full Rebuild — @vlting/ui

## Overview
Reset from trying to do the whole library at once. Build stl suite incrementally — primitives + Button first. Migrate design-tokens into stl core, establish createTheme/applyTheme/getTheme API, rebase palette to hue 215, add defaultVariants to styled(). Playground with full Button permutation grid + theme picker (flat/pro/sharp).

Key decisions (from council):
- Package stays `@vlting/ui` (no rename)
- "Brands" → "Themes" everywhere
- Two-axis Button: theme × type (not flat variant)
- Color contrast via STL's `$colorN` + `$colorTextN` pairing
- defaultVariants as 5th positional arg to styled()
- Theme switch via CSS var injection only (zero re-renders)
- Clean break — no backward compat on rebuild branch

## Metadata
- **Base branch:** full-rebuild (merges to main when complete)
- **Checkpoint:** checkpoint-v2 (preserves pre-rebuild state)
- **Created:** 2026-03-11
- **Integrations:** github

## Epic 1: Foundation Reset
**Objective:** Clean slate — branches, exports, design-tokens absorbed into stl core
**Dependencies:** none
**Epic slug:** foundation-reset
**Epic branch:** epic/foundation-reset
**Status:** done

### Stage 1.1: Branch Setup & Exports Cleanup
**Branch prefix:** chore
**Acceptance criteria:**
- [x] checkpoint-v2 branch created off main
- [x] full-rebuild branch created off main
- [x] Subpath exports (./stl, ./stl-react, ./primitives, ./components, ./hooks, ./icons) resolve with TS types
- [x] sideEffects: ["*.css"] in package.json
**Status:** done

### Stage 1.2: Design-Tokens → STL Migration
**Branch prefix:** chore
**Acceptance criteria:**
- [x] Palette generation (generate-palette, generate-theme) moved to packages/stl/src/theme/
- [x] Theme presets moved to packages/stl/src/theme/
- [x] inject utils + types moved to packages/stl/src/theme/
- [x] Token scales (base, colors, themes) moved to packages/stl/src/theme/
- [x] All "brand" terminology replaced with "theme" (types, functions, files)
- [x] packages/design-tokens/ deleted
- [x] ./design-tokens subpath export removed
- [x] Existing imports updated (apps, src/index.ts)
- [x] Build passes
**Status:** done

## Epic 2: STL Core Enhancements
**Objective:** Theme API, palette rebase, defaultVariants — stl becomes the single source of truth
**Dependencies:** Epic 1
**Epic slug:** stl-core
**Epic branch:** epic/stl-core
**Status:** done

### Stage 2.1: Palette Rebase & Theme Presets
**Branch prefix:** feat
**Acceptance criteria:**
- [x] DEFAULT_HUE changed from 174 to 215
- [x] DEFAULT_SOURCE_COLORS saturations set to [90, 90, 5]
- [x] Secondary = complementary hue (sat 90)
- [x] Tertiary = hue 215, sat 5, isNeutral: true
- [x] Presets renamed: fun→flat, posh→sharp, shadcn→pro
- [x] Build + existing tests pass
**Status:** done

### Stage 2.2: createTheme / applyTheme / getTheme API
**Branch prefix:** feat
**Acceptance criteria:**
- [x] createTheme() — merges overrides with defaults, returns frozen Theme object
- [x] applyTheme() — sets module-level singleton + produces CSS var map
- [x] getTheme() — returns current theme
- [x] All three are framework-agnostic (no React imports in stl)
- [x] Exported from @vlting/ui/stl
- [x] StlProvider updated to accept Theme object and call applyTheme internally
- [x] Theme switch = CSS var injection only, zero React re-renders
**Status:** done

### Stage 2.3: defaultVariants in styled() API
**Branch prefix:** feat
**Acceptance criteria:**
- [x] styled() accepts optional 5th arg: defaultVariants
- [x] useVariants merges defaults under props (explicit wins)
- [x] useVariants refactored from useState/setCacheKey to useMemo
- [x] Type-safe: keys constrained to variant names, values to variant options
- [x] Zero overhead when defaultVariants not provided
- [x] Existing styled() call sites unaffected (backward-compatible)
**Status:** done

## Epic 3: Playground & Button
**Objective:** Visual proof — Button rebuilt with 2-axis variants, playground shows every permutation
**Dependencies:** Epic 2
**Epic slug:** playground-button
**Epic branch:** epic/playground-button
**Status:** pending

### Stage 3.1: Component Stubs & Playground App
**Branch prefix:** chore
**Acceptance criteria:**
- [ ] All components except Button stubbed (semantic root, ref + children, data-stub)
- [ ] All *.spec.md and *.test.tsx preserved
- [ ] Playground Vite app created at apps/playground
- [ ] Imports from @vlting/ui only (no relative paths)
- [ ] Dev script added to root package.json
- [ ] Basic page renders with StlProvider + styles
**Status:** pending

### Stage 3.2: Button Rebuild
**Branch prefix:** feat
**Acceptance criteria:**
- [ ] theme: primary | secondary | neutral | destructive
- [ ] type: solid | subtle | outline | ghost | link
- [ ] size: xs | sm | md | lg | icon
- [ ] disabled: boolean
- [ ] defaultVariants: { theme: 'primary', type: 'solid', size: 'md' }
- [ ] Colors via $colorN + $colorTextN token pairing
- [ ] lowMotion: no transitions, no scale transform, reduced spinner
- [ ] WCAG AA contrast verified for all theme×type combos (light + dark)
- [ ] Button.spec.md updated
- [ ] Tests updated and passing
**Status:** pending

### Stage 3.3: Playground Permutation Grid & Theme Picker
**Branch prefix:** feat
**Acceptance criteria:**
- [ ] Button permutation grid: rows by theme, columns by type
- [ ] Size/disabled/loading toggles
- [ ] Theme picker in top nav bar: default + flat/pro/sharp
- [ ] Each theme via createTheme(), passed to StlProvider
- [ ] Theme switch = CSS var swap, no re-renders
- [ ] Minimal Icon component if Button icon size needs it
- [ ] Build passes, icon tree-shaking verified
**Status:** pending
