# Epic: Block System

- **Branch:** epic/block-system
- **Feature flag:** block_system
- **GitHub Issue:** #50
- **Epic PR:** #55
- **Created:** 2026-03-02
- **Status:** in-review
- **Project Node ID:** PVT_kwDODxaco84BP_ab
- **Project Item ID:** PVTI_lADODxaco84BP_abzgmcTFo
- **Status Field ID:** PVTSSF_lADODxaco84BP_abzg-PVjU
- **Status Options:** Planning=1ab91906, Todo=7dbd5883, In Progress=bf105a86, In Review=7e73f574, Done=e0bcb0e8

## Stage 1: Foundation & Auth Blocks
**Objective:** Set up `packages/blocks/` structure with shared types, barrel exports, and build all 10 auth blocks (Login01-05, Signup01-05) with specs and tests.
**Estimated scope:** ~25 files, ~2000 lines
**GitHub Sub-Issue:** #51
**Board Item ID:** PVTI_lADODxaco84BP_abzgmcTJg
**Stage Branch:** feat/block-system/auth-blocks
**Stage PR:** #56
**Acceptance criteria:**
- [x] `packages/blocks/` directory structure created with `_shared/types.ts`
- [x] `packages/blocks/index.ts` barrel export exists
- [x] Login01-05 implemented with typed props (onSubmit, socialProviders, forgotPasswordHref, etc.)
- [x] Signup01-05 implemented with typed props
- [x] Shared auth form utilities in `login/_shared.tsx`
- [x] Each auth block has a spec.md and test file
- [x] All auth blocks compose only from @vlting/ui components (no raw HTML beyond styledHtml)
- [x] All auth blocks use design tokens exclusively (no hardcoded colors/spacing)
- [x] All auth blocks are keyboard navigable with proper focus management
- [x] All auth blocks have `<form>` landmark and associated `<label>` elements
**Status:** complete
**Iterations:** 0

## Stage 2: Sidebar Blocks (01-08)
**Objective:** Build sidebar shared utilities (NavItem, NavGroup types) and implement the 8 simpler sidebar block variants (Sidebar01-08) with specs and tests.
**Estimated scope:** ~20 files, ~2500 lines
**GitHub Sub-Issue:** #52
**Board Item ID:** PVTI_lADODxaco84BP_abzgmcTKI
**Stage Branch:** feat/block-system/sidebar-01-08
**Stage PR:** #57
**Acceptance criteria:**
- [x] Shared sidebar types (NavItem, NavGroup) in `sidebar/_shared.tsx`
- [x] Sidebar01 (simple navigation grouped by section)
- [x] Sidebar02 (collapsible sections)
- [x] Sidebar03 (submenus / nested navigation)
- [x] Sidebar04 (floating variant with submenus)
- [x] Sidebar05 (collapsible submenus)
- [x] Sidebar06 (submenus as dropdowns)
- [x] Sidebar07 (collapses to icons)
- [x] Sidebar08 (inset with secondary navigation)
- [x] Each sidebar block has a spec.md and test file
- [x] All sidebar blocks use design tokens exclusively
- [x] All sidebar blocks have `<nav>` or `<aside>` landmark structure
- [x] Keyboard navigation works within all sidebar variants
**Status:** complete
**Iterations:** 0

## Stage 3: Sidebar Blocks (09-16) + Dashboard
**Objective:** Build the 8 complex sidebar variants (Sidebar09-16) and the full Dashboard01 block (sidebar + charts + data table). These blocks compose more sophisticated patterns.
**Estimated scope:** ~25 files, ~3000 lines
**GitHub Sub-Issue:** #53
**Board Item ID:** PVTI_lADODxaco84BP_abzgmcTKk
**Stage Branch:** feat/block-system/sidebar-09-16
**Stage PR:** #58
**Acceptance criteria:**
- [x] Sidebar09 (collapsible nested sidebars)
- [x] Sidebar10 (sidebar in a popover)
- [x] Sidebar11 (collapsible file tree)
- [x] Sidebar12 (sidebar with calendar)
- [x] Sidebar13 (sidebar in a dialog)
- [x] Sidebar14 (sidebar on the right)
- [x] Sidebar15 (left and right sidebars)
- [x] Sidebar16 (sidebar with sticky site header)
- [x] Dashboard01 (full dashboard with sidebar, charts, data table)
- [x] Each block has a spec.md and test file
- [x] File tree helper built in sidebar/_shared.tsx for Sidebar11
- [x] Dashboard01 composes Chart and DataTable components correctly
- [x] All blocks use design tokens exclusively
- [x] All blocks have proper landmark structure
**Status:** complete
**Iterations:** 0

## Stage 4: Cross-Platform Originals + Integration
**Objective:** Build 3 cross-platform original blocks (MobileTabLayout, MasterDetail, AppShellResponsive), add `@vlting/ui/blocks` export path, update main barrel, and verify full test suite + brand theming.
**Estimated scope:** ~15 files, ~1500 lines
**GitHub Sub-Issue:** #54
**Board Item ID:** PVTI_lADODxaco84BP_abzgmcTLg
**Stage Branch:** feat/block-system/cross-platform-originals
**Stage PR:** (pending)
**Acceptance criteria:**
- [x] MobileTabLayout block implemented (tab bar navigation, mobile-first)
- [x] MasterDetail block implemented (split view responsive pattern)
- [x] AppShellResponsive block implemented (responsive sidebar with Sheet drawer on mobile)
- [x] Each original block has spec.md and test file
- [x] `@vlting/ui/blocks` export added to package.json
- [x] Block exports added to main `src/index.ts` barrel
- [x] Full test suite passes (all 30 block test files)
- [x] All blocks verified with default brand + shadcn brand
- [x] All blocks keyboard navigable
- [x] All blocks have proper landmark structure
**Status:** complete
**Iterations:** 0
