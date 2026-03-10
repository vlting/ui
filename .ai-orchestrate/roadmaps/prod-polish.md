---
slug: prod-polish
status: in-progress
created: 2026-03-10
---
# Production Polish

## Overview
Elevate @vlting/ui to production-ready with full polish. 186 files still reference Tamagui, docs component previews render unstyled, default brand uses wrong color scheme, examples import from sub-packages instead of unified entry, no README, no Vercel deploy.

**Key decisions:**
- Remove Tamagui completely (including kitchen-sink migration to STL)
- Regenerate default brand palettes: primary h200/s85, secondary h290/s50, tertiary h290/s0
- StlProvider + all exports accessible from `@vlting/ui` root
- Docs site: fix SSR/hydration for component previews, shiki code blocks with copy buttons
- WCAG A minimum for all visual components
- Vercel deploy at docs.vlt.ing

**Execution order:**
```
E1 (Foundation) → E2 (Docs) → E3 (Showcases) → E4 (A11y) → E5 (Ship)
```

## Metadata
- **Saga issue:** #163
- **Created:** 2026-03-10
- **Auto-merge:** true
- **Integrations:** github

## Epic 1: Foundation Cleanup
**Objective:** Remove all Tamagui references, update default theme colors, consolidate packaging to single entry point, fix CI.
**Dependencies:** none
**Epic slug:** foundation-cleanup
**Epic branch:** epic/foundation-cleanup
**Status:** pending

### Stage 1.1: Tamagui Reference Removal
**Branch prefix:** chore
**Acceptance criteria:**
- [ ] All `tamagui` / `Tamagui` references removed from source code (packages/, src/, apps/, config/)
- [ ] config/tamagui.config.ts removed
- [ ] .tamagui/ directory removed
- [x] kitchen-sink example removed (replaced by showcase-web)
- [ ] AI_CONSTITUTION.md updated to remove Tamagui-specific rules
- [ ] Migration docs updated
- [ ] jest.config.js, tsconfig paths cleaned of tamagui references
**Status:** pending

### Stage 1.2: Default Theme & Packaging
**Branch prefix:** feat
**Acceptance criteria:**
- [ ] Default brand palette regenerated with: primary h200/s85, secondary h290/s50, tertiary h290/s0 (neutral)
- [ ] StlProvider exported from root `@vlting/ui` (not just `@vlting/stl-react`)
- [ ] `injectBrandCSS` / `defaultBrand` accessible from `@vlting/ui` root
- [ ] Root vite build produces correct dist/ output
- [ ] All 3 GH workflows pass on main
**Status:** pending

## Epic 2: Docs Site Polish
**Objective:** Every page renders properly with styled components, complete API docs, polished code blocks, Vercel deploy.
**Dependencies:** Epic 1
**Epic slug:** docs-polish
**Epic branch:** epic/docs-polish
**Status:** pending

### Stage 2.1: Fix Component Rendering
**Branch prefix:** fix
**Acceptance criteria:**
- [ ] STL provider properly wraps component previews (SSR/hydration fixed)
- [ ] All 57 component pages show styled, interactive previews
- [ ] All 10 block pages show styled previews
- [ ] All 6 chart pages show rendered charts
- [ ] Zero empty or unstyled preview states
**Status:** pending

### Stage 2.2: Code Blocks & UI Polish
**Branch prefix:** feat
**Acceptance criteria:**
- [ ] Shiki syntax highlighting renders correctly in all code blocks (light + dark)
- [ ] Copy button visible on all code blocks (import boxes + code samples)
- [ ] Right padding sufficient to not overlap copy button with code text
- [ ] Component variant documentation matches shadcn/ui variants
- [ ] Docs site overall UI polish: spacing, typography, colors, dark mode
**Status:** pending

### Stage 2.3: Complete Documentation & Deploy
**Branch prefix:** feat
**Acceptance criteria:**
- [ ] Every primitive documented with full API, visual + code samples
- [ ] Every component documented with full API, visual + code samples
- [ ] Every block documented with preview + usage code
- [ ] Every chart documented with preview + usage code
- [ ] Every hook documented with usage examples
- [ ] Every utility documented with usage examples
- [ ] Vercel project configured for docs.vlt.ing
- [ ] `vercel.json` or equivalent deployment config in apps/docs/
- [ ] Docs build succeeds: `yarn build:docs`
**Status:** pending

## Epic 3: Showcase Apps Polish
**Objective:** Both showcases build fine, every page loads, maximum API surface coverage, high UI polish.
**Dependencies:** Epic 1
**Epic slug:** showcase-polish
**Epic branch:** epic/showcase-polish
**Status:** pending

### Stage 3.1: Fix Builds & Core Functionality
**Branch prefix:** fix
**Acceptance criteria:**
- [ ] `yarn build` succeeds for showcase-web (Vite)
- [ ] showcase-web: every page loads without errors
- [ ] showcase-native: Expo build succeeds, all screens load
- [ ] Brand switching and theme toggling work in both showcases
**Status:** pending

### Stage 3.2: API Surface Coverage & UI Polish
**Branch prefix:** feat
**Acceptance criteria:**
- [ ] showcase-web covers: styling tokens, all primitives, all components, all blocks, all charts, all hooks, utils, icons
- [ ] showcase-native covers: all available native primitives and components
- [ ] UI design polish: spacing, alignment, color harmony, dark mode
- [ ] Demo cards are well-organized with clear labels and states
**Status:** pending

## Epic 4: Accessibility Audit
**Objective:** All visual components meet WCAG A standards.
**Dependencies:** Epic 2, Epic 3
**Epic slug:** a11y-audit
**Epic branch:** epic/a11y-audit
**Status:** pending

### Stage 4.1: Audit & Fix
**Branch prefix:** fix
**Acceptance criteria:**
- [ ] axe-core audit run against all visual components (primitives, components, blocks, charts)
- [ ] All WCAG A violations fixed
- [ ] Keyboard navigation verified for all interactive components
- [ ] Focus management verified for all overlay/dialog components
- [ ] Playwright a11y tests updated and passing
**Status:** pending

## Epic 5: README & Ship
**Objective:** Professional README, all workflows green, final verification.
**Dependencies:** Epic 4
**Epic slug:** readme-ship
**Epic branch:** epic/readme-ship
**Status:** pending

### Stage 5.1: README & Final Verification
**Branch prefix:** docs
**Acceptance criteria:**
- [ ] README.md at repo root: intro, features, quick start, docs link (docs.vlt.ing)
- [ ] All 3 GH workflows pass on main
- [ ] `yarn build` succeeds (root + all packages)
- [ ] `yarn typecheck` passes
- [ ] `yarn lint` passes
- [ ] `yarn test` passes
- [ ] Docs site builds and deploys to Vercel
**Status:** pending
