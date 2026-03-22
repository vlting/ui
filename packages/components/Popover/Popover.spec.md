<!-- spec-version: 2 -->

# Popover Specification

## Component Name
Popover

---

## Purpose
Floating dialog anchored to a trigger element. Displays interactive content (forms, menus, confirmations) positioned relative to its trigger. Dismissed via click outside, Escape, or explicit Close button.

Constraints:
- Must align with the existing design system.
- Must use existing theme tokens.
- Must not introduce arbitrary spacing, colors, typography, or radii.

---

## Supported Platforms

- [x] React (web)
- [ ] React Native

---

## Design System Constraints

Tokens consumed:
- `$surface1` (content background)
- `$neutralMin` (border)
- `$md` (box shadow)
- `$4` (radius)
- `$16` (padding)
- `$neutral9` (close icon color)
- `$neutralAlpha2` (close hover)

Required Token Additions: none

---

## Component API

See `PopoverRootProps`, `PopoverTriggerProps`, `PopoverContentProps`, `PopoverCloseProps`, `PopoverArrowProps` in source.

Defaults:
```
placement: 'bottom'
offset: 8
```

---

## Composition Model

```tsx
<Popover.Root>
  <Popover.Trigger>Open</Popover.Trigger>
  <Popover.Content>
    <Popover.Close />
    {/* interactive content */}
  </Popover.Content>
</Popover.Root>
```

Compound component via React Context. Supports controlled (`open`/`onOpenChange`) and uncontrolled (via `useDisclosure`).

---

## Layout Rules

- Content rendered in Portal (document.body)
- Positioned via `usePopoverPosition` relative to trigger
- Max width: 320px
- zIndex: 50

---

## Variants

None. Single visual treatment.

---

## Size Options

None. Content size is determined by children.

---

## States

- `closed` — content not rendered
- `open` — content visible, focus trapped
- `data-state="open"|"closed"` on trigger and content

---

## Interaction Model

- **Open:** Click trigger
- **Close:** Click trigger (toggle), click outside, Escape key, Close button
- **Focus:** Auto-focus first focusable inside content; focus trap via `useFocusScope`; restore focus to trigger on close

---

## Accessibility

- Trigger: `aria-expanded`, `aria-controls`, `aria-haspopup="dialog"`
- Content: `role="dialog"`
- Close: `aria-label="Close popover"`
- Focus trap when open
- Escape dismisses

---

## Platform Implementation Notes

### React (Web)
- Portal to document.body
- Document-level keydown for Escape + Tab trap
- Document-level mousedown for click-outside

### React Native
Not yet implemented.

---

## Theming Behavior

Consumes surface, neutral, and shadow tokens. Automatically adapts to light/dark via token resolution.

---

## Edge Cases

- No focusable children: focus trap still active on container
- Viewport overflow: `usePopoverPosition` flips placement
- Nested popovers: each has independent context

---

## Stories / Preview Cases

```
Popover / Default
Popover / Placements
Popover / With Form Content
Popover / With Close Button
```

---

## Test Requirements

- Renders trigger
- Content hidden by default
- Click opens content
- Escape closes
- Click outside closes
- Close button closes
- aria-expanded toggles
- role="dialog" on content
- Focus trap
- data-state attribute
- Placement variants

---

## Implementation Constraints

- All styling via `styled()` — no inline styles
- Token-only colors and spacing
- `forwardRef` on sub-components
- `Object.assign` export pattern

---

## Open Questions

None.

---

## Change Log

```
v1.0 — Initial implementation replacing stub
```
