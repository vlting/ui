---
epic: block-system
saga: shadcn-parity
prd: ../.ai-sagas/docs/shadcn-parity/prd.md
created: 2026-03-02
---

# Tech Spec: Block System

## Context

This epic addresses **FR-4 (Block System)** from the shadcn-parity PRD: pre-composed layout blocks covering all 27 shadcn blocks plus cross-platform originals.

**Prior epics established:**
- Epic 1: Token system, font slots with heading weight alternation, FontLoader
- Epic 2: Full component parity (57 components), API mapping docs, DataTable, InputGroup, NavigationMenu, Direction
- Epic 3: 3229 Remix Icons with tree-shakeable imports, DynamicIcon, createIcon factory
- Epic 4: 6 chart types (Area, Bar, Line, Pie, Radar, Radial), 69 variants, ChartContainer, ChartTooltip, ChartLegend, ChartDataTable

All prerequisite PRs are merged to main.

## Architecture

### Package Structure

Blocks live in `packages/blocks/` as a new package layer (Layer 3 — Compositions), above the existing component layer:

```
packages/blocks/
├── index.ts                      — barrel export
├── _shared/
│   └── types.ts                  — shared block types (BlockProps base)
├── dashboard/
│   ├── Dashboard01.tsx
│   ├── Dashboard01.spec.md
│   ├── Dashboard01.test.tsx
│   └── index.ts
├── sidebar/
│   ├── Sidebar01.tsx through Sidebar16.tsx
│   ├── Sidebar01.spec.md through Sidebar16.spec.md
│   ├── Sidebar01.test.tsx through Sidebar16.test.tsx
│   ├── _shared.tsx               — shared sidebar layout utilities
│   └── index.ts
├── login/
│   ├── Login01.tsx through Login05.tsx
│   ├── Login01.spec.md through Login05.spec.md
│   ├── Login01.test.tsx through Login05.test.tsx
│   ├── _shared.tsx               — shared auth form utilities
│   └── index.ts
├── signup/
│   ├── Signup01.tsx through Signup05.tsx
│   ├── Signup01.spec.md through Signup05.spec.md
│   ├── Signup01.test.tsx through Signup05.test.tsx
│   └── index.ts
└── originals/
    ├── MobileTabLayout.tsx
    ├── MasterDetail.tsx
    ├── AppShellResponsive.tsx
    ├── *.spec.md, *.test.tsx
    └── index.ts
```

### Export Path

New sub-path export `@vlting/ui/blocks`:

```json
"./blocks": {
  "types": "./packages/blocks/index.ts",
  "import": "./packages/blocks/index.ts"
}
```

Also re-exported from the main `@vlting/ui` barrel for convenience.

### Block Component Contract

Every block follows a consistent contract:

```typescript
// Base type all blocks extend
interface BlockProps {
  /** Brand-aware — blocks compose tokens, never hardcode values */
  className?: string
  /** Blocks are presentation-only — data comes via props */
  children?: React.ReactNode
}
```

Blocks are **presentation-only compositions** (AI Constitution §2.1). They:
- Accept data via props (no fetching)
- Accept callbacks via props (no business logic)
- Use only `@vlting/ui` components (no raw HTML/styles)
- Respect brand theming end-to-end (token discipline)
- Are keyboard navigable and accessible

### Cross-Platform Strategy

All 27 shadcn blocks target **web first**, since they compose components that are inherently web-layout-oriented (CSS Grid, complex sidebars, multi-column forms). The blocks themselves use Tamagui layout primitives (VStack, HStack, View) and semantic HTML for structure.

For blocks that are inherently web-only (dashboard with data tables, complex sidebar navigation), we document the web-only constraint and provide the 3 cross-platform originals as mobile-first alternatives.

**Web-only blocks** (use `styledHtml` or web-specific layouts):
- Dashboard01 (CSS Grid, DataTable, complex sidebar)
- Sidebar09 (nested sidebars)
- Sidebar11 (file tree)

**Cross-platform blocks** (work on web + RN):
- Login01-05, Signup01-05 (simple form layouts)
- Sidebar01, Sidebar02, Sidebar07, Sidebar14 (simple sidebar patterns)
- All 3 originals (designed mobile-first)

## Block Inventory

### Dashboard (1 block)

| Block | Description | Key Components Used |
|-------|-------------|-------------------|
| Dashboard01 | Full dashboard with sidebar, charts, data table | Sidebar, Card, AreaChart, BarChart, DataTable, Tabs, Button, Avatar, DropdownMenu |

### Sidebar Variants (16 blocks)

| Block | Description | Key Components Used |
|-------|-------------|-------------------|
| Sidebar01 | Simple navigation grouped by section | Sidebar.Root/Group/MenuItem |
| Sidebar02 | Collapsible sections | Sidebar + Collapsible |
| Sidebar03 | Submenus (nested navigation) | Sidebar + NavigationMenu |
| Sidebar04 | Floating variant with submenus | Sidebar(variant="floating") + NavigationMenu |
| Sidebar05 | Collapsible submenus | Sidebar + Collapsible nested |
| Sidebar06 | Submenus as dropdowns | Sidebar + DropdownMenu |
| Sidebar07 | Collapses to icons | Sidebar(collapsible="icon") + Icon primitives |
| Sidebar08 | Inset with secondary navigation | Sidebar(variant="inset") + Tabs |
| Sidebar09 | Collapsible nested sidebars | Dual Sidebar.Root |
| Sidebar10 | Sidebar in a popover | Popover + Sidebar |
| Sidebar11 | Collapsible file tree | Sidebar + Collapsible recursive tree |
| Sidebar12 | Sidebar with calendar | Sidebar + Calendar |
| Sidebar13 | Sidebar in a dialog | Dialog + Sidebar |
| Sidebar14 | Sidebar on the right | Sidebar(side="right") |
| Sidebar15 | Left and right sidebars | Dual Sidebar.Root (left + right) |
| Sidebar16 | Sidebar with sticky site header | Sidebar + sticky header layout |

### Login Forms (5 blocks)

| Block | Description | Key Components Used |
|-------|-------------|-------------------|
| Login01 | Simple login form (centered card) | Card, Input, Button, Label, Field |
| Login02 | Two-column with cover image | Card, Input, Button, Label, Field + image column |
| Login03 | Muted background color | Card, Input, Button, Label, Field + themed background |
| Login04 | Form with adjacent image | Card, Input, Button, Label, Field + image |
| Login05 | Email-only login | Card, Input, Button, Label, Field (email only) |

### Signup Forms (5 blocks)

| Block | Description | Key Components Used |
|-------|-------------|-------------------|
| Signup01 | Simple signup form | Card, Input, Button, Label, Field |
| Signup02 | Two-column with cover image | Card, Input, Button, Label, Field + image column |
| Signup03 | Muted background color | Card, Input, Button, Label, Field + themed background |
| Signup04 | Form with adjacent image | Card, Input, Button, Label, Field + image |
| Signup05 | Social provider signup | Card, Input, Button, Label, Field + social buttons |

### Cross-Platform Originals (3 blocks)

| Block | Description | Key Components Used |
|-------|-------------|-------------------|
| MobileTabLayout | Tab bar navigation with content area — mobile-first pattern that works on both web and RN | Tabs, VStack, Icon, Text |
| MasterDetail | Split view on wide screens, stacked on narrow — responsive master/detail pattern | Sidebar, Card, ScrollArea, media queries |
| AppShellResponsive | Full app shell with responsive sidebar (drawer on mobile, fixed on desktop) | Sidebar, Sheet (mobile drawer), media queries |

## Implementation Approach

### Component Composition Rules

1. **Import from `@vlting/ui` barrel** — blocks import from `../../components`, `../../primitives`, etc. (internal package paths)
2. **No raw HTML** — all elements come from Tamagui primitives or vlting components (except `styledHtml` for semantic HTML elements like `<form>`, `<main>`, `<section>`)
3. **No hardcoded colors/spacing** — all visual values from design tokens
4. **Props for content** — blocks accept structured data props for their content areas (e.g., `navItems`, `chartData`), not hardcoded content
5. **Props for callbacks** — `onSubmit`, `onNavigate`, etc. are callback props, not internal logic

### Data Props Pattern

Blocks define clear typed interfaces for their data requirements:

```typescript
// Example: Login01 props
interface Login01Props extends BlockProps {
  /** Form submit handler — receives { email, password } */
  onSubmit?: (data: { email: string; password: string }) => void
  /** Optional social login buttons */
  socialProviders?: Array<{ name: string; icon: React.ReactNode; onPress: () => void }>
  /** Link text/handler for forgot password */
  forgotPasswordHref?: string
  /** Link text/handler for signup redirect */
  signupHref?: string
  /** Optional logo element */
  logo?: React.ReactNode
  /** Optional loading state for submit button */
  loading?: boolean
  /** Optional error message to display */
  error?: string
}
```

### Sidebar Shared Utilities

Many sidebar blocks share common navigation item types:

```typescript
// packages/blocks/sidebar/_shared.tsx
interface NavItem {
  label: string
  icon?: React.ReactNode
  href?: string
  onPress?: () => void
  active?: boolean
  disabled?: boolean
  children?: NavItem[]  // for nested navigation
  badge?: string | number
}

interface NavGroup {
  label?: string
  items: NavItem[]
  collapsible?: boolean
  defaultOpen?: boolean
}
```

### Spec File Convention

Each block gets a simplified spec (not the full component spec template, since blocks are compositions, not primitives):

```markdown
# Block Spec — {BlockName}

> **Baseline**: Satisfies [`QUALITY_BASELINE.md`](../../../QUALITY_BASELINE.md).

## Purpose
- What this block is for
- When to use it

## Layout
- Screen areas and their content
- Responsive breakpoints

## Components Used
- List of @vlting/ui components composed

## Props Contract
- Reference TypeScript source

## Accessibility
- Landmark structure
- Focus flow
- Keyboard interaction

## Cross-Platform
- Web: full support / RN: limited / web-only

## Test Requirements
- Renders all sections
- Passes data through to composed components
- Keyboard navigable
- Accessible landmarks present
```

### Test Strategy

Block tests verify composition correctness, not individual component behavior (those are tested at the component level):

1. **Renders all expected sections** — verify the block's structure is complete
2. **Props propagate** — data props reach the composed components
3. **Callbacks fire** — event handlers are connected
4. **Accessibility landmarks** — `<nav>`, `<main>`, `<aside>`, `<form>` present where expected
5. **Keyboard navigation** — can Tab through interactive elements in logical order

## Dependencies

**Internal (from prior epics):**
- All Layer 1 primitives (Box, Stack, Text, Heading, Icon, etc.)
- All Layer 2 components (Sidebar, Card, Dialog, Tabs, Input, Button, etc.)
- Chart components (AreaChart, BarChart, LineChart, PieChart, ChartContainer, ChartTooltip, ChartLegend)
- Icon system (Remix Icons for sidebar nav icons)
- DataTable (for Dashboard01)

**External (already in package.json):**
- No new external dependencies. Blocks compose only from existing components.

## Risks & Mitigations

| Risk | Mitigation |
|------|-----------|
| Sidebar component API may be too limited for 16 variants | Review Sidebar.tsx early; extend sub-component API if needed (e.g., add SubMenu, GroupAction sub-components) |
| Dashboard01 complexity (many composed parts) | Break into sub-blocks (DashboardSidebar, DashboardHeader, DashboardContent) that Dashboard01 composes |
| Chart components may need additional variant props | Chart system already supports 69 variants; blocks configure via ChartConfig props |
| Cross-platform blocks may need media query patterns | Use Tamagui `$gtMd` / `$sm` media queries for responsive layouts |
| File tree in Sidebar11 needs recursive component | Build a small TreeView helper within the sidebar blocks `_shared.tsx` |

## Acceptance Criteria

From PRD FR-4:
- [ ] All 27 shadcn blocks have equivalents
- [ ] At least 3 cross-platform original blocks
- [ ] Blocks compose only from `@vlting/ui` components (no raw HTML/styles beyond semantic styledHtml)
- [ ] Blocks render on web (all 27) and React Native (auth forms + originals)
- [ ] Each block has a spec.md and test file
- [ ] Each block has typed props with clear data/callback interfaces
- [ ] All blocks respect brand theming (verified with at least 2 brands)
- [ ] All blocks are keyboard navigable
- [ ] All blocks have proper landmark structure

## Stages

### Stage 1: Foundation & Auth Blocks (Login01-05, Signup01-05)
- Set up `packages/blocks/` structure, types, barrel exports
- Build shared auth form utilities (`_shared.tsx`)
- Implement all 10 auth blocks (5 login + 5 signup)
- Tests and specs for all auth blocks
- These are the simplest blocks — good foundation to establish patterns

### Stage 2: Sidebar Blocks (Sidebar01-08)
- Build sidebar shared utilities (NavItem, NavGroup types)
- Implement simple sidebar variants (01-08)
- May need to extend Sidebar component API for variant support
- Tests and specs

### Stage 3: Sidebar Blocks (Sidebar09-16) + Dashboard
- Implement complex sidebar variants (09-16: nested, dialog, file tree, dual, sticky header)
- Implement Dashboard01 (composes sidebar, charts, data table)
- Tests and specs

### Stage 4: Cross-Platform Originals + Integration
- Implement MobileTabLayout, MasterDetail, AppShellResponsive
- Add `@vlting/ui/blocks` export to package.json
- Add block exports to main barrel (`src/index.ts`)
- Full test suite pass
- Brand verification (test with default + shadcn brands)
