---
slug: shadcn-parity
status: in-progress
created: 2026-03-01
---
# shadcn Parity, Docs Site & AI-Native Design System

## Overview
Transform `@vlting/ui` from a component library into a complete, AI-native design system with full shadcn/ui component parity, blocks, charts, icons, Google Fonts, docs site, AI skill, and MCP server.

## Metadata
- **Created:** 2026-03-01
- **Auto-merge:** true
- **Integrations:** github
- **GitHub Issue:** #11
- **Project Node ID:** PVT_kwDODxaco84BP_ab
- **Project Item ID:** PVTI_lADODxaco84BP_abzgmbNWs
- **Status Field ID:** PVTSSF_lADODxaco84BP_abzg-PVjU
- **Status Options:** Planning=1ab91906, Todo=7dbd5883, In Progress=bf105a86, In Review=7e73f574, Done=e0bcb0e8

## Epic 1: Token Audit & Font System
**Objective:** Ensure all components use design tokens exclusively, build Google Fonts system with 4 font slots and h1–h6 weight alternation.
**Dependencies:** none
**Epic slug:** token-audit-fonts
**Epic branch:** epic/token-audit-fonts
**Tech spec:** .ai-orchestrate/docs/token-audit-fonts/tech-spec.md
**Status:** complete
**Review notes:** All 4 stages delivered (PRs #18–#21). Epic PR #17 merged. Full token audit, font system with 4 slots, heading weight alternation, cross-platform FontLoader.

## Epic 2: Component Parity & API Mapping
**Objective:** Close the component gap with shadcn, ensure API superset compatibility, produce machine-readable API mapping docs.
**Dependencies:** Epic 1
**Epic slug:** component-parity
**Epic branch:** epic/component-parity
**Tech spec:** .ai-orchestrate/docs/component-parity/tech-spec.md
**Status:** complete
**Review notes:** All 4 stages delivered (PRs #28–#31). Epic PR #27 merged. NavigationMenu, Direction provider, InputGroup, Sonner-style toast, DataTable, 68 API mapping JSONs.

## Epic 3: Icon System (Remix Icon)
**Objective:** Integrate full Remix Icon set (2800+ icons) with tree-shakeable imports, theme-aware sizing/color, cross-platform rendering.
**Dependencies:** Epic 1
**Epic slug:** icon-system
**Epic branch:** epic/icon-system
**Tech spec:** .ai-orchestrate/docs/icon-system/tech-spec.md
**Status:** complete
**Review notes:** All 3 stages delivered (PRs #37–#39). Epic PR #36 merged. 3229 icons, createIcon factory, DynamicIcon with React.lazy, tree-shakeable imports.

## Epic 4: Chart System (Victory Native)
**Objective:** Build full chart system — 6 types, 69 variants, themed via design tokens, cross-platform.
**Dependencies:** Epic 1
**Epic slug:** chart-system
**Epic branch:** epic/chart-system
**Tech spec:** .ai-orchestrate/docs/chart-system/tech-spec.md
**Status:** complete
**Review notes:** All 4 stages delivered (PRs #46–#49). Epic PR #45 merged. 6 chart types, 69 variants, ChartContainer, ChartTooltip, ChartLegend, 54 tests.

## Epic 5: Block System
**Objective:** Build all 27 shadcn blocks + cross-platform originals, composed from @vlting/ui components.
**Dependencies:** Epic 2, Epic 3, Epic 4
**Epic slug:** block-system
**Epic branch:** epic/block-system
**Tech spec:** .ai-orchestrate/docs/block-system/tech-spec.md
**Status:** complete
**Review notes:** All 4 stages delivered (PRs #56–#59). Epic PR #55 merged. 30 blocks, shared auth form utils, sidebar compound patterns, 255 tests.

## Epic 6: Documentation Site (Next.js)
**Objective:** Build Next.js documentation site with pages for every component, block, chart, and icon. Brand switcher, interactive playground, code examples, API reference.
**Dependencies:** Epic 2, Epic 3, Epic 4, Epic 5
**Epic slug:** docs-site
**Epic branch:** epic/docs-site
**Epic PR:** #66
**GitHub Sub-Issue:** #60
**Tech spec:** .ai-orchestrate/docs/docs-site/tech-spec.md
**Status:** complete
**Review notes:** All 15 stages delivered. Epic PR #66 merged. Next.js 15 docs site at apps/docs/ with 99+ pages, brand switching, icon browser, WCAG AA contrast, Flexsearch, responsive layout.

### Stage 1: Foundation
**Status:** complete
**Stage PR:** #67

### Stage 2: Component Pages
**Status:** complete
**Stage PR:** #68

### Stage 3: Block + Chart + Remaining Component Pages
**Status:** complete
**Stage PR:** #69

### Stage 4: Icon Browser + Theming + Migration
**Status:** complete
**Stage PR:** #70

### Stage 5: Search + Polish
**Status:** complete
**Stage PR:** #71

### Stage 6: Rebase & Navigation/Layout Fixes
**Status:** complete
**Stage PR:** #75

### Stage 7: Color Contrast & Accessibility Audit
**Status:** complete
**Stage PR:** #76

### Stage 8: Content Completeness
**Status:** complete
**Stage PR:** #77

### Stage 9: Runtime Errors & Layout Fixes
**Status:** complete
**Stage PR:** #80

### Stage 10: Theme, Code Blocks & Content Polish
**Status:** complete
**Stage PR:** #81

### Stage 11: Docs Site Relocation
**Status:** complete
**Stage PR:** #87

### Stage 12: Component Bug Fixes
**Status:** complete
**Stage PR:** #88

### Stage 13: Component Visual Quality
**Status:** complete
**Stage PR:** #89

### Stage 14: Console Error Audit
**Status:** complete
**Stage PR:** #90

### Stage 15: Blocks Reimagining
**Status:** complete

## Epic 7: AI Skill + Portable Docs
**Objective:** Create Claude Code SKILL.md with component selection heuristics, composition rules, anti-patterns, and token enforcement. Create llms.txt and JSON component registry for multi-agent compatibility.
**Dependencies:** Epic 2, Epic 3, Epic 4
**Epic slug:** ai-skill
**Epic branch:** epic/ai-skill
**Epic PR:** #TBD
**GitHub Sub-Issue:** #92
**Tech spec:** .ai-orchestrate/docs/ai-skill/tech-spec.md
**Status:** in-progress

### Stage 1: SKILL.md
**Branch prefix:** feat
**Acceptance criteria:**
- [ ] SKILL.md at docs/ai/SKILL.md with all sections
- [ ] Component selection decision trees for common UI patterns
- [ ] Composition rules for compound components
- [ ] Token enforcement rules
- [ ] Anti-patterns section
- [ ] Cross-platform guidance
- [ ] Accessibility defaults
**Status:** pending

### Stage 2: Component Registry JSON
**Branch prefix:** feat
**Acceptance criteria:**
- [ ] registry.json at docs/ai/registry.json
- [ ] All 52 components, 20 primitives, 10 blocks, 8 chart types included
- [ ] Each entry has props, variants, whenToUse, examples, accessibility, platforms
- [ ] Auto-generated from API mapping JSONs where possible
**Status:** pending

### Stage 3: llms.txt + llms-full.txt
**Branch prefix:** feat
**Acceptance criteria:**
- [ ] llms.txt at docs/ai/llms.txt following llmstxt.org convention
- [ ] llms-full.txt at docs/ai/llms-full.txt with comprehensive reference
- [ ] Covers all components, blocks, charts with examples
- [ ] Decision trees and anti-patterns included in full version
**Status:** pending

## Epic 8: MCP Server
**Objective:** Build MCP server exposing tools for component lookup, code generation, design system validation, migration mapping, and icon search. Publishable as npm package.
**Dependencies:** Epic 7
**Epic slug:** mcp-server
**Epic branch:** epic/mcp-server
**Status:** pending
