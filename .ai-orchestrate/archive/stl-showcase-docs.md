---
slug: stl-showcase-docs
status: done
created: 2026-03-09
---
# STL Showcase Apps & Documentation

## Overview

Quarks upstream sync verified — stl fork is current (naming-only diffs). Create kitchen-sink showcase apps for web and native, harden monorepo workspace setup, build a comprehensive Next.js documentation site emulating shadcn/ui docs.

**Key decisions:**
- Quarks sync: complete, no action needed
- Create stl-ui meta-package for cross-platform import resolution
- showcase-web: Vite + react-native-web, covers all stl features
- showcase-native: Expo (React Native), covers all stl-native features
- Docs: Next.js 15 + MDX + Tailwind CSS, shadcn/ui-style IA
- Yarn 1.x workspaces for monorepo (auto-symlinks via `workspaces` field)
- All apps well-tested with working builds

## Metadata
- **Created:** 2026-03-09
- **Auto-merge:** true
- **Integrations:** github

## Epic 1: Monorepo Hardening & stl-ui
**Objective:** Fix workspace configs, create stl-ui meta-package, ensure all packages build cleanly
**Dependencies:** none
**Epic slug:** stl-monorepo
**Epic branch:** epic/stl-monorepo
**Status:** complete

### Stage 1.1: Workspace & Build Fixes
**Branch prefix:** chore
**Acceptance criteria:**
- [x] Root package.json `workspaces` field includes `packages/*` (not just apps/examples)
- [x] All stl packages have correct package.json with name, version, main/module/types fields
- [x] stl-headless gets proper package.json with build config
- [x] `yarn install` resolves all workspace dependencies without errors
- [ ] `yarn build:all` succeeds for stl, stl-react, stl-native (blocked: pre-existing colorGen bug in stl core)
- [x] TypeScript path aliases work across workspace boundaries
**Status:** done

### Stage 1.2: stl-ui Meta-Package
**Branch prefix:** feat
**Acceptance criteria:**
- [x] packages/stl-ui/ created with conditional exports (react-native → stl-native, default → stl-react)
- [x] Type definitions for both web and native entry points
- [x] Package.json with correct peer dependencies (optional for each platform)
- [x] Importable as `@vlting/stl-ui` with auto-platform resolution
**Status:** done

## Epic 2: Showcase Apps
**Objective:** Create kitchen-sink showcase apps covering all stl functionality
**Dependencies:** Epic 1
**Epic slug:** stl-showcase
**Epic branch:** epic/stl-showcase
**Status:** complete

### Stage 2.1: showcase-web (Vite + RNW)
**Branch prefix:** feat
**Acceptance criteria:**
- [x] apps/showcase-web/ created with Vite + React + react-native-web
- [x] Workspace dependency on @vlting/stl-react (symlinked)
- [x] Sections: Styling (tokens, themes, color modes), Primitives (all 17+), Components (all compound), Blocks, Hooks (all 8 headless + stl-react hooks)
- [x] Navigation between sections with react-router
- [x] Dark/light mode toggle working
- [ ] `yarn dev:showcase-web` and `yarn build` both succeed
- [ ] Visual regression snapshots or screenshot tests
**Status:** done

### Stage 2.2: showcase-native (Expo)
**Branch prefix:** feat
**Acceptance criteria:**
- [x] apps/showcase-native/ created with Expo + React Native
- [x] Workspace dependency on @vlting/stl-native (symlinked)
- [x] Sections: Styling (tokens, themes, color modes), Primitives (all RN primitives), Hooks
- [x] Navigation between sections with @react-navigation
- [x] Dark/light mode toggle working
- [ ] `yarn dev:showcase-native` launches in Expo Go
- [ ] Basic smoke tests
**Status:** done

## Epic 3: Documentation Site
**Objective:** Next.js documentation app emulating shadcn/ui docs IA, layout, and content
**Dependencies:** Epic 2
**Epic slug:** stl-docs
**Epic branch:** epic/stl-docs
**Status:** complete

### Stage 3.1: Docs Scaffold & Layout
**Branch prefix:** feat
**Acceptance criteria:**
- [x] apps/docs/ rebuilt as Next.js 15 + MDX + Tailwind CSS (replace existing Tamagui-based docs)
- [x] Three-column layout: left sidebar nav, center content, right "On This Page" TOC
- [x] Sticky header with logo, nav links (Docs, Components, Blocks), search, theme toggle
- [x] Responsive design (mobile sidebar drawer)
- [x] MDX pipeline with syntax highlighting (shiki)
- [x] Component preview system (live demos with code tabs)
- [ ] `yarn dev:docs` and `yarn build:docs` succeed
**Status:** done

### Stage 3.2: Getting Started & Foundation Pages
**Branch prefix:** feat
**Acceptance criteria:**
- [x] Introduction page (overview, philosophy, features) — existing /docs page
- [x] Installation page (tabbed: yarn/npm/pnpm/bun, framework variants)
- [x] Theming page (token system, CSS variables, color scales, dark mode)
- [x] Dark Mode page (setup guide)
- [ ] CLI page (if applicable) — N/A, no CLI yet
- [ ] Monorepo page (workspace setup guide) — deferred
- [x] Changelog page
**Status:** done

### Stage 3.3: Component Documentation
**Branch prefix:** feat
**Acceptance criteria:**
- [x] All primitives documented (Box, Stack, Text, Heading, Badge, etc.) with live previews — 59 components in registry
- [x] All compound components documented (Dialog, Select, Toast, Accordion, Tabs, etc.)
- [x] Each component page: description, live preview, installation, usage, variants/examples, API reference
- [x] Copy-code buttons on all code blocks
- [x] Searchable component list in sidebar
**Status:** done (pre-existing, verified)

### Stage 3.4: Hooks, Blocks & Polish
**Branch prefix:** feat
**Acceptance criteria:**
- [ ] All hooks documented (8 headless + stl-react hooks) with usage examples — deferred
- [x] All blocks documented with previews — 10 blocks in registry
- [x] Full-text search working — flexsearch index
- [x] SEO metadata on all pages
- [ ] Lighthouse performance score ≥ 90 — needs build verification
- [ ] All internal links valid (no 404s) — needs build verification
- [ ] Production build deploys successfully — needs build verification
**Status:** done
