---
slug: production-ready
status: in-progress
created: 2026-03-09
---
# Production-Ready @vlting/ui

## Overview
Elevate @vlting/ui to production-ready shadcn/ui equivalent with full RN support. ~54 components, 19 primitives, 12 blocks already implemented with specs, tests, and STL theming. Visual quality doesn't match shadcn/ui — spacing, contrast, hover/focus states, dark mode issues. No automated quality enforcement. RN support is primitives-only.

**Key decisions:**
- Web + RN in parallel
- shadcn/ui as visual quality reference (match their spacing, sizing, contrast patterns)
- No backwards compat concerns — everything is fair game
- Playwright + axe-core for quality gates
- Token discipline enforced by CI

**Execution order:**
```
E1 (Quality Infra) ──┬──→ E3 (Component Quality)
E2 (Theming) ─────────┘         │
                                 ├──→ E5 (Docs)
E4 (RN Parity) ─────────────────┤
                                 └──→ E6 (AI Tooling)
```

## Metadata
- **Saga issue:** (TBD)
- **Created:** 2026-03-09
- **Auto-merge:** true
- **Integrations:** github

## Epic 1: Quality Infrastructure
**Objective:** Automated quality gates — every subsequent epic ships with proof.
**Dependencies:** none
**Epic slug:** quality-infra
**Epic branch:** epic/production-ready
**Status:** done

### Stage 1.1: Playwright Setup + CI Pipeline
**Branch prefix:** feat
**Acceptance criteria:**
- [x] @playwright/test + @axe-core/playwright installed in showcase-web
- [x] playwright.config.ts with Vite webServer integration
- [x] GitHub Actions quality.yml: lint → typecheck → unit → visual → a11y
- [x] Button has visual + a11y tests passing
- [x] PR-blocking workflow created
**Stage PR:** (on main directly — bootstrapping)
**Status:** done

### Stage 1.2: Visual Regression Framework
**Branch prefix:** feat
**Acceptance criteria:**
- [x] data-testid attributes on showcase DemoCard components
- [x] Isolated component routes (/components/button, /components/card, etc.)
- [x] Per-component test pattern: variant matrix × light/dark mode screenshots
- [x] States: default, hover, focus-visible, active, disabled
- [x] maxDiffPixelRatio: 0.01 threshold
- [x] Baselines captured for top 14 components (38 screenshots)
**Stage PR:** (on main directly — bootstrapping)
**Status:** done

### Stage 1.3: A11y Automation + Token Validation
**Branch prefix:** feat
**Acceptance criteria:**
- [x] axe-core audit for every showcase page (both color modes)
- [x] WCAG 2.2 AA tag filter (wcag2a, wcag2aa, wcag22aa)
- [x] Token validation script: flag hardcoded px/hex/rgb/hsl in component source
- [x] Contrast ratio validation from STL color matrix
- [x] CI fails on a11y violations and token violations
**Status:** done

## Epic 2: Theming System Hardening
**Objective:** STL theming is bulletproof, brand customization is trivial.
**Dependencies:** none (parallel with E1)
**Epic slug:** theming-hardening
**Epic branch:** epic/theming-hardening
**Status:** in-progress

### Stage 2.1: Token Audit + Discipline Enforcement
**Branch prefix:** feat
**Acceptance criteria:**
- [x] All 18 scales audited — completeness, light/dark correctness verified
- [x] Gaps in palette generation (colorGen.utils.ts) fixed
- [x] Transition tokens added as CSS custom properties
- [x] All token scales documented, no gaps
**Status:** done

### Stage 2.2: Brand Customization UX
**Branch prefix:** feat
**Acceptance criteria:**
- [x] Single-hue-to-palette pipeline cleaned up
- [x] User provides hue+saturation → full 12-step palette with correct text contrast
- [x] Complementary palette generation verified (primary→secondary→tertiary)
- [x] Multi-brand demo: 3+ brand configs in showcase
- [x] Brand switch in showcase works flawlessly, both modes
**Status:** done

### Stage 2.3: Animation & Interaction Tokens
**Branch prefix:** feat
**Acceptance criteria:**
- [ ] Animation tokens: --stl-duration-fast, --stl-duration-normal, --stl-easing-default
- [ ] Focus ring tokens: consistent outlineWidth, outlineOffset, outlineColor
- [ ] Hover/press color shift tokens verified and used
- [ ] prefers-reduced-motion support via tokens
- [ ] All interactive states use token-based values
**Status:** pending

## Epic 3: Component Quality Audit & Visual Polish
**Objective:** Every component matches shadcn/ui visual quality.
**Dependencies:** Epic 1, Epic 2
**Epic slug:** component-quality
**Epic branch:** epic/component-quality
**Status:** pending

### Stage 3.1: Automated Gap Report
**Branch prefix:** chore
**Acceptance criteria:**
- [ ] Playwright + axe-core run against all 55 components
- [ ] Token validation script run
- [ ] Generated report: missing focus styles, contrast failures, keyboard issues, token violations
- [ ] Prioritized fix list with severity
**Status:** pending

### Stage 3.2: Interaction States
**Branch prefix:** feat
**Acceptance criteria:**
- [ ] :hover, :focus-visible, :active, :disabled on every interactive component
- [ ] STL tokens used (not hardcoded values)
- [ ] Focus style standard from QUALITY_BASELINE (2px solid, 2px offset, $outlineColor)
- [ ] Smooth transitions on all state changes
- [ ] All interactive components verified by Playwright
**Status:** pending

### Stage 3.3: Token Migration + Spacing Polish
**Branch prefix:** feat
**Acceptance criteria:**
- [ ] ALL hardcoded px/hex values replaced with token references
- [ ] Spacing rhythm audited against shadcn/ui patterns
- [ ] Border-radius consistency audited
- [ ] Typography scale usage audited
- [ ] Token validation script passes with zero violations
**Status:** pending

### Stage 3.4: Visual Polish + Baseline Capture
**Branch prefix:** feat
**Acceptance criteria:**
- [ ] Side-by-side comparison with shadcn/ui for shared components
- [ ] Color harmony, contrast, sizing inconsistencies fixed
- [ ] Dark mode looks intentional (not just inverted)
- [ ] Final Playwright baselines captured for all 55 components (both modes)
**Status:** pending

### Stage 3.5: Test Hardening
**Branch prefix:** test
**Acceptance criteria:**
- [ ] All 55 test files upgraded: keyboard nav, ARIA state assertions, focus management
- [ ] Each test validates its *.spec.md requirements
- [ ] All tests pass, coverage meets spec requirements
**Status:** pending

## Epic 4: React Native Parity
**Objective:** Core components work on React Native. Parallel with E1-E2.
**Dependencies:** none (parallel)
**Epic slug:** rn-parity
**Epic branch:** epic/rn-parity
**Status:** pending

### Stage 4.1: Architecture + stl-native Feature Parity
**Branch prefix:** feat
**Acceptance criteria:**
- [ ] .native.tsx strategy documented and scaffolded
- [ ] stl-native styled() API equivalent to stl-react (variants, conditions, pseudo-states)
- [ ] Current stl-native gaps vs stl-react audited
**Status:** pending

### Stage 4.2: Primitive Parity
**Branch prefix:** feat
**Acceptance criteria:**
- [ ] All 19 web primitives have RN equivalents
- [ ] Gaps filled: Separator, Divider, Skeleton, Spinner, Kbd, Badge, VisuallyHidden, Portal
- [ ] All primitives render on iOS + Android via showcase-native
**Status:** pending

### Stage 4.3: Tier 1 Component Porting
**Branch prefix:** feat
**Acceptance criteria:**
- [ ] Button, Input, Checkbox, Switch, Card, Avatar, Badge, Alert, Separator, Label ported
- [ ] stl-headless used for shared behavior logic
- [ ] Tier 1 components render + interact correctly on iOS + Android
**Status:** pending

### Stage 4.4: Tier 2 Component Porting
**Branch prefix:** feat
**Acceptance criteria:**
- [ ] Dialog, Sheet, Select, Tabs, Accordion, Toast, Tooltip, Dropdown ported
- [ ] Platform-specific behavior (modals, popovers) handled
- [ ] Tier 2 components functional on both platforms
**Status:** pending

### Stage 4.5: Conditional Exports + Showcase
**Branch prefix:** feat
**Acceptance criteria:**
- [ ] package.json "react-native" export condition resolves to .native.tsx
- [ ] apps/showcase-native/ demonstrates all ported components
- [ ] import { Button } from '@vlting/ui/components' works on both web and RN
**Status:** pending

## Epic 5: Documentation Overhaul
**Objective:** Docs match shadcn/ui quality — discoverable, interactive, copy-pasteable.
**Dependencies:** Epic 3
**Epic slug:** docs-overhaul
**Epic branch:** epic/docs-overhaul
**Status:** pending

### Stage 5.1: Fix Rendering + Empty Previews
**Branch prefix:** fix
**Acceptance criteria:**
- [ ] NextJS docs app component rendering debugged (SSR/hydration with STL)
- [ ] Every component page shows a live preview
- [ ] Zero empty preview states across all component pages
**Status:** pending

### Stage 5.2: Interactive Examples + Copy-Paste Patterns
**Branch prefix:** feat
**Acceptance criteria:**
- [ ] Live code editor per component
- [ ] shadcn/ui style: install command, usage code, variant examples, props table
- [ ] Every component page has working interactive example
**Status:** pending

### Stage 5.3: Theming + Block Docs
**Branch prefix:** feat
**Acceptance criteria:**
- [ ] Interactive hue picker showing palette generation
- [ ] Dark mode toggle in docs
- [ ] Block showcase with full-page previews
- [ ] Theming docs demonstrate customization end-to-end
**Status:** pending

## Epic 6: AI-Native Tooling + Expansion
**Objective:** AI agents produce production-quality UI on first attempt. Fill gaps.
**Dependencies:** Epic 3, Epic 5
**Epic slug:** ai-native-tooling
**Epic branch:** epic/ai-native-tooling
**Status:** pending

### Stage 6.1: MCP Server Improvements
**Branch prefix:** feat
**Acceptance criteria:**
- [ ] New tools: get_theme_tokens, audit_component, get_block
- [ ] All api-mapping.json files updated for accuracy
- [ ] MCP tools return accurate, up-to-date info
**Status:** pending

### Stage 6.2: Component Expansion
**Branch prefix:** feat
**Acceptance criteria:**
- [ ] Gap analysis vs shadcn/ui catalog — missing components built
- [ ] Chart completion (7 chart specs verified)
- [ ] Hook expansion: useMediaQuery, useDebounce, useIntersectionObserver, useClipboard
- [ ] Component count competitive with shadcn/ui
**Status:** pending

### Stage 6.3: Block Expansion + AI Generation Skill
**Branch prefix:** feat
**Acceptance criteria:**
- [ ] New blocks: file upload, onboarding wizard, notification center, chat interface
- [ ] Claude skill for UI generation
- [ ] validate_code tool: token discipline, a11y, correct usage, dark mode compat
- [ ] AI-generated code passes all quality gates
**Status:** pending
