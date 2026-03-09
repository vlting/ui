---
epic: docs-site
saga: shadcn-parity
prd: ../.ai-sagas/docs/shadcn-parity/prd.md
created: 2026-03-02
---

# Tech Spec: Documentation Site (Next.js)

## Context

This epic addresses **FR-7 (Documentation Site)** from the shadcn-parity PRD. All prerequisite epics are complete:
- Epic 1: Token audit & font system (design tokens, brands, fonts)
- Epic 2: Component parity (38+ components, API mapping JSON files)
- Epic 3: Icon system (3229 Remix Icons, DynamicIcon, categories)
- Epic 4: Chart system (6 chart types, 69 variants, Victory Native)
- Epic 5: Block system (30 blocks — login, signup, sidebar, dashboard, originals)

The docs site will be a Next.js app in `examples/docs/`, added to the monorepo workspace. It renders `@vlting/ui` components live with brand switching, dark/light mode, and code examples.

## Architecture

### Stack
- **Framework:** Next.js 15 (App Router)
- **Styling:** Tamagui (via `@vlting/ui` Provider) + Tailwind CSS for docs-only layout/prose
- **MDX:** `@next/mdx` or `next-mdx-remote` for content pages
- **Code highlighting:** `shiki` (supports Tamagui theme tokens)
- **Search:** Static search index (Flexsearch or similar — no external service)

### Directory Structure

```
examples/docs/
├── app/
│   ├── layout.tsx              # Root layout (Provider, sidebar, header, brand/theme controls)
│   ├── page.tsx                # Landing page
│   ├── docs/
│   │   ├── layout.tsx          # Docs layout (sidebar + content)
│   │   ├── components/
│   │   │   └── [name]/
│   │   │       └── page.tsx    # Dynamic component page
│   │   ├── blocks/
│   │   │   └── [name]/
│   │   │       └── page.tsx    # Dynamic block page
│   │   ├── charts/
│   │   │   └── [type]/
│   │   │       └── page.tsx    # Dynamic chart page
│   │   ├── icons/
│   │   │   └── page.tsx        # Icon browser
│   │   ├── theming/
│   │   │   └── page.tsx        # Brand system + token reference
│   │   └── migration/
│   │       └── page.tsx        # shadcn migration guide
├── components/
│   ├── docs-sidebar.tsx        # Docs navigation sidebar
│   ├── component-preview.tsx   # Live component preview container
│   ├── code-block.tsx          # Syntax-highlighted code block with copy
│   ├── prop-table.tsx          # Auto-generated props table
│   ├── brand-switcher.tsx      # Brand picker (default, shadcn, fun, posh)
│   ├── theme-toggle.tsx        # Dark/light mode toggle
│   ├── icon-browser.tsx        # Icon search + category filter + copy
│   └── playground.tsx          # Interactive prop controls
├── content/
│   ├── components/             # MDX content per component
│   ├── blocks/                 # MDX content per block
│   └── charts/                 # MDX content per chart type
├── lib/
│   ├── registry.ts             # Component registry (metadata, examples, props)
│   ├── api-mapping.ts          # Load API mapping JSON files
│   └── search-index.ts         # Search index generation
├── next.config.mjs
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

### Component Registry

A central registry maps component names to their metadata:

```typescript
interface ComponentEntry {
  name: string
  slug: string
  category: 'primitives' | 'components' | 'blocks' | 'charts' | 'icons'
  description: string
  importPath: string
  examples: { name: string; code: string; description?: string }[]
  apiMapping?: string  // path to api-mapping.json
  whenToUse?: string[]
  whenNotToUse?: string[]
  a11yNotes?: string[]
}
```

### Brand Switching

The root layout wraps everything in `@vlting/ui`'s `Provider`. The brand switcher stores the selected brand in a React context + localStorage. When the brand changes, the Provider re-renders with the new brand config:

```typescript
import { Provider } from '@vlting/ui'
import { defaultBrand, shadcnBrand, funBrand, poshBrand } from '@vlting/ui'

const brands = { default: defaultBrand, shadcn: shadcnBrand, fun: funBrand, posh: poshBrand }
```

### Dark/Light Mode

Use Next.js `next-themes` for SSR-safe theme switching. The Tamagui Provider accepts a `defaultTheme` prop that maps to the built theme set (light/dark).

### Interactive Playground

Each component page can include a `<Playground>` component that renders the component with adjustable prop controls. Props are introspected from the registry's type information. Simple implementation: a `<Playground>` takes a component reference and a config of adjustable props (select, boolean, string, number), renders controls alongside the live preview.

### API Reference

Auto-generated from the API mapping JSON files produced by Epic 2 (in `packages/components/*/api-mapping.json`). These files contain prop names, types, defaults, and descriptions. The `<PropTable>` component renders them as a styled table.

### Icon Browser

The icon browser page loads the icon manifest (category → icon names mapping) and renders a searchable, filterable grid. Each icon shows its name, a preview (using DynamicIcon), and a copy-to-clipboard button for the import statement.

### Code Examples

Code blocks use `shiki` for syntax highlighting. Each example includes a "Copy" button. Examples are stored as string literals in the component registry or as MDX content.

## Implementation Approach

### Stage Plan

**Stage 1: Foundation** — Next.js app scaffold, root layout, Provider integration, brand switcher, theme toggle, docs layout with sidebar navigation, landing page.

**Stage 2: Component Pages** — Component registry, dynamic `[name]` route, component preview, code block with copy, prop table, MDX content for ~10 key components (Button, Input, Card, Dialog, Tabs, Select, Accordion, Table, Form, Tooltip) as exemplars.

**Stage 3: Block + Chart Pages** — Block registry, dynamic block routes, chart routes with live chart rendering, remaining component MDX pages (batch generation from registry).

**Stage 4: Icon Browser + Theming + Migration** — Icon browser with search/filter, theming docs page (brand creation, token reference, font config), migration guide page (from existing `docs/migration-guide.md`).

**Stage 5: Polish + Search** — Static search index, responsive mobile layout, final QA pass across all pages, meta tags, OG images.

## Dependencies
- `next` ^15
- `@next/mdx` or `next-mdx-remote`
- `shiki` for code highlighting
- `next-themes` for dark/light mode
- `tailwindcss` for docs-only layout/prose styling
- `flexsearch` for client-side search

## Risks & Mitigations

| Risk | Mitigation |
|------|-----------|
| Tamagui SSR in Next.js App Router | Use `@tamagui/next-plugin` for SSR extraction; fall back to client-only rendering if needed |
| Large bundle from importing all components | Use dynamic imports for component previews; each page only loads its component |
| Icon browser performance (3200+ icons) | Virtualized list + lazy loading; only render visible icons |
| MDX content volume | Generate template MDX from registry; manually curate key components first |

## Acceptance Criteria
(Derived from PRD FR-7)
- Every component, block, and chart has a documentation page
- Brand switcher works site-wide (all previews update)
- Dark/light mode toggle works
- Code examples are copy-able and correct
- API reference is auto-generated from TypeScript types / mapping JSONs
- Site is responsive (usable on mobile)
- Icon browser with search and category filters
- Landing page with getting started guide
- Migration guide page
- Theming documentation page
