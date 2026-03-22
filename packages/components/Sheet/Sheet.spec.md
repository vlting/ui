<!-- spec-version: 2 -->

# Sheet Specification

## Component Name
Sheet

---

## Purpose
A bottom sheet overlay that slides up from the bottom of the viewport. Used for contextual actions, forms, or supplementary content on mobile-first interfaces.

---

## Supported Platforms

- [x] React (web)
- [ ] React Native

---

## Design System Constraints
- All styling via `styled()` — no inline styles
- Zero hardcoded colors; tokens only
- Uses `useDisclosure` from `@vlting/headless` for open/close state
- Uses `useFocusScope` from `@vlting/headless` for focus trapping
- Renders via `Portal` to escape stacking context

---

## Component API

### Sheet.Root
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `open` | `boolean` | — | Controlled open state |
| `defaultOpen` | `boolean` | `false` | Initial open state (uncontrolled) |
| `onOpenChange` | `(open: boolean) => void` | — | Callback on state change |

### Sheet.Trigger
Renders as `<button>`. Toggles sheet open/closed.

### Sheet.Content
Renders as `<div>` via Portal. Contains overlay + dialog content.

### Sheet.Handle
Drag indicator bar at top of sheet content.

### Sheet.Header
Container for title/description. Renders as `<header>`.

### Sheet.Title
Renders as `<h2>`. Linked via `aria-labelledby`.

### Sheet.Description
Renders as `<p>`. Linked via `aria-describedby`.

### Sheet.Footer
Action container. Renders as `<footer>`.

---

## Composition Model
```
<Sheet.Root>
  <Sheet.Trigger>Open</Sheet.Trigger>
  <Sheet.Content>
    <Sheet.Handle />
    <Sheet.Header>
      <Sheet.Title>Title</Sheet.Title>
      <Sheet.Description>Description</Sheet.Description>
    </Sheet.Header>
    {/* body content */}
    <Sheet.Footer>
      <Button>Action</Button>
    </Sheet.Footer>
  </Sheet.Content>
</Sheet.Root>
```

Context: SheetContext provides `isOpen`, `onOpenChange`, `contentId`, `titleId`, `descriptionId`.

---

## Layout Rules
- Content: fixed to bottom, full width, `maxHeight: '85vh'`, `overflow: 'auto'`
- Handle: centered bar (36px wide, 4px tall, `bg: '$neutral5'`, `radius: '$full'`, `my: '$8'`)
- Header: `p: '$16'`, `pb: '$8'`
- Footer: flex row, `gap: '$8'`, `justifyContent: 'flex-end'`, `p: '$16'`, `pt: '$8'`
- Content: `bg: '$surface1'`, `borderTopLeftRadius: '$6'`, `borderTopRightRadius: '$6'`, `boxShadow: '$lg'`

---

## Variants
None in v1.

---

## Size Options
None in v1.

---

## States
| State | Attribute | Values |
|-------|-----------|--------|
| Open/Closed | `data-state` | `"open"` / `"closed"` (on Trigger, Content) |

---

## Interaction Model
- Click Trigger toggles open
- Click Overlay closes
- Escape key closes
- Focus trapped within Content when open
- Focus restored to Trigger on close

---

## Accessibility
- Content: `role="dialog"`, `aria-modal="true"`
- `aria-labelledby` points to Title id
- `aria-describedby` points to Description id
- Trigger: `aria-expanded` reflects state
- Focus trap via `useFocusScope`
- Escape closes via document keydown listener

---

## Platform Implementation Notes

### React (Web)
- Renders Content + Overlay via Portal when open
- Enter animation via `animation: '$slideInBottom'`
- No exit animation in v1 (unmount on close)
- `forwardRef` on all sub-components
- Overlay renders as sibling inside Portal, before Content
- `lowMotion` gate on animations

### React Native
Not yet implemented.

---

## Theming Behavior
- Overlay: `bg: '$overlayBackground'`
- Content: `bg: '$surface1'`, `boxShadow: '$lg'`
- Handle bar: `bg: '$neutral5'`
- Description text: `color: '$neutral9'`
- Title: `fontFamily: '$heading'`

---

## Edge Cases
- Long content scrolls within maxHeight
- No Handle required — optional sub-component
- Content only mounts when open (no DOM when closed)
- Compound components throw if used outside Root

---

## Stories / Preview Cases
- Default (with Handle, Header, Footer)
- Open by default
- Controlled state
- Long scrollable content

---

## Test Requirements
- Renders trigger
- Content hidden by default
- Click trigger opens
- Escape closes
- Overlay click closes
- `role="dialog"` present
- `aria-modal="true"` present
- `aria-labelledby` points to title
- `aria-describedby` points to description
- Focus trap works
- Handle renders bar element
- data-state reflects open/closed on trigger

---

## Implementation Constraints
- All styling via `styled()` — no inline styles
- Uses design tokens exclusively
- `forwardRef` on all sub-components
- Ref merging via `mergeRefs` utility
- Portal rendering for overlay stacking

---

## Open Questions
None.

---

## Change Log
- v1: Initial implementation with useDisclosure, compound pattern, Portal, focus trap, slide-in animation
