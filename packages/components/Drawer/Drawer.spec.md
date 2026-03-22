<!-- spec-version: 2 -->

# Drawer Specification

## Component Name
Drawer

---

## Purpose
A side panel overlay that slides in from any edge of the viewport. Used for navigation, settings, filters, or supplementary content.

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

### Drawer.Root
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `open` | `boolean` | — | Controlled open state |
| `defaultOpen` | `boolean` | `false` | Initial open state (uncontrolled) |
| `onOpenChange` | `(open: boolean) => void` | — | Callback on state change |
| `direction` | `'left' \| 'right' \| 'top' \| 'bottom'` | `'right'` | Edge to slide from |

### Drawer.Trigger
Renders as `<button>`. Toggles drawer open/closed.

### Drawer.Content
Renders as `<div>` via Portal. Contains overlay + drawer panel.

### Drawer.Header
Container for title/description. Renders as `<header>`.

### Drawer.Title
Renders as `<h2>`. Linked via `aria-labelledby`.

### Drawer.Description
Renders as `<p>`. Linked via `aria-describedby`.

### Drawer.Footer
Action container. Renders as `<footer>`.

### Drawer.Close
Close button with default X icon. Renders as `<button>`.

---

## Composition Model
```
<Drawer.Root direction="right">
  <Drawer.Trigger>Open</Drawer.Trigger>
  <Drawer.Content>
    <Drawer.Close />
    <Drawer.Header>
      <Drawer.Title>Title</Drawer.Title>
      <Drawer.Description>Description</Drawer.Description>
    </Drawer.Header>
    {/* body content */}
    <Drawer.Footer>
      <Button>Action</Button>
    </Drawer.Footer>
  </Drawer.Content>
</Drawer.Root>
```

Context: DrawerContext provides `isOpen`, `onOpenChange`, `direction`, `contentId`, `titleId`, `descriptionId`.

---

## Layout Rules
- Content positioning varies by direction:
  - right: `top: 0, right: 0, bottom: 0, width: '85vw', maxWidth: '400px'`
  - left: `top: 0, left: 0, bottom: 0, width: '85vw', maxWidth: '400px'`
  - top: `top: 0, left: 0, right: 0, height: '85vh', maxHeight: '400px'`
  - bottom: `bottom: 0, left: 0, right: 0, height: '85vh', maxHeight: '400px'`
- Content: `bg: '$surface1'`, `boxShadow: '$lg'`, flex column, overflow auto
- Border radius on exposed edges only
- Header: `p: '$16'`, `pb: '$8'`
- Footer: flex row, `gap: '$8'`, `justifyContent: 'flex-end'`, `p: '$16'`, `pt: '$8'`
- Close button: absolute positioned top-right, ghost style

---

## Variants
```
direction:
  - right (default)
  - left
  - top
  - bottom
```

Each direction variant controls:
- Fixed positioning anchored to that edge
- Slide-in animation from that direction
- Border radius on the non-anchored corners

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
- Click Close button closes
- Escape key closes
- Focus trapped within Content when open
- Focus restored on close

---

## Accessibility
- Content: `role="dialog"`, `aria-modal="true"`
- `aria-labelledby` points to Title id
- `aria-describedby` points to Description id
- Trigger: `aria-expanded` reflects state
- Close button: `aria-label="Close drawer"`
- Focus trap via `useFocusScope`
- Escape closes via document keydown listener

---

## Platform Implementation Notes

### React (Web)
- Renders Content + Overlay via Portal when open
- Enter animation via direction-specific tokens (`$slideInRight`, `$slideInLeft`, `$slideInTop`, `$slideInBottom`)
- No exit animation in v1 (unmount on close)
- Direction variants handle positioning + animation selection
- `forwardRef` on all sub-components
- `lowMotion` gate on animations
- Close button renders default SVG X icon when no children provided

### React Native
Not yet implemented.

---

## Theming Behavior
- Overlay: `bg: '$overlayBackground'`
- Content: `bg: '$surface1'`, `boxShadow: '$lg'`
- Description text: `color: '$neutral9'`
- Close button: `color: '$neutral9'`, interact `bg: '$neutralAlpha2'`
- Title: `fontFamily: '$heading'`

---

## Edge Cases
- All four direction variants must be tested
- Close button position stays top-right regardless of direction
- Content only mounts when open (no DOM when closed)
- Compound components throw if used outside Root
- Close renders default X icon SVG when no children

---

## Stories / Preview Cases
- Default (right direction)
- Left direction
- Top direction
- Bottom direction
- With Header, Description, Footer
- With Close button

---

## Test Requirements
- Renders trigger
- Content hidden by default
- Click trigger opens
- Escape closes
- Overlay click closes
- Close button closes
- All direction variants render
- `role="dialog"` present
- `aria-modal="true"` present
- `aria-labelledby` points to title
- `aria-describedby` points to description
- Close button has `aria-label`
- Focus trap works
- data-state reflects open/closed on trigger
- Close renders default icon

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
- v1: Initial implementation with useDisclosure, compound pattern, Portal, focus trap, directional slide-in animations
