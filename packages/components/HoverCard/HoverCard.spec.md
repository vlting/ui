<!-- spec-version: 2 -->

# HoverCard Specification

## Component Name
HoverCard

---

## Purpose
Rich floating preview card that appears on hover. Unlike Tooltip (text-only, non-interactive), HoverCard displays structured content (avatars, descriptions, links) and remains open while the user hovers over the card itself.

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
- `$surface1` (background)
- `$neutralMin` (border)
- `$lg` (box shadow)
- `$4` (radius)
- `$16` (padding)

Required Token Additions: none

---

## Component API

```tsx
<HoverCard.Root placement="bottom" showDelay={300} hideDelay={200}>
  <HoverCard.Trigger><a href="#">@user</a></HoverCard.Trigger>
  <HoverCard.Content>
    {/* rich content */}
  </HoverCard.Content>
</HoverCard.Root>
```

Defaults:
```
placement: 'bottom'
offset: 8
showDelay: 300
hideDelay: 200
```

---

## Composition Model

Compound pattern: `HoverCard.Root` > `HoverCard.Trigger` + `HoverCard.Content`.

Trigger uses `cloneElement` to attach mouseenter/mouseleave handlers. Content is independently hoverable.

---

## Layout Rules

- Content rendered in Portal
- Positioned via `usePopoverPosition`
- Max width: 320px
- zIndex: 50

---

## Variants

None. Single visual treatment.

---

## Size Options

None. Content size determined by children.

---

## States

- `closed` — not rendered
- `open` — visible after delay
- `data-state="open"` on content when visible

---

## Interaction Model

- **Show:** mouseenter on trigger, after `showDelay` ms
- **Hide:** mouseleave from trigger, after `hideDelay` ms
- **Content hoverable:** mouseenter on content cancels hide timer; mouseleave from content starts hide timer
- **No focus trap** — supplementary content, not a dialog
- **No keyboard trigger** — hover-only (content is supplementary)

---

## Accessibility

- Content has `id` for potential `aria-describedby` linking
- `data-state` attribute for styling hooks
- Not a dialog — no `role="dialog"`, no focus trap
- Content is supplementary; critical info should not be hover-only

---

## Platform Implementation Notes

### React (Web)
- Portal to document.body
- Timer-based show/hide via useRef
- Content onMouseEnter/onMouseLeave keeps card alive

### React Native
Not yet implemented.

---

## Theming Behavior

Consumes surface and neutral tokens. Adapts to light/dark automatically.

---

## Edge Cases

- Rapid trigger hover in/out: timers cancel properly
- Mouse moves from trigger to content: hide timer canceled by content mouseenter
- Trigger unmounts while card showing: cleanup via useEffect
- Long content: wraps within maxWidth

---

## Stories / Preview Cases

```
HoverCard / Default
HoverCard / Rich Content (avatar + bio)
HoverCard / Placements
```

---

## Test Requirements

- Trigger renders
- Content hidden by default
- Hover shows after delay
- Mouseleave hides after delay
- Content stays open while hovering content
- Leaving content hides card
- onOpenChange callback
- data-state attribute

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
