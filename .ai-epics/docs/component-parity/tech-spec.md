---
epic: component-parity
saga: shadcn-parity
prd: .ai-sagas/docs/shadcn-parity/prd.md
created: 2026-03-01
---

# Tech Spec: Component Parity & API Mapping

## Context

This epic addresses PRD requirements FR-1 (Component Parity) and FR-2 (API Compatibility & Migration).

**Current state:** 49 components + 15 primitives = 64 exported modules. 47/57 shadcn components covered (82.5%). All existing components have `.spec.md` files and use design tokens exclusively (Epic 1 completed the token audit).

**What this epic delivers:**
- Close the remaining component gap (add missing components)
- Fix 2 critical a11y issues (keyboard navigation)
- Produce machine-readable API mapping documentation for every component
- Create a migration guide from shadcn to @vlting/ui

## Gap Analysis

### Already Resolved (since review doc was written)

| Component | Status |
|-----------|--------|
| Sheet | Exported (was "internal only") |
| Popover | Exported (was "internal only") |
| Empty | Implemented & exported (was "missing") |
| Field | Implemented & exported (was "missing") |

### Components to Add (Net-New)

| Component | Priority | Effort | Cross-Platform | Notes |
|-----------|----------|--------|----------------|-------|
| **InputGroup** | P1 | M | Yes | Compound input with prefix/suffix addon slots, icons, buttons |
| **Direction** | P2 | S | Yes | RTL/LTR context provider + `useDirection()` hook |
| **Item** | P2 | S | Yes | Generic list item with avatar, text, action, separator |
| **Sonner** | P2 | M | Partial | See decision below |
| **Data Table** | P1 | M | Partial | Pattern using `@tanstack/react-table` + our Table |

### Critical A11y Fixes (P0)

| Component | Issue | WCAG |
|-----------|-------|------|
| **DropdownMenu** | No arrow key / Escape keyboard navigation | 2.1.1 |
| **NavigationMenu** | No arrow key / Escape keyboard navigation | 2.1.1 |

### Primitives Promotion

AspectRatio, Badge, Kbd, Label, Separator, Skeleton, and Spinner are already exported from `packages/primitives/` and available in the public API. "Promotion" means ensuring their API and variant surface matches shadcn expectations. Audit during the API mapping stage — no physical file moves needed unless API gaps are found.

## Architecture

### New Component Patterns

All new components follow existing conventions:

1. **File structure:** `packages/components/{Name}/{Name}.tsx` + `{Name}.spec.md` + `index.ts`
2. **Compound pattern:** `withStaticProperties()` for multi-part components, object literal for simpler ones
3. **Styling:** `styled()` with Tamagui tokens, `@ts-expect-error` where needed for v2 RC
4. **Types:** Export `{Name}Props` and sub-component prop types
5. **Tests:** `{Name}.test.tsx` with render + interaction + a11y tests

### InputGroup

Compound input component with addon slots:

```
InputGroup.Root         — Flex container that visually groups children
InputGroup.Addon        — Non-interactive prefix/suffix (text, icon)
InputGroup.Element      — Interactive prefix/suffix (button, select)
InputGroup.Input        — The actual input (wraps our existing Input)
```

Implementation: Styled `XStack` container with context for border-radius collapsing (first child gets left radius, last child gets right radius, middle children get none). Addons are styled `YStack` with background distinction.

### Direction

RTL/LTR context provider:

```typescript
// Provider
<DirectionProvider dir="rtl">{children}</DirectionProvider>

// Hook
const dir = useDirection() // 'ltr' | 'rtl'
```

Implementation: React context wrapping Tamagui's built-in `dir` support. Small utility — under 50 lines.

### Item

Generic list item layout:

```
Item.Root         — Flex row container with separator support
Item.Leading      — Left slot (avatar, icon, checkbox)
Item.Content      — Main content area (title + description)
Item.Title        — Primary text
Item.Description  — Secondary text
Item.Trailing     — Right slot (action, badge, chevron)
```

Implementation: Styled compound using `XStack`/`YStack` with size variants. Separator rendered via `Divider` primitive between items.

### Sonner

**Decision: Wrap as cross-platform Toast variant, not a separate component.**

Rationale: The `sonner` library is web-only. Rather than creating a web-only wrapper that breaks our cross-platform guarantee, we enhance our existing Toast component with Sonner-style convenience APIs:

```typescript
// New: Sonner-style imperative API (adds to existing Toast)
import { toast } from '@vlting/ui'

toast('Event created')
toast.success('Profile updated')
toast.error('Something went wrong')
toast.promise(fetchData(), {
  loading: 'Loading...',
  success: 'Done!',
  error: 'Failed',
})
```

This provides the DX that makes Sonner popular while keeping cross-platform compatibility. Implementation builds on our existing `useToastController` from Tamagui.

### Data Table

**Decision: Pattern/recipe, not a primitive component.**

Data Table is a composition of `@tanstack/react-table` + our `Table` component + pagination + sorting + filtering. We provide:

1. `DataTable` — a convenience wrapper component
2. `DataTableColumn` type helpers
3. Documentation showing the composition pattern

The `@tanstack/react-table` dependency is optional (peer dependency) since not all consumers need data tables.

### Keyboard Navigation Fixes

DropdownMenu and NavigationMenu need WAI-ARIA APG compliant keyboard handling:

**DropdownMenu:**
- Arrow Up/Down: Move focus between items
- Enter/Space: Activate focused item
- Escape: Close menu, return focus to trigger
- Home/End: Move to first/last item
- Type-ahead: Focus item starting with typed character

**NavigationMenu:**
- Arrow Left/Right: Move between top-level items
- Arrow Down: Open submenu
- Arrow Up: Close submenu
- Escape: Close current level
- Enter/Space: Activate link or toggle submenu

Implementation: Extend existing `useKeyboardNavigation` hook or add menu-specific keyboard handler. Use `roving tabindex` pattern (single tab stop, arrow keys move focus within).

## API Mapping Documentation

Each component gets a machine-readable API mapping file:

```
packages/components/{Name}/api-mapping.json
```

Schema:
```json
{
  "component": "Button",
  "shadcn": {
    "import": "import { Button } from '@/components/ui/button'",
    "props": {
      "variant": { "type": "string", "values": ["default", "destructive", "outline", "secondary", "ghost", "link"] },
      "size": { "type": "string", "values": ["default", "sm", "lg", "icon"] },
      "asChild": { "type": "boolean" },
      "className": { "type": "string" }
    }
  },
  "vlting": {
    "import": "import { Button } from '@vlting/ui'",
    "props": {
      "variant": { "type": "string", "values": ["filled", "outline", "ghost", "link"], "mapping": { "default": "filled", "destructive": "filled + tone='danger'", "secondary": "outline" } },
      "size": { "type": "string", "values": ["sm", "md", "lg"], "mapping": { "default": "md", "icon": "md + children={<Icon />}" } },
      "tone": { "type": "string", "values": ["neutral", "brand", "danger", "success", "warning", "info"] },
      "className": null
    }
  },
  "notes": [
    "shadcn's 'destructive' variant maps to variant='filled' + tone='danger'",
    "shadcn's 'asChild' is not supported — use composition instead",
    "className is not supported — use Tamagui style props"
  ],
  "breaking": [
    { "shadcn": "className='...'", "vlting": "Use Tamagui style props (bg, p, br, etc.)", "reason": "Cross-platform — CSS classes don't work on React Native" }
  ]
}
```

A root-level `api-mappings.json` aggregates all component mappings for tooling consumption.

## Dependencies

- `@tanstack/react-table` — optional peer dependency for Data Table
- No other new external dependencies

## Risks & Mitigations

| Risk | Mitigation |
|------|------------|
| Keyboard nav complexity (roving tabindex) | Use existing `useKeyboardNavigation` hook as foundation; reference WAI-ARIA APG examples |
| Data Table cross-platform | `@tanstack/react-table` is headless (no DOM dependency), but our Table uses `styledHtml` — need RN fallback |
| API mapping maintenance | Generate from TypeScript types where possible; manual for behavioral differences |
| Sonner-style imperative toast | Build on existing `useToastController`; may need global toast store |

## Acceptance Criteria

- [ ] All 57 shadcn registry components have an equivalent in @vlting/ui
- [ ] DropdownMenu passes WCAG 2.1.1 keyboard navigation audit
- [ ] NavigationMenu passes WCAG 2.1.1 keyboard navigation audit
- [ ] Every component has an `api-mapping.json` file
- [ ] Root-level `api-mappings.json` aggregates all mappings
- [ ] Migration guide document exists with import paths, prop renames, behavior differences
- [ ] All new components have `.spec.md` files
- [ ] All new components render on web and React Native
- [ ] All new components have test files
- [ ] `@tanstack/react-table` is an optional peer dependency
