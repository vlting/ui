---
slug: stl-showcase-docs
status: in-progress
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
**Status:** pending

### Stage 1.1: Workspace & Build Fixes
**Branch prefix:** chore
**Acceptance criteria:**
- [ ] Root package.json `workspaces` field includes `packages/*` (not just apps/examples)
- [ ] All stl packages have correct package.json with name, version, main/module/types fields
- [ ] stl-headless gets proper package.json with build config
- [ ] `yarn install` resolves all workspace dependencies without errors
- [ ] `yarn build:all` succeeds for stl, stl-react, stl-native
- [ ] TypeScript path aliases work across workspace boundaries
**Status:** pending

### Stage 1.2: stl-ui Meta-Package
**Branch prefix:** feat
**Acceptance criteria:**
- [ ] packages/stl-ui/ created with conditional exports (react-native → stl-native, default → stl-react)
- [ ] Type definitions for both web and native entry points
- [ ] Package.json with correct peer dependencies (optional for each platform)
- [ ] Importable as `@vlting/stl-ui` with auto-platform resolution
**Status:** pending

## Epic 2: Showcase Apps
**Objective:** Create kitchen-sink showcase apps covering all stl functionality
**Dependencies:** Epic 1
**Epic slug:** stl-showcase
**Epic branch:** epic/stl-showcase
**Status:** pending

### Stage 2.1: showcase-web (Vite + RNW)
**Branch prefix:** feat
**Acceptance criteria:**
- [ ] apps/showcase-web/ created with Vite + React + react-native-web
- [ ] Workspace dependency on @vlting/stl-react (symlinked)
- [ ] Sections: Styling (tokens, themes, color modes), Primitives (all 17+), Components (all compound), Blocks, Hooks (all 8 headless + stl-react hooks)
- [ ] Navigation between sections with react-router
- [ ] Dark/light mode toggle working
- [ ] `yarn dev:showcase-web` and `yarn build` both succeed
- [ ] Visual regression snapshots or screenshot tests
**Status:** pending

### Stage 2.2: showcase-native (Expo)
**Branch prefix:** feat
**Acceptance criteria:**
- [ ] apps/showcase-native/ created with Expo + React Native
- [ ] Workspace dependency on @vlting/stl-native (symlinked)
- [ ] Sections: Styling (tokens, themes, color modes), Primitives (all RN primitives), Hooks
- [ ] Navigation between sections with @react-navigation
- [ ] Dark/light mode toggle working
- [ ] `yarn dev:showcase-native` launches in Expo Go
- [ ] Basic smoke tests
**Status:** pending

## Epic 3: Documentation Site
**Objective:** Next.js documentation app emulating shadcn/ui docs IA, layout, and content
**Dependencies:** Epic 2
**Epic slug:** stl-docs
**Epic branch:** epic/stl-docs
**Status:** pending

### Stage 3.1: Docs Scaffold & Layout
**Branch prefix:** feat
**Acceptance criteria:**
- [ ] apps/docs/ rebuilt as Next.js 15 + MDX + Tailwind CSS (replace existing Tamagui-based docs)
- [ ] Three-column layout: left sidebar nav, center content, right "On This Page" TOC
- [ ] Sticky header with logo, nav links (Docs, Components, Blocks), search, theme toggle
- [ ] Responsive design (mobile sidebar drawer)
- [ ] MDX pipeline with syntax highlighting (shiki)
- [ ] Component preview system (live demos with code tabs)
- [ ] `yarn dev:docs` and `yarn build:docs` succeed
**Status:** pending

### Stage 3.2: Getting Started & Foundation Pages
**Branch prefix:** feat
**Acceptance criteria:**
- [ ] Introduction page (overview, philosophy, features)
- [ ] Installation page (tabbed: yarn/npm/pnpm/bun, framework variants)
- [ ] Theming page (token system, CSS variables, color scales, dark mode)
- [ ] Dark Mode page (setup guide)
- [ ] CLI page (if applicable)
- [ ] Monorepo page (workspace setup guide)
- [ ] Changelog page
**Status:** pending

### Stage 3.3: Component Documentation
**Branch prefix:** feat
**Acceptance criteria:**
- [ ] All primitives documented (Box, Stack, Text, Heading, Badge, etc.) with live previews
- [ ] All compound components documented (Dialog, Select, Toast, Accordion, Tabs, etc.)
- [ ] Each component page: description, live preview, installation, usage, variants/examples, API reference
- [ ] Copy-code buttons on all code blocks
- [ ] Searchable component list in sidebar
**Status:** pending

### Stage 3.4: Hooks, Blocks & Polish
**Branch prefix:** feat
**Acceptance criteria:**
- [ ] All hooks documented (8 headless + stl-react hooks) with usage examples
- [ ] All blocks documented with previews
- [ ] Full-text search working
- [ ] SEO metadata on all pages
- [ ] Lighthouse performance score ≥ 90
- [ ] All internal links valid (no 404s)
- [ ] Production build deploys successfully
**Status:** pending
