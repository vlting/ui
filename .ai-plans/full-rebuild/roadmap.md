---
slug: full-rebuild
status: in-progress
scope: large
created: 2026-03-11
current_epic: 4
current_stage: 6
phase: ship
---
# Full Rebuild — @vlting/ui

## Overview
Reset from trying to do the whole library at once. Build stl suite incrementally — primitives + Button first. Migrate design-tokens into stl core, establish createTheme/applyTheme/getTheme API, rebase palette to hue 215, add defaultVariants to styled(). Playground with full Button permutation grid + theme picker (flat/pro/sharp).

Key decisions (from council):
- Package stays `@vlting/ui` (no rename)
- "Brands" → "Themes" everywhere
- Two-axis Button: theme × variant (renamed from type to avoid HTML conflict)
- Color contrast via STL's `$colorN` + `$colorTextN` pairing (global pattern, not Button-specific)
- styled() refactored to options object + template support
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
**Objective:** Refactor styled() API, rebuild Button with 2-axis variants, playground shows every permutation
**Dependencies:** Epic 2
**Epic slug:** playground-button
**Epic branch:** epic/playground-button
**Status:** done

### Stage 3.1: Component Stubs & Playground App
**Branch prefix:** chore
**Acceptance criteria:**
- [x] createStub() factory in packages/components/_stub.ts (forwardRef, semantic root, data-stub, compound component support)
- [x] All components except Button stubbed via createStub()
- [x] All *.spec.md and *.test.tsx preserved unchanged
- [x] Stubbed component tests skipped via jest config testPathIgnorePatterns
- [x] Barrel packages/components/index.ts compiles unchanged
- [x] Playground Vite app created at apps/playground (cloned showcase-web vite config)
- [x] Imports from @vlting/ui only (no relative paths)
- [x] Dev script added to root package.json
- [x] Basic page renders with StlProvider + styles
**Status:** done

### Stage 3.2: styled() API Refactor
**Branch prefix:** feat
**Acceptance criteria:**
- [x] styled() signature changed: styled(component, options) where options = { css, variants, defaultVariants, template, styleName }
- [x] template support: (props) => ReactNode replaces children rendering inside the styled element
- [x] Generic extra props: styled<ExtraProps>(component, options) merges ExtraProps into component props
- [x] Legacy positional API preserved via function overloads (58 call sites, pragmatic choice)
- [x] Type-safe: template props, variant props, and HTML props all correctly merged
- [x] Exported types updated in stl-react barrel
- [x] Build passes
**Status:** done

### Stage 3.3: Button Rebuild
**Branch prefix:** feat
**Acceptance criteria:**
- [x] Button.spec.md updated first — documents theme × variant 2-axis model
- [x] theme: primary | secondary | neutral | destructive
- [x] variant: solid | subtle | outline | ghost | link (renamed from type to avoid HTML conflict)
- [x] size: xs | sm | md | lg | icon
- [x] disabled: boolean
- [x] defaultVariants: { theme: 'primary', variant: 'solid', size: 'md' }
- [x] solid uses high N ($colorN/$colorTextN, steps 8-10); subtle uses low N (steps 2-4)
- [x] All variants have hover/focus state with background color + focus ring
- [x] template: handles isLoading (Spinner), prefix, suffix slots
- [x] lowMotion: no transitions, no scale transform (via STL condition)
- [x] Focus ring: $outlineColor token, 2px solid, 2px offset
- [x] ButtonTheme, ButtonVariant, ButtonSize types exported alongside ButtonProps
- [x] Tests updated and passing (18/18)
**Status:** done

### Stage 3.4: Playground Permutation Grid & Theme Picker
**Branch prefix:** feat
**Acceptance criteria:**
- [x] Button permutation grid: rows by theme, columns by variant
- [x] Size/disabled/loading toggles
- [x] Theme picker in top nav bar: default + flat/pro/sharp + light/dark toggle
- [x] Each theme via pre-built theme objects (defaultTheme/flatTheme/proTheme/sharpTheme), passed to StlProvider
- [x] Theme switch = CSS var swap, no re-renders
- [x] Grid uses CSS grid with aria-labels for screen reader navigability
- [x] Icon size uses ★ character (no separate Icon component needed)
- [x] Dev server starts, no TS errors
**Status:** done

## Epic 4: Dissolve primitives — Restructure into stl-react + headless + utils
**Objective:** Remove separate primitives package; move styling primitives to stl-react, behavioral hooks to headless, general-purpose hooks to utils
**Dependencies:** Epic 3
**Epic slug:** dissolve-primitives
**Status:** done

### Stage 4.1: Rename stl-headless → headless
- [x] packages/stl-headless/ renamed to packages/headless/
- [x] package.json name: @vlting/stl-headless → @vlting/headless
- [x] All imports updated (components, showcase-web, showcase-native)

### Stage 4.2: Move behavioral hooks → headless
- [x] useFocusTrap, useKeyboardNavigation, useControllableState moved from hooks → headless/src/
- [x] Tests and specs moved alongside
- [x] headless barrel updated

### Stage 4.3: Move general-purpose hooks → utils
- [x] useClipboard, useDebounce, useIntersectionObserver, useMediaQuery, useReducedMotion moved to utils/
- [x] utils barrel updated with new exports

### Stage 4.4: Move styling primitives → stl-react
- [x] Badge, Kbd, Label, VisuallyHidden — new stl-react primitives with styled()
- [x] Box — merged centered variant into existing stl-react Box, changed element to div
- [x] Heading — multi-level (h1-h6) via forwardRef + level prop, replaces simple h1
- [x] Text — extended with size/tone/weight variants
- [x] Stack — VStack/HStack/Stack aliases from Column/Row
- [x] Spinner — moved with CSS-only animation ($spin token)
- [x] Skeleton — rewritten: removed runtime keyframe injection hack, uses $pulse token
- [x] Icon — wrapped with styled IconFrame for consistent sizing
- [x] Portal — moved as-is (pure React, no styling)
- [x] Tests and specs moved to new locations

### Stage 4.5: Update exports & config
- [x] ./primitives export → stl-react primitives barrel
- [x] ./headless export added
- [x] ./hooks export → utils (backward compat)
- [x] tsconfig paths updated
- [x] config/resolve.ts updated
- [x] showcase-web vite.config.ts updated
- [x] src/index.ts barrel updated
- [x] mcp-server audit tool updated
- [x] validate-tokens script updated

### Stage 4.6: Delete packages/primitives/ and packages/hooks/
- [x] packages/primitives/ deleted
- [x] packages/hooks/ deleted
- [x] packages/stl-headless/ deleted (renamed to headless)
- [x] Zero new TypeScript errors introduced
- [x] All pre-existing consumer imports preserved via export map
