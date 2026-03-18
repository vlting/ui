<!-- auto-queue -->
<!-- target-branch: feat/docs-site/foundation -->

# Segment 3: Docs Sidebar + Navigation + Landing Page

Build the docs sidebar navigation and landing page.

## Instructions

1. Create `examples/docs/app/docs/layout.tsx`:
   - Docs layout with sidebar on the left, content on the right
   - Sidebar is collapsible on mobile (use Sheet or simple CSS)
   - Content area takes remaining width
   - Uses Tailwind for layout (flex, grid)

2. Create `examples/docs/components/docs-sidebar.tsx`:
   - Client component for interactive state
   - Navigation tree with sections:
     - **Getting Started** (overview, installation, theming)
     - **Components** (alphabetical list of all components)
     - **Blocks** (Login, Signup, Sidebar, Dashboard, Originals)
     - **Charts** (Area, Bar, Line, Pie, Radar, Radial)
     - **Icons** (icon browser link)
     - **Theming** (brands, tokens, fonts)
     - **Migration** (from shadcn)
   - Each section is collapsible
   - Highlights current route using `usePathname()` from next/navigation
   - Scrollable if content overflows

3. Create `examples/docs/lib/navigation.ts`:
   - Central navigation config object defining the sidebar structure
   - Array of sections, each with title and array of items (label, href)
   - Components list should be auto-generated from known component names
   - Export type `NavSection` and `NavItem`

4. Create `examples/docs/app/page.tsx`:
   - Landing page for the docs site
   - Hero section: "@vlting/ui — Cross-platform design system"
   - Feature highlights: 38+ components, 30 blocks, 6 chart types, 3200+ icons
   - Getting started section with install command (`yarn add @vlting/ui`)
   - Quick links to key sections (Components, Blocks, Charts, Icons)
   - Uses Tailwind for layout, @vlting/ui components for UI elements (Button, Card, Text)

5. Create `examples/docs/app/docs/page.tsx`:
   - Overview/index page for the docs section
   - Brief introduction to the library
   - Links to major sections

## Scope
- examples/docs/app/docs/layout.tsx
- examples/docs/components/docs-sidebar.tsx
- examples/docs/lib/navigation.ts
- examples/docs/app/page.tsx
- examples/docs/app/docs/page.tsx

## Verification
- Landing page renders with hero and feature highlights
- Sidebar shows all navigation sections
- Clicking sidebar items navigates to the correct routes (pages may 404 — that's fine, routes will be added in later stages)
- Sidebar highlights the current active route
- Layout is responsive — sidebar collapses or stacks on mobile

## Task Progress
<!-- lat: 2026-03-02T09:13:07Z -->
<!-- agent-pid: 68359 -->
<!-- worktree: .worktrees/q-003 -->
<!-- branch: q/003 -->

### Checklist
- [ ] **ACTIVE** → Create worktree
- [ ] Build navigation config (lib/navigation.ts)
- [ ] Build docs sidebar
- [ ] Build docs layout
- [ ] Build landing page
- [ ] Build docs overview page
- [ ] Commit, rebase, merge
