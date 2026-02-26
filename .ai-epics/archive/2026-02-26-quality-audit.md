# Epic: Quality Audit Fixes

- **Branch:** fix/quality-audit
- **Feature flag:** quality_audit
- **GitHub Issue:** #3
- **Created:** 2026-02-26
- **Status:** in-review (PR #10 — Stages 4-5)

## Stage 1: TypeScript & Lint Error Fixes
**Objective:** Eliminate all 275 TypeScript errors and 285 Biome lint errors to establish a clean baseline before making functional changes.
**Estimated scope:** ~24 TS files, ~10 lint files, ~400 lines
**GitHub Sub-Issue:** #4
**Acceptance criteria:**
- [x] `npx tsc --noEmit` exits with 0 errors
- [x] `yarn lint` exits with 0 errors (remaining 47 warnings are pre-existing a11y/token issues addressed in later stages)
- [x] No functional behavior changes — only @ts-expect-error annotations, formatting, and unused import removal
**Status:** complete
**Iterations:** 0

## Stage 2: Critical Keyboard Accessibility — Native Buttons
**Objective:** Replace all `<div role="button">` / `<div role="menuitem">` patterns with native `<button>` elements or `styledHtml('button')` across 10 components. Fix the `tag="button"` bug in DatePicker/DateRangePicker.
**Estimated scope:** ~12 files, ~600 lines
**GitHub Sub-Issue:** #5
**Acceptance criteria:**
- [x] Calendar, Carousel, Combobox, ContextMenu, DatePicker, DateRangePicker, DropdownMenu, Menubar, NavigationMenu, Sidebar all use native `<button>` for interactive triggers
- [x] DatePicker and DateRangePicker no longer use `tag: 'button'` in styled()
- [x] All replaced elements are keyboard-focusable (Tab) and activatable (Enter/Space)
- [x] No regressions in existing tests
**Status:** complete
**Iterations:** 0

## Stage 3: Focus Indicators
**Objective:** Add `focusVisibleStyle` to all interactive components that currently lack it, following the standard pattern from FRONTEND_QUALITY.contract.md.
**Estimated scope:** ~30 files, ~300 lines
**GitHub Sub-Issue:** #6
**Acceptance criteria:**
- [x] All interactive components define `focusVisibleStyle` with the standard outline pattern
- [x] Verified against the audit list: DropdownMenu, ContextMenu, Combobox, Command, Menubar, NavigationMenu, Calendar, Carousel, DatePicker, DateRangePicker, Sidebar, Resizable, HoverCard, Collapsible, Textarea, and others
- [x] No regressions in existing tests
**Status:** complete
**Iterations:** 0

## Stage 4: Token Discipline
**Objective:** Replace hardcoded pixel values (fontSize, padding, width, height, gap, borderRadius, lineHeight) with design tokens across 16+ components.
**Estimated scope:** ~20 files, ~500 lines
**GitHub Sub-Issue:** #7
**Acceptance criteria:**
- [x] No raw numeric fontSize, padding, margin, gap, width, height, or borderRadius values in component source (except where tokens genuinely don't apply)
- [x] Components use `$` token syntax for all sizing and spacing
- [x] Affected components: Kbd, AspectRatio, Spinner, Switch, Avatar, Alert, ButtonGroup, Typography, Checkbox, RadioGroup, Select, Dialog, AlertDialog, Breadcrumb, Carousel, Calendar, Combobox, Command, ContextMenu, DatePicker, DateRangePicker, Drawer, DropdownMenu, HoverCard, InputOTP, Menubar, NativeSelect, NavigationMenu, Resizable, Sidebar
- [x] No visual regressions (verified via kitchen-sink)
**Status:** complete
**Iterations:** 2

## Stage 5: Reduced Motion, Cross-Platform & Misc Cleanup
**Objective:** Add `prefers-reduced-motion` support to animated components, address cross-platform issues, and fix remaining minor audit findings.
**Estimated scope:** ~15 files, ~400 lines
**GitHub Sub-Issue:** #8
**Acceptance criteria:**
- [x] Spinner, Carousel, Accordion, Sidebar respect `prefers-reduced-motion`
- [x] ButtonGroup has `role="group"` and `aria-label`
- [x] Icon has default `aria-hidden="true"` for decorative usage
- [x] Drawer Title uses a heading element
- [x] Divider has `role="separator"` and `aria-orientation`
- [x] Textarea has `focusVisibleStyle`
- [x] No regressions in existing tests
**Status:** complete
**Iterations:** 0
