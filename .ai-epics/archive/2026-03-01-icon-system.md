# Epic: Icon System (Remix Icon)

- **Branch:** epic/icon-system
- **Feature flag:** icon_system
- **GitHub Issue:** #32
- **Epic PR:** #36
- **Created:** 2026-03-01
- **Status:** done
- **Project Node ID:** PVT_kwDODxaco84BP_ab
- **Project Item ID:** PVTI_lADODxaco84BP_abzgmbsgs
- **Status Field ID:** PVTSSF_lADODxaco84BP_abzg-PVjU
- **Status Options:** Planning=dfac620c, Todo=8001c035, In Progress=1078ddc4, Done=1949184c

## Stage 1: Code Generator & Icon Factory
**Objective:** Build the `scripts/generate-icons.mjs` code generator that reads raw SVGs from the `remixicon` npm package, parses SVG path data, and generates per-icon `.tsx` files using a `createIcon()` factory. Also generates `index.ts` barrel export, `types.ts` with `IconName` union, and `manifest.json` with icon metadata. Install `remixicon` as devDependency.
**Estimated scope:** ~8 files (generator script, createIcon factory, generated output scaffold, manifest), ~300 lines of handwritten code + generated output
**GitHub Sub-Issue:** #33
**Board Item ID:** PVTI_lADODxaco84BP_abzgmbshs
**Stage Branch:** feat/icon-system/code-generator
**Stage PR:** #37
**Acceptance criteria:**
- [x] `remixicon` installed as devDependency
- [x] `scripts/generate-icons.mjs` reads all SVGs from `node_modules/remixicon/icons/`
- [x] Generator handles multi-path SVGs (combines paths)
- [x] `packages/icons/createIcon.tsx` factory produces `IconFC`-compatible components using `react-native-svg`
- [x] Generated `.tsx` files in `packages/icons/generated/` (one per icon, ~2800 files)
- [x] `packages/icons/index.ts` barrel export of all generated icons
- [x] `packages/icons/types.ts` with `IconName` union type and `IconCategory` union
- [x] `packages/icons/manifest.json` with icon names, categories, tags, variants
- [x] Generator is reproducible: `node scripts/generate-icons.mjs` produces identical output
**Status:** complete
**Iterations:** 0

## Stage 2: Dynamic Icon, Exports & Integration
**Objective:** Build the `DynamicIcon` component for runtime name-based icon selection, add `./icons` export to `package.json`, create per-category barrel exports, wire into `src/index.ts`, and verify tree-shaking works (importing 1 icon doesn't bundle all 2800). Add `.gitattributes` for generated files.
**Estimated scope:** ~6 files, ~200 lines handwritten
**GitHub Sub-Issue:** #34
**Board Item ID:** PVTI_lADODxaco84BP_abzgmbsh8
**Stage Branch:** feat/icon-system/dynamic-icon-exports
**Stage PR:** #38
**Acceptance criteria:**
- [x] `packages/icons/Icon.tsx` exports `DynamicIcon` component with lazy loading
- [x] `./icons` export added to `package.json` exports map
- [x] Per-category barrel exports in `packages/icons/categories/`
- [x] Icons wired into `src/index.ts` main barrel
- [x] `.gitattributes` marks `packages/icons/generated/` as generated
- [x] Tree-shaking verified: single icon import < 1KB
- [x] `DynamicIcon` accepts `name`, `variant`, `size`, `color` props
**Status:** complete
**Iterations:** 0

## Stage 3: Tests, Accessibility & Validation
**Objective:** Write unit tests for `createIcon` factory, `DynamicIcon` component, and generated icons. Verify accessibility (decorative by default, `aria-hidden`). Validate cross-platform rendering. Run bundle size checks. Update Icon spec if needed.
**Estimated scope:** ~4 files, ~200 lines
**GitHub Sub-Issue:** #35
**Board Item ID:** PVTI_lADODxaco84BP_abzgmbsiE
**Stage Branch:** feat/icon-system/tests-a11y
**Stage PR:** #39
**Acceptance criteria:**
- [x] Unit tests for `createIcon`: renders SVG, forwards size/color, memoized
- [x] Unit tests for `DynamicIcon`: lazy loads correct icon, handles unknown names
- [x] Accessibility: icons render with no implicit accessible name (decorative)
- [x] Generated icons conform to `IconFC` type (TypeScript compiles without errors)
- [x] Existing `Icon` primitive works unchanged with Remix icons
- [x] Coexists with `@tamagui/lucide-icons` (no naming collisions verified in tests)
- [x] All tests pass, lint clean, no TypeScript errors
**Status:** complete
**Iterations:** 0
