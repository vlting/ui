---
saga: shadcn-parity
status: active
created: 2026-03-01
author: lucas + Claude
---

# @vlting/ui — Full Parity, Docs Site & AI-Native Design System

## Overview

Transform `@vlting/ui` from a component library into a complete, AI-native design system with full shadcn/ui parity. This means every shadcn component, block, and chart type has a cross-platform equivalent in our library; a Next.js documentation site replaces the kitchen-sink example app; and an AI skill + MCP server makes the library machine-consumable for any AI coding tool.

The library remains cross-platform (web + React Native via Tamagui v2), multi-brand (default, shadcn, fun, posh), and tree-shakeable. When the shadcn brand is applied, output is a pixel-perfect visual match to shadcn/ui.

## Users & Roles

| Role | Description |
|------|-------------|
| **App Developer** | Builds cross-platform apps using `@vlting/ui` components, blocks, and charts. Expects a familiar API, great docs, and easy theming. |
| **AI Agent** | Claude Code, Cursor, Copilot, v0, or any AI tool generating UI code. Needs structured metadata, decision heuristics, and validation to produce correct output. |
| **Design System Consumer** | Evaluates or adopts the library. Needs a polished docs site with live previews, code examples, and brand switching. |
| **Brand Author** | Creates new brand configs. Needs clear token contracts and font/icon customization points. |

## Functional Requirements

### FR-1: Component Parity with shadcn/ui

Close the gap between our 48 components and shadcn's ~57 component registry.

**Components to add (net-new — no equivalent exists):**
- Chart (wrapper for chart primitives — see FR-3)
- Data Table (pattern/recipe using `@tanstack/react-table` + our Table)
- Direction (RTL/LTR direction provider)
- Input Group (compound input with prefix/suffix slots, buttons, textareas)
- Item (generic list item with separator support)
- Sonner (alternative toast via `sonner` library)

**Components to promote from primitives to full components:**
- Aspect Ratio
- Badge
- Kbd
- Label
- Separator
- Skeleton
- Spinner

These already exist in `packages/primitives/` but need to be elevated to full component status with shadcn-equivalent API, variants, and documentation.

**Components we have that shadcn does not (keep as superset):**
- DateRangePicker (standalone — shadcn covers in DatePicker docs)
- Loader (our spinner wrapper — keep alongside Spinner)
- Menu (standalone menu — keep alongside ContextMenu/DropdownMenu)
- Empty (empty state component)
- NativeSelect (native HTML select)
- Field (form field wrapper)

**Cross-platform note:** Every component must render on both web and React Native. If a shadcn component relies on web-only APIs (e.g., Sonner's DOM animations), provide a cross-platform alternative with the same API surface.

**Acceptance criteria:**
- [ ] All 57 shadcn registry components have an equivalent in `@vlting/ui`
- [ ] All existing superset components are preserved
- [ ] Every component has a `.spec.md` file
- [ ] Every component renders on web and React Native
- [ ] API mapping documentation exists for each component (shadcn → vlting)

### FR-2: API Compatibility & Migration Documentation

Our API can differ from shadcn's (adapted for Tamagui idioms), but there must be comprehensive, AI-friendly migration documentation.

**User story:** As a developer migrating from shadcn, I want a clear mapping from shadcn's API to `@vlting/ui`'s API, so I can convert my codebase with minimal friction.

**User story:** As an AI agent, I want structured API metadata (not just prose), so I can programmatically map between shadcn and vlting APIs.

**Acceptance criteria:**
- [ ] Each component has a machine-readable API mapping (JSON/YAML) from shadcn props → vlting props
- [ ] Migration guide covers import paths, prop renames, behavior differences
- [ ] API is a superset where possible (shadcn props work, plus additional vlting-specific props)
- [ ] Breaking differences are explicitly documented with code examples

### FR-3: Chart System (Victory Native)

Add a complete chart system using Victory Native for cross-platform support, covering all shadcn chart types.

**Chart types (6 categories, 69 variants):**
- Area Charts (10 variants: default, gradient, stacked, interactive, etc.)
- Bar Charts (10 variants: horizontal, stacked, mixed, negative, etc.)
- Line Charts (10 variants: dots, labels, stepped, interactive, etc.)
- Pie Charts (11 variants: donut, labels, legends, interactive, etc.)
- Radar Charts (14 variants: grid styles, dots, legends, etc.)
- Radial Charts (6 variants: grid, label, stacked, text, etc.)

**Architecture:**
- `ChartContainer` — wrapper that handles responsive sizing, theme integration, and accessibility
- `ChartTooltip` — themed tooltip component for all chart types
- `ChartLegend` — themed legend component
- Individual chart components: `AreaChart`, `BarChart`, `LineChart`, `PieChart`, `RadarChart`, `RadialChart`
- Chart config system for color mapping via design tokens

**Acceptance criteria:**
- [ ] All 6 chart types implemented with Victory Native
- [ ] All 69 shadcn chart variants have equivalents
- [ ] Charts respect brand theming (colors from tokens, not hardcoded)
- [ ] Charts render on both web and React Native
- [ ] Chart tooltip variants (9) are implemented
- [ ] ChartContainer handles responsive sizing

### FR-4: Block System

Add pre-composed layout blocks covering all shadcn blocks plus cross-platform originals.

**shadcn blocks to match (27):**
- Dashboard (1): Full dashboard with sidebar, charts, data table
- Sidebar variants (16): Collapsible, nested, floating, icon-collapse, file tree, calendar, dialog, dual-sidebar, etc.
- Login forms (5): Simple, two-column, muted background, with image, email-only
- Signup forms (5): Various signup layout variants

**Cross-platform originals (TBD during epic planning):**
- Mobile-optimized layouts (tab bar navigation, bottom sheets)
- Responsive blocks that adapt between mobile and desktop patterns

**Architecture:**
- Blocks live in `packages/blocks/` (or `src/blocks/`)
- Each block is a self-contained composition of existing components
- Blocks are tree-shakeable (import only what you need)
- Blocks respect brand theming end-to-end

**Acceptance criteria:**
- [ ] All 27 shadcn blocks have equivalents
- [ ] At least 3 cross-platform original blocks
- [ ] Blocks compose only from `@vlting/ui` components (no raw HTML/styles)
- [ ] Blocks render on both web and React Native
- [ ] Each block has a documentation page with live preview

### FR-5: Icon System (Remix Icon)

Add a comprehensive, tree-shakeable icon system based on Remix Icon.

**Requirements:**
- 2800+ icons from Remix Icon (filled + outline variants)
- Tree-shakeable: importing one icon doesn't bundle all 2800+
- Icons respect theme tokens for color and sizing
- `<Icon name="arrow-right" variant="outline" />` API for dynamic usage
- Per-icon named exports for static tree-shaking: `import { RiArrowRightLine } from '@vlting/ui/icons'`
- Icon sizes align with the design token size scale
- Icons work cross-platform (web + React Native)

**Acceptance criteria:**
- [ ] Full Remix Icon set available (filled + outline)
- [ ] Tree-shakeable imports (per-icon and dynamic)
- [ ] Icons use theme color tokens
- [ ] Icons scale with size tokens (sm, md, lg, or numeric)
- [ ] Cross-platform rendering (SVG on web, react-native-svg on RN)
- [ ] Icon browser in docs site

### FR-6: Google Fonts System

Add a dead-simple font configuration system with Google Fonts integration and predefined typographic scales.

**Font slots (4):**
| Slot | Purpose | Default (shadcn brand) |
|------|---------|----------------------|
| `heading` | h1–h6 | Inter |
| `body` | Body text, labels, UI text | Inter |
| `mono` | Code, pre, kbd | JetBrains Mono (or similar) |
| `quote` | Blockquotes, pullquotes | Serif font (TBD) |

**Heading weight alternation:**
| Level | Weight pattern |
|-------|---------------|
| h1 | Heavy (700–900) |
| h2 | Light (300–400) |
| h3 | Heavy (700–900) |
| h4 | Light (300–400) |
| h5 | Heavy (700–900) |
| h6 | Light (300–400) |

Exact weight values are configurable per-brand. The alternation pattern is the convention.

**Font size scale:** Predefined in the config, consistent across brands. Brands can override the scale.

**Brand config API:**
```typescript
fonts: {
  heading: { family: 'Playfair Display', weights: { heavy: 800, light: 300 } },
  body: { family: 'Inter', weight: 400 },
  mono: { family: 'JetBrains Mono', weight: 400 },
  quote: { family: 'Merriweather', weight: 300, style: 'italic' },
}
```

**Acceptance criteria:**
- [ ] 4 font slots configurable per brand
- [ ] Google Fonts loaded automatically based on brand config
- [ ] Heading weight alternation (h1 heavy → h6 light) applied automatically
- [ ] Font size scale predefined and overridable
- [ ] Typography components use font slots (not hardcoded font families)
- [ ] Works on web (Google Fonts CDN) and React Native (bundled fonts or expo-font)

### FR-7: Documentation Site (Next.js)

Replace the kitchen-sink example app with a full documentation site.

**User story:** As a developer, I want a documentation site where I can browse all components, see live previews with different brands, copy code examples, and understand when/how to use each component.

**Site structure:**
- `/` — Landing page (library overview, features, getting started)
- `/docs/components/[name]` — Component pages (preview, variants, code, API reference, accessibility notes, when to use/not use)
- `/docs/blocks/[name]` — Block pages (preview, code, customization)
- `/docs/charts/[type]` — Chart pages (variants, data format, customization)
- `/docs/icons` — Icon browser (search, filter by category, copy import)
- `/docs/theming` — Brand system docs (how to create a brand, font config, token reference)
- `/docs/migration` — shadcn migration guide (API mappings, import changes)

**Site-level controls:**
- Brand switcher (default brand by default; shadcn, fun, posh available)
- Platform toggle (web preview / mobile preview)
- Dark/light mode toggle

**Per-component page:**
- Interactive playground (live preview with prop controls)
- All variants demonstrated
- Code examples (copy-able)
- API reference table (props, types, defaults)
- Accessibility notes
- "When to use" / "When not to use" guidance
- Composition examples

**Acceptance criteria:**
- [ ] Every component, block, and chart has a documentation page
- [ ] Brand switcher works site-wide (all previews update)
- [ ] Platform toggle shows web and mobile previews
- [ ] Code examples are copy-able and correct
- [ ] API reference is auto-generated from TypeScript types where possible
- [ ] Site is responsive (usable on mobile)
- [ ] Icon browser with search and category filters

### FR-8: AI Skill (Claude Code)

Create a Claude Code SKILL.md that teaches AI agents how to use `@vlting/ui` for production-quality code generation.

**Skill covers:**
- **Component selection heuristics:** Given a UI intent (e.g., "show a confirmation"), which component to use and why
- **Composition rules:** How components combine (e.g., Form.Field wraps Input + Label + ErrorMessage)
- **Layout conventions:** When to use Stack vs. Box vs. specific layout components
- **Token usage:** Never hardcode colors/spacing/radii — always use tokens
- **Anti-patterns:** Common mistakes and how to avoid them
- **Brand awareness:** How theming works, how to write brand-agnostic code
- **Accessibility by default:** Required ARIA attributes, keyboard behavior expectations
- **Cross-platform considerations:** What works on both web and RN vs. web-only

**Acceptance criteria:**
- [ ] SKILL.md is structured, concise, and optimized for AI reasoning
- [ ] Covers all components with when/why/how guidance
- [ ] Includes decision trees for common UI patterns
- [ ] Anti-patterns section prevents common mistakes
- [ ] Token usage rules are explicit and enforceable

### FR-9: Portable AI Documentation (llms.txt + Registry)

Create machine-readable documentation that works with any AI tool (Cursor, Copilot, v0, etc.).

**Deliverables:**
- `llms.txt` at docs site root — structured library overview for LLM consumption
- Component registry (JSON) — machine-readable component metadata (props, variants, usage patterns, decision heuristics)
- `llms-full.txt` — comprehensive version with all component details

**Acceptance criteria:**
- [ ] `llms.txt` follows the emerging llms.txt convention
- [ ] Component registry is JSON and covers all components, blocks, charts
- [ ] Registry includes prop types, default values, variant options
- [ ] Registry includes usage examples and anti-patterns
- [ ] Documentation is auto-generated from source where possible

### FR-10: MCP Server

Build an MCP server that any AI tool can connect to for library intelligence.

**Tools:**
| Tool | Purpose |
|------|---------|
| `list_components` | List all components with categories and brief descriptions |
| `get_component` | Get full component metadata (props, variants, examples, when-to-use) |
| `suggest_component` | Given a UI intent description, suggest the best component(s) |
| `generate_code` | Generate boilerplate for a component or composition |
| `validate_code` | Check generated code against design system rules (token usage, correct props, accessibility, anti-patterns) |
| `get_migration_mapping` | Get shadcn → vlting API mapping for a specific component |
| `search_icons` | Search Remix Icons by name or category |

**Acceptance criteria:**
- [ ] MCP server implements all tools listed above
- [ ] Server is publishable as an npm package
- [ ] Server works with Claude Code, Cursor, and any MCP-compatible client
- [ ] Validation tool catches: hardcoded colors, missing ARIA attributes, wrong component for pattern, non-token spacing/sizing
- [ ] Response times < 200ms for metadata queries

### FR-11: Token-Based Styling (No Hardcoded Values)

Audit and enforce that all styling uses brand config tokens, not hardcoded values.

**User story:** As a brand author, I want to create a new brand config and have every component, block, and chart automatically reflect my brand — no visual artifacts from hardcoded colors, spacing, or radii.

**Scope:**
- All existing 48 components — audit for hardcoded values
- All new components, blocks, charts — enforce from the start
- Dynamically calculated values (e.g., `calc()` based on tokens) are acceptable
- Hardcoded structural values (e.g., `position: absolute`, `display: flex`) are acceptable — only visual properties must use tokens

**Acceptance criteria:**
- [ ] Zero hardcoded color values in any component
- [ ] Zero hardcoded spacing/padding/margin values (use space tokens)
- [ ] Zero hardcoded border-radius values (use radius tokens)
- [ ] Zero hardcoded font-size/weight values (use font tokens)
- [ ] Hardcoded border-width is acceptable only if it matches a border token
- [ ] Lint rule or automated check exists to catch new hardcoded values

## Non-Functional Requirements

- **Performance:** Tree-shakeable — importing one component doesn't bundle the library. Icons are individually importable. Charts lazy-load.
- **Accessibility:** WCAG 2.2 AA baseline for all components. Keyboard navigable. Screen reader compatible. Documented per component.
- **Cross-platform:** Every component, block, and chart renders on web (React DOM) and mobile (React Native). Tamagui handles the abstraction.
- **Bundle size:** Icon system must not add >5KB per icon used. Chart system should lazy-load Victory Native.
- **Type safety:** Full TypeScript types for all component props, token values, and brand configs.

## Technical Constraints

- **Tamagui v2 RC bugs:** Known issues with `GetProps<>`, `styled()` token defaults, `tag` prop (see MEMORY.md). All workarounds must be applied.
- **Victory Native:** Cross-platform charting library. Less feature-rich than Recharts — some shadcn chart variants may need creative alternatives.
- **React Native font loading:** Google Fonts CDN doesn't work on RN. Need `expo-font` or bundled font files as fallback.
- **Remix Icon on RN:** SVG icons need `react-native-svg`. Ensure all icons use SVG paths, not font glyphs.

## Scope Boundary

**In scope:**
- All shadcn components (curated for cross-platform, skip none that can work)
- All 27 shadcn blocks + cross-platform originals
- All 69 shadcn chart variants (via Victory Native)
- Remix Icon integration (2800+ icons, filled + outline)
- Google Fonts system (4 slots, heading weight alternation h1–h6)
- Next.js documentation site with interactive playground
- Claude Code SKILL.md
- llms.txt + JSON component registry
- MCP server (read + generate + validate)
- Token audit of all existing components

**Out of scope:**
- Server-side rendering configuration beyond Next.js defaults
- Backend integrations or API layers
- Deployment infrastructure for the docs site (Vercel, etc.)
- Native-only components (iOS/Android platform APIs)
- Custom icon authoring tools
- Visual regression testing infrastructure (manual verification only)

## Open Questions

- **Victory Native chart parity:** Can all 69 shadcn chart variants (especially radar and radial) be replicated with Victory Native? Need a spike during the chart epic.
- **Sonner cross-platform:** The `sonner` library is web-only. Do we wrap it with a RN-compatible alternative, or build our own cross-platform toast that matches the Sonner API?
- **Docs site hosting:** Next.js docs site will need hosting. Vercel is the obvious choice but is out of scope. Document the deployment story without implementing it.
- **Font loading on RN:** Google Fonts CDN works on web. For RN, do we bundle popular fonts or require the consumer to handle font loading?
