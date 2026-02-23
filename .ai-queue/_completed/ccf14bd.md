<!-- auto-queue -->
<!-- depends-on: 001, 002, 003, 004 -->
# Commit History
- `852075b` feat(kitchen-sink): overhaul IA and add missing component demos (#005)
- `ccf14bd` feat(kitchen-sink): overhaul IA and add missing component demos (#005) [merge]

# Kitchen-Sink Completeness and Information Architecture Overhaul

## Context
This is the integration segment. It depends on tasks 001-004 completing first because:
- Task 001 fixes the useKeyboardNavigation hook (HooksPage demo needs to reflect the fix)
- Task 002 removes headless components (HeadlessPage and nav entries are removed)
- Task 003 fixes shadows (shadow demos should show correct dark shadows)
- Task 004 refactors Pagination (the components page needs to show the new API)

## Problem 1: Missing Component Demos
Several components in the library are not demonstrated in the kitchen-sink. At minimum, these are missing:
- **Toast** (`packages/components/Toast/Toast.tsx`) — no demo anywhere in kitchen-sink

Do a thorough audit: list ALL components exported from the library (check `packages/components/*/index.ts` and `src/index.ts`) and verify each has a demo in the kitchen-sink. Add demos for any that are missing.

Components to cross-check (known component directories):
`Alert, AlertDialog, Accordion, Avatar, Breadcrumb, Button, ButtonGroup, Calendar, Card, Carousel, Checkbox, Collapsible, Combobox, Command, ContextMenu, DatePicker, Dialog, Drawer, DropdownMenu, Form, HoverCard, Input, InputOTP, Loader, Menubar, NativeSelect, NavigationMenu, Pagination, Progress, RadioGroup, Resizable, ScrollArea, Select, Sidebar, Slider, Switch, Table, Tabs, Textarea, Toast, Toggle, Tooltip, Typography`

Also check `packages/primitives/` — components like `Kbd` are there. Verify ALL primitives are demonstrated.

## Problem 2: Information Architecture
The current navigation has overlap and inconsistency between the top nav and sidebar:

**Current top nav:** Home, Primitives, Components, Composed, ~~Headless~~ (removed by task 002), Hooks
**Current sidebar groups:** Getting Started, Primitives, Form, Overlay, Navigation, Layout, Composed

Issues:
- Sidebar groups like "Form", "Overlay", "Navigation", "Layout" are sub-categories of "Components" — but they're not clearly nested under a "Components" parent
- "Hooks" is in the top nav but not the sidebar
- After task 002 removes "Headless", the top nav has a hole
- "Composed" appears in both top nav and sidebar
- The sidebar "Form > All Components" link goes to the general ComponentsPage — misleading label

### Proposed New IA
Consolidate into a **single sidebar-driven navigation** with the top bar reserved for branding, theme toggle, and brand selector only. The sidebar becomes the primary nav:

```
SIDEBAR:
  Overview (home page)
  ──────────
  Primitives
    All Primitives
  ──────────
  Components
    Buttons & Actions  (Button, ButtonGroup, Toggle, Pagination)
    Forms & Inputs     (Input, Textarea, Checkbox, RadioGroup, Select, NativeSelect, Switch, Slider, InputOTP, DatePicker, Calendar, Combobox, Form)
    Data Display       (Card, Table, Avatar, Badge/Alert, Progress, Loader, Accordion, Collapsible, Carousel, Breadcrumb, Typography, Kbd)
    Overlays           (Dialog, AlertDialog, Drawer, Popover/HoverCard, Tooltip, Toast)
    Menus & Navigation (DropdownMenu, ContextMenu, Menubar, NavigationMenu, Command, Sidebar, Tabs, ScrollArea, Resizable)
  ──────────
  Composed
    All Composed Examples
  ──────────
  Hooks
    All Hooks
```

Remove "Components", "Composed", and "Hooks" from the top nav entirely. The top nav should ONLY contain: logo/brand name, brand selector buttons, theme toggle.

### Implementation Notes
- Each sidebar sub-page may need its own route and page component, OR can be sections on a single scrollable page. Use routes for each category — this scales better.
- Reuse existing page components where possible. The current `ComponentsPage`, `InputsPage`, `MenusPage`, `OverlaysPage` map reasonably to the new categories but may need renaming/splitting.
- New pages needed: at minimum a Toast demo page section, and any other missing components.
- Update `examples/kitchen-sink/src/App.tsx` routes
- Update `examples/kitchen-sink/src/layouts/BrandLayout.tsx` navigation structure
- Create any new page files as needed in `examples/kitchen-sink/src/pages/`

## Scope
- `examples/kitchen-sink/src/App.tsx` (routes)
- `examples/kitchen-sink/src/layouts/BrandLayout.tsx` (navigation structure)
- `examples/kitchen-sink/src/pages/HomePage.tsx` (update if it references old nav)
- `examples/kitchen-sink/src/pages/ComponentsPage.tsx` (restructure or split)
- `examples/kitchen-sink/src/pages/InputsPage.tsx` (may rename/restructure)
- `examples/kitchen-sink/src/pages/MenusPage.tsx` (may rename/restructure)
- `examples/kitchen-sink/src/pages/OverlaysPage.tsx` (add Toast demo, restructure)
- `examples/kitchen-sink/src/pages/TypographyPage.tsx` (may move under Data Display)
- `examples/kitchen-sink/src/pages/LayoutPage.tsx` (may move under Data Display)
- `examples/kitchen-sink/src/pages/HooksPage.tsx` (ensure accessible from sidebar)
- `examples/kitchen-sink/src/pages/ComposedPage.tsx` (ensure accessible from sidebar)
- `examples/kitchen-sink/src/pages/PrimitivesPage.tsx` (ensure accessible from sidebar)
- Any new page files for missing demos

## Acceptance Criteria
- Every component exported from the library has a visible demo in the kitchen-sink
- Toast component has a working demo
- Navigation uses a single sidebar (no duplicate links between top nav and sidebar)
- Top nav only contains: logo, brand selector, theme toggle
- Sidebar is organized into clear categories with logical groupings
- All routes work and all pages render without errors
- The information architecture is clean, non-overlapping, and intuitive
