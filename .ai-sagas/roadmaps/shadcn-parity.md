---
saga: shadcn-parity
status: in-progress
created: 2026-03-01
---

# Saga: shadcn-parity

- **Branch:** saga/shadcn-parity
- **PRD:** `.ai-sagas/docs/shadcn-parity/prd.md`
- **GitHub Issue:** #11
- **Created:** 2026-03-01
- **Status:** in-progress

---

## Epic 1: Token Audit & Font System
**Objective:** Ensure all existing components use design tokens exclusively (no hardcoded visual values), and build the Google Fonts system with 4 font slots and h1–h6 weight alternation. This is the foundation — every subsequent epic depends on a clean token layer.
**PRD coverage:** FR-6 (Google Fonts System), FR-11 (Token-Based Styling)
**Dependencies:** none
**Estimated stages:** ~4
**Epic slug:** token-audit-fonts
**Epic Roadmap:** `.ai-epics/roadmaps/2026-03-01-token-audit-fonts.md`
**Tech Spec:** `.ai-epics/docs/token-audit-fonts/tech-spec.md`
**Status:** complete
**Review notes:** All 4 stages delivered (PRs #18–#21). Epic PR #17 merged to main. Full token audit complete — zero hardcoded visual values remain. Font system with 4 slots, heading weight alternation, and cross-platform FontLoader (web + RN via expo-font) operational. PRD alignment: FR-6 and FR-11 fully addressed.

## Epic 2: Component Parity & API Mapping
**Objective:** Close the component gap with shadcn (add missing components, promote primitives), ensure API superset compatibility, and produce machine-readable API mapping documentation for every component.
**PRD coverage:** FR-1 (Component Parity), FR-2 (API Compatibility & Migration)
**Dependencies:** Epic 1
**Estimated stages:** ~5
**Epic slug:** component-parity
**Epic Roadmap:** `.ai-epics/roadmaps/2026-03-01-component-parity.md`
**Tech Spec:** `.ai-epics/docs/component-parity/tech-spec.md`
**Status:** complete
**Review notes:** All 4 stages delivered (PRs #28–#31). Epic PR #27 ready for review. NavigationMenu Home/End fix, Direction provider, Item compound component, InputGroup, Sonner-style toast API, DataTable, and comprehensive API mapping docs (68 JSON files + migration guide + primitive audit). PRD alignment: FR-1 and FR-2 fully addressed (Chart component correctly scoped to Epic 4).

## Epic 3: Icon System (Remix Icon)
**Objective:** Integrate the full Remix Icon set (2800+ icons, filled + outline) with tree-shakeable imports, theme-aware sizing/color, and cross-platform rendering.
**PRD coverage:** FR-5 (Icon System)
**Dependencies:** Epic 1
**Estimated stages:** ~3
**Epic slug:** icon-system
**Epic Roadmap:** `.ai-epics/roadmaps/2026-03-01-icon-system.md`
**Tech Spec:** `.ai-epics/docs/icon-system/tech-spec.md`
**Status:** complete
**Review notes:** All 3 stages delivered (PRs #37–#39). Epic PR #36 ready for review. 3229 Remix Icons generated via code generator, createIcon factory with react-native-svg, DynamicIcon with React.lazy, per-category barrels, tree-shakeable imports (235 bytes/icon), 23 tests passing. PRD alignment: FR-5 fully addressed (Icon browser deferred to Epic 6 as planned).

## Epic 4: Chart System (Victory Native)
**Objective:** Build the full chart system using Victory Native — 6 chart types, 69 variants, themed via design tokens, rendering cross-platform.
**PRD coverage:** FR-3 (Chart System)
**Dependencies:** Epic 1
**Estimated stages:** ~4
**Epic slug:** chart-system
**Epic Roadmap:** `.ai-epics/roadmaps/2026-03-02-chart-system.md`
**Tech Spec:** `.ai-epics/docs/chart-system/tech-spec.md`
**Status:** in-progress
**Review notes:**

## Epic 5: Block System
**Objective:** Build all 27 shadcn blocks + cross-platform originals, composed entirely from `@vlting/ui` components. Blocks render on web and React Native, respect brand theming.
**PRD coverage:** FR-4 (Block System)
**Dependencies:** Epic 2, Epic 3, Epic 4
**Estimated stages:** ~5
**Epic slug:** block-system
**Epic Roadmap:** (filled during EXECUTE)
**Tech Spec:** (filled during EXECUTE)
**Status:** pending
**Review notes:**

## Epic 6: Documentation Site (Next.js)
**Objective:** Build a Next.js documentation site with pages for every component, block, chart, and icon. Includes site-level brand switcher, platform toggle, interactive playground, code examples, and API reference.
**PRD coverage:** FR-7 (Documentation Site)
**Dependencies:** Epic 2, Epic 3, Epic 4, Epic 5
**Estimated stages:** ~5
**Epic slug:** docs-site
**Epic Roadmap:** (filled during EXECUTE)
**Tech Spec:** (filled during EXECUTE)
**Status:** pending
**Review notes:**

## Epic 7: AI Skill + Portable Docs
**Objective:** Create the Claude Code SKILL.md with component selection heuristics, composition rules, anti-patterns, and token enforcement. Create llms.txt and JSON component registry for multi-agent compatibility.
**PRD coverage:** FR-8 (AI Skill), FR-9 (Portable AI Documentation)
**Dependencies:** Epic 2, Epic 3, Epic 4
**Estimated stages:** ~3
**Epic slug:** ai-skill
**Epic Roadmap:** (filled during EXECUTE)
**Tech Spec:** (filled during EXECUTE)
**Status:** pending
**Review notes:**

## Epic 8: MCP Server
**Objective:** Build an MCP server exposing tools for component lookup, code generation, design system validation, migration mapping, and icon search. Publishable as npm package, compatible with Claude Code, Cursor, and any MCP client.
**PRD coverage:** FR-10 (MCP Server)
**Dependencies:** Epic 7
**Estimated stages:** ~4
**Epic slug:** mcp-server
**Epic Roadmap:** (filled during EXECUTE)
**Tech Spec:** (filled during EXECUTE)
**Status:** pending
**Review notes:**
