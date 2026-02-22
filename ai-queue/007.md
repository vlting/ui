<!-- auto-queue -->
# Task 007: Update Kitchen-Sink Example App

## Objective
Update the kitchen-sink example app to showcase ALL components from the library (including everything added in Tasks 003-005), organized into browsable sections, with all 3 brands (default, fun, posh) working correctly.

## Changes Required

### 1. Update brand configuration
- `examples/kitchen-sink/src/brands.ts` — replace `neonBrand` references with `funBrand` and `poshBrand` from `@vlting/ui`
- Should now have 3 entries: default, fun, posh
- Each gets its own `createTamagui(createBrandConfig(...))` — but remember only ONE is created per page load (the active brand from the URL)

### 2. Load web fonts
Update `examples/kitchen-sink/index.html` to include Google Fonts links for all fonts used by the 3 brands:
- Inter (default body/heading)
- DM Serif Display or equivalent (fun heading)
- DM Sans or equivalent (fun body)
- Cormorant Garamond or equivalent (posh heading)
- Whatever other fonts the brand definitions specify

### 3. Update page sections
Expand the existing pages to include demos for ALL components:

#### Primitives Page
Add demos for any new primitives (Label, Separator, AspectRatio, VisuallyHidden, Badge, Image, ScrollArea, Skeleton, etc.)

#### Components Page
Add demos for all new simple styled components (Select, Checkbox, RadioGroup, Switch, Textarea, Slider, Progress, Avatar, Alert, Tooltip, Popover, Toggle, etc.)

Each component demo should show:
- Default state
- Key variants (variant="default", "secondary", "outline", "ghost", "destructive" where applicable)
- Interactive states (the user can hover, click, focus to see states)
- Disabled state

#### Composed Page (new section or expand existing)
Add demos for complex components (AlertDialog, Sheet, DropdownMenu, Accordion, Toast, Table, Command, etc.)

Each should be a live, interactive demo — not just a static render.

#### Hooks Page
Update with demos for any new hooks.

### 4. Add brand selector for 3 brands
The brand selector in `BrandLayout.tsx` already uses `window.location.href` for brand switching. Just ensure it shows all 3 brands: Default, Fun, Posh.

### 5. Section organization
Consider reorganizing sections by usage pattern:
- **Primitives** — layout, typography, utility
- **Form Controls** — input, select, checkbox, radio, switch, slider, textarea
- **Feedback** — alert, toast, progress, skeleton
- **Overlay** — dialog, alert-dialog, sheet, popover, tooltip, hover-card, dropdown-menu
- **Data Display** — table, card, avatar, badge, accordion
- **Navigation** — tabs, breadcrumb, pagination, command

Or keep the simpler structure (Primitives / Components / Composed / Hooks) if that's cleaner.

## Verification
- App starts with `yarn dev:kitchen-sink`
- All 3 brands are selectable and visually distinct
- Light/dark toggle works
- Every component in the library has a visible, interactive demo
- No console errors
- Page loads correctly for all brand URLs (/default, /fun, /posh)
