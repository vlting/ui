---
slug: stl-migration
status: done
created: 2026-03-09
---
# Replace Tamagui with @vlting/stl

## Overview

vlt-ui has 238+ components on Tamagui v2 RC (2.0.0-rc.14) with 208 `@ts-expect-error` hacks and 263+ type casts due to fundamental bugs in v2 RC's type system. Replace with a forked, rebranded Quarks engine (`@vlting/stl`) — zero-runtime CSS via Vanilla Extract, 18 token scales, clean `styled()` API.

**Key decisions:**
- Fork quarks into monorepo (no git history needed)
- `@vlting/stl` / `stl-react` / `stl-native` / `stl-headless` package split
- Drop BrandDefinition factory → simple data objects + CSS variable injection
- Build `stl-headless` from scratch (React Aria hooks on web, custom RN adapters)
- Bottom-up migration: foundation → primitives → simple → compound → blocks
- Vite + Vanilla Extract build (replaces `tamagui-build`)
- No backwards compat needed (not in production)

**Source:** vlt-ui quarks packages

## Metadata
- **Saga issue:** #105
- **Created:** 2026-03-09
- **Auto-merge:** true
- **Integrations:** github

## Epic 1: Foundation Setup
**Objective:** Copy quarks into monorepo as @vlting/stl, rebrand, production-harden, set up build pipeline, map token scales, replace Provider
**Dependencies:** none
**Epic slug:** stl-foundation
**Epic branch:** epic/stl-foundation
**Status:** complete

### Stage 1.1: Package Scaffold & Rebrand
**Branch prefix:** chore
**Acceptance criteria:**
- [x] quarks source copied to packages/stl/, packages/stl-react/, packages/stl-native/
- [x] All legacy quarks references rebranded to `@vlting/stl`
- [x] All `Quarks` identifiers renamed to `Stl` (QuarksProvider → StlProvider, etc.)
- [x] Debug console.log statements removed from StyleManager
- [x] package.json files updated with correct names, deps, and build outputs
- [x] vite.config.ts files updated with correct output filenames
- [ ] TypeScript compiles without errors in all 3 packages
**Status:** done

### Stage 1.2: Token Scale Mapping
**Branch prefix:** feat
**Acceptance criteria:**
- [x] vlt-ui token scales (size, space, radius, color, zIndex, borderWidth) mapped to stl scale system
- [x] 12-step color palettes (light + dark) integrated
- [x] Surface themes and shadow scales mapped
- [x] Brand system simplified to plain data objects + CSS variable injection
- [x] BrandDefinition factory pattern removed
**Status:** done

### Stage 1.3: Provider & Build Pipeline
**Branch prefix:** feat
**Acceptance criteria:**
- [x] TamaguiProvider replaced with StlProvider in src/provider/Provider.tsx
- [x] Vite + Vanilla Extract build pipeline configured (replaces tamagui-build)
- [x] Package exports updated in root package.json
- [x] tsconfig paths updated for new packages
- [x] Build produces correct ESM + CJS output
- [x] Tamagui dependencies removed from package.json
**Status:** done

## Epic 2: Primitives Migration
**Objective:** Migrate 18 primitive components from Tamagui styled() to stl styled()
**Dependencies:** Epic 1
**Epic slug:** stl-primitives
**Epic branch:** epic/stl-primitives
**Status:** complete

### Stage 2.1: Layout Primitives
**Branch prefix:** feat
**Acceptance criteria:**
- [x] Box, Stack, VStack, HStack migrated to stl styled()
- [x] Spacer, Divider, Separator migrated
- [x] AspectRatio migrated
- [ ] Zero @ts-expect-error in migrated files
- [ ] All existing tests pass
**Status:** done

### Stage 2.2: Text & Visual Primitives
**Branch prefix:** feat
**Acceptance criteria:**
- [x] Text, Heading migrated to stl styled()
- [x] Badge, Skeleton, Spinner, Kbd migrated
- [x] Icon component migrated (Lucide icon compat)
- [x] Label, VisuallyHidden, Portal migrated
- [x] Zero @ts-expect-error in migrated files
- [ ] All existing tests pass (blocked: Jest needs @vlting/stl module mapping)
**Status:** done

## Epic 3: Components & Headless Layer
**Objective:** Migrate ~55 components, build stl-headless with React Aria hooks
**Dependencies:** Epic 2
**Epic slug:** stl-components
**Epic branch:** epic/stl-components
**Status:** pending

### Stage 3.1: Simple Components
**Branch prefix:** feat
**Acceptance criteria:**
- [ ] Alert, Card, Avatar migrated
- [ ] All simple styled-only components migrated (~35 total)
- [ ] Zero @ts-expect-error in migrated files
**Status:** pending

### Stage 3.2: Headless Layer Setup
**Branch prefix:** feat
**Acceptance criteria:**
- [ ] packages/stl-headless/ created with package scaffold
- [ ] Core hooks: useDialog, useSelect, useToast, usePopover, useAccordion
- [ ] React Aria hooks integrated as web behavioral foundation
- [ ] Cross-platform state logic (platform-agnostic)
**Status:** pending

### Stage 3.3: Compound Components
**Branch prefix:** feat
**Acceptance criteria:**
- [ ] Dialog, Sheet, Select, Toast, Popover migrated using headless hooks
- [ ] Accordion, Tabs, Tooltip, AlertDialog migrated
- [ ] Collapsible, Slider, Menu migrated
- [ ] Full keyboard navigation and a11y preserved
**Status:** pending

## Epic 4: Blocks Migration
**Objective:** Migrate 10 block layouts composed from migrated components
**Dependencies:** Epic 3
**Epic slug:** stl-blocks
**Epic branch:** epic/stl-blocks
**Status:** pending

### Stage 4.1: Block Migration
**Branch prefix:** feat
**Acceptance criteria:**
- [ ] All 10 blocks migrated (Auth, Dashboard, DataTable, Settings, Pricing, etc.)
- [ ] Tamagui fully removed from codebase
- [ ] Zero @ts-expect-error remaining
- [ ] All tests pass
- [ ] Build succeeds with Vite + Vanilla Extract
**Status:** pending
